const Type = require('../models/typeModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllTypes = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Type.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const types = await features.query;

  res.status(200).json({
    status: 'success',
    results: types.length,
    data: {
      types,
    },
  });
});

exports.createType = catchAsync(async (req, res, next) => {
  const type = await Type.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      type,
    },
  });
});

exports.getType = catchAsync(async (req, res, next) => {
  const type = await Type.findById(req.params.id);

  if (!type) {
    return next(new AppError('No type found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      type,
    },
  });
});

exports.updateType = catchAsync(async (req, res, next) => {
  const type = await Type.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!type) {
    return next(new AppError('No type found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      type,
    },
  });
});

exports.deleteType = catchAsync(async (req, res, next) => {
  const type = await Type.findByIdAndDelete(req.params.id);

  if (!type) {
    return next(new AppError('No type found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
