const app = getApp();

Page({
  data: {
    consultList: [
      {isMe: false, customerAvatar: '', customerText: 'Hi，我是智慧小编，很高兴为您服务~'},
      {isMe: true, userAvatar: '', userText: '请问下如何购买最新的课程呢~~~~~~'},
    ],
    timeList: [
      {startTime: '13:50'}
    ],
  },
  onLoad: function(){}
});