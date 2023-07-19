import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import videoRoutes from "./routes/videos.js"
import userRoutes from "./routes/users.js"
import commentRoutes from "./routes/comments.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express()

dotenv.config()
const connect = () => {
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log(`Connected to DataBase`);
    }).catch((error) => {
        console.log(`Error in connecting to database : ${error}`);
    })
}

app.use(cookieParser())
app.use(express.json())
app.use(cors())
 
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/comments", commentRoutes)

app.use((err, req, res, next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong !"
    return res.status(status).json({
        success : false,
        status,
        message        
    })
})


app.listen(8000, ()=>{
    connect() 
    console.log(`connected to server : 8000`);
})