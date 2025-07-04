// tenderModel.js - placeholder
import db from "../config/db.js";

export async function createTender(data) {
  const [tender] = await db("tenders").insert(data).returning("*");
  return tender;
}

export async function getTendersByCompany(companyId) {
  return db("tenders").where({ company_id: companyId });
}

export async function getAllTenders() {
  return db("tenders").select("*").orderBy("created_at", "desc");
}

export async function getTenderById(id) {
  return db("tenders").where({ id }).first();
}
