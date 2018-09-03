const app = getApp();

Page({
  data: {
    keepList: [
      {courseCover: '../assets/icon/cover.png', courseName: '如何转变观念 —— 活出更精彩的人生', courseDetail: '深度解读，给干货，教方法，智慧生活导师特别推荐并全程', currentLesson: 4},
      {courseCover: '../assets/icon/cover.png', courseName: '如何转变观念 —— 活出更精彩的人生', courseDetail: '深度解读，给干货，教方法，智慧生活导师特别推荐并全程', currentLesson: 4},
      {courseCover: '../assets/icon/cover.png', courseName: '如何转变观念 —— 活出更精彩的人生', courseDetail: '深度解读，给干货，教方法，智慧生活导师特别推荐并全程', currentLesson: 4},
    ],
    itemWidth: 0,
    infoWidth: 0
  },
  onLoad: function(){
    wx.setNavigationBarTitle({
      title: '我的收藏'
    });
    const width = app.globalData.systemInfo.windowWidth;
    console.log(width);
    this.setData({

      infoWidth: width * .944 - 20
    });
  }
});