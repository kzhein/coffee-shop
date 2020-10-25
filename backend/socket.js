let io;

module.exports = {
  init: httpServer => {
    io = require('socket.io')(httpServer);

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

    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
    return io;
  },
};
