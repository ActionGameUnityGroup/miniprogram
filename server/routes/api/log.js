const Log = require('../../controllers/api/Log');

module.exports = {
  'GET /api/log/getLogs': (ctx) => {
    Log.getLogs(ctx);
  },
  'GET /api/log/getErrorLogs': (ctx) => {
    Log.getErrorLogs(ctx);
  }
}