// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"f6pS":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTTFB = exports.getLCP = exports.getFID = exports.getFCP = exports.getCLS = void 0;

var t,
    e,
    n,
    i,
    a = function (t, e) {
  return {
    name: t,
    value: void 0 === e ? -1 : e,
    delta: 0,
    entries: [],
    id: "v1-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12)
  };
},
    r = function (t, e) {
  try {
    if (PerformanceObserver.supportedEntryTypes.includes(t)) {
      var n = new PerformanceObserver(function (t) {
        return t.getEntries().map(e);
      });
      return n.observe({
        type: t,
        buffered: !0
      }), n;
    }
  } catch (t) {}
},
    o = !1,
    c = function (t, e) {
  o || "undefined" != typeof InstallTrigger || (addEventListener("beforeunload", function () {}), o = !0);
  addEventListener("visibilitychange", function n(i) {
    "hidden" === document.visibilityState && (t(i), e && removeEventListener("visibilitychange", n, !0));
  }, !0);
},
    u = function (t) {
  addEventListener("pageshow", function (e) {
    e.persisted && t(e);
  }, !0);
},
    f = "function" == typeof WeakSet ? new WeakSet() : new Set(),
    s = function (t, e, n) {
  var i;
  return function () {
    e.value >= 0 && (n || f.has(e) || "hidden" === document.visibilityState) && (e.delta = e.value - (i || 0), (e.delta || void 0 === i) && (i = e.value, t(e)));
  };
},
    m = function (t, e) {
  var n,
      i = a("CLS", 0),
      o = function (t) {
    t.hadRecentInput || (i.value += t.value, i.entries.push(t), n());
  },
      f = r("layout-shift", o);

  f && (n = s(t, i, e), c(function () {
    f.takeRecords().map(o), n();
  }), u(function () {
    i = a("CLS", 0), n = s(t, i, e);
  }));
},
    d = -1,
    v = function () {
  return "hidden" === document.visibilityState ? 0 : 1 / 0;
},
    p = function () {
  c(function (t) {
    var e = t.timeStamp;
    d = e;
  }, !0);
},
    l = function () {
  return d < 0 && (d = v(), p(), u(function () {
    setTimeout(function () {
      d = v(), p();
    }, 0);
  })), {
    get timeStamp() {
      return d;
    }

  };
},
    S = function (t, e) {
  var n,
      i = l(),
      o = a("FCP"),
      c = r("paint", function (t) {
    "first-contentful-paint" === t.name && (c && c.disconnect(), t.startTime < i.timeStamp && (o.value = t.startTime, o.entries.push(t), f.add(o), n()));
  });
  c && (n = s(t, o, e), u(function (i) {
    o = a("FCP"), n = s(t, o, e), requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        o.value = performance.now() - i.timeStamp, f.add(o), n();
      });
    });
  }));
},
    h = {
  passive: !0,
  capture: !0
},
    y = new Date(),
    g = function (i, a) {
  t || (t = a, e = i, n = new Date(), L(removeEventListener), E());
},
    E = function () {
  if (e >= 0 && e < n - y) {
    var a = {
      entryType: "first-input",
      name: t.type,
      target: t.target,
      cancelable: t.cancelable,
      startTime: t.timeStamp,
      processingStart: t.timeStamp + e
    };
    i.forEach(function (t) {
      t(a);
    }), i = [];
  }
},
    w = function (t) {
  if (t.cancelable) {
    var e = (t.timeStamp > 1e12 ? new Date() : performance.now()) - t.timeStamp;
    "pointerdown" == t.type ? function (t, e) {
      var n = function () {
        g(t, e), a();
      },
          i = function () {
        a();
      },
          a = function () {
        removeEventListener("pointerup", n, h), removeEventListener("pointercancel", i, h);
      };

      addEventListener("pointerup", n, h), addEventListener("pointercancel", i, h);
    }(e, t) : g(e, t);
  }
},
    L = function (t) {
  ["mousedown", "keydown", "touchstart", "pointerdown"].forEach(function (e) {
    return t(e, w, h);
  });
},
    T = function (n, o) {
  var m,
      d = l(),
      v = a("FID"),
      p = function (t) {
    t.startTime < d.timeStamp && (v.value = t.processingStart - t.startTime, v.entries.push(t), f.add(v), m());
  },
      S = r("first-input", p);

  m = s(n, v, o), S && c(function () {
    S.takeRecords().map(p), S.disconnect();
  }, !0), S && u(function () {
    var r;
    v = a("FID"), m = s(n, v, o), i = [], e = -1, t = null, L(addEventListener), r = p, i.push(r), E();
  });
},
    b = function (t, e) {
  var n,
      i = l(),
      o = a("LCP"),
      m = function (t) {
    var e = t.startTime;
    e < i.timeStamp && (o.value = e, o.entries.push(t)), n();
  },
      d = r("largest-contentful-paint", m);

  if (d) {
    n = s(t, o, e);

    var v = function () {
      f.has(o) || (d.takeRecords().map(m), d.disconnect(), f.add(o), n());
    };

    ["keydown", "click"].forEach(function (t) {
      addEventListener(t, v, {
        once: !0,
        capture: !0
      });
    }), c(v, !0), u(function (i) {
      o = a("LCP"), n = s(t, o, e), requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          o.value = performance.now() - i.timeStamp, f.add(o), n();
        });
      });
    });
  }
},
    F = function (t) {
  var e,
      n = a("TTFB");
  e = function () {
    try {
      var e = performance.getEntriesByType("navigation")[0] || function () {
        var t = performance.timing,
            e = {
          entryType: "navigation",
          startTime: 0
        };

        for (var n in t) "navigationStart" !== n && "toJSON" !== n && (e[n] = Math.max(t[n] - t.navigationStart, 0));

        return e;
      }();

      n.value = n.delta = e.responseStart, n.entries = [e], t(n);
    } catch (t) {}
  }, "complete" === document.readyState ? setTimeout(e, 0) : addEventListener("pageshow", e);
};

exports.getTTFB = F;
exports.getLCP = b;
exports.getFID = T;
exports.getFCP = S;
exports.getCLS = m;
},{}]},{},["f6pS"], null)