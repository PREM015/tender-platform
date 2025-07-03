// applicationController.js - placeholder
export const applyToTender = async (req, res) => {
  try {
    const { tenderId, message, expectedBudget, resumeURL } = req.body;
    const userId = req.user.id;

    if (!tenderId || !message || !expectedBudget) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔧 Save to database here (mocked for now)
    console.log("New Application:", {
      userId,
      tenderId,
      message,
      expectedBudget,
      resumeURL,
    });

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit application" });
  }
};
