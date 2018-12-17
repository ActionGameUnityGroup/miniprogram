const app = getApp();

let _this;

Page({
  data: {
    userAvatar: '',
    nickName: '用户0',
    totalIncome: '0.00',
    totalCustomer: '0.00',
    totalSpreadOrder: '0.00',
    spreadCourseList: [
      {
        cover: 'https://www.changdaolife.cn/image/lastestCourse/course2/course-cover.jpg',
        thumb: 'https://www.changdaolife.cn/image/lastestCourse/course2/thumbnil-cover.jpg',
        loaded: false,
        mainTitle: '丰盛之门·力量之源 | 梦想实现的决定因素，不是埋头苦干，而是找到你的力量之源',
        commissionRate: 20,
        income: 796
      },
      {
        cover: 'https://www.changdaolife.cn/image/lastestCourse/course3/course-cover.jpg',
        thumb: 'https://www.changdaolife.cn/image/lastestCourse/course3/thumbnil-cover.jpg',
        loaded: false,
        mainTitle: '丰盛之门 爱的旅程 |  如何在关系花园里绽放你独一无二的爱与力量',
        commissionRate: 20,
        income: 796
      },
      {
        cover: 'https://www.changdaolife.cn/image/lastestCourse/course4/course-cover.jpg',
        thumb: 'https://www.changdaolife.cn/image/lastestCourse/course4/thumbnil-cover.jpg',
        loaded: false,
        mainTitle: '能量疗愈 |  如何将负面情绪转化为生命资源，变废为宝，活出热情与自爱',
        commissionRate: 20,
        income: 596
      },
      {
        cover: 'https://www.changdaolife.cn/image/lastestCourse/course1/course-cover.jpg',
        thumb: 'https://www.changdaolife.cn/image/lastestCourse/course1/thumbnil-cover.jpg',
        loaded: false,
        mainTitle: '系统结构疗愈 | 这个世界有一个奥秘：看不见的系统力量影响着生命互动的行为',
        commissionRate: 20,
        income: 596
      },
    ]
  },
  onLoad: function(){
    _this = this;
    wx.getUserInfo({
      success: function(res){
        _this.setData({
          userAvatar: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName,
        });
      }
    });
  },
  cashOperation: function(){
    console.log('提现');
  },
  spreadOperation: function(){
    console.log('推广');
  },
  courseCoverLoaded: function(e){
    const key = e.currentTarget.id;
    const { spreadCourseList } = this.data;
    spreadCourseList[key].loaded = true;
  }
});