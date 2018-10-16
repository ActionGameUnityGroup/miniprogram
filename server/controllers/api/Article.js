const articleModel = require('../../models/articleModel');
const {formatData, formatDataFail} = require('./formatData');

class Article{

  async getArticle(ctx){
    const params = ctx.query;
    console.log(params, '参数');
    const articleId = params.articleId;
    try {
      const data = await articleModel.find({articleId: articleId}, '-_id');
      console.log(data[0], '课程');
      await articleModel.update({articleId: articleId}, {browseTimes: data[0].browseTimes + 1}, {multi: true});
      ctx.info(`${ctx.url}: ${data[0]}`);
      ctx.body = formatData({article: data[0]});
      ctx.type = 'text/json';
    } catch(e) {
      // statements
      console.log(e);
      ctx.body = formatDataFail({info: '获取文章错误!'});
    }
  }

  async getArticleList(ctx){
    const params = ctx.query;
    console.log(params, '参数');
    const index = params.index || 0;
    console.log(index, '下标');
    const data = await articleModel.find({}, '-_id -articleDetail -imageFrom -articleFrom')
                      .sort({articleTime: -1})
                      .skip(index * 5)
                      .limit(5);
      ctx.info(`${ctx.url}: ${data}`);
    console.log(data, '课程列表');
    ctx.body = formatData({articleList: data});
    ctx.type = 'text/json';
  }

}

module.exports = new Article();