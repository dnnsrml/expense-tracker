import express from "express";
import Expense from "../models/Expense.js";
import Category from "../models/Category.js";

// Create a router object from Express
const router = express.Router();

// Helper function to map month numbers to names
const getMonthName = (index) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[index];
};

// GET endpoint to fetch all categories with the total amount spent in each for the current month
router.get("/categories/monthly-totals", async (req, res) => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  try {
    // First, aggregate all categories with potential totals
    const categoriesWithTotals = await Category.aggregate([
      {
        $lookup: {
          from: Expense.collection.name,
          let: { categoryId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$category", "$$categoryId"] },
                    { $gte: ["$date", firstDayOfMonth] },
                    { $lt: ["$date", lastDayOfMonth] },
                  ],
                },
              },
            },
            {
              $group: {
                _id: "$category",
                totalAmount: { $sum: "$amount" },
              },
            },
          ],
          as: "expenses",
        },
      },
      {
        $unwind: {
          path: "$expenses",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 0,
          categoryId: "$_id",
          categoryName: "$name",
          categoryIcon: "$icon",
          totalAmount: { $ifNull: ["$expenses.totalAmount", 0] },
        },
      },
    ]);

    if (categoriesWithTotals.length === 0) {
      return res.status(404).send("No categories found!");
    }
    res.json(categoriesWithTotals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET endpoint to fetch all categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST endpoint to add a new expense to a category
router.post("/add-expense", async (req, res) => {
  const { category, amount, date } = req.body;

  // validate the input
  if (!category) {
    return res.status(400).json({ message: "Category required" });
  } else if (!amount) {
    return res.status(400).json({ message: "Amount required" });
  }

  try {
    // check if category exist
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found!" });
    }

    // if category exists, proceed to create the new expense
    const newExpense = new Expense({
      category,
      amount,
      date: date ? new Date(date) : new Date(),
    });

    await newExpense.save();
    return res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET endpoint to fetch the total of all expenses for the current month
router.get("/expenses/total-current-month", async (req, res) => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  try {
    const result = await Expense.aggregate([
      {
        $match: {
          date: {
            $gte: firstDayOfMonth,
            $lte: lastDayOfMonth,
          },
        },
      },
      {
        $group: {
          _id: null, // Grouping without any specific condition
          totalAmount: { $sum: "$amount" }, // Summing up the 'amount' field
        },
      },
    ]);

    // Send the total amount as the response, defaulting to 0 if no expenses are found
    res.json({ total: result.length > 0 ? result[0].totalAmount : 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST endpoint to add a new category
router.post("/add-category", async (req, res) => {
  const { name, icon } = req.body;

  // check if category name is not blank
  if (!name) {
    return res.status(400).json({ message: "Category name is required!" });
  }

  try {
    // check if category already exists
    const existingCategory = await Category.findOne({ name: name });
    if (existingCategory) {
      return res.status(409).json({ message: "Category already exists!" });
    }

    // create a new category and save it to the database
    const newCategory = new Category({ name, icon });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to update a category by ID
router.put("/categories/:id", async (req, res) => {
  const { id } = req.params;
  const { name, icon } = req.body;

  try {
    // Find the category by ID and update it
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, icon },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).send({ message: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    // If there's an error in the request (e.g., validation error)
    res.status(400).send({ message: error.message });
  }
});

// DELETE endpoint to remove all expenses
router.delete("/expenses", async (req, res) => {
  try {
    // Delete all documents from the Expense collection
    const result = await Expense.deleteMany({});
    res.status(200).json({
      message: "All expenses have been deleted",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to fetch monthly totals for the current month and the previous three months, including zeros for no expenses
router.get("/expenses/monthly-totals", async (req, res) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // zero-based index

  const results = [];

  try {
    // Loop to cover the current month and the previous three months
    for (let i = 0; i < 4; i++) {
      const month = (currentMonth - i + 12) % 12;
      const year = month > currentMonth ? currentYear - 1 : currentYear;

      const totalAmount = await Expense.aggregate([
        {
          $match: {
            date: {
              $gte: new Date(year, month, 1),
              $lt: new Date(
                month === 11 ? year + 1 : year,
                (month + 1) % 12,
                1
              ),
            },
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amount" },
          },
        },
      ]);

      results.push({
        month: getMonthName(month),
        total: totalAmount.length > 0 ? totalAmount[0].totalAmount : 0,
      });
    }

    results.reverse(); // Reverse to show the months in chronological order

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
