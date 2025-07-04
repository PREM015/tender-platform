import express from "express";
import { applyToTender, getMyApplications } from "../controllers/applicationController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, applyToTender);
router.get("/my", authenticate, getMyApplications);

export default router;
