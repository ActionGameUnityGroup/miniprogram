const Class = require('../../controllers/api/Class');

module.exports = {
  'GET /api/class/getClassList': async (ctx) => {
    await Class.getClassList(ctx);
  },
  /*'POST /api/class/setClass': async (ctx) => {
    await Banner.setClass(ctx);
  },*/
};