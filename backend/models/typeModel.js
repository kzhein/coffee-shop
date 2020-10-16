const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A type must have a name'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
});

const Type = mongoose.model('Type', typeSchema);

module.exports = Type;
