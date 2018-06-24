const fs = require('fs');

module.exports = function(){
  return async (ctx, next) => {
    ctx.render = async(view, model) => {
      await fs.readFile(`./views/${view}`, 'utf8', (err, data) => {
    	  if (!err) {
          // console.log(ctx);
          ctx.body = data;
          ctx.type = 'text/html';
        }
     });
    }
    await next();
  };
}