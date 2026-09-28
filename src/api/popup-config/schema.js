const Joi = require("joi");

const popupItemSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().allow("").optional(),
  image_url: Joi.string().uri().required(),
  cta_link: Joi.string().allow("").optional(),
  cta_text: Joi.string().allow("").optional(),
  is_active: Joi.boolean().default(true),
});

const update = Joi.object({
  is_active: Joi.boolean().required(),
  randomize: Joi.boolean().required(),
  popups: Joi.array().items(popupItemSchema).default([]),
});

module.exports = { update };
