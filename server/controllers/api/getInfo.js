const formatData = require('./formatData');

module.exports = {
  'GET /api/getInfo': async (ctx) => {
    let params = ctx.request.body;
    params = JSON.parse(params);
    const user = require('../../models/user');
    await user.findbyname(params.userName, function(error, result){
      if (error) {
        console.log(error);
      }else{
        console.log(result);
        const data = formatData(result);
        ctx.body = data;
        ctx.type = 'text/json';
      }
    });
  }
};