let _this;

const monthList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Auguest',
  'September.',
  'Octorber',
  'December',
  'November'
];

const setDate = () => {
  const date = new Date();
  console.log(monthList[date.getMonth()]);
  const dateNumber = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const dateList = [];
  for(let i = 0; i < dateNumber; i++){
    dateList[i] = i + 1;
  }
  _this.setData({
    currentMonth: monthList[date.getMonth()],
    dateList: dateList,
    currentDate: date.getDate() - 1
  });
};

Page({
  data: {
    sloganCover: '../assets/icon/miniprogram-icon-74.jpg',
    currentMonth: '',
    dateList: [],
    currentDate: 0,
    continuityDate: 1,
    increasePoint: '+10',
    totalPoint: 800
  },
  onLoad: function(){
    _this = this;
    wx.setNavigationBarTitle({
      title: '签到'
    })
    setDate();
  }
});

// Page({
//   data: {
//     registerDays: 0,
//     signDays: 0,
//     serialDays: 0,
//     mostSerialDays: 0,
//     currentYear: 2018,
//     currentMonth: 8,
//     week: [
//       {day: '日'},
//       {day: '一'},
//       {day: '二'},
//       {day: '三'},
//       {day: '四'},
//       {day: '五'},
//       {day: '六'},
//     ],
//     month: [],
//     fill: ['', '', ''],
//     slogan: 'sdlgkjslkgjew',
//     from: 'dsligjl',
//     integration: 2,
//     signSuccess: false
//   },
//   onLoad: function(){
//     wx.setNavigationBarTitle({
//       title: '签到'
//     });
//     let date = new Date();
//     // console.log(new Date(date.getFullYear(date), date.getMonth(date) + 2, 0).getDate());
//     let startDay = date.getDay();
//     // console.log(startDay);
//     let fill = 7 - startDay;
//     console.log(fill, '填补');
//     let currentMonth = new Date(date.getFullYear(date), date.getMonth(date) + 1, 0);
//     // console.log(currentMonth);
//     let dateIndex = currentMonth.getDate() - 1;
//     let month = [];
//     for (var i = 0; i <= dateIndex; i++) {
//       month[i] = {date: i+1, isToday: false, isRegister: false};
//       if (i < 5) {
//         month[i].isRegister = true;
//       } else if (i == dateIndex) {
//         month[i].isToday = true;
//       }
//     }
//     /*console.log(month);
//     console.log(currentMonth.getDate());
//     console.log(date.getMonth(date));
//     console.log(date.getFullYear(date));
//     console.log(date.getFullYear(date));*/
//     this.setData({
//       month: month
//     });
//   },
//   signAction: function(){
//     console.log('打卡');
//     this.setData({
//       signSuccess: true
//     });
//   },
//   signCompleteAction: function(){
//     this.setData({
//       signSuccess: false
//     });
//   }
// });