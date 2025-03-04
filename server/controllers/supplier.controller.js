const Supplier = require("../models/supplier.model");


exports.addSupplier = async (req, res) => {
    try {
        const { name, supplierID, contactDetails } = req.body;

        const newSupplier = new Supplier({
            name, 
            supplierID, 
            contactDetails
        });

        await newSupplier.save();
        res.status(201).json({ message: 'Supplier added successfully.', supplier: newSupplier });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add supplier.' });
    }
};

// list all suppliers
exports.listSuppliers = async (req, res) => {
    try {
        const supplier = await Supplier.find({}).populate({
            path: 'orders', // First populate orders
            populate: { path: 'products.product', select: 'product' } // Then populate product details
          })
          .lean(); // Converts Mongoose documents into plain JSON objects for efficiency
    
        if(supplier) {
            res.status(200).json({ message: 'Suppliers fetched successfully.', supplier: supplier });
        } else {
            res.status(404).json({ message: 'No supplier found on the database.' });
        }
    } catch (error) {
        res.send(error)
    }
}

// list a single supplier
exports.listSingleSupplier = async (req, res) => {
    try {
        const { name } = req.body;
        const supplier = await Supplier.findOne({name})
        if(supplier) {
            res.status(200).json({ message: 'Supplier fetched successfully.', supplier: supplier });
        } else {
            res.status(404).json({ message: 'No supplier found' });
        }
    } catch (error) {
        res.send(error)
    }
}