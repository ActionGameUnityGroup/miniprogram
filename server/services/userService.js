const getQuery = (ctx) => {
  let args = ctx.query;
  // console.log(args);
  return args;
};

const getParams = (ctx) => {
  let args = JSON.parse(ctx.request.body);
  // console.log(args);
  return args;
};

module.exports = {
  getQuery,
  getParams
};