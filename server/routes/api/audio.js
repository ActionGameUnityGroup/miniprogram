const Audio = require('../../controllers/api/Audio');

module.exports = {
  'GET /api/audio/getAudio': async (ctx) => {
    console.log('获取数据');
    await Audio.getAudio(ctx);
  },
  'POST /api/audio/setAudio': async (ctx) => {
    console.log('设置数据');
    await Audio.setAudio(ctx);
  },
};