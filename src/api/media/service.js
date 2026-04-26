const cloudinary = require("../../utilities/cloudinary");
const ResponseError = require("../../error/ResponseError");

const listMedia = async (options = {}) => {
  try {
    const { folder = 'DEV/', next_cursor, limit = 50 } = options;
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folder,
      max_results: limit,
      next_cursor
    });
    return result;
  } catch (error) {
    console.error("Cloudinary List Error:", error);
    throw new ResponseError(500, "Failed to list media from Cloudinary");
  }
};

const deleteMedia = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return result;
  } catch (error) {
    console.error("Cloudinary Delete Error:", error);
    throw new ResponseError(500, "Failed to delete media from Cloudinary");
  }
};

const deleteBulkMedia = async (public_ids) => {
  try {
    const result = await cloudinary.api.delete_resources(public_ids);
    return result;
  } catch (error) {
    console.error("Cloudinary Bulk Delete Error:", error);
    throw new ResponseError(500, "Failed to delete multiple media from Cloudinary");
  }
};

const uploadMedia = async (file, folder = 'DEV/general') => {
    // This is a placeholder as multer handles the upload
    // We just return a success message if needed
    return { message: "Upload successful", file };
};

module.exports = {
  listMedia,
  deleteMedia,
  deleteBulkMedia,
  uploadMedia
};
