import mongoose from "mongoose";
import Status from "../models/Status.js";

// Create a new Status    
export const register = async (req, res) => {
  try {
    const status = await Status.findOne({
      status: req.body.status,
    });
    if (status)
      return res.status(400).send({ msg: "Status already exists" });

    const newStatus = new Status({
      ...req.body,
      status: req.body.status,
    });
    const savedStatus = await newStatus.save();
    res.status(201).send(savedStatus);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get All Status
export const getAllStatus = async (req, res) => {
  try {
    const status = await Status.find();

    res.status(200).json(status);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get Status By Id
export const getStatus = async (req, res) => {
  try {
    const status = await Status.findById(req.params.id);
    res.send(status);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Update Status By ID
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No Status with that id");
    const status = {
      ...req.body,
      status: req.body.status,
    };
    await Status.findByIdAndUpdate(id, status, { new: true });
    res.json(status);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete Status By ID
export const deleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send({ msg: "No Status with that id" });
    await Status.findByIdAndRemove(id);
    res.json({ msg: "Status deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
