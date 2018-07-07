const JSPackager = require("parcel-bundler/src/packagers/JSPackager");

const code = `
exports.statSync = function(name) {
  return {
    isFile: function() {
      return false;
    },
    isDirectory: function() {
      return false;
    }
  };
};
`;
module.exports = class SassDartPackager extends JSPackager {
  async end() {
    await this.writeModule("fs", code);
    await super.end();
  }
};
