import { createUser } from "../services/user.service.js";
import {validationResult} from "express-validator";

export const registerUser = async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errors.array()
        });
    };

    try {
        
        const {email, password} = req.body;

        const user = await createUser({email, password});

        const token = user.generateJWT();
        
        res.cookie("token",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                id: user._id,
                email: user.email
            },
            token: token
        });

    } catch (error) {
        
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        };

        return res.status(500).json({
            success: false,
            message: "Registration failed, please try again later",
            error: error.message,
        });
    }
}