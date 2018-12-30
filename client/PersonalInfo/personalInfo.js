//获取应用实例
const app = getApp()
let _this;

Page({
  data: {
    headerBackground: '',
    avatar: '',
    userName: '用户名',
    identify: '用户id',
    moduleList: [
      {moduleImg: '/assets/icon/my-income.png', moduleName: '我的收益', moduleUrl: '/Income/Income'},
      {moduleImg: '/assets/icon/spread-center.png', moduleName: '推广中心', moduleUrl: '/Spread/Spread'},
      {moduleImg: '/assets/icon/my-inviter.png', moduleName: '我的邀请人', moduleUrl: '/MyInivitation/MyInivitation'},
      {moduleImg: '/assets/icon/my-sign.png', moduleName: '我的优惠券', moduleUrl: '/MyCoupon/MyCoupon'},
      {moduleImg: '/assets/icon/my-course.png', moduleName: '我的课程', moduleUrl: '/MyCourse/MyCourse'},
      {moduleImg: '/assets/icon/my-collection.png', moduleName: '我的收藏', moduleUrl: '/Collection/Collection'},
      {moduleImg: '/assets/icon/online-consult.png', moduleName: '在线咨询', isContact: true},
      {moduleImg: '/assets/icon/phone-consult.png', moduleName: '电话咨询', isCall: true},
      {moduleImg: '/assets/icon/feedback.png', moduleName: '意见反馈', moduleUrl: '/FeedBack/FeedBack'},
    ],
    // contentHeight: 0
  },
  onLoad: function () {
    _this = this;
    // const height = app.globalData.systemInfo.windowHeight;
    this.setData({
      // contentHeight: height*(1 - .083)
    });
    wx.getUserInfo({
      success: function(res){
        console.log(res.userInfo, 32);
        _this.setData({
          userName: res.userInfo.nickName,
          avatar: res.userInfo.avatarUrl,
        });
      }
    });

    /*wx.request({
      url: 'https://www.changdaolife.cn/api/user/getUserInfo',
      method: 'GET',
      header: {
        'content-type': 'text/plain',
        'Authorization': wx.getStorageSync('openid')
      },
      success: function(res){
        console.log(res);
        _this.setData({
          identify: res.data.requestData[0].userid
        });
      }
    });*/

  },
  callAction: function(){
    wx.makePhoneCall({
      phoneNumber: '0755-82557627'
    })
  },
  redirectAction: function(e){
    wx.redirectTo({
      url: e.currentTarget.id
    });
  },
  navigateAction: function(e){
    wx.navigateTo({
      url: e.currentTarget.id
    });
  },
  getInfoAction: function(){
    wx.getUserInfo({
      success: function(info){
        console.log(info);
      }
    });
  }
});