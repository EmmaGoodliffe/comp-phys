// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, mainEntry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"qAzNk":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "a78200ca3dca88423b9bdb05bff38b21";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets;

function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}

function getPort() {
  return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare


var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };

  newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now());
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;

      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      reloadCSS();
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"6aoHo":[function(require,module,exports) {
"use strict";

var _p = _interopRequireDefault(require("p5"));

var _Particle = _interopRequireDefault(require("./Particle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _ = new _p.default(() => {});

const particles = [];

_.setup = () => {
  _.createCanvas(600, 600);

  _.angleMode("degrees");

  for (let i = 0; i < 3; i++) {
    particles.push(new _Particle.default(_, 1));
  }
};

_.draw = () => {
  _.background(32);

  for (const p of particles) {
    p.update({
      G: 10,
      g: 0,
      mouseMass: 0,
      attractors: particles,
      widthToMassRatio: 10,
      lengthToAccelerationRatio: 10 ** 5
    });
    p.draw();
  }
};
},{"p5":"1JMD3","./Particle":"78TYz"}],"78TYz":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _p = _interopRequireDefault(require("p5"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Particle {
  constructor(_, m = 1) {
    this._ = _;
    this.m = m;

    const x = _.random(1, _.width);

    const y = _.random(1, _.height);

    this.s = _.createVector(x, y);
    this.v = _.createVector(0, 0);
    this.a = _.createVector(0, 0);
    this.w = m;
    this.hue = Math.floor(_.random(0, 360));
    this.arrow = new Arrow(_, this.s, this.a);
  }

  applyForce(force) {
    const a = _p.default.Vector.div(force, this.m);

    this.a.add(a);
  }

  constrain() {
    const {
      _,
      s
    } = this;
    s.x = _.constrain(s.x, 0, _.width);
    s.y = _.constrain(s.y, 0, _.height);
  }

  bounce() {
    const {
      _,
      s,
      v,
      w
    } = this;
    const radius = w / 2;

    if (s.x - radius <= 0 || s.x + radius >= _.width) {
      v.x *= -1;
    }

    if (s.y - radius <= 0 || s.y + radius >= _.height) {
      v.y *= -1;
    }

    this.s.x = _.constrain(this.s.x, radius, _.width - radius);
    this.s.y = _.constrain(this.s.y, radius, _.height - radius);
  }

  getGravitationalAttraction(attractor, G) {
    const displacement = _p.default.Vector.sub(attractor.s, this.s);

    const distance = displacement.mag();
    const magnitude = G * attractor.m * this.m / distance ** 2;

    if (magnitude === Infinity || distance < 10) {
      return false;
    } else {
      const forceAttractorOnParticle = displacement.setMag(magnitude);
      return forceAttractorOnParticle;
    }
  }

  update(inputs) {
    const {
      _
    } = this;
    const {
      g,
      G
    } = inputs;

    const forceEarthOnParticle = _.createVector(0, 1).setMag(this.m * g);

    this.applyForce(forceEarthOnParticle);

    const mouseS = _.createVector(_.mouseX, _.mouseY);

    const forceMouseOnParticle = this.getGravitationalAttraction({
      s: mouseS,
      m: inputs.mouseMass
    }, G);
    forceMouseOnParticle && this.applyForce(forceMouseOnParticle);

    for (const attractor of inputs.attractors) {
      const forceAttractorOnParticle = this.getGravitationalAttraction(attractor, G);

      if (forceAttractorOnParticle) {
        forceAttractorOnParticle.setMag(_.constrain(forceAttractorOnParticle.mag(), -1, 1));
        this.applyForce(forceAttractorOnParticle);
      }
    }

    this.w = this.m * inputs.widthToMassRatio;
    this.arrow = new Arrow(_, this.s, this.a);
    this.v.add(this.a);
    this.bounce();
    this.v.setMag(_.constrain(this.v.mag(), 0, 3));
    this.s.add(this.v);
    this.a = _.createVector(0, 0);
  }

  draw() {
    const {
      _,
      s,
      w
    } = this;

    const strokeCol = _.color(`hsl(${this.hue}, 100%, 50%)`);

    _.stroke(strokeCol);

    _.strokeWeight(2);

    const fillCol = _.color(`hsla(${this.hue}, 100%, 50%, 0.5)`);

    _.fill(fillCol);

    _.circle(s.x, s.y, w);

    _.strokeWeight(3);

    this.arrow.draw();
  }

}

exports.default = Particle;

class Arrow {
  constructor(_, s, a) {
    this._ = _;
    this.s = s;
    this.line = a.copy().setMag(20);
    this.tips = [this.createTip(1), this.createTip(-1)];
  }

  createTip(direction) {
    const {
      _
    } = this;
    const baseR = this.line.mag();

    const baseTheta = _.atan(this.line.y / this.line.x);

    const thetaAdjustment = 45 * direction;
    let theta = baseTheta + 180 + thetaAdjustment;

    if (this.line.x < 0) {
      theta += 180;
    }

    const r = baseR / 4;

    const x = r * _.cos(theta);

    const y = r * _.sin(theta);

    const tip = _.createVector(x, y);

    return tip;
  }

  draw() {
    const {
      _,
      s
    } = this;

    const absLine = _p.default.Vector.add(s, this.line);

    _.line(s.x, s.y, absLine.x, absLine.y);

    for (const tip of this.tips) {
      _.line(absLine.x, absLine.y, absLine.x + tip.x, absLine.y + tip.y);
    }
  }

}
},{"p5":"1JMD3"}]},{},["qAzNk","6aoHo"], "6aoHo", null)

//# sourceMappingURL=index.a78200ca.js.map
