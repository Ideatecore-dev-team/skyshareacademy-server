const repository = require("./repository");
const schema = require("./schema");
const validate = require("../../utilities/validation");
const ResponseError = require("../../error/ResponseError");

const create = async (request) => {
  const validData = validate(request, schema.create);

  //    const adminExist = await repository.findAdminById(validData.admin_id);
  //    if (!adminExist.length > 0) {
  //       throw new ResponseError(404, "admin not found");
  //    }

  const result = await repository.create(validData);

  return result;
};

const getAll = async () => {
  const result = await repository.getAll();
  if (!result.length > 0) {
    throw new ResponseError(404, "partner not found");
  }

  return result;
};

const getById = async (request) => {
  const validData = validate(request, schema.getById);

  const result = await repository.getById(validData);
  if (!result) {
    throw new ResponseError(404, "partner not found");
  }

  return result;
};

const update = async (request) => {
  const validData = validate(request, schema.update);

  const partnerExist = await repository.getById(validData);
  if (!partnerExist) {
    throw new ResponseError(404, "partner not found");
  }

  if (
    validData.gambar_sekolah ===
    "https://res.cloudinary.com/dsh5ppscb/image/upload/v1714931793/no-image/No_Image_Available_zfarlj.jpg"
  ) {
    validData.gambar_sekolah = partnerExist.gambar_sekolah;
  }

  const updateData = {
    nama_sekolah: validData.nama_sekolah,
    gambar_sekolah: validData.gambar_sekolah,
    lokasi: validData.lokasi,
    nama_group: validData.nama_group,
  };

  const result = await repository.update(validData, updateData);
  if (!result) {
    throw new ResponseError(404, "partner not found");
  }

  return result;
};

const remove = async (request) => {
  const validData = validate(request, schema.remove);

  const result = await repository.remove(validData);
  if (!result) {
    throw new ResponseError(404, "partner not found");
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
