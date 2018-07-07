const JSAsset = require("parcel-bundler/src/assets/JSAsset");
const FsMockAsset = require("./FsMockAsset");
const fsVisitor = require("parcel-bundler/src/visitors/fs");
const insertGlobals = require("parcel-bundler/src/visitors/globals");

const walk = require("babylon-walk");

const Visitor = {
  Identifier(node, asset, ancestors) {
    if (node.name !== "location") {
      return;
    }
    console.log(node);
    if (ancestors.type !== "MemberExpression") {
      return;
    }
    console.log(node, asset);
  }
};
module.exports = class DartCompiledAsset extends JSAsset {
  isTarget() {
    return this.name.indexOf("sass.dart.js") > 0;
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
