const express = require('express');
const router = express.Router();
const { sample_food } = require('../data');
const asyncHandler = require('express-async-handler');
const { Food } = require('../models/food.model');

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
        res.send(foods);
    }
))

router.get("/search/:searchTerm", asyncHandler(
    async (req, res) => {
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const foods = await Food.find({ name: { $regex: searchRegex } });
        res.send(foods);
    }
))

router.get("/tags", asyncHandler(
    async (req, res) => {
        const tags = await Food.aggregate([
            {
                $unwind: '$tags'
            },
            {
                $group: {
                    _id: '$tags',
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id',
                    count: '$count'
                }
            }
        ]).sort({ count: -1 });

        const all = {
            name: 'All',
            count: await Food.countDocuments()
        }

        tags.unshift(all);
        res.send(tags);
    }
))

router.get("/tag/:tagName", asyncHandler(
    async (req, res) => {
        const foods = await Food.find({ tags: req.params.tagName })
        res.send(foods);
    }
))

router.get("/:foodId", asyncHandler(
    async (req, res) => {
        const food = await Food.findById(req.params.foodId)
        res.send(food);
    }
))

module.exports = router;