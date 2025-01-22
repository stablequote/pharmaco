const mongoose = require('mongoose');

const supplierSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    contactDetails: {
        phone: String,
        email: String,
        location: String,
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order', // Relates to the Order Schema
        },
    ],
});

module.exports = mongoose.model('Supplier', supplierSchema);