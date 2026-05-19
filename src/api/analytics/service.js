const crypto = require("crypto");
const db = require("../../utilities/db");
const ResponseError = require("../../error/ResponseError");

/**
 * Hash IP address using SHA-256 for visitor privacy compliance.
 */
const hashIp = (ip) => {
  if (!ip) return "unknown";
  return crypto.createHash("sha256").update(ip).digest("hex");
};

/**
 * Tracks a pageview hit from the public client site.
 */
const trackPageView = async (data) => {
  try {
    const {
      ip_address,
      path,
      user_agent,
      referrer,
      load_time_ms,
      fcp_ms,
      lcp_ms,
      cls,
      fid_ms,
    } = data;

    if (!path) {
      throw new ResponseError(400, "Path is required to track pageviews");
    }

    const hashedIp = hashIp(ip_address);

    // Format referrer: default to Direct if empty
    let cleanReferrer = referrer || "Direct";
    if (cleanReferrer.startsWith("http")) {
      try {
        const urlObj = new URL(cleanReferrer);
        cleanReferrer = urlObj.hostname; // E.g., 'google.com', 'instagram.com'
      } catch (e) {
        // Fallback to original
      }
    }

    await db("analytics_views").insert({
      ip_address: hashedIp,
      path,
      user_agent: user_agent || "unknown",
      referrer: cleanReferrer,
      load_time_ms: (load_time_ms !== undefined && load_time_ms !== null) ? parseInt(load_time_ms, 10) : null,
      fcp_ms: (fcp_ms !== undefined && fcp_ms !== null) ? parseInt(fcp_ms, 10) : null,
      lcp_ms: (lcp_ms !== undefined && lcp_ms !== null) ? parseInt(lcp_ms, 10) : null,
      cls: (cls !== undefined && cls !== null) ? parseFloat(cls) : null,
      fid_ms: (fid_ms !== undefined && fid_ms !== null) ? parseInt(fid_ms, 10) : null,
    });

    return { success: true };
  } catch (error) {
    console.error("Track PageView Error:", error);
    if (error instanceof ResponseError) {
      throw error;
    }
    throw new ResponseError(500, `Failed to track pageview: ${error.message}`);
  }
};

/**
 * Computes aggregated dashboard analytics.
 */
const getAnalyticsDashboard = async (days = 90) => {
  try {
    const limitDays = parseInt(days, 10) || 90;

    // 1. Visitors Today (Pageviews & Unique Visitors)
    // Today boundary (UTC start of day or server timezone)
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const todayStats = await db("analytics_views")
      .count("* as pageviews")
      .countDistinct("ip_address as unique_visitors")
      .where("created_at", ">=", startOfToday)
      .first();

    // 2. Average Performance Metrics (Core Web Vitals)
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - limitDays);
    startDate.setHours(0, 0, 0, 0);

    const performanceStats = await db("analytics_views")
      .avg("load_time_ms as avg_load_time")
      .avg("fcp_ms as avg_fcp")
      .avg("lcp_ms as avg_lcp")
      .avg("cls as avg_cls")
      .avg("fid_ms as avg_fid")
      .where("created_at", ">=", startDate)
      .first();

    // 3. Time Series Analytics for the last N days (grouped by date)
    const timeSeries = await db("analytics_views")
      .select(db.raw("DATE(created_at) as date"))
      .count("* as pageviews")
      .countDistinct("ip_address as unique_visitors")
      .where("created_at", ">=", startDate)
      .groupByRaw("DATE(created_at)")
      .orderBy("date", "asc");

    // 4. Top Visited Pages
    const topPages = await db("analytics_views")
      .select("path")
      .count("* as views")
      .groupBy("path")
      .orderBy("views", "desc")
      .limit(10);

    // 5. Top Traffic Referrers
    const topReferrers = await db("analytics_views")
      .select("referrer")
      .count("* as views")
      .groupBy("referrer")
      .orderBy("views", "desc")
      .limit(10);

    return {
      today: {
        pageviews: parseInt(todayStats.pageviews, 10) || 0,
        unique_visitors: parseInt(todayStats.unique_visitors, 10) || 0,
      },
      performance: {
        avg_load_time: Math.round(parseFloat(performanceStats.avg_load_time || 0)),
        avg_fcp: Math.round(parseFloat(performanceStats.avg_fcp || 0)),
        avg_lcp: Math.round(parseFloat(performanceStats.avg_lcp || 0)),
        avg_cls: parseFloat(parseFloat(performanceStats.avg_cls || 0).toFixed(3)),
        avg_fid: Math.round(parseFloat(performanceStats.avg_fid || 0)),
      },
      timeSeries: timeSeries.map((t) => {
        // Format date beautifully to 'YYYY-MM-DD'
        let dateStr = "";
        try {
          dateStr = new Date(t.date).toISOString().split("T")[0];
        } catch (e) {
          dateStr = String(t.date);
        }
        return {
          date: dateStr,
          pageviews: parseInt(t.pageviews, 10) || 0,
          unique_visitors: parseInt(t.unique_visitors, 10) || 0,
        };
      }),
      topPages: topPages.map((p) => ({
        path: p.path,
        views: parseInt(p.views, 10) || 0,
      })),
      topReferrers: topReferrers.map((r) => ({
        referrer: r.referrer,
        views: parseInt(r.views, 10) || 0,
      })),
    };
  } catch (error) {
    console.error("Get Analytics Dashboard Error:", error);
    throw new ResponseError(500, `Failed to load dashboard metrics: ${error.message}`);
  }
};

module.exports = {
  trackPageView,
  getAnalyticsDashboard,
};
