import mongoose from "mongoose";
import Departments from "../models/Departments.js";

// Create a new Departments    
export const register = async (req, res) => {
  try {
    const department = await Departments.findOne({
      departments: req.body.departments,
    });
    if (department)
      return res.status(400).send({ msg: "Department already exists" });

    const newDepartment = new Departments({
      ...req.body,
      departments: req.body.departments,
    });
    const savedDepartment = await newDepartment.save();
    res.status(201).send(savedDepartment);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get All Departments
export const getAllDepartments = async (req, res) => {
  try {
    const department = await Departments.find();

    res.status(200).json(department);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get Department By Id
export const getDepartment = async (req, res) => {
  try {
    const department = await Departments.findById(req.params.id);
    res.send(department);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Update Departments By ID
export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No Departments with that id");
    const department = {
      ...req.body,
      departments: req.body.departments,
    };
    await Departments.findByIdAndUpdate(id, department, { new: true });
    res.json(department);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete Departments By ID
export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send({ msg: "No Departments with that id" });
    await Departments.findByIdAndRemove(id);
    res.json({ msg: "Departments deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
