import express from "express";
import { isAdmin, isAuth } from "../middlewares/verifyToken.js";
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

router.post("/course/new", isAuth, isAdmin, uploadFiles, createCourse);
router.post("/course/:id", isAuth, isAdmin, uploadFiles, addLectures);
router.delete("/course/:id", isAuth, isAdmin, deleteCourse);
router.delete("/lecture/:id", isAuth, isAdmin, deleteLecture);
router.post("/insertquestions/:id", isAuth, isAdmin, insertQuestions);
router.delete("/dropquestions/:id", isAuth, isAdmin, dropQuestions);
router.get("/stats", isAuth, isAdmin, getAllStats);
router.put("/user/:id", isAuth, isAdmin, updateRole);
router.get("/users", isAuth, isAdmin, getAllUser);

export default router;
