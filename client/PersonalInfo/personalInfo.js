//获取应用实例
const app = getApp()

Page({
  data: {
    headerBackground: '../assets/icon/miniprogram-icon-73.jpg',
    avatar: '',
    userName: '用户名',
    identify: 'ididididid',
    moduleList: [
      {moduleImg: '../assets/icon/miniprogram-icon-42.png', moduleName: '我的收益', moduleUrl: '../Income/Income'},
      {moduleImg: '../assets/icon/miniprogram-icon-39.png', moduleName: '推广中心', moduleUrl: '../Spread/Spread'},
      {moduleImg: '../assets/icon/miniprogram-icon-43.png', moduleName: '我的邀请人', moduleUrl: '../MyInivitation/MyInivitation'},
      {moduleImg: '../assets/icon/miniprogram-icon-45.png', moduleName: '消息提醒', moduleUrl: '../Message/Message'},
      {moduleImg: '../assets/icon/miniprogram-icon-40.png', moduleName: '我的课程', moduleUrl: '../MyCourse/MyCourse'},
      {moduleImg: '../assets/icon/miniprogram-icon-44.png', moduleName: '我的作业', moduleUrl: '../HomeWork/HomeWork'},
      {moduleImg: '../assets/icon/miniprogram-icon-37.png', moduleName: '积分商城', moduleUrl: '../ScoreMarket/scoreMarket'},
      {moduleImg: '../assets/icon/miniprogram-icon-41.png', moduleName: '我的收藏', moduleUrl: '../Keep/Keep'},
      {moduleImg: '../assets/icon/miniprogram-icon-36.png', moduleName: '观看历史', moduleUrl: '../WatchHistory/watchHistory'},
      {moduleImg: '../assets/icon/miniprogram-icon-48.png', moduleName: '在线咨询', moduleUrl: '../Consult/Consult'},
      {moduleImg: '../assets/icon/miniprogram-icon-35.png', moduleName: '电话咨询'},
      {moduleImg: '../assets/icon/miniprogram-icon-47.png', moduleName: '意见反馈', moduleUrl: '../FeedBack/FeedBack'},
    ],
    contentHeight: 0
  },
  onLoad: function () {
    // 页面渲染完之后马上运行的函数
    wx.setNavigationBarTitle({
      title: '我的'
    });
    const _this = this;
    const height = app.globalData.systemInfo.windowHeight;
    this.setData({
      contentHeight: height*(1 - .083)
    });
    wx.getUserInfo({
      success: function(res){
        console.log(res.userInfo);
        _this.setData({
          userName: res.userInfo.nickName,
          avatar: res.userInfo.avatarUrl
        });
      }
    });
  },
  callAction: function(){
    wx.makePhoneCall({
      phoneNumber: '0755-82557627'
    })
  }
  /*getInfoAction: function(){
    wx.getUserInfo({
      success: function(info){
        console.log(info);
      }
    });
  }*/
});