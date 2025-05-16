const repository = require("./repository");
const schema = require("./schema");
const validate = require("../../utilities/validation");
const ResponseError = require("../../error/ResponseError");
const { deleteImage } = require("../../utilities/deleteCloudinary");

const imageDefault =
  "https://res.cloudinary.com/dsh5ppscb/image/upload/v1714931793/no-image/No_Image_Available_zfarlj.jpg";

const create = async (request) => {
  const validData = validate(request, schema.create);

  const talentExist = await repository.getAll();
  if (talentExist.length >= 1) {
    throw new ResponseError(409, "talent already exist");
  }

  const talentData = {
    file_booklet: validData.file_booklet,
    gambar_alur_acara: validData.gambar_alur_acara,
    gambar_timeline: validData.gambar_timeline,
    link_cta: validData.link_cta,
    link_join_program: validData.link_join_program,
  };

  const talentResult = await repository.create(talentData);
  //   const [getTalent] = await repository.getAll(talentData);

  if (validData.school_id.length > 0) {
    for (let i = 0; i < validData.school_id.length; i++) {
      const talentSchoolData = {
        talent_id: talentResult.id,
        school_id: validData.school_id[i],
      };
      await repository.createTalentSchool(talentSchoolData);
    }
  }

  const getAllTalentSchool = await repository.getAllTalentSchool();

  return {
    id: talentResult.id,
    file_booklet: talentResult.file_booklet,
    gambar_alur_acara: talentResult.gambar_alur_acara,
    gambar_timeline: talentResult.gambar_timeline,
    link_cta: talentResult.link_cta,
    link_join_program: talentResult.link_join_program,
    school_id: getAllTalentSchool,
  };
};

const getAll = async () => {
  const talentResult = await repository.getAll();
  if (!talentResult.length > 0) {
    throw new ResponseError(404, "talent not found");
  }
  const getAllTalentSchool = await repository.getAllTalentSchool();

  return {
    id: talentResult[0].id,
    file_booklet: talentResult[0].file_booklet,
    gambar_alur_acara: talentResult[0].gambar_alur_acara,
    gambar_timeline: talentResult[0].gambar_timeline,
    link_cta: talentResult[0].link_cta,
    link_join_program: talentResult[0].link_join_program,
    school_id: getAllTalentSchool,
  };
};

const update = async (request) => {
  const validData = validate(request, schema.update);
  const talentExist = await repository.getAll();
  if (talentExist.length < 1) {
    throw new ResponseError(409, "talent not found");
  }

  if (validData.gambar_alur_acara === imageDefault) {
    validData.gambar_alur_acara = talentExist[0].gambar_alur_acara;
  } else {
    deleteImage(talentExist[0].gambar_alur_acara);
  }

  if (validData.gambar_timeline === imageDefault) {
    validData.gambar_timeline = talentExist[0].gambar_timeline;
  } else {
    deleteImage(talentExist[0].gambar_timeline);
  }

  const talentData = {
    file_booklet: validData.file_booklet,
    gambar_alur_acara: validData.gambar_alur_acara,
    gambar_timeline: validData.gambar_timeline,
    link_cta: validData.link_cta,
    link_join_program: validData.link_join_program,
  };

  const talentResult = await repository.update(talentData);
  if (!talentResult) {
    throw new ResponseError(404, "talent not found");
  }
  if (validData.school_id.length > 0) {
    await repository.deleteTalentSchool({ talent_id: talentResult.id });
    for (let i = 0; i < validData.school_id.length; i++) {
      const talentSchoolData = {
        talent_id: talentResult.id,
        school_id: validData.school_id[i],
      };
      await repository.createTalentSchool(talentSchoolData);
    }
  }

  const getAllTalentSchool = await repository.getAllTalentSchool();

  return {
    id: talentResult.id,
    file_booklet: talentResult.file_booklet,
    gambar_alur_acara: talentResult.gambar_alur_acara,
    gambar_timeline: talentResult.gambar_timeline,
    link_cta: talentResult.link_cta,
    link_join_program: talentResult.link_join_program,
    school_id: getAllTalentSchool,
  };
};

module.exports = {
  create,
  getAll,
  update,
};
