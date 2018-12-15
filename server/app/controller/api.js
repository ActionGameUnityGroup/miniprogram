const fs = require('fs');

const v0 = {};
const v1 = {};

fs.readdirSync(__dirname + '/v0').map(fileName => {
  let module = require(__dirname+'/v0/'+fileName);
  v0[module.constructor.name] = module;
});

fs.readdirSync(__dirname + '/v1').map(fileName => {
  let module = require(__dirname+'/v1/'+fileName);
  v1[module.constructor.name] = module;
});

module.exports = {
  v0: v0,
  v1: v1
};