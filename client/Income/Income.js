const app = getApp();

Page({
  data: {
    incomeBalance: 3585.01,
    todayIncome: 75.00,
    totalIncome: 526.00,
    courseList: [
      {courseCoverUrl: '', courseTitle: '如何改变观念 —— 活出更精彩的人生', commissionRate: 30, income: 35},
      {courseCoverUrl: '', courseTitle: '如何改变观念 —— 活出更精彩的人生', commissionRate: 30, income: 35},
      {courseCoverUrl: '', courseTitle: '如何改变观念 —— 活出更精彩的人生', commissionRate: 30, income: 35},
      {courseCoverUrl: '', courseTitle: '如何改变观念 —— 活出更精彩的人生', commissionRate: 30, income: 35},
      {courseCoverUrl: '', courseTitle: '如何改变观念 —— 活出更精彩的人生', commissionRate: 30, income: 35},
      {courseCoverUrl: '', courseTitle: '如何改变观念 —— 活出更精彩的人生', commissionRate: 30, income: 35},
      {courseCoverUrl: '', courseTitle: '如何改变观念 —— 活出更精彩的人生', commissionRate: 30, income: 35},
      {courseCoverUrl: '', courseTitle: '如何改变观念 —— 活出更精彩的人生', commissionRate: 30, income: 35},
      {courseCoverUrl: '', courseTitle: '如何改变观念 —— 活出更精彩的人生', commissionRate: 30, income: 35},
      {courseCoverUrl: '', courseTitle: '如何改变观念 —— 活出更精彩的人生', commissionRate: 30, income: 35},
      {courseCoverUrl: '', courseTitle: '如何改变观念 —— 活出更精彩的人生', commissionRate: 30, income: 35},
    ],
    courseHeight: 0
  },
  onLoad: function(){
    wx.setNavigationBarTitle({
      title: '我的收益'
    });
    this.setData({
      incomeBalance: this.data.incomeBalance.toFixed(2),
      todayIncome: this.data.todayIncome.toFixed(2),
      totalIncome: this.data.totalIncome.toFixed(2)
    });
    // console.log(app);
    let height = app.globalData.systemInfo.windowHeight;
    console.log(height);
    this.setData({
      courseHeight: height - 212
    });
  }
});