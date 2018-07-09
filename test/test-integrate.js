const Bundler = require("parcel-bundler");
const Path = require("path");

// Entrypoint file location
const file = Path.join(__dirname, "./test2.js");

function runBundle() {
  const bundler = new Bundler(file, { outDir: "./dist" });
  bundler.addAssetType("js", require.resolve("../SassDartAsset.js"));
  bundler.addPackager("js", require.resolve("../SassDartPackager.js"));

  const bundle = bundler.bundle();
}

runBundle();
