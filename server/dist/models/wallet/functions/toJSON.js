"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJSON = void 0;
function toJSON() {
    const wallet = this;
    const walletObject = wallet.toObject();
    delete walletObject.__v;
    return walletObject;
}
exports.toJSON = toJSON;
