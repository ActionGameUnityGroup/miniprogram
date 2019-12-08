const app = getApp();
let _this;

Page({
  data: {
  	courseList: [],
  },
  onLoad: function(options){
  	_this = this;
  	wx.request({
  		url: 'https://www.changdaolife.cn/api/v0/course/getUnexpireCourse?type=miniprogram',
      method: 'GET',
      success: function(res){
        let courseList = res.data.data.map(course => {
          course.loaded = false;
          course.show = false;
          return course;
        })
        _this.setData({
          courseList: courseList,
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
  navigateOperation: (e) => {
  	const { id } = e.currentTarget;
    wx.navigateTo({
      url: `/RegistrationDetail/RegistrationDetail?courseId=${id}`
    });
  }
})