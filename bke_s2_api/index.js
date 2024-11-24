import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
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
app.use("/api/books", bookRoute);
app.use("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message1: `localhost:3000/api/books/ --- TO GET ALL BOOKS -- WORKS ON WEB.`,
    message2: `localhost:3000/api/books/67428b3b402ec7a16d62eb65 --- TO UPDATE BOOK -- WORKS ONLY ON POSTMAN`,
    message3: `localhost:3000/api/books/67428b3b402ec7a16d62eb65 --- TO DELETE BOOK -- WORKS ON WEB`,
    message4: `localhost:3000/api/books/find/67428ae1402ec7a16d62eb5a --- TO FIND A BOOK -- WORKS ON WEB`,
    message5: `localhost:3000/api/books/recommendation --- GIVES YOU 2 RECOMMENDED BOOKS -- WORKS ON WEB`,
    message6: `localhost:3000/api/books/favorite/67428afb402ec7a16d62eb5c --- MAKE A BOOK FAVORITE -- WORKS ON WEB`,
    message7: `localhost:3000/api/books/ ------ TO SAVE BOOK -- WORKS ONLY ON POSTMAN`,
  });
});

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on the server!!. Try this route '/api/books/guide'.`,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Backend Server is runing`);
});
