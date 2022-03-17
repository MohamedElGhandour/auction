"use strict";
const mongoose_1 = require("mongoose");
const index_1 = require("./functions/index");
const { ObjectId } = mongoose_1.Schema.Types;
const productSchema = {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    owner: {
        type: ObjectId,
        required: true,
        ref: "Account",
    },
    comments: {
        type: ObjectId,
        ref: "Comment",
    },
    bids: {
        type: ObjectId,
        ref: "bid",
    },
    startingPrice: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    startingDate: { type: Date, default: Date.now },
    closingDate: {
        type: Date,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    successfulBidder: {
        bid: {
            type: ObjectId,
            ref: "bid",
        },
        bider: {
            type: ObjectId,
            ref: "Account",
        },
    },
};
const options = {
    timestamps: true,
};
const schema = new mongoose_1.Schema(productSchema, options);
schema.methods.toJSON = index_1.toJSON;
const Product = (0, mongoose_1.model)("Product", schema);
module.exports = Product;
