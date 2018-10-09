const app = getApp();
let _this;

Page({
  data: {
    isDetail: false,
    isCourse: true,
    isSeason: false,
    bannerList: [],
    courseList: [
      {courseImg: '', courseName: '《中庸》第一章：天命之谓性', courseText: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活', currentCourse: 4, coursePrice: 199},
      {courseImg: '', courseName: '《中庸》第一章：天命之谓性', courseText: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活', currentCourse: 4, coursePrice: 199},
      {courseImg: '', courseName: '《中庸》第一章：天命之谓性', courseText: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活', currentCourse: 4, coursePrice: 199},
      {courseImg: '', courseName: '《中庸》第一章：天命之谓性', courseText: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活', currentCourse: 4, coursePrice: 199},
      {courseImg: '', courseName: '《中庸》第一章：天命之谓性', courseText: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活', currentCourse: 4, coursePrice: 199},
      {courseImg: '', courseName: '《中庸》第一章：天命之谓性', courseText: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活', currentCourse: 4, coursePrice: 199},
      {courseImg: '', courseName: '《中庸》第一章：天命之谓性', courseText: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活', currentCourse: 4, coursePrice: 199},
    ],
  },
  onLoad: function(options){
    console.log(options);
    _this = this;
    wx.setNavigationBarTitle({
      title: '疗愈'
    });
    wx.request({
      url: 'https://www.changdaolife.cn/api/banner/getBanner?page=health',
      method: 'GET',
      success: function(res){
        console.log(res.data.requestData[0].bannerList, '回调');
        let height = app.globalData.systemInfo.windowHeight;
        console.log(height);
        _this.setData({
          scrollViewHeight: height - (376+16+90+102)/2,
          bannerList: res.data.requestData[0].bannerList
        });
      }
    });
  },
  detailNavAction:function(){
    this.setData({
      isDetail: true,
      isCourse: false,
      isSeason: false
    });
  },
  courseNavAction:function(){
    this.setData({
      isDetail: false,
      isCourse: true,
      isSeason: false
    });
  },
  seasonNavAction:function(){
    this.setData({
      isDetail: false,
      isCourse: false,
      isSeason: true
    });
  },
});