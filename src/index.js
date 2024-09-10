import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
    path:'./.env'
})

connectDB()
.then(()=>{
    app.on("Error",(error)=>{
        console.log("Error",error)
        throw error       
    })
    app.listen(process.env.PORT,()=>{
        console.log(`Server Running at Port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!! ", err);
})