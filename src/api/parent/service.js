const repository = require("./repository");
const schema = require("./schema");
const validate = require("../../utilities/validation");
const ResponseError = require("../../error/ResponseError");
const { deleteImage } = require("../../utilities/deleteCloudinary");

const imageDefault =
  "https://res.cloudinary.com/dsh5ppscb/image/upload/v1714931793/no-image/No_Image_Available_zfarlj.jpg";

const create = async (request) => {
  const validData = validate(request, schema.create);

  const parentExist = await repository.getAll();
  if (parentExist.length >= 1) {
    throw new ResponseError(409, "parent already exist");
  }

  const parentData = {
    file_booklet: validData.file_booklet,
    gambar_alur_acara: validData.gambar_alur_acara,
    gambar_timeline: validData.gambar_timeline,
    link_cta: validData.link_cta,
    link_join_program: validData.link_join_program,
  };

  const parentResult = await repository.create(parentData);
  //   const [getparent] = await repository.getAll(parentData);

  // if (validData.school_id.length > 0) {
  //   for (let i = 0; i < validData.school_id.length; i++) {
  //     const parentSchoolData = {
  //       parent_id: parentResult.id,
  //       school_id: validData.school_id[i],
  //     };
  //     await repository.createParentSchool(parentSchoolData);
  //   }
  // }

  const getAllParentSchool = await repository.getAllParentSchool();

  return {
    id: parentResult.id,
    file_booklet: parentResult.file_booklet,
    gambar_alur_acara: parentResult.gambar_alur_acara,
    gambar_timeline: parentResult.gambar_timeline,
    link_cta: parentResult.link_cta,
    link_join_program: parentResult.link_join_program,
  };
};

const getAll = async () => {
  const parentResult = await repository.getAll();
  if (!parentResult.length > 0) {
    throw new ResponseError(404, "parent not found");
  }
  const getAllParentSchool = await repository.getAllParentSchool();

  return {
    id: parentResult[0].id,
    file_booklet: parentResult[0].file_booklet,
    gambar_alur_acara: parentResult[0].gambar_alur_acara,
    gambar_timeline: parentResult[0].gambar_timeline,
    link_cta: parentResult[0].link_cta,
    link_join_program: parentResult[0].link_join_program,
  };
};

const update = async (request) => {
  const validData = validate(request, schema.update);
  const parentExist = await repository.getAll();
  if (parentExist.length < 1) {
    throw new ResponseError(409, "parent not found");
  }

  if (validData.gambar_alur_acara === imageDefault) {
    validData.gambar_alur_acara = parentExist[0].gambar_alur_acara;
  } else {
    deleteImage(parentExist[0].gambar_alur_acara);
  }

  if (validData.gambar_timeline === imageDefault) {
    validData.gambar_timeline = parentExist[0].gambar_timeline;
  } else {
    deleteImage(parentExist[0].gambar_timeline);
  }

  const parentData = {
    file_booklet: validData.file_booklet,
    gambar_alur_acara: validData.gambar_alur_acara,
    gambar_timeline: validData.gambar_timeline,
    link_cta: validData.link_cta,
    link_join_program: validData.link_join_program,
  };

  const parentResult = await repository.update(parentData);
  if (!parentResult) {
    throw new ResponseError(404, "parent not found");
  }
  // if (validData.school_id.length > 0) {
  //   await repository.deleteParentSchool({ parent_id: parentResult.id });
  //   for (let i = 0; i < validData.school_id.length; i++) {
  //     const parentSchoolData = {
  //       parent_id: parentResult.id,
  //       school_id: validData.school_id[i],
  //     };
  //     await repository.createParentSchool(parentSchoolData);
  //   }
  // }

  const getAllParentSchool = await repository.getAllParentSchool();

  return {
    id: parentResult.id,
    file_booklet: parentResult.file_booklet,
    gambar_alur_acara: parentResult.gambar_alur_acara,
    gambar_timeline: parentResult.gambar_timeline,
    link_cta: parentResult.link_cta,
    link_join_program: parentResult.link_join_program,

    // school_id: getAllParentSchool,
  };
};

module.exports = {
  create,
  getAll,
  update,
};
