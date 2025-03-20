import express from "express";
import * as categoryService from "../services/categoryService.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const category = await categoryService.addCategory(req.body);
        res.status(201).json({ status: "success", message: "Category created", data: category });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const categories = await categoryService.getCategories();
        res.status(200).json({ status: "success", message: "Categories fetched", data: categories });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const category = await categoryService.getCategory(req.params.id);
        res.status(200).json({ status: "success", message: "Category fetched", data: category });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedCategory = await categoryService.updateCategory(req.params.id, req.body);
        res.status(200).json({ status: "success", message: "Category updated", data: updatedCategory });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await categoryService.deleteCategory(req.params.id);
        res.status(200).json({ status: "success", message: "Category deleted" });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
});

export default router;
