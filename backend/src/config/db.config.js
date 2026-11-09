import mongoose, { mongo } from "mongoose";
import config from "./config.js";

const dbConnect = async () => {
  try {
    await mongoose.connect(config.MONGO);
    console.log("Database connected successfully✅")
  } catch (error) {
    console.log("Error in connecting to database❌");
  }
};


export default dbConnect;