import * as bannerRepository from "../repositories/bannerRepository.js";

// Create a new banner
export const createBanner = async (bannerData) => {
    try {
        return await bannerRepository.createBanner(bannerData);
    } catch (error) {
        throw new Error("Error creating banner: " + error.message);
    }
};

// Get all active banners
export const getActiveBanners = async () => {
    try {
        const banners = await bannerRepository.findActiveBanners();
        return banners;
    } catch (error) {
        throw new Error("Error fetching active banners: " + error.message);
    }
};
// Get all banners
export const getAllBanners = async () => {
    try {
        return await bannerRepository.getAllBanners();
    } catch (error) {
        throw new Error("Error fetching all banners: " + error.message);
    }
};

// Get banner by ID
export const getBannerById = async (bannerId) => {
    try {
        return await bannerRepository.getBannerById(bannerId);
    } catch (error) {
        throw new Error("Error fetching banner by ID: " + error.message);
    }
};

// Update a banner by ID
export const updateBannerById = async (bannerId, updateData) => {
    try {
        return await bannerRepository.updateBannerById(bannerId, updateData);
    } catch (error) {
        throw new Error("Error updating banner: " + error.message);
    }
};

// Delete a banner by ID
export const deleteBannerById = async (bannerId) => {
    try {
        return await bannerRepository.deleteBannerById(bannerId);
    } catch (error) {
        throw new Error("Error deleting banner: " + error.message);
    }
};
