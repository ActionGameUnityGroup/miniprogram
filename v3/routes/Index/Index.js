//获取应用实例
const app = getApp();
let video = {};

let _this;

Page({
  onShareAppMessage(res) {
    return {
      title: '常道智慧生活平台',
      path: '/Index/Index',
    };
  },
  data: {
    videoList: [],
    videoPlayList: {},
    lastestList: [],
    residentTutorList: [],
    contributionTutorList: [],
    lecturerList: [],
    courseFeatureList: [],
    hasUserInfo: false,
    assistantList: [],
    showPoster: true,
    currentVideo: 0,
    autoplay: true,
  },
  onLoad() {
    _this = this;

    let residentTutorList = [],
        contributionTutorList = [];

    wx.request({
      url: 'https://www.changdaolife.cn/api/v0/tutor/getTutorList?type=miniprogram&number=1&size=5&type=resident',
      method: 'GET',
      success: function(res){
        console.log(res.data.data.data);
        /*if (res.data.data.code === 200) {
        }*/
        for (var i = 0, length = res.data.data.data.length; i < length; i++) {
          let item = res.data.data.data[i];
          if (item.type === 'resident') {
            residentTutorList.push(item);
          }/* else if (item.type === 'contribution') {
            contributionTutorList.push(item);
          }*/
        }
        if (residentTutorList.length < 3) {
          for (var i = 0, length = 3 - residentTutorList.length; i < length; i++) {
            residentTutorList.push({ avatar: '', name: '导师名', tutorId: '' });
          }
        }
        /*if (contributionTutorList.length < 3) {
          for (var i = 0, length = 3 - contributionTutorList.length; i < length; i++) {
            contributionTutorList.push({ avatar: '', name: '导师名', tutorId: '' });
          }
        }*/
        _this.setData({ residentTutorList, contributionTutorList });
      }
    });

    wx.request({
      url: 'https://www.changdaolife.cn/api/v0/courseFeature/getCourseFeatureList?type=miniprogram&number=1&size=3',
      method: 'GET',
      success: function (res) {
        if (res.data.code === 200) {
          let courseFeatureList = res.data.data.data;
          _this.setData({ courseFeatureList });
        }
        /*for (var i = 0, length = res.data.length; i < length; i++) {
          let item = res.data[i];
          console.log(item);
        }*/
      }
    });

    wx.request({
      url: 'https://www.changdaolife.cn/api/v0/assistant/getAssistantList?type=miniprogram',
      method: 'GET',
      success: function (res) {
        if (res.data.code === 200) {
          let assistantList = res.data.data;
          _this.setData({ assistantList });
        }
      }
    });

    wx.request({
      url: 'https://www.changdaolife.cn/api/v0/video/getVideoList?type=miniprogram&number=1&size=10',
      method: 'GET',
      success(res) {
        if (res.data.code) {
          let videoPlayList = {};
          let videoList = res.data.data.data;
          for (let i = 0, length = videoList.length; i < length; i++) {
            video['video' + (i + 1)] = wx.createVideoContext('video' + (i + 1), _this);
            console.log(video);
            videoPlayList['video' + (i + 1)] = false;
          }
          _this.setData({ videoList, videoPlayList });
        }
      }
    });

    /*// 登录
    wx.login({
      success(res){
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.getUserInfo({
          complete(userInfo){
            let data = {code: res.code};
            if(userInfo.errMsg.includes('ok')){
              const encryptedData = encodeURIComponent(userInfo.encryptedData);
              const iv = encodeURIComponent(userInfo.iv);
              data = {...data, encryptedData, iv, };
            }
            app.request(
              'https://www.changdaolife.cn/api/v0/user/login',
              {
                method: 'POST',
                data: JSON.stringify(data),
              },
              function(res){
                if(res.status.includes('ok')){
                  wx.setStorageSync('openid', res.data.openid);
                } else {
                  wx.showToast({
                    title: res.errMsg,
                  });
                }
              },
            );
          }
        });
      }
    });*/

    // this.loadFontFace();

  },
  changeCurrent(e) {
    this.setData({ currentVideo: e.detail.current });
  },
  loadFontFace () {
    wx.loadFontFace({
      family: 'PingFangSC-Medium',
      source: 'url("https://www.changdaolife.com/public/font/PingFangSC-Medium.ttf")',
      success: function(){console.log('load font success')}
    });
  },
  playVideo(e) {
    let key = e.currentTarget.dataset.key;
    let { videoPlayList } = this.data;
    video['video' + key].play();
    videoPlayList['video' + key] = true;
    this.setData({ autoplay: false, videoPlayList });
  },
  pauseVideo(e) {
    let key = e.target.id;
    let { videoPlayList } = this.data;
    // video['video' + key].pause();
    videoPlayList[key] = false;
    this.setData({ autoplay: true, videoPlayList });
  },
  videoPlay(e) {
    let id = e.target.id;
    console.log(id);
    if (id === 'video1') {
      video['video1'].play();
      video['video2'].pause();
      video['video3'].pause();
    } else if (id === 'video2') {
      video['video1'].pause();
      video['video2'].play();
      video['video3'].pause();
    } else if (id === 'video3') {
      video['video1'].pause();
      video['video2'].pause();
      video['video3'].play();
    }
  },
  videoPause: function(e) {
    let id = e.target.id;
    console.log(id);
    video[id].pause();
  },
  videoEnd(e) {
    let key = e.currentTarget.id;
    let { videoPlayList } = this.data;
    video[key].stop();
    videoPlayList['video' + key] = false;
    let { currentVideo } = this.data;
    if (currentVideo === 2) {
      currentVideo = 0;
    } else {
      currentVideo += 1;
    }
    this.setData({ autoplay: true, videoPlayList, currentVideo });
  },
  /*imageLoaded: function(e){
    let data = {};
    const { index, name } = e.currentTarget.dataset;
    const list = this.data[name];
    list[index].loaded = true;
    data[name] = list;
    this.setData(data);
  },
  thumbLoaded: function(e){
    let data = {};
    const { index, name } = e.currentTarget.dataset;
    const list = this.data[name];
    list[index].show = true;
    data[name] = list;
    this.setData(data);
  },*/
  /*redirectToSyllabusMenu: function(){
    wx.redirectTo({
      url: '/Syllabus/Syllabus'
    });
  },
  redirectToPersonalInfo: function(){
    wx.redirectTo({
      url: '/PersonalInfo/PersonalInfo'
    });
  },*/
  navigateAction: function(e){
    const url = e.currentTarget.dataset.route;
    wx.navigateTo({ url });
  }
});