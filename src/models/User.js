import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    mobile: { type: String, unique: true, sparse: true },
    dob: { type: Date, required: true },
    images: [{ type: Buffer }],
    password: { type: String, required: true },
    googleId: { type: String, unique: true, sparse: true },
    addresses: [addressSchema]  // Added addresses as an array
}, { timestamps: true });

export default mongoose.model("User", userSchema);
