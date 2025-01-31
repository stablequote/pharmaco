const Order = require('../models/order.model');
const Inventory = require('../models/inventory.model');

// @desc   Create a new order
// @route  POST /api/orders
// @access Public
exports.createOrder = async (req, res) => {
    try {
        const { product, supplier, quantity, expiryDate, status } = req.body;

        const order = new Order({ product, supplier, quantity, expiryDate, status });
        await order.save();

        res.status(201).json({ success: true, message: 'Order created successfully', order });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// @desc   Get all orders
// @route  GET /api/orders
// @access Public
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('product supplier');
        res.status(200).json({ success: true, count: orders.length, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// @desc   Get a single order by ID
// @route  GET /api/orders/:id
// @access Public
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('product supplier');
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.status(200).json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// @desc   Update an order
// @route  PUT /api/orders/:id
// @access Public
exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('product supplier');
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.status(200).json({ success: true, message: 'Order updated successfully', order });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// @desc   Delete an order
// @route  DELETE /api/orders/:id
// @access Public
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.status(200).json({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// @desc   Cancel an order (only if it's pending)
// @route  PUT /api/orders/:id/cancel
// @access Public
exports.cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        if (order.status !== 'pending') {
            return res.status(400).json({ success: false, message: 'Only pending orders can be canceled' });
        }

        order.status = 'canceled';
        await order.save();

        res.status(200).json({ success: true, message: 'Order canceled successfully', order });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

exports.addOrderToInventory = async (req, res) => {
    const { orderId } = req.params;
    try {
        // Find the order by ID
        const order = await Order.findById(orderId).populate('product supplier');

        if (!order) {
            res.status(404).json({ error: 'Order not found.' });
        }

        // if (order.status !== "Pending") {
        //     throw new Error("Order is still pending...");
        // }

        // Check if the inventory has the same product with the same expiry date
        const existingInventory = await Inventory.findOne({
            product: order.product.barcodeID,
            expiryDate: order.expiryDate
        });

        if (existingInventory) {
            // Update the quantity of the existing inventory record
            existingInventory.quantity += order.quantity;
            await existingInventory.save();
            console.log("Updated existing inventory quantity.");
            res.status(201).json({ message: 'Updated existing inventory quantity.', orderToInventory: existingInventory });
        } else {
            // Create a new inventory record
            const newInventory = new Inventory({
                product: order.product._id,
                quantity: order.quantity,
                unit: order.unit,
                expiryDate: order.expiryDate,
                price: 0, // Can be updated later
                salePrice: 0, // Can be updated later
                supplier: order.supplier._id,
                shelf: '' // Can be updated later
            });

            await newInventory.save();
            res.status(201).json({ message: 'New inventory entry created.', newInventory: newInventory });
        }

        // Mark order as received
        order.status = "Received";
        order.receivedAt = new Date();
        
        await order.save();
        res.status(200).json({ message: 'Order marked as received.' });
    } catch (error) {
        res.status(500).json({ error: 'Error processing order:' });
    }
};


// Example usage
// addOrderToInventory("65f1b9e89f6e3a001f8b5678"); // Replace with actual order ID