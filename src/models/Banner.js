import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    title: String,
    image: String, // URL or path to the banner image
    link: { type: mongoose.Schema.Types.ObjectId, ref: "Offer" }, // Referencing offerId for the offer page
    isActive: { type: Boolean, default: true },
}, { timestamps: true });


const Banner = mongoose.model("Banner", bannerSchema);
export default Banner;