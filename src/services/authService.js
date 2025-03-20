import bcrypt from "bcryptjs";
import * as userRepository from "../repositories/userRepository.js";

export const registerUser = async ({ email, password, mobile, name, dob }) => {
    const existingUser = await userRepository.findUserByEmailOrMobile(email, mobile);
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10); // Hash password before saving
    const user = await userRepository.createUser({ email, password: hashedPassword, mobile, dob, name, addresses: [] });

    return user;
};

export const loginUser = async (email, password) => {
    const user = await userRepository.findUserByEmailOrMobile(email, null);

    console.log("🔍 Found User:", user); // Check if user exists
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("🔍 Password Match:", isMatch); // Debug password check
    if (!isMatch) throw new Error("Invalid credentials");

    return user;
};


export const updateUserInfo = async (userId, updateData) => {
    if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10); // Hash new password if updated
    }
    return await userRepository.updateUserById(userId, updateData);
};

export const addUserAddress = async (userId, address) => {
    return await userRepository.addUserAddress(userId, address);
};

export const getUserById = async (userId) => {
    return await userRepository.findUserById(userId).select("-password"); // Don't return password
};
