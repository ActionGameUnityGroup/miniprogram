const app = getApp();
let _this;

Page({
  data: {
    courseCoverUrl: '',
    lessonList: [
      /*
      {
        courseCover: "https://www.changdaolife.cn/image/course201891515124cover.png",
        courseId: "course201891515124",
        lessonAudioLengthNumber: 0,
        lessonAudioLengthString: "00:12:50",
        lessonAudioName: "创造美好的生活02.mp3",
        lessonAudioUrl: "https://www.changdaolife.cn/audio/lesson201892919597.mp3",
        lessonDetail: [
          "今天想和大家分享这样的一个话题，我们如何创造幸福美好的生活。今天我们生活在这样的和平年代，物质生活基…多的人会产生一些问题，影响到了自己的快乐和情绪体验，那么在关系当中，我们如何去从这个局里走出来呢。",
          "在这里，让我联想到了常道智慧生活平台的使命和愿景。活出天地人的宏观秩序，律动真善美的生命乐章。说到这…非常动听，优美，这是一份美的音符的律动。如果随便的组合，那么就是一种无序的排布，必将是噪音和混乱。",
          "同样的，我们在关系当中，如果是有秩序有结构的。那么这样的一份清晰的定位就会带来一个美的结构。小到一个…所看的，而在每一次看的过程当中，因为自己的视角不同，那么，同样的一个连续剧中收获到的礼物也就不同。",
          "在这个电视连续剧当中，让我学史明理，虽然他是一个封建王朝帝制的时代，在这个过程中渗透人的内在的一个规…而当雍正尘埃落定当了皇帝，可面临的却是在推行各种政策的过程当中受到了自己兄弟们的千般阻碍困难重重。",
          "雍正励精图治十三年，可以说为大清国的国库充盈，做了巨大的贡献，从他继位时刻的七百万两白银上升到了五千万两。可是，他内心的痛苦，也在这个电视剧中展现的淋漓尽致，那就是兄弟不和，甚至是你死我活。",
          "电视剧演的是帝王之家的争斗，其实在我们的现实生活当中，又何尝不是如此。我们很多的家庭矛盾来源于兄弟之…的位置就有点偏高，可想而知，当一个孩子的位置比家长还高的时候，你要想管理这个孩子，显然位置就不对。",
          "所以，我看到了有的家长把孩子摆在了家长中间。也就是夫妻之间的沟通竟然不能够直接沟通，因为中间有孩子站…正的秩序混乱，结构混乱才是问题很重要的一个面向，而大部分的家长却是盯在了孩子出现的问题上如何解决。",
          "说到如何解决孩子的问题，其实我们要能够明白孩子的位置。所占的位置不对，其实不是他一个人的现象问题，而…，人在心不在，可想而知妻子的内心感受。丈夫空位，一定就会抓孩子，所以说接下来很多的问题又会冒出来。",
          "因此，当我们在生活中出现了关系的困惑，那么首先就要回来看一看我们自己是否站在自己应有的位置上。古人有…们是否站错了位置。让我们一起都来学习一份宇宙的真理。活出天地人的宏观秩序，律动出真善美的生命乐章！"
        ]
        lessonId : "lesson201892919597",
        lessonTitle: "创造美好生活02"
      }*/
      /*{periodName: '过有灵魂的生活', periodAudioLength: '00:05:30', periodStudyLength: '526', periodId: 'audition'},
      {periodName: '过有灵魂的生活', periodAudioLength: '00:05:30', periodStudyLength: '526', periodId: ''},
      {periodName: '过有灵魂的生活', periodAudioLength: '00:05:30', periodStudyLength: '526', periodId: ''},
      {periodName: '过有灵魂的生活', periodAudioLength: '00:05:30', periodStudyLength: '526', periodId: ''},*/
    ],
    contentHeight: 0,
    courseOutLine: '大纲'
  },
  onLoad: function(options){
    _this = this;
    console.log(options.courseId);

    wx.request({
      url: `https://www.changdaolife.cn/api/course/getCourse?courseId=${options.courseId}`,
      method: 'GET',
      success: function(res){
        console.log(res.data.requestData.courseList[0]);
        _this.setData({
          courseCoverUrl: res.data.requestData.courseList[0].courseCover,
        });
        wx.setNavigationBarTitle({
          title: res.data.requestData.courseList[0].courseTitle
        });
      }
    });
    // 请求课时
    wx.request({
      url: `https://www.changdaolife.cn/api/lesson/getLessonList?courseId=${options.courseId}`,
      method: 'GET',
      success: function(res){
        console.log(res.data.requestData.lessonList);
        wx.setStorage({
          key: 'lessonList',
          data: res.data.requestData.lessonList
        });
        _this.setData({
          lessonList: res.data.requestData.lessonList,
        });
      }
    });

    const height = app.globalData.systemInfo.windowHeight;
    this.setData({
      contentHeight: height*(1 - .37 - .02)
    });
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
    console.log(e);
    const dataset = e.currentTarget.dataset;
    console.log(dataset, 'data-');
    console.log(dataset.audiourl);
    console.log(dataset.lessonTitle);
    console.log(dataset.audiocover);
    app.globalData.backgroundAudio1.src = dataset.audiourl;
    app.globalData.backgroundAudio2.src = dataset.nextaudiourl;
    // app.globalData.backgroundAudio.title = dataset.audiotitle;
    // app.globalData.backgroundAudio.coverImgUrl = dataset.audiocover;
    // const courseInfo = wx.getStorageSync('courseInfo');
    wx.navigateTo({
      url: `${dataset.url}?lessonId=${e.currentTarget.id}&lessonName=${dataset.lessontitle}&courseCover=${dataset.coursecover}`
    });
  }
})