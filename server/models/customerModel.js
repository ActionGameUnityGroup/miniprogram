const {mongoose, db} = require('../mongodb/db');

console.log('模型内连接数据库');

let customerSchema = new mongoose.Schema({
  userId: Number,
  userName: String,
  sex: String,
  age: Number,
  weight: Number,
  height: Number,
  phone: Number,
  address: String
}, {collection: 'customer', versionKey: false});

customerSchema.methods.findObject = function(obj, callback){
  return this.model('customer').find(obj, callback);
};

customerSchema.methods.findAll = function(callback){
  return this.model('customer').find({}, callback);
};

customerSchema.statics.findObject = function(obj, callback){
  return this.model('customer').find(obj, callback);
};

customerSchema.statics.findAll = function(callback){
  return this.model('customer').find({}, callback);
};

let customerModel = db.model('customer', customerSchema);

module.exports = customerModel;