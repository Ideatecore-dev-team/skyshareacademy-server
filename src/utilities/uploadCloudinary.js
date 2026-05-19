const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Use memory storage to process files directly without intermediate disk writes
const storage = multer.memoryStorage();
const uploadInstance = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

/**
 * Helper to create a custom multer fields middleware that automatically
 * converts images to WebP and saves files locally under the uploads directory.
 */
const createLocalUploadMiddleware = (folder, fields) => {
  const multerMiddleware = uploadInstance.fields(fields);

  return (req, res, next) => {
    multerMiddleware(req, res, async (err) => {
      if (err) {
        return next(err);
      }

      if (req.files) {
        try {
          const uploadDir = path.join(__dirname, "../../uploads", folder);
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
          }

          const fieldNames = Object.keys(req.files);
          for (const fieldName of fieldNames) {
            const files = req.files[fieldName];
            for (const file of files) {
              const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
              const isImage = file.mimetype.startsWith("image/");
              
              let filename;
              let finalBuffer;

              if (isImage) {
                filename = `${file.fieldname}-${uniqueSuffix}.webp`;
                // Convert to WebP using sharp with quality 80
                finalBuffer = await sharp(file.buffer)
                  .webp({ quality: 80 })
                  .toBuffer();
              } else {
                // Preserve original extension for PDFs and other non-image files
                const ext = path.extname(file.originalname) || "";
                filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
                finalBuffer = file.buffer;
              }

              const filePath = path.join(uploadDir, filename);
              fs.writeFileSync(filePath, finalBuffer);

              // Construct the absolute public URL of the uploaded asset dynamically
              let baseUrl = process.env.APP_URL;
              if (!baseUrl) {
                const protocol = req.protocol;
                const host = req.get("host");
                baseUrl = `${protocol}://${host}`;
              }
              baseUrl = baseUrl.replace(/\/+$/, "");
              const publicUrl = `${baseUrl}/uploads/${folder}/${filename}`;

              // Override standard multer properties so controllers get the local URL
              file.filename = filename;
              file.path = publicUrl;
              file.secure_url = publicUrl;
              file.url = publicUrl;
            }
          }
        } catch (error) {
          console.error("Local upload/WebP conversion error:", error);
          return next(error);
        }
      }
      next();
    });
  };
};

// Define multer instances (identical signatures to previous Cloudinary ones)
const partner = createLocalUploadMiddleware("partner", [{ name: "gambar_sekolah" }]);
const school = createLocalUploadMiddleware("school", [{ name: "gambar_logo_sekolah" }]);
const article = createLocalUploadMiddleware("article", [{ name: "image_heading" }]);
const skyshare = createLocalUploadMiddleware("skyshare", [
  { name: "gambar_alur_acara" },
  { name: "gambar_timeline" },
]);
const mentor = createLocalUploadMiddleware("mentor", [
  { name: "gambar_alur_acara" },
  { name: "gambar_timeline" },
  { name: "event_image_url" },
]);
const parent = createLocalUploadMiddleware("parent", [
  { name: "gambar_alur_acara" },
  { name: "gambar_timeline" },
]);
const talent = createLocalUploadMiddleware("talent", [
  { name: "gambar_alur_acara" },
  { name: "gambar_timeline" },
]);
const general = createLocalUploadMiddleware("general", [{ name: "file" }]);

module.exports = {
  partner,
  article,
  mentor,
  skyshare,
  school,
  parent,
  talent,
  general,
};
