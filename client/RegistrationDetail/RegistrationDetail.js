const app = getApp();
let _this;

Page({
  data: {
    courseInfo: [],
    courseDetailList: [],
    courseId: '',
  },
  onLoad: function (option) {
    const { courseId } = option;
    _this = this;
    wx.request({
      url: `https://www.changdaolife.cn/api/v0/course/getCourseInfo?courseId=${courseId}`,
      method: 'GET',
      success: function(res){
        let list = res.data.data[0].courseDetailList.map(courseDetail => {
          courseDetail.loaded = false;
          courseDetail.show = false;
          return courseDetail;
        });
        let [courseInfo, courseDetailList] = [res.data.data, list];
        courseInfo[0].loaded = false;
        courseInfo[0].show = false;
        _this.setData({
          courseInfo,
          courseDetailList,
          courseId,
        });
      }
    });
  },
  redirectAction: function(e){
    wx.redirectTo({
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
  navigateOperation: function(e){
    const { courseInfo } = this.data;
    wx.navigateTo({
      url: e.currentTarget.id,
    });
  }
});