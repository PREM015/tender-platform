// companyController.js - placeholder
const companies = [];

export const createCompany = (req, res) => {
  const { companyName, industry, description } = req.body;
  const email = req.user.email;

  const exists = companies.find(c => c.email === email);
  if (exists) {
    return res.status(400).json({ message: "Company already exists" });
  }

  const company = { email, companyName, industry, description };
  companies.push(company);

  res.status(201).json({ message: "Company created", company });
};

export const getCompany = (req, res) => {
  const email = req.user.email;
  const company = companies.find(c => c.email === email);

  if (!company) {
    return res.status(404).json({ message: "Company not found" });
  }

  res.json(company);
};

export const updateCompany = (req, res) => {
  const email = req.user.email;
  const index = companies.findIndex(c => c.email === email);

  if (index === -1) {
    return res.status(404).json({ message: "Company not found" });
  }

  const updated = { ...companies[index], ...req.body };
  companies[index] = updated;

  res.json({ message: "Company updated", company: updated });
};
