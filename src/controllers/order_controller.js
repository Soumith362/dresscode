const express = require('express');
const OrderService = require('../services/order_service');
const Constants = require('../utils/Constants/response_messages')
const JwtHelper = require('../utils/Helpers/jwt_helper')
const jwtHelperObj = new JwtHelper();
const router = express.Router()
const OrderServiceObj = new OrderService();

// POST endpoint to create an order
router.post('/createOrder/user/:userId/address/:addressId', jwtHelperObj.verifyAccessToken, async (req, res) => {
    try {
        const orderDetails = req.body;
        const { userId, addressId } = req.params

        const newOrder = await OrderServiceObj.createOrder(userId, addressId, orderDetails);

        res.status(201).send({
            message: "Order created successfully",
            order: newOrder
        });
    } catch (error) {
        console.error("Failed to create order:", error.message);
        res.status(500).send({ message: error.message });
    }
});

// POST endpoint to create multiple orders
router.post('/createMultipleOrders/user/:userId/address/:addressId', jwtHelperObj.verifyAccessToken, async (req, res) => {
    const { userId, addressId } = req.params;
    const orders = req.body; // Expecting an array of order details

    try {
        const results = await Promise.all(orders.map(orderDetails => 
            OrderServiceObj.createOrder(userId, addressId, orderDetails)
        ));
        
        res.status(201).send({
            message: "All orders created successfully",
            orders: results
        });
    } catch (error) {
        console.error("Failed to create one or more orders:", error.message);
        res.status(500).send({ message: "Failed to create one or more orders", error: error.message });
    }
});

// POST endpoint to create an quote
router.post('/createQuote/user/:userId', jwtHelperObj.verifyAccessToken, async (req, res) => {
    try {
        const quoteDetails = req.body;
        const { userId } = req.params

        const newQuote = await OrderServiceObj.createQuote(userId, quoteDetails);

        res.status(201).send({
            message: "Quote created successfully",
            quote: newQuote
        });
    } catch (error) {
        console.error("Failed to create order:", error.message);
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;