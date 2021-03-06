var e, r
;(e = this),
    (r = function(e) {
        "use strict"
        var r =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                    ? function(e) {
                          return typeof e
                      }
                    : function(e) {
                          return e &&
                              "function" == typeof Symbol &&
                              e.constructor === Symbol &&
                              e !== Symbol.prototype
                              ? "symbol"
                              : typeof e
                      },
            n =
                "undefined" != typeof Symbol
                    ? Symbol("immer-proxy-state")
                    : "__$immer_state",
            t =
                "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft."
        var o = !(
                ("undefined" != typeof process &&
                    "production" === process.env.NODE_ENV) ||
                "verifyMinified" !== function() {}.name
            ),
            i = "undefined" != typeof Proxy
        function f(e) {
            return !!e && !!e[n]
        }
        function u(e) {
            if (!e) return !1
            if ("object" !== (void 0 === e ? "undefined" : r(e))) return !1
            if (Array.isArray(e)) return !0
            var n = Object.getPrototypeOf(e)
            return null === n || n === Object.prototype
        }
        function a(e) {
            return o && Object.freeze(e), e
        }
        var c =
            Object.assign ||
            function(e, r) {
                for (var n in r) p(r, n) && (e[n] = r[n])
                return e
            }
        function s(e) {
            if (Array.isArray(e)) return e.slice()
            var r = void 0 === e.__proto__ ? Object.create(null) : {}
            return c(r, e)
        }
        function d(e, r) {
            if (Array.isArray(e)) for (var n = 0; n < e.length; n++) r(n, e[n])
            else for (var t in e) r(t, e[t])
        }
        function p(e, r) {
            return Object.prototype.hasOwnProperty.call(e, r)
        }
        function y(e) {
            if (f(e)) {
                var r = e[n]
                return !0 === r.modified
                    ? !0 === r.finalized
                      ? r.copy
                      : ((r.finalized = !0),
                        (t = i ? r.copy : (r.copy = s(e))),
                        (o = r.base),
                        d(t, function(e, r) {
                            r !== o[e] && (t[e] = y(r))
                        }),
                        a(t))
                    : r.base
            }
            var t, o
            return (
                (function e(r) {
                    if (!u(r)) return
                    if (Object.isFrozen(r)) return
                    d(r, function(n, t) {
                        f(t) ? (r[n] = y(t)) : e(t)
                    })
                    a(r)
                })(e),
                e
            )
        }
        function l(e, r) {
            return e === r ? 0 !== e || 1 / e == 1 / r : e != e && r != r
        }
        var v = null,
            b = {
                get: function(e, r) {
                    if (r === n) return e
                    if (e.modified) {
                        var t = e.copy[r]
                        return t === e.base[r] && u(t)
                            ? (e.copy[r] = w(e, t))
                            : t
                    }
                    if (p(e.proxies, r)) return e.proxies[r]
                    var o = e.base[r]
                    return !f(o) && u(o) ? (e.proxies[r] = w(e, o)) : o
                },
                has: function(e, r) {
                    return r in h(e)
                },
                ownKeys: function(e) {
                    return Reflect.ownKeys(h(e))
                },
                set: function(e, r, n) {
                    if (!e.modified) {
                        if (
                            (r in e.base && l(e.base[r], n)) ||
                            (p(e.proxies, r) && e.proxies[r] === n)
                        )
                            return !0
                        g(e)
                    }
                    return (e.copy[r] = n), !0
                },
                deleteProperty: function(e, r) {
                    return g(e), delete e.copy[r], !0
                },
                getOwnPropertyDescriptor: function(e, r) {
                    var n = e.modified
                            ? e.copy
                            : p(e.proxies, r) ? e.proxies : e.base,
                        t = Reflect.getOwnPropertyDescriptor(n, r)
                    !t ||
                        (Array.isArray(n) && "length" === r) ||
                        (t.configurable = !0)
                    return t
                },
                defineProperty: function() {
                    throw new Error(
                        "Immer does not support defining properties on draft objects."
                    )
                },
                setPrototypeOf: function() {
                    throw new Error(
                        "Immer does not support `setPrototypeOf()`."
                    )
                }
            },
            m = {}
        function h(e) {
            return !0 === e.modified ? e.copy : e.base
        }
        function g(e) {
            e.modified ||
                ((e.modified = !0),
                (e.copy = s(e.base)),
                Object.assign(e.copy, e.proxies),
                e.parent && g(e.parent))
        }
        function w(e, r) {
            if (f(r)) throw new Error("Immer bug. Plz report.")
            var n = {
                    modified: !1,
                    finalized: !1,
                    parent: e,
                    base: r,
                    copy: void 0,
                    proxies: {}
                },
                t = Array.isArray(r)
                    ? Proxy.revocable([n], m)
                    : Proxy.revocable(n, b)
            return v.push(t), t.proxy
        }
        d(b, function(e, r) {
            m[e] = function() {
                return (
                    (arguments[0] = arguments[0][0]), r.apply(this, arguments)
                )
            }
        })
        var O = {},
            j = null
        function x(e) {
            return e.hasCopy ? e.copy : e.base
        }
        function P(e) {
            e.modified || ((e.modified = !0), e.parent && P(e.parent))
        }
        function A(e) {
            e.hasCopy || ((e.hasCopy = !0), (e.copy = s(e.base)))
        }
        function E(e, r) {
            var t = s(r)
            d(r, function(e) {
                var r
                Object.defineProperty(
                    t,
                    "" + e,
                    O[(r = "" + e)] ||
                        (O[r] = {
                            configurable: !0,
                            enumerable: !0,
                            get: function() {
                                return (function(e, r) {
                                    z(e)
                                    var n = x(e)[r]
                                    return !e.finalizing &&
                                        n === e.base[r] &&
                                        u(n)
                                        ? (A(e), (e.copy[r] = E(e, n)))
                                        : n
                                })(this[n], r)
                            },
                            set: function(e) {
                                !(function(e, r, n) {
                                    if ((z(e), !e.modified)) {
                                        if (l(x(e)[r], n)) return
                                        P(e), A(e)
                                    }
                                    e.copy[r] = n
                                })(this[n], r, e)
                            }
                        })
                )
            })
            var o,
                i,
                f,
                a = {
                    modified: !1,
                    hasCopy: !1,
                    parent: e,
                    base: r,
                    proxy: t,
                    copy: void 0,
                    finished: !1,
                    finalizing: !1,
                    finalized: !1
                }
            return (
                (o = t),
                (i = n),
                (f = a),
                Object.defineProperty(o, i, {
                    value: f,
                    enumerable: !1,
                    writable: !0
                }),
                j.push(a),
                t
            )
        }
        function z(e) {
            if (!0 === e.finished)
                throw new Error(
                    "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " +
                        JSON.stringify(e.copy || e.base)
                )
        }
        function _(e) {
            var r = e.proxy
            if (r.length !== e.base.length) return !0
            var n = Object.getOwnPropertyDescriptor(r, r.length - 1)
            return !(!n || n.get)
        }
        function S(e, o) {
            if (f(e)) {
                var i = o.call(e, e)
                return void 0 === i ? e : i
            }
            var u = j
            j = []
            try {
                var a = E(void 0, e),
                    c = o.call(a, a)
                d(j, function(e, r) {
                    r.finalizing = !0
                }),
                    (function() {
                        for (var e = j.length - 1; e >= 0; e--) {
                            var n = j[e]
                            !1 === n.modified &&
                                (Array.isArray(n.base)
                                    ? _(n) && P(n)
                                    : ((t = n),
                                      (o = Object.keys(t.base)),
                                      (i = Object.keys(t.proxy)),
                                      (function(e, n) {
                                          if (l(e, n)) return !0
                                          if (
                                              "object" !==
                                                  (void 0 === e
                                                      ? "undefined"
                                                      : r(e)) ||
                                              null === e ||
                                              "object" !==
                                                  (void 0 === n
                                                      ? "undefined"
                                                      : r(n)) ||
                                              null === n
                                          )
                                              return !1
                                          var t = Object.keys(e),
                                              o = Object.keys(n)
                                          if (t.length !== o.length) return !1
                                          for (var i = 0; i < t.length; i++)
                                              if (
                                                  !hasOwnProperty.call(
                                                      n,
                                                      t[i]
                                                  ) ||
                                                  !l(e[t[i]], n[t[i]])
                                              )
                                                  return !1
                                          return !0
                                      })(o, i) || P(n)))
                        }
                        var t, o, i
                    })()
                var s = void 0
                if (void 0 !== c && c !== a) {
                    if (a[n].modified) throw new Error(t)
                    s = y(c)
                } else s = y(a)
                return (
                    d(j, function(e, r) {
                        r.finished = !0
                    }),
                    s
                )
            } finally {
                j = u
            }
        }
        ;(e.default = function e(o, a) {
            if (1 !== arguments.length && 2 !== arguments.length)
                throw new Error(
                    "produce expects 1 or 2 arguments, got " + arguments.length
                )
            if ("function" == typeof o) {
                if ("function" == typeof a)
                    throw new Error(
                        "if first argument is a function (curried invocation), the second argument to produce cannot be a function"
                    )
                var c = a,
                    s = o
                return function() {
                    var r = arguments
                    return e(
                        void 0 === r[0] && void 0 !== c ? c : r[0],
                        function(e) {
                            return (r[0] = e), s.apply(e, r)
                        }
                    )
                }
            }
            if ("function" != typeof a)
                throw new Error(
                    "if first argument is not a function, the second argument to produce should be a function"
                )
            if (
                "object" !== (void 0 === o ? "undefined" : r(o)) ||
                null === o
            ) {
                var p = a(o)
                return void 0 === p ? o : p
            }
            if (!u(o))
                throw new Error(
                    "the first argument to an immer producer should be a primitive, plain object or array, got " +
                        (void 0 === o ? "undefined" : r(o)) +
                        ': "' +
                        o +
                        '"'
                )
            return i
                ? (function(e, r) {
                      if (f(e)) {
                          var o = r.call(e, e)
                          return void 0 === o ? e : o
                      }
                      var i = v
                      v = []
                      try {
                          var u = w(void 0, e),
                              a = r.call(u, u),
                              c = void 0
                          if (void 0 !== a && a !== u) {
                              if (u[n].modified) throw new Error(t)
                              c = y(a)
                          } else c = y(u)
                          return (
                              d(v, function(e, r) {
                                  return r.revoke()
                              }),
                              c
                          )
                      } finally {
                          v = i
                      }
                  })(o, a)
                : S(o, a)
        }),
            (e.setAutoFreeze = function(e) {
                o = e
            }),
            (e.setUseProxies = function(e) {
                i = e
            }),
            Object.defineProperty(e, "__esModule", {value: !0})
    }),
    "object" == typeof exports && "undefined" != typeof module
        ? r(exports)
        : "function" == typeof define && define.amd
          ? define(["exports"], r)
          : r((e.immer = {}))
//# sourceMappingURL=immer.umd.js.map
