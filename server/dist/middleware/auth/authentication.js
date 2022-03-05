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
const jsonwebtoken_1 = require("../../utility/jsonwebtoken");
const Account = require("../../models/account/account");
const auth = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = request.header("Authorization").split(" ");
        if (token[0] !== "Bearer")
            throw new Error();
        const decoded = (0, jsonwebtoken_1.verifyToken)(token[1]);
        const user = yield Account.findOne({
            _id: decoded._id,
            "tokens.token": token[1],
        });
        if (!user)
            throw new Error();
        request.token = token[1];
        request.user = user;
        next();
    }
    catch (error) {
        response.status(401).send({ error: "please authenticate" });
    }
});
module.exports = auth;
