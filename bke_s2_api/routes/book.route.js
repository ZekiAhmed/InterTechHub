import express from "express";
import bookModel from "../models/book.model.js";

const router = express.Router();

// CREATE BOOK
router.post("/", async (req, res) => {
  const newBook = new bookModel(req.body);
  try {
    const savedBook = await newBook.save();
    res.status(201).json({
      status: "success",
      data: { savedBook },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
});

export default router;
