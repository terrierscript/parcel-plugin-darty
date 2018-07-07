const JSPackager = require("parcel-bundler/lib/packagers/JSPackager");

const code = require("fs").readFileSync("./fs-mock.js");

module.exports = class SassDartPackager extends JSPackager {
  async end() {
    await this.writeModule("fs", code);
    await super.end();
  }
};
