let mongoose = require('mongoose');

const DBURI = 'mongodb://127.0.0.1/NaturalRules';
mongoose.connect(DBURI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback){ console.log('数据库连接成功'); });

module.exports = {
  mongoose: mongoose,
  db: db
};