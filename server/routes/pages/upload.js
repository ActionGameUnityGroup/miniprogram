const UpLoad = require('../../controllers/pages/upload');

module.exports = {
  'GET /upload': async (ctx) => {
    console.log('页面');
    UpLoad.show(ctx);
  },
};