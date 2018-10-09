// PublicWelfare/publicAction.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    welfareActivityList: [
      {activityId: '', activityCover: "", activityName: "【智慧生活】亲子系列课程", activityDate: "8月1日", activityTime: '15:00', activityType: 0, activityStatus: '结束', isEnd: true},
      {activityId: '', activityCover: "", activityName: "【智慧生活】梅丰社区幼儿心理及亲子关系讲座", activityDate: "8月13日", activityTime: '15:00', activityType: 0, activityStatus: '结束', isEnd: true},
      {activityId: '', activityCover: "", activityName: "【智慧生活】主题公益沙龙", activityDate: "8月31日", activityTime: '15:00', activityType: 0, activityStatus: '结束', isEnd: true},
      {activityId: '', activityCover: "", activityName: "【个案花絮】台风洗礼后的第一场系统排列", activityDate: "9月20日", activityTime: '15:00', activityType: 0, activityStatus: '结束', isEnd: true},
      {activityId: '', activityCover: "", activityName: "【孝道分享】素食馆公益沙龙花絮", activityDate: "9月27日", activityTime: '15:00', activityType: 0, activityStatus: '结束', isEnd: true},
      {activityId: '', activityCover: "", activityName: "【智慧生活】育儿讲座精彩回顾", activityDate: "9月27日", activityTime: '15:00', activityType: 0, activityStatus: '结束', isEnd: true},
    ]
  },
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '公益活动'
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    // 
  },
  navigateAction: function(e) {
    console.log(e);
  }
})