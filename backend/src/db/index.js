import dns from "dns"
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

dns.setServers(['1.1.1.1', '8.8.8.8'])

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`,
    );
    console.log(
      `MongoDB Connected DB_HOST:${connectionInstance.connection.host}`,
    );
  } catch (err) {
    console.log("Error: ", err.message);
    process.exit(1);
  }
};

export default connectDB;
