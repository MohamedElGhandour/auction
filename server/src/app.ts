//  Devlopment
import path from "path";
require("dotenv").config({
  path: path.resolve(__dirname, "../config/dev.env"),
});
//  Packages
import "./db/mongoose";
import express from "express";
import cors from "cors";
//  Routers
import authRouter from "./routers/auth";
//  Middleware
import { errorHandler } from "./middleware/error/error";

//  App
const app = express();

app.use(cors());

app.use(express.json());

app.use("/auth", authRouter);

app.use(errorHandler);

//  Not Found - 404
app.get("*", (_req, res) => {
  res.status(404).json({ err: "Not Found" });
});

export = app;
