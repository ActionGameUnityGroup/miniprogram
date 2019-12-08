const app = getApp();
let _this;

Page({
  data: {
    freeClassList: [],
  },
  onLoad: function() {
    _this = this;
  },
  navigateOperation: function(e){
    wx.navigateTo({
      url: '/FreeClassDetail/FreeClassDetail'
    });
  }
});