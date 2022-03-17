import { ErrorRequestHandler } from "express";
import {
  handleDuplicateKeyError,
  handleValidationError,
} from "./functions/index";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  try {
    if (err.name === "ValidationError")
      return (err = handleValidationError(err, res));

    if (err.code && err.code == 11000)
      return (err = handleDuplicateKeyError(err, res));

    return res.status(400).json({ statusText: "FAILED", message: err.message });
  } catch (err) {
    res
      .status(500)
      .json({ statusText: "FAILED", message: "An unknown error occurred." });
  }
};
