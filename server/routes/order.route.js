const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);
router.put('/:id/cancel', orderController.cancelOrder);
router.put('/add-to-inventory/:id', orderController.addOrderToInventory);

module.exports = router;