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
  const date = new Date();
  wx.request({
    url: 'https://www.changdaolife.cn/api/sign/signIn',
    data: JSON.stringify({
      date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
      time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }),
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
          signResText: res.data.requestData.info,
          continuityDate: _this.data.continuityDate + 1,
          increasePoint: 5
        });
        setContinueDate([res.data.requestData.date]);
        setSignInfo();
      } else {
        // 失败
        console.log(_this, '当前');
        _this.setData({
          signFailure: true,
          signResText: res.data.requestData.info
        });
        setSignInfo();
      }
    }
  });
};

const setRegisterDate = (signInfoList) => {
  let monthList = _this.data.month;
  let currentMonth = new Date().getMonth() + 1;
  let continuityNumber = 0;
  monthList.map((dateItem, dateKey) => {
    // console.log(monthList[dateKey]);
    signInfoList.map((item, key) => {
      let dateList = item.date.split('-');
      /*console.log(dateList);
      console.log(currentMonth);
      console.log(dateItem);*/
      if(Number(dateList[1]) === currentMonth && Number(dateList[2]) === dateItem.date){
        monthList[dateKey].isRegister = true;
      }
    });
  });
  for(let index = 0; index < monthList.length; index++){
    console.log(monthList[index]);
    if(monthList[index].isRegister){
      continuityNumber += 1;
    } else {
      continuityNumber = 0;
    }
    if(monthList[index].isToday) {
      break;
    }
  }
  // console.log(monthList);
  _this.setData({
    month: monthList,
    continuityDate: continuityNumber,
  });
};

const setContinueDate = (signInfoList) => {
  console.log(signInfoList, '签到信息');
  console.log(_this.data, '当前');
  console.log(signInfoList.length);
  if(signInfoList.length == 0){
    _this.setData({
      increasePoint: 0
    });
  } else {
    let totalPoint = _this.data.totalPoint;
    for(var i = 0; i < signInfoList.length; i++){
      totalPoint += 5;
      console.log(i+1 < signInfoList.length);
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
      } else {
        // 长度为1
        break;
      }
    }
    _this.setData({
      totalPoint: totalPoint
    });
  }
};

const setCalendar = (date) => {
  // date -> 日期对象
  let currentYear = date.getFullYear();
  let currentMonth = new Date(currentYear, date.getMonth() + 1, 0);
  let startDay = new Date(currentYear, date.getMonth(), 1).getDay();
  console.log(date.getMonth() + 1, '月份');
  console.log(currentMonth.getDate(), '月天');
  // console.log(, '星期');
  // console.log(new Date(date.getFullYear(date), date.getMonth(date) + 2, 0).getDate());
  // let startDay = date.getDay();
  console.log(startDay);
  let fill = startDay - 1;
  console.log(fill, '填补');
  // let currentMonth = new Date(date.getFullYear(date), date.getMonth(date) + 1, 0);
  console.log(currentMonth.getDate());
  let dateIndex = currentMonth.getDate() - 1;
  let toDate = date.getDate() - 1;
  let month = [];
  for (var i = 0; i <= dateIndex; i++) {
    month[i] = {date: i+1, isToday: false, isRegister: false, isPass: false};
    if (i == toDate) {
      month[i].isToday = true;
    } else if (i < toDate){
      month[i].isPass = true;
    } /*else if(currentYear)*/
  }
  _this.setData({
    currentYear: currentYear,
    currentMonth: date.getMonth() + 1,
    month: month,
    fill: fill,
  });
};

const setSloganCover = () => {
  wx.request({
    url: 'https://www.changdaolife.cn/api/banner/getBanner?page=signin',
    method: 'GET',
    success: function(res){
      console.log(res);
      if(res.data.requestData[0].bannerList.length > 0){
        _this.setData({
          sloganCover: res.data.requestData[0].bannerList[0].url
          // bannerList: res.data.requestData[0].bannerList
        });
      }
    }
  });
};

const setSignInfo = () => {
  wx.request({
    url: 'https://www.changdaolife.cn/api/sign/getSignInfo',
    method: 'GET',
    header: {
      'Authorization': wx.getStorageSync('openid')
    },
    success: function(res){
      setRegisterDate(res.data.requestData.signInfo);
    },
  });
};

Page({
  data: {
    sloganCover: '',
    registerDays: 0,
    signDays: 0,
    serialDays: 0,
    mostSerialDays: 0,
    currentYear: 2018,
    currentMonth: 10,
    week: [
      {day: '一'},
      {day: '二'},
      {day: '三'},
      {day: '四'},
      {day: '五'},
      {day: '六'},
      {day: '日'},
    ],
    month: wx.getStorageSync('month') || [],
    fill: wx.getStorageSync('fill') || [],
    slogan: 'sdlgkjslkgjew',
    from: 'dsligjl',
    integration: 2,
    signSuccess: false,
    signFailure: false,
    continuityDate: 0,
    signInfoList: [],
  },
  onLoad: function(){
    _this = this;
    wx.setNavigationBarTitle({
      title: '签到',
    });
    let date = new Date();
    // 设置日历
    setCalendar(date);
    // 设置签到信息
    setSignInfo();
    // 设置banner
    setSloganCover();
  },
  /*onShareAppMessage: function(imageUrl){
    return {
      title: '日签海报',
      path: '/SignIn/SignIn',
      imageUrl: imageUrl
    }
    console.log('分享海报');
  },*/
  signAction: function(){
    console.log('打卡');
    this.setData({
      signSuccess: true,
    });
    console.log('签到');
    userSignIn();
  },
  shareAction: function(){
    console.log('分享');
    wx.showLoading({
      title: '正在发起分享',
      success: function(loading){
        wx.downloadFile({
          url: _this.data.sloganCover,
          complete: function(file){
            console.log(file);
            setTimeout(function(){
              wx.hideLoading();
              _this.onShareAppMessage(file.tempFilePath);
            }, 500);
          }
        });
      }
    });
    // console.log(this);
    // this.onShareAppMessage();
    /*wx.showShareMenu({
      success: function(res){
        console.log(res);
      }
    });*/
  },
  /*downloadAction: function(){
    console.log('下载');
    wx.showModal({
      title: '是否下载该海报？',
      content: '是否下载该海报？',
      showCancel: true,
      success: function(res){
        console.log(res);
        if(!res.cancel && res.confirm){
          console.log('确定下载');
          console.log(_this.data.sloganCover);
          wx.downloadFile({
            url: _this.data.sloganCover,
            success: function(res){
              console.log(res);
              // console.log(res.tempFilePath);
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath
              });
            }
          });
        } else {
          console.error('不下载');
        }
      }
    });
  },*/
  signCompleteAction: function(){
    this.setData({
      signSuccess: false,
      signFailure: false
    });
  },
});

// Page({
//   data: {
//     sloganCover: '../assets/icon/miniprogram-icon-74.jpg',
//     currentMonth: '',
//     dateList: [],
//     currentDate: 0,
//     continuityDate: 0,
//     increasePoint: 5,
//     totalPoint: 0,
//     signSuccess: false,
//     signFailure: false,
//     signResText: '',
//     serialDays: 0,
//     integration: 5
//   },
//   onLoad: function(){
//     _this = this;
//     wx.setNavigationBarTitle({
//       title: '签到'
//     });

//     setDate();

//   },
//   signInAction: function(){
//     console.log('签到');
//     /*this.setData({
//       signSuccess: true
//     });*/
//     userSignIn();
//   },
//   signCompleteAction: function(){
//     this.setData({
//       signSuccess: false,
//       signFailure: false
//     });
//   }
// });