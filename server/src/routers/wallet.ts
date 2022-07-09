import { Router } from "express";
import authMiddleware from "../middleware/auth/authentication";
import { transactions } from "../controllers/wallet/index";

const router = Router();

router.get("/", authMiddleware, transactions);

export default router;
