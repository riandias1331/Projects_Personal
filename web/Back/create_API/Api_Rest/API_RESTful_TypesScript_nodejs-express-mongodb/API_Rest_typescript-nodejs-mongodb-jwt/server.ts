import dotenv from 'dotenv'
import express, { Express } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import routes from './routes'

dotenv.config()
const app: Express = express()
const port: string | number = process.env.PORT || 4444

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Routes
app.use(routes)

// DataBase
mongoose.connect(process.env.DATABASE_URL as string)
    .then(() => {
        console.log("DataBase is connected")
        app.emit("DataBase")
    })
    .catch((error) => {
        console.log(error)
    })

// Server
app.on("DataBase", () => {
    app.listen(port, () => {
        console.log(`Server is running in localhost:${port}`)
    })
})