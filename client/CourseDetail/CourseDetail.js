const app = getApp();
let _this;

Page({
  data: {
  	courseList: [],
  },
  onLoad: function(options){
  	_this = this;
  	wx.request({
  		url: 'https://www.changdaolife.cn/api/v0/course/getLastestList?page=all',
      method: 'GET',
      success: function(res){
        let courseList = res.data.data.map(course => {
          course.onLoad = false;
          return course;
        })
        _this.setData({
          courseList: courseList,
        });
      }
  	});
  },
  imageLoaded: function(e){
    let key = e.currentTarget.id;
    let { courseList } =this.data;
    courseList[key].onLoad = true;
    this.setData({ courseList });
  },
  navigateOperation: (e) => {
  	const { id } = e.currentTarget;
    wx.navigateTo({
      url: `/RegistrationDetail/RegistrationDetail?courseId=${id}`
    });
  }
})