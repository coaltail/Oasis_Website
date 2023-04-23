import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import connectToDatabase from "./db/database.mjs"
import { registerNewUser } from "./controllers/auth.js"
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import orderRoutes from './routes/order.js';
import productRoutes from './routes/product.js'
// config 
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }))


// App routes, check routes folder to see endpoints
app.use("/auth", authRoutes)
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/products", productRoutes);


const port = process.env.PORT
const uri = process.env.ATLAS_URI

const startServer = async () => {
    try {
        connectToDatabase(uri)
        app.listen(port, () => { console.log(`Server successfully started on: localhost:${port}`) })
    }
    catch (error) {
        console.log(error)
    }
}

startServer()
app.get('/', (req, res) => {
    res.send({ message: "Json" })
})
