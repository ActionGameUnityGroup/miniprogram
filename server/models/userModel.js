const {mongoose, db} = require('../mongodb/db');

console.log('模型内连接数据库');

let userSchema = new mongoose.Schema({
  unionid: String,
  openid: String,
  avatar: String,
  nickname: String,
  gender: Number,
  language: String,
  city: String,
  province: String,
  country: String
}, {collection: 'User', versionKey: false});

/*userSchema.methods.find = function(obj, callback){
  return this.model('user').find(obj, callback);
};*/

/*userSchema.methods.findAll = function(callback){
  return this.model('user').find({}, callback);
};

userSchema.statics.findObject = function(obj, callback){
  return this.model('user').find(obj, callback);
};

userSchema.statics.findAll = function(callback){
  return this.model('user').find({}, callback);
};*/

let userModel = db.model('user', userSchema);

module.exports = userModel;