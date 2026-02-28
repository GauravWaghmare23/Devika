import {Router} from "express";
import * as userController from "../controllers/user.controller.js";
import { body } from "express-validator";
import { authenticateJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register",
    body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email address"),
    body("password").trim().isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    userController.registerUser);

router.post("/login",
    body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email address"),
    body("password").trim().isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    userController.loginUser);

router.get("/profile", authenticateJWT, userController.getUserProfile);

router.get("/logout", authenticateJWT, userController.logoutUser);

router.get("/all", authenticateJWT, userController.getAllUsers);

export default router;