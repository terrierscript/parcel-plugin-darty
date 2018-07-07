const JSAsset = require("parcel-bundler/src/assets/JSAsset");

const IMPORT_RE = /\b(?:import\b|export\b|self\.require\s*\()/;

module.exports = class DartCompiledAsset extends JSAsset {
  isTarget() {
    return this.name.indexOf("sass.dart.js") > 0;
  }
  mightHaveDependencies() {
    if (!this.isTarget()) {
      return super.mightHaveDependencies();
    }
    return super.mightHaveDependencies() || IMPORT_RE.test(this.contents);
  }
  async generate() {
    // this.depAssets.set("fs", new FsMockAsset("fsmock", { rootDir: __dirname }));
    const result = await super.generate();
    if (!this.isTarget()) {
      return result;
    }
    const { js, map } = result;
    return {
      js: js.replace(/self\.location/g, "self.___location"),
      map
    };
  }
};
