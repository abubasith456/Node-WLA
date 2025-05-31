import express from "express";
import multer from "multer";
import path from "path";
import * as authService from "../services/authService.js";
import ResponseUtil from "../utils/ResponseUtil.js"; // Import the response utility
import { uploadToFirebase } from "../utils/firebaseStorage.js";
import { validateObjectId } from "../utils/validateObjectId.js";

const router = express.Router();

// Configure multer for file upload with size limits
const storage = multer.memoryStorage();
const uploadMiddleware = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
});

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and management
 */

/**
 * @swagger
 * /user/signup:
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
 * /user/login:
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
 * /user/{userId}:
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
router.get("/:userId", validateObjectId, async (req, res) => {
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
 * /user/{userId}:
 *   put:
 *     summary: Update user details
 *     tags: [Auth]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *       - in: formData
 *         name: profilePic
 *         type: file
 *         description: Profile picture file
 *       - in: formData
 *         name: name
 *         type: string
 *         description: User's name
 *       - in: formData
 *         name: email
 *         type: string
 *         description: User's email
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put("/:userId", validateObjectId, uploadMiddleware.single('profilePic'), async (req, res, next) => {
    try {
        const updateData = { ...req.body };

        if (req.file) {
            const filename = `profiles/${req.params.userId}-${Date.now()}-${req.file.originalname}`;
            const downloadURL = await uploadToFirebase(req.file, filename);
            updateData.profilePic = downloadURL;
        }

        const user = await authService.updateUserInfo(req.params.userId, updateData);
        if (!user) return ResponseUtil.error(res, "User not found", 404);
        ResponseUtil.success(res, "User updated successfully", { user });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /user/{userId}/addresses:
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
router.post("/:userId/addresses", validateObjectId, async (req, res) => {
    try {
        const user = await authService.addUserAddress(req.params.userId, req.body.address);
        if (!user) return ResponseUtil.error(res, "User not found", 404);
        ResponseUtil.success(res, "Address added successfully", { user });
    } catch (error) {
        ResponseUtil.error(res, error.message, 400);
    }
});

export default router;
