const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { sample_users } = require('../data');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const { HTTP_BAD_REQUEST, HTTP_SUCCESS_REQUEST } = require('../constants/http_status');
const bcrypt = require('bcryptjs');
const sendOTP = require('../utils/sendEmail');
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

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

router.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    let user = await User.findOne({ email });

    if (!user) {
        user = new User({ email });
    }

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await sendOTP(email, otp);
    res.json({ message: 'OTP sent to your email.', isSignup: true });
});

router.post("/sign-up", asyncHandler(
    async (req, res) => {
        const { email, name, phonenumber } = req.body;

        const existingEmail = await User.findOne({ email });
        const existingPhone = await User.findOne({ phonenumber });

        if (existingEmail) {
            return res.status(HTTP_BAD_REQUEST).json({ message: "Email already registered. Please login." });
        }

        if (existingPhone) {
            return res.status(HTTP_BAD_REQUEST).json({ message: "Phone number already registered." });
        }

        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 5 minutes

        const newUser = new User({
            email,
            name,
            phonenumber,
            otp,
            otpExpires,
            isVerified: false
        })

        await newUser.save();
        await sendOTP(email, otp);
        return res.status(HTTP_SUCCESS_REQUEST).json({ message: "OTP sent to your email. Please check!" });
    }
))

router.post("/sign-in", asyncHandler(
    async (req, res) => {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(HTTP_BAD_REQUEST).json({ message: "Email not found. Please register." });
        }

        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();
        await sendOTP(email, otp);

        return res.status(HTTP_SUCCESS_REQUEST).json({ message: "OTP sent to your email. Please check!" });
    }
))

router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(HTTP_BAD_REQUEST).json({ message: "User not found" });
    }

    if (user.otp !== otp || user.otpExpires < new Date()) {
        return res.status(HTTP_BAD_REQUEST).json({ message: 'Invalid or expired OTP' });
    }

    user.otp = undefined;
    user.otpExpires = undefined;
    user.isVerified = true;
    await user.save();

    return res.json({
        ...generateTokenResponse(user),
        message: 'User verified successfully'
    });
});

const generateTokenResponse = (user) => {
    const token = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_SECRET, { expiresIn: "30d" })

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        phonenumber: user.phonenumber,
        token
    };
}

module.exports = router;