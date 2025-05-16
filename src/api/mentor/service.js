const repository = require("./repository");
const schema = require("./schema");
const validate = require("../../utilities/validation");
const ResponseError = require("../../error/ResponseError");
const { deleteImage } = require("../../utilities/deleteCloudinary");

const imageDefault =
  "https://res.cloudinary.com/dsh5ppscb/image/upload/v1714931793/no-image/No_Image_Available_zfarlj.jpg";

const create = async (request) => {
  const validData = validate(request, schema.create);

  const mentorExist = await repository.getAll();
  if (mentorExist.length >= 1) {
    throw new ResponseError(409, "mentor already exist");
  }

  const mentorData = {
    file_booklet: validData.file_booklet,
    gambar_alur_acara: validData.gambar_alur_acara,
    gambar_timeline: validData.gambar_timeline,
    link_cta: validData.link_cta,
    link_join_program: validData.link_join_program,
  };

  const mentorResult = await repository.create(mentorData);
  //   const [getmentor] = await repository.getAll(mentorData);

  // if (validData.school_id.length > 0) {
  //   for (let i = 0; i < validData.school_id.length; i++) {
  //     const mentorSchoolData = {
  //       mentor_id: mentorResult.id,
  //       school_id: validData.school_id[i],
  //     };
  //     await repository.createMentorSchool(mentorSchoolData);
  //   }
  // }

  // const getAllmentorSchool = await repository.getAllMentorSchool();

  return {
    id: mentorResult.id,
    file_booklet: mentorResult.file_booklet,
    gambar_alur_acara: mentorResult.gambar_alur_acara,
    gambar_timeline: mentorResult.gambar_timeline,
    link_cta: mentorResult.link_cta,
    link_join_program: mentorResult.link_join_program,
    // school_id: getAllmentorSchool,
  };
};

const getAll = async () => {
  const mentorResult = await repository.getAll();
  if (!mentorResult.length > 0) {
    throw new ResponseError(404, "mentor not found");
  }
  // const getAllMentorSchool = await repository.getAllMentorSchool();

  return {
    id: mentorResult[0].id,
    file_booklet: mentorResult[0].file_booklet,
    gambar_alur_acara: mentorResult[0].gambar_alur_acara,
    gambar_timeline: mentorResult[0].gambar_timeline,
    link_cta: mentorResult[0].link_cta,
    link_join_program: mentorResult[0].link_join_program,

    // school_id: getAllMentorSchool,
  };
};

const update = async (request) => {
  const validData = validate(request, schema.update);
  const mentorExist = await repository.getAll();
  if (mentorExist.length < 1) {
    throw new ResponseError(409, "mentor not found");
  }

  if (validData.gambar_alur_acara === imageDefault) {
    validData.gambar_alur_acara = mentorExist[0].gambar_alur_acara;
  } else {
    deleteImage(mentorExist[0].gambar_alur_acara);
  }

  if (validData.gambar_timeline === imageDefault) {
    validData.gambar_timeline = mentorExist[0].gambar_timeline;
  } else {
    deleteImage(mentorExist[0].gambar_timeline);
  }

  const mentorData = {
    file_booklet: validData.file_booklet,
    gambar_alur_acara: validData.gambar_alur_acara,
    gambar_timeline: validData.gambar_timeline,
    link_cta: validData.link_cta,
    link_join_program: validData.link_join_program,
  };

  const mentorResult = await repository.update(mentorData);
  if (!mentorResult) {
    throw new ResponseError(404, "mentor not found");
  }
  // if (validData.school_id.length > 0) {
  //   await repository.deleteMentorSchool({ mentor_id: mentorResult.id });
  //   for (let i = 0; i < validData.school_id.length; i++) {
  //     const mentorSchoolData = {
  //       mentor_id: mentorResult.id,
  //       school_id: validData.school_id[i],
  //     };
  //     await repository.createMentorSchool(mentorSchoolData);
  //   }
  // }

  // const getAllMentorSchool = await repository.getAllMentorSchool();

  return {
    id: mentorResult.id,
    file_booklet: mentorResult.file_booklet,
    gambar_alur_acara: mentorResult.gambar_alur_acara,
    gambar_timeline: mentorResult.gambar_timeline,
    link_cta: mentorResult.link_cta,
    link_join_program: mentorResult.link_join_program,
    // school_id: getAllMentorSchool,
  };
};

module.exports = {
  create,
  getAll,
  update,
};
