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
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentPhone = void 0;
const paymentPhone = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        request.user.currencyAmount =
            request.user.currencyAmount + request.body.amount;
        yield request.user.save();
        response.status(200).json({ currencyAmount: request.user.currencyAmount });
    }
    catch (error) {
        response.status(400).json(error);
    }
});
exports.paymentPhone = paymentPhone;
