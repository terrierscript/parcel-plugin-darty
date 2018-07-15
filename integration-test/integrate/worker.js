// const sass = require("sass");
const sass = require("../../test/mock/mock.sass.dart.js");

const result = sass.renderSync({
  data: ".foo{ color: red}"
});
console.log(result.css.toString());
