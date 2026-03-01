import { validationResult } from "express-validator";
import { createProjectService } from "../services/project.service.js";

export const createProject = async(req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errors.array()
        });
    }

    try {
        const {name} = req.body;
        const userId = req.user.id;

        const newProject = await createProjectService({name, userId});

        return res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: newProject
        });

    } catch (error) {

        if(error.code === 11000){
            console.error(`Project creation failed: ${error.message}`);
            return res.status(400).json({
                success: false,
                message: "Project with this name already exists",
                error: error.message
            });
        };

        console.error(`Failed to create project: ${error.message}`);
        return res.status(400).json({
            success: false,
            message: `Failed to create project: ${error.message}`,
            error: error.message
        });
    }
}