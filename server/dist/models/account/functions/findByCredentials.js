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
exports.findByCredentials = void 0;
const myError_1 = __importDefault(require("../../../utility/myError"));
const account_1 = __importDefault(require("../account"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const findByCredentials = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield account_1.default.findOne({ email });
    if (!user)
        throw new myError_1.default("Unable to login");
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch)
        throw new myError_1.default("Unable to login");
    return user;
});
exports.findByCredentials = findByCredentials;
