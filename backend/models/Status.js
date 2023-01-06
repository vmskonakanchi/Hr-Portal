import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Status", statusSchema);
