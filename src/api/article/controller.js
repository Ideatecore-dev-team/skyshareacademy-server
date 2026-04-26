const service = require("./service");

const create = async (req, res, next) => {
  try {
    let imagePath;
    if (
      !req.files ||
      !req.files.image_heading ||
      req.files.image_heading.length === 0
    ) {
      imagePath =
        "https://res.cloudinary.com/dsh5ppscb/image/upload/v1714931793/no-image/No_Image_Available_zfarlj.jpg";
    } else {
      imagePath = req.files.image_heading[0].path;
    }

    const request = {
      image_heading: imagePath,
      title: req.body.title,
      content: req.body.content,
      link: req.body.link,
      admin_id: Number(req.user.id),
      category_id: Number(req.body.category_id),
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
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const offset = (page - 1) * limit;

    const response = await service.getAll({ limit, offset });
    res.status(200).json({
      data: response.articles,
      pagination: {
        total: response.total,
        page,
        limit,
        totalPages: Math.ceil(response.total / limit)
      },
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
      id: req.params.articleId,
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
      !req.files.image_heading ||
      req.files.image_heading.length === 0
    ) {
      imagePath =
        "https://res.cloudinary.com/dsh5ppscb/image/upload/v1714931793/no-image/No_Image_Available_zfarlj.jpg";
    } else {
      imagePath = req.files.image_heading[0].path;
    }

    const request = {
      id: req.params.articleId,
      image_heading: imagePath,
      title: req.body.title,
      content: req.body.content,
      link: req.body.link,
      admin_id: Number(req.user.id),
      category_id: Number(req.body.category_id),
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
      id: req.params.articleId,
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

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
