import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import financialRoutes from "./routes/financialRoutes.js";
import path from "path"; // Ensure you have imported the path module
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("Database connection established."))
  .catch((err) => console.error("MongoDB connection error:", err));

// API routes
app.use("/api/financial", financialRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../frontend/build")));

// The "catchall" handler: for any request that does not match the above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
