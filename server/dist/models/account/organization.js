"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const account_1 = __importDefault(require("./account"));
const mongoose_1 = require("mongoose");
const organizationSchema = {
    location: {
        type: String,
        trim: true,
    },
};
const options = {
    discriminatorKey: "kind",
};
const schema = new mongoose_1.Schema(organizationSchema, options);
const Organization = account_1.default.discriminator("Organization", schema);
module.exports = Organization;
