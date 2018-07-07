module.exports = parcel => {
  parcel.addAssetType("js", require.resolve("./SassDartAsset.js"));
  parcel.addPackager("js", require.resolve("./Packager.js"));
};
