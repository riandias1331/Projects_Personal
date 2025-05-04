require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);

app.listen(PORT, () =>
     console.log(`Servidor rodando na porta ${PORT}`)
);
