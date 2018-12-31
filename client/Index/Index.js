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
    // kurseList: [],
    lastestList: [],
    tutorList: [],
    hasUserInfo: false,
  },
  onLoad: function () {
    _this = this;

    wx.request({
      url: 'https://www.changdaolife.cn/api/v0/banner/getBannerList?page=index',
      method: 'GET',
      success: function(res){
        let bannerList = res.data.data[0].bannerList.map(banner => {
          banner.loaded = false;
          banner.show = false;
          return banner;
        });
        _this.setData({ bannerList });
      }
    });

    wx.request({
      url: 'https://www.changdaolife.cn/api/v0/course/getLastestList?page=index',
      method: 'GET',
      success: function(res){
        let lastestList = res.data.data.map(lastest => {
          lastest.loaded = false;
          lastest.show = false;
          return lastest;
        });
        _this.setData({ lastestList });
      }
    });

    wx.request({
      url: 'https://www.changdaolife.cn/api/v0/tutor/getTutorList',
      method: 'GET',
      success: function(res){
        let tutorList = res.data.data.map(tutor => {
          tutor.loaded = false;
          tutor.show = false;
          return tutor;
        });
        if(tutorList.length < 5){
          for(let index = tutorList.length; index < 5; index++){
            tutorList.push({});
          }
          console.log(tutorList, '导师列表');
          _this.setData({ tutorList });
        } else {
          console.log(tutorList);
          _this.setData({ tutorList });
        }
      }
    });

    /*wx.getSetting({
      success(res){
        console.log(res)
        if(!res.authSetting['scope.userInfo']){
          wx.authorize({
            scope: 'scope.userInfo',
            success: function(res){
              console.log(res);
            }
          });
        }
      }
    });*/

    wx.login({
      success(res){
        console.log(res);
        wx.getUserInfo({
          success(infoRes){
            console.log(infoRes);
            /*if(infoRes){
              _this.setData({hasUserInfo: true})
            }*/
            /*wx.request({
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
            });*/
          }
        });
      }
    });

  },
  imageLoaded: function(e){
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