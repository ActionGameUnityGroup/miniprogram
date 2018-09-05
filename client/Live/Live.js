const app = getApp();

Page({
  data: {
    isFirst: false,
    isSecond: true,
    isThird: false,
    isForst: false,
    courseList: [
      {courseImg: '', courseName: '《中庸》第一章：天命之谓性', courseText: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活', currentCourse: 4, coursePrice: 199},
      {courseImg: '', courseName: '《中庸》第一章：天命之谓性', courseText: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活', currentCourse: 4, coursePrice: 199},
      {courseImg: '', courseName: '《中庸》第一章：天命之谓性', courseText: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活', currentCourse: 4, coursePrice: 199},
      {courseImg: '', courseName: '《中庸》第一章：天命之谓性', courseText: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活', currentCourse: 4, coursePrice: 199},
      {courseImg: '', courseName: '《中庸》第一章：天命之谓性', courseText: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活', currentCourse: 4, coursePrice: 199},
      {courseImg: '', courseName: '《中庸》第一章：天命之谓性', courseText: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活', currentCourse: 4, coursePrice: 199},
      {courseImg: '', courseName: '《中庸》第一章：天命之谓性', courseText: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活', currentCourse: 4, coursePrice: 199},
    ],
    typeList: [
      {
        title: '治身', list: [
          {courseName: '过有灵魂的生活', courseDetail: '愤怒、焦虑、悲伤抱怨...各种...'},
          {courseName: '过有灵魂的生活', courseDetail: '愤怒、焦虑、悲伤抱怨...各种...'},
          {courseName: '过有灵魂的生活', courseDetail: '愤怒、焦虑、悲伤抱怨...各种...'}, 
        ]
      },
      {
        title: '治心', list: [
          {courseName: '过有灵魂的生活', courseDetail: '愤怒、焦虑、悲伤抱怨...各种...'},
          {courseName: '过有灵魂的生活', courseDetail: '愤怒、焦虑、悲伤抱怨...各种...'},
          {courseName: '过有灵魂的生活', courseDetail: '愤怒、焦虑、悲伤抱怨...各种...'}, 
        ]
      },
      {
        title: '治神', list: [
          {courseName: '过有灵魂的生活', courseDetail: '愤怒、焦虑、悲伤抱怨...各种...'},
          {courseName: '过有灵魂的生活', courseDetail: '愤怒、焦虑、悲伤抱怨...各种...'},
          {courseName: '过有灵魂的生活', courseDetail: '愤怒、焦虑、悲伤抱怨...各种...'}, 
        ]
      },
    ],
    bannerList: [{}, {}]
  },
  onLoad: function(options){
    console.log(options);
    wx.setNavigationBarTitle({
      title: '生命系统智慧'
    });
    let height = app.globalData.systemInfo.windowHeight;
    console.log(height);
    this.setData({
      scrollViewHeight: height * (1-.3-.075 -.12)
    });
  },
  firstNavAction:function(){
    this.setData({
      isFirst: true,
      isSecond: false,
      isThird: false,
      isForst: false,
    });
  },
  secondNavAction:function(){
    this.setData({
      isFirst: false,
      isSecond: true,
      isThird: false,
      isForst: false,
    });
  },
  thirdNavAction:function(){
    this.setData({
      isFirst: false,
      isSecond: false,
      isThird: true,
      isForst: false,
    });
  },
  forthNavAction:function(){
    this.setData({
      isFirst: false,
      isSecond: false,
      isThird: false,
      isForst: true,
    });
  },
});