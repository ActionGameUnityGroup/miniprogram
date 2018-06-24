const {mongoose, db} = require('../app/db');
/*console.log(mongoose, 'ose');
console.log(db, 'db');*/

let userSchema = new mongoose.Schema({
  userId: Number,
  userName: String,
  sex: String,
  age: Number,
  weight: Number,
  height: Number,
  phone: Number,
  address: String
}, {collection: 'user'});

userSchema.methods.findName = function(username, callback){
  return this.model('user').find({userName: username}, callback);
};

userSchema.methods.findAll = function(callback){
  return this.model('user').find({}, callback);
};

userSchema.statics.findbyname = function(name, callback){
  return this.model('user').find({}, callback);
};

userSchema.statics.findAll = function(callback){
  return this.model('user').find({}, callback);
};

let userModel = db.model('user', userSchema);

module.exports = userModel;


/*let mongoose = require('../db');
let Schema = mongoose.Schema();

const userSchema = new Schema({
  id: Number,
  name: String
});

let user = mongoose.model('user', userSchema);
module.exports = user;*/

/*userSchema.methods.printInfo = function() {
  let greeting = this.name;
  console.log('Testing method defind in schema:' + greeting);
};

const user = mongoose.model('user', userSchema);

const userDAO = function(){};

userDAO.prototype.findAll = function(callback){
  let list = user.find({}).populate({path: 'user', select: {name: 1}}).exec();
  return list;
}

module.exports = new userDAO();*/