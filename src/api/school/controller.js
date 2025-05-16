const service = require("./service");
const create = async (req, res, next) => {
  try {
    let imagePath;
    if (
      !req.files ||
      !req.files.gambar_logo_sekolah ||
      req.files.gambar_logo_sekolah.length === 0
    ) {
      imagePath =
        "https://res.cloudinary.com/dsh5ppscb/image/upload/v1714931793/no-image/No_Image_Available_zfarlj.jpg";
    } else {
      imagePath = req.files.gambar_logo_sekolah[0].path;
    }

    const request = {
      gambar_logo_sekolah: imagePath,
      nama_sekolah: req.body.nama_sekolah,
      alamat: req.body.alamat,
      embed_map: req.body.embed_map,
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
      id: req.params.schoolId,
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
      !req.files.gambar_logo_sekolah ||
      req.files.gambar_logo_sekolah.length === 0
    ) {
      imagePath =
        "https://res.cloudinary.com/dsh5ppscb/image/upload/v1714931793/no-image/No_Image_Available_zfarlj.jpg";
    } else {
      imagePath = req.files.gambar_logo_sekolah[0].path;
    }

    const request = {
      gambar_logo_sekolah: imagePath,
      nama_sekolah: req.body.nama_sekolah,
      alamat: req.body.alamat,
      embed_map: req.body.embed_map,
      id: req.params.schoolId,
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
      id: req.params.schoolId,
      admin_id: req.user.id,
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

module.exports = { create, getAll, getById, update, remove };
