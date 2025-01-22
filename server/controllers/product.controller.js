const Inventory = require('../models/inventory.model');
const Barcode = require('barcode-generator'); // For barcode generation

// Add a product
exports.addProduct = async (req, res) => {
    try {
        const { product, quantity, unit, expiryDate, price, salePrice, supplier, location, branch } = req.body;

        const newProduct = new Inventory({
            product,
            quantity,
            unit,
            expiryDate,
            price,
            salePrice,
            supplier,
            location,
            branch,
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully.', product: newProduct });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add product.' });
    }
};

// Search product by barcode
exports.searchByBarcode = async (req, res) => {
    try {
        const { barcodeID } = req.params;

        const product = await Inventory.findOne({ barcodeID });
        if (!product) return res.status(404).json({ message: 'Product not found.' });

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search product.' });
    }
};

// Generate barcode for a product
exports.generateBarcode = async (req, res) => {
    try {
        const { productID } = req.params;

        const product = await Inventory.findById(productID);
        if (!product) return res.status(404).json({ message: 'Product not found.' });

        const barcodeID = Barcode.generate(); // Generate a unique barcode
        product.barcodeID = barcodeID;

        await product.save();
        res.status(200).json({ message: 'Barcode generated.', barcodeID });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate barcode.' });
    }
};
