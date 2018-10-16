let _this;

Page({
  data: {
    title: '',
    article: [],
    browseTimes: 0,
    time: '',
    articleFrom: '',
    imageFrom: '',
  },
  onLoad: function(options) {
    _this = this;
    console.log(options);
    wx.request({
      url: 'https://www.changdaolife.cn/api/article/getArticle?articleId='+options.articleId,
      method: 'GET',
      success: function(res){
        console.log(res.data.requestData);
        _this.setData({
          title: res.data.requestData.article.articleName,
          article: res.data.requestData.article.articleDetail,
          browseTimes: res.data.requestData.article.browseTimes,
          time: res.data.requestData.article.articleTime,
          articleFrom: res.data.requestData.article.articleFrom,
          imageFrom: res.data.requestData.article.imageFrom
        });
      }
    });
    // const articleList = wx.getStorageSync('articleList');
    // console.log(articleList, '文章列表');
    // const list = [];
    /*for(let article of articleList){
      if (options.articleId == article.articleId) {
        console.log(article);
        _this.setData({
          title: article.articleName,
          article: article.articleDetail,
          browseTimes: article.browseTimes,
          time: article.articleTime,
          articleFrom: article.articleFrom,
          imageFrom: article.imageFrom,
        });
        wx.setNavigationBarTitle({
          title: article.articleName
        });
        break;
      }
    }*/
  },
});