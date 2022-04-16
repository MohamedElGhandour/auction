"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path_1 = __importDefault(require("path"));
require("dotenv").config({
    path: path_1.default.resolve(__dirname, "../config/dev.env"),
});
require("./db/mongoose");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routers/auth"));
const product_1 = __importDefault(require("./routers/product"));
const stripe_1 = __importDefault(require("./routers/stripe"));
const bid_1 = __importDefault(require("./routers/bid"));
const error_1 = require("./middleware/error/error");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", auth_1.default);
app.use("/api/product", product_1.default);
app.use("/api/stripe", stripe_1.default);
app.use("/api/bid", bid_1.default);
app.use(error_1.errorHandler);
app.get("*", (_req, res) => {
    res.status(404).json({ err: "Not Found" });
});
module.exports = app;
