import express from "express";
import * as categoryService from "../services/categoryService.js";
import ResponseUtil from "../utils/ResponseUtil.js"; // Import the response utility

const router = express.Router();

// Create Category
router.post("/", async (req, res) => {
    try {
        const category = await categoryService.addCategory(req.body);
        ResponseUtil.success(res, "Category created successfully", { category }, 201);
    } catch (error) {
        ResponseUtil.error(res, error.message);
    }
});

// Get All Categories
router.get("/", async (req, res) => {
    try {
        const categories = await categoryService.getCategories();
        ResponseUtil.success(res, "Categories fetched successfully", { categories });
    } catch (error) {
        ResponseUtil.error(res, error.message);
    }
});

// Get Category by ID
router.get("/:id", async (req, res) => {
    try {
        const category = await categoryService.getCategory(req.params.id);
        if (!category) return ResponseUtil.error(res, "Category not found", 404);
        ResponseUtil.success(res, "Category fetched successfully", { category });
    } catch (error) {
        ResponseUtil.error(res, error.message);
    }
});

// Update Category
router.put("/:id", async (req, res) => {
    try {
        const updatedCategory = await categoryService.updateCategory(req.params.id, req.body);
        if (!updatedCategory) return ResponseUtil.error(res, "Category not found", 404);
        ResponseUtil.success(res, "Category updated successfully", { updatedCategory });
    } catch (error) {
        ResponseUtil.error(res, error.message);
    }
});

// Delete Category
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
