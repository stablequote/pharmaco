const Sales = require('../models/sales.model');
const Inventory = require('../models/inventory.model');

// Make a sale
exports.makeSale = async (req, res) => {
    try {
        const { productID, quantity, modeOfPayment, unitPrice, soldBy, branch } = req.body;

        // Check product availability
        const product = await Inventory.findById(productID);
        if (!product || product.quantity < quantity) {
            return res.status(400).json({ error: 'Insufficient stock or product not found.' });
        }

        // Deduct quantity from inventory
        product.quantity -= quantity;
        await product.save();

        // Create sale record
        const sale = new Sales({
            product: productID,
            quantity,
            modeOfPayment,
            unitPrice,
            totalAmount: unitPrice * quantity,
            soldBy,
            branch,
            billID: `BILL-${Date.now()}`, // Generate unique bill ID
        });

        await sale.save();
        res.status(201).json({ message: 'Sale successful.', sale });
    } catch (error) {
        res.status(500).json({ error: 'Failed to make sale.' });
    }
};

// Generate receipt
exports.generateReceipt = async (req, res) => {
    try {
        const { billID } = req.params;

        const sale = await Sales.findOne({ billID }).populate('product soldBy branch');
        if (!sale) return res.status(404).json({ message: 'Sale not found.' });

        const receipt = {
            billID: sale.billID,
            date: sale.dateTime,
            product: sale.product.product,
            quantity: sale.quantity,
            totalAmount: sale.totalAmount,
            soldBy: sale.soldBy.name,
            branch: sale.branch.name,
        };

        res.status(200).json(receipt);
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate receipt.' });
    }
};
