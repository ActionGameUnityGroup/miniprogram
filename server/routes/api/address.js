const Address = require('../../controllers/api/Address');

module.exports = {
  'GET /api/address/getAddressList': async (ctx) => {
    await Address.getAddressList(ctx);
  },
  'POST /api/address/setAddress': async (ctx) => {
    await Address.setAddress(ctx);
  }
};