import dotenv from "dotenv"
import DB_Connection from "./database/index.js";
import { app } from "./app.js";
dotenv.config({
    path:'./env'
})

DB_Connection()
.then(()=>{
    app.listen(process.env.PORT || 3000, ()=>{
        console.log('server is running at port : ' , process.env.PORT);
        
    })
})
.catch((err)=>{
console.log("mongo db connnection faiiled", err);

})


//************** */ writing direct code to connect in index.js ************


//import mongoose from "mongoose"
// import { DB_NAME } from "./constants";
// // always wrap your code in try catch  while connecting the  database
// // async await must be used
// import express from "express"
// const app= express();
// ;(async()=>{
// try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//     app.on("error",(error)=>{
//         console.log("eror occured after the connection and the log generated by code at the line 11 of index.js : ", error );
//          throw error
//     })
//     app.listen(process.env.PORT, ()=>{
//         `your app is listening on the port ${process.env.PORT}`
//     })

// } catch (error) {
//     console.log("Error : ",error);
//     throw new Error("some thing wrong at the connection");
    
// }
// })()
