const bodyParser = require('koa-bodyparser');
module.exports = bodyParser;
/*module.exports = () => {
  return async (ctx, next) => {
    await next();
  }
};*/