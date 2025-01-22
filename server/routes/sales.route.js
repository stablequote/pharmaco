const express = require('express');
const router = express.Router();
const salesController = require('../controllers/sales.controller');

// Sales routes
router.post('/make-sale', salesController.makeSale);
router.get('/receipt/:billID', salesController.generateReceipt);

module.exports = router;
