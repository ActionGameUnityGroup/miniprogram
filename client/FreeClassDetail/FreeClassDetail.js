const app = getApp()

Page({
  data: {

  },
  onLoad: function () {
    const height = app.globalData.systemInfo.windowHeight;
    this.setData({
      contentHeight: height*(1 - .083)
    });

  },
  redirectAction: function(e){
    wx.redirectTo({
      url: '/FeedBackDetail/FeedBackDetail'
    });
  },
  navigateAction: function(e){
    wx.navigateTo({
      url: e.currentTarget.id
    });
  }
});