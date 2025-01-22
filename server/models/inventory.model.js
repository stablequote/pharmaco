const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
    product: {
        type: String,
        required: true, // Name of the product
    },
    quantity: {
        type: Number,
        required: true,
    },
    unit: {
        type: String, // Smallest measurable unit (e.g., tablet, ml)
        required: true,
    },
    expiryDate: {
        type: Date,
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
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier', // Links each product to its supplier
        required: true,
    },
    location: {
        shelf: String, // Specifies where the product is stored
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch', // Links the inventory to a specific branch
        required: true,
    },
});

module.exports = mongoose.model('Inventory', inventorySchema);