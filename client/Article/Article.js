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
    const articleList = wx.getStorageSync('articleList');
    console.log(articleList, '文章列表');
    const list = [];
    for(let article of articleList){
      if (options.articleId == article.articleId) {
        for(let key = 0; key < article.articleDetail.length; key++){
          if (article.articleDetail[key].includes('https://')) {
            list[key] = {isURL: true, data: article.articleDetail[key]};
          } else {
            list[key] = {isURL: false, data: article.articleDetail[key]};
          }
        }
        _this.setData({
          title: article.articleName,
          article: list,
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
    }
  },
});