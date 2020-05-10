/* eslint-disable */
/*istanbul ignore next */
(() => {
  if ("NodeList" in window && !NodeList.prototype.forEach) {
    console.info("Loaded NodeList.prototype.forEach Polyfill");
    NodeList.prototype.forEach = function(callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }
})();
