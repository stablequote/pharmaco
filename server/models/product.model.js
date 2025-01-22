const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    barcodeID: {
        type: String,
        unique: true,
        required: true,
    },
    manufacturer: {
        type: String,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    supplier: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    salePrice: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    dose: {
        type: String, // e.g., "500mg" or "1 tablet"
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    unit: {
        type: String, // Smallest unit like "tablet" or "ml"
        required: true,
    },
    shelf: {
        type: String, // Location where the product is stored
        required: true,
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
    dateUpdated: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
        required: false,
    },
    prescription: {
        type: Boolean, // Whether a prescription is required
        required: true,
    },
    image: {
        type: String, // URL of the product image
        required: false,
    },
});

module.exports = mongoose.model('Product', productSchema);