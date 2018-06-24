const Customer = require('../../controllers/api/Customer');

module.exports = {
  'GET /api/getCustomerInfo': async (ctx) => {
    console.log('获取数据');
    await Customer.getInfo(ctx);
  },
  'POST /api/setCustomerInfo': async (ctx) => {
    console.log('设置数据');
    await Customer.setInfo(ctx);
  },
};