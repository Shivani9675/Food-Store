require('dotenv').config();
require("./configs/database.config");
const express = require('express');
const cors = require('cors');
const foodRouter = require('./routers/food.router');
const userRouter = require('./routers/user.router');
const orderRouter = require('./routers/order.router');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/foods', foodRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server Listing On ${port} Port!!`);
})