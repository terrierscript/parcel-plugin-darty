module.exports = parcel => {
  parcel.addAssetType("js", require.resolve("./Asset.js"));
};
