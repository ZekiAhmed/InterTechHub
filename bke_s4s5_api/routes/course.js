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
import { isAuth } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/course/all", getAllCourses);
router.get("/course/:id", getSingleCourse);
router.get("/lectures/:id", isAuth, fetchLectures);
router.get("/lecture/:id", isAuth, fetchLecture);
router.get("/mycourse", isAuth, getMyCourses);
router.get("/getquestions/:id", isAuth, getQuestions);
router.post("/storeresult/:id", isAuth, storeResult);
router.get("/getresult/:id", isAuth, getResult);
router.delete("/dropresult/:id", isAuth, dropResult);
router.post("/course/checkout/:id", isAuth, checkout);
router.post("/verification/:id", isAuth, paymentVerification);

export default router;
