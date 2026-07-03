import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
dotenv.config({ path: "backend/config/config.env" });

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
