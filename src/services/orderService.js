import * as orderRepository from "../repositories/orderRepository.js";
import NotificationService from "./notificationService.js";
import * as userRepository from "../repositories/userRepository.js";

export const placeOrder = async (orderData) => {
    const order = await orderRepository.createOrder(orderData);
    // Send notification to user
    try {
        const user = await userRepository.findUserById(orderData.userId);
        if (user && user.fcmToken) {
            await NotificationService.sendNotification(
                user.fcmToken,
                'Order Placed Successfully',
                `Your order #${order._id} has been placed successfully!`,
                {
                    orderId: order._id.toString(),
                    type: 'ORDER_PLACED'
                }
            );
            console.log(`Order notification sent to user with ID ${orderData.userId}`);
        }
    } catch (error) {
        console.error('Error sending order notification:', error);
        // Don't throw error as order is already placed
    }

    return order;
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
    const order = await orderRepository.updateOrderById(orderId, updates);

    // Send notification for order status updates
    try {
        const user = await userRepository.findUserById(order.userId);
        if (user && user.fcmToken) {
            const notificationBody = getStatusUpdateMessage(updates.status);
            await NotificationService.sendNotification(
                user.fcmToken,
                'Order Status Updated',
                notificationBody,
                {
                    orderId: orderId,
                    type: 'ORDER_STATUS_UPDATE',
                    status: updates.status
                }
            );
        }
    } catch (error) {
        console.error('Error sending status update notification:', error);
    }

    return order;
};

export const deleteOrder = async (orderId) => {
    return await orderRepository.deleteOrderById(orderId);
};

// Helper function to get status update messages
const getStatusUpdateMessage = (status) => {
    switch (status) {
        case 'Processing':
            return 'Your order is being processed!';
        case 'Shipped':
            return 'Your order has been shipped!';
        case 'Delivered':
            return 'Your order has been delivered!';
        case 'Cancelled':
            return 'Your order has been cancelled.';
        default:
            return `Your order status has been updated to ${status}`;
    }
};
