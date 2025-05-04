const express = require('express');
const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes.js');
app.use(routes);

app.listen(() => {
    console.log(`Server is running on port ${port}`);
})