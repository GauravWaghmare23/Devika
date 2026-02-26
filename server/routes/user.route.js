import {Router} from "express";
import * as userController from "../controllers/user.controller.js";
import { body } from "express-validator";

const router = Router();

router.post("/register",
    body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email address"),
    body("password").trim().isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    userController.registerUser);

export default router;