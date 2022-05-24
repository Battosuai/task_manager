const { CustomApiError } = require("../classes/custom-error");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  console.error(err.stack);
  return res.status(500).json({ msg: "Internel server error" });
};

module.exports = errorHandler;
