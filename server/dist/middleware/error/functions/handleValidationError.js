"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = (err, res) => {
    let errors = Object.values(err.errors).map((el) => el.message);
    let fields = Object.values(err.errors).map((el) => el.path);
    let code = 400;
    if (errors.length > 1) {
        const formattedErrors = errors.join(" ");
        res.status(code).send({
            statusText: "FAILED",
            message: formattedErrors,
            fields: fields,
        });
    }
    else {
        res
            .status(code)
            .send({ statusText: "FAILED", message: errors, fields: fields });
    }
};
exports.handleValidationError = handleValidationError;
