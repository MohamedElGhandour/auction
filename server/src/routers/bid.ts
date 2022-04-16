import { Router } from "express";
import authMiddleware from "../middleware/auth/authentication";
// import { payment } from "../controllers/stripe/index";
import { bid, bids } from "../controllers/bid/index";

const router = Router();

router.post("/", authMiddleware, bid);

router.get("/", authMiddleware, bids);

export default router;
