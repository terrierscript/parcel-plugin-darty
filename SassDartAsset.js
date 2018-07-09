const JSAsset = require("parcel-bundler/src/assets/JSAsset");

const replaceSelfLocation = js =>
  js.replace(/self\.location/g, "self.___location");

module.exports = class SassDartAsset extends JSAsset {
  isTarget() {
    return this.name.indexOf("sass.dart.js") > 0;
  }
  injectGlobals() {
    this.addDependency("process");
    this.globals.set("process", `var process = require("process");`);

    this.addDependency("buffer");
    this.globals.set("buffer", `global.Buffer = require("buffer").Buffer;`);
  }
  async transform() {
    await super.transform();
    if (!this.isTarget()) {
      return;
    }
    this.injectGlobals();
  }
  async postProcess(generated) {
    if (!this.isTarget()) {
      return generated;
    }
    generated[0].value = replaceSelfLocation(generated[0].value);
    return generated;
  }
};
