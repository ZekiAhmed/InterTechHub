import express from "express";
import {
  apiUsageGuide,
  bookRecommendation,
  deleteBook,
  favoriteBook,
  findAllBook,
  findBook,
  saveBook,
  updateBook,
} from "../controllers/book.controller.js";
import { verifyToken, verifyTokenAndAdmin } from "../middleware/verifyToken.js";

const router = express.Router();

// CREATE BOOK
router.post("/", verifyToken, saveBook);

// UPDATE BOOK
router.put("/:id", verifyToken, updateBook);

// DELETE BOOK
router.delete("/:id", verifyToken, deleteBook);

// GET BOOK
router.get("/", verifyToken, findBook);

// GET ALL BOOKS
router.get("/all", verifyTokenAndAdmin, findAllBook);

// GET SOME BOOK RECOMMENDATION
router.get("/recommendation", verifyToken, bookRecommendation);

// ADD BOOK AS FAVORITE
router.get("/favorite/:id", verifyToken, favoriteBook);

// API USAGE GUIDE
router.get("/guide", apiUsageGuide);

export default router;
