import dotenv from 'dotenv'
import express, { Express } from 'express'
import cors from 'cors'
import route from './routes'

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


// Server
app.listen(() => {
    console.log(`Server is running in ${port}`)
})
