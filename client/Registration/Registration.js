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
          course.show = false;
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
});