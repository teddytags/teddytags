/* eslint-disable */
/*istanbul ignore next */
(() => {
  if (!Array.prototype.includes) {
    console.info("Loaded Array.prototype.includes Polyfill");
    Object.defineProperty(Array.prototype, "includes", {
      enumerable: false,
      writable: true,
      value: function(searchElement /*, fromIndex*/) {
        "use strict";
        var O = Object(this);
        var len = parseInt(O.length) || 0;
        if (len === 0) {
          return false;
        }
        var n = parseInt(arguments[1]) || 0;
        var k;
        if (n >= 0) {
          k = n;
        } else {
          k = len + n;
          if (k < 0) {
            k = 0;
          }
        }
        var currentElement;
        while (k < len) {
          currentElement = O[k];
          if (
            searchElement === currentElement ||
            (searchElement !== searchElement &&
              currentElement !== currentElement)
          ) {
            // NaN !== NaN
            return true;
          }
          k++;
        }
        return false;
      },
    });
  }
  if ("NodeList" in window && !NodeList.prototype.forEach) {
    console.info("Loaded NodeList.prototype.forEach Polyfill");
    NodeList.prototype.forEach = function(callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }
  if (typeof Object.assign !== "function") {
    console.log("Loaded Object.assign Polyfill");
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
      value: function assign(target, varArgs) {
        // .length of function is 2
        "use strict";
        if (target === null || target === undefined) {
          throw new TypeError("Cannot convert undefined or null to object");
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];

          if (nextSource !== null && nextSource !== undefined) {
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true,
    });
  }
  if (!String.prototype.startsWith) {
    console.log("Loaded String.prototype.startsWith Polyfill");
    String.prototype.startsWith = function(searchString, position) {
      position = position || 0;
      return this.substr(position, searchString.length) === searchString;
    };
  }
})();