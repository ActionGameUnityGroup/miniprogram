let mongoose = require('mongoose');

const DBURI = 'mongodb://changdao:dreamplus2018changdao@120.77.46.0:12888/NaturalRules';
mongoose.connect(DBURI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback){ console.log('数据库连接成功'); });

module.exports = {
  mongoose: mongoose,
  db: db
};