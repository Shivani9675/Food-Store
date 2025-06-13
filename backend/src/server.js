const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
require("./configs/database.config");

const foodRouter = require('./routers/food.router');
const userRouter = require('./routers/user.router');
const orderRouter = require('./routers/order.router');

const app = express();

app.use(cors());
app.use(express.json());

const frontendPath = path.join(__dirname, '../../frontend/dist/frontend/browser');
app.use(express.static(frontendPath));

app.use((req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(frontendPath, 'index.html'));
});

app.use('/api/foods', foodRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server Listing On ${port} Port!!`);
})