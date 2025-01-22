const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    role: {
        type: String,
        enum: ['owner', 'manager', 'staff'], // Define roles for the users
        default: 'staff',
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch', // Links users to their branch
        required: function () {
            return this.role !== 'owner'; // Only non-owners need a branch
        },
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
    contactDetails: {
        phone: String,
        email: String,
        location: String,
    },
    password: {
        type: String,
        required: true,
    },
    sales: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sales', // Links to the sales made by the user
        },
    ],
});

module.exports = mongoose.model('User', userSchema);
