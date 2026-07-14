import dns from "dns";
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = () => {
  return mongoose
    .connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    .then((connectionInstance) => {
      console.log(
        `MongoDB Connected DB_HOST: ${connectionInstance.connection.host}`
      );
    })
};

export default connectDB;