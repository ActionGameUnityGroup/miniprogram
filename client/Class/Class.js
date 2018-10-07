// let _this;

Page({
  data: {
    classList: [
      {classCover: '../assets/icon/miniprogram-icon-69.png', url: '../Live/Live'},
      {classCover: '../assets/icon/miniprogram-icon-70.png', url: '../Dream/Dream'},
    ]
  },
  onLoad: function(){
    wx.setNavigationBarTitle({
      title: '课堂'
    });
    /*_this = this;
    const classInfo = wx.getStorageSync('classInfo');
    if(classInfo.length > 0){
      _this.setData({
        classList: classInfo
      });
    } else {
      wx.request({
        url: 'https://www.changdaolife.cn/api/class/getClassList',
        method: 'GET',
        header: {
          'content-type': 'text/json'
        },
        success: function(res){
          console.info(res);
          _this.setData({
            classList: res.data.requestData
          });
          wx.setStorage({
            key: 'classInfo',
            data: res.data.requestData
          });
        },
        fail: function(err){
          console.error(err);
        }
      });
    }*/
  }
});