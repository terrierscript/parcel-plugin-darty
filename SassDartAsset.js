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
    console.log("pretranssss");

    await super.pretransform();
    console.log("pretranssss");
    if (!this.isTarget()) {
      return;
    }
    console.log("pretrans");
    this.appendBuffer();
  }
  async postProcess(generated) {
    console.log("postpro");
    if (!this.isTarget()) {
      return generated;
    }
    generated[0].value = replaceSelfLocation(generated[0].value);
    return generated;
  }
};
