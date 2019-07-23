const app = getApp();

Page({
  data: {
  },
  onLoad: function () {
  },
  navigateToPage (e) {
    const { routes } = e.currentTarget.dataset;
    wx.navigateTo({
      url: routes,
    });
  },
});