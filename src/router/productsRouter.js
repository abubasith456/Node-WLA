import express from "express";
import * as productService from "../services/productsService.js";
import ResponseUtil from "../utils/ResponseUtil.js";
import multer from "multer";
import sharp from 'sharp';
const router = express.Router();

// Async wrapper to handle errors globally
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a new product with an image upload
router.post("/", upload.array("images"), asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category, stock, offerId } = req.body;

        // Convert uploaded images to Base64
        const compressedImages = await Promise.all(
            req.files.map(async (file) => {
                const webpBuffer = await sharp(file.buffer)
                    .webp({ quality: 80 }) // Compress to WebP format
                    .toBuffer();
                return webpBuffer;
            })
        );

        console.log(compressedImages)

        const product = await productService.createProduct({
            name,
            description,
            price,
            category,
            stock,
            images: compressedImages,
            offerId
        });

        ResponseUtil.success(res, "Products Added successfully", { product });

    } catch (error) {
        ResponseUtil.error(res, error.message,)
    }
}));

// Get products by category
router.get("/category/:categoryId", asyncHandler(async (req, res) => {
    const products = await productService.getProductsByCategory(req.params.categoryId);
    ResponseUtil.success(res, "Products fetched successfully", { products });
}));

// Get all products
router.get("/", asyncHandler(async (req, res) => {
    const products = await productService.getAllProducts();
    ResponseUtil.success(res, "All products fetched successfully", { products });
}));

// Get a product by ID
router.get("/:id", asyncHandler(async (req, res) => {
    const product = await productService.getProductById(req.params.id);
    if (!product) return ResponseUtil.error(res, "Product not found", 404);
    ResponseUtil.success(res, "Product fetched successfully", { product });
}));

// Update a product
router.put("/:id", asyncHandler(async (req, res) => {
    const updatedProduct = await productService.updateProduct(req.params.id, req.body);
    if (!updatedProduct) return ResponseUtil.error(res, "Product not found", 404);
    ResponseUtil.success(res, "Product updated successfully", { updatedProduct });
}));

// Delete a product
router.delete("/:id", asyncHandler(async (req, res) => {
    const deletedProduct = await productService.deleteProduct(req.params.id);
    if (!deletedProduct) return ResponseUtil.error(res, "Product not found", 404);
    ResponseUtil.success(res, "Product deleted successfully");
}));

export default router;
