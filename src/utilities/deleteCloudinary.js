const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

/**
 * Extracts the public ID from a Cloudinary URL.
 * @param {string} url - The Cloudinary URL.
 * @returns {string} - The public ID.
 */
function extractPublicId(url) {
  const parts = url.split("/");
  const versionIndex = parts.findIndex((part) => part.startsWith("v"));
  const publicIdParts = parts.slice(versionIndex + 1);
  const publicId = publicIdParts.join("/").split(".")[0]; // Remove file extension
  return publicId;
}

/**
 * Deletes an image. Supports both local storage and Cloudinary.
 * @param {string} url - The image URL.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
async function deleteImage(url) {
  if (!url) return { result: "no_url" };

  // Detect local upload URL
  if (url.includes("/uploads/")) {
    try {
      const parts = url.split("/uploads/");
      const relativePath = parts[parts.length - 1]; // E.g., 'article/filename.webp'
      const absolutePath = path.join(__dirname, "../../uploads", relativePath);

      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
        return { result: "ok", source: "local" };
      }
      return { result: "not_found", source: "local" };
    } catch (error) {
      console.error("Local file deletion error:", error);
      throw error;
    }
  }

  // Fallback to Cloudinary deletion
  const publicId = extractPublicId(url);
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve({ ...result, source: "cloudinary" });
      }
    });
  });
}

module.exports = {
  deleteImage,
};
