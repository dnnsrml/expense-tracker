import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import financialRoutes from "./routes/financialRoutes.js";

// Load environment variables from .env file
dotenv.config();

// create an instance of express
const app = express();

// define a port to run the server on
const PORT = process.env.PORT || 5000;

// middleware config
app.use(cors()); // enable all cors requests
app.use(express.json()); // parse json bodies as sent by API clients

// connect to MONGODB using connection string in environment var
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection established."))
  .catch((err) => console.error("MONGO connection error:", err));

// routes setup
app.use("/", financialRoutes);

// start the server and listen on the defined PORT
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
