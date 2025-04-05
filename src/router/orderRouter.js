import express from "express";
import * as orderService from "../services/orderService.js";
import ResponseUtil from "../utils/ResponseUtil.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management APIs
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Place a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInput'
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       400:
 *         description: Bad request
 */
router.post("/", async (req, res) => {
    try {
        const order = await orderService.placeOrder(req.body);
        ResponseUtil.success(res, "Order placed successfully", { order }, 201);
    } catch (error) {
        ResponseUtil.error(res, error.message, 400);
    }
});

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: A list of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     orders:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Order'
 *       500:
 *         description: Internal server error
 */
router.get("/", async (req, res) => {
    try {
        const orders = await orderService.fetchAllOrders();
        ResponseUtil.success(res, "All orders fetched", { orders });
    } catch (error) {
        ResponseUtil.error(res, error.message, 500);
    }
});


/**
 * @swagger
 * /orders/{orderId}:
 *   get:
 *     summary: Get order details by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     order:
 *                       $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 */
router.get("/:orderId", async (req, res) => {
    try {
        const order = await orderService.fetchOrderById(req.params.orderId);
        if (!order) return ResponseUtil.error(res, "Order not found", 404);
        ResponseUtil.success(res, "Order details fetched", { order });
    } catch (error) {
        ResponseUtil.error(res, error.message, 400);
    }
});

/**
 * @swagger
 * /orders/user/{userId}:
 *   get:
 *     summary: Get all orders for a user
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Orders for the user fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     orders:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Order'
 *       404:
 *         description: Orders not found for user
 */
router.get("/user/:userId", async (req, res) => {
    try {
        const orders = await orderService.fetchOrdersForUser(req.params.userId);
        ResponseUtil.success(res, "User's orders fetched", { orders });
    } catch (error) {
        ResponseUtil.error(res, error.message, 400);
    }
});

/**
 * @swagger
 * /orders/{orderId}:
 *   put:
 *     summary: Update an order (admin or user can update status/cancellation)
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: Shipped
 *               paymentStatus:
 *                 type: string
 *                 example: Paid
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       404:
 *         description: Order not found
 */
router.put("/:orderId", async (req, res) => {
    try {
        const order = await orderService.updateOrder(req.params.orderId, req.body);
        if (!order) return ResponseUtil.error(res, "Order not found", 404);
        ResponseUtil.success(res, "Order updated successfully", { order });
    } catch (error) {
        ResponseUtil.error(res, error.message, 400);
    }
});

/**
 * @swagger
 * /orders/{orderId}:
 *   delete:
 *     summary: Cancel or delete an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID to delete
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */
router.delete("/:orderId", async (req, res) => {
    try {
        const deleted = await orderService.deleteOrder(req.params.orderId);
        if (!deleted) return ResponseUtil.error(res, "Order not found", 404);
        ResponseUtil.success(res, "Order deleted successfully", { orderId: req.params.orderId });
    } catch (error) {
        ResponseUtil.error(res, error.message, 400);
    }
});

export default router;
