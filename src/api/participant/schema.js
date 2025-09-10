const Joi = require("joi");

const create = Joi.object({
  nama: Joi.string().required(),
  email: Joi.string().email().required(),
  nama_instansi: Joi.string().required(),
  nama_daerah: Joi.string().required(),
  event_id: Joi.number().required(),

  //   episode1_summary,
  //   episode1_practice,
  //   episode2_summary,
  //   episode2_practice,
  //   episode3_summary,
  //   episode3_practice,
  //   episode4_summary,
  //   episode4_practice,
  //   episode5_summary,
  //   episode5_practice,
  //   episode6_summary,
  //   episode6_practice,
});

const getAll = Joi.object({
  event_id: Joi.number().required(),
});

const getById = Joi.object({
  id: Joi.number().required(),
});

const update = Joi.object({
  id: Joi.number().required(),
  nama: Joi.string().required(),
  email: Joi.string().email().required(),
  nama_instansi: Joi.string().required(),
  nama_daerah: Joi.string().required(),
  event_id: Joi.number().required(),

  episode1_summary: Joi.boolean().optional().default(false),
  episode1_practice: Joi.boolean().optional().default(false),
  episode2_summary: Joi.boolean().optional().default(false),
  episode2_practice: Joi.boolean().optional().default(false),
  episode3_summary: Joi.boolean().optional().default(false),
  episode3_practice: Joi.boolean().optional().default(false),
  episode4_summary: Joi.boolean().optional().default(false),
  episode4_practice: Joi.boolean().optional().default(false),
  episode5_summary: Joi.boolean().optional().default(false),
  episode5_practice: Joi.boolean().optional().default(false),
  episode6_summary: Joi.boolean().optional().default(false),
  episode6_practice: Joi.boolean().optional().default(false),
});

module.exports = { create, update, getAll, getById };
