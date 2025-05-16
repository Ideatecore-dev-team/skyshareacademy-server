const Joi = require("joi");
const create = Joi.object({
  nama_sekolah: Joi.string().required(),
  gambar_sekolah: Joi.string().required(),
  lokasi: Joi.string().required(),
  nama_group: Joi.string().required(),
});

const getById = Joi.object({
  id: Joi.number().required(),
});

const update = Joi.object({
  id: Joi.number().required(),
  nama_sekolah: Joi.string().required(),
  gambar_sekolah: Joi.string().required(),
  lokasi: Joi.string().required(),
  nama_group: Joi.string().required(),
});

const remove = Joi.object({
  id: Joi.number().required(),
});

module.exports = { create, getById, update, remove };
