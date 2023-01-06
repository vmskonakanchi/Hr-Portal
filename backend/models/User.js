import mongoose from "mongoose";
import { ROLES } from "../constants/RoleConstant.js";

const userSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  roles: {
    type: Array,
    required: true,
    // default: [ROLES.USER],
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  name: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  department: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", userSchema);
