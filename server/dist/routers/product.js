"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../controllers/product/index");
const authentication_1 = __importDefault(require("../middleware/auth/authentication"));
const router = (0, express_1.Router)();
router.post("/", authentication_1.default, index_1.createProduct);
router.get("/", authentication_1.default, index_1.products);
router.get("/:id", authentication_1.default, index_1.product);
router.post("/search", authentication_1.default, index_1.search);
exports.default = router;
