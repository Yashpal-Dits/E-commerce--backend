import Joi from "joi";

export const createCategorySchema = Joi.object({
  name: Joi.string()
    .min(2)
    .required()
    .messages({
      "string.empty": "Category name is required",
      "string.min": "Category name must be at least 2 characters",
    }),
  description: Joi.string().optional(),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().min(2).optional(),
  description: Joi.string().optional(),
}).min(1);