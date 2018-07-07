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
  async baseTransform() {
    if (this.options.target === "browser") {
      if (this.dependencies.has("fs") && FS_RE.test(this.contents)) {
        // Check if we should ignore fs calls
        // See https://github.com/defunctzombie/node-browser-resolve#skip
        let pkg = await this.getPackage();
        let ignore = pkg && pkg.browser && pkg.browser.fs === false;

        if (!ignore) {
          await this.parseIfNeeded();
          console.log(this.ast);
          this.traverse(fsVisitor);
        }
      }

      if (GLOBAL_RE.test(this.contents)) {
        await this.parseIfNeeded();
        walk.ancestor(this.ast, insertGlobals, this);
      }
    }

    if (this.options.scopeHoist) {
      await this.parseIfNeeded();
      await this.getPackage();

      this.traverse(hoist);
      this.isAstDirty = true;
    } else {
      if (this.isES6Module) {
        await babel(this);
      }
    }

    if (this.options.minify) {
      await terser(this);
    }
  }

  async transform() {
    if (!this.isTarget()) {
      return super.transform();
    }
    await this.baseTransform();
    walk.ancestor(this.ast, Visitor, this);
  }
};
