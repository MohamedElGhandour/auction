"use strict";
const mongoose_1 = require("mongoose");
const index_1 = require("./functions/index");
const { ObjectId } = mongoose_1.Schema.Types;
const bidSchema = {
    owner: {
        type: ObjectId,
        required: true,
        ref: "Account",
    },
    product: {
        type: ObjectId,
        required: true,
        ref: "Product",
    },
    price: {
        type: Number,
        required: true,
    },
};
const options = {
    timestamps: true,
};
const schema = new mongoose_1.Schema(bidSchema, options);
schema.methods.toJSON = index_1.toJSON;
const Bid = (0, mongoose_1.model)("Bid", schema);
module.exports = Bid;
