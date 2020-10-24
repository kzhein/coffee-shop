const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    // .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

const io = require('./socket').init(server);
io.on('connection', socket => {
  console.log('Client connected');

  // the list of currently connected clients
  io.of('/').clients((error, clients) => {
    if (error) throw error;
    io.emit('connectedUsers', clients.length);
  });

  socket.on('sendMessage', data => {
    console.log(data);
    socket.broadcast.emit('newMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('a user has left');

    io.of('/').clients((error, clients) => {
      if (error) throw error;
      io.emit('connectedUsers', clients.length);
    });
  });
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
