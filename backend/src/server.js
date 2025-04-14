const express = require('express');
const cors = require('cors');
const sample_data = require('./data');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/foods", (req, res) => {
    res.send(sample_data.sample_food);
})

app.get("/api/foods/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    const foods = sample_data.sample_food.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
    res.send(foods);
})

app.get("/api/tags", (req, res) => {
    res.send(sample_data.sample_tags);
})

app.get("/api/foods/tag/:tagName", (req, res) => {
    const tagName = req.params.tagName;
    const foods = sample_data.sample_food.filter(food => food.tags?.includes(tagName))
    res.send(foods);
})

app.get("/api/foods/:foodId", (req, res) => {
    const foodId = req.params.foodId;
    const food = sample_data.sample_food.find(food => food.id == foodId)
    res.send(food);
})

app.post("/api/users/login", (req, res) => {
    // const body = req.body;
    const { email, password } = req.body;
    const user = sample_data.sample_users.find(user => user.email == email && user.password == password);

    if (user) {
        res.send(generateTokenResponse(user));
    } else {
        res.status(400).send("User name or Password is not valid!")
    }
})

const generateTokenResponse = (user) => {
    const token = jwt.sign({
        email: user.email, isAdmin: user.isAdmin
    }, 'SomeRandomText', {
        expiresIn: "30d"
    })

    user.token = token;
    return user;
}
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Listing On ${port} Port!!`);
})