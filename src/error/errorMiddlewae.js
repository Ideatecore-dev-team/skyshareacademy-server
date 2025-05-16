const ResponseError = require("./ResponseError");

const errorMiddlewae = async (err, req, res, next) => {
  try {
    if (!err) {
      next();
      return;
    }
    if (err instanceof ResponseError) {
      console.log("===>", err, "<===");
      res
        .status(err.status)
        .json({
          error: true,
          status: "error",
          message: err.message,
        })
        .end();
    } else {
      console.log("===>", err, "<===");
      res
        .status(500)
        .json({
          error: true,
          status: "error",
          message: "internal server error",
        })
        .end();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = errorMiddlewae;
