const File = require('../../controllers/api/File');
module.exports = {
  'GET /api/file/getFile': async (ctx) => {
    await File.getFile(ctx);
  },
  'POST /api/file/setFile': async (ctx) => {
    await File.setFile(ctx);
  },
}