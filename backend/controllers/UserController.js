import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

import {
  registerValidation,
  loginValidation,
} from "../validation/validation.js";
import mongoose from "mongoose";
import { ROLES } from "../constants/RoleConstant.js";

export const register = async (req, res) => {
  try {
    // Validate data before creating a user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.message);

    // Check if user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
      return res.status(400).send({ msg: "Email already exists" });

    const phoneExist = await User.findOne({ phone: req.body.phone });
    if (phoneExist)
      return res.status(400).send({ msg: "phone already exists" });

    const employeeIdExist = await User.findOne({
      employeeId: req.body.employeeId,
    });

    if (employeeIdExist)
      return res.status(400).send({ msg: "employeeId already exists" });

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
      ...req.body,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    res.status(201).send({ user: user._id });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    // Validate data before creating a user
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error);

    // Check if user is already in the database
    if (
      req.body.email === process.env.ADMIN_EMAIL &&
      req.body.password === process.env.ADMIN_PASSWORD
    ) {
      const user = {
        _id: mongoose.Types.ObjectId('6396d3d161dd98d72a304647'),
        name: "admin",
        email: "admin@gmail.com",
        roles: ["admin"],
      };
      const token = jwt.sign({ user }, process.env.SECRET_KEY);
      res.user = user;
      res.header("Authorization", token).status(200).send({
        id: user._id,
        roles: user.roles[0],
        name: user.name,
        token: token,
        msg: "Logged In successfully",
      });
      return;
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ msg: "Email is not found" });

    // Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send({ msg: "Invalid password" });

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    res.user = { _id: user._id };
    res.header("Authorization", token).status(200).send({
      id: user._id,
      roles: user.roles[0],
      name: user.name,
      token: token,
      msg: "Logged In successfully",
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    users.forEach((user) => {
      user.password = undefined;
      user.__v = undefined;
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    user.password = undefined;
    user.__v = undefined;
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { employeeId, name, email, phone, department, roles } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No user with that id");
    // const phoneExist = await User.findOne({ phone: req.body.phone });
    // if (phoneExist)
      // return res.status(400).send({ msg: "phone already exists" });
    const updatedUser = {
      employeeId,
      name,
      email,
      phone,
      department,
      roles,
      _id: id,
    };
    await User.findByIdAndUpdate(id, updatedUser, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send({ msg: "No user with that id" });
    await User.findByIdAndRemove(id);
    res.json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.password = undefined;
    user.__v = undefined;
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateMe = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send({ msg: "User not found" });
    user.name = name;
    user.email = email;
    user.phone = phone;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send({ msg: "User not found" });
    const validPass = await bcrypt.compare(oldPassword, user.password);
    if (!validPass)
      return res.status(400).send({ msg: "Invalid Old password" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const search = async (req, res) => {
  try {
    const result = await User.find({
      $or: [
        { name: { $regex: req.params.key } },
        { employeeId: { $regex: req.params.key } },
        { email: { $regex: req.params.key } },
        { department: { $regex: req.params.key } },
        { roles: { $regex: req.params.key } },
      ],
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const sort = async (req, res) => {
  try {
    const sort = req.query.sort;
    const order = req.query.order;
    if (sort === "name") {
      const user = await User.find().sort({ name: 1 });
      user.sort((a, b) => {
        if (order === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
      res.status(200).send(user);
    }
    if (sort === "email") {
      const user = await User.find().sort({ email: 1 });
      user.sort((a, b) => {
        if (order === "asc") {
          return a.email.localeCompare(b.email);
        } else {
          return b.email.localeCompare(a.email);
        }
      });
      res.status(200).send(user);
    }
    if (sort === "roles") {
      const user = await User.find().sort({ roles: 1 });
      user.sort((a, b) => {
        if (order === "asc") {
          return a.roles[0].localeCompare(b.roles[0]);
        } else {
          return b.roles[0].localeCompare(a.roles[0]);
        }
      });
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getUsersByRoles = async (req, res) => {
  try {
    const usersByDeveloperRoles = await User.find({ roles: ROLES.DEVELOPER });
    const usersByHrRoles = await User.find({ roles: ROLES.HR });
    res.status(200).json({ usersByDeveloperRoles, usersByHrRoles });
  } catch (err) {
    res.status(400).send(err);
  }
};
