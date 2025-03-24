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

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     description: Adds a new product with an image upload.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: images
 *         type: file
 *         multiple: true
 *         required: true
 *         description: Product images
 *       - in: formData
 *         name: name
 *         type: string
 *         required: true
 *         description: Product name
 *       - in: formData
 *         name: description
 *         type: string
 *         required: true
 *         description: Product description
 *       - in: formData
 *         name: price
 *         type: number
 *         required: true
 *         description: Product price
 *       - in: formData
 *         name: category
 *         type: string
 *         required: true
 *         description: Product category
 *       - in: formData
 *         name: stock
 *         type: number
 *         required: true
 *         description: Product stock quantity
 *       - in: formData
 *         name: offerId
 *         type: string
 *         required: false
 *         description: Associated offer ID (optional)
 *     responses:
 *       201:
 *         description: Product created successfully
 *       500:
 *         description: Server error
 */
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

        const product = await productService.createProduct({
            name,
            description,
            price,
            category,
            stock,
            images: compressedImages,
            offerId
        });

        ResponseUtil.success(res, "Product added successfully", { product });

    } catch (error) {
        ResponseUtil.error(res, error.message);
    }
}));

/**
 * @swagger
 * /products/category/{categoryId}:
 *   get:
 *     summary: Get products by category
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *       404:
 *         description: No products found
 */
router.get("/category/:categoryId", asyncHandler(async (req, res) => {
    const products = await productService.getProductsByCategory(req.params.categoryId);
    ResponseUtil.success(res, "Products fetched successfully", { products });
}));

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: All products fetched successfully
 */
router.get("/", asyncHandler(async (req, res) => {
    const products = await productService.getAllProducts();
    ResponseUtil.success(res, "All products fetched successfully", { products });
}));

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *       404:
 *         description: Product not found
 */
router.get("/:id", asyncHandler(async (req, res) => {
    const product = await productService.getProductById(req.params.id);
    if (!product) return ResponseUtil.error(res, "Product not found", 404);
    ResponseUtil.success(res, "Product fetched successfully", { product });
}));

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product
 *       - in: body
 *         name: product
 *         description: Product details to update
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             description:
 *               type: string
 *             price:
 *               type: number
 *             category:
 *               type: string
 *             stock:
 *               type: number
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
router.put("/:id", asyncHandler(async (req, res) => {
    const updatedProduct = await productService.updateProduct(req.params.id, req.body);
    if (!updatedProduct) return ResponseUtil.error(res, "Product not found", 404);
    ResponseUtil.success(res, "Product updated successfully", { updatedProduct });
}));

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete("/:id", asyncHandler(async (req, res) => {
    const deletedProduct = await productService.deleteProduct(req.params.id);
    if (!deletedProduct) return ResponseUtil.error(res, "Product not found", 404);
    ResponseUtil.success(res, "Product deleted successfully");
}));

export default router;
