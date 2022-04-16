"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.product = void 0;
const product_1 = __importDefault(require("../../models/product/product"));
const product = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = request.params.id;
    try {
        const product = yield product_1.default.findOne({ _id }).populate([
            {
                path: "bids",
                populate: { path: "owner", select: "-__v -password -tokens" },
                options: { sort: { created_at: -1 } },
            },
            { path: "owner", select: "-__v -password -tokens" },
        ]);
        if (!product)
            response.status(404).send("Not Found");
        response.json({ product, bids: product.bids });
    }
    catch (error) {
        response.status(400).json(error);
    }
});
exports.product = product;
