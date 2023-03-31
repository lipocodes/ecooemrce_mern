import mongoose from "mongoose";


const connectDB =  async()=>{
   try{
     const conn = await mongoose.connect(process.env.MONGO_URL);
     console.log(`MONGODB connected to ${conn.connection.host}`);
   }catch(error){
    console.log(`Error in MONGODB: ${error}`);
   }
}

export default connectDB;
