import * as categoryRepository from "../repositories/categoryRepository.js";

export const addCategory = async ({ name, image, link }) => {
    const existingCategory = await categoryRepository.getAllCategories();
    if (existingCategory.some(cat => cat.name === name)) {
        throw new Error("Category already exists");
    }
    return await categoryRepository.createCategory({ name, image, link });
};

export const getCategories = async () => {
    return await categoryRepository.getAllCategories();
};

export const getCategory = async (categoryId) => {
    const category = await categoryRepository.getCategoryById(categoryId);
    if (!category) throw new Error("Category not found");
    return category;
};

export const updateCategory = async (categoryId, updateData) => {
    const updatedCategory = await categoryRepository.updateCategory(categoryId, updateData);
    if (!updatedCategory) throw new Error("Category update failed");
    return updatedCategory;
};

export const deleteCategory = async (categoryId) => {
    const deletedCategory = await categoryRepository.deleteCategory(categoryId);
    if (!deletedCategory) throw new Error("Category deletion failed");
    return deletedCategory;
};
