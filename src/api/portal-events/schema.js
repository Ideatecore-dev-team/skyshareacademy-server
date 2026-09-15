const Joi = require("joi");

const submitTask = Joi.object({
  file_url: Joi.string().required(),
  file_name: Joi.string().allow("", null).optional(),
});

const reviewTask = Joi.object({
  status: Joi.string().valid("reviewed", "revision").required(),
  mentor_note: Joi.string().allow("", null).optional(),
});

module.exports = {
  submitTask,
  reviewTask,
};
