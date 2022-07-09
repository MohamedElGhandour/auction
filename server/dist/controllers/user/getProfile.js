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
exports.profile = void 0;
const account_1 = __importDefault(require("../../models/account/account"));
const product_1 = __importDefault(require("../../models/product/product"));
const profile = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(request.query.page);
        const count = parseInt(request.query.count);
        const profile = yield account_1.default.findOne({
            _id: request.user._id,
        });
        const products = yield product_1.default.find({ owner: request.user._id })
            .skip(count * (page - 1))
            .sort({ createdAt: -1 })
            .limit(count);
        const countProducts = yield product_1.default.find({
            owner: request.user._id,
        }).countDocuments();
        response.status(200).json({ profile, products, countProducts });
    }
    catch (error) {
        response.status(400).json(error);
    }
});
exports.profile = profile;
