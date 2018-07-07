const JSPackager = require("parcel-bundler/src/packagers/JSPackager");
const lineCounter = require("parcel-bundler/src/utils/lineCounter");

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
module.exports = class Packager extends JSPackager {
  async end() {
    console.log("fs inject");
    await this.writeModule("fs", code);
    await super.end();
  }
};
