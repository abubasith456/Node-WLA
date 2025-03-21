import * as offerRepository from "../repositories/offerRepository.js";

export const createOffer = async (data) => {
    return await offerRepository.createOffer(data);
};

export const getAllOffers = async () => {
    return await offerRepository.getAllOffers();
};

export const getOfferById = async (id) => {
    return await offerRepository.getOfferById(id);
};

export const updateOffer = async (id, data) => {
    return await offerRepository.updateOffer(id, data);
};

export const deleteOffer = async (id) => {
    return await offerRepository.deleteOffer(id);
};
