// applicationModel.js
import db from "../config/db.js"; // Your knex connection

// 📝 Create a new application
export async function createApplication({ tenderId, userId, message, expectedBudget, resumeURL }) {
  const [application] = await db("applications").insert({
    tender_id: tenderId,
    user_id: userId,
    message,
    expected_budget: expectedBudget,
    resume_url: resumeURL,
  }).returning("*");

  return application;
}

// 📥 Get all applications submitted by a specific user
export async function getApplicationsByUser(userId) {
  return await db("applications")
    .join("tenders", "applications.tender_id", "tenders.id")
    .where("applications.user_id", userId)
    .select(
      "applications.*",
      "tenders.title as tenderTitle"
    );
}

// 📂 Get all applications submitted for a specific tender
export async function getApplicationsByTender(tenderId) {
  return await db("applications")
    .where({ tender_id: tenderId });
}
