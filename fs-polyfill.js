self.fs = {
  statSync(name) {
    return {
      isFile: () => {
        return false;
      },
      isDirectory: () => {
        return false;
      }
    };
  }
};
