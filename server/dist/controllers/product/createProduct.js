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
const sharp_1 = __importDefault(require("sharp"));
const createProduct = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!request.file)
            throw new Error("Image is Required");
        const buffer = yield (0, sharp_1.default)(request.file.buffer).png().toBuffer();
        const product = new product_1.default(Object.assign(Object.assign({}, request.body), { owner: request.user._id, image: buffer }));
        yield product.save();
        response.json(product);
    }
    catch (error) {
        next(error);
    }
});
exports.createProduct = createProduct;
