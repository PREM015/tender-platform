import { createApplication, getApplicationsByUser } from "../models/applicationModel.js";

// @desc    Apply to a tender
// @route   POST /api/applications
// @access  Private
export const applyToTender = async (req, res) => {
  try {
    const { tenderId, message, expectedBudget, resumeURL } = req.body;
    const userId = req.user.id;

    if (!tenderId || !message || !expectedBudget) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await createApplication({ tenderId, userId, message, expectedBudget, resumeURL });

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("❌ applyToTender error:", error);
    res.status(500).json({ message: "Failed to submit application" });
  }
};

// @desc    Get applications submitted by the current user
// @route   GET /api/applications/my
// @access  Private
export const getMyApplications = async (req, res) => {
  try {
    const userId = req.user.id;
    const applications = await getApplicationsByUser(userId);
    res.json(applications);
  } catch (err) {
    console.error("❌ getMyApplications error:", err);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};
