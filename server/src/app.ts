//  Devlopment
import path from "path";
require("dotenv").config({
  path: path.resolve(__dirname, "../config/dev.env"),
});
//  Packages
import "./db/mongoose";
import express from "express";
import cors from "cors";

// scheduling and immdiate Function
import "./scheduling/schedule";

//  Routers
import authRouter from "./routers/auth";
import productRouter from "./routers/product";
import stripeRouter from "./routers/stripe";
import bidRouter from "./routers/bid";
import walletRouter from "./routers/wallet";
import userRouter from "./routers/user";

//  Middleware
import { errorHandler } from "./middleware/error/error";

//  App
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRouter);

app.use("/api/product", productRouter);

app.use("/api/stripe", stripeRouter);

app.use("/api/bid", bidRouter);

app.use("/api/wallet", walletRouter);

app.use("/api/user", userRouter);

app.use(errorHandler);

//  Not Found - 404
app.get("*", (_req, res) => {
  res.status(404).json({ err: "Not Found" });
});

export = app;
