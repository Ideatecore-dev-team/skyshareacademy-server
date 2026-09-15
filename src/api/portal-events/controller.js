const service = require("./service");

const getEvents = async (req, res, next) => {
  try {
    const role = req.user ? req.user.role : "all";
    const result = await service.getEvents(role);
    res.status(200).json({
      status: "success",
      errors: false,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getEventDetail = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const studentId = req.user ? req.user.id : null;
    const result = await service.getEventDetail(eventId, studentId);
    res.status(200).json({
      status: "success",
      errors: false,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const submitTask = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const studentId = req.user.id;
    const result = await service.submitTask(studentId, eventId, req.body);
    res.status(201).json({
      status: "success",
      errors: false,
      message: "Tugas berhasil dikumpulkan",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getMySubmission = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const studentId = req.user.id;
    const result = await service.getMySubmission(studentId, eventId);
    res.status(200).json({
      status: "success",
      errors: false,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSubmissionsForMentor = async (req, res, next) => {
  try {
    const eventId = req.query.eventId || null;
    const result = await service.getSubmissionsForMentor(eventId);
    res.status(200).json({
      status: "success",
      errors: false,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const reviewSubmission = async (req, res, next) => {
  try {
    const submissionId = req.params.id;
    const result = await service.reviewSubmission(submissionId, req.body);
    res.status(200).json({
      status: "success",
      errors: false,
      message: "Status submission berhasil diperbarui",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEvents,
  getEventDetail,
  submitTask,
  getMySubmission,
  getSubmissionsForMentor,
  reviewSubmission,
};
