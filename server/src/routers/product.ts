import { Router } from "express";
import {
  createProduct,
  products,
  product,
  search,
} from "../controllers/product/index";
import authMiddleware from "../middleware/auth/authentication";

const router = Router();

// create product
router.post("/", authMiddleware, createProduct);

// get products
router.get("/", authMiddleware, products);

// get product
router.get("/:id", authMiddleware, product);

// search
router.post("/search", authMiddleware, search);

export default router;
