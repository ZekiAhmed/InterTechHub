import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import bookRoute from "./routes/book.route.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

// Database Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/books", bookRoute);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `GO TO THIS ROUTE '/api/books/guide'.`,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Backend Server is runing`);
});
