import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//REGISTER
export const register = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: bcrypt.hash(req.body.password, 10).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

//LOGIN
export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    !user && res.status(401).json("wrong credentials!");

    const isPasswordValid = bcrypt.compare(req.body.password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};
