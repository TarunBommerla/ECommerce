import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { v2 as cloudinary } from "cloudinary";
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "backend/config/config.env" });
}

const PORT = process.env.PORT || 3000;

// -------------------------Connecting Database
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// -------------------------Handle uncaught exception errors
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server is Shutting Down, Due to uncaught exception errors`);
  process.exit(1);
});

// -------------------------Starting Server
const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

// -------------------------Handling Promise Rejection Errors
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server is Shutting Down, due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
