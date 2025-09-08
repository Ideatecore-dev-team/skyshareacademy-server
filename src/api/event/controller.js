const service = require("./service");

const defaultImage = "https://picsum.photos/300/300";

const create = async (req, res, next) => {
  try {
    let imagePath;

    if (
      !req.files ||
      !req.files.event_image_url ||
      req.files.event_image_url.length === 0
    ) {
      imagePath = defaultImage;
    } else {
      imagePath = req.files.event_image_url[0].path;
    }

    const request = {
      event_image_url: imagePath,
      nama_event: req.body.nama_event,
      kategori: req.body.kategori,
      total_peserta: Number(req.body.total_peserta),
      deskripsi: req.body.deskripsi,
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

const getAll = async (_, res, next) => {
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

const getById = async (req, res, next) => {
  try {
    const request = {
      id: req.params.eventId,
    };

    const response = await service.getById(request);
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
    let imagePath;

    if (
      !req.files ||
      !req.files.event_image_url ||
      req.files.event_image_url.length === 0
    ) {
      imagePath = defaultImage;
    } else {
      imagePath = req.files.event_image_url[0].path;
    }

    const request = {
      id: req.params.eventId,
      event_image_url: imagePath,
      nama_event: req.body.nama_event,
      kategori: req.body.kategori,
      total_peserta: Number(req.body.total_peserta),
      deskripsi: req.body.deskripsi,
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

const remove = async (req, res, next) => {
  try {
    const request = {
      id: req.params.eventId,
    };

    const response = await service.remove(request);
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
  getById,
  update,
  remove,
};
