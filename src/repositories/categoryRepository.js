import Category from "../models/Categories.js";

export const createCategory = async (categoryData) => {
    return await Category.create(categoryData);
};

export const getAllCategories = async () => {
    return await Category.find();
};

export const getCategoryById = async (categoryId) => {
    return await Category.findById(categoryId);
};

export const updateCategory = async (categoryId, updateData) => {
    return await Category.findByIdAndUpdate(categoryId, updateData, { new: true });
};

export const deleteCategory = async (categoryId) => {
    return await Category.findByIdAndDelete(categoryId);
};
