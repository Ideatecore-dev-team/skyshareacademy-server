const Joi = require("joi");
require("dotenv").config();

// Definisikan schema validasi environment variables
const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "production", "test")
    .default("development"),

  PORT: Joi.number().integer().min(1).max(65535).default(3000),

  DATABASE_URL: Joi.string().uri().required(),
  DATABASE_PASSWORD: Joi.string().min(8).required(),

  JWT_SECRET: Joi.string().min(16).required(),
  JWT_EXPIRED: Joi.string().default("30d"),

  CLOUDINARY_CLOUD_NAME: Joi.string().required(),
  CLOUDINARY_KEY: Joi.string().required(),
  CLOUDINARY_SECRET: Joi.string().required(),
}).unknown(true); // allow extra keys if needed

// Validasi process.env
const { error, value: validEnv } = envSchema.validate(process.env, {
  abortEarly: false, // tampilkan semua error, bukan hanya yang pertama
  allowUnknown: true, // biarkan env lain tetap ada
  stripUnknown: true, // hapus env yang tidak ada di schema
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  NODE_ENV: validEnv.NODE_ENV,
  PORT: validEnv.PORT,
  DATABASE_URL: validEnv.DATABASE_URL,
  DATABASE_PASSWORD: validEnv.DATABASE_PASSWORD,

  JWT_SECRET: validEnv.JWT_SECRET,
  JWT_EXPIRED: validEnv.JWT_EXPIRED,

  CLOUDINARY_CLOUD_NAME: validEnv.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_KEY: validEnv.CLOUDINARY_KEY,
  CLOUDINARY_SECRET: validEnv.CLOUDINARY_SECRET,
};
