"use strict";
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({}, {
    timestamps: true,
});
const Product = (0, mongoose_1.model)("Product", schema);
module.exports = Product;
