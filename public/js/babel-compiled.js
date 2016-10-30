(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/bower_components/gist-embed/gist-embed.min.js":[function(require,module,exports){
"use strict";

!function (a) {
  "use strict";
  function b(a) {
    var c,
        d,
        b = [];if ("number" == typeof a) b.push(a);else {
      d = a.split(",");for (var e = 0; e < d.length; e++) {
        if (c = d[e].split("-"), 2 === c.length) for (var f = parseInt(c[0], 10); f <= c[1]; f++) {
          b.push(f);
        } else 1 === c.length && b.push(parseInt(c[0], 10));
      }
    }return b;
  }a.fn.gist = function (c) {
    return this.each(function () {
      var e,
          f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          d = a(this),
          o = {};return d.css("display", "block"), e = d.data("gist-id") || "", g = d.data("gist-file"), k = d.data("gist-hide-footer") === !0, l = d.data("gist-hide-line-numbers") === !0, h = d.data("gist-line"), j = d.data("gist-highlight-line"), n = d.data("gist-show-spinner") === !0, m = n ? !1 : void 0 !== d.data("gist-show-loading") ? d.data("gist-show-loading") : !0, g && (o.file = g), e ? (f = "https://gist.github.com/" + e + ".json", i = "Loading gist " + f + (o.file ? ", file: " + o.file : "") + "...", m && d.html(i), n && d.html('<img style="display:block;margin-left:auto;margin-right:auto"  alt="' + i + '" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif">'), void a.ajax({ url: f, data: o, dataType: "jsonp", timeout: 2e4, success: function success(c) {
          var e, g, i, m, n;c && c.div ? (c.stylesheet && (0 === c.stylesheet.indexOf("<link") ? c.stylesheet = c.stylesheet.replace(/\\/g, "").match(/href=\"([^\s]*)\"/)[1] : 0 !== c.stylesheet.indexOf("http") && (0 !== c.stylesheet.indexOf("/") && (c.stylesheet = "/" + c.stylesheet), c.stylesheet = "https://gist.github.com" + c.stylesheet)), c.stylesheet && 0 === a('link[href="' + c.stylesheet + '"]').length && (e = document.createElement("link"), g = document.getElementsByTagName("head")[0], e.type = "text/css", e.rel = "stylesheet", e.href = c.stylesheet, g.insertBefore(e, g.firstChild)), n = a(c.div), n.removeAttr("id"), d.html("").append(n), j && (m = b(j), n.find("td.line-data").css({ width: "100%" }), n.find(".js-file-line").each(function (b) {
            -1 !== a.inArray(b + 1, m) && a(this).css({ "background-color": "rgb(255, 255, 204)" });
          })), h && (i = b(h), n.find(".js-file-line").each(function (b) {
            -1 === a.inArray(b + 1, i) && a(this).parent().remove();
          })), k && (n.find(".gist-meta").remove(), n.find(".gist-data").css("border-bottom", "0px"), n.find(".gist-file").css("border-bottom", "1px solid #ddd")), l && n.find(".js-line-number").remove()) : d.html("Failed loading gist " + f);
        }, error: function error(a, b) {
          d.html("Failed loading gist " + f + ": " + b);
        }, complete: function complete() {
          "function" == typeof c && c();
        } })) : !1;
    });
  }, a(function () {
    a("[data-gist-id]").gist();
  });
}(jQuery);

},{}],"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/bower_components/iframe-resizer/js/iframeResizer.contentWindow.min.js":[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/*! iFrame Resizer (iframeSizer.contentWindow.min.js) - v3.5.5 - 2016-06-16
 *  Desc: Include this file in any page being loaded into an iframe
 *        to force the iframe to resize to the content size.
 *  Requires: iframeResizer.min.js on host page.
 *  Copyright: (c) 2016 David J. Bradshaw - dave@bradshaw.net
 *  License: MIT
 */

!function (a, b) {
  "use strict";
  function c(b, c, d) {
    "addEventListener" in a ? b.addEventListener(c, d, !1) : "attachEvent" in a && b.attachEvent("on" + c, d);
  }function d(b, c, d) {
    "removeEventListener" in a ? b.removeEventListener(c, d, !1) : "detachEvent" in a && b.detachEvent("on" + c, d);
  }function e(a) {
    return a.charAt(0).toUpperCase() + a.slice(1);
  }function f(a) {
    var b,
        c,
        d,
        e = null,
        f = 0,
        g = function g() {
      f = Ha(), e = null, d = a.apply(b, c), e || (b = c = null);
    };return function () {
      var h = Ha();f || (f = h);var i = ya - (h - f);return b = this, c = arguments, 0 >= i || i > ya ? (e && (clearTimeout(e), e = null), f = h, d = a.apply(b, c), e || (b = c = null)) : e || (e = setTimeout(g, i)), d;
    };
  }function g(a) {
    return na + "[" + pa + "] " + a;
  }function h(b) {
    ma && "object" == _typeof(a.console) && console.log(g(b));
  }function i(b) {
    "object" == _typeof(a.console) && console.warn(g(b));
  }function j() {
    k(), h("Initialising iFrame (" + location.href + ")"), l(), o(), n("background", X), n("padding", _), B(), t(), u(), p(), D(), v(), ja = C(), O("init", "Init message from host page"), Ea();
  }function k() {
    function a(a) {
      return "true" === a ? !0 : !1;
    }var c = ia.substr(oa).split(":");pa = c[0], Y = b !== c[1] ? Number(c[1]) : Y, aa = b !== c[2] ? a(c[2]) : aa, ma = b !== c[3] ? a(c[3]) : ma, ka = b !== c[4] ? Number(c[4]) : ka, V = b !== c[6] ? a(c[6]) : V, Z = c[7], ga = b !== c[8] ? c[8] : ga, X = c[9], _ = c[10], va = b !== c[11] ? Number(c[11]) : va, ja.enable = b !== c[12] ? a(c[12]) : !1, ra = b !== c[13] ? c[13] : ra, Ba = b !== c[14] ? c[14] : Ba;
  }function l() {
    function b() {
      var b = a.iFrameResizer;h("Reading data from page: " + JSON.stringify(b)), Da = "messageCallback" in b ? b.messageCallback : Da, Ea = "readyCallback" in b ? b.readyCallback : Ea, ua = "targetOrigin" in b ? b.targetOrigin : ua, ga = "heightCalculationMethod" in b ? b.heightCalculationMethod : ga, Ba = "widthCalculationMethod" in b ? b.widthCalculationMethod : Ba;
    }function c(a, b) {
      return "function" == typeof a && (h("Setup custom " + b + "CalcMethod"), Ga[b] = a, a = "custom"), a;
    }"iFrameResizer" in a && Object === a.iFrameResizer.constructor && (b(), ga = c(ga, "height"), Ba = c(Ba, "width")), h("TargetOrigin for parent set to: " + ua);
  }function m(a, b) {
    return -1 !== b.indexOf("-") && (i("Negative CSS value ignored for " + a), b = ""), b;
  }function n(a, c) {
    b !== c && "" !== c && "null" !== c && (document.body.style[a] = c, h("Body " + a + ' set to "' + c + '"'));
  }function o() {
    b === Z && (Z = Y + "px"), n("margin", m("margin", Z));
  }function p() {
    document.documentElement.style.height = "", document.body.style.height = "", h('HTML & body height set to "auto"');
  }function q(b) {
    function f() {
      O(b.eventName, b.eventType);
    }var g = { add: function add(b) {
        c(a, b, f);
      }, remove: function remove(b) {
        d(a, b, f);
      } };b.eventNames && Array.prototype.map ? (b.eventName = b.eventNames[0], b.eventNames.map(g[b.method])) : g[b.method](b.eventName), h(e(b.method) + " event listener: " + b.eventType);
  }function r(a) {
    q({ method: a, eventType: "Animation Start", eventNames: ["animationstart", "webkitAnimationStart"] }), q({ method: a, eventType: "Animation Iteration", eventNames: ["animationiteration", "webkitAnimationIteration"] }), q({ method: a, eventType: "Animation End", eventNames: ["animationend", "webkitAnimationEnd"] }), q({ method: a, eventType: "Input", eventName: "input" }), q({ method: a, eventType: "Mouse Up", eventName: "mouseup" }), q({ method: a, eventType: "Mouse Down", eventName: "mousedown" }), q({ method: a, eventType: "Orientation Change", eventName: "orientationchange" }), q({ method: a, eventType: "Print", eventName: ["afterprint", "beforeprint"] }), q({ method: a, eventType: "Ready State Change", eventName: "readystatechange" }), q({ method: a, eventType: "Touch Start", eventName: "touchstart" }), q({ method: a, eventType: "Touch End", eventName: "touchend" }), q({ method: a, eventType: "Touch Cancel", eventName: "touchcancel" }), q({ method: a, eventType: "Transition Start", eventNames: ["transitionstart", "webkitTransitionStart", "MSTransitionStart", "oTransitionStart", "otransitionstart"] }), q({ method: a, eventType: "Transition Iteration", eventNames: ["transitioniteration", "webkitTransitionIteration", "MSTransitionIteration", "oTransitionIteration", "otransitioniteration"] }), q({ method: a, eventType: "Transition End", eventNames: ["transitionend", "webkitTransitionEnd", "MSTransitionEnd", "oTransitionEnd", "otransitionend"] }), "child" === ra && q({ method: a, eventType: "IFrame Resized", eventName: "resize" });
  }function s(a, b, c, d) {
    return b !== a && (a in c || (i(a + " is not a valid option for " + d + "CalculationMethod."), a = b), h(d + ' calculation method set to "' + a + '"')), a;
  }function t() {
    ga = s(ga, fa, Ia, "height");
  }function u() {
    Ba = s(Ba, Aa, Ja, "width");
  }function v() {
    !0 === V ? (r("add"), G()) : h("Auto Resize disabled");
  }function w() {
    h("Disable outgoing messages"), sa = !1;
  }function x() {
    h("Remove event listener: Message"), d(a, "message", T);
  }function y() {
    null !== $ && $.disconnect();
  }function z() {
    r("remove"), y(), clearInterval(la);
  }function A() {
    w(), x(), !0 === V && z();
  }function B() {
    var a = document.createElement("div");a.style.clear = "both", a.style.display = "block", document.body.appendChild(a);
  }function C() {
    function d() {
      return { x: a.pageXOffset !== b ? a.pageXOffset : document.documentElement.scrollLeft, y: a.pageYOffset !== b ? a.pageYOffset : document.documentElement.scrollTop };
    }function e(a) {
      var b = a.getBoundingClientRect(),
          c = d();return { x: parseInt(b.left, 10) + parseInt(c.x, 10), y: parseInt(b.top, 10) + parseInt(c.y, 10) };
    }function f(a) {
      function c(a) {
        var b = e(a);h("Moving to in page link (#" + d + ") at x: " + b.x + " y: " + b.y), S(b.y, b.x, "scrollToOffset");
      }var d = a.split("#")[1] || a,
          f = decodeURIComponent(d),
          g = document.getElementById(f) || document.getElementsByName(f)[0];b !== g ? c(g) : (h("In page link (#" + d + ") not found in iFrame, so sending to parent"), S(0, 0, "inPageLink", "#" + d));
    }function g() {
      "" !== location.hash && "#" !== location.hash && f(location.href);
    }function j() {
      function a(a) {
        function b(a) {
          a.preventDefault(), f(this.getAttribute("href"));
        }"#" !== a.getAttribute("href") && c(a, "click", b);
      }Array.prototype.forEach.call(document.querySelectorAll('a[href^="#"]'), a);
    }function k() {
      c(a, "hashchange", g);
    }function l() {
      setTimeout(g, ca);
    }function m() {
      Array.prototype.forEach && document.querySelectorAll ? (h("Setting up location.hash handlers"), j(), k(), l()) : i("In page linking not fully supported in this browser! (See README.md for IE8 workaround)");
    }return ja.enable ? m() : h("In page linking not enabled"), { findTarget: f };
  }function D() {
    h("Enable public methods"), Ca.parentIFrame = { autoResize: function autoResize(a) {
        return !0 === a && !1 === V ? (V = !0, v()) : !1 === a && !0 === V && (V = !1, z()), V;
      }, close: function close() {
        S(0, 0, "close"), A();
      }, getId: function getId() {
        return pa;
      }, getPageInfo: function getPageInfo(a) {
        "function" == typeof a ? (Fa = a, S(0, 0, "pageInfo")) : (Fa = function Fa() {}, S(0, 0, "pageInfoStop"));
      }, moveToAnchor: function moveToAnchor(a) {
        ja.findTarget(a);
      }, reset: function reset() {
        R("parentIFrame.reset");
      }, scrollTo: function scrollTo(a, b) {
        S(b, a, "scrollTo");
      }, scrollToOffset: function scrollToOffset(a, b) {
        S(b, a, "scrollToOffset");
      }, sendMessage: function sendMessage(a, b) {
        S(0, 0, "message", JSON.stringify(a), b);
      }, setHeightCalculationMethod: function setHeightCalculationMethod(a) {
        ga = a, t();
      }, setWidthCalculationMethod: function setWidthCalculationMethod(a) {
        Ba = a, u();
      }, setTargetOrigin: function setTargetOrigin(a) {
        h("Set targetOrigin: " + a), ua = a;
      }, size: function size(a, b) {
        var c = "" + (a ? a : "") + (b ? "," + b : "");O("size", "parentIFrame.size(" + c + ")", a, b);
      } };
  }function E() {
    0 !== ka && (h("setInterval: " + ka + "ms"), la = setInterval(function () {
      O("interval", "setInterval: " + ka);
    }, Math.abs(ka)));
  }function F() {
    function c(a) {
      function b(a) {
        !1 === a.complete && (h("Attach listeners to " + a.src), a.addEventListener("load", g, !1), a.addEventListener("error", i, !1), l.push(a));
      }"attributes" === a.type && "src" === a.attributeName ? b(a.target) : "childList" === a.type && Array.prototype.forEach.call(a.target.querySelectorAll("img"), b);
    }function d(a) {
      l.splice(l.indexOf(a), 1);
    }function e(a) {
      h("Remove listeners from " + a.src), a.removeEventListener("load", g, !1), a.removeEventListener("error", i, !1), d(a);
    }function f(a, c, d) {
      e(a.target), O(c, d + ": " + a.target.src, b, b);
    }function g(a) {
      f(a, "imageLoad", "Image loaded");
    }function i(a) {
      f(a, "imageLoadFailed", "Image load failed");
    }function j(a) {
      O("mutationObserver", "mutationObserver: " + a[0].target + " " + a[0].type), a.forEach(c);
    }function k() {
      var a = document.querySelector("body"),
          b = { attributes: !0, attributeOldValue: !1, characterData: !0, characterDataOldValue: !1, childList: !0, subtree: !0 };return n = new m(j), h("Create body MutationObserver"), n.observe(a, b), n;
    }var l = [],
        m = a.MutationObserver || a.WebKitMutationObserver,
        n = k();return { disconnect: function disconnect() {
        "disconnect" in n && (h("Disconnect body MutationObserver"), n.disconnect(), l.forEach(e));
      } };
  }function G() {
    var b = 0 > ka;a.MutationObserver || a.WebKitMutationObserver ? b ? E() : $ = F() : (h("MutationObserver not supported in this browser!"), E());
  }function H(a, b) {
    function c(a) {
      var c = /^\d+(px)?$/i;if (c.test(a)) return parseInt(a, W);var d = b.style.left,
          e = b.runtimeStyle.left;return b.runtimeStyle.left = b.currentStyle.left, b.style.left = a || 0, a = b.style.pixelLeft, b.style.left = d, b.runtimeStyle.left = e, a;
    }var d = 0;return b = b || document.body, "defaultView" in document && "getComputedStyle" in document.defaultView ? (d = document.defaultView.getComputedStyle(b, null), d = null !== d ? d[a] : 0) : d = c(b.currentStyle[a]), parseInt(d, W);
  }function I(a) {
    a > ya / 2 && (ya = 2 * a, h("Event throttle increased to " + ya + "ms"));
  }function J(a, b) {
    for (var c = b.length, d = 0, f = 0, g = e(a), i = Ha(), j = 0; c > j; j++) {
      d = b[j].getBoundingClientRect()[a] + H("margin" + g, b[j]), d > f && (f = d);
    }return i = Ha() - i, h("Parsed " + c + " HTML elements"), h("Element position calculated in " + i + "ms"), I(i), f;
  }function K(a) {
    return [a.bodyOffset(), a.bodyScroll(), a.documentElementOffset(), a.documentElementScroll()];
  }function L(a, b) {
    function c() {
      return i("No tagged elements (" + b + ") found on page"), ea;
    }var d = document.querySelectorAll("[" + b + "]");return 0 === d.length ? c() : J(a, d);
  }function M() {
    return document.querySelectorAll("body *");
  }function N(a, c, d, e) {
    function f() {
      ea = m, za = n, S(ea, za, a);
    }function g() {
      function a(a, b) {
        var c = Math.abs(a - b) <= va;return !c;
      }return m = b !== d ? d : Ia[ga](), n = b !== e ? e : Ja[Ba](), a(ea, m) || aa && a(za, n);
    }function i() {
      return !(a in { init: 1, interval: 1, size: 1 });
    }function j() {
      return ga in qa || aa && Ba in qa;
    }function k() {
      h("No change in size detected");
    }function l() {
      i() && j() ? R(c) : a in { interval: 1 } || k();
    }var m, n;g() || "init" === a ? (P(), f()) : l();
  }function O(a, b, c, d) {
    function e() {
      a in { reset: 1, resetPage: 1, init: 1 } || h("Trigger event: " + b);
    }function f() {
      return wa && a in ba;
    }f() ? h("Trigger event cancelled: " + a) : (e(), Ka(a, b, c, d));
  }function P() {
    wa || (wa = !0, h("Trigger event lock on")), clearTimeout(xa), xa = setTimeout(function () {
      wa = !1, h("Trigger event lock off"), h("--");
    }, ca);
  }function Q(a) {
    ea = Ia[ga](), za = Ja[Ba](), S(ea, za, a);
  }function R(a) {
    var b = ga;ga = fa, h("Reset trigger event: " + a), P(), Q("reset"), ga = b;
  }function S(a, c, d, e, f) {
    function g() {
      b === f ? f = ua : h("Message targetOrigin: " + f);
    }function i() {
      var g = a + ":" + c,
          i = pa + ":" + g + ":" + d + (b !== e ? ":" + e : "");h("Sending message to host page (" + i + ")"), ta.postMessage(na + i, f);
    }!0 === sa && (g(), i());
  }function T(b) {
    function d() {
      return na === ("" + b.data).substr(0, oa);
    }function e() {
      function d() {
        ia = b.data, ta = b.source, j(), da = !1, setTimeout(function () {
          ha = !1;
        }, ca);
      }document.body ? d() : (h("Waiting for page ready"), c(a, "readystatechange", e));
    }function f() {
      ha ? h("Page reset ignored by init") : (h("Page size reset by host page"), Q("resetPage"));
    }function g() {
      O("resizeParent", "Parent window requested size check");
    }function k() {
      var a = m();ja.findTarget(a);
    }function l() {
      return b.data.split("]")[1].split(":")[0];
    }function m() {
      return b.data.substr(b.data.indexOf(":") + 1);
    }function n() {
      return "iFrameResize" in a;
    }function o() {
      var a = m();h("MessageCallback called from parent: " + a), Da(JSON.parse(a)), h(" --");
    }function p() {
      var a = m();h("PageInfoFromParent called from parent: " + a), Fa(JSON.parse(a)), h(" --");
    }function q() {
      return b.data.split(":")[2] in { "true": 1, "false": 1 };
    }function r() {
      switch (l()) {case "reset":
          f();break;case "resize":
          g();break;case "inPageLink":case "moveToAnchor":
          k();break;case "message":
          o();break;case "pageInfo":
          p();break;default:
          n() || q() || i("Unexpected message (" + b.data + ")");}
    }function s() {
      !1 === da ? r() : q() ? e() : h('Ignored message of type "' + l() + '". Received before initialization.');
    }d() && s();
  }function U() {
    "loading" !== document.readyState && a.parent.postMessage("[iFrameResizerChild]Ready", "*");
  }var V = !0,
      W = 10,
      X = "",
      Y = 0,
      Z = "",
      $ = null,
      _ = "",
      aa = !1,
      ba = { resize: 1, click: 1 },
      ca = 128,
      da = !0,
      ea = 1,
      fa = "bodyOffset",
      ga = fa,
      ha = !0,
      ia = "",
      ja = {},
      ka = 32,
      la = null,
      ma = !1,
      na = "[iFrameSizer]",
      oa = na.length,
      pa = "",
      qa = { max: 1, min: 1, bodyScroll: 1, documentElementScroll: 1 },
      ra = "child",
      sa = !0,
      ta = a.parent,
      ua = "*",
      va = 0,
      wa = !1,
      xa = null,
      ya = 16,
      za = 1,
      Aa = "scroll",
      Ba = Aa,
      Ca = a,
      Da = function Da() {
    i("MessageCallback function not defined");
  },
      Ea = function Ea() {},
      Fa = function Fa() {},
      Ga = { height: function height() {
      return i("Custom height calculation function not defined"), document.documentElement.offsetHeight;
    }, width: function width() {
      return i("Custom width calculation function not defined"), document.body.scrollWidth;
    } },
      Ha = Date.now || function () {
    return new Date().getTime();
  },
      Ia = { bodyOffset: function bodyOffset() {
      return document.body.offsetHeight + H("marginTop") + H("marginBottom");
    }, offset: function offset() {
      return Ia.bodyOffset();
    }, bodyScroll: function bodyScroll() {
      return document.body.scrollHeight;
    }, custom: function custom() {
      return Ga.height();
    }, documentElementOffset: function documentElementOffset() {
      return document.documentElement.offsetHeight;
    }, documentElementScroll: function documentElementScroll() {
      return document.documentElement.scrollHeight;
    }, max: function max() {
      return Math.max.apply(null, K(Ia));
    }, min: function min() {
      return Math.min.apply(null, K(Ia));
    }, grow: function grow() {
      return Ia.max();
    }, lowestElement: function lowestElement() {
      return Math.max(Ia.bodyOffset(), J("bottom", M()));
    }, taggedElement: function taggedElement() {
      return L("bottom", "data-iframe-height");
    } },
      Ja = { bodyScroll: function bodyScroll() {
      return document.body.scrollWidth;
    }, bodyOffset: function bodyOffset() {
      return document.body.offsetWidth;
    }, custom: function custom() {
      return Ga.width();
    }, documentElementScroll: function documentElementScroll() {
      return document.documentElement.scrollWidth;
    }, documentElementOffset: function documentElementOffset() {
      return document.documentElement.offsetWidth;
    }, scroll: function scroll() {
      return Math.max(Ja.bodyScroll(), Ja.documentElementScroll());
    }, max: function max() {
      return Math.max.apply(null, K(Ja));
    }, min: function min() {
      return Math.min.apply(null, K(Ja));
    }, rightMostElement: function rightMostElement() {
      return J("right", M());
    }, taggedElement: function taggedElement() {
      return L("right", "data-iframe-width");
    } },
      Ka = f(N);c(a, "message", T), U();
}(window || {});


},{}],"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/bower_components/iframe-resizer/js/iframeResizer.min.js":[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/*! iFrame Resizer (iframeSizer.min.js ) - v3.5.5 - 2016-06-16
 *  Desc: Force cross domain iframes to size to content.
 *  Requires: iframeResizer.contentWindow.min.js to be loaded into the target frame.
 *  Copyright: (c) 2016 David J. Bradshaw - dave@bradshaw.net
 *  License: MIT
 */

!function (a) {
  "use strict";
  function b(b, c, d) {
    "addEventListener" in a ? b.addEventListener(c, d, !1) : "attachEvent" in a && b.attachEvent("on" + c, d);
  }function c(b, c, d) {
    "removeEventListener" in a ? b.removeEventListener(c, d, !1) : "detachEvent" in a && b.detachEvent("on" + c, d);
  }function d() {
    var b,
        c = ["moz", "webkit", "o", "ms"];for (b = 0; b < c.length && !N; b += 1) {
      N = a[c[b] + "RequestAnimationFrame"];
    }N || h("setup", "RequestAnimationFrame not supported");
  }function e(b) {
    var c = "Host page: " + b;return a.top !== a.self && (c = a.parentIFrame && a.parentIFrame.getId ? a.parentIFrame.getId() + ": " + b : "Nested host page: " + b), c;
  }function f(a) {
    return K + "[" + e(a) + "]";
  }function g(a) {
    return P[a] ? P[a].log : G;
  }function h(a, b) {
    k("log", a, b, g(a));
  }function i(a, b) {
    k("info", a, b, g(a));
  }function j(a, b) {
    k("warn", a, b, !0);
  }function k(b, c, d, e) {
    !0 === e && "object" == _typeof(a.console) && console[b](f(c), d);
  }function l(d) {
    function e() {
      function a() {
        s(V), p(W);
      }g("Height"), g("Width"), t(a, V, "init");
    }function f() {
      var a = U.substr(L).split(":");return { iframe: P[a[0]].iframe, id: a[0], height: a[1], width: a[2], type: a[3] };
    }function g(a) {
      var b = Number(P[W]["max" + a]),
          c = Number(P[W]["min" + a]),
          d = a.toLowerCase(),
          e = Number(V[d]);h(W, "Checking " + d + " is in range " + c + "-" + b), c > e && (e = c, h(W, "Set " + d + " to min value")), e > b && (e = b, h(W, "Set " + d + " to max value")), V[d] = "" + e;
    }function k() {
      function a() {
        function a() {
          var a = 0,
              d = !1;for (h(W, "Checking connection is from allowed list of origins: " + c); a < c.length; a++) {
            if (c[a] === b) {
              d = !0;break;
            }
          }return d;
        }function d() {
          var a = P[W].remoteHost;return h(W, "Checking connection is from: " + a), b === a;
        }return c.constructor === Array ? a() : d();
      }var b = d.origin,
          c = P[W].checkOrigin;if (c && "" + b != "null" && !a()) throw new Error("Unexpected message received from: " + b + " for " + V.iframe.id + ". Message was: " + d.data + ". This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains.");return !0;
    }function l() {
      return K === ("" + U).substr(0, L) && U.substr(L).split(":")[0] in P;
    }function w() {
      var a = V.type in { "true": 1, "false": 1, undefined: 1 };return a && h(W, "Ignoring init message from meta parent page"), a;
    }function y(a) {
      return U.substr(U.indexOf(":") + J + a);
    }function z(a) {
      h(W, "MessageCallback passed: {iframe: " + V.iframe.id + ", message: " + a + "}"), N("messageCallback", { iframe: V.iframe, message: JSON.parse(a) }), h(W, "--");
    }function A() {
      var b = document.body.getBoundingClientRect(),
          c = V.iframe.getBoundingClientRect();return JSON.stringify({ iframeHeight: c.height, iframeWidth: c.width, clientHeight: Math.max(document.documentElement.clientHeight, a.innerHeight || 0), clientWidth: Math.max(document.documentElement.clientWidth, a.innerWidth || 0), offsetTop: parseInt(c.top - b.top, 10), offsetLeft: parseInt(c.left - b.left, 10), scrollTop: a.pageYOffset, scrollLeft: a.pageXOffset });
    }function B(a, b) {
      function c() {
        u("Send Page Info", "pageInfo:" + A(), a, b);
      }x(c, 32);
    }function C() {
      function d(b, c) {
        function d() {
          P[g] ? B(P[g].iframe, g) : e();
        }["scroll", "resize"].forEach(function (e) {
          h(g, b + e + " listener for sendPageInfo"), c(a, e, d);
        });
      }function e() {
        d("Remove ", c);
      }function f() {
        d("Add ", b);
      }var g = W;f(), P[g].stopPageInfo = e;
    }function D() {
      P[W] && P[W].stopPageInfo && (P[W].stopPageInfo(), delete P[W].stopPageInfo);
    }function E() {
      var a = !0;return null === V.iframe && (j(W, "IFrame (" + V.id + ") not found"), a = !1), a;
    }function F(a) {
      var b = a.getBoundingClientRect();return o(W), { x: Math.floor(Number(b.left) + Number(M.x)), y: Math.floor(Number(b.top) + Number(M.y)) };
    }function G(b) {
      function c() {
        M = g, H(), h(W, "--");
      }function d() {
        return { x: Number(V.width) + f.x, y: Number(V.height) + f.y };
      }function e() {
        a.parentIFrame ? a.parentIFrame["scrollTo" + (b ? "Offset" : "")](g.x, g.y) : j(W, "Unable to scroll to requested position, window.parentIFrame not found");
      }var f = b ? F(V.iframe) : { x: 0, y: 0 },
          g = d();h(W, "Reposition requested from iFrame (offset x:" + f.x + " y:" + f.y + ")"), a.top !== a.self ? e() : c();
    }function H() {
      !1 !== N("scrollCallback", M) ? p(W) : q();
    }function I(b) {
      function c() {
        var a = F(g);h(W, "Moving to in page link (#" + e + ") at x: " + a.x + " y: " + a.y), M = { x: a.x, y: a.y }, H(), h(W, "--");
      }function d() {
        a.parentIFrame ? a.parentIFrame.moveToAnchor(e) : h(W, "In page link #" + e + " not found and window.parentIFrame not found");
      }var e = b.split("#")[1] || "",
          f = decodeURIComponent(e),
          g = document.getElementById(f) || document.getElementsByName(f)[0];g ? c() : a.top !== a.self ? d() : h(W, "In page link #" + e + " not found");
    }function N(a, b) {
      return m(W, a, b);
    }function O() {
      switch (P[W].firstRun && T(), V.type) {case "close":
          n(V.iframe);break;case "message":
          z(y(6));break;case "scrollTo":
          G(!1);break;case "scrollToOffset":
          G(!0);break;case "pageInfo":
          B(P[W].iframe, W), C();break;case "pageInfoStop":
          D();break;case "inPageLink":
          I(y(9));break;case "reset":
          r(V);break;case "init":
          e(), N("initCallback", V.iframe), N("resizedCallback", V);break;default:
          e(), N("resizedCallback", V);}
    }function Q(a) {
      var b = !0;return P[a] || (b = !1, j(V.type + " No settings for " + a + ". Message was: " + U)), b;
    }function S() {
      for (var a in P) {
        u("iFrame requested init", v(a), document.getElementById(a), a);
      }
    }function T() {
      P[W].firstRun = !1;
    }var U = d.data,
        V = {},
        W = null;"[iFrameResizerChild]Ready" === U ? S() : l() ? (V = f(), W = R = V.id, !w() && Q(W) && (h(W, "Received: " + U), E() && k() && O())) : i(W, "Ignored: " + U);
  }function m(a, b, c) {
    var d = null,
        e = null;if (P[a]) {
      if (d = P[a][b], "function" != typeof d) throw new TypeError(b + " on iFrame[" + a + "] is not a function");e = d(c);
    }return e;
  }function n(a) {
    var b = a.id;h(b, "Removing iFrame: " + b), a.parentNode.removeChild(a), m(b, "closedCallback", b), h(b, "--"), delete P[b];
  }function o(b) {
    null === M && (M = { x: void 0 !== a.pageXOffset ? a.pageXOffset : document.documentElement.scrollLeft, y: void 0 !== a.pageYOffset ? a.pageYOffset : document.documentElement.scrollTop }, h(b, "Get page position: " + M.x + "," + M.y));
  }function p(b) {
    null !== M && (a.scrollTo(M.x, M.y), h(b, "Set page position: " + M.x + "," + M.y), q());
  }function q() {
    M = null;
  }function r(a) {
    function b() {
      s(a), u("reset", "reset", a.iframe, a.id);
    }h(a.id, "Size reset requested by " + ("init" === a.type ? "host page" : "iFrame")), o(a.id), t(b, a, "reset");
  }function s(a) {
    function b(b) {
      a.iframe.style[b] = a[b] + "px", h(a.id, "IFrame (" + e + ") " + b + " set to " + a[b] + "px");
    }function c(b) {
      H || "0" !== a[b] || (H = !0, h(e, "Hidden iFrame detected, creating visibility listener"), y());
    }function d(a) {
      b(a), c(a);
    }var e = a.iframe.id;P[e] && (P[e].sizeHeight && d("height"), P[e].sizeWidth && d("width"));
  }function t(a, b, c) {
    c !== b.type && N ? (h(b.id, "Requesting animation frame"), N(a)) : a();
  }function u(a, b, c, d) {
    function e() {
      var e = P[d].targetOrigin;h(d, "[" + a + "] Sending msg to iframe[" + d + "] (" + b + ") targetOrigin: " + e), c.contentWindow.postMessage(K + b, e);
    }function f() {
      i(d, "[" + a + "] IFrame(" + d + ") not found"), P[d] && delete P[d];
    }function g() {
      c && "contentWindow" in c && null !== c.contentWindow ? e() : f();
    }d = d || c.id, P[d] && g();
  }function v(a) {
    return a + ":" + P[a].bodyMarginV1 + ":" + P[a].sizeWidth + ":" + P[a].log + ":" + P[a].interval + ":" + P[a].enablePublicMethods + ":" + P[a].autoResize + ":" + P[a].bodyMargin + ":" + P[a].heightCalculationMethod + ":" + P[a].bodyBackground + ":" + P[a].bodyPadding + ":" + P[a].tolerance + ":" + P[a].inPageLinks + ":" + P[a].resizeFrom + ":" + P[a].widthCalculationMethod;
  }function w(a, c) {
    function d() {
      function b(b) {
        1 / 0 !== P[w][b] && 0 !== P[w][b] && (a.style[b] = P[w][b] + "px", h(w, "Set " + b + " = " + P[w][b] + "px"));
      }function c(a) {
        if (P[w]["min" + a] > P[w]["max" + a]) throw new Error("Value for min" + a + " can not be greater than max" + a);
      }c("Height"), c("Width"), b("maxHeight"), b("minHeight"), b("maxWidth"), b("minWidth");
    }function e() {
      var a = c && c.id || S.id + F++;return null !== document.getElementById(a) && (a += F++), a;
    }function f(b) {
      return R = b, "" === b && (a.id = b = e(), G = (c || {}).log, R = b, h(b, "Added missing iframe ID: " + b + " (" + a.src + ")")), b;
    }function g() {
      h(w, "IFrame scrolling " + (P[w].scrolling ? "enabled" : "disabled") + " for " + w), a.style.overflow = !1 === P[w].scrolling ? "hidden" : "auto", a.scrolling = !1 === P[w].scrolling ? "no" : "yes";
    }function i() {
      ("number" == typeof P[w].bodyMargin || "0" === P[w].bodyMargin) && (P[w].bodyMarginV1 = P[w].bodyMargin, P[w].bodyMargin = "" + P[w].bodyMargin + "px");
    }function k() {
      var b = P[w].firstRun,
          c = P[w].heightCalculationMethod in O;!b && c && r({ iframe: a, height: 0, width: 0, type: "init" });
    }function l() {
      Function.prototype.bind && (P[w].iframe.iFrameResizer = { close: n.bind(null, P[w].iframe), resize: u.bind(null, "Window resize", "resize", P[w].iframe), moveToAnchor: function moveToAnchor(a) {
          u("Move to anchor", "moveToAnchor:" + a, P[w].iframe, w);
        }, sendMessage: function sendMessage(a) {
          a = JSON.stringify(a), u("Send Message", "message:" + a, P[w].iframe, w);
        } });
    }function m(c) {
      function d() {
        u("iFrame.onload", c, a), k();
      }b(a, "load", d), u("init", c, a);
    }function o(a) {
      if ("object" != (typeof a === "undefined" ? "undefined" : _typeof(a))) throw new TypeError("Options is not an object");
    }function p(a) {
      for (var b in S) {
        S.hasOwnProperty(b) && (P[w][b] = a.hasOwnProperty(b) ? a[b] : S[b]);
      }
    }function q(a) {
      return "" === a || "file://" === a ? "*" : a;
    }function s(b) {
      b = b || {}, P[w] = { firstRun: !0, iframe: a, remoteHost: a.src.split("/").slice(0, 3).join("/") }, o(b), p(b), P[w].targetOrigin = !0 === P[w].checkOrigin ? q(P[w].remoteHost) : "*";
    }function t() {
      return w in P && "iFrameResizer" in a;
    }var w = f(a.id);t() ? j(w, "Ignored iFrame, already setup.") : (s(c), g(), d(), i(), m(v(w)), l());
  }function x(a, b) {
    null === Q && (Q = setTimeout(function () {
      Q = null, a();
    }, b));
  }function y() {
    function b() {
      function a(a) {
        function b(b) {
          return "0px" === P[a].iframe.style[b];
        }function c(a) {
          return null !== a.offsetParent;
        }c(P[a].iframe) && (b("height") || b("width")) && u("Visibility change", "resize", P[a].iframe, a);
      }for (var b in P) {
        a(b);
      }
    }function c(a) {
      h("window", "Mutation observed: " + a[0].target + " " + a[0].type), x(b, 16);
    }function d() {
      var a = document.querySelector("body"),
          b = { attributes: !0, attributeOldValue: !1, characterData: !0, characterDataOldValue: !1, childList: !0, subtree: !0 },
          d = new e(c);d.observe(a, b);
    }var e = a.MutationObserver || a.WebKitMutationObserver;e && d();
  }function z(a) {
    function b() {
      B("Window " + a, "resize");
    }h("window", "Trigger event: " + a), x(b, 16);
  }function A() {
    function a() {
      B("Tab Visable", "resize");
    }"hidden" !== document.visibilityState && (h("document", "Trigger event: Visiblity change"), x(a, 16));
  }function B(a, b) {
    function c(a) {
      return "parent" === P[a].resizeFrom && P[a].autoResize && !P[a].firstRun;
    }for (var d in P) {
      c(d) && u(a, b, document.getElementById(d), d);
    }
  }function C() {
    b(a, "message", l), b(a, "resize", function () {
      z("resize");
    }), b(document, "visibilitychange", A), b(document, "-webkit-visibilitychange", A), b(a, "focusin", function () {
      z("focus");
    }), b(a, "focus", function () {
      z("focus");
    });
  }function D() {
    function a(a, c) {
      function d() {
        if (!c.tagName) throw new TypeError("Object is not a valid DOM element");if ("IFRAME" !== c.tagName.toUpperCase()) throw new TypeError("Expected <IFRAME> tag, found <" + c.tagName + ">");
      }c && (d(), w(c, a), b.push(c));
    }var b;return d(), C(), function (c, d) {
      switch (b = [], typeof d === "undefined" ? "undefined" : _typeof(d)) {case "undefined":case "string":
          Array.prototype.forEach.call(document.querySelectorAll(d || "iframe"), a.bind(void 0, c));break;case "object":
          a(c, d);break;default:
          throw new TypeError("Unexpected data type (" + (typeof d === "undefined" ? "undefined" : _typeof(d)) + ")");}return b;
    };
  }function E(a) {
    a.fn ? a.fn.iFrameResize = function (a) {
      function b(b, c) {
        w(c, a);
      }return this.filter("iframe").each(b).end();
    } : i("", "Unable to bind to jQuery, it is not fully loaded.");
  }var F = 0,
      G = !1,
      H = !1,
      I = "message",
      J = I.length,
      K = "[iFrameSizer]",
      L = K.length,
      M = null,
      N = a.requestAnimationFrame,
      O = { max: 1, scroll: 1, bodyScroll: 1, documentElementScroll: 1 },
      P = {},
      Q = null,
      R = "Host Page",
      S = { autoResize: !0, bodyBackground: null, bodyMargin: null, bodyMarginV1: 8, bodyPadding: null, checkOrigin: !0, inPageLinks: !1, enablePublicMethods: !0, heightCalculationMethod: "bodyOffset", id: "iFrameResizer", interval: 32, log: !1, maxHeight: 1 / 0, maxWidth: 1 / 0, minHeight: 0, minWidth: 0, resizeFrom: "parent", scrolling: !1, sizeHeight: !0, sizeWidth: !1, tolerance: 0, widthCalculationMethod: "scroll", closedCallback: function closedCallback() {}, initCallback: function initCallback() {}, messageCallback: function messageCallback() {
      j("MessageCallback function not defined");
    }, resizedCallback: function resizedCallback() {}, scrollCallback: function scrollCallback() {
      return !0;
    } };a.jQuery && E(jQuery), "function" == typeof define && define.amd ? define([], D) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = D() : a.iFrameResize = a.iFrameResize || D();
}(window || {});


},{}],"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/guide/guide.boot.js":[function(require,module,exports){
'use strict';

//Show and hide the spinner for all ajax requests.

module.exports = function () {

  var initModule;

  initModule = function initModule() {
    $(document).ajaxStart(function () {
      $("#ajax-spinner").show();
    }).ajaxStop(function () {
      $("#ajax-spinner").hide();
    });
  };

  return { initModule: initModule };
}();

},{}],"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/guide/guide.efetch_panel.jsx":[function(require,module,exports){
'use strict';

module.exports = function () {

  var PanelGroup = React.createClass({
    displayName: 'PanelGroup',

    loadArticleSets: function loadArticleSets() {
      var self = this,
          endpoint = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&rettype=abstract&id=",
          deferreds = [],
          recombined = [];

      // Populate the array of ajax deferred objects + metadata
      $.each(this.props.input, function (index, value) {

        // Protect against missing data fields
        var uid_list = value.uids || [],
            category = value.category || '';

        // This will hang if value.x is null
        deferreds.push({
          deferred: $.ajax({
            type: "GET",
            url: endpoint + uid_list.join(','),
            cache: false,
            dataType: "xml"
          }),
          index: index,
          category: category
        });
      });

      // function qNext
      // Process the deferred objects array serially
      function qNext() {
        var o = deferreds.shift(); //remove first element
        if (o) {
          o.deferred.done(function (xml, textStatus, jqXHR) {
            recombined.push({
              xml: xml,
              category: o.category,
              index: o.index
            });
            self.setState({ data: recombined });
            qNext();
          });
        }
      }

      // Populate the panel serially
      qNext();
    },
    getInitialState: function getInitialState() {
      return { data: [] };
    },
    // Here, componentDidMount is a method called automatically by React after
    // a component is rendered for the first time.
    componentDidMount: function componentDidMount() {
      this.loadArticleSets();
    },
    render: function render() {
      var self = this,
          styles = {
        category: {
          marginTop: '3em'
        }
      },
          panelNodes = this.state.data.map(function (value, i) {
        var subpanel = $(value.xml).find("PubmedArticle").map(function (j, article) {
          var d = Date.now();
          return React.createElement(PanelGroup.Panel, { data: article, id: ['identifier', i, j, d].join('-'), key: j });
        });

        return React.createElement(
          'div',
          { className: 'subpanel', key: i },
          function () {
            if (value.category) {
              var name = String(value.category).replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '').replace(/\s/g, '');
              return React.createElement(
                'a',
                { href: ["#", name].join(''), name: name },
                React.createElement(
                  'h3',
                  { style: styles.category, className: 'category' },
                  value.category
                )
              );
            }
          }(),
          subpanel
        );
      });
      return React.createElement(
        'div',
        { className: 'panel-group', id: 'accordion', role: 'tablist' },
        panelNodes
      );
    }
  });

  PanelGroup.Panel = React.createClass({
    displayName: 'Panel',

    rawMarkup: function rawMarkup(html) {
      return { __html: html };
    },
    render: function render() {

      var $pubmedArticle, $pmcID, $medlineCitation, $pmid, $article, $articleTitle, $abstractText, $author, $authorfirst, $authorlast, $collectiveName, authorText, $meshdescriptor, $journal, $journalVolume, $journalYear, $journalISOAbbreviation;

      // Find the required XML elements
      $pubmedArticle = $(this.props.data);
      $medlineCitation = $pubmedArticle.find('MedlineCitation');

      // link info
      $pmid = $medlineCitation.children('PMID');
      $pmcID = $pubmedArticle.find('PubmedData ArticleIdList ArticleId[IdType="pmc"]');

      //Article
      $article = $medlineCitation.find('Article');
      $articleTitle = $article.find('ArticleTitle');
      $abstractText = $article.find('Abstract AbstractText'); //could be an array
      //AuthorList
      $author = $pubmedArticle.find('AuthorList Author').first(); // could be <CollectiveName>
      $authorfirst = $author.find('ForeName');
      $authorlast = $author.find('LastName');
      $collectiveName = $author.find('CollectiveName');
      authorText = $authorlast.text() ? [$authorlast.text(), $authorfirst.text()[0]].join(' ') : $collectiveName.text();

      //MeshHeadingList - add up to 10 terms
      $meshdescriptor = $medlineCitation.find('MeshHeadingList MeshHeading DescriptorName');

      //JournalIssue
      $journal = $article.find('Journal');
      $journalVolume = $journal.find('JournalIssue Volume');
      $journalYear = $journal.find('JournalIssue PubDate Year');
      //Dumb edge case
      if (!$journalYear.text()) {
        $journalYear = $journal.find('JournalIssue PubDate MedlineDate');
      }
      $journalISOAbbreviation = $journal.find('ISOAbbreviation');

      // Article info
      var articleJournal = [$journalISOAbbreviation.text(), "vol. " + $journalVolume.text(), "(" + $journalYear.text() + ")"].join(' ');

      // abstract text - could be an array
      var abstract = $abstractText.map(function () {
        return [$(this).attr('Label'), $(this).text(), '<br/>'].join('<br/>');
      }).get().join('');

      // Mesh Heading badges
      var meshes = $meshdescriptor.slice(0, 5).map(function () {
        return ['<span class="badge">', $(this).text(), '</span>'].join('');
      }).get().join('');

      var styles = {
        panel: {
          a: {
            textDecoration: 'none'
          },
          panelHeading: {
            div: {
              padding: '0.8em',
              background: '#34495e',
              color: '#ecf0f1'
            },
            panelTitle: {
              fontSize: '1.2rem'
            },
            panelMeta: {
              color: '#95a5a6'
            },
            badge: {
              fontWeight: '200'
            }
          }
        }
      };

      return React.createElement(
        'div',
        { className: 'panel' },
        React.createElement(
          'a',
          { style: styles.panel.a, className: 'panel-toggle', href: ["#", this.props.id].join(''), role: 'button', 'data-toggle': 'collapse', 'data-parent': '#accordion' },
          React.createElement(
            'div',
            { style: styles.panel.panelHeading.div, className: 'reading-list panel-heading', role: 'tab', id: 'headingOne' },
            React.createElement(
              'h2',
              { style: styles.panel.panelHeading.panelTitle, className: 'panel-title' },
              $articleTitle.text()
            ),
            React.createElement(
              'span',
              { style: styles.panel.panelHeading.panelMeta, className: 'panel-meta author' },
              authorText
            ),
            React.createElement('br', null),
            React.createElement(
              'span',
              { style: styles.panel.panelHeading.panelMeta, className: 'panel-meta journal' },
              articleJournal
            ),
            React.createElement('div', { style: styles.panel.panelHeading.badge, className: 'panel-meta reading-list badge-list', dangerouslySetInnerHTML: this.rawMarkup(meshes) })
          )
        ),
        React.createElement(
          'div',
          { id: this.props.id, className: 'panel-collapse collapse', role: 'tabpanel' },
          React.createElement(
            'div',
            { className: 'panel-body' },
            React.createElement('p', { className: 'abstract-text', dangerouslySetInnerHTML: this.rawMarkup(abstract) }),
            function () {
              var record;
              if ($pmcID.text()) {

                record = React.createElement(
                  'a',
                  { style: styles.panel.a, className: 'article-link', target: '_blank', href: ["http://www.ncbi.nlm.nih.gov/pmc/", $pmcID.text()].join('') },
                  React.createElement('i', { className: 'fa fa-link fa-lg' }),
                  [" PubMed Central: ", $pmcID.text()].join('')
                );
              } else {
                record = React.createElement(
                  'a',
                  { style: styles.panel.a, className: 'article-link', target: '_blank', href: ["http://www.ncbi.nlm.nih.gov/pubmed/", $pmid.text()].join('') },
                  React.createElement('i', { className: 'fa fa-link fa-lg' }),
                  [" PubMed: ", $pmid.text()].join('')
                );
              }
              return record;
            }()
          )
        )
      );
    }
  });

  var initModule = function initModule() {
    $('.panel_group').each(function (element, index) {

      var $target = $(this),
          pagedata = $target.data('page'),
          inline = $target.data('inline'),
          input = [];

      if (pagedata) {
        input = pagedata;
      } else if (inline) {
        input = [{ category: '', uids: [inline] }];
      }

      ReactDOM.render(React.createElement(PanelGroup, { input: input }), $target[0]);
    });
  };

  return { initModule: initModule };
}();

},{}],"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/guide/guide.js":[function(require,module,exports){
'use strict';

var boot = require('./guide.boot.js');
var efetch_panel = require('./guide.efetch_panel.jsx');
var progress_tracker = require('./guide.progress_tracker.js');

var guide = function () {

  var initModule;

  initModule = function initModule() {
    boot.initModule();
    efetch_panel.initModule();
    progress_tracker.initModule();
  };

  return { initModule: initModule };
}();

module.exports = guide;

},{"./guide.boot.js":"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/guide/guide.boot.js","./guide.efetch_panel.jsx":"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/guide/guide.efetch_panel.jsx","./guide.progress_tracker.js":"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/guide/guide.progress_tracker.js"}],"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/guide/guide.progress_tracker.js":[function(require,module,exports){
'use strict';

require('../../bower_components/iframe-resizer/js/iframeResizer.min.js');

// Populate the progress tracker wrapper content
module.exports = function () {

	var configMap = {
		panel_html_template: '<div class="panel panel-primary">' + '<div class="panel-heading">' + '<a style="display: none;" id="panel-heading-link" href="#" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> Open in separate window</a>' + '</div>' + '<div class="panel-body">' + '<iframe id="panel-frame" src="" width="100%" frameBorder="0" scrolling="no" ></iframe>' + '</div>' + '<a href="#top"><div style="display: none;" id="panel-footer">Top</div></a>' + '</div>'
	},
	    jQueryMap = {
		$progress_tracker_wrapper: undefined,
		$progress_tracker_steps: undefined,
		$progress_tracker_content: undefined,
		$panel: undefined,
		$panel_heading_link: undefined,
		$panel_footer: undefined
	},
	    initModule,
	    setListeners;

	setListeners = function setListeners() {
		jQueryMap.$progress_tracker_steps.click(function (event) {
			var self = $(this);
			event.preventDefault();
			// Set the list element state
			self.addClass('is-complete');
			// Retrieve the url
			var url = self.find('.progress-tracker-link').attr('href');
			// set the $panel iframe src and heading link url
			jQueryMap.$panel_heading_link.attr('href', url).css('display', 'block');
			jQueryMap.$panel_footer.css('display', 'block');
			jQueryMap.$panel_frame.attr('src', url);

			//External library Iframe-resizer
			jQueryMap.$panel_frame.iFrameResize();
		});
	};

	initModule = function initModule() {
		jQueryMap.$progress_tracker_wrapper = $('.progress-tracker-wrapper');
		jQueryMap.$progress_tracker_steps = jQueryMap.$progress_tracker_wrapper.find('.progress-step');
		jQueryMap.$progress_tracker_content = jQueryMap.$progress_tracker_wrapper.find('#progress-tracker-content');
		jQueryMap.$panel = $($.parseHTML(configMap.panel_html_template));
		jQueryMap.$progress_tracker_content.html(jQueryMap.$panel.html());
		jQueryMap.$panel_heading_link = jQueryMap.$progress_tracker_content.find('#panel-heading-link');
		jQueryMap.$panel_frame = jQueryMap.$progress_tracker_content.find('#panel-frame');
		jQueryMap.$panel_footer = jQueryMap.$progress_tracker_content.find('#panel-footer');
		setListeners();
		return true;
	};

	return { initModule: initModule };
}();

},{"../../bower_components/iframe-resizer/js/iframeResizer.min.js":"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/bower_components/iframe-resizer/js/iframeResizer.min.js"}],"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/main.js":[function(require,module,exports){
'use strict';

var guide = require('./guide/guide.js');

jQuery(document).ready(function () {
  guide.initModule();
});

},{"./guide/guide.js":"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/guide/guide.js"}]},{},["/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/main.js","/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/bower_components/gist-embed/gist-embed.min.js","/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/bower_components/iframe-resizer/js/iframeResizer.contentWindow.min.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJndWlkZS9zcmMvYm93ZXJfY29tcG9uZW50cy9naXN0LWVtYmVkL2dpc3QtZW1iZWQubWluLmpzIiwiZ3VpZGUvc3JjL2Jvd2VyX2NvbXBvbmVudHMvaWZyYW1lLXJlc2l6ZXIvanMvaWZyYW1lUmVzaXplci5jb250ZW50V2luZG93Lm1pbi5qcyIsImd1aWRlL3NyYy9ib3dlcl9jb21wb25lbnRzL2lmcmFtZS1yZXNpemVyL2pzL2lmcmFtZVJlc2l6ZXIubWluLmpzIiwiZ3VpZGUvc3JjL2pzL2d1aWRlL2d1aWRlLmJvb3QuanMiLCJndWlkZS9zcmMvanMvZ3VpZGUvZ3VpZGUuZWZldGNoX3BhbmVsLmpzeCIsImd1aWRlL3NyYy9qcy9ndWlkZS9ndWlkZS5qcyIsImd1aWRlL3NyYy9qcy9ndWlkZS9ndWlkZS5wcm9ncmVzc190cmFja2VyLmpzIiwiZ3VpZGUvc3JjL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLENBQUMsVUFBUyxDQUFULEVBQVc7QUFBQztBQUFhLFdBQVMsQ0FBVCxDQUFXLENBQVgsRUFBYTtBQUFDLFFBQUksQ0FBSjtBQUFBLFFBQU0sQ0FBTjtBQUFBLFFBQVEsSUFBRSxFQUFWLENBQWEsSUFBRyxZQUFVLE9BQU8sQ0FBcEIsRUFBc0IsRUFBRSxJQUFGLENBQU8sQ0FBUCxFQUF0QixLQUFvQztBQUFDLFVBQUUsRUFBRSxLQUFGLENBQVEsR0FBUixDQUFGLENBQWUsS0FBSSxJQUFJLElBQUUsQ0FBVixFQUFZLElBQUUsRUFBRSxNQUFoQixFQUF1QixHQUF2QjtBQUEyQixZQUFHLElBQUUsRUFBRSxDQUFGLEVBQUssS0FBTCxDQUFXLEdBQVgsQ0FBRixFQUFrQixNQUFJLEVBQUUsTUFBM0IsRUFBa0MsS0FBSSxJQUFJLElBQUUsU0FBUyxFQUFFLENBQUYsQ0FBVCxFQUFjLEVBQWQsQ0FB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UUFBUSxrQkFBUixDQUFaOztBQUVBLE9BQU8sUUFBUCxFQUFpQixLQUFqQixDQUF1QixZQUFVO0FBQy9CLFFBQU0sVUFBTjtBQUNELENBRkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiIWZ1bmN0aW9uKGEpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGIoYSl7dmFyIGMsZCxiPVtdO2lmKFwibnVtYmVyXCI9PXR5cGVvZiBhKWIucHVzaChhKTtlbHNle2Q9YS5zcGxpdChcIixcIik7Zm9yKHZhciBlPTA7ZTxkLmxlbmd0aDtlKyspaWYoYz1kW2VdLnNwbGl0KFwiLVwiKSwyPT09Yy5sZW5ndGgpZm9yKHZhciBmPXBhcnNlSW50KGNbMF0sMTApO2Y8PWNbMV07ZisrKWIucHVzaChmKTtlbHNlIDE9PT1jLmxlbmd0aCYmYi5wdXNoKHBhcnNlSW50KGNbMF0sMTApKX1yZXR1cm4gYn1hLmZuLmdpc3Q9ZnVuY3Rpb24oYyl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBlLGYsZyxoLGksaixrLGwsbSxuLGQ9YSh0aGlzKSxvPXt9O3JldHVybiBkLmNzcyhcImRpc3BsYXlcIixcImJsb2NrXCIpLGU9ZC5kYXRhKFwiZ2lzdC1pZFwiKXx8XCJcIixnPWQuZGF0YShcImdpc3QtZmlsZVwiKSxrPWQuZGF0YShcImdpc3QtaGlkZS1mb290ZXJcIik9PT0hMCxsPWQuZGF0YShcImdpc3QtaGlkZS1saW5lLW51bWJlcnNcIik9PT0hMCxoPWQuZGF0YShcImdpc3QtbGluZVwiKSxqPWQuZGF0YShcImdpc3QtaGlnaGxpZ2h0LWxpbmVcIiksbj1kLmRhdGEoXCJnaXN0LXNob3ctc3Bpbm5lclwiKT09PSEwLG09bj8hMTp2b2lkIDAhPT1kLmRhdGEoXCJnaXN0LXNob3ctbG9hZGluZ1wiKT9kLmRhdGEoXCJnaXN0LXNob3ctbG9hZGluZ1wiKTohMCxnJiYoby5maWxlPWcpLGU/KGY9XCJodHRwczovL2dpc3QuZ2l0aHViLmNvbS9cIitlK1wiLmpzb25cIixpPVwiTG9hZGluZyBnaXN0IFwiK2YrKG8uZmlsZT9cIiwgZmlsZTogXCIrby5maWxlOlwiXCIpK1wiLi4uXCIsbSYmZC5odG1sKGkpLG4mJmQuaHRtbCgnPGltZyBzdHlsZT1cImRpc3BsYXk6YmxvY2s7bWFyZ2luLWxlZnQ6YXV0bzttYXJnaW4tcmlnaHQ6YXV0b1wiICBhbHQ9XCInK2krJ1wiIHNyYz1cImh0dHBzOi8vYXNzZXRzLWNkbi5naXRodWIuY29tL2ltYWdlcy9zcGlubmVycy9vY3RvY2F0LXNwaW5uZXItMzIuZ2lmXCI+Jyksdm9pZCBhLmFqYXgoe3VybDpmLGRhdGE6byxkYXRhVHlwZTpcImpzb25wXCIsdGltZW91dDoyZTQsc3VjY2VzczpmdW5jdGlvbihjKXt2YXIgZSxnLGksbSxuO2MmJmMuZGl2PyhjLnN0eWxlc2hlZXQmJigwPT09Yy5zdHlsZXNoZWV0LmluZGV4T2YoXCI8bGlua1wiKT9jLnN0eWxlc2hlZXQ9Yy5zdHlsZXNoZWV0LnJlcGxhY2UoL1xcXFwvZyxcIlwiKS5tYXRjaCgvaHJlZj1cXFwiKFteXFxzXSopXFxcIi8pWzFdOjAhPT1jLnN0eWxlc2hlZXQuaW5kZXhPZihcImh0dHBcIikmJigwIT09Yy5zdHlsZXNoZWV0LmluZGV4T2YoXCIvXCIpJiYoYy5zdHlsZXNoZWV0PVwiL1wiK2Muc3R5bGVzaGVldCksYy5zdHlsZXNoZWV0PVwiaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb21cIitjLnN0eWxlc2hlZXQpKSxjLnN0eWxlc2hlZXQmJjA9PT1hKCdsaW5rW2hyZWY9XCInK2Muc3R5bGVzaGVldCsnXCJdJykubGVuZ3RoJiYoZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKSxnPWRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXSxlLnR5cGU9XCJ0ZXh0L2Nzc1wiLGUucmVsPVwic3R5bGVzaGVldFwiLGUuaHJlZj1jLnN0eWxlc2hlZXQsZy5pbnNlcnRCZWZvcmUoZSxnLmZpcnN0Q2hpbGQpKSxuPWEoYy5kaXYpLG4ucmVtb3ZlQXR0cihcImlkXCIpLGQuaHRtbChcIlwiKS5hcHBlbmQobiksaiYmKG09YihqKSxuLmZpbmQoXCJ0ZC5saW5lLWRhdGFcIikuY3NzKHt3aWR0aDpcIjEwMCVcIn0pLG4uZmluZChcIi5qcy1maWxlLWxpbmVcIikuZWFjaChmdW5jdGlvbihiKXstMSE9PWEuaW5BcnJheShiKzEsbSkmJmEodGhpcykuY3NzKHtcImJhY2tncm91bmQtY29sb3JcIjpcInJnYigyNTUsIDI1NSwgMjA0KVwifSl9KSksaCYmKGk9YihoKSxuLmZpbmQoXCIuanMtZmlsZS1saW5lXCIpLmVhY2goZnVuY3Rpb24oYil7LTE9PT1hLmluQXJyYXkoYisxLGkpJiZhKHRoaXMpLnBhcmVudCgpLnJlbW92ZSgpfSkpLGsmJihuLmZpbmQoXCIuZ2lzdC1tZXRhXCIpLnJlbW92ZSgpLG4uZmluZChcIi5naXN0LWRhdGFcIikuY3NzKFwiYm9yZGVyLWJvdHRvbVwiLFwiMHB4XCIpLG4uZmluZChcIi5naXN0LWZpbGVcIikuY3NzKFwiYm9yZGVyLWJvdHRvbVwiLFwiMXB4IHNvbGlkICNkZGRcIikpLGwmJm4uZmluZChcIi5qcy1saW5lLW51bWJlclwiKS5yZW1vdmUoKSk6ZC5odG1sKFwiRmFpbGVkIGxvYWRpbmcgZ2lzdCBcIitmKX0sZXJyb3I6ZnVuY3Rpb24oYSxiKXtkLmh0bWwoXCJGYWlsZWQgbG9hZGluZyBnaXN0IFwiK2YrXCI6IFwiK2IpfSxjb21wbGV0ZTpmdW5jdGlvbigpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGMmJmMoKX19KSk6ITF9KX0sYShmdW5jdGlvbigpe2EoXCJbZGF0YS1naXN0LWlkXVwiKS5naXN0KCl9KX0oalF1ZXJ5KTtcbiIsIi8qISBpRnJhbWUgUmVzaXplciAoaWZyYW1lU2l6ZXIuY29udGVudFdpbmRvdy5taW4uanMpIC0gdjMuNS41IC0gMjAxNi0wNi0xNlxuICogIERlc2M6IEluY2x1ZGUgdGhpcyBmaWxlIGluIGFueSBwYWdlIGJlaW5nIGxvYWRlZCBpbnRvIGFuIGlmcmFtZVxuICogICAgICAgIHRvIGZvcmNlIHRoZSBpZnJhbWUgdG8gcmVzaXplIHRvIHRoZSBjb250ZW50IHNpemUuXG4gKiAgUmVxdWlyZXM6IGlmcmFtZVJlc2l6ZXIubWluLmpzIG9uIGhvc3QgcGFnZS5cbiAqICBDb3B5cmlnaHQ6IChjKSAyMDE2IERhdmlkIEouIEJyYWRzaGF3IC0gZGF2ZUBicmFkc2hhdy5uZXRcbiAqICBMaWNlbnNlOiBNSVRcbiAqL1xuXG4hZnVuY3Rpb24oYSxiKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBjKGIsYyxkKXtcImFkZEV2ZW50TGlzdGVuZXJcImluIGE/Yi5hZGRFdmVudExpc3RlbmVyKGMsZCwhMSk6XCJhdHRhY2hFdmVudFwiaW4gYSYmYi5hdHRhY2hFdmVudChcIm9uXCIrYyxkKX1mdW5jdGlvbiBkKGIsYyxkKXtcInJlbW92ZUV2ZW50TGlzdGVuZXJcImluIGE/Yi5yZW1vdmVFdmVudExpc3RlbmVyKGMsZCwhMSk6XCJkZXRhY2hFdmVudFwiaW4gYSYmYi5kZXRhY2hFdmVudChcIm9uXCIrYyxkKX1mdW5jdGlvbiBlKGEpe3JldHVybiBhLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK2Euc2xpY2UoMSl9ZnVuY3Rpb24gZihhKXt2YXIgYixjLGQsZT1udWxsLGY9MCxnPWZ1bmN0aW9uKCl7Zj1IYSgpLGU9bnVsbCxkPWEuYXBwbHkoYixjKSxlfHwoYj1jPW51bGwpfTtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgaD1IYSgpO2Z8fChmPWgpO3ZhciBpPXlhLShoLWYpO3JldHVybiBiPXRoaXMsYz1hcmd1bWVudHMsMD49aXx8aT55YT8oZSYmKGNsZWFyVGltZW91dChlKSxlPW51bGwpLGY9aCxkPWEuYXBwbHkoYixjKSxlfHwoYj1jPW51bGwpKTplfHwoZT1zZXRUaW1lb3V0KGcsaSkpLGR9fWZ1bmN0aW9uIGcoYSl7cmV0dXJuIG5hK1wiW1wiK3BhK1wiXSBcIithfWZ1bmN0aW9uIGgoYil7bWEmJlwib2JqZWN0XCI9PXR5cGVvZiBhLmNvbnNvbGUmJmNvbnNvbGUubG9nKGcoYikpfWZ1bmN0aW9uIGkoYil7XCJvYmplY3RcIj09dHlwZW9mIGEuY29uc29sZSYmY29uc29sZS53YXJuKGcoYikpfWZ1bmN0aW9uIGooKXtrKCksaChcIkluaXRpYWxpc2luZyBpRnJhbWUgKFwiK2xvY2F0aW9uLmhyZWYrXCIpXCIpLGwoKSxvKCksbihcImJhY2tncm91bmRcIixYKSxuKFwicGFkZGluZ1wiLF8pLEIoKSx0KCksdSgpLHAoKSxEKCksdigpLGphPUMoKSxPKFwiaW5pdFwiLFwiSW5pdCBtZXNzYWdlIGZyb20gaG9zdCBwYWdlXCIpLEVhKCl9ZnVuY3Rpb24gaygpe2Z1bmN0aW9uIGEoYSl7cmV0dXJuXCJ0cnVlXCI9PT1hPyEwOiExfXZhciBjPWlhLnN1YnN0cihvYSkuc3BsaXQoXCI6XCIpO3BhPWNbMF0sWT1iIT09Y1sxXT9OdW1iZXIoY1sxXSk6WSxhYT1iIT09Y1syXT9hKGNbMl0pOmFhLG1hPWIhPT1jWzNdP2EoY1szXSk6bWEsa2E9YiE9PWNbNF0/TnVtYmVyKGNbNF0pOmthLFY9YiE9PWNbNl0/YShjWzZdKTpWLFo9Y1s3XSxnYT1iIT09Y1s4XT9jWzhdOmdhLFg9Y1s5XSxfPWNbMTBdLHZhPWIhPT1jWzExXT9OdW1iZXIoY1sxMV0pOnZhLGphLmVuYWJsZT1iIT09Y1sxMl0/YShjWzEyXSk6ITEscmE9YiE9PWNbMTNdP2NbMTNdOnJhLEJhPWIhPT1jWzE0XT9jWzE0XTpCYX1mdW5jdGlvbiBsKCl7ZnVuY3Rpb24gYigpe3ZhciBiPWEuaUZyYW1lUmVzaXplcjtoKFwiUmVhZGluZyBkYXRhIGZyb20gcGFnZTogXCIrSlNPTi5zdHJpbmdpZnkoYikpLERhPVwibWVzc2FnZUNhbGxiYWNrXCJpbiBiP2IubWVzc2FnZUNhbGxiYWNrOkRhLEVhPVwicmVhZHlDYWxsYmFja1wiaW4gYj9iLnJlYWR5Q2FsbGJhY2s6RWEsdWE9XCJ0YXJnZXRPcmlnaW5cImluIGI/Yi50YXJnZXRPcmlnaW46dWEsZ2E9XCJoZWlnaHRDYWxjdWxhdGlvbk1ldGhvZFwiaW4gYj9iLmhlaWdodENhbGN1bGF0aW9uTWV0aG9kOmdhLEJhPVwid2lkdGhDYWxjdWxhdGlvbk1ldGhvZFwiaW4gYj9iLndpZHRoQ2FsY3VsYXRpb25NZXRob2Q6QmF9ZnVuY3Rpb24gYyhhLGIpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIGEmJihoKFwiU2V0dXAgY3VzdG9tIFwiK2IrXCJDYWxjTWV0aG9kXCIpLEdhW2JdPWEsYT1cImN1c3RvbVwiKSxhfVwiaUZyYW1lUmVzaXplclwiaW4gYSYmT2JqZWN0PT09YS5pRnJhbWVSZXNpemVyLmNvbnN0cnVjdG9yJiYoYigpLGdhPWMoZ2EsXCJoZWlnaHRcIiksQmE9YyhCYSxcIndpZHRoXCIpKSxoKFwiVGFyZ2V0T3JpZ2luIGZvciBwYXJlbnQgc2V0IHRvOiBcIit1YSl9ZnVuY3Rpb24gbShhLGIpe3JldHVybi0xIT09Yi5pbmRleE9mKFwiLVwiKSYmKGkoXCJOZWdhdGl2ZSBDU1MgdmFsdWUgaWdub3JlZCBmb3IgXCIrYSksYj1cIlwiKSxifWZ1bmN0aW9uIG4oYSxjKXtiIT09YyYmXCJcIiE9PWMmJlwibnVsbFwiIT09YyYmKGRvY3VtZW50LmJvZHkuc3R5bGVbYV09YyxoKFwiQm9keSBcIithKycgc2V0IHRvIFwiJytjKydcIicpKX1mdW5jdGlvbiBvKCl7Yj09PVomJihaPVkrXCJweFwiKSxuKFwibWFyZ2luXCIsbShcIm1hcmdpblwiLFopKX1mdW5jdGlvbiBwKCl7ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmhlaWdodD1cIlwiLGRvY3VtZW50LmJvZHkuc3R5bGUuaGVpZ2h0PVwiXCIsaCgnSFRNTCAmIGJvZHkgaGVpZ2h0IHNldCB0byBcImF1dG9cIicpfWZ1bmN0aW9uIHEoYil7ZnVuY3Rpb24gZigpe08oYi5ldmVudE5hbWUsYi5ldmVudFR5cGUpfXZhciBnPXthZGQ6ZnVuY3Rpb24oYil7YyhhLGIsZil9LHJlbW92ZTpmdW5jdGlvbihiKXtkKGEsYixmKX19O2IuZXZlbnROYW1lcyYmQXJyYXkucHJvdG90eXBlLm1hcD8oYi5ldmVudE5hbWU9Yi5ldmVudE5hbWVzWzBdLGIuZXZlbnROYW1lcy5tYXAoZ1tiLm1ldGhvZF0pKTpnW2IubWV0aG9kXShiLmV2ZW50TmFtZSksaChlKGIubWV0aG9kKStcIiBldmVudCBsaXN0ZW5lcjogXCIrYi5ldmVudFR5cGUpfWZ1bmN0aW9uIHIoYSl7cSh7bWV0aG9kOmEsZXZlbnRUeXBlOlwiQW5pbWF0aW9uIFN0YXJ0XCIsZXZlbnROYW1lczpbXCJhbmltYXRpb25zdGFydFwiLFwid2Via2l0QW5pbWF0aW9uU3RhcnRcIl19KSxxKHttZXRob2Q6YSxldmVudFR5cGU6XCJBbmltYXRpb24gSXRlcmF0aW9uXCIsZXZlbnROYW1lczpbXCJhbmltYXRpb25pdGVyYXRpb25cIixcIndlYmtpdEFuaW1hdGlvbkl0ZXJhdGlvblwiXX0pLHEoe21ldGhvZDphLGV2ZW50VHlwZTpcIkFuaW1hdGlvbiBFbmRcIixldmVudE5hbWVzOltcImFuaW1hdGlvbmVuZFwiLFwid2Via2l0QW5pbWF0aW9uRW5kXCJdfSkscSh7bWV0aG9kOmEsZXZlbnRUeXBlOlwiSW5wdXRcIixldmVudE5hbWU6XCJpbnB1dFwifSkscSh7bWV0aG9kOmEsZXZlbnRUeXBlOlwiTW91c2UgVXBcIixldmVudE5hbWU6XCJtb3VzZXVwXCJ9KSxxKHttZXRob2Q6YSxldmVudFR5cGU6XCJNb3VzZSBEb3duXCIsZXZlbnROYW1lOlwibW91c2Vkb3duXCJ9KSxxKHttZXRob2Q6YSxldmVudFR5cGU6XCJPcmllbnRhdGlvbiBDaGFuZ2VcIixldmVudE5hbWU6XCJvcmllbnRhdGlvbmNoYW5nZVwifSkscSh7bWV0aG9kOmEsZXZlbnRUeXBlOlwiUHJpbnRcIixldmVudE5hbWU6W1wiYWZ0ZXJwcmludFwiLFwiYmVmb3JlcHJpbnRcIl19KSxxKHttZXRob2Q6YSxldmVudFR5cGU6XCJSZWFkeSBTdGF0ZSBDaGFuZ2VcIixldmVudE5hbWU6XCJyZWFkeXN0YXRlY2hhbmdlXCJ9KSxxKHttZXRob2Q6YSxldmVudFR5cGU6XCJUb3VjaCBTdGFydFwiLGV2ZW50TmFtZTpcInRvdWNoc3RhcnRcIn0pLHEoe21ldGhvZDphLGV2ZW50VHlwZTpcIlRvdWNoIEVuZFwiLGV2ZW50TmFtZTpcInRvdWNoZW5kXCJ9KSxxKHttZXRob2Q6YSxldmVudFR5cGU6XCJUb3VjaCBDYW5jZWxcIixldmVudE5hbWU6XCJ0b3VjaGNhbmNlbFwifSkscSh7bWV0aG9kOmEsZXZlbnRUeXBlOlwiVHJhbnNpdGlvbiBTdGFydFwiLGV2ZW50TmFtZXM6W1widHJhbnNpdGlvbnN0YXJ0XCIsXCJ3ZWJraXRUcmFuc2l0aW9uU3RhcnRcIixcIk1TVHJhbnNpdGlvblN0YXJ0XCIsXCJvVHJhbnNpdGlvblN0YXJ0XCIsXCJvdHJhbnNpdGlvbnN0YXJ0XCJdfSkscSh7bWV0aG9kOmEsZXZlbnRUeXBlOlwiVHJhbnNpdGlvbiBJdGVyYXRpb25cIixldmVudE5hbWVzOltcInRyYW5zaXRpb25pdGVyYXRpb25cIixcIndlYmtpdFRyYW5zaXRpb25JdGVyYXRpb25cIixcIk1TVHJhbnNpdGlvbkl0ZXJhdGlvblwiLFwib1RyYW5zaXRpb25JdGVyYXRpb25cIixcIm90cmFuc2l0aW9uaXRlcmF0aW9uXCJdfSkscSh7bWV0aG9kOmEsZXZlbnRUeXBlOlwiVHJhbnNpdGlvbiBFbmRcIixldmVudE5hbWVzOltcInRyYW5zaXRpb25lbmRcIixcIndlYmtpdFRyYW5zaXRpb25FbmRcIixcIk1TVHJhbnNpdGlvbkVuZFwiLFwib1RyYW5zaXRpb25FbmRcIixcIm90cmFuc2l0aW9uZW5kXCJdfSksXCJjaGlsZFwiPT09cmEmJnEoe21ldGhvZDphLGV2ZW50VHlwZTpcIklGcmFtZSBSZXNpemVkXCIsZXZlbnROYW1lOlwicmVzaXplXCJ9KX1mdW5jdGlvbiBzKGEsYixjLGQpe3JldHVybiBiIT09YSYmKGEgaW4gY3x8KGkoYStcIiBpcyBub3QgYSB2YWxpZCBvcHRpb24gZm9yIFwiK2QrXCJDYWxjdWxhdGlvbk1ldGhvZC5cIiksYT1iKSxoKGQrJyBjYWxjdWxhdGlvbiBtZXRob2Qgc2V0IHRvIFwiJythKydcIicpKSxhfWZ1bmN0aW9uIHQoKXtnYT1zKGdhLGZhLElhLFwiaGVpZ2h0XCIpfWZ1bmN0aW9uIHUoKXtCYT1zKEJhLEFhLEphLFwid2lkdGhcIil9ZnVuY3Rpb24gdigpeyEwPT09Vj8ocihcImFkZFwiKSxHKCkpOmgoXCJBdXRvIFJlc2l6ZSBkaXNhYmxlZFwiKX1mdW5jdGlvbiB3KCl7aChcIkRpc2FibGUgb3V0Z29pbmcgbWVzc2FnZXNcIiksc2E9ITF9ZnVuY3Rpb24geCgpe2goXCJSZW1vdmUgZXZlbnQgbGlzdGVuZXI6IE1lc3NhZ2VcIiksZChhLFwibWVzc2FnZVwiLFQpfWZ1bmN0aW9uIHkoKXtudWxsIT09JCYmJC5kaXNjb25uZWN0KCl9ZnVuY3Rpb24geigpe3IoXCJyZW1vdmVcIikseSgpLGNsZWFySW50ZXJ2YWwobGEpfWZ1bmN0aW9uIEEoKXt3KCkseCgpLCEwPT09ViYmeigpfWZ1bmN0aW9uIEIoKXt2YXIgYT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2Euc3R5bGUuY2xlYXI9XCJib3RoXCIsYS5zdHlsZS5kaXNwbGF5PVwiYmxvY2tcIixkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpfWZ1bmN0aW9uIEMoKXtmdW5jdGlvbiBkKCl7cmV0dXJue3g6YS5wYWdlWE9mZnNldCE9PWI/YS5wYWdlWE9mZnNldDpkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCx5OmEucGFnZVlPZmZzZXQhPT1iP2EucGFnZVlPZmZzZXQ6ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcH19ZnVuY3Rpb24gZShhKXt2YXIgYj1hLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLGM9ZCgpO3JldHVybnt4OnBhcnNlSW50KGIubGVmdCwxMCkrcGFyc2VJbnQoYy54LDEwKSx5OnBhcnNlSW50KGIudG9wLDEwKStwYXJzZUludChjLnksMTApfX1mdW5jdGlvbiBmKGEpe2Z1bmN0aW9uIGMoYSl7dmFyIGI9ZShhKTtoKFwiTW92aW5nIHRvIGluIHBhZ2UgbGluayAoI1wiK2QrXCIpIGF0IHg6IFwiK2IueCtcIiB5OiBcIitiLnkpLFMoYi55LGIueCxcInNjcm9sbFRvT2Zmc2V0XCIpfXZhciBkPWEuc3BsaXQoXCIjXCIpWzFdfHxhLGY9ZGVjb2RlVVJJQ29tcG9uZW50KGQpLGc9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZil8fGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKGYpWzBdO2IhPT1nP2MoZyk6KGgoXCJJbiBwYWdlIGxpbmsgKCNcIitkK1wiKSBub3QgZm91bmQgaW4gaUZyYW1lLCBzbyBzZW5kaW5nIHRvIHBhcmVudFwiKSxTKDAsMCxcImluUGFnZUxpbmtcIixcIiNcIitkKSl9ZnVuY3Rpb24gZygpe1wiXCIhPT1sb2NhdGlvbi5oYXNoJiZcIiNcIiE9PWxvY2F0aW9uLmhhc2gmJmYobG9jYXRpb24uaHJlZil9ZnVuY3Rpb24gaigpe2Z1bmN0aW9uIGEoYSl7ZnVuY3Rpb24gYihhKXthLnByZXZlbnREZWZhdWx0KCksZih0aGlzLmdldEF0dHJpYnV0ZShcImhyZWZcIikpfVwiI1wiIT09YS5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpJiZjKGEsXCJjbGlja1wiLGIpfUFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYVtocmVmXj1cIiNcIl0nKSxhKX1mdW5jdGlvbiBrKCl7YyhhLFwiaGFzaGNoYW5nZVwiLGcpfWZ1bmN0aW9uIGwoKXtzZXRUaW1lb3V0KGcsY2EpfWZ1bmN0aW9uIG0oKXtBcnJheS5wcm90b3R5cGUuZm9yRWFjaCYmZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbD8oaChcIlNldHRpbmcgdXAgbG9jYXRpb24uaGFzaCBoYW5kbGVyc1wiKSxqKCksaygpLGwoKSk6aShcIkluIHBhZ2UgbGlua2luZyBub3QgZnVsbHkgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlciEgKFNlZSBSRUFETUUubWQgZm9yIElFOCB3b3JrYXJvdW5kKVwiKX1yZXR1cm4gamEuZW5hYmxlP20oKTpoKFwiSW4gcGFnZSBsaW5raW5nIG5vdCBlbmFibGVkXCIpLHtmaW5kVGFyZ2V0OmZ9fWZ1bmN0aW9uIEQoKXtoKFwiRW5hYmxlIHB1YmxpYyBtZXRob2RzXCIpLENhLnBhcmVudElGcmFtZT17YXV0b1Jlc2l6ZTpmdW5jdGlvbihhKXtyZXR1cm4hMD09PWEmJiExPT09Vj8oVj0hMCx2KCkpOiExPT09YSYmITA9PT1WJiYoVj0hMSx6KCkpLFZ9LGNsb3NlOmZ1bmN0aW9uKCl7UygwLDAsXCJjbG9zZVwiKSxBKCl9LGdldElkOmZ1bmN0aW9uKCl7cmV0dXJuIHBhfSxnZXRQYWdlSW5mbzpmdW5jdGlvbihhKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBhPyhGYT1hLFMoMCwwLFwicGFnZUluZm9cIikpOihGYT1mdW5jdGlvbigpe30sUygwLDAsXCJwYWdlSW5mb1N0b3BcIikpfSxtb3ZlVG9BbmNob3I6ZnVuY3Rpb24oYSl7amEuZmluZFRhcmdldChhKX0scmVzZXQ6ZnVuY3Rpb24oKXtSKFwicGFyZW50SUZyYW1lLnJlc2V0XCIpfSxzY3JvbGxUbzpmdW5jdGlvbihhLGIpe1MoYixhLFwic2Nyb2xsVG9cIil9LHNjcm9sbFRvT2Zmc2V0OmZ1bmN0aW9uKGEsYil7UyhiLGEsXCJzY3JvbGxUb09mZnNldFwiKX0sc2VuZE1lc3NhZ2U6ZnVuY3Rpb24oYSxiKXtTKDAsMCxcIm1lc3NhZ2VcIixKU09OLnN0cmluZ2lmeShhKSxiKX0sc2V0SGVpZ2h0Q2FsY3VsYXRpb25NZXRob2Q6ZnVuY3Rpb24oYSl7Z2E9YSx0KCl9LHNldFdpZHRoQ2FsY3VsYXRpb25NZXRob2Q6ZnVuY3Rpb24oYSl7QmE9YSx1KCl9LHNldFRhcmdldE9yaWdpbjpmdW5jdGlvbihhKXtoKFwiU2V0IHRhcmdldE9yaWdpbjogXCIrYSksdWE9YX0sc2l6ZTpmdW5jdGlvbihhLGIpe3ZhciBjPVwiXCIrKGE/YTpcIlwiKSsoYj9cIixcIitiOlwiXCIpO08oXCJzaXplXCIsXCJwYXJlbnRJRnJhbWUuc2l6ZShcIitjK1wiKVwiLGEsYil9fX1mdW5jdGlvbiBFKCl7MCE9PWthJiYoaChcInNldEludGVydmFsOiBcIitrYStcIm1zXCIpLGxhPXNldEludGVydmFsKGZ1bmN0aW9uKCl7TyhcImludGVydmFsXCIsXCJzZXRJbnRlcnZhbDogXCIra2EpfSxNYXRoLmFicyhrYSkpKX1mdW5jdGlvbiBGKCl7ZnVuY3Rpb24gYyhhKXtmdW5jdGlvbiBiKGEpeyExPT09YS5jb21wbGV0ZSYmKGgoXCJBdHRhY2ggbGlzdGVuZXJzIHRvIFwiK2Euc3JjKSxhLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsZywhMSksYS5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIixpLCExKSxsLnB1c2goYSkpfVwiYXR0cmlidXRlc1wiPT09YS50eXBlJiZcInNyY1wiPT09YS5hdHRyaWJ1dGVOYW1lP2IoYS50YXJnZXQpOlwiY2hpbGRMaXN0XCI9PT1hLnR5cGUmJkFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYS50YXJnZXQucXVlcnlTZWxlY3RvckFsbChcImltZ1wiKSxiKX1mdW5jdGlvbiBkKGEpe2wuc3BsaWNlKGwuaW5kZXhPZihhKSwxKX1mdW5jdGlvbiBlKGEpe2goXCJSZW1vdmUgbGlzdGVuZXJzIGZyb20gXCIrYS5zcmMpLGEucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRcIixnLCExKSxhLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLGksITEpLGQoYSl9ZnVuY3Rpb24gZihhLGMsZCl7ZShhLnRhcmdldCksTyhjLGQrXCI6IFwiK2EudGFyZ2V0LnNyYyxiLGIpfWZ1bmN0aW9uIGcoYSl7ZihhLFwiaW1hZ2VMb2FkXCIsXCJJbWFnZSBsb2FkZWRcIil9ZnVuY3Rpb24gaShhKXtmKGEsXCJpbWFnZUxvYWRGYWlsZWRcIixcIkltYWdlIGxvYWQgZmFpbGVkXCIpfWZ1bmN0aW9uIGooYSl7TyhcIm11dGF0aW9uT2JzZXJ2ZXJcIixcIm11dGF0aW9uT2JzZXJ2ZXI6IFwiK2FbMF0udGFyZ2V0K1wiIFwiK2FbMF0udHlwZSksYS5mb3JFYWNoKGMpfWZ1bmN0aW9uIGsoKXt2YXIgYT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKSxiPXthdHRyaWJ1dGVzOiEwLGF0dHJpYnV0ZU9sZFZhbHVlOiExLGNoYXJhY3RlckRhdGE6ITAsY2hhcmFjdGVyRGF0YU9sZFZhbHVlOiExLGNoaWxkTGlzdDohMCxzdWJ0cmVlOiEwfTtyZXR1cm4gbj1uZXcgbShqKSxoKFwiQ3JlYXRlIGJvZHkgTXV0YXRpb25PYnNlcnZlclwiKSxuLm9ic2VydmUoYSxiKSxufXZhciBsPVtdLG09YS5NdXRhdGlvbk9ic2VydmVyfHxhLldlYktpdE11dGF0aW9uT2JzZXJ2ZXIsbj1rKCk7cmV0dXJue2Rpc2Nvbm5lY3Q6ZnVuY3Rpb24oKXtcImRpc2Nvbm5lY3RcImluIG4mJihoKFwiRGlzY29ubmVjdCBib2R5IE11dGF0aW9uT2JzZXJ2ZXJcIiksbi5kaXNjb25uZWN0KCksbC5mb3JFYWNoKGUpKX19fWZ1bmN0aW9uIEcoKXt2YXIgYj0wPmthO2EuTXV0YXRpb25PYnNlcnZlcnx8YS5XZWJLaXRNdXRhdGlvbk9ic2VydmVyP2I/RSgpOiQ9RigpOihoKFwiTXV0YXRpb25PYnNlcnZlciBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlciFcIiksRSgpKX1mdW5jdGlvbiBIKGEsYil7ZnVuY3Rpb24gYyhhKXt2YXIgYz0vXlxcZCsocHgpPyQvaTtpZihjLnRlc3QoYSkpcmV0dXJuIHBhcnNlSW50KGEsVyk7dmFyIGQ9Yi5zdHlsZS5sZWZ0LGU9Yi5ydW50aW1lU3R5bGUubGVmdDtyZXR1cm4gYi5ydW50aW1lU3R5bGUubGVmdD1iLmN1cnJlbnRTdHlsZS5sZWZ0LGIuc3R5bGUubGVmdD1hfHwwLGE9Yi5zdHlsZS5waXhlbExlZnQsYi5zdHlsZS5sZWZ0PWQsYi5ydW50aW1lU3R5bGUubGVmdD1lLGF9dmFyIGQ9MDtyZXR1cm4gYj1ifHxkb2N1bWVudC5ib2R5LFwiZGVmYXVsdFZpZXdcImluIGRvY3VtZW50JiZcImdldENvbXB1dGVkU3R5bGVcImluIGRvY3VtZW50LmRlZmF1bHRWaWV3PyhkPWRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoYixudWxsKSxkPW51bGwhPT1kP2RbYV06MCk6ZD1jKGIuY3VycmVudFN0eWxlW2FdKSxwYXJzZUludChkLFcpfWZ1bmN0aW9uIEkoYSl7YT55YS8yJiYoeWE9MiphLGgoXCJFdmVudCB0aHJvdHRsZSBpbmNyZWFzZWQgdG8gXCIreWErXCJtc1wiKSl9ZnVuY3Rpb24gSihhLGIpe2Zvcih2YXIgYz1iLmxlbmd0aCxkPTAsZj0wLGc9ZShhKSxpPUhhKCksaj0wO2M+ajtqKyspZD1iW2pdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpW2FdK0goXCJtYXJnaW5cIitnLGJbal0pLGQ+ZiYmKGY9ZCk7cmV0dXJuIGk9SGEoKS1pLGgoXCJQYXJzZWQgXCIrYytcIiBIVE1MIGVsZW1lbnRzXCIpLGgoXCJFbGVtZW50IHBvc2l0aW9uIGNhbGN1bGF0ZWQgaW4gXCIraStcIm1zXCIpLEkoaSksZn1mdW5jdGlvbiBLKGEpe3JldHVyblthLmJvZHlPZmZzZXQoKSxhLmJvZHlTY3JvbGwoKSxhLmRvY3VtZW50RWxlbWVudE9mZnNldCgpLGEuZG9jdW1lbnRFbGVtZW50U2Nyb2xsKCldfWZ1bmN0aW9uIEwoYSxiKXtmdW5jdGlvbiBjKCl7cmV0dXJuIGkoXCJObyB0YWdnZWQgZWxlbWVudHMgKFwiK2IrXCIpIGZvdW5kIG9uIHBhZ2VcIiksZWF9dmFyIGQ9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltcIitiK1wiXVwiKTtyZXR1cm4gMD09PWQubGVuZ3RoP2MoKTpKKGEsZCl9ZnVuY3Rpb24gTSgpe3JldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiYm9keSAqXCIpfWZ1bmN0aW9uIE4oYSxjLGQsZSl7ZnVuY3Rpb24gZigpe2VhPW0semE9bixTKGVhLHphLGEpfWZ1bmN0aW9uIGcoKXtmdW5jdGlvbiBhKGEsYil7dmFyIGM9TWF0aC5hYnMoYS1iKTw9dmE7cmV0dXJuIWN9cmV0dXJuIG09YiE9PWQ/ZDpJYVtnYV0oKSxuPWIhPT1lP2U6SmFbQmFdKCksYShlYSxtKXx8YWEmJmEoemEsbil9ZnVuY3Rpb24gaSgpe3JldHVybiEoYSBpbntpbml0OjEsaW50ZXJ2YWw6MSxzaXplOjF9KX1mdW5jdGlvbiBqKCl7cmV0dXJuIGdhIGluIHFhfHxhYSYmQmEgaW4gcWF9ZnVuY3Rpb24gaygpe2goXCJObyBjaGFuZ2UgaW4gc2l6ZSBkZXRlY3RlZFwiKX1mdW5jdGlvbiBsKCl7aSgpJiZqKCk/UihjKTphIGlue2ludGVydmFsOjF9fHxrKCl9dmFyIG0sbjtnKCl8fFwiaW5pdFwiPT09YT8oUCgpLGYoKSk6bCgpfWZ1bmN0aW9uIE8oYSxiLGMsZCl7ZnVuY3Rpb24gZSgpe2EgaW57cmVzZXQ6MSxyZXNldFBhZ2U6MSxpbml0OjF9fHxoKFwiVHJpZ2dlciBldmVudDogXCIrYil9ZnVuY3Rpb24gZigpe3JldHVybiB3YSYmYSBpbiBiYX1mKCk/aChcIlRyaWdnZXIgZXZlbnQgY2FuY2VsbGVkOiBcIithKTooZSgpLEthKGEsYixjLGQpKX1mdW5jdGlvbiBQKCl7d2F8fCh3YT0hMCxoKFwiVHJpZ2dlciBldmVudCBsb2NrIG9uXCIpKSxjbGVhclRpbWVvdXQoeGEpLHhhPXNldFRpbWVvdXQoZnVuY3Rpb24oKXt3YT0hMSxoKFwiVHJpZ2dlciBldmVudCBsb2NrIG9mZlwiKSxoKFwiLS1cIil9LGNhKX1mdW5jdGlvbiBRKGEpe2VhPUlhW2dhXSgpLHphPUphW0JhXSgpLFMoZWEsemEsYSl9ZnVuY3Rpb24gUihhKXt2YXIgYj1nYTtnYT1mYSxoKFwiUmVzZXQgdHJpZ2dlciBldmVudDogXCIrYSksUCgpLFEoXCJyZXNldFwiKSxnYT1ifWZ1bmN0aW9uIFMoYSxjLGQsZSxmKXtmdW5jdGlvbiBnKCl7Yj09PWY/Zj11YTpoKFwiTWVzc2FnZSB0YXJnZXRPcmlnaW46IFwiK2YpfWZ1bmN0aW9uIGkoKXt2YXIgZz1hK1wiOlwiK2MsaT1wYStcIjpcIitnK1wiOlwiK2QrKGIhPT1lP1wiOlwiK2U6XCJcIik7aChcIlNlbmRpbmcgbWVzc2FnZSB0byBob3N0IHBhZ2UgKFwiK2krXCIpXCIpLHRhLnBvc3RNZXNzYWdlKG5hK2ksZil9ITA9PT1zYSYmKGcoKSxpKCkpfWZ1bmN0aW9uIFQoYil7ZnVuY3Rpb24gZCgpe3JldHVybiBuYT09PShcIlwiK2IuZGF0YSkuc3Vic3RyKDAsb2EpfWZ1bmN0aW9uIGUoKXtmdW5jdGlvbiBkKCl7aWE9Yi5kYXRhLHRhPWIuc291cmNlLGooKSxkYT0hMSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7aGE9ITF9LGNhKX1kb2N1bWVudC5ib2R5P2QoKTooaChcIldhaXRpbmcgZm9yIHBhZ2UgcmVhZHlcIiksYyhhLFwicmVhZHlzdGF0ZWNoYW5nZVwiLGUpKX1mdW5jdGlvbiBmKCl7aGE/aChcIlBhZ2UgcmVzZXQgaWdub3JlZCBieSBpbml0XCIpOihoKFwiUGFnZSBzaXplIHJlc2V0IGJ5IGhvc3QgcGFnZVwiKSxRKFwicmVzZXRQYWdlXCIpKX1mdW5jdGlvbiBnKCl7TyhcInJlc2l6ZVBhcmVudFwiLFwiUGFyZW50IHdpbmRvdyByZXF1ZXN0ZWQgc2l6ZSBjaGVja1wiKX1mdW5jdGlvbiBrKCl7dmFyIGE9bSgpO2phLmZpbmRUYXJnZXQoYSl9ZnVuY3Rpb24gbCgpe3JldHVybiBiLmRhdGEuc3BsaXQoXCJdXCIpWzFdLnNwbGl0KFwiOlwiKVswXX1mdW5jdGlvbiBtKCl7cmV0dXJuIGIuZGF0YS5zdWJzdHIoYi5kYXRhLmluZGV4T2YoXCI6XCIpKzEpfWZ1bmN0aW9uIG4oKXtyZXR1cm5cImlGcmFtZVJlc2l6ZVwiaW4gYX1mdW5jdGlvbiBvKCl7dmFyIGE9bSgpO2goXCJNZXNzYWdlQ2FsbGJhY2sgY2FsbGVkIGZyb20gcGFyZW50OiBcIithKSxEYShKU09OLnBhcnNlKGEpKSxoKFwiIC0tXCIpfWZ1bmN0aW9uIHAoKXt2YXIgYT1tKCk7aChcIlBhZ2VJbmZvRnJvbVBhcmVudCBjYWxsZWQgZnJvbSBwYXJlbnQ6IFwiK2EpLEZhKEpTT04ucGFyc2UoYSkpLGgoXCIgLS1cIil9ZnVuY3Rpb24gcSgpe3JldHVybiBiLmRhdGEuc3BsaXQoXCI6XCIpWzJdaW57XCJ0cnVlXCI6MSxcImZhbHNlXCI6MX19ZnVuY3Rpb24gcigpe3N3aXRjaChsKCkpe2Nhc2VcInJlc2V0XCI6ZigpO2JyZWFrO2Nhc2VcInJlc2l6ZVwiOmcoKTticmVhaztjYXNlXCJpblBhZ2VMaW5rXCI6Y2FzZVwibW92ZVRvQW5jaG9yXCI6aygpO2JyZWFrO2Nhc2VcIm1lc3NhZ2VcIjpvKCk7YnJlYWs7Y2FzZVwicGFnZUluZm9cIjpwKCk7YnJlYWs7ZGVmYXVsdDpuKCl8fHEoKXx8aShcIlVuZXhwZWN0ZWQgbWVzc2FnZSAoXCIrYi5kYXRhK1wiKVwiKX19ZnVuY3Rpb24gcygpeyExPT09ZGE/cigpOnEoKT9lKCk6aCgnSWdub3JlZCBtZXNzYWdlIG9mIHR5cGUgXCInK2woKSsnXCIuIFJlY2VpdmVkIGJlZm9yZSBpbml0aWFsaXphdGlvbi4nKX1kKCkmJnMoKX1mdW5jdGlvbiBVKCl7XCJsb2FkaW5nXCIhPT1kb2N1bWVudC5yZWFkeVN0YXRlJiZhLnBhcmVudC5wb3N0TWVzc2FnZShcIltpRnJhbWVSZXNpemVyQ2hpbGRdUmVhZHlcIixcIipcIil9dmFyIFY9ITAsVz0xMCxYPVwiXCIsWT0wLFo9XCJcIiwkPW51bGwsXz1cIlwiLGFhPSExLGJhPXtyZXNpemU6MSxjbGljazoxfSxjYT0xMjgsZGE9ITAsZWE9MSxmYT1cImJvZHlPZmZzZXRcIixnYT1mYSxoYT0hMCxpYT1cIlwiLGphPXt9LGthPTMyLGxhPW51bGwsbWE9ITEsbmE9XCJbaUZyYW1lU2l6ZXJdXCIsb2E9bmEubGVuZ3RoLHBhPVwiXCIscWE9e21heDoxLG1pbjoxLGJvZHlTY3JvbGw6MSxkb2N1bWVudEVsZW1lbnRTY3JvbGw6MX0scmE9XCJjaGlsZFwiLHNhPSEwLHRhPWEucGFyZW50LHVhPVwiKlwiLHZhPTAsd2E9ITEseGE9bnVsbCx5YT0xNix6YT0xLEFhPVwic2Nyb2xsXCIsQmE9QWEsQ2E9YSxEYT1mdW5jdGlvbigpe2koXCJNZXNzYWdlQ2FsbGJhY2sgZnVuY3Rpb24gbm90IGRlZmluZWRcIil9LEVhPWZ1bmN0aW9uKCl7fSxGYT1mdW5jdGlvbigpe30sR2E9e2hlaWdodDpmdW5jdGlvbigpe3JldHVybiBpKFwiQ3VzdG9tIGhlaWdodCBjYWxjdWxhdGlvbiBmdW5jdGlvbiBub3QgZGVmaW5lZFwiKSxkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0fSx3aWR0aDpmdW5jdGlvbigpe3JldHVybiBpKFwiQ3VzdG9tIHdpZHRoIGNhbGN1bGF0aW9uIGZ1bmN0aW9uIG5vdCBkZWZpbmVkXCIpLGRvY3VtZW50LmJvZHkuc2Nyb2xsV2lkdGh9fSxIYT1EYXRlLm5vd3x8ZnVuY3Rpb24oKXtyZXR1cm4obmV3IERhdGUpLmdldFRpbWUoKX0sSWE9e2JvZHlPZmZzZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQrSChcIm1hcmdpblRvcFwiKStIKFwibWFyZ2luQm90dG9tXCIpfSxvZmZzZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gSWEuYm9keU9mZnNldCgpfSxib2R5U2Nyb2xsOmZ1bmN0aW9uKCl7cmV0dXJuIGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0fSxjdXN0b206ZnVuY3Rpb24oKXtyZXR1cm4gR2EuaGVpZ2h0KCl9LGRvY3VtZW50RWxlbWVudE9mZnNldDpmdW5jdGlvbigpe3JldHVybiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0fSxkb2N1bWVudEVsZW1lbnRTY3JvbGw6ZnVuY3Rpb24oKXtyZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodH0sbWF4OmZ1bmN0aW9uKCl7cmV0dXJuIE1hdGgubWF4LmFwcGx5KG51bGwsSyhJYSkpfSxtaW46ZnVuY3Rpb24oKXtyZXR1cm4gTWF0aC5taW4uYXBwbHkobnVsbCxLKElhKSl9LGdyb3c6ZnVuY3Rpb24oKXtyZXR1cm4gSWEubWF4KCl9LGxvd2VzdEVsZW1lbnQ6ZnVuY3Rpb24oKXtyZXR1cm4gTWF0aC5tYXgoSWEuYm9keU9mZnNldCgpLEooXCJib3R0b21cIixNKCkpKX0sdGFnZ2VkRWxlbWVudDpmdW5jdGlvbigpe3JldHVybiBMKFwiYm90dG9tXCIsXCJkYXRhLWlmcmFtZS1oZWlnaHRcIil9fSxKYT17Ym9keVNjcm9sbDpmdW5jdGlvbigpe3JldHVybiBkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRofSxib2R5T2Zmc2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGh9LGN1c3RvbTpmdW5jdGlvbigpe3JldHVybiBHYS53aWR0aCgpfSxkb2N1bWVudEVsZW1lbnRTY3JvbGw6ZnVuY3Rpb24oKXtyZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFdpZHRofSxkb2N1bWVudEVsZW1lbnRPZmZzZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldFdpZHRofSxzY3JvbGw6ZnVuY3Rpb24oKXtyZXR1cm4gTWF0aC5tYXgoSmEuYm9keVNjcm9sbCgpLEphLmRvY3VtZW50RWxlbWVudFNjcm9sbCgpKX0sbWF4OmZ1bmN0aW9uKCl7cmV0dXJuIE1hdGgubWF4LmFwcGx5KG51bGwsSyhKYSkpfSxtaW46ZnVuY3Rpb24oKXtyZXR1cm4gTWF0aC5taW4uYXBwbHkobnVsbCxLKEphKSl9LHJpZ2h0TW9zdEVsZW1lbnQ6ZnVuY3Rpb24oKXtyZXR1cm4gSihcInJpZ2h0XCIsTSgpKX0sdGFnZ2VkRWxlbWVudDpmdW5jdGlvbigpe3JldHVybiBMKFwicmlnaHRcIixcImRhdGEtaWZyYW1lLXdpZHRoXCIpfX0sS2E9ZihOKTtjKGEsXCJtZXNzYWdlXCIsVCksVSgpfSh3aW5kb3d8fHt9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlmcmFtZVJlc2l6ZXIuY29udGVudFdpbmRvdy5tYXAiLCIvKiEgaUZyYW1lIFJlc2l6ZXIgKGlmcmFtZVNpemVyLm1pbi5qcyApIC0gdjMuNS41IC0gMjAxNi0wNi0xNlxuICogIERlc2M6IEZvcmNlIGNyb3NzIGRvbWFpbiBpZnJhbWVzIHRvIHNpemUgdG8gY29udGVudC5cbiAqICBSZXF1aXJlczogaWZyYW1lUmVzaXplci5jb250ZW50V2luZG93Lm1pbi5qcyB0byBiZSBsb2FkZWQgaW50byB0aGUgdGFyZ2V0IGZyYW1lLlxuICogIENvcHlyaWdodDogKGMpIDIwMTYgRGF2aWQgSi4gQnJhZHNoYXcgLSBkYXZlQGJyYWRzaGF3Lm5ldFxuICogIExpY2Vuc2U6IE1JVFxuICovXG5cbiFmdW5jdGlvbihhKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBiKGIsYyxkKXtcImFkZEV2ZW50TGlzdGVuZXJcImluIGE/Yi5hZGRFdmVudExpc3RlbmVyKGMsZCwhMSk6XCJhdHRhY2hFdmVudFwiaW4gYSYmYi5hdHRhY2hFdmVudChcIm9uXCIrYyxkKX1mdW5jdGlvbiBjKGIsYyxkKXtcInJlbW92ZUV2ZW50TGlzdGVuZXJcImluIGE/Yi5yZW1vdmVFdmVudExpc3RlbmVyKGMsZCwhMSk6XCJkZXRhY2hFdmVudFwiaW4gYSYmYi5kZXRhY2hFdmVudChcIm9uXCIrYyxkKX1mdW5jdGlvbiBkKCl7dmFyIGIsYz1bXCJtb3pcIixcIndlYmtpdFwiLFwib1wiLFwibXNcIl07Zm9yKGI9MDtiPGMubGVuZ3RoJiYhTjtiKz0xKU49YVtjW2JdK1wiUmVxdWVzdEFuaW1hdGlvbkZyYW1lXCJdO058fGgoXCJzZXR1cFwiLFwiUmVxdWVzdEFuaW1hdGlvbkZyYW1lIG5vdCBzdXBwb3J0ZWRcIil9ZnVuY3Rpb24gZShiKXt2YXIgYz1cIkhvc3QgcGFnZTogXCIrYjtyZXR1cm4gYS50b3AhPT1hLnNlbGYmJihjPWEucGFyZW50SUZyYW1lJiZhLnBhcmVudElGcmFtZS5nZXRJZD9hLnBhcmVudElGcmFtZS5nZXRJZCgpK1wiOiBcIitiOlwiTmVzdGVkIGhvc3QgcGFnZTogXCIrYiksY31mdW5jdGlvbiBmKGEpe3JldHVybiBLK1wiW1wiK2UoYSkrXCJdXCJ9ZnVuY3Rpb24gZyhhKXtyZXR1cm4gUFthXT9QW2FdLmxvZzpHfWZ1bmN0aW9uIGgoYSxiKXtrKFwibG9nXCIsYSxiLGcoYSkpfWZ1bmN0aW9uIGkoYSxiKXtrKFwiaW5mb1wiLGEsYixnKGEpKX1mdW5jdGlvbiBqKGEsYil7ayhcIndhcm5cIixhLGIsITApfWZ1bmN0aW9uIGsoYixjLGQsZSl7ITA9PT1lJiZcIm9iamVjdFwiPT10eXBlb2YgYS5jb25zb2xlJiZjb25zb2xlW2JdKGYoYyksZCl9ZnVuY3Rpb24gbChkKXtmdW5jdGlvbiBlKCl7ZnVuY3Rpb24gYSgpe3MoVikscChXKX1nKFwiSGVpZ2h0XCIpLGcoXCJXaWR0aFwiKSx0KGEsVixcImluaXRcIil9ZnVuY3Rpb24gZigpe3ZhciBhPVUuc3Vic3RyKEwpLnNwbGl0KFwiOlwiKTtyZXR1cm57aWZyYW1lOlBbYVswXV0uaWZyYW1lLGlkOmFbMF0saGVpZ2h0OmFbMV0sd2lkdGg6YVsyXSx0eXBlOmFbM119fWZ1bmN0aW9uIGcoYSl7dmFyIGI9TnVtYmVyKFBbV11bXCJtYXhcIithXSksYz1OdW1iZXIoUFtXXVtcIm1pblwiK2FdKSxkPWEudG9Mb3dlckNhc2UoKSxlPU51bWJlcihWW2RdKTtoKFcsXCJDaGVja2luZyBcIitkK1wiIGlzIGluIHJhbmdlIFwiK2MrXCItXCIrYiksYz5lJiYoZT1jLGgoVyxcIlNldCBcIitkK1wiIHRvIG1pbiB2YWx1ZVwiKSksZT5iJiYoZT1iLGgoVyxcIlNldCBcIitkK1wiIHRvIG1heCB2YWx1ZVwiKSksVltkXT1cIlwiK2V9ZnVuY3Rpb24gaygpe2Z1bmN0aW9uIGEoKXtmdW5jdGlvbiBhKCl7dmFyIGE9MCxkPSExO2ZvcihoKFcsXCJDaGVja2luZyBjb25uZWN0aW9uIGlzIGZyb20gYWxsb3dlZCBsaXN0IG9mIG9yaWdpbnM6IFwiK2MpO2E8Yy5sZW5ndGg7YSsrKWlmKGNbYV09PT1iKXtkPSEwO2JyZWFrfXJldHVybiBkfWZ1bmN0aW9uIGQoKXt2YXIgYT1QW1ddLnJlbW90ZUhvc3Q7cmV0dXJuIGgoVyxcIkNoZWNraW5nIGNvbm5lY3Rpb24gaXMgZnJvbTogXCIrYSksYj09PWF9cmV0dXJuIGMuY29uc3RydWN0b3I9PT1BcnJheT9hKCk6ZCgpfXZhciBiPWQub3JpZ2luLGM9UFtXXS5jaGVja09yaWdpbjtpZihjJiZcIlwiK2IhPVwibnVsbFwiJiYhYSgpKXRocm93IG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgbWVzc2FnZSByZWNlaXZlZCBmcm9tOiBcIitiK1wiIGZvciBcIitWLmlmcmFtZS5pZCtcIi4gTWVzc2FnZSB3YXM6IFwiK2QuZGF0YStcIi4gVGhpcyBlcnJvciBjYW4gYmUgZGlzYWJsZWQgYnkgc2V0dGluZyB0aGUgY2hlY2tPcmlnaW46IGZhbHNlIG9wdGlvbiBvciBieSBwcm92aWRpbmcgb2YgYXJyYXkgb2YgdHJ1c3RlZCBkb21haW5zLlwiKTtyZXR1cm4hMH1mdW5jdGlvbiBsKCl7cmV0dXJuIEs9PT0oXCJcIitVKS5zdWJzdHIoMCxMKSYmVS5zdWJzdHIoTCkuc3BsaXQoXCI6XCIpWzBdaW4gUH1mdW5jdGlvbiB3KCl7dmFyIGE9Vi50eXBlIGlue1widHJ1ZVwiOjEsXCJmYWxzZVwiOjEsdW5kZWZpbmVkOjF9O3JldHVybiBhJiZoKFcsXCJJZ25vcmluZyBpbml0IG1lc3NhZ2UgZnJvbSBtZXRhIHBhcmVudCBwYWdlXCIpLGF9ZnVuY3Rpb24geShhKXtyZXR1cm4gVS5zdWJzdHIoVS5pbmRleE9mKFwiOlwiKStKK2EpfWZ1bmN0aW9uIHooYSl7aChXLFwiTWVzc2FnZUNhbGxiYWNrIHBhc3NlZDoge2lmcmFtZTogXCIrVi5pZnJhbWUuaWQrXCIsIG1lc3NhZ2U6IFwiK2ErXCJ9XCIpLE4oXCJtZXNzYWdlQ2FsbGJhY2tcIix7aWZyYW1lOlYuaWZyYW1lLG1lc3NhZ2U6SlNPTi5wYXJzZShhKX0pLGgoVyxcIi0tXCIpfWZ1bmN0aW9uIEEoKXt2YXIgYj1kb2N1bWVudC5ib2R5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLGM9Vi5pZnJhbWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7cmV0dXJuIEpTT04uc3RyaW5naWZ5KHtpZnJhbWVIZWlnaHQ6Yy5oZWlnaHQsaWZyYW1lV2lkdGg6Yy53aWR0aCxjbGllbnRIZWlnaHQ6TWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCxhLmlubmVySGVpZ2h0fHwwKSxjbGllbnRXaWR0aDpNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsYS5pbm5lcldpZHRofHwwKSxvZmZzZXRUb3A6cGFyc2VJbnQoYy50b3AtYi50b3AsMTApLG9mZnNldExlZnQ6cGFyc2VJbnQoYy5sZWZ0LWIubGVmdCwxMCksc2Nyb2xsVG9wOmEucGFnZVlPZmZzZXQsc2Nyb2xsTGVmdDphLnBhZ2VYT2Zmc2V0fSl9ZnVuY3Rpb24gQihhLGIpe2Z1bmN0aW9uIGMoKXt1KFwiU2VuZCBQYWdlIEluZm9cIixcInBhZ2VJbmZvOlwiK0EoKSxhLGIpfXgoYywzMil9ZnVuY3Rpb24gQygpe2Z1bmN0aW9uIGQoYixjKXtmdW5jdGlvbiBkKCl7UFtnXT9CKFBbZ10uaWZyYW1lLGcpOmUoKX1bXCJzY3JvbGxcIixcInJlc2l6ZVwiXS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2goZyxiK2UrXCIgbGlzdGVuZXIgZm9yIHNlbmRQYWdlSW5mb1wiKSxjKGEsZSxkKX0pfWZ1bmN0aW9uIGUoKXtkKFwiUmVtb3ZlIFwiLGMpfWZ1bmN0aW9uIGYoKXtkKFwiQWRkIFwiLGIpfXZhciBnPVc7ZigpLFBbZ10uc3RvcFBhZ2VJbmZvPWV9ZnVuY3Rpb24gRCgpe1BbV10mJlBbV10uc3RvcFBhZ2VJbmZvJiYoUFtXXS5zdG9wUGFnZUluZm8oKSxkZWxldGUgUFtXXS5zdG9wUGFnZUluZm8pfWZ1bmN0aW9uIEUoKXt2YXIgYT0hMDtyZXR1cm4gbnVsbD09PVYuaWZyYW1lJiYoaihXLFwiSUZyYW1lIChcIitWLmlkK1wiKSBub3QgZm91bmRcIiksYT0hMSksYX1mdW5jdGlvbiBGKGEpe3ZhciBiPWEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7cmV0dXJuIG8oVykse3g6TWF0aC5mbG9vcihOdW1iZXIoYi5sZWZ0KStOdW1iZXIoTS54KSkseTpNYXRoLmZsb29yKE51bWJlcihiLnRvcCkrTnVtYmVyKE0ueSkpfX1mdW5jdGlvbiBHKGIpe2Z1bmN0aW9uIGMoKXtNPWcsSCgpLGgoVyxcIi0tXCIpfWZ1bmN0aW9uIGQoKXtyZXR1cm57eDpOdW1iZXIoVi53aWR0aCkrZi54LHk6TnVtYmVyKFYuaGVpZ2h0KStmLnl9fWZ1bmN0aW9uIGUoKXthLnBhcmVudElGcmFtZT9hLnBhcmVudElGcmFtZVtcInNjcm9sbFRvXCIrKGI/XCJPZmZzZXRcIjpcIlwiKV0oZy54LGcueSk6aihXLFwiVW5hYmxlIHRvIHNjcm9sbCB0byByZXF1ZXN0ZWQgcG9zaXRpb24sIHdpbmRvdy5wYXJlbnRJRnJhbWUgbm90IGZvdW5kXCIpfXZhciBmPWI/RihWLmlmcmFtZSk6e3g6MCx5OjB9LGc9ZCgpO2goVyxcIlJlcG9zaXRpb24gcmVxdWVzdGVkIGZyb20gaUZyYW1lIChvZmZzZXQgeDpcIitmLngrXCIgeTpcIitmLnkrXCIpXCIpLGEudG9wIT09YS5zZWxmP2UoKTpjKCl9ZnVuY3Rpb24gSCgpeyExIT09TihcInNjcm9sbENhbGxiYWNrXCIsTSk/cChXKTpxKCl9ZnVuY3Rpb24gSShiKXtmdW5jdGlvbiBjKCl7dmFyIGE9RihnKTtoKFcsXCJNb3ZpbmcgdG8gaW4gcGFnZSBsaW5rICgjXCIrZStcIikgYXQgeDogXCIrYS54K1wiIHk6IFwiK2EueSksTT17eDphLngseTphLnl9LEgoKSxoKFcsXCItLVwiKX1mdW5jdGlvbiBkKCl7YS5wYXJlbnRJRnJhbWU/YS5wYXJlbnRJRnJhbWUubW92ZVRvQW5jaG9yKGUpOmgoVyxcIkluIHBhZ2UgbGluayAjXCIrZStcIiBub3QgZm91bmQgYW5kIHdpbmRvdy5wYXJlbnRJRnJhbWUgbm90IGZvdW5kXCIpfXZhciBlPWIuc3BsaXQoXCIjXCIpWzFdfHxcIlwiLGY9ZGVjb2RlVVJJQ29tcG9uZW50KGUpLGc9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZil8fGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKGYpWzBdO2c/YygpOmEudG9wIT09YS5zZWxmP2QoKTpoKFcsXCJJbiBwYWdlIGxpbmsgI1wiK2UrXCIgbm90IGZvdW5kXCIpfWZ1bmN0aW9uIE4oYSxiKXtyZXR1cm4gbShXLGEsYil9ZnVuY3Rpb24gTygpe3N3aXRjaChQW1ddLmZpcnN0UnVuJiZUKCksVi50eXBlKXtjYXNlXCJjbG9zZVwiOm4oVi5pZnJhbWUpO2JyZWFrO2Nhc2VcIm1lc3NhZ2VcIjp6KHkoNikpO2JyZWFrO2Nhc2VcInNjcm9sbFRvXCI6RyghMSk7YnJlYWs7Y2FzZVwic2Nyb2xsVG9PZmZzZXRcIjpHKCEwKTticmVhaztjYXNlXCJwYWdlSW5mb1wiOkIoUFtXXS5pZnJhbWUsVyksQygpO2JyZWFrO2Nhc2VcInBhZ2VJbmZvU3RvcFwiOkQoKTticmVhaztjYXNlXCJpblBhZ2VMaW5rXCI6SSh5KDkpKTticmVhaztjYXNlXCJyZXNldFwiOnIoVik7YnJlYWs7Y2FzZVwiaW5pdFwiOmUoKSxOKFwiaW5pdENhbGxiYWNrXCIsVi5pZnJhbWUpLE4oXCJyZXNpemVkQ2FsbGJhY2tcIixWKTticmVhaztkZWZhdWx0OmUoKSxOKFwicmVzaXplZENhbGxiYWNrXCIsVil9fWZ1bmN0aW9uIFEoYSl7dmFyIGI9ITA7cmV0dXJuIFBbYV18fChiPSExLGooVi50eXBlK1wiIE5vIHNldHRpbmdzIGZvciBcIithK1wiLiBNZXNzYWdlIHdhczogXCIrVSkpLGJ9ZnVuY3Rpb24gUygpe2Zvcih2YXIgYSBpbiBQKXUoXCJpRnJhbWUgcmVxdWVzdGVkIGluaXRcIix2KGEpLGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGEpLGEpfWZ1bmN0aW9uIFQoKXtQW1ddLmZpcnN0UnVuPSExfXZhciBVPWQuZGF0YSxWPXt9LFc9bnVsbDtcIltpRnJhbWVSZXNpemVyQ2hpbGRdUmVhZHlcIj09PVU/UygpOmwoKT8oVj1mKCksVz1SPVYuaWQsIXcoKSYmUShXKSYmKGgoVyxcIlJlY2VpdmVkOiBcIitVKSxFKCkmJmsoKSYmTygpKSk6aShXLFwiSWdub3JlZDogXCIrVSl9ZnVuY3Rpb24gbShhLGIsYyl7dmFyIGQ9bnVsbCxlPW51bGw7aWYoUFthXSl7aWYoZD1QW2FdW2JdLFwiZnVuY3Rpb25cIiE9dHlwZW9mIGQpdGhyb3cgbmV3IFR5cGVFcnJvcihiK1wiIG9uIGlGcmFtZVtcIithK1wiXSBpcyBub3QgYSBmdW5jdGlvblwiKTtlPWQoYyl9cmV0dXJuIGV9ZnVuY3Rpb24gbihhKXt2YXIgYj1hLmlkO2goYixcIlJlbW92aW5nIGlGcmFtZTogXCIrYiksYS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGEpLG0oYixcImNsb3NlZENhbGxiYWNrXCIsYiksaChiLFwiLS1cIiksZGVsZXRlIFBbYl19ZnVuY3Rpb24gbyhiKXtudWxsPT09TSYmKE09e3g6dm9pZCAwIT09YS5wYWdlWE9mZnNldD9hLnBhZ2VYT2Zmc2V0OmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0LHk6dm9pZCAwIT09YS5wYWdlWU9mZnNldD9hLnBhZ2VZT2Zmc2V0OmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3B9LGgoYixcIkdldCBwYWdlIHBvc2l0aW9uOiBcIitNLngrXCIsXCIrTS55KSl9ZnVuY3Rpb24gcChiKXtudWxsIT09TSYmKGEuc2Nyb2xsVG8oTS54LE0ueSksaChiLFwiU2V0IHBhZ2UgcG9zaXRpb246IFwiK00ueCtcIixcIitNLnkpLHEoKSl9ZnVuY3Rpb24gcSgpe009bnVsbH1mdW5jdGlvbiByKGEpe2Z1bmN0aW9uIGIoKXtzKGEpLHUoXCJyZXNldFwiLFwicmVzZXRcIixhLmlmcmFtZSxhLmlkKX1oKGEuaWQsXCJTaXplIHJlc2V0IHJlcXVlc3RlZCBieSBcIisoXCJpbml0XCI9PT1hLnR5cGU/XCJob3N0IHBhZ2VcIjpcImlGcmFtZVwiKSksbyhhLmlkKSx0KGIsYSxcInJlc2V0XCIpfWZ1bmN0aW9uIHMoYSl7ZnVuY3Rpb24gYihiKXthLmlmcmFtZS5zdHlsZVtiXT1hW2JdK1wicHhcIixoKGEuaWQsXCJJRnJhbWUgKFwiK2UrXCIpIFwiK2IrXCIgc2V0IHRvIFwiK2FbYl0rXCJweFwiKX1mdW5jdGlvbiBjKGIpe0h8fFwiMFwiIT09YVtiXXx8KEg9ITAsaChlLFwiSGlkZGVuIGlGcmFtZSBkZXRlY3RlZCwgY3JlYXRpbmcgdmlzaWJpbGl0eSBsaXN0ZW5lclwiKSx5KCkpfWZ1bmN0aW9uIGQoYSl7YihhKSxjKGEpfXZhciBlPWEuaWZyYW1lLmlkO1BbZV0mJihQW2VdLnNpemVIZWlnaHQmJmQoXCJoZWlnaHRcIiksUFtlXS5zaXplV2lkdGgmJmQoXCJ3aWR0aFwiKSl9ZnVuY3Rpb24gdChhLGIsYyl7YyE9PWIudHlwZSYmTj8oaChiLmlkLFwiUmVxdWVzdGluZyBhbmltYXRpb24gZnJhbWVcIiksTihhKSk6YSgpfWZ1bmN0aW9uIHUoYSxiLGMsZCl7ZnVuY3Rpb24gZSgpe3ZhciBlPVBbZF0udGFyZ2V0T3JpZ2luO2goZCxcIltcIithK1wiXSBTZW5kaW5nIG1zZyB0byBpZnJhbWVbXCIrZCtcIl0gKFwiK2IrXCIpIHRhcmdldE9yaWdpbjogXCIrZSksYy5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKEsrYixlKX1mdW5jdGlvbiBmKCl7aShkLFwiW1wiK2ErXCJdIElGcmFtZShcIitkK1wiKSBub3QgZm91bmRcIiksUFtkXSYmZGVsZXRlIFBbZF19ZnVuY3Rpb24gZygpe2MmJlwiY29udGVudFdpbmRvd1wiaW4gYyYmbnVsbCE9PWMuY29udGVudFdpbmRvdz9lKCk6ZigpfWQ9ZHx8Yy5pZCxQW2RdJiZnKCl9ZnVuY3Rpb24gdihhKXtyZXR1cm4gYStcIjpcIitQW2FdLmJvZHlNYXJnaW5WMStcIjpcIitQW2FdLnNpemVXaWR0aCtcIjpcIitQW2FdLmxvZytcIjpcIitQW2FdLmludGVydmFsK1wiOlwiK1BbYV0uZW5hYmxlUHVibGljTWV0aG9kcytcIjpcIitQW2FdLmF1dG9SZXNpemUrXCI6XCIrUFthXS5ib2R5TWFyZ2luK1wiOlwiK1BbYV0uaGVpZ2h0Q2FsY3VsYXRpb25NZXRob2QrXCI6XCIrUFthXS5ib2R5QmFja2dyb3VuZCtcIjpcIitQW2FdLmJvZHlQYWRkaW5nK1wiOlwiK1BbYV0udG9sZXJhbmNlK1wiOlwiK1BbYV0uaW5QYWdlTGlua3MrXCI6XCIrUFthXS5yZXNpemVGcm9tK1wiOlwiK1BbYV0ud2lkdGhDYWxjdWxhdGlvbk1ldGhvZH1mdW5jdGlvbiB3KGEsYyl7ZnVuY3Rpb24gZCgpe2Z1bmN0aW9uIGIoYil7MS8wIT09UFt3XVtiXSYmMCE9PVBbd11bYl0mJihhLnN0eWxlW2JdPVBbd11bYl0rXCJweFwiLGgodyxcIlNldCBcIitiK1wiID0gXCIrUFt3XVtiXStcInB4XCIpKX1mdW5jdGlvbiBjKGEpe2lmKFBbd11bXCJtaW5cIithXT5QW3ddW1wibWF4XCIrYV0pdGhyb3cgbmV3IEVycm9yKFwiVmFsdWUgZm9yIG1pblwiK2ErXCIgY2FuIG5vdCBiZSBncmVhdGVyIHRoYW4gbWF4XCIrYSl9YyhcIkhlaWdodFwiKSxjKFwiV2lkdGhcIiksYihcIm1heEhlaWdodFwiKSxiKFwibWluSGVpZ2h0XCIpLGIoXCJtYXhXaWR0aFwiKSxiKFwibWluV2lkdGhcIil9ZnVuY3Rpb24gZSgpe3ZhciBhPWMmJmMuaWR8fFMuaWQrRisrO3JldHVybiBudWxsIT09ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYSkmJihhKz1GKyspLGF9ZnVuY3Rpb24gZihiKXtyZXR1cm4gUj1iLFwiXCI9PT1iJiYoYS5pZD1iPWUoKSxHPShjfHx7fSkubG9nLFI9YixoKGIsXCJBZGRlZCBtaXNzaW5nIGlmcmFtZSBJRDogXCIrYitcIiAoXCIrYS5zcmMrXCIpXCIpKSxifWZ1bmN0aW9uIGcoKXtoKHcsXCJJRnJhbWUgc2Nyb2xsaW5nIFwiKyhQW3ddLnNjcm9sbGluZz9cImVuYWJsZWRcIjpcImRpc2FibGVkXCIpK1wiIGZvciBcIit3KSxhLnN0eWxlLm92ZXJmbG93PSExPT09UFt3XS5zY3JvbGxpbmc/XCJoaWRkZW5cIjpcImF1dG9cIixhLnNjcm9sbGluZz0hMT09PVBbd10uc2Nyb2xsaW5nP1wibm9cIjpcInllc1wifWZ1bmN0aW9uIGkoKXsoXCJudW1iZXJcIj09dHlwZW9mIFBbd10uYm9keU1hcmdpbnx8XCIwXCI9PT1QW3ddLmJvZHlNYXJnaW4pJiYoUFt3XS5ib2R5TWFyZ2luVjE9UFt3XS5ib2R5TWFyZ2luLFBbd10uYm9keU1hcmdpbj1cIlwiK1Bbd10uYm9keU1hcmdpbitcInB4XCIpfWZ1bmN0aW9uIGsoKXt2YXIgYj1QW3ddLmZpcnN0UnVuLGM9UFt3XS5oZWlnaHRDYWxjdWxhdGlvbk1ldGhvZCBpbiBPOyFiJiZjJiZyKHtpZnJhbWU6YSxoZWlnaHQ6MCx3aWR0aDowLHR5cGU6XCJpbml0XCJ9KX1mdW5jdGlvbiBsKCl7RnVuY3Rpb24ucHJvdG90eXBlLmJpbmQmJihQW3ddLmlmcmFtZS5pRnJhbWVSZXNpemVyPXtjbG9zZTpuLmJpbmQobnVsbCxQW3ddLmlmcmFtZSkscmVzaXplOnUuYmluZChudWxsLFwiV2luZG93IHJlc2l6ZVwiLFwicmVzaXplXCIsUFt3XS5pZnJhbWUpLG1vdmVUb0FuY2hvcjpmdW5jdGlvbihhKXt1KFwiTW92ZSB0byBhbmNob3JcIixcIm1vdmVUb0FuY2hvcjpcIithLFBbd10uaWZyYW1lLHcpfSxzZW5kTWVzc2FnZTpmdW5jdGlvbihhKXthPUpTT04uc3RyaW5naWZ5KGEpLHUoXCJTZW5kIE1lc3NhZ2VcIixcIm1lc3NhZ2U6XCIrYSxQW3ddLmlmcmFtZSx3KX19KX1mdW5jdGlvbiBtKGMpe2Z1bmN0aW9uIGQoKXt1KFwiaUZyYW1lLm9ubG9hZFwiLGMsYSksaygpfWIoYSxcImxvYWRcIixkKSx1KFwiaW5pdFwiLGMsYSl9ZnVuY3Rpb24gbyhhKXtpZihcIm9iamVjdFwiIT10eXBlb2YgYSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiT3B0aW9ucyBpcyBub3QgYW4gb2JqZWN0XCIpfWZ1bmN0aW9uIHAoYSl7Zm9yKHZhciBiIGluIFMpUy5oYXNPd25Qcm9wZXJ0eShiKSYmKFBbd11bYl09YS5oYXNPd25Qcm9wZXJ0eShiKT9hW2JdOlNbYl0pfWZ1bmN0aW9uIHEoYSl7cmV0dXJuXCJcIj09PWF8fFwiZmlsZTovL1wiPT09YT9cIipcIjphfWZ1bmN0aW9uIHMoYil7Yj1ifHx7fSxQW3ddPXtmaXJzdFJ1bjohMCxpZnJhbWU6YSxyZW1vdGVIb3N0OmEuc3JjLnNwbGl0KFwiL1wiKS5zbGljZSgwLDMpLmpvaW4oXCIvXCIpfSxvKGIpLHAoYiksUFt3XS50YXJnZXRPcmlnaW49ITA9PT1QW3ddLmNoZWNrT3JpZ2luP3EoUFt3XS5yZW1vdGVIb3N0KTpcIipcIn1mdW5jdGlvbiB0KCl7cmV0dXJuIHcgaW4gUCYmXCJpRnJhbWVSZXNpemVyXCJpbiBhfXZhciB3PWYoYS5pZCk7dCgpP2oodyxcIklnbm9yZWQgaUZyYW1lLCBhbHJlYWR5IHNldHVwLlwiKToocyhjKSxnKCksZCgpLGkoKSxtKHYodykpLGwoKSl9ZnVuY3Rpb24geChhLGIpe251bGw9PT1RJiYoUT1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7UT1udWxsLGEoKX0sYikpfWZ1bmN0aW9uIHkoKXtmdW5jdGlvbiBiKCl7ZnVuY3Rpb24gYShhKXtmdW5jdGlvbiBiKGIpe3JldHVyblwiMHB4XCI9PT1QW2FdLmlmcmFtZS5zdHlsZVtiXX1mdW5jdGlvbiBjKGEpe3JldHVybiBudWxsIT09YS5vZmZzZXRQYXJlbnR9YyhQW2FdLmlmcmFtZSkmJihiKFwiaGVpZ2h0XCIpfHxiKFwid2lkdGhcIikpJiZ1KFwiVmlzaWJpbGl0eSBjaGFuZ2VcIixcInJlc2l6ZVwiLFBbYV0uaWZyYW1lLGEpfWZvcih2YXIgYiBpbiBQKWEoYil9ZnVuY3Rpb24gYyhhKXtoKFwid2luZG93XCIsXCJNdXRhdGlvbiBvYnNlcnZlZDogXCIrYVswXS50YXJnZXQrXCIgXCIrYVswXS50eXBlKSx4KGIsMTYpfWZ1bmN0aW9uIGQoKXt2YXIgYT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKSxiPXthdHRyaWJ1dGVzOiEwLGF0dHJpYnV0ZU9sZFZhbHVlOiExLGNoYXJhY3RlckRhdGE6ITAsY2hhcmFjdGVyRGF0YU9sZFZhbHVlOiExLGNoaWxkTGlzdDohMCxzdWJ0cmVlOiEwfSxkPW5ldyBlKGMpO2Qub2JzZXJ2ZShhLGIpfXZhciBlPWEuTXV0YXRpb25PYnNlcnZlcnx8YS5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO2UmJmQoKX1mdW5jdGlvbiB6KGEpe2Z1bmN0aW9uIGIoKXtCKFwiV2luZG93IFwiK2EsXCJyZXNpemVcIil9aChcIndpbmRvd1wiLFwiVHJpZ2dlciBldmVudDogXCIrYSkseChiLDE2KX1mdW5jdGlvbiBBKCl7ZnVuY3Rpb24gYSgpe0IoXCJUYWIgVmlzYWJsZVwiLFwicmVzaXplXCIpfVwiaGlkZGVuXCIhPT1kb2N1bWVudC52aXNpYmlsaXR5U3RhdGUmJihoKFwiZG9jdW1lbnRcIixcIlRyaWdnZXIgZXZlbnQ6IFZpc2libGl0eSBjaGFuZ2VcIikseChhLDE2KSl9ZnVuY3Rpb24gQihhLGIpe2Z1bmN0aW9uIGMoYSl7cmV0dXJuXCJwYXJlbnRcIj09PVBbYV0ucmVzaXplRnJvbSYmUFthXS5hdXRvUmVzaXplJiYhUFthXS5maXJzdFJ1bn1mb3IodmFyIGQgaW4gUCljKGQpJiZ1KGEsYixkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkKSxkKX1mdW5jdGlvbiBDKCl7YihhLFwibWVzc2FnZVwiLGwpLGIoYSxcInJlc2l6ZVwiLGZ1bmN0aW9uKCl7eihcInJlc2l6ZVwiKX0pLGIoZG9jdW1lbnQsXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsQSksYihkb2N1bWVudCxcIi13ZWJraXQtdmlzaWJpbGl0eWNoYW5nZVwiLEEpLGIoYSxcImZvY3VzaW5cIixmdW5jdGlvbigpe3ooXCJmb2N1c1wiKX0pLGIoYSxcImZvY3VzXCIsZnVuY3Rpb24oKXt6KFwiZm9jdXNcIil9KX1mdW5jdGlvbiBEKCl7ZnVuY3Rpb24gYShhLGMpe2Z1bmN0aW9uIGQoKXtpZighYy50YWdOYW1lKXRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgaXMgbm90IGEgdmFsaWQgRE9NIGVsZW1lbnRcIik7aWYoXCJJRlJBTUVcIiE9PWMudGFnTmFtZS50b1VwcGVyQ2FzZSgpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJFeHBlY3RlZCA8SUZSQU1FPiB0YWcsIGZvdW5kIDxcIitjLnRhZ05hbWUrXCI+XCIpfWMmJihkKCksdyhjLGEpLGIucHVzaChjKSl9dmFyIGI7cmV0dXJuIGQoKSxDKCksZnVuY3Rpb24oYyxkKXtzd2l0Y2goYj1bXSx0eXBlb2YgZCl7Y2FzZVwidW5kZWZpbmVkXCI6Y2FzZVwic3RyaW5nXCI6QXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGR8fFwiaWZyYW1lXCIpLGEuYmluZCh2b2lkIDAsYykpO2JyZWFrO2Nhc2VcIm9iamVjdFwiOmEoYyxkKTticmVhaztkZWZhdWx0OnRocm93IG5ldyBUeXBlRXJyb3IoXCJVbmV4cGVjdGVkIGRhdGEgdHlwZSAoXCIrdHlwZW9mIGQrXCIpXCIpfXJldHVybiBifX1mdW5jdGlvbiBFKGEpe2EuZm4/YS5mbi5pRnJhbWVSZXNpemU9ZnVuY3Rpb24oYSl7ZnVuY3Rpb24gYihiLGMpe3coYyxhKX1yZXR1cm4gdGhpcy5maWx0ZXIoXCJpZnJhbWVcIikuZWFjaChiKS5lbmQoKX06aShcIlwiLFwiVW5hYmxlIHRvIGJpbmQgdG8galF1ZXJ5LCBpdCBpcyBub3QgZnVsbHkgbG9hZGVkLlwiKX12YXIgRj0wLEc9ITEsSD0hMSxJPVwibWVzc2FnZVwiLEo9SS5sZW5ndGgsSz1cIltpRnJhbWVTaXplcl1cIixMPUsubGVuZ3RoLE09bnVsbCxOPWEucmVxdWVzdEFuaW1hdGlvbkZyYW1lLE89e21heDoxLHNjcm9sbDoxLGJvZHlTY3JvbGw6MSxkb2N1bWVudEVsZW1lbnRTY3JvbGw6MX0sUD17fSxRPW51bGwsUj1cIkhvc3QgUGFnZVwiLFM9e2F1dG9SZXNpemU6ITAsYm9keUJhY2tncm91bmQ6bnVsbCxib2R5TWFyZ2luOm51bGwsYm9keU1hcmdpblYxOjgsYm9keVBhZGRpbmc6bnVsbCxjaGVja09yaWdpbjohMCxpblBhZ2VMaW5rczohMSxlbmFibGVQdWJsaWNNZXRob2RzOiEwLGhlaWdodENhbGN1bGF0aW9uTWV0aG9kOlwiYm9keU9mZnNldFwiLGlkOlwiaUZyYW1lUmVzaXplclwiLGludGVydmFsOjMyLGxvZzohMSxtYXhIZWlnaHQ6MS8wLG1heFdpZHRoOjEvMCxtaW5IZWlnaHQ6MCxtaW5XaWR0aDowLHJlc2l6ZUZyb206XCJwYXJlbnRcIixzY3JvbGxpbmc6ITEsc2l6ZUhlaWdodDohMCxzaXplV2lkdGg6ITEsdG9sZXJhbmNlOjAsd2lkdGhDYWxjdWxhdGlvbk1ldGhvZDpcInNjcm9sbFwiLGNsb3NlZENhbGxiYWNrOmZ1bmN0aW9uKCl7fSxpbml0Q2FsbGJhY2s6ZnVuY3Rpb24oKXt9LG1lc3NhZ2VDYWxsYmFjazpmdW5jdGlvbigpe2ooXCJNZXNzYWdlQ2FsbGJhY2sgZnVuY3Rpb24gbm90IGRlZmluZWRcIil9LHJlc2l6ZWRDYWxsYmFjazpmdW5jdGlvbigpe30sc2Nyb2xsQ2FsbGJhY2s6ZnVuY3Rpb24oKXtyZXR1cm4hMH19O2EualF1ZXJ5JiZFKGpRdWVyeSksXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXSxEKTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9RCgpOmEuaUZyYW1lUmVzaXplPWEuaUZyYW1lUmVzaXplfHxEKCl9KHdpbmRvd3x8e30pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aWZyYW1lUmVzaXplci5tYXAiLCIndXNlIHN0cmljdCc7XG5cbi8vU2hvdyBhbmQgaGlkZSB0aGUgc3Bpbm5lciBmb3IgYWxsIGFqYXggcmVxdWVzdHMuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpe1xuXG4gIHZhclxuICAgIGluaXRNb2R1bGU7XG5cbiAgaW5pdE1vZHVsZSA9IGZ1bmN0aW9uKCl7XG4gICAgJChkb2N1bWVudClcbiAgICAgIC5hamF4U3RhcnQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAkKFwiI2FqYXgtc3Bpbm5lclwiKS5zaG93KCk7XG4gICAgICB9KVxuICAgICAgLmFqYXhTdG9wKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJChcIiNhamF4LXNwaW5uZXJcIikuaGlkZSgpO1xuICAgICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIHsgaW5pdE1vZHVsZSAgICAgOiBpbml0TW9kdWxlIH07XG59KCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpe1xuXG4gIHZhciBQYW5lbEdyb3VwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGxvYWRBcnRpY2xlU2V0czogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGVuZHBvaW50ID0gXCJodHRwczovL2V1dGlscy5uY2JpLm5sbS5uaWguZ292L2VudHJlei9ldXRpbHMvZWZldGNoLmZjZ2k/ZGI9cHVibWVkJnJldG1vZGU9eG1sJnJldHR5cGU9YWJzdHJhY3QmaWQ9XCIsXG4gICAgICAgIGRlZmVycmVkcyA9IFtdLFxuICAgICAgICByZWNvbWJpbmVkID0gW107XG5cbiAgICAgIC8vIFBvcHVsYXRlIHRoZSBhcnJheSBvZiBhamF4IGRlZmVycmVkIG9iamVjdHMgKyBtZXRhZGF0YVxuICAgICAgJC5lYWNoKHRoaXMucHJvcHMuaW5wdXQsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSl7XG5cbiAgICAgICAgLy8gUHJvdGVjdCBhZ2FpbnN0IG1pc3NpbmcgZGF0YSBmaWVsZHNcbiAgICAgICAgdmFyIHVpZF9saXN0ID0gdmFsdWUudWlkcyB8fCBbXSxcbiAgICAgICAgY2F0ZWdvcnkgPSB2YWx1ZS5jYXRlZ29yeSB8fCAnJztcblxuICAgICAgICAvLyBUaGlzIHdpbGwgaGFuZyBpZiB2YWx1ZS54IGlzIG51bGxcbiAgICAgICAgZGVmZXJyZWRzLnB1c2goe1xuICAgICAgICAgIGRlZmVycmVkOiAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIHVybDogZW5kcG9pbnQgKyB1aWRfbGlzdC5qb2luKCcsJyksXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICBkYXRhVHlwZTogXCJ4bWxcIlxuICAgICAgICAgIH0pLFxuICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICBjYXRlZ29yeTogY2F0ZWdvcnlcbiAgICAgICAgfSlcbiAgICAgIH0pO1xuXG5cbiAgICAgIC8vIGZ1bmN0aW9uIHFOZXh0XG4gICAgICAvLyBQcm9jZXNzIHRoZSBkZWZlcnJlZCBvYmplY3RzIGFycmF5IHNlcmlhbGx5XG4gICAgICBmdW5jdGlvbiBxTmV4dCgpIHtcbiAgICAgICAgdmFyIG8gPSBkZWZlcnJlZHMuc2hpZnQoKTsgLy9yZW1vdmUgZmlyc3QgZWxlbWVudFxuICAgICAgICBpZihvKXtcbiAgICAgICAgICBvLmRlZmVycmVkXG4gICAgICAgICAgICAuZG9uZShmdW5jdGlvbiggeG1sLCB0ZXh0U3RhdHVzLCBqcVhIUiApe1xuICAgICAgICAgICAgICByZWNvbWJpbmVkLnB1c2goe1xuICAgICAgICAgICAgICAgIHhtbDogICAgICB4bWwsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IG8uY2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgaW5kZXg6ICAgIG8uaW5kZXhcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoeyBkYXRhOiByZWNvbWJpbmVkIH0pO1xuICAgICAgICAgICAgICBxTmV4dCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gUG9wdWxhdGUgdGhlIHBhbmVsIHNlcmlhbGx5XG4gICAgICBxTmV4dCgpO1xuICAgIH0sXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7ZGF0YTogW119O1xuICAgIH0sXG4gICAgLy8gSGVyZSwgY29tcG9uZW50RGlkTW91bnQgaXMgYSBtZXRob2QgY2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgUmVhY3QgYWZ0ZXJcbiAgICAvLyBhIGNvbXBvbmVudCBpcyByZW5kZXJlZCBmb3IgdGhlIGZpcnN0IHRpbWUuXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5sb2FkQXJ0aWNsZVNldHMoKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICB2YXJcbiAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgc3R5bGVzID0ge1xuICAgICAgICBjYXRlZ29yeToge1xuICAgICAgICAgIG1hcmdpblRvcDogJzNlbSdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHBhbmVsTm9kZXMgPVxuICAgICAgICB0aGlzLnN0YXRlLmRhdGEubWFwKGZ1bmN0aW9uKHZhbHVlLCBpKXtcbiAgICAgICAgICB2YXIgc3VicGFuZWwgPSAkKCB2YWx1ZS54bWwgKVxuICAgICAgICAgICAgLmZpbmQoIFwiUHVibWVkQXJ0aWNsZVwiIClcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24oaiwgYXJ0aWNsZSl7XG4gICAgICAgICAgICAgIHZhciBkID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8UGFuZWxHcm91cC5QYW5lbCBkYXRhPXthcnRpY2xlfSBpZD17IFsnaWRlbnRpZmllcicsIGksIGosIGRdLmpvaW4oJy0nKSB9IGtleT17an0gLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VicGFuZWxcIiBrZXk9e2l9PlxuICAgICAgICAgICAgICB7KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLmNhdGVnb3J5KSB7XG4gICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IFN0cmluZyh2YWx1ZS5jYXRlZ29yeSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9bIVxcXCIjJCUmJ1xcKFxcKVxcKlxcKyxcXC5cXC86Ozw9PlxcP1xcQFxcW1xcXFxcXF1cXF5gXFx7XFx8XFx9fl0vZywgJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxzL2csJycpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj17W1wiI1wiLCBuYW1lXS5qb2luKCcnKX0gbmFtZT17bmFtZX0+XG4gICAgICAgICAgICAgICAgICAgICAgPGgzIHN0eWxlPXtzdHlsZXMuY2F0ZWdvcnl9IGNsYXNzTmFtZT1cImNhdGVnb3J5XCI+e3ZhbHVlLmNhdGVnb3J5fTwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KCkpfVxuICAgICAgICAgICAgICB7c3VicGFuZWx9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtZ3JvdXBcIiBpZD1cImFjY29yZGlvblwiIHJvbGU9XCJ0YWJsaXN0XCI+XG4gICAgICAgICAge3BhbmVsTm9kZXN9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gIH0pO1xuXG4gIFBhbmVsR3JvdXAuUGFuZWwgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgcmF3TWFya3VwOiBmdW5jdGlvbiggaHRtbCApe1xuICAgICAgcmV0dXJuIHtfX2h0bWw6IGh0bWx9O1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcblxuICAgICAgdmFyXG4gICAgICAgICRwdWJtZWRBcnRpY2xlLCAkcG1jSURcbiAgICAgICwgJG1lZGxpbmVDaXRhdGlvbiwgJHBtaWRcbiAgICAgICwgJGFydGljbGUsICRhcnRpY2xlVGl0bGVcbiAgICAgICwgJGFic3RyYWN0VGV4dFxuICAgICAgLCAkYXV0aG9yLCAkYXV0aG9yZmlyc3QsICRhdXRob3JsYXN0LCAkY29sbGVjdGl2ZU5hbWUsIGF1dGhvclRleHRcbiAgICAgICwgJG1lc2hkZXNjcmlwdG9yXG4gICAgICAsICRqb3VybmFsLCAkam91cm5hbFZvbHVtZSwgJGpvdXJuYWxZZWFyLCAkam91cm5hbElTT0FiYnJldmlhdGlvblxuICAgICAgO1xuXG4gICAgICAvLyBGaW5kIHRoZSByZXF1aXJlZCBYTUwgZWxlbWVudHNcbiAgICAgICRwdWJtZWRBcnRpY2xlID0gJCh0aGlzLnByb3BzLmRhdGEpO1xuICAgICAgJG1lZGxpbmVDaXRhdGlvbiA9ICRwdWJtZWRBcnRpY2xlLmZpbmQoJ01lZGxpbmVDaXRhdGlvbicpO1xuXG4gICAgICAvLyBsaW5rIGluZm9cbiAgICAgICRwbWlkID0gJG1lZGxpbmVDaXRhdGlvbi5jaGlsZHJlbignUE1JRCcpO1xuICAgICAgJHBtY0lEID0gJHB1Ym1lZEFydGljbGUuZmluZCgnUHVibWVkRGF0YSBBcnRpY2xlSWRMaXN0IEFydGljbGVJZFtJZFR5cGU9XCJwbWNcIl0nKTtcblxuICAgICAgLy9BcnRpY2xlXG4gICAgICAkYXJ0aWNsZSA9ICRtZWRsaW5lQ2l0YXRpb24uZmluZCgnQXJ0aWNsZScpO1xuICAgICAgJGFydGljbGVUaXRsZSA9ICRhcnRpY2xlLmZpbmQoJ0FydGljbGVUaXRsZScpO1xuICAgICAgJGFic3RyYWN0VGV4dCA9ICRhcnRpY2xlLmZpbmQoJ0Fic3RyYWN0IEFic3RyYWN0VGV4dCcpOyAvL2NvdWxkIGJlIGFuIGFycmF5XG4gICAgICAvL0F1dGhvckxpc3RcbiAgICAgICRhdXRob3IgPSAkcHVibWVkQXJ0aWNsZS5maW5kKCdBdXRob3JMaXN0IEF1dGhvcicpLmZpcnN0KCk7IC8vIGNvdWxkIGJlIDxDb2xsZWN0aXZlTmFtZT5cbiAgICAgICRhdXRob3JmaXJzdCA9ICRhdXRob3IuZmluZCgnRm9yZU5hbWUnKTtcbiAgICAgICRhdXRob3JsYXN0ID0gJGF1dGhvci5maW5kKCdMYXN0TmFtZScpO1xuICAgICAgJGNvbGxlY3RpdmVOYW1lID0gJGF1dGhvci5maW5kKCdDb2xsZWN0aXZlTmFtZScpO1xuICAgICAgYXV0aG9yVGV4dCA9ICRhdXRob3JsYXN0LnRleHQoKSA/XG4gICAgICAgIFskYXV0aG9ybGFzdC50ZXh0KCksICRhdXRob3JmaXJzdC50ZXh0KClbMF1dLmpvaW4oJyAnKSA6XG4gICAgICAgICRjb2xsZWN0aXZlTmFtZS50ZXh0KCk7XG5cbiAgICAgIC8vTWVzaEhlYWRpbmdMaXN0IC0gYWRkIHVwIHRvIDEwIHRlcm1zXG4gICAgICAkbWVzaGRlc2NyaXB0b3IgPSAkbWVkbGluZUNpdGF0aW9uLmZpbmQoJ01lc2hIZWFkaW5nTGlzdCBNZXNoSGVhZGluZyBEZXNjcmlwdG9yTmFtZScpO1xuXG4gICAgICAvL0pvdXJuYWxJc3N1ZVxuICAgICAgJGpvdXJuYWwgPSAkYXJ0aWNsZS5maW5kKCdKb3VybmFsJyk7XG4gICAgICAkam91cm5hbFZvbHVtZSA9ICRqb3VybmFsLmZpbmQoJ0pvdXJuYWxJc3N1ZSBWb2x1bWUnKTtcbiAgICAgICRqb3VybmFsWWVhciA9ICRqb3VybmFsLmZpbmQoJ0pvdXJuYWxJc3N1ZSBQdWJEYXRlIFllYXInKTtcbiAgICAgIC8vRHVtYiBlZGdlIGNhc2VcbiAgICAgIGlmKCEkam91cm5hbFllYXIudGV4dCgpKXtcbiAgICAgICAgJGpvdXJuYWxZZWFyID0gJGpvdXJuYWwuZmluZCgnSm91cm5hbElzc3VlIFB1YkRhdGUgTWVkbGluZURhdGUnKTtcbiAgICAgIH1cbiAgICAgICRqb3VybmFsSVNPQWJicmV2aWF0aW9uID0gJGpvdXJuYWwuZmluZCgnSVNPQWJicmV2aWF0aW9uJyk7XG5cblxuICAgICAgLy8gQXJ0aWNsZSBpbmZvXG4gICAgICB2YXIgYXJ0aWNsZUpvdXJuYWwgPSBbXG4gICAgICAgICAkam91cm5hbElTT0FiYnJldmlhdGlvbi50ZXh0KCksXG4gICAgICAgICBcInZvbC4gXCIgKyAkam91cm5hbFZvbHVtZS50ZXh0KCksXG4gICAgICAgICAgXCIoXCIgKyAkam91cm5hbFllYXIudGV4dCgpICsgXCIpXCJcbiAgICAgICAgXS5qb2luKCcgJyk7XG5cbiAgICAgIC8vIGFic3RyYWN0IHRleHQgLSBjb3VsZCBiZSBhbiBhcnJheVxuICAgICAgdmFyIGFic3RyYWN0ID0gICRhYnN0cmFjdFRleHQubWFwKGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBbICQoIHRoaXMgKS5hdHRyKCdMYWJlbCcpLCAkKCB0aGlzICkudGV4dCgpLCAnPGJyLz4nIF0uam9pbignPGJyLz4nKTtcbiAgICAgIH0pLmdldCgpLmpvaW4oJycpO1xuXG4gICAgICAvLyBNZXNoIEhlYWRpbmcgYmFkZ2VzXG4gICAgICB2YXIgbWVzaGVzID0gJG1lc2hkZXNjcmlwdG9yLnNsaWNlKDAsIDUpLm1hcChmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gWyc8c3BhbiBjbGFzcz1cImJhZGdlXCI+JywgJCggdGhpcyApLnRleHQoKSwgJzwvc3Bhbj4nXS5qb2luKCcnKTtcbiAgICAgIH0pLmdldCgpLmpvaW4oJycpO1xuXG4gICAgICB2YXIgc3R5bGVzID0ge1xuICAgICAgICBwYW5lbDoge1xuICAgICAgICAgIGE6IHtcbiAgICAgICAgICAgIHRleHREZWNvcmF0aW9uOiAnbm9uZSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBhbmVsSGVhZGluZzoge1xuICAgICAgICAgICAgZGl2OiB7XG4gICAgICAgICAgICAgIHBhZGRpbmc6ICcwLjhlbScsXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjMzQ0OTVlJyxcbiAgICAgICAgICAgICAgY29sb3I6ICcjZWNmMGYxJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhbmVsVGl0bGU6IHtcbiAgICAgICAgICAgICAgZm9udFNpemU6ICcxLjJyZW0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGFuZWxNZXRhOiB7XG4gICAgICAgICAgICAgIGNvbG9yOiAnIzk1YTVhNidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYWRnZToge1xuICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnMjAwJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbFwiPlxuICAgICAgICAgIDxhIHN0eWxlPXtzdHlsZXMucGFuZWwuYX0gY2xhc3NOYW1lPVwicGFuZWwtdG9nZ2xlXCIgaHJlZj17W1wiI1wiLCB0aGlzLnByb3BzLmlkXS5qb2luKCcnKX0gcm9sZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXBhcmVudD1cIiNhY2NvcmRpb25cIj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5wYW5lbC5wYW5lbEhlYWRpbmcuZGl2fSBjbGFzc05hbWU9XCJyZWFkaW5nLWxpc3QgcGFuZWwtaGVhZGluZ1wiIHJvbGU9XCJ0YWJcIiBpZD1cImhlYWRpbmdPbmVcIj5cbiAgICAgICAgICAgICAgPGgyIHN0eWxlPXtzdHlsZXMucGFuZWwucGFuZWxIZWFkaW5nLnBhbmVsVGl0bGV9IGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlXCI+eyRhcnRpY2xlVGl0bGUudGV4dCgpfTwvaDI+XG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMucGFuZWwucGFuZWxIZWFkaW5nLnBhbmVsTWV0YX0gY2xhc3NOYW1lPVwicGFuZWwtbWV0YSBhdXRob3JcIj5cbiAgICAgICAgICAgICAgICB7YXV0aG9yVGV4dH1cbiAgICAgICAgICAgICAgPC9zcGFuPjxici8+XG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMucGFuZWwucGFuZWxIZWFkaW5nLnBhbmVsTWV0YX0gY2xhc3NOYW1lPVwicGFuZWwtbWV0YSBqb3VybmFsXCI+eyBhcnRpY2xlSm91cm5hbCB9PC9zcGFuPlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucGFuZWwucGFuZWxIZWFkaW5nLmJhZGdlfSBjbGFzc05hbWU9XCJwYW5lbC1tZXRhIHJlYWRpbmctbGlzdCBiYWRnZS1saXN0XCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3RoaXMucmF3TWFya3VwKG1lc2hlcyl9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2E+XG4gICAgICAgICAgPGRpdiBpZD17dGhpcy5wcm9wcy5pZH0gY2xhc3NOYW1lPVwicGFuZWwtY29sbGFwc2UgY29sbGFwc2VcIiByb2xlPVwidGFicGFuZWxcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtYm9keVwiPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJhYnN0cmFjdC10ZXh0XCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3RoaXMucmF3TWFya3VwKGFic3RyYWN0KX0gLz5cbiAgICAgICAgICAgICAgeyhmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHZhciByZWNvcmQ7XG4gICAgICAgICAgICAgICAgaWYgKCRwbWNJRC50ZXh0KCkpIHtcblxuICAgICAgICAgICAgICAgICAgcmVjb3JkID0gPGEgc3R5bGU9e3N0eWxlcy5wYW5lbC5hfSBjbGFzc05hbWU9XCJhcnRpY2xlLWxpbmtcIiB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPXtbXCJodHRwOi8vd3d3Lm5jYmkubmxtLm5paC5nb3YvcG1jL1wiLCAkcG1jSUQudGV4dCgpXS5qb2luKCcnKX0+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWxpbmsgZmEtbGdcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIHtbXCIgUHViTWVkIENlbnRyYWw6IFwiLCAkcG1jSUQudGV4dCgpXS5qb2luKCcnKX1cbiAgICAgICAgICAgICAgICAgIDwvYT5cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZWNvcmQgPSA8YSBzdHlsZT17c3R5bGVzLnBhbmVsLmF9IGNsYXNzTmFtZT1cImFydGljbGUtbGlua1wiIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9e1tcImh0dHA6Ly93d3cubmNiaS5ubG0ubmloLmdvdi9wdWJtZWQvXCIsICRwbWlkLnRleHQoKV0uam9pbignJyl9PlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1saW5rIGZhLWxnXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICB7W1wiIFB1Yk1lZDogXCIsICRwbWlkLnRleHQoKV0uam9pbignJyl9XG4gICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgICAgICAgICAgIH0oKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgfSk7XG5cbiAgdmFyIGluaXRNb2R1bGUgPSBmdW5jdGlvbigpe1xuICAgICQoJy5wYW5lbF9ncm91cCcpLmVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpe1xuXG4gICAgICB2YXIgJHRhcmdldCA9ICQodGhpcyksXG4gICAgICAgICAgcGFnZWRhdGEgPSAkdGFyZ2V0LmRhdGEoJ3BhZ2UnKSxcbiAgICAgICAgICBpbmxpbmUgPSAkdGFyZ2V0LmRhdGEoJ2lubGluZScpLFxuICAgICAgICAgIGlucHV0ID0gW107XG5cbiAgICAgIGlmIChwYWdlZGF0YSkge1xuICAgICAgICBpbnB1dCA9IHBhZ2VkYXRhO1xuICAgICAgfSBlbHNlIGlmIChpbmxpbmUpIHtcbiAgICAgICAgaW5wdXQgPSBbeyBjYXRlZ29yeTogJycsIHVpZHM6IFtpbmxpbmVdIH1dO1xuICAgICAgfVxuXG5cbiAgICAgIFJlYWN0RE9NLnJlbmRlcihcbiAgICAgICAgPFBhbmVsR3JvdXAgaW5wdXQ9e2lucHV0fSAvPixcbiAgICAgICAgJHRhcmdldFswXVxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4geyBpbml0TW9kdWxlOiBpbml0TW9kdWxlIH07XG5cbn0oKSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYm9vdCA9IHJlcXVpcmUoJy4vZ3VpZGUuYm9vdC5qcycpO1xudmFyIGVmZXRjaF9wYW5lbCA9IHJlcXVpcmUoJy4vZ3VpZGUuZWZldGNoX3BhbmVsLmpzeCcpO1xudmFyIHByb2dyZXNzX3RyYWNrZXIgPSByZXF1aXJlKCcuL2d1aWRlLnByb2dyZXNzX3RyYWNrZXIuanMnKTtcblxudmFyIGd1aWRlID0gKGZ1bmN0aW9uKCl7XG5cbiAgdmFyXG4gIGluaXRNb2R1bGU7XG5cbiAgaW5pdE1vZHVsZSA9IGZ1bmN0aW9uKCl7XG4gICAgYm9vdC5pbml0TW9kdWxlKCk7XG4gICAgZWZldGNoX3BhbmVsLmluaXRNb2R1bGUoKTtcbiAgICBwcm9ncmVzc190cmFja2VyLmluaXRNb2R1bGUoKTtcbiAgfTtcblxuICByZXR1cm4geyBpbml0TW9kdWxlICAgICA6IGluaXRNb2R1bGUgfTtcbn0oKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ3VpZGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbnJlcXVpcmUoJy4uLy4uL2Jvd2VyX2NvbXBvbmVudHMvaWZyYW1lLXJlc2l6ZXIvanMvaWZyYW1lUmVzaXplci5taW4uanMnKTtcblxuLy8gUG9wdWxhdGUgdGhlIHByb2dyZXNzIHRyYWNrZXIgd3JhcHBlciBjb250ZW50XG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcblxuXHR2YXJcblx0Y29uZmlnTWFwID0ge1xuICAgIHBhbmVsX2h0bWxfdGVtcGxhdGU6XG5cdFx0JzxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1wcmltYXJ5XCI+JyArXG5cdFx0XHQnPGRpdiBjbGFzcz1cInBhbmVsLWhlYWRpbmdcIj4nICtcblx0XHRcdFx0JzxhIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIiBpZD1cInBhbmVsLWhlYWRpbmctbGlua1wiIGhyZWY9XCIjXCIgdGFyZ2V0PVwiX2JsYW5rXCI+PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLW5ldy13aW5kb3dcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+IE9wZW4gaW4gc2VwYXJhdGUgd2luZG93PC9hPicgK1xuXHRcdFx0JzwvZGl2PicgK1xuXHRcdFx0JzxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+JyArXG5cdFx0XHRcdCc8aWZyYW1lIGlkPVwicGFuZWwtZnJhbWVcIiBzcmM9XCJcIiB3aWR0aD1cIjEwMCVcIiBmcmFtZUJvcmRlcj1cIjBcIiBzY3JvbGxpbmc9XCJub1wiID48L2lmcmFtZT4nICtcblx0XHRcdCc8L2Rpdj4nICtcblx0XHRcdCc8YSBocmVmPVwiI3RvcFwiPjxkaXYgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiIGlkPVwicGFuZWwtZm9vdGVyXCI+VG9wPC9kaXY+PC9hPicgK1xuXHRcdCc8L2Rpdj4nXG4gIH0sXG5cdGpRdWVyeU1hcCA9IHtcblx0XHQkcHJvZ3Jlc3NfdHJhY2tlcl93cmFwcGVyXHQ6IHVuZGVmaW5lZCxcblx0XHQkcHJvZ3Jlc3NfdHJhY2tlcl9zdGVwcyAgXHQ6IHVuZGVmaW5lZCxcblx0XHQkcHJvZ3Jlc3NfdHJhY2tlcl9jb250ZW50XHQ6IHVuZGVmaW5lZCxcblx0XHQkcGFuZWwgOiB1bmRlZmluZWQsXG5cdFx0JHBhbmVsX2hlYWRpbmdfbGluazogdW5kZWZpbmVkLFxuXHRcdCRwYW5lbF9mb290ZXI6IHVuZGVmaW5lZFxuXHR9LFxuXHRpbml0TW9kdWxlLCBzZXRMaXN0ZW5lcnNcblx0O1xuXG5cdHNldExpc3RlbmVycyA9IGZ1bmN0aW9uKCl7XG5cdFx0alF1ZXJ5TWFwLiRwcm9ncmVzc190cmFja2VyX3N0ZXBzLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KXtcblx0XHRcdHZhciBzZWxmID0gJCggdGhpcyApO1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdC8vIFNldCB0aGUgbGlzdCBlbGVtZW50IHN0YXRlXG5cdFx0XHRzZWxmLmFkZENsYXNzKCAnaXMtY29tcGxldGUnICk7XG5cdFx0XHQvLyBSZXRyaWV2ZSB0aGUgdXJsXG5cdFx0XHR2YXIgdXJsID0gc2VsZi5maW5kKCAnLnByb2dyZXNzLXRyYWNrZXItbGluaycgKS5hdHRyKCAnaHJlZicgKTtcblx0XHRcdC8vIHNldCB0aGUgJHBhbmVsIGlmcmFtZSBzcmMgYW5kIGhlYWRpbmcgbGluayB1cmxcblx0XHRcdGpRdWVyeU1hcC4kcGFuZWxfaGVhZGluZ19saW5rLmF0dHIoICdocmVmJywgdXJsICkuY3NzKCAnZGlzcGxheScsICdibG9jaycgKTtcblx0XHRcdGpRdWVyeU1hcC4kcGFuZWxfZm9vdGVyLmNzcyggJ2Rpc3BsYXknLCAnYmxvY2snICk7XG5cdFx0XHRqUXVlcnlNYXAuJHBhbmVsX2ZyYW1lLmF0dHIoICdzcmMnLCB1cmwgKTtcblxuXHRcdFx0Ly9FeHRlcm5hbCBsaWJyYXJ5IElmcmFtZS1yZXNpemVyXG5cdFx0XHRqUXVlcnlNYXAuJHBhbmVsX2ZyYW1lLmlGcmFtZVJlc2l6ZSgpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdGluaXRNb2R1bGUgPSBmdW5jdGlvbigpe1xuXHRcdGpRdWVyeU1hcC4kcHJvZ3Jlc3NfdHJhY2tlcl93cmFwcGVyXHQgPSAkKCAnLnByb2dyZXNzLXRyYWNrZXItd3JhcHBlcicgKTtcblx0XHRqUXVlcnlNYXAuJHByb2dyZXNzX3RyYWNrZXJfc3RlcHMgPSBqUXVlcnlNYXAuJHByb2dyZXNzX3RyYWNrZXJfd3JhcHBlci5maW5kKCAnLnByb2dyZXNzLXN0ZXAnICk7XG5cdCAgalF1ZXJ5TWFwLiRwcm9ncmVzc190cmFja2VyX2NvbnRlbnQgPSBqUXVlcnlNYXAuJHByb2dyZXNzX3RyYWNrZXJfd3JhcHBlci5maW5kKCAnI3Byb2dyZXNzLXRyYWNrZXItY29udGVudCcgKTtcblx0XHRqUXVlcnlNYXAuJHBhbmVsID0gICQoICQucGFyc2VIVE1MKCBjb25maWdNYXAucGFuZWxfaHRtbF90ZW1wbGF0ZSApICk7XG5cdFx0alF1ZXJ5TWFwLiRwcm9ncmVzc190cmFja2VyX2NvbnRlbnQuaHRtbChqUXVlcnlNYXAuJHBhbmVsLmh0bWwoKSk7XG5cdFx0alF1ZXJ5TWFwLiRwYW5lbF9oZWFkaW5nX2xpbmsgPSBqUXVlcnlNYXAuJHByb2dyZXNzX3RyYWNrZXJfY29udGVudC5maW5kKCAnI3BhbmVsLWhlYWRpbmctbGluaycgKTtcblx0XHRqUXVlcnlNYXAuJHBhbmVsX2ZyYW1lID0galF1ZXJ5TWFwLiRwcm9ncmVzc190cmFja2VyX2NvbnRlbnQuZmluZCggJyNwYW5lbC1mcmFtZScgKTtcblx0XHRqUXVlcnlNYXAuJHBhbmVsX2Zvb3RlciA9IGpRdWVyeU1hcC4kcHJvZ3Jlc3NfdHJhY2tlcl9jb250ZW50LmZpbmQoICcjcGFuZWwtZm9vdGVyJyApO1xuXHRcdHNldExpc3RlbmVycygpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xuXG5cdHJldHVybiB7IGluaXRNb2R1bGU6IGluaXRNb2R1bGUgfTtcblxufSkoKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGd1aWRlID0gcmVxdWlyZSgnLi9ndWlkZS9ndWlkZS5qcycpO1xuXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gIGd1aWRlLmluaXRNb2R1bGUoKTtcbn0pO1xuIl19
