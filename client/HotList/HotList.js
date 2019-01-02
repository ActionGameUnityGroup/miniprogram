const app = getApp();
let _this;

Page({
  data: {
    hotList: [],
    showNavBar: true,
  },
  onLoad: function(){
    _this = this;
    wx.request({
      url: 'https://www.changdaolife.cn/api/v0/activity/getHotList',
      method: 'GET',
      success: function(res){
        let hotList = res.data.data.map(syllabus => {
          syllabus.loaded = false;
          syllabus.show = false;
          return syllabus;
        });
        _this.setData({ hotList, });
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
})