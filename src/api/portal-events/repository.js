const db = require("../../utilities/db");

const getEventsByRole = async (role) => {
  return await db("portal_events")
    .where({ is_active: true })
    .andWhere((builder) => {
      builder.where("target_role", "all").orWhere("target_role", role);
    })
    .orderBy("event_date", "desc");
};

const getEventById = async (id) => {
  return await db("portal_events").where({ id }).first();
};

const getSubmissionByStudentAndEvent = async (studentId, eventId) => {
  return await db("task_submissions")
    .where({ student_id: studentId, event_id: eventId })
    .first();
};

const createOrUpdateSubmission = async (studentId, eventId, data) => {
  const existing = await getSubmissionByStudentAndEvent(studentId, eventId);
  if (existing) {
    const updated = await db("task_submissions")
      .where({ id: existing.id })
      .update({
        file_url: data.file_url,
        file_name: data.file_name || existing.file_name,
        status: "submitted",
        submitted_at: db.fn.now(),
        updatedAt: db.fn.now(),
      })
      .returning("*");
    return updated[0];
  }

  const created = await db("task_submissions")
    .insert({
      student_id: studentId,
      event_id: eventId,
      file_url: data.file_url,
      file_name: data.file_name,
      status: "submitted",
    })
    .returning("*");
  return created[0];
};

const getAllSubmissionsForMentor = async (eventId = null) => {
  const query = db("task_submissions as ts")
    .join("student_accounts as sa", "ts.student_id", "sa.id")
    .join("portal_events as pe", "ts.event_id", "pe.id")
    .select(
      "ts.*",
      "sa.name as student_name",
      "sa.email as student_email",
      "sa.region as student_region",
      "pe.title as event_title"
    )
    .orderBy("ts.submitted_at", "desc");

  if (eventId) {
    query.where("ts.event_id", eventId);
  }

  return await query;
};

const reviewSubmission = async (submissionId, data) => {
  const updated = await db("task_submissions")
    .where({ id: submissionId })
    .update({
      status: data.status,
      mentor_note: data.mentor_note,
      reviewed_at: db.fn.now(),
      updatedAt: db.fn.now(),
    })
    .returning("*");
  return updated[0];
};

module.exports = {
  getEventsByRole,
  getEventById,
  getSubmissionByStudentAndEvent,
  createOrUpdateSubmission,
  getAllSubmissionsForMentor,
  reviewSubmission,
};
