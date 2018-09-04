Page({
  data: {
    classList: [
      {className: '', classCover: '../assets/icon/miniprogram-icon-69.png', url: '../Live/Live'},
      {className: '', classCover: '../assets/icon/miniprogram-icon-70.png', url: '../Dream/Dream'},
    ]
  },
  onLoad: function(){
    wx.setNavigationBarTitle({
      title: '课堂'
    });
  }
});