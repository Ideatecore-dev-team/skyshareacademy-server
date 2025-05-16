const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Define a function to create storage instances
const createStorage = (folder) => {
  return new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `DEV/${folder}`,
      allowedFormats: ["jpeg", "png", "jpg"],
    },
  });
};

// Define multer instances
const partner = multer({ storage: createStorage("partner") }).fields([
  { name: "gambar_sekolah" },
]);
const school = multer({ storage: createStorage("school") }).fields([
  { name: "gambar_logo_sekolah" },
]);
const article = multer({ storage: createStorage("article") }).fields([
  { name: "image_heading" },
]);

const skyshare = multer({ storage: createStorage("skyshare") }).fields([
  { name: "gambar_alur_acara" },
  { name: "gambar_timeline" },
]);

const mentor = multer({ storage: createStorage("mentor") }).fields([
  { name: "gambar_alur_acara" },
  { name: "gambar_timeline" },
]);

const parent = multer({ storage: createStorage("parent") }).fields([
  { name: "gambar_alur_acara" },
  { name: "gambar_timeline" },
]);

const talent = multer({ storage: createStorage("talent") }).fields([
  { name: "gambar_alur_acara" },
  { name: "gambar_timeline" },
]);

module.exports = {
  partner,
  article,
  mentor,
  skyshare,
  school,
  parent,
  talent,
};
