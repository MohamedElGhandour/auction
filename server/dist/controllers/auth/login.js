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
exports.logIn = void 0;
const account_1 = __importDefault(require("../../models/account/account"));
const logIn = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const account = yield account_1.default.findByCredentials(request.body.email, request.body.password);
        const token = yield account.generateAuthToken();
        response.status(200).json({ account, token });
    }
    catch (error) {
        next(error);
    }
});
exports.logIn = logIn;
