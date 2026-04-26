const service = require("./service");

const listMedia = async (req, res, next) => {
  try {
    const options = {
      folder: req.query.folder || 'DEV/',
      next_cursor: req.query.next_cursor
    };
    const response = await service.listMedia(options);
    res.status(200).json({
      data: response.resources,
      next_cursor: response.next_cursor,
      status: "success",
      errors: false,
    });
  } catch (error) {
    next(error);
  }
};

const deleteMedia = async (req, res, next) => {
  try {
    const public_id = req.params[0] || req.params.public_id || req.body.public_id;
    const response = await service.deleteMedia(public_id);
    res.status(200).json({
      data: response,
      status: "success",
      errors: false,
    });
  } catch (error) {
    next(error);
  }
};

const uploadMedia = async (req, res, next) => {
    try {
        // Multer handles the upload, we just return the result
        // Assuming the file is available via req.files or req.file
        const file = req.files || req.file;
        res.status(201).json({
            data: file,
            status: "success",
            errors: false,
        });
    } catch (error) {
        next(error);
    }
};

const uploadTinyMCE = async (req, res, next) => {
  try {
    // Access the uploaded file from req.files['file'][0] as configured in route
    const file = req.files && req.files.file ? req.files.file[0] : null;

    if (!file) {
      return res.status(400).json({
        message: "No file uploaded",
        status: "error",
      });
    }

    // TinyMCE expects a JSON response with a 'location' field pointing to the image URL
    res.status(200).json({
      location: file.path, // This is the Cloudinary URL
    });
  } catch (error) {
    next(error);
  }
};

const deleteBulkMedia = async (req, res, next) => {
  try {
    const { public_ids } = req.body;
    if (!public_ids || !Array.isArray(public_ids)) {
      throw new ResponseError(400, "public_ids must be an array");
    }
    const response = await service.deleteBulkMedia(public_ids);
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
  listMedia,
  deleteMedia,
  deleteBulkMedia,
  uploadMedia,
  uploadTinyMCE,
};
