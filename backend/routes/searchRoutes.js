import express from "express";
import {
  searchCompanies,
  searchTenders,
} from "../controllers/searchController.js";

const router = express.Router();

router.get("/companies", searchCompanies);
router.get("/tenders", searchTenders); // ← you can create this controller too

export default router;
