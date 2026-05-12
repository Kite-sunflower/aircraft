async function pagination(Model, page = 1, limit = 10, sortObj = { createdAt: -1 }) {
  page = parseInt(page);
  limit = parseInt(limit);

  const skip = (page - 1) * limit;

  const data = await Model.find().sort(sortObj).skip(skip).limit(limit);

  const total = await Model.countDocuments();

  const pages = Math.ceil(total / limit);
  return {
    total,
    page,
    pages,
    limit,
    data,
  };
}
module.exports = pagination;
