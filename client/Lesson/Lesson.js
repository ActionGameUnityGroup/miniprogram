let audio = wx.createInnerAudioContext();
audio.autoplay = false;
audio.onPlay(() => {
  console.log('音频开始');
});

function Audio(data){
  console.log('开始创建audio', data);
  // audio.src = data.audioUrl;
  // console.log(audio);
  /*audio.onPlay = function(e){
    console.log('音频开始');
    console.log(e);
  }*/
}

Page({
  data: {
    audioName: '令人窒息的爱',
    audioCover: '../assets/icon/cover.png',
    collectionName: '过有灵魂的生活',
    collectionTeacher: '杨凡',
    collectionType: '照梦空间',
    collectionExplain: '文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍',
    isPlay: false
  },
  onLoad: function(options){
    console.log(options);
    wx.setNavigationBarTitle({
      title: options.lessonName
    });
    wx.request({
      url:'https://www.changdaolife.cn/api/lesson/getLesson?lessonId='+options.lessonId,
      success: function(res){
        // console.log(data);
        Audio(res.data.requestData[0]);
      }
    });
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