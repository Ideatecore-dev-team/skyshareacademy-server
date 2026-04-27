const service = require("./service");

const imageDefault =
  "https://res.cloudinary.com/dsh5ppscb/image/upload/v1714931793/no-image/No_Image_Available_zfarlj.jpg";

const create = async (req, res, next) => {
  try {
    let gambarAlurAcaraPath;
    let gambarTimelinePath;

    if (req.files && req.files.gambar_alur_acara && req.files.gambar_alur_acara.length > 0) {
      gambarAlurAcaraPath = req.files.gambar_alur_acara[0].path;
    } else {
      gambarAlurAcaraPath = req.body.gambar_alur_acara || imageDefault;
    }

    if (req.files && req.files.gambar_timeline && req.files.gambar_timeline.length > 0) {
      gambarTimelinePath = req.files.gambar_timeline[0].path;
    } else {
      gambarTimelinePath = req.body.gambar_timeline || imageDefault;
    }

    let eventImageURL;

    if (req.files && req.files.event_image_url && req.files.event_image_url.length > 0) {
      eventImageURL = req.files.event_image_url[0].path;
    } else {
      eventImageURL = req.body.event_image_url || null;
    }

    const request = {
      file_booklet: req.body.file_booklet,
      gambar_alur_acara: gambarAlurAcaraPath,
      gambar_timeline: gambarTimelinePath,
      link_cta: req.body.link_cta,
      link_join_program: req.body.link_join_program,
      is_event_active: req.body.is_event_active === 'true' || req.body.is_event_active === true,
      event_image_url: eventImageURL,
      event_cta_link: req.body.event_cta_link,
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

const update = async (req, res, next) => {
  try {
    let gambarAlurAcaraPath;
    let gambarTimelinePath;

    if (req.files && req.files.gambar_alur_acara && req.files.gambar_alur_acara.length > 0) {
      gambarAlurAcaraPath = req.files.gambar_alur_acara[0].path;
    } else {
      gambarAlurAcaraPath = req.body.gambar_alur_acara || imageDefault;
    }

    if (req.files && req.files.gambar_timeline && req.files.gambar_timeline.length > 0) {
      gambarTimelinePath = req.files.gambar_timeline[0].path;
    } else {
      gambarTimelinePath = req.body.gambar_timeline || imageDefault;
    }

    let eventImageURL;

    if (req.files && req.files.event_image_url && req.files.event_image_url.length > 0) {
      eventImageURL = req.files.event_image_url[0].path;
    } else {
      eventImageURL = req.body.event_image_url || null;
    }

    const request = {
      file_booklet: req.body.file_booklet,
      gambar_alur_acara: gambarAlurAcaraPath,
      gambar_timeline: gambarTimelinePath,
      link_cta: req.body.link_cta,
      link_join_program: req.body.link_join_program,
      is_event_active: req.body.is_event_active === 'true' || req.body.is_event_active === true,
      event_image_url: eventImageURL,
      event_cta_link: req.body.event_cta_link,
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
  create,
  getAll,
  update,
};
