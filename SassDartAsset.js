const JSAsset = require("parcel-bundler/lib/assets/JSAsset");

const replaceSelfLocation = js =>
  js.replace(/self\.location/g, "self.___location");

module.exports = class SassDartAsset extends JSAsset {
  isTarget() {
    return this.name.indexOf("sass.dart.js") > 0;
  }
  appendBuffer() {
    this.addDependency("buffer");
    this.globals.set(
      "buffer",
      'self.Buffer = require("buffer").Buffer;console.log("SDA")'
    );
  }
  async pretransform() {
    return;
    // if (!this.isTarget()) {
    //   return;
    // }
    // console.log("pretrans");
    // this.appendBuffer();
  }
  async postProcess(generated) {
    console.log("postProcess");
    if (!this.isTarget()) {
      return generated;
    }
    generated[0].value = replaceSelfLocation(generated[0].value);
    return generated;
  }
};
