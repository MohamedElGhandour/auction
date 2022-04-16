"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("../middleware/auth/authentication"));
const index_1 = require("../controllers/stripe/index");
const router = (0, express_1.Router)();
router.post("/payment", authentication_1.default, index_1.payment);
exports.default = router;
