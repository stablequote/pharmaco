const Sales = require('../models/sales.model');
const Inventory = require('../models/inventory.model');

// Make a sale
exports.makeSale = async (req, res) => {
    try {
        // const { productID, quantity, modeOfPayment, unitPrice, soldBy, branch } = req.body;
        const { items, totalPaidAmount, soldBy, modeOfPayment, branch } = req.body; // all details of inventory.poplulate('product supplier') + user.name + timestamps
    
        console.log(items)
        // console.log(items.forEach(item => item.barcodeID))
        items.forEach(item => {
            console.log(item.barcodeID);
        });

        // NEW LOGIC TO CHECK ALL ITEMS AGAINST DATABASE IF THEY EXIST
        if (!items || items.length === 0) {
            return res.status(400).json({ message: "No items provided in the request." });
        }
      
        // Step 1: Check if all items exist in inventory and have sufficient stock
        const unavailableItems = [];
        const validatedItems = [];
    
        for (const item of items) {
        const inventoryItem = await Inventory.findOne({ barcodeID: item.barcodeID });
        console.log(inventoryItem.quantity)
        console.log(inventoryItem.product)
    
        if (!inventoryItem) {
            unavailableItems.push(`${item.product} is not available in inventory.`);
        } else if (inventoryItem.quantity < item.quantity) {
            unavailableItems.push(`${item.product} only has ${inventoryItem.quantity} in stock, but ${item.quantity} was requested.`)
        } else {
            // Prepare stock update
            // validatedItems.push({
            // barcodeID: inventoryItem.barcodeID,
            // newStock: inventoryItem.quantity - item.quantity
            // })
            
            // bug fix ==> deepseek
            validatedItems.push({
                ...item, // Include all fields from the original item
                barcodeID: inventoryItem.barcodeID,
                newStock: inventoryItem.quantity - item.quantity,
            });
        }
        }

        // Step 2: If any item is unavailable, return an error
        if (unavailableItems.length > 0) {
            return res.status(400).json({ message: "Stock error", errors: unavailableItems });
        }

        // Step 3: Deduct stock in inventory
        // for (const update of validatedItems) {
        //     await Inventory.updateOne({ barcodeID: update.barcodeID }, { quantity: update.newStock });
        // }

        // Update product stock ==> deepseek
        for (const item of validatedItems) {
            await Inventory.updateOne({ barcodeID: item.barcodeID },{ $inc: { quantity: -item.quantity } }) // Decrease stock by the sold quantity
        }

        // Calculate total cart amount & revenue
        const totalCartAmount = validatedItems.reduce((total, product) => total + product.quantity * product.unitSalePrice, 0);
        const totalCartPaidAmount = validatedItems.reduce((total, product) => total + product.quantity * product.unitSalePrice, 0);
        const cartRevenue = validatedItems.reduce((total, product) => total + (product.quantity * product.unitSalePrice) - (product.quantity * product.unitPurchasePrice), 0);

        // Format validatedItems with necessary calculations
        const formattedItems = validatedItems.map(item => ({
            product: item.product,
            quantity: item.quantity,
            unit: item.unit,
            unitPurchasePrice: item.unitPurchasePrice,
            unitSalePrice: item.unitSalePrice,
            totalUnitAmount: item.unitSalePrice * item.quantity,
            unitRevenue: (item.unitSalePrice - item.unitPurchasePrice) * item.quantity,
        }));

        console.log("formatted items...", formattedItems)

        // Generate unique bill ID
        // const billID = `BILL-${Date.now()}`;
        const billID = `BILL-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
        const receiptNumber = `REC-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
        
        // Save to Sales collection
        const newSale = new Sales({
            billID,
            receiptNumber,
            date: Date.now(),
            modeOfPayment,
            soldBy,
            branch,
            totalCartAmount,
            totalPaidAmount,
            cartRevenue,
            items: formattedItems,
        });

        await newSale.save();
        console.log(newSale)

        res.status(201).json({ message: 'Sale successful.', newSale });
    } catch (error) {
        res.status(500).json({ error: 'Failed to make sale.' });
        console.log(error)
    }













        // ######################## OLD LOGIC DOWN HERE ########################

        // Check product availability
        // const inventory = await Inventory.findOne({ barcodeID });
        // if (!inventory || inventory.quantity < quantity) {
        //     return res.status(400).json({ error: 'Insufficient stock or product not found.' });
        // }

        // // Deduct quantity from inventory
        // inventory.quantity -= quantity;
        // await inventory.save();

    //     // Create sale record
    //     const sale = new Sales({
    //         name: item.name,
    //         quantity: item.quantity,
    //         unit: item.unit,
    //         unitSalePrice: item.unitSalePrice,
    //         unitPurchasePrice: item.unitPurchasePrice,
    //         totalUnitAmount: item.unitSalePrice * quantity,
    //         unitRevenue: unitSalePrice * quantity - unitPurchasePrice * quantity,
    //         totalCartAmount: item.reduce((total, product) => total + product.quantity * product.unitSalePrice, 0),
    //         cartRevenue: item.reduce((total, product) => total + (product.quantity * product.unitSalePrice) - (product.quantity * product.unitPurchasePrice), 0) ,
    //         modeOfPayment,
    //         soldBy,
    //         branch,
    //         billID: `BILL-${Date.now()}`, // Generate unique bill ID
    //         date: Date.now()
    //     });

    //     await sale.save();
    //     res.status(201).json({ message: 'Sale successful.', sale });
    // } catch (error) {
    //     res.status(500).json({ error: 'Failed to make sale.' });
    //     console.log(error)
    // }
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

// Helper function to get the start and end of the day
const getStartAndEndOfDay = () => {
    const start = new Date();
    start.setHours(0, 0, 0, 0); // Start of the day
    const end = new Date();
    end.setHours(23, 59, 59, 999); // End of the day
    return { start, end };
};
  
// Helper function to get the start and end of the week
const getStartAndEndOfWeek = () => {
    const start = new Date();
    start.setDate(start.getDate() - start.getDay()); // Start of the week (Sunday)
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setDate(end.getDate() + (6 - end.getDay())); // End of the week (Saturday)
    end.setHours(23, 59, 59, 999);
    return { start, end };
};
  
// Helper function to get the start and end of the month
const getStartAndEndOfMonth = () => {
    const start = new Date();
    start.setDate(1); // Start of the month
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setMonth(end.getMonth() + 1, 0); // End of the month
    end.setHours(23, 59, 59, 999);
    return { start, end };
};

// Calculate total sales for today
exports.getTotalNumberOfSalesToday = async (req, res) => {
    try {
      const { start, end } = getStartAndEndOfDay();
      
      const totalSalesCount = await Sales.countDocuments({
        createdAt: { $gte: start, $lte: end } // Count sales created today
      });
  
      res.status(200).json({ totalSalesCount });
    } catch (error) {
      console.error("Error fetching total number of sales for today:", error);
      res.status(500).json({ message: "Error fetching total number of sales for today" });
    }
  };

// Calculate total sales for this week
exports.getTotalSalesThisWeek = async (req, res) => {
    try {
      const { start, end } = getStartAndEndOfWeek();
      const totalSales = await Sales.aggregate([
        {
          $match: {
            createdAt: { $gte: start, $lte: end },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$totalAmount" },
          },
        },
      ]);
      res.status(200).json({ totalSales: totalSales[0]?.total || 0 });
    } catch (error) {
      res.status(500).json({ message: "Error fetching total sales for this week" });
    }
};

// Calculate total sales for this month
exports.getTotalSalesThisMonth = async (req, res) => {
    try {
      const { start, end } = getStartAndEndOfMonth();
      const totalSales = await Sales.aggregate([
        {
          $match: {
            createdAt: { $gte: start, $lte: end },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$totalAmount" },
          },
        },
      ]);
      res.status(200).json({ totalSales: totalSales[0]?.total || 0 });
    } catch (error) {
      res.status(500).json({ message: "Error fetching total sales for this month" });
    }
};

// Calculate total sales for today
exports.getTotalSalesRevenueToday = async (req, res) => {
    try {
      const { start, end } = getStartAndEndOfDay();
      const totalSalesRevenueToday = await Sales.aggregate([
        {
          $match: {
            createdAt: { $gte: start, $lte: end },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$cartRevenue" }, // Replace "totalAmount" with your sales amount field
          },
        },
      ]);
      res.status(200).json({ totalSalesRevenueToday: totalSalesRevenueToday[0]?.total || 0 });
    } catch (error) {
      res.status(500).json({ message: "Error fetching total sales revenue for today" });
    }
};