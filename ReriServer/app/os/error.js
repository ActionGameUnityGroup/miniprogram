const Logger = require('./logger');

module.exports = () => {
  return async (ctx, next) => {
    try{
      const logger = new Logger();
      logger.bindLogger(ctx);
      await next();
    } catch(e){
      console.log('==========Error happends==========');
      console.log('this is an Error↓\n');
      console.error(e);
      console.log('\nthis is an Error Message↓\n');
      console.error(e.message);
      console.log('\n==========Render Error==========');
      ctx.body = 'server happends a problem';
      ctx.status = 500;
    }
  };
}