module.exports = parcel => {
  parcel.addAssetType("js", require.resolve("./Asset2.js"));
};
