import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  seq: { type: Number, default: 0 },
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  phone: {
    type: String,
    required: true,
  },

  skills: {
    type: String,
    // required: true,
  },

  experience: {
    type: String,
    required: true,
    default: "0 Years",
  },
  qualification: {
    type: String,
    required: true,
  },

  developers: {
    type: String,
  },
  hrMembers: {
    type: String,
  },
  stages: {
    type: [],
  },
  stage: {
    type: String,
  },
  dStage: {
    type: Number,
    default: 3,
  },

  hrStage: {
    type: Number,
    default: 4,
  },

  comments: {
    type: String,
  },

  hrComments: {
    type: String,
  },

  developerComments: {
    type: String,
  },

  devStatus: {
    type: String,
    default: "Pending",
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  roles: {
    type: String,
  },

  updateDate: {
    type: Date,
    default: Date.now(),
  },
  date: {
    type: Date,
    default: Date.now,
  },

  source: {
    type: String,
    required: true,
  },

  recruiter: {
    type: String,
  },

  position: {
    type: String,
    // required: true,
  },

  location: {
    type: String,
    // required: true,
  },
  salary: {
    type: String,
    // required: true,
  },
  department: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    // required: true,
  },
});

export default mongoose.model("Candidate", candidateSchema);
