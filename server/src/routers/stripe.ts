import { Router } from "express";
import authMiddleware from "../middleware/auth/authentication";
import { payment } from "../controllers/stripe/index";

const router = Router();

router.post("/payment", authMiddleware, payment);

export default router;
