const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderID: {
        type: String,
        unique: true,
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Links the order to a product in inventory
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    supplier: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    }, // Supplier per order
    unitPurchasePrice: {
        type: Number,
        required: true,
    },
    totalOrderPrice: {
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
}, {timestamps: true});

module.exports = mongoose.model('Order', orderSchema);