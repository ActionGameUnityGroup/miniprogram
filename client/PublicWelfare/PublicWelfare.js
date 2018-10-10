let _this;

Page({
  data: {
    welfareActivityList: []
  },
  onLoad: function(options) {
    _this = this;
    wx.setNavigationBarTitle({
      title: '公益活动'
    });
    wx.request({
      url: 'https://www.changdaolife.cn/api/activity/getActivityList',
      method: 'GET',
      success: function(res){
        console.log(res);
        _this.setData({
          welfareActivityList: res.data.requestData
        });
        wx.setStorage({
          key: 'activityList',
          data: res.data.requestData
        });
      }
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
  navigateAction: function(e) {
    console.log(e.currentTarget);
    wx.navigateTo({
      url: '../WelfareActivity/WelfareActivity?activityId='+e.currentTarget.id
    });
  }
})