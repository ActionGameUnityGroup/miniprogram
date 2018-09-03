const app = getApp();

let _this;

Page({
  data: {
    userAvatar: '',
    nickName: '用户0',
    totalIncome: 0,
    totalCustomer: 0,
    totalSpreadOrder: 0,
    spreadCourseList: [
      {courseCoverUrl: '', courseName: '如何改变观念 — 活出更精彩的人生', commissionRate: 0, expectIncome: 0},
      {courseCoverUrl: '', courseName: '如何改变观念 — 活出更精彩的人生', commissionRate: 0, expectIncome: 0},
      {courseCoverUrl: '', courseName: '如何改变观念 — 活出更精彩的人生', commissionRate: 0, expectIncome: 0},
      {courseCoverUrl: '', courseName: '如何改变观念 — 活出更精彩的人生', commissionRate: 0, expectIncome: 0},
      {courseCoverUrl: '', courseName: '如何改变观念 — 活出更精彩的人生', commissionRate: 0, expectIncome: 0},
    ]
  },
  onLoad: function(){
    wx.setNavigationBarTitle({
      title: '推广中心'
    });
    this.setData({
      totalIncome: this.data.totalIncome.toFixed(2)
    });
    _this = this;
    wx.getUserInfo({
      success: function(res){
        _this.setData({
          userAvatar: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        })
        // console.log(res.userInfo.avatarUrl);
      }
    });
  },
  cashAction: function(){
    console.log('提现');
  }
});