"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDuplicateKeyError = void 0;
const handleDuplicateKeyError = (err, res) => {
    const field = Object.keys(err.keyValue);
    const code = 409;
    const error = `There is already a account with this ${field} address. Please Log In`;
    res
        .status(code)
        .send({ statusText: "FAILED", messages: error, fields: field });
};
exports.handleDuplicateKeyError = handleDuplicateKeyError;
