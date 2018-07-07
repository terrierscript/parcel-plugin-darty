const JSPackager = require("parcel-bundler/lib/packagers/JSPackager");

const code = require("fs").readFileSync(
  path.join(__dirname, "./fs-mock.js"),
  "utf-8"
);

module.exports = class SassDartPackager extends JSPackager {
  async end() {
    await this.writeModule("fs", code);
    await super.end();
  }
};
