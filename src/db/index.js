import mongoose from "mongoose";
import {DB_NAME} from "../constant.js";


const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`)
        console.log(`\nMongo DB connected !! DB HOST : ${connectionInstance.connection.host}`);       
    } catch (error) {
        console.log("MONGO DB Connection Failed",error);
        process.exit(1)        
    }
}

export default connectDB;