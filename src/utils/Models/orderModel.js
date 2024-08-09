const mongoose = require('mongoose');
const crypto = require('crypto');

const orderSchema = new mongoose.Schema({
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        default: null
    },
    orderId: {
        type: String,
        trim: true,
        unique: true,
        default: () => {
            // Generate a random 6 character alphanumeric string
            return crypto.randomBytes(3).toString('hex').toUpperCase().slice(0, 6);
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address: {  // Add this to reference the address within the User's addresses
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User.addresses',
        required: true
    },
    group: { type: String, required: true, trim: true },
    productId: { type: String, required: true, trim: true },
    color: {
        name: {
            type: String,
            required: true,
            trim: true
        },
        hexcode: {
            type: String,
            trim: true
        }
    },
    size: { type: String, required: true, trim: true },
    quantityOrdered: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    logoUrl: {
        type: String, trim: true, default: null
    },
    logoPosition: {
        type: String, trim: true, default: null
    },
    deliveryCharges: {
        type: Number,
        default: 0
    },
    discountPercentage: {
        type: Number,
        default: 0
    },
    TotalPriceAfterDiscount: { type: Number, required: true },
    dateOfOrder: { type: Date, default: Date.now },
    deliveryStatus: {
        type: String,
        required: true,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    dateOfDelivery: { type: Date, default: null },
    estimatedDelivery: { type: Date, default: null },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Assigned'],
        default: 'Pending'
    },
    shiprocket_order_id:{
        type: Number,
        default:null
    },
    shiprocket_shipment_id:{
        type: Number,
        default:null
    },
    shiprocket_courier_id:{
        type: Number,
        default:null
    },
    shiprocket_awb_code:{
        type: Number,
        default:null
    },
    pickup_scheduled_date:{
        type: Number,
        default:null
    },
    pickup_token_number:{
        type: Number,
        default:null
    }
});

orderSchema.index({ orderId: 1 })

module.exports = mongoose.model("Order", orderSchema);

