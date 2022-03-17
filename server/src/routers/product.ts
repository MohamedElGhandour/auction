import { Router, Request } from "express";
import {
  createProduct,
  products,
  product,
  search,
} from "../controllers/product/index";
import authMiddleware from "../middleware/auth/authentication";
import multer from "multer";

const router = Router();

const upload = multer({
  // dest: "avatar",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(_req: Request, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      callback(new Error("File must be jpg, jpeg, png"));
    }
    callback(null, true);
  },
});

// create product
router.post("/", authMiddleware, upload.single("image"), createProduct);

// get products
router.get("/", authMiddleware, products);

// get product
router.get("/:id", authMiddleware, product);

// search
router.post("/search", authMiddleware, search);

export default router;
