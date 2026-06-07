function buildQuery(searchMap, params) {
  const query = {};

  Object.keys(searchMap).forEach((key) => {
    const type = searchMap[key];

    const value = params[key];

    // 空值跳过
    if (value === undefined || value === null || value === '') {
      return;
    }

    // 模糊搜索
    if (type === 'fuzzy') {
      query[key] = {
        $regex: value,
        $options: 'i',
      };
    }

    // 精确搜索
    if (type === 'exact') {
      query[key] = value;
    }
  });

  return query;
}

module.exports = buildQuery;
