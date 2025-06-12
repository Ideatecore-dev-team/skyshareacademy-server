const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

// error middleware
const ResponseError = require("../error/ResponseError");
const errorMiddleware = require("../error/errorMiddlewae");

// router
const adminRoute = require("../api/admin/route");
const articleRoute = require("../api/article/route");
const partnerRoute = require("../api/partner/route");
const skyshareRoute = require("../api/skyshare/route");
const categoryRoute = require("../api/category/route");
const contactRoute = require("../api/contact/route");
const schoolRoute = require("../api/school/route");
const groupRoute = require("../api/group/route");
const talentRoute = require("../api/talent/route");
const mentorRoute = require("../api/mentor/route");
const parentRoute = require("../api/parent/route");

const app = express();

// Konfigurasi CORS
const allowedOrigins = [
  "https://dev.skyshareacademy.id",
  "https://skyshareacademy.id",
  "http://localhost:5173", // Gunakan http:// untuk localhost jika tidak menggunakan https
  "http://localhost:5174", // Gunakan http:// untuk localhost jika tidak menggunakan https
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Izinkan permintaan tanpa origin (misalnya, permintaan dari Postman atau curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "Kebijakan CORS untuk situs ini tidak mengizinkan akses dari origin yang ditentukan.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // Penting jika Anda menggunakan cookie atau sesi
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Tambahan header CORS untuk memastikan
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// limit request from one IP address per second

// delay
// app.use(async (req, res, next) => {
//     await new Promise((resolve) => setTimeout(resolve, 3000));
//     next();
// });

app.get("/", (req, res) => {
  res.send("Hello World Sekai!");
});

// routes
app.use(adminRoute);
app.use(articleRoute);
app.use(partnerRoute);
app.use(skyshareRoute);
app.use(categoryRoute);
app.use(contactRoute);
app.use(schoolRoute);
app.use(groupRoute);
app.use(mentorRoute);
app.use(talentRoute);
app.use(parentRoute);

app.use("*", (req, res, next) => {
  const endpoint = req.originalUrl;
  next(new ResponseError(404, `${endpoint} endpoint not found!`));
});

app.use(errorMiddleware);

module.exports = app;
