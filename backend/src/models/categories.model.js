const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        label: { type: String, required: true },
        imageUrl: { type: String, required: true },
        description: { type: String, required: true }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true
    }
);

const Categories = new mongoose.model('Categories', categoriesSchema)
module.exports = { Categories }