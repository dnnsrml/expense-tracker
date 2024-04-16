import mongoose from "mongoose";

// define tthe schema for an expense
const expenseSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  amount: {
    type: Number,
    required: true,
    min: 0,
  },

  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

// Create and export the Expense model based on the schema
const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
