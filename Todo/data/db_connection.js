import mongoose from "mongoose";

const db_URL = process.env.MONGO_URI;

export const connectDB = () =>{
    mongoose.connect(db_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.log(err));
} 
