// @ts-nocheck
// noinspection JSUnresolvedReference

import ElectronResources from "../../frontend/shared/lib/ElectronResources"


const PATH_TO_WASM = "./ammo.wasm.wasm";

function Ammo() {
    var t = "undefined" != typeof document && document.currentScript ? document.currentScript.src : void 0;
    return "undefined" != typeof __filename && (t = t || __filename), function (e) {
        var n, o, _;
        e = e || {}, n || (n = void 0 !== e ? e : {}), n.ready = new Promise(function (t, e) {
            o = t, _ = e
        });
        var i, r, p, s, c, a, l = Object.assign({}, n), u = "object" == typeof window,
            b = "function" == typeof importScripts, y = "";
        "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node ? (y = b ? ElectronResources.path.dirname(y) + "/" : __dirname + "/", a = (() => {
            c || (s = ElectronResources.fs, c = ElectronResources.path)
        }), i = function (t, e) {
            return a(), t = c.normalize(t), s.readFileSync(t, e ? void 0 : "utf8")
        }, p = (t => ((t = i(t, !0)).buffer || (t = new Uint8Array(t)), t)), r = ((t, e, n) => {
            a(), t = c.normalize(t), s.readFile(t, function (t, o) {
                t ? n(t) : e(o.buffer)
            })
        }), 1 < process.argv.length && process.argv[1].replace(/\\/g, "/"), process.argv.slice(2), process.on("uncaughtException", function (t) {
            throw t
        }), process.on("unhandledRejection", function (t) {
            throw t
        }), n.inspect = function () {
            return "[Emscripten Module object]"
        }) : (u || b) && (b ? y = self.location.href : "undefined" != typeof document && document.currentScript && (y = document.currentScript.src), t && (y = t), y = 0 !== y.indexOf("blob:") ? y.substr(0, y.replace(/[?#].*/, "").lastIndexOf("/") + 1) : "", i = (t => {
            var e = new XMLHttpRequest;
            return e.open("GET", t, !1), e.send(null), e.responseText
        }), b && (p = (t => {
            var e = new XMLHttpRequest;
            return e.open("GET", t, !1), e.responseType = "arraybuffer", e.send(null), new Uint8Array(e.response)
        })), r = ((t, e, n) => {
            var o = new XMLHttpRequest;
            o.open("GET", t, !0), o.responseType = "arraybuffer", o.onload = (() => {
                200 == o.status || 0 == o.status && o.response ? e(o.response) : n()
            }), o.onerror = n, o.send(null)
        })), n.print || console.log.bind(console);
        var m = n.printErr || console.warn.bind(console);
        Object.assign(n, l), l = null;
        var d, f, h = [];
        n.wasmBinary && (f = n.wasmBinary), n.noExitRuntime, "object" != typeof WebAssembly && L("no native wasm support detected");
        var B = !1, g = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;

        function C(t, e) {
            if (t) {
                var n = j, o = t + e;
                for (e = t; n[e] && !(e >= o);) ++e;
                if (16 < e - t && n.subarray && g) t = g.decode(n.subarray(t, e)); else {
                    for (o = ""; t < e;) {
                        var _ = n[t++];
                        if (128 & _) {
                            var i = 63 & n[t++];
                            if (192 == (224 & _)) o += String.fromCharCode((31 & _) << 6 | i); else {
                                var r = 63 & n[t++];
                                65536 > (_ = 224 == (240 & _) ? (15 & _) << 12 | i << 6 | r : (7 & _) << 18 | i << 12 | r << 6 | 63 & n[t++]) ? o += String.fromCharCode(_) : (_ -= 65536, o += String.fromCharCode(55296 | _ >> 10, 56320 | 1023 & _))
                            }
                        } else o += String.fromCharCode(_)
                    }
                    t = o
                }
            } else t = "";
            return t
        }

        var S, j, v, I, R, D, P = [], T = [], O = [], W = !1;

        function A() {
            var t = n.preRun.shift();
            P.unshift(t)
        }

        var M, x = 0, k = null, F = null;

        function L(t) {
            throw n.onAbort && n.onAbort(t), m(t = "Aborted(" + t + ")"), B = !0, t = new WebAssembly.RuntimeError(t + ". Build with -s ASSERTIONS=1 for more info."), _(t), t
        }

        function G() {
            return M.startsWith("data:application/octet-stream;base64,")
        }

        if (n.preloadedImages = {}, n.preloadedAudios = {}, M = "ammo.wasm.wasm", !G()) {
            var w = M;
            M = n.locateFile ? n.locateFile(w, y) : y + w
        }

        function H() {
            var t = M;
            try {
                if (t == M && f) return new Uint8Array(f);
                if (p) return p(t);
                throw"both async and sync fetching of the wasm failed"
            } catch (t) {
                L(t)
            }
        }

        var V = {
            27254: function (t, e, o, _) {
                if (!(t = n.getCache(n.DebugDrawer)[t]).hasOwnProperty("drawLine")) throw"a JSImplementation must implement all functions, you forgot DebugDrawer::drawLine.";
                t.drawLine(e, o, _)
            }, 27474: function (t, e, o, _, i, r) {
                if (!(t = n.getCache(n.DebugDrawer)[t]).hasOwnProperty("drawContactPoint")) throw"a JSImplementation must implement all functions, you forgot DebugDrawer::drawContactPoint.";
                t.drawContactPoint(e, o, _, i, r)
            }, 27724: function (t, e) {
                if (!(t = n.getCache(n.DebugDrawer)[t]).hasOwnProperty("reportErrorWarning")) throw"a JSImplementation must implement all functions, you forgot DebugDrawer::reportErrorWarning.";
                t.reportErrorWarning(e)
            }, 27968: function (t, e, o) {
                if (!(t = n.getCache(n.DebugDrawer)[t]).hasOwnProperty("draw3dText")) throw"a JSImplementation must implement all functions, you forgot DebugDrawer::draw3dText.";
                t.draw3dText(e, o)
            }, 28191: function (t, e) {
                if (!(t = n.getCache(n.DebugDrawer)[t]).hasOwnProperty("setDebugMode")) throw"a JSImplementation must implement all functions, you forgot DebugDrawer::setDebugMode.";
                t.setDebugMode(e)
            }, 28417: function (t) {
                if (!(t = n.getCache(n.DebugDrawer)[t]).hasOwnProperty("getDebugMode")) throw"a JSImplementation must implement all functions, you forgot DebugDrawer::getDebugMode.";
                return t.getDebugMode()
            }, 28648: function (t, e, o, _, i, r, p, s) {
                if (!(t = n.getCache(n.ConcreteContactResultCallback)[t]).hasOwnProperty("addSingleResult")) throw"a JSImplementation must implement all functions, you forgot ConcreteContactResultCallback::addSingleResult.";
                return t.addSingleResult(e, o, _, i, r, p, s)
            }
        };

        function E(t) {
            for (; 0 < t.length;) {
                var e = t.shift();
                if ("function" == typeof e) e(n); else {
                    var o = e.HH;
                    "number" == typeof o ? void 0 === e.DB ? U(o)() : U(o)(e.DB) : o(void 0 === e.DB ? null : e.DB)
                }
            }
        }

        var N = [];

        function U(t) {
            var e = N[t];
            return e || (t >= N.length && (N.length = t + 1), N[t] = e = D.get(t)), e
        }

        var z = [];

        function q(t, e, n) {
            var o;
            for (z.length = 0, n >>= 2; o = j[e++];) (o = 105 > o) && 1 & n && n++, z.push(o ? R[n++ >> 1] : v[n]), ++n;
            return V[t].apply(null, z)
        }

        var K = {
            c: function () {
                L("")
            }, f: function (t, e, n) {
                return q(t, e, n)
            }, b: q, e: function (t, e, n) {
                j.copyWithin(t, e, e + n)
            }, d: function () {
                L("OOM")
            }, a: function (t) {
                var e = Date.now();
                return v[t >> 2] = e / 1e3 | 0, v[t + 4 >> 2] = e % 1e3 * 1e3 | 0, 0
            }
        };
        !function () {
            function t(t) {
                n.asm = t.exports, t = n.asm.g.buffer, n.HEAP8 = S = new Int8Array(t), n.HEAP16 = new Int16Array(t), n.HEAP32 = v = new Int32Array(t), n.HEAPU8 = j = new Uint8Array(t), n.HEAPU16 = new Uint16Array(t), n.HEAPU32 = new Uint32Array(t), n.HEAPF32 = I = new Float32Array(t), n.HEAPF64 = R = new Float64Array(t), D = n.asm.cB, T.unshift(n.asm.h), x--, n.monitorRunDependencies && n.monitorRunDependencies(x), 0 == x && (null !== k && (clearInterval(k), k = null), F && (t = F, F = null, t()))
            }

            function e(e) {
                t(e.instance)
            }

            function o(t) {
                return function () {
                    if (!f && (u || b)) {
                        if ("function" == typeof fetch && !M.startsWith("file://")) return fetch(PATH_TO_WASM, {credentials: "same-origin"}).then(function (t) {
                            if (!t.ok) throw"failed to load wasm binary file at '" + M + "'";
                            return t.arrayBuffer()
                        }).catch(function () {
                            return H()
                        });
                        if (r) return new Promise(function (t, e) {
                            r(M, function (e) {
                                t(new Uint8Array(e))
                            }, e)
                        })
                    }
                    return Promise.resolve().then(function () {
                        return H()
                    })
                }().then(function (t) {
                    return WebAssembly.instantiate(t, i)
                }).then(function (t) {
                    return t
                }).then(t, function (t) {
                    m("failed to asynchronously prepare wasm: " + t), L(t)
                })
            }

            var i = {a: K};
            if (x++, n.monitorRunDependencies && n.monitorRunDependencies(x), n.instantiateWasm) try {
                return n.instantiateWasm(i, t)
            } catch (t) {
                return m("Module.instantiateWasm callback failed with error: " + t), !1
            }
            (f || "function" != typeof WebAssembly.instantiateStreaming || G() || M.startsWith("file://") || "function" != typeof fetch ? o(e) : fetch(PATH_TO_WASM, {credentials: "same-origin"}).then(function (t) {
                return WebAssembly.instantiateStreaming(t, i).then(e, function (t) {
                    return m("wasm streaming compile failed: " + t), m("falling back to ArrayBuffer instantiation"), o(e)
                })
            })).catch(_)
        }(), n.___wasm_call_ctors = function () {
            return (n.___wasm_call_ctors = n.asm.h).apply(null, arguments)
        };
        var Q, X = n._emscripten_bind_btCollisionShape_setLocalScaling_1 = function () {
                return (X = n._emscripten_bind_btCollisionShape_setLocalScaling_1 = n.asm.i).apply(null, arguments)
            }, Z = n._emscripten_bind_btCollisionShape_getLocalScaling_0 = function () {
                return (Z = n._emscripten_bind_btCollisionShape_getLocalScaling_0 = n.asm.j).apply(null, arguments)
            }, Y = n._emscripten_bind_btCollisionShape_calculateLocalInertia_2 = function () {
                return (Y = n._emscripten_bind_btCollisionShape_calculateLocalInertia_2 = n.asm.k).apply(null, arguments)
            }, J = n._emscripten_bind_btCollisionShape_setMargin_1 = function () {
                return (J = n._emscripten_bind_btCollisionShape_setMargin_1 = n.asm.l).apply(null, arguments)
            }, $ = n._emscripten_bind_btCollisionShape_getMargin_0 = function () {
                return ($ = n._emscripten_bind_btCollisionShape_getMargin_0 = n.asm.m).apply(null, arguments)
            }, tt = n._emscripten_bind_btCollisionShape___destroy___0 = function () {
                return (tt = n._emscripten_bind_btCollisionShape___destroy___0 = n.asm.n).apply(null, arguments)
            }, et = n._emscripten_bind_btCollisionWorld_getDispatcher_0 = function () {
                return (et = n._emscripten_bind_btCollisionWorld_getDispatcher_0 = n.asm.o).apply(null, arguments)
            }, nt = n._emscripten_bind_btCollisionWorld_rayTest_3 = function () {
                return (nt = n._emscripten_bind_btCollisionWorld_rayTest_3 = n.asm.p).apply(null, arguments)
            }, ot = n._emscripten_bind_btCollisionWorld_getPairCache_0 = function () {
                return (ot = n._emscripten_bind_btCollisionWorld_getPairCache_0 = n.asm.q).apply(null, arguments)
            }, _t = n._emscripten_bind_btCollisionWorld_getDispatchInfo_0 = function () {
                return (_t = n._emscripten_bind_btCollisionWorld_getDispatchInfo_0 = n.asm.r).apply(null, arguments)
            }, it = n._emscripten_bind_btCollisionWorld_addCollisionObject_1 = function () {
                return (it = n._emscripten_bind_btCollisionWorld_addCollisionObject_1 = n.asm.s).apply(null, arguments)
            }, rt = n._emscripten_bind_btCollisionWorld_addCollisionObject_2 = function () {
                return (rt = n._emscripten_bind_btCollisionWorld_addCollisionObject_2 = n.asm.t).apply(null, arguments)
            }, pt = n._emscripten_bind_btCollisionWorld_addCollisionObject_3 = function () {
                return (pt = n._emscripten_bind_btCollisionWorld_addCollisionObject_3 = n.asm.u).apply(null, arguments)
            }, st = n._emscripten_bind_btCollisionWorld_removeCollisionObject_1 = function () {
                return (st = n._emscripten_bind_btCollisionWorld_removeCollisionObject_1 = n.asm.v).apply(null, arguments)
            }, ct = n._emscripten_bind_btCollisionWorld_getBroadphase_0 = function () {
                return (ct = n._emscripten_bind_btCollisionWorld_getBroadphase_0 = n.asm.w).apply(null, arguments)
            }, at = n._emscripten_bind_btCollisionWorld_convexSweepTest_5 = function () {
                return (at = n._emscripten_bind_btCollisionWorld_convexSweepTest_5 = n.asm.x).apply(null, arguments)
            }, lt = n._emscripten_bind_btCollisionWorld_contactPairTest_3 = function () {
                return (lt = n._emscripten_bind_btCollisionWorld_contactPairTest_3 = n.asm.y).apply(null, arguments)
            }, ut = n._emscripten_bind_btCollisionWorld_contactTest_2 = function () {
                return (ut = n._emscripten_bind_btCollisionWorld_contactTest_2 = n.asm.z).apply(null, arguments)
            }, bt = n._emscripten_bind_btCollisionWorld_updateSingleAabb_1 = function () {
                return (bt = n._emscripten_bind_btCollisionWorld_updateSingleAabb_1 = n.asm.A).apply(null, arguments)
            }, yt = n._emscripten_bind_btCollisionWorld_setDebugDrawer_1 = function () {
                return (yt = n._emscripten_bind_btCollisionWorld_setDebugDrawer_1 = n.asm.B).apply(null, arguments)
            }, mt = n._emscripten_bind_btCollisionWorld_getDebugDrawer_0 = function () {
                return (mt = n._emscripten_bind_btCollisionWorld_getDebugDrawer_0 = n.asm.C).apply(null, arguments)
            }, dt = n._emscripten_bind_btCollisionWorld_debugDrawWorld_0 = function () {
                return (dt = n._emscripten_bind_btCollisionWorld_debugDrawWorld_0 = n.asm.D).apply(null, arguments)
            }, ft = n._emscripten_bind_btCollisionWorld_debugDrawObject_3 = function () {
                return (ft = n._emscripten_bind_btCollisionWorld_debugDrawObject_3 = n.asm.E).apply(null, arguments)
            }, ht = n._emscripten_bind_btCollisionWorld___destroy___0 = function () {
                return (ht = n._emscripten_bind_btCollisionWorld___destroy___0 = n.asm.F).apply(null, arguments)
            }, Bt = n._emscripten_bind_btCollisionObject_setAnisotropicFriction_2 = function () {
                return (Bt = n._emscripten_bind_btCollisionObject_setAnisotropicFriction_2 = n.asm.G).apply(null, arguments)
            }, gt = n._emscripten_bind_btCollisionObject_getCollisionShape_0 = function () {
                return (gt = n._emscripten_bind_btCollisionObject_getCollisionShape_0 = n.asm.H).apply(null, arguments)
            }, Ct = n._emscripten_bind_btCollisionObject_setContactProcessingThreshold_1 = function () {
                return (Ct = n._emscripten_bind_btCollisionObject_setContactProcessingThreshold_1 = n.asm.I).apply(null, arguments)
            }, St = n._emscripten_bind_btCollisionObject_setActivationState_1 = function () {
                return (St = n._emscripten_bind_btCollisionObject_setActivationState_1 = n.asm.J).apply(null, arguments)
            }, jt = n._emscripten_bind_btCollisionObject_forceActivationState_1 = function () {
                return (jt = n._emscripten_bind_btCollisionObject_forceActivationState_1 = n.asm.K).apply(null, arguments)
            }, vt = n._emscripten_bind_btCollisionObject_activate_0 = function () {
                return (vt = n._emscripten_bind_btCollisionObject_activate_0 = n.asm.L).apply(null, arguments)
            }, It = n._emscripten_bind_btCollisionObject_activate_1 = function () {
                return (It = n._emscripten_bind_btCollisionObject_activate_1 = n.asm.M).apply(null, arguments)
            }, Rt = n._emscripten_bind_btCollisionObject_isActive_0 = function () {
                return (Rt = n._emscripten_bind_btCollisionObject_isActive_0 = n.asm.N).apply(null, arguments)
            }, Dt = n._emscripten_bind_btCollisionObject_isKinematicObject_0 = function () {
                return (Dt = n._emscripten_bind_btCollisionObject_isKinematicObject_0 = n.asm.O).apply(null, arguments)
            }, Pt = n._emscripten_bind_btCollisionObject_isStaticObject_0 = function () {
                return (Pt = n._emscripten_bind_btCollisionObject_isStaticObject_0 = n.asm.P).apply(null, arguments)
            }, Tt = n._emscripten_bind_btCollisionObject_isStaticOrKinematicObject_0 = function () {
                return (Tt = n._emscripten_bind_btCollisionObject_isStaticOrKinematicObject_0 = n.asm.Q).apply(null, arguments)
            }, Ot = n._emscripten_bind_btCollisionObject_getRestitution_0 = function () {
                return (Ot = n._emscripten_bind_btCollisionObject_getRestitution_0 = n.asm.R).apply(null, arguments)
            }, Wt = n._emscripten_bind_btCollisionObject_getFriction_0 = function () {
                return (Wt = n._emscripten_bind_btCollisionObject_getFriction_0 = n.asm.S).apply(null, arguments)
            }, At = n._emscripten_bind_btCollisionObject_getRollingFriction_0 = function () {
                return (At = n._emscripten_bind_btCollisionObject_getRollingFriction_0 = n.asm.T).apply(null, arguments)
            }, Mt = n._emscripten_bind_btCollisionObject_setRestitution_1 = function () {
                return (Mt = n._emscripten_bind_btCollisionObject_setRestitution_1 = n.asm.U).apply(null, arguments)
            }, xt = n._emscripten_bind_btCollisionObject_setFriction_1 = function () {
                return (xt = n._emscripten_bind_btCollisionObject_setFriction_1 = n.asm.V).apply(null, arguments)
            }, kt = n._emscripten_bind_btCollisionObject_setRollingFriction_1 = function () {
                return (kt = n._emscripten_bind_btCollisionObject_setRollingFriction_1 = n.asm.W).apply(null, arguments)
            }, Ft = n._emscripten_bind_btCollisionObject_getWorldTransform_0 = function () {
                return (Ft = n._emscripten_bind_btCollisionObject_getWorldTransform_0 = n.asm.X).apply(null, arguments)
            }, Lt = n._emscripten_bind_btCollisionObject_getCollisionFlags_0 = function () {
                return (Lt = n._emscripten_bind_btCollisionObject_getCollisionFlags_0 = n.asm.Y).apply(null, arguments)
            }, Gt = n._emscripten_bind_btCollisionObject_setCollisionFlags_1 = function () {
                return (Gt = n._emscripten_bind_btCollisionObject_setCollisionFlags_1 = n.asm.Z).apply(null, arguments)
            }, wt = n._emscripten_bind_btCollisionObject_setWorldTransform_1 = function () {
                return (wt = n._emscripten_bind_btCollisionObject_setWorldTransform_1 = n.asm._).apply(null, arguments)
            }, Ht = n._emscripten_bind_btCollisionObject_setCollisionShape_1 = function () {
                return (Ht = n._emscripten_bind_btCollisionObject_setCollisionShape_1 = n.asm.$).apply(null, arguments)
            }, Vt = n._emscripten_bind_btCollisionObject_setCcdMotionThreshold_1 = function () {
                return (Vt = n._emscripten_bind_btCollisionObject_setCcdMotionThreshold_1 = n.asm.aa).apply(null, arguments)
            }, Et = n._emscripten_bind_btCollisionObject_setCcdSweptSphereRadius_1 = function () {
                return (Et = n._emscripten_bind_btCollisionObject_setCcdSweptSphereRadius_1 = n.asm.ba).apply(null, arguments)
            }, Nt = n._emscripten_bind_btCollisionObject_getUserIndex_0 = function () {
                return (Nt = n._emscripten_bind_btCollisionObject_getUserIndex_0 = n.asm.ca).apply(null, arguments)
            }, Ut = n._emscripten_bind_btCollisionObject_setUserIndex_1 = function () {
                return (Ut = n._emscripten_bind_btCollisionObject_setUserIndex_1 = n.asm.da).apply(null, arguments)
            }, zt = n._emscripten_bind_btCollisionObject_getUserPointer_0 = function () {
                return (zt = n._emscripten_bind_btCollisionObject_getUserPointer_0 = n.asm.ea).apply(null, arguments)
            }, qt = n._emscripten_bind_btCollisionObject_setUserPointer_1 = function () {
                return (qt = n._emscripten_bind_btCollisionObject_setUserPointer_1 = n.asm.fa).apply(null, arguments)
            }, Kt = n._emscripten_bind_btCollisionObject_getBroadphaseHandle_0 = function () {
                return (Kt = n._emscripten_bind_btCollisionObject_getBroadphaseHandle_0 = n.asm.ga).apply(null, arguments)
            }, Qt = n._emscripten_bind_btCollisionObject___destroy___0 = function () {
                return (Qt = n._emscripten_bind_btCollisionObject___destroy___0 = n.asm.ha).apply(null, arguments)
            }, Xt = n._emscripten_bind_btConcaveShape_setLocalScaling_1 = function () {
                return (Xt = n._emscripten_bind_btConcaveShape_setLocalScaling_1 = n.asm.ia).apply(null, arguments)
            }, Zt = n._emscripten_bind_btConcaveShape_getLocalScaling_0 = function () {
                return (Zt = n._emscripten_bind_btConcaveShape_getLocalScaling_0 = n.asm.ja).apply(null, arguments)
            }, Yt = n._emscripten_bind_btConcaveShape_calculateLocalInertia_2 = function () {
                return (Yt = n._emscripten_bind_btConcaveShape_calculateLocalInertia_2 = n.asm.ka).apply(null, arguments)
            }, Jt = n._emscripten_bind_btConcaveShape___destroy___0 = function () {
                return (Jt = n._emscripten_bind_btConcaveShape___destroy___0 = n.asm.la).apply(null, arguments)
            }, $t = n._emscripten_bind_btCollisionAlgorithm___destroy___0 = function () {
                return ($t = n._emscripten_bind_btCollisionAlgorithm___destroy___0 = n.asm.ma).apply(null, arguments)
            }, te = n._emscripten_bind_btTypedConstraint_enableFeedback_1 = function () {
                return (te = n._emscripten_bind_btTypedConstraint_enableFeedback_1 = n.asm.na).apply(null, arguments)
            }, ee = n._emscripten_bind_btTypedConstraint_getBreakingImpulseThreshold_0 = function () {
                return (ee = n._emscripten_bind_btTypedConstraint_getBreakingImpulseThreshold_0 = n.asm.oa).apply(null, arguments)
            }, ne = n._emscripten_bind_btTypedConstraint_setBreakingImpulseThreshold_1 = function () {
                return (ne = n._emscripten_bind_btTypedConstraint_setBreakingImpulseThreshold_1 = n.asm.pa).apply(null, arguments)
            }, oe = n._emscripten_bind_btTypedConstraint_getParam_2 = function () {
                return (oe = n._emscripten_bind_btTypedConstraint_getParam_2 = n.asm.qa).apply(null, arguments)
            }, _e = n._emscripten_bind_btTypedConstraint_setParam_3 = function () {
                return (_e = n._emscripten_bind_btTypedConstraint_setParam_3 = n.asm.ra).apply(null, arguments)
            }, ie = n._emscripten_bind_btTypedConstraint___destroy___0 = function () {
                return (ie = n._emscripten_bind_btTypedConstraint___destroy___0 = n.asm.sa).apply(null, arguments)
            }, re = n._emscripten_bind_btDynamicsWorld_addAction_1 = function () {
                return (re = n._emscripten_bind_btDynamicsWorld_addAction_1 = n.asm.ta).apply(null, arguments)
            }, pe = n._emscripten_bind_btDynamicsWorld_removeAction_1 = function () {
                return (pe = n._emscripten_bind_btDynamicsWorld_removeAction_1 = n.asm.ua).apply(null, arguments)
            }, se = n._emscripten_bind_btDynamicsWorld_getSolverInfo_0 = function () {
                return (se = n._emscripten_bind_btDynamicsWorld_getSolverInfo_0 = n.asm.va).apply(null, arguments)
            }, ce = n._emscripten_bind_btDynamicsWorld_setInternalTickCallback_1 = function () {
                return (ce = n._emscripten_bind_btDynamicsWorld_setInternalTickCallback_1 = n.asm.wa).apply(null, arguments)
            }, ae = n._emscripten_bind_btDynamicsWorld_setInternalTickCallback_2 = function () {
                return (ae = n._emscripten_bind_btDynamicsWorld_setInternalTickCallback_2 = n.asm.xa).apply(null, arguments)
            }, le = n._emscripten_bind_btDynamicsWorld_setInternalTickCallback_3 = function () {
                return (le = n._emscripten_bind_btDynamicsWorld_setInternalTickCallback_3 = n.asm.ya).apply(null, arguments)
            }, ue = n._emscripten_bind_btDynamicsWorld_getDispatcher_0 = function () {
                return (ue = n._emscripten_bind_btDynamicsWorld_getDispatcher_0 = n.asm.za).apply(null, arguments)
            }, be = n._emscripten_bind_btDynamicsWorld_rayTest_3 = function () {
                return (be = n._emscripten_bind_btDynamicsWorld_rayTest_3 = n.asm.Aa).apply(null, arguments)
            }, ye = n._emscripten_bind_btDynamicsWorld_getPairCache_0 = function () {
                return (ye = n._emscripten_bind_btDynamicsWorld_getPairCache_0 = n.asm.Ba).apply(null, arguments)
            }, me = n._emscripten_bind_btDynamicsWorld_getDispatchInfo_0 = function () {
                return (me = n._emscripten_bind_btDynamicsWorld_getDispatchInfo_0 = n.asm.Ca).apply(null, arguments)
            }, de = n._emscripten_bind_btDynamicsWorld_addCollisionObject_1 = function () {
                return (de = n._emscripten_bind_btDynamicsWorld_addCollisionObject_1 = n.asm.Da).apply(null, arguments)
            }, fe = n._emscripten_bind_btDynamicsWorld_addCollisionObject_2 = function () {
                return (fe = n._emscripten_bind_btDynamicsWorld_addCollisionObject_2 = n.asm.Ea).apply(null, arguments)
            }, he = n._emscripten_bind_btDynamicsWorld_addCollisionObject_3 = function () {
                return (he = n._emscripten_bind_btDynamicsWorld_addCollisionObject_3 = n.asm.Fa).apply(null, arguments)
            }, Be = n._emscripten_bind_btDynamicsWorld_removeCollisionObject_1 = function () {
                return (Be = n._emscripten_bind_btDynamicsWorld_removeCollisionObject_1 = n.asm.Ga).apply(null, arguments)
            }, ge = n._emscripten_bind_btDynamicsWorld_getBroadphase_0 = function () {
                return (ge = n._emscripten_bind_btDynamicsWorld_getBroadphase_0 = n.asm.Ha).apply(null, arguments)
            }, Ce = n._emscripten_bind_btDynamicsWorld_convexSweepTest_5 = function () {
                return (Ce = n._emscripten_bind_btDynamicsWorld_convexSweepTest_5 = n.asm.Ia).apply(null, arguments)
            }, Se = n._emscripten_bind_btDynamicsWorld_contactPairTest_3 = function () {
                return (Se = n._emscripten_bind_btDynamicsWorld_contactPairTest_3 = n.asm.Ja).apply(null, arguments)
            }, je = n._emscripten_bind_btDynamicsWorld_contactTest_2 = function () {
                return (je = n._emscripten_bind_btDynamicsWorld_contactTest_2 = n.asm.Ka).apply(null, arguments)
            }, ve = n._emscripten_bind_btDynamicsWorld_updateSingleAabb_1 = function () {
                return (ve = n._emscripten_bind_btDynamicsWorld_updateSingleAabb_1 = n.asm.La).apply(null, arguments)
            }, Ie = n._emscripten_bind_btDynamicsWorld_setDebugDrawer_1 = function () {
                return (Ie = n._emscripten_bind_btDynamicsWorld_setDebugDrawer_1 = n.asm.Ma).apply(null, arguments)
            }, Re = n._emscripten_bind_btDynamicsWorld_getDebugDrawer_0 = function () {
                return (Re = n._emscripten_bind_btDynamicsWorld_getDebugDrawer_0 = n.asm.Na).apply(null, arguments)
            }, De = n._emscripten_bind_btDynamicsWorld_debugDrawWorld_0 = function () {
                return (De = n._emscripten_bind_btDynamicsWorld_debugDrawWorld_0 = n.asm.Oa).apply(null, arguments)
            }, Pe = n._emscripten_bind_btDynamicsWorld_debugDrawObject_3 = function () {
                return (Pe = n._emscripten_bind_btDynamicsWorld_debugDrawObject_3 = n.asm.Pa).apply(null, arguments)
            }, Te = n._emscripten_bind_btDynamicsWorld___destroy___0 = function () {
                return (Te = n._emscripten_bind_btDynamicsWorld___destroy___0 = n.asm.Qa).apply(null, arguments)
            }, Oe = n._emscripten_bind_btIDebugDraw_drawLine_3 = function () {
                return (Oe = n._emscripten_bind_btIDebugDraw_drawLine_3 = n.asm.Ra).apply(null, arguments)
            }, We = n._emscripten_bind_btIDebugDraw_drawContactPoint_5 = function () {
                return (We = n._emscripten_bind_btIDebugDraw_drawContactPoint_5 = n.asm.Sa).apply(null, arguments)
            }, Ae = n._emscripten_bind_btIDebugDraw_reportErrorWarning_1 = function () {
                return (Ae = n._emscripten_bind_btIDebugDraw_reportErrorWarning_1 = n.asm.Ta).apply(null, arguments)
            }, Me = n._emscripten_bind_btIDebugDraw_draw3dText_2 = function () {
                return (Me = n._emscripten_bind_btIDebugDraw_draw3dText_2 = n.asm.Ua).apply(null, arguments)
            }, xe = n._emscripten_bind_btIDebugDraw_setDebugMode_1 = function () {
                return (xe = n._emscripten_bind_btIDebugDraw_setDebugMode_1 = n.asm.Va).apply(null, arguments)
            }, ke = n._emscripten_bind_btIDebugDraw_getDebugMode_0 = function () {
                return (ke = n._emscripten_bind_btIDebugDraw_getDebugMode_0 = n.asm.Wa).apply(null, arguments)
            }, Fe = n._emscripten_bind_btIDebugDraw___destroy___0 = function () {
                return (Fe = n._emscripten_bind_btIDebugDraw___destroy___0 = n.asm.Xa).apply(null, arguments)
            }, Le = n._emscripten_bind_btVector3_btVector3_0 = function () {
                return (Le = n._emscripten_bind_btVector3_btVector3_0 = n.asm.Ya).apply(null, arguments)
            }, Ge = n._emscripten_bind_btVector3_btVector3_3 = function () {
                return (Ge = n._emscripten_bind_btVector3_btVector3_3 = n.asm.Za).apply(null, arguments)
            }, we = n._emscripten_bind_btVector3_length_0 = function () {
                return (we = n._emscripten_bind_btVector3_length_0 = n.asm._a).apply(null, arguments)
            }, He = n._emscripten_bind_btVector3_x_0 = function () {
                return (He = n._emscripten_bind_btVector3_x_0 = n.asm.$a).apply(null, arguments)
            }, Ve = n._emscripten_bind_btVector3_y_0 = function () {
                return (Ve = n._emscripten_bind_btVector3_y_0 = n.asm.ab).apply(null, arguments)
            }, Ee = n._emscripten_bind_btVector3_z_0 = function () {
                return (Ee = n._emscripten_bind_btVector3_z_0 = n.asm.bb).apply(null, arguments)
            }, Ne = n._emscripten_bind_btVector3_setX_1 = function () {
                return (Ne = n._emscripten_bind_btVector3_setX_1 = n.asm.cb).apply(null, arguments)
            }, Ue = n._emscripten_bind_btVector3_setY_1 = function () {
                return (Ue = n._emscripten_bind_btVector3_setY_1 = n.asm.db).apply(null, arguments)
            }, ze = n._emscripten_bind_btVector3_setZ_1 = function () {
                return (ze = n._emscripten_bind_btVector3_setZ_1 = n.asm.eb).apply(null, arguments)
            }, qe = n._emscripten_bind_btVector3_setValue_3 = function () {
                return (qe = n._emscripten_bind_btVector3_setValue_3 = n.asm.fb).apply(null, arguments)
            }, Ke = n._emscripten_bind_btVector3_normalize_0 = function () {
                return (Ke = n._emscripten_bind_btVector3_normalize_0 = n.asm.gb).apply(null, arguments)
            }, Qe = n._emscripten_bind_btVector3_rotate_2 = function () {
                return (Qe = n._emscripten_bind_btVector3_rotate_2 = n.asm.hb).apply(null, arguments)
            }, Xe = n._emscripten_bind_btVector3_dot_1 = function () {
                return (Xe = n._emscripten_bind_btVector3_dot_1 = n.asm.ib).apply(null, arguments)
            }, Ze = n._emscripten_bind_btVector3_op_mul_1 = function () {
                return (Ze = n._emscripten_bind_btVector3_op_mul_1 = n.asm.jb).apply(null, arguments)
            }, Ye = n._emscripten_bind_btVector3_op_add_1 = function () {
                return (Ye = n._emscripten_bind_btVector3_op_add_1 = n.asm.kb).apply(null, arguments)
            }, Je = n._emscripten_bind_btVector3_op_sub_1 = function () {
                return (Je = n._emscripten_bind_btVector3_op_sub_1 = n.asm.lb).apply(null, arguments)
            }, $e = n._emscripten_bind_btVector3___destroy___0 = function () {
                return ($e = n._emscripten_bind_btVector3___destroy___0 = n.asm.mb).apply(null, arguments)
            }, tn = n._emscripten_bind_btQuadWord_x_0 = function () {
                return (tn = n._emscripten_bind_btQuadWord_x_0 = n.asm.nb).apply(null, arguments)
            }, en = n._emscripten_bind_btQuadWord_y_0 = function () {
                return (en = n._emscripten_bind_btQuadWord_y_0 = n.asm.ob).apply(null, arguments)
            }, nn = n._emscripten_bind_btQuadWord_z_0 = function () {
                return (nn = n._emscripten_bind_btQuadWord_z_0 = n.asm.pb).apply(null, arguments)
            }, on = n._emscripten_bind_btQuadWord_w_0 = function () {
                return (on = n._emscripten_bind_btQuadWord_w_0 = n.asm.qb).apply(null, arguments)
            }, _n = n._emscripten_bind_btQuadWord_setX_1 = function () {
                return (_n = n._emscripten_bind_btQuadWord_setX_1 = n.asm.rb).apply(null, arguments)
            }, rn = n._emscripten_bind_btQuadWord_setY_1 = function () {
                return (rn = n._emscripten_bind_btQuadWord_setY_1 = n.asm.sb).apply(null, arguments)
            }, pn = n._emscripten_bind_btQuadWord_setZ_1 = function () {
                return (pn = n._emscripten_bind_btQuadWord_setZ_1 = n.asm.tb).apply(null, arguments)
            }, sn = n._emscripten_bind_btQuadWord_setW_1 = function () {
                return (sn = n._emscripten_bind_btQuadWord_setW_1 = n.asm.ub).apply(null, arguments)
            }, cn = n._emscripten_bind_btQuadWord___destroy___0 = function () {
                return (cn = n._emscripten_bind_btQuadWord___destroy___0 = n.asm.vb).apply(null, arguments)
            }, an = n._emscripten_bind_btMotionState_getWorldTransform_1 = function () {
                return (an = n._emscripten_bind_btMotionState_getWorldTransform_1 = n.asm.wb).apply(null, arguments)
            }, ln = n._emscripten_bind_btMotionState_setWorldTransform_1 = function () {
                return (ln = n._emscripten_bind_btMotionState_setWorldTransform_1 = n.asm.xb).apply(null, arguments)
            }, un = n._emscripten_bind_btMotionState___destroy___0 = function () {
                return (un = n._emscripten_bind_btMotionState___destroy___0 = n.asm.yb).apply(null, arguments)
            }, bn = n._emscripten_bind_RayResultCallback_hasHit_0 = function () {
                return (bn = n._emscripten_bind_RayResultCallback_hasHit_0 = n.asm.zb).apply(null, arguments)
            }, yn = n._emscripten_bind_RayResultCallback_get_m_collisionFilterGroup_0 = function () {
                return (yn = n._emscripten_bind_RayResultCallback_get_m_collisionFilterGroup_0 = n.asm.Ab).apply(null, arguments)
            }, mn = n._emscripten_bind_RayResultCallback_set_m_collisionFilterGroup_1 = function () {
                return (mn = n._emscripten_bind_RayResultCallback_set_m_collisionFilterGroup_1 = n.asm.Bb).apply(null, arguments)
            }, dn = n._emscripten_bind_RayResultCallback_get_m_collisionFilterMask_0 = function () {
                return (dn = n._emscripten_bind_RayResultCallback_get_m_collisionFilterMask_0 = n.asm.Cb).apply(null, arguments)
            }, fn = n._emscripten_bind_RayResultCallback_set_m_collisionFilterMask_1 = function () {
                return (fn = n._emscripten_bind_RayResultCallback_set_m_collisionFilterMask_1 = n.asm.Db).apply(null, arguments)
            }, hn = n._emscripten_bind_RayResultCallback_get_m_closestHitFraction_0 = function () {
                return (hn = n._emscripten_bind_RayResultCallback_get_m_closestHitFraction_0 = n.asm.Eb).apply(null, arguments)
            }, Bn = n._emscripten_bind_RayResultCallback_set_m_closestHitFraction_1 = function () {
                return (Bn = n._emscripten_bind_RayResultCallback_set_m_closestHitFraction_1 = n.asm.Fb).apply(null, arguments)
            }, gn = n._emscripten_bind_RayResultCallback_get_m_collisionObject_0 = function () {
                return (gn = n._emscripten_bind_RayResultCallback_get_m_collisionObject_0 = n.asm.Gb).apply(null, arguments)
            }, Cn = n._emscripten_bind_RayResultCallback_set_m_collisionObject_1 = function () {
                return (Cn = n._emscripten_bind_RayResultCallback_set_m_collisionObject_1 = n.asm.Hb).apply(null, arguments)
            }, Sn = n._emscripten_bind_RayResultCallback_get_m_flags_0 = function () {
                return (Sn = n._emscripten_bind_RayResultCallback_get_m_flags_0 = n.asm.Ib).apply(null, arguments)
            }, jn = n._emscripten_bind_RayResultCallback_set_m_flags_1 = function () {
                return (jn = n._emscripten_bind_RayResultCallback_set_m_flags_1 = n.asm.Jb).apply(null, arguments)
            }, vn = n._emscripten_bind_RayResultCallback___destroy___0 = function () {
                return (vn = n._emscripten_bind_RayResultCallback___destroy___0 = n.asm.Kb).apply(null, arguments)
            }, In = n._emscripten_bind_ContactResultCallback_addSingleResult_7 = function () {
                return (In = n._emscripten_bind_ContactResultCallback_addSingleResult_7 = n.asm.Lb).apply(null, arguments)
            }, Rn = n._emscripten_bind_ContactResultCallback___destroy___0 = function () {
                return (Rn = n._emscripten_bind_ContactResultCallback___destroy___0 = n.asm.Mb).apply(null, arguments)
            }, Dn = n._emscripten_bind_ConvexResultCallback_hasHit_0 = function () {
                return (Dn = n._emscripten_bind_ConvexResultCallback_hasHit_0 = n.asm.Nb).apply(null, arguments)
            }, Pn = n._emscripten_bind_ConvexResultCallback_get_m_collisionFilterGroup_0 = function () {
                return (Pn = n._emscripten_bind_ConvexResultCallback_get_m_collisionFilterGroup_0 = n.asm.Ob).apply(null, arguments)
            }, Tn = n._emscripten_bind_ConvexResultCallback_set_m_collisionFilterGroup_1 = function () {
                return (Tn = n._emscripten_bind_ConvexResultCallback_set_m_collisionFilterGroup_1 = n.asm.Pb).apply(null, arguments)
            }, On = n._emscripten_bind_ConvexResultCallback_get_m_collisionFilterMask_0 = function () {
                return (On = n._emscripten_bind_ConvexResultCallback_get_m_collisionFilterMask_0 = n.asm.Qb).apply(null, arguments)
            }, Wn = n._emscripten_bind_ConvexResultCallback_set_m_collisionFilterMask_1 = function () {
                return (Wn = n._emscripten_bind_ConvexResultCallback_set_m_collisionFilterMask_1 = n.asm.Rb).apply(null, arguments)
            }, An = n._emscripten_bind_ConvexResultCallback_get_m_closestHitFraction_0 = function () {
                return (An = n._emscripten_bind_ConvexResultCallback_get_m_closestHitFraction_0 = n.asm.Sb).apply(null, arguments)
            }, Mn = n._emscripten_bind_ConvexResultCallback_set_m_closestHitFraction_1 = function () {
                return (Mn = n._emscripten_bind_ConvexResultCallback_set_m_closestHitFraction_1 = n.asm.Tb).apply(null, arguments)
            }, xn = n._emscripten_bind_ConvexResultCallback___destroy___0 = function () {
                return (xn = n._emscripten_bind_ConvexResultCallback___destroy___0 = n.asm.Ub).apply(null, arguments)
            }, kn = n._emscripten_bind_btConvexShape_setLocalScaling_1 = function () {
                return (kn = n._emscripten_bind_btConvexShape_setLocalScaling_1 = n.asm.Vb).apply(null, arguments)
            }, Fn = n._emscripten_bind_btConvexShape_getLocalScaling_0 = function () {
                return (Fn = n._emscripten_bind_btConvexShape_getLocalScaling_0 = n.asm.Wb).apply(null, arguments)
            }, Ln = n._emscripten_bind_btConvexShape_calculateLocalInertia_2 = function () {
                return (Ln = n._emscripten_bind_btConvexShape_calculateLocalInertia_2 = n.asm.Xb).apply(null, arguments)
            }, Gn = n._emscripten_bind_btConvexShape_setMargin_1 = function () {
                return (Gn = n._emscripten_bind_btConvexShape_setMargin_1 = n.asm.Yb).apply(null, arguments)
            }, wn = n._emscripten_bind_btConvexShape_getMargin_0 = function () {
                return (wn = n._emscripten_bind_btConvexShape_getMargin_0 = n.asm.Zb).apply(null, arguments)
            }, Hn = n._emscripten_bind_btConvexShape___destroy___0 = function () {
                return (Hn = n._emscripten_bind_btConvexShape___destroy___0 = n.asm._b).apply(null, arguments)
            }, Vn = n._emscripten_bind_btCapsuleShape_btCapsuleShape_2 = function () {
                return (Vn = n._emscripten_bind_btCapsuleShape_btCapsuleShape_2 = n.asm.$b).apply(null, arguments)
            }, En = n._emscripten_bind_btCapsuleShape_setMargin_1 = function () {
                return (En = n._emscripten_bind_btCapsuleShape_setMargin_1 = n.asm.ac).apply(null, arguments)
            }, Nn = n._emscripten_bind_btCapsuleShape_getMargin_0 = function () {
                return (Nn = n._emscripten_bind_btCapsuleShape_getMargin_0 = n.asm.bc).apply(null, arguments)
            }, Un = n._emscripten_bind_btCapsuleShape_getUpAxis_0 = function () {
                return (Un = n._emscripten_bind_btCapsuleShape_getUpAxis_0 = n.asm.cc).apply(null, arguments)
            }, zn = n._emscripten_bind_btCapsuleShape_getRadius_0 = function () {
                return (zn = n._emscripten_bind_btCapsuleShape_getRadius_0 = n.asm.dc).apply(null, arguments)
            }, qn = n._emscripten_bind_btCapsuleShape_getHalfHeight_0 = function () {
                return (qn = n._emscripten_bind_btCapsuleShape_getHalfHeight_0 = n.asm.ec).apply(null, arguments)
            }, Kn = n._emscripten_bind_btCapsuleShape_setLocalScaling_1 = function () {
                return (Kn = n._emscripten_bind_btCapsuleShape_setLocalScaling_1 = n.asm.fc).apply(null, arguments)
            }, Qn = n._emscripten_bind_btCapsuleShape_getLocalScaling_0 = function () {
                return (Qn = n._emscripten_bind_btCapsuleShape_getLocalScaling_0 = n.asm.gc).apply(null, arguments)
            }, Xn = n._emscripten_bind_btCapsuleShape_calculateLocalInertia_2 = function () {
                return (Xn = n._emscripten_bind_btCapsuleShape_calculateLocalInertia_2 = n.asm.hc).apply(null, arguments)
            }, Zn = n._emscripten_bind_btCapsuleShape___destroy___0 = function () {
                return (Zn = n._emscripten_bind_btCapsuleShape___destroy___0 = n.asm.ic).apply(null, arguments)
            }, Yn = n._emscripten_bind_btCylinderShape_btCylinderShape_1 = function () {
                return (Yn = n._emscripten_bind_btCylinderShape_btCylinderShape_1 = n.asm.jc).apply(null, arguments)
            }, Jn = n._emscripten_bind_btCylinderShape_setMargin_1 = function () {
                return (Jn = n._emscripten_bind_btCylinderShape_setMargin_1 = n.asm.kc).apply(null, arguments)
            }, $n = n._emscripten_bind_btCylinderShape_getMargin_0 = function () {
                return ($n = n._emscripten_bind_btCylinderShape_getMargin_0 = n.asm.lc).apply(null, arguments)
            }, to = n._emscripten_bind_btCylinderShape_setLocalScaling_1 = function () {
                return (to = n._emscripten_bind_btCylinderShape_setLocalScaling_1 = n.asm.mc).apply(null, arguments)
            }, eo = n._emscripten_bind_btCylinderShape_getLocalScaling_0 = function () {
                return (eo = n._emscripten_bind_btCylinderShape_getLocalScaling_0 = n.asm.nc).apply(null, arguments)
            }, no = n._emscripten_bind_btCylinderShape_calculateLocalInertia_2 = function () {
                return (no = n._emscripten_bind_btCylinderShape_calculateLocalInertia_2 = n.asm.oc).apply(null, arguments)
            }, oo = n._emscripten_bind_btCylinderShape___destroy___0 = function () {
                return (oo = n._emscripten_bind_btCylinderShape___destroy___0 = n.asm.pc).apply(null, arguments)
            }, _o = n._emscripten_bind_btConeShape_btConeShape_2 = function () {
                return (_o = n._emscripten_bind_btConeShape_btConeShape_2 = n.asm.qc).apply(null, arguments)
            }, io = n._emscripten_bind_btConeShape_setLocalScaling_1 = function () {
                return (io = n._emscripten_bind_btConeShape_setLocalScaling_1 = n.asm.rc).apply(null, arguments)
            }, ro = n._emscripten_bind_btConeShape_getLocalScaling_0 = function () {
                return (ro = n._emscripten_bind_btConeShape_getLocalScaling_0 = n.asm.sc).apply(null, arguments)
            }, po = n._emscripten_bind_btConeShape_calculateLocalInertia_2 = function () {
                return (po = n._emscripten_bind_btConeShape_calculateLocalInertia_2 = n.asm.tc).apply(null, arguments)
            }, so = n._emscripten_bind_btConeShape___destroy___0 = function () {
                return (so = n._emscripten_bind_btConeShape___destroy___0 = n.asm.uc).apply(null, arguments)
            }, co = n._emscripten_bind_btStridingMeshInterface_setScaling_1 = function () {
                return (co = n._emscripten_bind_btStridingMeshInterface_setScaling_1 = n.asm.vc).apply(null, arguments)
            }, ao = n._emscripten_bind_btStridingMeshInterface___destroy___0 = function () {
                return (ao = n._emscripten_bind_btStridingMeshInterface___destroy___0 = n.asm.wc).apply(null, arguments)
            }, lo = n._emscripten_bind_btTriangleMeshShape_setLocalScaling_1 = function () {
                return (lo = n._emscripten_bind_btTriangleMeshShape_setLocalScaling_1 = n.asm.xc).apply(null, arguments)
            }, uo = n._emscripten_bind_btTriangleMeshShape_getLocalScaling_0 = function () {
                return (uo = n._emscripten_bind_btTriangleMeshShape_getLocalScaling_0 = n.asm.yc).apply(null, arguments)
            }, bo = n._emscripten_bind_btTriangleMeshShape_calculateLocalInertia_2 = function () {
                return (bo = n._emscripten_bind_btTriangleMeshShape_calculateLocalInertia_2 = n.asm.zc).apply(null, arguments)
            }, yo = n._emscripten_bind_btTriangleMeshShape___destroy___0 = function () {
                return (yo = n._emscripten_bind_btTriangleMeshShape___destroy___0 = n.asm.Ac).apply(null, arguments)
            }, mo = n._emscripten_bind_btPrimitiveManagerBase_is_trimesh_0 = function () {
                return (mo = n._emscripten_bind_btPrimitiveManagerBase_is_trimesh_0 = n.asm.Bc).apply(null, arguments)
            }, fo = n._emscripten_bind_btPrimitiveManagerBase_get_primitive_count_0 = function () {
                return (fo = n._emscripten_bind_btPrimitiveManagerBase_get_primitive_count_0 = n.asm.Cc).apply(null, arguments)
            }, ho = n._emscripten_bind_btPrimitiveManagerBase_get_primitive_box_2 = function () {
                return (ho = n._emscripten_bind_btPrimitiveManagerBase_get_primitive_box_2 = n.asm.Dc).apply(null, arguments)
            }, Bo = n._emscripten_bind_btPrimitiveManagerBase_get_primitive_triangle_2 = function () {
                return (Bo = n._emscripten_bind_btPrimitiveManagerBase_get_primitive_triangle_2 = n.asm.Ec).apply(null, arguments)
            }, go = n._emscripten_bind_btPrimitiveManagerBase___destroy___0 = function () {
                return (go = n._emscripten_bind_btPrimitiveManagerBase___destroy___0 = n.asm.Fc).apply(null, arguments)
            }, Co = n._emscripten_bind_btGImpactShapeInterface_updateBound_0 = function () {
                return (Co = n._emscripten_bind_btGImpactShapeInterface_updateBound_0 = n.asm.Gc).apply(null, arguments)
            }, So = n._emscripten_bind_btGImpactShapeInterface_postUpdate_0 = function () {
                return (So = n._emscripten_bind_btGImpactShapeInterface_postUpdate_0 = n.asm.Hc).apply(null, arguments)
            }, jo = n._emscripten_bind_btGImpactShapeInterface_getShapeType_0 = function () {
                return (jo = n._emscripten_bind_btGImpactShapeInterface_getShapeType_0 = n.asm.Ic).apply(null, arguments)
            }, vo = n._emscripten_bind_btGImpactShapeInterface_getName_0 = function () {
                return (vo = n._emscripten_bind_btGImpactShapeInterface_getName_0 = n.asm.Jc).apply(null, arguments)
            }, Io = n._emscripten_bind_btGImpactShapeInterface_getGImpactShapeType_0 = function () {
                return (Io = n._emscripten_bind_btGImpactShapeInterface_getGImpactShapeType_0 = n.asm.Kc).apply(null, arguments)
            }, Ro = n._emscripten_bind_btGImpactShapeInterface_getPrimitiveManager_0 = function () {
                return (Ro = n._emscripten_bind_btGImpactShapeInterface_getPrimitiveManager_0 = n.asm.Lc).apply(null, arguments)
            }, Do = n._emscripten_bind_btGImpactShapeInterface_getNumChildShapes_0 = function () {
                return (Do = n._emscripten_bind_btGImpactShapeInterface_getNumChildShapes_0 = n.asm.Mc).apply(null, arguments)
            }, Po = n._emscripten_bind_btGImpactShapeInterface_childrenHasTransform_0 = function () {
                return (Po = n._emscripten_bind_btGImpactShapeInterface_childrenHasTransform_0 = n.asm.Nc).apply(null, arguments)
            }, To = n._emscripten_bind_btGImpactShapeInterface_needsRetrieveTriangles_0 = function () {
                return (To = n._emscripten_bind_btGImpactShapeInterface_needsRetrieveTriangles_0 = n.asm.Oc).apply(null, arguments)
            }, Oo = n._emscripten_bind_btGImpactShapeInterface_needsRetrieveTetrahedrons_0 = function () {
                return (Oo = n._emscripten_bind_btGImpactShapeInterface_needsRetrieveTetrahedrons_0 = n.asm.Pc).apply(null, arguments)
            }, Wo = n._emscripten_bind_btGImpactShapeInterface_getBulletTriangle_2 = function () {
                return (Wo = n._emscripten_bind_btGImpactShapeInterface_getBulletTriangle_2 = n.asm.Qc).apply(null, arguments)
            }, Ao = n._emscripten_bind_btGImpactShapeInterface_getBulletTetrahedron_2 = function () {
                return (Ao = n._emscripten_bind_btGImpactShapeInterface_getBulletTetrahedron_2 = n.asm.Rc).apply(null, arguments)
            }, Mo = n._emscripten_bind_btGImpactShapeInterface_getChildShape_1 = function () {
                return (Mo = n._emscripten_bind_btGImpactShapeInterface_getChildShape_1 = n.asm.Sc).apply(null, arguments)
            }, xo = n._emscripten_bind_btGImpactShapeInterface_getChildTransform_1 = function () {
                return (xo = n._emscripten_bind_btGImpactShapeInterface_getChildTransform_1 = n.asm.Tc).apply(null, arguments)
            }, ko = n._emscripten_bind_btGImpactShapeInterface_setChildTransform_2 = function () {
                return (ko = n._emscripten_bind_btGImpactShapeInterface_setChildTransform_2 = n.asm.Uc).apply(null, arguments)
            }, Fo = n._emscripten_bind_btGImpactShapeInterface_setLocalScaling_1 = function () {
                return (Fo = n._emscripten_bind_btGImpactShapeInterface_setLocalScaling_1 = n.asm.Vc).apply(null, arguments)
            }, Lo = n._emscripten_bind_btGImpactShapeInterface_getLocalScaling_0 = function () {
                return (Lo = n._emscripten_bind_btGImpactShapeInterface_getLocalScaling_0 = n.asm.Wc).apply(null, arguments)
            }, Go = n._emscripten_bind_btGImpactShapeInterface_calculateLocalInertia_2 = function () {
                return (Go = n._emscripten_bind_btGImpactShapeInterface_calculateLocalInertia_2 = n.asm.Xc).apply(null, arguments)
            }, wo = n._emscripten_bind_btGImpactShapeInterface___destroy___0 = function () {
                return (wo = n._emscripten_bind_btGImpactShapeInterface___destroy___0 = n.asm.Yc).apply(null, arguments)
            }, Ho = n._emscripten_bind_btActivatingCollisionAlgorithm___destroy___0 = function () {
                return (Ho = n._emscripten_bind_btActivatingCollisionAlgorithm___destroy___0 = n.asm.Zc).apply(null, arguments)
            }, Vo = n._emscripten_bind_btDefaultCollisionConfiguration_btDefaultCollisionConfiguration_0 = function () {
                return (Vo = n._emscripten_bind_btDefaultCollisionConfiguration_btDefaultCollisionConfiguration_0 = n.asm._c).apply(null, arguments)
            }, Eo = n._emscripten_bind_btDefaultCollisionConfiguration_btDefaultCollisionConfiguration_1 = function () {
                return (Eo = n._emscripten_bind_btDefaultCollisionConfiguration_btDefaultCollisionConfiguration_1 = n.asm.$c).apply(null, arguments)
            }, No = n._emscripten_bind_btDefaultCollisionConfiguration___destroy___0 = function () {
                return (No = n._emscripten_bind_btDefaultCollisionConfiguration___destroy___0 = n.asm.ad).apply(null, arguments)
            }, Uo = n._emscripten_bind_btDispatcher_getNumManifolds_0 = function () {
                return (Uo = n._emscripten_bind_btDispatcher_getNumManifolds_0 = n.asm.bd).apply(null, arguments)
            }, zo = n._emscripten_bind_btDispatcher_getManifoldByIndexInternal_1 = function () {
                return (zo = n._emscripten_bind_btDispatcher_getManifoldByIndexInternal_1 = n.asm.cd).apply(null, arguments)
            }, qo = n._emscripten_bind_btDispatcher___destroy___0 = function () {
                return (qo = n._emscripten_bind_btDispatcher___destroy___0 = n.asm.dd).apply(null, arguments)
            }, Ko = n._emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_3 = function () {
                return (Ko = n._emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_3 = n.asm.ed).apply(null, arguments)
            }, Qo = n._emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_5 = function () {
                return (Qo = n._emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_5 = n.asm.fd).apply(null, arguments)
            }, Xo = n._emscripten_bind_btGeneric6DofConstraint_setLinearLowerLimit_1 = function () {
                return (Xo = n._emscripten_bind_btGeneric6DofConstraint_setLinearLowerLimit_1 = n.asm.gd).apply(null, arguments)
            }, Zo = n._emscripten_bind_btGeneric6DofConstraint_setLinearUpperLimit_1 = function () {
                return (Zo = n._emscripten_bind_btGeneric6DofConstraint_setLinearUpperLimit_1 = n.asm.hd).apply(null, arguments)
            }, Yo = n._emscripten_bind_btGeneric6DofConstraint_setAngularLowerLimit_1 = function () {
                return (Yo = n._emscripten_bind_btGeneric6DofConstraint_setAngularLowerLimit_1 = n.asm.id).apply(null, arguments)
            }, Jo = n._emscripten_bind_btGeneric6DofConstraint_setAngularUpperLimit_1 = function () {
                return (Jo = n._emscripten_bind_btGeneric6DofConstraint_setAngularUpperLimit_1 = n.asm.jd).apply(null, arguments)
            }, $o = n._emscripten_bind_btGeneric6DofConstraint_getFrameOffsetA_0 = function () {
                return ($o = n._emscripten_bind_btGeneric6DofConstraint_getFrameOffsetA_0 = n.asm.kd).apply(null, arguments)
            }, t_ = n._emscripten_bind_btGeneric6DofConstraint_enableFeedback_1 = function () {
                return (t_ = n._emscripten_bind_btGeneric6DofConstraint_enableFeedback_1 = n.asm.ld).apply(null, arguments)
            }, e_ = n._emscripten_bind_btGeneric6DofConstraint_getBreakingImpulseThreshold_0 = function () {
                return (e_ = n._emscripten_bind_btGeneric6DofConstraint_getBreakingImpulseThreshold_0 = n.asm.md).apply(null, arguments)
            }, n_ = n._emscripten_bind_btGeneric6DofConstraint_setBreakingImpulseThreshold_1 = function () {
                return (n_ = n._emscripten_bind_btGeneric6DofConstraint_setBreakingImpulseThreshold_1 = n.asm.nd).apply(null, arguments)
            }, o_ = n._emscripten_bind_btGeneric6DofConstraint_getParam_2 = function () {
                return (o_ = n._emscripten_bind_btGeneric6DofConstraint_getParam_2 = n.asm.od).apply(null, arguments)
            }, __ = n._emscripten_bind_btGeneric6DofConstraint_setParam_3 = function () {
                return (__ = n._emscripten_bind_btGeneric6DofConstraint_setParam_3 = n.asm.pd).apply(null, arguments)
            }, i_ = n._emscripten_bind_btGeneric6DofConstraint___destroy___0 = function () {
                return (i_ = n._emscripten_bind_btGeneric6DofConstraint___destroy___0 = n.asm.qd).apply(null, arguments)
            }, r_ = n._emscripten_bind_btDiscreteDynamicsWorld_btDiscreteDynamicsWorld_4 = function () {
                return (r_ = n._emscripten_bind_btDiscreteDynamicsWorld_btDiscreteDynamicsWorld_4 = n.asm.rd).apply(null, arguments)
            }, p_ = n._emscripten_bind_btDiscreteDynamicsWorld_setGravity_1 = function () {
                return (p_ = n._emscripten_bind_btDiscreteDynamicsWorld_setGravity_1 = n.asm.sd).apply(null, arguments)
            }, s_ = n._emscripten_bind_btDiscreteDynamicsWorld_getGravity_0 = function () {
                return (s_ = n._emscripten_bind_btDiscreteDynamicsWorld_getGravity_0 = n.asm.td).apply(null, arguments)
            }, c_ = n._emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_1 = function () {
                return (c_ = n._emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_1 = n.asm.ud).apply(null, arguments)
            }, a_ = n._emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_3 = function () {
                return (a_ = n._emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_3 = n.asm.vd).apply(null, arguments)
            }, l_ = n._emscripten_bind_btDiscreteDynamicsWorld_removeRigidBody_1 = function () {
                return (l_ = n._emscripten_bind_btDiscreteDynamicsWorld_removeRigidBody_1 = n.asm.wd).apply(null, arguments)
            }, u_ = n._emscripten_bind_btDiscreteDynamicsWorld_addConstraint_1 = function () {
                return (u_ = n._emscripten_bind_btDiscreteDynamicsWorld_addConstraint_1 = n.asm.xd).apply(null, arguments)
            }, b_ = n._emscripten_bind_btDiscreteDynamicsWorld_addConstraint_2 = function () {
                return (b_ = n._emscripten_bind_btDiscreteDynamicsWorld_addConstraint_2 = n.asm.yd).apply(null, arguments)
            }, y_ = n._emscripten_bind_btDiscreteDynamicsWorld_removeConstraint_1 = function () {
                return (y_ = n._emscripten_bind_btDiscreteDynamicsWorld_removeConstraint_1 = n.asm.zd).apply(null, arguments)
            }, m_ = n._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_1 = function () {
                return (m_ = n._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_1 = n.asm.Ad).apply(null, arguments)
            }, d_ = n._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_2 = function () {
                return (d_ = n._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_2 = n.asm.Bd).apply(null, arguments)
            }, f_ = n._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_3 = function () {
                return (f_ = n._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_3 = n.asm.Cd).apply(null, arguments)
            }, h_ = n._emscripten_bind_btDiscreteDynamicsWorld_setContactAddedCallback_1 = function () {
                return (h_ = n._emscripten_bind_btDiscreteDynamicsWorld_setContactAddedCallback_1 = n.asm.Dd).apply(null, arguments)
            }, B_ = n._emscripten_bind_btDiscreteDynamicsWorld_setContactProcessedCallback_1 = function () {
                return (B_ = n._emscripten_bind_btDiscreteDynamicsWorld_setContactProcessedCallback_1 = n.asm.Ed).apply(null, arguments)
            }, g_ = n._emscripten_bind_btDiscreteDynamicsWorld_setContactDestroyedCallback_1 = function () {
                return (g_ = n._emscripten_bind_btDiscreteDynamicsWorld_setContactDestroyedCallback_1 = n.asm.Fd).apply(null, arguments)
            }, C_ = n._emscripten_bind_btDiscreteDynamicsWorld_getDispatcher_0 = function () {
                return (C_ = n._emscripten_bind_btDiscreteDynamicsWorld_getDispatcher_0 = n.asm.Gd).apply(null, arguments)
            }, S_ = n._emscripten_bind_btDiscreteDynamicsWorld_rayTest_3 = function () {
                return (S_ = n._emscripten_bind_btDiscreteDynamicsWorld_rayTest_3 = n.asm.Hd).apply(null, arguments)
            }, j_ = n._emscripten_bind_btDiscreteDynamicsWorld_getPairCache_0 = function () {
                return (j_ = n._emscripten_bind_btDiscreteDynamicsWorld_getPairCache_0 = n.asm.Id).apply(null, arguments)
            }, v_ = n._emscripten_bind_btDiscreteDynamicsWorld_getDispatchInfo_0 = function () {
                return (v_ = n._emscripten_bind_btDiscreteDynamicsWorld_getDispatchInfo_0 = n.asm.Jd).apply(null, arguments)
            }, I_ = n._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_1 = function () {
                return (I_ = n._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_1 = n.asm.Kd).apply(null, arguments)
            }, R_ = n._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_2 = function () {
                return (R_ = n._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_2 = n.asm.Ld).apply(null, arguments)
            }, D_ = n._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_3 = function () {
                return (D_ = n._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_3 = n.asm.Md).apply(null, arguments)
            }, P_ = n._emscripten_bind_btDiscreteDynamicsWorld_removeCollisionObject_1 = function () {
                return (P_ = n._emscripten_bind_btDiscreteDynamicsWorld_removeCollisionObject_1 = n.asm.Nd).apply(null, arguments)
            }, T_ = n._emscripten_bind_btDiscreteDynamicsWorld_getBroadphase_0 = function () {
                return (T_ = n._emscripten_bind_btDiscreteDynamicsWorld_getBroadphase_0 = n.asm.Od).apply(null, arguments)
            }, O_ = n._emscripten_bind_btDiscreteDynamicsWorld_convexSweepTest_5 = function () {
                return (O_ = n._emscripten_bind_btDiscreteDynamicsWorld_convexSweepTest_5 = n.asm.Pd).apply(null, arguments)
            }, W_ = n._emscripten_bind_btDiscreteDynamicsWorld_contactPairTest_3 = function () {
                return (W_ = n._emscripten_bind_btDiscreteDynamicsWorld_contactPairTest_3 = n.asm.Qd).apply(null, arguments)
            }, A_ = n._emscripten_bind_btDiscreteDynamicsWorld_contactTest_2 = function () {
                return (A_ = n._emscripten_bind_btDiscreteDynamicsWorld_contactTest_2 = n.asm.Rd).apply(null, arguments)
            }, M_ = n._emscripten_bind_btDiscreteDynamicsWorld_updateSingleAabb_1 = function () {
                return (M_ = n._emscripten_bind_btDiscreteDynamicsWorld_updateSingleAabb_1 = n.asm.Sd).apply(null, arguments)
            }, x_ = n._emscripten_bind_btDiscreteDynamicsWorld_setDebugDrawer_1 = function () {
                return (x_ = n._emscripten_bind_btDiscreteDynamicsWorld_setDebugDrawer_1 = n.asm.Td).apply(null, arguments)
            }, k_ = n._emscripten_bind_btDiscreteDynamicsWorld_getDebugDrawer_0 = function () {
                return (k_ = n._emscripten_bind_btDiscreteDynamicsWorld_getDebugDrawer_0 = n.asm.Ud).apply(null, arguments)
            }, F_ = n._emscripten_bind_btDiscreteDynamicsWorld_debugDrawWorld_0 = function () {
                return (F_ = n._emscripten_bind_btDiscreteDynamicsWorld_debugDrawWorld_0 = n.asm.Vd).apply(null, arguments)
            }, L_ = n._emscripten_bind_btDiscreteDynamicsWorld_debugDrawObject_3 = function () {
                return (L_ = n._emscripten_bind_btDiscreteDynamicsWorld_debugDrawObject_3 = n.asm.Wd).apply(null, arguments)
            }, G_ = n._emscripten_bind_btDiscreteDynamicsWorld_addAction_1 = function () {
                return (G_ = n._emscripten_bind_btDiscreteDynamicsWorld_addAction_1 = n.asm.Xd).apply(null, arguments)
            }, w_ = n._emscripten_bind_btDiscreteDynamicsWorld_removeAction_1 = function () {
                return (w_ = n._emscripten_bind_btDiscreteDynamicsWorld_removeAction_1 = n.asm.Yd).apply(null, arguments)
            }, H_ = n._emscripten_bind_btDiscreteDynamicsWorld_getSolverInfo_0 = function () {
                return (H_ = n._emscripten_bind_btDiscreteDynamicsWorld_getSolverInfo_0 = n.asm.Zd).apply(null, arguments)
            }, V_ = n._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_1 = function () {
                return (V_ = n._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_1 = n.asm._d).apply(null, arguments)
            }, E_ = n._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_2 = function () {
                return (E_ = n._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_2 = n.asm.$d).apply(null, arguments)
            }, N_ = n._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_3 = function () {
                return (N_ = n._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_3 = n.asm.ae).apply(null, arguments)
            }, U_ = n._emscripten_bind_btDiscreteDynamicsWorld___destroy___0 = function () {
                return (U_ = n._emscripten_bind_btDiscreteDynamicsWorld___destroy___0 = n.asm.be).apply(null, arguments)
            }, z_ = n._emscripten_bind_btVehicleRaycaster_castRay_3 = function () {
                return (z_ = n._emscripten_bind_btVehicleRaycaster_castRay_3 = n.asm.ce).apply(null, arguments)
            }, q_ = n._emscripten_bind_btVehicleRaycaster___destroy___0 = function () {
                return (q_ = n._emscripten_bind_btVehicleRaycaster___destroy___0 = n.asm.de).apply(null, arguments)
            }, K_ = n._emscripten_bind_btActionInterface_updateAction_2 = function () {
                return (K_ = n._emscripten_bind_btActionInterface_updateAction_2 = n.asm.ee).apply(null, arguments)
            }, Q_ = n._emscripten_bind_btActionInterface___destroy___0 = function () {
                return (Q_ = n._emscripten_bind_btActionInterface___destroy___0 = n.asm.fe).apply(null, arguments)
            }, X_ = n._emscripten_bind_btGhostObject_btGhostObject_0 = function () {
                return (X_ = n._emscripten_bind_btGhostObject_btGhostObject_0 = n.asm.ge).apply(null, arguments)
            }, Z_ = n._emscripten_bind_btGhostObject_getNumOverlappingObjects_0 = function () {
                return (Z_ = n._emscripten_bind_btGhostObject_getNumOverlappingObjects_0 = n.asm.he).apply(null, arguments)
            }, Y_ = n._emscripten_bind_btGhostObject_getOverlappingObject_1 = function () {
                return (Y_ = n._emscripten_bind_btGhostObject_getOverlappingObject_1 = n.asm.ie).apply(null, arguments)
            }, J_ = n._emscripten_bind_btGhostObject_setAnisotropicFriction_2 = function () {
                return (J_ = n._emscripten_bind_btGhostObject_setAnisotropicFriction_2 = n.asm.je).apply(null, arguments)
            }, $_ = n._emscripten_bind_btGhostObject_getCollisionShape_0 = function () {
                return ($_ = n._emscripten_bind_btGhostObject_getCollisionShape_0 = n.asm.ke).apply(null, arguments)
            }, ti = n._emscripten_bind_btGhostObject_setContactProcessingThreshold_1 = function () {
                return (ti = n._emscripten_bind_btGhostObject_setContactProcessingThreshold_1 = n.asm.le).apply(null, arguments)
            }, ei = n._emscripten_bind_btGhostObject_setActivationState_1 = function () {
                return (ei = n._emscripten_bind_btGhostObject_setActivationState_1 = n.asm.me).apply(null, arguments)
            }, ni = n._emscripten_bind_btGhostObject_forceActivationState_1 = function () {
                return (ni = n._emscripten_bind_btGhostObject_forceActivationState_1 = n.asm.ne).apply(null, arguments)
            }, oi = n._emscripten_bind_btGhostObject_activate_0 = function () {
                return (oi = n._emscripten_bind_btGhostObject_activate_0 = n.asm.oe).apply(null, arguments)
            }, _i = n._emscripten_bind_btGhostObject_activate_1 = function () {
                return (_i = n._emscripten_bind_btGhostObject_activate_1 = n.asm.pe).apply(null, arguments)
            }, ii = n._emscripten_bind_btGhostObject_isActive_0 = function () {
                return (ii = n._emscripten_bind_btGhostObject_isActive_0 = n.asm.qe).apply(null, arguments)
            }, ri = n._emscripten_bind_btGhostObject_isKinematicObject_0 = function () {
                return (ri = n._emscripten_bind_btGhostObject_isKinematicObject_0 = n.asm.re).apply(null, arguments)
            }, pi = n._emscripten_bind_btGhostObject_isStaticObject_0 = function () {
                return (pi = n._emscripten_bind_btGhostObject_isStaticObject_0 = n.asm.se).apply(null, arguments)
            }, si = n._emscripten_bind_btGhostObject_isStaticOrKinematicObject_0 = function () {
                return (si = n._emscripten_bind_btGhostObject_isStaticOrKinematicObject_0 = n.asm.te).apply(null, arguments)
            }, ci = n._emscripten_bind_btGhostObject_getRestitution_0 = function () {
                return (ci = n._emscripten_bind_btGhostObject_getRestitution_0 = n.asm.ue).apply(null, arguments)
            }, ai = n._emscripten_bind_btGhostObject_getFriction_0 = function () {
                return (ai = n._emscripten_bind_btGhostObject_getFriction_0 = n.asm.ve).apply(null, arguments)
            }, li = n._emscripten_bind_btGhostObject_getRollingFriction_0 = function () {
                return (li = n._emscripten_bind_btGhostObject_getRollingFriction_0 = n.asm.we).apply(null, arguments)
            }, ui = n._emscripten_bind_btGhostObject_setRestitution_1 = function () {
                return (ui = n._emscripten_bind_btGhostObject_setRestitution_1 = n.asm.xe).apply(null, arguments)
            }, bi = n._emscripten_bind_btGhostObject_setFriction_1 = function () {
                return (bi = n._emscripten_bind_btGhostObject_setFriction_1 = n.asm.ye).apply(null, arguments)
            }, yi = n._emscripten_bind_btGhostObject_setRollingFriction_1 = function () {
                return (yi = n._emscripten_bind_btGhostObject_setRollingFriction_1 = n.asm.ze).apply(null, arguments)
            }, mi = n._emscripten_bind_btGhostObject_getWorldTransform_0 = function () {
                return (mi = n._emscripten_bind_btGhostObject_getWorldTransform_0 = n.asm.Ae).apply(null, arguments)
            }, di = n._emscripten_bind_btGhostObject_getCollisionFlags_0 = function () {
                return (di = n._emscripten_bind_btGhostObject_getCollisionFlags_0 = n.asm.Be).apply(null, arguments)
            }, fi = n._emscripten_bind_btGhostObject_setCollisionFlags_1 = function () {
                return (fi = n._emscripten_bind_btGhostObject_setCollisionFlags_1 = n.asm.Ce).apply(null, arguments)
            }, hi = n._emscripten_bind_btGhostObject_setWorldTransform_1 = function () {
                return (hi = n._emscripten_bind_btGhostObject_setWorldTransform_1 = n.asm.De).apply(null, arguments)
            }, Bi = n._emscripten_bind_btGhostObject_setCollisionShape_1 = function () {
                return (Bi = n._emscripten_bind_btGhostObject_setCollisionShape_1 = n.asm.Ee).apply(null, arguments)
            }, gi = n._emscripten_bind_btGhostObject_setCcdMotionThreshold_1 = function () {
                return (gi = n._emscripten_bind_btGhostObject_setCcdMotionThreshold_1 = n.asm.Fe).apply(null, arguments)
            }, Ci = n._emscripten_bind_btGhostObject_setCcdSweptSphereRadius_1 = function () {
                return (Ci = n._emscripten_bind_btGhostObject_setCcdSweptSphereRadius_1 = n.asm.Ge).apply(null, arguments)
            }, Si = n._emscripten_bind_btGhostObject_getUserIndex_0 = function () {
                return (Si = n._emscripten_bind_btGhostObject_getUserIndex_0 = n.asm.He).apply(null, arguments)
            }, ji = n._emscripten_bind_btGhostObject_setUserIndex_1 = function () {
                return (ji = n._emscripten_bind_btGhostObject_setUserIndex_1 = n.asm.Ie).apply(null, arguments)
            }, vi = n._emscripten_bind_btGhostObject_getUserPointer_0 = function () {
                return (vi = n._emscripten_bind_btGhostObject_getUserPointer_0 = n.asm.Je).apply(null, arguments)
            }, Ii = n._emscripten_bind_btGhostObject_setUserPointer_1 = function () {
                return (Ii = n._emscripten_bind_btGhostObject_setUserPointer_1 = n.asm.Ke).apply(null, arguments)
            }, Ri = n._emscripten_bind_btGhostObject_getBroadphaseHandle_0 = function () {
                return (Ri = n._emscripten_bind_btGhostObject_getBroadphaseHandle_0 = n.asm.Le).apply(null, arguments)
            }, Di = n._emscripten_bind_btGhostObject___destroy___0 = function () {
                return (Di = n._emscripten_bind_btGhostObject___destroy___0 = n.asm.Me).apply(null, arguments)
            }, Pi = n._emscripten_bind_btSoftBodySolver___destroy___0 = function () {
                return (Pi = n._emscripten_bind_btSoftBodySolver___destroy___0 = n.asm.Ne).apply(null, arguments)
            }, Ti = n._emscripten_bind_VoidPtr___destroy___0 = function () {
                return (Ti = n._emscripten_bind_VoidPtr___destroy___0 = n.asm.Oe).apply(null, arguments)
            }, Oi = n._emscripten_bind_DebugDrawer_DebugDrawer_0 = function () {
                return (Oi = n._emscripten_bind_DebugDrawer_DebugDrawer_0 = n.asm.Pe).apply(null, arguments)
            }, Wi = n._emscripten_bind_DebugDrawer_drawLine_3 = function () {
                return (Wi = n._emscripten_bind_DebugDrawer_drawLine_3 = n.asm.Qe).apply(null, arguments)
            }, Ai = n._emscripten_bind_DebugDrawer_drawContactPoint_5 = function () {
                return (Ai = n._emscripten_bind_DebugDrawer_drawContactPoint_5 = n.asm.Re).apply(null, arguments)
            }, Mi = n._emscripten_bind_DebugDrawer_reportErrorWarning_1 = function () {
                return (Mi = n._emscripten_bind_DebugDrawer_reportErrorWarning_1 = n.asm.Se).apply(null, arguments)
            }, xi = n._emscripten_bind_DebugDrawer_draw3dText_2 = function () {
                return (xi = n._emscripten_bind_DebugDrawer_draw3dText_2 = n.asm.Te).apply(null, arguments)
            }, ki = n._emscripten_bind_DebugDrawer_setDebugMode_1 = function () {
                return (ki = n._emscripten_bind_DebugDrawer_setDebugMode_1 = n.asm.Ue).apply(null, arguments)
            }, Fi = n._emscripten_bind_DebugDrawer_getDebugMode_0 = function () {
                return (Fi = n._emscripten_bind_DebugDrawer_getDebugMode_0 = n.asm.Ve).apply(null, arguments)
            }, Li = n._emscripten_bind_DebugDrawer___destroy___0 = function () {
                return (Li = n._emscripten_bind_DebugDrawer___destroy___0 = n.asm.We).apply(null, arguments)
            }, Gi = n._emscripten_bind_btVector4_btVector4_0 = function () {
                return (Gi = n._emscripten_bind_btVector4_btVector4_0 = n.asm.Xe).apply(null, arguments)
            }, wi = n._emscripten_bind_btVector4_btVector4_4 = function () {
                return (wi = n._emscripten_bind_btVector4_btVector4_4 = n.asm.Ye).apply(null, arguments)
            }, Hi = n._emscripten_bind_btVector4_w_0 = function () {
                return (Hi = n._emscripten_bind_btVector4_w_0 = n.asm.Ze).apply(null, arguments)
            }, Vi = n._emscripten_bind_btVector4_setValue_4 = function () {
                return (Vi = n._emscripten_bind_btVector4_setValue_4 = n.asm._e).apply(null, arguments)
            }, Ei = n._emscripten_bind_btVector4_length_0 = function () {
                return (Ei = n._emscripten_bind_btVector4_length_0 = n.asm.$e).apply(null, arguments)
            }, Ni = n._emscripten_bind_btVector4_x_0 = function () {
                return (Ni = n._emscripten_bind_btVector4_x_0 = n.asm.af).apply(null, arguments)
            }, Ui = n._emscripten_bind_btVector4_y_0 = function () {
                return (Ui = n._emscripten_bind_btVector4_y_0 = n.asm.bf).apply(null, arguments)
            }, zi = n._emscripten_bind_btVector4_z_0 = function () {
                return (zi = n._emscripten_bind_btVector4_z_0 = n.asm.cf).apply(null, arguments)
            }, qi = n._emscripten_bind_btVector4_setX_1 = function () {
                return (qi = n._emscripten_bind_btVector4_setX_1 = n.asm.df).apply(null, arguments)
            }, Ki = n._emscripten_bind_btVector4_setY_1 = function () {
                return (Ki = n._emscripten_bind_btVector4_setY_1 = n.asm.ef).apply(null, arguments)
            }, Qi = n._emscripten_bind_btVector4_setZ_1 = function () {
                return (Qi = n._emscripten_bind_btVector4_setZ_1 = n.asm.ff).apply(null, arguments)
            }, Xi = n._emscripten_bind_btVector4_normalize_0 = function () {
                return (Xi = n._emscripten_bind_btVector4_normalize_0 = n.asm.gf).apply(null, arguments)
            }, Zi = n._emscripten_bind_btVector4_rotate_2 = function () {
                return (Zi = n._emscripten_bind_btVector4_rotate_2 = n.asm.hf).apply(null, arguments)
            }, Yi = n._emscripten_bind_btVector4_dot_1 = function () {
                return (Yi = n._emscripten_bind_btVector4_dot_1 = n.asm.jf).apply(null, arguments)
            }, Ji = n._emscripten_bind_btVector4_op_mul_1 = function () {
                return (Ji = n._emscripten_bind_btVector4_op_mul_1 = n.asm.kf).apply(null, arguments)
            }, $i = n._emscripten_bind_btVector4_op_add_1 = function () {
                return ($i = n._emscripten_bind_btVector4_op_add_1 = n.asm.lf).apply(null, arguments)
            }, tr = n._emscripten_bind_btVector4_op_sub_1 = function () {
                return (tr = n._emscripten_bind_btVector4_op_sub_1 = n.asm.mf).apply(null, arguments)
            }, er = n._emscripten_bind_btVector4___destroy___0 = function () {
                return (er = n._emscripten_bind_btVector4___destroy___0 = n.asm.nf).apply(null, arguments)
            }, nr = n._emscripten_bind_btQuaternion_btQuaternion_4 = function () {
                return (nr = n._emscripten_bind_btQuaternion_btQuaternion_4 = n.asm.of).apply(null, arguments)
            }, or = n._emscripten_bind_btQuaternion_setValue_4 = function () {
                return (or = n._emscripten_bind_btQuaternion_setValue_4 = n.asm.pf).apply(null, arguments)
            }, _r = n._emscripten_bind_btQuaternion_setEulerZYX_3 = function () {
                return (_r = n._emscripten_bind_btQuaternion_setEulerZYX_3 = n.asm.qf).apply(null, arguments)
            }, ir = n._emscripten_bind_btQuaternion_setRotation_2 = function () {
                return (ir = n._emscripten_bind_btQuaternion_setRotation_2 = n.asm.rf).apply(null, arguments)
            }, rr = n._emscripten_bind_btQuaternion_normalize_0 = function () {
                return (rr = n._emscripten_bind_btQuaternion_normalize_0 = n.asm.sf).apply(null, arguments)
            }, pr = n._emscripten_bind_btQuaternion_length2_0 = function () {
                return (pr = n._emscripten_bind_btQuaternion_length2_0 = n.asm.tf).apply(null, arguments)
            }, sr = n._emscripten_bind_btQuaternion_length_0 = function () {
                return (sr = n._emscripten_bind_btQuaternion_length_0 = n.asm.uf).apply(null, arguments)
            }, cr = n._emscripten_bind_btQuaternion_dot_1 = function () {
                return (cr = n._emscripten_bind_btQuaternion_dot_1 = n.asm.vf).apply(null, arguments)
            }, ar = n._emscripten_bind_btQuaternion_normalized_0 = function () {
                return (ar = n._emscripten_bind_btQuaternion_normalized_0 = n.asm.wf).apply(null, arguments)
            }, lr = n._emscripten_bind_btQuaternion_getAxis_0 = function () {
                return (lr = n._emscripten_bind_btQuaternion_getAxis_0 = n.asm.xf).apply(null, arguments)
            }, ur = n._emscripten_bind_btQuaternion_inverse_0 = function () {
                return (ur = n._emscripten_bind_btQuaternion_inverse_0 = n.asm.yf).apply(null, arguments)
            }, br = n._emscripten_bind_btQuaternion_getAngle_0 = function () {
                return (br = n._emscripten_bind_btQuaternion_getAngle_0 = n.asm.zf).apply(null, arguments)
            }, yr = n._emscripten_bind_btQuaternion_getAngleShortestPath_0 = function () {
                return (yr = n._emscripten_bind_btQuaternion_getAngleShortestPath_0 = n.asm.Af).apply(null, arguments)
            }, mr = n._emscripten_bind_btQuaternion_angle_1 = function () {
                return (mr = n._emscripten_bind_btQuaternion_angle_1 = n.asm.Bf).apply(null, arguments)
            }, dr = n._emscripten_bind_btQuaternion_angleShortestPath_1 = function () {
                return (dr = n._emscripten_bind_btQuaternion_angleShortestPath_1 = n.asm.Cf).apply(null, arguments)
            }, fr = n._emscripten_bind_btQuaternion_op_add_1 = function () {
                return (fr = n._emscripten_bind_btQuaternion_op_add_1 = n.asm.Df).apply(null, arguments)
            }, hr = n._emscripten_bind_btQuaternion_op_sub_1 = function () {
                return (hr = n._emscripten_bind_btQuaternion_op_sub_1 = n.asm.Ef).apply(null, arguments)
            }, Br = n._emscripten_bind_btQuaternion_op_mul_1 = function () {
                return (Br = n._emscripten_bind_btQuaternion_op_mul_1 = n.asm.Ff).apply(null, arguments)
            }, gr = n._emscripten_bind_btQuaternion_op_mulq_1 = function () {
                return (gr = n._emscripten_bind_btQuaternion_op_mulq_1 = n.asm.Gf).apply(null, arguments)
            }, Cr = n._emscripten_bind_btQuaternion_op_div_1 = function () {
                return (Cr = n._emscripten_bind_btQuaternion_op_div_1 = n.asm.Hf).apply(null, arguments)
            }, Sr = n._emscripten_bind_btQuaternion_x_0 = function () {
                return (Sr = n._emscripten_bind_btQuaternion_x_0 = n.asm.If).apply(null, arguments)
            }, jr = n._emscripten_bind_btQuaternion_y_0 = function () {
                return (jr = n._emscripten_bind_btQuaternion_y_0 = n.asm.Jf).apply(null, arguments)
            }, vr = n._emscripten_bind_btQuaternion_z_0 = function () {
                return (vr = n._emscripten_bind_btQuaternion_z_0 = n.asm.Kf).apply(null, arguments)
            }, Ir = n._emscripten_bind_btQuaternion_w_0 = function () {
                return (Ir = n._emscripten_bind_btQuaternion_w_0 = n.asm.Lf).apply(null, arguments)
            }, Rr = n._emscripten_bind_btQuaternion_setX_1 = function () {
                return (Rr = n._emscripten_bind_btQuaternion_setX_1 = n.asm.Mf).apply(null, arguments)
            }, Dr = n._emscripten_bind_btQuaternion_setY_1 = function () {
                return (Dr = n._emscripten_bind_btQuaternion_setY_1 = n.asm.Nf).apply(null, arguments)
            }, Pr = n._emscripten_bind_btQuaternion_setZ_1 = function () {
                return (Pr = n._emscripten_bind_btQuaternion_setZ_1 = n.asm.Of).apply(null, arguments)
            }, Tr = n._emscripten_bind_btQuaternion_setW_1 = function () {
                return (Tr = n._emscripten_bind_btQuaternion_setW_1 = n.asm.Pf).apply(null, arguments)
            }, Or = n._emscripten_bind_btQuaternion___destroy___0 = function () {
                return (Or = n._emscripten_bind_btQuaternion___destroy___0 = n.asm.Qf).apply(null, arguments)
            }, Wr = n._emscripten_bind_btMatrix3x3_setEulerZYX_3 = function () {
                return (Wr = n._emscripten_bind_btMatrix3x3_setEulerZYX_3 = n.asm.Rf).apply(null, arguments)
            }, Ar = n._emscripten_bind_btMatrix3x3_getRotation_1 = function () {
                return (Ar = n._emscripten_bind_btMatrix3x3_getRotation_1 = n.asm.Sf).apply(null, arguments)
            }, Mr = n._emscripten_bind_btMatrix3x3_getRow_1 = function () {
                return (Mr = n._emscripten_bind_btMatrix3x3_getRow_1 = n.asm.Tf).apply(null, arguments)
            }, xr = n._emscripten_bind_btMatrix3x3___destroy___0 = function () {
                return (xr = n._emscripten_bind_btMatrix3x3___destroy___0 = n.asm.Uf).apply(null, arguments)
            }, kr = n._emscripten_bind_btTransform_btTransform_0 = function () {
                return (kr = n._emscripten_bind_btTransform_btTransform_0 = n.asm.Vf).apply(null, arguments)
            }, Fr = n._emscripten_bind_btTransform_btTransform_2 = function () {
                return (Fr = n._emscripten_bind_btTransform_btTransform_2 = n.asm.Wf).apply(null, arguments)
            }, Lr = n._emscripten_bind_btTransform_setIdentity_0 = function () {
                return (Lr = n._emscripten_bind_btTransform_setIdentity_0 = n.asm.Xf).apply(null, arguments)
            }, Gr = n._emscripten_bind_btTransform_setOrigin_1 = function () {
                return (Gr = n._emscripten_bind_btTransform_setOrigin_1 = n.asm.Yf).apply(null, arguments)
            }, wr = n._emscripten_bind_btTransform_setRotation_1 = function () {
                return (wr = n._emscripten_bind_btTransform_setRotation_1 = n.asm.Zf).apply(null, arguments)
            }, Hr = n._emscripten_bind_btTransform_getOrigin_0 = function () {
                return (Hr = n._emscripten_bind_btTransform_getOrigin_0 = n.asm._f).apply(null, arguments)
            }, Vr = n._emscripten_bind_btTransform_getRotation_0 = function () {
                return (Vr = n._emscripten_bind_btTransform_getRotation_0 = n.asm.$f).apply(null, arguments)
            }, Er = n._emscripten_bind_btTransform_getBasis_0 = function () {
                return (Er = n._emscripten_bind_btTransform_getBasis_0 = n.asm.ag).apply(null, arguments)
            }, Nr = n._emscripten_bind_btTransform_setFromOpenGLMatrix_1 = function () {
                return (Nr = n._emscripten_bind_btTransform_setFromOpenGLMatrix_1 = n.asm.bg).apply(null, arguments)
            }, Ur = n._emscripten_bind_btTransform_inverse_0 = function () {
                return (Ur = n._emscripten_bind_btTransform_inverse_0 = n.asm.cg).apply(null, arguments)
            }, zr = n._emscripten_bind_btTransform_op_mul_1 = function () {
                return (zr = n._emscripten_bind_btTransform_op_mul_1 = n.asm.dg).apply(null, arguments)
            }, qr = n._emscripten_bind_btTransform___destroy___0 = function () {
                return (qr = n._emscripten_bind_btTransform___destroy___0 = n.asm.eg).apply(null, arguments)
            }, Kr = n._emscripten_bind_btDefaultMotionState_btDefaultMotionState_0 = function () {
                return (Kr = n._emscripten_bind_btDefaultMotionState_btDefaultMotionState_0 = n.asm.fg).apply(null, arguments)
            }, Qr = n._emscripten_bind_btDefaultMotionState_btDefaultMotionState_1 = function () {
                return (Qr = n._emscripten_bind_btDefaultMotionState_btDefaultMotionState_1 = n.asm.gg).apply(null, arguments)
            }, Xr = n._emscripten_bind_btDefaultMotionState_btDefaultMotionState_2 = function () {
                return (Xr = n._emscripten_bind_btDefaultMotionState_btDefaultMotionState_2 = n.asm.hg).apply(null, arguments)
            }, Zr = n._emscripten_bind_btDefaultMotionState_getWorldTransform_1 = function () {
                return (Zr = n._emscripten_bind_btDefaultMotionState_getWorldTransform_1 = n.asm.ig).apply(null, arguments)
            }, Yr = n._emscripten_bind_btDefaultMotionState_setWorldTransform_1 = function () {
                return (Yr = n._emscripten_bind_btDefaultMotionState_setWorldTransform_1 = n.asm.jg).apply(null, arguments)
            }, Jr = n._emscripten_bind_btDefaultMotionState_get_m_graphicsWorldTrans_0 = function () {
                return (Jr = n._emscripten_bind_btDefaultMotionState_get_m_graphicsWorldTrans_0 = n.asm.kg).apply(null, arguments)
            }, $r = n._emscripten_bind_btDefaultMotionState_set_m_graphicsWorldTrans_1 = function () {
                return ($r = n._emscripten_bind_btDefaultMotionState_set_m_graphicsWorldTrans_1 = n.asm.lg).apply(null, arguments)
            }, tp = n._emscripten_bind_btDefaultMotionState___destroy___0 = function () {
                return (tp = n._emscripten_bind_btDefaultMotionState___destroy___0 = n.asm.mg).apply(null, arguments)
            }, ep = n._emscripten_bind_btCollisionObjectWrapper_getWorldTransform_0 = function () {
                return (ep = n._emscripten_bind_btCollisionObjectWrapper_getWorldTransform_0 = n.asm.ng).apply(null, arguments)
            }, np = n._emscripten_bind_btCollisionObjectWrapper_getCollisionObject_0 = function () {
                return (np = n._emscripten_bind_btCollisionObjectWrapper_getCollisionObject_0 = n.asm.og).apply(null, arguments)
            }, op = n._emscripten_bind_btCollisionObjectWrapper_getCollisionShape_0 = function () {
                return (op = n._emscripten_bind_btCollisionObjectWrapper_getCollisionShape_0 = n.asm.pg).apply(null, arguments)
            }, _p = n._emscripten_bind_ClosestRayResultCallback_ClosestRayResultCallback_2 = function () {
                return (_p = n._emscripten_bind_ClosestRayResultCallback_ClosestRayResultCallback_2 = n.asm.qg).apply(null, arguments)
            }, ip = n._emscripten_bind_ClosestRayResultCallback_hasHit_0 = function () {
                return (ip = n._emscripten_bind_ClosestRayResultCallback_hasHit_0 = n.asm.rg).apply(null, arguments)
            }, rp = n._emscripten_bind_ClosestRayResultCallback_get_m_rayFromWorld_0 = function () {
                return (rp = n._emscripten_bind_ClosestRayResultCallback_get_m_rayFromWorld_0 = n.asm.sg).apply(null, arguments)
            }, pp = n._emscripten_bind_ClosestRayResultCallback_set_m_rayFromWorld_1 = function () {
                return (pp = n._emscripten_bind_ClosestRayResultCallback_set_m_rayFromWorld_1 = n.asm.tg).apply(null, arguments)
            }, sp = n._emscripten_bind_ClosestRayResultCallback_get_m_rayToWorld_0 = function () {
                return (sp = n._emscripten_bind_ClosestRayResultCallback_get_m_rayToWorld_0 = n.asm.ug).apply(null, arguments)
            }, cp = n._emscripten_bind_ClosestRayResultCallback_set_m_rayToWorld_1 = function () {
                return (cp = n._emscripten_bind_ClosestRayResultCallback_set_m_rayToWorld_1 = n.asm.vg).apply(null, arguments)
            }, ap = n._emscripten_bind_ClosestRayResultCallback_get_m_hitNormalWorld_0 = function () {
                return (ap = n._emscripten_bind_ClosestRayResultCallback_get_m_hitNormalWorld_0 = n.asm.wg).apply(null, arguments)
            }, lp = n._emscripten_bind_ClosestRayResultCallback_set_m_hitNormalWorld_1 = function () {
                return (lp = n._emscripten_bind_ClosestRayResultCallback_set_m_hitNormalWorld_1 = n.asm.xg).apply(null, arguments)
            }, up = n._emscripten_bind_ClosestRayResultCallback_get_m_hitPointWorld_0 = function () {
                return (up = n._emscripten_bind_ClosestRayResultCallback_get_m_hitPointWorld_0 = n.asm.yg).apply(null, arguments)
            }, bp = n._emscripten_bind_ClosestRayResultCallback_set_m_hitPointWorld_1 = function () {
                return (bp = n._emscripten_bind_ClosestRayResultCallback_set_m_hitPointWorld_1 = n.asm.zg).apply(null, arguments)
            }, yp = n._emscripten_bind_ClosestRayResultCallback_get_m_collisionFilterGroup_0 = function () {
                return (yp = n._emscripten_bind_ClosestRayResultCallback_get_m_collisionFilterGroup_0 = n.asm.Ag).apply(null, arguments)
            }, mp = n._emscripten_bind_ClosestRayResultCallback_set_m_collisionFilterGroup_1 = function () {
                return (mp = n._emscripten_bind_ClosestRayResultCallback_set_m_collisionFilterGroup_1 = n.asm.Bg).apply(null, arguments)
            }, dp = n._emscripten_bind_ClosestRayResultCallback_get_m_collisionFilterMask_0 = function () {
                return (dp = n._emscripten_bind_ClosestRayResultCallback_get_m_collisionFilterMask_0 = n.asm.Cg).apply(null, arguments)
            }, fp = n._emscripten_bind_ClosestRayResultCallback_set_m_collisionFilterMask_1 = function () {
                return (fp = n._emscripten_bind_ClosestRayResultCallback_set_m_collisionFilterMask_1 = n.asm.Dg).apply(null, arguments)
            }, hp = n._emscripten_bind_ClosestRayResultCallback_get_m_closestHitFraction_0 = function () {
                return (hp = n._emscripten_bind_ClosestRayResultCallback_get_m_closestHitFraction_0 = n.asm.Eg).apply(null, arguments)
            }, Bp = n._emscripten_bind_ClosestRayResultCallback_set_m_closestHitFraction_1 = function () {
                return (Bp = n._emscripten_bind_ClosestRayResultCallback_set_m_closestHitFraction_1 = n.asm.Fg).apply(null, arguments)
            }, gp = n._emscripten_bind_ClosestRayResultCallback_get_m_collisionObject_0 = function () {
                return (gp = n._emscripten_bind_ClosestRayResultCallback_get_m_collisionObject_0 = n.asm.Gg).apply(null, arguments)
            }, Cp = n._emscripten_bind_ClosestRayResultCallback_set_m_collisionObject_1 = function () {
                return (Cp = n._emscripten_bind_ClosestRayResultCallback_set_m_collisionObject_1 = n.asm.Hg).apply(null, arguments)
            }, Sp = n._emscripten_bind_ClosestRayResultCallback_get_m_flags_0 = function () {
                return (Sp = n._emscripten_bind_ClosestRayResultCallback_get_m_flags_0 = n.asm.Ig).apply(null, arguments)
            }, jp = n._emscripten_bind_ClosestRayResultCallback_set_m_flags_1 = function () {
                return (jp = n._emscripten_bind_ClosestRayResultCallback_set_m_flags_1 = n.asm.Jg).apply(null, arguments)
            }, vp = n._emscripten_bind_ClosestRayResultCallback___destroy___0 = function () {
                return (vp = n._emscripten_bind_ClosestRayResultCallback___destroy___0 = n.asm.Kg).apply(null, arguments)
            }, Ip = n._emscripten_bind_btConstCollisionObjectArray_size_0 = function () {
                return (Ip = n._emscripten_bind_btConstCollisionObjectArray_size_0 = n.asm.Lg).apply(null, arguments)
            }, Rp = n._emscripten_bind_btConstCollisionObjectArray_at_1 = function () {
                return (Rp = n._emscripten_bind_btConstCollisionObjectArray_at_1 = n.asm.Mg).apply(null, arguments)
            }, Dp = n._emscripten_bind_btConstCollisionObjectArray___destroy___0 = function () {
                return (Dp = n._emscripten_bind_btConstCollisionObjectArray___destroy___0 = n.asm.Ng).apply(null, arguments)
            }, Pp = n._emscripten_bind_btScalarArray_size_0 = function () {
                return (Pp = n._emscripten_bind_btScalarArray_size_0 = n.asm.Og).apply(null, arguments)
            }, Tp = n._emscripten_bind_btScalarArray_at_1 = function () {
                return (Tp = n._emscripten_bind_btScalarArray_at_1 = n.asm.Pg).apply(null, arguments)
            }, Op = n._emscripten_bind_btScalarArray___destroy___0 = function () {
                return (Op = n._emscripten_bind_btScalarArray___destroy___0 = n.asm.Qg).apply(null, arguments)
            }, Wp = n._emscripten_bind_AllHitsRayResultCallback_AllHitsRayResultCallback_2 = function () {
                return (Wp = n._emscripten_bind_AllHitsRayResultCallback_AllHitsRayResultCallback_2 = n.asm.Rg).apply(null, arguments)
            }, Ap = n._emscripten_bind_AllHitsRayResultCallback_hasHit_0 = function () {
                return (Ap = n._emscripten_bind_AllHitsRayResultCallback_hasHit_0 = n.asm.Sg).apply(null, arguments)
            }, Mp = n._emscripten_bind_AllHitsRayResultCallback_get_m_collisionObjects_0 = function () {
                return (Mp = n._emscripten_bind_AllHitsRayResultCallback_get_m_collisionObjects_0 = n.asm.Tg).apply(null, arguments)
            }, xp = n._emscripten_bind_AllHitsRayResultCallback_set_m_collisionObjects_1 = function () {
                return (xp = n._emscripten_bind_AllHitsRayResultCallback_set_m_collisionObjects_1 = n.asm.Ug).apply(null, arguments)
            }, kp = n._emscripten_bind_AllHitsRayResultCallback_get_m_rayFromWorld_0 = function () {
                return (kp = n._emscripten_bind_AllHitsRayResultCallback_get_m_rayFromWorld_0 = n.asm.Vg).apply(null, arguments)
            }, Fp = n._emscripten_bind_AllHitsRayResultCallback_set_m_rayFromWorld_1 = function () {
                return (Fp = n._emscripten_bind_AllHitsRayResultCallback_set_m_rayFromWorld_1 = n.asm.Wg).apply(null, arguments)
            }, Lp = n._emscripten_bind_AllHitsRayResultCallback_get_m_rayToWorld_0 = function () {
                return (Lp = n._emscripten_bind_AllHitsRayResultCallback_get_m_rayToWorld_0 = n.asm.Xg).apply(null, arguments)
            }, Gp = n._emscripten_bind_AllHitsRayResultCallback_set_m_rayToWorld_1 = function () {
                return (Gp = n._emscripten_bind_AllHitsRayResultCallback_set_m_rayToWorld_1 = n.asm.Yg).apply(null, arguments)
            }, wp = n._emscripten_bind_AllHitsRayResultCallback_get_m_hitNormalWorld_0 = function () {
                return (wp = n._emscripten_bind_AllHitsRayResultCallback_get_m_hitNormalWorld_0 = n.asm.Zg).apply(null, arguments)
            }, Hp = n._emscripten_bind_AllHitsRayResultCallback_set_m_hitNormalWorld_1 = function () {
                return (Hp = n._emscripten_bind_AllHitsRayResultCallback_set_m_hitNormalWorld_1 = n.asm._g).apply(null, arguments)
            }, Vp = n._emscripten_bind_AllHitsRayResultCallback_get_m_hitPointWorld_0 = function () {
                return (Vp = n._emscripten_bind_AllHitsRayResultCallback_get_m_hitPointWorld_0 = n.asm.$g).apply(null, arguments)
            }, Ep = n._emscripten_bind_AllHitsRayResultCallback_set_m_hitPointWorld_1 = function () {
                return (Ep = n._emscripten_bind_AllHitsRayResultCallback_set_m_hitPointWorld_1 = n.asm.ah).apply(null, arguments)
            }, Np = n._emscripten_bind_AllHitsRayResultCallback_get_m_hitFractions_0 = function () {
                return (Np = n._emscripten_bind_AllHitsRayResultCallback_get_m_hitFractions_0 = n.asm.bh).apply(null, arguments)
            }, Up = n._emscripten_bind_AllHitsRayResultCallback_set_m_hitFractions_1 = function () {
                return (Up = n._emscripten_bind_AllHitsRayResultCallback_set_m_hitFractions_1 = n.asm.ch).apply(null, arguments)
            }, zp = n._emscripten_bind_AllHitsRayResultCallback_get_m_collisionFilterGroup_0 = function () {
                return (zp = n._emscripten_bind_AllHitsRayResultCallback_get_m_collisionFilterGroup_0 = n.asm.dh).apply(null, arguments)
            }, qp = n._emscripten_bind_AllHitsRayResultCallback_set_m_collisionFilterGroup_1 = function () {
                return (qp = n._emscripten_bind_AllHitsRayResultCallback_set_m_collisionFilterGroup_1 = n.asm.eh).apply(null, arguments)
            }, Kp = n._emscripten_bind_AllHitsRayResultCallback_get_m_collisionFilterMask_0 = function () {
                return (Kp = n._emscripten_bind_AllHitsRayResultCallback_get_m_collisionFilterMask_0 = n.asm.fh).apply(null, arguments)
            }, Qp = n._emscripten_bind_AllHitsRayResultCallback_set_m_collisionFilterMask_1 = function () {
                return (Qp = n._emscripten_bind_AllHitsRayResultCallback_set_m_collisionFilterMask_1 = n.asm.gh).apply(null, arguments)
            }, Xp = n._emscripten_bind_AllHitsRayResultCallback_get_m_closestHitFraction_0 = function () {
                return (Xp = n._emscripten_bind_AllHitsRayResultCallback_get_m_closestHitFraction_0 = n.asm.hh).apply(null, arguments)
            }, Zp = n._emscripten_bind_AllHitsRayResultCallback_set_m_closestHitFraction_1 = function () {
                return (Zp = n._emscripten_bind_AllHitsRayResultCallback_set_m_closestHitFraction_1 = n.asm.ih).apply(null, arguments)
            }, Yp = n._emscripten_bind_AllHitsRayResultCallback_get_m_collisionObject_0 = function () {
                return (Yp = n._emscripten_bind_AllHitsRayResultCallback_get_m_collisionObject_0 = n.asm.jh).apply(null, arguments)
            }, Jp = n._emscripten_bind_AllHitsRayResultCallback_set_m_collisionObject_1 = function () {
                return (Jp = n._emscripten_bind_AllHitsRayResultCallback_set_m_collisionObject_1 = n.asm.kh).apply(null, arguments)
            }, $p = n._emscripten_bind_AllHitsRayResultCallback_get_m_flags_0 = function () {
                return ($p = n._emscripten_bind_AllHitsRayResultCallback_get_m_flags_0 = n.asm.lh).apply(null, arguments)
            }, ts = n._emscripten_bind_AllHitsRayResultCallback_set_m_flags_1 = function () {
                return (ts = n._emscripten_bind_AllHitsRayResultCallback_set_m_flags_1 = n.asm.mh).apply(null, arguments)
            }, es = n._emscripten_bind_AllHitsRayResultCallback___destroy___0 = function () {
                return (es = n._emscripten_bind_AllHitsRayResultCallback___destroy___0 = n.asm.nh).apply(null, arguments)
            }, ns = n._emscripten_bind_btManifoldPoint_getPositionWorldOnA_0 = function () {
                return (ns = n._emscripten_bind_btManifoldPoint_getPositionWorldOnA_0 = n.asm.oh).apply(null, arguments)
            }, os = n._emscripten_bind_btManifoldPoint_getPositionWorldOnB_0 = function () {
                return (os = n._emscripten_bind_btManifoldPoint_getPositionWorldOnB_0 = n.asm.ph).apply(null, arguments)
            }, _s = n._emscripten_bind_btManifoldPoint_getAppliedImpulse_0 = function () {
                return (_s = n._emscripten_bind_btManifoldPoint_getAppliedImpulse_0 = n.asm.qh).apply(null, arguments)
            }, is = n._emscripten_bind_btManifoldPoint_getDistance_0 = function () {
                return (is = n._emscripten_bind_btManifoldPoint_getDistance_0 = n.asm.rh).apply(null, arguments)
            }, rs = n._emscripten_bind_btManifoldPoint_get_m_localPointA_0 = function () {
                return (rs = n._emscripten_bind_btManifoldPoint_get_m_localPointA_0 = n.asm.sh).apply(null, arguments)
            }, ps = n._emscripten_bind_btManifoldPoint_set_m_localPointA_1 = function () {
                return (ps = n._emscripten_bind_btManifoldPoint_set_m_localPointA_1 = n.asm.th).apply(null, arguments)
            }, ss = n._emscripten_bind_btManifoldPoint_get_m_localPointB_0 = function () {
                return (ss = n._emscripten_bind_btManifoldPoint_get_m_localPointB_0 = n.asm.uh).apply(null, arguments)
            }, cs = n._emscripten_bind_btManifoldPoint_set_m_localPointB_1 = function () {
                return (cs = n._emscripten_bind_btManifoldPoint_set_m_localPointB_1 = n.asm.vh).apply(null, arguments)
            }, as = n._emscripten_bind_btManifoldPoint_get_m_positionWorldOnB_0 = function () {
                return (as = n._emscripten_bind_btManifoldPoint_get_m_positionWorldOnB_0 = n.asm.wh).apply(null, arguments)
            }, ls = n._emscripten_bind_btManifoldPoint_set_m_positionWorldOnB_1 = function () {
                return (ls = n._emscripten_bind_btManifoldPoint_set_m_positionWorldOnB_1 = n.asm.xh).apply(null, arguments)
            }, us = n._emscripten_bind_btManifoldPoint_get_m_positionWorldOnA_0 = function () {
                return (us = n._emscripten_bind_btManifoldPoint_get_m_positionWorldOnA_0 = n.asm.yh).apply(null, arguments)
            }, bs = n._emscripten_bind_btManifoldPoint_set_m_positionWorldOnA_1 = function () {
                return (bs = n._emscripten_bind_btManifoldPoint_set_m_positionWorldOnA_1 = n.asm.zh).apply(null, arguments)
            }, ys = n._emscripten_bind_btManifoldPoint_get_m_normalWorldOnB_0 = function () {
                return (ys = n._emscripten_bind_btManifoldPoint_get_m_normalWorldOnB_0 = n.asm.Ah).apply(null, arguments)
            }, ms = n._emscripten_bind_btManifoldPoint_set_m_normalWorldOnB_1 = function () {
                return (ms = n._emscripten_bind_btManifoldPoint_set_m_normalWorldOnB_1 = n.asm.Bh).apply(null, arguments)
            }, ds = n._emscripten_bind_btManifoldPoint_get_m_userPersistentData_0 = function () {
                return (ds = n._emscripten_bind_btManifoldPoint_get_m_userPersistentData_0 = n.asm.Ch).apply(null, arguments)
            }, fs = n._emscripten_bind_btManifoldPoint_set_m_userPersistentData_1 = function () {
                return (fs = n._emscripten_bind_btManifoldPoint_set_m_userPersistentData_1 = n.asm.Dh).apply(null, arguments)
            }, hs = n._emscripten_bind_btManifoldPoint___destroy___0 = function () {
                return (hs = n._emscripten_bind_btManifoldPoint___destroy___0 = n.asm.Eh).apply(null, arguments)
            }, Bs = n._emscripten_bind_ConcreteContactResultCallback_ConcreteContactResultCallback_0 = function () {
                return (Bs = n._emscripten_bind_ConcreteContactResultCallback_ConcreteContactResultCallback_0 = n.asm.Fh).apply(null, arguments)
            }, gs = n._emscripten_bind_ConcreteContactResultCallback_addSingleResult_7 = function () {
                return (gs = n._emscripten_bind_ConcreteContactResultCallback_addSingleResult_7 = n.asm.Gh).apply(null, arguments)
            }, Cs = n._emscripten_bind_ConcreteContactResultCallback___destroy___0 = function () {
                return (Cs = n._emscripten_bind_ConcreteContactResultCallback___destroy___0 = n.asm.Hh).apply(null, arguments)
            }, Ss = n._emscripten_bind_LocalShapeInfo_get_m_shapePart_0 = function () {
                return (Ss = n._emscripten_bind_LocalShapeInfo_get_m_shapePart_0 = n.asm.Ih).apply(null, arguments)
            }, js = n._emscripten_bind_LocalShapeInfo_set_m_shapePart_1 = function () {
                return (js = n._emscripten_bind_LocalShapeInfo_set_m_shapePart_1 = n.asm.Jh).apply(null, arguments)
            }, vs = n._emscripten_bind_LocalShapeInfo_get_m_triangleIndex_0 = function () {
                return (vs = n._emscripten_bind_LocalShapeInfo_get_m_triangleIndex_0 = n.asm.Kh).apply(null, arguments)
            }, Is = n._emscripten_bind_LocalShapeInfo_set_m_triangleIndex_1 = function () {
                return (Is = n._emscripten_bind_LocalShapeInfo_set_m_triangleIndex_1 = n.asm.Lh).apply(null, arguments)
            }, Rs = n._emscripten_bind_LocalShapeInfo___destroy___0 = function () {
                return (Rs = n._emscripten_bind_LocalShapeInfo___destroy___0 = n.asm.Mh).apply(null, arguments)
            }, Ds = n._emscripten_bind_LocalConvexResult_LocalConvexResult_5 = function () {
                return (Ds = n._emscripten_bind_LocalConvexResult_LocalConvexResult_5 = n.asm.Nh).apply(null, arguments)
            }, Ps = n._emscripten_bind_LocalConvexResult_get_m_hitCollisionObject_0 = function () {
                return (Ps = n._emscripten_bind_LocalConvexResult_get_m_hitCollisionObject_0 = n.asm.Oh).apply(null, arguments)
            }, Ts = n._emscripten_bind_LocalConvexResult_set_m_hitCollisionObject_1 = function () {
                return (Ts = n._emscripten_bind_LocalConvexResult_set_m_hitCollisionObject_1 = n.asm.Ph).apply(null, arguments)
            }, Os = n._emscripten_bind_LocalConvexResult_get_m_localShapeInfo_0 = function () {
                return (Os = n._emscripten_bind_LocalConvexResult_get_m_localShapeInfo_0 = n.asm.Qh).apply(null, arguments)
            }, Ws = n._emscripten_bind_LocalConvexResult_set_m_localShapeInfo_1 = function () {
                return (Ws = n._emscripten_bind_LocalConvexResult_set_m_localShapeInfo_1 = n.asm.Rh).apply(null, arguments)
            }, As = n._emscripten_bind_LocalConvexResult_get_m_hitNormalLocal_0 = function () {
                return (As = n._emscripten_bind_LocalConvexResult_get_m_hitNormalLocal_0 = n.asm.Sh).apply(null, arguments)
            }, Ms = n._emscripten_bind_LocalConvexResult_set_m_hitNormalLocal_1 = function () {
                return (Ms = n._emscripten_bind_LocalConvexResult_set_m_hitNormalLocal_1 = n.asm.Th).apply(null, arguments)
            }, xs = n._emscripten_bind_LocalConvexResult_get_m_hitPointLocal_0 = function () {
                return (xs = n._emscripten_bind_LocalConvexResult_get_m_hitPointLocal_0 = n.asm.Uh).apply(null, arguments)
            }, ks = n._emscripten_bind_LocalConvexResult_set_m_hitPointLocal_1 = function () {
                return (ks = n._emscripten_bind_LocalConvexResult_set_m_hitPointLocal_1 = n.asm.Vh).apply(null, arguments)
            }, Fs = n._emscripten_bind_LocalConvexResult_get_m_hitFraction_0 = function () {
                return (Fs = n._emscripten_bind_LocalConvexResult_get_m_hitFraction_0 = n.asm.Wh).apply(null, arguments)
            }, Ls = n._emscripten_bind_LocalConvexResult_set_m_hitFraction_1 = function () {
                return (Ls = n._emscripten_bind_LocalConvexResult_set_m_hitFraction_1 = n.asm.Xh).apply(null, arguments)
            }, Gs = n._emscripten_bind_LocalConvexResult___destroy___0 = function () {
                return (Gs = n._emscripten_bind_LocalConvexResult___destroy___0 = n.asm.Yh).apply(null, arguments)
            }, ws = n._emscripten_bind_ClosestConvexResultCallback_ClosestConvexResultCallback_2 = function () {
                return (ws = n._emscripten_bind_ClosestConvexResultCallback_ClosestConvexResultCallback_2 = n.asm.Zh).apply(null, arguments)
            }, Hs = n._emscripten_bind_ClosestConvexResultCallback_hasHit_0 = function () {
                return (Hs = n._emscripten_bind_ClosestConvexResultCallback_hasHit_0 = n.asm._h).apply(null, arguments)
            }, Vs = n._emscripten_bind_ClosestConvexResultCallback_get_m_hitCollisionObject_0 = function () {
                return (Vs = n._emscripten_bind_ClosestConvexResultCallback_get_m_hitCollisionObject_0 = n.asm.$h).apply(null, arguments)
            }, Es = n._emscripten_bind_ClosestConvexResultCallback_set_m_hitCollisionObject_1 = function () {
                return (Es = n._emscripten_bind_ClosestConvexResultCallback_set_m_hitCollisionObject_1 = n.asm.ai).apply(null, arguments)
            }, Ns = n._emscripten_bind_ClosestConvexResultCallback_get_m_convexFromWorld_0 = function () {
                return (Ns = n._emscripten_bind_ClosestConvexResultCallback_get_m_convexFromWorld_0 = n.asm.bi).apply(null, arguments)
            }, Us = n._emscripten_bind_ClosestConvexResultCallback_set_m_convexFromWorld_1 = function () {
                return (Us = n._emscripten_bind_ClosestConvexResultCallback_set_m_convexFromWorld_1 = n.asm.ci).apply(null, arguments)
            }, zs = n._emscripten_bind_ClosestConvexResultCallback_get_m_convexToWorld_0 = function () {
                return (zs = n._emscripten_bind_ClosestConvexResultCallback_get_m_convexToWorld_0 = n.asm.di).apply(null, arguments)
            }, qs = n._emscripten_bind_ClosestConvexResultCallback_set_m_convexToWorld_1 = function () {
                return (qs = n._emscripten_bind_ClosestConvexResultCallback_set_m_convexToWorld_1 = n.asm.ei).apply(null, arguments)
            }, Ks = n._emscripten_bind_ClosestConvexResultCallback_get_m_hitNormalWorld_0 = function () {
                return (Ks = n._emscripten_bind_ClosestConvexResultCallback_get_m_hitNormalWorld_0 = n.asm.fi).apply(null, arguments)
            }, Qs = n._emscripten_bind_ClosestConvexResultCallback_set_m_hitNormalWorld_1 = function () {
                return (Qs = n._emscripten_bind_ClosestConvexResultCallback_set_m_hitNormalWorld_1 = n.asm.gi).apply(null, arguments)
            }, Xs = n._emscripten_bind_ClosestConvexResultCallback_get_m_hitPointWorld_0 = function () {
                return (Xs = n._emscripten_bind_ClosestConvexResultCallback_get_m_hitPointWorld_0 = n.asm.hi).apply(null, arguments)
            }, Zs = n._emscripten_bind_ClosestConvexResultCallback_set_m_hitPointWorld_1 = function () {
                return (Zs = n._emscripten_bind_ClosestConvexResultCallback_set_m_hitPointWorld_1 = n.asm.ii).apply(null, arguments)
            }, Ys = n._emscripten_bind_ClosestConvexResultCallback_get_m_collisionFilterGroup_0 = function () {
                return (Ys = n._emscripten_bind_ClosestConvexResultCallback_get_m_collisionFilterGroup_0 = n.asm.ji).apply(null, arguments)
            }, Js = n._emscripten_bind_ClosestConvexResultCallback_set_m_collisionFilterGroup_1 = function () {
                return (Js = n._emscripten_bind_ClosestConvexResultCallback_set_m_collisionFilterGroup_1 = n.asm.ki).apply(null, arguments)
            }, $s = n._emscripten_bind_ClosestConvexResultCallback_get_m_collisionFilterMask_0 = function () {
                return ($s = n._emscripten_bind_ClosestConvexResultCallback_get_m_collisionFilterMask_0 = n.asm.li).apply(null, arguments)
            }, tc = n._emscripten_bind_ClosestConvexResultCallback_set_m_collisionFilterMask_1 = function () {
                return (tc = n._emscripten_bind_ClosestConvexResultCallback_set_m_collisionFilterMask_1 = n.asm.mi).apply(null, arguments)
            }, ec = n._emscripten_bind_ClosestConvexResultCallback_get_m_closestHitFraction_0 = function () {
                return (ec = n._emscripten_bind_ClosestConvexResultCallback_get_m_closestHitFraction_0 = n.asm.ni).apply(null, arguments)
            }, nc = n._emscripten_bind_ClosestConvexResultCallback_set_m_closestHitFraction_1 = function () {
                return (nc = n._emscripten_bind_ClosestConvexResultCallback_set_m_closestHitFraction_1 = n.asm.oi).apply(null, arguments)
            }, oc = n._emscripten_bind_ClosestConvexResultCallback___destroy___0 = function () {
                return (oc = n._emscripten_bind_ClosestConvexResultCallback___destroy___0 = n.asm.pi).apply(null, arguments)
            }, _c = n._emscripten_bind_btConvexTriangleMeshShape_btConvexTriangleMeshShape_1 = function () {
                return (_c = n._emscripten_bind_btConvexTriangleMeshShape_btConvexTriangleMeshShape_1 = n.asm.qi).apply(null, arguments)
            }, ic = n._emscripten_bind_btConvexTriangleMeshShape_btConvexTriangleMeshShape_2 = function () {
                return (ic = n._emscripten_bind_btConvexTriangleMeshShape_btConvexTriangleMeshShape_2 = n.asm.ri).apply(null, arguments)
            }, rc = n._emscripten_bind_btConvexTriangleMeshShape_setLocalScaling_1 = function () {
                return (rc = n._emscripten_bind_btConvexTriangleMeshShape_setLocalScaling_1 = n.asm.si).apply(null, arguments)
            }, pc = n._emscripten_bind_btConvexTriangleMeshShape_getLocalScaling_0 = function () {
                return (pc = n._emscripten_bind_btConvexTriangleMeshShape_getLocalScaling_0 = n.asm.ti).apply(null, arguments)
            }, sc = n._emscripten_bind_btConvexTriangleMeshShape_calculateLocalInertia_2 = function () {
                return (sc = n._emscripten_bind_btConvexTriangleMeshShape_calculateLocalInertia_2 = n.asm.ui).apply(null, arguments)
            }, cc = n._emscripten_bind_btConvexTriangleMeshShape_setMargin_1 = function () {
                return (cc = n._emscripten_bind_btConvexTriangleMeshShape_setMargin_1 = n.asm.vi).apply(null, arguments)
            }, ac = n._emscripten_bind_btConvexTriangleMeshShape_getMargin_0 = function () {
                return (ac = n._emscripten_bind_btConvexTriangleMeshShape_getMargin_0 = n.asm.wi).apply(null, arguments)
            }, lc = n._emscripten_bind_btConvexTriangleMeshShape___destroy___0 = function () {
                return (lc = n._emscripten_bind_btConvexTriangleMeshShape___destroy___0 = n.asm.xi).apply(null, arguments)
            }, uc = n._emscripten_bind_btBoxShape_btBoxShape_1 = function () {
                return (uc = n._emscripten_bind_btBoxShape_btBoxShape_1 = n.asm.yi).apply(null, arguments)
            }, bc = n._emscripten_bind_btBoxShape_setMargin_1 = function () {
                return (bc = n._emscripten_bind_btBoxShape_setMargin_1 = n.asm.zi).apply(null, arguments)
            }, yc = n._emscripten_bind_btBoxShape_getMargin_0 = function () {
                return (yc = n._emscripten_bind_btBoxShape_getMargin_0 = n.asm.Ai).apply(null, arguments)
            }, mc = n._emscripten_bind_btBoxShape_setLocalScaling_1 = function () {
                return (mc = n._emscripten_bind_btBoxShape_setLocalScaling_1 = n.asm.Bi).apply(null, arguments)
            }, dc = n._emscripten_bind_btBoxShape_getLocalScaling_0 = function () {
                return (dc = n._emscripten_bind_btBoxShape_getLocalScaling_0 = n.asm.Ci).apply(null, arguments)
            }, fc = n._emscripten_bind_btBoxShape_calculateLocalInertia_2 = function () {
                return (fc = n._emscripten_bind_btBoxShape_calculateLocalInertia_2 = n.asm.Di).apply(null, arguments)
            }, hc = n._emscripten_bind_btBoxShape___destroy___0 = function () {
                return (hc = n._emscripten_bind_btBoxShape___destroy___0 = n.asm.Ei).apply(null, arguments)
            }, Bc = n._emscripten_bind_btCapsuleShapeX_btCapsuleShapeX_2 = function () {
                return (Bc = n._emscripten_bind_btCapsuleShapeX_btCapsuleShapeX_2 = n.asm.Fi).apply(null, arguments)
            }, gc = n._emscripten_bind_btCapsuleShapeX_setMargin_1 = function () {
                return (gc = n._emscripten_bind_btCapsuleShapeX_setMargin_1 = n.asm.Gi).apply(null, arguments)
            }, Cc = n._emscripten_bind_btCapsuleShapeX_getMargin_0 = function () {
                return (Cc = n._emscripten_bind_btCapsuleShapeX_getMargin_0 = n.asm.Hi).apply(null, arguments)
            }, Sc = n._emscripten_bind_btCapsuleShapeX_getUpAxis_0 = function () {
                return (Sc = n._emscripten_bind_btCapsuleShapeX_getUpAxis_0 = n.asm.Ii).apply(null, arguments)
            }, jc = n._emscripten_bind_btCapsuleShapeX_getRadius_0 = function () {
                return (jc = n._emscripten_bind_btCapsuleShapeX_getRadius_0 = n.asm.Ji).apply(null, arguments)
            }, vc = n._emscripten_bind_btCapsuleShapeX_getHalfHeight_0 = function () {
                return (vc = n._emscripten_bind_btCapsuleShapeX_getHalfHeight_0 = n.asm.Ki).apply(null, arguments)
            }, Ic = n._emscripten_bind_btCapsuleShapeX_setLocalScaling_1 = function () {
                return (Ic = n._emscripten_bind_btCapsuleShapeX_setLocalScaling_1 = n.asm.Li).apply(null, arguments)
            }, Rc = n._emscripten_bind_btCapsuleShapeX_getLocalScaling_0 = function () {
                return (Rc = n._emscripten_bind_btCapsuleShapeX_getLocalScaling_0 = n.asm.Mi).apply(null, arguments)
            }, Dc = n._emscripten_bind_btCapsuleShapeX_calculateLocalInertia_2 = function () {
                return (Dc = n._emscripten_bind_btCapsuleShapeX_calculateLocalInertia_2 = n.asm.Ni).apply(null, arguments)
            }, Pc = n._emscripten_bind_btCapsuleShapeX___destroy___0 = function () {
                return (Pc = n._emscripten_bind_btCapsuleShapeX___destroy___0 = n.asm.Oi).apply(null, arguments)
            }, Tc = n._emscripten_bind_btCapsuleShapeZ_btCapsuleShapeZ_2 = function () {
                return (Tc = n._emscripten_bind_btCapsuleShapeZ_btCapsuleShapeZ_2 = n.asm.Pi).apply(null, arguments)
            }, Oc = n._emscripten_bind_btCapsuleShapeZ_setMargin_1 = function () {
                return (Oc = n._emscripten_bind_btCapsuleShapeZ_setMargin_1 = n.asm.Qi).apply(null, arguments)
            }, Wc = n._emscripten_bind_btCapsuleShapeZ_getMargin_0 = function () {
                return (Wc = n._emscripten_bind_btCapsuleShapeZ_getMargin_0 = n.asm.Ri).apply(null, arguments)
            }, Ac = n._emscripten_bind_btCapsuleShapeZ_getUpAxis_0 = function () {
                return (Ac = n._emscripten_bind_btCapsuleShapeZ_getUpAxis_0 = n.asm.Si).apply(null, arguments)
            }, Mc = n._emscripten_bind_btCapsuleShapeZ_getRadius_0 = function () {
                return (Mc = n._emscripten_bind_btCapsuleShapeZ_getRadius_0 = n.asm.Ti).apply(null, arguments)
            }, xc = n._emscripten_bind_btCapsuleShapeZ_getHalfHeight_0 = function () {
                return (xc = n._emscripten_bind_btCapsuleShapeZ_getHalfHeight_0 = n.asm.Ui).apply(null, arguments)
            }, kc = n._emscripten_bind_btCapsuleShapeZ_setLocalScaling_1 = function () {
                return (kc = n._emscripten_bind_btCapsuleShapeZ_setLocalScaling_1 = n.asm.Vi).apply(null, arguments)
            }, Fc = n._emscripten_bind_btCapsuleShapeZ_getLocalScaling_0 = function () {
                return (Fc = n._emscripten_bind_btCapsuleShapeZ_getLocalScaling_0 = n.asm.Wi).apply(null, arguments)
            }, Lc = n._emscripten_bind_btCapsuleShapeZ_calculateLocalInertia_2 = function () {
                return (Lc = n._emscripten_bind_btCapsuleShapeZ_calculateLocalInertia_2 = n.asm.Xi).apply(null, arguments)
            }, Gc = n._emscripten_bind_btCapsuleShapeZ___destroy___0 = function () {
                return (Gc = n._emscripten_bind_btCapsuleShapeZ___destroy___0 = n.asm.Yi).apply(null, arguments)
            }, wc = n._emscripten_bind_btCylinderShapeX_btCylinderShapeX_1 = function () {
                return (wc = n._emscripten_bind_btCylinderShapeX_btCylinderShapeX_1 = n.asm.Zi).apply(null, arguments)
            }, Hc = n._emscripten_bind_btCylinderShapeX_setMargin_1 = function () {
                return (Hc = n._emscripten_bind_btCylinderShapeX_setMargin_1 = n.asm._i).apply(null, arguments)
            }, Vc = n._emscripten_bind_btCylinderShapeX_getMargin_0 = function () {
                return (Vc = n._emscripten_bind_btCylinderShapeX_getMargin_0 = n.asm.$i).apply(null, arguments)
            }, Ec = n._emscripten_bind_btCylinderShapeX_setLocalScaling_1 = function () {
                return (Ec = n._emscripten_bind_btCylinderShapeX_setLocalScaling_1 = n.asm.aj).apply(null, arguments)
            }, Nc = n._emscripten_bind_btCylinderShapeX_getLocalScaling_0 = function () {
                return (Nc = n._emscripten_bind_btCylinderShapeX_getLocalScaling_0 = n.asm.bj).apply(null, arguments)
            }, Uc = n._emscripten_bind_btCylinderShapeX_calculateLocalInertia_2 = function () {
                return (Uc = n._emscripten_bind_btCylinderShapeX_calculateLocalInertia_2 = n.asm.cj).apply(null, arguments)
            }, zc = n._emscripten_bind_btCylinderShapeX___destroy___0 = function () {
                return (zc = n._emscripten_bind_btCylinderShapeX___destroy___0 = n.asm.dj).apply(null, arguments)
            }, qc = n._emscripten_bind_btCylinderShapeZ_btCylinderShapeZ_1 = function () {
                return (qc = n._emscripten_bind_btCylinderShapeZ_btCylinderShapeZ_1 = n.asm.ej).apply(null, arguments)
            }, Kc = n._emscripten_bind_btCylinderShapeZ_setMargin_1 = function () {
                return (Kc = n._emscripten_bind_btCylinderShapeZ_setMargin_1 = n.asm.fj).apply(null, arguments)
            }, Qc = n._emscripten_bind_btCylinderShapeZ_getMargin_0 = function () {
                return (Qc = n._emscripten_bind_btCylinderShapeZ_getMargin_0 = n.asm.gj).apply(null, arguments)
            }, Xc = n._emscripten_bind_btCylinderShapeZ_setLocalScaling_1 = function () {
                return (Xc = n._emscripten_bind_btCylinderShapeZ_setLocalScaling_1 = n.asm.hj).apply(null, arguments)
            }, Zc = n._emscripten_bind_btCylinderShapeZ_getLocalScaling_0 = function () {
                return (Zc = n._emscripten_bind_btCylinderShapeZ_getLocalScaling_0 = n.asm.ij).apply(null, arguments)
            }, Yc = n._emscripten_bind_btCylinderShapeZ_calculateLocalInertia_2 = function () {
                return (Yc = n._emscripten_bind_btCylinderShapeZ_calculateLocalInertia_2 = n.asm.jj).apply(null, arguments)
            }, Jc = n._emscripten_bind_btCylinderShapeZ___destroy___0 = function () {
                return (Jc = n._emscripten_bind_btCylinderShapeZ___destroy___0 = n.asm.kj).apply(null, arguments)
            }, $c = n._emscripten_bind_btSphereShape_btSphereShape_1 = function () {
                return ($c = n._emscripten_bind_btSphereShape_btSphereShape_1 = n.asm.lj).apply(null, arguments)
            }, ta = n._emscripten_bind_btSphereShape_setMargin_1 = function () {
                return (ta = n._emscripten_bind_btSphereShape_setMargin_1 = n.asm.mj).apply(null, arguments)
            }, ea = n._emscripten_bind_btSphereShape_getMargin_0 = function () {
                return (ea = n._emscripten_bind_btSphereShape_getMargin_0 = n.asm.nj).apply(null, arguments)
            }, na = n._emscripten_bind_btSphereShape_setLocalScaling_1 = function () {
                return (na = n._emscripten_bind_btSphereShape_setLocalScaling_1 = n.asm.oj).apply(null, arguments)
            }, oa = n._emscripten_bind_btSphereShape_getLocalScaling_0 = function () {
                return (oa = n._emscripten_bind_btSphereShape_getLocalScaling_0 = n.asm.pj).apply(null, arguments)
            }, _a = n._emscripten_bind_btSphereShape_calculateLocalInertia_2 = function () {
                return (_a = n._emscripten_bind_btSphereShape_calculateLocalInertia_2 = n.asm.qj).apply(null, arguments)
            }, ia = n._emscripten_bind_btSphereShape___destroy___0 = function () {
                return (ia = n._emscripten_bind_btSphereShape___destroy___0 = n.asm.rj).apply(null, arguments)
            }, ra = n._emscripten_bind_btMultiSphereShape_btMultiSphereShape_3 = function () {
                return (ra = n._emscripten_bind_btMultiSphereShape_btMultiSphereShape_3 = n.asm.sj).apply(null, arguments)
            }, pa = n._emscripten_bind_btMultiSphereShape_setLocalScaling_1 = function () {
                return (pa = n._emscripten_bind_btMultiSphereShape_setLocalScaling_1 = n.asm.tj).apply(null, arguments)
            }, sa = n._emscripten_bind_btMultiSphereShape_getLocalScaling_0 = function () {
                return (sa = n._emscripten_bind_btMultiSphereShape_getLocalScaling_0 = n.asm.uj).apply(null, arguments)
            }, ca = n._emscripten_bind_btMultiSphereShape_calculateLocalInertia_2 = function () {
                return (ca = n._emscripten_bind_btMultiSphereShape_calculateLocalInertia_2 = n.asm.vj).apply(null, arguments)
            }, aa = n._emscripten_bind_btMultiSphereShape___destroy___0 = function () {
                return (aa = n._emscripten_bind_btMultiSphereShape___destroy___0 = n.asm.wj).apply(null, arguments)
            }, la = n._emscripten_bind_btConeShapeX_btConeShapeX_2 = function () {
                return (la = n._emscripten_bind_btConeShapeX_btConeShapeX_2 = n.asm.xj).apply(null, arguments)
            }, ua = n._emscripten_bind_btConeShapeX_setLocalScaling_1 = function () {
                return (ua = n._emscripten_bind_btConeShapeX_setLocalScaling_1 = n.asm.yj).apply(null, arguments)
            }, ba = n._emscripten_bind_btConeShapeX_getLocalScaling_0 = function () {
                return (ba = n._emscripten_bind_btConeShapeX_getLocalScaling_0 = n.asm.zj).apply(null, arguments)
            }, ya = n._emscripten_bind_btConeShapeX_calculateLocalInertia_2 = function () {
                return (ya = n._emscripten_bind_btConeShapeX_calculateLocalInertia_2 = n.asm.Aj).apply(null, arguments)
            }, ma = n._emscripten_bind_btConeShapeX___destroy___0 = function () {
                return (ma = n._emscripten_bind_btConeShapeX___destroy___0 = n.asm.Bj).apply(null, arguments)
            }, da = n._emscripten_bind_btConeShapeZ_btConeShapeZ_2 = function () {
                return (da = n._emscripten_bind_btConeShapeZ_btConeShapeZ_2 = n.asm.Cj).apply(null, arguments)
            }, fa = n._emscripten_bind_btConeShapeZ_setLocalScaling_1 = function () {
                return (fa = n._emscripten_bind_btConeShapeZ_setLocalScaling_1 = n.asm.Dj).apply(null, arguments)
            }, ha = n._emscripten_bind_btConeShapeZ_getLocalScaling_0 = function () {
                return (ha = n._emscripten_bind_btConeShapeZ_getLocalScaling_0 = n.asm.Ej).apply(null, arguments)
            }, Ba = n._emscripten_bind_btConeShapeZ_calculateLocalInertia_2 = function () {
                return (Ba = n._emscripten_bind_btConeShapeZ_calculateLocalInertia_2 = n.asm.Fj).apply(null, arguments)
            }, ga = n._emscripten_bind_btConeShapeZ___destroy___0 = function () {
                return (ga = n._emscripten_bind_btConeShapeZ___destroy___0 = n.asm.Gj).apply(null, arguments)
            }, Ca = n._emscripten_bind_btIntArray_size_0 = function () {
                return (Ca = n._emscripten_bind_btIntArray_size_0 = n.asm.Hj).apply(null, arguments)
            }, Sa = n._emscripten_bind_btIntArray_at_1 = function () {
                return (Sa = n._emscripten_bind_btIntArray_at_1 = n.asm.Ij).apply(null, arguments)
            }, ja = n._emscripten_bind_btIntArray___destroy___0 = function () {
                return (ja = n._emscripten_bind_btIntArray___destroy___0 = n.asm.Jj).apply(null, arguments)
            }, va = n._emscripten_bind_btFace_get_m_indices_0 = function () {
                return (va = n._emscripten_bind_btFace_get_m_indices_0 = n.asm.Kj).apply(null, arguments)
            }, Ia = n._emscripten_bind_btFace_set_m_indices_1 = function () {
                return (Ia = n._emscripten_bind_btFace_set_m_indices_1 = n.asm.Lj).apply(null, arguments)
            }, Ra = n._emscripten_bind_btFace_get_m_plane_1 = function () {
                return (Ra = n._emscripten_bind_btFace_get_m_plane_1 = n.asm.Mj).apply(null, arguments)
            }, Da = n._emscripten_bind_btFace_set_m_plane_2 = function () {
                return (Da = n._emscripten_bind_btFace_set_m_plane_2 = n.asm.Nj).apply(null, arguments)
            }, Pa = n._emscripten_bind_btFace___destroy___0 = function () {
                return (Pa = n._emscripten_bind_btFace___destroy___0 = n.asm.Oj).apply(null, arguments)
            }, Ta = n._emscripten_bind_btVector3Array_size_0 = function () {
                return (Ta = n._emscripten_bind_btVector3Array_size_0 = n.asm.Pj).apply(null, arguments)
            }, Oa = n._emscripten_bind_btVector3Array_at_1 = function () {
                return (Oa = n._emscripten_bind_btVector3Array_at_1 = n.asm.Qj).apply(null, arguments)
            }, Wa = n._emscripten_bind_btVector3Array___destroy___0 = function () {
                return (Wa = n._emscripten_bind_btVector3Array___destroy___0 = n.asm.Rj).apply(null, arguments)
            }, Aa = n._emscripten_bind_btFaceArray_size_0 = function () {
                return (Aa = n._emscripten_bind_btFaceArray_size_0 = n.asm.Sj).apply(null, arguments)
            }, Ma = n._emscripten_bind_btFaceArray_at_1 = function () {
                return (Ma = n._emscripten_bind_btFaceArray_at_1 = n.asm.Tj).apply(null, arguments)
            }, xa = n._emscripten_bind_btFaceArray___destroy___0 = function () {
                return (xa = n._emscripten_bind_btFaceArray___destroy___0 = n.asm.Uj).apply(null, arguments)
            }, ka = n._emscripten_bind_btConvexPolyhedron_get_m_vertices_0 = function () {
                return (ka = n._emscripten_bind_btConvexPolyhedron_get_m_vertices_0 = n.asm.Vj).apply(null, arguments)
            }, Fa = n._emscripten_bind_btConvexPolyhedron_set_m_vertices_1 = function () {
                return (Fa = n._emscripten_bind_btConvexPolyhedron_set_m_vertices_1 = n.asm.Wj).apply(null, arguments)
            }, La = n._emscripten_bind_btConvexPolyhedron_get_m_faces_0 = function () {
                return (La = n._emscripten_bind_btConvexPolyhedron_get_m_faces_0 = n.asm.Xj).apply(null, arguments)
            }, Ga = n._emscripten_bind_btConvexPolyhedron_set_m_faces_1 = function () {
                return (Ga = n._emscripten_bind_btConvexPolyhedron_set_m_faces_1 = n.asm.Yj).apply(null, arguments)
            }, wa = n._emscripten_bind_btConvexPolyhedron___destroy___0 = function () {
                return (wa = n._emscripten_bind_btConvexPolyhedron___destroy___0 = n.asm.Zj).apply(null, arguments)
            }, Ha = n._emscripten_bind_btConvexHullShape_btConvexHullShape_0 = function () {
                return (Ha = n._emscripten_bind_btConvexHullShape_btConvexHullShape_0 = n.asm._j).apply(null, arguments)
            }, Va = n._emscripten_bind_btConvexHullShape_btConvexHullShape_1 = function () {
                return (Va = n._emscripten_bind_btConvexHullShape_btConvexHullShape_1 = n.asm.$j).apply(null, arguments)
            }, Ea = n._emscripten_bind_btConvexHullShape_btConvexHullShape_2 = function () {
                return (Ea = n._emscripten_bind_btConvexHullShape_btConvexHullShape_2 = n.asm.ak).apply(null, arguments)
            }, Na = n._emscripten_bind_btConvexHullShape_addPoint_1 = function () {
                return (Na = n._emscripten_bind_btConvexHullShape_addPoint_1 = n.asm.bk).apply(null, arguments)
            }, Ua = n._emscripten_bind_btConvexHullShape_addPoint_2 = function () {
                return (Ua = n._emscripten_bind_btConvexHullShape_addPoint_2 = n.asm.ck).apply(null, arguments)
            }, za = n._emscripten_bind_btConvexHullShape_setMargin_1 = function () {
                return (za = n._emscripten_bind_btConvexHullShape_setMargin_1 = n.asm.dk).apply(null, arguments)
            }, qa = n._emscripten_bind_btConvexHullShape_getMargin_0 = function () {
                return (qa = n._emscripten_bind_btConvexHullShape_getMargin_0 = n.asm.ek).apply(null, arguments)
            }, Ka = n._emscripten_bind_btConvexHullShape_getNumVertices_0 = function () {
                return (Ka = n._emscripten_bind_btConvexHullShape_getNumVertices_0 = n.asm.fk).apply(null, arguments)
            }, Qa = n._emscripten_bind_btConvexHullShape_initializePolyhedralFeatures_1 = function () {
                return (Qa = n._emscripten_bind_btConvexHullShape_initializePolyhedralFeatures_1 = n.asm.gk).apply(null, arguments)
            }, Xa = n._emscripten_bind_btConvexHullShape_recalcLocalAabb_0 = function () {
                return (Xa = n._emscripten_bind_btConvexHullShape_recalcLocalAabb_0 = n.asm.hk).apply(null, arguments)
            }, Za = n._emscripten_bind_btConvexHullShape_getConvexPolyhedron_0 = function () {
                return (Za = n._emscripten_bind_btConvexHullShape_getConvexPolyhedron_0 = n.asm.ik).apply(null, arguments)
            }, Ya = n._emscripten_bind_btConvexHullShape_setLocalScaling_1 = function () {
                return (Ya = n._emscripten_bind_btConvexHullShape_setLocalScaling_1 = n.asm.jk).apply(null, arguments)
            }, Ja = n._emscripten_bind_btConvexHullShape_getLocalScaling_0 = function () {
                return (Ja = n._emscripten_bind_btConvexHullShape_getLocalScaling_0 = n.asm.kk).apply(null, arguments)
            }, $a = n._emscripten_bind_btConvexHullShape_calculateLocalInertia_2 = function () {
                return ($a = n._emscripten_bind_btConvexHullShape_calculateLocalInertia_2 = n.asm.lk).apply(null, arguments)
            }, tl = n._emscripten_bind_btConvexHullShape___destroy___0 = function () {
                return (tl = n._emscripten_bind_btConvexHullShape___destroy___0 = n.asm.mk).apply(null, arguments)
            }, el = n._emscripten_bind_btShapeHull_btShapeHull_1 = function () {
                return (el = n._emscripten_bind_btShapeHull_btShapeHull_1 = n.asm.nk).apply(null, arguments)
            }, nl = n._emscripten_bind_btShapeHull_buildHull_1 = function () {
                return (nl = n._emscripten_bind_btShapeHull_buildHull_1 = n.asm.ok).apply(null, arguments)
            }, ol = n._emscripten_bind_btShapeHull_numVertices_0 = function () {
                return (ol = n._emscripten_bind_btShapeHull_numVertices_0 = n.asm.pk).apply(null, arguments)
            }, _l = n._emscripten_bind_btShapeHull_getVertexPointer_0 = function () {
                return (_l = n._emscripten_bind_btShapeHull_getVertexPointer_0 = n.asm.qk).apply(null, arguments)
            }, il = n._emscripten_bind_btShapeHull___destroy___0 = function () {
                return (il = n._emscripten_bind_btShapeHull___destroy___0 = n.asm.rk).apply(null, arguments)
            }, rl = n._emscripten_bind_btCompoundShape_btCompoundShape_0 = function () {
                return (rl = n._emscripten_bind_btCompoundShape_btCompoundShape_0 = n.asm.sk).apply(null, arguments)
            }, pl = n._emscripten_bind_btCompoundShape_btCompoundShape_1 = function () {
                return (pl = n._emscripten_bind_btCompoundShape_btCompoundShape_1 = n.asm.tk).apply(null, arguments)
            }, sl = n._emscripten_bind_btCompoundShape_addChildShape_2 = function () {
                return (sl = n._emscripten_bind_btCompoundShape_addChildShape_2 = n.asm.uk).apply(null, arguments)
            }, cl = n._emscripten_bind_btCompoundShape_removeChildShape_1 = function () {
                return (cl = n._emscripten_bind_btCompoundShape_removeChildShape_1 = n.asm.vk).apply(null, arguments)
            }, al = n._emscripten_bind_btCompoundShape_removeChildShapeByIndex_1 = function () {
                return (al = n._emscripten_bind_btCompoundShape_removeChildShapeByIndex_1 = n.asm.wk).apply(null, arguments)
            }, ll = n._emscripten_bind_btCompoundShape_getNumChildShapes_0 = function () {
                return (ll = n._emscripten_bind_btCompoundShape_getNumChildShapes_0 = n.asm.xk).apply(null, arguments)
            }, ul = n._emscripten_bind_btCompoundShape_getChildShape_1 = function () {
                return (ul = n._emscripten_bind_btCompoundShape_getChildShape_1 = n.asm.yk).apply(null, arguments)
            }, bl = n._emscripten_bind_btCompoundShape_updateChildTransform_2 = function () {
                return (bl = n._emscripten_bind_btCompoundShape_updateChildTransform_2 = n.asm.zk).apply(null, arguments)
            }, yl = n._emscripten_bind_btCompoundShape_updateChildTransform_3 = function () {
                return (yl = n._emscripten_bind_btCompoundShape_updateChildTransform_3 = n.asm.Ak).apply(null, arguments)
            }, ml = n._emscripten_bind_btCompoundShape_setMargin_1 = function () {
                return (ml = n._emscripten_bind_btCompoundShape_setMargin_1 = n.asm.Bk).apply(null, arguments)
            }, dl = n._emscripten_bind_btCompoundShape_getMargin_0 = function () {
                return (dl = n._emscripten_bind_btCompoundShape_getMargin_0 = n.asm.Ck).apply(null, arguments)
            }, fl = n._emscripten_bind_btCompoundShape_setLocalScaling_1 = function () {
                return (fl = n._emscripten_bind_btCompoundShape_setLocalScaling_1 = n.asm.Dk).apply(null, arguments)
            }, hl = n._emscripten_bind_btCompoundShape_getLocalScaling_0 = function () {
                return (hl = n._emscripten_bind_btCompoundShape_getLocalScaling_0 = n.asm.Ek).apply(null, arguments)
            }, Bl = n._emscripten_bind_btCompoundShape_calculateLocalInertia_2 = function () {
                return (Bl = n._emscripten_bind_btCompoundShape_calculateLocalInertia_2 = n.asm.Fk).apply(null, arguments)
            }, gl = n._emscripten_bind_btCompoundShape___destroy___0 = function () {
                return (gl = n._emscripten_bind_btCompoundShape___destroy___0 = n.asm.Gk).apply(null, arguments)
            }, Cl = n._emscripten_bind_btIndexedMesh_get_m_numTriangles_0 = function () {
                return (Cl = n._emscripten_bind_btIndexedMesh_get_m_numTriangles_0 = n.asm.Hk).apply(null, arguments)
            }, Sl = n._emscripten_bind_btIndexedMesh_set_m_numTriangles_1 = function () {
                return (Sl = n._emscripten_bind_btIndexedMesh_set_m_numTriangles_1 = n.asm.Ik).apply(null, arguments)
            }, jl = n._emscripten_bind_btIndexedMesh___destroy___0 = function () {
                return (jl = n._emscripten_bind_btIndexedMesh___destroy___0 = n.asm.Jk).apply(null, arguments)
            }, vl = n._emscripten_bind_btIndexedMeshArray_size_0 = function () {
                return (vl = n._emscripten_bind_btIndexedMeshArray_size_0 = n.asm.Kk).apply(null, arguments)
            }, Il = n._emscripten_bind_btIndexedMeshArray_at_1 = function () {
                return (Il = n._emscripten_bind_btIndexedMeshArray_at_1 = n.asm.Lk).apply(null, arguments)
            }, Rl = n._emscripten_bind_btIndexedMeshArray___destroy___0 = function () {
                return (Rl = n._emscripten_bind_btIndexedMeshArray___destroy___0 = n.asm.Mk).apply(null, arguments)
            }, Dl = n._emscripten_bind_btTriangleMesh_btTriangleMesh_0 = function () {
                return (Dl = n._emscripten_bind_btTriangleMesh_btTriangleMesh_0 = n.asm.Nk).apply(null, arguments)
            }, Pl = n._emscripten_bind_btTriangleMesh_btTriangleMesh_1 = function () {
                return (Pl = n._emscripten_bind_btTriangleMesh_btTriangleMesh_1 = n.asm.Ok).apply(null, arguments)
            }, Tl = n._emscripten_bind_btTriangleMesh_btTriangleMesh_2 = function () {
                return (Tl = n._emscripten_bind_btTriangleMesh_btTriangleMesh_2 = n.asm.Pk).apply(null, arguments)
            }, Ol = n._emscripten_bind_btTriangleMesh_addTriangle_3 = function () {
                return (Ol = n._emscripten_bind_btTriangleMesh_addTriangle_3 = n.asm.Qk).apply(null, arguments)
            }, Wl = n._emscripten_bind_btTriangleMesh_addTriangle_4 = function () {
                return (Wl = n._emscripten_bind_btTriangleMesh_addTriangle_4 = n.asm.Rk).apply(null, arguments)
            }, Al = n._emscripten_bind_btTriangleMesh_findOrAddVertex_2 = function () {
                return (Al = n._emscripten_bind_btTriangleMesh_findOrAddVertex_2 = n.asm.Sk).apply(null, arguments)
            }, Ml = n._emscripten_bind_btTriangleMesh_addIndex_1 = function () {
                return (Ml = n._emscripten_bind_btTriangleMesh_addIndex_1 = n.asm.Tk).apply(null, arguments)
            }, xl = n._emscripten_bind_btTriangleMesh_getIndexedMeshArray_0 = function () {
                return (xl = n._emscripten_bind_btTriangleMesh_getIndexedMeshArray_0 = n.asm.Uk).apply(null, arguments)
            }, kl = n._emscripten_bind_btTriangleMesh_setScaling_1 = function () {
                return (kl = n._emscripten_bind_btTriangleMesh_setScaling_1 = n.asm.Vk).apply(null, arguments)
            }, Fl = n._emscripten_bind_btTriangleMesh___destroy___0 = function () {
                return (Fl = n._emscripten_bind_btTriangleMesh___destroy___0 = n.asm.Wk).apply(null, arguments)
            }, Ll = n._emscripten_bind_btEmptyShape_btEmptyShape_0 = function () {
                return (Ll = n._emscripten_bind_btEmptyShape_btEmptyShape_0 = n.asm.Xk).apply(null, arguments)
            }, Gl = n._emscripten_bind_btEmptyShape_setLocalScaling_1 = function () {
                return (Gl = n._emscripten_bind_btEmptyShape_setLocalScaling_1 = n.asm.Yk).apply(null, arguments)
            }, wl = n._emscripten_bind_btEmptyShape_getLocalScaling_0 = function () {
                return (wl = n._emscripten_bind_btEmptyShape_getLocalScaling_0 = n.asm.Zk).apply(null, arguments)
            }, Hl = n._emscripten_bind_btEmptyShape_calculateLocalInertia_2 = function () {
                return (Hl = n._emscripten_bind_btEmptyShape_calculateLocalInertia_2 = n.asm._k).apply(null, arguments)
            }, Vl = n._emscripten_bind_btEmptyShape___destroy___0 = function () {
                return (Vl = n._emscripten_bind_btEmptyShape___destroy___0 = n.asm.$k).apply(null, arguments)
            }, El = n._emscripten_bind_btStaticPlaneShape_btStaticPlaneShape_2 = function () {
                return (El = n._emscripten_bind_btStaticPlaneShape_btStaticPlaneShape_2 = n.asm.al).apply(null, arguments)
            }, Nl = n._emscripten_bind_btStaticPlaneShape_setLocalScaling_1 = function () {
                return (Nl = n._emscripten_bind_btStaticPlaneShape_setLocalScaling_1 = n.asm.bl).apply(null, arguments)
            }, Ul = n._emscripten_bind_btStaticPlaneShape_getLocalScaling_0 = function () {
                return (Ul = n._emscripten_bind_btStaticPlaneShape_getLocalScaling_0 = n.asm.cl).apply(null, arguments)
            }, zl = n._emscripten_bind_btStaticPlaneShape_calculateLocalInertia_2 = function () {
                return (zl = n._emscripten_bind_btStaticPlaneShape_calculateLocalInertia_2 = n.asm.dl).apply(null, arguments)
            }, ql = n._emscripten_bind_btStaticPlaneShape___destroy___0 = function () {
                return (ql = n._emscripten_bind_btStaticPlaneShape___destroy___0 = n.asm.el).apply(null, arguments)
            }, Kl = n._emscripten_bind_btBvhTriangleMeshShape_btBvhTriangleMeshShape_2 = function () {
                return (Kl = n._emscripten_bind_btBvhTriangleMeshShape_btBvhTriangleMeshShape_2 = n.asm.fl).apply(null, arguments)
            }, Ql = n._emscripten_bind_btBvhTriangleMeshShape_btBvhTriangleMeshShape_3 = function () {
                return (Ql = n._emscripten_bind_btBvhTriangleMeshShape_btBvhTriangleMeshShape_3 = n.asm.gl).apply(null, arguments)
            }, Xl = n._emscripten_bind_btBvhTriangleMeshShape_setLocalScaling_1 = function () {
                return (Xl = n._emscripten_bind_btBvhTriangleMeshShape_setLocalScaling_1 = n.asm.hl).apply(null, arguments)
            }, Zl = n._emscripten_bind_btBvhTriangleMeshShape_getLocalScaling_0 = function () {
                return (Zl = n._emscripten_bind_btBvhTriangleMeshShape_getLocalScaling_0 = n.asm.il).apply(null, arguments)
            }, Yl = n._emscripten_bind_btBvhTriangleMeshShape_calculateLocalInertia_2 = function () {
                return (Yl = n._emscripten_bind_btBvhTriangleMeshShape_calculateLocalInertia_2 = n.asm.jl).apply(null, arguments)
            }, Jl = n._emscripten_bind_btBvhTriangleMeshShape___destroy___0 = function () {
                return (Jl = n._emscripten_bind_btBvhTriangleMeshShape___destroy___0 = n.asm.kl).apply(null, arguments)
            }, $l = n._emscripten_bind_btHeightfieldTerrainShape_btHeightfieldTerrainShape_9 = function () {
                return ($l = n._emscripten_bind_btHeightfieldTerrainShape_btHeightfieldTerrainShape_9 = n.asm.ll).apply(null, arguments)
            }, tu = n._emscripten_bind_btHeightfieldTerrainShape_setMargin_1 = function () {
                return (tu = n._emscripten_bind_btHeightfieldTerrainShape_setMargin_1 = n.asm.ml).apply(null, arguments)
            }, eu = n._emscripten_bind_btHeightfieldTerrainShape_getMargin_0 = function () {
                return (eu = n._emscripten_bind_btHeightfieldTerrainShape_getMargin_0 = n.asm.nl).apply(null, arguments)
            }, nu = n._emscripten_bind_btHeightfieldTerrainShape_setLocalScaling_1 = function () {
                return (nu = n._emscripten_bind_btHeightfieldTerrainShape_setLocalScaling_1 = n.asm.ol).apply(null, arguments)
            }, ou = n._emscripten_bind_btHeightfieldTerrainShape_getLocalScaling_0 = function () {
                return (ou = n._emscripten_bind_btHeightfieldTerrainShape_getLocalScaling_0 = n.asm.pl).apply(null, arguments)
            }, _u = n._emscripten_bind_btHeightfieldTerrainShape_calculateLocalInertia_2 = function () {
                return (_u = n._emscripten_bind_btHeightfieldTerrainShape_calculateLocalInertia_2 = n.asm.ql).apply(null, arguments)
            }, iu = n._emscripten_bind_btHeightfieldTerrainShape___destroy___0 = function () {
                return (iu = n._emscripten_bind_btHeightfieldTerrainShape___destroy___0 = n.asm.rl).apply(null, arguments)
            }, ru = n._emscripten_bind_btAABB_btAABB_4 = function () {
                return (ru = n._emscripten_bind_btAABB_btAABB_4 = n.asm.sl).apply(null, arguments)
            }, pu = n._emscripten_bind_btAABB_invalidate_0 = function () {
                return (pu = n._emscripten_bind_btAABB_invalidate_0 = n.asm.tl).apply(null, arguments)
            }, su = n._emscripten_bind_btAABB_increment_margin_1 = function () {
                return (su = n._emscripten_bind_btAABB_increment_margin_1 = n.asm.ul).apply(null, arguments)
            }, cu = n._emscripten_bind_btAABB_copy_with_margin_2 = function () {
                return (cu = n._emscripten_bind_btAABB_copy_with_margin_2 = n.asm.vl).apply(null, arguments)
            }, au = n._emscripten_bind_btAABB___destroy___0 = function () {
                return (au = n._emscripten_bind_btAABB___destroy___0 = n.asm.wl).apply(null, arguments)
            }, lu = n._emscripten_bind_btPrimitiveTriangle_btPrimitiveTriangle_0 = function () {
                return (lu = n._emscripten_bind_btPrimitiveTriangle_btPrimitiveTriangle_0 = n.asm.xl).apply(null, arguments)
            }, uu = n._emscripten_bind_btPrimitiveTriangle___destroy___0 = function () {
                return (uu = n._emscripten_bind_btPrimitiveTriangle___destroy___0 = n.asm.yl).apply(null, arguments)
            }, bu = n._emscripten_bind_btTriangleShapeEx_btTriangleShapeEx_3 = function () {
                return (bu = n._emscripten_bind_btTriangleShapeEx_btTriangleShapeEx_3 = n.asm.zl).apply(null, arguments)
            }, yu = n._emscripten_bind_btTriangleShapeEx_getAabb_3 = function () {
                return (yu = n._emscripten_bind_btTriangleShapeEx_getAabb_3 = n.asm.Al).apply(null, arguments)
            }, mu = n._emscripten_bind_btTriangleShapeEx_applyTransform_1 = function () {
                return (mu = n._emscripten_bind_btTriangleShapeEx_applyTransform_1 = n.asm.Bl).apply(null, arguments)
            }, du = n._emscripten_bind_btTriangleShapeEx_buildTriPlane_1 = function () {
                return (du = n._emscripten_bind_btTriangleShapeEx_buildTriPlane_1 = n.asm.Cl).apply(null, arguments)
            }, fu = n._emscripten_bind_btTriangleShapeEx___destroy___0 = function () {
                return (fu = n._emscripten_bind_btTriangleShapeEx___destroy___0 = n.asm.Dl).apply(null, arguments)
            }, hu = n._emscripten_bind_btTetrahedronShapeEx_btTetrahedronShapeEx_0 = function () {
                return (hu = n._emscripten_bind_btTetrahedronShapeEx_btTetrahedronShapeEx_0 = n.asm.El).apply(null, arguments)
            }, Bu = n._emscripten_bind_btTetrahedronShapeEx_setVertices_4 = function () {
                return (Bu = n._emscripten_bind_btTetrahedronShapeEx_setVertices_4 = n.asm.Fl).apply(null, arguments)
            }, gu = n._emscripten_bind_btTetrahedronShapeEx___destroy___0 = function () {
                return (gu = n._emscripten_bind_btTetrahedronShapeEx___destroy___0 = n.asm.Gl).apply(null, arguments)
            }, Cu = n._emscripten_bind_CompoundPrimitiveManager_get_primitive_count_0 = function () {
                return (Cu = n._emscripten_bind_CompoundPrimitiveManager_get_primitive_count_0 = n.asm.Hl).apply(null, arguments)
            }, Su = n._emscripten_bind_CompoundPrimitiveManager_get_primitive_box_2 = function () {
                return (Su = n._emscripten_bind_CompoundPrimitiveManager_get_primitive_box_2 = n.asm.Il).apply(null, arguments)
            }, ju = n._emscripten_bind_CompoundPrimitiveManager_get_primitive_triangle_2 = function () {
                return (ju = n._emscripten_bind_CompoundPrimitiveManager_get_primitive_triangle_2 = n.asm.Jl).apply(null, arguments)
            }, vu = n._emscripten_bind_CompoundPrimitiveManager_is_trimesh_0 = function () {
                return (vu = n._emscripten_bind_CompoundPrimitiveManager_is_trimesh_0 = n.asm.Kl).apply(null, arguments)
            }, Iu = n._emscripten_bind_CompoundPrimitiveManager_get_m_compoundShape_0 = function () {
                return (Iu = n._emscripten_bind_CompoundPrimitiveManager_get_m_compoundShape_0 = n.asm.Ll).apply(null, arguments)
            }, Ru = n._emscripten_bind_CompoundPrimitiveManager_set_m_compoundShape_1 = function () {
                return (Ru = n._emscripten_bind_CompoundPrimitiveManager_set_m_compoundShape_1 = n.asm.Ml).apply(null, arguments)
            }, Du = n._emscripten_bind_CompoundPrimitiveManager___destroy___0 = function () {
                return (Du = n._emscripten_bind_CompoundPrimitiveManager___destroy___0 = n.asm.Nl).apply(null, arguments)
            }, Pu = n._emscripten_bind_btGImpactCompoundShape_btGImpactCompoundShape_0 = function () {
                return (Pu = n._emscripten_bind_btGImpactCompoundShape_btGImpactCompoundShape_0 = n.asm.Ol).apply(null, arguments)
            }, Tu = n._emscripten_bind_btGImpactCompoundShape_btGImpactCompoundShape_1 = function () {
                return (Tu = n._emscripten_bind_btGImpactCompoundShape_btGImpactCompoundShape_1 = n.asm.Pl).apply(null, arguments)
            }, Ou = n._emscripten_bind_btGImpactCompoundShape_childrenHasTransform_0 = function () {
                return (Ou = n._emscripten_bind_btGImpactCompoundShape_childrenHasTransform_0 = n.asm.Ql).apply(null, arguments)
            }, Wu = n._emscripten_bind_btGImpactCompoundShape_getPrimitiveManager_0 = function () {
                return (Wu = n._emscripten_bind_btGImpactCompoundShape_getPrimitiveManager_0 = n.asm.Rl).apply(null, arguments)
            }, Au = n._emscripten_bind_btGImpactCompoundShape_getCompoundPrimitiveManager_0 = function () {
                return (Au = n._emscripten_bind_btGImpactCompoundShape_getCompoundPrimitiveManager_0 = n.asm.Sl).apply(null, arguments)
            }, Mu = n._emscripten_bind_btGImpactCompoundShape_getNumChildShapes_0 = function () {
                return (Mu = n._emscripten_bind_btGImpactCompoundShape_getNumChildShapes_0 = n.asm.Tl).apply(null, arguments)
            }, xu = n._emscripten_bind_btGImpactCompoundShape_addChildShape_2 = function () {
                return (xu = n._emscripten_bind_btGImpactCompoundShape_addChildShape_2 = n.asm.Ul).apply(null, arguments)
            }, ku = n._emscripten_bind_btGImpactCompoundShape_getChildShape_1 = function () {
                return (ku = n._emscripten_bind_btGImpactCompoundShape_getChildShape_1 = n.asm.Vl).apply(null, arguments)
            }, Fu = n._emscripten_bind_btGImpactCompoundShape_getChildAabb_4 = function () {
                return (Fu = n._emscripten_bind_btGImpactCompoundShape_getChildAabb_4 = n.asm.Wl).apply(null, arguments)
            }, Lu = n._emscripten_bind_btGImpactCompoundShape_getChildTransform_1 = function () {
                return (Lu = n._emscripten_bind_btGImpactCompoundShape_getChildTransform_1 = n.asm.Xl).apply(null, arguments)
            }, Gu = n._emscripten_bind_btGImpactCompoundShape_setChildTransform_2 = function () {
                return (Gu = n._emscripten_bind_btGImpactCompoundShape_setChildTransform_2 = n.asm.Yl).apply(null, arguments)
            }, wu = n._emscripten_bind_btGImpactCompoundShape_calculateLocalInertia_2 = function () {
                return (wu = n._emscripten_bind_btGImpactCompoundShape_calculateLocalInertia_2 = n.asm.Zl).apply(null, arguments)
            }, Hu = n._emscripten_bind_btGImpactCompoundShape_getName_0 = function () {
                return (Hu = n._emscripten_bind_btGImpactCompoundShape_getName_0 = n.asm._l).apply(null, arguments)
            }, Vu = n._emscripten_bind_btGImpactCompoundShape_getGImpactShapeType_0 = function () {
                return (Vu = n._emscripten_bind_btGImpactCompoundShape_getGImpactShapeType_0 = n.asm.$l).apply(null, arguments)
            }, Eu = n._emscripten_bind_btGImpactCompoundShape_setLocalScaling_1 = function () {
                return (Eu = n._emscripten_bind_btGImpactCompoundShape_setLocalScaling_1 = n.asm.am).apply(null, arguments)
            }, Nu = n._emscripten_bind_btGImpactCompoundShape_getLocalScaling_0 = function () {
                return (Nu = n._emscripten_bind_btGImpactCompoundShape_getLocalScaling_0 = n.asm.bm).apply(null, arguments)
            }, Uu = n._emscripten_bind_btGImpactCompoundShape_updateBound_0 = function () {
                return (Uu = n._emscripten_bind_btGImpactCompoundShape_updateBound_0 = n.asm.cm).apply(null, arguments)
            }, zu = n._emscripten_bind_btGImpactCompoundShape_postUpdate_0 = function () {
                return (zu = n._emscripten_bind_btGImpactCompoundShape_postUpdate_0 = n.asm.dm).apply(null, arguments)
            }, qu = n._emscripten_bind_btGImpactCompoundShape_getShapeType_0 = function () {
                return (qu = n._emscripten_bind_btGImpactCompoundShape_getShapeType_0 = n.asm.em).apply(null, arguments)
            }, Ku = n._emscripten_bind_btGImpactCompoundShape_needsRetrieveTriangles_0 = function () {
                return (Ku = n._emscripten_bind_btGImpactCompoundShape_needsRetrieveTriangles_0 = n.asm.fm).apply(null, arguments)
            }, Qu = n._emscripten_bind_btGImpactCompoundShape_needsRetrieveTetrahedrons_0 = function () {
                return (Qu = n._emscripten_bind_btGImpactCompoundShape_needsRetrieveTetrahedrons_0 = n.asm.gm).apply(null, arguments)
            }, Xu = n._emscripten_bind_btGImpactCompoundShape_getBulletTriangle_2 = function () {
                return (Xu = n._emscripten_bind_btGImpactCompoundShape_getBulletTriangle_2 = n.asm.hm).apply(null, arguments)
            }, Zu = n._emscripten_bind_btGImpactCompoundShape_getBulletTetrahedron_2 = function () {
                return (Zu = n._emscripten_bind_btGImpactCompoundShape_getBulletTetrahedron_2 = n.asm.im).apply(null, arguments)
            }, Yu = n._emscripten_bind_btGImpactCompoundShape___destroy___0 = function () {
                return (Yu = n._emscripten_bind_btGImpactCompoundShape___destroy___0 = n.asm.jm).apply(null, arguments)
            }, Ju = n._emscripten_bind_TrimeshPrimitiveManager_TrimeshPrimitiveManager_0 = function () {
                return (Ju = n._emscripten_bind_TrimeshPrimitiveManager_TrimeshPrimitiveManager_0 = n.asm.km).apply(null, arguments)
            }, $u = n._emscripten_bind_TrimeshPrimitiveManager_TrimeshPrimitiveManager_1 = function () {
                return ($u = n._emscripten_bind_TrimeshPrimitiveManager_TrimeshPrimitiveManager_1 = n.asm.lm).apply(null, arguments)
            }, tb = n._emscripten_bind_TrimeshPrimitiveManager_lock_0 = function () {
                return (tb = n._emscripten_bind_TrimeshPrimitiveManager_lock_0 = n.asm.mm).apply(null, arguments)
            }, eb = n._emscripten_bind_TrimeshPrimitiveManager_unlock_0 = function () {
                return (eb = n._emscripten_bind_TrimeshPrimitiveManager_unlock_0 = n.asm.nm).apply(null, arguments)
            }, nb = n._emscripten_bind_TrimeshPrimitiveManager_is_trimesh_0 = function () {
                return (nb = n._emscripten_bind_TrimeshPrimitiveManager_is_trimesh_0 = n.asm.om).apply(null, arguments)
            }, ob = n._emscripten_bind_TrimeshPrimitiveManager_get_vertex_count_0 = function () {
                return (ob = n._emscripten_bind_TrimeshPrimitiveManager_get_vertex_count_0 = n.asm.pm).apply(null, arguments)
            }, _b = n._emscripten_bind_TrimeshPrimitiveManager_get_indices_4 = function () {
                return (_b = n._emscripten_bind_TrimeshPrimitiveManager_get_indices_4 = n.asm.qm).apply(null, arguments)
            }, ib = n._emscripten_bind_TrimeshPrimitiveManager_get_vertex_2 = function () {
                return (ib = n._emscripten_bind_TrimeshPrimitiveManager_get_vertex_2 = n.asm.rm).apply(null, arguments)
            }, rb = n._emscripten_bind_TrimeshPrimitiveManager_get_bullet_triangle_2 = function () {
                return (rb = n._emscripten_bind_TrimeshPrimitiveManager_get_bullet_triangle_2 = n.asm.sm).apply(null, arguments)
            }, pb = n._emscripten_bind_TrimeshPrimitiveManager_get_m_margin_0 = function () {
                return (pb = n._emscripten_bind_TrimeshPrimitiveManager_get_m_margin_0 = n.asm.tm).apply(null, arguments)
            }, sb = n._emscripten_bind_TrimeshPrimitiveManager_set_m_margin_1 = function () {
                return (sb = n._emscripten_bind_TrimeshPrimitiveManager_set_m_margin_1 = n.asm.um).apply(null, arguments)
            }, cb = n._emscripten_bind_TrimeshPrimitiveManager_get_m_meshInterface_0 = function () {
                return (cb = n._emscripten_bind_TrimeshPrimitiveManager_get_m_meshInterface_0 = n.asm.vm).apply(null, arguments)
            }, ab = n._emscripten_bind_TrimeshPrimitiveManager_set_m_meshInterface_1 = function () {
                return (ab = n._emscripten_bind_TrimeshPrimitiveManager_set_m_meshInterface_1 = n.asm.wm).apply(null, arguments)
            }, lb = n._emscripten_bind_TrimeshPrimitiveManager_get_m_part_0 = function () {
                return (lb = n._emscripten_bind_TrimeshPrimitiveManager_get_m_part_0 = n.asm.xm).apply(null, arguments)
            }, ub = n._emscripten_bind_TrimeshPrimitiveManager_set_m_part_1 = function () {
                return (ub = n._emscripten_bind_TrimeshPrimitiveManager_set_m_part_1 = n.asm.ym).apply(null, arguments)
            }, bb = n._emscripten_bind_TrimeshPrimitiveManager_get_m_lock_count_0 = function () {
                return (bb = n._emscripten_bind_TrimeshPrimitiveManager_get_m_lock_count_0 = n.asm.zm).apply(null, arguments)
            }, yb = n._emscripten_bind_TrimeshPrimitiveManager_set_m_lock_count_1 = function () {
                return (yb = n._emscripten_bind_TrimeshPrimitiveManager_set_m_lock_count_1 = n.asm.Am).apply(null, arguments)
            }, mb = n._emscripten_bind_TrimeshPrimitiveManager_get_numverts_0 = function () {
                return (mb = n._emscripten_bind_TrimeshPrimitiveManager_get_numverts_0 = n.asm.Bm).apply(null, arguments)
            }, db = n._emscripten_bind_TrimeshPrimitiveManager_set_numverts_1 = function () {
                return (db = n._emscripten_bind_TrimeshPrimitiveManager_set_numverts_1 = n.asm.Cm).apply(null, arguments)
            }, fb = n._emscripten_bind_TrimeshPrimitiveManager_get_type_0 = function () {
                return (fb = n._emscripten_bind_TrimeshPrimitiveManager_get_type_0 = n.asm.Dm).apply(null, arguments)
            }, hb = n._emscripten_bind_TrimeshPrimitiveManager_set_type_1 = function () {
                return (hb = n._emscripten_bind_TrimeshPrimitiveManager_set_type_1 = n.asm.Em).apply(null, arguments)
            }, Bb = n._emscripten_bind_TrimeshPrimitiveManager_get_stride_0 = function () {
                return (Bb = n._emscripten_bind_TrimeshPrimitiveManager_get_stride_0 = n.asm.Fm).apply(null, arguments)
            }, gb = n._emscripten_bind_TrimeshPrimitiveManager_set_stride_1 = function () {
                return (gb = n._emscripten_bind_TrimeshPrimitiveManager_set_stride_1 = n.asm.Gm).apply(null, arguments)
            }, Cb = n._emscripten_bind_TrimeshPrimitiveManager_get_indexstride_0 = function () {
                return (Cb = n._emscripten_bind_TrimeshPrimitiveManager_get_indexstride_0 = n.asm.Hm).apply(null, arguments)
            }, Sb = n._emscripten_bind_TrimeshPrimitiveManager_set_indexstride_1 = function () {
                return (Sb = n._emscripten_bind_TrimeshPrimitiveManager_set_indexstride_1 = n.asm.Im).apply(null, arguments)
            }, jb = n._emscripten_bind_TrimeshPrimitiveManager_get_numfaces_0 = function () {
                return (jb = n._emscripten_bind_TrimeshPrimitiveManager_get_numfaces_0 = n.asm.Jm).apply(null, arguments)
            }, vb = n._emscripten_bind_TrimeshPrimitiveManager_set_numfaces_1 = function () {
                return (vb = n._emscripten_bind_TrimeshPrimitiveManager_set_numfaces_1 = n.asm.Km).apply(null, arguments)
            }, Ib = n._emscripten_bind_TrimeshPrimitiveManager_get_indicestype_0 = function () {
                return (Ib = n._emscripten_bind_TrimeshPrimitiveManager_get_indicestype_0 = n.asm.Lm).apply(null, arguments)
            }, Rb = n._emscripten_bind_TrimeshPrimitiveManager_set_indicestype_1 = function () {
                return (Rb = n._emscripten_bind_TrimeshPrimitiveManager_set_indicestype_1 = n.asm.Mm).apply(null, arguments)
            }, Db = n._emscripten_bind_TrimeshPrimitiveManager___destroy___0 = function () {
                return (Db = n._emscripten_bind_TrimeshPrimitiveManager___destroy___0 = n.asm.Nm).apply(null, arguments)
            }, Pb = n._emscripten_bind_btGImpactMeshShapePart_btGImpactMeshShapePart_2 = function () {
                return (Pb = n._emscripten_bind_btGImpactMeshShapePart_btGImpactMeshShapePart_2 = n.asm.Om).apply(null, arguments)
            }, Tb = n._emscripten_bind_btGImpactMeshShapePart_getTrimeshPrimitiveManager_0 = function () {
                return (Tb = n._emscripten_bind_btGImpactMeshShapePart_getTrimeshPrimitiveManager_0 = n.asm.Pm).apply(null, arguments)
            }, Ob = n._emscripten_bind_btGImpactMeshShapePart_getVertexCount_0 = function () {
                return (Ob = n._emscripten_bind_btGImpactMeshShapePart_getVertexCount_0 = n.asm.Qm).apply(null, arguments)
            }, Wb = n._emscripten_bind_btGImpactMeshShapePart_getVertex_2 = function () {
                return (Wb = n._emscripten_bind_btGImpactMeshShapePart_getVertex_2 = n.asm.Rm).apply(null, arguments)
            }, Ab = n._emscripten_bind_btGImpactMeshShapePart_getPart_0 = function () {
                return (Ab = n._emscripten_bind_btGImpactMeshShapePart_getPart_0 = n.asm.Sm).apply(null, arguments)
            }, Mb = n._emscripten_bind_btGImpactMeshShapePart_setLocalScaling_1 = function () {
                return (Mb = n._emscripten_bind_btGImpactMeshShapePart_setLocalScaling_1 = n.asm.Tm).apply(null, arguments)
            }, xb = n._emscripten_bind_btGImpactMeshShapePart_getLocalScaling_0 = function () {
                return (xb = n._emscripten_bind_btGImpactMeshShapePart_getLocalScaling_0 = n.asm.Um).apply(null, arguments)
            }, kb = n._emscripten_bind_btGImpactMeshShapePart_updateBound_0 = function () {
                return (kb = n._emscripten_bind_btGImpactMeshShapePart_updateBound_0 = n.asm.Vm).apply(null, arguments)
            }, Fb = n._emscripten_bind_btGImpactMeshShapePart_postUpdate_0 = function () {
                return (Fb = n._emscripten_bind_btGImpactMeshShapePart_postUpdate_0 = n.asm.Wm).apply(null, arguments)
            }, Lb = n._emscripten_bind_btGImpactMeshShapePart_getShapeType_0 = function () {
                return (Lb = n._emscripten_bind_btGImpactMeshShapePart_getShapeType_0 = n.asm.Xm).apply(null, arguments)
            }, Gb = n._emscripten_bind_btGImpactMeshShapePart_needsRetrieveTriangles_0 = function () {
                return (Gb = n._emscripten_bind_btGImpactMeshShapePart_needsRetrieveTriangles_0 = n.asm.Ym).apply(null, arguments)
            }, wb = n._emscripten_bind_btGImpactMeshShapePart_needsRetrieveTetrahedrons_0 = function () {
                return (wb = n._emscripten_bind_btGImpactMeshShapePart_needsRetrieveTetrahedrons_0 = n.asm.Zm).apply(null, arguments)
            }, Hb = n._emscripten_bind_btGImpactMeshShapePart_getBulletTriangle_2 = function () {
                return (Hb = n._emscripten_bind_btGImpactMeshShapePart_getBulletTriangle_2 = n.asm._m).apply(null, arguments)
            }, Vb = n._emscripten_bind_btGImpactMeshShapePart_getBulletTetrahedron_2 = function () {
                return (Vb = n._emscripten_bind_btGImpactMeshShapePart_getBulletTetrahedron_2 = n.asm.$m).apply(null, arguments)
            }, Eb = n._emscripten_bind_btGImpactMeshShapePart___destroy___0 = function () {
                return (Eb = n._emscripten_bind_btGImpactMeshShapePart___destroy___0 = n.asm.an).apply(null, arguments)
            }, Nb = n._emscripten_bind_btGImpactMeshShape_btGImpactMeshShape_1 = function () {
                return (Nb = n._emscripten_bind_btGImpactMeshShape_btGImpactMeshShape_1 = n.asm.bn).apply(null, arguments)
            }, Ub = n._emscripten_bind_btGImpactMeshShape_getMeshInterface_0 = function () {
                return (Ub = n._emscripten_bind_btGImpactMeshShape_getMeshInterface_0 = n.asm.cn).apply(null, arguments)
            }, zb = n._emscripten_bind_btGImpactMeshShape_getMeshPartCount_0 = function () {
                return (zb = n._emscripten_bind_btGImpactMeshShape_getMeshPartCount_0 = n.asm.dn).apply(null, arguments)
            }, qb = n._emscripten_bind_btGImpactMeshShape_getMeshPart_1 = function () {
                return (qb = n._emscripten_bind_btGImpactMeshShape_getMeshPart_1 = n.asm.en).apply(null, arguments)
            }, Kb = n._emscripten_bind_btGImpactMeshShape_calculateSerializeBufferSize_0 = function () {
                return (Kb = n._emscripten_bind_btGImpactMeshShape_calculateSerializeBufferSize_0 = n.asm.fn).apply(null, arguments)
            }, Qb = n._emscripten_bind_btGImpactMeshShape_setLocalScaling_1 = function () {
                return (Qb = n._emscripten_bind_btGImpactMeshShape_setLocalScaling_1 = n.asm.gn).apply(null, arguments)
            }, Xb = n._emscripten_bind_btGImpactMeshShape_getLocalScaling_0 = function () {
                return (Xb = n._emscripten_bind_btGImpactMeshShape_getLocalScaling_0 = n.asm.hn).apply(null, arguments)
            }, Zb = n._emscripten_bind_btGImpactMeshShape_updateBound_0 = function () {
                return (Zb = n._emscripten_bind_btGImpactMeshShape_updateBound_0 = n.asm.jn).apply(null, arguments)
            }, Yb = n._emscripten_bind_btGImpactMeshShape_postUpdate_0 = function () {
                return (Yb = n._emscripten_bind_btGImpactMeshShape_postUpdate_0 = n.asm.kn).apply(null, arguments)
            }, Jb = n._emscripten_bind_btGImpactMeshShape_getShapeType_0 = function () {
                return (Jb = n._emscripten_bind_btGImpactMeshShape_getShapeType_0 = n.asm.ln).apply(null, arguments)
            }, $b = n._emscripten_bind_btGImpactMeshShape_needsRetrieveTriangles_0 = function () {
                return ($b = n._emscripten_bind_btGImpactMeshShape_needsRetrieveTriangles_0 = n.asm.mn).apply(null, arguments)
            }, ty = n._emscripten_bind_btGImpactMeshShape_needsRetrieveTetrahedrons_0 = function () {
                return (ty = n._emscripten_bind_btGImpactMeshShape_needsRetrieveTetrahedrons_0 = n.asm.nn).apply(null, arguments)
            }, ey = n._emscripten_bind_btGImpactMeshShape_getBulletTriangle_2 = function () {
                return (ey = n._emscripten_bind_btGImpactMeshShape_getBulletTriangle_2 = n.asm.on).apply(null, arguments)
            }, ny = n._emscripten_bind_btGImpactMeshShape_getBulletTetrahedron_2 = function () {
                return (ny = n._emscripten_bind_btGImpactMeshShape_getBulletTetrahedron_2 = n.asm.pn).apply(null, arguments)
            }, oy = n._emscripten_bind_btGImpactMeshShape___destroy___0 = function () {
                return (oy = n._emscripten_bind_btGImpactMeshShape___destroy___0 = n.asm.qn).apply(null, arguments)
            },
            _y = n._emscripten_bind_btCollisionAlgorithmConstructionInfo_btCollisionAlgorithmConstructionInfo_0 = function () {
                return (_y = n._emscripten_bind_btCollisionAlgorithmConstructionInfo_btCollisionAlgorithmConstructionInfo_0 = n.asm.rn).apply(null, arguments)
            },
            iy = n._emscripten_bind_btCollisionAlgorithmConstructionInfo_btCollisionAlgorithmConstructionInfo_2 = function () {
                return (iy = n._emscripten_bind_btCollisionAlgorithmConstructionInfo_btCollisionAlgorithmConstructionInfo_2 = n.asm.sn).apply(null, arguments)
            }, ry = n._emscripten_bind_btCollisionAlgorithmConstructionInfo_get_m_dispatcher1_0 = function () {
                return (ry = n._emscripten_bind_btCollisionAlgorithmConstructionInfo_get_m_dispatcher1_0 = n.asm.tn).apply(null, arguments)
            }, py = n._emscripten_bind_btCollisionAlgorithmConstructionInfo_set_m_dispatcher1_1 = function () {
                return (py = n._emscripten_bind_btCollisionAlgorithmConstructionInfo_set_m_dispatcher1_1 = n.asm.un).apply(null, arguments)
            }, sy = n._emscripten_bind_btCollisionAlgorithmConstructionInfo_get_m_manifold_0 = function () {
                return (sy = n._emscripten_bind_btCollisionAlgorithmConstructionInfo_get_m_manifold_0 = n.asm.vn).apply(null, arguments)
            }, cy = n._emscripten_bind_btCollisionAlgorithmConstructionInfo_set_m_manifold_1 = function () {
                return (cy = n._emscripten_bind_btCollisionAlgorithmConstructionInfo_set_m_manifold_1 = n.asm.wn).apply(null, arguments)
            }, ay = n._emscripten_bind_btCollisionAlgorithmConstructionInfo___destroy___0 = function () {
                return (ay = n._emscripten_bind_btCollisionAlgorithmConstructionInfo___destroy___0 = n.asm.xn).apply(null, arguments)
            }, ly = n._emscripten_bind_btGImpactCollisionAlgorithm_btGImpactCollisionAlgorithm_3 = function () {
                return (ly = n._emscripten_bind_btGImpactCollisionAlgorithm_btGImpactCollisionAlgorithm_3 = n.asm.yn).apply(null, arguments)
            }, uy = n._emscripten_bind_btGImpactCollisionAlgorithm_registerAlgorithm_1 = function () {
                return (uy = n._emscripten_bind_btGImpactCollisionAlgorithm_registerAlgorithm_1 = n.asm.zn).apply(null, arguments)
            }, by = n._emscripten_bind_btGImpactCollisionAlgorithm___destroy___0 = function () {
                return (by = n._emscripten_bind_btGImpactCollisionAlgorithm___destroy___0 = n.asm.An).apply(null, arguments)
            },
            yy = n._emscripten_bind_btDefaultCollisionConstructionInfo_btDefaultCollisionConstructionInfo_0 = function () {
                return (yy = n._emscripten_bind_btDefaultCollisionConstructionInfo_btDefaultCollisionConstructionInfo_0 = n.asm.Bn).apply(null, arguments)
            }, my = n._emscripten_bind_btDefaultCollisionConstructionInfo___destroy___0 = function () {
                return (my = n._emscripten_bind_btDefaultCollisionConstructionInfo___destroy___0 = n.asm.Cn).apply(null, arguments)
            }, dy = n._emscripten_bind_btPersistentManifold_btPersistentManifold_0 = function () {
                return (dy = n._emscripten_bind_btPersistentManifold_btPersistentManifold_0 = n.asm.Dn).apply(null, arguments)
            }, fy = n._emscripten_bind_btPersistentManifold_getBody0_0 = function () {
                return (fy = n._emscripten_bind_btPersistentManifold_getBody0_0 = n.asm.En).apply(null, arguments)
            }, hy = n._emscripten_bind_btPersistentManifold_getBody1_0 = function () {
                return (hy = n._emscripten_bind_btPersistentManifold_getBody1_0 = n.asm.Fn).apply(null, arguments)
            }, By = n._emscripten_bind_btPersistentManifold_getNumContacts_0 = function () {
                return (By = n._emscripten_bind_btPersistentManifold_getNumContacts_0 = n.asm.Gn).apply(null, arguments)
            }, gy = n._emscripten_bind_btPersistentManifold_getContactPoint_1 = function () {
                return (gy = n._emscripten_bind_btPersistentManifold_getContactPoint_1 = n.asm.Hn).apply(null, arguments)
            }, Cy = n._emscripten_bind_btPersistentManifold___destroy___0 = function () {
                return (Cy = n._emscripten_bind_btPersistentManifold___destroy___0 = n.asm.In).apply(null, arguments)
            }, Sy = n._emscripten_bind_btCollisionDispatcher_btCollisionDispatcher_1 = function () {
                return (Sy = n._emscripten_bind_btCollisionDispatcher_btCollisionDispatcher_1 = n.asm.Jn).apply(null, arguments)
            }, jy = n._emscripten_bind_btCollisionDispatcher_getNumManifolds_0 = function () {
                return (jy = n._emscripten_bind_btCollisionDispatcher_getNumManifolds_0 = n.asm.Kn).apply(null, arguments)
            }, vy = n._emscripten_bind_btCollisionDispatcher_getManifoldByIndexInternal_1 = function () {
                return (vy = n._emscripten_bind_btCollisionDispatcher_getManifoldByIndexInternal_1 = n.asm.Ln).apply(null, arguments)
            }, Iy = n._emscripten_bind_btCollisionDispatcher___destroy___0 = function () {
                return (Iy = n._emscripten_bind_btCollisionDispatcher___destroy___0 = n.asm.Mn).apply(null, arguments)
            }, Ry = n._emscripten_bind_btOverlappingPairCallback___destroy___0 = function () {
                return (Ry = n._emscripten_bind_btOverlappingPairCallback___destroy___0 = n.asm.Nn).apply(null, arguments)
            }, Dy = n._emscripten_bind_btOverlappingPairCache_setInternalGhostPairCallback_1 = function () {
                return (Dy = n._emscripten_bind_btOverlappingPairCache_setInternalGhostPairCallback_1 = n.asm.On).apply(null, arguments)
            }, Py = n._emscripten_bind_btOverlappingPairCache_getNumOverlappingPairs_0 = function () {
                return (Py = n._emscripten_bind_btOverlappingPairCache_getNumOverlappingPairs_0 = n.asm.Pn).apply(null, arguments)
            }, Ty = n._emscripten_bind_btOverlappingPairCache___destroy___0 = function () {
                return (Ty = n._emscripten_bind_btOverlappingPairCache___destroy___0 = n.asm.Qn).apply(null, arguments)
            }, Oy = n._emscripten_bind_btAxisSweep3_btAxisSweep3_2 = function () {
                return (Oy = n._emscripten_bind_btAxisSweep3_btAxisSweep3_2 = n.asm.Rn).apply(null, arguments)
            }, Wy = n._emscripten_bind_btAxisSweep3_btAxisSweep3_3 = function () {
                return (Wy = n._emscripten_bind_btAxisSweep3_btAxisSweep3_3 = n.asm.Sn).apply(null, arguments)
            }, Ay = n._emscripten_bind_btAxisSweep3_btAxisSweep3_4 = function () {
                return (Ay = n._emscripten_bind_btAxisSweep3_btAxisSweep3_4 = n.asm.Tn).apply(null, arguments)
            }, My = n._emscripten_bind_btAxisSweep3_btAxisSweep3_5 = function () {
                return (My = n._emscripten_bind_btAxisSweep3_btAxisSweep3_5 = n.asm.Un).apply(null, arguments)
            }, xy = n._emscripten_bind_btAxisSweep3___destroy___0 = function () {
                return (xy = n._emscripten_bind_btAxisSweep3___destroy___0 = n.asm.Vn).apply(null, arguments)
            }, ky = n._emscripten_bind_btBroadphaseInterface_getOverlappingPairCache_0 = function () {
                return (ky = n._emscripten_bind_btBroadphaseInterface_getOverlappingPairCache_0 = n.asm.Wn).apply(null, arguments)
            }, Fy = n._emscripten_bind_btBroadphaseInterface___destroy___0 = function () {
                return (Fy = n._emscripten_bind_btBroadphaseInterface___destroy___0 = n.asm.Xn).apply(null, arguments)
            }, Ly = n._emscripten_bind_btCollisionConfiguration___destroy___0 = function () {
                return (Ly = n._emscripten_bind_btCollisionConfiguration___destroy___0 = n.asm.Yn).apply(null, arguments)
            }, Gy = n._emscripten_bind_btDbvtBroadphase_btDbvtBroadphase_0 = function () {
                return (Gy = n._emscripten_bind_btDbvtBroadphase_btDbvtBroadphase_0 = n.asm.Zn).apply(null, arguments)
            }, wy = n._emscripten_bind_btDbvtBroadphase___destroy___0 = function () {
                return (wy = n._emscripten_bind_btDbvtBroadphase___destroy___0 = n.asm._n).apply(null, arguments)
            }, Hy = n._emscripten_bind_btBroadphaseProxy_get_m_collisionFilterGroup_0 = function () {
                return (Hy = n._emscripten_bind_btBroadphaseProxy_get_m_collisionFilterGroup_0 = n.asm.$n).apply(null, arguments)
            }, Vy = n._emscripten_bind_btBroadphaseProxy_set_m_collisionFilterGroup_1 = function () {
                return (Vy = n._emscripten_bind_btBroadphaseProxy_set_m_collisionFilterGroup_1 = n.asm.ao).apply(null, arguments)
            }, Ey = n._emscripten_bind_btBroadphaseProxy_get_m_collisionFilterMask_0 = function () {
                return (Ey = n._emscripten_bind_btBroadphaseProxy_get_m_collisionFilterMask_0 = n.asm.bo).apply(null, arguments)
            }, Ny = n._emscripten_bind_btBroadphaseProxy_set_m_collisionFilterMask_1 = function () {
                return (Ny = n._emscripten_bind_btBroadphaseProxy_set_m_collisionFilterMask_1 = n.asm.co).apply(null, arguments)
            }, Uy = n._emscripten_bind_btBroadphaseProxy___destroy___0 = function () {
                return (Uy = n._emscripten_bind_btBroadphaseProxy___destroy___0 = n.asm.eo).apply(null, arguments)
            }, zy = n._emscripten_bind_btRigidBodyConstructionInfo_btRigidBodyConstructionInfo_3 = function () {
                return (zy = n._emscripten_bind_btRigidBodyConstructionInfo_btRigidBodyConstructionInfo_3 = n.asm.fo).apply(null, arguments)
            }, qy = n._emscripten_bind_btRigidBodyConstructionInfo_btRigidBodyConstructionInfo_4 = function () {
                return (qy = n._emscripten_bind_btRigidBodyConstructionInfo_btRigidBodyConstructionInfo_4 = n.asm.go).apply(null, arguments)
            }, Ky = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_linearDamping_0 = function () {
                return (Ky = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_linearDamping_0 = n.asm.ho).apply(null, arguments)
            }, Qy = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_linearDamping_1 = function () {
                return (Qy = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_linearDamping_1 = n.asm.io).apply(null, arguments)
            }, Xy = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_angularDamping_0 = function () {
                return (Xy = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_angularDamping_0 = n.asm.jo).apply(null, arguments)
            }, Zy = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_angularDamping_1 = function () {
                return (Zy = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_angularDamping_1 = n.asm.ko).apply(null, arguments)
            }, Yy = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_friction_0 = function () {
                return (Yy = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_friction_0 = n.asm.lo).apply(null, arguments)
            }, Jy = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_friction_1 = function () {
                return (Jy = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_friction_1 = n.asm.mo).apply(null, arguments)
            }, $y = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_rollingFriction_0 = function () {
                return ($y = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_rollingFriction_0 = n.asm.no).apply(null, arguments)
            }, tm = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_rollingFriction_1 = function () {
                return (tm = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_rollingFriction_1 = n.asm.oo).apply(null, arguments)
            }, em = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_restitution_0 = function () {
                return (em = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_restitution_0 = n.asm.po).apply(null, arguments)
            }, nm = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_restitution_1 = function () {
                return (nm = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_restitution_1 = n.asm.qo).apply(null, arguments)
            }, om = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_linearSleepingThreshold_0 = function () {
                return (om = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_linearSleepingThreshold_0 = n.asm.ro).apply(null, arguments)
            }, _m = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_linearSleepingThreshold_1 = function () {
                return (_m = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_linearSleepingThreshold_1 = n.asm.so).apply(null, arguments)
            }, im = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_angularSleepingThreshold_0 = function () {
                return (im = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_angularSleepingThreshold_0 = n.asm.to).apply(null, arguments)
            }, rm = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_angularSleepingThreshold_1 = function () {
                return (rm = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_angularSleepingThreshold_1 = n.asm.uo).apply(null, arguments)
            }, pm = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalDamping_0 = function () {
                return (pm = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalDamping_0 = n.asm.vo).apply(null, arguments)
            }, sm = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalDamping_1 = function () {
                return (sm = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalDamping_1 = n.asm.wo).apply(null, arguments)
            }, cm = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalDampingFactor_0 = function () {
                return (cm = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalDampingFactor_0 = n.asm.xo).apply(null, arguments)
            }, am = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalDampingFactor_1 = function () {
                return (am = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalDampingFactor_1 = n.asm.yo).apply(null, arguments)
            },
            lm = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalLinearDampingThresholdSqr_0 = function () {
                return (lm = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalLinearDampingThresholdSqr_0 = n.asm.zo).apply(null, arguments)
            },
            um = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalLinearDampingThresholdSqr_1 = function () {
                return (um = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalLinearDampingThresholdSqr_1 = n.asm.Ao).apply(null, arguments)
            },
            bm = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalAngularDampingThresholdSqr_0 = function () {
                return (bm = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalAngularDampingThresholdSqr_0 = n.asm.Bo).apply(null, arguments)
            },
            ym = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalAngularDampingThresholdSqr_1 = function () {
                return (ym = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalAngularDampingThresholdSqr_1 = n.asm.Co).apply(null, arguments)
            },
            mm = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalAngularDampingFactor_0 = function () {
                return (mm = n._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalAngularDampingFactor_0 = n.asm.Do).apply(null, arguments)
            },
            dm = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalAngularDampingFactor_1 = function () {
                return (dm = n._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalAngularDampingFactor_1 = n.asm.Eo).apply(null, arguments)
            }, fm = n._emscripten_bind_btRigidBodyConstructionInfo___destroy___0 = function () {
                return (fm = n._emscripten_bind_btRigidBodyConstructionInfo___destroy___0 = n.asm.Fo).apply(null, arguments)
            }, hm = n._emscripten_bind_btRigidBody_btRigidBody_1 = function () {
                return (hm = n._emscripten_bind_btRigidBody_btRigidBody_1 = n.asm.Go).apply(null, arguments)
            }, Bm = n._emscripten_bind_btRigidBody_getCenterOfMassTransform_0 = function () {
                return (Bm = n._emscripten_bind_btRigidBody_getCenterOfMassTransform_0 = n.asm.Ho).apply(null, arguments)
            }, gm = n._emscripten_bind_btRigidBody_setCenterOfMassTransform_1 = function () {
                return (gm = n._emscripten_bind_btRigidBody_setCenterOfMassTransform_1 = n.asm.Io).apply(null, arguments)
            }, Cm = n._emscripten_bind_btRigidBody_setSleepingThresholds_2 = function () {
                return (Cm = n._emscripten_bind_btRigidBody_setSleepingThresholds_2 = n.asm.Jo).apply(null, arguments)
            }, Sm = n._emscripten_bind_btRigidBody_getLinearDamping_0 = function () {
                return (Sm = n._emscripten_bind_btRigidBody_getLinearDamping_0 = n.asm.Ko).apply(null, arguments)
            }, jm = n._emscripten_bind_btRigidBody_getAngularDamping_0 = function () {
                return (jm = n._emscripten_bind_btRigidBody_getAngularDamping_0 = n.asm.Lo).apply(null, arguments)
            }, vm = n._emscripten_bind_btRigidBody_setDamping_2 = function () {
                return (vm = n._emscripten_bind_btRigidBody_setDamping_2 = n.asm.Mo).apply(null, arguments)
            }, Im = n._emscripten_bind_btRigidBody_setMassProps_2 = function () {
                return (Im = n._emscripten_bind_btRigidBody_setMassProps_2 = n.asm.No).apply(null, arguments)
            }, Rm = n._emscripten_bind_btRigidBody_getLinearFactor_0 = function () {
                return (Rm = n._emscripten_bind_btRigidBody_getLinearFactor_0 = n.asm.Oo).apply(null, arguments)
            }, Dm = n._emscripten_bind_btRigidBody_setLinearFactor_1 = function () {
                return (Dm = n._emscripten_bind_btRigidBody_setLinearFactor_1 = n.asm.Po).apply(null, arguments)
            }, Pm = n._emscripten_bind_btRigidBody_applyTorque_1 = function () {
                return (Pm = n._emscripten_bind_btRigidBody_applyTorque_1 = n.asm.Qo).apply(null, arguments)
            }, Tm = n._emscripten_bind_btRigidBody_applyLocalTorque_1 = function () {
                return (Tm = n._emscripten_bind_btRigidBody_applyLocalTorque_1 = n.asm.Ro).apply(null, arguments)
            }, Om = n._emscripten_bind_btRigidBody_applyForce_2 = function () {
                return (Om = n._emscripten_bind_btRigidBody_applyForce_2 = n.asm.So).apply(null, arguments)
            }, Wm = n._emscripten_bind_btRigidBody_applyCentralForce_1 = function () {
                return (Wm = n._emscripten_bind_btRigidBody_applyCentralForce_1 = n.asm.To).apply(null, arguments)
            }, Am = n._emscripten_bind_btRigidBody_applyCentralLocalForce_1 = function () {
                return (Am = n._emscripten_bind_btRigidBody_applyCentralLocalForce_1 = n.asm.Uo).apply(null, arguments)
            }, Mm = n._emscripten_bind_btRigidBody_applyTorqueImpulse_1 = function () {
                return (Mm = n._emscripten_bind_btRigidBody_applyTorqueImpulse_1 = n.asm.Vo).apply(null, arguments)
            }, xm = n._emscripten_bind_btRigidBody_applyImpulse_2 = function () {
                return (xm = n._emscripten_bind_btRigidBody_applyImpulse_2 = n.asm.Wo).apply(null, arguments)
            }, km = n._emscripten_bind_btRigidBody_applyCentralImpulse_1 = function () {
                return (km = n._emscripten_bind_btRigidBody_applyCentralImpulse_1 = n.asm.Xo).apply(null, arguments)
            }, Fm = n._emscripten_bind_btRigidBody_updateInertiaTensor_0 = function () {
                return (Fm = n._emscripten_bind_btRigidBody_updateInertiaTensor_0 = n.asm.Yo).apply(null, arguments)
            }, Lm = n._emscripten_bind_btRigidBody_getLinearVelocity_0 = function () {
                return (Lm = n._emscripten_bind_btRigidBody_getLinearVelocity_0 = n.asm.Zo).apply(null, arguments)
            }, Gm = n._emscripten_bind_btRigidBody_getAngularVelocity_0 = function () {
                return (Gm = n._emscripten_bind_btRigidBody_getAngularVelocity_0 = n.asm._o).apply(null, arguments)
            }, wm = n._emscripten_bind_btRigidBody_setLinearVelocity_1 = function () {
                return (wm = n._emscripten_bind_btRigidBody_setLinearVelocity_1 = n.asm.$o).apply(null, arguments)
            }, Hm = n._emscripten_bind_btRigidBody_setAngularVelocity_1 = function () {
                return (Hm = n._emscripten_bind_btRigidBody_setAngularVelocity_1 = n.asm.ap).apply(null, arguments)
            }, Vm = n._emscripten_bind_btRigidBody_getMotionState_0 = function () {
                return (Vm = n._emscripten_bind_btRigidBody_getMotionState_0 = n.asm.bp).apply(null, arguments)
            }, Em = n._emscripten_bind_btRigidBody_setMotionState_1 = function () {
                return (Em = n._emscripten_bind_btRigidBody_setMotionState_1 = n.asm.cp).apply(null, arguments)
            }, Nm = n._emscripten_bind_btRigidBody_getAngularFactor_0 = function () {
                return (Nm = n._emscripten_bind_btRigidBody_getAngularFactor_0 = n.asm.dp).apply(null, arguments)
            }, Um = n._emscripten_bind_btRigidBody_setAngularFactor_1 = function () {
                return (Um = n._emscripten_bind_btRigidBody_setAngularFactor_1 = n.asm.ep).apply(null, arguments)
            }, zm = n._emscripten_bind_btRigidBody_upcast_1 = function () {
                return (zm = n._emscripten_bind_btRigidBody_upcast_1 = n.asm.fp).apply(null, arguments)
            }, qm = n._emscripten_bind_btRigidBody_getAabb_2 = function () {
                return (qm = n._emscripten_bind_btRigidBody_getAabb_2 = n.asm.gp).apply(null, arguments)
            }, Km = n._emscripten_bind_btRigidBody_applyGravity_0 = function () {
                return (Km = n._emscripten_bind_btRigidBody_applyGravity_0 = n.asm.hp).apply(null, arguments)
            }, Qm = n._emscripten_bind_btRigidBody_getGravity_0 = function () {
                return (Qm = n._emscripten_bind_btRigidBody_getGravity_0 = n.asm.ip).apply(null, arguments)
            }, Xm = n._emscripten_bind_btRigidBody_setGravity_1 = function () {
                return (Xm = n._emscripten_bind_btRigidBody_setGravity_1 = n.asm.jp).apply(null, arguments)
            }, Zm = n._emscripten_bind_btRigidBody_getBroadphaseProxy_0 = function () {
                return (Zm = n._emscripten_bind_btRigidBody_getBroadphaseProxy_0 = n.asm.kp).apply(null, arguments)
            }, Ym = n._emscripten_bind_btRigidBody_clearForces_0 = function () {
                return (Ym = n._emscripten_bind_btRigidBody_clearForces_0 = n.asm.lp).apply(null, arguments)
            }, Jm = n._emscripten_bind_btRigidBody_setAnisotropicFriction_2 = function () {
                return (Jm = n._emscripten_bind_btRigidBody_setAnisotropicFriction_2 = n.asm.mp).apply(null, arguments)
            }, $m = n._emscripten_bind_btRigidBody_getCollisionShape_0 = function () {
                return ($m = n._emscripten_bind_btRigidBody_getCollisionShape_0 = n.asm.np).apply(null, arguments)
            }, td = n._emscripten_bind_btRigidBody_setContactProcessingThreshold_1 = function () {
                return (td = n._emscripten_bind_btRigidBody_setContactProcessingThreshold_1 = n.asm.op).apply(null, arguments)
            }, ed = n._emscripten_bind_btRigidBody_setActivationState_1 = function () {
                return (ed = n._emscripten_bind_btRigidBody_setActivationState_1 = n.asm.pp).apply(null, arguments)
            }, nd = n._emscripten_bind_btRigidBody_forceActivationState_1 = function () {
                return (nd = n._emscripten_bind_btRigidBody_forceActivationState_1 = n.asm.qp).apply(null, arguments)
            }, od = n._emscripten_bind_btRigidBody_activate_0 = function () {
                return (od = n._emscripten_bind_btRigidBody_activate_0 = n.asm.rp).apply(null, arguments)
            }, _d = n._emscripten_bind_btRigidBody_activate_1 = function () {
                return (_d = n._emscripten_bind_btRigidBody_activate_1 = n.asm.sp).apply(null, arguments)
            }, id = n._emscripten_bind_btRigidBody_isActive_0 = function () {
                return (id = n._emscripten_bind_btRigidBody_isActive_0 = n.asm.tp).apply(null, arguments)
            }, rd = n._emscripten_bind_btRigidBody_isKinematicObject_0 = function () {
                return (rd = n._emscripten_bind_btRigidBody_isKinematicObject_0 = n.asm.up).apply(null, arguments)
            }, pd = n._emscripten_bind_btRigidBody_isStaticObject_0 = function () {
                return (pd = n._emscripten_bind_btRigidBody_isStaticObject_0 = n.asm.vp).apply(null, arguments)
            }, sd = n._emscripten_bind_btRigidBody_isStaticOrKinematicObject_0 = function () {
                return (sd = n._emscripten_bind_btRigidBody_isStaticOrKinematicObject_0 = n.asm.wp).apply(null, arguments)
            }, cd = n._emscripten_bind_btRigidBody_getRestitution_0 = function () {
                return (cd = n._emscripten_bind_btRigidBody_getRestitution_0 = n.asm.xp).apply(null, arguments)
            }, ad = n._emscripten_bind_btRigidBody_getFriction_0 = function () {
                return (ad = n._emscripten_bind_btRigidBody_getFriction_0 = n.asm.yp).apply(null, arguments)
            }, ld = n._emscripten_bind_btRigidBody_getRollingFriction_0 = function () {
                return (ld = n._emscripten_bind_btRigidBody_getRollingFriction_0 = n.asm.zp).apply(null, arguments)
            }, ud = n._emscripten_bind_btRigidBody_setRestitution_1 = function () {
                return (ud = n._emscripten_bind_btRigidBody_setRestitution_1 = n.asm.Ap).apply(null, arguments)
            }, bd = n._emscripten_bind_btRigidBody_setFriction_1 = function () {
                return (bd = n._emscripten_bind_btRigidBody_setFriction_1 = n.asm.Bp).apply(null, arguments)
            }, yd = n._emscripten_bind_btRigidBody_setRollingFriction_1 = function () {
                return (yd = n._emscripten_bind_btRigidBody_setRollingFriction_1 = n.asm.Cp).apply(null, arguments)
            }, md = n._emscripten_bind_btRigidBody_getWorldTransform_0 = function () {
                return (md = n._emscripten_bind_btRigidBody_getWorldTransform_0 = n.asm.Dp).apply(null, arguments)
            }, dd = n._emscripten_bind_btRigidBody_getCollisionFlags_0 = function () {
                return (dd = n._emscripten_bind_btRigidBody_getCollisionFlags_0 = n.asm.Ep).apply(null, arguments)
            }, fd = n._emscripten_bind_btRigidBody_setCollisionFlags_1 = function () {
                return (fd = n._emscripten_bind_btRigidBody_setCollisionFlags_1 = n.asm.Fp).apply(null, arguments)
            }, hd = n._emscripten_bind_btRigidBody_setWorldTransform_1 = function () {
                return (hd = n._emscripten_bind_btRigidBody_setWorldTransform_1 = n.asm.Gp).apply(null, arguments)
            }, Bd = n._emscripten_bind_btRigidBody_setCollisionShape_1 = function () {
                return (Bd = n._emscripten_bind_btRigidBody_setCollisionShape_1 = n.asm.Hp).apply(null, arguments)
            }, gd = n._emscripten_bind_btRigidBody_setCcdMotionThreshold_1 = function () {
                return (gd = n._emscripten_bind_btRigidBody_setCcdMotionThreshold_1 = n.asm.Ip).apply(null, arguments)
            }, Cd = n._emscripten_bind_btRigidBody_setCcdSweptSphereRadius_1 = function () {
                return (Cd = n._emscripten_bind_btRigidBody_setCcdSweptSphereRadius_1 = n.asm.Jp).apply(null, arguments)
            }, Sd = n._emscripten_bind_btRigidBody_getUserIndex_0 = function () {
                return (Sd = n._emscripten_bind_btRigidBody_getUserIndex_0 = n.asm.Kp).apply(null, arguments)
            }, jd = n._emscripten_bind_btRigidBody_setUserIndex_1 = function () {
                return (jd = n._emscripten_bind_btRigidBody_setUserIndex_1 = n.asm.Lp).apply(null, arguments)
            }, vd = n._emscripten_bind_btRigidBody_getUserPointer_0 = function () {
                return (vd = n._emscripten_bind_btRigidBody_getUserPointer_0 = n.asm.Mp).apply(null, arguments)
            }, Id = n._emscripten_bind_btRigidBody_setUserPointer_1 = function () {
                return (Id = n._emscripten_bind_btRigidBody_setUserPointer_1 = n.asm.Np).apply(null, arguments)
            }, Rd = n._emscripten_bind_btRigidBody_getBroadphaseHandle_0 = function () {
                return (Rd = n._emscripten_bind_btRigidBody_getBroadphaseHandle_0 = n.asm.Op).apply(null, arguments)
            }, Dd = n._emscripten_bind_btRigidBody___destroy___0 = function () {
                return (Dd = n._emscripten_bind_btRigidBody___destroy___0 = n.asm.Pp).apply(null, arguments)
            }, Pd = n._emscripten_bind_btConstraintSetting_btConstraintSetting_0 = function () {
                return (Pd = n._emscripten_bind_btConstraintSetting_btConstraintSetting_0 = n.asm.Qp).apply(null, arguments)
            }, Td = n._emscripten_bind_btConstraintSetting_get_m_tau_0 = function () {
                return (Td = n._emscripten_bind_btConstraintSetting_get_m_tau_0 = n.asm.Rp).apply(null, arguments)
            }, Od = n._emscripten_bind_btConstraintSetting_set_m_tau_1 = function () {
                return (Od = n._emscripten_bind_btConstraintSetting_set_m_tau_1 = n.asm.Sp).apply(null, arguments)
            }, Wd = n._emscripten_bind_btConstraintSetting_get_m_damping_0 = function () {
                return (Wd = n._emscripten_bind_btConstraintSetting_get_m_damping_0 = n.asm.Tp).apply(null, arguments)
            }, Ad = n._emscripten_bind_btConstraintSetting_set_m_damping_1 = function () {
                return (Ad = n._emscripten_bind_btConstraintSetting_set_m_damping_1 = n.asm.Up).apply(null, arguments)
            }, Md = n._emscripten_bind_btConstraintSetting_get_m_impulseClamp_0 = function () {
                return (Md = n._emscripten_bind_btConstraintSetting_get_m_impulseClamp_0 = n.asm.Vp).apply(null, arguments)
            }, xd = n._emscripten_bind_btConstraintSetting_set_m_impulseClamp_1 = function () {
                return (xd = n._emscripten_bind_btConstraintSetting_set_m_impulseClamp_1 = n.asm.Wp).apply(null, arguments)
            }, kd = n._emscripten_bind_btConstraintSetting___destroy___0 = function () {
                return (kd = n._emscripten_bind_btConstraintSetting___destroy___0 = n.asm.Xp).apply(null, arguments)
            }, Fd = n._emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_2 = function () {
                return (Fd = n._emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_2 = n.asm.Yp).apply(null, arguments)
            }, Ld = n._emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_4 = function () {
                return (Ld = n._emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_4 = n.asm.Zp).apply(null, arguments)
            }, Gd = n._emscripten_bind_btPoint2PointConstraint_setPivotA_1 = function () {
                return (Gd = n._emscripten_bind_btPoint2PointConstraint_setPivotA_1 = n.asm._p).apply(null, arguments)
            }, wd = n._emscripten_bind_btPoint2PointConstraint_setPivotB_1 = function () {
                return (wd = n._emscripten_bind_btPoint2PointConstraint_setPivotB_1 = n.asm.$p).apply(null, arguments)
            }, Hd = n._emscripten_bind_btPoint2PointConstraint_getPivotInA_0 = function () {
                return (Hd = n._emscripten_bind_btPoint2PointConstraint_getPivotInA_0 = n.asm.aq).apply(null, arguments)
            }, Vd = n._emscripten_bind_btPoint2PointConstraint_getPivotInB_0 = function () {
                return (Vd = n._emscripten_bind_btPoint2PointConstraint_getPivotInB_0 = n.asm.bq).apply(null, arguments)
            }, Ed = n._emscripten_bind_btPoint2PointConstraint_enableFeedback_1 = function () {
                return (Ed = n._emscripten_bind_btPoint2PointConstraint_enableFeedback_1 = n.asm.cq).apply(null, arguments)
            }, Nd = n._emscripten_bind_btPoint2PointConstraint_getBreakingImpulseThreshold_0 = function () {
                return (Nd = n._emscripten_bind_btPoint2PointConstraint_getBreakingImpulseThreshold_0 = n.asm.dq).apply(null, arguments)
            }, Ud = n._emscripten_bind_btPoint2PointConstraint_setBreakingImpulseThreshold_1 = function () {
                return (Ud = n._emscripten_bind_btPoint2PointConstraint_setBreakingImpulseThreshold_1 = n.asm.eq).apply(null, arguments)
            }, zd = n._emscripten_bind_btPoint2PointConstraint_getParam_2 = function () {
                return (zd = n._emscripten_bind_btPoint2PointConstraint_getParam_2 = n.asm.fq).apply(null, arguments)
            }, qd = n._emscripten_bind_btPoint2PointConstraint_setParam_3 = function () {
                return (qd = n._emscripten_bind_btPoint2PointConstraint_setParam_3 = n.asm.gq).apply(null, arguments)
            }, Kd = n._emscripten_bind_btPoint2PointConstraint_get_m_setting_0 = function () {
                return (Kd = n._emscripten_bind_btPoint2PointConstraint_get_m_setting_0 = n.asm.hq).apply(null, arguments)
            }, Qd = n._emscripten_bind_btPoint2PointConstraint_set_m_setting_1 = function () {
                return (Qd = n._emscripten_bind_btPoint2PointConstraint_set_m_setting_1 = n.asm.iq).apply(null, arguments)
            }, Xd = n._emscripten_bind_btPoint2PointConstraint___destroy___0 = function () {
                return (Xd = n._emscripten_bind_btPoint2PointConstraint___destroy___0 = n.asm.jq).apply(null, arguments)
            }, Zd = n._emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_3 = function () {
                return (Zd = n._emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_3 = n.asm.kq).apply(null, arguments)
            }, Yd = n._emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_5 = function () {
                return (Yd = n._emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_5 = n.asm.lq).apply(null, arguments)
            }, Jd = n._emscripten_bind_btGeneric6DofSpringConstraint_enableSpring_2 = function () {
                return (Jd = n._emscripten_bind_btGeneric6DofSpringConstraint_enableSpring_2 = n.asm.mq).apply(null, arguments)
            }, $d = n._emscripten_bind_btGeneric6DofSpringConstraint_setStiffness_2 = function () {
                return ($d = n._emscripten_bind_btGeneric6DofSpringConstraint_setStiffness_2 = n.asm.nq).apply(null, arguments)
            }, tf = n._emscripten_bind_btGeneric6DofSpringConstraint_setDamping_2 = function () {
                return (tf = n._emscripten_bind_btGeneric6DofSpringConstraint_setDamping_2 = n.asm.oq).apply(null, arguments)
            }, ef = n._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_0 = function () {
                return (ef = n._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_0 = n.asm.pq).apply(null, arguments)
            }, nf = n._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_1 = function () {
                return (nf = n._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_1 = n.asm.qq).apply(null, arguments)
            }, of = n._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_2 = function () {
                return (of = n._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_2 = n.asm.rq).apply(null, arguments)
            }, _f = n._emscripten_bind_btGeneric6DofSpringConstraint_setLinearLowerLimit_1 = function () {
                return (_f = n._emscripten_bind_btGeneric6DofSpringConstraint_setLinearLowerLimit_1 = n.asm.sq).apply(null, arguments)
            }, rf = n._emscripten_bind_btGeneric6DofSpringConstraint_setLinearUpperLimit_1 = function () {
                return (rf = n._emscripten_bind_btGeneric6DofSpringConstraint_setLinearUpperLimit_1 = n.asm.tq).apply(null, arguments)
            }, pf = n._emscripten_bind_btGeneric6DofSpringConstraint_setAngularLowerLimit_1 = function () {
                return (pf = n._emscripten_bind_btGeneric6DofSpringConstraint_setAngularLowerLimit_1 = n.asm.uq).apply(null, arguments)
            }, sf = n._emscripten_bind_btGeneric6DofSpringConstraint_setAngularUpperLimit_1 = function () {
                return (sf = n._emscripten_bind_btGeneric6DofSpringConstraint_setAngularUpperLimit_1 = n.asm.vq).apply(null, arguments)
            }, cf = n._emscripten_bind_btGeneric6DofSpringConstraint_getFrameOffsetA_0 = function () {
                return (cf = n._emscripten_bind_btGeneric6DofSpringConstraint_getFrameOffsetA_0 = n.asm.wq).apply(null, arguments)
            }, af = n._emscripten_bind_btGeneric6DofSpringConstraint_enableFeedback_1 = function () {
                return (af = n._emscripten_bind_btGeneric6DofSpringConstraint_enableFeedback_1 = n.asm.xq).apply(null, arguments)
            }, lf = n._emscripten_bind_btGeneric6DofSpringConstraint_getBreakingImpulseThreshold_0 = function () {
                return (lf = n._emscripten_bind_btGeneric6DofSpringConstraint_getBreakingImpulseThreshold_0 = n.asm.yq).apply(null, arguments)
            }, uf = n._emscripten_bind_btGeneric6DofSpringConstraint_setBreakingImpulseThreshold_1 = function () {
                return (uf = n._emscripten_bind_btGeneric6DofSpringConstraint_setBreakingImpulseThreshold_1 = n.asm.zq).apply(null, arguments)
            }, bf = n._emscripten_bind_btGeneric6DofSpringConstraint_getParam_2 = function () {
                return (bf = n._emscripten_bind_btGeneric6DofSpringConstraint_getParam_2 = n.asm.Aq).apply(null, arguments)
            }, yf = n._emscripten_bind_btGeneric6DofSpringConstraint_setParam_3 = function () {
                return (yf = n._emscripten_bind_btGeneric6DofSpringConstraint_setParam_3 = n.asm.Bq).apply(null, arguments)
            }, mf = n._emscripten_bind_btGeneric6DofSpringConstraint___destroy___0 = function () {
                return (mf = n._emscripten_bind_btGeneric6DofSpringConstraint___destroy___0 = n.asm.Cq).apply(null, arguments)
            },
            df = n._emscripten_bind_btSequentialImpulseConstraintSolver_btSequentialImpulseConstraintSolver_0 = function () {
                return (df = n._emscripten_bind_btSequentialImpulseConstraintSolver_btSequentialImpulseConstraintSolver_0 = n.asm.Dq).apply(null, arguments)
            }, ff = n._emscripten_bind_btSequentialImpulseConstraintSolver___destroy___0 = function () {
                return (ff = n._emscripten_bind_btSequentialImpulseConstraintSolver___destroy___0 = n.asm.Eq).apply(null, arguments)
            }, hf = n._emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_2 = function () {
                return (hf = n._emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_2 = n.asm.Fq).apply(null, arguments)
            }, Bf = n._emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_4 = function () {
                return (Bf = n._emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_4 = n.asm.Gq).apply(null, arguments)
            }, gf = n._emscripten_bind_btConeTwistConstraint_setLimit_2 = function () {
                return (gf = n._emscripten_bind_btConeTwistConstraint_setLimit_2 = n.asm.Hq).apply(null, arguments)
            }, Cf = n._emscripten_bind_btConeTwistConstraint_setAngularOnly_1 = function () {
                return (Cf = n._emscripten_bind_btConeTwistConstraint_setAngularOnly_1 = n.asm.Iq).apply(null, arguments)
            }, Sf = n._emscripten_bind_btConeTwistConstraint_setDamping_1 = function () {
                return (Sf = n._emscripten_bind_btConeTwistConstraint_setDamping_1 = n.asm.Jq).apply(null, arguments)
            }, jf = n._emscripten_bind_btConeTwistConstraint_enableMotor_1 = function () {
                return (jf = n._emscripten_bind_btConeTwistConstraint_enableMotor_1 = n.asm.Kq).apply(null, arguments)
            }, vf = n._emscripten_bind_btConeTwistConstraint_setMaxMotorImpulse_1 = function () {
                return (vf = n._emscripten_bind_btConeTwistConstraint_setMaxMotorImpulse_1 = n.asm.Lq).apply(null, arguments)
            }, If = n._emscripten_bind_btConeTwistConstraint_setMaxMotorImpulseNormalized_1 = function () {
                return (If = n._emscripten_bind_btConeTwistConstraint_setMaxMotorImpulseNormalized_1 = n.asm.Mq).apply(null, arguments)
            }, Rf = n._emscripten_bind_btConeTwistConstraint_setMotorTarget_1 = function () {
                return (Rf = n._emscripten_bind_btConeTwistConstraint_setMotorTarget_1 = n.asm.Nq).apply(null, arguments)
            }, Df = n._emscripten_bind_btConeTwistConstraint_setMotorTargetInConstraintSpace_1 = function () {
                return (Df = n._emscripten_bind_btConeTwistConstraint_setMotorTargetInConstraintSpace_1 = n.asm.Oq).apply(null, arguments)
            }, Pf = n._emscripten_bind_btConeTwistConstraint_enableFeedback_1 = function () {
                return (Pf = n._emscripten_bind_btConeTwistConstraint_enableFeedback_1 = n.asm.Pq).apply(null, arguments)
            }, Tf = n._emscripten_bind_btConeTwistConstraint_getBreakingImpulseThreshold_0 = function () {
                return (Tf = n._emscripten_bind_btConeTwistConstraint_getBreakingImpulseThreshold_0 = n.asm.Qq).apply(null, arguments)
            }, Of = n._emscripten_bind_btConeTwistConstraint_setBreakingImpulseThreshold_1 = function () {
                return (Of = n._emscripten_bind_btConeTwistConstraint_setBreakingImpulseThreshold_1 = n.asm.Rq).apply(null, arguments)
            }, Wf = n._emscripten_bind_btConeTwistConstraint_getParam_2 = function () {
                return (Wf = n._emscripten_bind_btConeTwistConstraint_getParam_2 = n.asm.Sq).apply(null, arguments)
            }, Af = n._emscripten_bind_btConeTwistConstraint_setParam_3 = function () {
                return (Af = n._emscripten_bind_btConeTwistConstraint_setParam_3 = n.asm.Tq).apply(null, arguments)
            }, Mf = n._emscripten_bind_btConeTwistConstraint___destroy___0 = function () {
                return (Mf = n._emscripten_bind_btConeTwistConstraint___destroy___0 = n.asm.Uq).apply(null, arguments)
            }, xf = n._emscripten_bind_btHingeConstraint_btHingeConstraint_2 = function () {
                return (xf = n._emscripten_bind_btHingeConstraint_btHingeConstraint_2 = n.asm.Vq).apply(null, arguments)
            }, kf = n._emscripten_bind_btHingeConstraint_btHingeConstraint_3 = function () {
                return (kf = n._emscripten_bind_btHingeConstraint_btHingeConstraint_3 = n.asm.Wq).apply(null, arguments)
            }, Ff = n._emscripten_bind_btHingeConstraint_btHingeConstraint_4 = function () {
                return (Ff = n._emscripten_bind_btHingeConstraint_btHingeConstraint_4 = n.asm.Xq).apply(null, arguments)
            }, Lf = n._emscripten_bind_btHingeConstraint_btHingeConstraint_5 = function () {
                return (Lf = n._emscripten_bind_btHingeConstraint_btHingeConstraint_5 = n.asm.Yq).apply(null, arguments)
            }, Gf = n._emscripten_bind_btHingeConstraint_btHingeConstraint_6 = function () {
                return (Gf = n._emscripten_bind_btHingeConstraint_btHingeConstraint_6 = n.asm.Zq).apply(null, arguments)
            }, wf = n._emscripten_bind_btHingeConstraint_btHingeConstraint_7 = function () {
                return (wf = n._emscripten_bind_btHingeConstraint_btHingeConstraint_7 = n.asm._q).apply(null, arguments)
            }, Hf = n._emscripten_bind_btHingeConstraint_getHingeAngle_0 = function () {
                return (Hf = n._emscripten_bind_btHingeConstraint_getHingeAngle_0 = n.asm.$q).apply(null, arguments)
            }, Vf = n._emscripten_bind_btHingeConstraint_setLimit_4 = function () {
                return (Vf = n._emscripten_bind_btHingeConstraint_setLimit_4 = n.asm.ar).apply(null, arguments)
            }, Ef = n._emscripten_bind_btHingeConstraint_setLimit_5 = function () {
                return (Ef = n._emscripten_bind_btHingeConstraint_setLimit_5 = n.asm.br).apply(null, arguments)
            }, Nf = n._emscripten_bind_btHingeConstraint_enableAngularMotor_3 = function () {
                return (Nf = n._emscripten_bind_btHingeConstraint_enableAngularMotor_3 = n.asm.cr).apply(null, arguments)
            }, Uf = n._emscripten_bind_btHingeConstraint_setAngularOnly_1 = function () {
                return (Uf = n._emscripten_bind_btHingeConstraint_setAngularOnly_1 = n.asm.dr).apply(null, arguments)
            }, zf = n._emscripten_bind_btHingeConstraint_enableMotor_1 = function () {
                return (zf = n._emscripten_bind_btHingeConstraint_enableMotor_1 = n.asm.er).apply(null, arguments)
            }, qf = n._emscripten_bind_btHingeConstraint_setMaxMotorImpulse_1 = function () {
                return (qf = n._emscripten_bind_btHingeConstraint_setMaxMotorImpulse_1 = n.asm.fr).apply(null, arguments)
            }, Kf = n._emscripten_bind_btHingeConstraint_setMotorTarget_2 = function () {
                return (Kf = n._emscripten_bind_btHingeConstraint_setMotorTarget_2 = n.asm.gr).apply(null, arguments)
            }, Qf = n._emscripten_bind_btHingeConstraint_enableFeedback_1 = function () {
                return (Qf = n._emscripten_bind_btHingeConstraint_enableFeedback_1 = n.asm.hr).apply(null, arguments)
            }, Xf = n._emscripten_bind_btHingeConstraint_getBreakingImpulseThreshold_0 = function () {
                return (Xf = n._emscripten_bind_btHingeConstraint_getBreakingImpulseThreshold_0 = n.asm.ir).apply(null, arguments)
            }, Zf = n._emscripten_bind_btHingeConstraint_setBreakingImpulseThreshold_1 = function () {
                return (Zf = n._emscripten_bind_btHingeConstraint_setBreakingImpulseThreshold_1 = n.asm.jr).apply(null, arguments)
            }, Yf = n._emscripten_bind_btHingeConstraint_getParam_2 = function () {
                return (Yf = n._emscripten_bind_btHingeConstraint_getParam_2 = n.asm.kr).apply(null, arguments)
            }, Jf = n._emscripten_bind_btHingeConstraint_setParam_3 = function () {
                return (Jf = n._emscripten_bind_btHingeConstraint_setParam_3 = n.asm.lr).apply(null, arguments)
            }, $f = n._emscripten_bind_btHingeConstraint___destroy___0 = function () {
                return ($f = n._emscripten_bind_btHingeConstraint___destroy___0 = n.asm.mr).apply(null, arguments)
            }, th = n._emscripten_bind_btSliderConstraint_btSliderConstraint_3 = function () {
                return (th = n._emscripten_bind_btSliderConstraint_btSliderConstraint_3 = n.asm.nr).apply(null, arguments)
            }, eh = n._emscripten_bind_btSliderConstraint_btSliderConstraint_5 = function () {
                return (eh = n._emscripten_bind_btSliderConstraint_btSliderConstraint_5 = n.asm.or).apply(null, arguments)
            }, nh = n._emscripten_bind_btSliderConstraint_getLinearPos_0 = function () {
                return (nh = n._emscripten_bind_btSliderConstraint_getLinearPos_0 = n.asm.pr).apply(null, arguments)
            }, oh = n._emscripten_bind_btSliderConstraint_getAngularPos_0 = function () {
                return (oh = n._emscripten_bind_btSliderConstraint_getAngularPos_0 = n.asm.qr).apply(null, arguments)
            }, _h = n._emscripten_bind_btSliderConstraint_setLowerLinLimit_1 = function () {
                return (_h = n._emscripten_bind_btSliderConstraint_setLowerLinLimit_1 = n.asm.rr).apply(null, arguments)
            }, ih = n._emscripten_bind_btSliderConstraint_setUpperLinLimit_1 = function () {
                return (ih = n._emscripten_bind_btSliderConstraint_setUpperLinLimit_1 = n.asm.sr).apply(null, arguments)
            }, rh = n._emscripten_bind_btSliderConstraint_setLowerAngLimit_1 = function () {
                return (rh = n._emscripten_bind_btSliderConstraint_setLowerAngLimit_1 = n.asm.tr).apply(null, arguments)
            }, ph = n._emscripten_bind_btSliderConstraint_setUpperAngLimit_1 = function () {
                return (ph = n._emscripten_bind_btSliderConstraint_setUpperAngLimit_1 = n.asm.ur).apply(null, arguments)
            }, sh = n._emscripten_bind_btSliderConstraint_setPoweredLinMotor_1 = function () {
                return (sh = n._emscripten_bind_btSliderConstraint_setPoweredLinMotor_1 = n.asm.vr).apply(null, arguments)
            }, ch = n._emscripten_bind_btSliderConstraint_setMaxLinMotorForce_1 = function () {
                return (ch = n._emscripten_bind_btSliderConstraint_setMaxLinMotorForce_1 = n.asm.wr).apply(null, arguments)
            }, ah = n._emscripten_bind_btSliderConstraint_setTargetLinMotorVelocity_1 = function () {
                return (ah = n._emscripten_bind_btSliderConstraint_setTargetLinMotorVelocity_1 = n.asm.xr).apply(null, arguments)
            }, lh = n._emscripten_bind_btSliderConstraint_enableFeedback_1 = function () {
                return (lh = n._emscripten_bind_btSliderConstraint_enableFeedback_1 = n.asm.yr).apply(null, arguments)
            }, uh = n._emscripten_bind_btSliderConstraint_getBreakingImpulseThreshold_0 = function () {
                return (uh = n._emscripten_bind_btSliderConstraint_getBreakingImpulseThreshold_0 = n.asm.zr).apply(null, arguments)
            }, bh = n._emscripten_bind_btSliderConstraint_setBreakingImpulseThreshold_1 = function () {
                return (bh = n._emscripten_bind_btSliderConstraint_setBreakingImpulseThreshold_1 = n.asm.Ar).apply(null, arguments)
            }, yh = n._emscripten_bind_btSliderConstraint_getParam_2 = function () {
                return (yh = n._emscripten_bind_btSliderConstraint_getParam_2 = n.asm.Br).apply(null, arguments)
            }, mh = n._emscripten_bind_btSliderConstraint_setParam_3 = function () {
                return (mh = n._emscripten_bind_btSliderConstraint_setParam_3 = n.asm.Cr).apply(null, arguments)
            }, dh = n._emscripten_bind_btSliderConstraint___destroy___0 = function () {
                return (dh = n._emscripten_bind_btSliderConstraint___destroy___0 = n.asm.Dr).apply(null, arguments)
            }, fh = n._emscripten_bind_btFixedConstraint_btFixedConstraint_4 = function () {
                return (fh = n._emscripten_bind_btFixedConstraint_btFixedConstraint_4 = n.asm.Er).apply(null, arguments)
            }, hh = n._emscripten_bind_btFixedConstraint_enableFeedback_1 = function () {
                return (hh = n._emscripten_bind_btFixedConstraint_enableFeedback_1 = n.asm.Fr).apply(null, arguments)
            }, Bh = n._emscripten_bind_btFixedConstraint_getBreakingImpulseThreshold_0 = function () {
                return (Bh = n._emscripten_bind_btFixedConstraint_getBreakingImpulseThreshold_0 = n.asm.Gr).apply(null, arguments)
            }, gh = n._emscripten_bind_btFixedConstraint_setBreakingImpulseThreshold_1 = function () {
                return (gh = n._emscripten_bind_btFixedConstraint_setBreakingImpulseThreshold_1 = n.asm.Hr).apply(null, arguments)
            }, Ch = n._emscripten_bind_btFixedConstraint_getParam_2 = function () {
                return (Ch = n._emscripten_bind_btFixedConstraint_getParam_2 = n.asm.Ir).apply(null, arguments)
            }, Sh = n._emscripten_bind_btFixedConstraint_setParam_3 = function () {
                return (Sh = n._emscripten_bind_btFixedConstraint_setParam_3 = n.asm.Jr).apply(null, arguments)
            }, jh = n._emscripten_bind_btFixedConstraint___destroy___0 = function () {
                return (jh = n._emscripten_bind_btFixedConstraint___destroy___0 = n.asm.Kr).apply(null, arguments)
            }, vh = n._emscripten_bind_btConstraintSolver___destroy___0 = function () {
                return (vh = n._emscripten_bind_btConstraintSolver___destroy___0 = n.asm.Lr).apply(null, arguments)
            }, Ih = n._emscripten_bind_btDispatcherInfo_get_m_timeStep_0 = function () {
                return (Ih = n._emscripten_bind_btDispatcherInfo_get_m_timeStep_0 = n.asm.Mr).apply(null, arguments)
            }, Rh = n._emscripten_bind_btDispatcherInfo_set_m_timeStep_1 = function () {
                return (Rh = n._emscripten_bind_btDispatcherInfo_set_m_timeStep_1 = n.asm.Nr).apply(null, arguments)
            }, Dh = n._emscripten_bind_btDispatcherInfo_get_m_stepCount_0 = function () {
                return (Dh = n._emscripten_bind_btDispatcherInfo_get_m_stepCount_0 = n.asm.Or).apply(null, arguments)
            }, Ph = n._emscripten_bind_btDispatcherInfo_set_m_stepCount_1 = function () {
                return (Ph = n._emscripten_bind_btDispatcherInfo_set_m_stepCount_1 = n.asm.Pr).apply(null, arguments)
            }, Th = n._emscripten_bind_btDispatcherInfo_get_m_dispatchFunc_0 = function () {
                return (Th = n._emscripten_bind_btDispatcherInfo_get_m_dispatchFunc_0 = n.asm.Qr).apply(null, arguments)
            }, Oh = n._emscripten_bind_btDispatcherInfo_set_m_dispatchFunc_1 = function () {
                return (Oh = n._emscripten_bind_btDispatcherInfo_set_m_dispatchFunc_1 = n.asm.Rr).apply(null, arguments)
            }, Wh = n._emscripten_bind_btDispatcherInfo_get_m_timeOfImpact_0 = function () {
                return (Wh = n._emscripten_bind_btDispatcherInfo_get_m_timeOfImpact_0 = n.asm.Sr).apply(null, arguments)
            }, Ah = n._emscripten_bind_btDispatcherInfo_set_m_timeOfImpact_1 = function () {
                return (Ah = n._emscripten_bind_btDispatcherInfo_set_m_timeOfImpact_1 = n.asm.Tr).apply(null, arguments)
            }, Mh = n._emscripten_bind_btDispatcherInfo_get_m_useContinuous_0 = function () {
                return (Mh = n._emscripten_bind_btDispatcherInfo_get_m_useContinuous_0 = n.asm.Ur).apply(null, arguments)
            }, xh = n._emscripten_bind_btDispatcherInfo_set_m_useContinuous_1 = function () {
                return (xh = n._emscripten_bind_btDispatcherInfo_set_m_useContinuous_1 = n.asm.Vr).apply(null, arguments)
            }, kh = n._emscripten_bind_btDispatcherInfo_get_m_enableSatConvex_0 = function () {
                return (kh = n._emscripten_bind_btDispatcherInfo_get_m_enableSatConvex_0 = n.asm.Wr).apply(null, arguments)
            }, Fh = n._emscripten_bind_btDispatcherInfo_set_m_enableSatConvex_1 = function () {
                return (Fh = n._emscripten_bind_btDispatcherInfo_set_m_enableSatConvex_1 = n.asm.Xr).apply(null, arguments)
            }, Lh = n._emscripten_bind_btDispatcherInfo_get_m_enableSPU_0 = function () {
                return (Lh = n._emscripten_bind_btDispatcherInfo_get_m_enableSPU_0 = n.asm.Yr).apply(null, arguments)
            }, Gh = n._emscripten_bind_btDispatcherInfo_set_m_enableSPU_1 = function () {
                return (Gh = n._emscripten_bind_btDispatcherInfo_set_m_enableSPU_1 = n.asm.Zr).apply(null, arguments)
            }, wh = n._emscripten_bind_btDispatcherInfo_get_m_useEpa_0 = function () {
                return (wh = n._emscripten_bind_btDispatcherInfo_get_m_useEpa_0 = n.asm._r).apply(null, arguments)
            }, Hh = n._emscripten_bind_btDispatcherInfo_set_m_useEpa_1 = function () {
                return (Hh = n._emscripten_bind_btDispatcherInfo_set_m_useEpa_1 = n.asm.$r).apply(null, arguments)
            }, Vh = n._emscripten_bind_btDispatcherInfo_get_m_allowedCcdPenetration_0 = function () {
                return (Vh = n._emscripten_bind_btDispatcherInfo_get_m_allowedCcdPenetration_0 = n.asm.as).apply(null, arguments)
            }, Eh = n._emscripten_bind_btDispatcherInfo_set_m_allowedCcdPenetration_1 = function () {
                return (Eh = n._emscripten_bind_btDispatcherInfo_set_m_allowedCcdPenetration_1 = n.asm.bs).apply(null, arguments)
            }, Nh = n._emscripten_bind_btDispatcherInfo_get_m_useConvexConservativeDistanceUtil_0 = function () {
                return (Nh = n._emscripten_bind_btDispatcherInfo_get_m_useConvexConservativeDistanceUtil_0 = n.asm.cs).apply(null, arguments)
            }, Uh = n._emscripten_bind_btDispatcherInfo_set_m_useConvexConservativeDistanceUtil_1 = function () {
                return (Uh = n._emscripten_bind_btDispatcherInfo_set_m_useConvexConservativeDistanceUtil_1 = n.asm.ds).apply(null, arguments)
            }, zh = n._emscripten_bind_btDispatcherInfo_get_m_convexConservativeDistanceThreshold_0 = function () {
                return (zh = n._emscripten_bind_btDispatcherInfo_get_m_convexConservativeDistanceThreshold_0 = n.asm.es).apply(null, arguments)
            }, qh = n._emscripten_bind_btDispatcherInfo_set_m_convexConservativeDistanceThreshold_1 = function () {
                return (qh = n._emscripten_bind_btDispatcherInfo_set_m_convexConservativeDistanceThreshold_1 = n.asm.fs).apply(null, arguments)
            }, Kh = n._emscripten_bind_btDispatcherInfo___destroy___0 = function () {
                return (Kh = n._emscripten_bind_btDispatcherInfo___destroy___0 = n.asm.gs).apply(null, arguments)
            }, Qh = n._emscripten_bind_btContactSolverInfo_get_m_splitImpulse_0 = function () {
                return (Qh = n._emscripten_bind_btContactSolverInfo_get_m_splitImpulse_0 = n.asm.hs).apply(null, arguments)
            }, Xh = n._emscripten_bind_btContactSolverInfo_set_m_splitImpulse_1 = function () {
                return (Xh = n._emscripten_bind_btContactSolverInfo_set_m_splitImpulse_1 = n.asm.is).apply(null, arguments)
            }, Zh = n._emscripten_bind_btContactSolverInfo_get_m_splitImpulsePenetrationThreshold_0 = function () {
                return (Zh = n._emscripten_bind_btContactSolverInfo_get_m_splitImpulsePenetrationThreshold_0 = n.asm.js).apply(null, arguments)
            }, Yh = n._emscripten_bind_btContactSolverInfo_set_m_splitImpulsePenetrationThreshold_1 = function () {
                return (Yh = n._emscripten_bind_btContactSolverInfo_set_m_splitImpulsePenetrationThreshold_1 = n.asm.ks).apply(null, arguments)
            }, Jh = n._emscripten_bind_btContactSolverInfo_get_m_numIterations_0 = function () {
                return (Jh = n._emscripten_bind_btContactSolverInfo_get_m_numIterations_0 = n.asm.ls).apply(null, arguments)
            }, $h = n._emscripten_bind_btContactSolverInfo_set_m_numIterations_1 = function () {
                return ($h = n._emscripten_bind_btContactSolverInfo_set_m_numIterations_1 = n.asm.ms).apply(null, arguments)
            }, tB = n._emscripten_bind_btContactSolverInfo___destroy___0 = function () {
                return (tB = n._emscripten_bind_btContactSolverInfo___destroy___0 = n.asm.ns).apply(null, arguments)
            }, eB = n._emscripten_bind_btVehicleTuning_btVehicleTuning_0 = function () {
                return (eB = n._emscripten_bind_btVehicleTuning_btVehicleTuning_0 = n.asm.os).apply(null, arguments)
            }, nB = n._emscripten_bind_btVehicleTuning_get_m_suspensionStiffness_0 = function () {
                return (nB = n._emscripten_bind_btVehicleTuning_get_m_suspensionStiffness_0 = n.asm.ps).apply(null, arguments)
            }, oB = n._emscripten_bind_btVehicleTuning_set_m_suspensionStiffness_1 = function () {
                return (oB = n._emscripten_bind_btVehicleTuning_set_m_suspensionStiffness_1 = n.asm.qs).apply(null, arguments)
            }, _B = n._emscripten_bind_btVehicleTuning_get_m_suspensionCompression_0 = function () {
                return (_B = n._emscripten_bind_btVehicleTuning_get_m_suspensionCompression_0 = n.asm.rs).apply(null, arguments)
            }, iB = n._emscripten_bind_btVehicleTuning_set_m_suspensionCompression_1 = function () {
                return (iB = n._emscripten_bind_btVehicleTuning_set_m_suspensionCompression_1 = n.asm.ss).apply(null, arguments)
            }, rB = n._emscripten_bind_btVehicleTuning_get_m_suspensionDamping_0 = function () {
                return (rB = n._emscripten_bind_btVehicleTuning_get_m_suspensionDamping_0 = n.asm.ts).apply(null, arguments)
            }, pB = n._emscripten_bind_btVehicleTuning_set_m_suspensionDamping_1 = function () {
                return (pB = n._emscripten_bind_btVehicleTuning_set_m_suspensionDamping_1 = n.asm.us).apply(null, arguments)
            }, sB = n._emscripten_bind_btVehicleTuning_get_m_maxSuspensionTravelCm_0 = function () {
                return (sB = n._emscripten_bind_btVehicleTuning_get_m_maxSuspensionTravelCm_0 = n.asm.vs).apply(null, arguments)
            }, cB = n._emscripten_bind_btVehicleTuning_set_m_maxSuspensionTravelCm_1 = function () {
                return (cB = n._emscripten_bind_btVehicleTuning_set_m_maxSuspensionTravelCm_1 = n.asm.ws).apply(null, arguments)
            }, aB = n._emscripten_bind_btVehicleTuning_get_m_frictionSlip_0 = function () {
                return (aB = n._emscripten_bind_btVehicleTuning_get_m_frictionSlip_0 = n.asm.xs).apply(null, arguments)
            }, lB = n._emscripten_bind_btVehicleTuning_set_m_frictionSlip_1 = function () {
                return (lB = n._emscripten_bind_btVehicleTuning_set_m_frictionSlip_1 = n.asm.ys).apply(null, arguments)
            }, uB = n._emscripten_bind_btVehicleTuning_get_m_maxSuspensionForce_0 = function () {
                return (uB = n._emscripten_bind_btVehicleTuning_get_m_maxSuspensionForce_0 = n.asm.zs).apply(null, arguments)
            }, bB = n._emscripten_bind_btVehicleTuning_set_m_maxSuspensionForce_1 = function () {
                return (bB = n._emscripten_bind_btVehicleTuning_set_m_maxSuspensionForce_1 = n.asm.As).apply(null, arguments)
            }, yB = n._emscripten_bind_btVehicleRaycasterResult_get_m_hitPointInWorld_0 = function () {
                return (yB = n._emscripten_bind_btVehicleRaycasterResult_get_m_hitPointInWorld_0 = n.asm.Bs).apply(null, arguments)
            }, mB = n._emscripten_bind_btVehicleRaycasterResult_set_m_hitPointInWorld_1 = function () {
                return (mB = n._emscripten_bind_btVehicleRaycasterResult_set_m_hitPointInWorld_1 = n.asm.Cs).apply(null, arguments)
            }, dB = n._emscripten_bind_btVehicleRaycasterResult_get_m_hitNormalInWorld_0 = function () {
                return (dB = n._emscripten_bind_btVehicleRaycasterResult_get_m_hitNormalInWorld_0 = n.asm.Ds).apply(null, arguments)
            }, fB = n._emscripten_bind_btVehicleRaycasterResult_set_m_hitNormalInWorld_1 = function () {
                return (fB = n._emscripten_bind_btVehicleRaycasterResult_set_m_hitNormalInWorld_1 = n.asm.Es).apply(null, arguments)
            }, hB = n._emscripten_bind_btVehicleRaycasterResult_get_m_distFraction_0 = function () {
                return (hB = n._emscripten_bind_btVehicleRaycasterResult_get_m_distFraction_0 = n.asm.Fs).apply(null, arguments)
            }, BB = n._emscripten_bind_btVehicleRaycasterResult_set_m_distFraction_1 = function () {
                return (BB = n._emscripten_bind_btVehicleRaycasterResult_set_m_distFraction_1 = n.asm.Gs).apply(null, arguments)
            }, gB = n._emscripten_bind_btVehicleRaycasterResult___destroy___0 = function () {
                return (gB = n._emscripten_bind_btVehicleRaycasterResult___destroy___0 = n.asm.Hs).apply(null, arguments)
            }, CB = n._emscripten_bind_btDefaultVehicleRaycaster_btDefaultVehicleRaycaster_1 = function () {
                return (CB = n._emscripten_bind_btDefaultVehicleRaycaster_btDefaultVehicleRaycaster_1 = n.asm.Is).apply(null, arguments)
            }, SB = n._emscripten_bind_btDefaultVehicleRaycaster_castRay_3 = function () {
                return (SB = n._emscripten_bind_btDefaultVehicleRaycaster_castRay_3 = n.asm.Js).apply(null, arguments)
            }, jB = n._emscripten_bind_btDefaultVehicleRaycaster___destroy___0 = function () {
                return (jB = n._emscripten_bind_btDefaultVehicleRaycaster___destroy___0 = n.asm.Ks).apply(null, arguments)
            }, vB = n._emscripten_bind_RaycastInfo_get_m_contactNormalWS_0 = function () {
                return (vB = n._emscripten_bind_RaycastInfo_get_m_contactNormalWS_0 = n.asm.Ls).apply(null, arguments)
            }, IB = n._emscripten_bind_RaycastInfo_set_m_contactNormalWS_1 = function () {
                return (IB = n._emscripten_bind_RaycastInfo_set_m_contactNormalWS_1 = n.asm.Ms).apply(null, arguments)
            }, RB = n._emscripten_bind_RaycastInfo_get_m_contactPointWS_0 = function () {
                return (RB = n._emscripten_bind_RaycastInfo_get_m_contactPointWS_0 = n.asm.Ns).apply(null, arguments)
            }, DB = n._emscripten_bind_RaycastInfo_set_m_contactPointWS_1 = function () {
                return (DB = n._emscripten_bind_RaycastInfo_set_m_contactPointWS_1 = n.asm.Os).apply(null, arguments)
            }, PB = n._emscripten_bind_RaycastInfo_get_m_suspensionLength_0 = function () {
                return (PB = n._emscripten_bind_RaycastInfo_get_m_suspensionLength_0 = n.asm.Ps).apply(null, arguments)
            }, TB = n._emscripten_bind_RaycastInfo_set_m_suspensionLength_1 = function () {
                return (TB = n._emscripten_bind_RaycastInfo_set_m_suspensionLength_1 = n.asm.Qs).apply(null, arguments)
            }, OB = n._emscripten_bind_RaycastInfo_get_m_hardPointWS_0 = function () {
                return (OB = n._emscripten_bind_RaycastInfo_get_m_hardPointWS_0 = n.asm.Rs).apply(null, arguments)
            }, WB = n._emscripten_bind_RaycastInfo_set_m_hardPointWS_1 = function () {
                return (WB = n._emscripten_bind_RaycastInfo_set_m_hardPointWS_1 = n.asm.Ss).apply(null, arguments)
            }, AB = n._emscripten_bind_RaycastInfo_get_m_wheelDirectionWS_0 = function () {
                return (AB = n._emscripten_bind_RaycastInfo_get_m_wheelDirectionWS_0 = n.asm.Ts).apply(null, arguments)
            }, MB = n._emscripten_bind_RaycastInfo_set_m_wheelDirectionWS_1 = function () {
                return (MB = n._emscripten_bind_RaycastInfo_set_m_wheelDirectionWS_1 = n.asm.Us).apply(null, arguments)
            }, xB = n._emscripten_bind_RaycastInfo_get_m_wheelAxleWS_0 = function () {
                return (xB = n._emscripten_bind_RaycastInfo_get_m_wheelAxleWS_0 = n.asm.Vs).apply(null, arguments)
            }, kB = n._emscripten_bind_RaycastInfo_set_m_wheelAxleWS_1 = function () {
                return (kB = n._emscripten_bind_RaycastInfo_set_m_wheelAxleWS_1 = n.asm.Ws).apply(null, arguments)
            }, FB = n._emscripten_bind_RaycastInfo_get_m_isInContact_0 = function () {
                return (FB = n._emscripten_bind_RaycastInfo_get_m_isInContact_0 = n.asm.Xs).apply(null, arguments)
            }, LB = n._emscripten_bind_RaycastInfo_set_m_isInContact_1 = function () {
                return (LB = n._emscripten_bind_RaycastInfo_set_m_isInContact_1 = n.asm.Ys).apply(null, arguments)
            }, GB = n._emscripten_bind_RaycastInfo_get_m_groundObject_0 = function () {
                return (GB = n._emscripten_bind_RaycastInfo_get_m_groundObject_0 = n.asm.Zs).apply(null, arguments)
            }, wB = n._emscripten_bind_RaycastInfo_set_m_groundObject_1 = function () {
                return (wB = n._emscripten_bind_RaycastInfo_set_m_groundObject_1 = n.asm._s).apply(null, arguments)
            }, HB = n._emscripten_bind_RaycastInfo___destroy___0 = function () {
                return (HB = n._emscripten_bind_RaycastInfo___destroy___0 = n.asm.$s).apply(null, arguments)
            }, VB = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_chassisConnectionCS_0 = function () {
                return (VB = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_chassisConnectionCS_0 = n.asm.at).apply(null, arguments)
            }, EB = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_chassisConnectionCS_1 = function () {
                return (EB = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_chassisConnectionCS_1 = n.asm.bt).apply(null, arguments)
            }, NB = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelDirectionCS_0 = function () {
                return (NB = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelDirectionCS_0 = n.asm.ct).apply(null, arguments)
            }, UB = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelDirectionCS_1 = function () {
                return (UB = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelDirectionCS_1 = n.asm.dt).apply(null, arguments)
            }, zB = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelAxleCS_0 = function () {
                return (zB = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelAxleCS_0 = n.asm.et).apply(null, arguments)
            }, qB = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelAxleCS_1 = function () {
                return (qB = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelAxleCS_1 = n.asm.ft).apply(null, arguments)
            }, KB = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_suspensionRestLength_0 = function () {
                return (KB = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_suspensionRestLength_0 = n.asm.gt).apply(null, arguments)
            }, QB = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_suspensionRestLength_1 = function () {
                return (QB = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_suspensionRestLength_1 = n.asm.ht).apply(null, arguments)
            }, XB = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_maxSuspensionTravelCm_0 = function () {
                return (XB = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_maxSuspensionTravelCm_0 = n.asm.it).apply(null, arguments)
            }, ZB = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_maxSuspensionTravelCm_1 = function () {
                return (ZB = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_maxSuspensionTravelCm_1 = n.asm.jt).apply(null, arguments)
            }, YB = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelRadius_0 = function () {
                return (YB = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelRadius_0 = n.asm.kt).apply(null, arguments)
            }, JB = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelRadius_1 = function () {
                return (JB = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelRadius_1 = n.asm.lt).apply(null, arguments)
            }, $B = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_suspensionStiffness_0 = function () {
                return ($B = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_suspensionStiffness_0 = n.asm.mt).apply(null, arguments)
            }, tg = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_suspensionStiffness_1 = function () {
                return (tg = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_suspensionStiffness_1 = n.asm.nt).apply(null, arguments)
            }, eg = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelsDampingCompression_0 = function () {
                return (eg = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelsDampingCompression_0 = n.asm.ot).apply(null, arguments)
            }, ng = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelsDampingCompression_1 = function () {
                return (ng = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelsDampingCompression_1 = n.asm.pt).apply(null, arguments)
            }, og = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelsDampingRelaxation_0 = function () {
                return (og = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelsDampingRelaxation_0 = n.asm.qt).apply(null, arguments)
            }, _g = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelsDampingRelaxation_1 = function () {
                return (_g = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelsDampingRelaxation_1 = n.asm.rt).apply(null, arguments)
            }, ig = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_frictionSlip_0 = function () {
                return (ig = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_frictionSlip_0 = n.asm.st).apply(null, arguments)
            }, rg = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_frictionSlip_1 = function () {
                return (rg = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_frictionSlip_1 = n.asm.tt).apply(null, arguments)
            }, pg = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_maxSuspensionForce_0 = function () {
                return (pg = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_maxSuspensionForce_0 = n.asm.ut).apply(null, arguments)
            }, sg = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_maxSuspensionForce_1 = function () {
                return (sg = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_maxSuspensionForce_1 = n.asm.vt).apply(null, arguments)
            }, cg = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_bIsFrontWheel_0 = function () {
                return (cg = n._emscripten_bind_btWheelInfoConstructionInfo_get_m_bIsFrontWheel_0 = n.asm.wt).apply(null, arguments)
            }, ag = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_bIsFrontWheel_1 = function () {
                return (ag = n._emscripten_bind_btWheelInfoConstructionInfo_set_m_bIsFrontWheel_1 = n.asm.xt).apply(null, arguments)
            }, lg = n._emscripten_bind_btWheelInfoConstructionInfo___destroy___0 = function () {
                return (lg = n._emscripten_bind_btWheelInfoConstructionInfo___destroy___0 = n.asm.yt).apply(null, arguments)
            }, ug = n._emscripten_bind_btWheelInfo_btWheelInfo_1 = function () {
                return (ug = n._emscripten_bind_btWheelInfo_btWheelInfo_1 = n.asm.zt).apply(null, arguments)
            }, bg = n._emscripten_bind_btWheelInfo_getSuspensionRestLength_0 = function () {
                return (bg = n._emscripten_bind_btWheelInfo_getSuspensionRestLength_0 = n.asm.At).apply(null, arguments)
            }, yg = n._emscripten_bind_btWheelInfo_updateWheel_2 = function () {
                return (yg = n._emscripten_bind_btWheelInfo_updateWheel_2 = n.asm.Bt).apply(null, arguments)
            }, mg = n._emscripten_bind_btWheelInfo_get_m_suspensionStiffness_0 = function () {
                return (mg = n._emscripten_bind_btWheelInfo_get_m_suspensionStiffness_0 = n.asm.Ct).apply(null, arguments)
            }, dg = n._emscripten_bind_btWheelInfo_set_m_suspensionStiffness_1 = function () {
                return (dg = n._emscripten_bind_btWheelInfo_set_m_suspensionStiffness_1 = n.asm.Dt).apply(null, arguments)
            }, fg = n._emscripten_bind_btWheelInfo_get_m_frictionSlip_0 = function () {
                return (fg = n._emscripten_bind_btWheelInfo_get_m_frictionSlip_0 = n.asm.Et).apply(null, arguments)
            }, hg = n._emscripten_bind_btWheelInfo_set_m_frictionSlip_1 = function () {
                return (hg = n._emscripten_bind_btWheelInfo_set_m_frictionSlip_1 = n.asm.Ft).apply(null, arguments)
            }, Bg = n._emscripten_bind_btWheelInfo_get_m_engineForce_0 = function () {
                return (Bg = n._emscripten_bind_btWheelInfo_get_m_engineForce_0 = n.asm.Gt).apply(null, arguments)
            }, gg = n._emscripten_bind_btWheelInfo_set_m_engineForce_1 = function () {
                return (gg = n._emscripten_bind_btWheelInfo_set_m_engineForce_1 = n.asm.Ht).apply(null, arguments)
            }, Cg = n._emscripten_bind_btWheelInfo_get_m_rollInfluence_0 = function () {
                return (Cg = n._emscripten_bind_btWheelInfo_get_m_rollInfluence_0 = n.asm.It).apply(null, arguments)
            }, Sg = n._emscripten_bind_btWheelInfo_set_m_rollInfluence_1 = function () {
                return (Sg = n._emscripten_bind_btWheelInfo_set_m_rollInfluence_1 = n.asm.Jt).apply(null, arguments)
            }, jg = n._emscripten_bind_btWheelInfo_get_m_suspensionRestLength1_0 = function () {
                return (jg = n._emscripten_bind_btWheelInfo_get_m_suspensionRestLength1_0 = n.asm.Kt).apply(null, arguments)
            }, vg = n._emscripten_bind_btWheelInfo_set_m_suspensionRestLength1_1 = function () {
                return (vg = n._emscripten_bind_btWheelInfo_set_m_suspensionRestLength1_1 = n.asm.Lt).apply(null, arguments)
            }, Ig = n._emscripten_bind_btWheelInfo_get_m_wheelsRadius_0 = function () {
                return (Ig = n._emscripten_bind_btWheelInfo_get_m_wheelsRadius_0 = n.asm.Mt).apply(null, arguments)
            }, Rg = n._emscripten_bind_btWheelInfo_set_m_wheelsRadius_1 = function () {
                return (Rg = n._emscripten_bind_btWheelInfo_set_m_wheelsRadius_1 = n.asm.Nt).apply(null, arguments)
            }, Dg = n._emscripten_bind_btWheelInfo_get_m_wheelsDampingCompression_0 = function () {
                return (Dg = n._emscripten_bind_btWheelInfo_get_m_wheelsDampingCompression_0 = n.asm.Ot).apply(null, arguments)
            }, Pg = n._emscripten_bind_btWheelInfo_set_m_wheelsDampingCompression_1 = function () {
                return (Pg = n._emscripten_bind_btWheelInfo_set_m_wheelsDampingCompression_1 = n.asm.Pt).apply(null, arguments)
            }, Tg = n._emscripten_bind_btWheelInfo_get_m_wheelsDampingRelaxation_0 = function () {
                return (Tg = n._emscripten_bind_btWheelInfo_get_m_wheelsDampingRelaxation_0 = n.asm.Qt).apply(null, arguments)
            }, Og = n._emscripten_bind_btWheelInfo_set_m_wheelsDampingRelaxation_1 = function () {
                return (Og = n._emscripten_bind_btWheelInfo_set_m_wheelsDampingRelaxation_1 = n.asm.Rt).apply(null, arguments)
            }, Wg = n._emscripten_bind_btWheelInfo_get_m_steering_0 = function () {
                return (Wg = n._emscripten_bind_btWheelInfo_get_m_steering_0 = n.asm.St).apply(null, arguments)
            }, Ag = n._emscripten_bind_btWheelInfo_set_m_steering_1 = function () {
                return (Ag = n._emscripten_bind_btWheelInfo_set_m_steering_1 = n.asm.Tt).apply(null, arguments)
            }, Mg = n._emscripten_bind_btWheelInfo_get_m_maxSuspensionForce_0 = function () {
                return (Mg = n._emscripten_bind_btWheelInfo_get_m_maxSuspensionForce_0 = n.asm.Ut).apply(null, arguments)
            }, xg = n._emscripten_bind_btWheelInfo_set_m_maxSuspensionForce_1 = function () {
                return (xg = n._emscripten_bind_btWheelInfo_set_m_maxSuspensionForce_1 = n.asm.Vt).apply(null, arguments)
            }, kg = n._emscripten_bind_btWheelInfo_get_m_maxSuspensionTravelCm_0 = function () {
                return (kg = n._emscripten_bind_btWheelInfo_get_m_maxSuspensionTravelCm_0 = n.asm.Wt).apply(null, arguments)
            }, Fg = n._emscripten_bind_btWheelInfo_set_m_maxSuspensionTravelCm_1 = function () {
                return (Fg = n._emscripten_bind_btWheelInfo_set_m_maxSuspensionTravelCm_1 = n.asm.Xt).apply(null, arguments)
            }, Lg = n._emscripten_bind_btWheelInfo_get_m_wheelsSuspensionForce_0 = function () {
                return (Lg = n._emscripten_bind_btWheelInfo_get_m_wheelsSuspensionForce_0 = n.asm.Yt).apply(null, arguments)
            }, Gg = n._emscripten_bind_btWheelInfo_set_m_wheelsSuspensionForce_1 = function () {
                return (Gg = n._emscripten_bind_btWheelInfo_set_m_wheelsSuspensionForce_1 = n.asm.Zt).apply(null, arguments)
            }, wg = n._emscripten_bind_btWheelInfo_get_m_bIsFrontWheel_0 = function () {
                return (wg = n._emscripten_bind_btWheelInfo_get_m_bIsFrontWheel_0 = n.asm._t).apply(null, arguments)
            }, Hg = n._emscripten_bind_btWheelInfo_set_m_bIsFrontWheel_1 = function () {
                return (Hg = n._emscripten_bind_btWheelInfo_set_m_bIsFrontWheel_1 = n.asm.$t).apply(null, arguments)
            }, Vg = n._emscripten_bind_btWheelInfo_get_m_raycastInfo_0 = function () {
                return (Vg = n._emscripten_bind_btWheelInfo_get_m_raycastInfo_0 = n.asm.au).apply(null, arguments)
            }, Eg = n._emscripten_bind_btWheelInfo_set_m_raycastInfo_1 = function () {
                return (Eg = n._emscripten_bind_btWheelInfo_set_m_raycastInfo_1 = n.asm.bu).apply(null, arguments)
            }, Ng = n._emscripten_bind_btWheelInfo_get_m_chassisConnectionPointCS_0 = function () {
                return (Ng = n._emscripten_bind_btWheelInfo_get_m_chassisConnectionPointCS_0 = n.asm.cu).apply(null, arguments)
            }, Ug = n._emscripten_bind_btWheelInfo_set_m_chassisConnectionPointCS_1 = function () {
                return (Ug = n._emscripten_bind_btWheelInfo_set_m_chassisConnectionPointCS_1 = n.asm.du).apply(null, arguments)
            }, zg = n._emscripten_bind_btWheelInfo_get_m_worldTransform_0 = function () {
                return (zg = n._emscripten_bind_btWheelInfo_get_m_worldTransform_0 = n.asm.eu).apply(null, arguments)
            }, qg = n._emscripten_bind_btWheelInfo_set_m_worldTransform_1 = function () {
                return (qg = n._emscripten_bind_btWheelInfo_set_m_worldTransform_1 = n.asm.fu).apply(null, arguments)
            }, Kg = n._emscripten_bind_btWheelInfo_get_m_wheelDirectionCS_0 = function () {
                return (Kg = n._emscripten_bind_btWheelInfo_get_m_wheelDirectionCS_0 = n.asm.gu).apply(null, arguments)
            }, Qg = n._emscripten_bind_btWheelInfo_set_m_wheelDirectionCS_1 = function () {
                return (Qg = n._emscripten_bind_btWheelInfo_set_m_wheelDirectionCS_1 = n.asm.hu).apply(null, arguments)
            }, Xg = n._emscripten_bind_btWheelInfo_get_m_wheelAxleCS_0 = function () {
                return (Xg = n._emscripten_bind_btWheelInfo_get_m_wheelAxleCS_0 = n.asm.iu).apply(null, arguments)
            }, Zg = n._emscripten_bind_btWheelInfo_set_m_wheelAxleCS_1 = function () {
                return (Zg = n._emscripten_bind_btWheelInfo_set_m_wheelAxleCS_1 = n.asm.ju).apply(null, arguments)
            }, Yg = n._emscripten_bind_btWheelInfo_get_m_rotation_0 = function () {
                return (Yg = n._emscripten_bind_btWheelInfo_get_m_rotation_0 = n.asm.ku).apply(null, arguments)
            }, Jg = n._emscripten_bind_btWheelInfo_set_m_rotation_1 = function () {
                return (Jg = n._emscripten_bind_btWheelInfo_set_m_rotation_1 = n.asm.lu).apply(null, arguments)
            }, $g = n._emscripten_bind_btWheelInfo_get_m_deltaRotation_0 = function () {
                return ($g = n._emscripten_bind_btWheelInfo_get_m_deltaRotation_0 = n.asm.mu).apply(null, arguments)
            }, tC = n._emscripten_bind_btWheelInfo_set_m_deltaRotation_1 = function () {
                return (tC = n._emscripten_bind_btWheelInfo_set_m_deltaRotation_1 = n.asm.nu).apply(null, arguments)
            }, eC = n._emscripten_bind_btWheelInfo_get_m_brake_0 = function () {
                return (eC = n._emscripten_bind_btWheelInfo_get_m_brake_0 = n.asm.ou).apply(null, arguments)
            }, nC = n._emscripten_bind_btWheelInfo_set_m_brake_1 = function () {
                return (nC = n._emscripten_bind_btWheelInfo_set_m_brake_1 = n.asm.pu).apply(null, arguments)
            }, oC = n._emscripten_bind_btWheelInfo_get_m_clippedInvContactDotSuspension_0 = function () {
                return (oC = n._emscripten_bind_btWheelInfo_get_m_clippedInvContactDotSuspension_0 = n.asm.qu).apply(null, arguments)
            }, _C = n._emscripten_bind_btWheelInfo_set_m_clippedInvContactDotSuspension_1 = function () {
                return (_C = n._emscripten_bind_btWheelInfo_set_m_clippedInvContactDotSuspension_1 = n.asm.ru).apply(null, arguments)
            }, iC = n._emscripten_bind_btWheelInfo_get_m_suspensionRelativeVelocity_0 = function () {
                return (iC = n._emscripten_bind_btWheelInfo_get_m_suspensionRelativeVelocity_0 = n.asm.su).apply(null, arguments)
            }, rC = n._emscripten_bind_btWheelInfo_set_m_suspensionRelativeVelocity_1 = function () {
                return (rC = n._emscripten_bind_btWheelInfo_set_m_suspensionRelativeVelocity_1 = n.asm.tu).apply(null, arguments)
            }, pC = n._emscripten_bind_btWheelInfo_get_m_skidInfo_0 = function () {
                return (pC = n._emscripten_bind_btWheelInfo_get_m_skidInfo_0 = n.asm.uu).apply(null, arguments)
            }, sC = n._emscripten_bind_btWheelInfo_set_m_skidInfo_1 = function () {
                return (sC = n._emscripten_bind_btWheelInfo_set_m_skidInfo_1 = n.asm.vu).apply(null, arguments)
            }, cC = n._emscripten_bind_btWheelInfo___destroy___0 = function () {
                return (cC = n._emscripten_bind_btWheelInfo___destroy___0 = n.asm.wu).apply(null, arguments)
            }, aC = n._emscripten_bind_btKinematicCharacterController_btKinematicCharacterController_3 = function () {
                return (aC = n._emscripten_bind_btKinematicCharacterController_btKinematicCharacterController_3 = n.asm.xu).apply(null, arguments)
            }, lC = n._emscripten_bind_btKinematicCharacterController_btKinematicCharacterController_4 = function () {
                return (lC = n._emscripten_bind_btKinematicCharacterController_btKinematicCharacterController_4 = n.asm.yu).apply(null, arguments)
            }, uC = n._emscripten_bind_btKinematicCharacterController_setUpAxis_1 = function () {
                return (uC = n._emscripten_bind_btKinematicCharacterController_setUpAxis_1 = n.asm.zu).apply(null, arguments)
            }, bC = n._emscripten_bind_btKinematicCharacterController_setWalkDirection_1 = function () {
                return (bC = n._emscripten_bind_btKinematicCharacterController_setWalkDirection_1 = n.asm.Au).apply(null, arguments)
            }, yC = n._emscripten_bind_btKinematicCharacterController_setVelocityForTimeInterval_2 = function () {
                return (yC = n._emscripten_bind_btKinematicCharacterController_setVelocityForTimeInterval_2 = n.asm.Bu).apply(null, arguments)
            }, mC = n._emscripten_bind_btKinematicCharacterController_warp_1 = function () {
                return (mC = n._emscripten_bind_btKinematicCharacterController_warp_1 = n.asm.Cu).apply(null, arguments)
            }, dC = n._emscripten_bind_btKinematicCharacterController_preStep_1 = function () {
                return (dC = n._emscripten_bind_btKinematicCharacterController_preStep_1 = n.asm.Du).apply(null, arguments)
            }, fC = n._emscripten_bind_btKinematicCharacterController_playerStep_2 = function () {
                return (fC = n._emscripten_bind_btKinematicCharacterController_playerStep_2 = n.asm.Eu).apply(null, arguments)
            }, hC = n._emscripten_bind_btKinematicCharacterController_setFallSpeed_1 = function () {
                return (hC = n._emscripten_bind_btKinematicCharacterController_setFallSpeed_1 = n.asm.Fu).apply(null, arguments)
            }, BC = n._emscripten_bind_btKinematicCharacterController_setJumpSpeed_1 = function () {
                return (BC = n._emscripten_bind_btKinematicCharacterController_setJumpSpeed_1 = n.asm.Gu).apply(null, arguments)
            }, gC = n._emscripten_bind_btKinematicCharacterController_setMaxJumpHeight_1 = function () {
                return (gC = n._emscripten_bind_btKinematicCharacterController_setMaxJumpHeight_1 = n.asm.Hu).apply(null, arguments)
            }, CC = n._emscripten_bind_btKinematicCharacterController_canJump_0 = function () {
                return (CC = n._emscripten_bind_btKinematicCharacterController_canJump_0 = n.asm.Iu).apply(null, arguments)
            }, SC = n._emscripten_bind_btKinematicCharacterController_jump_0 = function () {
                return (SC = n._emscripten_bind_btKinematicCharacterController_jump_0 = n.asm.Ju).apply(null, arguments)
            }, jC = n._emscripten_bind_btKinematicCharacterController_setGravity_1 = function () {
                return (jC = n._emscripten_bind_btKinematicCharacterController_setGravity_1 = n.asm.Ku).apply(null, arguments)
            }, vC = n._emscripten_bind_btKinematicCharacterController_getGravity_0 = function () {
                return (vC = n._emscripten_bind_btKinematicCharacterController_getGravity_0 = n.asm.Lu).apply(null, arguments)
            }, IC = n._emscripten_bind_btKinematicCharacterController_setMaxSlope_1 = function () {
                return (IC = n._emscripten_bind_btKinematicCharacterController_setMaxSlope_1 = n.asm.Mu).apply(null, arguments)
            }, RC = n._emscripten_bind_btKinematicCharacterController_getMaxSlope_0 = function () {
                return (RC = n._emscripten_bind_btKinematicCharacterController_getMaxSlope_0 = n.asm.Nu).apply(null, arguments)
            }, DC = n._emscripten_bind_btKinematicCharacterController_getGhostObject_0 = function () {
                return (DC = n._emscripten_bind_btKinematicCharacterController_getGhostObject_0 = n.asm.Ou).apply(null, arguments)
            }, PC = n._emscripten_bind_btKinematicCharacterController_setUseGhostSweepTest_1 = function () {
                return (PC = n._emscripten_bind_btKinematicCharacterController_setUseGhostSweepTest_1 = n.asm.Pu).apply(null, arguments)
            }, TC = n._emscripten_bind_btKinematicCharacterController_onGround_0 = function () {
                return (TC = n._emscripten_bind_btKinematicCharacterController_onGround_0 = n.asm.Qu).apply(null, arguments)
            }, OC = n._emscripten_bind_btKinematicCharacterController_setUpInterpolate_1 = function () {
                return (OC = n._emscripten_bind_btKinematicCharacterController_setUpInterpolate_1 = n.asm.Ru).apply(null, arguments)
            }, WC = n._emscripten_bind_btKinematicCharacterController_updateAction_2 = function () {
                return (WC = n._emscripten_bind_btKinematicCharacterController_updateAction_2 = n.asm.Su).apply(null, arguments)
            }, AC = n._emscripten_bind_btKinematicCharacterController___destroy___0 = function () {
                return (AC = n._emscripten_bind_btKinematicCharacterController___destroy___0 = n.asm.Tu).apply(null, arguments)
            }, MC = n._emscripten_bind_btRaycastVehicle_btRaycastVehicle_3 = function () {
                return (MC = n._emscripten_bind_btRaycastVehicle_btRaycastVehicle_3 = n.asm.Uu).apply(null, arguments)
            }, xC = n._emscripten_bind_btRaycastVehicle_applyEngineForce_2 = function () {
                return (xC = n._emscripten_bind_btRaycastVehicle_applyEngineForce_2 = n.asm.Vu).apply(null, arguments)
            }, kC = n._emscripten_bind_btRaycastVehicle_setSteeringValue_2 = function () {
                return (kC = n._emscripten_bind_btRaycastVehicle_setSteeringValue_2 = n.asm.Wu).apply(null, arguments)
            }, FC = n._emscripten_bind_btRaycastVehicle_getWheelTransformWS_1 = function () {
                return (FC = n._emscripten_bind_btRaycastVehicle_getWheelTransformWS_1 = n.asm.Xu).apply(null, arguments)
            }, LC = n._emscripten_bind_btRaycastVehicle_updateWheelTransform_2 = function () {
                return (LC = n._emscripten_bind_btRaycastVehicle_updateWheelTransform_2 = n.asm.Yu).apply(null, arguments)
            }, GC = n._emscripten_bind_btRaycastVehicle_addWheel_7 = function () {
                return (GC = n._emscripten_bind_btRaycastVehicle_addWheel_7 = n.asm.Zu).apply(null, arguments)
            }, wC = n._emscripten_bind_btRaycastVehicle_getNumWheels_0 = function () {
                return (wC = n._emscripten_bind_btRaycastVehicle_getNumWheels_0 = n.asm._u).apply(null, arguments)
            }, HC = n._emscripten_bind_btRaycastVehicle_getRigidBody_0 = function () {
                return (HC = n._emscripten_bind_btRaycastVehicle_getRigidBody_0 = n.asm.$u).apply(null, arguments)
            }, VC = n._emscripten_bind_btRaycastVehicle_getWheelInfo_1 = function () {
                return (VC = n._emscripten_bind_btRaycastVehicle_getWheelInfo_1 = n.asm.av).apply(null, arguments)
            }, EC = n._emscripten_bind_btRaycastVehicle_setBrake_2 = function () {
                return (EC = n._emscripten_bind_btRaycastVehicle_setBrake_2 = n.asm.bv).apply(null, arguments)
            }, NC = n._emscripten_bind_btRaycastVehicle_setCoordinateSystem_3 = function () {
                return (NC = n._emscripten_bind_btRaycastVehicle_setCoordinateSystem_3 = n.asm.cv).apply(null, arguments)
            }, UC = n._emscripten_bind_btRaycastVehicle_getCurrentSpeedKmHour_0 = function () {
                return (UC = n._emscripten_bind_btRaycastVehicle_getCurrentSpeedKmHour_0 = n.asm.dv).apply(null, arguments)
            }, zC = n._emscripten_bind_btRaycastVehicle_getChassisWorldTransform_0 = function () {
                return (zC = n._emscripten_bind_btRaycastVehicle_getChassisWorldTransform_0 = n.asm.ev).apply(null, arguments)
            }, qC = n._emscripten_bind_btRaycastVehicle_rayCast_1 = function () {
                return (qC = n._emscripten_bind_btRaycastVehicle_rayCast_1 = n.asm.fv).apply(null, arguments)
            }, KC = n._emscripten_bind_btRaycastVehicle_updateVehicle_1 = function () {
                return (KC = n._emscripten_bind_btRaycastVehicle_updateVehicle_1 = n.asm.gv).apply(null, arguments)
            }, QC = n._emscripten_bind_btRaycastVehicle_resetSuspension_0 = function () {
                return (QC = n._emscripten_bind_btRaycastVehicle_resetSuspension_0 = n.asm.hv).apply(null, arguments)
            }, XC = n._emscripten_bind_btRaycastVehicle_getSteeringValue_1 = function () {
                return (XC = n._emscripten_bind_btRaycastVehicle_getSteeringValue_1 = n.asm.iv).apply(null, arguments)
            }, ZC = n._emscripten_bind_btRaycastVehicle_updateWheelTransformsWS_1 = function () {
                return (ZC = n._emscripten_bind_btRaycastVehicle_updateWheelTransformsWS_1 = n.asm.jv).apply(null, arguments)
            }, YC = n._emscripten_bind_btRaycastVehicle_updateWheelTransformsWS_2 = function () {
                return (YC = n._emscripten_bind_btRaycastVehicle_updateWheelTransformsWS_2 = n.asm.kv).apply(null, arguments)
            }, JC = n._emscripten_bind_btRaycastVehicle_setPitchControl_1 = function () {
                return (JC = n._emscripten_bind_btRaycastVehicle_setPitchControl_1 = n.asm.lv).apply(null, arguments)
            }, $C = n._emscripten_bind_btRaycastVehicle_updateSuspension_1 = function () {
                return ($C = n._emscripten_bind_btRaycastVehicle_updateSuspension_1 = n.asm.mv).apply(null, arguments)
            }, tS = n._emscripten_bind_btRaycastVehicle_updateFriction_1 = function () {
                return (tS = n._emscripten_bind_btRaycastVehicle_updateFriction_1 = n.asm.nv).apply(null, arguments)
            }, eS = n._emscripten_bind_btRaycastVehicle_getRightAxis_0 = function () {
                return (eS = n._emscripten_bind_btRaycastVehicle_getRightAxis_0 = n.asm.ov).apply(null, arguments)
            }, nS = n._emscripten_bind_btRaycastVehicle_getUpAxis_0 = function () {
                return (nS = n._emscripten_bind_btRaycastVehicle_getUpAxis_0 = n.asm.pv).apply(null, arguments)
            }, oS = n._emscripten_bind_btRaycastVehicle_getForwardAxis_0 = function () {
                return (oS = n._emscripten_bind_btRaycastVehicle_getForwardAxis_0 = n.asm.qv).apply(null, arguments)
            }, _S = n._emscripten_bind_btRaycastVehicle_getForwardVector_0 = function () {
                return (_S = n._emscripten_bind_btRaycastVehicle_getForwardVector_0 = n.asm.rv).apply(null, arguments)
            }, iS = n._emscripten_bind_btRaycastVehicle_getUserConstraintType_0 = function () {
                return (iS = n._emscripten_bind_btRaycastVehicle_getUserConstraintType_0 = n.asm.sv).apply(null, arguments)
            }, rS = n._emscripten_bind_btRaycastVehicle_setUserConstraintType_1 = function () {
                return (rS = n._emscripten_bind_btRaycastVehicle_setUserConstraintType_1 = n.asm.tv).apply(null, arguments)
            }, pS = n._emscripten_bind_btRaycastVehicle_setUserConstraintId_1 = function () {
                return (pS = n._emscripten_bind_btRaycastVehicle_setUserConstraintId_1 = n.asm.uv).apply(null, arguments)
            }, sS = n._emscripten_bind_btRaycastVehicle_getUserConstraintId_0 = function () {
                return (sS = n._emscripten_bind_btRaycastVehicle_getUserConstraintId_0 = n.asm.vv).apply(null, arguments)
            }, cS = n._emscripten_bind_btRaycastVehicle_updateAction_2 = function () {
                return (cS = n._emscripten_bind_btRaycastVehicle_updateAction_2 = n.asm.wv).apply(null, arguments)
            }, aS = n._emscripten_bind_btRaycastVehicle___destroy___0 = function () {
                return (aS = n._emscripten_bind_btRaycastVehicle___destroy___0 = n.asm.xv).apply(null, arguments)
            }, lS = n._emscripten_bind_btPairCachingGhostObject_btPairCachingGhostObject_0 = function () {
                return (lS = n._emscripten_bind_btPairCachingGhostObject_btPairCachingGhostObject_0 = n.asm.yv).apply(null, arguments)
            }, uS = n._emscripten_bind_btPairCachingGhostObject_setAnisotropicFriction_2 = function () {
                return (uS = n._emscripten_bind_btPairCachingGhostObject_setAnisotropicFriction_2 = n.asm.zv).apply(null, arguments)
            }, bS = n._emscripten_bind_btPairCachingGhostObject_getCollisionShape_0 = function () {
                return (bS = n._emscripten_bind_btPairCachingGhostObject_getCollisionShape_0 = n.asm.Av).apply(null, arguments)
            }, yS = n._emscripten_bind_btPairCachingGhostObject_setContactProcessingThreshold_1 = function () {
                return (yS = n._emscripten_bind_btPairCachingGhostObject_setContactProcessingThreshold_1 = n.asm.Bv).apply(null, arguments)
            }, mS = n._emscripten_bind_btPairCachingGhostObject_setActivationState_1 = function () {
                return (mS = n._emscripten_bind_btPairCachingGhostObject_setActivationState_1 = n.asm.Cv).apply(null, arguments)
            }, dS = n._emscripten_bind_btPairCachingGhostObject_forceActivationState_1 = function () {
                return (dS = n._emscripten_bind_btPairCachingGhostObject_forceActivationState_1 = n.asm.Dv).apply(null, arguments)
            }, fS = n._emscripten_bind_btPairCachingGhostObject_activate_0 = function () {
                return (fS = n._emscripten_bind_btPairCachingGhostObject_activate_0 = n.asm.Ev).apply(null, arguments)
            }, hS = n._emscripten_bind_btPairCachingGhostObject_activate_1 = function () {
                return (hS = n._emscripten_bind_btPairCachingGhostObject_activate_1 = n.asm.Fv).apply(null, arguments)
            }, BS = n._emscripten_bind_btPairCachingGhostObject_isActive_0 = function () {
                return (BS = n._emscripten_bind_btPairCachingGhostObject_isActive_0 = n.asm.Gv).apply(null, arguments)
            }, gS = n._emscripten_bind_btPairCachingGhostObject_isKinematicObject_0 = function () {
                return (gS = n._emscripten_bind_btPairCachingGhostObject_isKinematicObject_0 = n.asm.Hv).apply(null, arguments)
            }, CS = n._emscripten_bind_btPairCachingGhostObject_isStaticObject_0 = function () {
                return (CS = n._emscripten_bind_btPairCachingGhostObject_isStaticObject_0 = n.asm.Iv).apply(null, arguments)
            }, SS = n._emscripten_bind_btPairCachingGhostObject_isStaticOrKinematicObject_0 = function () {
                return (SS = n._emscripten_bind_btPairCachingGhostObject_isStaticOrKinematicObject_0 = n.asm.Jv).apply(null, arguments)
            }, jS = n._emscripten_bind_btPairCachingGhostObject_getRestitution_0 = function () {
                return (jS = n._emscripten_bind_btPairCachingGhostObject_getRestitution_0 = n.asm.Kv).apply(null, arguments)
            }, vS = n._emscripten_bind_btPairCachingGhostObject_getFriction_0 = function () {
                return (vS = n._emscripten_bind_btPairCachingGhostObject_getFriction_0 = n.asm.Lv).apply(null, arguments)
            }, IS = n._emscripten_bind_btPairCachingGhostObject_getRollingFriction_0 = function () {
                return (IS = n._emscripten_bind_btPairCachingGhostObject_getRollingFriction_0 = n.asm.Mv).apply(null, arguments)
            }, RS = n._emscripten_bind_btPairCachingGhostObject_setRestitution_1 = function () {
                return (RS = n._emscripten_bind_btPairCachingGhostObject_setRestitution_1 = n.asm.Nv).apply(null, arguments)
            }, DS = n._emscripten_bind_btPairCachingGhostObject_setFriction_1 = function () {
                return (DS = n._emscripten_bind_btPairCachingGhostObject_setFriction_1 = n.asm.Ov).apply(null, arguments)
            }, PS = n._emscripten_bind_btPairCachingGhostObject_setRollingFriction_1 = function () {
                return (PS = n._emscripten_bind_btPairCachingGhostObject_setRollingFriction_1 = n.asm.Pv).apply(null, arguments)
            }, TS = n._emscripten_bind_btPairCachingGhostObject_getWorldTransform_0 = function () {
                return (TS = n._emscripten_bind_btPairCachingGhostObject_getWorldTransform_0 = n.asm.Qv).apply(null, arguments)
            }, OS = n._emscripten_bind_btPairCachingGhostObject_getCollisionFlags_0 = function () {
                return (OS = n._emscripten_bind_btPairCachingGhostObject_getCollisionFlags_0 = n.asm.Rv).apply(null, arguments)
            }, WS = n._emscripten_bind_btPairCachingGhostObject_setCollisionFlags_1 = function () {
                return (WS = n._emscripten_bind_btPairCachingGhostObject_setCollisionFlags_1 = n.asm.Sv).apply(null, arguments)
            }, AS = n._emscripten_bind_btPairCachingGhostObject_setWorldTransform_1 = function () {
                return (AS = n._emscripten_bind_btPairCachingGhostObject_setWorldTransform_1 = n.asm.Tv).apply(null, arguments)
            }, MS = n._emscripten_bind_btPairCachingGhostObject_setCollisionShape_1 = function () {
                return (MS = n._emscripten_bind_btPairCachingGhostObject_setCollisionShape_1 = n.asm.Uv).apply(null, arguments)
            }, xS = n._emscripten_bind_btPairCachingGhostObject_setCcdMotionThreshold_1 = function () {
                return (xS = n._emscripten_bind_btPairCachingGhostObject_setCcdMotionThreshold_1 = n.asm.Vv).apply(null, arguments)
            }, kS = n._emscripten_bind_btPairCachingGhostObject_setCcdSweptSphereRadius_1 = function () {
                return (kS = n._emscripten_bind_btPairCachingGhostObject_setCcdSweptSphereRadius_1 = n.asm.Wv).apply(null, arguments)
            }, FS = n._emscripten_bind_btPairCachingGhostObject_getUserIndex_0 = function () {
                return (FS = n._emscripten_bind_btPairCachingGhostObject_getUserIndex_0 = n.asm.Xv).apply(null, arguments)
            }, LS = n._emscripten_bind_btPairCachingGhostObject_setUserIndex_1 = function () {
                return (LS = n._emscripten_bind_btPairCachingGhostObject_setUserIndex_1 = n.asm.Yv).apply(null, arguments)
            }, GS = n._emscripten_bind_btPairCachingGhostObject_getUserPointer_0 = function () {
                return (GS = n._emscripten_bind_btPairCachingGhostObject_getUserPointer_0 = n.asm.Zv).apply(null, arguments)
            }, wS = n._emscripten_bind_btPairCachingGhostObject_setUserPointer_1 = function () {
                return (wS = n._emscripten_bind_btPairCachingGhostObject_setUserPointer_1 = n.asm._v).apply(null, arguments)
            }, HS = n._emscripten_bind_btPairCachingGhostObject_getBroadphaseHandle_0 = function () {
                return (HS = n._emscripten_bind_btPairCachingGhostObject_getBroadphaseHandle_0 = n.asm.$v).apply(null, arguments)
            }, VS = n._emscripten_bind_btPairCachingGhostObject_getNumOverlappingObjects_0 = function () {
                return (VS = n._emscripten_bind_btPairCachingGhostObject_getNumOverlappingObjects_0 = n.asm.aw).apply(null, arguments)
            }, ES = n._emscripten_bind_btPairCachingGhostObject_getOverlappingObject_1 = function () {
                return (ES = n._emscripten_bind_btPairCachingGhostObject_getOverlappingObject_1 = n.asm.bw).apply(null, arguments)
            }, NS = n._emscripten_bind_btPairCachingGhostObject___destroy___0 = function () {
                return (NS = n._emscripten_bind_btPairCachingGhostObject___destroy___0 = n.asm.cw).apply(null, arguments)
            }, US = n._emscripten_bind_btGhostPairCallback_btGhostPairCallback_0 = function () {
                return (US = n._emscripten_bind_btGhostPairCallback_btGhostPairCallback_0 = n.asm.dw).apply(null, arguments)
            }, zS = n._emscripten_bind_btGhostPairCallback___destroy___0 = function () {
                return (zS = n._emscripten_bind_btGhostPairCallback___destroy___0 = n.asm.ew).apply(null, arguments)
            }, qS = n._emscripten_bind_btSoftBodyWorldInfo_btSoftBodyWorldInfo_0 = function () {
                return (qS = n._emscripten_bind_btSoftBodyWorldInfo_btSoftBodyWorldInfo_0 = n.asm.fw).apply(null, arguments)
            }, KS = n._emscripten_bind_btSoftBodyWorldInfo_get_air_density_0 = function () {
                return (KS = n._emscripten_bind_btSoftBodyWorldInfo_get_air_density_0 = n.asm.gw).apply(null, arguments)
            }, QS = n._emscripten_bind_btSoftBodyWorldInfo_set_air_density_1 = function () {
                return (QS = n._emscripten_bind_btSoftBodyWorldInfo_set_air_density_1 = n.asm.hw).apply(null, arguments)
            }, XS = n._emscripten_bind_btSoftBodyWorldInfo_get_water_density_0 = function () {
                return (XS = n._emscripten_bind_btSoftBodyWorldInfo_get_water_density_0 = n.asm.iw).apply(null, arguments)
            }, ZS = n._emscripten_bind_btSoftBodyWorldInfo_set_water_density_1 = function () {
                return (ZS = n._emscripten_bind_btSoftBodyWorldInfo_set_water_density_1 = n.asm.jw).apply(null, arguments)
            }, YS = n._emscripten_bind_btSoftBodyWorldInfo_get_water_offset_0 = function () {
                return (YS = n._emscripten_bind_btSoftBodyWorldInfo_get_water_offset_0 = n.asm.kw).apply(null, arguments)
            }, JS = n._emscripten_bind_btSoftBodyWorldInfo_set_water_offset_1 = function () {
                return (JS = n._emscripten_bind_btSoftBodyWorldInfo_set_water_offset_1 = n.asm.lw).apply(null, arguments)
            }, $S = n._emscripten_bind_btSoftBodyWorldInfo_get_m_maxDisplacement_0 = function () {
                return ($S = n._emscripten_bind_btSoftBodyWorldInfo_get_m_maxDisplacement_0 = n.asm.mw).apply(null, arguments)
            }, tj = n._emscripten_bind_btSoftBodyWorldInfo_set_m_maxDisplacement_1 = function () {
                return (tj = n._emscripten_bind_btSoftBodyWorldInfo_set_m_maxDisplacement_1 = n.asm.nw).apply(null, arguments)
            }, ej = n._emscripten_bind_btSoftBodyWorldInfo_get_water_normal_0 = function () {
                return (ej = n._emscripten_bind_btSoftBodyWorldInfo_get_water_normal_0 = n.asm.ow).apply(null, arguments)
            }, nj = n._emscripten_bind_btSoftBodyWorldInfo_set_water_normal_1 = function () {
                return (nj = n._emscripten_bind_btSoftBodyWorldInfo_set_water_normal_1 = n.asm.pw).apply(null, arguments)
            }, oj = n._emscripten_bind_btSoftBodyWorldInfo_get_m_broadphase_0 = function () {
                return (oj = n._emscripten_bind_btSoftBodyWorldInfo_get_m_broadphase_0 = n.asm.qw).apply(null, arguments)
            }, _j = n._emscripten_bind_btSoftBodyWorldInfo_set_m_broadphase_1 = function () {
                return (_j = n._emscripten_bind_btSoftBodyWorldInfo_set_m_broadphase_1 = n.asm.rw).apply(null, arguments)
            }, ij = n._emscripten_bind_btSoftBodyWorldInfo_get_m_dispatcher_0 = function () {
                return (ij = n._emscripten_bind_btSoftBodyWorldInfo_get_m_dispatcher_0 = n.asm.sw).apply(null, arguments)
            }, rj = n._emscripten_bind_btSoftBodyWorldInfo_set_m_dispatcher_1 = function () {
                return (rj = n._emscripten_bind_btSoftBodyWorldInfo_set_m_dispatcher_1 = n.asm.tw).apply(null, arguments)
            }, pj = n._emscripten_bind_btSoftBodyWorldInfo_get_m_gravity_0 = function () {
                return (pj = n._emscripten_bind_btSoftBodyWorldInfo_get_m_gravity_0 = n.asm.uw).apply(null, arguments)
            }, sj = n._emscripten_bind_btSoftBodyWorldInfo_set_m_gravity_1 = function () {
                return (sj = n._emscripten_bind_btSoftBodyWorldInfo_set_m_gravity_1 = n.asm.vw).apply(null, arguments)
            }, cj = n._emscripten_bind_btSoftBodyWorldInfo___destroy___0 = function () {
                return (cj = n._emscripten_bind_btSoftBodyWorldInfo___destroy___0 = n.asm.ww).apply(null, arguments)
            }, aj = n._emscripten_bind_Face_get_m_n_1 = function () {
                return (aj = n._emscripten_bind_Face_get_m_n_1 = n.asm.xw).apply(null, arguments)
            }, lj = n._emscripten_bind_Face_set_m_n_2 = function () {
                return (lj = n._emscripten_bind_Face_set_m_n_2 = n.asm.yw).apply(null, arguments)
            }, uj = n._emscripten_bind_Face_get_m_normal_0 = function () {
                return (uj = n._emscripten_bind_Face_get_m_normal_0 = n.asm.zw).apply(null, arguments)
            }, bj = n._emscripten_bind_Face_set_m_normal_1 = function () {
                return (bj = n._emscripten_bind_Face_set_m_normal_1 = n.asm.Aw).apply(null, arguments)
            }, yj = n._emscripten_bind_Face_get_m_ra_0 = function () {
                return (yj = n._emscripten_bind_Face_get_m_ra_0 = n.asm.Bw).apply(null, arguments)
            }, mj = n._emscripten_bind_Face_set_m_ra_1 = function () {
                return (mj = n._emscripten_bind_Face_set_m_ra_1 = n.asm.Cw).apply(null, arguments)
            }, dj = n._emscripten_bind_Face___destroy___0 = function () {
                return (dj = n._emscripten_bind_Face___destroy___0 = n.asm.Dw).apply(null, arguments)
            }, fj = n._emscripten_bind_tFaceArray_size_0 = function () {
                return (fj = n._emscripten_bind_tFaceArray_size_0 = n.asm.Ew).apply(null, arguments)
            }, hj = n._emscripten_bind_tFaceArray_at_1 = function () {
                return (hj = n._emscripten_bind_tFaceArray_at_1 = n.asm.Fw).apply(null, arguments)
            }, Bj = n._emscripten_bind_tFaceArray___destroy___0 = function () {
                return (Bj = n._emscripten_bind_tFaceArray___destroy___0 = n.asm.Gw).apply(null, arguments)
            }, gj = n._emscripten_bind_Node_get_m_x_0 = function () {
                return (gj = n._emscripten_bind_Node_get_m_x_0 = n.asm.Hw).apply(null, arguments)
            }, Cj = n._emscripten_bind_Node_set_m_x_1 = function () {
                return (Cj = n._emscripten_bind_Node_set_m_x_1 = n.asm.Iw).apply(null, arguments)
            }, Sj = n._emscripten_bind_Node_get_m_q_0 = function () {
                return (Sj = n._emscripten_bind_Node_get_m_q_0 = n.asm.Jw).apply(null, arguments)
            }, jj = n._emscripten_bind_Node_set_m_q_1 = function () {
                return (jj = n._emscripten_bind_Node_set_m_q_1 = n.asm.Kw).apply(null, arguments)
            }, vj = n._emscripten_bind_Node_get_m_v_0 = function () {
                return (vj = n._emscripten_bind_Node_get_m_v_0 = n.asm.Lw).apply(null, arguments)
            }, Ij = n._emscripten_bind_Node_set_m_v_1 = function () {
                return (Ij = n._emscripten_bind_Node_set_m_v_1 = n.asm.Mw).apply(null, arguments)
            }, Rj = n._emscripten_bind_Node_get_m_f_0 = function () {
                return (Rj = n._emscripten_bind_Node_get_m_f_0 = n.asm.Nw).apply(null, arguments)
            }, Dj = n._emscripten_bind_Node_set_m_f_1 = function () {
                return (Dj = n._emscripten_bind_Node_set_m_f_1 = n.asm.Ow).apply(null, arguments)
            }, Pj = n._emscripten_bind_Node_get_m_n_0 = function () {
                return (Pj = n._emscripten_bind_Node_get_m_n_0 = n.asm.Pw).apply(null, arguments)
            }, Tj = n._emscripten_bind_Node_set_m_n_1 = function () {
                return (Tj = n._emscripten_bind_Node_set_m_n_1 = n.asm.Qw).apply(null, arguments)
            }, Oj = n._emscripten_bind_Node_get_m_im_0 = function () {
                return (Oj = n._emscripten_bind_Node_get_m_im_0 = n.asm.Rw).apply(null, arguments)
            }, Wj = n._emscripten_bind_Node_set_m_im_1 = function () {
                return (Wj = n._emscripten_bind_Node_set_m_im_1 = n.asm.Sw).apply(null, arguments)
            }, Aj = n._emscripten_bind_Node_get_m_area_0 = function () {
                return (Aj = n._emscripten_bind_Node_get_m_area_0 = n.asm.Tw).apply(null, arguments)
            }, Mj = n._emscripten_bind_Node_set_m_area_1 = function () {
                return (Mj = n._emscripten_bind_Node_set_m_area_1 = n.asm.Uw).apply(null, arguments)
            }, xj = n._emscripten_bind_Node___destroy___0 = function () {
                return (xj = n._emscripten_bind_Node___destroy___0 = n.asm.Vw).apply(null, arguments)
            }, kj = n._emscripten_bind_tNodeArray_size_0 = function () {
                return (kj = n._emscripten_bind_tNodeArray_size_0 = n.asm.Ww).apply(null, arguments)
            }, Fj = n._emscripten_bind_tNodeArray_at_1 = function () {
                return (Fj = n._emscripten_bind_tNodeArray_at_1 = n.asm.Xw).apply(null, arguments)
            }, Lj = n._emscripten_bind_tNodeArray___destroy___0 = function () {
                return (Lj = n._emscripten_bind_tNodeArray___destroy___0 = n.asm.Yw).apply(null, arguments)
            }, Gj = n._emscripten_bind_Material_get_m_kLST_0 = function () {
                return (Gj = n._emscripten_bind_Material_get_m_kLST_0 = n.asm.Zw).apply(null, arguments)
            }, wj = n._emscripten_bind_Material_set_m_kLST_1 = function () {
                return (wj = n._emscripten_bind_Material_set_m_kLST_1 = n.asm._w).apply(null, arguments)
            }, Hj = n._emscripten_bind_Material_get_m_kAST_0 = function () {
                return (Hj = n._emscripten_bind_Material_get_m_kAST_0 = n.asm.$w).apply(null, arguments)
            }, Vj = n._emscripten_bind_Material_set_m_kAST_1 = function () {
                return (Vj = n._emscripten_bind_Material_set_m_kAST_1 = n.asm.ax).apply(null, arguments)
            }, Ej = n._emscripten_bind_Material_get_m_kVST_0 = function () {
                return (Ej = n._emscripten_bind_Material_get_m_kVST_0 = n.asm.bx).apply(null, arguments)
            }, Nj = n._emscripten_bind_Material_set_m_kVST_1 = function () {
                return (Nj = n._emscripten_bind_Material_set_m_kVST_1 = n.asm.cx).apply(null, arguments)
            }, Uj = n._emscripten_bind_Material_get_m_flags_0 = function () {
                return (Uj = n._emscripten_bind_Material_get_m_flags_0 = n.asm.dx).apply(null, arguments)
            }, zj = n._emscripten_bind_Material_set_m_flags_1 = function () {
                return (zj = n._emscripten_bind_Material_set_m_flags_1 = n.asm.ex).apply(null, arguments)
            }, qj = n._emscripten_bind_Material___destroy___0 = function () {
                return (qj = n._emscripten_bind_Material___destroy___0 = n.asm.fx).apply(null, arguments)
            }, Kj = n._emscripten_bind_tMaterialArray_size_0 = function () {
                return (Kj = n._emscripten_bind_tMaterialArray_size_0 = n.asm.gx).apply(null, arguments)
            }, Qj = n._emscripten_bind_tMaterialArray_at_1 = function () {
                return (Qj = n._emscripten_bind_tMaterialArray_at_1 = n.asm.hx).apply(null, arguments)
            }, Xj = n._emscripten_bind_tMaterialArray___destroy___0 = function () {
                return (Xj = n._emscripten_bind_tMaterialArray___destroy___0 = n.asm.ix).apply(null, arguments)
            }, Zj = n._emscripten_bind_Anchor_get_m_node_0 = function () {
                return (Zj = n._emscripten_bind_Anchor_get_m_node_0 = n.asm.jx).apply(null, arguments)
            }, Yj = n._emscripten_bind_Anchor_set_m_node_1 = function () {
                return (Yj = n._emscripten_bind_Anchor_set_m_node_1 = n.asm.kx).apply(null, arguments)
            }, Jj = n._emscripten_bind_Anchor_get_m_local_0 = function () {
                return (Jj = n._emscripten_bind_Anchor_get_m_local_0 = n.asm.lx).apply(null, arguments)
            }, $j = n._emscripten_bind_Anchor_set_m_local_1 = function () {
                return ($j = n._emscripten_bind_Anchor_set_m_local_1 = n.asm.mx).apply(null, arguments)
            }, tv = n._emscripten_bind_Anchor_get_m_body_0 = function () {
                return (tv = n._emscripten_bind_Anchor_get_m_body_0 = n.asm.nx).apply(null, arguments)
            }, ev = n._emscripten_bind_Anchor_set_m_body_1 = function () {
                return (ev = n._emscripten_bind_Anchor_set_m_body_1 = n.asm.ox).apply(null, arguments)
            }, nv = n._emscripten_bind_Anchor_get_m_influence_0 = function () {
                return (nv = n._emscripten_bind_Anchor_get_m_influence_0 = n.asm.px).apply(null, arguments)
            }, ov = n._emscripten_bind_Anchor_set_m_influence_1 = function () {
                return (ov = n._emscripten_bind_Anchor_set_m_influence_1 = n.asm.qx).apply(null, arguments)
            }, _v = n._emscripten_bind_Anchor_get_m_c0_0 = function () {
                return (_v = n._emscripten_bind_Anchor_get_m_c0_0 = n.asm.rx).apply(null, arguments)
            }, iv = n._emscripten_bind_Anchor_set_m_c0_1 = function () {
                return (iv = n._emscripten_bind_Anchor_set_m_c0_1 = n.asm.sx).apply(null, arguments)
            }, rv = n._emscripten_bind_Anchor_get_m_c1_0 = function () {
                return (rv = n._emscripten_bind_Anchor_get_m_c1_0 = n.asm.tx).apply(null, arguments)
            }, pv = n._emscripten_bind_Anchor_set_m_c1_1 = function () {
                return (pv = n._emscripten_bind_Anchor_set_m_c1_1 = n.asm.ux).apply(null, arguments)
            }, sv = n._emscripten_bind_Anchor_get_m_c2_0 = function () {
                return (sv = n._emscripten_bind_Anchor_get_m_c2_0 = n.asm.vx).apply(null, arguments)
            }, cv = n._emscripten_bind_Anchor_set_m_c2_1 = function () {
                return (cv = n._emscripten_bind_Anchor_set_m_c2_1 = n.asm.wx).apply(null, arguments)
            }, av = n._emscripten_bind_Anchor___destroy___0 = function () {
                return (av = n._emscripten_bind_Anchor___destroy___0 = n.asm.xx).apply(null, arguments)
            }, lv = n._emscripten_bind_tAnchorArray_size_0 = function () {
                return (lv = n._emscripten_bind_tAnchorArray_size_0 = n.asm.yx).apply(null, arguments)
            }, uv = n._emscripten_bind_tAnchorArray_at_1 = function () {
                return (uv = n._emscripten_bind_tAnchorArray_at_1 = n.asm.zx).apply(null, arguments)
            }, bv = n._emscripten_bind_tAnchorArray_clear_0 = function () {
                return (bv = n._emscripten_bind_tAnchorArray_clear_0 = n.asm.Ax).apply(null, arguments)
            }, yv = n._emscripten_bind_tAnchorArray_push_back_1 = function () {
                return (yv = n._emscripten_bind_tAnchorArray_push_back_1 = n.asm.Bx).apply(null, arguments)
            }, mv = n._emscripten_bind_tAnchorArray_pop_back_0 = function () {
                return (mv = n._emscripten_bind_tAnchorArray_pop_back_0 = n.asm.Cx).apply(null, arguments)
            }, dv = n._emscripten_bind_tAnchorArray___destroy___0 = function () {
                return (dv = n._emscripten_bind_tAnchorArray___destroy___0 = n.asm.Dx).apply(null, arguments)
            }, fv = n._emscripten_bind_Config_get_kVCF_0 = function () {
                return (fv = n._emscripten_bind_Config_get_kVCF_0 = n.asm.Ex).apply(null, arguments)
            }, hv = n._emscripten_bind_Config_set_kVCF_1 = function () {
                return (hv = n._emscripten_bind_Config_set_kVCF_1 = n.asm.Fx).apply(null, arguments)
            }, Bv = n._emscripten_bind_Config_get_kDP_0 = function () {
                return (Bv = n._emscripten_bind_Config_get_kDP_0 = n.asm.Gx).apply(null, arguments)
            }, gv = n._emscripten_bind_Config_set_kDP_1 = function () {
                return (gv = n._emscripten_bind_Config_set_kDP_1 = n.asm.Hx).apply(null, arguments)
            }, Cv = n._emscripten_bind_Config_get_kDG_0 = function () {
                return (Cv = n._emscripten_bind_Config_get_kDG_0 = n.asm.Ix).apply(null, arguments)
            }, Sv = n._emscripten_bind_Config_set_kDG_1 = function () {
                return (Sv = n._emscripten_bind_Config_set_kDG_1 = n.asm.Jx).apply(null, arguments)
            }, jv = n._emscripten_bind_Config_get_kLF_0 = function () {
                return (jv = n._emscripten_bind_Config_get_kLF_0 = n.asm.Kx).apply(null, arguments)
            }, vv = n._emscripten_bind_Config_set_kLF_1 = function () {
                return (vv = n._emscripten_bind_Config_set_kLF_1 = n.asm.Lx).apply(null, arguments)
            }, Iv = n._emscripten_bind_Config_get_kPR_0 = function () {
                return (Iv = n._emscripten_bind_Config_get_kPR_0 = n.asm.Mx).apply(null, arguments)
            }, Rv = n._emscripten_bind_Config_set_kPR_1 = function () {
                return (Rv = n._emscripten_bind_Config_set_kPR_1 = n.asm.Nx).apply(null, arguments)
            }, Dv = n._emscripten_bind_Config_get_kVC_0 = function () {
                return (Dv = n._emscripten_bind_Config_get_kVC_0 = n.asm.Ox).apply(null, arguments)
            }, Pv = n._emscripten_bind_Config_set_kVC_1 = function () {
                return (Pv = n._emscripten_bind_Config_set_kVC_1 = n.asm.Px).apply(null, arguments)
            }, Tv = n._emscripten_bind_Config_get_kDF_0 = function () {
                return (Tv = n._emscripten_bind_Config_get_kDF_0 = n.asm.Qx).apply(null, arguments)
            }, Ov = n._emscripten_bind_Config_set_kDF_1 = function () {
                return (Ov = n._emscripten_bind_Config_set_kDF_1 = n.asm.Rx).apply(null, arguments)
            }, Wv = n._emscripten_bind_Config_get_kMT_0 = function () {
                return (Wv = n._emscripten_bind_Config_get_kMT_0 = n.asm.Sx).apply(null, arguments)
            }, Av = n._emscripten_bind_Config_set_kMT_1 = function () {
                return (Av = n._emscripten_bind_Config_set_kMT_1 = n.asm.Tx).apply(null, arguments)
            }, Mv = n._emscripten_bind_Config_get_kCHR_0 = function () {
                return (Mv = n._emscripten_bind_Config_get_kCHR_0 = n.asm.Ux).apply(null, arguments)
            }, xv = n._emscripten_bind_Config_set_kCHR_1 = function () {
                return (xv = n._emscripten_bind_Config_set_kCHR_1 = n.asm.Vx).apply(null, arguments)
            }, kv = n._emscripten_bind_Config_get_kKHR_0 = function () {
                return (kv = n._emscripten_bind_Config_get_kKHR_0 = n.asm.Wx).apply(null, arguments)
            }, Fv = n._emscripten_bind_Config_set_kKHR_1 = function () {
                return (Fv = n._emscripten_bind_Config_set_kKHR_1 = n.asm.Xx).apply(null, arguments)
            }, Lv = n._emscripten_bind_Config_get_kSHR_0 = function () {
                return (Lv = n._emscripten_bind_Config_get_kSHR_0 = n.asm.Yx).apply(null, arguments)
            }, Gv = n._emscripten_bind_Config_set_kSHR_1 = function () {
                return (Gv = n._emscripten_bind_Config_set_kSHR_1 = n.asm.Zx).apply(null, arguments)
            }, wv = n._emscripten_bind_Config_get_kAHR_0 = function () {
                return (wv = n._emscripten_bind_Config_get_kAHR_0 = n.asm._x).apply(null, arguments)
            }, Hv = n._emscripten_bind_Config_set_kAHR_1 = function () {
                return (Hv = n._emscripten_bind_Config_set_kAHR_1 = n.asm.$x).apply(null, arguments)
            }, Vv = n._emscripten_bind_Config_get_kSRHR_CL_0 = function () {
                return (Vv = n._emscripten_bind_Config_get_kSRHR_CL_0 = n.asm.ay).apply(null, arguments)
            }, Ev = n._emscripten_bind_Config_set_kSRHR_CL_1 = function () {
                return (Ev = n._emscripten_bind_Config_set_kSRHR_CL_1 = n.asm.by).apply(null, arguments)
            }, Nv = n._emscripten_bind_Config_get_kSKHR_CL_0 = function () {
                return (Nv = n._emscripten_bind_Config_get_kSKHR_CL_0 = n.asm.cy).apply(null, arguments)
            }, Uv = n._emscripten_bind_Config_set_kSKHR_CL_1 = function () {
                return (Uv = n._emscripten_bind_Config_set_kSKHR_CL_1 = n.asm.dy).apply(null, arguments)
            }, zv = n._emscripten_bind_Config_get_kSSHR_CL_0 = function () {
                return (zv = n._emscripten_bind_Config_get_kSSHR_CL_0 = n.asm.ey).apply(null, arguments)
            }, qv = n._emscripten_bind_Config_set_kSSHR_CL_1 = function () {
                return (qv = n._emscripten_bind_Config_set_kSSHR_CL_1 = n.asm.fy).apply(null, arguments)
            }, Kv = n._emscripten_bind_Config_get_kSR_SPLT_CL_0 = function () {
                return (Kv = n._emscripten_bind_Config_get_kSR_SPLT_CL_0 = n.asm.gy).apply(null, arguments)
            }, Qv = n._emscripten_bind_Config_set_kSR_SPLT_CL_1 = function () {
                return (Qv = n._emscripten_bind_Config_set_kSR_SPLT_CL_1 = n.asm.hy).apply(null, arguments)
            }, Xv = n._emscripten_bind_Config_get_kSK_SPLT_CL_0 = function () {
                return (Xv = n._emscripten_bind_Config_get_kSK_SPLT_CL_0 = n.asm.iy).apply(null, arguments)
            }, Zv = n._emscripten_bind_Config_set_kSK_SPLT_CL_1 = function () {
                return (Zv = n._emscripten_bind_Config_set_kSK_SPLT_CL_1 = n.asm.jy).apply(null, arguments)
            }, Yv = n._emscripten_bind_Config_get_kSS_SPLT_CL_0 = function () {
                return (Yv = n._emscripten_bind_Config_get_kSS_SPLT_CL_0 = n.asm.ky).apply(null, arguments)
            }, Jv = n._emscripten_bind_Config_set_kSS_SPLT_CL_1 = function () {
                return (Jv = n._emscripten_bind_Config_set_kSS_SPLT_CL_1 = n.asm.ly).apply(null, arguments)
            }, $v = n._emscripten_bind_Config_get_maxvolume_0 = function () {
                return ($v = n._emscripten_bind_Config_get_maxvolume_0 = n.asm.my).apply(null, arguments)
            }, tI = n._emscripten_bind_Config_set_maxvolume_1 = function () {
                return (tI = n._emscripten_bind_Config_set_maxvolume_1 = n.asm.ny).apply(null, arguments)
            }, eI = n._emscripten_bind_Config_get_timescale_0 = function () {
                return (eI = n._emscripten_bind_Config_get_timescale_0 = n.asm.oy).apply(null, arguments)
            }, nI = n._emscripten_bind_Config_set_timescale_1 = function () {
                return (nI = n._emscripten_bind_Config_set_timescale_1 = n.asm.py).apply(null, arguments)
            }, oI = n._emscripten_bind_Config_get_viterations_0 = function () {
                return (oI = n._emscripten_bind_Config_get_viterations_0 = n.asm.qy).apply(null, arguments)
            }, _I = n._emscripten_bind_Config_set_viterations_1 = function () {
                return (_I = n._emscripten_bind_Config_set_viterations_1 = n.asm.ry).apply(null, arguments)
            }, iI = n._emscripten_bind_Config_get_piterations_0 = function () {
                return (iI = n._emscripten_bind_Config_get_piterations_0 = n.asm.sy).apply(null, arguments)
            }, rI = n._emscripten_bind_Config_set_piterations_1 = function () {
                return (rI = n._emscripten_bind_Config_set_piterations_1 = n.asm.ty).apply(null, arguments)
            }, pI = n._emscripten_bind_Config_get_diterations_0 = function () {
                return (pI = n._emscripten_bind_Config_get_diterations_0 = n.asm.uy).apply(null, arguments)
            }, sI = n._emscripten_bind_Config_set_diterations_1 = function () {
                return (sI = n._emscripten_bind_Config_set_diterations_1 = n.asm.vy).apply(null, arguments)
            }, cI = n._emscripten_bind_Config_get_citerations_0 = function () {
                return (cI = n._emscripten_bind_Config_get_citerations_0 = n.asm.wy).apply(null, arguments)
            }, aI = n._emscripten_bind_Config_set_citerations_1 = function () {
                return (aI = n._emscripten_bind_Config_set_citerations_1 = n.asm.xy).apply(null, arguments)
            }, lI = n._emscripten_bind_Config_get_collisions_0 = function () {
                return (lI = n._emscripten_bind_Config_get_collisions_0 = n.asm.yy).apply(null, arguments)
            }, uI = n._emscripten_bind_Config_set_collisions_1 = function () {
                return (uI = n._emscripten_bind_Config_set_collisions_1 = n.asm.zy).apply(null, arguments)
            }, bI = n._emscripten_bind_Config___destroy___0 = function () {
                return (bI = n._emscripten_bind_Config___destroy___0 = n.asm.Ay).apply(null, arguments)
            }, yI = n._emscripten_bind_btSoftBody_btSoftBody_4 = function () {
                return (yI = n._emscripten_bind_btSoftBody_btSoftBody_4 = n.asm.By).apply(null, arguments)
            }, mI = n._emscripten_bind_btSoftBody_checkLink_2 = function () {
                return (mI = n._emscripten_bind_btSoftBody_checkLink_2 = n.asm.Cy).apply(null, arguments)
            }, dI = n._emscripten_bind_btSoftBody_checkFace_3 = function () {
                return (dI = n._emscripten_bind_btSoftBody_checkFace_3 = n.asm.Dy).apply(null, arguments)
            }, fI = n._emscripten_bind_btSoftBody_appendMaterial_0 = function () {
                return (fI = n._emscripten_bind_btSoftBody_appendMaterial_0 = n.asm.Ey).apply(null, arguments)
            }, hI = n._emscripten_bind_btSoftBody_appendNode_2 = function () {
                return (hI = n._emscripten_bind_btSoftBody_appendNode_2 = n.asm.Fy).apply(null, arguments)
            }, BI = n._emscripten_bind_btSoftBody_appendLink_4 = function () {
                return (BI = n._emscripten_bind_btSoftBody_appendLink_4 = n.asm.Gy).apply(null, arguments)
            }, gI = n._emscripten_bind_btSoftBody_appendFace_4 = function () {
                return (gI = n._emscripten_bind_btSoftBody_appendFace_4 = n.asm.Hy).apply(null, arguments)
            }, CI = n._emscripten_bind_btSoftBody_appendTetra_5 = function () {
                return (CI = n._emscripten_bind_btSoftBody_appendTetra_5 = n.asm.Iy).apply(null, arguments)
            }, SI = n._emscripten_bind_btSoftBody_appendAnchor_4 = function () {
                return (SI = n._emscripten_bind_btSoftBody_appendAnchor_4 = n.asm.Jy).apply(null, arguments)
            }, jI = n._emscripten_bind_btSoftBody_addForce_1 = function () {
                return (jI = n._emscripten_bind_btSoftBody_addForce_1 = n.asm.Ky).apply(null, arguments)
            }, vI = n._emscripten_bind_btSoftBody_addForce_2 = function () {
                return (vI = n._emscripten_bind_btSoftBody_addForce_2 = n.asm.Ly).apply(null, arguments)
            }, II = n._emscripten_bind_btSoftBody_addAeroForceToNode_2 = function () {
                return (II = n._emscripten_bind_btSoftBody_addAeroForceToNode_2 = n.asm.My).apply(null, arguments)
            }, RI = n._emscripten_bind_btSoftBody_getTotalMass_0 = function () {
                return (RI = n._emscripten_bind_btSoftBody_getTotalMass_0 = n.asm.Ny).apply(null, arguments)
            }, DI = n._emscripten_bind_btSoftBody_setTotalMass_2 = function () {
                return (DI = n._emscripten_bind_btSoftBody_setTotalMass_2 = n.asm.Oy).apply(null, arguments)
            }, PI = n._emscripten_bind_btSoftBody_setMass_2 = function () {
                return (PI = n._emscripten_bind_btSoftBody_setMass_2 = n.asm.Py).apply(null, arguments)
            }, TI = n._emscripten_bind_btSoftBody_transform_1 = function () {
                return (TI = n._emscripten_bind_btSoftBody_transform_1 = n.asm.Qy).apply(null, arguments)
            }, OI = n._emscripten_bind_btSoftBody_translate_1 = function () {
                return (OI = n._emscripten_bind_btSoftBody_translate_1 = n.asm.Ry).apply(null, arguments)
            }, WI = n._emscripten_bind_btSoftBody_rotate_1 = function () {
                return (WI = n._emscripten_bind_btSoftBody_rotate_1 = n.asm.Sy).apply(null, arguments)
            }, AI = n._emscripten_bind_btSoftBody_scale_1 = function () {
                return (AI = n._emscripten_bind_btSoftBody_scale_1 = n.asm.Ty).apply(null, arguments)
            }, MI = n._emscripten_bind_btSoftBody_generateClusters_1 = function () {
                return (MI = n._emscripten_bind_btSoftBody_generateClusters_1 = n.asm.Uy).apply(null, arguments)
            }, xI = n._emscripten_bind_btSoftBody_generateClusters_2 = function () {
                return (xI = n._emscripten_bind_btSoftBody_generateClusters_2 = n.asm.Vy).apply(null, arguments)
            }, kI = n._emscripten_bind_btSoftBody_generateBendingConstraints_2 = function () {
                return (kI = n._emscripten_bind_btSoftBody_generateBendingConstraints_2 = n.asm.Wy).apply(null, arguments)
            }, FI = n._emscripten_bind_btSoftBody_upcast_1 = function () {
                return (FI = n._emscripten_bind_btSoftBody_upcast_1 = n.asm.Xy).apply(null, arguments)
            }, LI = n._emscripten_bind_btSoftBody_getRestLengthScale_0 = function () {
                return (LI = n._emscripten_bind_btSoftBody_getRestLengthScale_0 = n.asm.Yy).apply(null, arguments)
            }, GI = n._emscripten_bind_btSoftBody_setRestLengthScale_1 = function () {
                return (GI = n._emscripten_bind_btSoftBody_setRestLengthScale_1 = n.asm.Zy).apply(null, arguments)
            }, wI = n._emscripten_bind_btSoftBody_setAnisotropicFriction_2 = function () {
                return (wI = n._emscripten_bind_btSoftBody_setAnisotropicFriction_2 = n.asm._y).apply(null, arguments)
            }, HI = n._emscripten_bind_btSoftBody_getCollisionShape_0 = function () {
                return (HI = n._emscripten_bind_btSoftBody_getCollisionShape_0 = n.asm.$y).apply(null, arguments)
            }, VI = n._emscripten_bind_btSoftBody_setContactProcessingThreshold_1 = function () {
                return (VI = n._emscripten_bind_btSoftBody_setContactProcessingThreshold_1 = n.asm.az).apply(null, arguments)
            }, EI = n._emscripten_bind_btSoftBody_setActivationState_1 = function () {
                return (EI = n._emscripten_bind_btSoftBody_setActivationState_1 = n.asm.bz).apply(null, arguments)
            }, NI = n._emscripten_bind_btSoftBody_forceActivationState_1 = function () {
                return (NI = n._emscripten_bind_btSoftBody_forceActivationState_1 = n.asm.cz).apply(null, arguments)
            }, UI = n._emscripten_bind_btSoftBody_activate_0 = function () {
                return (UI = n._emscripten_bind_btSoftBody_activate_0 = n.asm.dz).apply(null, arguments)
            }, zI = n._emscripten_bind_btSoftBody_activate_1 = function () {
                return (zI = n._emscripten_bind_btSoftBody_activate_1 = n.asm.ez).apply(null, arguments)
            }, qI = n._emscripten_bind_btSoftBody_isActive_0 = function () {
                return (qI = n._emscripten_bind_btSoftBody_isActive_0 = n.asm.fz).apply(null, arguments)
            }, KI = n._emscripten_bind_btSoftBody_isKinematicObject_0 = function () {
                return (KI = n._emscripten_bind_btSoftBody_isKinematicObject_0 = n.asm.gz).apply(null, arguments)
            }, QI = n._emscripten_bind_btSoftBody_isStaticObject_0 = function () {
                return (QI = n._emscripten_bind_btSoftBody_isStaticObject_0 = n.asm.hz).apply(null, arguments)
            }, XI = n._emscripten_bind_btSoftBody_isStaticOrKinematicObject_0 = function () {
                return (XI = n._emscripten_bind_btSoftBody_isStaticOrKinematicObject_0 = n.asm.iz).apply(null, arguments)
            }, ZI = n._emscripten_bind_btSoftBody_getRestitution_0 = function () {
                return (ZI = n._emscripten_bind_btSoftBody_getRestitution_0 = n.asm.jz).apply(null, arguments)
            }, YI = n._emscripten_bind_btSoftBody_getFriction_0 = function () {
                return (YI = n._emscripten_bind_btSoftBody_getFriction_0 = n.asm.kz).apply(null, arguments)
            }, JI = n._emscripten_bind_btSoftBody_getRollingFriction_0 = function () {
                return (JI = n._emscripten_bind_btSoftBody_getRollingFriction_0 = n.asm.lz).apply(null, arguments)
            }, $I = n._emscripten_bind_btSoftBody_setRestitution_1 = function () {
                return ($I = n._emscripten_bind_btSoftBody_setRestitution_1 = n.asm.mz).apply(null, arguments)
            }, tR = n._emscripten_bind_btSoftBody_setFriction_1 = function () {
                return (tR = n._emscripten_bind_btSoftBody_setFriction_1 = n.asm.nz).apply(null, arguments)
            }, eR = n._emscripten_bind_btSoftBody_setRollingFriction_1 = function () {
                return (eR = n._emscripten_bind_btSoftBody_setRollingFriction_1 = n.asm.oz).apply(null, arguments)
            }, nR = n._emscripten_bind_btSoftBody_getWorldTransform_0 = function () {
                return (nR = n._emscripten_bind_btSoftBody_getWorldTransform_0 = n.asm.pz).apply(null, arguments)
            }, oR = n._emscripten_bind_btSoftBody_getCollisionFlags_0 = function () {
                return (oR = n._emscripten_bind_btSoftBody_getCollisionFlags_0 = n.asm.qz).apply(null, arguments)
            }, _R = n._emscripten_bind_btSoftBody_setCollisionFlags_1 = function () {
                return (_R = n._emscripten_bind_btSoftBody_setCollisionFlags_1 = n.asm.rz).apply(null, arguments)
            }, iR = n._emscripten_bind_btSoftBody_setWorldTransform_1 = function () {
                return (iR = n._emscripten_bind_btSoftBody_setWorldTransform_1 = n.asm.sz).apply(null, arguments)
            }, rR = n._emscripten_bind_btSoftBody_setCollisionShape_1 = function () {
                return (rR = n._emscripten_bind_btSoftBody_setCollisionShape_1 = n.asm.tz).apply(null, arguments)
            }, pR = n._emscripten_bind_btSoftBody_setCcdMotionThreshold_1 = function () {
                return (pR = n._emscripten_bind_btSoftBody_setCcdMotionThreshold_1 = n.asm.uz).apply(null, arguments)
            }, sR = n._emscripten_bind_btSoftBody_setCcdSweptSphereRadius_1 = function () {
                return (sR = n._emscripten_bind_btSoftBody_setCcdSweptSphereRadius_1 = n.asm.vz).apply(null, arguments)
            }, cR = n._emscripten_bind_btSoftBody_getUserIndex_0 = function () {
                return (cR = n._emscripten_bind_btSoftBody_getUserIndex_0 = n.asm.wz).apply(null, arguments)
            }, aR = n._emscripten_bind_btSoftBody_setUserIndex_1 = function () {
                return (aR = n._emscripten_bind_btSoftBody_setUserIndex_1 = n.asm.xz).apply(null, arguments)
            }, lR = n._emscripten_bind_btSoftBody_getUserPointer_0 = function () {
                return (lR = n._emscripten_bind_btSoftBody_getUserPointer_0 = n.asm.yz).apply(null, arguments)
            }, uR = n._emscripten_bind_btSoftBody_setUserPointer_1 = function () {
                return (uR = n._emscripten_bind_btSoftBody_setUserPointer_1 = n.asm.zz).apply(null, arguments)
            }, bR = n._emscripten_bind_btSoftBody_getBroadphaseHandle_0 = function () {
                return (bR = n._emscripten_bind_btSoftBody_getBroadphaseHandle_0 = n.asm.Az).apply(null, arguments)
            }, yR = n._emscripten_bind_btSoftBody_get_m_cfg_0 = function () {
                return (yR = n._emscripten_bind_btSoftBody_get_m_cfg_0 = n.asm.Bz).apply(null, arguments)
            }, mR = n._emscripten_bind_btSoftBody_set_m_cfg_1 = function () {
                return (mR = n._emscripten_bind_btSoftBody_set_m_cfg_1 = n.asm.Cz).apply(null, arguments)
            }, dR = n._emscripten_bind_btSoftBody_get_m_nodes_0 = function () {
                return (dR = n._emscripten_bind_btSoftBody_get_m_nodes_0 = n.asm.Dz).apply(null, arguments)
            }, fR = n._emscripten_bind_btSoftBody_set_m_nodes_1 = function () {
                return (fR = n._emscripten_bind_btSoftBody_set_m_nodes_1 = n.asm.Ez).apply(null, arguments)
            }, hR = n._emscripten_bind_btSoftBody_get_m_faces_0 = function () {
                return (hR = n._emscripten_bind_btSoftBody_get_m_faces_0 = n.asm.Fz).apply(null, arguments)
            }, BR = n._emscripten_bind_btSoftBody_set_m_faces_1 = function () {
                return (BR = n._emscripten_bind_btSoftBody_set_m_faces_1 = n.asm.Gz).apply(null, arguments)
            }, gR = n._emscripten_bind_btSoftBody_get_m_materials_0 = function () {
                return (gR = n._emscripten_bind_btSoftBody_get_m_materials_0 = n.asm.Hz).apply(null, arguments)
            }, CR = n._emscripten_bind_btSoftBody_set_m_materials_1 = function () {
                return (CR = n._emscripten_bind_btSoftBody_set_m_materials_1 = n.asm.Iz).apply(null, arguments)
            }, SR = n._emscripten_bind_btSoftBody_get_m_anchors_0 = function () {
                return (SR = n._emscripten_bind_btSoftBody_get_m_anchors_0 = n.asm.Jz).apply(null, arguments)
            }, jR = n._emscripten_bind_btSoftBody_set_m_anchors_1 = function () {
                return (jR = n._emscripten_bind_btSoftBody_set_m_anchors_1 = n.asm.Kz).apply(null, arguments)
            }, vR = n._emscripten_bind_btSoftBody___destroy___0 = function () {
                return (vR = n._emscripten_bind_btSoftBody___destroy___0 = n.asm.Lz).apply(null, arguments)
            },
            IR = n._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration_btSoftBodyRigidBodyCollisionConfiguration_0 = function () {
                return (IR = n._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration_btSoftBodyRigidBodyCollisionConfiguration_0 = n.asm.Mz).apply(null, arguments)
            },
            RR = n._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration_btSoftBodyRigidBodyCollisionConfiguration_1 = function () {
                return (RR = n._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration_btSoftBodyRigidBodyCollisionConfiguration_1 = n.asm.Nz).apply(null, arguments)
            }, DR = n._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration___destroy___0 = function () {
                return (DR = n._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration___destroy___0 = n.asm.Oz).apply(null, arguments)
            }, PR = n._emscripten_bind_btDefaultSoftBodySolver_btDefaultSoftBodySolver_0 = function () {
                return (PR = n._emscripten_bind_btDefaultSoftBodySolver_btDefaultSoftBodySolver_0 = n.asm.Pz).apply(null, arguments)
            }, TR = n._emscripten_bind_btDefaultSoftBodySolver___destroy___0 = function () {
                return (TR = n._emscripten_bind_btDefaultSoftBodySolver___destroy___0 = n.asm.Qz).apply(null, arguments)
            }, OR = n._emscripten_bind_btSoftBodyArray_size_0 = function () {
                return (OR = n._emscripten_bind_btSoftBodyArray_size_0 = n.asm.Rz).apply(null, arguments)
            }, WR = n._emscripten_bind_btSoftBodyArray_at_1 = function () {
                return (WR = n._emscripten_bind_btSoftBodyArray_at_1 = n.asm.Sz).apply(null, arguments)
            }, AR = n._emscripten_bind_btSoftBodyArray___destroy___0 = function () {
                return (AR = n._emscripten_bind_btSoftBodyArray___destroy___0 = n.asm.Tz).apply(null, arguments)
            }, MR = n._emscripten_bind_btSoftRigidDynamicsWorld_btSoftRigidDynamicsWorld_5 = function () {
                return (MR = n._emscripten_bind_btSoftRigidDynamicsWorld_btSoftRigidDynamicsWorld_5 = n.asm.Uz).apply(null, arguments)
            }, xR = n._emscripten_bind_btSoftRigidDynamicsWorld_addSoftBody_3 = function () {
                return (xR = n._emscripten_bind_btSoftRigidDynamicsWorld_addSoftBody_3 = n.asm.Vz).apply(null, arguments)
            }, kR = n._emscripten_bind_btSoftRigidDynamicsWorld_removeSoftBody_1 = function () {
                return (kR = n._emscripten_bind_btSoftRigidDynamicsWorld_removeSoftBody_1 = n.asm.Wz).apply(null, arguments)
            }, FR = n._emscripten_bind_btSoftRigidDynamicsWorld_removeCollisionObject_1 = function () {
                return (FR = n._emscripten_bind_btSoftRigidDynamicsWorld_removeCollisionObject_1 = n.asm.Xz).apply(null, arguments)
            }, LR = n._emscripten_bind_btSoftRigidDynamicsWorld_getWorldInfo_0 = function () {
                return (LR = n._emscripten_bind_btSoftRigidDynamicsWorld_getWorldInfo_0 = n.asm.Yz).apply(null, arguments)
            }, GR = n._emscripten_bind_btSoftRigidDynamicsWorld_getSoftBodyArray_0 = function () {
                return (GR = n._emscripten_bind_btSoftRigidDynamicsWorld_getSoftBodyArray_0 = n.asm.Zz).apply(null, arguments)
            }, wR = n._emscripten_bind_btSoftRigidDynamicsWorld_getDispatcher_0 = function () {
                return (wR = n._emscripten_bind_btSoftRigidDynamicsWorld_getDispatcher_0 = n.asm._z).apply(null, arguments)
            }, HR = n._emscripten_bind_btSoftRigidDynamicsWorld_rayTest_3 = function () {
                return (HR = n._emscripten_bind_btSoftRigidDynamicsWorld_rayTest_3 = n.asm.$z).apply(null, arguments)
            }, VR = n._emscripten_bind_btSoftRigidDynamicsWorld_getPairCache_0 = function () {
                return (VR = n._emscripten_bind_btSoftRigidDynamicsWorld_getPairCache_0 = n.asm.aA).apply(null, arguments)
            }, ER = n._emscripten_bind_btSoftRigidDynamicsWorld_getDispatchInfo_0 = function () {
                return (ER = n._emscripten_bind_btSoftRigidDynamicsWorld_getDispatchInfo_0 = n.asm.bA).apply(null, arguments)
            }, NR = n._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_1 = function () {
                return (NR = n._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_1 = n.asm.cA).apply(null, arguments)
            }, UR = n._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_2 = function () {
                return (UR = n._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_2 = n.asm.dA).apply(null, arguments)
            }, zR = n._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_3 = function () {
                return (zR = n._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_3 = n.asm.eA).apply(null, arguments)
            }, qR = n._emscripten_bind_btSoftRigidDynamicsWorld_getBroadphase_0 = function () {
                return (qR = n._emscripten_bind_btSoftRigidDynamicsWorld_getBroadphase_0 = n.asm.fA).apply(null, arguments)
            }, KR = n._emscripten_bind_btSoftRigidDynamicsWorld_convexSweepTest_5 = function () {
                return (KR = n._emscripten_bind_btSoftRigidDynamicsWorld_convexSweepTest_5 = n.asm.gA).apply(null, arguments)
            }, QR = n._emscripten_bind_btSoftRigidDynamicsWorld_contactPairTest_3 = function () {
                return (QR = n._emscripten_bind_btSoftRigidDynamicsWorld_contactPairTest_3 = n.asm.hA).apply(null, arguments)
            }, XR = n._emscripten_bind_btSoftRigidDynamicsWorld_contactTest_2 = function () {
                return (XR = n._emscripten_bind_btSoftRigidDynamicsWorld_contactTest_2 = n.asm.iA).apply(null, arguments)
            }, ZR = n._emscripten_bind_btSoftRigidDynamicsWorld_updateSingleAabb_1 = function () {
                return (ZR = n._emscripten_bind_btSoftRigidDynamicsWorld_updateSingleAabb_1 = n.asm.jA).apply(null, arguments)
            }, YR = n._emscripten_bind_btSoftRigidDynamicsWorld_setDebugDrawer_1 = function () {
                return (YR = n._emscripten_bind_btSoftRigidDynamicsWorld_setDebugDrawer_1 = n.asm.kA).apply(null, arguments)
            }, JR = n._emscripten_bind_btSoftRigidDynamicsWorld_getDebugDrawer_0 = function () {
                return (JR = n._emscripten_bind_btSoftRigidDynamicsWorld_getDebugDrawer_0 = n.asm.lA).apply(null, arguments)
            }, $R = n._emscripten_bind_btSoftRigidDynamicsWorld_debugDrawWorld_0 = function () {
                return ($R = n._emscripten_bind_btSoftRigidDynamicsWorld_debugDrawWorld_0 = n.asm.mA).apply(null, arguments)
            }, tD = n._emscripten_bind_btSoftRigidDynamicsWorld_debugDrawObject_3 = function () {
                return (tD = n._emscripten_bind_btSoftRigidDynamicsWorld_debugDrawObject_3 = n.asm.nA).apply(null, arguments)
            }, eD = n._emscripten_bind_btSoftRigidDynamicsWorld_setGravity_1 = function () {
                return (eD = n._emscripten_bind_btSoftRigidDynamicsWorld_setGravity_1 = n.asm.oA).apply(null, arguments)
            }, nD = n._emscripten_bind_btSoftRigidDynamicsWorld_getGravity_0 = function () {
                return (nD = n._emscripten_bind_btSoftRigidDynamicsWorld_getGravity_0 = n.asm.pA).apply(null, arguments)
            }, oD = n._emscripten_bind_btSoftRigidDynamicsWorld_addRigidBody_1 = function () {
                return (oD = n._emscripten_bind_btSoftRigidDynamicsWorld_addRigidBody_1 = n.asm.qA).apply(null, arguments)
            }, _D = n._emscripten_bind_btSoftRigidDynamicsWorld_addRigidBody_3 = function () {
                return (_D = n._emscripten_bind_btSoftRigidDynamicsWorld_addRigidBody_3 = n.asm.rA).apply(null, arguments)
            }, iD = n._emscripten_bind_btSoftRigidDynamicsWorld_removeRigidBody_1 = function () {
                return (iD = n._emscripten_bind_btSoftRigidDynamicsWorld_removeRigidBody_1 = n.asm.sA).apply(null, arguments)
            }, rD = n._emscripten_bind_btSoftRigidDynamicsWorld_addConstraint_1 = function () {
                return (rD = n._emscripten_bind_btSoftRigidDynamicsWorld_addConstraint_1 = n.asm.tA).apply(null, arguments)
            }, pD = n._emscripten_bind_btSoftRigidDynamicsWorld_addConstraint_2 = function () {
                return (pD = n._emscripten_bind_btSoftRigidDynamicsWorld_addConstraint_2 = n.asm.uA).apply(null, arguments)
            }, sD = n._emscripten_bind_btSoftRigidDynamicsWorld_removeConstraint_1 = function () {
                return (sD = n._emscripten_bind_btSoftRigidDynamicsWorld_removeConstraint_1 = n.asm.vA).apply(null, arguments)
            }, cD = n._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_1 = function () {
                return (cD = n._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_1 = n.asm.wA).apply(null, arguments)
            }, aD = n._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_2 = function () {
                return (aD = n._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_2 = n.asm.xA).apply(null, arguments)
            }, lD = n._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_3 = function () {
                return (lD = n._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_3 = n.asm.yA).apply(null, arguments)
            }, uD = n._emscripten_bind_btSoftRigidDynamicsWorld_setContactAddedCallback_1 = function () {
                return (uD = n._emscripten_bind_btSoftRigidDynamicsWorld_setContactAddedCallback_1 = n.asm.zA).apply(null, arguments)
            }, bD = n._emscripten_bind_btSoftRigidDynamicsWorld_setContactProcessedCallback_1 = function () {
                return (bD = n._emscripten_bind_btSoftRigidDynamicsWorld_setContactProcessedCallback_1 = n.asm.AA).apply(null, arguments)
            }, yD = n._emscripten_bind_btSoftRigidDynamicsWorld_setContactDestroyedCallback_1 = function () {
                return (yD = n._emscripten_bind_btSoftRigidDynamicsWorld_setContactDestroyedCallback_1 = n.asm.BA).apply(null, arguments)
            }, mD = n._emscripten_bind_btSoftRigidDynamicsWorld_addAction_1 = function () {
                return (mD = n._emscripten_bind_btSoftRigidDynamicsWorld_addAction_1 = n.asm.CA).apply(null, arguments)
            }, dD = n._emscripten_bind_btSoftRigidDynamicsWorld_removeAction_1 = function () {
                return (dD = n._emscripten_bind_btSoftRigidDynamicsWorld_removeAction_1 = n.asm.DA).apply(null, arguments)
            }, fD = n._emscripten_bind_btSoftRigidDynamicsWorld_getSolverInfo_0 = function () {
                return (fD = n._emscripten_bind_btSoftRigidDynamicsWorld_getSolverInfo_0 = n.asm.EA).apply(null, arguments)
            }, hD = n._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_1 = function () {
                return (hD = n._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_1 = n.asm.FA).apply(null, arguments)
            }, BD = n._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_2 = function () {
                return (BD = n._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_2 = n.asm.GA).apply(null, arguments)
            }, gD = n._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_3 = function () {
                return (gD = n._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_3 = n.asm.HA).apply(null, arguments)
            }, CD = n._emscripten_bind_btSoftRigidDynamicsWorld___destroy___0 = function () {
                return (CD = n._emscripten_bind_btSoftRigidDynamicsWorld___destroy___0 = n.asm.IA).apply(null, arguments)
            }, SD = n._emscripten_bind_btSoftBodyHelpers_btSoftBodyHelpers_0 = function () {
                return (SD = n._emscripten_bind_btSoftBodyHelpers_btSoftBodyHelpers_0 = n.asm.JA).apply(null, arguments)
            }, jD = n._emscripten_bind_btSoftBodyHelpers_CreateRope_5 = function () {
                return (jD = n._emscripten_bind_btSoftBodyHelpers_CreateRope_5 = n.asm.KA).apply(null, arguments)
            }, vD = n._emscripten_bind_btSoftBodyHelpers_CreatePatch_9 = function () {
                return (vD = n._emscripten_bind_btSoftBodyHelpers_CreatePatch_9 = n.asm.LA).apply(null, arguments)
            }, ID = n._emscripten_bind_btSoftBodyHelpers_CreatePatchUV_10 = function () {
                return (ID = n._emscripten_bind_btSoftBodyHelpers_CreatePatchUV_10 = n.asm.MA).apply(null, arguments)
            }, RD = n._emscripten_bind_btSoftBodyHelpers_CreateEllipsoid_4 = function () {
                return (RD = n._emscripten_bind_btSoftBodyHelpers_CreateEllipsoid_4 = n.asm.NA).apply(null, arguments)
            }, DD = n._emscripten_bind_btSoftBodyHelpers_CreateFromTriMesh_5 = function () {
                return (DD = n._emscripten_bind_btSoftBodyHelpers_CreateFromTriMesh_5 = n.asm.OA).apply(null, arguments)
            }, PD = n._emscripten_bind_btSoftBodyHelpers_CreateFromConvexHull_4 = function () {
                return (PD = n._emscripten_bind_btSoftBodyHelpers_CreateFromConvexHull_4 = n.asm.PA).apply(null, arguments)
            }, TD = n._emscripten_bind_btSoftBodyHelpers___destroy___0 = function () {
                return (TD = n._emscripten_bind_btSoftBodyHelpers___destroy___0 = n.asm.QA).apply(null, arguments)
            }, OD = n._emscripten_enum_PHY_ScalarType_PHY_FLOAT = function () {
                return (OD = n._emscripten_enum_PHY_ScalarType_PHY_FLOAT = n.asm.RA).apply(null, arguments)
            }, WD = n._emscripten_enum_PHY_ScalarType_PHY_DOUBLE = function () {
                return (WD = n._emscripten_enum_PHY_ScalarType_PHY_DOUBLE = n.asm.SA).apply(null, arguments)
            }, AD = n._emscripten_enum_PHY_ScalarType_PHY_INTEGER = function () {
                return (AD = n._emscripten_enum_PHY_ScalarType_PHY_INTEGER = n.asm.TA).apply(null, arguments)
            }, MD = n._emscripten_enum_PHY_ScalarType_PHY_SHORT = function () {
                return (MD = n._emscripten_enum_PHY_ScalarType_PHY_SHORT = n.asm.UA).apply(null, arguments)
            }, xD = n._emscripten_enum_PHY_ScalarType_PHY_FIXEDPOINT88 = function () {
                return (xD = n._emscripten_enum_PHY_ScalarType_PHY_FIXEDPOINT88 = n.asm.VA).apply(null, arguments)
            }, kD = n._emscripten_enum_PHY_ScalarType_PHY_UCHAR = function () {
                return (kD = n._emscripten_enum_PHY_ScalarType_PHY_UCHAR = n.asm.WA).apply(null, arguments)
            }, FD = n._emscripten_enum_eGIMPACT_SHAPE_TYPE_CONST_GIMPACT_COMPOUND_SHAPE = function () {
                return (FD = n._emscripten_enum_eGIMPACT_SHAPE_TYPE_CONST_GIMPACT_COMPOUND_SHAPE = n.asm.XA).apply(null, arguments)
            }, LD = n._emscripten_enum_eGIMPACT_SHAPE_TYPE_CONST_GIMPACT_TRIMESH_SHAPE_PART = function () {
                return (LD = n._emscripten_enum_eGIMPACT_SHAPE_TYPE_CONST_GIMPACT_TRIMESH_SHAPE_PART = n.asm.YA).apply(null, arguments)
            }, GD = n._emscripten_enum_eGIMPACT_SHAPE_TYPE_CONST_GIMPACT_TRIMESH_SHAPE = function () {
                return (GD = n._emscripten_enum_eGIMPACT_SHAPE_TYPE_CONST_GIMPACT_TRIMESH_SHAPE = n.asm.ZA).apply(null, arguments)
            }, wD = n._emscripten_enum_btConstraintParams_BT_CONSTRAINT_ERP = function () {
                return (wD = n._emscripten_enum_btConstraintParams_BT_CONSTRAINT_ERP = n.asm._A).apply(null, arguments)
            }, HD = n._emscripten_enum_btConstraintParams_BT_CONSTRAINT_STOP_ERP = function () {
                return (HD = n._emscripten_enum_btConstraintParams_BT_CONSTRAINT_STOP_ERP = n.asm.$A).apply(null, arguments)
            }, VD = n._emscripten_enum_btConstraintParams_BT_CONSTRAINT_CFM = function () {
                return (VD = n._emscripten_enum_btConstraintParams_BT_CONSTRAINT_CFM = n.asm.aB).apply(null, arguments)
            }, ED = n._emscripten_enum_btConstraintParams_BT_CONSTRAINT_STOP_CFM = function () {
                return (ED = n._emscripten_enum_btConstraintParams_BT_CONSTRAINT_STOP_CFM = n.asm.bB).apply(null, arguments)
            };

        function ND() {
            function t() {
                if (!Q && (Q = !0, n.calledRun = !0, !B)) {
                    if (W = !0, E(T), o(n), n.onRuntimeInitialized && n.onRuntimeInitialized(), n.postRun) for ("function" == typeof n.postRun && (n.postRun = [n.postRun]); n.postRun.length;) {
                        var t = n.postRun.shift();
                        O.unshift(t)
                    }
                    E(O)
                }
            }

            if (!(0 < x)) {
                if (n.preRun) for ("function" == typeof n.preRun && (n.preRun = [n.preRun]); n.preRun.length;) A();
                E(P), 0 < x || (n.setStatus ? (n.setStatus("Running..."), setTimeout(function () {
                    setTimeout(function () {
                        n.setStatus("")
                    }, 1), t()
                }, 1)) : t())
            }
        }

        if (n._malloc = function () {
            return (n._malloc = n.asm.dB).apply(null, arguments)
        }, n.UTF8ToString = C, n.addFunction = function (t, e) {
            if (!d) {
                d = new WeakMap;
                for (var n = D.length, o = 0; o < 0 + n; o++) {
                    var _ = U(o);
                    _ && d.set(_, o)
                }
            }
            if (d.has(t)) return d.get(t);
            if (h.length) n = h.pop(); else {
                try {
                    D.grow(1)
                } catch (t) {
                    if (!(t instanceof RangeError)) throw t;
                    throw"Unable to grow wasm table. Set ALLOW_TABLE_GROWTH."
                }
                n = D.length - 1
            }
            try {
                o = n, D.set(o, t), N[o] = t
            } catch (p) {
                if (!(p instanceof TypeError)) throw p;
                if ("function" == typeof WebAssembly.Function) {
                    _ = {i: "i32", j: "i64", f: "f32", d: "f64"};
                    var i = {parameters: [], results: "v" == e[0] ? [] : [_[e[0]]]};
                    for (o = 1; o < e.length; ++o) i.parameters.push(_[e[o]]);
                    o = new WebAssembly.Function(i, t)
                } else {
                    _ = [1, 0, 1, 96], i = e.slice(0, 1), e = e.slice(1);
                    var r = {i: 127, j: 126, f: 125, d: 124};
                    for (_.push(e.length), o = 0; o < e.length; ++o) _.push(r[e[o]]);
                    "v" == i ? _.push(0) : _ = _.concat([1, r[i]]), _[1] = _.length - 2, e = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0].concat(_, [2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0])), e = new WebAssembly.Module(e), o = new WebAssembly.Instance(e, {e: {f: t}}).exports.f
                }
                e = n, D.set(e, o), N[e] = o
            }
            return d.set(t, n), n
        }, F = function t() {
            Q || ND(), Q || (F = t)
        }, n.run = ND, n.preInit) for ("function" == typeof n.preInit && (n.preInit = [n.preInit]); 0 < n.preInit.length;) n.preInit.pop()();

        function UD() {
        }

        function zD(t) {
            return (t || UD).gB
        }

        function qD(t, e) {
            var n = zD(e), o = n[t];
            return o || ((o = Object.create((e || UD).prototype)).eB = t, n[t] = o)
        }

        ND(), UD.prototype = Object.create(UD.prototype), UD.prototype.constructor = UD, UD.prototype.fB = UD, UD.gB = {}, n.WrapperObject = UD, n.getCache = zD, n.wrapPointer = qD, n.castObject = function (t, e) {
            return qD(t.eB, e)
        }, n.NULL = qD(0), n.destroy = function (t) {
            if (!t.__destroy__) throw"Error: Cannot destroy object. (Did you create it yourself?)";
            t.__destroy__(), delete zD(t.fB)[t.eB]
        }, n.compare = function (t, e) {
            return t.eB === e.eB
        }, n.getPointer = function (t) {
            return t.eB
        }, n.getClass = function (t) {
            return t.fB
        };
        var KD = 0, QD = 0, XD = 0, ZD = [], YD = 0;

        function JD() {
            if (YD) {
                for (var t = 0; t < ZD.length; t++) n._free(ZD[t]);
                ZD.length = 0, n._free(KD), KD = 0, QD += YD, YD = 0
            }
            KD || (QD += 128, (KD = n._malloc(QD)) || L(void 0)), XD = 0
        }

        function $D(t, e) {
            return KD || L(void 0), t = t.length * e.BYTES_PER_ELEMENT, XD + (t = t + 7 & -8) >= QD ? (0 < t || L(void 0), YD += t, e = n._malloc(t), ZD.push(e)) : (e = KD + XD, XD += t), e
        }

        function tP(t, e, n) {
            switch (n >>>= 0, e.BYTES_PER_ELEMENT) {
                case 2:
                    n >>>= 1;
                    break;
                case 4:
                    n >>>= 2;
                    break;
                case 8:
                    n >>>= 3
            }
            for (var o = 0; o < t.length; o++) e[n + o] = t[o]
        }

        function eP(t) {
            if ("string" == typeof t) {
                for (var e = 0, n = 0; n < t.length; ++n) {
                    var o = t.charCodeAt(n);
                    55296 <= o && 57343 >= o && (o = 65536 + ((1023 & o) << 10) | 1023 & t.charCodeAt(++n)), 127 >= o ? ++e : e = 2047 >= o ? e + 2 : 65535 >= o ? e + 3 : e + 4
                }
                if (n = 0, 0 < (o = (e = Array(e + 1)).length)) {
                    o = n + o - 1;
                    for (var _ = 0; _ < t.length; ++_) {
                        var i = t.charCodeAt(_);
                        if (55296 <= i && 57343 >= i && (i = 65536 + ((1023 & i) << 10) | 1023 & t.charCodeAt(++_)), 127 >= i) {
                            if (n >= o) break;
                            e[n++] = i
                        } else {
                            if (2047 >= i) {
                                if (n + 1 >= o) break;
                                e[n++] = 192 | i >> 6
                            } else {
                                if (65535 >= i) {
                                    if (n + 2 >= o) break;
                                    e[n++] = 224 | i >> 12
                                } else {
                                    if (n + 3 >= o) break;
                                    e[n++] = 240 | i >> 18, e[n++] = 128 | i >> 12 & 63
                                }
                                e[n++] = 128 | i >> 6 & 63
                            }
                            e[n++] = 128 | 63 & i
                        }
                    }
                    e[n] = 0
                }
                return t = $D(e, S), tP(e, S, t), t
            }
            return t
        }

        function nP(t) {
            if ("object" == typeof t) {
                var e = $D(t, I);
                return tP(t, I, e), e
            }
            return t
        }

        function oP() {
            throw"cannot construct a btCollisionShape, no constructor in IDL"
        }

        function _P() {
            throw"cannot construct a btCollisionWorld, no constructor in IDL"
        }

        function iP() {
            throw"cannot construct a btCollisionObject, no constructor in IDL"
        }

        function rP() {
            throw"cannot construct a btConcaveShape, no constructor in IDL"
        }

        function pP() {
            throw"cannot construct a btCollisionAlgorithm, no constructor in IDL"
        }

        function sP() {
            throw"cannot construct a btTypedConstraint, no constructor in IDL"
        }

        function cP() {
            throw"cannot construct a btDynamicsWorld, no constructor in IDL"
        }

        function aP() {
            throw"cannot construct a btIDebugDraw, no constructor in IDL"
        }

        function lP(t, e, n) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), this.eB = void 0 === t ? Le() : void 0 === e ? _emscripten_bind_btVector3_btVector3_1(t) : void 0 === n ? _emscripten_bind_btVector3_btVector3_2(t, e) : Ge(t, e, n), zD(lP)[this.eB] = this
        }

        function uP() {
            throw"cannot construct a btQuadWord, no constructor in IDL"
        }

        function bP() {
            throw"cannot construct a btMotionState, no constructor in IDL"
        }

        function yP() {
            throw"cannot construct a RayResultCallback, no constructor in IDL"
        }

        function mP() {
            throw"cannot construct a ContactResultCallback, no constructor in IDL"
        }

        function dP() {
            throw"cannot construct a ConvexResultCallback, no constructor in IDL"
        }

        function fP() {
            throw"cannot construct a btConvexShape, no constructor in IDL"
        }

        function hP(t, e) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), this.eB = Vn(t, e), zD(hP)[this.eB] = this
        }

        function BP(t) {
            t && "object" == typeof t && (t = t.eB), this.eB = Yn(t), zD(BP)[this.eB] = this
        }

        function gP(t, e) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), this.eB = _o(t, e), zD(gP)[this.eB] = this
        }

        function CP() {
            throw"cannot construct a btStridingMeshInterface, no constructor in IDL"
        }

        function SP() {
            throw"cannot construct a btTriangleMeshShape, no constructor in IDL"
        }

        function jP() {
            throw"cannot construct a btPrimitiveManagerBase, no constructor in IDL"
        }

        function vP() {
            throw"cannot construct a btGImpactShapeInterface, no constructor in IDL"
        }

        function IP() {
            throw"cannot construct a btActivatingCollisionAlgorithm, no constructor in IDL"
        }

        function RP(t) {
            t && "object" == typeof t && (t = t.eB), this.eB = void 0 === t ? Vo() : Eo(t), zD(RP)[this.eB] = this
        }

        function DP() {
            throw"cannot construct a btDispatcher, no constructor in IDL"
        }

        function PP(t, e, n, o, _) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), _ && "object" == typeof _ && (_ = _.eB), this.eB = void 0 === o ? Ko(t, e, n) : void 0 === _ ? _emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_4(t, e, n, o) : Qo(t, e, n, o, _), zD(PP)[this.eB] = this
        }

        function TP(t, e, n, o) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), this.eB = r_(t, e, n, o), zD(TP)[this.eB] = this
        }

        function OP() {
            throw"cannot construct a btVehicleRaycaster, no constructor in IDL"
        }

        function WP() {
            throw"cannot construct a btActionInterface, no constructor in IDL"
        }

        function AP() {
            this.eB = X_(), zD(AP)[this.eB] = this
        }

        function MP() {
            throw"cannot construct a btSoftBodySolver, no constructor in IDL"
        }

        function xP() {
            throw"cannot construct a VoidPtr, no constructor in IDL"
        }

        function kP() {
            this.eB = Oi(), zD(kP)[this.eB] = this
        }

        function FP(t, e, n, o) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), this.eB = void 0 === t ? Gi() : void 0 === e ? _emscripten_bind_btVector4_btVector4_1(t) : void 0 === n ? _emscripten_bind_btVector4_btVector4_2(t, e) : void 0 === o ? _emscripten_bind_btVector4_btVector4_3(t, e, n) : wi(t, e, n, o), zD(FP)[this.eB] = this
        }

        function LP(t, e, n, o) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), this.eB = nr(t, e, n, o), zD(LP)[this.eB] = this
        }

        function GP() {
            throw"cannot construct a btMatrix3x3, no constructor in IDL"
        }

        function wP(t, e) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), this.eB = void 0 === t ? kr() : void 0 === e ? _emscripten_bind_btTransform_btTransform_1(t) : Fr(t, e), zD(wP)[this.eB] = this
        }

        function HP(t, e) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), this.eB = void 0 === t ? Kr() : void 0 === e ? Qr(t) : Xr(t, e), zD(HP)[this.eB] = this
        }

        function VP() {
            throw"cannot construct a btCollisionObjectWrapper, no constructor in IDL"
        }

        function EP(t, e) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), this.eB = _p(t, e), zD(EP)[this.eB] = this
        }

        function NP() {
            throw"cannot construct a btConstCollisionObjectArray, no constructor in IDL"
        }

        function UP() {
            throw"cannot construct a btScalarArray, no constructor in IDL"
        }

        function zP(t, e) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), this.eB = Wp(t, e), zD(zP)[this.eB] = this
        }

        function qP() {
            throw"cannot construct a btManifoldPoint, no constructor in IDL"
        }

        function KP() {
            this.eB = Bs(), zD(KP)[this.eB] = this
        }

        function QP() {
            throw"cannot construct a LocalShapeInfo, no constructor in IDL"
        }

        function XP(t, e, n, o, _) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), _ && "object" == typeof _ && (_ = _.eB), this.eB = Ds(t, e, n, o, _), zD(XP)[this.eB] = this
        }

        function ZP(t, e) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), this.eB = ws(t, e), zD(ZP)[this.eB] = this
        }

        function YP(t, e) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), this.eB = void 0 === e ? _c(t) : ic(t, e), zD(YP)[this.eB] = this
        }

        function JP(t) {
            t && "object" == typeof t && (t = t.eB), this.eB = uc(t), zD(JP)[this.eB] = this
        }

        function $P(t, e) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), this.eB = Bc(t, e), zD($P)[this.eB] = this
        }

        function tT(t, e) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), this.eB = Tc(t, e), zD(tT)[this.eB] = this
        }

        function eT(t) {
            t && "object" == typeof t && (t = t.eB), this.eB = wc(t), zD(eT)[this.eB] = this
        }

        function nT(t) {
            t && "object" == typeof t && (t = t.eB), this.eB = qc(t), zD(nT)[this.eB] = this
        }

        function oT(t) {
            t && "object" == typeof t && (t = t.eB), this.eB = $c(t), zD(oT)[this.eB] = this
        }

        function _T(t, e, n) {
            JD(), t && "object" == typeof t && (t = t.eB), "object" == typeof e && (e = nP(e)), n && "object" == typeof n && (n = n.eB), this.eB = ra(t, e, n), zD(_T)[this.eB] = this
        }

        function iT(t, e) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), this.eB = la(t, e), zD(iT)[this.eB] = this
        }

        function rT(t, e) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), this.eB = da(t, e), zD(rT)[this.eB] = this
        }

        function pT() {
            throw"cannot construct a btIntArray, no constructor in IDL"
        }

        function sT() {
            throw"cannot construct a btFace, no constructor in IDL"
        }

        function cT() {
            throw"cannot construct a btVector3Array, no constructor in IDL"
        }

        function aT() {
            throw"cannot construct a btFaceArray, no constructor in IDL"
        }

        function lT() {
            throw"cannot construct a btConvexPolyhedron, no constructor in IDL"
        }

        function uT(t, e) {
            JD(), "object" == typeof t && (t = nP(t)), e && "object" == typeof e && (e = e.eB), this.eB = void 0 === t ? Ha() : void 0 === e ? Va(t) : Ea(t, e), zD(uT)[this.eB] = this
        }

        function bT(t) {
            t && "object" == typeof t && (t = t.eB), this.eB = el(t), zD(bT)[this.eB] = this
        }

        function yT(t) {
            t && "object" == typeof t && (t = t.eB), this.eB = void 0 === t ? rl() : pl(t), zD(yT)[this.eB] = this
        }

        function mT() {
            throw"cannot construct a btIndexedMesh, no constructor in IDL"
        }

        function dT() {
            throw"cannot construct a btIndexedMeshArray, no constructor in IDL"
        }

        function fT(t, e) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), this.eB = void 0 === t ? Dl() : void 0 === e ? Pl(t) : Tl(t, e), zD(fT)[this.eB] = this
        }

        function hT() {
            this.eB = Ll(), zD(hT)[this.eB] = this
        }

        function BT(t, e) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), this.eB = El(t, e), zD(BT)[this.eB] = this
        }

        function gT(t, e, n) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), this.eB = void 0 === n ? Kl(t, e) : Ql(t, e, n), zD(gT)[this.eB] = this
        }

        function CT(t, e, n, o, _, i, r, p, s) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), _ && "object" == typeof _ && (_ = _.eB), i && "object" == typeof i && (i = i.eB), r && "object" == typeof r && (r = r.eB), p && "object" == typeof p && (p = p.eB), s && "object" == typeof s && (s = s.eB), this.eB = $l(t, e, n, o, _, i, r, p, s), zD(CT)[this.eB] = this
        }

        function ST(t, e, n, o) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), this.eB = ru(t, e, n, o), zD(ST)[this.eB] = this
        }

        function jT() {
            this.eB = lu(), zD(jT)[this.eB] = this
        }

        function vT(t, e, n) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), this.eB = bu(t, e, n), zD(vT)[this.eB] = this
        }

        function IT() {
            this.eB = hu(), zD(IT)[this.eB] = this
        }

        function RT() {
            throw"cannot construct a CompoundPrimitiveManager, no constructor in IDL"
        }

        function DT(t) {
            t && "object" == typeof t && (t = t.eB), this.eB = void 0 === t ? Pu() : Tu(t), zD(DT)[this.eB] = this
        }

        function PT(t) {
            t && "object" == typeof t && (t = t.eB), this.eB = void 0 === t ? Ju() : $u(t), zD(PT)[this.eB] = this
        }

        function TT(t, e) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), this.eB = Pb(t, e), zD(TT)[this.eB] = this
        }

        function OT(t) {
            t && "object" == typeof t && (t = t.eB), this.eB = Nb(t), zD(OT)[this.eB] = this
        }

        function WT(t, e) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), this.eB = void 0 === t ? _y() : void 0 === e ? _emscripten_bind_btCollisionAlgorithmConstructionInfo_btCollisionAlgorithmConstructionInfo_1(t) : iy(t, e), zD(WT)[this.eB] = this
        }

        function AT(t, e, n) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), this.eB = ly(t, e, n), zD(AT)[this.eB] = this
        }

        function MT() {
            this.eB = yy(), zD(MT)[this.eB] = this
        }

        function xT() {
            this.eB = dy(), zD(xT)[this.eB] = this
        }

        function kT(t) {
            t && "object" == typeof t && (t = t.eB), this.eB = Sy(t), zD(kT)[this.eB] = this
        }

        function FT() {
            throw"cannot construct a btOverlappingPairCallback, no constructor in IDL"
        }

        function LT() {
            throw"cannot construct a btOverlappingPairCache, no constructor in IDL"
        }

        function GT(t, e, n, o, _) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), _ && "object" == typeof _ && (_ = _.eB), this.eB = void 0 === n ? Oy(t, e) : void 0 === o ? Wy(t, e, n) : void 0 === _ ? Ay(t, e, n, o) : My(t, e, n, o, _), zD(GT)[this.eB] = this
        }

        function wT() {
            throw"cannot construct a btBroadphaseInterface, no constructor in IDL"
        }

        function HT() {
            throw"cannot construct a btCollisionConfiguration, no constructor in IDL"
        }

        function VT() {
            this.eB = Gy(), zD(VT)[this.eB] = this
        }

        function ET() {
            throw"cannot construct a btBroadphaseProxy, no constructor in IDL"
        }

        function NT(t, e, n, o) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), this.eB = void 0 === o ? zy(t, e, n) : qy(t, e, n, o), zD(NT)[this.eB] = this
        }

        function UT(t) {
            t && "object" == typeof t && (t = t.eB), this.eB = hm(t), zD(UT)[this.eB] = this
        }

        function zT() {
            this.eB = Pd(), zD(zT)[this.eB] = this
        }

        function qT(t, e, n, o) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), this.eB = void 0 === n ? Fd(t, e) : void 0 === o ? _emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_3(t, e, n) : Ld(t, e, n, o), zD(qT)[this.eB] = this
        }

        function KT(t, e, n, o, _) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), _ && "object" == typeof _ && (_ = _.eB), this.eB = void 0 === o ? Zd(t, e, n) : void 0 === _ ? _emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_4(t, e, n, o) : Yd(t, e, n, o, _), zD(KT)[this.eB] = this
        }

        function QT() {
            this.eB = df(), zD(QT)[this.eB] = this
        }

        function XT(t, e, n, o) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), this.eB = void 0 === n ? hf(t, e) : void 0 === o ? _emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_3(t, e, n) : Bf(t, e, n, o), zD(XT)[this.eB] = this
        }

        function ZT(t, e, n, o, _, i, r) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), _ && "object" == typeof _ && (_ = _.eB), i && "object" == typeof i && (i = i.eB), r && "object" == typeof r && (r = r.eB), this.eB = void 0 === n ? xf(t, e) : void 0 === o ? kf(t, e, n) : void 0 === _ ? Ff(t, e, n, o) : void 0 === i ? Lf(t, e, n, o, _) : void 0 === r ? Gf(t, e, n, o, _, i) : wf(t, e, n, o, _, i, r), zD(ZT)[this.eB] = this
        }

        function YT(t, e, n, o, _) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), _ && "object" == typeof _ && (_ = _.eB), this.eB = void 0 === o ? th(t, e, n) : void 0 === _ ? _emscripten_bind_btSliderConstraint_btSliderConstraint_4(t, e, n, o) : eh(t, e, n, o, _), zD(YT)[this.eB] = this
        }

        function JT(t, e, n, o) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), this.eB = fh(t, e, n, o), zD(JT)[this.eB] = this
        }

        function $T() {
            throw"cannot construct a btConstraintSolver, no constructor in IDL"
        }

        function tO() {
            throw"cannot construct a btDispatcherInfo, no constructor in IDL"
        }

        function eO() {
            throw"cannot construct a btContactSolverInfo, no constructor in IDL"
        }

        function nO() {
            this.eB = eB(), zD(nO)[this.eB] = this
        }

        function oO() {
            throw"cannot construct a btVehicleRaycasterResult, no constructor in IDL"
        }

        function _O(t) {
            t && "object" == typeof t && (t = t.eB), this.eB = CB(t), zD(_O)[this.eB] = this
        }

        function iO() {
            throw"cannot construct a RaycastInfo, no constructor in IDL"
        }

        function rO() {
            throw"cannot construct a btWheelInfoConstructionInfo, no constructor in IDL"
        }

        function pO(t) {
            t && "object" == typeof t && (t = t.eB), this.eB = ug(t), zD(pO)[this.eB] = this
        }

        function sO(t, e, n, o) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), this.eB = void 0 === o ? aC(t, e, n) : lC(t, e, n, o), zD(sO)[this.eB] = this
        }

        function cO(t, e, n) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), this.eB = MC(t, e, n), zD(cO)[this.eB] = this
        }

        function aO() {
            this.eB = lS(), zD(aO)[this.eB] = this
        }

        function lO() {
            this.eB = US(), zD(lO)[this.eB] = this
        }

        function uO() {
            this.eB = qS(), zD(uO)[this.eB] = this
        }

        function bO() {
            throw"cannot construct a Face, no constructor in IDL"
        }

        function yO() {
            throw"cannot construct a tFaceArray, no constructor in IDL"
        }

        function mO() {
            throw"cannot construct a ShaderNode, no constructor in IDL"
        }

        function dO() {
            throw"cannot construct a tNodeArray, no constructor in IDL"
        }

        function fO() {
            throw"cannot construct a Material, no constructor in IDL"
        }

        function hO() {
            throw"cannot construct a tMaterialArray, no constructor in IDL"
        }

        function BO() {
            throw"cannot construct a Anchor, no constructor in IDL"
        }

        function gO() {
            throw"cannot construct a tAnchorArray, no constructor in IDL"
        }

        function CO() {
            throw"cannot construct a Config, no constructor in IDL"
        }

        function SO(t, e, n, o) {
            JD(), t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), "object" == typeof o && (o = nP(o)), this.eB = yI(t, e, n, o), zD(SO)[this.eB] = this
        }

        function jO(t) {
            t && "object" == typeof t && (t = t.eB), this.eB = void 0 === t ? IR() : RR(t), zD(jO)[this.eB] = this
        }

        function vO() {
            this.eB = PR(), zD(vO)[this.eB] = this
        }

        function IO() {
            throw"cannot construct a btSoftBodyArray, no constructor in IDL"
        }

        function RO(t, e, n, o, _) {
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), _ && "object" == typeof _ && (_ = _.eB), this.eB = MR(t, e, n, o, _), zD(RO)[this.eB] = this
        }

        function DO() {
            this.eB = SD(), zD(DO)[this.eB] = this
        }

        return oP.prototype = Object.create(UD.prototype), oP.prototype.constructor = oP, oP.prototype.fB = oP, oP.gB = {}, n.btCollisionShape = oP, oP.prototype.setLocalScaling = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), X(e, t)
        }, oP.prototype.getLocalScaling = function () {
            return qD(Z(this.eB), lP)
        }, oP.prototype.calculateLocalInertia = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Y(n, t, e)
        }, oP.prototype.setMargin = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), J(e, t)
        }, oP.prototype.getMargin = function () {
            return $(this.eB)
        }, oP.prototype.__destroy__ = function () {
            tt(this.eB)
        }, _P.prototype = Object.create(UD.prototype), _P.prototype.constructor = _P, _P.prototype.fB = _P, _P.gB = {}, n.btCollisionWorld = _P, _P.prototype.getDispatcher = function () {
            return qD(et(this.eB), DP)
        }, _P.prototype.rayTest = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), nt(o, t, e, n)
        }, _P.prototype.getPairCache = function () {
            return qD(ot(this.eB), LT)
        }, _P.prototype.getDispatchInfo = function () {
            return qD(_t(this.eB), tO)
        }, _P.prototype.addCollisionObject = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), void 0 === e ? it(o, t) : void 0 === n ? rt(o, t, e) : pt(o, t, e, n)
        }, _P.prototype.removeCollisionObject = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), st(e, t)
        }, _P.prototype.getBroadphase = function () {
            return qD(ct(this.eB), wT)
        }, _P.prototype.convexSweepTest = function (t, e, n, o, _) {
            var i = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), _ && "object" == typeof _ && (_ = _.eB), at(i, t, e, n, o, _)
        }, _P.prototype.contactPairTest = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), lt(o, t, e, n)
        }, _P.prototype.contactTest = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), ut(n, t, e)
        }, _P.prototype.updateSingleAabb = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), bt(e, t)
        }, _P.prototype.setDebugDrawer = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), yt(e, t)
        }, _P.prototype.getDebugDrawer = function () {
            return qD(mt(this.eB), aP)
        }, _P.prototype.debugDrawWorld = function () {
            dt(this.eB)
        }, _P.prototype.debugDrawObject = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), ft(o, t, e, n)
        }, _P.prototype.__destroy__ = function () {
            ht(this.eB)
        }, iP.prototype = Object.create(UD.prototype), iP.prototype.constructor = iP, iP.prototype.fB = iP, iP.gB = {}, n.btCollisionObject = iP, iP.prototype.setAnisotropicFriction = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Bt(n, t, e)
        }, iP.prototype.getCollisionShape = function () {
            return qD(gt(this.eB), oP)
        }, iP.prototype.setContactProcessingThreshold = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ct(e, t)
        }, iP.prototype.setActivationState = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), St(e, t)
        }, iP.prototype.forceActivationState = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), jt(e, t)
        }, iP.prototype.activate = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), void 0 === t ? vt(e) : It(e, t)
        }, iP.prototype.isActive = function () {
            return !!Rt(this.eB)
        }, iP.prototype.isKinematicObject = function () {
            return !!Dt(this.eB)
        }, iP.prototype.isStaticObject = function () {
            return !!Pt(this.eB)
        }, iP.prototype.isStaticOrKinematicObject = function () {
            return !!Tt(this.eB)
        }, iP.prototype.getRestitution = function () {
            return Ot(this.eB)
        }, iP.prototype.getFriction = function () {
            return Wt(this.eB)
        }, iP.prototype.getRollingFriction = function () {
            return At(this.eB)
        }, iP.prototype.setRestitution = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Mt(e, t)
        }, iP.prototype.setFriction = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), xt(e, t)
        }, iP.prototype.setRollingFriction = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), kt(e, t)
        }, iP.prototype.getWorldTransform = function () {
            return qD(Ft(this.eB), wP)
        }, iP.prototype.getCollisionFlags = function () {
            return Lt(this.eB)
        }, iP.prototype.setCollisionFlags = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Gt(e, t)
        }, iP.prototype.setWorldTransform = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), wt(e, t)
        }, iP.prototype.setCollisionShape = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ht(e, t)
        }, iP.prototype.setCcdMotionThreshold = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Vt(e, t)
        }, iP.prototype.setCcdSweptSphereRadius = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Et(e, t)
        }, iP.prototype.getUserIndex = function () {
            return Nt(this.eB)
        }, iP.prototype.setUserIndex = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ut(e, t)
        }, iP.prototype.getUserPointer = function () {
            return qD(zt(this.eB), xP)
        }, iP.prototype.setUserPointer = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), qt(e, t)
        }, iP.prototype.getBroadphaseHandle = function () {
            return qD(Kt(this.eB), ET)
        }, iP.prototype.__destroy__ = function () {
            Qt(this.eB)
        }, rP.prototype = Object.create(oP.prototype), rP.prototype.constructor = rP, rP.prototype.fB = rP, rP.gB = {}, n.btConcaveShape = rP, rP.prototype.setLocalScaling = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Xt(e, t)
        }, rP.prototype.getLocalScaling = function () {
            return qD(Zt(this.eB), lP)
        }, rP.prototype.calculateLocalInertia = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Yt(n, t, e)
        }, rP.prototype.__destroy__ = function () {
            Jt(this.eB)
        }, pP.prototype = Object.create(UD.prototype), pP.prototype.constructor = pP, pP.prototype.fB = pP, pP.gB = {}, n.btCollisionAlgorithm = pP, pP.prototype.__destroy__ = function () {
            $t(this.eB)
        }, sP.prototype = Object.create(UD.prototype), sP.prototype.constructor = sP, sP.prototype.fB = sP, sP.gB = {}, n.btTypedConstraint = sP, sP.prototype.enableFeedback = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), te(e, t)
        }, sP.prototype.getBreakingImpulseThreshold = function () {
            return ee(this.eB)
        }, sP.prototype.setBreakingImpulseThreshold = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ne(e, t)
        }, sP.prototype.getParam = function (t, e) {
            var n = this.eB;
            return t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), oe(n, t, e)
        }, sP.prototype.setParam = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), _e(o, t, e, n)
        }, sP.prototype.__destroy__ = function () {
            ie(this.eB)
        }, cP.prototype = Object.create(_P.prototype), cP.prototype.constructor = cP, cP.prototype.fB = cP, cP.gB = {}, n.btDynamicsWorld = cP, cP.prototype.addAction = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), re(e, t)
        }, cP.prototype.removeAction = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), pe(e, t)
        }, cP.prototype.getSolverInfo = function () {
            return qD(se(this.eB), eO)
        }, cP.prototype.setInternalTickCallback = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), void 0 === e ? ce(o, t) : void 0 === n ? ae(o, t, e) : le(o, t, e, n)
        },cP.prototype.getDispatcher = function () {
            return qD(ue(this.eB), DP)
        },cP.prototype.rayTest = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), be(o, t, e, n)
        },cP.prototype.getPairCache = function () {
            return qD(ye(this.eB), LT)
        },cP.prototype.getDispatchInfo = function () {
            return qD(me(this.eB), tO)
        },cP.prototype.addCollisionObject = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), void 0 === e ? de(o, t) : void 0 === n ? fe(o, t, e) : he(o, t, e, n)
        },cP.prototype.removeCollisionObject = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Be(e, t)
        },cP.prototype.getBroadphase = function () {
            return qD(ge(this.eB), wT)
        },cP.prototype.convexSweepTest = function (t, e, n, o, _) {
            var i = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), _ && "object" == typeof _ && (_ = _.eB), Ce(i, t, e, n, o, _)
        },cP.prototype.contactPairTest = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), Se(o, t, e, n)
        },cP.prototype.contactTest = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), je(n, t, e)
        },cP.prototype.updateSingleAabb = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ve(e, t)
        },cP.prototype.setDebugDrawer = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ie(e, t)
        },cP.prototype.getDebugDrawer = function () {
            return qD(Re(this.eB), aP)
        },cP.prototype.debugDrawWorld = function () {
            De(this.eB)
        },cP.prototype.debugDrawObject = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), Pe(o, t, e, n)
        },cP.prototype.__destroy__ = function () {
            Te(this.eB)
        },aP.prototype = Object.create(UD.prototype),aP.prototype.constructor = aP,aP.prototype.fB = aP,aP.gB = {},n.btIDebugDraw = aP,aP.prototype.drawLine = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), Oe(o, t, e, n)
        },aP.prototype.drawContactPoint = function (t, e, n, o, _) {
            var i = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), _ && "object" == typeof _ && (_ = _.eB), We(i, t, e, n, o, _)
        },aP.prototype.reportErrorWarning = function (t) {
            var e = this.eB;
            JD(), t = t && "object" == typeof t ? t.eB : eP(t), Ae(e, t)
        },aP.prototype.draw3dText = function (t, e) {
            var n = this.eB;
            JD(), t && "object" == typeof t && (t = t.eB), e = e && "object" == typeof e ? e.eB : eP(e), Me(n, t, e)
        },aP.prototype.setDebugMode = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), xe(e, t)
        },aP.prototype.getDebugMode = function () {
            return ke(this.eB)
        },aP.prototype.__destroy__ = function () {
            Fe(this.eB)
        },lP.prototype = Object.create(UD.prototype),lP.prototype.constructor = lP,lP.prototype.fB = lP,lP.gB = {},n.btVector3 = lP,lP.prototype.length = lP.prototype.length = function () {
            return we(this.eB)
        },lP.prototype.x = lP.prototype.x = function () {
            return He(this.eB)
        },lP.prototype.y = lP.prototype.y = function () {
            return Ve(this.eB)
        },lP.prototype.z = lP.prototype.z = function () {
            return Ee(this.eB)
        },lP.prototype.setX = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ne(e, t)
        },lP.prototype.setY = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ue(e, t)
        },lP.prototype.setZ = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ze(e, t)
        },lP.prototype.setValue = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), qe(o, t, e, n)
        },lP.prototype.normalize = lP.prototype.normalize = function () {
            Ke(this.eB)
        },lP.prototype.rotate = lP.prototype.rotate = function (t, e) {
            var n = this.eB;
            return t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), qD(Qe(n, t, e), lP)
        },lP.prototype.dot = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), Xe(e, t)
        },lP.prototype.op_mul = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(Ze(e, t), lP)
        },lP.prototype.op_add = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(Ye(e, t), lP)
        },lP.prototype.op_sub = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(Je(e, t), lP)
        },lP.prototype.__destroy__ = function () {
            $e(this.eB)
        },uP.prototype = Object.create(UD.prototype),uP.prototype.constructor = uP,uP.prototype.fB = uP,uP.gB = {},n.btQuadWord = uP,uP.prototype.x = uP.prototype.x = function () {
            return tn(this.eB)
        },uP.prototype.y = uP.prototype.y = function () {
            return en(this.eB)
        },uP.prototype.z = uP.prototype.z = function () {
            return nn(this.eB)
        },uP.prototype.w = uP.prototype.w = function () {
            return on(this.eB)
        },uP.prototype.setX = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), _n(e, t)
        },uP.prototype.setY = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), rn(e, t)
        },uP.prototype.setZ = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), pn(e, t)
        },uP.prototype.setW = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), sn(e, t)
        },uP.prototype.__destroy__ = function () {
            cn(this.eB)
        },bP.prototype = Object.create(UD.prototype),bP.prototype.constructor = bP,bP.prototype.fB = bP,bP.gB = {},n.btMotionState = bP,bP.prototype.getWorldTransform = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), an(e, t)
        },bP.prototype.setWorldTransform = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ln(e, t)
        },bP.prototype.__destroy__ = function () {
            un(this.eB)
        },yP.prototype = Object.create(UD.prototype),yP.prototype.constructor = yP,yP.prototype.fB = yP,yP.gB = {},n.RayResultCallback = yP,yP.prototype.hasHit = function () {
            return !!bn(this.eB)
        },yP.prototype.get_m_collisionFilterGroup = yP.prototype.hB = function () {
            return yn(this.eB)
        },yP.prototype.set_m_collisionFilterGroup = yP.prototype.jB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), mn(e, t)
        },Object.defineProperty(yP.prototype, "m_collisionFilterGroup", {
            get: yP.prototype.hB,
            set: yP.prototype.jB
        }),yP.prototype.get_m_collisionFilterMask = yP.prototype.iB = function () {
            return dn(this.eB)
        },yP.prototype.set_m_collisionFilterMask = yP.prototype.kB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), fn(e, t)
        },Object.defineProperty(yP.prototype, "m_collisionFilterMask", {
            get: yP.prototype.iB,
            set: yP.prototype.kB
        }),yP.prototype.get_m_closestHitFraction = yP.prototype.lB = function () {
            return hn(this.eB)
        },yP.prototype.set_m_closestHitFraction = yP.prototype.mB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Bn(e, t)
        },Object.defineProperty(yP.prototype, "m_closestHitFraction", {
            get: yP.prototype.lB,
            set: yP.prototype.mB
        }),yP.prototype.get_m_collisionObject = yP.prototype.pB = function () {
            return qD(gn(this.eB), iP)
        },yP.prototype.set_m_collisionObject = yP.prototype.wB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Cn(e, t)
        },Object.defineProperty(yP.prototype, "m_collisionObject", {
            get: yP.prototype.pB,
            set: yP.prototype.wB
        }),yP.prototype.get_m_flags = yP.prototype.nB = function () {
            return Sn(this.eB)
        },yP.prototype.set_m_flags = yP.prototype.oB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), jn(e, t)
        },Object.defineProperty(yP.prototype, "m_flags", {
            get: yP.prototype.nB,
            set: yP.prototype.oB
        }),yP.prototype.__destroy__ = function () {
            vn(this.eB)
        },mP.prototype = Object.create(UD.prototype),mP.prototype.constructor = mP,mP.prototype.fB = mP,mP.gB = {},n.ContactResultCallback = mP,mP.prototype.addSingleResult = function (t, e, n, o, _, i, r) {
            var p = this.eB;
            return t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), _ && "object" == typeof _ && (_ = _.eB), i && "object" == typeof i && (i = i.eB), r && "object" == typeof r && (r = r.eB), In(p, t, e, n, o, _, i, r)
        },mP.prototype.__destroy__ = function () {
            Rn(this.eB)
        },dP.prototype = Object.create(UD.prototype),dP.prototype.constructor = dP,dP.prototype.fB = dP,dP.gB = {},n.ConvexResultCallback = dP,dP.prototype.hasHit = function () {
            return !!Dn(this.eB)
        },dP.prototype.get_m_collisionFilterGroup = dP.prototype.hB = function () {
            return Pn(this.eB)
        },dP.prototype.set_m_collisionFilterGroup = dP.prototype.jB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Tn(e, t)
        },Object.defineProperty(dP.prototype, "m_collisionFilterGroup", {
            get: dP.prototype.hB,
            set: dP.prototype.jB
        }),dP.prototype.get_m_collisionFilterMask = dP.prototype.iB = function () {
            return On(this.eB)
        },dP.prototype.set_m_collisionFilterMask = dP.prototype.kB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Wn(e, t)
        },Object.defineProperty(dP.prototype, "m_collisionFilterMask", {
            get: dP.prototype.iB,
            set: dP.prototype.kB
        }),dP.prototype.get_m_closestHitFraction = dP.prototype.lB = function () {
            return An(this.eB)
        },dP.prototype.set_m_closestHitFraction = dP.prototype.mB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Mn(e, t)
        },Object.defineProperty(dP.prototype, "m_closestHitFraction", {
            get: dP.prototype.lB,
            set: dP.prototype.mB
        }),dP.prototype.__destroy__ = function () {
            xn(this.eB)
        },fP.prototype = Object.create(oP.prototype),fP.prototype.constructor = fP,fP.prototype.fB = fP,fP.gB = {},n.btConvexShape = fP,fP.prototype.setLocalScaling = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), kn(e, t)
        },fP.prototype.getLocalScaling = function () {
            return qD(Fn(this.eB), lP)
        },fP.prototype.calculateLocalInertia = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Ln(n, t, e)
        },fP.prototype.setMargin = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Gn(e, t)
        },fP.prototype.getMargin = function () {
            return wn(this.eB)
        },fP.prototype.__destroy__ = function () {
            Hn(this.eB)
        },hP.prototype = Object.create(oP.prototype),hP.prototype.constructor = hP,hP.prototype.fB = hP,hP.gB = {},n.btCapsuleShape = hP,hP.prototype.setMargin = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), En(e, t)
        },hP.prototype.getMargin = function () {
            return Nn(this.eB)
        },hP.prototype.getUpAxis = function () {
            return Un(this.eB)
        },hP.prototype.getRadius = function () {
            return zn(this.eB)
        },hP.prototype.getHalfHeight = function () {
            return qn(this.eB)
        },hP.prototype.setLocalScaling = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Kn(e, t)
        },hP.prototype.getLocalScaling = function () {
            return qD(Qn(this.eB), lP)
        },hP.prototype.calculateLocalInertia = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Xn(n, t, e)
        },hP.prototype.__destroy__ = function () {
            Zn(this.eB)
        },BP.prototype = Object.create(oP.prototype),BP.prototype.constructor = BP,BP.prototype.fB = BP,BP.gB = {},n.btCylinderShape = BP,BP.prototype.setMargin = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Jn(e, t)
        },BP.prototype.getMargin = function () {
            return $n(this.eB)
        },BP.prototype.setLocalScaling = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), to(e, t)
        },BP.prototype.getLocalScaling = function () {
            return qD(eo(this.eB), lP)
        },BP.prototype.calculateLocalInertia = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), no(n, t, e)
        },BP.prototype.__destroy__ = function () {
            oo(this.eB)
        },gP.prototype = Object.create(oP.prototype),gP.prototype.constructor = gP,gP.prototype.fB = gP,gP.gB = {},n.btConeShape = gP,gP.prototype.setLocalScaling = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), io(e, t)
        },gP.prototype.getLocalScaling = function () {
            return qD(ro(this.eB), lP)
        },gP.prototype.calculateLocalInertia = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), po(n, t, e)
        },gP.prototype.__destroy__ = function () {
            so(this.eB)
        },CP.prototype = Object.create(UD.prototype),CP.prototype.constructor = CP,CP.prototype.fB = CP,CP.gB = {},n.btStridingMeshInterface = CP,CP.prototype.setScaling = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), co(e, t)
        },CP.prototype.__destroy__ = function () {
            ao(this.eB)
        },SP.prototype = Object.create(rP.prototype),SP.prototype.constructor = SP,SP.prototype.fB = SP,SP.gB = {},n.btTriangleMeshShape = SP,SP.prototype.setLocalScaling = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), lo(e, t)
        },SP.prototype.getLocalScaling = function () {
            return qD(uo(this.eB), lP)
        },SP.prototype.calculateLocalInertia = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), bo(n, t, e)
        },SP.prototype.__destroy__ = function () {
            yo(this.eB)
        },jP.prototype = Object.create(UD.prototype),jP.prototype.constructor = jP,jP.prototype.fB = jP,jP.gB = {},n.btPrimitiveManagerBase = jP,jP.prototype.is_trimesh = function () {
            return !!mo(this.eB)
        },jP.prototype.get_primitive_count = function () {
            return fo(this.eB)
        },jP.prototype.get_primitive_box = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), ho(n, t, e)
        },jP.prototype.get_primitive_triangle = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Bo(n, t, e)
        },jP.prototype.__destroy__ = function () {
            go(this.eB)
        },vP.prototype = Object.create(rP.prototype),vP.prototype.constructor = vP,vP.prototype.fB = vP,vP.gB = {},n.btGImpactShapeInterface = vP,vP.prototype.updateBound = function () {
            Co(this.eB)
        },vP.prototype.postUpdate = function () {
            So(this.eB)
        },vP.prototype.getShapeType = function () {
            return jo(this.eB)
        },vP.prototype.getName = function () {
            return C(vo(this.eB))
        },vP.prototype.getGImpactShapeType = function () {
            return Io(this.eB)
        },vP.prototype.getPrimitiveManager = function () {
            return qD(Ro(this.eB), jP)
        },vP.prototype.getNumChildShapes = function () {
            return Do(this.eB)
        },vP.prototype.childrenHasTransform = function () {
            return !!Po(this.eB)
        },vP.prototype.needsRetrieveTriangles = function () {
            return !!To(this.eB)
        },vP.prototype.needsRetrieveTetrahedrons = function () {
            return !!Oo(this.eB)
        },vP.prototype.getBulletTriangle = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Wo(n, t, e)
        },vP.prototype.getBulletTetrahedron = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Ao(n, t, e)
        },vP.prototype.getChildShape = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(Mo(e, t), oP)
        },vP.prototype.getChildTransform = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(xo(e, t), wP)
        },vP.prototype.setChildTransform = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), ko(n, t, e)
        },vP.prototype.setLocalScaling = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Fo(e, t)
        },vP.prototype.getLocalScaling = function () {
            return qD(Lo(this.eB), lP)
        },vP.prototype.calculateLocalInertia = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Go(n, t, e)
        },vP.prototype.__destroy__ = function () {
            wo(this.eB)
        },IP.prototype = Object.create(pP.prototype),IP.prototype.constructor = IP,IP.prototype.fB = IP,IP.gB = {},n.btActivatingCollisionAlgorithm = IP,IP.prototype.__destroy__ = function () {
            Ho(this.eB)
        },RP.prototype = Object.create(UD.prototype),RP.prototype.constructor = RP,RP.prototype.fB = RP,RP.gB = {},n.btDefaultCollisionConfiguration = RP,RP.prototype.__destroy__ = function () {
            No(this.eB)
        },DP.prototype = Object.create(UD.prototype),DP.prototype.constructor = DP,DP.prototype.fB = DP,DP.gB = {},n.btDispatcher = DP,DP.prototype.getNumManifolds = function () {
            return Uo(this.eB)
        },DP.prototype.getManifoldByIndexInternal = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(zo(e, t), xT)
        },DP.prototype.__destroy__ = function () {
            qo(this.eB)
        },PP.prototype = Object.create(sP.prototype),PP.prototype.constructor = PP,PP.prototype.fB = PP,PP.gB = {},n.btGeneric6DofConstraint = PP,PP.prototype.setLinearLowerLimit = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Xo(e, t)
        },PP.prototype.setLinearUpperLimit = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Zo(e, t)
        },PP.prototype.setAngularLowerLimit = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Yo(e, t)
        },PP.prototype.setAngularUpperLimit = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Jo(e, t)
        },PP.prototype.getFrameOffsetA = function () {
            return qD($o(this.eB), wP)
        },PP.prototype.enableFeedback = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), t_(e, t)
        },PP.prototype.getBreakingImpulseThreshold = function () {
            return e_(this.eB)
        },PP.prototype.setBreakingImpulseThreshold = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), n_(e, t)
        },PP.prototype.getParam = function (t, e) {
            var n = this.eB;
            return t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), o_(n, t, e)
        },PP.prototype.setParam = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), __(o, t, e, n)
        },PP.prototype.__destroy__ = function () {
            i_(this.eB)
        },TP.prototype = Object.create(cP.prototype),TP.prototype.constructor = TP,TP.prototype.fB = TP,TP.gB = {},n.btDiscreteDynamicsWorld = TP,TP.prototype.setGravity = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), p_(e, t)
        },TP.prototype.getGravity = function () {
            return qD(s_(this.eB), lP)
        },TP.prototype.addRigidBody = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), void 0 === e ? c_(o, t) : void 0 === n ? _emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_2(o, t, e) : a_(o, t, e, n)
        },TP.prototype.removeRigidBody = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), l_(e, t)
        },TP.prototype.addConstraint = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), void 0 === e ? u_(n, t) : b_(n, t, e)
        },TP.prototype.removeConstraint = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), y_(e, t)
        },TP.prototype.stepSimulation = function (t, e, n) {
            var o = this.eB;
            return t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), void 0 === e ? m_(o, t) : void 0 === n ? d_(o, t, e) : f_(o, t, e, n)
        },TP.prototype.setContactAddedCallback = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), h_(e, t)
        },TP.prototype.setContactProcessedCallback = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), B_(e, t)
        },TP.prototype.setContactDestroyedCallback = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), g_(e, t)
        },TP.prototype.getDispatcher = function () {
            return qD(C_(this.eB), DP)
        },TP.prototype.rayTest = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), S_(o, t, e, n)
        },TP.prototype.getPairCache = function () {
            return qD(j_(this.eB), LT)
        },TP.prototype.getDispatchInfo = function () {
            return qD(v_(this.eB), tO)
        },TP.prototype.addCollisionObject = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), void 0 === e ? I_(o, t) : void 0 === n ? R_(o, t, e) : D_(o, t, e, n)
        },TP.prototype.removeCollisionObject = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), P_(e, t)
        },TP.prototype.getBroadphase = function () {
            return qD(T_(this.eB), wT)
        },TP.prototype.convexSweepTest = function (t, e, n, o, _) {
            var i = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), _ && "object" == typeof _ && (_ = _.eB), O_(i, t, e, n, o, _)
        },TP.prototype.contactPairTest = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), W_(o, t, e, n)
        },TP.prototype.contactTest = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), A_(n, t, e)
        },TP.prototype.updateSingleAabb = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), M_(e, t)
        },TP.prototype.setDebugDrawer = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), x_(e, t)
        },TP.prototype.getDebugDrawer = function () {
            return qD(k_(this.eB), aP)
        },TP.prototype.debugDrawWorld = function () {
            F_(this.eB)
        },TP.prototype.debugDrawObject = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), L_(o, t, e, n)
        },TP.prototype.addAction = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), G_(e, t)
        },TP.prototype.removeAction = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), w_(e, t)
        },TP.prototype.getSolverInfo = function () {
            return qD(H_(this.eB), eO)
        },TP.prototype.setInternalTickCallback = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), void 0 === e ? V_(o, t) : void 0 === n ? E_(o, t, e) : N_(o, t, e, n)
        },TP.prototype.__destroy__ = function () {
            U_(this.eB)
        },OP.prototype = Object.create(UD.prototype),OP.prototype.constructor = OP,OP.prototype.fB = OP,OP.gB = {},n.btVehicleRaycaster = OP,OP.prototype.castRay = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), z_(o, t, e, n)
        },OP.prototype.__destroy__ = function () {
            q_(this.eB)
        },WP.prototype = Object.create(UD.prototype),WP.prototype.constructor = WP,WP.prototype.fB = WP,WP.gB = {},n.btActionInterface = WP,WP.prototype.updateAction = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), K_(n, t, e)
        },WP.prototype.__destroy__ = function () {
            Q_(this.eB)
        },AP.prototype = Object.create(iP.prototype),AP.prototype.constructor = AP,AP.prototype.fB = AP,AP.gB = {},n.btGhostObject = AP,AP.prototype.getNumOverlappingObjects = function () {
            return Z_(this.eB)
        },AP.prototype.getOverlappingObject = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(Y_(e, t), iP)
        },AP.prototype.setAnisotropicFriction = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), J_(n, t, e)
        },AP.prototype.getCollisionShape = function () {
            return qD($_(this.eB), oP)
        },AP.prototype.setContactProcessingThreshold = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ti(e, t)
        },AP.prototype.setActivationState = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ei(e, t)
        },AP.prototype.forceActivationState = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ni(e, t)
        },AP.prototype.activate = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), void 0 === t ? oi(e) : _i(e, t)
        },AP.prototype.isActive = function () {
            return !!ii(this.eB)
        },AP.prototype.isKinematicObject = function () {
            return !!ri(this.eB)
        },AP.prototype.isStaticObject = function () {
            return !!pi(this.eB)
        },AP.prototype.isStaticOrKinematicObject = function () {
            return !!si(this.eB)
        },AP.prototype.getRestitution = function () {
            return ci(this.eB)
        },AP.prototype.getFriction = function () {
            return ai(this.eB)
        },AP.prototype.getRollingFriction = function () {
            return li(this.eB)
        },AP.prototype.setRestitution = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ui(e, t)
        },AP.prototype.setFriction = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), bi(e, t)
        },AP.prototype.setRollingFriction = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), yi(e, t)
        },AP.prototype.getWorldTransform = function () {
            return qD(mi(this.eB), wP)
        },AP.prototype.getCollisionFlags = function () {
            return di(this.eB)
        },AP.prototype.setCollisionFlags = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), fi(e, t)
        },AP.prototype.setWorldTransform = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), hi(e, t)
        },AP.prototype.setCollisionShape = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Bi(e, t)
        },AP.prototype.setCcdMotionThreshold = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), gi(e, t)
        },AP.prototype.setCcdSweptSphereRadius = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ci(e, t)
        },AP.prototype.getUserIndex = function () {
            return Si(this.eB)
        },AP.prototype.setUserIndex = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ji(e, t)
        },AP.prototype.getUserPointer = function () {
            return qD(vi(this.eB), xP)
        },AP.prototype.setUserPointer = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ii(e, t)
        },AP.prototype.getBroadphaseHandle = function () {
            return qD(Ri(this.eB), ET)
        },AP.prototype.__destroy__ = function () {
            Di(this.eB)
        },MP.prototype = Object.create(UD.prototype),MP.prototype.constructor = MP,MP.prototype.fB = MP,MP.gB = {},n.btSoftBodySolver = MP,MP.prototype.__destroy__ = function () {
            Pi(this.eB)
        },xP.prototype = Object.create(UD.prototype),xP.prototype.constructor = xP,xP.prototype.fB = xP,xP.gB = {},n.VoidPtr = xP,xP.prototype.__destroy__ = function () {
            Ti(this.eB)
        },kP.prototype = Object.create(aP.prototype),kP.prototype.constructor = kP,kP.prototype.fB = kP,kP.gB = {},n.DebugDrawer = kP,kP.prototype.drawLine = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), Wi(o, t, e, n)
        },kP.prototype.drawContactPoint = function (t, e, n, o, _) {
            var i = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), _ && "object" == typeof _ && (_ = _.eB), Ai(i, t, e, n, o, _)
        },kP.prototype.reportErrorWarning = function (t) {
            var e = this.eB;
            JD(), t = t && "object" == typeof t ? t.eB : eP(t), Mi(e, t)
        },kP.prototype.draw3dText = function (t, e) {
            var n = this.eB;
            JD(), t && "object" == typeof t && (t = t.eB), e = e && "object" == typeof e ? e.eB : eP(e), xi(n, t, e)
        },kP.prototype.setDebugMode = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ki(e, t)
        },kP.prototype.getDebugMode = function () {
            return Fi(this.eB)
        },kP.prototype.__destroy__ = function () {
            Li(this.eB)
        },FP.prototype = Object.create(lP.prototype),FP.prototype.constructor = FP,FP.prototype.fB = FP,FP.gB = {},n.btVector4 = FP,FP.prototype.w = FP.prototype.w = function () {
            return Hi(this.eB)
        },FP.prototype.setValue = function (t, e, n, o) {
            var _ = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), Vi(_, t, e, n, o)
        },FP.prototype.length = FP.prototype.length = function () {
            return Ei(this.eB)
        },FP.prototype.x = FP.prototype.x = function () {
            return Ni(this.eB)
        },FP.prototype.y = FP.prototype.y = function () {
            return Ui(this.eB)
        },FP.prototype.z = FP.prototype.z = function () {
            return zi(this.eB)
        },FP.prototype.setX = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), qi(e, t)
        },FP.prototype.setY = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ki(e, t)
        },FP.prototype.setZ = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Qi(e, t)
        },FP.prototype.normalize = FP.prototype.normalize = function () {
            Xi(this.eB)
        },FP.prototype.rotate = FP.prototype.rotate = function (t, e) {
            var n = this.eB;
            return t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), qD(Zi(n, t, e), lP)
        },FP.prototype.dot = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), Yi(e, t)
        },FP.prototype.op_mul = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(Ji(e, t), lP)
        },FP.prototype.op_add = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD($i(e, t), lP)
        },FP.prototype.op_sub = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(tr(e, t), lP)
        },FP.prototype.__destroy__ = function () {
            er(this.eB)
        },LP.prototype = Object.create(uP.prototype),LP.prototype.constructor = LP,LP.prototype.fB = LP,LP.gB = {},n.btQuaternion = LP,LP.prototype.setValue = function (t, e, n, o) {
            var _ = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), or(_, t, e, n, o)
        },LP.prototype.setEulerZYX = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), _r(o, t, e, n)
        },LP.prototype.setRotation = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), ir(n, t, e)
        },LP.prototype.normalize = LP.prototype.normalize = function () {
            rr(this.eB)
        },LP.prototype.length2 = function () {
            return pr(this.eB)
        },LP.prototype.length = LP.prototype.length = function () {
            return sr(this.eB)
        },LP.prototype.dot = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), cr(e, t)
        },LP.prototype.normalized = function () {
            return qD(ar(this.eB), LP)
        },LP.prototype.getAxis = function () {
            return qD(lr(this.eB), lP)
        },LP.prototype.inverse = LP.prototype.inverse = function () {
            return qD(ur(this.eB), LP)
        },LP.prototype.getAngle = function () {
            return br(this.eB)
        },LP.prototype.getAngleShortestPath = function () {
            return yr(this.eB)
        },LP.prototype.angle = LP.prototype.angle = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), mr(e, t)
        },LP.prototype.angleShortestPath = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), dr(e, t)
        },LP.prototype.op_add = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(fr(e, t), LP)
        },LP.prototype.op_sub = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(hr(e, t), LP)
        },LP.prototype.op_mul = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(Br(e, t), LP)
        },LP.prototype.op_mulq = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(gr(e, t), LP)
        },LP.prototype.op_div = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(Cr(e, t), LP)
        },LP.prototype.x = LP.prototype.x = function () {
            return Sr(this.eB)
        },LP.prototype.y = LP.prototype.y = function () {
            return jr(this.eB)
        },LP.prototype.z = LP.prototype.z = function () {
            return vr(this.eB)
        },LP.prototype.w = LP.prototype.w = function () {
            return Ir(this.eB)
        },LP.prototype.setX = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Rr(e, t)
        },LP.prototype.setY = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Dr(e, t)
        },LP.prototype.setZ = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Pr(e, t)
        },LP.prototype.setW = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Tr(e, t)
        },LP.prototype.__destroy__ = function () {
            Or(this.eB)
        },GP.prototype = Object.create(UD.prototype),GP.prototype.constructor = GP,GP.prototype.fB = GP,GP.gB = {},n.btMatrix3x3 = GP,GP.prototype.setEulerZYX = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), Wr(o, t, e, n)
        },GP.prototype.getRotation = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ar(e, t)
        },GP.prototype.getRow = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(Mr(e, t), lP)
        },GP.prototype.__destroy__ = function () {
            xr(this.eB)
        },wP.prototype = Object.create(UD.prototype),wP.prototype.constructor = wP,wP.prototype.fB = wP,wP.gB = {},n.btTransform = wP,wP.prototype.setIdentity = function () {
            Lr(this.eB)
        },wP.prototype.setOrigin = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Gr(e, t)
        },wP.prototype.setRotation = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), wr(e, t)
        },wP.prototype.getOrigin = function () {
            return qD(Hr(this.eB), lP)
        },wP.prototype.getRotation = function () {
            return qD(Vr(this.eB), LP)
        },wP.prototype.getBasis = function () {
            return qD(Er(this.eB), GP)
        },wP.prototype.setFromOpenGLMatrix = function (t) {
            var e = this.eB;
            JD(), "object" == typeof t && (t = nP(t)), Nr(e, t)
        },wP.prototype.inverse = wP.prototype.inverse = function () {
            return qD(Ur(this.eB), wP)
        },wP.prototype.op_mul = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(zr(e, t), wP)
        },wP.prototype.__destroy__ = function () {
            qr(this.eB)
        },HP.prototype = Object.create(bP.prototype),HP.prototype.constructor = HP,HP.prototype.fB = HP,HP.gB = {},n.btDefaultMotionState = HP,HP.prototype.getWorldTransform = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Zr(e, t)
        },HP.prototype.setWorldTransform = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Yr(e, t)
        },HP.prototype.get_m_graphicsWorldTrans = HP.prototype.gD = function () {
            return qD(Jr(this.eB), wP)
        },HP.prototype.set_m_graphicsWorldTrans = HP.prototype.YF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), $r(e, t)
        },Object.defineProperty(HP.prototype, "m_graphicsWorldTrans", {
            get: HP.prototype.gD,
            set: HP.prototype.YF
        }),HP.prototype.__destroy__ = function () {
            tp(this.eB)
        },VP.prototype = Object.create(UD.prototype),VP.prototype.constructor = VP,VP.prototype.fB = VP,VP.gB = {},n.btCollisionObjectWrapper = VP,VP.prototype.getWorldTransform = function () {
            return qD(ep(this.eB), wP)
        },VP.prototype.getCollisionObject = function () {
            return qD(np(this.eB), iP)
        },VP.prototype.getCollisionShape = function () {
            return qD(op(this.eB), oP)
        },EP.prototype = Object.create(yP.prototype),EP.prototype.constructor = EP,EP.prototype.fB = EP,EP.gB = {},n.ClosestRayResultCallback = EP,EP.prototype.hasHit = function () {
            return !!ip(this.eB)
        },EP.prototype.get_m_rayFromWorld = EP.prototype.IB = function () {
            return qD(rp(this.eB), lP)
        },EP.prototype.set_m_rayFromWorld = EP.prototype.SB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), pp(e, t)
        },Object.defineProperty(EP.prototype, "m_rayFromWorld", {
            get: EP.prototype.IB,
            set: EP.prototype.SB
        }),EP.prototype.get_m_rayToWorld = EP.prototype.JB = function () {
            return qD(sp(this.eB), lP)
        },EP.prototype.set_m_rayToWorld = EP.prototype.TB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), cp(e, t)
        },Object.defineProperty(EP.prototype, "m_rayToWorld", {
            get: EP.prototype.JB,
            set: EP.prototype.TB
        }),EP.prototype.get_m_hitNormalWorld = EP.prototype.rB = function () {
            return qD(ap(this.eB), lP)
        },EP.prototype.set_m_hitNormalWorld = EP.prototype.yB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), lp(e, t)
        },Object.defineProperty(EP.prototype, "m_hitNormalWorld", {
            get: EP.prototype.rB,
            set: EP.prototype.yB
        }),EP.prototype.get_m_hitPointWorld = EP.prototype.sB = function () {
            return qD(up(this.eB), lP)
        },EP.prototype.set_m_hitPointWorld = EP.prototype.zB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), bp(e, t)
        },Object.defineProperty(EP.prototype, "m_hitPointWorld", {
            get: EP.prototype.sB,
            set: EP.prototype.zB
        }),EP.prototype.get_m_collisionFilterGroup = EP.prototype.hB = function () {
            return yp(this.eB)
        },EP.prototype.set_m_collisionFilterGroup = EP.prototype.jB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), mp(e, t)
        },Object.defineProperty(EP.prototype, "m_collisionFilterGroup", {
            get: EP.prototype.hB,
            set: EP.prototype.jB
        }),EP.prototype.get_m_collisionFilterMask = EP.prototype.iB = function () {
            return dp(this.eB)
        },EP.prototype.set_m_collisionFilterMask = EP.prototype.kB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), fp(e, t)
        },Object.defineProperty(EP.prototype, "m_collisionFilterMask", {
            get: EP.prototype.iB,
            set: EP.prototype.kB
        }),EP.prototype.get_m_closestHitFraction = EP.prototype.lB = function () {
            return hp(this.eB)
        },EP.prototype.set_m_closestHitFraction = EP.prototype.mB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Bp(e, t)
        },Object.defineProperty(EP.prototype, "m_closestHitFraction", {
            get: EP.prototype.lB,
            set: EP.prototype.mB
        }),EP.prototype.get_m_collisionObject = EP.prototype.pB = function () {
            return qD(gp(this.eB), iP)
        },EP.prototype.set_m_collisionObject = EP.prototype.wB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Cp(e, t)
        },Object.defineProperty(EP.prototype, "m_collisionObject", {
            get: EP.prototype.pB,
            set: EP.prototype.wB
        }),EP.prototype.get_m_flags = EP.prototype.nB = function () {
            return Sp(this.eB)
        },EP.prototype.set_m_flags = EP.prototype.oB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), jp(e, t)
        },Object.defineProperty(EP.prototype, "m_flags", {
            get: EP.prototype.nB,
            set: EP.prototype.oB
        }),EP.prototype.__destroy__ = function () {
            vp(this.eB)
        },NP.prototype = Object.create(UD.prototype),NP.prototype.constructor = NP,NP.prototype.fB = NP,NP.gB = {},n.btConstCollisionObjectArray = NP,NP.prototype.size = NP.prototype.size = function () {
            return Ip(this.eB)
        },NP.prototype.at = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(Rp(e, t), iP)
        },NP.prototype.__destroy__ = function () {
            Dp(this.eB)
        },UP.prototype = Object.create(UD.prototype),UP.prototype.constructor = UP,UP.prototype.fB = UP,UP.gB = {},n.btScalarArray = UP,UP.prototype.size = UP.prototype.size = function () {
            return Pp(this.eB)
        },UP.prototype.at = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), Tp(e, t)
        },UP.prototype.__destroy__ = function () {
            Op(this.eB)
        },zP.prototype = Object.create(yP.prototype),zP.prototype.constructor = zP,zP.prototype.fB = zP,zP.gB = {},n.AllHitsRayResultCallback = zP,zP.prototype.hasHit = function () {
            return !!Ap(this.eB)
        },zP.prototype.get_m_collisionObjects = zP.prototype.PC = function () {
            return qD(Mp(this.eB), NP)
        },zP.prototype.set_m_collisionObjects = zP.prototype.GF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), xp(e, t)
        },Object.defineProperty(zP.prototype, "m_collisionObjects", {
            get: zP.prototype.PC,
            set: zP.prototype.GF
        }),zP.prototype.get_m_rayFromWorld = zP.prototype.IB = function () {
            return qD(kp(this.eB), lP)
        },zP.prototype.set_m_rayFromWorld = zP.prototype.SB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Fp(e, t)
        },Object.defineProperty(zP.prototype, "m_rayFromWorld", {
            get: zP.prototype.IB,
            set: zP.prototype.SB
        }),zP.prototype.get_m_rayToWorld = zP.prototype.JB = function () {
            return qD(Lp(this.eB), lP)
        },zP.prototype.set_m_rayToWorld = zP.prototype.TB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Gp(e, t)
        },Object.defineProperty(zP.prototype, "m_rayToWorld", {
            get: zP.prototype.JB,
            set: zP.prototype.TB
        }),zP.prototype.get_m_hitNormalWorld = zP.prototype.rB = function () {
            return qD(wp(this.eB), cT)
        },zP.prototype.set_m_hitNormalWorld = zP.prototype.yB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Hp(e, t)
        },Object.defineProperty(zP.prototype, "m_hitNormalWorld", {
            get: zP.prototype.rB,
            set: zP.prototype.yB
        }),zP.prototype.get_m_hitPointWorld = zP.prototype.sB = function () {
            return qD(Vp(this.eB), cT)
        },zP.prototype.set_m_hitPointWorld = zP.prototype.zB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ep(e, t)
        },Object.defineProperty(zP.prototype, "m_hitPointWorld", {
            get: zP.prototype.sB,
            set: zP.prototype.zB
        }),zP.prototype.get_m_hitFractions = zP.prototype.lD = function () {
            return qD(Np(this.eB), UP)
        },zP.prototype.set_m_hitFractions = zP.prototype.cG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Up(e, t)
        },Object.defineProperty(zP.prototype, "m_hitFractions", {
            get: zP.prototype.lD,
            set: zP.prototype.cG
        }),zP.prototype.get_m_collisionFilterGroup = zP.prototype.hB = function () {
            return zp(this.eB)
        },zP.prototype.set_m_collisionFilterGroup = zP.prototype.jB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), qp(e, t)
        },Object.defineProperty(zP.prototype, "m_collisionFilterGroup", {
            get: zP.prototype.hB,
            set: zP.prototype.jB
        }),zP.prototype.get_m_collisionFilterMask = zP.prototype.iB = function () {
            return Kp(this.eB)
        },zP.prototype.set_m_collisionFilterMask = zP.prototype.kB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Qp(e, t)
        },Object.defineProperty(zP.prototype, "m_collisionFilterMask", {
            get: zP.prototype.iB,
            set: zP.prototype.kB
        }),zP.prototype.get_m_closestHitFraction = zP.prototype.lB = function () {
            return Xp(this.eB)
        },zP.prototype.set_m_closestHitFraction = zP.prototype.mB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Zp(e, t)
        },Object.defineProperty(zP.prototype, "m_closestHitFraction", {
            get: zP.prototype.lB,
            set: zP.prototype.mB
        }),zP.prototype.get_m_collisionObject = zP.prototype.pB = function () {
            return qD(Yp(this.eB), iP)
        },zP.prototype.set_m_collisionObject = zP.prototype.wB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Jp(e, t)
        },Object.defineProperty(zP.prototype, "m_collisionObject", {
            get: zP.prototype.pB,
            set: zP.prototype.wB
        }),zP.prototype.get_m_flags = zP.prototype.nB = function () {
            return $p(this.eB)
        },zP.prototype.set_m_flags = zP.prototype.oB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ts(e, t)
        },Object.defineProperty(zP.prototype, "m_flags", {
            get: zP.prototype.nB,
            set: zP.prototype.oB
        }),zP.prototype.__destroy__ = function () {
            es(this.eB)
        },qP.prototype = Object.create(UD.prototype),qP.prototype.constructor = qP,qP.prototype.fB = qP,qP.gB = {},n.btManifoldPoint = qP,qP.prototype.getPositionWorldOnA = function () {
            return qD(ns(this.eB), lP)
        },qP.prototype.getPositionWorldOnB = function () {
            return qD(os(this.eB), lP)
        },qP.prototype.getAppliedImpulse = function () {
            return _s(this.eB)
        },qP.prototype.getDistance = function () {
            return is(this.eB)
        },qP.prototype.get_m_localPointA = qP.prototype.BD = function () {
            return qD(rs(this.eB), lP)
        },qP.prototype.set_m_localPointA = qP.prototype.sG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ps(e, t)
        },Object.defineProperty(qP.prototype, "m_localPointA", {
            get: qP.prototype.BD,
            set: qP.prototype.sG
        }),qP.prototype.get_m_localPointB = qP.prototype.CD = function () {
            return qD(ss(this.eB), lP)
        },qP.prototype.set_m_localPointB = qP.prototype.tG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), cs(e, t)
        },Object.defineProperty(qP.prototype, "m_localPointB", {
            get: qP.prototype.CD,
            set: qP.prototype.tG
        }),qP.prototype.get_m_positionWorldOnB = qP.prototype.TD = function () {
            return qD(as(this.eB), lP)
        },qP.prototype.set_m_positionWorldOnB = qP.prototype.KG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ls(e, t)
        },Object.defineProperty(qP.prototype, "m_positionWorldOnB", {
            get: qP.prototype.TD,
            set: qP.prototype.KG
        }),qP.prototype.get_m_positionWorldOnA = qP.prototype.SD = function () {
            return qD(us(this.eB), lP)
        },qP.prototype.set_m_positionWorldOnA = qP.prototype.JG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), bs(e, t)
        },Object.defineProperty(qP.prototype, "m_positionWorldOnA", {
            get: qP.prototype.SD,
            set: qP.prototype.JG
        }),qP.prototype.get_m_normalWorldOnB = qP.prototype.ND = function () {
            return qD(ys(this.eB), lP)
        },qP.prototype.set_m_normalWorldOnB = qP.prototype.EG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ms(e, t)
        },Object.defineProperty(qP.prototype, "m_normalWorldOnB", {
            get: qP.prototype.ND,
            set: qP.prototype.EG
        }),qP.prototype.get_m_userPersistentData = qP.prototype.uE = function () {
            return ds(this.eB)
        },qP.prototype.set_m_userPersistentData = qP.prototype.mH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), fs(e, t)
        },Object.defineProperty(qP.prototype, "m_userPersistentData", {
            get: qP.prototype.uE,
            set: qP.prototype.mH
        }),qP.prototype.__destroy__ = function () {
            hs(this.eB)
        },KP.prototype = Object.create(mP.prototype),KP.prototype.constructor = KP,KP.prototype.fB = KP,KP.gB = {},n.ConcreteContactResultCallback = KP,KP.prototype.addSingleResult = function (t, e, n, o, _, i, r) {
            var p = this.eB;
            return t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), _ && "object" == typeof _ && (_ = _.eB), i && "object" == typeof i && (i = i.eB), r && "object" == typeof r && (r = r.eB), gs(p, t, e, n, o, _, i, r)
        },KP.prototype.__destroy__ = function () {
            Cs(this.eB)
        },QP.prototype = Object.create(UD.prototype),QP.prototype.constructor = QP,QP.prototype.fB = QP,QP.gB = {},n.LocalShapeInfo = QP,QP.prototype.get_m_shapePart = QP.prototype.bE = function () {
            return Ss(this.eB)
        },QP.prototype.set_m_shapePart = QP.prototype.UG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), js(e, t)
        },Object.defineProperty(QP.prototype, "m_shapePart", {
            get: QP.prototype.bE,
            set: QP.prototype.UG
        }),QP.prototype.get_m_triangleIndex = QP.prototype.qE = function () {
            return vs(this.eB)
        },QP.prototype.set_m_triangleIndex = QP.prototype.iH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Is(e, t)
        },Object.defineProperty(QP.prototype, "m_triangleIndex", {
            get: QP.prototype.qE,
            set: QP.prototype.iH
        }),QP.prototype.__destroy__ = function () {
            Rs(this.eB)
        },XP.prototype = Object.create(UD.prototype),XP.prototype.constructor = XP,XP.prototype.fB = XP,XP.gB = {},n.LocalConvexResult = XP,XP.prototype.get_m_hitCollisionObject = XP.prototype.GB = function () {
            return qD(Ps(this.eB), iP)
        },XP.prototype.set_m_hitCollisionObject = XP.prototype.QB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ts(e, t)
        },Object.defineProperty(XP.prototype, "m_hitCollisionObject", {
            get: XP.prototype.GB,
            set: XP.prototype.QB
        }),XP.prototype.get_m_localShapeInfo = XP.prototype.DD = function () {
            return qD(Os(this.eB), QP)
        },XP.prototype.set_m_localShapeInfo = XP.prototype.uG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ws(e, t)
        },Object.defineProperty(XP.prototype, "m_localShapeInfo", {
            get: XP.prototype.DD,
            set: XP.prototype.uG
        }),XP.prototype.get_m_hitNormalLocal = XP.prototype.nD = function () {
            return qD(As(this.eB), lP)
        },XP.prototype.set_m_hitNormalLocal = XP.prototype.eG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ms(e, t)
        },Object.defineProperty(XP.prototype, "m_hitNormalLocal", {
            get: XP.prototype.nD,
            set: XP.prototype.eG
        }),XP.prototype.get_m_hitPointLocal = XP.prototype.pD = function () {
            return qD(xs(this.eB), lP)
        },XP.prototype.set_m_hitPointLocal = XP.prototype.gG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ks(e, t)
        },Object.defineProperty(XP.prototype, "m_hitPointLocal", {
            get: XP.prototype.pD,
            set: XP.prototype.gG
        }),XP.prototype.get_m_hitFraction = XP.prototype.kD = function () {
            return Fs(this.eB)
        },XP.prototype.set_m_hitFraction = XP.prototype.bG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ls(e, t)
        },Object.defineProperty(XP.prototype, "m_hitFraction", {
            get: XP.prototype.kD,
            set: XP.prototype.bG
        }),XP.prototype.__destroy__ = function () {
            Gs(this.eB)
        },ZP.prototype = Object.create(dP.prototype),ZP.prototype.constructor = ZP,ZP.prototype.fB = ZP,ZP.gB = {},n.ClosestConvexResultCallback = ZP,ZP.prototype.hasHit = function () {
            return !!Hs(this.eB)
        },ZP.prototype.get_m_hitCollisionObject = ZP.prototype.GB = function () {
            return qD(Vs(this.eB), iP)
        },ZP.prototype.set_m_hitCollisionObject = ZP.prototype.QB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Es(e, t)
        },Object.defineProperty(ZP.prototype, "m_hitCollisionObject", {
            get: ZP.prototype.GB,
            set: ZP.prototype.QB
        }),ZP.prototype.get_m_convexFromWorld = ZP.prototype.UC = function () {
            return qD(Ns(this.eB), lP)
        },ZP.prototype.set_m_convexFromWorld = ZP.prototype.LF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Us(e, t)
        },Object.defineProperty(ZP.prototype, "m_convexFromWorld", {
            get: ZP.prototype.UC,
            set: ZP.prototype.LF
        }),ZP.prototype.get_m_convexToWorld = ZP.prototype.VC = function () {
            return qD(zs(this.eB), lP)
        },ZP.prototype.set_m_convexToWorld = ZP.prototype.MF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), qs(e, t)
        },Object.defineProperty(ZP.prototype, "m_convexToWorld", {
            get: ZP.prototype.VC,
            set: ZP.prototype.MF
        }),ZP.prototype.get_m_hitNormalWorld = ZP.prototype.rB = function () {
            return qD(Ks(this.eB), lP)
        },ZP.prototype.set_m_hitNormalWorld = ZP.prototype.yB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Qs(e, t)
        },Object.defineProperty(ZP.prototype, "m_hitNormalWorld", {
            get: ZP.prototype.rB,
            set: ZP.prototype.yB
        }),ZP.prototype.get_m_hitPointWorld = ZP.prototype.sB = function () {
            return qD(Xs(this.eB), lP)
        },ZP.prototype.set_m_hitPointWorld = ZP.prototype.zB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Zs(e, t)
        },Object.defineProperty(ZP.prototype, "m_hitPointWorld", {
            get: ZP.prototype.sB,
            set: ZP.prototype.zB
        }),ZP.prototype.get_m_collisionFilterGroup = ZP.prototype.hB = function () {
            return Ys(this.eB)
        },ZP.prototype.set_m_collisionFilterGroup = ZP.prototype.jB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Js(e, t)
        },Object.defineProperty(ZP.prototype, "m_collisionFilterGroup", {
            get: ZP.prototype.hB,
            set: ZP.prototype.jB
        }),ZP.prototype.get_m_collisionFilterMask = ZP.prototype.iB = function () {
            return $s(this.eB)
        },ZP.prototype.set_m_collisionFilterMask = ZP.prototype.kB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), tc(e, t)
        },Object.defineProperty(ZP.prototype, "m_collisionFilterMask", {
            get: ZP.prototype.iB,
            set: ZP.prototype.kB
        }),ZP.prototype.get_m_closestHitFraction = ZP.prototype.lB = function () {
            return ec(this.eB)
        },ZP.prototype.set_m_closestHitFraction = ZP.prototype.mB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), nc(e, t)
        },Object.defineProperty(ZP.prototype, "m_closestHitFraction", {
            get: ZP.prototype.lB,
            set: ZP.prototype.mB
        }),ZP.prototype.__destroy__ = function () {
            oc(this.eB)
        },YP.prototype = Object.create(fP.prototype),YP.prototype.constructor = YP,YP.prototype.fB = YP,YP.gB = {},n.btConvexTriangleMeshShape = YP,YP.prototype.setLocalScaling = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), rc(e, t)
        },YP.prototype.getLocalScaling = function () {
            return qD(pc(this.eB), lP)
        },YP.prototype.calculateLocalInertia = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), sc(n, t, e)
        },YP.prototype.setMargin = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), cc(e, t)
        },YP.prototype.getMargin = function () {
            return ac(this.eB)
        },YP.prototype.__destroy__ = function () {
            lc(this.eB)
        },JP.prototype = Object.create(oP.prototype),JP.prototype.constructor = JP,JP.prototype.fB = JP,JP.gB = {},n.btBoxShape = JP,JP.prototype.setMargin = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), bc(e, t)
        },JP.prototype.getMargin = function () {
            return yc(this.eB)
        },JP.prototype.setLocalScaling = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), mc(e, t)
        },JP.prototype.getLocalScaling = function () {
            return qD(dc(this.eB), lP)
        },JP.prototype.calculateLocalInertia = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), fc(n, t, e)
        },JP.prototype.__destroy__ = function () {
            hc(this.eB)
        },$P.prototype = Object.create(hP.prototype),$P.prototype.constructor = $P,$P.prototype.fB = $P,$P.gB = {},n.btCapsuleShapeX = $P,$P.prototype.setMargin = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), gc(e, t)
        },$P.prototype.getMargin = function () {
            return Cc(this.eB)
        },$P.prototype.getUpAxis = function () {
            return Sc(this.eB)
        },$P.prototype.getRadius = function () {
            return jc(this.eB)
        },$P.prototype.getHalfHeight = function () {
            return vc(this.eB)
        },$P.prototype.setLocalScaling = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ic(e, t)
        },$P.prototype.getLocalScaling = function () {
            return qD(Rc(this.eB), lP)
        },$P.prototype.calculateLocalInertia = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Dc(n, t, e)
        },$P.prototype.__destroy__ = function () {
            Pc(this.eB)
        },tT.prototype = Object.create(hP.prototype),tT.prototype.constructor = tT,tT.prototype.fB = tT,tT.gB = {},n.btCapsuleShapeZ = tT,tT.prototype.setMargin = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Oc(e, t)
        },tT.prototype.getMargin = function () {
            return Wc(this.eB)
        },tT.prototype.getUpAxis = function () {
            return Ac(this.eB)
        },tT.prototype.getRadius = function () {
            return Mc(this.eB)
        },tT.prototype.getHalfHeight = function () {
            return xc(this.eB)
        },tT.prototype.setLocalScaling = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), kc(e, t)
        },tT.prototype.getLocalScaling = function () {
            return qD(Fc(this.eB), lP)
        },tT.prototype.calculateLocalInertia = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Lc(n, t, e)
        },tT.prototype.__destroy__ = function () {
            Gc(this.eB)
        },eT.prototype = Object.create(BP.prototype),eT.prototype.constructor = eT,eT.prototype.fB = eT,eT.gB = {},n.btCylinderShapeX = eT,eT.prototype.setMargin = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Hc(e, t)
        },eT.prototype.getMargin = function () {
            return Vc(this.eB)
        },eT.prototype.setLocalScaling = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ec(e, t)
        },eT.prototype.getLocalScaling = function () {
            return qD(Nc(this.eB), lP)
        },eT.prototype.calculateLocalInertia = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Uc(n, t, e)
        },eT.prototype.__destroy__ = function () {
            zc(this.eB)
        },nT.prototype = Object.create(BP.prototype),nT.prototype.constructor = nT,nT.prototype.fB = nT,nT.gB = {},n.btCylinderShapeZ = nT,nT.prototype.setMargin = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Kc(e, t)
        },nT.prototype.getMargin = function () {
            return Qc(this.eB)
        },nT.prototype.setLocalScaling = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Xc(e, t)
        },nT.prototype.getLocalScaling = function () {
            return qD(Zc(this.eB), lP)
        },nT.prototype.calculateLocalInertia = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Yc(n, t, e)
        },nT.prototype.__destroy__ = function () {
            Jc(this.eB)
        },oT.prototype = Object.create(oP.prototype),oT.prototype.constructor = oT,oT.prototype.fB = oT,oT.gB = {},n.btSphereShape = oT,oT.prototype.setMargin = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ta(e, t)
        },oT.prototype.getMargin = function () {
            return ea(this.eB)
        },oT.prototype.setLocalScaling = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), na(e, t)
        },oT.prototype.getLocalScaling = function () {
            return qD(oa(this.eB), lP)
        },oT.prototype.calculateLocalInertia = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), _a(n, t, e)
        },oT.prototype.__destroy__ = function () {
            ia(this.eB)
        },_T.prototype = Object.create(oP.prototype),_T.prototype.constructor = _T,_T.prototype.fB = _T,_T.gB = {},n.btMultiSphereShape = _T,_T.prototype.setLocalScaling = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), pa(e, t)
        },_T.prototype.getLocalScaling = function () {
            return qD(sa(this.eB), lP)
        },_T.prototype.calculateLocalInertia = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), ca(n, t, e)
        },_T.prototype.__destroy__ = function () {
            aa(this.eB)
        },iT.prototype = Object.create(gP.prototype),iT.prototype.constructor = iT,iT.prototype.fB = iT,iT.gB = {},n.btConeShapeX = iT,iT.prototype.setLocalScaling = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ua(e, t)
        },iT.prototype.getLocalScaling = function () {
            return qD(ba(this.eB), lP)
        },iT.prototype.calculateLocalInertia = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), ya(n, t, e)
        },iT.prototype.__destroy__ = function () {
            ma(this.eB)
        },rT.prototype = Object.create(gP.prototype),rT.prototype.constructor = rT,rT.prototype.fB = rT,rT.gB = {},n.btConeShapeZ = rT,rT.prototype.setLocalScaling = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), fa(e, t)
        },rT.prototype.getLocalScaling = function () {
            return qD(ha(this.eB), lP)
        },rT.prototype.calculateLocalInertia = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Ba(n, t, e)
        },rT.prototype.__destroy__ = function () {
            ga(this.eB)
        },pT.prototype = Object.create(UD.prototype),pT.prototype.constructor = pT,pT.prototype.fB = pT,pT.gB = {},n.btIntArray = pT,pT.prototype.size = pT.prototype.size = function () {
            return Ca(this.eB)
        },pT.prototype.at = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), Sa(e, t)
        },pT.prototype.__destroy__ = function () {
            ja(this.eB)
        },sT.prototype = Object.create(UD.prototype),sT.prototype.constructor = sT,sT.prototype.fB = sT,sT.gB = {},n.btFace = sT,sT.prototype.get_m_indices = sT.prototype.sD = function () {
            return qD(va(this.eB), pT)
        },sT.prototype.set_m_indices = sT.prototype.jG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ia(e, t)
        },Object.defineProperty(sT.prototype, "m_indices", {
            get: sT.prototype.sD,
            set: sT.prototype.jG
        }),sT.prototype.get_m_plane = sT.prototype.RD = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), Ra(e, t)
        },sT.prototype.set_m_plane = sT.prototype.IG = function (t, e) {
            var n = this.eB;
            JD(), t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Da(n, t, e)
        },Object.defineProperty(sT.prototype, "m_plane", {
            get: sT.prototype.RD,
            set: sT.prototype.IG
        }),sT.prototype.__destroy__ = function () {
            Pa(this.eB)
        },cT.prototype = Object.create(UD.prototype),cT.prototype.constructor = cT,cT.prototype.fB = cT,cT.gB = {},n.btVector3Array = cT,cT.prototype.size = cT.prototype.size = function () {
            return Ta(this.eB)
        },cT.prototype.at = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(Oa(e, t), lP)
        },cT.prototype.__destroy__ = function () {
            Wa(this.eB)
        },aT.prototype = Object.create(UD.prototype),aT.prototype.constructor = aT,aT.prototype.fB = aT,aT.gB = {},n.btFaceArray = aT,aT.prototype.size = aT.prototype.size = function () {
            return Aa(this.eB)
        },aT.prototype.at = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(Ma(e, t), sT)
        },aT.prototype.__destroy__ = function () {
            xa(this.eB)
        },lT.prototype = Object.create(UD.prototype),lT.prototype.constructor = lT,lT.prototype.fB = lT,lT.gB = {},n.btConvexPolyhedron = lT,lT.prototype.get_m_vertices = lT.prototype.wE = function () {
            return qD(ka(this.eB), cT)
        },lT.prototype.set_m_vertices = lT.prototype.oH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Fa(e, t)
        },Object.defineProperty(lT.prototype, "m_vertices", {
            get: lT.prototype.wE,
            set: lT.prototype.oH
        }),lT.prototype.get_m_faces = lT.prototype.FB = function () {
            return qD(La(this.eB), aT)
        },lT.prototype.set_m_faces = lT.prototype.PB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ga(e, t)
        },Object.defineProperty(lT.prototype, "m_faces", {
            get: lT.prototype.FB,
            set: lT.prototype.PB
        }),lT.prototype.__destroy__ = function () {
            wa(this.eB)
        },uT.prototype = Object.create(oP.prototype),uT.prototype.constructor = uT,uT.prototype.fB = uT,uT.gB = {},n.btConvexHullShape = uT,uT.prototype.addPoint = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), void 0 === e ? Na(n, t) : Ua(n, t, e)
        },uT.prototype.setMargin = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), za(e, t)
        },uT.prototype.getMargin = function () {
            return qa(this.eB)
        },uT.prototype.getNumVertices = function () {
            return Ka(this.eB)
        },uT.prototype.initializePolyhedralFeatures = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), !!Qa(e, t)
        },uT.prototype.recalcLocalAabb = function () {
            Xa(this.eB)
        },uT.prototype.getConvexPolyhedron = function () {
            return qD(Za(this.eB), lT)
        },uT.prototype.setLocalScaling = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ya(e, t)
        },uT.prototype.getLocalScaling = function () {
            return qD(Ja(this.eB), lP)
        },uT.prototype.calculateLocalInertia = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), $a(n, t, e)
        },uT.prototype.__destroy__ = function () {
            tl(this.eB)
        },bT.prototype = Object.create(UD.prototype),bT.prototype.constructor = bT,bT.prototype.fB = bT,bT.gB = {},n.btShapeHull = bT,bT.prototype.buildHull = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), !!nl(e, t)
        },bT.prototype.numVertices = function () {
            return ol(this.eB)
        },bT.prototype.getVertexPointer = function () {
            return qD(_l(this.eB), lP)
        },bT.prototype.__destroy__ = function () {
            il(this.eB)
        },yT.prototype = Object.create(oP.prototype),yT.prototype.constructor = yT,yT.prototype.fB = yT,yT.gB = {},n.btCompoundShape = yT,yT.prototype.addChildShape = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), sl(n, t, e)
        },yT.prototype.removeChildShape = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), cl(e, t)
        },yT.prototype.removeChildShapeByIndex = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), al(e, t)
        },yT.prototype.getNumChildShapes = function () {
            return ll(this.eB)
        },yT.prototype.getChildShape = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(ul(e, t), oP)
        },yT.prototype.updateChildTransform = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), void 0 === n ? bl(o, t, e) : yl(o, t, e, n)
        },yT.prototype.setMargin = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ml(e, t)
        },yT.prototype.getMargin = function () {
            return dl(this.eB)
        },yT.prototype.setLocalScaling = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), fl(e, t)
        },yT.prototype.getLocalScaling = function () {
            return qD(hl(this.eB), lP)
        },yT.prototype.calculateLocalInertia = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Bl(n, t, e)
        },yT.prototype.__destroy__ = function () {
            gl(this.eB)
        },mT.prototype = Object.create(UD.prototype),mT.prototype.constructor = mT,mT.prototype.fB = mT,mT.gB = {},n.btIndexedMesh = mT,mT.prototype.get_m_numTriangles = mT.prototype.PD = function () {
            return Cl(this.eB)
        },mT.prototype.set_m_numTriangles = mT.prototype.GG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Sl(e, t)
        },Object.defineProperty(mT.prototype, "m_numTriangles", {
            get: mT.prototype.PD,
            set: mT.prototype.GG
        }),mT.prototype.__destroy__ = function () {
            jl(this.eB)
        },dT.prototype = Object.create(UD.prototype),dT.prototype.constructor = dT,dT.prototype.fB = dT,dT.gB = {},n.btIndexedMeshArray = dT,dT.prototype.size = dT.prototype.size = function () {
            return vl(this.eB)
        },dT.prototype.at = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(Il(e, t), mT)
        },dT.prototype.__destroy__ = function () {
            Rl(this.eB)
        },fT.prototype = Object.create(CP.prototype),fT.prototype.constructor = fT,fT.prototype.fB = fT,fT.gB = {},n.btTriangleMesh = fT,fT.prototype.addTriangle = function (t, e, n, o) {
            var _ = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), void 0 === o ? Ol(_, t, e, n) : Wl(_, t, e, n, o)
        },fT.prototype.findOrAddVertex = function (t, e) {
            var n = this.eB;
            return t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Al(n, t, e)
        },fT.prototype.addIndex = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ml(e, t)
        },fT.prototype.getIndexedMeshArray = function () {
            return qD(xl(this.eB), dT)
        },fT.prototype.setScaling = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), kl(e, t)
        },fT.prototype.__destroy__ = function () {
            Fl(this.eB)
        },hT.prototype = Object.create(rP.prototype),hT.prototype.constructor = hT,hT.prototype.fB = hT,hT.gB = {},n.btEmptyShape = hT,hT.prototype.setLocalScaling = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Gl(e, t)
        },hT.prototype.getLocalScaling = function () {
            return qD(wl(this.eB), lP)
        },hT.prototype.calculateLocalInertia = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Hl(n, t, e)
        },hT.prototype.__destroy__ = function () {
            Vl(this.eB)
        },BT.prototype = Object.create(rP.prototype),BT.prototype.constructor = BT,BT.prototype.fB = BT,BT.gB = {},n.btStaticPlaneShape = BT,BT.prototype.setLocalScaling = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Nl(e, t)
        },BT.prototype.getLocalScaling = function () {
            return qD(Ul(this.eB), lP)
        },BT.prototype.calculateLocalInertia = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), zl(n, t, e)
        },BT.prototype.__destroy__ = function () {
            ql(this.eB)
        },gT.prototype = Object.create(SP.prototype),gT.prototype.constructor = gT,gT.prototype.fB = gT,gT.gB = {},n.btBvhTriangleMeshShape = gT,gT.prototype.setLocalScaling = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Xl(e, t)
        },gT.prototype.getLocalScaling = function () {
            return qD(Zl(this.eB), lP)
        },gT.prototype.calculateLocalInertia = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Yl(n, t, e)
        },gT.prototype.__destroy__ = function () {
            Jl(this.eB)
        },CT.prototype = Object.create(rP.prototype),CT.prototype.constructor = CT,CT.prototype.fB = CT,CT.gB = {},n.btHeightfieldTerrainShape = CT,CT.prototype.setMargin = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), tu(e, t)
        },CT.prototype.getMargin = function () {
            return eu(this.eB)
        },CT.prototype.setLocalScaling = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), nu(e, t)
        },CT.prototype.getLocalScaling = function () {
            return qD(ou(this.eB), lP)
        },CT.prototype.calculateLocalInertia = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), _u(n, t, e)
        },CT.prototype.__destroy__ = function () {
            iu(this.eB)
        },ST.prototype = Object.create(UD.prototype),ST.prototype.constructor = ST,ST.prototype.fB = ST,ST.gB = {},n.btAABB = ST,ST.prototype.invalidate = function () {
            pu(this.eB)
        },ST.prototype.increment_margin = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), su(e, t)
        },ST.prototype.copy_with_margin = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), cu(n, t, e)
        },ST.prototype.__destroy__ = function () {
            au(this.eB)
        },jT.prototype = Object.create(UD.prototype),jT.prototype.constructor = jT,jT.prototype.fB = jT,jT.gB = {},n.btPrimitiveTriangle = jT,jT.prototype.__destroy__ = function () {
            uu(this.eB)
        },vT.prototype = Object.create(UD.prototype),vT.prototype.constructor = vT,vT.prototype.fB = vT,vT.gB = {},n.btTriangleShapeEx = vT,vT.prototype.getAabb = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), yu(o, t, e, n)
        },vT.prototype.applyTransform = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), mu(e, t)
        },vT.prototype.buildTriPlane = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), du(e, t)
        },vT.prototype.__destroy__ = function () {
            fu(this.eB)
        },IT.prototype = Object.create(UD.prototype),IT.prototype.constructor = IT,IT.prototype.fB = IT,IT.gB = {},n.btTetrahedronShapeEx = IT,IT.prototype.setVertices = function (t, e, n, o) {
            var _ = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), Bu(_, t, e, n, o)
        },IT.prototype.__destroy__ = function () {
            gu(this.eB)
        },RT.prototype = Object.create(jP.prototype),RT.prototype.constructor = RT,RT.prototype.fB = RT,RT.gB = {},n.CompoundPrimitiveManager = RT,RT.prototype.get_primitive_count = function () {
            return Cu(this.eB)
        },RT.prototype.get_primitive_box = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Su(n, t, e)
        },RT.prototype.get_primitive_triangle = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), ju(n, t, e)
        },RT.prototype.is_trimesh = function () {
            return !!vu(this.eB)
        },RT.prototype.get_m_compoundShape = RT.prototype.QC = function () {
            return qD(Iu(this.eB), DT)
        },RT.prototype.set_m_compoundShape = RT.prototype.HF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ru(e, t)
        },Object.defineProperty(RT.prototype, "m_compoundShape", {
            get: RT.prototype.QC,
            set: RT.prototype.HF
        }),RT.prototype.__destroy__ = function () {
            Du(this.eB)
        },DT.prototype = Object.create(vP.prototype),DT.prototype.constructor = DT,DT.prototype.fB = DT,DT.gB = {},n.btGImpactCompoundShape = DT,DT.prototype.childrenHasTransform = function () {
            return !!Ou(this.eB)
        },DT.prototype.getPrimitiveManager = function () {
            return qD(Wu(this.eB), jP)
        },DT.prototype.getCompoundPrimitiveManager = function () {
            return qD(Au(this.eB), RT)
        },DT.prototype.getNumChildShapes = function () {
            return Mu(this.eB)
        },DT.prototype.addChildShape = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), xu(n, t, e)
        },DT.prototype.getChildShape = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(ku(e, t), oP)
        },DT.prototype.getChildAabb = function (t, e, n, o) {
            var _ = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), Fu(_, t, e, n, o)
        },DT.prototype.getChildTransform = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(Lu(e, t), wP)
        },DT.prototype.setChildTransform = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Gu(n, t, e)
        },DT.prototype.calculateLocalInertia = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), wu(n, t, e)
        },DT.prototype.getName = function () {
            return C(Hu(this.eB))
        },DT.prototype.getGImpactShapeType = function () {
            return Vu(this.eB)
        },DT.prototype.setLocalScaling = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Eu(e, t)
        },DT.prototype.getLocalScaling = function () {
            return qD(Nu(this.eB), lP)
        },DT.prototype.updateBound = function () {
            Uu(this.eB)
        },DT.prototype.postUpdate = function () {
            zu(this.eB)
        },DT.prototype.getShapeType = function () {
            return qu(this.eB)
        },DT.prototype.needsRetrieveTriangles = function () {
            return !!Ku(this.eB)
        },DT.prototype.needsRetrieveTetrahedrons = function () {
            return !!Qu(this.eB)
        },DT.prototype.getBulletTriangle = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Xu(n, t, e)
        },DT.prototype.getBulletTetrahedron = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Zu(n, t, e)
        },DT.prototype.__destroy__ = function () {
            Yu(this.eB)
        },PT.prototype = Object.create(jP.prototype),PT.prototype.constructor = PT,PT.prototype.fB = PT,PT.gB = {},n.TrimeshPrimitiveManager = PT,PT.prototype.lock = PT.prototype.lock = function () {
            tb(this.eB)
        },PT.prototype.unlock = PT.prototype.unlock = function () {
            eb(this.eB)
        },PT.prototype.is_trimesh = function () {
            return !!nb(this.eB)
        },PT.prototype.get_vertex_count = function () {
            return ob(this.eB)
        },PT.prototype.get_indices = function (t, e, n, o) {
            var _ = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), _b(_, t, e, n, o)
        },PT.prototype.get_vertex = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), ib(n, t, e)
        },PT.prototype.get_bullet_triangle = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), rb(n, t, e)
        },PT.prototype.get_m_margin = PT.prototype.GD = function () {
            return pb(this.eB)
        },PT.prototype.set_m_margin = PT.prototype.xG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), sb(e, t)
        },Object.defineProperty(PT.prototype, "m_margin", {
            get: PT.prototype.GD,
            set: PT.prototype.xG
        }),PT.prototype.get_m_meshInterface = PT.prototype.JD = function () {
            return qD(cb(this.eB), CP)
        },PT.prototype.set_m_meshInterface = PT.prototype.AG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ab(e, t)
        },Object.defineProperty(PT.prototype, "m_meshInterface", {
            get: PT.prototype.JD,
            set: PT.prototype.AG
        }),PT.prototype.get_m_part = PT.prototype.QD = function () {
            return lb(this.eB)
        },PT.prototype.set_m_part = PT.prototype.HG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ub(e, t)
        },Object.defineProperty(PT.prototype, "m_part", {
            get: PT.prototype.QD,
            set: PT.prototype.HG
        }),PT.prototype.get_m_lock_count = PT.prototype.ED = function () {
            return bb(this.eB)
        },PT.prototype.set_m_lock_count = PT.prototype.vG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), yb(e, t)
        },Object.defineProperty(PT.prototype, "m_lock_count", {
            get: PT.prototype.ED,
            set: PT.prototype.vG
        }),PT.prototype.get_numverts = PT.prototype.GE = function () {
            return mb(this.eB)
        },PT.prototype.set_numverts = PT.prototype.yH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), db(e, t)
        },Object.defineProperty(PT.prototype, "numverts", {
            get: PT.prototype.GE,
            set: PT.prototype.yH
        }),PT.prototype.get_type = PT.prototype.KE = function () {
            return fb(this.eB)
        },PT.prototype.set_type = PT.prototype.CH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), hb(e, t)
        },Object.defineProperty(PT.prototype, "type", {
            get: PT.prototype.KE,
            set: PT.prototype.CH
        }),PT.prototype.get_stride = PT.prototype.IE = function () {
            return Bb(this.eB)
        },PT.prototype.set_stride = PT.prototype.AH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), gb(e, t)
        },Object.defineProperty(PT.prototype, "stride", {
            get: PT.prototype.IE,
            set: PT.prototype.AH
        }),PT.prototype.get_indexstride = PT.prototype.bC = function () {
            return Cb(this.eB)
        },PT.prototype.set_indexstride = PT.prototype.TE = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Sb(e, t)
        },Object.defineProperty(PT.prototype, "indexstride", {
            get: PT.prototype.bC,
            set: PT.prototype.TE
        }),PT.prototype.get_numfaces = PT.prototype.FE = function () {
            return jb(this.eB)
        },PT.prototype.set_numfaces = PT.prototype.xH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), vb(e, t)
        },Object.defineProperty(PT.prototype, "numfaces", {
            get: PT.prototype.FE,
            set: PT.prototype.xH
        }),PT.prototype.get_indicestype = PT.prototype.cC = function () {
            return Ib(this.eB)
        },PT.prototype.set_indicestype = PT.prototype.UE = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Rb(e, t)
        },Object.defineProperty(PT.prototype, "indicestype", {
            get: PT.prototype.cC,
            set: PT.prototype.UE
        }),PT.prototype.__destroy__ = function () {
            Db(this.eB)
        },TT.prototype = Object.create(vP.prototype),TT.prototype.constructor = TT,TT.prototype.fB = TT,TT.gB = {},n.btGImpactMeshShapePart = TT,TT.prototype.getTrimeshPrimitiveManager = function () {
            return qD(Tb(this.eB), PT)
        },TT.prototype.getVertexCount = function () {
            return Ob(this.eB)
        },TT.prototype.getVertex = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Wb(n, t, e)
        },TT.prototype.getPart = function () {
            return Ab(this.eB)
        },TT.prototype.setLocalScaling = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Mb(e, t)
        },TT.prototype.getLocalScaling = function () {
            return qD(xb(this.eB), lP)
        },TT.prototype.updateBound = function () {
            kb(this.eB)
        },TT.prototype.postUpdate = function () {
            Fb(this.eB)
        },TT.prototype.getShapeType = function () {
            return Lb(this.eB)
        },TT.prototype.needsRetrieveTriangles = function () {
            return !!Gb(this.eB)
        },TT.prototype.needsRetrieveTetrahedrons = function () {
            return !!wb(this.eB)
        },TT.prototype.getBulletTriangle = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Hb(n, t, e)
        },TT.prototype.getBulletTetrahedron = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Vb(n, t, e)
        },TT.prototype.__destroy__ = function () {
            Eb(this.eB)
        },OT.prototype = Object.create(vP.prototype),OT.prototype.constructor = OT,OT.prototype.fB = OT,OT.gB = {},n.btGImpactMeshShape = OT,OT.prototype.getMeshInterface = function () {
            return qD(Ub(this.eB), CP)
        },OT.prototype.getMeshPartCount = function () {
            return zb(this.eB)
        },OT.prototype.getMeshPart = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(qb(e, t), TT)
        },OT.prototype.calculateSerializeBufferSize = function () {
            return Kb(this.eB)
        },OT.prototype.setLocalScaling = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Qb(e, t)
        },OT.prototype.getLocalScaling = function () {
            return qD(Xb(this.eB), lP)
        },OT.prototype.updateBound = function () {
            Zb(this.eB)
        },OT.prototype.postUpdate = function () {
            Yb(this.eB)
        },OT.prototype.getShapeType = function () {
            return Jb(this.eB)
        },OT.prototype.needsRetrieveTriangles = function () {
            return !!$b(this.eB)
        },OT.prototype.needsRetrieveTetrahedrons = function () {
            return !!ty(this.eB)
        },OT.prototype.getBulletTriangle = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), ey(n, t, e)
        },OT.prototype.getBulletTetrahedron = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), ny(n, t, e)
        },OT.prototype.__destroy__ = function () {
            oy(this.eB)
        },WT.prototype = Object.create(UD.prototype),WT.prototype.constructor = WT,WT.prototype.fB = WT,WT.gB = {},n.btCollisionAlgorithmConstructionInfo = WT,WT.prototype.get_m_dispatcher1 = WT.prototype.$C = function () {
            return qD(ry(this.eB), DP)
        },WT.prototype.set_m_dispatcher1 = WT.prototype.RF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), py(e, t)
        },Object.defineProperty(WT.prototype, "m_dispatcher1", {
            get: WT.prototype.$C,
            set: WT.prototype.RF
        }),WT.prototype.get_m_manifold = WT.prototype.FD = function () {
            return qD(sy(this.eB), xT)
        },WT.prototype.set_m_manifold = WT.prototype.wG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), cy(e, t)
        },Object.defineProperty(WT.prototype, "m_manifold", {
            get: WT.prototype.FD,
            set: WT.prototype.wG
        }),WT.prototype.__destroy__ = function () {
            ay(this.eB)
        },AT.prototype = Object.create(IP.prototype),AT.prototype.constructor = AT,AT.prototype.fB = AT,AT.gB = {},n.btGImpactCollisionAlgorithm = AT,AT.prototype.registerAlgorithm = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), uy(e, t)
        },AT.prototype.__destroy__ = function () {
            by(this.eB)
        },MT.prototype = Object.create(UD.prototype),MT.prototype.constructor = MT,MT.prototype.fB = MT,MT.gB = {},n.btDefaultCollisionConstructionInfo = MT,MT.prototype.__destroy__ = function () {
            my(this.eB)
        },xT.prototype = Object.create(UD.prototype),xT.prototype.constructor = xT,xT.prototype.fB = xT,xT.gB = {},n.btPersistentManifold = xT,xT.prototype.getBody0 = function () {
            return qD(fy(this.eB), iP)
        },xT.prototype.getBody1 = function () {
            return qD(hy(this.eB), iP)
        },xT.prototype.getNumContacts = function () {
            return By(this.eB)
        },xT.prototype.getContactPoint = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(gy(e, t), qP)
        },xT.prototype.__destroy__ = function () {
            Cy(this.eB)
        },kT.prototype = Object.create(DP.prototype),kT.prototype.constructor = kT,kT.prototype.fB = kT,kT.gB = {},n.btCollisionDispatcher = kT,kT.prototype.getNumManifolds = function () {
            return jy(this.eB)
        },kT.prototype.getManifoldByIndexInternal = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(vy(e, t), xT)
        },kT.prototype.__destroy__ = function () {
            Iy(this.eB)
        },FT.prototype = Object.create(UD.prototype),FT.prototype.constructor = FT,FT.prototype.fB = FT,FT.gB = {},n.btOverlappingPairCallback = FT,FT.prototype.__destroy__ = function () {
            Ry(this.eB)
        },LT.prototype = Object.create(UD.prototype),LT.prototype.constructor = LT,LT.prototype.fB = LT,LT.gB = {},n.btOverlappingPairCache = LT,LT.prototype.setInternalGhostPairCallback = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Dy(e, t)
        },LT.prototype.getNumOverlappingPairs = function () {
            return Py(this.eB)
        },LT.prototype.__destroy__ = function () {
            Ty(this.eB)
        },GT.prototype = Object.create(UD.prototype),GT.prototype.constructor = GT,GT.prototype.fB = GT,GT.gB = {},n.btAxisSweep3 = GT,GT.prototype.__destroy__ = function () {
            xy(this.eB)
        },wT.prototype = Object.create(UD.prototype),wT.prototype.constructor = wT,wT.prototype.fB = wT,wT.gB = {},n.btBroadphaseInterface = wT,wT.prototype.getOverlappingPairCache = function () {
            return qD(ky(this.eB), LT)
        },wT.prototype.__destroy__ = function () {
            Fy(this.eB)
        },HT.prototype = Object.create(UD.prototype),HT.prototype.constructor = HT,HT.prototype.fB = HT,HT.gB = {},n.btCollisionConfiguration = HT,HT.prototype.__destroy__ = function () {
            Ly(this.eB)
        },VT.prototype = Object.create(UD.prototype),VT.prototype.constructor = VT,VT.prototype.fB = VT,VT.gB = {},n.btDbvtBroadphase = VT,VT.prototype.__destroy__ = function () {
            wy(this.eB)
        },ET.prototype = Object.create(UD.prototype),ET.prototype.constructor = ET,ET.prototype.fB = ET,ET.gB = {},n.btBroadphaseProxy = ET,ET.prototype.get_m_collisionFilterGroup = ET.prototype.hB = function () {
            return Hy(this.eB)
        },ET.prototype.set_m_collisionFilterGroup = ET.prototype.jB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Vy(e, t)
        },Object.defineProperty(ET.prototype, "m_collisionFilterGroup", {
            get: ET.prototype.hB,
            set: ET.prototype.jB
        }),ET.prototype.get_m_collisionFilterMask = ET.prototype.iB = function () {
            return Ey(this.eB)
        },ET.prototype.set_m_collisionFilterMask = ET.prototype.kB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ny(e, t)
        },Object.defineProperty(ET.prototype, "m_collisionFilterMask", {
            get: ET.prototype.iB,
            set: ET.prototype.kB
        }),ET.prototype.__destroy__ = function () {
            Uy(this.eB)
        },NT.prototype = Object.create(UD.prototype),NT.prototype.constructor = NT,NT.prototype.fB = NT,NT.gB = {},n.btRigidBodyConstructionInfo = NT,NT.prototype.get_m_linearDamping = NT.prototype.yD = function () {
            return Ky(this.eB)
        },NT.prototype.set_m_linearDamping = NT.prototype.pG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Qy(e, t)
        },Object.defineProperty(NT.prototype, "m_linearDamping", {
            get: NT.prototype.yD,
            set: NT.prototype.pG
        }),NT.prototype.get_m_angularDamping = NT.prototype.CC = function () {
            return Xy(this.eB)
        },NT.prototype.set_m_angularDamping = NT.prototype.tF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Zy(e, t)
        },Object.defineProperty(NT.prototype, "m_angularDamping", {
            get: NT.prototype.CC,
            set: NT.prototype.tF
        }),NT.prototype.get_m_friction = NT.prototype.fD = function () {
            return Yy(this.eB)
        },NT.prototype.set_m_friction = NT.prototype.XF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Jy(e, t)
        },Object.defineProperty(NT.prototype, "m_friction", {
            get: NT.prototype.fD,
            set: NT.prototype.XF
        }),NT.prototype.get_m_rollingFriction = NT.prototype.ZD = function () {
            return $y(this.eB)
        },NT.prototype.set_m_rollingFriction = NT.prototype.QG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), tm(e, t)
        },Object.defineProperty(NT.prototype, "m_rollingFriction", {
            get: NT.prototype.ZD,
            set: NT.prototype.QG
        }),NT.prototype.get_m_restitution = NT.prototype.XD = function () {
            return em(this.eB)
        },NT.prototype.set_m_restitution = NT.prototype.OG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), nm(e, t)
        },Object.defineProperty(NT.prototype, "m_restitution", {
            get: NT.prototype.XD,
            set: NT.prototype.OG
        }),NT.prototype.get_m_linearSleepingThreshold = NT.prototype.zD = function () {
            return om(this.eB)
        },NT.prototype.set_m_linearSleepingThreshold = NT.prototype.qG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), _m(e, t)
        },Object.defineProperty(NT.prototype, "m_linearSleepingThreshold", {
            get: NT.prototype.zD,
            set: NT.prototype.qG
        }),NT.prototype.get_m_angularSleepingThreshold = NT.prototype.DC = function () {
            return im(this.eB)
        },NT.prototype.set_m_angularSleepingThreshold = NT.prototype.uF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), rm(e, t)
        },Object.defineProperty(NT.prototype, "m_angularSleepingThreshold", {
            get: NT.prototype.DC,
            set: NT.prototype.uF
        }),NT.prototype.get_m_additionalDamping = NT.prototype.xC = function () {
            return !!pm(this.eB)
        },NT.prototype.set_m_additionalDamping = NT.prototype.oF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), sm(e, t)
        },Object.defineProperty(NT.prototype, "m_additionalDamping", {
            get: NT.prototype.xC,
            set: NT.prototype.oF
        }),NT.prototype.get_m_additionalDampingFactor = NT.prototype.yC = function () {
            return cm(this.eB)
        },NT.prototype.set_m_additionalDampingFactor = NT.prototype.pF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), am(e, t)
        },Object.defineProperty(NT.prototype, "m_additionalDampingFactor", {
            get: NT.prototype.yC,
            set: NT.prototype.pF
        }),NT.prototype.get_m_additionalLinearDampingThresholdSqr = NT.prototype.zC = function () {
            return lm(this.eB)
        },NT.prototype.set_m_additionalLinearDampingThresholdSqr = NT.prototype.qF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), um(e, t)
        },Object.defineProperty(NT.prototype, "m_additionalLinearDampingThresholdSqr", {
            get: NT.prototype.zC,
            set: NT.prototype.qF
        }),NT.prototype.get_m_additionalAngularDampingThresholdSqr = NT.prototype.wC = function () {
            return bm(this.eB)
        },NT.prototype.set_m_additionalAngularDampingThresholdSqr = NT.prototype.nF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ym(e, t)
        },Object.defineProperty(NT.prototype, "m_additionalAngularDampingThresholdSqr", {
            get: NT.prototype.wC,
            set: NT.prototype.nF
        }),NT.prototype.get_m_additionalAngularDampingFactor = NT.prototype.vC = function () {
            return mm(this.eB)
        },NT.prototype.set_m_additionalAngularDampingFactor = NT.prototype.mF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), dm(e, t)
        },Object.defineProperty(NT.prototype, "m_additionalAngularDampingFactor", {
            get: NT.prototype.vC,
            set: NT.prototype.mF
        }),NT.prototype.__destroy__ = function () {
            fm(this.eB)
        },UT.prototype = Object.create(iP.prototype),UT.prototype.constructor = UT,UT.prototype.fB = UT,UT.gB = {},n.btRigidBody = UT,UT.prototype.getCenterOfMassTransform = function () {
            return qD(Bm(this.eB), wP)
        },UT.prototype.setCenterOfMassTransform = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), gm(e, t)
        },UT.prototype.setSleepingThresholds = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Cm(n, t, e)
        },UT.prototype.getLinearDamping = function () {
            return Sm(this.eB)
        },UT.prototype.getAngularDamping = function () {
            return jm(this.eB)
        },UT.prototype.setDamping = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), vm(n, t, e)
        },UT.prototype.setMassProps = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Im(n, t, e)
        },UT.prototype.getLinearFactor = function () {
            return qD(Rm(this.eB), lP)
        },UT.prototype.setLinearFactor = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Dm(e, t)
        },UT.prototype.applyTorque = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Pm(e, t)
        },UT.prototype.applyLocalTorque = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Tm(e, t)
        },UT.prototype.applyForce = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Om(n, t, e)
        },UT.prototype.applyCentralForce = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Wm(e, t)
        },UT.prototype.applyCentralLocalForce = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Am(e, t)
        },UT.prototype.applyTorqueImpulse = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Mm(e, t)
        },UT.prototype.applyImpulse = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), xm(n, t, e)
        },UT.prototype.applyCentralImpulse = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), km(e, t)
        },UT.prototype.updateInertiaTensor = function () {
            Fm(this.eB)
        },UT.prototype.getLinearVelocity = function () {
            return qD(Lm(this.eB), lP)
        },UT.prototype.getAngularVelocity = function () {
            return qD(Gm(this.eB), lP)
        },UT.prototype.setLinearVelocity = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), wm(e, t)
        },UT.prototype.setAngularVelocity = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Hm(e, t)
        },UT.prototype.getMotionState = function () {
            return qD(Vm(this.eB), bP)
        },UT.prototype.setMotionState = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Em(e, t)
        },UT.prototype.getAngularFactor = function () {
            return qD(Nm(this.eB), lP)
        },UT.prototype.setAngularFactor = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Um(e, t)
        },UT.prototype.upcast = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(zm(e, t), UT)
        },UT.prototype.getAabb = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), qm(n, t, e)
        },UT.prototype.applyGravity = function () {
            Km(this.eB)
        },UT.prototype.getGravity = function () {
            return qD(Qm(this.eB), lP)
        },UT.prototype.setGravity = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Xm(e, t)
        },UT.prototype.getBroadphaseProxy = function () {
            return qD(Zm(this.eB), ET)
        },UT.prototype.clearForces = function () {
            Ym(this.eB)
        },UT.prototype.setAnisotropicFriction = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Jm(n, t, e)
        },UT.prototype.getCollisionShape = function () {
            return qD($m(this.eB), oP)
        },UT.prototype.setContactProcessingThreshold = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), td(e, t)
        },UT.prototype.setActivationState = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ed(e, t)
        },UT.prototype.forceActivationState = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), nd(e, t)
        },UT.prototype.activate = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), void 0 === t ? od(e) : _d(e, t)
        },UT.prototype.isActive = function () {
            return !!id(this.eB)
        },UT.prototype.isKinematicObject = function () {
            return !!rd(this.eB)
        },UT.prototype.isStaticObject = function () {
            return !!pd(this.eB)
        },UT.prototype.isStaticOrKinematicObject = function () {
            return !!sd(this.eB)
        },UT.prototype.getRestitution = function () {
            return cd(this.eB)
        },UT.prototype.getFriction = function () {
            return ad(this.eB)
        },UT.prototype.getRollingFriction = function () {
            return ld(this.eB)
        },UT.prototype.setRestitution = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ud(e, t)
        },UT.prototype.setFriction = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), bd(e, t)
        },UT.prototype.setRollingFriction = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), yd(e, t)
        },UT.prototype.getWorldTransform = function () {
            return qD(md(this.eB), wP)
        },UT.prototype.getCollisionFlags = function () {
            return dd(this.eB)
        },UT.prototype.setCollisionFlags = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), fd(e, t)
        },UT.prototype.setWorldTransform = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), hd(e, t)
        },UT.prototype.setCollisionShape = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Bd(e, t)
        },UT.prototype.setCcdMotionThreshold = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), gd(e, t)
        },UT.prototype.setCcdSweptSphereRadius = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Cd(e, t)
        },UT.prototype.getUserIndex = function () {
            return Sd(this.eB)
        },UT.prototype.setUserIndex = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), jd(e, t)
        },UT.prototype.getUserPointer = function () {
            return qD(vd(this.eB), xP)
        },UT.prototype.setUserPointer = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Id(e, t)
        },UT.prototype.getBroadphaseHandle = function () {
            return qD(Rd(this.eB), ET)
        },UT.prototype.__destroy__ = function () {
            Dd(this.eB)
        },zT.prototype = Object.create(UD.prototype),zT.prototype.constructor = zT,zT.prototype.fB = zT,zT.gB = {},n.btConstraintSetting = zT,zT.prototype.get_m_tau = zT.prototype.nE = function () {
            return Td(this.eB)
        },zT.prototype.set_m_tau = zT.prototype.fH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Od(e, t)
        },Object.defineProperty(zT.prototype, "m_tau", {
            get: zT.prototype.nE,
            set: zT.prototype.fH
        }),zT.prototype.get_m_damping = zT.prototype.WC = function () {
            return Wd(this.eB)
        },zT.prototype.set_m_damping = zT.prototype.NF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ad(e, t)
        },Object.defineProperty(zT.prototype, "m_damping", {
            get: zT.prototype.WC,
            set: zT.prototype.NF
        }),zT.prototype.get_m_impulseClamp = zT.prototype.rD = function () {
            return Md(this.eB)
        },zT.prototype.set_m_impulseClamp = zT.prototype.iG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), xd(e, t)
        },Object.defineProperty(zT.prototype, "m_impulseClamp", {
            get: zT.prototype.rD,
            set: zT.prototype.iG
        }),zT.prototype.__destroy__ = function () {
            kd(this.eB)
        },qT.prototype = Object.create(sP.prototype),qT.prototype.constructor = qT,qT.prototype.fB = qT,qT.gB = {},n.btPoint2PointConstraint = qT,qT.prototype.setPivotA = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Gd(e, t)
        },qT.prototype.setPivotB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), wd(e, t)
        },qT.prototype.getPivotInA = function () {
            return qD(Hd(this.eB), lP)
        },qT.prototype.getPivotInB = function () {
            return qD(Vd(this.eB), lP)
        },qT.prototype.enableFeedback = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ed(e, t)
        },qT.prototype.getBreakingImpulseThreshold = function () {
            return Nd(this.eB)
        },qT.prototype.setBreakingImpulseThreshold = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ud(e, t)
        },qT.prototype.getParam = function (t, e) {
            var n = this.eB;
            return t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), zd(n, t, e)
        },qT.prototype.setParam = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), qd(o, t, e, n)
        },qT.prototype.get_m_setting = qT.prototype.aE = function () {
            return qD(Kd(this.eB), zT)
        },qT.prototype.set_m_setting = qT.prototype.TG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Qd(e, t)
        },Object.defineProperty(qT.prototype, "m_setting", {
            get: qT.prototype.aE,
            set: qT.prototype.TG
        }),qT.prototype.__destroy__ = function () {
            Xd(this.eB)
        },KT.prototype = Object.create(PP.prototype),KT.prototype.constructor = KT,KT.prototype.fB = KT,KT.gB = {},n.btGeneric6DofSpringConstraint = KT,KT.prototype.enableSpring = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Jd(n, t, e)
        },KT.prototype.setStiffness = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), $d(n, t, e)
        },KT.prototype.setDamping = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), tf(n, t, e)
        },KT.prototype.setEquilibriumPoint = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), void 0 === t ? ef(n) : void 0 === e ? nf(n, t) : of(n, t, e)
        },KT.prototype.setLinearLowerLimit = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), _f(e, t)
        },KT.prototype.setLinearUpperLimit = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), rf(e, t)
        },KT.prototype.setAngularLowerLimit = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), pf(e, t)
        },KT.prototype.setAngularUpperLimit = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), sf(e, t)
        },KT.prototype.getFrameOffsetA = function () {
            return qD(cf(this.eB), wP)
        },KT.prototype.enableFeedback = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), af(e, t)
        },KT.prototype.getBreakingImpulseThreshold = function () {
            return lf(this.eB)
        },KT.prototype.setBreakingImpulseThreshold = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), uf(e, t)
        },KT.prototype.getParam = function (t, e) {
            var n = this.eB;
            return t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), bf(n, t, e)
        },KT.prototype.setParam = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), yf(o, t, e, n)
        },KT.prototype.__destroy__ = function () {
            mf(this.eB)
        },QT.prototype = Object.create(UD.prototype),QT.prototype.constructor = QT,QT.prototype.fB = QT,QT.gB = {},n.btSequentialImpulseConstraintSolver = QT,QT.prototype.__destroy__ = function () {
            ff(this.eB)
        },XT.prototype = Object.create(sP.prototype),XT.prototype.constructor = XT,XT.prototype.fB = XT,XT.gB = {},n.btConeTwistConstraint = XT,XT.prototype.setLimit = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), gf(n, t, e)
        },XT.prototype.setAngularOnly = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Cf(e, t)
        },XT.prototype.setDamping = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Sf(e, t)
        },XT.prototype.enableMotor = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), jf(e, t)
        },XT.prototype.setMaxMotorImpulse = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), vf(e, t)
        },XT.prototype.setMaxMotorImpulseNormalized = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), If(e, t)
        },XT.prototype.setMotorTarget = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Rf(e, t)
        },XT.prototype.setMotorTargetInConstraintSpace = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Df(e, t)
        },XT.prototype.enableFeedback = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Pf(e, t)
        },XT.prototype.getBreakingImpulseThreshold = function () {
            return Tf(this.eB)
        },XT.prototype.setBreakingImpulseThreshold = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Of(e, t)
        },XT.prototype.getParam = function (t, e) {
            var n = this.eB;
            return t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Wf(n, t, e)
        },XT.prototype.setParam = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), Af(o, t, e, n)
        },XT.prototype.__destroy__ = function () {
            Mf(this.eB)
        },ZT.prototype = Object.create(sP.prototype),ZT.prototype.constructor = ZT,ZT.prototype.fB = ZT,ZT.gB = {},n.btHingeConstraint = ZT,ZT.prototype.getHingeAngle = function () {
            return Hf(this.eB)
        },ZT.prototype.setLimit = function (t, e, n, o, _) {
            var i = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), _ && "object" == typeof _ && (_ = _.eB), void 0 === _ ? Vf(i, t, e, n, o) : Ef(i, t, e, n, o, _)
        },ZT.prototype.enableAngularMotor = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), Nf(o, t, e, n)
        },ZT.prototype.setAngularOnly = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Uf(e, t)
        },ZT.prototype.enableMotor = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), zf(e, t)
        },ZT.prototype.setMaxMotorImpulse = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), qf(e, t)
        },ZT.prototype.setMotorTarget = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Kf(n, t, e)
        },ZT.prototype.enableFeedback = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Qf(e, t)
        },ZT.prototype.getBreakingImpulseThreshold = function () {
            return Xf(this.eB)
        },ZT.prototype.setBreakingImpulseThreshold = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Zf(e, t)
        },ZT.prototype.getParam = function (t, e) {
            var n = this.eB;
            return t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Yf(n, t, e)
        },ZT.prototype.setParam = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), Jf(o, t, e, n)
        },ZT.prototype.__destroy__ = function () {
            $f(this.eB)
        },YT.prototype = Object.create(sP.prototype),YT.prototype.constructor = YT,YT.prototype.fB = YT,YT.gB = {},n.btSliderConstraint = YT,YT.prototype.getLinearPos = function () {
            return nh(this.eB)
        },YT.prototype.getAngularPos = function () {
            return oh(this.eB)
        },YT.prototype.setLowerLinLimit = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), _h(e, t)
        },YT.prototype.setUpperLinLimit = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ih(e, t)
        },YT.prototype.setLowerAngLimit = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), rh(e, t)
        },YT.prototype.setUpperAngLimit = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ph(e, t)
        },YT.prototype.setPoweredLinMotor = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), sh(e, t)
        },YT.prototype.setMaxLinMotorForce = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ch(e, t)
        },YT.prototype.setTargetLinMotorVelocity = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ah(e, t)
        },YT.prototype.enableFeedback = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), lh(e, t)
        },YT.prototype.getBreakingImpulseThreshold = function () {
            return uh(this.eB)
        },YT.prototype.setBreakingImpulseThreshold = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), bh(e, t)
        },YT.prototype.getParam = function (t, e) {
            var n = this.eB;
            return t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), yh(n, t, e)
        },YT.prototype.setParam = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), mh(o, t, e, n)
        },YT.prototype.__destroy__ = function () {
            dh(this.eB)
        },JT.prototype = Object.create(sP.prototype),JT.prototype.constructor = JT,JT.prototype.fB = JT,JT.gB = {},n.btFixedConstraint = JT,JT.prototype.enableFeedback = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), hh(e, t)
        },JT.prototype.getBreakingImpulseThreshold = function () {
            return Bh(this.eB)
        },JT.prototype.setBreakingImpulseThreshold = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), gh(e, t)
        },JT.prototype.getParam = function (t, e) {
            var n = this.eB;
            return t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), Ch(n, t, e)
        },JT.prototype.setParam = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), Sh(o, t, e, n)
        },JT.prototype.__destroy__ = function () {
            jh(this.eB)
        },$T.prototype = Object.create(UD.prototype),$T.prototype.constructor = $T,$T.prototype.fB = $T,$T.gB = {},n.btConstraintSolver = $T,$T.prototype.__destroy__ = function () {
            vh(this.eB)
        },tO.prototype = Object.create(UD.prototype),tO.prototype.constructor = tO,tO.prototype.fB = tO,tO.gB = {},n.btDispatcherInfo = tO,tO.prototype.get_m_timeStep = tO.prototype.pE = function () {
            return Ih(this.eB)
        },tO.prototype.set_m_timeStep = tO.prototype.hH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Rh(e, t)
        },Object.defineProperty(tO.prototype, "m_timeStep", {
            get: tO.prototype.pE,
            set: tO.prototype.hH
        }),tO.prototype.get_m_stepCount = tO.prototype.gE = function () {
            return Dh(this.eB)
        },tO.prototype.set_m_stepCount = tO.prototype.ZG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ph(e, t)
        },Object.defineProperty(tO.prototype, "m_stepCount", {
            get: tO.prototype.gE,
            set: tO.prototype.ZG
        }),tO.prototype.get_m_dispatchFunc = tO.prototype.YC = function () {
            return Th(this.eB)
        },tO.prototype.set_m_dispatchFunc = tO.prototype.PF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Oh(e, t)
        },Object.defineProperty(tO.prototype, "m_dispatchFunc", {
            get: tO.prototype.YC,
            set: tO.prototype.PF
        }),tO.prototype.get_m_timeOfImpact = tO.prototype.oE = function () {
            return Wh(this.eB)
        },tO.prototype.set_m_timeOfImpact = tO.prototype.gH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ah(e, t)
        },Object.defineProperty(tO.prototype, "m_timeOfImpact", {
            get: tO.prototype.oE,
            set: tO.prototype.gH
        }),tO.prototype.get_m_useContinuous = tO.prototype.rE = function () {
            return !!Mh(this.eB)
        },tO.prototype.set_m_useContinuous = tO.prototype.jH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), xh(e, t)
        },Object.defineProperty(tO.prototype, "m_useContinuous", {
            get: tO.prototype.rE,
            set: tO.prototype.jH
        }),tO.prototype.get_m_enableSatConvex = tO.prototype.cD = function () {
            return !!kh(this.eB)
        },tO.prototype.set_m_enableSatConvex = tO.prototype.UF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Fh(e, t)
        },Object.defineProperty(tO.prototype, "m_enableSatConvex", {
            get: tO.prototype.cD,
            set: tO.prototype.UF
        }),tO.prototype.get_m_enableSPU = tO.prototype.bD = function () {
            return !!Lh(this.eB)
        },tO.prototype.set_m_enableSPU = tO.prototype.TF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Gh(e, t)
        },Object.defineProperty(tO.prototype, "m_enableSPU", {
            get: tO.prototype.bD,
            set: tO.prototype.TF
        }),tO.prototype.get_m_useEpa = tO.prototype.tE = function () {
            return !!wh(this.eB)
        },tO.prototype.set_m_useEpa = tO.prototype.lH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Hh(e, t)
        },Object.defineProperty(tO.prototype, "m_useEpa", {
            get: tO.prototype.tE,
            set: tO.prototype.lH
        }),tO.prototype.get_m_allowedCcdPenetration = tO.prototype.AC = function () {
            return Vh(this.eB)
        },tO.prototype.set_m_allowedCcdPenetration = tO.prototype.rF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Eh(e, t)
        },Object.defineProperty(tO.prototype, "m_allowedCcdPenetration", {
            get: tO.prototype.AC,
            set: tO.prototype.rF
        }),tO.prototype.get_m_useConvexConservativeDistanceUtil = tO.prototype.sE = function () {
            return !!Nh(this.eB)
        },tO.prototype.set_m_useConvexConservativeDistanceUtil = tO.prototype.kH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Uh(e, t)
        },Object.defineProperty(tO.prototype, "m_useConvexConservativeDistanceUtil", {
            get: tO.prototype.sE,
            set: tO.prototype.kH
        }),tO.prototype.get_m_convexConservativeDistanceThreshold = tO.prototype.TC = function () {
            return zh(this.eB)
        },tO.prototype.set_m_convexConservativeDistanceThreshold = tO.prototype.KF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), qh(e, t)
        },Object.defineProperty(tO.prototype, "m_convexConservativeDistanceThreshold", {
            get: tO.prototype.TC,
            set: tO.prototype.KF
        }),tO.prototype.__destroy__ = function () {
            Kh(this.eB)
        },eO.prototype = Object.create(UD.prototype),eO.prototype.constructor = eO,eO.prototype.fB = eO,eO.gB = {},n.btContactSolverInfo = eO,eO.prototype.get_m_splitImpulse = eO.prototype.dE = function () {
            return !!Qh(this.eB)
        },eO.prototype.set_m_splitImpulse = eO.prototype.WG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Xh(e, t)
        },Object.defineProperty(eO.prototype, "m_splitImpulse", {
            get: eO.prototype.dE,
            set: eO.prototype.WG
        }),eO.prototype.get_m_splitImpulsePenetrationThreshold = eO.prototype.eE = function () {
            return Zh(this.eB)
        },eO.prototype.set_m_splitImpulsePenetrationThreshold = eO.prototype.XG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Yh(e, t)
        },Object.defineProperty(eO.prototype, "m_splitImpulsePenetrationThreshold", {
            get: eO.prototype.eE,
            set: eO.prototype.XG
        }),eO.prototype.get_m_numIterations = eO.prototype.OD = function () {
            return Jh(this.eB)
        },eO.prototype.set_m_numIterations = eO.prototype.FG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), $h(e, t)
        },Object.defineProperty(eO.prototype, "m_numIterations", {
            get: eO.prototype.OD,
            set: eO.prototype.FG
        }),eO.prototype.__destroy__ = function () {
            tB(this.eB)
        },nO.prototype = Object.create(UD.prototype),nO.prototype.constructor = nO,nO.prototype.fB = nO,nO.gB = {},n.btVehicleTuning = nO,nO.prototype.get_m_suspensionStiffness = nO.prototype.vB = function () {
            return nB(this.eB)
        },nO.prototype.set_m_suspensionStiffness = nO.prototype.CB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), oB(e, t)
        },Object.defineProperty(nO.prototype, "m_suspensionStiffness", {
            get: nO.prototype.vB,
            set: nO.prototype.CB
        }),nO.prototype.get_m_suspensionCompression = nO.prototype.hE = function () {
            return _B(this.eB)
        },nO.prototype.set_m_suspensionCompression = nO.prototype.$G = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), iB(e, t)
        },Object.defineProperty(nO.prototype, "m_suspensionCompression", {
            get: nO.prototype.hE,
            set: nO.prototype.$G
        }),nO.prototype.get_m_suspensionDamping = nO.prototype.iE = function () {
            return rB(this.eB)
        },nO.prototype.set_m_suspensionDamping = nO.prototype.aH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), pB(e, t)
        },Object.defineProperty(nO.prototype, "m_suspensionDamping", {
            get: nO.prototype.iE,
            set: nO.prototype.aH
        }),nO.prototype.get_m_maxSuspensionTravelCm = nO.prototype.uB = function () {
            return sB(this.eB)
        },nO.prototype.set_m_maxSuspensionTravelCm = nO.prototype.BB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), cB(e, t)
        },Object.defineProperty(nO.prototype, "m_maxSuspensionTravelCm", {
            get: nO.prototype.uB,
            set: nO.prototype.BB
        }),nO.prototype.get_m_frictionSlip = nO.prototype.qB = function () {
            return aB(this.eB)
        },nO.prototype.set_m_frictionSlip = nO.prototype.xB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), lB(e, t)
        },Object.defineProperty(nO.prototype, "m_frictionSlip", {
            get: nO.prototype.qB,
            set: nO.prototype.xB
        }),nO.prototype.get_m_maxSuspensionForce = nO.prototype.tB = function () {
            return uB(this.eB)
        },nO.prototype.set_m_maxSuspensionForce = nO.prototype.AB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), bB(e, t)
        },Object.defineProperty(nO.prototype, "m_maxSuspensionForce", {
            get: nO.prototype.tB,
            set: nO.prototype.AB
        }),oO.prototype = Object.create(UD.prototype),oO.prototype.constructor = oO,oO.prototype.fB = oO,oO.gB = {},n.btVehicleRaycasterResult = oO,oO.prototype.get_m_hitPointInWorld = oO.prototype.oD = function () {
            return qD(yB(this.eB), lP)
        },oO.prototype.set_m_hitPointInWorld = oO.prototype.fG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), mB(e, t)
        },Object.defineProperty(oO.prototype, "m_hitPointInWorld", {
            get: oO.prototype.oD,
            set: oO.prototype.fG
        }),oO.prototype.get_m_hitNormalInWorld = oO.prototype.mD = function () {
            return qD(dB(this.eB), lP)
        },oO.prototype.set_m_hitNormalInWorld = oO.prototype.dG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), fB(e, t)
        },Object.defineProperty(oO.prototype, "m_hitNormalInWorld", {
            get: oO.prototype.mD,
            set: oO.prototype.dG
        }),oO.prototype.get_m_distFraction = oO.prototype.aD = function () {
            return hB(this.eB)
        },oO.prototype.set_m_distFraction = oO.prototype.SF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), BB(e, t)
        },Object.defineProperty(oO.prototype, "m_distFraction", {
            get: oO.prototype.aD,
            set: oO.prototype.SF
        }),oO.prototype.__destroy__ = function () {
            gB(this.eB)
        },_O.prototype = Object.create(OP.prototype),_O.prototype.constructor = _O,_O.prototype.fB = _O,_O.gB = {},n.btDefaultVehicleRaycaster = _O,_O.prototype.castRay = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), SB(o, t, e, n)
        },_O.prototype.__destroy__ = function () {
            jB(this.eB)
        },iO.prototype = Object.create(UD.prototype),iO.prototype.constructor = iO,iO.prototype.fB = iO,iO.gB = {},n.RaycastInfo = iO,iO.prototype.get_m_contactNormalWS = iO.prototype.RC = function () {
            return qD(vB(this.eB), lP)
        },iO.prototype.set_m_contactNormalWS = iO.prototype.IF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), IB(e, t)
        },Object.defineProperty(iO.prototype, "m_contactNormalWS", {
            get: iO.prototype.RC,
            set: iO.prototype.IF
        }),iO.prototype.get_m_contactPointWS = iO.prototype.SC = function () {
            return qD(RB(this.eB), lP)
        },iO.prototype.set_m_contactPointWS = iO.prototype.JF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), DB(e, t)
        },Object.defineProperty(iO.prototype, "m_contactPointWS", {
            get: iO.prototype.SC,
            set: iO.prototype.JF
        }),iO.prototype.get_m_suspensionLength = iO.prototype.jE = function () {
            return PB(this.eB)
        },iO.prototype.set_m_suspensionLength = iO.prototype.bH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), TB(e, t)
        },Object.defineProperty(iO.prototype, "m_suspensionLength", {
            get: iO.prototype.jE,
            set: iO.prototype.bH
        }),iO.prototype.get_m_hardPointWS = iO.prototype.jD = function () {
            return qD(OB(this.eB), lP)
        },iO.prototype.set_m_hardPointWS = iO.prototype.aG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), WB(e, t)
        },Object.defineProperty(iO.prototype, "m_hardPointWS", {
            get: iO.prototype.jD,
            set: iO.prototype.aG
        }),iO.prototype.get_m_wheelDirectionWS = iO.prototype.yE = function () {
            return qD(AB(this.eB), lP)
        },iO.prototype.set_m_wheelDirectionWS = iO.prototype.qH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), MB(e, t)
        },Object.defineProperty(iO.prototype, "m_wheelDirectionWS", {
            get: iO.prototype.yE,
            set: iO.prototype.qH
        }),iO.prototype.get_m_wheelAxleWS = iO.prototype.xE = function () {
            return qD(xB(this.eB), lP)
        },iO.prototype.set_m_wheelAxleWS = iO.prototype.pH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), kB(e, t)
        },Object.defineProperty(iO.prototype, "m_wheelAxleWS", {
            get: iO.prototype.xE,
            set: iO.prototype.pH
        }),iO.prototype.get_m_isInContact = iO.prototype.uD = function () {
            return !!FB(this.eB)
        },iO.prototype.set_m_isInContact = iO.prototype.lG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), LB(e, t)
        },Object.defineProperty(iO.prototype, "m_isInContact", {
            get: iO.prototype.uD,
            set: iO.prototype.lG
        }),iO.prototype.get_m_groundObject = iO.prototype.iD = function () {
            return GB(this.eB)
        },iO.prototype.set_m_groundObject = iO.prototype.$F = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), wB(e, t)
        },Object.defineProperty(iO.prototype, "m_groundObject", {
            get: iO.prototype.iD,
            set: iO.prototype.$F
        }),iO.prototype.__destroy__ = function () {
            HB(this.eB)
        },rO.prototype = Object.create(UD.prototype),rO.prototype.constructor = rO,rO.prototype.fB = rO,rO.gB = {},n.btWheelInfoConstructionInfo = rO,rO.prototype.get_m_chassisConnectionCS = rO.prototype.MC = function () {
            return qD(VB(this.eB), lP)
        },rO.prototype.set_m_chassisConnectionCS = rO.prototype.DF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), EB(e, t)
        },Object.defineProperty(rO.prototype, "m_chassisConnectionCS", {
            get: rO.prototype.MC,
            set: rO.prototype.DF
        }),rO.prototype.get_m_wheelDirectionCS = rO.prototype.LB = function () {
            return qD(NB(this.eB), lP)
        },rO.prototype.set_m_wheelDirectionCS = rO.prototype.VB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), UB(e, t)
        },Object.defineProperty(rO.prototype, "m_wheelDirectionCS", {
            get: rO.prototype.LB,
            set: rO.prototype.VB
        }),rO.prototype.get_m_wheelAxleCS = rO.prototype.KB = function () {
            return qD(zB(this.eB), lP)
        },rO.prototype.set_m_wheelAxleCS = rO.prototype.UB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), qB(e, t)
        },Object.defineProperty(rO.prototype, "m_wheelAxleCS", {
            get: rO.prototype.KB,
            set: rO.prototype.UB
        }),rO.prototype.get_m_suspensionRestLength = rO.prototype.lE = function () {
            return KB(this.eB)
        },rO.prototype.set_m_suspensionRestLength = rO.prototype.dH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), QB(e, t)
        },Object.defineProperty(rO.prototype, "m_suspensionRestLength", {
            get: rO.prototype.lE,
            set: rO.prototype.dH
        }),rO.prototype.get_m_maxSuspensionTravelCm = rO.prototype.uB = function () {
            return XB(this.eB)
        },rO.prototype.set_m_maxSuspensionTravelCm = rO.prototype.BB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ZB(e, t)
        },Object.defineProperty(rO.prototype, "m_maxSuspensionTravelCm", {
            get: rO.prototype.uB,
            set: rO.prototype.BB
        }),rO.prototype.get_m_wheelRadius = rO.prototype.zE = function () {
            return YB(this.eB)
        },rO.prototype.set_m_wheelRadius = rO.prototype.rH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), JB(e, t)
        },Object.defineProperty(rO.prototype, "m_wheelRadius", {
            get: rO.prototype.zE,
            set: rO.prototype.rH
        }),rO.prototype.get_m_suspensionStiffness = rO.prototype.vB = function () {
            return $B(this.eB)
        },rO.prototype.set_m_suspensionStiffness = rO.prototype.CB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), tg(e, t)
        },Object.defineProperty(rO.prototype, "m_suspensionStiffness", {
            get: rO.prototype.vB,
            set: rO.prototype.CB
        }),rO.prototype.get_m_wheelsDampingCompression = rO.prototype.MB = function () {
            return eg(this.eB)
        },rO.prototype.set_m_wheelsDampingCompression = rO.prototype.WB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ng(e, t)
        },Object.defineProperty(rO.prototype, "m_wheelsDampingCompression", {
            get: rO.prototype.MB,
            set: rO.prototype.WB
        }),rO.prototype.get_m_wheelsDampingRelaxation = rO.prototype.NB = function () {
            return og(this.eB)
        },rO.prototype.set_m_wheelsDampingRelaxation = rO.prototype.XB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), _g(e, t)
        },Object.defineProperty(rO.prototype, "m_wheelsDampingRelaxation", {
            get: rO.prototype.NB,
            set: rO.prototype.XB
        }),rO.prototype.get_m_frictionSlip = rO.prototype.qB = function () {
            return ig(this.eB)
        },rO.prototype.set_m_frictionSlip = rO.prototype.xB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), rg(e, t)
        },Object.defineProperty(rO.prototype, "m_frictionSlip", {
            get: rO.prototype.qB,
            set: rO.prototype.xB
        }),rO.prototype.get_m_maxSuspensionForce = rO.prototype.tB = function () {
            return pg(this.eB)
        },rO.prototype.set_m_maxSuspensionForce = rO.prototype.AB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), sg(e, t)
        },Object.defineProperty(rO.prototype, "m_maxSuspensionForce", {
            get: rO.prototype.tB,
            set: rO.prototype.AB
        }),rO.prototype.get_m_bIsFrontWheel = rO.prototype.EB = function () {
            return !!cg(this.eB)
        },rO.prototype.set_m_bIsFrontWheel = rO.prototype.OB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ag(e, t)
        },Object.defineProperty(rO.prototype, "m_bIsFrontWheel", {
            get: rO.prototype.EB,
            set: rO.prototype.OB
        }),rO.prototype.__destroy__ = function () {
            lg(this.eB)
        },pO.prototype = Object.create(UD.prototype),pO.prototype.constructor = pO,pO.prototype.fB = pO,pO.gB = {},n.btWheelInfo = pO,pO.prototype.getSuspensionRestLength = function () {
            return bg(this.eB)
        },pO.prototype.updateWheel = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), yg(n, t, e)
        },pO.prototype.get_m_suspensionStiffness = pO.prototype.vB = function () {
            return mg(this.eB)
        },pO.prototype.set_m_suspensionStiffness = pO.prototype.CB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), dg(e, t)
        },Object.defineProperty(pO.prototype, "m_suspensionStiffness", {
            get: pO.prototype.vB,
            set: pO.prototype.CB
        }),pO.prototype.get_m_frictionSlip = pO.prototype.qB = function () {
            return fg(this.eB)
        },pO.prototype.set_m_frictionSlip = pO.prototype.xB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), hg(e, t)
        },Object.defineProperty(pO.prototype, "m_frictionSlip", {
            get: pO.prototype.qB,
            set: pO.prototype.xB
        }),pO.prototype.get_m_engineForce = pO.prototype.dD = function () {
            return Bg(this.eB)
        },pO.prototype.set_m_engineForce = pO.prototype.VF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), gg(e, t)
        },Object.defineProperty(pO.prototype, "m_engineForce", {
            get: pO.prototype.dD,
            set: pO.prototype.VF
        }),pO.prototype.get_m_rollInfluence = pO.prototype.YD = function () {
            return Cg(this.eB)
        },pO.prototype.set_m_rollInfluence = pO.prototype.PG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Sg(e, t)
        },Object.defineProperty(pO.prototype, "m_rollInfluence", {
            get: pO.prototype.YD,
            set: pO.prototype.PG
        }),pO.prototype.get_m_suspensionRestLength1 = pO.prototype.mE = function () {
            return jg(this.eB)
        },pO.prototype.set_m_suspensionRestLength1 = pO.prototype.eH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), vg(e, t)
        },Object.defineProperty(pO.prototype, "m_suspensionRestLength1", {
            get: pO.prototype.mE,
            set: pO.prototype.eH
        }),pO.prototype.get_m_wheelsRadius = pO.prototype.AE = function () {
            return Ig(this.eB)
        },pO.prototype.set_m_wheelsRadius = pO.prototype.sH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Rg(e, t)
        },Object.defineProperty(pO.prototype, "m_wheelsRadius", {
            get: pO.prototype.AE,
            set: pO.prototype.sH
        }),pO.prototype.get_m_wheelsDampingCompression = pO.prototype.MB = function () {
            return Dg(this.eB)
        },pO.prototype.set_m_wheelsDampingCompression = pO.prototype.WB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Pg(e, t)
        },Object.defineProperty(pO.prototype, "m_wheelsDampingCompression", {
            get: pO.prototype.MB,
            set: pO.prototype.WB
        }),pO.prototype.get_m_wheelsDampingRelaxation = pO.prototype.NB = function () {
            return Tg(this.eB)
        },pO.prototype.set_m_wheelsDampingRelaxation = pO.prototype.XB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Og(e, t)
        },Object.defineProperty(pO.prototype, "m_wheelsDampingRelaxation", {
            get: pO.prototype.NB,
            set: pO.prototype.XB
        }),pO.prototype.get_m_steering = pO.prototype.fE = function () {
            return Wg(this.eB)
        },pO.prototype.set_m_steering = pO.prototype.YG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ag(e, t)
        },Object.defineProperty(pO.prototype, "m_steering", {
            get: pO.prototype.fE,
            set: pO.prototype.YG
        }),pO.prototype.get_m_maxSuspensionForce = pO.prototype.tB = function () {
            return Mg(this.eB)
        },pO.prototype.set_m_maxSuspensionForce = pO.prototype.AB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), xg(e, t)
        },Object.defineProperty(pO.prototype, "m_maxSuspensionForce", {
            get: pO.prototype.tB,
            set: pO.prototype.AB
        }),pO.prototype.get_m_maxSuspensionTravelCm = pO.prototype.uB = function () {
            return kg(this.eB)
        },pO.prototype.set_m_maxSuspensionTravelCm = pO.prototype.BB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Fg(e, t)
        },Object.defineProperty(pO.prototype, "m_maxSuspensionTravelCm", {
            get: pO.prototype.uB,
            set: pO.prototype.BB
        }),pO.prototype.get_m_wheelsSuspensionForce = pO.prototype.BE = function () {
            return Lg(this.eB)
        },pO.prototype.set_m_wheelsSuspensionForce = pO.prototype.tH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Gg(e, t)
        },Object.defineProperty(pO.prototype, "m_wheelsSuspensionForce", {
            get: pO.prototype.BE,
            set: pO.prototype.tH
        }),pO.prototype.get_m_bIsFrontWheel = pO.prototype.EB = function () {
            return !!wg(this.eB)
        },pO.prototype.set_m_bIsFrontWheel = pO.prototype.OB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Hg(e, t)
        },Object.defineProperty(pO.prototype, "m_bIsFrontWheel", {
            get: pO.prototype.EB,
            set: pO.prototype.OB
        }),pO.prototype.get_m_raycastInfo = pO.prototype.WD = function () {
            return qD(Vg(this.eB), iO)
        },pO.prototype.set_m_raycastInfo = pO.prototype.NG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Eg(e, t)
        },Object.defineProperty(pO.prototype, "m_raycastInfo", {
            get: pO.prototype.WD,
            set: pO.prototype.NG
        }),pO.prototype.get_m_chassisConnectionPointCS = pO.prototype.NC = function () {
            return qD(Ng(this.eB), lP)
        },pO.prototype.set_m_chassisConnectionPointCS = pO.prototype.EF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ug(e, t)
        },Object.defineProperty(pO.prototype, "m_chassisConnectionPointCS", {
            get: pO.prototype.NC,
            set: pO.prototype.EF
        }),pO.prototype.get_m_worldTransform = pO.prototype.CE = function () {
            return qD(zg(this.eB), wP)
        },pO.prototype.set_m_worldTransform = pO.prototype.uH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), qg(e, t)
        },Object.defineProperty(pO.prototype, "m_worldTransform", {
            get: pO.prototype.CE,
            set: pO.prototype.uH
        }),pO.prototype.get_m_wheelDirectionCS = pO.prototype.LB = function () {
            return qD(Kg(this.eB), lP)
        },pO.prototype.set_m_wheelDirectionCS = pO.prototype.VB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Qg(e, t)
        },Object.defineProperty(pO.prototype, "m_wheelDirectionCS", {
            get: pO.prototype.LB,
            set: pO.prototype.VB
        }),pO.prototype.get_m_wheelAxleCS = pO.prototype.KB = function () {
            return qD(Xg(this.eB), lP)
        },pO.prototype.set_m_wheelAxleCS = pO.prototype.UB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Zg(e, t)
        },Object.defineProperty(pO.prototype, "m_wheelAxleCS", {
            get: pO.prototype.KB,
            set: pO.prototype.UB
        }),pO.prototype.get_m_rotation = pO.prototype.$D = function () {
            return Yg(this.eB)
        },pO.prototype.set_m_rotation = pO.prototype.SG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Jg(e, t)
        },Object.defineProperty(pO.prototype, "m_rotation", {
            get: pO.prototype.$D,
            set: pO.prototype.SG
        }),pO.prototype.get_m_deltaRotation = pO.prototype.XC = function () {
            return $g(this.eB)
        },pO.prototype.set_m_deltaRotation = pO.prototype.OF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), tC(e, t)
        },Object.defineProperty(pO.prototype, "m_deltaRotation", {
            get: pO.prototype.XC,
            set: pO.prototype.OF
        }),pO.prototype.get_m_brake = pO.prototype.GC = function () {
            return eC(this.eB)
        },pO.prototype.set_m_brake = pO.prototype.xF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), nC(e, t)
        },Object.defineProperty(pO.prototype, "m_brake", {
            get: pO.prototype.GC,
            set: pO.prototype.xF
        }),pO.prototype.get_m_clippedInvContactDotSuspension = pO.prototype.OC = function () {
            return oC(this.eB)
        },pO.prototype.set_m_clippedInvContactDotSuspension = pO.prototype.FF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), _C(e, t)
        },Object.defineProperty(pO.prototype, "m_clippedInvContactDotSuspension", {
            get: pO.prototype.OC,
            set: pO.prototype.FF
        }),pO.prototype.get_m_suspensionRelativeVelocity = pO.prototype.kE = function () {
            return iC(this.eB)
        },pO.prototype.set_m_suspensionRelativeVelocity = pO.prototype.cH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), rC(e, t)
        },Object.defineProperty(pO.prototype, "m_suspensionRelativeVelocity", {
            get: pO.prototype.kE,
            set: pO.prototype.cH
        }),pO.prototype.get_m_skidInfo = pO.prototype.cE = function () {
            return pC(this.eB)
        },pO.prototype.set_m_skidInfo = pO.prototype.VG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), sC(e, t)
        },Object.defineProperty(pO.prototype, "m_skidInfo", {
            get: pO.prototype.cE,
            set: pO.prototype.VG
        }),pO.prototype.__destroy__ = function () {
            cC(this.eB)
        },sO.prototype = Object.create(WP.prototype),sO.prototype.constructor = sO,sO.prototype.fB = sO,sO.gB = {},n.btKinematicCharacterController = sO,sO.prototype.setUpAxis = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), uC(e, t)
        },sO.prototype.setWalkDirection = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), bC(e, t)
        },sO.prototype.setVelocityForTimeInterval = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), yC(n, t, e)
        },sO.prototype.warp = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), mC(e, t)
        },sO.prototype.preStep = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), dC(e, t)
        },sO.prototype.playerStep = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), fC(n, t, e)
        },sO.prototype.setFallSpeed = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), hC(e, t)
        },sO.prototype.setJumpSpeed = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), BC(e, t)
        },sO.prototype.setMaxJumpHeight = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), gC(e, t)
        },sO.prototype.canJump = function () {
            return !!CC(this.eB)
        },sO.prototype.jump = function () {
            SC(this.eB)
        },sO.prototype.setGravity = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), jC(e, t)
        },sO.prototype.getGravity = function () {
            return vC(this.eB)
        },sO.prototype.setMaxSlope = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), IC(e, t)
        },sO.prototype.getMaxSlope = function () {
            return RC(this.eB)
        },sO.prototype.getGhostObject = function () {
            return qD(DC(this.eB), aO)
        },sO.prototype.setUseGhostSweepTest = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), PC(e, t)
        },sO.prototype.onGround = function () {
            return !!TC(this.eB)
        },sO.prototype.setUpInterpolate = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), OC(e, t)
        },sO.prototype.updateAction = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), WC(n, t, e)
        },sO.prototype.__destroy__ = function () {
            AC(this.eB)
        },cO.prototype = Object.create(WP.prototype),cO.prototype.constructor = cO,cO.prototype.fB = cO,cO.gB = {},n.btRaycastVehicle = cO,cO.prototype.applyEngineForce = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), xC(n, t, e)
        },cO.prototype.setSteeringValue = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), kC(n, t, e)
        },cO.prototype.getWheelTransformWS = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(FC(e, t), wP)
        },cO.prototype.updateWheelTransform = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), LC(n, t, e)
        },cO.prototype.addWheel = function (t, e, n, o, _, i, r) {
            var p = this.eB;
            return t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), _ && "object" == typeof _ && (_ = _.eB), i && "object" == typeof i && (i = i.eB), r && "object" == typeof r && (r = r.eB), qD(GC(p, t, e, n, o, _, i, r), pO)
        },cO.prototype.getNumWheels = function () {
            return wC(this.eB)
        },cO.prototype.getRigidBody = function () {
            return qD(HC(this.eB), UT)
        },cO.prototype.getWheelInfo = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(VC(e, t), pO)
        },cO.prototype.setBrake = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), EC(n, t, e)
        },cO.prototype.setCoordinateSystem = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), NC(o, t, e, n)
        },cO.prototype.getCurrentSpeedKmHour = function () {
            return UC(this.eB)
        },cO.prototype.getChassisWorldTransform = function () {
            return qD(zC(this.eB), wP)
        },cO.prototype.rayCast = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qC(e, t)
        },cO.prototype.updateVehicle = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), KC(e, t)
        },cO.prototype.resetSuspension = function () {
            QC(this.eB)
        },cO.prototype.getSteeringValue = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), XC(e, t)
        },cO.prototype.updateWheelTransformsWS = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), void 0 === e ? ZC(n, t) : YC(n, t, e)
        },cO.prototype.setPitchControl = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), JC(e, t)
        },cO.prototype.updateSuspension = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), $C(e, t)
        },cO.prototype.updateFriction = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), tS(e, t)
        },cO.prototype.getRightAxis = function () {
            return eS(this.eB)
        },cO.prototype.getUpAxis = function () {
            return nS(this.eB)
        },cO.prototype.getForwardAxis = function () {
            return oS(this.eB)
        },cO.prototype.getForwardVector = function () {
            return qD(_S(this.eB), lP)
        },cO.prototype.getUserConstraintType = function () {
            return iS(this.eB)
        },cO.prototype.setUserConstraintType = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), rS(e, t)
        },cO.prototype.setUserConstraintId = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), pS(e, t)
        },cO.prototype.getUserConstraintId = function () {
            return sS(this.eB)
        },cO.prototype.updateAction = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), cS(n, t, e)
        },cO.prototype.__destroy__ = function () {
            aS(this.eB)
        },aO.prototype = Object.create(AP.prototype),aO.prototype.constructor = aO,aO.prototype.fB = aO,aO.gB = {},n.btPairCachingGhostObject = aO,aO.prototype.setAnisotropicFriction = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), uS(n, t, e)
        },aO.prototype.getCollisionShape = function () {
            return qD(bS(this.eB), oP)
        },aO.prototype.setContactProcessingThreshold = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), yS(e, t)
        },aO.prototype.setActivationState = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), mS(e, t)
        },aO.prototype.forceActivationState = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), dS(e, t)
        },aO.prototype.activate = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), void 0 === t ? fS(e) : hS(e, t)
        },aO.prototype.isActive = function () {
            return !!BS(this.eB)
        },aO.prototype.isKinematicObject = function () {
            return !!gS(this.eB)
        },aO.prototype.isStaticObject = function () {
            return !!CS(this.eB)
        },aO.prototype.isStaticOrKinematicObject = function () {
            return !!SS(this.eB)
        },aO.prototype.getRestitution = function () {
            return jS(this.eB)
        },aO.prototype.getFriction = function () {
            return vS(this.eB)
        },aO.prototype.getRollingFriction = function () {
            return IS(this.eB)
        },aO.prototype.setRestitution = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), RS(e, t)
        },aO.prototype.setFriction = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), DS(e, t)
        },aO.prototype.setRollingFriction = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), PS(e, t)
        },aO.prototype.getWorldTransform = function () {
            return qD(TS(this.eB), wP)
        },aO.prototype.getCollisionFlags = function () {
            return OS(this.eB)
        },aO.prototype.setCollisionFlags = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), WS(e, t)
        },aO.prototype.setWorldTransform = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), AS(e, t)
        },aO.prototype.setCollisionShape = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), MS(e, t)
        },aO.prototype.setCcdMotionThreshold = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), xS(e, t)
        },aO.prototype.setCcdSweptSphereRadius = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), kS(e, t)
        },aO.prototype.getUserIndex = function () {
            return FS(this.eB)
        },aO.prototype.setUserIndex = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), LS(e, t)
        },aO.prototype.getUserPointer = function () {
            return qD(GS(this.eB), xP)
        },aO.prototype.setUserPointer = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), wS(e, t)
        },aO.prototype.getBroadphaseHandle = function () {
            return qD(HS(this.eB), ET)
        },aO.prototype.getNumOverlappingObjects = function () {
            return VS(this.eB)
        },aO.prototype.getOverlappingObject = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(ES(e, t), iP)
        },aO.prototype.__destroy__ = function () {
            NS(this.eB)
        },lO.prototype = Object.create(UD.prototype),lO.prototype.constructor = lO,lO.prototype.fB = lO,lO.gB = {},n.btGhostPairCallback = lO,lO.prototype.__destroy__ = function () {
            zS(this.eB)
        },uO.prototype = Object.create(UD.prototype),uO.prototype.constructor = uO,uO.prototype.fB = uO,uO.gB = {},n.btSoftBodyWorldInfo = uO,uO.prototype.get_air_density = uO.prototype.YB = function () {
            return KS(this.eB)
        },uO.prototype.set_air_density = uO.prototype.PE = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), QS(e, t)
        },Object.defineProperty(uO.prototype, "air_density", {
            get: uO.prototype.YB,
            set: uO.prototype.PE
        }),uO.prototype.get_water_density = uO.prototype.ME = function () {
            return XS(this.eB)
        },uO.prototype.set_water_density = uO.prototype.EH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ZS(e, t)
        },Object.defineProperty(uO.prototype, "water_density", {
            get: uO.prototype.ME,
            set: uO.prototype.EH
        }),uO.prototype.get_water_offset = uO.prototype.OE = function () {
            return YS(this.eB)
        },uO.prototype.set_water_offset = uO.prototype.GH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), JS(e, t)
        },Object.defineProperty(uO.prototype, "water_offset", {
            get: uO.prototype.OE,
            set: uO.prototype.GH
        }),uO.prototype.get_m_maxDisplacement = uO.prototype.ID = function () {
            return $S(this.eB)
        },uO.prototype.set_m_maxDisplacement = uO.prototype.zG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), tj(e, t)
        },Object.defineProperty(uO.prototype, "m_maxDisplacement", {
            get: uO.prototype.ID,
            set: uO.prototype.zG
        }),uO.prototype.get_water_normal = uO.prototype.NE = function () {
            return qD(ej(this.eB), lP)
        },uO.prototype.set_water_normal = uO.prototype.FH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), nj(e, t)
        },Object.defineProperty(uO.prototype, "water_normal", {
            get: uO.prototype.NE,
            set: uO.prototype.FH
        }),uO.prototype.get_m_broadphase = uO.prototype.HC = function () {
            return qD(oj(this.eB), wT)
        },uO.prototype.set_m_broadphase = uO.prototype.yF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), _j(e, t)
        },Object.defineProperty(uO.prototype, "m_broadphase", {
            get: uO.prototype.HC,
            set: uO.prototype.yF
        }),uO.prototype.get_m_dispatcher = uO.prototype.ZC = function () {
            return qD(ij(this.eB), DP)
        },uO.prototype.set_m_dispatcher = uO.prototype.QF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), rj(e, t)
        },Object.defineProperty(uO.prototype, "m_dispatcher", {
            get: uO.prototype.ZC,
            set: uO.prototype.QF
        }),uO.prototype.get_m_gravity = uO.prototype.hD = function () {
            return qD(pj(this.eB), lP)
        },uO.prototype.set_m_gravity = uO.prototype.ZF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), sj(e, t)
        },Object.defineProperty(uO.prototype, "m_gravity", {
            get: uO.prototype.hD,
            set: uO.prototype.ZF
        }),uO.prototype.__destroy__ = function () {
            cj(this.eB)
        },bO.prototype = Object.create(UD.prototype),bO.prototype.constructor = bO,bO.prototype.fB = bO,bO.gB = {},n.Face = bO,bO.prototype.get_m_n = bO.prototype.HB = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(aj(e, t), mO)
        },bO.prototype.set_m_n = bO.prototype.RB = function (t, e) {
            var n = this.eB;
            JD(), t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), lj(n, t, e)
        },Object.defineProperty(bO.prototype, "m_n", {
            get: bO.prototype.HB,
            set: bO.prototype.RB
        }),bO.prototype.get_m_normal = bO.prototype.MD = function () {
            return qD(uj(this.eB), lP)
        },bO.prototype.set_m_normal = bO.prototype.DG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), bj(e, t)
        },Object.defineProperty(bO.prototype, "m_normal", {
            get: bO.prototype.MD,
            set: bO.prototype.DG
        }),bO.prototype.get_m_ra = bO.prototype.VD = function () {
            return yj(this.eB)
        },bO.prototype.set_m_ra = bO.prototype.MG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), mj(e, t)
        },Object.defineProperty(bO.prototype, "m_ra", {
            get: bO.prototype.VD,
            set: bO.prototype.MG
        }),bO.prototype.__destroy__ = function () {
            dj(this.eB)
        },yO.prototype = Object.create(UD.prototype),yO.prototype.constructor = yO,yO.prototype.fB = yO,yO.gB = {},n.tFaceArray = yO,yO.prototype.size = yO.prototype.size = function () {
            return fj(this.eB)
        },yO.prototype.at = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(hj(e, t), bO)
        },yO.prototype.__destroy__ = function () {
            Bj(this.eB)
        },mO.prototype = Object.create(UD.prototype),mO.prototype.constructor = mO,mO.prototype.fB = mO,mO.gB = {},n.Node = mO,mO.prototype.get_m_x = mO.prototype.DE = function () {
            return qD(gj(this.eB), lP)
        },mO.prototype.set_m_x = mO.prototype.vH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Cj(e, t)
        },Object.defineProperty(mO.prototype, "m_x", {
            get: mO.prototype.DE,
            set: mO.prototype.vH
        }),mO.prototype.get_m_q = mO.prototype.UD = function () {
            return qD(Sj(this.eB), lP)
        },mO.prototype.set_m_q = mO.prototype.LG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), jj(e, t)
        },Object.defineProperty(mO.prototype, "m_q", {
            get: mO.prototype.UD,
            set: mO.prototype.LG
        }),mO.prototype.get_m_v = mO.prototype.vE = function () {
            return qD(vj(this.eB), lP)
        },mO.prototype.set_m_v = mO.prototype.nH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ij(e, t)
        },Object.defineProperty(mO.prototype, "m_v", {
            get: mO.prototype.vE,
            set: mO.prototype.nH
        }),mO.prototype.get_m_f = mO.prototype.eD = function () {
            return qD(Rj(this.eB), lP)
        },mO.prototype.set_m_f = mO.prototype.WF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Dj(e, t)
        },Object.defineProperty(mO.prototype, "m_f", {
            get: mO.prototype.eD,
            set: mO.prototype.WF
        }),mO.prototype.get_m_n = mO.prototype.HB = function () {
            return qD(Pj(this.eB), lP)
        },mO.prototype.set_m_n = mO.prototype.RB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Tj(e, t)
        },Object.defineProperty(mO.prototype, "m_n", {
            get: mO.prototype.HB,
            set: mO.prototype.RB
        }),mO.prototype.get_m_im = mO.prototype.qD = function () {
            return Oj(this.eB)
        },mO.prototype.set_m_im = mO.prototype.hG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Wj(e, t)
        },Object.defineProperty(mO.prototype, "m_im", {
            get: mO.prototype.qD,
            set: mO.prototype.hG
        }),mO.prototype.get_m_area = mO.prototype.EC = function () {
            return Aj(this.eB)
        },mO.prototype.set_m_area = mO.prototype.vF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Mj(e, t)
        },Object.defineProperty(mO.prototype, "m_area", {
            get: mO.prototype.EC,
            set: mO.prototype.vF
        }),mO.prototype.__destroy__ = function () {
            xj(this.eB)
        },dO.prototype = Object.create(UD.prototype),dO.prototype.constructor = dO,dO.prototype.fB = dO,dO.gB = {},n.tNodeArray = dO,dO.prototype.size = dO.prototype.size = function () {
            return kj(this.eB)
        },dO.prototype.at = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(Fj(e, t), mO)
        },dO.prototype.__destroy__ = function () {
            Lj(this.eB)
        },fO.prototype = Object.create(UD.prototype),fO.prototype.constructor = fO,fO.prototype.fB = fO,fO.gB = {},n.Material = fO,fO.prototype.get_m_kLST = fO.prototype.wD = function () {
            return Gj(this.eB)
        },fO.prototype.set_m_kLST = fO.prototype.nG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), wj(e, t)
        },Object.defineProperty(fO.prototype, "m_kLST", {
            get: fO.prototype.wD,
            set: fO.prototype.nG
        }),fO.prototype.get_m_kAST = fO.prototype.vD = function () {
            return Hj(this.eB)
        },fO.prototype.set_m_kAST = fO.prototype.mG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Vj(e, t)
        },Object.defineProperty(fO.prototype, "m_kAST", {
            get: fO.prototype.vD,
            set: fO.prototype.mG
        }),fO.prototype.get_m_kVST = fO.prototype.xD = function () {
            return Ej(this.eB)
        },fO.prototype.set_m_kVST = fO.prototype.oG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Nj(e, t)
        },Object.defineProperty(fO.prototype, "m_kVST", {
            get: fO.prototype.xD,
            set: fO.prototype.oG
        }),fO.prototype.get_m_flags = fO.prototype.nB = function () {
            return Uj(this.eB)
        },fO.prototype.set_m_flags = fO.prototype.oB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), zj(e, t)
        },Object.defineProperty(fO.prototype, "m_flags", {
            get: fO.prototype.nB,
            set: fO.prototype.oB
        }),fO.prototype.__destroy__ = function () {
            qj(this.eB)
        },hO.prototype = Object.create(UD.prototype),hO.prototype.constructor = hO,hO.prototype.fB = hO,hO.gB = {},n.tMaterialArray = hO,hO.prototype.size = hO.prototype.size = function () {
            return Kj(this.eB)
        },hO.prototype.at = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(Qj(e, t), fO)
        },hO.prototype.__destroy__ = function () {
            Xj(this.eB)
        },BO.prototype = Object.create(UD.prototype),BO.prototype.constructor = BO,BO.prototype.fB = BO,BO.gB = {},n.Anchor = BO,BO.prototype.get_m_node = BO.prototype.KD = function () {
            return qD(Zj(this.eB), mO)
        },BO.prototype.set_m_node = BO.prototype.BG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Yj(e, t)
        },Object.defineProperty(BO.prototype, "m_node", {
            get: BO.prototype.KD,
            set: BO.prototype.BG
        }),BO.prototype.get_m_local = BO.prototype.AD = function () {
            return qD(Jj(this.eB), lP)
        },BO.prototype.set_m_local = BO.prototype.rG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), $j(e, t)
        },Object.defineProperty(BO.prototype, "m_local", {
            get: BO.prototype.AD,
            set: BO.prototype.rG
        }),BO.prototype.get_m_body = BO.prototype.FC = function () {
            return qD(tv(this.eB), UT)
        },BO.prototype.set_m_body = BO.prototype.wF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ev(e, t)
        },Object.defineProperty(BO.prototype, "m_body", {
            get: BO.prototype.FC,
            set: BO.prototype.wF
        }),BO.prototype.get_m_influence = BO.prototype.tD = function () {
            return nv(this.eB)
        },BO.prototype.set_m_influence = BO.prototype.kG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ov(e, t)
        },Object.defineProperty(BO.prototype, "m_influence", {
            get: BO.prototype.tD,
            set: BO.prototype.kG
        }),BO.prototype.get_m_c0 = BO.prototype.IC = function () {
            return qD(_v(this.eB), GP)
        },BO.prototype.set_m_c0 = BO.prototype.zF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), iv(e, t)
        },Object.defineProperty(BO.prototype, "m_c0", {
            get: BO.prototype.IC,
            set: BO.prototype.zF
        }),BO.prototype.get_m_c1 = BO.prototype.JC = function () {
            return qD(rv(this.eB), lP)
        },BO.prototype.set_m_c1 = BO.prototype.AF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), pv(e, t)
        },Object.defineProperty(BO.prototype, "m_c1", {
            get: BO.prototype.JC,
            set: BO.prototype.AF
        }),BO.prototype.get_m_c2 = BO.prototype.KC = function () {
            return sv(this.eB)
        },BO.prototype.set_m_c2 = BO.prototype.BF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), cv(e, t)
        },Object.defineProperty(BO.prototype, "m_c2", {
            get: BO.prototype.KC,
            set: BO.prototype.BF
        }),BO.prototype.__destroy__ = function () {
            av(this.eB)
        },gO.prototype = Object.create(UD.prototype),gO.prototype.constructor = gO,gO.prototype.fB = gO,gO.gB = {},n.tAnchorArray = gO,gO.prototype.size = gO.prototype.size = function () {
            return lv(this.eB)
        },gO.prototype.at = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(uv(e, t), BO)
        },gO.prototype.clear = gO.prototype.clear = function () {
            bv(this.eB)
        },gO.prototype.push_back = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), yv(e, t)
        },gO.prototype.pop_back = function () {
            mv(this.eB)
        },gO.prototype.__destroy__ = function () {
            dv(this.eB)
        },CO.prototype = Object.create(UD.prototype),CO.prototype.constructor = CO,CO.prototype.fB = CO,CO.gB = {},n.Config = CO,CO.prototype.get_kVCF = CO.prototype.uC = function () {
            return fv(this.eB)
        },CO.prototype.set_kVCF = CO.prototype.lF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), hv(e, t)
        },Object.defineProperty(CO.prototype, "kVCF", {
            get: CO.prototype.uC,
            set: CO.prototype.lF
        }),CO.prototype.get_kDP = CO.prototype.hC = function () {
            return Bv(this.eB)
        },CO.prototype.set_kDP = CO.prototype.ZE = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), gv(e, t)
        },Object.defineProperty(CO.prototype, "kDP", {
            get: CO.prototype.hC,
            set: CO.prototype.ZE
        }),CO.prototype.get_kDG = CO.prototype.gC = function () {
            return Cv(this.eB)
        },CO.prototype.set_kDG = CO.prototype.YE = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Sv(e, t)
        },Object.defineProperty(CO.prototype, "kDG", {
            get: CO.prototype.gC,
            set: CO.prototype.YE
        }),CO.prototype.get_kLF = CO.prototype.jC = function () {
            return jv(this.eB)
        },CO.prototype.set_kLF = CO.prototype.aF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), vv(e, t)
        },Object.defineProperty(CO.prototype, "kLF", {
            get: CO.prototype.jC,
            set: CO.prototype.aF
        }),CO.prototype.get_kPR = CO.prototype.lC = function () {
            return Iv(this.eB)
        },CO.prototype.set_kPR = CO.prototype.cF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Rv(e, t)
        },Object.defineProperty(CO.prototype, "kPR", {
            get: CO.prototype.lC,
            set: CO.prototype.cF
        }),CO.prototype.get_kVC = CO.prototype.tC = function () {
            return Dv(this.eB)
        },CO.prototype.set_kVC = CO.prototype.kF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Pv(e, t)
        },Object.defineProperty(CO.prototype, "kVC", {
            get: CO.prototype.tC,
            set: CO.prototype.kF
        }),CO.prototype.get_kDF = CO.prototype.fC = function () {
            return Tv(this.eB)
        },CO.prototype.set_kDF = CO.prototype.XE = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ov(e, t)
        },Object.defineProperty(CO.prototype, "kDF", {
            get: CO.prototype.fC,
            set: CO.prototype.XE
        }),CO.prototype.get_kMT = CO.prototype.kC = function () {
            return Wv(this.eB)
        },CO.prototype.set_kMT = CO.prototype.bF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Av(e, t)
        },Object.defineProperty(CO.prototype, "kMT", {
            get: CO.prototype.kC,
            set: CO.prototype.bF
        }),CO.prototype.get_kCHR = CO.prototype.eC = function () {
            return Mv(this.eB)
        },CO.prototype.set_kCHR = CO.prototype.WE = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), xv(e, t)
        },Object.defineProperty(CO.prototype, "kCHR", {
            get: CO.prototype.eC,
            set: CO.prototype.WE
        }),CO.prototype.get_kKHR = CO.prototype.iC = function () {
            return kv(this.eB)
        },CO.prototype.set_kKHR = CO.prototype.$E = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Fv(e, t)
        },Object.defineProperty(CO.prototype, "kKHR", {
            get: CO.prototype.iC,
            set: CO.prototype.$E
        }),CO.prototype.get_kSHR = CO.prototype.mC = function () {
            return Lv(this.eB)
        },CO.prototype.set_kSHR = CO.prototype.dF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Gv(e, t)
        },Object.defineProperty(CO.prototype, "kSHR", {
            get: CO.prototype.mC,
            set: CO.prototype.dF
        }),CO.prototype.get_kAHR = CO.prototype.dC = function () {
            return wv(this.eB)
        },CO.prototype.set_kAHR = CO.prototype.VE = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Hv(e, t)
        },Object.defineProperty(CO.prototype, "kAHR", {
            get: CO.prototype.dC,
            set: CO.prototype.VE
        }),CO.prototype.get_kSRHR_CL = CO.prototype.pC = function () {
            return Vv(this.eB)
        },CO.prototype.set_kSRHR_CL = CO.prototype.gF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Ev(e, t)
        },Object.defineProperty(CO.prototype, "kSRHR_CL", {
            get: CO.prototype.pC,
            set: CO.prototype.gF
        }),CO.prototype.get_kSKHR_CL = CO.prototype.nC = function () {
            return Nv(this.eB)
        },CO.prototype.set_kSKHR_CL = CO.prototype.eF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Uv(e, t)
        },Object.defineProperty(CO.prototype, "kSKHR_CL", {
            get: CO.prototype.nC,
            set: CO.prototype.eF
        }),CO.prototype.get_kSSHR_CL = CO.prototype.rC = function () {
            return zv(this.eB)
        },CO.prototype.set_kSSHR_CL = CO.prototype.iF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), qv(e, t)
        },Object.defineProperty(CO.prototype, "kSSHR_CL", {
            get: CO.prototype.rC,
            set: CO.prototype.iF
        }),CO.prototype.get_kSR_SPLT_CL = CO.prototype.qC = function () {
            return Kv(this.eB)
        },CO.prototype.set_kSR_SPLT_CL = CO.prototype.hF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Qv(e, t)
        },Object.defineProperty(CO.prototype, "kSR_SPLT_CL", {
            get: CO.prototype.qC,
            set: CO.prototype.hF
        }),CO.prototype.get_kSK_SPLT_CL = CO.prototype.oC = function () {
            return Xv(this.eB)
        },CO.prototype.set_kSK_SPLT_CL = CO.prototype.fF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Zv(e, t)
        },Object.defineProperty(CO.prototype, "kSK_SPLT_CL", {
            get: CO.prototype.oC,
            set: CO.prototype.fF
        }),CO.prototype.get_kSS_SPLT_CL = CO.prototype.sC = function () {
            return Yv(this.eB)
        },CO.prototype.set_kSS_SPLT_CL = CO.prototype.jF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), Jv(e, t)
        },Object.defineProperty(CO.prototype, "kSS_SPLT_CL", {
            get: CO.prototype.sC,
            set: CO.prototype.jF
        }),CO.prototype.get_maxvolume = CO.prototype.EE = function () {
            return $v(this.eB)
        },CO.prototype.set_maxvolume = CO.prototype.wH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), tI(e, t)
        },Object.defineProperty(CO.prototype, "maxvolume", {
            get: CO.prototype.EE,
            set: CO.prototype.wH
        }),CO.prototype.get_timescale = CO.prototype.JE = function () {
            return eI(this.eB)
        },CO.prototype.set_timescale = CO.prototype.BH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), nI(e, t)
        },Object.defineProperty(CO.prototype, "timescale", {
            get: CO.prototype.JE,
            set: CO.prototype.BH
        }),CO.prototype.get_viterations = CO.prototype.LE = function () {
            return oI(this.eB)
        },CO.prototype.set_viterations = CO.prototype.DH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), _I(e, t)
        },Object.defineProperty(CO.prototype, "viterations", {
            get: CO.prototype.LE,
            set: CO.prototype.DH
        }),CO.prototype.get_piterations = CO.prototype.HE = function () {
            return iI(this.eB)
        },CO.prototype.set_piterations = CO.prototype.zH = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), rI(e, t)
        },Object.defineProperty(CO.prototype, "piterations", {
            get: CO.prototype.HE,
            set: CO.prototype.zH
        }),CO.prototype.get_diterations = CO.prototype.aC = function () {
            return pI(this.eB)
        },CO.prototype.set_diterations = CO.prototype.SE = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), sI(e, t)
        },Object.defineProperty(CO.prototype, "diterations", {
            get: CO.prototype.aC,
            set: CO.prototype.SE
        }),CO.prototype.get_citerations = CO.prototype.ZB = function () {
            return cI(this.eB)
        },CO.prototype.set_citerations = CO.prototype.QE = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), aI(e, t)
        },Object.defineProperty(CO.prototype, "citerations", {
            get: CO.prototype.ZB,
            set: CO.prototype.QE
        }),CO.prototype.get_collisions = CO.prototype.$B = function () {
            return lI(this.eB)
        },CO.prototype.set_collisions = CO.prototype.RE = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), uI(e, t)
        },Object.defineProperty(CO.prototype, "collisions", {
            get: CO.prototype.$B,
            set: CO.prototype.RE
        }),CO.prototype.__destroy__ = function () {
            bI(this.eB)
        },SO.prototype = Object.create(iP.prototype),SO.prototype.constructor = SO,SO.prototype.fB = SO,SO.gB = {},n.btSoftBody = SO,SO.prototype.checkLink = function (t, e) {
            var n = this.eB;
            return t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), !!mI(n, t, e)
        },SO.prototype.checkFace = function (t, e, n) {
            var o = this.eB;
            return t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), !!dI(o, t, e, n)
        },SO.prototype.appendMaterial = function () {
            return qD(fI(this.eB), fO)
        },SO.prototype.appendNode = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), hI(n, t, e)
        },SO.prototype.appendLink = function (t, e, n, o) {
            var _ = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), BI(_, t, e, n, o)
        },SO.prototype.appendFace = function (t, e, n, o) {
            var _ = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), gI(_, t, e, n, o)
        },SO.prototype.appendTetra = function (t, e, n, o, _) {
            var i = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), _ && "object" == typeof _ && (_ = _.eB), CI(i, t, e, n, o, _)
        },SO.prototype.appendAnchor = function (t, e, n, o) {
            var _ = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), SI(_, t, e, n, o)
        },SO.prototype.addForce = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), void 0 === e ? jI(n, t) : vI(n, t, e)
        },SO.prototype.addAeroForceToNode = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), II(n, t, e)
        },SO.prototype.getTotalMass = function () {
            return RI(this.eB)
        },SO.prototype.setTotalMass = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), DI(n, t, e)
        },SO.prototype.setMass = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), PI(n, t, e)
        },SO.prototype.transform = SO.prototype.transform = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), TI(e, t)
        },SO.prototype.translate = SO.prototype.translate = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), OI(e, t)
        },SO.prototype.rotate = SO.prototype.rotate = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), WI(e, t)
        },SO.prototype.scale = SO.prototype.scale = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), AI(e, t)
        },SO.prototype.generateClusters = function (t, e) {
            var n = this.eB;
            return t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), void 0 === e ? MI(n, t) : xI(n, t, e)
        },SO.prototype.generateBendingConstraints = function (t, e) {
            var n = this.eB;
            return t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), kI(n, t, e)
        },SO.prototype.upcast = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(FI(e, t), SO)
        },SO.prototype.getRestLengthScale = function () {
            return LI(this.eB)
        },SO.prototype.setRestLengthScale = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), GI(e, t)
        },SO.prototype.setAnisotropicFriction = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), wI(n, t, e)
        },SO.prototype.getCollisionShape = function () {
            return qD(HI(this.eB), oP)
        },SO.prototype.setContactProcessingThreshold = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), VI(e, t)
        },SO.prototype.setActivationState = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), EI(e, t)
        },SO.prototype.forceActivationState = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), NI(e, t)
        },SO.prototype.activate = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), void 0 === t ? UI(e) : zI(e, t)
        },SO.prototype.isActive = function () {
            return !!qI(this.eB)
        },SO.prototype.isKinematicObject = function () {
            return !!KI(this.eB)
        },SO.prototype.isStaticObject = function () {
            return !!QI(this.eB)
        },SO.prototype.isStaticOrKinematicObject = function () {
            return !!XI(this.eB)
        },SO.prototype.getRestitution = function () {
            return ZI(this.eB)
        },SO.prototype.getFriction = function () {
            return YI(this.eB)
        },SO.prototype.getRollingFriction = function () {
            return JI(this.eB)
        },SO.prototype.setRestitution = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), $I(e, t)
        },SO.prototype.setFriction = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), tR(e, t)
        },SO.prototype.setRollingFriction = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), eR(e, t)
        },SO.prototype.getWorldTransform = function () {
            return qD(nR(this.eB), wP)
        },SO.prototype.getCollisionFlags = function () {
            return oR(this.eB)
        },SO.prototype.setCollisionFlags = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), _R(e, t)
        },SO.prototype.setWorldTransform = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), iR(e, t)
        },SO.prototype.setCollisionShape = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), rR(e, t)
        },SO.prototype.setCcdMotionThreshold = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), pR(e, t)
        },SO.prototype.setCcdSweptSphereRadius = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), sR(e, t)
        },SO.prototype.getUserIndex = function () {
            return cR(this.eB)
        },SO.prototype.setUserIndex = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), aR(e, t)
        },SO.prototype.getUserPointer = function () {
            return qD(lR(this.eB), xP)
        },SO.prototype.setUserPointer = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), uR(e, t)
        },SO.prototype.getBroadphaseHandle = function () {
            return qD(bR(this.eB), ET)
        },SO.prototype.get_m_cfg = SO.prototype.LC = function () {
            return qD(yR(this.eB), CO)
        },SO.prototype.set_m_cfg = SO.prototype.CF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), mR(e, t)
        },Object.defineProperty(SO.prototype, "m_cfg", {
            get: SO.prototype.LC,
            set: SO.prototype.CF
        }),SO.prototype.get_m_nodes = SO.prototype.LD = function () {
            return qD(dR(this.eB), dO)
        },SO.prototype.set_m_nodes = SO.prototype.CG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), fR(e, t)
        },Object.defineProperty(SO.prototype, "m_nodes", {
            get: SO.prototype.LD,
            set: SO.prototype.CG
        }),SO.prototype.get_m_faces = SO.prototype.FB = function () {
            return qD(hR(this.eB), yO)
        },SO.prototype.set_m_faces = SO.prototype.PB = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), BR(e, t)
        },Object.defineProperty(SO.prototype, "m_faces", {
            get: SO.prototype.FB,
            set: SO.prototype.PB
        }),SO.prototype.get_m_materials = SO.prototype.HD = function () {
            return qD(gR(this.eB), hO)
        },SO.prototype.set_m_materials = SO.prototype.yG = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), CR(e, t)
        },Object.defineProperty(SO.prototype, "m_materials", {
            get: SO.prototype.HD,
            set: SO.prototype.yG
        }),SO.prototype.get_m_anchors = SO.prototype.BC = function () {
            return qD(SR(this.eB), gO)
        },SO.prototype.set_m_anchors = SO.prototype.sF = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), jR(e, t)
        },Object.defineProperty(SO.prototype, "m_anchors", {
            get: SO.prototype.BC,
            set: SO.prototype.sF
        }),SO.prototype.__destroy__ = function () {
            vR(this.eB)
        },jO.prototype = Object.create(RP.prototype),jO.prototype.constructor = jO,jO.prototype.fB = jO,jO.gB = {},n.btSoftBodyRigidBodyCollisionConfiguration = jO,jO.prototype.__destroy__ = function () {
            DR(this.eB)
        },vO.prototype = Object.create(MP.prototype),vO.prototype.constructor = vO,vO.prototype.fB = vO,vO.gB = {},n.btDefaultSoftBodySolver = vO,vO.prototype.__destroy__ = function () {
            TR(this.eB)
        },IO.prototype = Object.create(UD.prototype),IO.prototype.constructor = IO,IO.prototype.fB = IO,IO.gB = {},n.btSoftBodyArray = IO,IO.prototype.size = IO.prototype.size = function () {
            return OR(this.eB)
        },IO.prototype.at = function (t) {
            var e = this.eB;
            return t && "object" == typeof t && (t = t.eB), qD(WR(e, t), SO)
        },IO.prototype.__destroy__ = function () {
            AR(this.eB)
        },RO.prototype = Object.create(TP.prototype),RO.prototype.constructor = RO,RO.prototype.fB = RO,RO.gB = {},n.btSoftRigidDynamicsWorld = RO,RO.prototype.addSoftBody = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), xR(o, t, e, n)
        },RO.prototype.removeSoftBody = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), kR(e, t)
        },RO.prototype.removeCollisionObject = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), FR(e, t)
        },RO.prototype.getWorldInfo = function () {
            return qD(LR(this.eB), uO)
        },RO.prototype.getSoftBodyArray = function () {
            return qD(GR(this.eB), IO)
        },RO.prototype.getDispatcher = function () {
            return qD(wR(this.eB), DP)
        },RO.prototype.rayTest = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), HR(o, t, e, n)
        },RO.prototype.getPairCache = function () {
            return qD(VR(this.eB), LT)
        },RO.prototype.getDispatchInfo = function () {
            return qD(ER(this.eB), tO)
        },RO.prototype.addCollisionObject = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), void 0 === e ? NR(o, t) : void 0 === n ? UR(o, t, e) : zR(o, t, e, n)
        },RO.prototype.getBroadphase = function () {
            return qD(qR(this.eB), wT)
        },RO.prototype.convexSweepTest = function (t, e, n, o, _) {
            var i = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), _ && "object" == typeof _ && (_ = _.eB), KR(i, t, e, n, o, _)
        },RO.prototype.contactPairTest = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), QR(o, t, e, n)
        },RO.prototype.contactTest = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), XR(n, t, e)
        },RO.prototype.updateSingleAabb = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), ZR(e, t)
        },RO.prototype.setDebugDrawer = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), YR(e, t)
        },RO.prototype.getDebugDrawer = function () {
            return qD(JR(this.eB), aP)
        },RO.prototype.debugDrawWorld = function () {
            $R(this.eB)
        },RO.prototype.debugDrawObject = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), tD(o, t, e, n)
        },RO.prototype.setGravity = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), eD(e, t)
        },RO.prototype.getGravity = function () {
            return qD(nD(this.eB), lP)
        },RO.prototype.addRigidBody = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), void 0 === e ? oD(o, t) : void 0 === n ? _emscripten_bind_btSoftRigidDynamicsWorld_addRigidBody_2(o, t, e) : _D(o, t, e, n)
        },RO.prototype.removeRigidBody = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), iD(e, t)
        },RO.prototype.addConstraint = function (t, e) {
            var n = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), void 0 === e ? rD(n, t) : pD(n, t, e)
        },RO.prototype.removeConstraint = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), sD(e, t)
        },RO.prototype.stepSimulation = function (t, e, n) {
            var o = this.eB;
            return t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), void 0 === e ? cD(o, t) : void 0 === n ? aD(o, t, e) : lD(o, t, e, n)
        },RO.prototype.setContactAddedCallback = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), uD(e, t)
        },RO.prototype.setContactProcessedCallback = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), bD(e, t)
        },RO.prototype.setContactDestroyedCallback = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), yD(e, t)
        },RO.prototype.addAction = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), mD(e, t)
        },RO.prototype.removeAction = function (t) {
            var e = this.eB;
            t && "object" == typeof t && (t = t.eB), dD(e, t)
        },RO.prototype.getSolverInfo = function () {
            return qD(fD(this.eB), eO)
        },RO.prototype.setInternalTickCallback = function (t, e, n) {
            var o = this.eB;
            t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), void 0 === e ? hD(o, t) : void 0 === n ? BD(o, t, e) : gD(o, t, e, n)
        },RO.prototype.__destroy__ = function () {
            CD(this.eB)
        },DO.prototype = Object.create(UD.prototype),DO.prototype.constructor = DO,DO.prototype.fB = DO,DO.gB = {},n.btSoftBodyHelpers = DO,DO.prototype.CreateRope = function (t, e, n, o, _) {
            var i = this.eB;
            return t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), _ && "object" == typeof _ && (_ = _.eB), qD(jD(i, t, e, n, o, _), SO)
        },DO.prototype.CreatePatch = function (t, e, n, o, _, i, r, p, s) {
            var c = this.eB;
            return t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), _ && "object" == typeof _ && (_ = _.eB), i && "object" == typeof i && (i = i.eB), r && "object" == typeof r && (r = r.eB), p && "object" == typeof p && (p = p.eB), s && "object" == typeof s && (s = s.eB), qD(vD(c, t, e, n, o, _, i, r, p, s), SO)
        },DO.prototype.CreatePatchUV = function (t, e, n, o, _, i, r, p, s, c) {
            var a = this.eB;
            return JD(), t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), _ && "object" == typeof _ && (_ = _.eB), i && "object" == typeof i && (i = i.eB), r && "object" == typeof r && (r = r.eB), p && "object" == typeof p && (p = p.eB), s && "object" == typeof s && (s = s.eB), "object" == typeof c && (c = nP(c)), qD(ID(a, t, e, n, o, _, i, r, p, s, c), SO)
        },DO.prototype.CreateEllipsoid = function (t, e, n, o) {
            var _ = this.eB;
            return t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), qD(RD(_, t, e, n, o), SO)
        },DO.prototype.CreateFromTriMesh = function (t, e, n, o, _) {
            var i = this.eB;
            if (JD(), t && "object" == typeof t && (t = t.eB), "object" == typeof e && (e = nP(e)), "object" == typeof n && "object" == typeof n) {
                var r = $D(n, v);
                tP(n, v, r), n = r
            }
            return o && "object" == typeof o && (o = o.eB), _ && "object" == typeof _ && (_ = _.eB), qD(DD(i, t, e, n, o, _), SO)
        },DO.prototype.CreateFromConvexHull = function (t, e, n, o) {
            var _ = this.eB;
            return t && "object" == typeof t && (t = t.eB), e && "object" == typeof e && (e = e.eB), n && "object" == typeof n && (n = n.eB), o && "object" == typeof o && (o = o.eB), qD(PD(_, t, e, n, o), SO)
        },DO.prototype.__destroy__ = function () {
            TD(this.eB)
        },function () {
            function t() {
                n.PHY_FLOAT = OD(), n.PHY_DOUBLE = WD(), n.PHY_INTEGER = AD(), n.PHY_SHORT = MD(), n.PHY_FIXEDPOINT88 = xD(), n.PHY_UCHAR = kD(), n.CONST_GIMPACT_COMPOUND_SHAPE = FD(), n.CONST_GIMPACT_TRIMESH_SHAPE_PART = LD(), n.CONST_GIMPACT_TRIMESH_SHAPE = GD(), n.BT_CONSTRAINT_ERP = wD(), n.BT_CONSTRAINT_STOP_ERP = HD(), n.BT_CONSTRAINT_CFM = VD(), n.BT_CONSTRAINT_STOP_CFM = ED()
            }

            W ? t() : T.unshift(t)
        }(),n.CONTACT_ADDED_CALLBACK_SIGNATURE = "iiiiiiii",n.CONTACT_DESTROYED_CALLBACK_SIGNATURE = "ii",n.CONTACT_PROCESSED_CALLBACK_SIGNATURE = "iiii",n.INTERNAL_TICK_CALLBACK_SIGNATURE = "vif",this.Ammo = n,e.ready
    }
}

export default async function () {
    return Ammo()()
}