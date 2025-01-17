import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    myFavorite: { type: Array },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
