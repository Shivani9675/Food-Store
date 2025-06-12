const mongoose = require('mongoose');

const subcategoriesSchema = new mongoose.Schema(
    {
        categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories', required: true },
        name: { type: String, required: true },
        imageUrl: { type: String, required: true },
        discount: { type: String },
        rating: { type: Number, required: true },
        deliveryTime: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        location: { type: String, required: true }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true
    }
);

const SubCategories = new mongoose.model('SubCategories', subcategoriesSchema)
module.exports = { SubCategories }