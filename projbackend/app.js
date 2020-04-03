require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("Connected to database");
}).catch((e) => {
    console.log(e);
});

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    return res.send('hello');
});

app.listen(port, () => {
    console.log(`Server is up and listening at port ${port}`);
});
