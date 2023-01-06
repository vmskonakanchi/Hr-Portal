import auth from "../auth/auth.js";
import { Router } from "express";
import * as UserController from "../controllers/UserController.js";

const router = Router(); // creating the router from express

router.post("/register", UserController.register); // register User route
router.get("/sort", auth, UserController.sort); // sorting route

router.post("/login", UserController.login); // login route
router.get("/profile", auth, UserController.me); // user route
router.put("/profile", auth, UserController.updateMe); // update user route
router.get("/", auth, UserController.getAllUsers); // getting all users
router.get("/:id", auth, UserController.getUser); // getting a user by id
router.put("/:id", auth, UserController.updateUser); // updating a user
router.delete("/:id", auth, UserController.deleteUser); // deleting a user
router.post("/changepassword", auth, UserController.changePassword); // change password route
router.get("/search/:key", auth,  UserController.search); // change search route
router.get("/roles/role",auth, UserController.getUsersByRoles)//get by roles
export default router;
