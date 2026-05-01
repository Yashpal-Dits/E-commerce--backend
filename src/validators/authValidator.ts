import Joi from "joi";


export const registerSchema = Joi.object({
  first_name: Joi.string()
    .min(2)
    .required()
    .messages({
      "string.empty": "First name is required",
      "string.min": "First name must be at least 2 characters",
    }),

  last_name: Joi.string()
    .min(2)
    .required()
    .messages({
      "string.empty": "Last name is required",
      "string.min": "Last name must be at least 2 characters",
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required",
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters",
      "string.empty": "Password is required",
    }),

  role: Joi.string()
    .valid("customer", "seller")
    .default("customer")
    .messages({
      "any.only": "Role must be either 'customer' or 'seller'",
    }),
});


export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required",
    }),

  password: Joi.string()
    .required()
    .messages({
      "string.empty": "Password is required",
    }),
});

export const updateUserSchema = Joi.object({
  first_name: Joi.string().min(2).optional(),
  last_name: Joi.string().min(2).optional(),
  email: Joi.string().email().optional(),
}).min(1).messages({
  "object.min": "At least one field must be provided",
});