// applicationModel.js - placeholder
import db from "../config/db.js"; // Your knex connection

export const createApplication = async ({ tenderId, userId, message, expectedBudget, resumeURL }) => {
  return await db("applications").insert({
    tender_id: tenderId,
    user_id: userId,
    message,
    expected_budget: expectedBudget,
    resume_url: resumeURL,
  });
};

export const getApplicationsByUser = async (userId) => {
  return await db("applications")
    .join("tenders", "applications.tender_id", "tenders.id")
    .where("applications.user_id", userId)
    .select(
      "applications.*",
      "tenders.title as tenderTitle"
    );
};
