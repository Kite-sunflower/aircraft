module.exports = (req, res, next) => {
  res.sendFail = (statusCode, data, message) => {
    return res.status(statusCode).json({
      success: false,
      data,
      message,
      requestTime: req.requestTime,
    });
  };
  res.sendSuccess = (statusCode, data, message) => {
    return res.status(statusCode).json({
      success: true,
      data,
      message,
      requestTime: req.requestTime,
    });
  };
  next();
};
