// companyRoutes.js - placeholder
import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import {
  createCompany,
  getCompany,
  updateCompany,
} from "../controllers/companyController.js";

const router = express.Router();

router.post("/", authenticate, createCompany);
router.get("/me", authenticate, getCompany);
router.put("/me", authenticate, updateCompany);

export default router;
