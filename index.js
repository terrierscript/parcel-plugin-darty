module.exports = parcel => {
  parcel.addAssetType("js", require.resolve("./Asset.js"));
  parcel.addPackager("js", require.resolve("./Packager.js"));
};
