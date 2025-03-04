const express = require('express');
const router = express.Router();
const salesController = require('../controllers/sales.controller');

// Sales routes
router.post('/make-sale', salesController.makeSale);
router.get('/receipt/:billID', salesController.generateReceipt);
router.get('/list-sales', salesController.listSales)
router.get('/get-today-sales', salesController.getTotalNumberOfSalesToday)
router.get('/get-week-sales', salesController.getTotalSalesThisWeek)
router.get('/get-month-sales', salesController.getTotalSalesThisMonth)

router.get('/total-sales-revenue-today', salesController.getTotalSalesRevenueToday)

module.exports = router;