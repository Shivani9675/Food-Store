const mongoose = require('mongoose');
const { OrderStatus } = require('../constants/order_status')
const { foodSchema } = require('../models/food.model');

const LatLngSchema = new mongoose.Schema(
    {
        lat: { type: String, required: true },
        lng: { type: String, required: true },
    }
);

const OrderItemSchema = new mongoose.Schema(
    {
        food: { type: foodSchema, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
    }
);

const orderSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        addressLatLng: { type: LatLngSchema, required: true },
        paymentId: { type: String },
        totalPrice: { type: Number, required: true },
        items: { type: [OrderItemSchema], required: true },
        status: { type: String, default: OrderStatus.NEW },
        user: { type: mongoose.Schema.Types.ObjectId, required: true },
    },
    {
        timestamps: true,
        toJSON: {virtuals: true},
        toObject: {virtuals: true},
    }
);

const OrderModel = new mongoose.model('order', orderSchema);

module.exports = { OrderModel };