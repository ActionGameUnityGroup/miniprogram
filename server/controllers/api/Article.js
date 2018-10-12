const articleModel = require('../../models/articleModel');
const {formatData} = require('./formatData');

class Article{
  async getArticleList(ctx){
    const params = ctx.query;
    console.log(params, '参数');
    const index = params.index || 0;
    console.log(index, '下标');
    const data = await articleModel.find({}, '-_id')
                      .sort({articleTime: -1})
                      .skip(index * 5)
                      .limit(5);
    console.log(data, '课程列表');
    ctx.body = formatData({articleList: data});
    ctx.type = 'text/json';
  }
}

module.exports = new Article();