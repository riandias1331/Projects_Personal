const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');
        app.emit('DataBase'); 
    })
    .catch(err => console.error('MongoDB connection error:', err));


app.on(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    })
})