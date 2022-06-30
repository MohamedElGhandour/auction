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
exports.createProduct = void 0;
const product_1 = __importDefault(require("../../models/product/product"));
const createProduct = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(request.body);
        const product = new product_1.default(Object.assign(Object.assign({}, request.body), { livePrice: request.body.startingPrice, owner: request.user._id }));
        yield product.save();
        response.json(product);
    }
    catch (error) {
        next(error);
    }
});
exports.createProduct = createProduct;
