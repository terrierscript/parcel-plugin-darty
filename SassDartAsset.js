const JSAsset = require("parcel-bundler/src/assets/JSAsset");
const visitor = require("./Visitor");

module.exports = class SassDartAsset extends JSAsset {
  isTarget() {
    return this.name.indexOf("sass.dart.js") > 0;
  }
  async transform() {
    await super.transform();
    if (!this.isTarget()) {
      return;
    }
    await this.parseIfNeeded();
    this.isAstDirty = true;
    this.traverse(visitor);
  }
};
