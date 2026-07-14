import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
dotenv.config({ path: "backend/config/config.env" });

const PORT = process.env.PORT || 3000;

// Connecting Database
connectDB();

// Handle uncaught exception errors
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server is Shutting Down, Due to uncaught exception errors`);
  process.exit(1);
});

// Starting Server
const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server is Shutting Down, due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
