
Page({
  data: {
    welfareActivityList: []
  },
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '公益活动'
    });
    wx.request({
      url: 'https://www.changdaolife.cn/api/activity/getActivityList',
      method: 'GET',
      success: function(res){
        console.log(res);
      }
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
  navigateAction: function(e) {
    // console.log(e);
    wx.navigateTo({
      url: '../WelfareActivity/WelfareActivity'
    });
  }
})