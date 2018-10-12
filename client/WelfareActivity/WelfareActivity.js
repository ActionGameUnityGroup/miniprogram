const app = getApp();
let _this;

const setActivityInfo = (list) => {
  let info = [];
  for(var i = 0; i < list.length; i++) {
    if(list[i].includes('https')){
      info[i] = {data: list[i], isURL: true};
    } else {
      info[i] = {data: list[i], isURL: false};
    }
  }
  console.log(info, '列表');
  _this.setData({
    activityInfo: info,
  });
};

Page({
  data: {
    activityInfo: [],
    activityTitle: ''
  },
  onLoad: function (options) {
    console.log(options);
    _this = this;
    const activityList = wx.getStorageSync('activityList');
    for(let item of activityList){
      if(item.activityId == options.activityId){
        wx.setNavigationBarTitle({
          title: item.activityName
        });
        _this.setData({
          activityTitle: item.activityName
        });
        setActivityInfo(item.activityContent);
        break;
      }
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})