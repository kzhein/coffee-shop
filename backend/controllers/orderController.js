const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Order.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const total = await Order.estimatedDocumentCount();

  const orders = await features.query;

  res.status(200).json({
    status: 'success',
    results: orders.length,
    total,
    data: {
      orders,
    },
  });
});

exports.createOrder = catchAsync(async (req, res, next) => {
  const { order: odr, receiver } = req.body;

  // attach price of per item
  const orderPromises = odr.map(async od => {
    const { price } = await Product.findById(od.product);
    od.purchasedPrice = price;
    return od;
  });
  const order = await Promise.all(orderPromises);

  // calculate total price
  const total = order.reduce(
    (tt, od) => tt + od.quantity * od.purchasedPrice,
    0
  );

  let orderAdded = await Order.create({
    user: req.user.id,
    order,
    total,
    receiver,
  });

  orderAdded = await orderAdded
    .populate({
      path: 'order.product',
      select: '-__v -createdAt',
    })
    .execPopulate();

  res.status(201).json({
    status: 'success',
    data: {
      order: orderAdded,
    },
  });
});

exports.getMyOrders = catchAsync(async (req, res, next) => {
  const myOrders = await Order.find({ user: req.user.id }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    status: 'success',
    results: myOrders.length,
    data: {
      orders: myOrders,
    },
  });
});

exports.getOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError('No order found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!order) {
    return next(new AppError('No order found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    return next(new AppError('No order found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
