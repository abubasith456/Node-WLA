import Offer from "../models/Offer.js";

export const createOffer = async (data) => {
    return await Offer.create(data);
};

export const getAllOffers = async () => {
    return await Offer.find().populate("products");
};

export const getOfferById = async (id) => {
    return await Offer.findById(id).populate("products");
};

export const updateOffer = async (id, data) => {
    return await Offer.findByIdAndUpdate(id, data, { new: true }).populate("products");
};

export const deleteOffer = async (id) => {
    return await Offer.findByIdAndDelete(id);
};
