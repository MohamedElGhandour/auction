"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const account_1 = __importDefault(require("./account"));
const mongoose_1 = require("mongoose");
const clientSchema = {
    nationalId: {
        type: Number,
        trim: true,
    },
    gender: {
        type: String,
    },
};
const options = {
    discriminatorKey: "kind",
};
const schema = new mongoose_1.Schema(clientSchema, options);
const Client = account_1.default.discriminator("Client", schema);
module.exports = Client;
