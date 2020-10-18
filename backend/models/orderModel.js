const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    // required: [true, 'An order must have a user'],
  },
  order: [
    {
      // _id: false,
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'You need to add product id'],
      },
      quantity: {
        type: Number,
        required: [true, 'A product must have quantity'],
      },
      purchasedPrice: {
        type: Number,
        required: [true, 'A product must have a purchased price'],
      },
    },
  ],
  total: {
    type: Number,
    required: [true, 'An order must have a price'],
  },
  status: {
    type: String,
    required: [true, 'An order must have a status'],
    enum: {
      values: ['placed', 'confirmed', 'ontheway', 'delivered'],
      message: 'Status must be either pending or confirmed',
    },
    default: 'placed',
  },
  receiver: {
    name: {
      type: String,
      required: [true, 'A receiver must have a name'],
      trim: true,
      maxlength: [
        40,
        'A receiver name must have less or equal then 40 characters',
      ],
    },
    phone: {
      type: String,
      required: [true, 'A receiver must have a phone number'],
      trim: true,
      maxlength: [
        20,
        'A receiver phone number must have less or equal then 20 characters',
      ],
    },
    address: {
      type: String,
      required: [true, 'A receiver must have an address'],
      trim: true,
      maxlength: [
        100,
        'A receiver address must have less or equal then 100 characters',
      ],
    },
    comment: {
      type: String,
      trim: true,
      maxlength: [
        120,
        'A receiver comment must have less or equal then 120 characters',
      ],
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'order.product',
    select: '-__v -createdAt',
  }).populate({
    path: 'user',
  });
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
