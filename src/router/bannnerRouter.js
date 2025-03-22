import express from "express";
import * as bannerService from "../services/bannerService.js";
import ResponseUtil from "../utils/ResponseUtil.js";

const router = express.Router();

// Async wrapper to handle errors globally
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Create a new banner
router.post("/", asyncHandler(async (req, res) => {
    const { title, image, link, isActive } = req.body;
    const newBanner = await bannerService.createBanner({ title, image, link, isActive });
    ResponseUtil.success(res, "Banner created successfully", { banner: newBanner }, 201);
}));

router.get("/banners", async (req, res) => {
    try {
        const banners = await bannerService.getActiveBanners();
        ResponseUtil.success(res, "Active banners fetched successfully", { banners });
    } catch (error) {
        ResponseUtil.error(res, "Error of fetching banners!")
    }
});

// Get all active banners
router.get("/active", asyncHandler(async (req, res) => {
    const banners = await bannerService.getActiveBanners();
    ResponseUtil.success(res, "Active banners fetched successfully", { banners });
}));

// Get all banners
router.get("/", asyncHandler(async (req, res) => {
    const banners = await bannerService.getAllBanners();
    ResponseUtil.success(res, "All banners fetched successfully", { banners });
}));

// Get a banner by ID
router.get("/:id", asyncHandler(async (req, res) => {
    const banner = await bannerService.getBannerById(req.params.id);
    if (!banner) {
        return ResponseUtil.error(res, "Banner not found", 404);
    }
    ResponseUtil.success(res, "Banner fetched successfully", { banner });
}));

// Update a banner by ID
router.put("/:id", asyncHandler(async (req, res) => {
    const updatedBanner = await bannerService.updateBannerById(req.params.id, req.body);
    if (!updatedBanner) {
        return ResponseUtil.error(res, "Banner not found", 404);
    }
    ResponseUtil.success(res, "Banner updated successfully", { banner: updatedBanner });
}));

// Delete a banner by ID
router.delete("/:id", asyncHandler(async (req, res) => {
    const deletedBanner = await bannerService.deleteBannerById(req.params.id);
    if (!deletedBanner) {
        return ResponseUtil.error(res, "Banner not found", 404);
    }
    ResponseUtil.success(res, "Banner deleted successfully");
}));

export default router;
