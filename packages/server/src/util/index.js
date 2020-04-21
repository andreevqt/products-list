const _ = require("lodash");

module.exports.singleton = (Base) => class extends Base {
  static getInstance() {
    if (!this.instance) {
      Base.instance = new Base;
    }
    return this.instance;
  }
}
