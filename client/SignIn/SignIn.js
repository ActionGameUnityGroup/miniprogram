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

const userSignIn = () => {
  const openid = wx.getStorageSync('openid');
  wx.request({
    url: 'https://www.changdaolife.cn/api/sign/signIn',
    data: JSON.stringify({}),
    method: 'POST',
    header: {
      'content-type': 'text/plain',
      'Authorization': openid
    },
    success: function(res){
      console.log(res, 'res');
      if(res.data.requestData.signType == 1){
        // 成功
        _this.setData({
          signSuccess: true,
          signResText: res.data.requestData.info
        });
      } else {
        // 失败
        console.log(_this, '当前');
        _this.setData({
          signFailure: true,
          signResText: res.data.requestData.info
        });
      }
    }
  });
};

const setContinueDate = (signInfoList) => {
  console.log(signInfoList, '签到信息');
  console.log(_this.data, '当前');
  let totalPoint = _this.data.totalPoint;
  for(var i = 0; i < signInfoList.length; i++){
    totalPoint += 5;
    if(i+1 < signInfoList.length){
      let lastDate = signInfoList[i].date.substring(0, signInfoList[i].date.lastIndexOf('-'));
      let thisDate = signInfoList[i+1].date.substring(0, signInfoList[i+1].date.lastIndexOf('-'));
      if(thisDate == lastDate){
        lastDate = signInfoList[i].date.substring(signInfoList[i].date.lastIndexOf('-'), signInfoList[i].date.length);
        thisDate = signInfoList[i].date.substring(signInfoList[i].date.lastIndexOf('-'), signInfoList[i].date.length);
        if(lastDate == thisDate) {
          _this.setData({
            continuityDate: _this.data.continuityDate + 1
          });
        } else {
          _this.setData({
            continuityDate: 0
          });
        }
      }
    }
  }
  _this.setData({
    totalPoint: totalPoint
  });
};

Page({
  data: {
    sloganCover: '../assets/icon/miniprogram-icon-74.jpg',
    currentMonth: '',
    dateList: [],
    currentDate: 0,
    continuityDate: 1,
    increasePoint: 5,
    totalPoint: 0,
    signSuccess: false,
    signFailure: false,
    signResText: ''
  },
  onLoad: function(){
    _this = this;
    wx.setNavigationBarTitle({
      title: '签到'
    });

    setDate();

    wx.request({
      url: 'https://www.changdaolife.cn/api/banner/getBanner?page=signin',
      method: 'GET',
      success: function(res){
        console.log(res.errMsg);
        if(res.data.requestData[0].bannerList.length){
          _this.setData({
            sloganCover: res.data.requestData[0].bannerList[0].url
            // bannerList: res.data.requestData[0].bannerList
          });
        }
      }
    });

    wx.request({
      url: 'https://www.changdaolife.cn/api/sign/getSignInfo',
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('openid')
      },
      success: function(res){
        console.log(res.data.requestData.signInfo, '签到信息');
        setContinueDate(res.data.requestData.signInfo);
      }
    });

  },
  signInAction: function(){
    console.log('签到');
    /*this.setData({
      signSuccess: true
    });*/
    userSignIn();
  },
  signCompleteAction: function(){
    this.setData({
      signSuccess: false,
      signFailure: false
    });
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
//   }
// });