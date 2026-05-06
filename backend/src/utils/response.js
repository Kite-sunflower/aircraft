exports.success = (res, code, data, message) => {
  return (
    res.status(code),
    json({
      status: code,
      data,
      message,
    })
  );
};
exports.fail = (res, code, data, message) => {
  return (
    res.status(code),
    json({
      status: code,
      data,
      message,
    })
  );
};
