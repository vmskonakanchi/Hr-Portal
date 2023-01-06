import mongoose from "mongoose";

const departmentsSchema = new mongoose.Schema({
  departments: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Departments", departmentsSchema);
