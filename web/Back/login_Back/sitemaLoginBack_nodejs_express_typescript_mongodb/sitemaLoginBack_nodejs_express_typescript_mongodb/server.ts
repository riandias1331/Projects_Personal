import dotenv from 'dotenv'
import express, { Express } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import routes from './route.ts'

dotenv.config()
const app = express()
const port: string | number = process.env.PORT || 4444

//  Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
app.use(routes)

// Database
mongoose.connect(process.env.DATABASE_URL as string)
    .then(() => {
        console.log('Database is connected')
        app.emit('DataBase')
    })

// Server
app.on("DataBase", () => {
    app.listen(port, () => {
        console.log(`Server is running in ${port}`)
    })
})