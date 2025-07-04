import db from "../config/db.js";

export const searchCompanies = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const results = await db("companies")
      .whereILike("company_name", `%${query}%`)
      .orWhereILike("industry", `%${query}%`)
      .orWhereILike("description", `%${query}%`)
      .select("id", "company_name", "industry", "description", "logo_url");

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Search failed" });
  }
};
export const searchTenders = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const results = await db("tenders")
      .whereILike("title", `%${query}%`)
      .orWhereILike("description", `%${query}%`)
      .select("id", "title", "budget", "deadline");

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Search failed" });
  }
};
