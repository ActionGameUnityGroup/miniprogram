let _this;

Page({
  data: {
    isAll: true,
    isRelation: false,
    isHealth: false,
    isAptitude: false,
    articleList: [
      {articleCover: '', aritcleName: '达摩宗开示：烦恼与菩提无二，破执即超脱', updateTime: '12小时前', viewNumber: '526'},
    ]
  },
  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '往期精彩'
    });
    _this = this;
  },
  chooseNavAction: function(e){
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