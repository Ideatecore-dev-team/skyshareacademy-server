const repository = require("./repository");
const schema = require("./schema");
const validate = require("../../utilities/validation");
const ResponseError = require("../../error/ResponseError");

const getEvents = async (role) => {
  const events = await repository.getEventsByRole(role || "all");
  return events;
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
    event,
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

module.exports = {
  getEvents,
  getEventDetail,
  submitTask,
  getMySubmission,
  getSubmissionsForMentor,
  reviewSubmission,
};
