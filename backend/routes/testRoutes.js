// routes/testRoutes.js
import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/ping-db", async (req, res) => {
  try {
    const result = await db.raw("SELECT 1+1 AS result");
    res.json({ message: "DB connected", result: result.rows || result });
  } catch (err) {
    res.status(500).json({ error: "DB connection failed", details: err.message });
  }
});

export default router;
