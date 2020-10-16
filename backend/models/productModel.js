const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name'],
    unique: true,
    trim: true,
  },
  type: {
    type: mongoose.Schema.ObjectId,
    ref: 'Type',
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price'],
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
});

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'type',
    select: '-__v -createdAt',
  }).populate({
    path: 'category',
    select: '-__v -createdAt',
  });

  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
