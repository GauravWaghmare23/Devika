import {validationResult} from "express-validator";
import { createUserService, loginUserService } from './../services/user.service.js';

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

        const user = await createUserService({email, password});

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
                error:"User already exist",
            });
        };

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

export const loginUser = async (req,res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success:false,
            message:"Validation failed",
            error:errors.array()
        });
    }

    try {

        const {email, password} = req.body;

        const user = await loginUserService({email, password});

        const token = user.generateJWT();

        res.cookie("token",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                id: user._id,
                email: user.email
            },
            token: token
        })
        
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });

    }
}

export const getUserProfile = async (req,res) => {
    try {

        const user = req.user;

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        };

        return res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            data: {
                id: user.id,
                email: user.email,
            }
        });

    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    };
}