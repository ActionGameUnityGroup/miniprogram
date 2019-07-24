const app = getApp();
const formatDate = require('../../utils/formatDate');

Page({
  data: {
    studentList: [/*{
      avatar: '',
      name: '学员A',
      word: '常道文化公司的年会，精心的安排和布置，温馨不张扬的细节，满满的干货。没有煽情，没有广告，没有虚张声势，温暖简洁，谦卑和智慧。如同是身心灵业界的一股清流。',
      time: '2019-04-17',
    },{
      avatar: '',
      name: '学员B',
      word: '这次年会收获很大，一直以为自己学身心灵方面的知识还不错，但当老师问孩子不写作业的时候，突然发现，我没有这方面的经验，而且从来没有关心过孩子的学习方面和孩子的成长，让我不知所措，这次年会过后，我知道了要如何的去面对孩子，感谢老师的提示！',
      time: '2019-04-17',
    }*/],
    number: 1,
  },
  onLoad: function () {
    this.getNewList();
  },
  getNewList() {
    let { number } = this.data;
    let _this = this;
    wx.request({
      url: `https://www.changdaolife.cn/api/v0/share/getShareList?number=${number}&size=10`,
      method: 'GET',
      success(res) {
        console.log(res.data);
        if (res.data.code === 200) {
          let studentList = [];
          for (let i = 0, length = res.data.data.length; i < length; i++) {
            let item = res.data.data[i];
            let time = formatDate(item.time);
            let isOmit = _this.checkMessageLength(item.content);
            studentList.push({ ...item, time, isOmit });
          }
          _this.setData({ studentList, number: number + 1 });
        }
      }
    });
  },
  checkMessageLength(text) {
    let flag = false,
        textLength = 0;
    if (text.length >= 166) {
      flag = true;
    }
    return flag;
  },
  showMore(e) {
    const { key } = e.currentTarget.dataset;
    let { studentList } = this.data;
    studentList[key].isOmit = false;
    this.setData({ studentList });
  },
  hideMore(e) {
    const { key } = e.currentTarget.dataset;
    let { studentList } = this.data;
    studentList[key].isOmit = true;
    this.setData({ studentList });
  },
});