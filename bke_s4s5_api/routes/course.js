import express from "express";
import {
  getAllCourses,
  getSingleCourse,
  fetchLectures,
  fetchLecture,
  getMyCourses,
  checkout,
  paymentVerification,
  getResult,
  storeResult,
  dropResult,
  getQuestions,
} from "../controllers/course.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/course/all", getAllCourses);
router.get("/course/:id", getSingleCourse);
router.get("/lectures/:id", verifyToken, fetchLectures);
router.get("/lecture/:id", verifyToken, fetchLecture);
router.get("/mycourse", verifyToken, getMyCourses);
router.get("/getquestions/:id", verifyToken, getQuestions);
router.post("/storeresult/:id", verifyToken, storeResult);
router.get("/getresult/:id", verifyToken, getResult);
router.delete("/dropresult/:id", verifyToken, dropResult);
router.post("/course/checkout/:id", verifyToken, checkout);
router.post("/verification/:id", verifyToken, paymentVerification);

export default router;
