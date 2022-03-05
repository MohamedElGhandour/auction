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
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const index_1 = require("./functions/index");
const myError_1 = __importDefault(require("../../utility/myError"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const accountSchema = {
    name: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!/^[a-zA-Z ]*$/.test(value)) {
                throw new Error("This name contains certain characters that aren't allowed.");
            }
        },
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator_1.default.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        },
    },
    password: {
        type: String,
        trim: true,
        minLength: 7,
        required: true,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
    avatar: {
        type: Buffer,
    },
};
const options = {
    timestamps: true,
    discriminatorKey: "kind",
};
const schema = new mongoose_1.Schema(accountSchema, options);
schema.methods.toJSON = index_1.toJSON;
schema.methods.generateAuthToken = index_1.generateAuthToken;
schema.statics.findByCredentials = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Account.findOne({ email });
    if (!user)
        throw new myError_1.default("The email address you entered isn't connected to an account.");
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch)
        throw new myError_1.default("The password that you've entered is incorrect.");
    return user;
});
schema.pre("save", index_1.hashPassword);
const Account = (0, mongoose_1.model)("Account", schema);
module.exports = Account;
