const Banner = require('../../controllers/api/Banner');

module.exports = {
  'GET /api/banner/getBanner': async (ctx) => {
    await Banner.getBanner(ctx);
  },
  'POST /api/banner/setBanner': async (ctx) => {
    await Banner.setBanner(ctx);
  },
};