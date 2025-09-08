const Joi = require("joi");

const create = Joi.object({
  event_image_url: Joi.string().required(),
  nama_event: Joi.string().required(),
  kategori: Joi.string().required(),
  total_peserta: Joi.number().required(),
  deskripsi: Joi.string().required(),
});

const getById = Joi.object({
  id: Joi.number().required(),
});

const update = Joi.object({
  id: Joi.number().required(),
  event_image_url: Joi.string().required(),
  nama_event: Joi.string().required(),
  kategori: Joi.string().required(),
  total_peserta: Joi.number().required(),
  deskripsi: Joi.string().required(),
});

module.exports = { create, update, getById };
