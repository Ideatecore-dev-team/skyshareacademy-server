const Joi = require("joi");

const create = Joi.object({
  file_booklet: Joi.string().required(),
  gambar_alur_acara: Joi.string().required(),
  gambar_timeline: Joi.string().required(),
  link_cta: Joi.string().required(),
  link_join_program: Joi.string().required(),
  is_event_active: Joi.boolean().optional(),
  event_image_url: Joi.string().allow(null, "").optional(),
  event_cta_link: Joi.string().allow(null, "").optional(),
  // school_id: Joi.array().items(Joi.number().integer()).required(),
});

const update = Joi.object({
  file_booklet: Joi.string().required(),
  gambar_alur_acara: Joi.string().required(),
  gambar_timeline: Joi.string().required(),
  link_cta: Joi.string().required(),
  link_join_program: Joi.string().required(),
  is_event_active: Joi.boolean().optional(),
  event_image_url: Joi.string().allow(null, "").optional(),
  event_cta_link: Joi.string().allow(null, "").optional(),
  // school_id: Joi.array().items(Joi.number().integer()).required(),
});

module.exports = { create, update };
