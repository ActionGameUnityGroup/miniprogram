const app = getApp();

Page({
  data: {},
  onLoad: function (options) {
    console.log(options);
    /*wx.setNavigationBarTitle({
      title: '公益活动',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    });*/
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  // click action
  onClickAction: function(e) {
    console.log("click " + e);
  }
})