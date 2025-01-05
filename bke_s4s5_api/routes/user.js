import express from "express";
import {
  forgotPassword,
  loginUser,
  myProfile,
  register,
  resetPassword,
  verifyUser,
} from "../controllers/user.js";
import { isAuth } from "../middlewares/verifyToken.js";
import { addProgress, getProgress } from "../controllers/course.js";

const router = express.Router();

router.post("/user/register", register);
router.post("/user/verify", verifyUser);
router.post("/user/login", loginUser);
router.get("/user/myprofile", isAuth, myProfile);
router.post("/user/forgotpassword", forgotPassword);
router.post("/user/resetpassword", resetPassword);
router.post("/user/addprogress", isAuth, addProgress);
router.get("/user/getprogress", isAuth, getProgress);

export default router;
