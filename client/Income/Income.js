const app = getApp();

Page({
  data: {
    incomeBalance: '0.00',
    todayIncome: '0.00',
    totalIncome: '0.00',
    courseList: [
      {
        cover: 'https://www.changdaolife.cn/public/image/lastestCourse/course2/course-cover.jpg',
        thumb: 'https://www.changdaolife.cn/public/image/lastestCourse/course2/thumbnil-cover.jpg',
        loaded: false,
        show: false,
        mainTitle: '丰盛之门·力量之源 | 梦想实现的决定因素，不是埋头苦干，而是找到你的力量之源',
        commissionRate: 20,
        income: 796
      },
      {
        cover: 'https://www.changdaolife.cn/public/image/lastestCourse/course3/course-cover.jpg',
        thumb: 'https://www.changdaolife.cn/public/image/lastestCourse/course3/thumbnil-cover.jpg',
        loaded: false,
        show: false,
        mainTitle: '丰盛之门 爱的旅程 |  如何在关系花园里绽放你独一无二的爱与力量',
        commissionRate: 20,
        income: 796
      },
      {
        cover: 'https://www.changdaolife.cn/public/image/lastestCourse/course4/course-cover.jpg',
        thumb: 'https://www.changdaolife.cn/public/image/lastestCourse/course4/thumbnil-cover.jpg',
        loaded: false,
        show: false,
        mainTitle: '能量疗愈 |  如何将负面情绪转化为生命资源，变废为宝，活出热情与自爱',
        commissionRate: 20,
        income: 596
      },
      {
        cover: 'https://www.changdaolife.cn/public/image/lastestCourse/course1/course-cover.jpg',
        thumb: 'https://www.changdaolife.cn/public/image/lastestCourse/course1/thumbnil-cover.jpg',
        loaded: false,
        show: false,
        mainTitle: '系统结构疗愈 | 这个世界有一个奥秘：看不见的系统力量影响着生命互动的行为',
        commissionRate: 20,
        income: 596
      },
    ],
  },
  onLoad: function(){},
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
});