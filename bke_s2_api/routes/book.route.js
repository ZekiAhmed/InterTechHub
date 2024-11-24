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

// UPDATE BOOK
router.put("/:id", async (req, res) => {
  try {
    const updatedBook = await bookModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: { updatedBook },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
});

// DELETE BOOK
router.delete("/:id", async (req, res) => {
  try {
    await bookModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Book has been deleted...",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
});

// GET BOOK
router.get("/find/:id", async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: { book },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
});

export default router;
