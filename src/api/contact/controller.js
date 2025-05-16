const service = require("./service");

const create = async (req, res, next) => {
  try {
    const request = {
      name: req.body.name,
      email: req.body.email,
      no_telp: req.body.no_telp,
      isi_pesan: req.body.isi_pesan,
    };
    const response = await service.create(request);

    res.status(201).json({
      data: response,
      status: "success",
      errors: false,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const response = await service.getAll();
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
  create,
  getAll,
};
