const app = getApp();

Page({
  data: {
    courseCoverUrl: '',
    lessonList: [
      {periodName: '过有灵魂的生活', periodAudioLength: '00:05:30', periodStudyLength: '526', periodId: 'audition'},
      {periodName: '过有灵魂的生活', periodAudioLength: '00:05:30', periodStudyLength: '526', periodId: ''},
      {periodName: '过有灵魂的生活', periodAudioLength: '00:05:30', periodStudyLength: '526', periodId: ''},
      {periodName: '过有灵魂的生活', periodAudioLength: '00:05:30', periodStudyLength: '526', periodId: ''},
    ],
    contentHeight: 0
  },
  onLoad: function(options){
    wx.setNavigationBarTitle({
      title: options.name
    });
    const height = app.globalData.systemInfo.windowHeight;
    this.setData({
      contentHeight: height*(1 - .37 - .02)
    })
  },
  auditionAction: function(){
    console.log('试听课程');
    wx.navigateTo({
      url: '../Lesson/Lesson?lessonId='
    });
  },
  auditionActionLock: function(){
    console.log('没有购买课程');
  },
  toStudyAction: function(e){
    console.log('跳去lesson页面');
    console.log(e.currentTarget.id);
  }
})