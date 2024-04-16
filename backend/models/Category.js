import mongoose from "mongoose";

// Define the schema for a Category
const categoryScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  icon: {
    type: String,
    required: true,
    default: "fa fa-icon",
  },
});

// Create and export the Category model based on the schema
const Category = mongoose.model("Category", categoryScheme);
export default Category;
