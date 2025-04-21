import  express  from "express";
const app = express();
const port = 3333

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

import mongoose from "mongoose"
mongoose.connect('')
    .then(() => {
    console.log("MongoDB connected")
    app.emit("dbConnected")
}).catch((err) => {
    console.error("MongoDB connection error:", err)
})

app.on('dbConnected', () => {
    console.log("Database connected")
    // Start the server only after the database is connected
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`)
    })
})
