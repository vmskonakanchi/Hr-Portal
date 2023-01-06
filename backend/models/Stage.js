import mongoose from "mongoose";

const stageSchema = new mongoose.Schema({
  stage: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  comments: {
    type: String,
    // required: true,
  },
  hrMembers: {
    type: String,
    // required: true
  },
  developers: {
    type: String,
    // required: true
  },
  roles: {
    type: Array,
    required: true,
    // default: [ROLES.USER],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Stage", stageSchema);
