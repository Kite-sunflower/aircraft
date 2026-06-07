async function pagination({
  Model,
  page = 1,
  pageSize = 10,
  query = {},
  sortObj = { createdAt: -1 },
  populate = '',
}) {
  page = parseInt(page);
  pageSize = parseInt(pageSize);

  const skip = (page - 1) * pageSize;

  let dbQuery = Model.find(query).sort(sortObj).skip(skip).limit(pageSize);

  if (populate) {
    if (Array.isArray(populate)) {
      populate.forEach((item) => {
        dbQuery = dbQuery.populate(item);
      });
    } else {
      dbQuery = dbQuery.populate(populate);
    }
  }
  const list = await dbQuery;
  const total = await Model.countDocuments(query);

  return {
    list,
    total,
    page,
    pageSize,
  };
}
module.exports = pagination;
