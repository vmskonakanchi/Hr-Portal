import auth from "../auth/auth.js";
import { Router } from "express";
import * as StatusController from "../controllers/StatusController.js";

const router = Router(); // creating the router from express
router.post("/register", auth, StatusController.register); 
router.get("/", auth, StatusController.getAllStatus); 
router.get("/:id", auth, StatusController.getStatus); 
router.put("/edit/:id", auth, StatusController.updateStatus); 
router.delete("/:id", auth, StatusController.deleteStatus); 

export default router;