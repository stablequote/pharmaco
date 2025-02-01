const Sales = require('../models/sales.model');
const Inventory = require('../models/inventory.model');

// Make a sale
exports.makeSale = async (req, res) => {
    try {
        // const { productID, quantity, modeOfPayment, unitPrice, soldBy, branch } = req.body;
        const { name, barcodeID, unit, quantity, unitPurchasePrice, unitSalePrice, totalAmount, soldBy, modeOfPayment, branch, date, supplier } = req.body; // all details of inventory.poplulate('product supplier') + user.name + timestamps
        
        // Check product availability
        const product = await Inventory.findOne({ barcodeID });
        if (!product || product.quantity < quantity) {
            return res.status(400).json({ error: 'Insufficient stock or product not found.' });
        }

        // Deduct quantity from inventory
        product.quantity -= quantity;
        await product.save();

        // Create sale record
        const sale = new Sales({
            product: name,
            quantity,
            unitSalePrice,
            unitPurchasePrice,
            totalAmount: unitSalePrice * quantity,
            modeOfPayment,
            revenue: unitSalePrice * quantity - unitPurchasePrice * quantity,
            soldBy,
            branch,
            billID: `BILL-${Date.now()}`, // Generate unique bill ID
            date: Date.now()
        });

        await sale.save();
        res.status(201).json({ message: 'Sale successful.', sale });
    } catch (error) {
        res.status(500).json({ error: 'Failed to make sale.' });
        console.log(error)
    }
};

exports.listSales = async (req, res) => {
    try {
        const sales = await Sales.find({})
        return res.status(200).json({message: 'sales fetched successfully', sales})
    } catch (error) {
        console.log(error)
    }
}

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
