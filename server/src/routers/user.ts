import { Router } from "express";
import authMiddleware from "../middleware/auth/authentication";
import { profile } from "../controllers/user/index";

const router = Router();

router.get("/profile", authMiddleware, profile);

export default router;
