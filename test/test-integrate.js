const Bundler = require("parcel-bundler");
const Path = require("path");

// Entrypoint file location
const file = Path.join(__dirname, "./integrate/index.html");

function runBundle() {
  const bundler = new Bundler(file, { outDir: "./dist",cache: false, minify: false, sourceMaps: false });
  bundler.addAssetType("js", require.resolve("../SassDartAsset.js"));
  bundler.addPackager("js", require.resolve("../SassDartPackager.js"));

  const bundle = bundler.bundle();
  bundler.serve()
}

runBundle();
