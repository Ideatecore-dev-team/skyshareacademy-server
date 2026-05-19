const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const db = require("./src/utilities/db");

/**
 * Downloads a file from a URL and returns its buffer.
 * Supports both http and https dynamically.
 */
const downloadToBuffer = (url) => {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    client
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          return reject(new Error(`Failed to download: Status ${res.statusCode}`));
        }
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => resolve(Buffer.concat(chunks)));
        res.on("error", (err) => reject(err));
      })
      .on("error", (err) => reject(err));
  });
};

// Configuration of database tables, fields containing Cloudinary URLs, and upload folders
const migrationConfig = [
  {
    table: "article",
    fields: ["image_heading"],
    folder: "article",
  },
  {
    table: "mentor",
    fields: ["gambar_alur_acara", "gambar_timeline", "event_image_url"],
    folder: "mentor",
  },
  {
    table: "partner",
    fields: ["gambar_sekolah"],
    folder: "partner",
  },
  {
    table: "school",
    fields: ["gambar_logo_sekolah"],
    folder: "school",
  },
  {
    table: "skyshare",
    fields: ["gambar_alur_acara", "gambar_timeline"],
    folder: "skyshare",
  },
  {
    table: "parent",
    fields: ["gambar_alur_acara", "gambar_timeline"],
    folder: "parent",
  },
  {
    table: "talent",
    fields: ["gambar_alur_acara", "gambar_timeline"],
    folder: "talent",
  },
];

const migrate = async () => {
  // Use the standard backend development/production URL
  const serverUrl = process.env.SERVER_URL || "http://localhost:3002";
  console.log(`===========================================================`);
  console.log(`🚀 Starting Cloudinary to Local WebP Migration Script`);
  console.log(`📍 Target Server URL: ${serverUrl}`);
  console.log(`===========================================================`);

  for (const config of migrationConfig) {
    const { table, fields, folder } = config;

    // Check if table exists in DB first to avoid errors
    const tableExists = await db.schema.hasTable(table);
    if (!tableExists) {
      console.log(`ℹ️ Table '${table}' does not exist in the database. Skipping.`);
      continue;
    }

    console.log(`\n📂 Processing table: "${table}"`);
    const rows = await db(table).select("*");
    let updatedCount = 0;

    for (const row of rows) {
      const updates = {};

      for (const field of fields) {
        const val = row[field];
        if (
          val &&
          typeof val === "string" &&
          (val.includes("cloudinary.com") || val.startsWith("http"))
        ) {
          console.log(`🔗 Found external asset on [${table}.${field}] (ID: ${row.id}):`);
          console.log(`   URL: ${val}`);
          try {
            console.log(`   📥 Downloading...`);
            const buffer = await downloadToBuffer(val);

            console.log(`   ⚡ Converting to WebP...`);
            const webpBuffer = await sharp(buffer)
              .webp({ quality: 80 })
              .toBuffer();

            const uploadDir = path.join(__dirname, "uploads", folder);
            if (!fs.existsSync(uploadDir)) {
              fs.mkdirSync(uploadDir, { recursive: true });
            }

            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const filename = `${field}-${uniqueSuffix}.webp`;
            const filePath = path.join(uploadDir, filename);

            fs.writeFileSync(filePath, webpBuffer);

            const localUrl = `${serverUrl}/uploads/${folder}/${filename}`;
            updates[field] = localUrl;
            console.log(`   ✅ Saved to: uploads/${folder}/${filename}`);
            console.log(`   ✅ DB URL updated to: ${localUrl}\n`);
          } catch (err) {
            console.error(`   ❌ Failed to migrate asset: ${err.message}\n`);
          }
        }
      }

      if (Object.keys(updates).length > 0) {
        await db(table)
          .where({ id: row.id })
          .update(updates);
        updatedCount++;
      }
    }
    console.log(`✅ Table "${table}" processing completed. Updated ${updatedCount} records.`);
  }

  console.log(`\n===========================================================`);
  console.log(`🎉 Cloudinary to Local WebP Migration Completed Successfully!`);
  console.log(`===========================================================`);
  process.exit(0);
};

migrate().catch((err) => {
  console.error("💥 Migration fatal error:", err);
  process.exit(1);
});
