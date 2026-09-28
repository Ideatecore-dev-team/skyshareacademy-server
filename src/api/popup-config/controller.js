const service = require("./service");

const get = async (req, res, next) => {
  try {
    const response = await service.get();
    res.status(200).json({
      data: response,
      status: "success",
      errors: false,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const request = {
      is_active: req.body.is_active,
      randomize: req.body.randomize,
      popups: req.body.popups,
    };
    const response = await service.update(request);
    res.status(200).json({
      data: response,
      status: "success",
      errors: false,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get,
  update,
};
