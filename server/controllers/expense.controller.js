const Expense = require('../models/expenses.model');

exports.createExpense = async (req, res) => {
    try {
        const { amount, description, category, paymentMethod  } = req.body;
        console.log(amount, description)

        const newExpense = new Expense({
            amount,
            description,
            category,
            paymentMethod
        })

        await newExpense.save();
        res.status(201).json({ message: "Expense created successfully", newExpense })
    } catch (error) {
        res.status(500).json({ error: "Failed to create expense" })
        console.log(error)
    }
}

exports.listSingleExpense = async (req, res) => {
    const { id } = req.params;

    try {
        const foundExpense = await Expense.findOneById(id)
        if(!foundExpense) {
            res.status(404).json({ message: "No expense found!" })
        } else {
            res.status(200).json({ message: "Expense found successfully!", foundExpense})
        }
    } catch (error) {
        
    }
}

exports.listAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({});
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Failed to list expenses.' });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    console.log(id)

    try {
        const foundExpense = Expense.findByIdAndDelete(id);
        if(!foundExpense) {
            res.status(404).json({ message: "No Expense found!" })
        } else {
            res.status(200).json({ message: "Expense successfully deleted!" })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete expense!" })
    }
}