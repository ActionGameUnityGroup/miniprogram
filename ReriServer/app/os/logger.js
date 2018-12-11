const path = require('path');
const fs = require('fs');

class Logger {

  constructor(){
    this.logPath = path.resolve(__dirname, '../../log');
    this.date = new Date();
    this.newLogFile = `${this.date.getFullYear()}${this.date.getMonth() + 1}${this.date.getDate()}`;
    let flag = false;
    for(let logFile of fs.readdirSync(this.logPath)){
      if(logFile === `${this.newLogFile}.log`){
        flag = true;
        return;
      }
    }
    if(!flag) this.createLog();
  }

  createLog(){
    fs.writeFileSync(`${this.logPath}/${this.newLogFile}.log`, `/* ${this.newLogFile} */\n\n`);
  }

  inputLog(title, message){
    let logDate = new Date();
    let logText = fs.readFileSync(`${logPath}/${newLogFile}.log`, 'utf8');
    logText += `${logDate.getFullYear()}${logDate.getMonth() + 1}${logDate.getDate()}  ${logDate.getHours()}:${logDate.getMinutes()}:${logDate.getSeconds()}
                  ${title}
                    ${message}`;
    fs.writeFileSync(`${logPath}/${newLogFile}.log`, logText);
  }

  bindLogger(ctx){
    ctx.log = this.inputLog;
  }

}

module.exports = Logger;