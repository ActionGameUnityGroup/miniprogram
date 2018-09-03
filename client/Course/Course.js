const app = getApp();

Page({
  data: {
    courseCoverUrl: '',
    lessonList: [
      {lessonName: '过有灵魂的生活', lessonAudioLength: '00:05:30', lessonStudyLength: '526', lessonAudioId: 'audition'},
      {lessonName: '过有灵魂的生活', lessonAudioLength: '00:05:30', lessonStudyLength: '526', lessonAudioId: ''},
      {lessonName: '过有灵魂的生活', lessonAudioLength: '00:05:30', lessonStudyLength: '526', lessonAudioId: ''},
      {lessonName: '过有灵魂的生活', lessonAudioLength: '00:05:30', lessonStudyLength: '526', lessonAudioId: ''},
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
  }
})