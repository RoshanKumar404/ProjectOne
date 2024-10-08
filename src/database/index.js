import mongoose from "mongoose";
import express from "express";
import { DB_NAME } from "../constants.js";

const DB_Connection= async ()=>{
    try {
       const connectionInstnce= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       console.log(`\n MongoDB connected !! DB HOST : ${connectionInstnce.connection.host}`);
       
    
        
    } catch (error) {
        console.log("error while connecting  : " , error)
        process.exit(1)
    }
}

export default DB_Connection;