const Index = require('../../controllers/pages/index');

module.exports = {
  'GET /': async (ctx) => {
  	console.log('主页');
  	Index.show(ctx);
  },
  'GET /module': async (ctx) => {
    console.log('模块页');
    Index.show(ctx);
  },
  'GET /userList': async (ctx) => {
    console.log('用户列表页');
    Index.show(ctx);
  },
  'GET /course': async (ctx) => {
    console.log('课程页');
    Index.show(ctx);
  },
  'GET /shop': async (ctx) => {
    console.log('积分商城页');
    Index.show(ctx);
  },
  'GET /setting': async (ctx) => {
    console.log('设置页');
    Index.show(ctx);
  },
}