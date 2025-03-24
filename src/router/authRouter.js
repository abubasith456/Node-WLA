import express from "express";
import * as authService from "../services/authService.js";
import ResponseUtil from "../utils/ResponseUtil.js"; // Import the response utility

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and management
 */

/**
 * @swagger
 * /api/v1/user/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post("/signup", async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);
        ResponseUtil.success(res, "User registered successfully", { user }, 201);
    } catch (error) {
        ResponseUtil.error(res, error.message, 400);
    }
});

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return ResponseUtil.error(res, "Email and password are required", 400);
        }

        const user = await authService.loginUser(email, password);
        ResponseUtil.success(res, "Login successful", { user });
    } catch (error) {
        ResponseUtil.error(res, "Invalid credentials", 400);
    }
});

/**
 * @swagger
 * /api/v1/user/{userId}:
 *   get:
 *     summary: Get user details
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User details fetched
 *       404:
 *         description: User not found
 */
router.get("/:userId", async (req, res) => {
    try {
        const user = await authService.getUserById(req.params.userId);
        if (!user) return ResponseUtil.error(res, "User not found", 404);
        ResponseUtil.success(res, "User details fetched", { user });
    } catch (error) {
        ResponseUtil.error(res, error.message, 400);
    }
});

/**
 * @swagger
 * /api/v1/user/{userId}:
 *   put:
 *     summary: Update user details
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe Updated
 *               email:
 *                 type: string
 *                 example: updated@example.com
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put("/:userId", async (req, res) => {
    try {
        const user = await authService.updateUserInfo(req.params.userId, req.body);
        if (!user) return ResponseUtil.error(res, "User not found", 404);
        ResponseUtil.success(res, "User updated successfully", { user });
    } catch (error) {
        ResponseUtil.error(res, error.message, 400);
    }
});

/**
 * @swagger
 * /api/v1/user/{userId}/addresses:
 *   post:
 *     summary: Add a new address for the user
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 example: "123 Main St, New York, NY 10001"
 *     responses:
 *       200:
 *         description: Address added successfully
 *       404:
 *         description: User not found
 */
router.post("/:userId/addresses", async (req, res) => {
    try {
        const user = await authService.addUserAddress(req.params.userId, req.body.address);
        if (!user) return ResponseUtil.error(res, "User not found", 404);
        ResponseUtil.success(res, "Address added successfully", { user });
    } catch (error) {
        ResponseUtil.error(res, error.message, 400);
    }
});

export default router;
