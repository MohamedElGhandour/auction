"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../controllers/product/index");
const authentication_1 = __importDefault(require("../middleware/auth/authentication"));
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    limits: {
        fileSize: 1000000,
    },
    fileFilter(_req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            callback(new Error("File must be jpg, jpeg, png"));
        }
        callback(null, true);
    },
});
router.post("/", authentication_1.default, upload.single("image"), index_1.createProduct);
router.get("/", authentication_1.default, index_1.products);
router.get("/:id", authentication_1.default, index_1.product);
router.post("/search", authentication_1.default, index_1.search);
exports.default = router;
