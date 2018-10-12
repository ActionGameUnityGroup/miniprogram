let _this;

Page({
  data: {
    article: [
      {articleCover: '', aritcleName: '达摩宗开示：烦恼与菩提无二，破执即超脱', updateTime: '12小时前', viewNumber: '526'},
    ]
  },
  onLoad: function(options) {
    console.log(options);
    wx.setNavigationBarTitle({
      title: '往期精彩'
    });
    _this = this;
  },
});