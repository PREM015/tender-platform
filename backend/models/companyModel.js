// companyModel.js - placeholder
import db from "../config/db.js";

export async function createCompany(data) {
  const [company] = await db("companies").insert(data).returning("*");
  return company;
}

export async function getCompanyByUserId(userId) {
  return db("companies").where({ user_id: userId }).first();
}

export async function updateCompany(id, data) {
  return db("companies").where({ id }).update(data).returning("*");
}

export async function getAllCompanies() {
  return db("companies").select("*");
}
