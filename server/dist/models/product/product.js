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
    startingPrice: {
        type: Number,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    livePrice: {
        type: Number,
        required: true,
    },
    categories: {
        type: [
            {
                category: {
                    type: String,
                    trim: true,
                    required: true,
                },
            },
        ],
        validate(array) {
            if (array.length === 0) {
                throw new Error("categories are required.");
            }
        },
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    closingDate: {
        type: Date,
        required: true,
    },
    images: {
        type: [
            {
                image: {
                    type: String,
                    trim: true,
                    required: true,
                },
            },
        ],
        validate(array) {
            if (array.length === 0) {
                throw new Error("images are required.");
            }
        },
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
    successfulAuction: {
        type: Boolean,
    },
    state: {
        type: String,
        trim: true,
        required: true,
        default: "alive",
    },
};
const options = {
    timestamps: true,
    toJSON: { virtuals: true },
};
const schema = new mongoose_1.Schema(productSchema, options);
schema.virtual("bids", {
    ref: "Bid",
    localField: "_id",
    foreignField: "product",
});
schema.methods.toJSON = index_1.toJSON;
const Product = (0, mongoose_1.model)("Product", schema);
module.exports = Product;
