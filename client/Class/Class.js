Page({
  data: {
    classList: [
      {className: '', classId: '', classCover: '../assets/icon/miniprogram-icon-78.jpg', url: '../Live/Live'},
      {className: '', classId: '', classCover: '../assets/icon/miniprogram-icon-80.jpg', url: '../Live/Live'},
      {className: '', classId: '', classCover: '../assets/icon/miniprogram-icon-79.jpg', url: '../Dream/Dream'},
    ]
  },
  onLoad: function(){
    wx.setNavigationBarTitle({
      title: '课堂'
    });
  }
});