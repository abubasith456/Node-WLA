import express from "express";
import * as offerService from "../services/offerService.js";
import ResponseUtil from "../utils/ResponseUtil.js"; // Import response utility

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Offers
 *   description: Offer management API
 */

/**
 * @swagger
 * /offers:
 *   post:
 *     summary: Create a new offer
 *     tags: [Offers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Special Discount"
 *               description:
 *                 type: string
 *                 example: "Get 20% off on all items"
 *     responses:
 *       201:
 *         description: Offer created successfully
 *       400:
 *         description: Bad request
 */
router.post("/", async (req, res) => {
    try {
        const offer = await offerService.createOffer(req.body);
        ResponseUtil.success(res, "Offer created successfully", { offer }, 201);
    } catch (error) {
        ResponseUtil.error(res, error.message);
    }
});

/**
 * @swagger
 * /offers:
 *   get:
 *     summary: Get all offers
 *     tags: [Offers]
 *     responses:
 *       200:
 *         description: Offers fetched successfully
 *       500:
 *         description: Internal server error
 */
router.get("/", async (req, res) => {
    try {
        const offers = await offerService.getAllOffers();
        ResponseUtil.success(res, "Offers fetched successfully", { offers });
    } catch (error) {
        ResponseUtil.error(res, error.message, 500);
    }
});

/**
 * @swagger
 * /offers/{id}:
 *   get:
 *     summary: Get offer by ID
 *     tags: [Offers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the offer
 *     responses:
 *       200:
 *         description: Offer fetched successfully
 *       404:
 *         description: Offer not found
 */
router.get("/:id", async (req, res) => {
    try {
        const offer = await offerService.getOfferById(req.params.id);
        if (!offer) return ResponseUtil.error(res, "Offer not found", 404);
        ResponseUtil.success(res, "Offer fetched successfully", { offer });
    } catch (error) {
        ResponseUtil.error(res, error.message, 500);
    }
});

/**
 * @swagger
 * /offers/{id}:
 *   put:
 *     summary: Update an offer
 *     tags: [Offers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the offer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Offer"
 *               description:
 *                 type: string
 *                 example: "Now get 30% off"
 *     responses:
 *       200:
 *         description: Offer updated successfully
 *       404:
 *         description: Offer not found
 */
router.put("/:id", async (req, res) => {
    try {
        const updatedOffer = await offerService.updateOffer(req.params.id, req.body);
        if (!updatedOffer) return ResponseUtil.error(res, "Offer not found", 404);
        ResponseUtil.success(res, "Offer updated successfully", { updatedOffer });
    } catch (error) {
        ResponseUtil.error(res, error.message);
    }
});

/**
 * @swagger
 * /offers/{id}:
 *   delete:
 *     summary: Delete an offer
 *     tags: [Offers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the offer
 *     responses:
 *       200:
 *         description: Offer deleted successfully
 *       404:
 *         description: Offer not found
 */
router.delete("/:id", async (req, res) => {
    try {
        const deletedOffer = await offerService.deleteOffer(req.params.id);
        if (!deletedOffer) return ResponseUtil.error(res, "Offer not found", 404);
        ResponseUtil.success(res, "Offer deleted successfully");
    } catch (error) {
        ResponseUtil.error(res, error.message, 500);
    }
});

export default router;
