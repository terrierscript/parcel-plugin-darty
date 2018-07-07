const walk = require("babylon-walk");

const Visitor = {
  Identifier(node, asset, ancestors) {
    if (node.name !== "location") {
      return;
    }
    console.log(node);
    if (ancestors.type !== "MemberExpression") {
      return;
    }
    console.log(node, asset);
  }
};
