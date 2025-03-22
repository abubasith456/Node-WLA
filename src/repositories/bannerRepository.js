import Banner from "../models/Banner.js";

// Create a new banner
export const createBanner = async (bannerData) => {
    const banner = new Banner(bannerData);
    await banner.save();
    return banner;
};

// Get all active banners
export const getActiveBanners = async () => {
    return await Banner.find({ isActive: true });
};

// Get all banners (including inactive ones)
export const getAllBanners = async () => {
    return await Banner.find();
};

// Get a banner by ID
export const getBannerById = async (bannerId) => {
    return await Banner.findById(bannerId);
};

// Update a banner by ID
export const updateBannerById = async (bannerId, updateData) => {
    return await Banner.findByIdAndUpdate(bannerId, updateData, { new: true });
};

// Delete a banner by ID
export const deleteBannerById = async (bannerId) => {
    return await Banner.findByIdAndDelete(bannerId);
};

export const findActiveBanners = async () => {
    try {
        return await Banner.find({ isActive: true }).populate('link');
    } catch (error) {
        throw new Error("Error fetching banners from the database: " + error.message);
    }
};
