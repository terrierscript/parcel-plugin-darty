const JSAsset = require("parcel-bundler/src/assets/JSAsset");
const visitor = require("./visitor");
// const replaceSelfLocation = js =>
//   js.replace(/self\.location/g, "self.___location");

const appendLocation = `
global.___location = {
  href: "/"
}
`;

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
