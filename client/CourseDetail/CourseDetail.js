const app = getApp();

Page({
  data: {},
  onLoad: function(options){},
  navigateOperation: () => {
    wx.navigateTo({
      url: '/RegistrationDetail/RegistrationDetail'
    });
  }
})