const ResponseError = require("../error/ResponseError");

const validate = (request, schema) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false,
  });
  if (result.error) {
    throw new ResponseError(
      403,
      `error validation ${result.error.message}`
    );
  } else {
    return result.value;
  }
};

module.exports = validate;
