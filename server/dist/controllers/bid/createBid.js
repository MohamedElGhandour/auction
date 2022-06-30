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
const wallet_1 = __importDefault(require("../../models/wallet/wallet"));
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
                options: { sort: { createdAt: -1 } },
            },
            { path: "owner", select: "-__v -password -tokens" },
        ]);
        if (!product) {
            yield bid_1.default.findOneAndDelete({ _id: bid._id });
            return response.json({ msg: "PRODUCT NOT FOUND", statusText: "FAILED" });
        }
        if (String(product.owner._id) === String(request.user._id)) {
            yield bid_1.default.findOneAndDelete({ _id: bid._id });
            return response.json({
                msg: "YOU CANT BID FOR YOUR OWN PRODUCT",
                statusText: "FAILED",
            });
        }
        let biggestBidPrice = 0;
        for (let index = 0; index < product.bids.length; index++)
            if (String(product.bids[index].owner._id) == String(request.user._id))
                biggestBidPrice =
                    product.bids[index].price > biggestBidPrice
                        ? product.bids[index].price
                        : biggestBidPrice;
        const realPrice = request.body.price - biggestBidPrice;
        if (realPrice > request.user.currencyAmount)
            return response.json({ msg: "Charge your wallet", statusText: "FAILED" });
        request.user.currencyAmount = request.user.currencyAmount - realPrice;
        yield request.user.save();
        product.livePrice = request.body.price;
        yield product.save();
        const wallet = new wallet_1.default({
            owner: request.user._id,
            amount: realPrice,
            type: false,
            state: "Withdraw your bid in auctions",
            bid: bid,
            product: product,
        });
        yield wallet.save();
        return response.json({
            product,
            bids: product.bids,
            currencyAmount: request.user.currencyAmount,
        });
    }
    catch (error) {
        return next(error);
    }
});
exports.bid = bid;
