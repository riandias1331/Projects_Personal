// const mongoose = require('mongoose')
// mongoose.connect(process.env.Database_URL)
//         .then(() => {
  //             console.log('Database connected');
  //             app.emit('dataBase'); 
  //         })
  //         .catch(err => console.error('MongoDB connection error:', err));
  // const connectDB = require('../src/config/dbconfig.js')
  // connectDB(app)

  
  // app.on('dataBase', () => {
  //   app.listen(() => {
  //     console.log(`Server is running on http://localhost:${port}`)
  //   })
  // })
  
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/dbconfig';
import routes from './routes/routes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 3333;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
