const JSAsset = require("parcel-bundler/src/assets/JSAsset");
const visitor = require("./visitor");
// const replaceSelfLocation = js =>
//   js.replace(/self\.location/g, "self.___location");

module.exports = class SassDartAsset extends JSAsset {
  isTarget() {
    return this.name.indexOf("sass.dart.js") > 0;
  }
  async transform() {
    await super.transform();
    if (!this.isTarget()) {
      return;
    }
    this.traverse(visitor);
  }
  // async postProcess(generated) {
  //   if (!this.isTarget()) {
  //     return generated;
  //   }
  //   generated[0].value = replaceSelfLocation(generated[0].value);
  //   return generated;
  // }
};
