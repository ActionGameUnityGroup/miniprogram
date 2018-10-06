const ClassRoom = require('../../controllers/api/ClassRoom');

module.exports = {
  'GET /api/class/getClassList': async (ctx) => {
    await ClassRoom.getClassList(ctx);
  },
  /*'POST /api/class/setClass': async (ctx) => {
    await Banner.setClass(ctx);
  },*/
};