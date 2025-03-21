import express from "express";
import * as authService from "../services/authService.js";
import ResponseUtil from "../utils/ResponseUtil.js"; // Import the response utility

const router = express.Router();

// Authentication
router.post("/signup", async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);
        ResponseUtil.success(res, "User registered successfully", { user }, 201);
    } catch (error) {
        ResponseUtil.error(res, error.message, 400);
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return ResponseUtil.error(res, "Email and password are required", 400);
        }

        const user = await authService.loginUser(email, password);
        ResponseUtil.success(res, "Login successful", { user });
    } catch (error) {
        ResponseUtil.error(res, "Invalid credentials", 400); // Generic error for security
    }
});

// User Management
router.get("/user/:userId", async (req, res) => {
    try {
        const user = await authService.getUserById(req.params.userId);
        if (!user) return ResponseUtil.error(res, "User not found", 404);
        ResponseUtil.success(res, "User details fetched", { user });
    } catch (error) {
        ResponseUtil.error(res, error.message, 400);
    }
});

router.put("/user/:userId", async (req, res) => {
    try {
        const updatedUser = await authService.updateUserInfo(req.params.userId, req.body);
        if (!updatedUser) return ResponseUtil.error(res, "User not found", 404);
        ResponseUtil.success(res, "User updated successfully", { updatedUser });
    } catch (error) {
        ResponseUtil.error(res, error.message, 400);
    }
});

router.post("/user/:userId/addresses", async (req, res) => {
    try {
        const updatedUser = await authService.addUserAddress(req.params.userId, req.body.address);
        if (!updatedUser) return ResponseUtil.error(res, "User not found", 404);
        ResponseUtil.success(res, "Address added successfully", { updatedUser });
    } catch (error) {
        ResponseUtil.error(res, error.message, 400);
    }
});

export default router;
