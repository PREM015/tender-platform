import express from "express";
import { signup, login } from "../controllers/authController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authenticate, (req, res) => {
  res.json({ message: "Token is valid", user: req.user });
});

export default router;
