const express = require("express");

const app = express();

const port = 8000;

app.get("/", (req, res) => {
    return res.send('Hello');
});

app.get("/login", (req, res) => {
    return res.send('Hello login page');
});

app.get("/signout", (req, res) => {
    return res.send('Hello signout page');
});

app.get("/hitesh", (req, res) => {
    return res.send('Hello users hitesh');
});

app.listen(port, () => console.log(`Server listening on port ${port} `));
