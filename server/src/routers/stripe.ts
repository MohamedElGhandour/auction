import { Router } from "express";
import authMiddleware from "../middleware/auth/authentication";
import { payment, paymentPhone } from "../controllers/stripe/index";

const router = Router();

router.post("/payment", authMiddleware, payment);

router.post("/paymentphone", authMiddleware, paymentPhone);

export default router;
