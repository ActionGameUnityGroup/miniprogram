const userService = (ctx) => {
  let args = ctx.query;
  console.log(args);
  return args;
};

module.exports = userService;