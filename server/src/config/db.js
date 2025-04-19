import mongoose from "mongoose";
import {DB_NAME} from '../constant.js'



const connectDB = async () =>{
    try {
      const connectionInstance=  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Database Connected on Host ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(`Database connection faild ${error}`)
        process.exit(1)
    } 
}

export default connectDB