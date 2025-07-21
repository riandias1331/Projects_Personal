import dotenv from 'dotenv'
import express, { Express } from 'express'
import cors from 'cors'
import route from './routes'
import { PrismaClient } from '@prisma/client';

dotenv.config()
const app: Express = express()
const port: string | number = process.env.PORT || 3001

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Routes
app.use(route)

// Database
const prisma = new PrismaClient();
app.get('/', async (req, res) => {
  try {
    await prisma.$connect();
    const users = await prisma.user.findMany(); // ou apenas await prisma.$queryRaw`...`
    res.send(`✅ Prisma conectado ao MongoDB com sucesso! Total de usuários encontrados: ${users.length}`);
  } catch (err) {
    res.status(500).send(`Erro ao conectar com Prisma/MongoDB: ${err}`);
  } finally {
    await prisma.$disconnect();
  }
});

// Server
app.listen(port, () => {
    console.log(`Server is running in ${port}`)
})
