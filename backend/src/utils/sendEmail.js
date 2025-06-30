const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendOTP = async (to, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Food Mine Verification Code',
        text: `Your verification code is ${otp} to access your Food Mine Account. It is valid for 5 minutes.`,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendOTP;