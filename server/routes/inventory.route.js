const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory.controller');

// Authentication routes
router.post('/add', inventoryController.addProduct);
router.get('/list-all', inventoryController.listAllProducts);
router.get('/list/:id', inventoryController.searchByBarcode);
router.put('update/:id', inventoryController.updateProduct);
router.delete('delete/:id', inventoryController.deleteSingleProduct);
router.delete('/delete/multiple/', inventoryController.deleteMultipleProducts);

module.exports = router;