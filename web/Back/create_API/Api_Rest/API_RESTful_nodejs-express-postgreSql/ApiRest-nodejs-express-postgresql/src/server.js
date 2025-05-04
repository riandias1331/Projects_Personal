import express from 'exprees'
import dotenv from 'dotenv' 
dotenv.config()
const app = express()
const port = process.env.PORT || 3333

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

import userRoutes from './routes/userroutes.js'
import authRoutes from './routes/authroutes.js'
app.use(userRoutes, authRoutes)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

