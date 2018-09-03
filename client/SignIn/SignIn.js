Page({
  data: {
    registerDays: 0,
    signDays: 0,
    serialDays: 0,
    mostSerialDays: 0,
    currentYear: 2018,
    currentMonth: 8,
    week: [
      {day: '日'},
      {day: '一'},
      {day: '二'},
      {day: '三'},
      {day: '四'},
      {day: '五'},
      {day: '六'},
    ],
    month: [],
    fill: ['', '', ''],
    slogan: 'sdlgkjslkgjew',
    from: 'dsligjl',
    integration: 2,
    signSuccess: false
  },
  onLoad: function(){
    wx.setNavigationBarTitle({
      title: '签到'
    });
    let date = new Date();
    // console.log(new Date(date.getFullYear(date), date.getMonth(date) + 2, 0).getDate());
    let startDay = date.getDay();
    // console.log(startDay);
    let fill = 7 - startDay;
    console.log(fill, '填补');
    let currentMonth = new Date(date.getFullYear(date), date.getMonth(date) + 1, 0);
    // console.log(currentMonth);
    let dateIndex = currentMonth.getDate() - 1;
    let month = [];
    for (var i = 0; i <= dateIndex; i++) {
      month[i] = {date: i+1, isToday: false, isRegister: false};
      if (i < 5) {
        month[i].isRegister = true;
      } else if (i == dateIndex) {
        month[i].isToday = true;
      }
    }
    /*console.log(month);
    console.log(currentMonth.getDate());
    console.log(date.getMonth(date));
    console.log(date.getFullYear(date));
    console.log(date.getFullYear(date));*/
    this.setData({
      month: month
    });
  },
  signAction: function(){
    console.log('打卡');
    this.setData({
      signSuccess: true
    });
  },
  signCompleteAction: function(){
    this.setData({
      signSuccess: false
    });
  }
});