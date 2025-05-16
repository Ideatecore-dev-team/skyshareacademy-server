const repository = require("./repository");
const schema = require("./schema");
const validate = require("../../utilities/validation");
const ResponseError = require("../../error/ResponseError");
const { deleteImage } = require("../../utilities/deleteCloudinary");

const create = async (request) => {
  const validData = validate(request, schema.create);

  const schoolExist = await repository.getSchoolByName({
    nama_sekolah: validData.nama_sekolah,
  });
  if (schoolExist.length > 0) {
    throw new ResponseError(409, "school already exist");
  }

  const result = await repository.create(validData);

  return result;
};

const getAll = async () => {
  const result = await repository.getAll();
  if (!result.length > 0) {
    throw new ResponseError(404, "school not found");
  }

  return result;
};

const getById = async (request) => {
  const validData = validate(request, schema.getById);

  const result = await repository.getById(validData);
  if (!result) {
    throw new ResponseError(404, "school not found");
  }

  return result;
};

const update = async (request) => {
  const validData = validate(request, schema.update);
  const schoolExist = await repository.getById({ id: validData.id });
  if (!schoolExist) {
    throw new ResponseError(404, "group not found");
  }
  // console.log(validData, "<====validData");
  // console.log(articleExist, "<====articleExist");

  if (
    validData.gambar_logo_sekolah ===
    "https://res.cloudinary.com/dsh5ppscb/image/upload/v1714931793/no-image/No_Image_Available_zfarlj.jpg"
  ) {
    validData.gambar_logo_sekolah = schoolExist.gambar_logo_sekolah;
  } else {
    // console.log(schoolExist.gambar_logo_sekolah);
    await deleteImage(schoolExist.gambar_logo_sekolah);
  }

  const updateData = {
    gambar_logo_sekolah: validData.gambar_logo_sekolah,
    nama_sekolah: validData.nama_sekolah,
    alamat: validData.alamat,
    embed_map: validData.embed_map,
    id: validData.schoolId,
  };

  const result = await repository.update(validData, updateData);

  if (!result) {
    throw new ResponseError(404, "group not found");
  }

  return result;
};

const remove = async (request) => {
  const validData = validate(request, schema.remove);

  const adminExist = await repository.findAdminById(validData.admin_id);
  if (!adminExist.length > 0) {
    throw new ResponseError(404, "admin not found");
  }

  const result = await repository.remove(validData);
  await deleteImage(result.gambar_logo_sekolah);

  if (!result) {
    throw new ResponseError(404, "article not found");
  }

  return result;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
