const mongoose = require('mongoose');
const config = require('../config/default.config');

const DBURI = `mongodb://${config.username}:${config.password}@${config.ip}:${config.port}/${config.tablename}`;
mongoose.connect(DBURI);

const db = mongoose.connection;
db.on('error', function(){ console.error('connection error:'); });
db.once('open', function(callback){ console.log('已连接数据库'); });

module.exports = {
  mongoose: mongoose,
  db: db
};