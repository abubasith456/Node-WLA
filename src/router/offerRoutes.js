import express from "express";
import * as offerService from "../services/offerService.js";
import ResponseUtil from "../utils/ResponseUtil.js"; // Import response utility

const router = express.Router();

// Create Offer
router.post("/", async (req, res) => {
    try {
        const offer = await offerService.createOffer(req.body);
        ResponseUtil.success(res, "Offer created successfully", { offer }, 201);
    } catch (error) {
        ResponseUtil.error(res, error.message);
    }
});

// Get All Offers
router.get("/", async (req, res) => {
    try {
        const offers = await offerService.getAllOffers();
        ResponseUtil.success(res, "Offers fetched successfully", { offers });
    } catch (error) {
        ResponseUtil.error(res, error.message, 500);
    }
});

// Get Offer by ID
router.get("/:id", async (req, res) => {
    try {
        const offer = await offerService.getOfferById(req.params.id);
        if (!offer) return ResponseUtil.error(res, "Offer not found", 404);
        ResponseUtil.success(res, "Offer fetched successfully", { offer });
    } catch (error) {
        ResponseUtil.error(res, error.message, 500);
    }
});

// Update Offer
router.put("/:id", async (req, res) => {
    try {
        const updatedOffer = await offerService.updateOffer(req.params.id, req.body);
        if (!updatedOffer) return ResponseUtil.error(res, "Offer not found", 404);
        ResponseUtil.success(res, "Offer updated successfully", { updatedOffer });
    } catch (error) {
        ResponseUtil.error(res, error.message);
    }
});

// Delete Offer
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
