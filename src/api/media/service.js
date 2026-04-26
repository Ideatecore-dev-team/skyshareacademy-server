const cloudinary = require("../../utilities/cloudinary");
const ResponseError = require("../../error/ResponseError");

const listMedia = async (options = {}) => {
  try {
    const { folder = 'DEV/', next_cursor } = options;
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folder,
      max_results: 50,
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
    if (result.result !== 'ok') {
      throw new ResponseError(400, `Failed to delete media: ${result.result}`);
    }
    return result;
  } catch (error) {
    console.error("Cloudinary Delete Error:", error);
    throw new ResponseError(500, "Failed to delete media from Cloudinary");
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
  uploadMedia
};
