import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Offer name (e.g., "Summer Deal")
    discountPercentage: { type: Number, required: true },  // Discount percentage
    startDate: { type: Date, required: true },  // Offer start date
    endDate: { type: Date, required: true },  // Offer expiry date
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]  // Products in this offer
});

const Offer = mongoose.model("Offer", offerSchema);
export default Offer;
