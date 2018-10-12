const articleModel = require('../../models/articleModel');
const {formatData} = require('./formatData');

class Article{
  async getArticleList(ctx){
    const params = ctx.query;
    const index = params.index || 0;
    const data = await articleModel.find({}, '-_id')
                      .sort({articleTime: -1})
                      .skip(index * 5)
                      .limit(5);
    ctx.body = formatData({articleList: data});
    ctx.type = 'text/json';
  }
}

module.exports = new Article();