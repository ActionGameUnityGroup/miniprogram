const app = getApp();
// const io = require('utils/weapp.socket.io.js');

Page({
  data: {
    dialogList: [{
      from: 'customer',
      avatar: '',
      content: '',
      time: ''
    }],
    topicList: [],
    showList: [],
    showTopic1: false,
    showTopic2: false,
    showTopic3: false,
    showTopic4: false,
    showTopic5: false,
    showTopic6: false,
    showTopic7: false,
    lastestTime: '',
    dialogContentScrollTop: 0,
    showSelectContent: false,
    windowHeight: 0,
    // inputValue: '',
  },
  onLoad () {
    let _this = this;

    const topicList = [{
      id: 'topic1',
      content: '丰盛之门 • 力量之源主要讲什么？'
    },{
      id: 'topic2',
      content: '丰盛之门 • 爱的旅程主要讲什么？'
    },{
      id: 'topic3',
      content: '丰盛之道 • 觉之道主要讲什么？'
    },{
      id: 'topic4',
      content: '丰盛之源 • 师之门主要讲什么？'
    },{
      id: 'topic5',
      content: '丰盛 • 能量疗愈主要讲什么？'
    },{
      id: 'topic6',
      content: '丰盛 • 系统结构疗愈主要讲什么？'
    },{
      id: 'topic7',
      content: '公司联系方式？'
    }];

    let systemInfo = wx.getSystemInfoSync();
    let windowHeight = systemInfo.windowHeight;

    setTimeout(function() {
      _this.setData({ topicList, windowHeight, showSelectContent: true });
    }, 1000);
  },
  selectTopic(e) {
    let id = e.currentTarget.id;
    let { showList, dialogContentScrollTop, windowHeight } = this.data;

    dialogContentScrollTop += windowHeight;
    showList.push({ id });

    this.setData({ showList, dialogContentScrollTop });
  }
  // updateInputContent () {
  //   const { dialogList, inputValue } = this.data;
  //   dialogList.push({
  //     from: 'user',
  //     avatar: '',
  //     content: inputValue,
  //     time: new Date().getTime(),
  //   });
  //   this.setData({ dialogList, inputValue: '' });
  // },
  // changeInputValue (e) {
  //   let inputValue = e.detail.value.replace(/^\s*/, '');
  //   this.setData({ inputValue });
  // }
});