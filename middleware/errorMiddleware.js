const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode).json({
    msg: err.message,
  });
};

module.exports = { errorHandler };
