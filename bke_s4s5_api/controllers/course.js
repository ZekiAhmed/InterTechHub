import { chapa } from "../index.js";
import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import { User } from "../models/User.js";
import Questions from "../models/Question.js";
import Results from "../models/Result.js";
import { Payment } from "../models/Payment.js";

export const getAllCourses = TryCatch(async (req, res) => {
  const courses = await Courses.find();
  res.json({
    courses,
  });
});

export const getSingleCourse = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);

  res.json({
    course,
  });
});

export const fetchLectures = TryCatch(async (req, res) => {
  const lectures = await Lecture.find({ course: req.params.id });

  const user = await User.findById(req.user._id);

  if (user.role === "admin") {
    return res.json({ lectures });
  }

  if (!user.subscription.includes(req.params.id))
    return res.status(400).json({
      message: "You have not subscribed to this course",
    });

  res.json({ lectures });
});

export const fetchLecture = TryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  const user = await User.findById(req.user._id);

  if (user.role === "admin") {
    return res.json({ lecture });
  }

  if (!user.subscription.includes(lecture.course))
    return res.status(400).json({
      message: "You have not subscribed to this course",
    });

  res.json({ lecture });
});

export const getMyCourses = TryCatch(async (req, res) => {
  const courses = await Courses.find({ _id: req.user.subscription });

  res.json({
    courses,
  });
});

/** get all questions */
export async function getQuestions(req, res) {
  try {
    const q = await Questions.find({ testname: req.params.id });
    res.json(q);
  } catch (error) {
    res.json({ error });
  }
}

/** post all result */
export async function storeResult(req, res) {
  try {
    const { result, attempts, points, achived } = req.body;
    if (!result) throw new Error("Data Not Provided...!");

    Results.create({
      username: req.user.firstName,
      testname: req.params.id,
      result,
      attempts,
      points,
      achived,
    });
    res.json({ msg: "Result Saved Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
}

/** get all result */
export async function getResult(req, res) {
  try {
    const r = await Results.find({ testname: req.params.id });
    res.json(r);
  } catch (error) {
    res.json({ error });
  }
}

/** delete all result */
export async function dropResult(req, res) {
  try {
    await Results.deleteMany({ testname: req.params.id });
    res.json({ msg: "Result Deleted Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
}

let tx_ref;

export const checkout = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);

  const course = await Courses.findById(req.params.id);

  if (user.subscription.includes(course._id)) {
    return res.status(400).json({
      message: "You already have this course",
    });
  }

  tx_ref = await chapa.genTxRef();
  const amount = Number(course.price);
  const options = {
    first_name: user.firstName,
    last_name: user.lastName,
    email: user.email,
    phone_number: user.phoneNumber,
    currency: "ETB",
    amount: amount,
    tx_ref: tx_ref,
    callback_url: "https://example.com/",
    return_url: "https://example.com/",
    customization: {
      title: "Test Title",
      description: "Test Description",
    },
  };

  const order = await chapa.initialize(options);

  res.status(201).json({
    order,
    course,
  });
});

export const paymentVerification = TryCatch(async (req, res) => {
  //const response = await chapa.getTransactions();
  const user = await User.findById(req.user._id);
  const isAuthentic = await chapa.verify({
    tx_ref: tx_ref,
  });
  if (isAuthentic) {
    await Payment.create({
      chapa_ref_id: isAuthentic.data.reference,
      user_id: user._id,
    });
    const course = await Courses.findById(req.params.id);
    user.subscription.push(course._id);
    await user.save();
    res.status(200).json({
      message: "Course Purchased Successfully",
    });
  } else {
    return res.status(400).json({
      message: "Payment Failed",
    });
  }
});
