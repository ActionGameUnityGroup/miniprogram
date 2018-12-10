const Logger = require('./logger');

module.exports = function error(){
  return async (ctx, next) => {
    try{
      const logger = new Logger();
      logger.bindLogger(ctx);
      await next();
    } catch(e){
      ctx.body = e.message;
      ctx.status = 500;
    }
  };
}