self.location = {
  get href() {
    return "/";
  }
};

function foo() {
  if (!!self.location) return self.location.href;
  console.log("fooo");
  return;
}
