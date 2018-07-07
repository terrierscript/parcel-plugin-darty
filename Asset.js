const JSAsset = require("parcel-bundler/src/assets/JSAsset");
const fsVisitor = require("parcel-bundler/src/visitors/fs");
const insertGlobals = require("parcel-bundler/src/visitors/globals");

const walk = require("babylon-walk");

const GLOBAL_RE = /\b(?:process|__dirname|__filename|global|Buffer|define)\b/;

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
    const result = await super.generate();
    if (!this.isTarget()) {
      return result;
    }
    const { js, map } = result;
    return {
      js: js.replace(/self\.location/g, "self_location"),
      map
    };
  }
};
