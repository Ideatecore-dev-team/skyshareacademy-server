const service = require("./service");

const sendOtp = async (req, res, next) => {
  try {
    const result = await service.sendOtp(req.body);
    res.status(200).json({
      status: "success",
      errors: false,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const verifyOtp = async (req, res, next) => {
  try {
    const result = await service.verifyOtp(req.body);

    if (result.token) {
      res.cookie("authorization", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }

    res.status(200).json({
      status: "success",
      errors: false,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const result = await service.register(req.body);

    res
      .status(201)
      .cookie("authorization", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })
      .json({
        status: "success",
        errors: false,
        data: result,
      });
  } catch (error) {
    next(error);
  }
};

const googleLogin = async (req, res, next) => {
  try {
    const result = await service.googleLogin(req.body);

    res
      .status(200)
      .cookie("authorization", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })
      .json({
        status: "success",
        errors: false,
        data: result,
      });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("authorization").status(200).json({
      status: "success",
      errors: false,
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const result = await service.getProfile(req.user.id);
    res.status(200).json({
      status: "success",
      errors: false,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const result = await service.updateProfile(req.user.id, req.body);
    res.status(200).json({
      status: "success",
      errors: false,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
  register,
  googleLogin,
  logout,
  getProfile,
  updateProfile,
};
