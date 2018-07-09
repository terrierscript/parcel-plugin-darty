const sass = require("sass");

const result = sass.renderSync({
  data: ".foo{ color: red}"
})
console.log(result.css.toString())