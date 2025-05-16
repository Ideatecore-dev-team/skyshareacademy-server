const Joi = require("joi");

const create = Joi.object({
  gambar_logo_sekolah: Joi.string().required(),
  nama_sekolah: Joi.string().required(),
  alamat: Joi.string().required(),
  embed_map: Joi.string().required(),
});

const getById = Joi.object({
  id: Joi.number().required(),
});

const update = Joi.object({
  id: Joi.number().required(),
  gambar_logo_sekolah: Joi.string().required(),
  nama_sekolah: Joi.string().required(),
  alamat: Joi.string().required(),
  embed_map: Joi.string().required(),
});

const remove = Joi.object({
  id: Joi.number().required(),
  admin_id: Joi.number().required(),
});

module.exports = { create, getById, update, remove };
