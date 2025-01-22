const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory', // Links the sale to a product in inventory
        required: true,
    },
    dateTime: {
        type: Date,
        default: Date.now,
    },
    modeOfPayment: {
        type: String,
        enum: ['cash', 'mobile', 'credit'], // Example payment methods
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    unitPrice: {
        type: Number,
        required: true,
    },
    barcodeID: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    billID: {
        type: String,
        unique: true,
        required: true,
    },
    transactionID: {
        type: String,
        required: false,
    },
    soldBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Links the sale to the staff who made it
        required: true,
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch', // Links the sale to a specific branch
        required: true,
    },
    paymentVerified: {
        type: Boolean,
        default: false,
    },
    receiptNumber: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('Sales', salesSchema);