import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT,
  MONGO: process.env.MONGO_URI,
};

export default config;
