const crypto = require("crypto");
const db = require("../../utilities/db");
const ResponseError = require("../../error/ResponseError");
const NodeCache = require("node-cache");

// Initialize cache with 24 hours TTL (86400 seconds)
const ipCache = new NodeCache({ stdTTL: 86400, checkperiod: 1200 });

/**
 * Hash IP address using SHA-256 for visitor privacy compliance.
 */
const hashIp = (ip) => {
  if (!ip) return "unknown";
  return crypto.createHash("sha256").update(ip).digest("hex");
};

const INDONESIAN_PROVINCES = [
  { name: "Jakarta Raya", id: "IDJK" },
  { name: "Jawa Barat", id: "IDJR" },
  { name: "Jawa Timur", id: "IDJI" },
  { name: "Jawa Tengah", id: "IDJT" },
  { name: "Banten", id: "IDBT" },
  { name: "Bali", id: "IDBA" },
  { name: "Sumatera Utara", id: "IDSU" },
  { name: "Sulawesi Selatan", id: "IDSG" },
  { name: "Kalimantan Barat", id: "IDKB" },
  { name: "Papua", id: "IDPA" }
];

const PROVINCE_MAP = {
  "jakarta": "Jakarta Raya",
  "dki jakarta": "Jakarta Raya",
  "special capital region of jakarta": "Jakarta Raya",
  "jakarta raya": "Jakarta Raya",
  
  "yogyakarta": "Yogyakarta",
  "special region of yogyakarta": "Yogyakarta",
  "daerah istimewa yogyakarta": "Yogyakarta",
  
  "aceh": "Aceh",
  "nanggroe aceh darussalam": "Aceh",
  
  "north sumatra": "Sumatera Utara",
  "sumatera utara": "Sumatera Utara",
  "south sumatra": "Sumatera Selatan",
  "sumatera selatan": "Sumatera Selatan",
  "west sumatra": "Sumatera Barat",
  "sumatera barat": "Sumatera Barat",
  
  "east java": "Jawa Timur",
  "jawa timur": "Jawa Timur",
  "central java": "Jawa Tengah",
  "jawa tengah": "Jawa Tengah",
  "west java": "Jawa Barat",
  "jawa barat": "Jawa Barat",
  
  "east kalimantan": "Kalimantan Timur",
  "kalimantan timur": "Kalimantan Timur",
  "west kalimantan": "Kalimantan Barat",
  "kalimantan barat": "Kalimantan Barat",
  "south kalimantan": "Kalimantan Selatan",
  "kalimantan selatan": "Kalimantan Selatan",
  "central kalimantan": "Kalimantan Tengah",
  "kalimantan tengah": "Kalimantan Tengah",
  "north kalimantan": "North Kalimantan",
  "kalimantan utara": "North Kalimantan",
  
  "south sulawesi": "Sulawesi Selatan",
  "sulawesi selatan": "Sulawesi Selatan",
  "north sulawesi": "Sulawesi Utara",
  "sulawesi utara": "Sulawesi Utara",
  "central sulawesi": "Sulawesi Tengah",
  "sulawesi tengah": "Sulawesi Tengah",
  "southeast sulawesi": "Sulawesi Tenggara",
  "sulawesi tenggara": "Sulawesi Tenggara",
  "west sulawesi": "Sulawesi Barat",
  "sulawesi barat": "Sulawesi Barat",
  
  "gorontalo": "Gorontalo",
  
  "maluku": "Maluku",
  "north maluku": "Maluku Utara",
  "maluku utara": "Maluku Utara",
  
  "papua": "Papua",
  "west papua": "Papua Barat",
  "papua barat": "Papua Barat",
  
  "riau": "Riau",
  "riau islands": "Kepulauan Riau",
  "kepulauan riau": "Kepulauan Riau",
  
  "bangka belitung": "Bangka-Belitung",
  "bangka-belitung": "Bangka-Belitung",
  "kepulauan bangka belitung": "Bangka-Belitung",
  "bangka-belitung islands": "Bangka-Belitung",
  "bangka belitung islands": "Bangka-Belitung",
  
  "bengkulu": "Bengkulu",
  "jambi": "Jambi",
  "lampung": "Lampung",
  "banten": "Banten",
  "bali": "Bali",
  
  "west nusa tenggara": "Nusa Tenggara Barat",
  "nusa tenggara barat": "Nusa Tenggara Barat",
  "east nusa tenggara": "Nusa Tenggara Timur",
  "nusa tenggara timur": "Nusa Tenggara Timur"
};

const normalizeProvinceName = (name) => {
  if (!name) return "Unknown";
  const key = name.trim().toLowerCase();
  return PROVINCE_MAP[key] || name;
};

/**
 * Resolves visitor IP address to an Indonesian province or "Luar Negeri".
 * Leverages native fetch in Node.js 18+.
 * Uses node-cache to avoid hitting public API rate limits (45 reqs/min).
 */
const resolveIpProvince = async (ip) => {
  if (!ip || ip === "127.0.0.1" || ip === "::1" || ip === "localhost" || ip.startsWith("192.168.") || ip.startsWith("10.") || ip.startsWith("172.16.")) {
    // Only return random province in development mode
    if (process.env.NODE_ENV !== "production") {
      if (Math.random() < 0.1) {
        return "Luar Negeri";
      }
      const randomProv = INDONESIAN_PROVINCES[Math.floor(Math.random() * INDONESIAN_PROVINCES.length)];
      return randomProv.name;
    }
    return "Unknown";
  }

  // Check cache first
  const cacheKey = hashIp(ip);
  const cachedProv = ipCache.get(cacheKey);
  if (cachedProv) {
    return cachedProv;
  }

  try {
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 5000);
    try {
      const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,regionName`, { signal: abortController.signal });
      const geo = await res.json();
      
      if (geo && geo.status === "success") {
        let resolvedProv;
        if (geo.countryCode === "ID") {
          resolvedProv = normalizeProvinceName(geo.regionName);
        } else {
          resolvedProv = "Luar Negeri";
        }
        // Save to cache for 24 hours
        ipCache.set(cacheKey, resolvedProv);
        return resolvedProv;
      }
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error) {
    console.error("[GeoIP Lookup Error]:", error.message);
  }

  // Fallback to "Unknown" to protect production data from corruption
  return "Unknown";
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
    const province = await resolveIpProvince(ip_address);

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
      province,
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
      .where("created_at", ">=", startDate)
      .groupBy("path")
      .orderBy("views", "desc")
      .limit(10);

    // 5. Top Traffic Referrers
    const topReferrers = await db("analytics_views")
      .select("referrer")
      .count("* as views")
      .where("created_at", ">=", startDate)
      .groupBy("referrer")
      .orderBy("views", "desc")
      .limit(10);

    // 6. Province Distribution
    const provinces = await db("analytics_views")
      .select("province")
      .count("* as visitors")
      .where("created_at", ">=", startDate)
      .whereNotNull("province")
      .whereNot("province", "Unknown")
      .groupBy("province")
      .orderBy("visitors", "desc");

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
      provinces: provinces.map((p) => ({
        province: p.province,
        visitors: parseInt(p.visitors, 10) || 0,
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
