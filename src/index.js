
module.exports = function(callback, storage) {
  if (!storage) {
    storage = {};
  }

  return {
    record: function(path, options) {
      if (!options) {
        options = {};
      }

      var defaults = {timeout: 1000*60*1, arg: undefined}; // default 1 minutes
      var opts = Object.assign({}, defaults, options);
      if (storage.hasOwnProperty(path)) {
        clearTimeout(storage[path]);
      }

      storage[path] = setTimeout(() => {
        if (opts.arg === undefined) {
          opts.arg = path;
        }
        storage[path] = undefined;
        return callback(opts.arg);
      }, opts.timeout);
    }
  };
};
