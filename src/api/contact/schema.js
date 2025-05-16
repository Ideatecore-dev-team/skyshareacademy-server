const Joi = require("joi");

const create = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  no_telp: Joi.string().required(),
  isi_pesan: Joi.string().required(),
});

module.exports = { create };
