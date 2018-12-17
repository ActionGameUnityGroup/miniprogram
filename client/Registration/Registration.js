const app = getApp();
let _this;

Page({
  data: {
    courseList: [],
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
      url: 'https://www.changdaolife.cn/api/v0/course/getLastestList',
      method: 'GET',
      success: function(res){
        let courseList = res.data.data.map(course => {
          course.loaded = false;
          return course;
        });
        _this.setData({
          courseList: courseList,
        });
      }
    });
  },
  redirectAction: function(e){
    wx.redirectTo({
      url: e.currentTarget.id
    });
  },
  navigateAction: function(e){
    wx.navigateTo({
      url: e.currentTarget.id
    });
  },
  imageLoaded: function(e){
    const key = e.currentTarget.id;
    const { courseList } = this.data;
    courseList[key].loaded = true;
    this.setData({ courseList });
  }
});