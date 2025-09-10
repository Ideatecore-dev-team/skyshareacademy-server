const service = require("./service");

const create = async (req, res, next) => {
  try {
    const request = {
      nama: req.body.nama,
      email: req.body.email,
      nama_instansi: req.body.nama_instansi,
      nama_daerah: req.body.nama_daerah,
      event_id: req.body.event_id,
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
    const request = {
      event_id: req.params.eventId,
    };

    const response = await service.getAll(request);
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
      id: req.params.participantId,
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
      id: req.params.participantId,
      nama: req.body.nama,
      email: req.body.email,
      nama_instansi: req.body.nama_instansi,
      nama_daerah: req.body.nama_daerah,
      event_id: req.body.event_id,

      episode1_summary: req.body.episode1_summary,
      episode1_practice: req.body.episode1_practice,
      episode2_summary: req.body.episode2_summary,
      episode2_practice: req.body.episode2_practice,
      episode3_summary: req.body.episode3_summary,
      episode3_practice: req.body.episode3_practice,
      episode4_summary: req.body.episode4_summary,
      episode4_practice: req.body.episode4_practice,
      episode5_summary: req.body.episode5_summary,
      episode5_practice: req.body.episode5_practice,
      episode6_summary: req.body.episode6_summary,
      episode6_practice: req.body.episode6_practice,
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
      id: req.params.participantId,
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

module.exports = { create, getAll, getById, remove, update };
