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
const node_schedule_1 = __importDefault(require("node-schedule"));
const product_1 = __importDefault(require("../models/product/product"));
const wallet_1 = __importDefault(require("../models/wallet/wallet"));
const account_1 = __importDefault(require("../models/account/account"));
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield product_1.default.find().populate([
            {
                path: "bids",
                populate: { path: "owner", select: "-__v -password -tokens" },
                options: { sort: { createdAt: -1 } },
            },
            { path: "owner", select: "-__v -password -tokens" },
        ]);
        products.forEach((product) => __awaiter(this, void 0, void 0, function* () {
            endAuction(product, "immediate");
            node_schedule_1.default.scheduleJob(new Date(product.closingDate), function () {
                return __awaiter(this, void 0, void 0, function* () {
                    endAuction(product, "schedule");
                });
            });
        }));
    });
})();
const endAuction = (product, type) => __awaiter(void 0, void 0, void 0, function* () {
    if (product.closingDate > new Date() && type === "immediate") {
        product.state = "alive";
        product.successfulBidder = undefined;
        product.successfulAuction = undefined;
        yield product.save();
    }
    else {
        product.state = "finished";
        if (product.bids.length > 0 && product.successfulAuction === undefined) {
            product.successfulAuction = true;
            product.successfulBidder = {
                bid: product.bids[0]._id,
                bider: product.bids[0].owner._id,
            };
            const losersBidder = [];
            product.bids.forEach((bid) => {
                if (!(String(bid.owner._id) === String(product.bids[0].owner._id))) {
                    if (!losersBidder.includes(bid.owner._id))
                        losersBidder.push(bid.owner._id);
                }
            });
            if (losersBidder.length > 0) {
                const losersBiggestBid = losersBidder.map((loserBidder) => {
                    let biggestBid = null;
                    for (let index = 0; index < product.bids.length; index++)
                        if (String(loserBidder) === String(product.bids[index].owner._id))
                            biggestBid =
                                biggestBid === null
                                    ? product.bids[index]
                                    : product.bids[index].price > biggestBid.price
                                        ? product.bids[index]
                                        : biggestBid;
                    return biggestBid;
                });
                losersBiggestBid.forEach((loserBiggestBid) => __awaiter(void 0, void 0, void 0, function* () {
                    const user = yield account_1.default.findOne({
                        _id: loserBiggestBid.owner._id,
                    });
                    user.currencyAmount = user.currencyAmount + loserBiggestBid.price;
                    const wallet = new wallet_1.default({
                        owner: loserBiggestBid.owner._id,
                        amount: loserBiggestBid.price,
                        type: true,
                        state: "Refund after auction ends",
                        bid: loserBiggestBid,
                        product: loserBiggestBid.product,
                    });
                    yield wallet.save();
                    yield (user === null || user === void 0 ? void 0 : user.save());
                }));
            }
        }
        else {
            product.successfulAuction = false;
        }
        yield product.save();
    }
});
