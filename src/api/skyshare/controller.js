const service = require("./service");

const create = async (req, res, next) => {
  try {
    let gambarAlurAcaraPath;
    let gambarTimelinePath;

    if (
      !req.files ||
      !req.files.gambar_alur_acara ||
      req.files.gambar_alur_acara.length === 0
    ) {
      gambarAlurAcaraPath =
        "https://res.cloudinary.com/dsh5ppscb/image/upload/v1714931793/no-image/No_Image_Available_zfarlj.jpg";
    } else {
      gambarAlurAcaraPath = req.files.gambar_alur_acara[0].path;
    }

    if (
      !req.files ||
      !req.files.gambar_timeline ||
      req.files.gambar_timeline.length === 0
    ) {
      gambarTimelinePath =
        "https://res.cloudinary.com/dsh5ppscb/image/upload/v1714931793/no-image/No_Image_Available_zfarlj.jpg";
    } else {
      gambarTimelinePath = req.files.gambar_timeline[0].path;
    }

    const request = {
      gambar_alur_acara: gambarAlurAcaraPath,
      gambar_timeline: gambarTimelinePath,
      link_cta: req.body.link_cta,
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

const getById = async (req, res, next) => {
  try {
    const request = {
      id: req.params.skyshareId,
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
    let gambarAlurAcaraPath;
    let gambarTimelinePath;

    if (
      !req.files ||
      !req.files.gambar_alur_acara ||
      req.files.gambar_alur_acara.length === 0
    ) {
      gambarAlurAcaraPath =
        "https://res.cloudinary.com/dsh5ppscb/image/upload/v1714931793/no-image/No_Image_Available_zfarlj.jpg";
    } else {
      gambarAlurAcaraPath = req.files.gambar_alur_acara[0].path;
    }

    if (
      !req.files ||
      !req.files.gambar_timeline ||
      req.files.gambar_timeline.length === 0
    ) {
      gambarTimelinePath =
        "https://res.cloudinary.com/dsh5ppscb/image/upload/v1714931793/no-image/No_Image_Available_zfarlj.jpg";
    } else {
      gambarTimelinePath = req.files.gambar_timeline[0].path;
    }

    const request = {
      id: req.params.skyshareId,
      gambar_alur_acara: gambarAlurAcaraPath,
      gambar_timeline: gambarTimelinePath,
      link_cta: req.body.link_cta,
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
      id: req.params.skyshareId,
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
