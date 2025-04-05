import * as orderRepository from "../repositories/orderRepository.js";

export const placeOrder = async (orderData) => {
    return await orderRepository.createOrder(orderData);
};

export const fetchAllOrders = async () => {
    return await orderRepository.getAllOrders();
};

export const fetchOrderById = async (orderId) => {
    return await orderRepository.getOrderById(orderId);
};

export const fetchOrdersForUser = async (userId) => {
    return await orderRepository.getOrdersByUser(userId);
};

export const updateOrder = async (orderId, updates) => {
    return await orderRepository.updateOrderById(orderId, updates);
};

export const deleteOrder = async (orderId) => {
    return await orderRepository.deleteOrderById(orderId);
};
