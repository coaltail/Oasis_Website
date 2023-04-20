import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import connectToDatabase from "./db/database.mjs"
import { registerNewUser } from "./controllers/auth.js"
import authRoutes from './routes/auth.js';

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use("/auth", authRoutes)
const port = process.env.PORT
const uri = process.env.ATLAS_URI

const startServer = async () =>
{
    try{
        connectToDatabase(uri)
        app.listen(port, () => {console.log(`Server successfully started on: localhost:${port}`)})
    }  
    catch(error){
        console.log(error)
    }
}

startServer()
app.get('/', (req,res) =>{
    res.send({message: "Json"})
})
