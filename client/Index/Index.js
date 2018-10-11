//获取应用实例
const app = getApp()

let _this;

Page({
  onShareAppMessage: function(res){
    // console.log(res);
    return {
      title: '常道智慧生活平台',
      path: '/Index/Index',
    };
  },
  data: {
    // testImageUrl: '',
    bannerList: [],
    moduleList: [
      {moduleImage: '../assets/icon/miniprogram-icon-27.png', moduleName: '木元素', moduleUrl: '../Elements/elements?key=wood'},
      {moduleImage: '../assets/icon/miniprogram-icon-23.png', moduleName: '火元素', moduleUrl: '../Elements/elements?key=fire'},
      {moduleImage: '../assets/icon/miniprogram-icon-30.png', moduleName: '土元素', moduleUrl: '../Elements/elements?key=earth'},
      {moduleImage: '../assets/icon/miniprogram-icon-24.png', moduleName: '金元素', moduleUrl: '../Elements/elements?key=gold'},
      {moduleImage: '../assets/icon/miniprogram-icon-29.png', moduleName: '水元素', moduleUrl: '../Elements/elements?key=water'},
      {moduleImage: '../assets/icon/miniprogram-icon-25.png', moduleName: '课堂', moduleUrl: '../Class/Class'},
      {moduleImage: '../assets/icon/miniprogram-icon-26.png', moduleName: '疗愈', moduleUrl: '../Health/Health'},
      {moduleImage: '../assets/icon/miniprogram-icon-22.png', moduleName: '会员', moduleUrl: '../Member/member'},
      {moduleImage: '../assets/icon/miniprogram-icon-21.png', moduleName: '公益', moduleUrl: '../PublicWelfare/PublicWelfare'},
      {moduleImage: '../assets/icon/miniprogram-icon-28.png', moduleName: '签到', moduleUrl: '../SignIn/SignIn'},
    ],
    AudioList: [
      /*{audioCoverUrl: '../assets/icon/cover.png', audioName: '释道心精选单曲', audioId: ''},
      {audioCoverUrl: '../assets/icon/cover.png', audioName: '释道心精选单曲', audioId: ''},
      {audioCoverUrl: '../assets/icon/cover.png', audioName: '释道心精选单曲', audioId: ''},
      {audioCoverUrl: '../assets/icon/cover.png', audioName: '释道心精选单曲', audioId: ''},
      {audioCoverUrl: '../assets/icon/cover.png', audioName: '释道心精选单曲', audioId: ''},*/
    ],
    articleList: [
      /*{articleCoverUrl: '../assets/icon/miniprogram-icon-72.jpg', articleName: '空间的诗学', visitNumber: 526},
      {articleCoverUrl: '../assets/icon/miniprogram-icon-72.jpg', articleName: '空间的诗学', visitNumber: 526},
      {articleCoverUrl: '../assets/icon/miniprogram-icon-72.jpg', articleName: '空间的诗学', visitNumber: 526},
      {articleCoverUrl: '../assets/icon/miniprogram-icon-72.jpg', articleName: '空间的诗学', visitNumber: 526},
      {articleCoverUrl: '../assets/icon/miniprogram-icon-72.jpg', articleName: '空间的诗学', visitNumber: 526},*/
    ],
    courseList: [
      /*{courseCoverUrl: '../assets/icon/cover.png', courseName: '《中庸》第一章：天命之谓性', courseText: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活', currentCourse: 4, coursePrice: 99},
      {courseCoverUrl: '../assets/icon/cover.png', courseName: '《中庸》第一章：天命之谓性', courseText: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活', currentCourse: 4, coursePrice: 99},
      {courseCoverUrl: '../assets/icon/cover.png', courseName: '《中庸》第一章：天命之谓性', courseText: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活', currentCourse: 4, coursePrice: 99},
      {courseCoverUrl: '../assets/icon/cover.png', courseName: '《中庸》第一章：天命之谓性', courseText: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活', currentCourse: 4, coursePrice: 99},
      {courseCoverUrl: '../assets/icon/cover.png', courseName: '《中庸》第一章：天命之谓性', courseText: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活', currentCourse: 4, coursePrice: 99},
      {courseCoverUrl: '../assets/icon/cover.png', courseName: '《中庸》第一章：天命之谓性', courseText: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活', currentCourse: 4, coursePrice: 99},
      {courseCoverUrl: '../assets/icon/cover.png', courseName: '《中庸》第一章：天命之谓性', courseText: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活', currentCourse: 4, coursePrice: 99},*/
    ],
    showAudioWidth: 180 * 7 + 19 * 6,
    contentHeight: 0,
    navHeight: 0,
    audioListWidth: 0,
    articleListWidth: 0
  },
  onLoad: function () {
    _this = this;
    wx.setNavigationBarTitle({
      title: '常道智慧生活'
    });
    wx.request({
      url: 'https://www.changdaolife.cn/api/banner/getBanner?page=index',
      method: 'GET',
      success: function(res){
        console.log(res.errMsg);
        _this.setData({
          bannerList: res.data.requestData[0].bannerList
        });
      }
    });

    /*wx.request({
      url: 'https://www.changdaolife.cn/api/file/getFile',
      method: 'GET',
      success: function(res){
        console.log(res.errMsg);
        _this.setData({
          testImageUrl: res.data.requestData.bannerList[0].url 
        });
      }
    });*/

    wx.request({
      url: 'https://www.changdaolife.cn/api/course/getCourseList',
      method: 'GET',
      success: function(res){
        console.log(res.data.requestData);
        const resList = [];
        if(res.data.requestData.courseList.length < 4){
          for(var i = 0; i < 4; i++){
            resList[i] = res.data.requestData.courseList[i];
          }
        }
        console.log(resList);
        _this.setData({
          AudioList: resList,
          articleList: resList,
          courseList: res.data.requestData.courseList,
        });
      }
    });
    let height = app.globalData.systemInfo.windowHeight;
    _this = this;
    _this.setData({
      contentHeight: height*(1 - .083),
      audioListWidth: 70 * _this.data.AudioList.length + (_this.data.AudioList.length - 1) * 23.5 + 54 + 45
    });
    wx.login({
      success: function(res){
        console.log(res);
        wx.getUserInfo({
          success: function(e){
            /*console.log(e);
            console.log(encodeURIComponent(e.encryptedData));
            console.log(encodeURIComponent(e.iv));*/
            wx.request({
              url: 'https://www.changdaolife.cn/api/user/login',
              method: 'GET',
              data: {
                code: res.code,
                encryptedData: encodeURIComponent(e.encryptedData),
                iv: encodeURIComponent(e.iv)
              },
              success: function(info){
                console.log(info);
                console.log(wx);
                wx.setStorage({
                  key: 'openid', 
                  data: info.data.requestData.openid
                });
              }
            });
          }
        });
      }
    });
    console.log(app);
  },
  moreArticleAction: function(){
    wx.navigateTo({
      url: '../ArticleList/ArticleList'
    });
  },
  redirectToSyllabusMenu: function(){
    wx.redirectTo({
      url: '../Syllabus/syllabusMenu'
    });
  },
  redirectToPersonalInfo: function(){
    wx.redirectTo({
      url: '../PersonalInfo/personalInfo'
    });
  },
  navigateAction: function(e){
    wx.navigateTo({
      url: e.currentTarget.id
    });
  }
});