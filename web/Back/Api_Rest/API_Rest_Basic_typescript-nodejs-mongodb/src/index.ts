import express from 'express';
import dotenv from 'dotenv';

async function start(){
    dotenv.config({
        path:  './.env'
    });
    const app = express();
    const port = process.env.PORT || 3000;
  
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
}
start().catch((err) => {
    console.error(err);
    process.exit(1);
});