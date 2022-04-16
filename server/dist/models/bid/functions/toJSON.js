"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJSON = void 0;
function toJSON() {
    const product = this;
    const productObject = product.toObject();
    delete productObject.__v;
    return productObject;
}
exports.toJSON = toJSON;
