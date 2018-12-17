const app = getApp();
let _this;

Page({
  data: {
    syllabusList: [],
    showNavBar: true,
  },
  onLoad: function(option){
    _this = this;
    if(option.from == 'module'){
      _this.setData({
        showNavBar: false,
      });
    }
    wx.request({
      url: 'https://www.changdaolife.cn/api/v0/course/getUnexpireCourse',
      method: 'GET',
      success: function(res){
        // console.log();
        let syllabusList = res.data.data.map(syllabus => {
          syllabus.loaded = false;
          return syllabus;
        });
        _this.setData({
          syllabusList: syllabusList,
        });
      }
    });
  },
  onShareAppMessage: function(){},
  navigateOperation: function(e) {
    const { id } = e.currentTarget;
    wx.navigateTo({
      url: `/RegistrationDetail/RegistrationDetail?courseId=${id}`
    })
  },
  redirectOperation: function(e){
    wx.redirectTo({
      url: e.currentTarget.id
    });
  },
  imageLoaded: function(e){
    const key = e.currentTarget.id;
    const { syllabusList } = this.data;
    syllabusList[key].onLoad = true;
    this.setData({ syllabusList });
  }
})