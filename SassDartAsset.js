const JSAsset = require("parcel-bundler/src/assets/JSAsset");

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
      'self.Buffer = require("buffer").Buffer;console.log("This is parcel-plugin-darty")'
    );
    console.log(this.globals);
  }
  async pretransform() {
    // console.log("pretranssss", this.name);

    await super.pretransform();
    // console.log(this.name);
    if (!this.isTarget()) {
      return;
    }
    // console.log("pretrans");
    this.appendBuffer();
  }
  async postProcess(generated) {
    // console.log("postProcess", this.name);

    if (!this.isTarget()) {
      return generated;
    }
    generated[0].value = replaceSelfLocation(generated[0].value);
    return generated;
  }
};
