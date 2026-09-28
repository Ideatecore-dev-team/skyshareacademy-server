const repository = require("./repository");
const schema = require("./schema");
const validate = require("../../utilities/validation");

const get = async () => {
  const result = await repository.get();
  if (result && typeof result.popups === "string") {
    try {
      result.popups = JSON.parse(result.popups);
    } catch (e) {
      result.popups = [];
    }
  }
  return result;
};

const update = async (request) => {
  const validData = validate(request, schema.update);
  const result = await repository.update(validData);
  if (result && typeof result.popups === "string") {
    try {
      result.popups = JSON.parse(result.popups);
    } catch (e) {
      result.popups = [];
    }
  }
  return result;
};

module.exports = {
  get,
  update,
};
