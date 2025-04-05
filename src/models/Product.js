import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
    label: { type: String, required: true }, // e.g., "S", "M", "L", "XL", or "1 Piece", "2 Pieces"
    price: { type: Number }, // Optional: Different price for different sizes
    stock: { type: Number, default: 0 } // Optional: Different stock for different sizes
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    stock: { type: Number, default: 0 }, // Overall stock (for products without sizes)
    sizes: [sizeSchema], // Array to store size-specific data
    images: [{ type: Buffer }],
    offerId: { type: mongoose.Schema.Types.ObjectId, ref: "Offer", default: null },
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model("Product", productSchema);
export default Product;
