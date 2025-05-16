const cloudinary = require("cloudinary").v2;

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
 * Deletes an image from Cloudinary.
 * @param {string} url - The Cloudinary URL.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
async function deleteImage(url) {
  // console.log(url, "<====deleteCludinary");
  const publicId = extractPublicId(url);
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = {
  deleteImage,
};
