exports.statSync = function(name) {
  return {
    isFile: function() {
      return false;
    },
    isDirectory: function() {
      return false;
    }
  };
};
