const service = require("./service");

/**
 * Tracks a pageview hit.
 */
const trackPageView = async (req, res, next) => {
  try {
    // Resolve accurate client IP address (supporting standard reverse proxies)
    const ip =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null);

    const ipAddress = Array.isArray(ip) ? ip[0] : ip ? ip.split(",")[0].trim() : "127.0.0.1";

    const data = {
      ip_address: ipAddress,
      path: req.body.path,
      user_agent: req.headers["user-agent"] || req.body.user_agent,
      referrer: req.body.referrer,
      load_time_ms: req.body.load_time_ms,
      fcp_ms: req.body.fcp_ms,
      lcp_ms: req.body.lcp_ms,
      cls: req.body.cls,
      fid_ms: req.body.fid_ms,
    };

    const response = await service.trackPageView(data);
    res.status(201).json({
      data: response,
      status: "success",
      errors: false,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves the aggregated analytics metrics.
 */
const getAnalyticsDashboard = async (req, res, next) => {
  try {
    const days = req.query.days || 90;
    const response = await service.getAnalyticsDashboard(days);
    res.status(200).json({
      data: response,
      status: "success",
      errors: false,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Records an admin action activity log.
 */
const createActivityLog = async (req, res, next) => {
  try {
    const ip =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
      req.ip;

    const ipAddress = Array.isArray(ip) ? ip[0] : ip ? ip.split(",")[0].trim() : "127.0.0.1";

    const admin_id = req.user?.id || req.body.admin_id || null;
    const admin_name = req.user?.name || req.body.admin_name || "Admin";
    const action = req.body.action;

    if (!action) {
      return res.status(400).json({
        errors: true,
        message: "Action description is required",
      });
    }

    // Sanitize and limit action length to avoid bloat
    const sanitizedAction = String(action).trim().slice(0, 150);

    const response = await service.createActivityLog({
      admin_id,
      admin_name,
      action: sanitizedAction,
      ip_address: ipAddress,
    });

    res.status(201).json({
      data: response,
      status: "success",
      errors: false,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves activity logs for CMS dashboard with lightweight pagination.
 */
const getActivityLogs = async (req, res, next) => {
  try {
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const offset = req.query.offset !== undefined 
      ? Math.max(parseInt(req.query.offset, 10) || 0, 0)
      : (page - 1) * limit;

    const response = await service.getActivityLogs({ limit, offset });
    const total = response.total || 0;
    const totalPages = Math.max(Math.ceil(total / limit), 1);

    res.status(200).json({
      data: {
        ...response,
        page,
        limit,
        totalPages,
      },
      status: "success",
      errors: false,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  trackPageView,
  getAnalyticsDashboard,
  createActivityLog,
  getActivityLogs,
};

