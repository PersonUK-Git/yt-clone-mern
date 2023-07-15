import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/users.js"
const app = express()

dotenv.config()
const connect = () => {
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log(`Connected to DataBase`);
    }).catch((error) => {
        console.log(`Error in connecting to database : ${error}`);
    })
}



app.listen(8000, ()=>{
    connect() 
    console.log(`connected to server : 8000`);
})