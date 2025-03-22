import User from "../models/User.js";

export const findUserByEmailOrMobile = async (email, mobile) => {
    // return await User.findOne({ $or: [{ email }, { mobile }] });
    return await User.findOne({ $or: [{ email }] });
};

export const createUser = async (userData) => {
    return await User.create(userData);
};

export const findUserById = async (userId) => {
    return await User.findById(userId).select("-password");
};

export const updateUserById = async (userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

export const addUserAddress = async (userId, address) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    user.addresses.push(address);
    await user.save();
    return user;
};