import auth from "../auth/auth.js";
import { Router } from "express";
import * as DepartmentController from "../controllers/DepartmentController.js";

const router = Router(); // creating the router from express
router.post("/register", auth, DepartmentController.register); 
router.get("/", auth, DepartmentController.getAllDepartments); 
router.get("/:id", auth, DepartmentController.getDepartment); 
router.put("/edit/:id", auth, DepartmentController.updateDepartment); 
router.delete("/:id", auth, DepartmentController.deleteDepartment); 

export default router;