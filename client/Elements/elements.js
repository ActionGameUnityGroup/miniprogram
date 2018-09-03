let _this;

Page({
  data: {
    isDetail: false,
    isCourse: true,
    isSeason: false,
    courseList: [
      {courseImg: '', courseName: '《中庸》第一章：天命之谓性', courseText: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活', currentCourse: 4, coursePrice: 99},
      {courseImg: '', courseName: '《中庸》第一章：天命之谓性', courseText: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活', currentCourse: 4, coursePrice: 99},
      {courseImg: '', courseName: '《中庸》第一章：天命之谓性', courseText: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活', currentCourse: 4, coursePrice: 99},
      {courseImg: '', courseName: '《中庸》第一章：天命之谓性', courseText: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活', currentCourse: 4, coursePrice: 99},
      {courseImg: '', courseName: '《中庸》第一章：天命之谓性', courseText: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活', currentCourse: 4, coursePrice: 99},
      {courseImg: '', courseName: '《中庸》第一章：天命之谓性', courseText: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活', currentCourse: 4, coursePrice: 99},
      {courseImg: '', courseName: '《中庸》第一章：天命之谓性', courseText: '“愤怒、焦虑、悲伤、抱怨......”各种负面情绪时常“充斥”我们的生命，影响我们的生活', currentCourse: 4, coursePrice: 99},
    ],
    isWood: false,
    isFire: false,
    isEarth: false,
    isGold: false,
    isWater: false
  },
  onLoad: function(options){
    _this = this;
    console.log(options);
    let key = options.key;
    switch(key){
      case 'wood':
        _this.setData({
          isWood: true,
          key: '木'
        })
        break;

      case 'fire':
        _this.setData({
          isFire: true,
          key: '火'
        });
        break;

      case 'earth':
        _this.setData({
          isEarth: true,
          key: '土'
        });
        break;

      case 'gold':
        _this.setData({
          isGold: true,
          key: '金'
        });
        break;

      case 'water':
        _this.setData({
          isWater: true,
          key: '水'
        });
        break;

      default :
        console.log('没有关键字');
    }
    wx.setNavigationBarTitle({
      title: _this.data.key+'元素'
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