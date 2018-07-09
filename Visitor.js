const walk = require("babylon-walk");

module.exports = {
  Identifier(path) {
    if (path.node.name != "location") {
      return;
    }
    if (path.parent.object.name != "self") {
      return;
    }
    path.node.name = "__location";
  }
};
