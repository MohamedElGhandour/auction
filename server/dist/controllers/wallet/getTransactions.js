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
exports.transactions = void 0;
const wallet_1 = __importDefault(require("../../models/wallet/wallet"));
const transactions = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield wallet_1.default.find({
            owner: request.user._id,
        }).sort([["createdAt", -1]]);
        response
            .status(200)
            .json({ transactions, currencyAmount: request.user.currencyAmount });
    }
    catch (error) {
        response.status(400).json(error);
    }
});
exports.transactions = transactions;
