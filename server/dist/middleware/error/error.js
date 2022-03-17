"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const index_1 = require("./functions/index");
const errorHandler = (err, _req, res, _next) => {
    try {
        if (err.name === "ValidationError")
            return (err = (0, index_1.handleValidationError)(err, res));
        if (err.code && err.code == 11000)
            return (err = (0, index_1.handleDuplicateKeyError)(err, res));
        return res.status(400).json({ statusText: "FAILED", message: err.message });
    }
    catch (err) {
        res
            .status(500)
            .json({ statusText: "FAILED", message: "An unknown error occurred." });
    }
};
exports.errorHandler = errorHandler;
