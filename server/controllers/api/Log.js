const fs = require('fs');
const path = require('path');

class Log {
  constructor(){}

  async getLogs(ctx){
    const rootPath = path.resolve(__dirname, '../..');
    console.log(rootPath);
    const logs = await fs.createReadStream(rootPath+'/log/record.log');
    ctx.body = logs;
    ctx.type = 'text/json';
  }

  async getErrorLogs(ctx){
    const logs = await fs.createReadStream(rootPath+'/log/error.log');
    ctx.body = logs;
    ctx.type = 'text/json';
  }
}

module.exports = new Log();