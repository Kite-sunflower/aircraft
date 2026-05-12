module.exports = (req, res, next) => {
  res.sendFail = (statusCode, data, message) => {
    return res.status(statusCode).json({
      status: 'fail',
      data,
      message,
      requestTime: req.requestTime,
    });
  };
  res.sendSuccess = (statusCode, data, message) => {
    return res.status(statusCode).json({
      status: 'success',
      data,
      message,
      requestTime: req.requestTime,
    });
  };
  next();
};
