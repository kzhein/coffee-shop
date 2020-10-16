const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

const router = express.Router();

// protect all routes below with protect middleware
router.use(authController.protect);

router.get('/getMyOrders', orderController.getMyOrders);
router.post('/', orderController.createOrder);

// protect all routes below with restrictTo middleware
router.use(authController.protect, authController.restrictTo('admin'));

router.route('/').get(orderController.getAllOrders);
router
  .route('/:id')
  .get(orderController.getOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
