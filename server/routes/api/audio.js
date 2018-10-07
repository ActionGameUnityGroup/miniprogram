const Audio = require('../../controllers/api/Audio');

module.exports = {
  'GET /api/audio/getAudio': async (ctx) => {
    await Audio.getAudio(ctx);
  },
  'POST /api/audio/setAudio': async (ctx) => {
    await Audio.setAudio(ctx);
  }
};