async function pagination(Model, page, pageSize, sortObj = { createdAt: -1 }) {
  page = parseInt(page);
  pageSize = parseInt(pageSize);

  const skip = (page - 1) * pageSize;

  const list = await Model.find().sort(sortObj).skip(skip).limit(pageSize);

  const total = await Model.countDocuments();

  return {
    list,
    total,
    page,
    pageSize,
  };
}
module.exports = pagination;
