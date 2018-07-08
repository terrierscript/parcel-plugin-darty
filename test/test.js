const assert = require("assert");
const Asset = require("../SassDartAsset");
const path = require("path");

describe("Asset", function() {
  it(".", async function() {
    const instance = new Asset(
      path.resolve(__dirname, "./mock/mock.sass.dart.js"),
      { rootDir: __dirname, target: "browser" }
    );
    const processed = await instance.process();
    console.log(processed.js);
  });
});
