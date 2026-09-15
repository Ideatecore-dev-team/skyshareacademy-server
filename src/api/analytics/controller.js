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

    const response = await service.createActivityLog({
      admin_id,
      admin_name,
      action,
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
 * Retrieves activity logs for CMS dashboard.
 */
const getActivityLogs = async (req, res, next) => {
  try {
    const limit = req.query.limit || 50;
    const offset = req.query.offset || 0;
    const response = await service.getActivityLogs({ limit, offset });
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
  trackPageView,
  getAnalyticsDashboard,
  createActivityLog,
  getActivityLogs,
};

