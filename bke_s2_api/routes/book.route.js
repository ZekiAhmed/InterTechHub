import express from "express";
import bookModel from "../models/book.model.js";
import {
  bookRecommendation,
  deleteBook,
  favoriteBook,
  findAllBook,
  findBook,
  saveBook,
  updateBook,
} from "../controllers/book.controller.js";

const router = express.Router();

// CREATE BOOK
router.post("/", saveBook);

// UPDATE BOOK
router.put("/:id", updateBook);

// DELETE BOOK
router.delete("/:id", deleteBook);

// GET BOOK
router.get("/find/:id", findBook);

// GET ALL BOOKS
router.get("/", findAllBook);

// GET SOME BOOK RECOMMENDATION
router.get("/recommendation", bookRecommendation);

// ADD BOOK AS FAVORITE
router.post("/favorite/:id", favoriteBook);

export default router;
