const CheckLogged = require('./checkLogged');
const FormatData = require('./formatData');

function mix(...mixins) {
  class Mix {
    constructor() {
      for (let mixin of mixins) {
        copyProperties(this, new mixin());
      }
    }
  }

  for (let mixin of mixins) {
    copyProperties(Mix, mixin);
    copyProperties(Mix.prototype, mixin.prototype);
  }

  return Mix;
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
      let desc = Object.getOwnPropertyDescription(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}

class Base extends mix(CheckLogged, formatData) {
}

module.exports = Base;