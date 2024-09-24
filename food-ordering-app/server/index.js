import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";


const app =  express()
dotenv.config();

const connect = async ()=> {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB...")

    }catch(err){
        next(err);
    }
}

mongoose.connection.on("disconnected",()=>{
    console.log("Mongodb disconnected..")
});

app.use(cors())
app.use(cookieParser())
app.use(express.json());

app.use((err,req,res,next)=> {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went worng!"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
    });
});

app.listen(8800,()=> {
    connect();
    console.log("API is working...")
})