const app = getApp();
let _this;

Page({
  data: {
    courseList: [
      {courseId: "course201812164", cover: "https://www.changdaolife.cn/public/image/lastestCourse/course1/course-cover.jpg", thumb: "https://www.changdaolife.cn/public/image/lastestCourse/course1/thumbnil-cover.jpg", loaded: false, mainTitle: "系统结构疗愈 | 这个世界有一个奥秘：看不见的系统力量影响着生命互动的行为", subTitle: "分析讲解+实操体验（健康干货，实操体验）", authorList: ["杨仁起", "杨凡"], courseInfo: { city: "深圳", expenses: "2980", date: "", venue: ""}, describe: "", courseDetailList: [], key: "lastestCourse", isExpire: true },
      {courseId: "course201812162", cover: "https://www.changdaolife.cn/public/image/lastestCourse/course3/course-cover.jpg", thumb: "https://www.changdaolife.cn/public/image/lastestCourse/course3/thumbnil-cover.jpg", loaded: false, mainTitle: "丰盛之门 爱的旅程 |  如何在关系花园里绽放你独一无二的爱与力量", subTitle: "理论学习+分析讲解+实操体验", authorList: ["杨仁起", "杨凡"], courseInfo: { city: "深圳", expenses: "3980", date: "2019年01月11-13日 9:00 - 18:00", venue: "深圳市福田区石厦地铁站新天世纪商务中心A座2106"}, describe: "", courseDetailList: [ {cover: "https://www.changdaolife.cn/public/image/lastestCourse/course3/course-detail1.jpg", thumb: "https://www.changdaolife.cn/public/image/lastestCourse/course3/thumbnil-detail1.jpg"}, {cover: "https://www.changdaolife.cn/public/image/lastestCourse/course3/course-detail2.jpg", thumb: "https://www.changdaolife.cn/public/image/lastestCourse/course3/thumbnil-detail2.jpg"}, {cover: "https://www.changdaolife.cn/public/image/lastestCourse/course3/course-detail3.jpg", thumb: "https://www.changdaolife.cn/public/image/lastestCourse/course3/thumbnil-detail3.jpg"}], key: "lastestCourse", isExpire: false },
      {courseId: "course201812161", cover: "https://www.changdaolife.cn/public/image/lastestCourse/course2/course-cover.jpg", thumb: "https://www.changdaolife.cn/public/image/lastestCourse/course2/thumbnil-cover.jpg", loaded: false, mainTitle: "丰盛之门·力量之源 | 梦想实现的决定因素，不是埋头苦干，而是找到你的力量之源", subTitle: "理论学习+分析讲解+实操体验", authorList: ["杨仁起", "杨凡"], describe: "", courseInfo: { city: "深圳", expenses: "3980", date: "", venue: ""}, courseDetailList: [], key: "lastestCourse", isExpire: true },
      {courseId: "course201812163", cover: "https://www.changdaolife.cn/public/image/lastestCourse/course4/course-cover.jpg", thumb: "https://www.changdaolife.cn/public/image/lastestCourse/course4/thumbnil-cover.jpg", loaded: false, mainTitle: "能量疗愈 |  如何将负面情绪转化为生命资源，变废为宝，活出热情与自爱", subTitle: "分析讲解+实操体验（健康干货，实操体验）", authorList: ["杨仁起", "杨凡"], describe: "", courseInfo: { city: "深圳", expenses: "2980", date: "2019年01月05-06日 9:00 - 18:00", venue: "深圳市福田区石厦地铁站新天世纪商务中心A座2106"}, courseDetailList: [ {cover: "https://www.changdaolife.cn/public/image/lastestCourse/course4/course-detail1.jpg", thumb: "https://www.changdaolife.cn/public/image/lastestCourse/course4/thumbnil-detail1.jpg"}, {cover: "https://www.changdaolife.cn/public/image/lastestCourse/course4/course-detail2.jpg", thumb: "https://www.changdaolife.cn/public/image/lastestCourse/course4/thumbnil-detail2.jpg"}], key: "lastestCourse", isExpire: false },
    ],
    showNavBar: true,
  },
  onLoad: function(option){
    _this = this;
    if(option.from == 'module'){
      _this.setData({
        showNavBar: false,
      });
    }
    /*wx.request({
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
    });*/
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
  } });