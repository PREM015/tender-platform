import Joi from "joi";

export const companySchema = Joi.object({
  company_name: Joi.string().required(),
  industry: Joi.string().required(),
  description: Joi.string().allow(""),
  logo_url: Joi.string().uri().optional(),
});
