import Joi from "joi";


export const createProductSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required()
    .messages({
      "string.empty": "Product name is required",
      "string.min": "Product name must be at least 3 characters",
    }),

  price: Joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "Price must be a number",
      "number.positive": "Price must be greater than 0",
      "any.required": "Price is required",
    }),

  categories_id: Joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "Category ID must be a number",
      "any.required": "Category is required",
    }),

  stock: Joi.number()
    .integer()
    .min(0)
    .default(0)
    .messages({
      "number.base": "Stock must be a number",
      "number.min": "Stock cannot be negative",
    }),

  sku: Joi.string().optional(),
});


export const updateProductSchema = Joi.object({
  name: Joi.string().min(3).optional(),
  price: Joi.number().positive().optional(),
  categories_id: Joi.number().positive().optional(),
  stock: Joi.number().integer().min(0).optional(),
  sku: Joi.string().optional(),
  is_active: Joi.boolean().optional(),
}).min(1);