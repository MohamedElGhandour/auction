"use strict";
const mongoose_1 = require("mongoose");
const index_1 = require("./functions/index");
const { ObjectId } = mongoose_1.Schema.Types;
const walletSchema = {
    owner: {
        type: ObjectId,
        required: true,
        ref: "Account",
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: Boolean,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    product: {
        type: ObjectId,
        ref: "Product",
    },
    bid: {
        type: ObjectId,
        ref: "Bid",
    },
};
const options = {
    timestamps: true,
};
const schema = new mongoose_1.Schema(walletSchema, options);
schema.methods.toJSON = index_1.toJSON;
const Wallet = (0, mongoose_1.model)("Wallet", schema);
module.exports = Wallet;
