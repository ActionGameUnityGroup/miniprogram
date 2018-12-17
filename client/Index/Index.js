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
  },
  onLoad: function () {
    _this = this;
    wx.request({
      url: 'https://www.changdaolife.cn/api/v0/banner/getBannerList?page=index',
      method: 'GET',
      success: function(res){
        let bannerList = res.data.data[0].bannerList.map(banner => {
          banner.loaded = false;
          return banner;
        });
        _this.setData({
          bannerList: bannerList,
        });
      }
    });

    wx.request({
      url: 'https://www.changdaolife.cn/api/v0/course/getKurseList',
      method: 'GET',
      success: function(res){
        let kurseList = res.data.data.map(kurse => {
          kurse.loaded = false;
          return kurse;
        });
        if(kurseList.length < 3){
          for(let index = kurseList.length; index < 3; index++){
            kurseList.push({});
          }
          console.log(kurseList);
          _this.setData({
            kurseList: kurseList,
          });
        } else {
          console.log(kurseList);
          _this.setData({
            kurseList: kurseList,
          });
        }
      }
    });

    wx.request({
      url: 'https://www.changdaolife.cn/api/v0/course/getLastestList?page=index',
      method: 'GET',
      success: function(res){
        let lastestList = res.data.data.map(lastest => {
          lastest.loaded = false;
          return lastest;
        });
        console.log(lastestList);
        _this.setData({
          lastestList: lastestList,
        });
      }
    });

    wx.request({
      url: 'https://www.changdaolife.cn/api/v0/tutor/getTutorList',
      method: 'GET',
      success: function(res){
        let tutorList = res.data.data.map(tutor => {
          tutor.loaded = false;
          return tutor;
        });
        if(tutorList.length < 3){
          for(let index = tutorList.length; index < 5; index++){
            tutorList.push({});
          }
          console.log(tutorList);
          _this.setData({
            tutorList: tutorList,
          });
        } else {
          console.log(tutorList);
          _this.setData({
            tutorList: tutorList,
          });
        }
      }
    });
    wx.login({
      success: function(res){
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
  },
  bannerLoaded: function(e){
    let key = e.currentTarget.id;
    let { bannerList } = this.data;
    bannerList[key].loaded = true;
    this.setData({
      bannerList: bannerList,
    });
  },
  kurseLoaded: function(e){
    let key = e.currentTarget.id;
    let { kurseList } = this.data;
    kurseList[key].loaded = true;
    this.setData({
      kurseList: kurseList,
    });
  },
  lastestLoaded: function(e){
    let key = e.currentTarget.id;
    let { lastestList } = this.data;
    lastestList[key].loaded = true;
    this.setData({
      lastestList: lastestList,
    });
  },
  tutorLoaded: function(e){
    let key = e.currentTarget.id;
    let { tutorList } = this.data;
    tutorList[key].loaded = true;
    console.log(tutorList);
    this.setData({
      tutorList: tutorList,
    });
  },
  redirectToSyllabusMenu: function(){
    wx.redirectTo({
      url: '/Syllabus/SyllabusMenu'
    });
  },
  redirectToPersonalInfo: function(){
    wx.redirectTo({
      url: '/PersonalInfo/PersonalInfo'
    });
  },
  navigateAction: function(e){
    console.log(e.currentTarget.id);
    wx.navigateTo({
      url: e.currentTarget.id
    });
  }
});