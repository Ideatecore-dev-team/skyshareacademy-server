const service = require("./service");

const login = async (req, res, next) => {
  try {
    const request = {
      username: req.body.username,
      password: req.body.password,
    };

    const response = await service.login(request);

    res
      .status(201)
      .cookie("authorization", response.token, {
        httpOnly: true,
        secure: true,
      })
      .json({
        data: response,
        status: "success",
        errors: {},
      });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const request = {
      id: req.user.id,
      oldPassword: req.body.oldPassword,
      newPassword: req.body.newPassword,
    };

    const response = await service.changePassword(request);

    res.status(200).json({
      data: response,
      status: "success",
      errors: {},
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const request = {
      id: req.user.id,
    };

    const response = await service.logout(request);

    res.status(201).clearCookie("authorization").json({
      data: response,
      status: "success",
      errors: {},
    });
  } catch (error) {
    next(error);
  }
};

const getAdmins = async (req, res, next) => {
  try {
    const response = await service.getAdmins();

    res.status(200).json({
      data: response,
      status: "success",
      errors: {},
    });
  } catch (error) {
    next(error);
  }
};

const getAdminById = async (req, res, next) => {
  try {
    const request = {
      id: req.params.adminId,
    };

    const response = await service.getAdminById(request);

    res.status(200).json({
      data: response,
      status: "success",
      errors: {},
    });
  } catch (error) {
    next(error);
  }
};

const updateAdminById = async (req, res, next) => {
  try {
    const request = {
      id: req.params.adminId,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    const response = await service.updateAdminById(request);

    res.status(200).json({
      data: response,
      status: "success",
      errors: {},
    });
  } catch (error) {
    next(error);
  }
};

const deleteAdminById = async (req, res, next) => {
  try {
    const request = {
      id: req.params.adminId,
    };

    const response = await service.deleteAdminById(request);

    res.status(200).json({
      data: response,
      status: "success",
      errors: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  logout,
  changePassword,
  getAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
};
