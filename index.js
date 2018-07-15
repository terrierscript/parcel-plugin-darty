module.exports = parcel => {
  console.warn("This is dangerous plugin");
  // const { resolver } = parcel;
  // parcel.addAssetType("js", require.resolve("./SassDartAsset.js"));
  parcel.addPackager("js", require.resolve("./SassDartPackager.js"));
  // console.log(resolver);
};
