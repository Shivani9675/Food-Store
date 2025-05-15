const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { sample_users } = require('../data');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const { HTTP_BAD_REQUEST } = require('../constants/http_status');
const bcrypt = require('bcryptjs');

router.get("/seed", asyncHandler(
    async (req, res) => {
        const userCount = await User.countDocuments();
        if (userCount > 0) {
            res.send("Seed is already done!")
            return;
        }

        await User.create(sample_users);
        res.send("Seed Is done!");
    }
))

router.post("/login", asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.send(generateTokenResponse(user));
        } else {
            res.status(HTTP_BAD_REQUEST).send("User name or Password is not valid!")
        }
    }
))

router.post("/register", asyncHandler(
    async (req, res) => {
        const { name, email, password, address } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            res.status(HTTP_BAD_REQUEST).send("User is already exist, please login!");
            return;
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: '',
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            address,
            isAdmin: false
        }

        const dbUser = await User.create(newUser);
        res.send(generateTokenResponse(dbUser));
    }
))

const generateTokenResponse = (user) => {
    const token = jwt.sign({
        id:user.id, email: user.email, isAdmin: user.isAdmin
    }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
    };
}

module.exports = router;