import dotenv from 'dotenv'
import express, { Express } from 'express'
import cors from 'cors'
import routes from './route'
import mongoose from 'mongoose'

dotenv.config()
const app: Express = express()
const port: string | number = process.env.PORT || 5000

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// routes
app.use(routes)

// Database
mongoose.connect(process.env.DATABASE_URL as string)
    .then(() => {
        console.log("Database is Connected")
        app.emit("DataBase")
    })
    .catch((error) => {
        console.log(error)
    })

// Server
app.on("DataBase", () => {
    app.listen(port, () => {
        console.log(`Server is running in ${port} `)
    })
})  