import * as productRepository from "../repositories/productsRepository.js";

export const createProduct = async (data) => {
    return await productRepository.createProduct(data);
};

export const getProductsByCategory = async (categoryId) => {
    return await productRepository.getProductsByCategory(categoryId);
}

export const getAllProducts = async () => {
    return await productRepository.getAllProducts();
};

export const getProductById = async (id) => {
    return await productRepository.getProductById(id);
};

export const updateProduct = async (id, data) => {
    return await productRepository.updateProduct(id, data);
};

export const deleteProduct = async (id) => {
    return await productRepository.deleteProduct(id);
};
