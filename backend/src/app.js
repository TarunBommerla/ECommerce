import express from "express";
import dotenv from "dotenv";
import product from "./routes/productRoutes.js";
import user from "./routes/userRoutes.js";
import order from "./routes/orderRoutes.js";
import errorMiddleware from "./middlewares/errorMiddlewares.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({
    path: "backend/config/config.env",
  });
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendPath = path.join(__dirname, "../../frontend/dist");

const app = express();

// -------------------------
// Middleware
// -------------------------

app.use(express.json());

app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// -------------------------
// API Routes
// -------------------------

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

// -------------------------
// Serve React Frontend
// -------------------------

app.use(express.static(frontendPath));

// React Router fallback
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// -------------------------
// Error Middleware
// -------------------------

app.use(errorMiddleware);

export default app;