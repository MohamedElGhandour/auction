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
exports.bid = void 0;
const bid_1 = __importDefault(require("../../models/bid/bid"));
const product_1 = __importDefault(require("../../models/product/product"));
const bid = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bid = new bid_1.default(Object.assign(Object.assign({}, request.body), { owner: request.user._id }));
        yield bid.save();
        const product = yield product_1.default.findOne({
            _id: request.body.product,
        }).populate([
            {
                path: "bids",
                populate: { path: "owner", select: "-__v -password -tokens" },
                options: { sort: { created_at: -1 } },
            },
            { path: "owner", select: "-__v -password -tokens" },
        ]);
        if (!product)
            response.status(404).send("Not Found");
        request.user.currencyAmount =
            request.user.currencyAmount - request.body.price;
        yield request.user.save();
        product.livePrice = request.body.price;
        yield product.save();
        response.json({
            product,
            bids: product.bids,
            currencyAmount: request.user.currencyAmount,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.bid = bid;
