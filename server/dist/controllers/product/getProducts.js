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
exports.products = void 0;
const product_1 = __importDefault(require("../../models/product/product"));
const products = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const match = {};
    const sort = {};
    if (request.query.completed)
        match.completed =
            request.query.completed.toLowerCase() === "true";
    if (request.query.sortBy) {
        const parts = request.query.sortBy.split(":");
        sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }
    try {
        const products = yield product_1.default.find({});
        response.status(200).json({ products });
    }
    catch (error) {
        response.status(400).json(error);
    }
});
exports.products = products;
