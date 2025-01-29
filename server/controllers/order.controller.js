const Order = require('../models/order.model');
const Inventory = require('../models/inventory.model');

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
addOrderToInventory("65f1b9e89f6e3a001f8b5678"); // Replace with actual order ID
