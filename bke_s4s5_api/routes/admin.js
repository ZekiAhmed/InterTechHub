import express from "express";
import { verifyTokenAndAdmin } from "../middlewares/verifyToken.js";
import {
  addLectures,
  createCourse,
  deleteCourse,
  deleteLecture,
  dropQuestions,
  getAllStats,
  getAllUser,
  insertQuestions,
  updateRole,
} from "../controllers/admin.js";
import { uploadFiles } from "../middlewares/multer.js";

const router = express.Router();

router.post("/course/new", verifyTokenAndAdmin, uploadFiles, createCourse);
router.post("/course/:id", verifyTokenAndAdmin, uploadFiles, addLectures);
router.delete("/course/:id", verifyTokenAndAdmin, deleteCourse);
router.delete("/lecture/:id", verifyTokenAndAdmin, deleteLecture);
router.post("/insertquestions/:id", verifyTokenAndAdmin, insertQuestions);
router.delete("/dropquestions/:id", verifyTokenAndAdmin, dropQuestions);
router.get("/stats", verifyTokenAndAdmin, getAllStats);
router.put("/user/:id", verifyTokenAndAdmin, updateRole);
router.get("/users", verifyTokenAndAdmin, getAllUser);

export default router;
