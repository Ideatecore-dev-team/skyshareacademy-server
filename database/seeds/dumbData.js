/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const bcrypt = require("bcrypt");

const superAdminData = {
  email: "superadmin@mail.com",
  name: "superadmin",
  password: bcrypt.hashSync("superadmin", 10),
  role: "superadmin",
};

const adminData = [
  {
    id: 111,
    email: "admin@mail.com",
    name: "maulana",
    password: bcrypt.hashSync("admin", 10),
  },
  {
    id: 222,
    email: "admin2@mail.com",
    name: "putra",
    password: bcrypt.hashSync("admin2", 10),
  },
];

const categoryData = [
  {
    id: 1,
    name: "technology",
    color: "red",
  },
  {
    id: 2,
    name: "food",
    color: "blue",
  },
  {
    id: 3,
    name: "travel",
    color: "green",
  },
  {
    id: 4,
    name: "sport",
    color: "yellow",
  },
  {
    id: 5,
    name: "music",
    color: "purple",
  },
  {
    id: 6,
    name: "game",
    color: "orange",
  },
  {
    id: 7,
    name: "movie",
    color: "brown",
  },
];

const schoolData = [
  {
    id: 1,
    gambar_logo_sekolah:
      "https://res.cloudinary.com/dsh5ppscb/image/upload/v1714931793/no-image/No_Image_Available_zfarlj.jpg",
    nama_sekolah: "SMP Negeri 1 Jakarta",
    alamat: "Jl. Raya Jakarta - mangga dua",
    embed_map: "https://goo.gl/maps/6JQ9cJ9q1dY2",
  },
  {
    id: 2,
    gambar_logo_sekolah:
      "https://res.cloudinary.com/dsh5ppscb/image/upload/v1714931793/no-image/No_Image_Available_zfarlj.jpg",
    nama_sekolah: "SMP Negeri 2 Jakarta",
    alamat: "Jl. Raya Jakarta - cipaganti",
    embed_map: "https://goo.gl/maps/6JQ9cJ9q1dY2",
  },
  {
    id: 3,
    gambar_logo_sekolah:
      "https://res.cloudinary.com/dsh5ppscb/image/upload/v1714931793/no-image/No_Image_Available_zfarlj.jpg",
    nama_sekolah: "SMP Negeri 3 Jakarta",
    alamat: "Jl. Raya Jakarta - mangga dua",
    embed_map: "https://goo.gl/maps/6JQ9cJ9q1dY2",
  },
  {
    id: 4,
    gambar_logo_sekolah:
      "https://res.cloudinary.com/dsh5ppscb/image/upload/v1714931793/no-image/No_Image_Available_zfarlj.jpg",
    nama_sekolah: "SMP Negeri 4 Jakarta",
    alamat: "Jl. Raya Jakarta - cipaganti",
    embed_map: "https://goo.gl/maps/6JQ9cJ9q1dY2",
  },
  {
    id: 5,
    gambar_logo_sekolah:
      "https://res.cloudinary.com/dsh5ppscb/image/upload/v1714931793/no-image/No_Image_Available_zfarlj.jpg",
    nama_sekolah: "SMP Negeri 5 Jakarta",
    alamat: "Jl. Raya Jakarta - mangga dua",
    embed_map: "https://goo.gl/maps/6JQ9cJ9q1dY2",
  },
];
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("admin").del();
  await knex("category").del();
  await knex("school").del();

  await knex("admin").insert(superAdminData);
  await knex("admin").insert(adminData);

  await knex("school").insert(schoolData);

  await knex("category").insert(categoryData);
};
