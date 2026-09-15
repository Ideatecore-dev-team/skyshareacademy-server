const repository = require("./repository");
const schema = require("./schema");
const validate = require("../../utilities/validation");
const ResponseError = require("../../error/ResponseError");
const jwt = require("../../utilities/token");

const generateOtpCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOtp = async (request) => {
  const validData = validate(request, schema.sendOtp);
  const { destination, type } = validData;

  const otpCode = generateOtpCode();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  let student = await repository.findByDestination(destination);

  if (!student) {
    const newAccountData = {
      otp_code: otpCode,
      otp_expires_at: expiresAt,
      is_verified: false,
    };
    if (type === "phone") {
      newAccountData.phone = destination;
    } else {
      newAccountData.email = destination;
    }
    student = await repository.createAccount(newAccountData);
  } else {
    student = await repository.updateAccount(student.id, {
      otp_code: otpCode,
      otp_expires_at: expiresAt,
    });
  }

  // Log for development / console inspection
  console.log(`[SkyShare OTP] Verification code for ${destination}: ${otpCode}`);

  return {
    message: "OTP successfully generated",
    destination,
    expiresInMinutes: 10,
    // Provide OTP in dev/preview mode for seamless developer experience
    debugOtp: process.env.NODE_ENV !== "production" ? otpCode : undefined,
  };
};

const verifyOtp = async (request) => {
  const validData = validate(request, schema.verifyOtp);
  const { destination, otp } = validData;

  const student = await repository.findByDestination(destination);
  if (!student) {
    throw new ResponseError(404, "Student account not found");
  }

  if (!student.otp_code || student.otp_code !== otp) {
    throw new ResponseError(400, "Invalid verification code");
  }

  if (new Date() > new Date(student.otp_expires_at)) {
    throw new ResponseError(400, "Verification code has expired");
  }

  // Clear OTP and mark as verified
  const updated = await repository.updateAccount(student.id, {
    otp_code: null,
    otp_expires_at: null,
    is_verified: true,
  });

  const isProfileComplete = Boolean(updated.name && updated.region && updated.role);

  let token = null;
  if (isProfileComplete) {
    token = jwt({
      id: updated.id,
      role: updated.role,
      type: "student",
    });
  }

  return {
    isProfileComplete,
    token,
    user: {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      phone: updated.phone,
      role: updated.role,
      region: updated.region,
      age: updated.age,
      occupation: updated.occupation,
      profile_picture: updated.profile_picture,
    },
  };
};

const register = async (request) => {
  const validData = validate(request, schema.register);
  const { destination, name, region, age, occupation, role, phone, email } = validData;

  let student = await repository.findByDestination(destination);
  if (!student) {
    student = await repository.createAccount({
      email: email || (destination.includes("@") ? destination : null),
      phone: phone || (!destination.includes("@") ? destination : null),
      name,
      region,
      age,
      occupation,
      role: role || "talent",
      is_verified: true,
    });
  } else {
    student = await repository.updateAccount(student.id, {
      name,
      region,
      age,
      occupation,
      role: role || student.role || "talent",
      phone: phone || student.phone,
      email: email || student.email,
      is_verified: true,
    });
  }

  const token = jwt({
    id: student.id,
    role: student.role,
    type: "student",
  });

  return {
    token,
    user: {
      id: student.id,
      name: student.name,
      email: student.email,
      phone: student.phone,
      role: student.role,
      region: student.region,
      age: student.age,
      occupation: student.occupation,
      profile_picture: student.profile_picture,
    },
  };
};

const googleLogin = async (request) => {
  const validData = validate(request, schema.googleLogin);
  const { email, name, google_id, profile_picture } = validData;

  let student = await repository.findByEmail(email);

  if (!student) {
    student = await repository.createAccount({
      email,
      name: name || "Member SkyShare",
      google_id,
      profile_picture,
      role: "talent",
      is_verified: true,
    });
  } else {
    const updatePayload = {};
    if (!student.google_id && google_id) updatePayload.google_id = google_id;
    if (!student.profile_picture && profile_picture) updatePayload.profile_picture = profile_picture;
    if (Object.keys(updatePayload).length > 0) {
      student = await repository.updateAccount(student.id, updatePayload);
    }
  }

  const token = jwt({
    id: student.id,
    role: student.role,
    type: "student",
  });

  return {
    token,
    user: {
      id: student.id,
      name: student.name,
      email: student.email,
      phone: student.phone,
      role: student.role,
      region: student.region,
      age: student.age,
      occupation: student.occupation,
      profile_picture: student.profile_picture,
    },
  };
};

const getProfile = async (userId) => {
  const student = await repository.findById(userId);
  if (!student) {
    throw new ResponseError(404, "Student not found");
  }

  return {
    id: student.id,
    name: student.name,
    email: student.email,
    phone: student.phone,
    role: student.role,
    region: student.region,
    age: student.age,
    occupation: student.occupation,
    profile_picture: student.profile_picture,
    is_active: student.is_active,
  };
};

const updateProfile = async (userId, request) => {
  const validData = validate(request, schema.updateProfile);
  const student = await repository.findById(userId);
  if (!student) {
    throw new ResponseError(404, "Student not found");
  }

  const updated = await repository.updateAccount(userId, validData);

  return {
    id: updated.id,
    name: updated.name,
    email: updated.email,
    phone: updated.phone,
    role: updated.role,
    region: updated.region,
    age: updated.age,
    occupation: updated.occupation,
    profile_picture: updated.profile_picture,
  };
};

module.exports = {
  sendOtp,
  verifyOtp,
  register,
  googleLogin,
  getProfile,
  updateProfile,
};
