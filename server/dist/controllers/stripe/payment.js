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
exports.payment = void 0;
const wallet_1 = __importDefault(require("../../models/wallet/wallet"));
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_KEY, {
    apiVersion: "2020-08-27",
});
const payment = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stripeRes = yield stripe.charges.create({
            source: request.body.tokenId,
            amount: request.body.amount,
            currency: "usd",
        });
        request.user.currencyAmount =
            request.user.currencyAmount + stripeRes.amount / 100;
        yield request.user.save();
        const transaction = new wallet_1.default({
            owner: request.user._id,
            amount: stripeRes.amount / 100,
            type: true,
            state: "Deposit to e-wallet",
        });
        yield transaction.save();
        response.status(200).json({
            stripeRes,
            currencyAmount: request.user.currencyAmount,
            transaction: transaction,
        });
    }
    catch (error) {
        response.status(400).json(error);
    }
});
exports.payment = payment;
