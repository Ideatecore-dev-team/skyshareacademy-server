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

const getPublicEvents = async (req, res, next) => {
  try {
    const result = await service.getPublicEvents();
    res.status(200).json({
      status: "success",
      errors: false,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const adminGetEvents = async (req, res, next) => {
  try {
    const result = await service.adminGetEvents();
    res.status(200).json({
      status: "success",
      errors: false,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const adminGetEventById = async (req, res, next) => {
  try {
    const result = await service.adminGetEventById(req.params.id);
    res.status(200).json({
      status: "success",
      errors: false,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const createEvent = async (req, res, next) => {
  try {
    let thumbnailUrl = null;
    if (req.files && req.files.thumbnail_url && req.files.thumbnail_url.length > 0) {
      thumbnailUrl = req.files.thumbnail_url[0].path;
    } else if (req.body.thumbnail_url) {
      thumbnailUrl = req.body.thumbnail_url;
    }

    let isActive = true;
    if (req.body.is_active !== undefined) {
      isActive =
        req.body.is_active === true ||
        req.body.is_active === "true" ||
        req.body.is_active === "1" ||
        req.body.is_active === 1;
    }

    let categoryId = null;
    if (req.body.category_id) {
      categoryId = Number(req.body.category_id);
    }

    const payload = {
      title: req.body.title,
      description: req.body.description || null,
      event_date: req.body.event_date ? new Date(req.body.event_date) : null,
      event_type: req.body.event_type || "workshop",
      category_id: categoryId,
      thumbnail_url: thumbnailUrl,
      target_role: req.body.target_role || "all",
      is_active: isActive,
    };

    const result = await service.createEvent(payload);
    res.status(201).json({
      status: "success",
      errors: false,
      message: "Event berhasil dibuat",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const payload = {};
    if (req.body.title !== undefined) payload.title = req.body.title;
    if (req.body.description !== undefined) payload.description = req.body.description;
    if (req.body.event_date !== undefined) {
      payload.event_date = req.body.event_date ? new Date(req.body.event_date) : null;
    }
    if (req.body.event_type !== undefined) payload.event_type = req.body.event_type;
    if (req.body.category_id !== undefined) {
      payload.category_id = req.body.category_id ? Number(req.body.category_id) : null;
    }
    if (req.body.target_role !== undefined) payload.target_role = req.body.target_role;
    if (req.body.is_active !== undefined) {
      payload.is_active =
        req.body.is_active === true ||
        req.body.is_active === "true" ||
        req.body.is_active === "1" ||
        req.body.is_active === 1;
    }

    if (req.files && req.files.thumbnail_url && req.files.thumbnail_url.length > 0) {
      payload.thumbnail_url = req.files.thumbnail_url[0].path;
    } else if (req.body.thumbnail_url !== undefined) {
      payload.thumbnail_url = req.body.thumbnail_url;
    }

    const result = await service.updateEvent(req.params.id, payload);
    res.status(200).json({
      status: "success",
      errors: false,
      message: "Event berhasil diperbarui",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    await service.deleteEvent(req.params.id);
    res.status(200).json({
      status: "success",
      errors: false,
      message: "Event berhasil dihapus",
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
  getPublicEvents,
  adminGetEvents,
  adminGetEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
