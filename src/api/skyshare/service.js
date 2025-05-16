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
  const skyshareExist = await repository.getAll();
  if (skyshareExist.length >= 1) {
    throw new ResponseError(409, "skyshare already exist");
  }

  const result = await repository.create(validData);

  return result;
};

const getAll = async () => {
  const result = await repository.getAll();
  if (!result.length > 0) {
    throw new ResponseError(404, "skyshare not found");
  }

  return result;
};

const getById = async (request) => {
  const validData = validate(request, schema.getById);

  const result = await repository.getById(validData);
  if (!result) {
    throw new ResponseError(404, "skyshare not found");
  }

  return result;
};

const update = async (request) => {
  const validData = validate(request, schema.update);

  const skyshareExist = await repository.getById({ id: validData.id });
  if (!skyshareExist) {
    throw new ResponseError(404, "skyshare not found");
  }

  if (
    validData.gambar_alur_acara ===
    "https://res.cloudinary.com/dsh5ppscb/image/upload/v1714931793/no-image/No_Image_Available_zfarlj.jpg"
  ) {
    validData.gambar_alur_acara = skyshareExist.gambar_alur_acara;
  }

  if (
    validData.gambar_timeline ===
    "https://res.cloudinary.com/dsh5ppscb/image/upload/v1714931793/no-image/No_Image_Available_zfarlj.jpg"
  ) {
    validData.gambar_timeline = skyshareExist.gambar_timeline;
  }

  const updateData = {
    gambar_alur_acara: validData.gambar_alur_acara,
    gambar_timeline: validData.gambar_timeline,
    link_cta: validData.link_cta,
  };

  const result = await repository.update(validData, updateData);
  if (!result) {
    throw new ResponseError(404, "skyshare not found");
  }

  return result;
};

const remove = async (request) => {
  const validData = validate(request, schema.remove);

  const result = await repository.remove(validData);
  if (!result) {
    throw new ResponseError(404, "skyshare not found");
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
