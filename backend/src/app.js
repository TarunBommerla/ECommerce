import express from "express";
import product from "./routes/productRoutes.js";
import user from "./routes/userRoutes.js";
import order from "./routes/orderRoutes.js";
import errorMiddleware from "./middlewares/errorMiddlewares.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();

// -------------------------middleware
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }));

// -------------------------routes
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

app.use(errorMiddleware);

export default app;
