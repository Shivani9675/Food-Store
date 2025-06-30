const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String },
        phonenumber: { type: Number, required: true, unique: true },
        otp: { type: String },
        otpExpires: { type: Date },
        isVerified: { type: Boolean, default: false }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true
    }
);

const User = new mongoose.model('user', userSchema);
module.exports = User