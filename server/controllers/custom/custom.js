const {formatData, formatDataFail} = require('../api/formatData');
const customModel = require('../../models/customModel');
// const request = require('../../app/request');
// const WXBizDataCrypt = require('../../app/WXBizDataCrypt');

class Custom {

  async getAdminList(ctx){
    let query = ctx.query;
    let data = await customModel.find(query, '-_id');
    await ctx.info(`${ctx.url}: ${data}`);
    ctx.body = await formatData(data);
    ctx.type = 'text/json';
  }

  async getUserMessage(ctx){
      // let params = getParams(ctx);
      let params = ctx.query;
      console.log(params, '微信');
      ctx.body = await formatData({info: '成功'});
      /*.then((res) => {
        console.log(res, 50);
        const data = formatData(res);
        ctx.body = data;
        ctx.type = 'text/json';
      })
      .catch((err) => {
        const error = formatDataFail(err);
        ctx.body = error;
        ctx.type = 'text/json';
      });*/
  }

};

module.exports = new Custom();