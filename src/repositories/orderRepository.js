import Order from "../models/Order.js";

// Create a new order
export const createOrder = async (orderData) => {
    const order = new Order(orderData);
    return await order.save();
};

// Get all orders with user and product details
export const getAllOrders = async () => {
    return await Order.find({})
        .select("-password")
        .sort({ createdAt: -1 })
        .exec();
};

// Get order by ID with user and product details
export const getOrderById = async (orderId) => {
    return await Order.findById(orderId)
        .populate("userId", "name email")
        .populate("items.product", "name price images")
        .exec();
};

// Get all orders for a specific user
export const getOrdersByUser = async (userId) => {
    return await Order.find({ userId })
        .populate("items.product", "name price images")
        .sort({ createdAt: -1 })
        .exec();
};

// Update order by ID
export const updateOrderById = async (orderId, updates) => {
    return await Order.findByIdAndUpdate(orderId, updates, { new: true });
};

// Delete order by ID
export const deleteOrderById = async (orderId) => {
    const result = await Order.findByIdAndDelete(orderId);
    return result !== null;
};
