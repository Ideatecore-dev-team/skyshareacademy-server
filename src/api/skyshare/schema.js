const Joi = require("joi");
const create = Joi.object({
  gambar_alur_acara: Joi.string().required(),
  gambar_timeline: Joi.string().required(),
  link_cta: Joi.string().required(),
});

const getById = Joi.object({
  id: Joi.number().required(),
});

const update = Joi.object({
  id: Joi.number().required(),
  gambar_alur_acara: Joi.string().required(),
  gambar_timeline: Joi.string().required(),
  link_cta: Joi.string().required(),
});

const remove = Joi.object({
  id: Joi.number().required(),
});

module.exports = { create, getById, update, remove };
