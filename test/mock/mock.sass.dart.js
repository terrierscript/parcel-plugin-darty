self.location = {
  get href() {
    return (
      "file://" +
      (function() {
        var cwd = process.cwd();
        if (process.platform != "win32") return cwd;
        return "/" + cwd.replace(/\\/g, "/");
      })() +
      "/"
    );
  }
};

function foo() {
  if (!!self.location) return self.location.href;
  return;
}
