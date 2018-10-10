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
        let data = {};
        for(var i = 0; i < res.data.requestData.length; i++){
          data[i] = false;
          // _this.setData(data);
        }
        data.welfareActivityList = res.data.requestData;
        console.log(data, '新建的data');
        _this.setData(data);
        wx.setStorage({
          key: 'activityList',
          data: res.data.requestData
        });
      }
    });
  },
  loadImage: function(e){
    console.log(e.currentTarget.dataset);
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