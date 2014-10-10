
module.exports = function(expr, msg) {
  if (!(true == !!expr)) {
    console.log(msg);
    throw new Error(msg);
  }
}