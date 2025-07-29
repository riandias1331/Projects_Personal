import dotenv from 'dotenv'
import express, { Express } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import userRoutes from './routes/userRoutes'

dotenv.config()
const app: Express = express()
const port = process.env.PORT || 5000

// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// Routes
app.use(userRoutes)

// Database
mongoose.connect(process.env.DATABASE_URL as string)
    .then(() => {
        console.log('Database is Connnected')
        app.emit('Database')
    })
    .catch((error) => {
        console.log(error)
    })


// Server Running
app.on('Database', () => {
    app.listen(port, () => {
        console.log(`Server is running in port: ${port}`)
    })
})