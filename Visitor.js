const walk = require("babylon-walk");

module.exports = {
  // MemberExpression(node, asset, ancestors) {
  //   console.log(node);
  //   console.log("========");
  //   if (node.name !== "location") {
  //     return;
  //   }
  //   console.log(node);
  //   if (ancestors.type !== "MemberExpression") {
  //     return;
  //   }
  //   console.log(node, asset);
  // }
  Identifier(path, ...rest) {
    if (path.node.name != "location") {
      return;
    }
    if (path.parent.object.name != "self") {
      return;
    }
    path.node.name = "__location";
  }
};
