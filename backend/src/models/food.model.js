const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        tags: { type: [String] },
        favorite: { type: Boolean, default: false },
        rating: { type: Number, required: true },
        imageUrl: { type: String, required: true },
        discount: { type: String },
        description: { type: String, required: true },
        origins: { type: [String], required: true },
        deliveryTime: { type: String, required: true }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true
    }
);

const Food = new mongoose.model('Food', foodSchema)
module.exports = { Food, foodSchema }