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
import cookieParser from "cookie-parser"
// config 
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
dotenv.config()
//app imports
const app = express()
app.use(cors(corsOptions))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

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
