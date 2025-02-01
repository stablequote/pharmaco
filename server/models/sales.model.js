const mongoose = require('mongoose');

const salesSchema = mongoose.Schema({
    name: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Inventory', // Links the sale to a product in inventory
        type: String,
        // required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    modeOfPayment: {
        type: String,
        enum: ['cash', 'bankak', 'fawry'], // Example payment methods
        // required: true,
    },
    unitSalePrice: {
        type: Number,
        // required: true,
    },
    unitPurchasePrice: {
        type: Number,
        // required: true,
    },
    totalAmount: {
        type: Number,
        // required: true,
    },
    barcodeID: {
        type: String,
        // required: true,
    },
    quantity: {
        type: Number,
        // required: true,
    },
    billID: {
        type: String,
        unique: true,
        // required: true,
    },
    transactionID: {
        type: String,
        required: false,
    },
    soldBy: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'User', // Links the sale to the staff who made it
        type: String,
        // required: true,
    },
    branch: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Branch', // Links the sale to a specific branch
        type: String,
        // required: true,
    },
    paymentVerified: {
        type: Boolean,
        default: false,
    },
    receiptNumber: {
        type: String,
        required: false,
        unique: true,
    },
});

module.exports = mongoose.model('Sales', salesSchema);