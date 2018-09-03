Page({
  data: {
    classList: [
      {className: '', classCover: '../assets/icon/miniprogram-icon-69.png'},
      {className: '', classCover: '../assets/icon/miniprogram-icon-70.png'},
    ]
  },
  onLoad: function(){
    wx.setNavigationBarTitle({
      title: '课堂'
    });
  }
});