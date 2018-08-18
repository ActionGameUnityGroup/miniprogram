const {db, mongoose} = require('../mongodb/db');

let addressSchema = new mongoose.Schema({
  openid: String,
  name: String,
  isDefault: Boolean,
  phone: String,
  area: String,
  detail: String
}, {collection: 'Address', versionKey: false});

let addressModel = db.model('address', addressSchema);

module.exports = addressModel;