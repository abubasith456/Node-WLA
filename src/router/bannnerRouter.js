import express from "express";
import * as bannerService from "../services/bannerService.js";
import ResponseUtil from "../utils/ResponseUtil.js";

const router = express.Router();

// Async wrapper to handle errors globally
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * @swagger
 * tags:
 *   name: Banners
 *   description: Banner management APIs
 */

/**
 * @swagger
 * /banners:
 *   post:
 *     summary: Create a new banner
 *     tags: [Banners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Summer Sale
 *               image:
 *                 type: string
 *                 example: "https://example.com/banner.jpg"
 *               link:
 *                 type: string
 *                 example: "https://example.com"
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Banner created successfully
 *       400:
 *         description: Bad request
 */
router.post("/", asyncHandler(async (req, res) => {
    const { title, image, link, isActive } = req.body;
    const newBanner = await bannerService.createBanner({ title, image, link, isActive });
    ResponseUtil.success(res, "Banner created successfully", { banner: newBanner }, 201);
}));

/**
 * @swagger
 * /banners/active:
 *   get:
 *     summary: Get all active banners
 *     tags: [Banners]
 *     responses:
 *       200:
 *         description: List of active banners
 *       500:
 *         description: Server error
 */
router.get("/active", asyncHandler(async (req, res) => {
    const banners = await bannerService.getActiveBanners();
    ResponseUtil.success(res, "Active banners fetched successfully", { banners });
}));

/**
 * @swagger
 * /banners:
 *   get:
 *     summary: Get all banners
 *     tags: [Banners]
 *     responses:
 *       200:
 *         description: List of all banners
 *       500:
 *         description: Server error
 */
router.get("/", asyncHandler(async (req, res) => {
    const banners = await bannerService.getAllBanners();
    ResponseUtil.success(res, "All banners fetched successfully", { banners });
}));

/**
 * @swagger
 * /banners/{id}:
 *   get:
 *     summary: Get a banner by ID
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the banner
 *     responses:
 *       200:
 *         description: Banner fetched successfully
 *       404:
 *         description: Banner not found
 */
router.get("/:id", asyncHandler(async (req, res) => {
    const banner = await bannerService.getBannerById(req.params.id);
    if (!banner) {
        return ResponseUtil.error(res, "Banner not found", 404);
    }
    ResponseUtil.success(res, "Banner fetched successfully", { banner });
}));

/**
 * @swagger
 * /banners/{id}:
 *   put:
 *     summary: Update a banner by ID
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the banner
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Sale
 *               image:
 *                 type: string
 *                 example: "https://example.com/new-banner.jpg"
 *               link:
 *                 type: string
 *                 example: "https://example.com/new"
 *               isActive:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Banner updated successfully
 *       404:
 *         description: Banner not found
 */
router.put("/:id", asyncHandler(async (req, res) => {
    const updatedBanner = await bannerService.updateBannerById(req.params.id, req.body);
    if (!updatedBanner) {
        return ResponseUtil.error(res, "Banner not found", 404);
    }
    ResponseUtil.success(res, "Banner updated successfully", { banner: updatedBanner });
}));

/**
 * @swagger
 * /banners/{id}:
 *   delete:
 *     summary: Delete a banner by ID
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the banner
 *     responses:
 *       200:
 *         description: Banner deleted successfully
 *       404:
 *         description: Banner not found
 */
router.delete("/:id", asyncHandler(async (req, res) => {
    const deletedBanner = await bannerService.deleteBannerById(req.params.id);
    if (!deletedBanner) {
        return ResponseUtil.error(res, "Banner not found", 404);
    }
    ResponseUtil.success(res, "Banner deleted successfully");
}));

export default router;
