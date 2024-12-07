import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    author: {
      type: String,
      required: [true, "author is required"],
    },
    isbn: {
      type: String,
      validate: {
        validator: function (v) {
          return /\d{5}/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid isbn number, it has to be 5 digits!`,
      },
      required: [true, "Isbn is required"],
      unique: true,
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    pubYear: {
      type: Number,
      required: [true, "published year is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Book", BookSchema);
