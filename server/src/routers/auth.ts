import { Router } from "express";
import { logIn, logOut, logOutAll, register } from "../controllers/auth/index";
import authMiddleware from "../middleware/auth/authentication";
const router = Router();

// Log-in
router.post("/login", logIn);

// Log-out
router.post("/logout", authMiddleware, logOut);

// Log-out All
router.post("/logoutall", authMiddleware, logOutAll);

// Register
router.post("/register", register);

export default router;
