import express from "express";
import * as categoryService from "../services/categoryService.js";
import ResponseUtil from "../utils/ResponseUtil.js"; // Import the response utility

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management APIs
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Bad request
 */
router.post("/", async (req, res) => {
    try {
        const category = await categoryService.addCategory(req.body);
        ResponseUtil.success(res, "Category created successfully", { category }, 201);
    } catch (error) {
        ResponseUtil.error(res, error.message);
    }
});

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of all categories
 *       500:
 *         description: Server error
 */
router.get("/", async (req, res) => {
    try {
        const categories = await categoryService.getCategories();
        ResponseUtil.success(res, "Categories fetched successfully", { categories });
    } catch (error) {
        ResponseUtil.error(res, error.message);
    }
});

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category
 *     responses:
 *       200:
 *         description: Category fetched successfully
 *       404:
 *         description: Category not found
 */
router.get("/:id", async (req, res) => {
    try {
        const category = await categoryService.getCategory(req.params.id);
        if (!category) return ResponseUtil.error(res, "Category not found", 404);
        ResponseUtil.success(res, "Category fetched successfully", { category });
    } catch (error) {
        ResponseUtil.error(res, error.message);
    }
});

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Electronics
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 */
router.put("/:id", async (req, res) => {
    try {
        const updatedCategory = await categoryService.updateCategory(req.params.id, req.body);
        if (!updatedCategory) return ResponseUtil.error(res, "Category not found", 404);
        ResponseUtil.success(res, "Category updated successfully", { updatedCategory });
    } catch (error) {
        ResponseUtil.error(res, error.message);
    }
});

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await categoryService.deleteCategory(req.params.id);
        if (!deleted) return ResponseUtil.error(res, "Category not found", 404);
        ResponseUtil.success(res, "Category deleted successfully");
    } catch (error) {
        ResponseUtil.error(res, error.message);
    }
});

export default router;
