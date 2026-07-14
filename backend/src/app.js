import express from "express";
import product from "./routes/productRoutes.js";
import errorMiddleware from "./middlewares/errorMiddlewares.js";

const app = express();

//middleware
app.use(express.json());

//routes
app.use("/api/v1", product);

app.use(errorMiddleware)

export default app;
