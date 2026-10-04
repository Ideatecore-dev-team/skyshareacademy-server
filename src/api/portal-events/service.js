const repository = require("./repository");
const schema = require("./schema");
const validate = require("../../utilities/validation");
const ResponseError = require("../../error/ResponseError");

const formatEvent = (event) => {
  if (!event) return event;
  let docUrls = [];
  if (Array.isArray(event.documentation_urls)) {
    docUrls = event.documentation_urls;
  } else if (typeof event.documentation_urls === "string") {
    try {
      docUrls = JSON.parse(event.documentation_urls);
    } catch {
      docUrls = [];
    }
  }
  return {
    ...event,
    documentation_urls: Array.isArray(docUrls) ? docUrls : [],
  };
};

const getEvents = async (role) => {
  const events = await repository.getEventsByRole(role || "all");
  return (events || []).map(formatEvent);
};

const getEventDetail = async (eventId, studentId) => {
  const event = await repository.getEventById(eventId);
  if (!event) {
    throw new ResponseError(404, "Event not found");
  }

  let mySubmission = null;
  if (studentId) {
    mySubmission = await repository.getSubmissionByStudentAndEvent(
      studentId,
      eventId
    );
  }

  return {
    event: formatEvent(event),
    mySubmission,
  };
};

const submitTask = async (studentId, eventId, request) => {
  const validData = validate(request, schema.submitTask);

  const event = await repository.getEventById(eventId);
  if (!event) {
    throw new ResponseError(404, "Event not found");
  }

  const submission = await repository.createOrUpdateSubmission(
    studentId,
    eventId,
    validData
  );

  return submission;
};

const getMySubmission = async (studentId, eventId) => {
  const submission = await repository.getSubmissionByStudentAndEvent(
    studentId,
    eventId
  );
  return submission;
};

const getSubmissionsForMentor = async (eventId) => {
  const submissions = await repository.getAllSubmissionsForMentor(eventId);
  return submissions;
};

const reviewSubmission = async (submissionId, request) => {
  const validData = validate(request, schema.reviewTask);
  const updated = await repository.reviewSubmission(submissionId, validData);
  if (!updated) {
    throw new ResponseError(404, "Submission not found");
  }
  return updated;
};

const getPublicEvents = async () => {
  const events = await repository.getAllPublicEvents();
  return (events || []).map(formatEvent);
};

const adminGetEvents = async () => {
  const events = await repository.getAllAdminEvents();
  return (events || []).map(formatEvent);
};

const adminGetEventById = async (id) => {
  const event = await repository.getEventById(id);
  if (!event) {
    throw new ResponseError(404, "Event not found");
  }
  return formatEvent(event);
};

const createEvent = async (data) => {
  if (!data.title) {
    throw new ResponseError(400, "Title is required");
  }
  const created = await repository.createEvent(data);
  return formatEvent(created);
};

const updateEvent = async (id, data) => {
  const existing = await repository.getEventById(id);
  if (!existing) {
    throw new ResponseError(404, "Event not found");
  }
  const updated = await repository.updateEvent(id, data);
  return formatEvent(updated);
};

const deleteEvent = async (id) => {
  const existing = await repository.getEventById(id);
  if (!existing) {
    throw new ResponseError(404, "Event not found");
  }
  await repository.deleteEvent(id);
  return true;
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
