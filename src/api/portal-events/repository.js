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
  return await db("portal_events")
    .where("id", id)
    .first();
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

const getAllPublicEvents = async ({
  limit = 8,
  offset = 0,
  search = "",
  program = "all",
  timing = "upcoming",
} = {}) => {
  const query = db("portal_events").where("is_active", true);

  if (program && program !== "all") {
    query.where((q) => {
      q.where("target_role", "all").orWhere("target_role", program);
    });
  }

  if (search && search.trim()) {
    const term = `%${search.trim()}%`;
    query.where((q) => {
      q.whereILike("title", term)
        .orWhereILike("description", term)
        .orWhereILike("event_type", term);
    });
  }

  // Timing filter & Sorting:
  // "diurutkan dari event yang paling dekat akan datang. dan paling jauh akan datang" -> asc
  if (timing === "upcoming") {
    query.where("event_date", ">=", db.fn.now());
    query.orderBy("event_date", "asc");
  } else if (timing === "past") {
    query.where("event_date", "<", db.fn.now());
    query.orderBy("event_date", "desc");
  } else {
    query.orderBy("event_date", "desc");
  }

  // Count query for pagination of currently active filtered items
  const countQuery = db("portal_events").where("is_active", true);
  if (program && program !== "all") {
    countQuery.where((q) => {
      q.where("target_role", "all").orWhere("target_role", program);
    });
  }
  if (search && search.trim()) {
    const term = `%${search.trim()}%`;
    countQuery.where((q) => {
      q.whereILike("title", term)
        .orWhereILike("description", term)
        .orWhereILike("event_type", term);
    });
  }
  if (timing === "upcoming") {
    countQuery.where("event_date", ">=", db.fn.now());
  } else if (timing === "past") {
    countQuery.where("event_date", "<", db.fn.now());
  }

  const totalCount = await countQuery.count("id as total").first();
  const total = parseInt(totalCount ? totalCount.total : 0, 10);

  // Tab count badges (all, upcoming, past) for current program & search
  const statsQuery = db("portal_events").where("is_active", true);
  if (program && program !== "all") {
    statsQuery.where((q) => {
      q.where("target_role", "all").orWhere("target_role", program);
    });
  }
  if (search && search.trim()) {
    const term = `%${search.trim()}%`;
    statsQuery.where((q) => {
      q.whereILike("title", term)
        .orWhereILike("description", term)
        .orWhereILike("event_type", term);
    });
  }

  const stats = await statsQuery
    .select(
      db.raw("COUNT(*) as count_all"),
      db.raw("COUNT(CASE WHEN event_date >= NOW() THEN 1 END) as count_upcoming"),
      db.raw("COUNT(CASE WHEN event_date < NOW() THEN 1 END) as count_past")
    )
    .first();

  const counts = {
    all: parseInt(stats?.count_all || 0, 10),
    upcoming: parseInt(stats?.count_upcoming || 0, 10),
    past: parseInt(stats?.count_past || 0, 10),
  };

  if (limit) query.limit(limit);
  if (offset) query.offset(offset);

  const events = await query;

  return {
    events,
    total,
    counts,
  };
};

const getAllAdminEvents = async () => {
  return await db("portal_events")
    .orderBy("event_date", "desc");
};

const createEvent = async (data) => {
  const created = await db("portal_events")
    .insert({
      ...data,
      createdAt: db.fn.now(),
      updatedAt: db.fn.now(),
    })
    .returning("*");
  return created[0];
};

const updateEvent = async (id, data) => {
  const updated = await db("portal_events")
    .where({ id })
    .update({
      ...data,
      updatedAt: db.fn.now(),
    })
    .returning("*");
  return updated[0];
};

const deleteEvent = async (id) => {
  return await db("portal_events").where({ id }).del();
};

module.exports = {
  getEventsByRole,
  getEventById,
  getSubmissionByStudentAndEvent,
  createOrUpdateSubmission,
  getAllSubmissionsForMentor,
  reviewSubmission,
  getAllPublicEvents,
  getAllAdminEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
