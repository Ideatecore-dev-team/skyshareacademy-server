const fs = require("fs");
const path = require("path");
const ResponseError = require("../../error/ResponseError");

/**
 * Lists media stored in the local uploads directory.
 * Simulates Cloudinary response schema for full compatibility with frontend.
 */
const listMedia = async (options = {}) => {
  try {
    const { next_cursor, limit = 50, protocol = "http", host = "localhost:3002" } = options;
    const uploadsDir = path.join(__dirname, "../../../uploads");

    let baseUrl = process.env.APP_URL;
    if (!baseUrl) {
      baseUrl = `${protocol}://${host}`;
    }
    baseUrl = baseUrl.replace(/\/+$/, "");

    if (!fs.existsSync(uploadsDir)) {
      return { resources: [], next_cursor: null, total_bytes: 0, total_count: 0 };
    }

    const allFiles = [];

    // Helper to scan directory recursively
    const scanDir = (dir, relativeDir = "") => {
      if (!fs.existsSync(dir)) return;
      
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const relPath = path.join(relativeDir, entry.name);
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          scanDir(fullPath, relPath);
        } else if (entry.isFile()) {
          // Exclude hidden files like .DS_Store
          if (entry.name.startsWith(".")) continue;

          const stat = fs.statSync(fullPath);
          // Standardize separator to slash
          const cleanRelPath = relPath.replace(/\\/g, "/");
          const publicUrl = `${baseUrl}/uploads/${cleanRelPath}`;

          allFiles.push({
            public_id: `uploads/${cleanRelPath}`, // Store local relative path as the public ID
            secure_url: publicUrl,
            url: publicUrl,
            created_at: stat.mtime.toISOString(),
            bytes: stat.size,
          });
        }
      }
    };

    scanDir(uploadsDir);

    const totalBytes = allFiles.reduce((acc, file) => acc + (file.bytes || 0), 0);
    const totalCount = allFiles.length;

    // Sort files by creation time descending (newest first)
    allFiles.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    // Simple cursor-based pagination (using array offset index)
    const startIndex = next_cursor ? parseInt(next_cursor, 10) : 0;
    const paginatedFiles = allFiles.slice(startIndex, startIndex + limit);
    const nextCursorVal =
      startIndex + limit < allFiles.length ? (startIndex + limit).toString() : null;

    return {
      resources: paginatedFiles,
      next_cursor: nextCursorVal,
      total_bytes: totalBytes,
      total_count: totalCount,
    };
  } catch (error) {
    console.error("Local Media List Error:", error);
    throw new ResponseError(500, "Failed to list media from local server");
  }
};

/**
 * Deletes a file stored locally.
 */
const deleteMedia = async (public_id) => {
  try {
    if (!public_id) {
      throw new ResponseError(400, "public_id is required");
    }

    // Direct path traversal protection: normalize and block dot-dot segments
    const cleanPath = path.normalize(public_id).replace(/^(\.\.(\/|\\|$))+/, "");
    const fullPath = path.join(__dirname, "../../../", cleanPath);

    if (fs.existsSync(fullPath)) {
      const stats = fs.statSync(fullPath);
      if (stats.isFile()) {
        fs.unlinkSync(fullPath);
        return { result: "ok" };
      }
    }
    return { result: "not_found" };
  } catch (error) {
    console.error("Local Delete Error:", error);
    throw new ResponseError(500, `Failed to delete media: ${error.message}`);
  }
};

/**
 * Deletes multiple files locally.
 */
const deleteBulkMedia = async (public_ids) => {
  try {
    const results = {};
    for (const public_id of public_ids) {
      const cleanPath = path.normalize(public_id).replace(/^(\.\.(\/|\\|$))+/, "");
      const fullPath = path.join(__dirname, "../../../", cleanPath);

      if (fs.existsSync(fullPath)) {
        const stats = fs.statSync(fullPath);
        if (stats.isFile()) {
          fs.unlinkSync(fullPath);
          results[public_id] = "ok";
          continue;
        }
      }
      results[public_id] = "not_found";
    }
    return results;
  } catch (error) {
    console.error("Local Bulk Delete Error:", error);
    throw new ResponseError(500, `Failed to delete multiple media: ${error.message}`);
  }
};

const uploadMedia = async (file, folder = "DEV/general") => {
  // Multer handles the upload, we just return a success payload
  return { message: "Upload successful", file };
};

module.exports = {
  listMedia,
  deleteMedia,
  deleteBulkMedia,
  uploadMedia,
};
