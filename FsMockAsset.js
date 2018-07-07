const JSAsset = require("parcel-bundler/src/assets/JSAsset");

const code = `
{
  statSync(name) {
    return {
      isFile: () => {
        return false;
      },
      isDirectory: () => {
        return false;
      }
    };
  }
};
`;
module.exports = class FsMockAsset extends JSAsset {
  constructor(name, options) {
    super(name, options);
  }
  async generate() {
    return {
      js: code,
      map: null
    };
  }
};
