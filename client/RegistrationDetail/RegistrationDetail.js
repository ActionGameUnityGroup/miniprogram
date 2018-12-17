const app = getApp();
let _this;

Page({
  data: {
    courseInfo: {},
  },
  onLoad: function (option) {
    const { courseId } = option;
    _this = this;
    wx.request({
      url: `https://www.changdaolife.cn/api/v0/course/getCourseInfo?courseId=${courseId}`,
      method: 'GET',
      success: function(res){
        // console.log(res.data.data[0], '回调');
        let courseDetailList = res.data.data[0].courseDetailList.map(courseDetail => {
          courseDetail.loaded = false;
          return courseDetail;
        });
        let courseInfo = res.data.data[0];
        courseInfo.courseDetailList = courseDetailList;
        _this.setData({
          courseInfo: courseInfo,
        });
      }
    });
  },
  redirectAction: function(e){
    wx.redirectTo({
      url: e.currentTarget.id
    });
  },
  bannerLoaded: function(){
    const { courseInfo } =this.data;
    courseInfo.loaded = true;
    this.setData({ courseInfo });
  },
  courseDetailLoaded: function(e){
    const { courseInfo } =this.data;
    const key = e.currentTarget.id;
    courseInfo.courseDetailList[key].loaded = true;
    this.setData({ courseInfo });
  },
  navigateAction: function(e){
    wx.navigateTo({
      url: e.currentTarget.id
    });
  }
});