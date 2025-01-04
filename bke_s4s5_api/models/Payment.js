import mongoose from "mongoose";

const schema = new mongoose.Schema({
  chapa_ref_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Payment = mongoose.model("Payment", schema);
