"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.SECRET_KEY;
const generateToken = (payload) => jsonwebtoken_1.default.sign(payload, SECRET_KEY);
exports.generateToken = generateToken;
const verifyToken = (token) => jsonwebtoken_1.default.verify(token, SECRET_KEY);
exports.verifyToken = verifyToken;
