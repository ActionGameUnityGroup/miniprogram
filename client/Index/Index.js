//获取应用实例
const app = getApp()

let _this;

Page({
  onShareAppMessage: function(res){
    return {
      title: '常道智慧生活平台',
      path: '/Index/Index',
    };
  },
  data: {
    bannerList: [],
    kurseList: [],
    lastestList: [],
    tutorList: [],
    // showAudioWidth: 180 * 7 + 19 * 6,
    // contentHeight: 0,
    // navHeight: 0,
    // audioListWidth: 0,
    // articleListWidth: 0
  },
  onLoad: function () {
    _this = this;
    wx.request({
      url: 'https://www.changdaolife.cn/api/v0/banner/getBannerList?page=index',
      method: 'GET',
      success: function(res){
        console.log(res.data, '回调');
        _this.setData({
          bannerList: res.data.data[0].bannerList,
        });
      }
    });

    wx.request({
      url: 'https://www.changdaolife.cn/api/v0/course/getKurseList',
      method: 'GET',
      success: function(res){
        if(res.data.data.length < 3){
          let kurseList = res.data.data;
          for(let index = res.data.data.length; index < 3; index++){
            kurseList.push({});
          }
          _this.setData({
            kurseList: kurseList,
          });
        } else {
          _this.setData({
            kurseList: res.data.data,
          });
        }
      }
    });

    wx.request({
      url: 'https://www.changdaolife.cn/api/v0/course/getLastestList',
      method: 'GET',
      success: function(res){
        _this.setData({
          lastestList: res.data.data,
        });
      }
    });

    wx.request({
      url: 'https://www.changdaolife.cn/api/v0/tutor/getTutorList',
      method: 'GET',
      success: function(res){
        if(res.data.data.length < 3){
          let tutorList = res.data.data;
          for(let index = res.data.data.length; index < 5; index++){
            tutorList.push({});
          }
          _this.setData({
            tutorList: res.data.data,
          });
        } else {
          _this.setData({
            tutorList: res.data.data,
          });
        }
      }
    });
    wx.login({
      success: function(res){
        console.log(res);
        wx.getUserInfo({
          success: function(e){
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
      url: '/ArticleList/ArticleList'
    });
  },
  redirectToSyllabusMenu: function(){
    wx.redirectTo({
      url: '/Syllabus/syllabusMenu'
    });
  },
  redirectToPersonalInfo: function(){
    wx.redirectTo({
      url: '/PersonalInfo/personalInfo'
    });
  },
  navigateAction: function(e){
    console.log(e.currentTarget.id);
    wx.navigateTo({
      url: e.currentTarget.id
    });
  }
});