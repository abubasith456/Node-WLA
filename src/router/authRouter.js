import express from "express";
import * as authService from "../services/authService.js"; // Use named imports

const router = express.Router();

// Authentication
router.post("/signup", async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);
        res.status(201).json({ status: "success", message: "User registered successfully", data: { user } });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ status: "error", message: "Email and password are required" });
        }

        const user = await authService.loginUser(email, password);
        res.status(200).json({ status: "success", message: "Login successful", data: { user } });
    } catch (error) {
        res.status(400).json({ status: "error", message: "Invalid credentials" }); // Generic error for security
    }
});

// User Management
router.get("/user/:userId", async (req, res) => {
    try {
        const user = await authService.getUserById(req.params.userId);
        res.status(200).json({ status: "success", message: "User details fetched", data: { user } });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
});

router.put("/user/:userId", async (req, res) => {
    try {
        const updatedUser = await authService.updateUserInfo(req.params.userId, req.body);
        res.status(200).json({ status: "success", message: "User updated successfully", data: { updatedUser } });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
});

router.post("/user/:userId/addresses", async (req, res) => {
    try {
        const updatedUser = await authService.addUserAddress(req.params.userId, req.body.address);
        res.status(200).json({ status: "success", message: "Address added successfully", data: { updatedUser } });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
});

export default router;
