const {mongoose, db} = require('../app/db');
console.log(mongoose, 'ose');
console.log(db, 'db');

let infoSchema = new mongoose.Schema({
  userId: Number,
  userName: String,
  sex: String,
  age: Number,
  weight: Number,
  height: Number,
  phone: Number,
  address: String
});

userSchema.methods.findName = function(username, callback){
  return this.model('info').find({}, callback);
};

userSchema.methods.findAll = function(callback){
  return this.model('info').find({}, callback);
};

userSchema.statics.findbyname = function(name, callback){
  return this.model('info').find({userName: name}, callback);
};

let infoModel = db.model('info', userSchema);

module.exports = infoModel;

class Info{

  constructor(){}

  query(){}

};

module.exports = new Info();