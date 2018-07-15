const Bundler = require("parcel-bundler");
const Path = require("path");

// Entrypoint file location
const file = Path.join(__dirname, "./integrate/index.html");

async function runBundle() {
  const bundler = new Bundler(file, {
    outDir: "./dist",
    cache: false,
    minify: true,
    sourceMaps: false
  });
  bundler.addAssetType("js", require.resolve("../SassDartAsset.js"));
  bundler.addPackager("js", require.resolve("../SassDartPackager.js"));

  const bundle = await bundler.bundle();
  console.log("finisish");
  // bundler.serve();
  return 
}

runBundle();
