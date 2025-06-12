const express = require('express');
const router = express.Router();
const { sample_food, categories, subcategories } = require('../data');
const asyncHandler = require('express-async-handler');
const { Food } = require('../models/food.model');
const { Categories } = require('../models/categories.model');
const { SubCategories } = require('../models/subcategories.model');

router.get("/seed", asyncHandler(
    async (req, res) => {
        const foodCount = await Food.countDocuments();
        if (foodCount > 0) {
            res.send("Seed is already done!")
            return;
        }

        await Food.create(sample_food);
        res.send("Seed Is done!");
    }
))

router.get("/", asyncHandler(
    async (req, res) => {
        const foods = await Food.find();

        const formattedFoods = foods.map(food => {
            const obj = food.toObject();
            obj.rating = food.rating.toFixed(1); // convert 3 => "3.0"
            return obj;
        });
        res.send(formattedFoods);
    }
));

router.get("/search/:searchTerm", asyncHandler(
    async (req, res) => {
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const foods = await Food.find({ name: { $regex: searchRegex } });
        res.send(foods);
    }
))

router.get("/categories", asyncHandler(
    async (req, res) => {
        const categories = await Categories.find();
        res.send(categories);
    }
))

router.get("/category/:id", asyncHandler(
    async (req, res) => {
        const subcategories = await SubCategories.find({ categoryId: req.params.id })
        res.send(subcategories);
    }
))

router.get('/subcategories', asyncHandler(async (req, res) => {
    const subcategories = await SubCategories.find().populate('categoryId', 'name');
    res.json(subcategories);
}));

// router.get("/categories", asyncHandler(
//     async (req, res) => {
//         const tags = await Food.aggregate([
//             {
//                 $unwind: '$tags'
//             },
//             {
//                 $group: {
//                     _id: '$tags',
//                     count: { $sum: 1 }
//                 }
//             },
//             {
//                 $project: {
//                     _id: 0,
//                     name: '$_id',
//                     count: '$count'
//                 }
//             }
//         ]).sort({ count: -1 });

//         const all = {
//             name: 'All',
//             count: await Food.countDocuments()
//         }

//         tags.unshift(all);
//         res.send(tags);
//     }
// ))

// router.get("/categories/:categoryName", asyncHandler( 
//     async (req, res) => {
//         const foods = await Categories.find({ tags: req.params.categoryName })
//         res.send(foods);
//     }
// ))

router.get("/:foodId", asyncHandler(
    async (req, res) => {
        const food = await Food.findById(req.params.foodId)
        res.send(food);
    }
))

module.exports = router;