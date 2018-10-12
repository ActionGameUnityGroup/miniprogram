const Article = require('../../controllers/api/Article');

module.exports = {
  'GET /api/article/getArticleList': async (ctx) => {
    await Article.getArticleList(ctx);
  },
  'POST /api/article/setArticle': async (ctx) => {
    console.log('添加文章');
  }
}