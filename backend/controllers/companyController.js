import db from "../config/db.js";
import { companySchema } from "../validators/companyValidator.js";

// Create a new company
export const createCompany = async (req, res) => {
  const { error } = companySchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const userId = req.user.id;
  const { companyName, industry, description, logoUrl } = req.body;

  try {
    const existing = await db("companies").where({ user_id: userId }).first();
    if (existing) {
      return res.status(400).json({ message: "Company already exists" });
    }

    const [company] = await db("companies")
      .insert({
        user_id: userId,
        company_name: companyName,
        industry,
        description,
        logo_url: logoUrl || null,
      })
      .returning("*");

    res.status(201).json({ message: "Company created", company });
  } catch (err) {
    console.error("Create company error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get company profile
export const getCompany = async (req, res) => {
  const userId = req.user.id;

  try {
    const company = await db("companies").where({ user_id: userId }).first();

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json(company);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update company
export const updateCompany = async (req, res) => {
  const { error } = companySchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const userId = req.user.id;
  const { companyName, industry, description, logoUrl } = req.body;

  try {
    const updated = await db("companies")
      .where({ user_id: userId })
      .update({
        company_name: companyName,
        industry,
        description,
        logo_url: logoUrl || null,
        updated_at: new Date(),
      })
      .returning("*");

    if (!updated.length) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({ message: "Company updated", company: updated[0] });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};
