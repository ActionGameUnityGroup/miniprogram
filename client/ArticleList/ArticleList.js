let _this;

Page({
  data: {
    isAll: true,
    isRelation: false,
    isHealth: false,
    isAptitude: false,
    articleList: [
      // {articleCover: '', aritcleName: '达摩宗开示：烦恼与菩提无二，破执即超脱', updateTime: '12小时前', viewNumber: '526'},
    ]
  },
  onLoad: function() {
    _this = this;
    wx.setNavigationBarTitle({
      title: '往期精彩'
    });
    // let articleList = wx.getStorageSync('articleList');
    // console.log(articleList, 'articleList');
    /*this.setData({
      articleList: articleList
    });*/
    wx.request({
      url: 'https://www.changdaolife.cn/api/article/getArticleList',
      method: 'GET',
      success: function(res){
        console.log(res.data.requestData.articleList);
        _this.setData({
          articleList: res.data.requestData.articleList,
        });
      }
    });
  },
  chooseNavAction: function(e){
    let articleList = wx.getStorageSync('articleList');
    let list = [];
    if(e.currentTarget.id == 'all'){
      list = articleList;
    } else {
      for(let article of articleList){
        if (article.articleType == e.currentTarget.id) {
          list.push(article);
        }
      }
    }
    console.log(list, '查找文章');
    _this.setData({
      articleList: list
    });
    switch(e.currentTarget.id){
      case 'all':
        _this.setData({
          isAll: true,
          isRelation: false,
          isHealth: false,
          isAptitude: false,
        });
        break;
      case 'relation':
        _this.setData({
          isAll: false,
          isRelation: true,
          isHealth: false,
          isAptitude: false,
        });
        break;
      case 'health':
        _this.setData({
          isAll: false,
          isRelation: false,
          isHealth: true,
          isAptitude: false,
        });
        break;
      case 'aptitude':
        _this.setData({
          isAll: false,
          isRelation: false,
          isHealth: false,
          isAptitude: true,
        });
        break;
        default:
          console.log('nothing is clicked');
    }
  }
});