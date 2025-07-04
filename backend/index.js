import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import testRoutes from "./routes/testRoutes.js";
dotenv.config();

const app = express(); // ✅ Define app first

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/test", testRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
