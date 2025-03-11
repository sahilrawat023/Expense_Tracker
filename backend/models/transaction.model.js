import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  descreption: {
    type: String,
    required: true,
  },
  paymenttype: {
    type: String,
    enum: ["cash", "card"],
    required: true,
  },
  cateogry: {
    type: String,
    enum: ["saving", "expense", "investment"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    default: "Unknown",
  },
  date: {
    type: Date,
    required: true,
  },
});
const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
