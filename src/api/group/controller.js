const service = require("./service");

const create = async (req, res, next) => {
  try {
    const request = {
      name: req.body.name,
      link: req.body.link,
      school_id: req.body.school_id,
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
      id: req.params.groupId,
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
    const request = {
      id: req.params.groupId,
      name: req.body.name,
      link: req.body.link,
      school_id: req.body.school_id,
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
      id: req.params.groupId,
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

const getGroupBySchoolId = async (req, res, next) => {
  try {
    const request = {
      school_id: req.params.schoolId,
    };
    const response = await service.getGroupBySchoolId(request);

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
  getGroupBySchoolId,
};
