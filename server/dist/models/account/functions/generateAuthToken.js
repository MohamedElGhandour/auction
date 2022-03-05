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
exports.generateAuthToken = void 0;
const jsonwebtoken_1 = require("../../../utility/jsonwebtoken");
function generateAuthToken() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const token = (0, jsonwebtoken_1.generateToken)({ _id: user._id.toString() });
        user.tokens = user.tokens.concat({ token });
        yield user.save();
        return token;
    });
}
exports.generateAuthToken = generateAuthToken;
