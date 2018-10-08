/*console.log(audio, '背景音频');
// let audio = wx.createInnerAudioContext();
// audio.autoplay = true;
audio.onPlay(() => {
  console.log('音频开始');
  _this.setData({
    isPlay: true
  });
  setTimeout(function(){
    wx.hideLoading();
  }, 300);
});*/
const app = getApp();

let _this;
let audio = app.globalData.backgroundAudio;

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
    wx.request({
      url:'https://www.changdaolife.cn/api/lesson/getLesson?lessonId='+options.lessonId,
      success: function(res){
        // console.log(data);
        let requestData = res.data.requestData[0];
        // audio.src = requestData.lessonAudioUrl;
        _this.setData({
          lessonTitle: requestData.lessonTitle,
          courseCover: requestData.courseCover,
          lessonExplain: requestData.lessonDetail
        });
      }
    });
    console.log(audio);
  },
  pauseAction: function(){
    console.log('暂停');
    this.setData({
      isPlay: false
    });
    setTimeout(function(){
      audio.pause();
    }, 300);
  },
  playAction: function(){
    console.log('播放');
    this.setData({
      isPlay: true
    });
    audio.play();
  },
  preAction: function(){
    console.log('上一个');
  },
  nextAction: function(){
    console.log('下一个');
  }
})