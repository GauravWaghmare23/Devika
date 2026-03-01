import { Router } from 'express';
import { createProject } from '../controllers/project.controller.js';
import { body } from 'express-validator';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.post("/create", 
    body("name").trim().isLength({ min: 3, max: 100 }).withMessage("Project name must be between 3 and 100 characters"),
    authenticateJWT,
    createProject);


export default router;