const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory.controller');

// Authentication routes
router.post('/add', inventoryController.addProduct);
router.post('/import-from-excel', inventoryController.imporFromExcel);
router.get('/list-all', inventoryController.listAllProducts);
router.get('/search/:barcodeID', inventoryController.searchByBarcode);
router.put('update/:id', inventoryController.updateProduct);
router.delete('delete/:id', inventoryController.deleteSingleProduct);
router.delete('/delete/multiple/', inventoryController.deleteMultipleProducts);

module.exports = router;