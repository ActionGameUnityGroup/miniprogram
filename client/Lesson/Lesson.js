const app = getApp();
let _this;
let audio1 = app.globalData.backgroundAudio1;
let audio2 = app.globalData.backgroundAudio2;
let flag = false;
// console.log(audio1, '背景音频');
// audio1.autoplay = true;
audio2.onPlay(() => {
  flag = true;
});

audio1.onEnded(() => {
  console.log(e);
  audio2.play();
});

Page({
  data: {
    // courseTitle: '令人窒息的爱',
    courseCover: '',
    lessonTitle: '过有灵魂的生活',
    courseAuthor: '杨凡',
    courseType: '照梦空间',
    lessonExplain: [],
    isPlay: false
  },
  onLoad: function(options){
    console.log(options);
    _this = this;
    wx.setNavigationBarTitle({
      title: options.lessonName
    });
    /*wx.showLoading({
      title: '正在获取课时内容',
      mask: true
    });*/
    this.setData({
      lessonTitle: options.lessonName,
      courseCover: options.courseCover,
    });
    const lessonList = wx.getStorageSync('lessonList');
    for(let lesson of lessonList){
      console.log(lesson, '课程');
      console.log(options.lessonId, lesson.lessonId);
      if(options.lessonId == lesson.lessonId){
        _this.setData({
          lessonExplain: lesson.lessonDetail
        });
      }
    }
    // console.log(courseList, '课程列表');
    /*wx.request({
      url:'https://www.changdaolife.cn/api/lesson/getLesson?lessonId='+options.lessonId,
      success: function(res){
        // console.log(data);
        let requestData = res.data.requestData[0];
        // audio1.src = requestData.lessonAudioUrl;
        _this.setData({
          // lessonTitle: requestData.lessonTitle,
          // courseCover: requestData.courseCover,
          lessonExplain: requestData.lessonDetail
        });
      }
    });*/
    audio1.onPlay(() => {
      console.log('音频开始');
      _this.setData({
        isPlay: true
      });
      /*setTimeout(function(){
        wx.hideLoading();
      }, 300);*/
    });
    console.log(audio1, '音频');
  },
  pauseAction: function(){
    console.log('暂停');
    this.setData({
      isPlay: false
    });
    setTimeout(function(){
      if(!flag){
        audio1.pause();
      } else {
        audio2.pause();
      }
    }, 300);
  },
  playAction: function(){
    console.log('播放');
    this.setData({
      isPlay: true
    });
    if(!flag){
      audio1.play();
    } else {
      audio2.play();
    }
  },
  preAction: function(){
    console.log('上一个');
  },
  nextAction: function(){
    console.log('下一个');
  }
})