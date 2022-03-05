"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../controllers/auth/index");
const authentication_1 = __importDefault(require("../middleware/auth/authentication"));
const router = (0, express_1.Router)();
router.post("/login", index_1.logIn);
router.post("/logout", authentication_1.default, index_1.logOut);
router.post("/logoutall", authentication_1.default, index_1.logOutAll);
router.post("/register", index_1.register);
exports.default = router;
