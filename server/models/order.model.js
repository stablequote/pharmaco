const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderID: {
        type: String,
        unique: true,
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    quantity: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    manufacturer: {
        type: String,
        required: true,
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier', // Relates to the Supplier Schema
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory', // Links the order to a product in inventory
        required: true,
    },
    unitPrice: {
        type: Number,
        required: true,
    },
    deliveryEstimation: {
        type: Date,
        required: false,
    },
    orderedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Links the order to a user
        required: true,
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch', // Links the order to a specific branch
        required: true,
    },
});

module.exports = mongoose.model('Order', orderSchema);