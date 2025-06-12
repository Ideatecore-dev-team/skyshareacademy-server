const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const ResponseError = require("../error/ResponseError");
const errorMiddleware = require("../error/errorMiddlewae");

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

const allowedOrigins = [
  "https://dev.skyshareacademy.id",
  "https://skyshareacademy.id",
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "Kebijakan CORS untuk situs ini tidak mengizinkan akses dari origin yang ditentukan.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World Sekai!");
});

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
