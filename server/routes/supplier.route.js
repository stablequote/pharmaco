const express = require('express');
const router = express.Router();
const supplierController = require("../controllers/supplier.controller");

router.post('/add', supplierController.addSupplier);
router.get('/list', supplierController.listSuppliers);
router.post('/list-single', supplierController.listSingleSupplier);

module.exports = router;