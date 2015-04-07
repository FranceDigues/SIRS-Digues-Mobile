// OpenLayers 3. See http://openlayers.org/
// License: https://raw.githubusercontent.com/openlayers/ol3/master/LICENSE.md
// Version: v3.3.0-50-g8061b69

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root.ol = factory();
    }
}(this, function () {
    var OPENLAYERS = {};
    var l, aa = aa || {}, ba = this;

    function m(b) {
        return void 0 !== b
    }

    function t(b, c, d) {
        b = b.split(".");
        d = d || ba;
        b[0]in d || !d.execScript || d.execScript("var " + b[0]);
        for (var e; b.length && (e = b.shift());)!b.length && m(c) ? d[e] = c : d[e] ? d = d[e] : d = d[e] = {}
    }

    function ca() {
    }

    function da(b) {
        b.Pa = function () {
            return b.yf ? b.yf : b.yf = new b
        }
    }

    function ea(b) {
        var c = typeof b;
        if ("object" == c)if (b) {
            if (b instanceof Array)return "array";
            if (b instanceof Object)return c;
            var d = Object.prototype.toString.call(b);
            if ("[object Window]" == d)return "object";
            if ("[object Array]" == d || "number" == typeof b.length && "undefined" != typeof b.splice && "undefined" != typeof b.propertyIsEnumerable && !b.propertyIsEnumerable("splice"))return "array";
            if ("[object Function]" == d || "undefined" != typeof b.call && "undefined" != typeof b.propertyIsEnumerable && !b.propertyIsEnumerable("call"))return "function"
        } else return "null";
        else if ("function" == c && "undefined" == typeof b.call)return "object";
        return c
    }

    function fa(b) {
        return null === b
    }

    function ga(b) {
        return "array" == ea(b)
    }

    function ha(b) {
        var c = ea(b);
        return "array" == c || "object" == c && "number" == typeof b.length
    }

    function ia(b) {
        return "string" == typeof b
    }

    function ja(b) {
        return "number" == typeof b
    }

    function ka(b) {
        return "function" == ea(b)
    }

    function la(b) {
        var c = typeof b;
        return "object" == c && null != b || "function" == c
    }

    function ma(b) {
        return b[na] || (b[na] = ++oa)
    }

    var na = "closure_uid_" + (1E9 * Math.random() >>> 0), oa = 0;

    function pa(b, c, d) {
        return b.call.apply(b.bind, arguments)
    }

    function qa(b, c, d) {
        if (!b)throw Error();
        if (2 < arguments.length) {
            var e = Array.prototype.slice.call(arguments, 2);
            return function () {
                var d = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(d, e);
                return b.apply(c, d)
            }
        }
        return function () {
            return b.apply(c, arguments)
        }
    }

    function ra(b, c, d) {
        ra = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? pa : qa;
        return ra.apply(null, arguments)
    }

    function sa(b, c) {
        var d = Array.prototype.slice.call(arguments, 1);
        return function () {
            var c = d.slice();
            c.push.apply(c, arguments);
            return b.apply(this, c)
        }
    }

    var ta = Date.now || function () {
            return +new Date
        };

    function v(b, c) {
        function d() {
        }

        d.prototype = c.prototype;
        b.T = c.prototype;
        b.prototype = new d;
        b.prototype.constructor = b;
        b.Om = function (b, d, g) {
            for (var h = Array(arguments.length - 2), k = 2; k < arguments.length; k++)h[k - 2] = arguments[k];
            return c.prototype[d].apply(b, h)
        }
    };
    var ua, va;

    function wa(b) {
        if (Error.captureStackTrace)Error.captureStackTrace(this, wa); else {
            var c = Error().stack;
            c && (this.stack = c)
        }
        b && (this.message = String(b))
    }

    v(wa, Error);
    wa.prototype.name = "CustomError";
    var xa;

    function ya(b, c) {
        var d = b.length - c.length;
        return 0 <= d && b.indexOf(c, d) == d
    }

    function za(b, c) {
        for (var d = b.split("%s"), e = "", f = Array.prototype.slice.call(arguments, 1); f.length && 1 < d.length;)e += d.shift() + f.shift();
        return e + d.join("%s")
    }

    var Aa = String.prototype.trim ? function (b) {
        return b.trim()
    } : function (b) {
        return b.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
    };

    function Ba(b) {
        if (!Ca.test(b))return b;
        -1 != b.indexOf("&") && (b = b.replace(Da, "&amp;"));
        -1 != b.indexOf("<") && (b = b.replace(Ea, "&lt;"));
        -1 != b.indexOf(">") && (b = b.replace(Fa, "&gt;"));
        -1 != b.indexOf('"') && (b = b.replace(Ga, "&quot;"));
        -1 != b.indexOf("'") && (b = b.replace(Ha, "&#39;"));
        -1 != b.indexOf("\x00") && (b = b.replace(Ia, "&#0;"));
        return b
    }

    var Da = /&/g, Ea = /</g, Fa = />/g, Ga = /"/g, Ha = /'/g, Ia = /\x00/g, Ca = /[\x00&<>"']/;

    function La(b) {
        b = m(void 0) ? b.toFixed(void 0) : String(b);
        var c = b.indexOf(".");
        -1 == c && (c = b.length);
        c = Math.max(0, 2 - c);
        return Array(c + 1).join("0") + b
    }

    function Ma(b, c) {
        for (var d = 0, e = Aa(String(b)).split("."), f = Aa(String(c)).split("."), g = Math.max(e.length, f.length), h = 0; 0 == d && h < g; h++) {
            var k = e[h] || "", n = f[h] || "", p = RegExp("(\\d*)(\\D*)", "g"), q = RegExp("(\\d*)(\\D*)", "g");
            do {
                var r = p.exec(k) || ["", "", ""], s = q.exec(n) || ["", "", ""];
                if (0 == r[0].length && 0 == s[0].length)break;
                d = Na(0 == r[1].length ? 0 : parseInt(r[1], 10), 0 == s[1].length ? 0 : parseInt(s[1], 10)) || Na(0 == r[2].length, 0 == s[2].length) || Na(r[2], s[2])
            } while (0 == d)
        }
        return d
    }

    function Na(b, c) {
        return b < c ? -1 : b > c ? 1 : 0
    };
    var Oa = Array.prototype;

    function Pa(b, c) {
        return Oa.indexOf.call(b, c, void 0)
    }

    function Qa(b, c, d) {
        Oa.forEach.call(b, c, d)
    }

    function Ra(b, c) {
        return Oa.filter.call(b, c, void 0)
    }

    function Sa(b, c, d) {
        return Oa.map.call(b, c, d)
    }

    function Ta(b, c) {
        return Oa.some.call(b, c, void 0)
    }

    function Ua(b, c) {
        var d = Va(b, c, void 0);
        return 0 > d ? null : ia(b) ? b.charAt(d) : b[d]
    }

    function Va(b, c, d) {
        for (var e = b.length, f = ia(b) ? b.split("") : b, g = 0; g < e; g++)if (g in f && c.call(d, f[g], g, b))return g;
        return -1
    }

    function Wa(b, c) {
        return 0 <= Pa(b, c)
    }

    function Xa(b, c) {
        var d = Pa(b, c), e;
        (e = 0 <= d) && Oa.splice.call(b, d, 1);
        return e
    }

    function Ya(b) {
        return Oa.concat.apply(Oa, arguments)
    }

    function $a(b) {
        var c = b.length;
        if (0 < c) {
            for (var d = Array(c), e = 0; e < c; e++)d[e] = b[e];
            return d
        }
        return []
    }

    function ab(b, c) {
        for (var d = 1; d < arguments.length; d++) {
            var e = arguments[d];
            if (ha(e)) {
                var f = b.length || 0, g = e.length || 0;
                b.length = f + g;
                for (var h = 0; h < g; h++)b[f + h] = e[h]
            } else b.push(e)
        }
    }

    function bb(b, c, d, e) {
        Oa.splice.apply(b, cb(arguments, 1))
    }

    function cb(b, c, d) {
        return 2 >= arguments.length ? Oa.slice.call(b, c) : Oa.slice.call(b, c, d)
    }

    function db(b, c) {
        b.sort(c || eb)
    }

    function fb(b, c) {
        if (!ha(b) || !ha(c) || b.length != c.length)return !1;
        for (var d = b.length, e = gb, f = 0; f < d; f++)if (!e(b[f], c[f]))return !1;
        return !0
    }

    function eb(b, c) {
        return b > c ? 1 : b < c ? -1 : 0
    }

    function gb(b, c) {
        return b === c
    };
    var hb;
    a:{
        var ib = ba.navigator;
        if (ib) {
            var jb = ib.userAgent;
            if (jb) {
                hb = jb;
                break a
            }
        }
        hb = ""
    }
    function kb(b) {
        return -1 != hb.indexOf(b)
    };
    function ob(b, c, d) {
        for (var e in b)c.call(d, b[e], e, b)
    }

    function pb(b, c) {
        for (var d in b)if (c.call(void 0, b[d], d, b))return !0;
        return !1
    }

    function qb(b) {
        var c = 0, d;
        for (d in b)c++;
        return c
    }

    function rb(b) {
        var c = [], d = 0, e;
        for (e in b)c[d++] = b[e];
        return c
    }

    function sb(b) {
        var c = [], d = 0, e;
        for (e in b)c[d++] = e;
        return c
    }

    function tb(b, c) {
        return c in b
    }

    function ub(b, c) {
        for (var d in b)if (b[d] == c)return !0;
        return !1
    }

    function vb(b, c) {
        for (var d in b)if (c.call(void 0, b[d], d, b))return d
    }

    function wb(b) {
        for (var c in b)return !1;
        return !0
    }

    function xb(b) {
        for (var c in b)delete b[c]
    }

    function yb(b, c) {
        c in b && delete b[c]
    }

    function zb(b, c, d) {
        return c in b ? b[c] : d
    }

    function Ab(b, c) {
        var d = [];
        return c in b ? b[c] : b[c] = d
    }

    function Bb(b) {
        var c = {}, d;
        for (d in b)c[d] = b[d];
        return c
    }

    var Cb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

    function Db(b, c) {
        for (var d, e, f = 1; f < arguments.length; f++) {
            e = arguments[f];
            for (d in e)b[d] = e[d];
            for (var g = 0; g < Cb.length; g++)d = Cb[g], Object.prototype.hasOwnProperty.call(e, d) && (b[d] = e[d])
        }
    }

    function Eb(b) {
        var c = arguments.length;
        if (1 == c && ga(arguments[0]))return Eb.apply(null, arguments[0]);
        for (var d = {}, e = 0; e < c; e++)d[arguments[e]] = !0;
        return d
    };
    var Fb = kb("Opera") || kb("OPR"), Gb = kb("Trident") || kb("MSIE"), Hb = kb("Gecko") && -1 == hb.toLowerCase().indexOf("webkit") && !(kb("Trident") || kb("MSIE")), Ib = -1 != hb.toLowerCase().indexOf("webkit"), Jb = kb("Macintosh"), Kb = kb("Windows"), Lb = kb("Linux") || kb("CrOS");

    function Mb() {
        var b = ba.document;
        return b ? b.documentMode : void 0
    }

    var Nb = function () {
        var b = "", c;
        if (Fb && ba.opera)return b = ba.opera.version, ka(b) ? b() : b;
        Hb ? c = /rv\:([^\);]+)(\)|;)/ : Gb ? c = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : Ib && (c = /WebKit\/(\S+)/);
        c && (b = (b = c.exec(hb)) ? b[1] : "");
        return Gb && (c = Mb(), c > parseFloat(b)) ? String(c) : b
    }(), Ob = {};

    function Pb(b) {
        return Ob[b] || (Ob[b] = 0 <= Ma(Nb, b))
    }

    var Rb = ba.document, Sb = Rb && Gb ? Mb() || ("CSS1Compat" == Rb.compatMode ? parseInt(Nb, 10) : 5) : void 0;
    var Tb = "https:" === ba.location.protocol, Vb = Gb && !Pb("9.0") && "" !== Nb;

    function Wb(b, c, d) {
        return Math.min(Math.max(b, c), d)
    }

    function Xb(b, c) {
        var d = b % c;
        return 0 > d * c ? d + c : d
    }

    function Yb(b, c, d) {
        return b + d * (c - b)
    }

    function Zb(b) {
        return b * Math.PI / 180
    };
    function $b(b) {
        return function (c) {
            if (m(c))return [Wb(c[0], b[0], b[2]), Wb(c[1], b[1], b[3])]
        }
    }

    function ac(b) {
        return b
    };
    function bc(b, c, d) {
        var e = b.length;
        if (b[0] <= c)return 0;
        if (!(c <= b[e - 1]))if (0 < d)for (d = 1; d < e; ++d) {
            if (b[d] < c)return d - 1
        } else if (0 > d)for (d = 1; d < e; ++d) {
            if (b[d] <= c)return d
        } else for (d = 1; d < e; ++d) {
            if (b[d] == c)return d;
            if (b[d] < c)return b[d - 1] - c < c - b[d] ? d - 1 : d
        }
        return e - 1
    };
    function cc(b) {
        return function (c, d, e) {
            if (m(c))return c = bc(b, c, e), c = Wb(c + d, 0, b.length - 1), b[c]
        }
    }

    function dc(b, c, d) {
        return function (e, f, g) {
            if (m(e))return g = 0 < g ? 0 : 0 > g ? 1 : .5, e = Math.floor(Math.log(c / e) / Math.log(b) + g), f = Math.max(e + f, 0), m(d) && (f = Math.min(f, d)), c / Math.pow(b, f)
        }
    };
    function ec(b) {
        if (m(b))return 0
    }

    function fc(b, c) {
        if (m(b))return b + c
    }

    function gc(b) {
        var c = 2 * Math.PI / b;
        return function (b, e) {
            if (m(b))return b = Math.floor((b + e) / c + .5) * c
        }
    }

    function hc() {
        var b = Zb(5);
        return function (c, d) {
            if (m(c))return Math.abs(c + d) <= b ? 0 : c + d
        }
    };
    function ic(b, c, d) {
        this.center = b;
        this.resolution = c;
        this.rotation = d
    };
    var jc = !Gb || Gb && 9 <= Sb, kc = !Gb || Gb && 9 <= Sb, lc = Gb && !Pb("9");
    !Ib || Pb("528");
    Hb && Pb("1.9b") || Gb && Pb("8") || Fb && Pb("9.5") || Ib && Pb("528");
    Hb && !Pb("8") || Gb && Pb("9");
    function mc() {
        0 != nc && (oc[ma(this)] = this);
        this.oa = this.oa;
        this.pa = this.pa
    }

    var nc = 0, oc = {};
    mc.prototype.oa = !1;
    mc.prototype.Jc = function () {
        if (!this.oa && (this.oa = !0, this.P(), 0 != nc)) {
            var b = ma(this);
            delete oc[b]
        }
    };
    function pc(b, c) {
        var d = sa(qc, c);
        b.oa ? d.call(void 0) : (b.pa || (b.pa = []), b.pa.push(m(void 0) ? ra(d, void 0) : d))
    }

    mc.prototype.P = function () {
        if (this.pa)for (; this.pa.length;)this.pa.shift()()
    };
    function qc(b) {
        b && "function" == typeof b.Jc && b.Jc()
    };
    function rc(b, c) {
        this.type = b;
        this.b = this.target = c;
        this.e = !1;
        this.pg = !0
    }

    rc.prototype.pb = function () {
        this.e = !0
    };
    rc.prototype.preventDefault = function () {
        this.pg = !1
    };
    function tc(b) {
        b.pb()
    }

    function uc(b) {
        b.preventDefault()
    };
    var vc = Gb ? "focusout" : "DOMFocusOut";

    function wc(b) {
        wc[" "](b);
        return b
    }

    wc[" "] = ca;
    function xc(b, c) {
        rc.call(this, b ? b.type : "");
        this.relatedTarget = this.b = this.target = null;
        this.i = this.f = this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
        this.k = this.c = this.d = this.n = !1;
        this.state = null;
        this.g = !1;
        this.a = null;
        b && yc(this, b, c)
    }

    v(xc, rc);
    var zc = [1, 4, 2];

    function yc(b, c, d) {
        b.a = c;
        var e = b.type = c.type;
        b.target = c.target || c.srcElement;
        b.b = d;
        if (d = c.relatedTarget) {
            if (Hb) {
                var f;
                a:{
                    try {
                        wc(d.nodeName);
                        f = !0;
                        break a
                    } catch (g) {
                    }
                    f = !1
                }
                f || (d = null)
            }
        } else"mouseover" == e ? d = c.fromElement : "mouseout" == e && (d = c.toElement);
        b.relatedTarget = d;
        Object.defineProperties ? Object.defineProperties(b, {
            offsetX: {
                configurable: !0,
                enumerable: !0,
                get: b.pf,
                set: b.am
            }, offsetY: {configurable: !0, enumerable: !0, get: b.qf, set: b.bm}
        }) : (b.offsetX = b.pf(), b.offsetY = b.qf());
        b.clientX = void 0 !== c.clientX ? c.clientX :
            c.pageX;
        b.clientY = void 0 !== c.clientY ? c.clientY : c.pageY;
        b.screenX = c.screenX || 0;
        b.screenY = c.screenY || 0;
        b.button = c.button;
        b.f = c.keyCode || 0;
        b.i = c.charCode || ("keypress" == e ? c.keyCode : 0);
        b.n = c.ctrlKey;
        b.d = c.altKey;
        b.c = c.shiftKey;
        b.k = c.metaKey;
        b.g = Jb ? c.metaKey : c.ctrlKey;
        b.state = c.state;
        c.defaultPrevented && b.preventDefault()
    }

    function Ac(b) {
        return (jc ? 0 == b.a.button : "click" == b.type ? !0 : !!(b.a.button & zc[0])) && !(Ib && Jb && b.n)
    }

    l = xc.prototype;
    l.pb = function () {
        xc.T.pb.call(this);
        this.a.stopPropagation ? this.a.stopPropagation() : this.a.cancelBubble = !0
    };
    l.preventDefault = function () {
        xc.T.preventDefault.call(this);
        var b = this.a;
        if (b.preventDefault)b.preventDefault(); else if (b.returnValue = !1, lc)try {
            if (b.ctrlKey || 112 <= b.keyCode && 123 >= b.keyCode)b.keyCode = -1
        } catch (c) {
        }
    };
    l.Ah = function () {
        return this.a
    };
    l.pf = function () {
        return Ib || void 0 !== this.a.offsetX ? this.a.offsetX : this.a.layerX
    };
    l.am = function (b) {
        Object.defineProperties(this, {offsetX: {writable: !0, enumerable: !0, configurable: !0, value: b}})
    };
    l.qf = function () {
        return Ib || void 0 !== this.a.offsetY ? this.a.offsetY : this.a.layerY
    };
    l.bm = function (b) {
        Object.defineProperties(this, {offsetY: {writable: !0, enumerable: !0, configurable: !0, value: b}})
    };
    var Bc = "closure_listenable_" + (1E6 * Math.random() | 0);

    function Cc(b) {
        return !(!b || !b[Bc])
    }

    var Dc = 0;

    function Ec(b, c, d, e, f) {
        this.$b = b;
        this.a = null;
        this.src = c;
        this.type = d;
        this.Bc = !!e;
        this.yd = f;
        this.key = ++Dc;
        this.uc = this.cd = !1
    }

    function Fc(b) {
        b.uc = !0;
        b.$b = null;
        b.a = null;
        b.src = null;
        b.yd = null
    };
    function Gc(b) {
        this.src = b;
        this.a = {};
        this.d = 0
    }

    Gc.prototype.add = function (b, c, d, e, f) {
        var g = b.toString();
        b = this.a[g];
        b || (b = this.a[g] = [], this.d++);
        var h = Hc(b, c, e, f);
        -1 < h ? (c = b[h], d || (c.cd = !1)) : (c = new Ec(c, this.src, g, !!e, f), c.cd = d, b.push(c));
        return c
    };
    Gc.prototype.remove = function (b, c, d, e) {
        b = b.toString();
        if (!(b in this.a))return !1;
        var f = this.a[b];
        c = Hc(f, c, d, e);
        return -1 < c ? (Fc(f[c]), Oa.splice.call(f, c, 1), 0 == f.length && (delete this.a[b], this.d--), !0) : !1
    };
    function Ic(b, c) {
        var d = c.type;
        if (!(d in b.a))return !1;
        var e = Xa(b.a[d], c);
        e && (Fc(c), 0 == b.a[d].length && (delete b.a[d], b.d--));
        return e
    }

    function Jc(b, c, d, e, f) {
        b = b.a[c.toString()];
        c = -1;
        b && (c = Hc(b, d, e, f));
        return -1 < c ? b[c] : null
    }

    function Kc(b, c, d) {
        var e = m(c), f = e ? c.toString() : "", g = m(d);
        return pb(b.a, function (b) {
            for (var c = 0; c < b.length; ++c)if (!(e && b[c].type != f || g && b[c].Bc != d))return !0;
            return !1
        })
    }

    function Hc(b, c, d, e) {
        for (var f = 0; f < b.length; ++f) {
            var g = b[f];
            if (!g.uc && g.$b == c && g.Bc == !!d && g.yd == e)return f
        }
        return -1
    };
    var Lc = "closure_lm_" + (1E6 * Math.random() | 0), Nc = {}, Oc = 0;

    function w(b, c, d, e, f) {
        if (ga(c)) {
            for (var g = 0; g < c.length; g++)w(b, c[g], d, e, f);
            return null
        }
        d = Pc(d);
        return Cc(b) ? b.Ra(c, d, e, f) : Qc(b, c, d, !1, e, f)
    }

    function Qc(b, c, d, e, f, g) {
        if (!c)throw Error("Invalid event type");
        var h = !!f, k = Rc(b);
        k || (b[Lc] = k = new Gc(b));
        d = k.add(c, d, e, f, g);
        if (d.a)return d;
        e = Sc();
        d.a = e;
        e.src = b;
        e.$b = d;
        b.addEventListener ? b.addEventListener(c.toString(), e, h) : b.attachEvent(Tc(c.toString()), e);
        Oc++;
        return d
    }

    function Sc() {
        var b = Uc, c = kc ? function (d) {
            return b.call(c.src, c.$b, d)
        } : function (d) {
            d = b.call(c.src, c.$b, d);
            if (!d)return d
        };
        return c
    }

    function Vc(b, c, d, e, f) {
        if (ga(c)) {
            for (var g = 0; g < c.length; g++)Vc(b, c[g], d, e, f);
            return null
        }
        d = Pc(d);
        return Cc(b) ? b.mb.add(String(c), d, !0, e, f) : Qc(b, c, d, !0, e, f)
    }

    function Wc(b, c, d, e, f) {
        if (ga(c))for (var g = 0; g < c.length; g++)Wc(b, c[g], d, e, f); else d = Pc(d), Cc(b) ? b.Ne(c, d, e, f) : b && (b = Rc(b)) && (c = Jc(b, c, d, !!e, f)) && Xc(c)
    }

    function Xc(b) {
        if (ja(b) || !b || b.uc)return !1;
        var c = b.src;
        if (Cc(c))return Ic(c.mb, b);
        var d = b.type, e = b.a;
        c.removeEventListener ? c.removeEventListener(d, e, b.Bc) : c.detachEvent && c.detachEvent(Tc(d), e);
        Oc--;
        (d = Rc(c)) ? (Ic(d, b), 0 == d.d && (d.src = null, c[Lc] = null)) : Fc(b);
        return !0
    }

    function Tc(b) {
        return b in Nc ? Nc[b] : Nc[b] = "on" + b
    }

    function Yc(b, c, d, e) {
        var f = !0;
        if (b = Rc(b))if (c = b.a[c.toString()])for (c = c.concat(), b = 0; b < c.length; b++) {
            var g = c[b];
            g && g.Bc == d && !g.uc && (g = Zc(g, e), f = f && !1 !== g)
        }
        return f
    }

    function Zc(b, c) {
        var d = b.$b, e = b.yd || b.src;
        b.cd && Xc(b);
        return d.call(e, c)
    }

    function Uc(b, c) {
        if (b.uc)return !0;
        if (!kc) {
            var d;
            if (!(d = c))a:{
                d = ["window", "event"];
                for (var e = ba, f; f = d.shift();)if (null != e[f])e = e[f]; else {
                    d = null;
                    break a
                }
                d = e
            }
            f = d;
            d = new xc(f, this);
            e = !0;
            if (!(0 > f.keyCode || void 0 != f.returnValue)) {
                a:{
                    var g = !1;
                    if (0 == f.keyCode)try {
                        f.keyCode = -1;
                        break a
                    } catch (h) {
                        g = !0
                    }
                    if (g || void 0 == f.returnValue)f.returnValue = !0
                }
                f = [];
                for (g = d.b; g; g = g.parentNode)f.push(g);
                for (var g = b.type, k = f.length - 1; !d.e && 0 <= k; k--) {
                    d.b = f[k];
                    var n = Yc(f[k], g, !0, d), e = e && n
                }
                for (k = 0; !d.e && k < f.length; k++)d.b = f[k], n =
                    Yc(f[k], g, !1, d), e = e && n
            }
            return e
        }
        return Zc(b, new xc(c, this))
    }

    function Rc(b) {
        b = b[Lc];
        return b instanceof Gc ? b : null
    }

    var $c = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);

    function Pc(b) {
        if (ka(b))return b;
        b[$c] || (b[$c] = function (c) {
            return b.handleEvent(c)
        });
        return b[$c]
    };
    function ad(b) {
        return function () {
            return b
        }
    }

    var bd = ad(!1), cd = ad(!0), dd = ad(null);

    function ed(b) {
        return b
    }

    function fd(b) {
        var c;
        c = c || 0;
        return function () {
            return b.apply(this, Array.prototype.slice.call(arguments, 0, c))
        }
    }

    function gd(b) {
        var c = arguments, d = c.length;
        return function () {
            for (var b, f = 0; f < d; f++)b = c[f].apply(this, arguments);
            return b
        }
    }

    function hd(b) {
        var c = arguments, d = c.length;
        return function () {
            for (var b = 0; b < d; b++)if (!c[b].apply(this, arguments))return !1;
            return !0
        }
    };
    function id() {
        mc.call(this);
        this.mb = new Gc(this);
        this.qh = this;
        this.he = null
    }

    v(id, mc);
    id.prototype[Bc] = !0;
    l = id.prototype;
    l.addEventListener = function (b, c, d, e) {
        w(this, b, c, d, e)
    };
    l.removeEventListener = function (b, c, d, e) {
        Wc(this, b, c, d, e)
    };
    l.dispatchEvent = function (b) {
        var c, d = this.he;
        if (d)for (c = []; d; d = d.he)c.push(d);
        var d = this.qh, e = b.type || b;
        if (ia(b))b = new rc(b, d); else if (b instanceof rc)b.target = b.target || d; else {
            var f = b;
            b = new rc(e, d);
            Db(b, f)
        }
        var f = !0, g;
        if (c)for (var h = c.length - 1; !b.e && 0 <= h; h--)g = b.b = c[h], f = jd(g, e, !0, b) && f;
        b.e || (g = b.b = d, f = jd(g, e, !0, b) && f, b.e || (f = jd(g, e, !1, b) && f));
        if (c)for (h = 0; !b.e && h < c.length; h++)g = b.b = c[h], f = jd(g, e, !1, b) && f;
        return f
    };
    l.P = function () {
        id.T.P.call(this);
        if (this.mb) {
            var b = this.mb, c = 0, d;
            for (d in b.a) {
                for (var e = b.a[d], f = 0; f < e.length; f++)++c, Fc(e[f]);
                delete b.a[d];
                b.d--
            }
        }
        this.he = null
    };
    l.Ra = function (b, c, d, e) {
        return this.mb.add(String(b), c, !1, d, e)
    };
    l.Ne = function (b, c, d, e) {
        return this.mb.remove(String(b), c, d, e)
    };
    function jd(b, c, d, e) {
        c = b.mb.a[String(c)];
        if (!c)return !0;
        c = c.concat();
        for (var f = !0, g = 0; g < c.length; ++g) {
            var h = c[g];
            if (h && !h.uc && h.Bc == d) {
                var k = h.$b, n = h.yd || h.src;
                h.cd && Ic(b.mb, h);
                f = !1 !== k.call(n, e) && f
            }
        }
        return f && 0 != e.pg
    }

    function kd(b, c, d) {
        return Kc(b.mb, m(c) ? String(c) : void 0, d)
    };
    function ld() {
        id.call(this);
        this.d = 0
    }

    v(ld, id);
    function md(b) {
        Xc(b)
    }

    l = ld.prototype;
    l.l = function () {
        ++this.d;
        this.dispatchEvent("change")
    };
    l.u = function () {
        return this.d
    };
    l.s = function (b, c, d) {
        return w(this, b, c, !1, d)
    };
    l.v = function (b, c, d) {
        return Vc(this, b, c, !1, d)
    };
    l.t = function (b, c, d) {
        Wc(this, b, c, !1, d)
    };
    l.A = md;
    function nd(b, c, d) {
        rc.call(this, b);
        this.key = c;
        this.oldValue = d
    }

    v(nd, rc);
    function od(b, c, d, e) {
        this.source = b;
        this.target = c;
        this.b = d;
        this.d = e;
        this.c = this.a = ed
    }

    od.prototype.transform = function (b, c) {
        var d = pd(this.source, this.b);
        this.a = b;
        this.c = c;
        qd(this.source, this.b, d)
    };
    function rd(b) {
        ld.call(this);
        ma(this);
        this.n = {};
        this.Da = {};
        this.ge = {};
        m(b) && this.C(b)
    }

    v(rd, ld);
    var sd = {}, td = {}, ud = {};

    function vd(b) {
        return sd.hasOwnProperty(b) ? sd[b] : sd[b] = "change:" + b
    }

    function pd(b, c) {
        var d = td.hasOwnProperty(c) ? td[c] : td[c] = "get" + (String(c.charAt(0)).toUpperCase() + String(c.substr(1)).toLowerCase()), d = b[d];
        return m(d) ? d.call(b) : b.get(c)
    }

    l = rd.prototype;
    l.K = function (b, c, d) {
        d = d || b;
        this.L(b);
        var e = vd(d);
        this.ge[b] = w(c, e, function (c) {
            qd(this, b, c.oldValue)
        }, void 0, this);
        c = new od(this, c, b, d);
        this.Da[b] = c;
        qd(this, b, this.n[b]);
        return c
    };
    l.get = function (b) {
        var c, d = this.Da;
        d.hasOwnProperty(b) ? (b = d[b], c = pd(b.target, b.d), c = b.c(c)) : this.n.hasOwnProperty(b) && (c = this.n[b]);
        return c
    };
    l.G = function () {
        var b = this.Da, c;
        if (wb(this.n)) {
            if (wb(b))return [];
            c = b
        } else if (wb(b))c = this.n; else {
            c = {};
            for (var d in this.n)c[d] = !0;
            for (d in b)c[d] = !0
        }
        return sb(c)
    };
    l.I = function () {
        var b = {}, c;
        for (c in this.n)b[c] = this.n[c];
        for (c in this.Da)b[c] = this.get(c);
        return b
    };
    function qd(b, c, d) {
        var e;
        e = vd(c);
        b.dispatchEvent(new nd(e, c, d));
        b.dispatchEvent(new nd("propertychange", c, d))
    }

    l.set = function (b, c) {
        var d = this.Da;
        if (d.hasOwnProperty(b)) {
            var e = d[b];
            c = e.a(c);
            var d = e.target, e = e.d, f = c, g = ud.hasOwnProperty(e) ? ud[e] : ud[e] = "set" + (String(e.charAt(0)).toUpperCase() + String(e.substr(1)).toLowerCase()), g = d[g];
            m(g) ? g.call(d, f) : d.set(e, f)
        } else d = this.n[b], this.n[b] = c, qd(this, b, d)
    };
    l.C = function (b) {
        for (var c in b)this.set(c, b[c])
    };
    l.L = function (b) {
        var c = this.ge, d = c[b];
        d && (delete c[b], Xc(d), c = this.get(b), delete this.Da[b], this.n[b] = c)
    };
    l.M = function () {
        for (var b in this.ge)this.L(b)
    };
    function wd(b, c) {
        b[0] += c[0];
        b[1] += c[1];
        return b
    }

    function xd(b, c) {
        var d = b[0], e = b[1], f = c[0], g = c[1], h = f[0], f = f[1], k = g[0], g = g[1], n = k - h, p = g - f, d = 0 === n && 0 === p ? 0 : (n * (d - h) + p * (e - f)) / (n * n + p * p || 0);
        0 >= d || (1 <= d ? (h = k, f = g) : (h += d * n, f += d * p));
        return [h, f]
    }

    function yd(b, c) {
        var d = Xb(b + 180, 360) - 180, e = Math.abs(Math.round(3600 * d));
        return Math.floor(e / 3600) + "\u00b0 " + Math.floor(e / 60 % 60) + "\u2032 " + Math.floor(e % 60) + "\u2033 " + c.charAt(0 > d ? 1 : 0)
    }

    function zd(b, c, d) {
        return m(b) ? c.replace("{x}", b[0].toFixed(d)).replace("{y}", b[1].toFixed(d)) : ""
    }

    function Ad(b, c) {
        for (var d = !0, e = b.length - 1; 0 <= e; --e)if (b[e] != c[e]) {
            d = !1;
            break
        }
        return d
    }

    function Bd(b, c) {
        var d = Math.cos(c), e = Math.sin(c), f = b[1] * d + b[0] * e;
        b[0] = b[0] * d - b[1] * e;
        b[1] = f;
        return b
    }

    function Cd(b, c) {
        var d = b[0] - c[0], e = b[1] - c[1];
        return d * d + e * e
    }

    function Dd(b, c) {
        return zd(b, "{x}, {y}", c)
    };
    function Ed(b) {
        this.length = b.length || b;
        for (var c = 0; c < this.length; c++)this[c] = b[c] || 0
    }

    Ed.prototype.a = 4;
    Ed.prototype.set = function (b, c) {
        c = c || 0;
        for (var d = 0; d < b.length && c + d < this.length; d++)this[c + d] = b[d]
    };
    Ed.prototype.toString = Array.prototype.join;
    "undefined" == typeof Float32Array && (Ed.BYTES_PER_ELEMENT = 4, Ed.prototype.BYTES_PER_ELEMENT = Ed.prototype.a, Ed.prototype.set = Ed.prototype.set, Ed.prototype.toString = Ed.prototype.toString, t("Float32Array", Ed, void 0));
    function Fd(b) {
        this.length = b.length || b;
        for (var c = 0; c < this.length; c++)this[c] = b[c] || 0
    }

    Fd.prototype.a = 8;
    Fd.prototype.set = function (b, c) {
        c = c || 0;
        for (var d = 0; d < b.length && c + d < this.length; d++)this[c + d] = b[d]
    };
    Fd.prototype.toString = Array.prototype.join;
    if ("undefined" == typeof Float64Array) {
        try {
            Fd.BYTES_PER_ELEMENT = 8
        } catch (Gd) {
        }
        Fd.prototype.BYTES_PER_ELEMENT = Fd.prototype.a;
        Fd.prototype.set = Fd.prototype.set;
        Fd.prototype.toString = Fd.prototype.toString;
        t("Float64Array", Fd, void 0)
    }
    ;
    function Hd(b, c, d, e, f) {
        b[0] = c;
        b[1] = d;
        b[2] = e;
        b[3] = f
    };
    function Id() {
        var b = Array(16);
        Jd(b, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        return b
    }

    function Kd() {
        var b = Array(16);
        Jd(b, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return b
    }

    function Jd(b, c, d, e, f, g, h, k, n, p, q, r, s, u, z, y, A) {
        b[0] = c;
        b[1] = d;
        b[2] = e;
        b[3] = f;
        b[4] = g;
        b[5] = h;
        b[6] = k;
        b[7] = n;
        b[8] = p;
        b[9] = q;
        b[10] = r;
        b[11] = s;
        b[12] = u;
        b[13] = z;
        b[14] = y;
        b[15] = A
    }

    function Ld(b, c) {
        b[0] = c[0];
        b[1] = c[1];
        b[2] = c[2];
        b[3] = c[3];
        b[4] = c[4];
        b[5] = c[5];
        b[6] = c[6];
        b[7] = c[7];
        b[8] = c[8];
        b[9] = c[9];
        b[10] = c[10];
        b[11] = c[11];
        b[12] = c[12];
        b[13] = c[13];
        b[14] = c[14];
        b[15] = c[15]
    }

    function Md(b) {
        b[0] = 1;
        b[1] = 0;
        b[2] = 0;
        b[3] = 0;
        b[4] = 0;
        b[5] = 1;
        b[6] = 0;
        b[7] = 0;
        b[8] = 0;
        b[9] = 0;
        b[10] = 1;
        b[11] = 0;
        b[12] = 0;
        b[13] = 0;
        b[14] = 0;
        b[15] = 1
    }

    function Nd(b, c, d) {
        var e = b[0], f = b[1], g = b[2], h = b[3], k = b[4], n = b[5], p = b[6], q = b[7], r = b[8], s = b[9], u = b[10], z = b[11], y = b[12], A = b[13], D = b[14];
        b = b[15];
        var x = c[0], M = c[1], Q = c[2], O = c[3], W = c[4], Ja = c[5], lb = c[6], Ka = c[7], mb = c[8], Qb = c[9], Za = c[10], Ub = c[11], nb = c[12], Mc = c[13], sc = c[14];
        c = c[15];
        d[0] = e * x + k * M + r * Q + y * O;
        d[1] = f * x + n * M + s * Q + A * O;
        d[2] = g * x + p * M + u * Q + D * O;
        d[3] = h * x + q * M + z * Q + b * O;
        d[4] = e * W + k * Ja + r * lb + y * Ka;
        d[5] = f * W + n * Ja + s * lb + A * Ka;
        d[6] = g * W + p * Ja + u * lb + D * Ka;
        d[7] = h * W + q * Ja + z * lb + b * Ka;
        d[8] = e * mb + k * Qb + r * Za + y * Ub;
        d[9] = f * mb + n * Qb + s * Za + A * Ub;
        d[10] = g * mb + p * Qb + u * Za + D * Ub;
        d[11] = h * mb + q * Qb + z * Za + b * Ub;
        d[12] = e * nb + k * Mc + r * sc + y * c;
        d[13] = f * nb + n * Mc + s * sc + A * c;
        d[14] = g * nb + p * Mc + u * sc + D * c;
        d[15] = h * nb + q * Mc + z * sc + b * c
    }

    function Od(b, c) {
        var d = b[0], e = b[1], f = b[2], g = b[3], h = b[4], k = b[5], n = b[6], p = b[7], q = b[8], r = b[9], s = b[10], u = b[11], z = b[12], y = b[13], A = b[14], D = b[15], x = d * k - e * h, M = d * n - f * h, Q = d * p - g * h, O = e * n - f * k, W = e * p - g * k, Ja = f * p - g * n, lb = q * y - r * z, Ka = q * A - s * z, mb = q * D - u * z, Qb = r * A - s * y, Za = r * D - u * y, Ub = s * D - u * A, nb = x * Ub - M * Za + Q * Qb + O * mb - W * Ka + Ja * lb;
        0 != nb && (nb = 1 / nb, c[0] = (k * Ub - n * Za + p * Qb) * nb, c[1] = (-e * Ub + f * Za - g * Qb) * nb, c[2] = (y * Ja - A * W + D * O) * nb, c[3] = (-r * Ja + s * W - u * O) * nb, c[4] = (-h * Ub + n * mb - p * Ka) * nb, c[5] = (d * Ub - f * mb + g * Ka) * nb, c[6] = (-z * Ja + A * Q - D * M) * nb, c[7] = (q * Ja - s *
        Q + u * M) * nb, c[8] = (h * Za - k * mb + p * lb) * nb, c[9] = (-d * Za + e * mb - g * lb) * nb, c[10] = (z * W - y * Q + D * x) * nb, c[11] = (-q * W + r * Q - u * x) * nb, c[12] = (-h * Qb + k * Ka - n * lb) * nb, c[13] = (d * Qb - e * Ka + f * lb) * nb, c[14] = (-z * O + y * M - A * x) * nb, c[15] = (q * O - r * M + s * x) * nb)
    }

    function Pd(b, c, d) {
        var e = b[1] * c + b[5] * d + 0 * b[9] + b[13], f = b[2] * c + b[6] * d + 0 * b[10] + b[14], g = b[3] * c + b[7] * d + 0 * b[11] + b[15];
        b[12] = b[0] * c + b[4] * d + 0 * b[8] + b[12];
        b[13] = e;
        b[14] = f;
        b[15] = g
    }

    function Qd(b, c, d) {
        Jd(b, b[0] * c, b[1] * c, b[2] * c, b[3] * c, b[4] * d, b[5] * d, b[6] * d, b[7] * d, 1 * b[8], 1 * b[9], 1 * b[10], 1 * b[11], b[12], b[13], b[14], b[15])
    }

    function Rd(b, c) {
        var d = b[0], e = b[1], f = b[2], g = b[3], h = b[4], k = b[5], n = b[6], p = b[7], q = Math.cos(c), r = Math.sin(c);
        b[0] = d * q + h * r;
        b[1] = e * q + k * r;
        b[2] = f * q + n * r;
        b[3] = g * q + p * r;
        b[4] = d * -r + h * q;
        b[5] = e * -r + k * q;
        b[6] = f * -r + n * q;
        b[7] = g * -r + p * q
    }

    new Float64Array(3);
    new Float64Array(3);
    new Float64Array(4);
    new Float64Array(4);
    new Float64Array(4);
    new Float64Array(16);
    function Sd(b) {
        for (var c = Td(), d = 0, e = b.length; d < e; ++d)Ud(c, b[d]);
        return c
    }

    function Vd(b, c, d) {
        var e = Math.min.apply(null, b), f = Math.min.apply(null, c);
        b = Math.max.apply(null, b);
        c = Math.max.apply(null, c);
        return Wd(e, f, b, c, d)
    }

    function Xd(b, c, d) {
        return m(d) ? (d[0] = b[0] - c, d[1] = b[1] - c, d[2] = b[2] + c, d[3] = b[3] + c, d) : [b[0] - c, b[1] - c, b[2] + c, b[3] + c]
    }

    function Yd(b, c) {
        return m(c) ? (c[0] = b[0], c[1] = b[1], c[2] = b[2], c[3] = b[3], c) : b.slice()
    }

    function Zd(b, c, d) {
        c = c < b[0] ? b[0] - c : b[2] < c ? c - b[2] : 0;
        b = d < b[1] ? b[1] - d : b[3] < d ? d - b[3] : 0;
        return c * c + b * b
    }

    function $d(b, c) {
        return b[0] <= c[0] && c[2] <= b[2] && b[1] <= c[1] && c[3] <= b[3]
    }

    function ae(b, c, d) {
        return b[0] <= c && c <= b[2] && b[1] <= d && d <= b[3]
    }

    function be(b, c) {
        var d = b[1], e = b[2], f = b[3], g = c[0], h = c[1], k = 0;
        g < b[0] ? k = k | 16 : g > e && (k = k | 4);
        h < d ? k |= 8 : h > f && (k |= 2);
        0 === k && (k = 1);
        return k
    }

    function Td() {
        return [Infinity, Infinity, -Infinity, -Infinity]
    }

    function Wd(b, c, d, e, f) {
        return m(f) ? (f[0] = b, f[1] = c, f[2] = d, f[3] = e, f) : [b, c, d, e]
    }

    function ce(b, c) {
        var d = b[0], e = b[1];
        return Wd(d, e, d, e, c)
    }

    function de(b, c) {
        return b[0] == c[0] && b[2] == c[2] && b[1] == c[1] && b[3] == c[3]
    }

    function ee(b, c) {
        c[0] < b[0] && (b[0] = c[0]);
        c[2] > b[2] && (b[2] = c[2]);
        c[1] < b[1] && (b[1] = c[1]);
        c[3] > b[3] && (b[3] = c[3]);
        return b
    }

    function Ud(b, c) {
        c[0] < b[0] && (b[0] = c[0]);
        c[0] > b[2] && (b[2] = c[0]);
        c[1] < b[1] && (b[1] = c[1]);
        c[1] > b[3] && (b[3] = c[1])
    }

    function fe(b, c, d, e, f) {
        for (; d < e; d += f) {
            var g = b, h = c[d], k = c[d + 1];
            g[0] = Math.min(g[0], h);
            g[1] = Math.min(g[1], k);
            g[2] = Math.max(g[2], h);
            g[3] = Math.max(g[3], k)
        }
        return b
    }

    function ge(b, c) {
        var d;
        return (d = c.call(void 0, he(b))) || (d = c.call(void 0, ie(b))) || (d = c.call(void 0, je(b))) ? d : (d = c.call(void 0, ke(b))) ? d : !1
    }

    function he(b) {
        return [b[0], b[1]]
    }

    function ie(b) {
        return [b[2], b[1]]
    }

    function le(b) {
        return [(b[0] + b[2]) / 2, (b[1] + b[3]) / 2]
    }

    function me(b, c) {
        var d;
        "bottom-left" === c ? d = he(b) : "bottom-right" === c ? d = ie(b) : "top-left" === c ? d = ke(b) : "top-right" === c && (d = je(b));
        return d
    }

    function ne(b, c, d, e) {
        var f = c * e[0] / 2;
        e = c * e[1] / 2;
        c = Math.cos(d);
        d = Math.sin(d);
        f = [-f, -f, f, f];
        e = [-e, e, -e, e];
        var g, h, k;
        for (g = 0; 4 > g; ++g)h = f[g], k = e[g], f[g] = b[0] + h * c - k * d, e[g] = b[1] + h * d + k * c;
        return Vd(f, e, void 0)
    }

    function oe(b) {
        return b[3] - b[1]
    }

    function pe(b, c, d) {
        d = m(d) ? d : Td();
        qe(b, c) && (d[0] = b[0] > c[0] ? b[0] : c[0], d[1] = b[1] > c[1] ? b[1] : c[1], d[2] = b[2] < c[2] ? b[2] : c[2], d[3] = b[3] < c[3] ? b[3] : c[3]);
        return d
    }

    function ke(b) {
        return [b[0], b[3]]
    }

    function je(b) {
        return [b[2], b[3]]
    }

    function re(b) {
        return b[2] - b[0]
    }

    function qe(b, c) {
        return b[0] <= c[2] && b[2] >= c[0] && b[1] <= c[3] && b[3] >= c[1]
    }

    function se(b) {
        return b[2] < b[0] || b[3] < b[1]
    }

    function te(b, c) {
        var d = (b[2] - b[0]) / 2 * (c - 1), e = (b[3] - b[1]) / 2 * (c - 1);
        b[0] -= d;
        b[2] += d;
        b[1] -= e;
        b[3] += e
    }

    function ue(b, c, d) {
        b = [b[0], b[1], b[0], b[3], b[2], b[1], b[2], b[3]];
        c(b, b, 2);
        return Vd([b[0], b[2], b[4], b[6]], [b[1], b[3], b[5], b[7]], d)
    };
    /*

     Latitude/longitude spherical geodesy formulae taken from
     http://www.movable-type.co.uk/scripts/latlong.html
     Licensed under CC-BY-3.0.
     */
    function ve(b) {
        this.radius = b
    }

    ve.prototype.d = function (b) {
        for (var c = 0, d = b.length, e = b[d - 1][0], f = b[d - 1][1], g = 0; g < d; g++)var h = b[g][0], k = b[g][1], c = c + Zb(h - e) * (2 + Math.sin(Zb(f)) + Math.sin(Zb(k))), e = h, f = k;
        return c * this.radius * this.radius / 2
    };
    ve.prototype.a = function (b, c) {
        var d = Zb(b[1]), e = Zb(c[1]), f = (e - d) / 2, g = Zb(c[0] - b[0]) / 2, d = Math.sin(f) * Math.sin(f) + Math.sin(g) * Math.sin(g) * Math.cos(d) * Math.cos(e);
        return 2 * this.radius * Math.atan2(Math.sqrt(d), Math.sqrt(1 - d))
    };
    ve.prototype.offset = function (b, c, d) {
        var e = Zb(b[1]);
        c /= this.radius;
        var f = Math.asin(Math.sin(e) * Math.cos(c) + Math.cos(e) * Math.sin(c) * Math.cos(d));
        return [180 * (Zb(b[0]) + Math.atan2(Math.sin(d) * Math.sin(c) * Math.cos(e), Math.cos(c) - Math.sin(e) * Math.sin(f))) / Math.PI, 180 * f / Math.PI]
    };
    var we = new ve(6370997);
    var xe = {};
    xe.degrees = 2 * Math.PI * we.radius / 360;
    xe.ft = .3048;
    xe.m = 1;
    xe["us-ft"] = 1200 / 3937;
    function ye(b) {
        this.a = b.code;
        this.d = b.units;
        this.g = m(b.extent) ? b.extent : null;
        this.c = m(b.worldExtent) ? b.worldExtent : null;
        this.b = m(b.axisOrientation) ? b.axisOrientation : "enu";
        this.e = m(b.global) ? b.global : !1;
        this.f = null
    }

    l = ye.prototype;
    l.Bh = function () {
        return this.a
    };
    l.J = function () {
        return this.g
    };
    l.Sj = function () {
        return this.d
    };
    l.od = function () {
        return xe[this.d]
    };
    l.ii = function () {
        return this.c
    };
    function ze(b) {
        return b.b
    }

    l.Vi = function () {
        return this.e
    };
    l.Tj = function (b) {
        this.g = b
    };
    l.hm = function (b) {
        this.c = b
    };
    l.te = function (b, c) {
        if ("degrees" == this.d)return b;
        var d = Ae(this, Be("EPSG:4326")), e = [c[0] - b / 2, c[1], c[0] + b / 2, c[1], c[0], c[1] - b / 2, c[0], c[1] + b / 2], e = d(e, e, 2), d = (we.a(e.slice(0, 2), e.slice(2, 4)) + we.a(e.slice(4, 6), e.slice(6, 8))) / 2, e = this.od();
        m(e) && (d /= e);
        return d
    };
    var Ce = {}, De = {};

    function Ee(b) {
        Fe(b);
        Qa(b, function (c) {
            Qa(b, function (b) {
                c !== b && Ge(c, b, He)
            })
        })
    }

    function Ie() {
        var b = Je, c = Ke, d = Le;
        Qa(Me, function (e) {
            Qa(b, function (b) {
                Ge(e, b, c);
                Ge(b, e, d)
            })
        })
    }

    function Ne(b) {
        Ce[b.a] = b;
        Ge(b, b, He)
    }

    function Fe(b) {
        var c = [];
        Qa(b, function (b) {
            c.push(Ne(b))
        })
    }

    function Pe(b) {
        return null != b ? ia(b) ? Be(b) : b : Be("EPSG:3857")
    }

    function Ge(b, c, d) {
        b = b.a;
        c = c.a;
        b in De || (De[b] = {});
        De[b][c] = d
    }

    function Qe(b, c, d, e) {
        b = Be(b);
        c = Be(c);
        Ge(b, c, Re(d));
        Ge(c, b, Re(e))
    }

    function Re(b) {
        return function (c, d, e) {
            var f = c.length;
            e = m(e) ? e : 2;
            d = m(d) ? d : Array(f);
            var g, h;
            for (h = 0; h < f; h += e)for (g = b([c[h], c[h + 1]]), d[h] = g[0], d[h + 1] = g[1], g = e - 1; 2 <= g; --g)d[h + g] = c[h + g];
            return d
        }
    }

    function Be(b) {
        var c;
        if (b instanceof ye)c = b; else if (ia(b)) {
            if (c = Ce[b], !m(c) && "function" == typeof proj4) {
                var d = proj4.defs(b);
                if (m(d)) {
                    c = d.units;
                    !m(c) && m(d.to_meter) && (c = d.to_meter.toString(), xe[c] = d.to_meter);
                    c = new ye({code: b, units: c, axisOrientation: d.axis});
                    Ne(c);
                    var e, f, g;
                    for (e in Ce)f = proj4.defs(e), m(f) && (g = Be(e), f === d ? Ee([g, c]) : (f = proj4(e, b), Qe(g, c, f.forward, f.inverse)))
                } else c = null
            }
        } else c = null;
        return c
    }

    function Se(b, c) {
        return b === c ? !0 : b.d != c.d ? !1 : Ae(b, c) === He
    }

    function Te(b, c) {
        var d = Be(b), e = Be(c);
        return Ae(d, e)
    }

    function Ae(b, c) {
        var d = b.a, e = c.a, f;
        d in De && e in De[d] && (f = De[d][e]);
        m(f) || (f = Ue);
        return f
    }

    function Ue(b, c) {
        if (m(c) && b !== c) {
            for (var d = 0, e = b.length; d < e; ++d)c[d] = b[d];
            b = c
        }
        return b
    }

    function He(b, c) {
        var d;
        if (m(c)) {
            d = 0;
            for (var e = b.length; d < e; ++d)c[d] = b[d];
            d = c
        } else d = b.slice();
        return d
    }

    function Ve(b, c, d) {
        c = Te(c, d);
        return ue(b, c)
    };
    function B(b) {
        rd.call(this);
        b = m(b) ? b : {};
        this.q = [0, 0];
        var c = {};
        c.center = m(b.center) ? b.center : null;
        this.p = Pe(b.projection);
        var d, e, f, g = m(b.minZoom) ? b.minZoom : 0;
        d = m(b.maxZoom) ? b.maxZoom : 28;
        var h = m(b.zoomFactor) ? b.zoomFactor : 2;
        if (m(b.resolutions))d = b.resolutions, e = d[0], f = d[d.length - 1], d = cc(d); else {
            e = Pe(b.projection);
            f = e.J();
            var k = (null === f ? 360 * xe.degrees / xe[e.d] : Math.max(re(f), oe(f))) / 256 / Math.pow(2, 0), n = k / Math.pow(2, 28);
            e = b.maxResolution;
            m(e) ? g = 0 : e = k / Math.pow(h, g);
            f = b.minResolution;
            m(f) || (f = m(b.maxZoom) ?
                m(b.maxResolution) ? e / Math.pow(h, d) : k / Math.pow(h, d) : n);
            d = g + Math.floor(Math.log(e / f) / Math.log(h));
            f = e / Math.pow(h, d - g);
            d = dc(h, e, d - g)
        }
        this.e = e;
        this.H = f;
        this.o = g;
        g = m(b.extent) ? $b(b.extent) : ac;
        (m(b.enableRotation) ? b.enableRotation : 1) ? (e = b.constrainRotation, e = m(e) && !0 !== e ? !1 === e ? fc : ja(e) ? gc(e) : fc : hc()) : e = ec;
        this.D = new ic(g, d, e);
        m(b.resolution) ? c.resolution = b.resolution : m(b.zoom) && (c.resolution = this.constrainResolution(this.e, b.zoom - this.o));
        c.rotation = m(b.rotation) ? b.rotation : 0;
        this.C(c)
    }

    v(B, rd);
    B.prototype.i = function (b) {
        return this.D.center(b)
    };
    B.prototype.constrainResolution = function (b, c, d) {
        return this.D.resolution(b, c || 0, d || 0)
    };
    B.prototype.constrainRotation = function (b, c) {
        return this.D.rotation(b, c || 0)
    };
    B.prototype.b = function () {
        return this.get("center")
    };
    B.prototype.getCenter = B.prototype.b;
    B.prototype.g = function (b) {
        var c = this.b(), d = this.a();
        return [c[0] - d * b[0] / 2, c[1] - d * b[1] / 2, c[0] + d * b[0] / 2, c[1] + d * b[1] / 2]
    };
    B.prototype.N = function () {
        return this.p
    };
    B.prototype.a = function () {
        return this.get("resolution")
    };
    B.prototype.getResolution = B.prototype.a;
    B.prototype.k = function (b, c) {
        return Math.max(re(b) / c[0], oe(b) / c[1])
    };
    function We(b) {
        var c = b.e, d = Math.log(c / b.H) / Math.log(2);
        return function (b) {
            return c / Math.pow(2, b * d)
        }
    }

    B.prototype.c = function () {
        return this.get("rotation")
    };
    B.prototype.getRotation = B.prototype.c;
    function Xe(b) {
        var c = b.e, d = Math.log(c / b.H) / Math.log(2);
        return function (b) {
            return Math.log(c / b) / Math.log(2) / d
        }
    }

    function Ye(b) {
        var c = b.b(), d = b.p, e = b.a();
        b = b.c();
        return {center: c.slice(), projection: m(d) ? d : null, resolution: e, rotation: b}
    }

    l = B.prototype;
    l.ki = function () {
        var b, c = this.a();
        if (m(c)) {
            var d, e = 0;
            do {
                d = this.constrainResolution(this.e, e);
                if (d == c) {
                    b = e;
                    break
                }
                ++e
            } while (d > this.H)
        }
        return m(b) ? this.o + b : b
    };
    l.pe = function (b, c) {
        if (!se(b)) {
            this.Ha(le(b));
            var d = this.k(b, c), e = this.constrainResolution(d, 0, 0);
            e < d && (e = this.constrainResolution(e, -1, 0));
            this.f(e)
        }
    };
    l.wh = function (b, c, d) {
        var e = m(d) ? d : {};
        d = m(e.padding) ? e.padding : [0, 0, 0, 0];
        var f = m(e.constrainResolution) ? e.constrainResolution : !0, g = m(e.nearest) ? e.nearest : !1, h;
        m(e.minResolution) ? h = e.minResolution : m(e.maxZoom) ? h = this.constrainResolution(this.e, e.maxZoom - this.o, 0) : h = 0;
        var k = b.j, n = this.c(), e = Math.cos(-n), n = Math.sin(-n), p = Infinity, q = Infinity, r = -Infinity, s = -Infinity;
        b = b.B;
        for (var u = 0, z = k.length; u < z; u += b)var y = k[u] * e - k[u + 1] * n, A = k[u] * n + k[u + 1] * e, p = Math.min(p, y), q = Math.min(q, A), r = Math.max(r, y), s = Math.max(s,
            A);
        c = this.k([p, q, r, s], [c[0] - d[1] - d[3], c[1] - d[0] - d[2]]);
        c = isNaN(c) ? h : Math.max(c, h);
        f && (h = this.constrainResolution(c, 0, 0), !g && h < c && (h = this.constrainResolution(h, -1, 0)), c = h);
        this.f(c);
        n = -n;
        g = (p + r) / 2 + (d[1] - d[3]) / 2 * c;
        d = (q + s) / 2 + (d[0] - d[2]) / 2 * c;
        this.Ha([g * e - d * n, d * e + g * n])
    };
    l.oh = function (b, c, d) {
        var e = this.c(), f = Math.cos(-e), e = Math.sin(-e), g = b[0] * f - b[1] * e;
        b = b[1] * f + b[0] * e;
        var h = this.a(), g = g + (c[0] / 2 - d[0]) * h;
        b += (d[1] - c[1] / 2) * h;
        e = -e;
        this.Ha([g * f - b * e, b * f + g * e])
    };
    l.rotate = function (b, c) {
        if (m(c)) {
            var d, e = this.b();
            m(e) && (d = [e[0] - c[0], e[1] - c[1]], Bd(d, b - this.c()), wd(d, c));
            this.Ha(d)
        }
        this.r(b)
    };
    l.Ha = function (b) {
        this.set("center", b)
    };
    B.prototype.setCenter = B.prototype.Ha;
    function Ze(b, c) {
        b.q[1] += c
    }

    B.prototype.f = function (b) {
        this.set("resolution", b)
    };
    B.prototype.setResolution = B.prototype.f;
    B.prototype.r = function (b) {
        this.set("rotation", b)
    };
    B.prototype.setRotation = B.prototype.r;
    B.prototype.S = function (b) {
        b = this.constrainResolution(this.e, b - this.o, 0);
        this.f(b)
    };
    function $e(b) {
        return 1 - Math.pow(1 - b, 3)
    };
    function af(b) {
        return 3 * b * b - 2 * b * b * b
    }

    function bf(b) {
        return b
    }

    function cf(b) {
        return .5 > b ? af(2 * b) : 1 - af(2 * (b - .5))
    };
    function df(b) {
        var c = b.source, d = m(b.start) ? b.start : ta(), e = c[0], f = c[1], g = m(b.duration) ? b.duration : 1E3, h = m(b.easing) ? b.easing : af;
        return function (b, c) {
            if (c.time < d)return c.animate = !0, c.viewHints[0] += 1, !0;
            if (c.time < d + g) {
                var p = 1 - h((c.time - d) / g), q = e - c.viewState.center[0], r = f - c.viewState.center[1];
                c.animate = !0;
                c.viewState.center[0] += p * q;
                c.viewState.center[1] += p * r;
                c.viewHints[0] += 1;
                return !0
            }
            return !1
        }
    }

    function ef(b) {
        var c = m(b.rotation) ? b.rotation : 0, d = m(b.start) ? b.start : ta(), e = m(b.duration) ? b.duration : 1E3, f = m(b.easing) ? b.easing : af, g = m(b.anchor) ? b.anchor : null;
        return function (b, k) {
            if (k.time < d)return k.animate = !0, k.viewHints[0] += 1, !0;
            if (k.time < d + e) {
                var n = 1 - f((k.time - d) / e), n = (c - k.viewState.rotation) * n;
                k.animate = !0;
                k.viewState.rotation += n;
                if (null !== g) {
                    var p = k.viewState.center;
                    p[0] -= g[0];
                    p[1] -= g[1];
                    Bd(p, n);
                    wd(p, g)
                }
                k.viewHints[0] += 1;
                return !0
            }
            return !1
        }
    }

    function ff(b) {
        var c = b.resolution, d = m(b.start) ? b.start : ta(), e = m(b.duration) ? b.duration : 1E3, f = m(b.easing) ? b.easing : af;
        return function (b, h) {
            if (h.time < d)return h.animate = !0, h.viewHints[0] += 1, !0;
            if (h.time < d + e) {
                var k = 1 - f((h.time - d) / e), n = c - h.viewState.resolution;
                h.animate = !0;
                h.viewState.resolution += k * n;
                h.viewHints[0] += 1;
                return !0
            }
            return !1
        }
    };
    function gf(b, c, d, e) {
        return m(e) ? (e[0] = b, e[1] = c, e[2] = d, e) : [b, c, d]
    }

    function hf(b, c, d) {
        return b + "/" + c + "/" + d
    }

    function jf(b) {
        var c = b[0], d = Array(c), e = 1 << c - 1, f, g;
        for (f = 0; f < c; ++f)g = 48, b[1] & e && (g += 1), b[2] & e && (g += 2), d[f] = String.fromCharCode(g), e >>= 1;
        return d.join("")
    }

    function kf(b) {
        return hf(b[0], b[1], b[2])
    };
    function lf(b, c, d, e) {
        this.a = b;
        this.c = c;
        this.b = d;
        this.d = e
    }

    function mf(b, c, d, e, f) {
        return m(f) ? (f.a = b, f.c = c, f.b = d, f.d = e, f) : new lf(b, c, d, e)
    }

    lf.prototype.contains = function (b) {
        return nf(this, b[1], b[2])
    };
    function nf(b, c, d) {
        return b.a <= c && c <= b.c && b.b <= d && d <= b.d
    }

    function of(b, c) {
        return b.a == c.a && b.b == c.b && b.c == c.c && b.d == c.d
    };
    function pf(b) {
        this.d = b.html;
        this.a = m(b.tileRanges) ? b.tileRanges : null
    }

    pf.prototype.b = function () {
        return this.d
    };
    var qf = !Gb || Gb && 9 <= Sb;
    !Hb && !Gb || Gb && Gb && 9 <= Sb || Hb && Pb("1.9.1");
    Gb && Pb("9");
    Eb("area base br col command embed hr img input keygen link meta param source track wbr".split(" "));
    Eb("action", "cite", "data", "formaction", "href", "manifest", "poster", "src");
    Eb("embed", "iframe", "link", "object", "script", "style", "template");
    function rf(b, c) {
        this.x = m(b) ? b : 0;
        this.y = m(c) ? c : 0
    }

    l = rf.prototype;
    l.clone = function () {
        return new rf(this.x, this.y)
    };
    l.ceil = function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    };
    l.floor = function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    };
    l.round = function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    };
    l.scale = function (b, c) {
        var d = ja(c) ? c : b;
        this.x *= b;
        this.y *= d;
        return this
    };
    function sf(b, c) {
        this.width = b;
        this.height = c
    }

    l = sf.prototype;
    l.clone = function () {
        return new sf(this.width, this.height)
    };
    l.la = function () {
        return !(this.width * this.height)
    };
    l.ceil = function () {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    l.floor = function () {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    l.round = function () {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    l.scale = function (b, c) {
        var d = ja(c) ? c : b;
        this.width *= b;
        this.height *= d;
        return this
    };
    function tf(b) {
        return b ? new uf(vf(b)) : xa || (xa = new uf)
    }

    function wf(b) {
        var c = document;
        return ia(b) ? c.getElementById(b) : b
    }

    function xf(b, c) {
        ob(c, function (c, e) {
            "style" == e ? b.style.cssText = c : "class" == e ? b.className = c : "for" == e ? b.htmlFor = c : e in yf ? b.setAttribute(yf[e], c) : 0 == e.lastIndexOf("aria-", 0) || 0 == e.lastIndexOf("data-", 0) ? b.setAttribute(e, c) : b[e] = c
        })
    }

    var yf = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        frameborder: "frameBorder",
        height: "height",
        maxlength: "maxLength",
        role: "role",
        rowspan: "rowSpan",
        type: "type",
        usemap: "useMap",
        valign: "vAlign",
        width: "width"
    };

    function zf(b) {
        b = b.document.documentElement;
        return new sf(b.clientWidth, b.clientHeight)
    }

    function Af(b, c, d) {
        var e = arguments, f = document, g = e[0], h = e[1];
        if (!qf && h && (h.name || h.type)) {
            g = ["<", g];
            h.name && g.push(' name="', Ba(h.name), '"');
            if (h.type) {
                g.push(' type="', Ba(h.type), '"');
                var k = {};
                Db(k, h);
                delete k.type;
                h = k
            }
            g.push(">");
            g = g.join("")
        }
        g = f.createElement(g);
        h && (ia(h) ? g.className = h : ga(h) ? g.className = h.join(" ") : xf(g, h));
        2 < e.length && Bf(f, g, e, 2);
        return g
    }

    function Bf(b, c, d, e) {
        function f(d) {
            d && c.appendChild(ia(d) ? b.createTextNode(d) : d)
        }

        for (; e < d.length; e++) {
            var g = d[e];
            !ha(g) || la(g) && 0 < g.nodeType ? f(g) : Qa(Cf(g) ? $a(g) : g, f)
        }
    }

    function Df(b) {
        return document.createElement(b)
    }

    function Ef(b, c) {
        Bf(vf(b), b, arguments, 1)
    }

    function Ff(b) {
        for (var c; c = b.firstChild;)b.removeChild(c)
    }

    function Gf(b, c, d) {
        b.insertBefore(c, b.childNodes[d] || null)
    }

    function Hf(b) {
        b && b.parentNode && b.parentNode.removeChild(b)
    }

    function If(b, c) {
        var d = c.parentNode;
        d && d.replaceChild(b, c)
    }

    function Jf(b) {
        if (void 0 != b.firstElementChild)b = b.firstElementChild; else for (b = b.firstChild; b && 1 != b.nodeType;)b = b.nextSibling;
        return b
    }

    function vf(b) {
        return 9 == b.nodeType ? b : b.ownerDocument || b.document
    }

    function Cf(b) {
        if (b && "number" == typeof b.length) {
            if (la(b))return "function" == typeof b.item || "string" == typeof b.item;
            if (ka(b))return "function" == typeof b.item
        }
        return !1
    }

    function uf(b) {
        this.a = b || ba.document || document
    }

    function Kf() {
        return !0
    }

    function Lf(b) {
        var c = b.a;
        b = Ib ? c.body || c.documentElement : c.documentElement;
        c = c.parentWindow || c.defaultView;
        return Gb && Pb("10") && c.pageYOffset != b.scrollTop ? new rf(b.scrollLeft, b.scrollTop) : new rf(c.pageXOffset || b.scrollLeft, c.pageYOffset || b.scrollTop)
    }

    uf.prototype.appendChild = function (b, c) {
        b.appendChild(c)
    };
    uf.prototype.contains = function (b, c) {
        if (b.contains && 1 == c.nodeType)return b == c || b.contains(c);
        if ("undefined" != typeof b.compareDocumentPosition)return b == c || Boolean(b.compareDocumentPosition(c) & 16);
        for (; c && b != c;)c = c.parentNode;
        return c == b
    };
    function Mf(b, c) {
        var d = Df("CANVAS");
        m(b) && (d.width = b);
        m(c) && (d.height = c);
        return d.getContext("2d")
    }

    var Nf = function () {
        var b;
        return function () {
            if (!m(b))if (ba.getComputedStyle) {
                var c = Df("P"), d, e = {
                    webkitTransform: "-webkit-transform",
                    OTransform: "-o-transform",
                    msTransform: "-ms-transform",
                    MozTransform: "-moz-transform",
                    transform: "transform"
                };
                document.body.appendChild(c);
                for (var f in e)f in c.style && (c.style[f] = "translate(1px,1px)", d = ba.getComputedStyle(c).getPropertyValue(e[f]));
                Hf(c);
                b = d && "none" !== d
            } else b = !1;
            return b
        }
    }(), Of = function () {
        var b;
        return function () {
            if (!m(b))if (ba.getComputedStyle) {
                var c = Df("P"),
                    d, e = {
                        webkitTransform: "-webkit-transform",
                        OTransform: "-o-transform",
                        msTransform: "-ms-transform",
                        MozTransform: "-moz-transform",
                        transform: "transform"
                    };
                document.body.appendChild(c);
                for (var f in e)f in c.style && (c.style[f] = "translate3d(1px,1px,1px)", d = ba.getComputedStyle(c).getPropertyValue(e[f]));
                Hf(c);
                b = d && "none" !== d
            } else b = !1;
            return b
        }
    }();

    function Pf(b, c) {
        var d = b.style;
        d.WebkitTransform = c;
        d.MozTransform = c;
        d.a = c;
        d.msTransform = c;
        d.transform = c;
        Gb && !Vb && (b.style.transformOrigin = "0 0")
    }

    function Qf(b, c) {
        var d;
        if (Of()) {
            if (m(6)) {
                var e = Array(16);
                for (d = 0; 16 > d; ++d)e[d] = c[d].toFixed(6);
                d = e.join(",")
            } else d = c.join(",");
            Pf(b, "matrix3d(" + d + ")")
        } else if (Nf()) {
            e = [c[0], c[1], c[4], c[5], c[12], c[13]];
            if (m(6)) {
                var f = Array(6);
                for (d = 0; 6 > d; ++d)f[d] = e[d].toFixed(6);
                d = f.join(",")
            } else d = e.join(",");
            Pf(b, "matrix(" + d + ")")
        } else b.style.left = Math.round(c[12]) + "px", b.style.top = Math.round(c[13]) + "px"
    };
    var Sf = ["experimental-webgl", "webgl", "webkit-3d", "moz-webgl"];

    function Tf(b, c) {
        var d, e, f = Sf.length;
        for (e = 0; e < f; ++e)try {
            if (d = b.getContext(Sf[e], c), null !== d)return d
        } catch (g) {
        }
        return null
    };
    var Uf, Vf = ba.devicePixelRatio || 1, Wf = "ArrayBuffer"in ba, Xf = !1, Yf = function () {
        if (!("HTMLCanvasElement"in ba))return !1;
        try {
            var b = Mf();
            if (null === b)return !1;
            m(b.setLineDash) && (Xf = !0);
            return !0
        } catch (c) {
            return !1
        }
    }(), Zf = "DeviceOrientationEvent"in ba, $f = "geolocation"in ba.navigator, ag = "ontouchstart"in ba, bg = "PointerEvent"in ba, cg = !!ba.navigator.msPointerEnabled, dg = !1, eg, fg = [];
    if ("WebGLRenderingContext"in ba)try {
        var gg = Df("CANVAS"), hg = Tf(gg, {vh: !0});
        null !== hg && (dg = !0, eg = hg.getParameter(hg.MAX_TEXTURE_SIZE), fg = hg.getSupportedExtensions())
    } catch (ig) {
    }
    Uf = dg;
    va = fg;
    ua = eg;
    function jg(b, c, d) {
        rc.call(this, b, d);
        this.element = c
    }

    v(jg, rc);
    function kg(b) {
        rd.call(this);
        this.a = m(b) ? b : [];
        lg(this)
    }

    v(kg, rd);
    l = kg.prototype;
    l.clear = function () {
        for (; 0 < this.Ib();)this.pop()
    };
    l.ye = function (b) {
        var c, d;
        c = 0;
        for (d = b.length; c < d; ++c)this.push(b[c]);
        return this
    };
    l.forEach = function (b, c) {
        Qa(this.a, b, c)
    };
    l.kj = function () {
        return this.a
    };
    l.item = function (b) {
        return this.a[b]
    };
    l.Ib = function () {
        return this.get("length")
    };
    l.zd = function (b, c) {
        bb(this.a, b, 0, c);
        lg(this);
        this.dispatchEvent(new jg("add", c, this))
    };
    l.pop = function () {
        return this.Le(this.Ib() - 1)
    };
    l.push = function (b) {
        var c = this.a.length;
        this.zd(c, b);
        return c
    };
    l.remove = function (b) {
        var c = this.a, d, e;
        d = 0;
        for (e = c.length; d < e; ++d)if (c[d] === b)return this.Le(d)
    };
    l.Le = function (b) {
        var c = this.a[b];
        Oa.splice.call(this.a, b, 1);
        lg(this);
        this.dispatchEvent(new jg("remove", c, this));
        return c
    };
    l.Vl = function (b, c) {
        var d = this.Ib();
        if (b < d)d = this.a[b], this.a[b] = c, this.dispatchEvent(new jg("remove", d, this)), this.dispatchEvent(new jg("add", c, this)); else {
            for (; d < b; ++d)this.zd(d, void 0);
            this.zd(b, c)
        }
    };
    function lg(b) {
        b.set("length", b.a.length)
    };
    var mg = /^#(?:[0-9a-f]{3}){1,2}$/i, ng = /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i, og = /^(?:rgba)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|1|0\.\d{0,10})\)$/i;

    function pg(b) {
        return ga(b) ? b : qg(b)
    }

    function rg(b) {
        if (!ia(b)) {
            var c = b[0];
            c != (c | 0) && (c = c + .5 | 0);
            var d = b[1];
            d != (d | 0) && (d = d + .5 | 0);
            var e = b[2];
            e != (e | 0) && (e = e + .5 | 0);
            b = "rgba(" + c + "," + d + "," + e + "," + b[3] + ")"
        }
        return b
    }

    var qg = function () {
        var b = {}, c = 0;
        return function (d) {
            var e;
            if (b.hasOwnProperty(d))e = b[d]; else {
                if (1024 <= c) {
                    e = 0;
                    for (var f in b)0 === (e++ & 3) && (delete b[f], --c)
                }
                var g, h;
                mg.exec(d) ? (h = 3 == d.length - 1 ? 1 : 2, e = parseInt(d.substr(1 + 0 * h, h), 16), f = parseInt(d.substr(1 + 1 * h, h), 16), g = parseInt(d.substr(1 + 2 * h, h), 16), 1 == h && (e = (e << 4) + e, f = (f << 4) + f, g = (g << 4) + g), e = [e, f, g, 1]) : (h = og.exec(d)) ? (e = Number(h[1]), f = Number(h[2]), g = Number(h[3]), h = Number(h[4]), e = [e, f, g, h], e = sg(e, e)) : (h = ng.exec(d)) ? (e = Number(h[1]), f = Number(h[2]), g = Number(h[3]),
                    e = [e, f, g, 1], e = sg(e, e)) : e = void 0;
                b[d] = e;
                ++c
            }
            return e
        }
    }();

    function sg(b, c) {
        var d = m(c) ? c : [];
        d[0] = Wb(b[0] + .5 | 0, 0, 255);
        d[1] = Wb(b[1] + .5 | 0, 0, 255);
        d[2] = Wb(b[2] + .5 | 0, 0, 255);
        d[3] = Wb(b[3], 0, 1);
        return d
    };
    function tg() {
        this.g = Id();
        this.d = void 0;
        this.a = Id();
        this.c = void 0;
        this.b = Id();
        this.e = void 0;
        this.f = Id();
        this.i = void 0;
        this.n = Id()
    }

    function ug(b, c, d, e, f) {
        var g = !1;
        m(c) && c !== b.d && (g = b.a, Md(g), g[12] = c, g[13] = c, g[14] = c, g[15] = 1, b.d = c, g = !0);
        if (m(d) && d !== b.c) {
            g = b.b;
            Md(g);
            g[0] = d;
            g[5] = d;
            g[10] = d;
            g[15] = 1;
            var h = -.5 * d + .5;
            g[12] = h;
            g[13] = h;
            g[14] = h;
            g[15] = 1;
            b.c = d;
            g = !0
        }
        m(e) && e !== b.e && (g = Math.cos(e), h = Math.sin(e), Jd(b.f, .213 + .787 * g - .213 * h, .213 - .213 * g + .143 * h, .213 - .213 * g - .787 * h, 0, .715 - .715 * g - .715 * h, .715 + .285 * g + .14 * h, .715 - .715 * g + .715 * h, 0, .072 - .072 * g + .928 * h, .072 - .072 * g - .283 * h, .072 + .928 * g + .072 * h, 0, 0, 0, 0, 1), b.e = e, g = !0);
        m(f) && f !== b.i && (Jd(b.n, .213 + .787 *
        f, .213 - .213 * f, .213 - .213 * f, 0, .715 - .715 * f, .715 + .285 * f, .715 - .715 * f, 0, .072 - .072 * f, .072 - .072 * f, .072 + .928 * f, 0, 0, 0, 0, 1), b.i = f, g = !0);
        g && (g = b.g, Md(g), m(d) && Nd(g, b.b, g), m(c) && Nd(g, b.a, g), m(f) && Nd(g, b.n, g), m(e) && Nd(g, b.f, g));
        return b.g
    };
    function vg(b) {
        if (b.classList)return b.classList;
        b = b.className;
        return ia(b) && b.match(/\S+/g) || []
    }

    function wg(b, c) {
        return b.classList ? b.classList.contains(c) : Wa(vg(b), c)
    }

    function xg(b, c) {
        b.classList ? b.classList.add(c) : wg(b, c) || (b.className += 0 < b.className.length ? " " + c : c)
    }

    function yg(b, c) {
        b.classList ? b.classList.remove(c) : wg(b, c) && (b.className = Ra(vg(b), function (b) {
            return b != c
        }).join(" "))
    }

    function zg(b, c) {
        wg(b, c) ? yg(b, c) : xg(b, c)
    };
    function Ag(b, c, d, e) {
        this.top = b;
        this.right = c;
        this.bottom = d;
        this.left = e
    }

    l = Ag.prototype;
    l.clone = function () {
        return new Ag(this.top, this.right, this.bottom, this.left)
    };
    l.contains = function (b) {
        return this && b ? b instanceof Ag ? b.left >= this.left && b.right <= this.right && b.top >= this.top && b.bottom <= this.bottom : b.x >= this.left && b.x <= this.right && b.y >= this.top && b.y <= this.bottom : !1
    };
    l.ceil = function () {
        this.top = Math.ceil(this.top);
        this.right = Math.ceil(this.right);
        this.bottom = Math.ceil(this.bottom);
        this.left = Math.ceil(this.left);
        return this
    };
    l.floor = function () {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    };
    l.round = function () {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    };
    l.scale = function (b, c) {
        var d = ja(c) ? c : b;
        this.left *= b;
        this.right *= b;
        this.top *= d;
        this.bottom *= d;
        return this
    };
    function Bg(b, c, d, e) {
        this.left = b;
        this.top = c;
        this.width = d;
        this.height = e
    }

    l = Bg.prototype;
    l.clone = function () {
        return new Bg(this.left, this.top, this.width, this.height)
    };
    l.contains = function (b) {
        return b instanceof Bg ? this.left <= b.left && this.left + this.width >= b.left + b.width && this.top <= b.top && this.top + this.height >= b.top + b.height : b.x >= this.left && b.x <= this.left + this.width && b.y >= this.top && b.y <= this.top + this.height
    };
    function Cg(b, c) {
        var d = c.x < b.left ? b.left - c.x : Math.max(c.x - (b.left + b.width), 0), e = c.y < b.top ? b.top - c.y : Math.max(c.y - (b.top + b.height), 0);
        return d * d + e * e
    }

    l.distance = function (b) {
        return Math.sqrt(Cg(this, b))
    };
    l.ceil = function () {
        this.left = Math.ceil(this.left);
        this.top = Math.ceil(this.top);
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    l.floor = function () {
        this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    l.round = function () {
        this.left = Math.round(this.left);
        this.top = Math.round(this.top);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    l.scale = function (b, c) {
        var d = ja(c) ? c : b;
        this.left *= b;
        this.width *= b;
        this.top *= d;
        this.height *= d;
        return this
    };
    function Dg(b, c) {
        var d = vf(b);
        return d.defaultView && d.defaultView.getComputedStyle && (d = d.defaultView.getComputedStyle(b, null)) ? d[c] || d.getPropertyValue(c) || "" : ""
    }

    function Eg(b, c) {
        return Dg(b, c) || (b.currentStyle ? b.currentStyle[c] : null) || b.style && b.style[c]
    }

    function Fg(b, c, d) {
        var e;
        c instanceof rf ? (e = c.x, c = c.y) : (e = c, c = d);
        b.style.left = Gg(e);
        b.style.top = Gg(c)
    }

    function Hg(b) {
        var c;
        try {
            c = b.getBoundingClientRect()
        } catch (d) {
            return {left: 0, top: 0, right: 0, bottom: 0}
        }
        Gb && b.ownerDocument.body && (b = b.ownerDocument, c.left -= b.documentElement.clientLeft + b.body.clientLeft, c.top -= b.documentElement.clientTop + b.body.clientTop);
        return c
    }

    function Ig(b) {
        if (1 == b.nodeType)return b = Hg(b), new rf(b.left, b.top);
        var c = ka(b.Ah), d = b;
        b.targetTouches && b.targetTouches.length ? d = b.targetTouches[0] : c && b.a.targetTouches && b.a.targetTouches.length && (d = b.a.targetTouches[0]);
        return new rf(d.clientX, d.clientY)
    }

    function Gg(b) {
        "number" == typeof b && (b = b + "px");
        return b
    }

    function Jg(b) {
        var c = Kg;
        if ("none" != Eg(b, "display"))return c(b);
        var d = b.style, e = d.display, f = d.visibility, g = d.position;
        d.visibility = "hidden";
        d.position = "absolute";
        d.display = "inline";
        b = c(b);
        d.display = e;
        d.position = g;
        d.visibility = f;
        return b
    }

    function Kg(b) {
        var c = b.offsetWidth, d = b.offsetHeight, e = Ib && !c && !d;
        return m(c) && !e || !b.getBoundingClientRect ? new sf(c, d) : (b = Hg(b), new sf(b.right - b.left, b.bottom - b.top))
    }

    function Lg(b, c) {
        b.style.display = c ? "" : "none"
    }

    function Mg(b, c, d, e) {
        if (/^\d+px?$/.test(c))return parseInt(c, 10);
        var f = b.style[d], g = b.runtimeStyle[d];
        b.runtimeStyle[d] = b.currentStyle[d];
        b.style[d] = c;
        c = b.style[e];
        b.style[d] = f;
        b.runtimeStyle[d] = g;
        return c
    }

    function Ng(b, c) {
        var d = b.currentStyle ? b.currentStyle[c] : null;
        return d ? Mg(b, d, "left", "pixelLeft") : 0
    }

    function Og(b, c) {
        if (Gb) {
            var d = Ng(b, c + "Left"), e = Ng(b, c + "Right"), f = Ng(b, c + "Top"), g = Ng(b, c + "Bottom");
            return new Ag(f, e, g, d)
        }
        d = Dg(b, c + "Left");
        e = Dg(b, c + "Right");
        f = Dg(b, c + "Top");
        g = Dg(b, c + "Bottom");
        return new Ag(parseFloat(f), parseFloat(e), parseFloat(g), parseFloat(d))
    }

    var Pg = {thin: 2, medium: 4, thick: 6};

    function Qg(b, c) {
        if ("none" == (b.currentStyle ? b.currentStyle[c + "Style"] : null))return 0;
        var d = b.currentStyle ? b.currentStyle[c + "Width"] : null;
        return d in Pg ? Pg[d] : Mg(b, d, "left", "pixelLeft")
    }

    function Rg(b) {
        if (Gb && !(Gb && 9 <= Sb)) {
            var c = Qg(b, "borderLeft"), d = Qg(b, "borderRight"), e = Qg(b, "borderTop");
            b = Qg(b, "borderBottom");
            return new Ag(e, d, b, c)
        }
        c = Dg(b, "borderLeftWidth");
        d = Dg(b, "borderRightWidth");
        e = Dg(b, "borderTopWidth");
        b = Dg(b, "borderBottomWidth");
        return new Ag(parseFloat(e), parseFloat(d), parseFloat(b), parseFloat(c))
    };
    function Sg(b, c, d) {
        rc.call(this, b);
        this.map = c;
        this.frameState = m(d) ? d : null
    }

    v(Sg, rc);
    function Tg(b) {
        rd.call(this);
        this.element = m(b.element) ? b.element : null;
        this.a = this.i = null;
        this.q = [];
        this.render = m(b.render) ? b.render : ca;
        m(b.target) && this.b(b.target)
    }

    v(Tg, rd);
    Tg.prototype.P = function () {
        Hf(this.element);
        Tg.T.P.call(this)
    };
    Tg.prototype.f = function () {
        return this.a
    };
    Tg.prototype.setMap = function (b) {
        null === this.a || Hf(this.element);
        0 != this.q.length && (Qa(this.q, Xc), this.q.length = 0);
        this.a = b;
        null !== this.a && ((null === this.i ? b.H : this.i).appendChild(this.element), this.render !== ca && this.q.push(w(b, "postrender", this.render, !1, this)), b.render())
    };
    Tg.prototype.b = function (b) {
        this.i = wf(b)
    };
    function Ug(b) {
        b = m(b) ? b : {};
        this.r = Df("UL");
        this.o = Df("LI");
        this.r.appendChild(this.o);
        Lg(this.o, !1);
        this.c = m(b.collapsed) ? b.collapsed : !0;
        this.g = m(b.collapsible) ? b.collapsible : !0;
        this.g || (this.c = !1);
        var c = m(b.className) ? b.className : "ol-attribution", d = m(b.tipLabel) ? b.tipLabel : "Attributions", e = m(b.collapseLabel) ? b.collapseLabel : "\u00bb";
        this.D = ia(e) ? Af("SPAN", {}, e) : e;
        e = m(b.label) ? b.label : "i";
        this.H = ia(e) ? Af("SPAN", {}, e) : e;
        d = Af("BUTTON", {type: "button", title: d}, this.g && !this.c ? this.D : this.H);
        w(d, "click",
            this.Ej, !1, this);
        w(d, ["mouseout", vc], function () {
            this.blur()
        }, !1);
        c = Af("DIV", c + " ol-unselectable ol-control" + (this.c && this.g ? " ol-collapsed" : "") + (this.g ? "" : " ol-uncollapsible"), this.r, d);
        Tg.call(this, {element: c, render: m(b.render) ? b.render : Vg, target: b.target});
        this.p = !0;
        this.k = {};
        this.e = {};
        this.N = {}
    }

    v(Ug, Tg);
    function Vg(b) {
        b = b.frameState;
        if (null === b)this.p && (Lg(this.element, !1), this.p = !1); else {
            var c, d, e, f, g, h, k, n, p, q = b.layerStatesArray, r = Bb(b.attributions), s = {};
            d = 0;
            for (c = q.length; d < c; d++)if (e = q[d].layer.a(), null !== e && (p = ma(e).toString(), n = e.f, null !== n))for (e = 0, f = n.length; e < f; e++)if (h = n[e], k = ma(h).toString(), !(k in r)) {
                g = b.usedTiles[p];
                var u;
                if (u = m(g))a:if (null === h.a)u = !0; else {
                    var z = u = void 0, y = void 0, A = void 0;
                    for (A in g)if (A in h.a)for (y = g[A], u = 0, z = h.a[A].length; u < z; ++u) {
                        var D = h.a[A][u];
                        if (D.a <= y.c && D.c >=
                            y.a && D.b <= y.d && D.d >= y.b) {
                            u = !0;
                            break a
                        }
                    }
                    u = !1
                }
                u ? (k in s && delete s[k], r[k] = h) : s[k] = h
            }
            c = [r, s];
            d = c[0];
            c = c[1];
            for (var x in this.k)x in d ? (this.e[x] || (Lg(this.k[x], !0), this.e[x] = !0), delete d[x]) : x in c ? (this.e[x] && (Lg(this.k[x], !1), delete this.e[x]), delete c[x]) : (Hf(this.k[x]), delete this.k[x], delete this.e[x]);
            for (x in d)p = Df("LI"), p.innerHTML = d[x].d, this.r.appendChild(p), this.k[x] = p, this.e[x] = !0;
            for (x in c)p = Df("LI"), p.innerHTML = c[x].d, Lg(p, !1), this.r.appendChild(p), this.k[x] = p;
            x = !wb(this.e) || !wb(b.logos);
            this.p != x && (Lg(this.element, x), this.p = x);
            x && wb(this.e) ? xg(this.element, "ol-logo-only") : yg(this.element, "ol-logo-only");
            var M;
            b = b.logos;
            x = this.N;
            for (M in x)M in b || (Hf(x[M]), delete x[M]);
            for (var Q in b)Q in x || (M = new Image, M.src = Q, d = b[Q], "" === d ? d = M : (d = Af("A", {href: d}), d.appendChild(M)), this.o.appendChild(d), x[Q] = d);
            Lg(this.o, !wb(b))
        }
    }

    l = Ug.prototype;
    l.Ej = function (b) {
        b.preventDefault();
        Wg(this)
    };
    function Wg(b) {
        zg(b.element, "ol-collapsed");
        b.c ? If(b.D, b.H) : If(b.H, b.D);
        b.c = !b.c
    }

    l.Dj = function () {
        return this.g
    };
    l.Gj = function (b) {
        this.g !== b && (this.g = b, zg(this.element, "ol-uncollapsible"), !b && this.c && Wg(this))
    };
    l.Fj = function (b) {
        this.g && this.c !== b && Wg(this)
    };
    l.Cj = function () {
        return this.c
    };
    function Xg(b) {
        b = m(b) ? b : {};
        var c = m(b.className) ? b.className : "ol-rotate", d = m(b.label) ? b.label : "\u21e7";
        this.c = null;
        ia(d) ? this.c = Af("SPAN", "ol-compass", d) : (this.c = d, xg(this.c, "ol-compass"));
        d = Af("BUTTON", {
            "class": c + "-reset",
            type: "button",
            title: m(b.tipLabel) ? b.tipLabel : "Reset rotation"
        }, this.c);
        w(d, "click", Xg.prototype.o, !1, this);
        w(d, ["mouseout", vc], function () {
            this.blur()
        }, !1);
        c = Af("DIV", c + " ol-unselectable ol-control", d);
        Tg.call(this, {element: c, render: m(b.render) ? b.render : Yg, target: b.target});
        this.g =
            m(b.duration) ? b.duration : 250;
        this.e = m(b.autoHide) ? b.autoHide : !0;
        this.k = void 0;
        this.e && xg(this.element, "ol-hidden")
    }

    v(Xg, Tg);
    Xg.prototype.o = function (b) {
        b.preventDefault();
        b = this.a;
        var c = b.a();
        if (null !== c) {
            for (var d = c.c(); d < -Math.PI;)d += 2 * Math.PI;
            for (; d > Math.PI;)d -= 2 * Math.PI;
            m(d) && (0 < this.g && b.La(ef({rotation: d, duration: this.g, easing: $e})), c.r(0))
        }
    };
    function Yg(b) {
        b = b.frameState;
        if (null !== b) {
            b = b.viewState.rotation;
            if (b != this.k) {
                var c = "rotate(" + 180 * b / Math.PI + "deg)";
                if (this.e) {
                    var d = this.element;
                    0 === b ? xg(d, "ol-hidden") : yg(d, "ol-hidden")
                }
                this.c.style.msTransform = c;
                this.c.style.webkitTransform = c;
                this.c.style.transform = c
            }
            this.k = b
        }
    };
    function Zg(b) {
        b = m(b) ? b : {};
        var c = m(b.className) ? b.className : "ol-zoom", d = m(b.delta) ? b.delta : 1, e = m(b.zoomOutLabel) ? b.zoomOutLabel : "\u2212", f = m(b.zoomOutTipLabel) ? b.zoomOutTipLabel : "Zoom out", g = Af("BUTTON", {
            "class": c + "-in",
            type: "button",
            title: m(b.zoomInTipLabel) ? b.zoomInTipLabel : "Zoom in"
        }, m(b.zoomInLabel) ? b.zoomInLabel : "+");
        w(g, "click", sa(Zg.prototype.e, d), !1, this);
        w(g, ["mouseout", vc], function () {
            this.blur()
        }, !1);
        e = Af("BUTTON", {"class": c + "-out", type: "button", title: f}, e);
        w(e, "click", sa(Zg.prototype.e,
            -d), !1, this);
        w(e, ["mouseout", vc], function () {
            this.blur()
        }, !1);
        c = Af("DIV", c + " ol-unselectable ol-control", g, e);
        Tg.call(this, {element: c, target: b.target});
        this.c = m(b.duration) ? b.duration : 250
    }

    v(Zg, Tg);
    Zg.prototype.e = function (b, c) {
        c.preventDefault();
        var d = this.a, e = d.a();
        if (null !== e) {
            var f = e.a();
            m(f) && (0 < this.c && d.La(ff({
                resolution: f,
                duration: this.c,
                easing: $e
            })), d = e.constrainResolution(f, b), e.f(d))
        }
    };
    function $g(b) {
        b = m(b) ? b : {};
        var c = new kg;
        (m(b.zoom) ? b.zoom : 1) && c.push(new Zg(b.zoomOptions));
        (m(b.rotate) ? b.rotate : 1) && c.push(new Xg(b.rotateOptions));
        (m(b.attribution) ? b.attribution : 1) && c.push(new Ug(b.attributionOptions));
        return c
    };
    var ah = Ib ? "webkitfullscreenchange" : Hb ? "mozfullscreenchange" : Gb ? "MSFullscreenChange" : "fullscreenchange";

    function bh() {
        var b = tf().a, c = b.body;
        return !!(c.webkitRequestFullscreen || c.mozRequestFullScreen && b.mozFullScreenEnabled || c.msRequestFullscreen && b.msFullscreenEnabled || c.requestFullscreen && b.fullscreenEnabled)
    }

    function ch(b) {
        b.webkitRequestFullscreen ? b.webkitRequestFullscreen() : b.mozRequestFullScreen ? b.mozRequestFullScreen() : b.msRequestFullscreen ? b.msRequestFullscreen() : b.requestFullscreen && b.requestFullscreen()
    }

    function dh() {
        var b = tf().a;
        return !!(b.webkitIsFullScreen || b.mozFullScreen || b.msFullscreenElement || b.fullscreenElement)
    };
    function eh(b) {
        b = m(b) ? b : {};
        this.e = m(b.className) ? b.className : "ol-full-screen";
        var c = m(b.label) ? b.label : "\u2194";
        this.c = ia(c) ? document.createTextNode(String(c)) : c;
        c = m(b.labelActive) ? b.labelActive : "\u00d7";
        this.g = ia(c) ? document.createTextNode(String(c)) : c;
        c = m(b.tipLabel) ? b.tipLabel : "Toggle full-screen";
        c = Af("BUTTON", {"class": this.e + "-" + dh(), type: "button", title: c}, this.c);
        w(c, "click", this.p, !1, this);
        w(c, ["mouseout", vc], function () {
            this.blur()
        }, !1);
        w(ba.document, ah, this.k, !1, this);
        var d = this.e + " ol-unselectable ol-control " +
            (bh() ? "" : "ol-unsupported"), c = Af("DIV", d, c);
        Tg.call(this, {element: c, target: b.target});
        this.o = m(b.keys) ? b.keys : !1
    }

    v(eh, Tg);
    eh.prototype.p = function (b) {
        b.preventDefault();
        bh() && (b = this.a, null !== b && (dh() ? (b = tf().a, b.webkitCancelFullScreen ? b.webkitCancelFullScreen() : b.mozCancelFullScreen ? b.mozCancelFullScreen() : b.msExitFullscreen ? b.msExitFullscreen() : b.exitFullscreen && b.exitFullscreen()) : (b = b.Fd(), b = wf(b), this.o ? b.mozRequestFullScreenWithKeys ? b.mozRequestFullScreenWithKeys() : b.webkitRequestFullscreen ? b.webkitRequestFullscreen() : ch(b) : ch(b))))
    };
    eh.prototype.k = function () {
        var b = this.a;
        dh() ? If(this.g, this.c) : If(this.c, this.g);
        null === b || b.q()
    };
    function fh(b) {
        b = m(b) ? b : {};
        var c = Af("DIV", m(b.className) ? b.className : "ol-mouse-position");
        Tg.call(this, {element: c, render: m(b.render) ? b.render : gh, target: b.target});
        w(this, vd("projection"), this.S, !1, this);
        m(b.coordinateFormat) && this.D(b.coordinateFormat);
        m(b.projection) && this.r(Be(b.projection));
        this.U = m(b.undefinedHTML) ? b.undefinedHTML : "";
        this.o = c.innerHTML;
        this.g = this.e = this.c = null
    }

    v(fh, Tg);
    function gh(b) {
        b = b.frameState;
        null === b ? this.c = null : this.c != b.viewState.projection && (this.c = b.viewState.projection, this.e = null);
        hh(this, this.g)
    }

    fh.prototype.S = function () {
        this.e = null
    };
    fh.prototype.k = function () {
        return this.get("coordinateFormat")
    };
    fh.prototype.getCoordinateFormat = fh.prototype.k;
    fh.prototype.p = function () {
        return this.get("projection")
    };
    fh.prototype.getProjection = fh.prototype.p;
    fh.prototype.H = function (b) {
        this.g = this.a.hd(b.a);
        hh(this, this.g)
    };
    fh.prototype.N = function () {
        hh(this, null);
        this.g = null
    };
    fh.prototype.setMap = function (b) {
        fh.T.setMap.call(this, b);
        null !== b && (b = b.b, this.q.push(w(b, "mousemove", this.H, !1, this), w(b, "mouseout", this.N, !1, this)))
    };
    fh.prototype.D = function (b) {
        this.set("coordinateFormat", b)
    };
    fh.prototype.setCoordinateFormat = fh.prototype.D;
    fh.prototype.r = function (b) {
        this.set("projection", b)
    };
    fh.prototype.setProjection = fh.prototype.r;
    function hh(b, c) {
        var d = b.U;
        if (null !== c && null !== b.c) {
            if (null === b.e) {
                var e = b.p();
                b.e = m(e) ? Ae(b.c, e) : Ue
            }
            e = b.a.ra(c);
            null !== e && (b.e(e, e), d = b.k(), d = m(d) ? d(e) : e.toString())
        }
        m(b.o) && d == b.o || (b.element.innerHTML = d, b.o = d)
    };
    function ih(b, c, d) {
        mc.call(this);
        this.c = b;
        this.b = d;
        this.a = c || window;
        this.d = ra(this.kf, this)
    }

    v(ih, mc);
    l = ih.prototype;
    l.aa = null;
    l.Qe = !1;
    l.start = function () {
        jh(this);
        this.Qe = !1;
        var b = kh(this), c = lh(this);
        b && !c && this.a.mozRequestAnimationFrame ? (this.aa = w(this.a, "MozBeforePaint", this.d), this.a.mozRequestAnimationFrame(null), this.Qe = !0) : this.aa = b && c ? b.call(this.a, this.d) : this.a.setTimeout(fd(this.d), 20)
    };
    function jh(b) {
        if (null != b.aa) {
            var c = kh(b), d = lh(b);
            c && !d && b.a.mozRequestAnimationFrame ? Xc(b.aa) : c && d ? d.call(b.a, b.aa) : b.a.clearTimeout(b.aa)
        }
        b.aa = null
    }

    l.kf = function () {
        this.Qe && this.aa && Xc(this.aa);
        this.aa = null;
        this.c.call(this.b, ta())
    };
    l.P = function () {
        jh(this);
        ih.T.P.call(this)
    };
    function kh(b) {
        b = b.a;
        return b.requestAnimationFrame || b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame || b.oRequestAnimationFrame || b.msRequestAnimationFrame || null
    }

    function lh(b) {
        b = b.a;
        return b.cancelAnimationFrame || b.cancelRequestAnimationFrame || b.webkitCancelRequestAnimationFrame || b.mozCancelRequestAnimationFrame || b.oCancelRequestAnimationFrame || b.msCancelRequestAnimationFrame || null
    };
    function mh(b) {
        ba.setTimeout(function () {
            throw b;
        }, 0)
    }

    function nh(b, c) {
        var d = b;
        c && (d = ra(b, c));
        d = oh(d);
        !ka(ba.setImmediate) || ba.Window && ba.Window.prototype.setImmediate == ba.setImmediate ? (ph || (ph = qh()), ph(d)) : ba.setImmediate(d)
    }

    var ph;

    function qh() {
        var b = ba.MessageChannel;
        "undefined" === typeof b && "undefined" !== typeof window && window.postMessage && window.addEventListener && (b = function () {
            var b = document.createElement("iframe");
            b.style.display = "none";
            b.src = "";
            document.documentElement.appendChild(b);
            var c = b.contentWindow, b = c.document;
            b.open();
            b.write("");
            b.close();
            var d = "callImmediate" + Math.random(), e = "file:" == c.location.protocol ? "*" : c.location.protocol + "//" + c.location.host, b = ra(function (b) {
                    if (("*" == e || b.origin == e) && b.data == d)this.port1.onmessage()
                },
                this);
            c.addEventListener("message", b, !1);
            this.port1 = {};
            this.port2 = {
                postMessage: function () {
                    c.postMessage(d, e)
                }
            }
        });
        if ("undefined" !== typeof b && !kb("Trident") && !kb("MSIE")) {
            var c = new b, d = {}, e = d;
            c.port1.onmessage = function () {
                if (m(d.next)) {
                    d = d.next;
                    var b = d.ff;
                    d.ff = null;
                    b()
                }
            };
            return function (b) {
                e.next = {ff: b};
                e = e.next;
                c.port2.postMessage(0)
            }
        }
        return "undefined" !== typeof document && "onreadystatechange"in document.createElement("script") ? function (b) {
            var c = document.createElement("script");
            c.onreadystatechange = function () {
                c.onreadystatechange =
                    null;
                c.parentNode.removeChild(c);
                c = null;
                b();
                b = null
            };
            document.documentElement.appendChild(c)
        } : function (b) {
            ba.setTimeout(b, 0)
        }
    }

    var oh = ed;

    function rh(b) {
        if ("function" == typeof b.ob)return b.ob();
        if (ia(b))return b.split("");
        if (ha(b)) {
            for (var c = [], d = b.length, e = 0; e < d; e++)c.push(b[e]);
            return c
        }
        return rb(b)
    }

    function sh(b, c) {
        if ("function" == typeof b.forEach)b.forEach(c, void 0); else if (ha(b) || ia(b))Qa(b, c, void 0); else {
            var d;
            if ("function" == typeof b.G)d = b.G(); else if ("function" != typeof b.ob)if (ha(b) || ia(b)) {
                d = [];
                for (var e = b.length, f = 0; f < e; f++)d.push(f)
            } else d = sb(b); else d = void 0;
            for (var e = rh(b), f = e.length, g = 0; g < f; g++)c.call(void 0, e[g], d && d[g], b)
        }
    };
    function th(b, c) {
        this.d = {};
        this.a = [];
        this.b = 0;
        var d = arguments.length;
        if (1 < d) {
            if (d % 2)throw Error("Uneven number of arguments");
            for (var e = 0; e < d; e += 2)this.set(arguments[e], arguments[e + 1])
        } else if (b) {
            b instanceof th ? (d = b.G(), e = b.ob()) : (d = sb(b), e = rb(b));
            for (var f = 0; f < d.length; f++)this.set(d[f], e[f])
        }
    }

    l = th.prototype;
    l.Tb = function () {
        return this.b
    };
    l.ob = function () {
        uh(this);
        for (var b = [], c = 0; c < this.a.length; c++)b.push(this.d[this.a[c]]);
        return b
    };
    l.G = function () {
        uh(this);
        return this.a.concat()
    };
    l.la = function () {
        return 0 == this.b
    };
    l.clear = function () {
        this.d = {};
        this.b = this.a.length = 0
    };
    l.remove = function (b) {
        return vh(this.d, b) ? (delete this.d[b], this.b--, this.a.length > 2 * this.b && uh(this), !0) : !1
    };
    function uh(b) {
        if (b.b != b.a.length) {
            for (var c = 0, d = 0; c < b.a.length;) {
                var e = b.a[c];
                vh(b.d, e) && (b.a[d++] = e);
                c++
            }
            b.a.length = d
        }
        if (b.b != b.a.length) {
            for (var f = {}, d = c = 0; c < b.a.length;)e = b.a[c], vh(f, e) || (b.a[d++] = e, f[e] = 1), c++;
            b.a.length = d
        }
    }

    l.get = function (b, c) {
        return vh(this.d, b) ? this.d[b] : c
    };
    l.set = function (b, c) {
        vh(this.d, b) || (this.b++, this.a.push(b));
        this.d[b] = c
    };
    l.forEach = function (b, c) {
        for (var d = this.G(), e = 0; e < d.length; e++) {
            var f = d[e], g = this.get(f);
            b.call(c, g, f, this)
        }
    };
    l.clone = function () {
        return new th(this)
    };
    function vh(b, c) {
        return Object.prototype.hasOwnProperty.call(b, c)
    };
    function wh() {
        this.a = ta()
    }

    new wh;
    wh.prototype.set = function (b) {
        this.a = b
    };
    wh.prototype.get = function () {
        return this.a
    };
    function xh(b) {
        id.call(this);
        this.Wc = b || window;
        this.ud = w(this.Wc, "resize", this.Ni, !1, this);
        this.vd = zf(this.Wc || window)
    }

    v(xh, id);
    l = xh.prototype;
    l.ud = null;
    l.Wc = null;
    l.vd = null;
    l.P = function () {
        xh.T.P.call(this);
        this.ud && (Xc(this.ud), this.ud = null);
        this.vd = this.Wc = null
    };
    l.Ni = function () {
        var b = zf(this.Wc || window), c = this.vd;
        b == c || b && c && b.width == c.width && b.height == c.height || (this.vd = b, this.dispatchEvent("resize"))
    };
    function yh(b, c, d, e, f) {
        if (!(Gb || Ib && Pb("525")))return !0;
        if (Jb && f)return zh(b);
        if (f && !e)return !1;
        ja(c) && (c = Ah(c));
        if (!d && (17 == c || 18 == c || Jb && 91 == c))return !1;
        if (Ib && e && d)switch (b) {
            case 220:
            case 219:
            case 221:
            case 192:
            case 186:
            case 189:
            case 187:
            case 188:
            case 190:
            case 191:
            case 192:
            case 222:
                return !1
        }
        if (Gb && e && c == b)return !1;
        switch (b) {
            case 13:
                return !0;
            case 27:
                return !Ib
        }
        return zh(b)
    }

    function zh(b) {
        if (48 <= b && 57 >= b || 96 <= b && 106 >= b || 65 <= b && 90 >= b || Ib && 0 == b)return !0;
        switch (b) {
            case 32:
            case 63:
            case 107:
            case 109:
            case 110:
            case 111:
            case 186:
            case 59:
            case 189:
            case 187:
            case 61:
            case 188:
            case 190:
            case 191:
            case 192:
            case 222:
            case 219:
            case 220:
            case 221:
                return !0;
            default:
                return !1
        }
    }

    function Ah(b) {
        if (Hb)b = Bh(b); else if (Jb && Ib)a:switch (b) {
            case 93:
                b = 91;
                break a
        }
        return b
    }

    function Bh(b) {
        switch (b) {
            case 61:
                return 187;
            case 59:
                return 186;
            case 173:
                return 189;
            case 224:
                return 91;
            case 0:
                return 224;
            default:
                return b
        }
    };
    function Ch(b, c) {
        id.call(this);
        b && Dh(this, b, c)
    }

    v(Ch, id);
    l = Ch.prototype;
    l.ba = null;
    l.Ad = null;
    l.ve = null;
    l.Bd = null;
    l.Qa = -1;
    l.Gb = -1;
    l.je = !1;
    var Eh = {
        3: 13,
        12: 144,
        63232: 38,
        63233: 40,
        63234: 37,
        63235: 39,
        63236: 112,
        63237: 113,
        63238: 114,
        63239: 115,
        63240: 116,
        63241: 117,
        63242: 118,
        63243: 119,
        63244: 120,
        63245: 121,
        63246: 122,
        63247: 123,
        63248: 44,
        63272: 46,
        63273: 36,
        63275: 35,
        63276: 33,
        63277: 34,
        63289: 144,
        63302: 45
    }, Fh = {
        Up: 38,
        Down: 40,
        Left: 37,
        Right: 39,
        Enter: 13,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        "U+007F": 46,
        Home: 36,
        End: 35,
        PageUp: 33,
        PageDown: 34,
        Insert: 45
    }, Gh = Gb || Ib && Pb("525"), Hh = Jb && Hb;
    Ch.prototype.a = function (b) {
        Ib && (17 == this.Qa && !b.n || 18 == this.Qa && !b.d || Jb && 91 == this.Qa && !b.k) && (this.Gb = this.Qa = -1);
        -1 == this.Qa && (b.n && 17 != b.f ? this.Qa = 17 : b.d && 18 != b.f ? this.Qa = 18 : b.k && 91 != b.f && (this.Qa = 91));
        Gh && !yh(b.f, this.Qa, b.c, b.n, b.d) ? this.handleEvent(b) : (this.Gb = Ah(b.f), Hh && (this.je = b.d))
    };
    Ch.prototype.d = function (b) {
        this.Gb = this.Qa = -1;
        this.je = b.d
    };
    Ch.prototype.handleEvent = function (b) {
        var c = b.a, d, e, f = c.altKey;
        Gb && "keypress" == b.type ? (d = this.Gb, e = 13 != d && 27 != d ? c.keyCode : 0) : Ib && "keypress" == b.type ? (d = this.Gb, e = 0 <= c.charCode && 63232 > c.charCode && zh(d) ? c.charCode : 0) : Fb ? (d = this.Gb, e = zh(d) ? c.keyCode : 0) : (d = c.keyCode || this.Gb, e = c.charCode || 0, Hh && (f = this.je), Jb && 63 == e && 224 == d && (d = 191));
        var g = d = Ah(d), h = c.keyIdentifier;
        d ? 63232 <= d && d in Eh ? g = Eh[d] : 25 == d && b.c && (g = 9) : h && h in Fh && (g = Fh[h]);
        this.Qa = g;
        b = new Ih(g, e, 0, c);
        b.d = f;
        this.dispatchEvent(b)
    };
    function Dh(b, c, d) {
        b.Bd && Jh(b);
        b.ba = c;
        b.Ad = w(b.ba, "keypress", b, d);
        b.ve = w(b.ba, "keydown", b.a, d, b);
        b.Bd = w(b.ba, "keyup", b.d, d, b)
    }

    function Jh(b) {
        b.Ad && (Xc(b.Ad), Xc(b.ve), Xc(b.Bd), b.Ad = null, b.ve = null, b.Bd = null);
        b.ba = null;
        b.Qa = -1;
        b.Gb = -1
    }

    Ch.prototype.P = function () {
        Ch.T.P.call(this);
        Jh(this)
    };
    function Ih(b, c, d, e) {
        xc.call(this, e);
        this.type = "key";
        this.f = b;
        this.i = c
    }

    v(Ih, xc);
    function Kh(b, c) {
        id.call(this);
        var d = this.ba = b;
        (d = la(d) && 1 == d.nodeType ? this.ba : this.ba ? this.ba.body : null) && Eg(d, "direction");
        this.a = w(this.ba, Hb ? "DOMMouseScroll" : "mousewheel", this, c)
    }

    v(Kh, id);
    Kh.prototype.handleEvent = function (b) {
        var c = 0, d = 0, e = 0;
        b = b.a;
        if ("mousewheel" == b.type) {
            d = 1;
            if (Gb || Ib && (Kb || Pb("532.0")))d = 40;
            e = Lh(-b.wheelDelta, d);
            m(b.wheelDeltaX) ? (c = Lh(-b.wheelDeltaX, d), d = Lh(-b.wheelDeltaY, d)) : d = e
        } else e = b.detail, 100 < e ? e = 3 : -100 > e && (e = -3), m(b.axis) && b.axis === b.HORIZONTAL_AXIS ? c = e : d = e;
        ja(this.d) && Wb(c, -this.d, this.d);
        ja(this.b) && (d = Wb(d, -this.b, this.b));
        c = new Mh(e, b, 0, d);
        this.dispatchEvent(c)
    };
    function Lh(b, c) {
        return Ib && (Jb || Lb) && 0 != b % c ? b : b / c
    }

    Kh.prototype.P = function () {
        Kh.T.P.call(this);
        Xc(this.a);
        this.a = null
    };
    function Mh(b, c, d, e) {
        xc.call(this, c);
        this.type = "mousewheel";
        this.detail = b;
        this.q = e
    }

    v(Mh, xc);
    function Nh(b, c, d) {
        rc.call(this, b);
        this.a = c;
        b = m(d) ? d : {};
        this.buttons = Oh(b);
        this.pressure = Ph(b, this.buttons);
        this.bubbles = zb(b, "bubbles", !1);
        this.cancelable = zb(b, "cancelable", !1);
        this.view = zb(b, "view", null);
        this.detail = zb(b, "detail", null);
        this.screenX = zb(b, "screenX", 0);
        this.screenY = zb(b, "screenY", 0);
        this.clientX = zb(b, "clientX", 0);
        this.clientY = zb(b, "clientY", 0);
        this.button = zb(b, "button", 0);
        this.relatedTarget = zb(b, "relatedTarget", null);
        this.pointerId = zb(b, "pointerId", 0);
        this.width = zb(b, "width", 0);
        this.height =
            zb(b, "height", 0);
        this.pointerType = zb(b, "pointerType", "");
        this.isPrimary = zb(b, "isPrimary", !1);
        c.preventDefault && (this.preventDefault = function () {
            c.preventDefault()
        })
    }

    v(Nh, rc);
    function Oh(b) {
        if (b.buttons || Qh)b = b.buttons; else switch (b.which) {
            case 1:
                b = 1;
                break;
            case 2:
                b = 4;
                break;
            case 3:
                b = 2;
                break;
            default:
                b = 0
        }
        return b
    }

    function Ph(b, c) {
        var d = 0;
        b.pressure ? d = b.pressure : d = c ? .5 : 0;
        return d
    }

    var Qh = !1;
    try {
        Qh = 1 === (new MouseEvent("click", {buttons: 1})).buttons
    } catch (Rh) {
    }
    ;
    function Sh(b, c) {
        this.a = b;
        this.f = c
    };
    function Th(b) {
        Sh.call(this, b, {
            mousedown: this.Xi,
            mousemove: this.Yi,
            mouseup: this.aj,
            mouseover: this.$i,
            mouseout: this.Zi
        });
        this.d = b.d;
        this.b = []
    }

    v(Th, Sh);
    function Uh(b, c) {
        for (var d = b.b, e = c.clientX, f = c.clientY, g = 0, h = d.length, k; g < h && (k = d[g]); g++) {
            var n = Math.abs(f - k[1]);
            if (25 >= Math.abs(e - k[0]) && 25 >= n)return !0
        }
        return !1
    }

    function Vh(b) {
        var c = Xh(b, b.a), d = c.preventDefault;
        c.preventDefault = function () {
            b.preventDefault();
            d()
        };
        c.pointerId = 1;
        c.isPrimary = !0;
        c.pointerType = "mouse";
        return c
    }

    l = Th.prototype;
    l.Xi = function (b) {
        if (!Uh(this, b)) {
            (1).toString()in this.d && this.cancel(b);
            var c = Vh(b);
            this.d[(1).toString()] = b;
            Yh(this.a, Zh, c, b)
        }
    };
    l.Yi = function (b) {
        if (!Uh(this, b)) {
            var c = Vh(b);
            Yh(this.a, $h, c, b)
        }
    };
    l.aj = function (b) {
        if (!Uh(this, b)) {
            var c = this.d[(1).toString()];
            c && c.button === b.button && (c = Vh(b), Yh(this.a, ai, c, b), yb(this.d, (1).toString()))
        }
    };
    l.$i = function (b) {
        if (!Uh(this, b)) {
            var c = Vh(b);
            bi(this.a, c, b)
        }
    };
    l.Zi = function (b) {
        if (!Uh(this, b)) {
            var c = Vh(b);
            ci(this.a, c, b)
        }
    };
    l.cancel = function (b) {
        var c = Vh(b);
        this.a.cancel(c, b);
        yb(this.d, (1).toString())
    };
    function di(b) {
        Sh.call(this, b, {
            MSPointerDown: this.fj,
            MSPointerMove: this.gj,
            MSPointerUp: this.jj,
            MSPointerOut: this.hj,
            MSPointerOver: this.ij,
            MSPointerCancel: this.ej,
            MSGotPointerCapture: this.cj,
            MSLostPointerCapture: this.dj
        });
        this.d = b.d;
        this.b = ["", "unavailable", "touch", "pen", "mouse"]
    }

    v(di, Sh);
    function ei(b, c) {
        var d = c;
        ja(c.a.pointerType) && (d = Xh(c, c.a), d.pointerType = b.b[c.a.pointerType]);
        return d
    }

    l = di.prototype;
    l.fj = function (b) {
        this.d[b.a.pointerId] = b;
        var c = ei(this, b);
        Yh(this.a, Zh, c, b)
    };
    l.gj = function (b) {
        var c = ei(this, b);
        Yh(this.a, $h, c, b)
    };
    l.jj = function (b) {
        var c = ei(this, b);
        Yh(this.a, ai, c, b);
        yb(this.d, b.a.pointerId)
    };
    l.hj = function (b) {
        var c = ei(this, b);
        ci(this.a, c, b)
    };
    l.ij = function (b) {
        var c = ei(this, b);
        bi(this.a, c, b)
    };
    l.ej = function (b) {
        var c = ei(this, b);
        this.a.cancel(c, b);
        yb(this.d, b.a.pointerId)
    };
    l.dj = function (b) {
        this.a.dispatchEvent(new Nh("lostpointercapture", b, b.a))
    };
    l.cj = function (b) {
        this.a.dispatchEvent(new Nh("gotpointercapture", b, b.a))
    };
    function fi(b) {
        Sh.call(this, b, {
            pointerdown: this.ql,
            pointermove: this.rl,
            pointerup: this.ul,
            pointerout: this.sl,
            pointerover: this.tl,
            pointercancel: this.pl,
            gotpointercapture: this.li,
            lostpointercapture: this.Wi
        })
    }

    v(fi, Sh);
    l = fi.prototype;
    l.ql = function (b) {
        gi(this.a, b)
    };
    l.rl = function (b) {
        gi(this.a, b)
    };
    l.ul = function (b) {
        gi(this.a, b)
    };
    l.sl = function (b) {
        gi(this.a, b)
    };
    l.tl = function (b) {
        gi(this.a, b)
    };
    l.pl = function (b) {
        gi(this.a, b)
    };
    l.Wi = function (b) {
        gi(this.a, b)
    };
    l.li = function (b) {
        gi(this.a, b)
    };
    function hi(b, c) {
        Sh.call(this, b, {touchstart: this.nm, touchmove: this.mm, touchend: this.lm, touchcancel: this.km});
        this.d = b.d;
        this.g = c;
        this.b = void 0;
        this.e = 0;
        this.c = void 0
    }

    v(hi, Sh);
    l = hi.prototype;
    l.og = function () {
        this.e = 0;
        this.c = void 0
    };
    function ii(b, c, d) {
        c = Xh(c, d);
        c.pointerId = d.identifier + 2;
        c.bubbles = !0;
        c.cancelable = !0;
        c.detail = b.e;
        c.button = 0;
        c.buttons = 1;
        c.width = d.webkitRadiusX || d.radiusX || 0;
        c.height = d.webkitRadiusY || d.radiusY || 0;
        c.pressure = d.webkitForce || d.force || .5;
        c.isPrimary = b.b === d.identifier;
        c.pointerType = "touch";
        c.clientX = d.clientX;
        c.clientY = d.clientY;
        c.screenX = d.screenX;
        c.screenY = d.screenY;
        return c
    }

    function ji(b, c, d) {
        function e() {
            c.preventDefault()
        }

        var f = Array.prototype.slice.call(c.a.changedTouches), g = f.length, h, k;
        for (h = 0; h < g; ++h)k = ii(b, c, f[h]), k.preventDefault = e, d.call(b, c, k)
    }

    l.nm = function (b) {
        var c = b.a.touches, d = sb(this.d), e = d.length;
        if (e >= c.length) {
            var f = [], g, h, k;
            for (g = 0; g < e; ++g) {
                h = d[g];
                k = this.d[h];
                var n;
                if (!(n = 1 == h))a:{
                    n = c.length;
                    for (var p = void 0, q = 0; q < n; q++)if (p = c[q], p.identifier === h - 2) {
                        n = !0;
                        break a
                    }
                    n = !1
                }
                n || f.push(k.dc)
            }
            for (g = 0; g < f.length; ++g)this.ke(b, f[g])
        }
        c = qb(this.d);
        if (0 === c || 1 === c && (1).toString()in this.d)this.b = b.a.changedTouches[0].identifier, m(this.c) && ba.clearTimeout(this.c);
        ki(this, b);
        this.e++;
        ji(this, b, this.ll)
    };
    l.ll = function (b, c) {
        this.d[c.pointerId] = {target: c.target, dc: c, $f: c.target};
        var d = this.a;
        c.bubbles = !0;
        Yh(d, li, c, b);
        d = this.a;
        c.bubbles = !1;
        Yh(d, mi, c, b);
        Yh(this.a, Zh, c, b)
    };
    l.mm = function (b) {
        b.preventDefault();
        ji(this, b, this.bj)
    };
    l.bj = function (b, c) {
        var d = this.d[c.pointerId];
        if (d) {
            var e = d.dc, f = d.$f;
            Yh(this.a, $h, c, b);
            e && f !== c.target && (e.relatedTarget = c.target, c.relatedTarget = f, e.target = f, c.target ? (ci(this.a, e, b), bi(this.a, c, b)) : (c.target = f, c.relatedTarget = null, this.ke(b, c)));
            d.dc = c;
            d.$f = c.target
        }
    };
    l.lm = function (b) {
        ki(this, b);
        ji(this, b, this.om)
    };
    l.om = function (b, c) {
        Yh(this.a, ai, c, b);
        this.a.dc(c, b);
        var d = this.a;
        c.bubbles = !1;
        Yh(d, ni, c, b);
        yb(this.d, c.pointerId);
        c.isPrimary && (this.b = void 0, this.c = ba.setTimeout(ra(this.og, this), 200))
    };
    l.km = function (b) {
        ji(this, b, this.ke)
    };
    l.ke = function (b, c) {
        this.a.cancel(c, b);
        this.a.dc(c, b);
        var d = this.a;
        c.bubbles = !1;
        Yh(d, ni, c, b);
        yb(this.d, c.pointerId);
        c.isPrimary && (this.b = void 0, this.c = ba.setTimeout(ra(this.og, this), 200))
    };
    function ki(b, c) {
        var d = b.g.b, e = c.a.changedTouches[0];
        if (b.b === e.identifier) {
            var f = [e.clientX, e.clientY];
            d.push(f);
            ba.setTimeout(function () {
                Xa(d, f)
            }, 2500)
        }
    };
    function oi(b) {
        id.call(this);
        this.ba = b;
        this.d = {};
        this.b = {};
        this.a = [];
        bg ? pi(this, new fi(this)) : cg ? pi(this, new di(this)) : (b = new Th(this), pi(this, b), ag && pi(this, new hi(this, b)));
        b = this.a.length;
        for (var c, d = 0; d < b; d++)c = this.a[d], qi(this, sb(c.f))
    }

    v(oi, id);
    function pi(b, c) {
        var d = sb(c.f);
        d && (Qa(d, function (b) {
            var d = c.f[b];
            d && (this.b[b] = ra(d, c))
        }, b), b.a.push(c))
    }

    oi.prototype.c = function (b) {
        var c = this.b[b.type];
        c && c(b)
    };
    function qi(b, c) {
        Qa(c, function (b) {
            w(this.ba, b, this.c, !1, this)
        }, b)
    }

    function ri(b, c) {
        Qa(c, function (b) {
            Wc(this.ba, b, this.c, !1, this)
        }, b)
    }

    function Xh(b, c) {
        for (var d = {}, e, f = 0, g = si.length; f < g; f++)e = si[f][0], d[e] = b[e] || c[e] || si[f][1];
        return d
    }

    oi.prototype.dc = function (b, c) {
        b.bubbles = !0;
        Yh(this, ti, b, c)
    };
    oi.prototype.cancel = function (b, c) {
        Yh(this, ui, b, c)
    };
    function ci(b, c, d) {
        b.dc(c, d);
        c.target.contains(c.relatedTarget) || (c.bubbles = !1, Yh(b, ni, c, d))
    }

    function bi(b, c, d) {
        c.bubbles = !0;
        Yh(b, li, c, d);
        c.target.contains(c.relatedTarget) || (c.bubbles = !1, Yh(b, mi, c, d))
    }

    function Yh(b, c, d, e) {
        b.dispatchEvent(new Nh(c, e, d))
    }

    function gi(b, c) {
        b.dispatchEvent(new Nh(c.type, c, c.a))
    }

    oi.prototype.P = function () {
        for (var b = this.a.length, c, d = 0; d < b; d++)c = this.a[d], ri(this, sb(c.f));
        oi.T.P.call(this)
    };
    var $h = "pointermove", Zh = "pointerdown", ai = "pointerup", li = "pointerover", ti = "pointerout", mi = "pointerenter", ni = "pointerleave", ui = "pointercancel", si = [["bubbles", !1], ["cancelable", !1], ["view", null], ["detail", null], ["screenX", 0], ["screenY", 0], ["clientX", 0], ["clientY", 0], ["ctrlKey", !1], ["altKey", !1], ["shiftKey", !1], ["metaKey", !1], ["button", 0], ["relatedTarget", null], ["buttons", 0], ["pointerId", 0], ["width", 0], ["height", 0], ["pressure", 0], ["tiltX", 0], ["tiltY", 0], ["pointerType", ""], ["hwTimestamp", 0], ["isPrimary",
        !1], ["type", ""], ["target", null], ["currentTarget", null], ["which", 0]];

    function vi(b, c, d, e, f) {
        Sg.call(this, b, c, f);
        this.a = d;
        this.originalEvent = d.a;
        this.pixel = c.hd(this.originalEvent);
        this.coordinate = c.ra(this.pixel);
        this.dragging = m(e) ? e : !1
    }

    v(vi, Sg);
    vi.prototype.preventDefault = function () {
        vi.T.preventDefault.call(this);
        this.a.preventDefault()
    };
    vi.prototype.pb = function () {
        vi.T.pb.call(this);
        this.a.pb()
    };
    function wi(b, c, d, e, f) {
        vi.call(this, b, c, d.a, e, f);
        this.d = d
    }

    v(wi, vi);
    function xi(b) {
        id.call(this);
        this.b = b;
        this.e = 0;
        this.g = !1;
        this.d = this.n = this.c = null;
        b = this.b.b;
        this.q = 0;
        this.k = {};
        this.f = new oi(b);
        this.a = null;
        this.n = w(this.f, Zh, this.Ji, !1, this);
        this.i = w(this.f, $h, this.Ll, !1, this)
    }

    v(xi, id);
    function yi(b, c) {
        var d;
        d = new wi(zi, b.b, c);
        b.dispatchEvent(d);
        0 !== b.e ? (ba.clearTimeout(b.e), b.e = 0, d = new wi(Ai, b.b, c), b.dispatchEvent(d)) : b.e = ba.setTimeout(ra(function () {
            this.e = 0;
            var b = new wi(Bi, this.b, c);
            this.dispatchEvent(b)
        }, b), 250)
    }

    function Ci(b, c) {
        c.type == Di || c.type == Ei ? delete b.k[c.pointerId] : c.type == Fi && (b.k[c.pointerId] = !0);
        b.q = qb(b.k)
    }

    l = xi.prototype;
    l.vf = function (b) {
        Ci(this, b);
        var c = new wi(Di, this.b, b);
        this.dispatchEvent(c);
        !this.g && 0 === b.button && yi(this, this.d);
        0 === this.q && (Qa(this.c, Xc), this.c = null, this.g = !1, this.d = null, qc(this.a), this.a = null)
    };
    l.Ji = function (b) {
        Ci(this, b);
        var c = new wi(Fi, this.b, b);
        this.dispatchEvent(c);
        this.d = b;
        null === this.c && (this.a = new oi(document), this.c = [w(this.a, Gi, this.yj, !1, this), w(this.a, Di, this.vf, !1, this), w(this.f, Ei, this.vf, !1, this)])
    };
    l.yj = function (b) {
        if (b.clientX != this.d.clientX || b.clientY != this.d.clientY) {
            this.g = !0;
            var c = new wi(Hi, this.b, b, this.g);
            this.dispatchEvent(c)
        }
        b.preventDefault()
    };
    l.Ll = function (b) {
        this.dispatchEvent(new wi(b.type, this.b, b, null !== this.d && (b.clientX != this.d.clientX || b.clientY != this.d.clientY)))
    };
    l.P = function () {
        null !== this.i && (Xc(this.i), this.i = null);
        null !== this.n && (Xc(this.n), this.n = null);
        null !== this.c && (Qa(this.c, Xc), this.c = null);
        null !== this.a && (qc(this.a), this.a = null);
        null !== this.f && (qc(this.f), this.f = null);
        xi.T.P.call(this)
    };
    var Bi = "singleclick", zi = "click", Ai = "dblclick", Hi = "pointerdrag", Gi = "pointermove", Fi = "pointerdown", Di = "pointerup", Ei = "pointercancel", Ii = {
        Mm: Bi,
        Bm: zi,
        Cm: Ai,
        Fm: Hi,
        Im: Gi,
        Em: Fi,
        Lm: Di,
        Km: "pointerover",
        Jm: "pointerout",
        Gm: "pointerenter",
        Hm: "pointerleave",
        Dm: Ei
    };

    function Ji(b) {
        rd.call(this);
        this.g = Be(b.projection);
        this.f = m(b.attributions) ? b.attributions : null;
        this.D = b.logo;
        this.q = m(b.state) ? b.state : "ready"
    }

    v(Ji, rd);
    l = Ji.prototype;
    l.Jd = ca;
    l.Y = function () {
        return this.f
    };
    l.X = function () {
        return this.D
    };
    l.Z = function () {
        return this.g
    };
    l.$ = function () {
        return this.q
    };
    function Ki(b, c) {
        b.q = c;
        b.l()
    };
    function C(b) {
        rd.call(this);
        var c = Bb(b);
        c.brightness = m(b.brightness) ? b.brightness : 0;
        c.contrast = m(b.contrast) ? b.contrast : 1;
        c.hue = m(b.hue) ? b.hue : 0;
        c.opacity = m(b.opacity) ? b.opacity : 1;
        c.saturation = m(b.saturation) ? b.saturation : 1;
        c.visible = m(b.visible) ? b.visible : !0;
        c.maxResolution = m(b.maxResolution) ? b.maxResolution : Infinity;
        c.minResolution = m(b.minResolution) ? b.minResolution : 0;
        this.C(c)
    }

    v(C, rd);
    C.prototype.c = function () {
        return this.get("brightness")
    };
    C.prototype.getBrightness = C.prototype.c;
    C.prototype.f = function () {
        return this.get("contrast")
    };
    C.prototype.getContrast = C.prototype.f;
    C.prototype.e = function () {
        return this.get("hue")
    };
    C.prototype.getHue = C.prototype.e;
    function Li(b) {
        var c = b.c(), d = b.f(), e = b.e(), f = b.q(), g = b.k(), h = b.kb(), k = b.b(), n = b.J(), p = b.g(), q = b.i();
        return {
            layer: b,
            brightness: Wb(c, -1, 1),
            contrast: Math.max(d, 0),
            hue: e,
            opacity: Wb(f, 0, 1),
            saturation: Math.max(g, 0),
            yc: h,
            visible: k,
            extent: n,
            maxResolution: p,
            minResolution: Math.max(q, 0)
        }
    }

    C.prototype.J = function () {
        return this.get("extent")
    };
    C.prototype.getExtent = C.prototype.J;
    C.prototype.g = function () {
        return this.get("maxResolution")
    };
    C.prototype.getMaxResolution = C.prototype.g;
    C.prototype.i = function () {
        return this.get("minResolution")
    };
    C.prototype.getMinResolution = C.prototype.i;
    C.prototype.q = function () {
        return this.get("opacity")
    };
    C.prototype.getOpacity = C.prototype.q;
    C.prototype.k = function () {
        return this.get("saturation")
    };
    C.prototype.getSaturation = C.prototype.k;
    C.prototype.b = function () {
        return this.get("visible")
    };
    C.prototype.getVisible = C.prototype.b;
    C.prototype.D = function (b) {
        this.set("brightness", b)
    };
    C.prototype.setBrightness = C.prototype.D;
    C.prototype.H = function (b) {
        this.set("contrast", b)
    };
    C.prototype.setContrast = C.prototype.H;
    C.prototype.N = function (b) {
        this.set("hue", b)
    };
    C.prototype.setHue = C.prototype.N;
    C.prototype.o = function (b) {
        this.set("extent", b)
    };
    C.prototype.setExtent = C.prototype.o;
    C.prototype.S = function (b) {
        this.set("maxResolution", b)
    };
    C.prototype.setMaxResolution = C.prototype.S;
    C.prototype.U = function (b) {
        this.set("minResolution", b)
    };
    C.prototype.setMinResolution = C.prototype.U;
    C.prototype.p = function (b) {
        this.set("opacity", b)
    };
    C.prototype.setOpacity = C.prototype.p;
    C.prototype.ca = function (b) {
        this.set("saturation", b)
    };
    C.prototype.setSaturation = C.prototype.ca;
    C.prototype.da = function (b) {
        this.set("visible", b)
    };
    C.prototype.setVisible = C.prototype.da;
    function E(b) {
        var c = Bb(b);
        delete c.source;
        C.call(this, c);
        this.va = null;
        w(this, vd("source"), this.zh, !1, this);
        this.fa(m(b.source) ? b.source : null)
    }

    v(E, C);
    function Mi(b, c) {
        return b.visible && c >= b.minResolution && c < b.maxResolution
    }

    E.prototype.Xa = function (b) {
        b = m(b) ? b : [];
        b.push(Li(this));
        return b
    };
    E.prototype.a = function () {
        var b = this.get("source");
        return m(b) ? b : null
    };
    E.prototype.getSource = E.prototype.a;
    E.prototype.kb = function () {
        var b = this.a();
        return null === b ? "undefined" : b.q
    };
    E.prototype.mi = function () {
        this.l()
    };
    E.prototype.zh = function () {
        null !== this.va && (Xc(this.va), this.va = null);
        var b = this.a();
        null !== b && (this.va = w(b, "change", this.mi, !1, this));
        this.l()
    };
    E.prototype.fa = function (b) {
        this.set("source", b)
    };
    E.prototype.setSource = E.prototype.fa;
    function Ni(b, c, d, e, f) {
        id.call(this);
        this.e = f;
        this.extent = b;
        this.f = d;
        this.resolution = c;
        this.state = e
    }

    v(Ni, id);
    Ni.prototype.J = function () {
        return this.extent
    };
    function Oi(b, c) {
        id.call(this);
        this.a = b;
        this.state = c
    }

    v(Oi, id);
    function Pi(b) {
        b.dispatchEvent("change")
    }

    Oi.prototype.qb = function () {
        return ma(this).toString()
    };
    Oi.prototype.e = function () {
        return this.a
    };
    function Qi() {
        this.b = 0;
        this.c = {};
        this.d = this.a = null
    }

    l = Qi.prototype;
    l.clear = function () {
        this.b = 0;
        this.c = {};
        this.d = this.a = null
    };
    function Ri(b, c) {
        return b.c.hasOwnProperty(c)
    }

    l.forEach = function (b, c) {
        for (var d = this.a; null !== d;)b.call(c, d.hc, d.Cd, this), d = d.eb
    };
    l.get = function (b) {
        b = this.c[b];
        if (b === this.d)return b.hc;
        b === this.a ? (this.a = this.a.eb, this.a.Mb = null) : (b.eb.Mb = b.Mb, b.Mb.eb = b.eb);
        b.eb = null;
        b.Mb = this.d;
        this.d = this.d.eb = b;
        return b.hc
    };
    l.Tb = function () {
        return this.b
    };
    l.G = function () {
        var b = Array(this.b), c = 0, d;
        for (d = this.d; null !== d; d = d.Mb)b[c++] = d.Cd;
        return b
    };
    l.ob = function () {
        var b = Array(this.b), c = 0, d;
        for (d = this.d; null !== d; d = d.Mb)b[c++] = d.hc;
        return b
    };
    l.pop = function () {
        var b = this.a;
        delete this.c[b.Cd];
        null !== b.eb && (b.eb.Mb = null);
        this.a = b.eb;
        null === this.a && (this.d = null);
        --this.b;
        return b.hc
    };
    l.set = function (b, c) {
        var d = {Cd: b, eb: null, Mb: this.d, hc: c};
        null === this.d ? this.a = d : this.d.eb = d;
        this.d = d;
        this.c[b] = d;
        ++this.b
    };
    function Si(b) {
        Qi.call(this);
        this.f = m(b) ? b : 2048
    }

    v(Si, Qi);
    function Ti(b) {
        return b.Tb() > b.f
    };
    function Ui(b) {
        this.minZoom = m(b.minZoom) ? b.minZoom : 0;
        this.a = b.resolutions;
        this.maxZoom = this.a.length - 1;
        this.c = m(b.origin) ? b.origin : null;
        this.e = null;
        m(b.origins) && (this.e = b.origins);
        this.d = null;
        m(b.tileSizes) && (this.d = b.tileSizes);
        this.f = m(b.tileSize) ? b.tileSize : null === this.d ? 256 : void 0
    }

    var Vi = [0, 0, 0];
    l = Ui.prototype;
    l.Db = function () {
        return ed
    };
    l.gd = function (b, c, d, e, f) {
        f = Wi(this, b, f);
        for (b = b[0] - 1; b >= this.minZoom;) {
            if (c.call(d, b, Xi(this, f, b, e)))return !0;
            --b
        }
        return !1
    };
    l.md = function () {
        return this.maxZoom
    };
    l.pd = function () {
        return this.minZoom
    };
    l.Lb = function (b) {
        return null === this.c ? this.e[b] : this.c
    };
    l.na = function (b) {
        return this.a[b]
    };
    l.Qd = function () {
        return this.a
    };
    l.td = function (b, c, d) {
        return b[0] < this.maxZoom ? (d = Wi(this, b, d), Xi(this, d, b[0] + 1, c)) : null
    };
    function Yi(b, c, d, e) {
        Zi(b, c[0], c[1], d, !1, Vi);
        var f = Vi[1], g = Vi[2];
        Zi(b, c[2], c[3], d, !0, Vi);
        return mf(f, Vi[1], g, Vi[2], e)
    }

    function Xi(b, c, d, e) {
        return Yi(b, c, b.na(d), e)
    }

    function $i(b, c) {
        var d = b.Lb(c[0]), e = b.na(c[0]), f = b.ua(c[0]);
        return [d[0] + (c[1] + .5) * f * e, d[1] + (c[2] + .5) * f * e]
    }

    function Wi(b, c, d) {
        var e = b.Lb(c[0]), f = b.na(c[0]);
        b = b.ua(c[0]);
        var g = e[0] + c[1] * b * f;
        c = e[1] + c[2] * b * f;
        return Wd(g, c, g + b * f, c + b * f, d)
    }

    l.Wb = function (b, c, d) {
        return Zi(this, b[0], b[1], c, !1, d)
    };
    function Zi(b, c, d, e, f, g) {
        var h = bc(b.a, e, 0), k = e / b.na(h), n = b.Lb(h);
        b = b.ua(h);
        c = k * (c - n[0]) / (e * b);
        d = k * (d - n[1]) / (e * b);
        f ? (c = Math.ceil(c) - 1, d = Math.ceil(d) - 1) : (c = Math.floor(c), d = Math.floor(d));
        return gf(h, c, d, g)
    }

    l.Nc = function (b, c, d) {
        return Zi(this, b[0], b[1], this.na(c), !1, d)
    };
    l.ua = function (b) {
        return m(this.f) ? this.f : this.d[b]
    };
    function aj(b, c, d) {
        c = m(c) ? c : 42;
        d = m(d) ? d : 256;
        b = Math.max(re(b) / d, oe(b) / d);
        c += 1;
        d = Array(c);
        for (var e = 0; e < c; ++e)d[e] = b / Math.pow(2, e);
        return d
    }

    function bj(b) {
        b = Be(b);
        var c = b.J();
        null === c && (b = 180 * xe.degrees / b.od(), c = Wd(-b, -b, b, b));
        return c
    };
    function cj(b) {
        Ji.call(this, {
            attributions: b.attributions,
            extent: b.extent,
            logo: b.logo,
            projection: b.projection,
            state: b.state
        });
        this.H = m(b.opaque) ? b.opaque : !1;
        this.N = m(b.tilePixelRatio) ? b.tilePixelRatio : 1;
        this.tileGrid = m(b.tileGrid) ? b.tileGrid : null;
        this.a = new Si
    }

    v(cj, Ji);
    function dj(b, c, d, e) {
        for (var f = !0, g, h, k = d.a; k <= d.c; ++k)for (var n = d.b; n <= d.d; ++n)g = b.nb(c, k, n), h = !1, Ri(b.a, g) && (g = b.a.get(g), (h = 2 === g.state) && (h = !1 !== e(g))), h || (f = !1);
        return f
    }

    l = cj.prototype;
    l.jd = function () {
        return 0
    };
    l.nb = hf;
    l.xa = function () {
        return this.tileGrid
    };
    function ej(b, c) {
        var d;
        if (null === b.tileGrid) {
            if (d = c.f, null === d) {
                d = bj(c);
                var e = m(void 0) ? void 0 : 256, f = m(void 0) ? void 0 : "bottom-left", g = aj(d, void 0, e);
                d = new Ui({origin: me(d, f), resolutions: g, tileSize: e});
                c.f = d
            }
        } else d = b.tileGrid;
        return d
    }

    l.Xb = function (b, c, d) {
        return ej(this, d).ua(b) * this.N
    };
    l.Pe = ca;
    function fj(b, c) {
        rc.call(this, b);
        this.tile = c
    }

    v(fj, rc);
    function gj(b, c, d, e, f, g, h, k) {
        Md(b);
        0 === c && 0 === d || Pd(b, c, d);
        1 == e && 1 == f || Qd(b, e, f);
        0 !== g && Rd(b, g);
        0 === h && 0 === k || Pd(b, h, k);
        return b
    }

    function hj(b, c) {
        return b[0] == c[0] && b[1] == c[1] && b[4] == c[4] && b[5] == c[5] && b[12] == c[12] && b[13] == c[13]
    }

    function ij(b, c, d) {
        var e = b[1], f = b[5], g = b[13], h = c[0];
        c = c[1];
        d[0] = b[0] * h + b[4] * c + b[12];
        d[1] = e * h + f * c + g;
        return d
    };
    function jj(b) {
        ld.call(this);
        this.a = b
    }

    v(jj, ld);
    l = jj.prototype;
    l.Ua = ca;
    l.cc = function (b, c, d, e) {
        b = b.slice();
        ij(c.pixelToCoordinateMatrix, b, b);
        if (this.Ua(b, c, cd, this))return d.call(e, this.a)
    };
    l.Hd = bd;
    l.ed = function (b, c) {
        return function (d, e) {
            return dj(b, d, e, function (b) {
                c[d] || (c[d] = {});
                c[d][b.a.toString()] = b
            })
        }
    };
    l.Uj = function (b) {
        2 === b.target.state && kj(this)
    };
    function lj(b, c) {
        var d = c.state;
        2 != d && 3 != d && w(c, "change", b.Uj, !1, b);
        0 == d && (c.load(), d = c.state);
        return 2 == d
    }

    function kj(b) {
        var c = b.a;
        c.b() && "ready" == c.kb() && b.l()
    }

    function nj(b, c) {
        Ti(c.a) && b.postRenderFunctions.push(sa(function (b, c, f) {
            c = ma(b).toString();
            b = b.a;
            f = f.usedTiles[c];
            for (var g; Ti(b) && !(c = b.a.hc, g = c.a[0].toString(), g in f && f[g].contains(c.a));)b.pop().Jc()
        }, c))
    }

    function oj(b, c) {
        if (null != c) {
            var d, e, f;
            e = 0;
            for (f = c.length; e < f; ++e)d = c[e], b[ma(d).toString()] = d
        }
    }

    function pj(b, c) {
        var d = c.D;
        m(d) && (ia(d) ? b.logos[d] = "" : la(d) && (b.logos[d.src] = d.href))
    }

    function qj(b, c, d, e) {
        c = ma(c).toString();
        d = d.toString();
        c in b ? d in b[c] ? (b = b[c][d], e.a < b.a && (b.a = e.a), e.c > b.c && (b.c = e.c), e.b < b.b && (b.b = e.b), e.d > b.d && (b.d = e.d)) : b[c][d] = e : (b[c] = {}, b[c][d] = e)
    }

    function rj(b, c, d) {
        return [c * (Math.round(b[0] / c) + d[0] % 2 / 2), c * (Math.round(b[1] / c) + d[1] % 2 / 2)]
    }

    function sj(b, c, d, e, f, g, h, k, n, p) {
        var q = ma(c).toString();
        q in b.wantedTiles || (b.wantedTiles[q] = {});
        var r = b.wantedTiles[q];
        b = b.tileQueue;
        var s = d.minZoom, u, z, y, A, D, x;
        for (x = h; x >= s; --x)for (z = Xi(d, g, x, z), y = d.na(x), A = z.a; A <= z.c; ++A)for (D = z.b; D <= z.d; ++D)h - x <= k ? (u = c.Vb(x, A, D, e, f), 0 == u.state && (r[kf(u.a)] = !0, u.qb()in b.b || tj(b, [u, q, $i(d, u.a), y])), m(n) && n.call(p, u)) : c.Pe(x, A, D)
    };
    function uj(b) {
        this.o = b.opacity;
        this.p = b.rotateWithView;
        this.i = b.rotation;
        this.k = b.scale;
        this.r = b.snapToPixel
    }

    l = uj.prototype;
    l.Ld = function () {
        return this.o
    };
    l.rd = function () {
        return this.p
    };
    l.Md = function () {
        return this.i
    };
    l.Nd = function () {
        return this.k
    };
    l.sd = function () {
        return this.r
    };
    l.Od = function (b) {
        this.i = b
    };
    l.Pd = function (b) {
        this.k = b
    };
    function vj(b) {
        b = m(b) ? b : {};
        this.f = m(b.anchor) ? b.anchor : [.5, .5];
        this.c = null;
        this.d = m(b.anchorOrigin) ? b.anchorOrigin : "top-left";
        this.g = m(b.anchorXUnits) ? b.anchorXUnits : "fraction";
        this.n = m(b.anchorYUnits) ? b.anchorYUnits : "fraction";
        var c = m(b.crossOrigin) ? b.crossOrigin : null, d = m(b.img) ? b.img : null, e = b.src;
        m(e) && 0 !== e.length || null === d || (e = d.src);
        var f = m(b.src) ? 0 : 2, g = wj.Pa(), h = g.get(e, c);
        null === h && (h = new xj(d, e, c, f), g.set(e, c, h));
        this.a = h;
        this.D = m(b.offset) ? b.offset : [0, 0];
        this.b = m(b.offsetOrigin) ? b.offsetOrigin :
            "top-left";
        this.e = null;
        this.q = m(b.size) ? b.size : null;
        uj.call(this, {
            opacity: m(b.opacity) ? b.opacity : 1,
            rotation: m(b.rotation) ? b.rotation : 0,
            scale: m(b.scale) ? b.scale : 1,
            snapToPixel: m(b.snapToPixel) ? b.snapToPixel : !0,
            rotateWithView: m(b.rotateWithView) ? b.rotateWithView : !1
        })
    }

    v(vj, uj);
    l = vj.prototype;
    l.wb = function () {
        if (null !== this.c)return this.c;
        var b = this.f, c = this.gb();
        if ("fraction" == this.g || "fraction" == this.n) {
            if (null === c)return null;
            b = this.f.slice();
            "fraction" == this.g && (b[0] *= c[0]);
            "fraction" == this.n && (b[1] *= c[1])
        }
        if ("top-left" != this.d) {
            if (null === c)return null;
            b === this.f && (b = this.f.slice());
            if ("top-right" == this.d || "bottom-right" == this.d)b[0] = -b[0] + c[0];
            if ("bottom-left" == this.d || "bottom-right" == this.d)b[1] = -b[1] + c[1]
        }
        return this.c = b
    };
    l.Bb = function () {
        return this.a.a
    };
    l.kd = function () {
        return this.a.d
    };
    l.Pc = function () {
        return this.a.b
    };
    l.Kd = function () {
        var b = this.a;
        if (null === b.f)if (b.n) {
            var c = b.d[0], d = b.d[1], e = Mf(c, d);
            e.fillRect(0, 0, c, d);
            b.f = e.canvas
        } else b.f = b.a;
        return b.f
    };
    l.Cb = function () {
        if (null !== this.e)return this.e;
        var b = this.D;
        if ("top-left" != this.b) {
            var c = this.gb(), d = this.a.d;
            if (null === c || null === d)return null;
            b = b.slice();
            if ("top-right" == this.b || "bottom-right" == this.b)b[0] = d[0] - c[0] - b[0];
            if ("bottom-left" == this.b || "bottom-right" == this.b)b[1] = d[1] - c[1] - b[1]
        }
        return this.e = b
    };
    l.Gk = function () {
        return this.a.e
    };
    l.gb = function () {
        return null === this.q ? this.a.d : this.q
    };
    l.xe = function (b, c) {
        return w(this.a, "change", b, !1, c)
    };
    l.load = function () {
        this.a.load()
    };
    l.Oe = function (b, c) {
        Wc(this.a, "change", b, !1, c)
    };
    function xj(b, c, d, e) {
        id.call(this);
        this.f = null;
        this.a = null === b ? new Image : b;
        null !== d && (this.a.crossOrigin = d);
        this.c = null;
        this.b = e;
        this.d = null;
        this.e = c;
        this.n = !1
    }

    v(xj, id);
    xj.prototype.g = function () {
        this.b = 3;
        Qa(this.c, Xc);
        this.c = null;
        this.dispatchEvent("change")
    };
    xj.prototype.i = function () {
        this.b = 2;
        this.d = [this.a.width, this.a.height];
        Qa(this.c, Xc);
        this.c = null;
        var b = Mf(1, 1);
        b.drawImage(this.a, 0, 0);
        try {
            b.getImageData(0, 0, 1, 1)
        } catch (c) {
            this.n = !0
        }
        this.dispatchEvent("change")
    };
    xj.prototype.load = function () {
        if (0 == this.b) {
            this.b = 1;
            this.c = [Vc(this.a, "error", this.g, !1, this), Vc(this.a, "load", this.i, !1, this)];
            try {
                this.a.src = this.e
            } catch (b) {
                this.g()
            }
        }
    };
    function wj() {
        this.a = {};
        this.d = 0
    }

    da(wj);
    wj.prototype.clear = function () {
        this.a = {};
        this.d = 0
    };
    wj.prototype.get = function (b, c) {
        var d = c + ":" + b;
        return d in this.a ? this.a[d] : null
    };
    wj.prototype.set = function (b, c, d) {
        this.a[c + ":" + b] = d;
        ++this.d
    };
    function yj(b, c) {
        mc.call(this);
        this.g = c;
        this.b = null;
        this.e = {};
        this.q = {}
    }

    v(yj, mc);
    function zj(b) {
        var c = b.viewState, d = b.coordinateToPixelMatrix;
        gj(d, b.size[0] / 2, b.size[1] / 2, 1 / c.resolution, -1 / c.resolution, -c.rotation, -c.center[0], -c.center[1]);
        Od(d, b.pixelToCoordinateMatrix)
    }

    l = yj.prototype;
    l.P = function () {
        ob(this.e, qc);
        yj.T.P.call(this)
    };
    function Aj() {
        var b = wj.Pa();
        if (32 < b.d) {
            var c = 0, d, e;
            for (d in b.a) {
                e = b.a[d];
                var f;
                if (f = 0 === (c++ & 3))Cc(e) ? e = kd(e, void 0, void 0) : (e = Rc(e), e = !!e && Kc(e, void 0, void 0)), f = !e;
                f && (delete b.a[d], --b.d)
            }
        }
    }

    l.ze = function (b, c, d, e, f, g) {
        var h, k = c.viewState, n = k.resolution, k = k.rotation;
        if (null !== this.b) {
            var p = {};
            if (h = this.b.b(b, n, k, {}, function (b) {
                    var c = ma(b).toString();
                    if (!(c in p))return p[c] = !0, d.call(e, b, null)
                }))return h
        }
        var k = c.layerStatesArray, q;
        for (q = k.length - 1; 0 <= q; --q) {
            h = k[q];
            var r = h.layer;
            if (Mi(h, n) && f.call(g, r) && (h = Bj(this, r).Ua(b, c, d, e)))return h
        }
    };
    l.Lf = function (b, c, d, e, f, g) {
        var h, k = c.viewState, n = k.resolution, k = k.rotation;
        if (null !== this.b) {
            var p = this.g.ra(b);
            if (this.b.b(p, n, k, {}, cd) && (h = d.call(e, null)))return h
        }
        k = c.layerStatesArray;
        for (p = k.length - 1; 0 <= p; --p) {
            h = k[p];
            var q = h.layer;
            if (Mi(h, n) && f.call(g, q) && (h = Bj(this, q).cc(b, c, d, e)))return h
        }
    };
    l.Mf = function (b, c, d, e) {
        b = this.ze(b, c, cd, this, d, e);
        return m(b)
    };
    function Bj(b, c) {
        var d = ma(c).toString();
        if (d in b.e)return b.e[d];
        var e = b.ne(c);
        b.e[d] = e;
        b.q[d] = w(e, "change", b.Bi, !1, b);
        return e
    }

    l.Bi = function () {
        this.g.render()
    };
    l.Yd = ca;
    l.Ql = function (b, c) {
        for (var d in this.e)if (!(null !== c && d in c.layerStates)) {
            var e = d, f = this.e[e];
            delete this.e[e];
            Xc(this.q[e]);
            delete this.q[e];
            qc(f)
        }
    };
    function Cj(b, c) {
        for (var d in b.e)if (!(d in c.layerStates)) {
            c.postRenderFunctions.push(ra(b.Ql, b));
            break
        }
    };
    function Dj(b, c) {
        this.e = b;
        this.f = c;
        this.a = [];
        this.d = [];
        this.b = {}
    }

    Dj.prototype.clear = function () {
        this.a.length = 0;
        this.d.length = 0;
        xb(this.b)
    };
    function Ej(b) {
        var c = b.a, d = b.d, e = c[0];
        1 == c.length ? (c.length = 0, d.length = 0) : (c[0] = c.pop(), d[0] = d.pop(), Fj(b, 0));
        c = b.f(e);
        delete b.b[c];
        return e
    }

    function tj(b, c) {
        var d = b.e(c);
        Infinity != d && (b.a.push(c), b.d.push(d), b.b[b.f(c)] = !0, Gj(b, 0, b.a.length - 1))
    }

    Dj.prototype.Tb = function () {
        return this.a.length
    };
    Dj.prototype.la = function () {
        return 0 === this.a.length
    };
    function Fj(b, c) {
        for (var d = b.a, e = b.d, f = d.length, g = d[c], h = e[c], k = c; c < f >> 1;) {
            var n = 2 * c + 1, p = 2 * c + 2, n = p < f && e[p] < e[n] ? p : n;
            d[c] = d[n];
            e[c] = e[n];
            c = n
        }
        d[c] = g;
        e[c] = h;
        Gj(b, k, c)
    }

    function Gj(b, c, d) {
        var e = b.a;
        b = b.d;
        for (var f = e[d], g = b[d]; d > c;) {
            var h = d - 1 >> 1;
            if (b[h] > g)e[d] = e[h], b[d] = b[h], d = h; else break
        }
        e[d] = f;
        b[d] = g
    }

    function Hj(b) {
        var c = b.e, d = b.a, e = b.d, f = 0, g = d.length, h, k, n;
        for (k = 0; k < g; ++k)h = d[k], n = c(h), Infinity == n ? delete b.b[b.f(h)] : (e[f] = n, d[f++] = h);
        d.length = f;
        e.length = f;
        for (c = (b.a.length >> 1) - 1; 0 <= c; c--)Fj(b, c)
    };
    function Ij(b, c) {
        Dj.call(this, function (c) {
            return b.apply(null, c)
        }, function (b) {
            return b[0].qb()
        });
        this.n = c;
        this.c = 0
    }

    v(Ij, Dj);
    Ij.prototype.g = function (b) {
        b = b.target.state;
        if (2 === b || 3 === b || 4 === b)--this.c, this.n()
    };
    function Jj(b, c, d) {
        this.c = b;
        this.b = c;
        this.e = d;
        this.a = [];
        this.d = this.f = 0
    }

    Jj.prototype.update = function (b, c) {
        this.a.push(b, c, ta())
    };
    function Kj(b, c) {
        var d = b.c, e = b.d, f = b.b - e, g = Lj(b);
        return df({
            source: c, duration: g, easing: function (b) {
                return e * (Math.exp(d * b * g) - 1) / f
            }
        })
    }

    function Lj(b) {
        return Math.log(b.b / b.d) / b.c
    };
    function Mj(b) {
        rd.call(this);
        this.k = null;
        this.c(!0);
        this.handleEvent = b.handleEvent
    }

    v(Mj, rd);
    Mj.prototype.b = function () {
        return this.get("active")
    };
    Mj.prototype.getActive = Mj.prototype.b;
    Mj.prototype.c = function (b) {
        this.set("active", b)
    };
    Mj.prototype.setActive = Mj.prototype.c;
    Mj.prototype.setMap = function (b) {
        this.k = b
    };
    function Nj(b, c, d, e, f) {
        if (null != d) {
            var g = c.c(), h = c.b();
            m(g) && m(h) && m(f) && 0 < f && (b.La(ef({
                rotation: g,
                duration: f,
                easing: $e
            })), m(e) && b.La(df({source: h, duration: f, easing: $e})));
            c.rotate(d, e)
        }
    }

    function Oj(b, c, d, e, f) {
        var g = c.a();
        d = c.constrainResolution(g, d, 0);
        Pj(b, c, d, e, f)
    }

    function Pj(b, c, d, e, f) {
        if (null != d) {
            var g = c.a(), h = c.b();
            m(g) && m(h) && m(f) && 0 < f && (b.La(ff({
                resolution: g,
                duration: f,
                easing: $e
            })), m(e) && b.La(df({source: h, duration: f, easing: $e})));
            if (null != e) {
                var k;
                b = c.b();
                f = c.a();
                m(b) && m(f) && (k = [e[0] - d * (e[0] - b[0]) / f, e[1] - d * (e[1] - b[1]) / f]);
                c.Ha(k)
            }
            c.f(d)
        }
    };
    function Qj(b) {
        b = m(b) ? b : {};
        this.a = m(b.delta) ? b.delta : 1;
        Mj.call(this, {handleEvent: Rj});
        this.f = m(b.duration) ? b.duration : 250
    }

    v(Qj, Mj);
    function Rj(b) {
        var c = !1, d = b.a;
        if (b.type == Ai) {
            var c = b.map, e = b.coordinate, d = d.c ? -this.a : this.a, f = c.a();
            Oj(c, f, d, e, this.f);
            b.preventDefault();
            c = !0
        }
        return !c
    };
    function Sj(b) {
        b = b.a;
        return b.d && !b.g && b.c
    }

    function Tj(b) {
        return "pointermove" == b.type
    }

    function Uj(b) {
        return b.type == Bi
    }

    function Vj(b) {
        b = b.a;
        return !b.d && !b.g && !b.c
    }

    function Wj(b) {
        b = b.a;
        return !b.d && !b.g && b.c
    }

    function Xj(b) {
        b = b.a.target.tagName;
        return "INPUT" !== b && "SELECT" !== b && "TEXTAREA" !== b
    }

    function Yj(b) {
        return 1 == b.d.pointerId
    };
    function Zj(b) {
        b = m(b) ? b : {};
        Mj.call(this, {handleEvent: m(b.handleEvent) ? b.handleEvent : ak});
        this.ia = m(b.handleDownEvent) ? b.handleDownEvent : bd;
        this.ka = m(b.handleDragEvent) ? b.handleDragEvent : ca;
        this.va = m(b.handleMoveEvent) ? b.handleMoveEvent : ca;
        this.Ea = m(b.handleUpEvent) ? b.handleUpEvent : bd;
        this.p = !1;
        this.D = {};
        this.f = []
    }

    v(Zj, Mj);
    function bk(b) {
        for (var c = b.length, d = 0, e = 0, f = 0; f < c; f++)d += b[f].clientX, e += b[f].clientY;
        return [d / c, e / c]
    }

    function ak(b) {
        if (!(b instanceof wi))return !0;
        var c = !1, d = b.type;
        if (d === Fi || d === Hi || d === Di)d = b.d, b.type == Di ? delete this.D[d.pointerId] : b.type == Fi ? this.D[d.pointerId] = d : d.pointerId in this.D && (this.D[d.pointerId] = d), this.f = rb(this.D);
        this.p && (b.type == Hi ? this.ka(b) : b.type == Di && (this.p = this.Ea(b)));
        b.type == Fi ? (this.p = b = this.ia(b), c = this.r(b)) : b.type == Gi && this.va(b);
        return !c
    }

    Zj.prototype.r = ed;
    function ck(b) {
        Zj.call(this, {handleDownEvent: dk, handleDragEvent: ek, handleUpEvent: fk});
        b = m(b) ? b : {};
        this.a = b.kinetic;
        this.e = this.g = null;
        this.q = m(b.condition) ? b.condition : Vj;
        this.i = !1
    }

    v(ck, Zj);
    function ek(b) {
        var c = bk(this.f);
        this.a && this.a.update(c[0], c[1]);
        if (null !== this.e) {
            var d = this.e[0] - c[0], e = c[1] - this.e[1];
            b = b.map;
            var f = b.a(), g = Ye(f), e = d = [d, e], h = g.resolution;
            e[0] *= h;
            e[1] *= h;
            Bd(d, g.rotation);
            wd(d, g.center);
            d = f.i(d);
            b.render();
            f.Ha(d)
        }
        this.e = c
    }

    function fk(b) {
        b = b.map;
        var c = b.a();
        if (0 === this.f.length) {
            var d;
            if (d = !this.i && this.a)if (d = this.a, 6 > d.a.length)d = !1; else {
                var e = ta() - d.e, f = d.a.length - 3;
                if (d.a[f + 2] < e)d = !1; else {
                    for (var g = f - 3; 0 < g && d.a[g + 2] > e;)g -= 3;
                    var e = d.a[f + 2] - d.a[g + 2], h = d.a[f] - d.a[g], f = d.a[f + 1] - d.a[g + 1];
                    d.f = Math.atan2(f, h);
                    d.d = Math.sqrt(h * h + f * f) / e;
                    d = d.d > d.b
                }
            }
            d && (d = this.a, d = (d.b - d.d) / d.c, f = this.a.f, g = c.b(), this.g = Kj(this.a, g), b.La(this.g), g = b.e(g), d = b.ra([g[0] - d * Math.cos(f), g[1] - d * Math.sin(f)]), d = c.i(d), c.Ha(d));
            Ze(c, -1);
            b.render();
            return !1
        }
        this.e = null;
        return !0
    }

    function dk(b) {
        if (0 < this.f.length && this.q(b)) {
            var c = b.map, d = c.a();
            this.e = null;
            this.p || Ze(d, 1);
            c.render();
            null !== this.g && Xa(c.N, this.g) && (d.Ha(b.frameState.viewState.center), this.g = null);
            this.a && (b = this.a, b.a.length = 0, b.f = 0, b.d = 0);
            this.i = 1 < this.f.length;
            return !0
        }
        return !1
    }

    ck.prototype.r = bd;
    function gk(b) {
        b = m(b) ? b : {};
        Zj.call(this, {handleDownEvent: hk, handleDragEvent: ik, handleUpEvent: jk});
        this.e = m(b.condition) ? b.condition : Sj;
        this.a = void 0
    }

    v(gk, Zj);
    function ik(b) {
        if (Yj(b)) {
            var c = b.map, d = c.f();
            b = b.pixel;
            d = Math.atan2(d[1] / 2 - b[1], b[0] - d[0] / 2);
            if (m(this.a)) {
                b = d - this.a;
                var e = c.a(), f = e.c();
                c.render();
                Nj(c, e, f - b)
            }
            this.a = d
        }
    }

    function jk(b) {
        if (!Yj(b))return !0;
        b = b.map;
        var c = b.a();
        Ze(c, -1);
        var d = c.c(), d = c.constrainRotation(d, 0);
        Nj(b, c, d, void 0, 250);
        return !1
    }

    function hk(b) {
        return Yj(b) && Ac(b.a) && this.e(b) ? (b = b.map, Ze(b.a(), 1), b.render(), this.a = void 0, !0) : !1
    }

    gk.prototype.r = bd;
    function kk() {
        ld.call(this);
        this.k = Td();
        this.q = -1;
        this.e = {};
        this.i = this.g = 0
    }

    v(kk, ld);
    kk.prototype.f = function (b, c) {
        var d = m(c) ? c : [NaN, NaN];
        this.Ya(b[0], b[1], d, Infinity);
        return d
    };
    kk.prototype.Jb = bd;
    kk.prototype.J = function (b) {
        this.q != this.d && (this.k = this.dd(this.k), this.q = this.d);
        var c = this.k;
        m(b) ? (b[0] = c[0], b[1] = c[1], b[2] = c[2], b[3] = c[3]) : b = c;
        return b
    };
    kk.prototype.transform = function (b, c) {
        this.qa(Te(b, c));
        return this
    };
    function lk(b, c, d, e, f, g) {
        var h = f[0], k = f[1], n = f[4], p = f[5], q = f[12];
        f = f[13];
        for (var r = m(g) ? g : [], s = 0; c < d; c += e) {
            var u = b[c], z = b[c + 1];
            r[s++] = h * u + n * z + q;
            r[s++] = k * u + p * z + f
        }
        m(g) && r.length != s && (r.length = s);
        return r
    };
    function mk() {
        kk.call(this);
        this.a = "XY";
        this.B = 2;
        this.j = null
    }

    v(mk, kk);
    function nk(b) {
        if ("XY" == b)return 2;
        if ("XYZ" == b || "XYM" == b)return 3;
        if ("XYZM" == b)return 4
    }

    l = mk.prototype;
    l.Jb = bd;
    l.dd = function (b) {
        var c = this.j, d = this.j.length, e = this.B;
        b = Wd(Infinity, Infinity, -Infinity, -Infinity, b);
        return fe(b, c, 0, d, e)
    };
    l.yb = function () {
        return this.j.slice(0, this.B)
    };
    l.zb = function () {
        return this.j.slice(this.j.length - this.B)
    };
    l.Ab = function () {
        return this.a
    };
    l.ue = function (b) {
        this.i != this.d && (xb(this.e), this.g = 0, this.i = this.d);
        if (0 > b || 0 !== this.g && b <= this.g)return this;
        var c = b.toString();
        if (this.e.hasOwnProperty(c))return this.e[c];
        var d = this.oc(b);
        if (d.j.length < this.j.length)return this.e[c] = d;
        this.g = b;
        return this
    };
    l.oc = function () {
        return this
    };
    function ok(b, c, d) {
        b.B = nk(c);
        b.a = c;
        b.j = d
    }

    function pk(b, c, d, e) {
        if (m(c))d = nk(c); else {
            for (c = 0; c < e; ++c) {
                if (0 === d.length) {
                    b.a = "XY";
                    b.B = 2;
                    return
                }
                d = d[0]
            }
            d = d.length;
            c = 2 == d ? "XY" : 3 == d ? "XYZ" : 4 == d ? "XYZM" : void 0
        }
        b.a = c;
        b.B = d
    }

    l.qa = function (b) {
        null !== this.j && (b(this.j, this.j, this.B), this.l())
    };
    l.Ia = function (b, c) {
        var d = this.j;
        if (null !== d) {
            var e = d.length, f = this.B, g = m(d) ? d : [], h = 0, k, n;
            for (k = 0; k < e; k += f)for (g[h++] = d[k] + b, g[h++] = d[k + 1] + c, n = k + 2; n < k + f; ++n)g[h++] = d[n];
            m(d) && g.length != h && (g.length = h);
            this.l()
        }
    };
    function qk(b, c, d, e) {
        for (var f = 0, g = b[d - e], h = b[d - e + 1]; c < d; c += e)var k = b[c], n = b[c + 1], f = f + (h * k - g * n), g = k, h = n;
        return f / 2
    }

    function rk(b, c, d, e) {
        var f = 0, g, h;
        g = 0;
        for (h = d.length; g < h; ++g) {
            var k = d[g], f = f + qk(b, c, k, e);
            c = k
        }
        return f
    };
    function sk(b, c, d, e, f, g) {
        var h = f - d, k = g - e;
        if (0 !== h || 0 !== k) {
            var n = ((b - d) * h + (c - e) * k) / (h * h + k * k);
            1 < n ? (d = f, e = g) : 0 < n && (d += h * n, e += k * n)
        }
        return tk(b, c, d, e)
    }

    function tk(b, c, d, e) {
        b = d - b;
        c = e - c;
        return b * b + c * c
    };
    function uk(b, c, d, e, f, g, h) {
        var k = b[c], n = b[c + 1], p = b[d] - k, q = b[d + 1] - n;
        if (0 !== p || 0 !== q)if (g = ((f - k) * p + (g - n) * q) / (p * p + q * q), 1 < g)c = d; else if (0 < g) {
            for (f = 0; f < e; ++f)h[f] = Yb(b[c + f], b[d + f], g);
            h.length = e;
            return
        }
        for (f = 0; f < e; ++f)h[f] = b[c + f];
        h.length = e
    }

    function vk(b, c, d, e, f) {
        var g = b[c], h = b[c + 1];
        for (c += e; c < d; c += e) {
            var k = b[c], n = b[c + 1], g = tk(g, h, k, n);
            g > f && (f = g);
            g = k;
            h = n
        }
        return f
    }

    function wk(b, c, d, e, f) {
        var g, h;
        g = 0;
        for (h = d.length; g < h; ++g) {
            var k = d[g];
            f = vk(b, c, k, e, f);
            c = k
        }
        return f
    }

    function xk(b, c, d, e, f, g, h, k, n, p, q) {
        if (c == d)return p;
        var r;
        if (0 === f) {
            r = tk(h, k, b[c], b[c + 1]);
            if (r < p) {
                for (q = 0; q < e; ++q)n[q] = b[c + q];
                n.length = e;
                return r
            }
            return p
        }
        for (var s = m(q) ? q : [NaN, NaN], u = c + e; u < d;)if (uk(b, u - e, u, e, h, k, s), r = tk(h, k, s[0], s[1]), r < p) {
            p = r;
            for (q = 0; q < e; ++q)n[q] = s[q];
            n.length = e;
            u += e
        } else u += e * Math.max((Math.sqrt(r) - Math.sqrt(p)) / f | 0, 1);
        if (g && (uk(b, d - e, c, e, h, k, s), r = tk(h, k, s[0], s[1]), r < p)) {
            p = r;
            for (q = 0; q < e; ++q)n[q] = s[q];
            n.length = e
        }
        return p
    }

    function yk(b, c, d, e, f, g, h, k, n, p, q) {
        q = m(q) ? q : [NaN, NaN];
        var r, s;
        r = 0;
        for (s = d.length; r < s; ++r) {
            var u = d[r];
            p = xk(b, c, u, e, f, g, h, k, n, p, q);
            c = u
        }
        return p
    };
    function zk(b, c) {
        var d = 0, e, f;
        e = 0;
        for (f = c.length; e < f; ++e)b[d++] = c[e];
        return d
    }

    function Ak(b, c, d, e) {
        var f, g;
        f = 0;
        for (g = d.length; f < g; ++f) {
            var h = d[f], k;
            for (k = 0; k < e; ++k)b[c++] = h[k]
        }
        return c
    }

    function Bk(b, c, d, e, f) {
        f = m(f) ? f : [];
        var g = 0, h, k;
        h = 0;
        for (k = d.length; h < k; ++h)c = Ak(b, c, d[h], e), f[g++] = c;
        f.length = g;
        return f
    };
    function Ck(b, c, d, e, f) {
        f = m(f) ? f : [];
        for (var g = 0; c < d; c += e)f[g++] = b.slice(c, c + e);
        f.length = g;
        return f
    }

    function Dk(b, c, d, e, f) {
        f = m(f) ? f : [];
        var g = 0, h, k;
        h = 0;
        for (k = d.length; h < k; ++h) {
            var n = d[h];
            f[g++] = Ck(b, c, n, e, f[g]);
            c = n
        }
        f.length = g;
        return f
    };
    function Ek(b, c, d, e, f, g, h) {
        var k = (d - c) / e;
        if (3 > k) {
            for (; c < d; c += e)g[h++] = b[c], g[h++] = b[c + 1];
            return h
        }
        var n = Array(k);
        n[0] = 1;
        n[k - 1] = 1;
        d = [c, d - e];
        for (var p = 0, q; 0 < d.length;) {
            var r = d.pop(), s = d.pop(), u = 0, z = b[s], y = b[s + 1], A = b[r], D = b[r + 1];
            for (q = s + e; q < r; q += e) {
                var x = sk(b[q], b[q + 1], z, y, A, D);
                x > u && (p = q, u = x)
            }
            u > f && (n[(p - c) / e] = 1, s + e < p && d.push(s, p), p + e < r && d.push(p, r))
        }
        for (q = 0; q < k; ++q)n[q] && (g[h++] = b[c + q * e], g[h++] = b[c + q * e + 1]);
        return h
    }

    function Fk(b, c, d, e, f, g, h, k) {
        var n, p;
        n = 0;
        for (p = d.length; n < p; ++n) {
            var q = d[n];
            a:{
                var r = b, s = q, u = e, z = f, y = g;
                if (c != s) {
                    var A = z * Math.round(r[c] / z), D = z * Math.round(r[c + 1] / z);
                    c += u;
                    y[h++] = A;
                    y[h++] = D;
                    var x = void 0, M = void 0;
                    do if (x = z * Math.round(r[c] / z), M = z * Math.round(r[c + 1] / z), c += u, c == s) {
                        y[h++] = x;
                        y[h++] = M;
                        break a
                    } while (x == A && M == D);
                    for (; c < s;) {
                        var Q, O;
                        Q = z * Math.round(r[c] / z);
                        O = z * Math.round(r[c + 1] / z);
                        c += u;
                        if (Q != x || O != M) {
                            var W = x - A, Ja = M - D, lb = Q - A, Ka = O - D;
                            W * Ka == Ja * lb && (0 > W && lb < W || W == lb || 0 < W && lb > W) && (0 > Ja && Ka < Ja || Ja == Ka ||
                            0 < Ja && Ka > Ja) || (y[h++] = x, y[h++] = M, A = x, D = M);
                            x = Q;
                            M = O
                        }
                    }
                    y[h++] = x;
                    y[h++] = M
                }
            }
            k.push(h);
            c = q
        }
        return h
    };
    function Gk(b, c) {
        mk.call(this);
        this.b = this.n = -1;
        this.W(b, c)
    }

    v(Gk, mk);
    l = Gk.prototype;
    l.clone = function () {
        var b = new Gk(null);
        Hk(b, this.a, this.j.slice());
        return b
    };
    l.Ya = function (b, c, d, e) {
        if (e < Zd(this.J(), b, c))return e;
        this.b != this.d && (this.n = Math.sqrt(vk(this.j, 0, this.j.length, this.B, 0)), this.b = this.d);
        return xk(this.j, 0, this.j.length, this.B, this.n, !0, b, c, d, e)
    };
    l.Oj = function () {
        return qk(this.j, 0, this.j.length, this.B)
    };
    l.Q = function () {
        return Ck(this.j, 0, this.j.length, this.B)
    };
    l.oc = function (b) {
        var c = [];
        c.length = Ek(this.j, 0, this.j.length, this.B, b, c, 0);
        b = new Gk(null);
        Hk(b, "XY", c);
        return b
    };
    l.O = function () {
        return "LinearRing"
    };
    l.W = function (b, c) {
        null === b ? Hk(this, "XY", null) : (pk(this, c, b, 1), null === this.j && (this.j = []), this.j.length = Ak(this.j, 0, b, this.B), this.l())
    };
    function Hk(b, c, d) {
        ok(b, c, d);
        b.l()
    };
    function Ik(b, c) {
        mk.call(this);
        this.W(b, c)
    }

    v(Ik, mk);
    l = Ik.prototype;
    l.clone = function () {
        var b = new Ik(null);
        Jk(b, this.a, this.j.slice());
        return b
    };
    l.Ya = function (b, c, d, e) {
        var f = this.j;
        b = tk(b, c, f[0], f[1]);
        if (b < e) {
            e = this.B;
            for (c = 0; c < e; ++c)d[c] = f[c];
            d.length = e;
            return b
        }
        return e
    };
    l.Q = function () {
        return null === this.j ? [] : this.j.slice()
    };
    l.dd = function (b) {
        return ce(this.j, b)
    };
    l.O = function () {
        return "Point"
    };
    l.ja = function (b) {
        return ae(b, this.j[0], this.j[1])
    };
    l.W = function (b, c) {
        null === b ? Jk(this, "XY", null) : (pk(this, c, b, 0), null === this.j && (this.j = []), this.j.length = zk(this.j, b), this.l())
    };
    function Jk(b, c, d) {
        ok(b, c, d);
        b.l()
    };
    function Kk(b, c, d, e, f) {
        return !ge(f, function (f) {
            return !Lk(b, c, d, e, f[0], f[1])
        })
    }

    function Lk(b, c, d, e, f, g) {
        for (var h = !1, k = b[d - e], n = b[d - e + 1]; c < d; c += e) {
            var p = b[c], q = b[c + 1];
            n > g != q > g && f < (p - k) * (g - n) / (q - n) + k && (h = !h);
            k = p;
            n = q
        }
        return h
    }

    function Mk(b, c, d, e, f, g) {
        if (0 === d.length || !Lk(b, c, d[0], e, f, g))return !1;
        var h;
        c = 1;
        for (h = d.length; c < h; ++c)if (Lk(b, d[c - 1], d[c], e, f, g))return !1;
        return !0
    };
    function Nk(b, c, d, e, f, g, h) {
        var k, n, p, q, r, s = f[g + 1], u = [], z = d[0];
        p = b[z - e];
        r = b[z - e + 1];
        for (k = c; k < z; k += e) {
            q = b[k];
            n = b[k + 1];
            if (s <= r && n <= s || r <= s && s <= n)p = (s - r) / (n - r) * (q - p) + p, u.push(p);
            p = q;
            r = n
        }
        z = NaN;
        r = -Infinity;
        u.sort();
        p = u[0];
        k = 1;
        for (n = u.length; k < n; ++k) {
            q = u[k];
            var y = Math.abs(q - p);
            y > r && (p = (p + q) / 2, Mk(b, c, d, e, p, s) && (z = p, r = y));
            p = q
        }
        isNaN(z) && (z = f[g]);
        return m(h) ? (h.push(z, s), h) : [z, s]
    };
    function Ok(b, c, d, e, f, g) {
        for (var h = [b[c], b[c + 1]], k = [], n; c + e < d; c += e) {
            k[0] = b[c + e];
            k[1] = b[c + e + 1];
            if (n = f.call(g, h, k))return n;
            h[0] = k[0];
            h[1] = k[1]
        }
        return !1
    };
    function Pk(b, c, d, e, f) {
        var g = fe(Td(), b, c, d, e);
        return qe(f, g) ? $d(f, g) || g[0] >= f[0] && g[2] <= f[2] || g[1] >= f[1] && g[3] <= f[3] ? !0 : Ok(b, c, d, e, function (b, c) {
            var d = !1, e = be(f, b), g = be(f, c);
            if (1 === e || 1 === g)d = !0; else {
                var r = f[0], s = f[1], u = f[2], z = f[3], y = c[0], A = c[1], D = (A - b[1]) / (y - b[0]);
                g & 2 && !(e & 2) ? (s = y - (A - z) / D, d = s >= r && s <= u) : g & 4 && !(e & 4) ? (r = A - (y - u) * D, d = r >= s && r <= z) : g & 8 && !(e & 8) ? (s = y - (A - s) / D, d = s >= r && s <= u) : g & 16 && !(e & 16) && (r = A - (y - r) * D, d = r >= s && r <= z)
            }
            return d
        }) : !1
    }

    function Qk(b, c, d, e, f) {
        var g = d[0];
        if (!(Pk(b, c, g, e, f) || Lk(b, c, g, e, f[0], f[1]) || Lk(b, c, g, e, f[0], f[3]) || Lk(b, c, g, e, f[2], f[1]) || Lk(b, c, g, e, f[2], f[3])))return !1;
        if (1 === d.length)return !0;
        c = 1;
        for (g = d.length; c < g; ++c)if (Kk(b, d[c - 1], d[c], e, f))return !1;
        return !0
    };
    function Rk(b, c, d, e) {
        for (var f = 0, g = b[d - e], h = b[d - e + 1]; c < d; c += e)var k = b[c], n = b[c + 1], f = f + (k - g) * (n + h), g = k, h = n;
        return 0 < f
    }

    function Sk(b, c, d) {
        var e = 0, f, g;
        f = 0;
        for (g = c.length; f < g; ++f) {
            var h = c[f], e = Rk(b, e, h, d);
            if (0 === f ? !e : e)return !1;
            e = h
        }
        return !0
    }

    function Tk(b, c, d, e) {
        var f, g;
        f = 0;
        for (g = d.length; f < g; ++f) {
            var h = d[f], k = Rk(b, c, h, e);
            if (0 === f ? !k : k)for (var k = b, n = h, p = e; c < n - p;) {
                var q;
                for (q = 0; q < p; ++q) {
                    var r = k[c + q];
                    k[c + q] = k[n - p + q];
                    k[n - p + q] = r
                }
                c += p;
                n -= p
            }
            c = h
        }
        return c
    };
    function F(b, c) {
        mk.call(this);
        this.b = [];
        this.o = -1;
        this.p = null;
        this.H = this.r = this.D = -1;
        this.n = null;
        this.W(b, c)
    }

    v(F, mk);
    l = F.prototype;
    l.kh = function (b) {
        null === this.j ? this.j = b.j.slice() : ab(this.j, b.j);
        this.b.push(this.j.length);
        this.l()
    };
    l.clone = function () {
        var b = new F(null);
        Uk(b, this.a, this.j.slice(), this.b.slice());
        return b
    };
    l.Ya = function (b, c, d, e) {
        if (e < Zd(this.J(), b, c))return e;
        this.r != this.d && (this.D = Math.sqrt(wk(this.j, 0, this.b, this.B, 0)), this.r = this.d);
        return yk(this.j, 0, this.b, this.B, this.D, !0, b, c, d, e)
    };
    l.Jb = function (b, c) {
        return Mk(Vk(this), 0, this.b, this.B, b, c)
    };
    l.Rj = function () {
        return rk(Vk(this), 0, this.b, this.B)
    };
    l.Q = function () {
        return Dk(this.j, 0, this.b, this.B)
    };
    function Wk(b) {
        if (b.o != b.d) {
            var c = le(b.J());
            b.p = Nk(Vk(b), 0, b.b, b.B, c, 0);
            b.o = b.d
        }
        return b.p
    }

    l.Mh = function () {
        return new Ik(Wk(this))
    };
    l.Sh = function () {
        return this.b.length
    };
    l.Rh = function (b) {
        if (0 > b || this.b.length <= b)return null;
        var c = new Gk(null);
        Hk(c, this.a, this.j.slice(0 === b ? 0 : this.b[b - 1], this.b[b]));
        return c
    };
    l.ld = function () {
        var b = this.a, c = this.j, d = this.b, e = [], f = 0, g, h;
        g = 0;
        for (h = d.length; g < h; ++g) {
            var k = d[g], n = new Gk(null);
            Hk(n, b, c.slice(f, k));
            e.push(n);
            f = k
        }
        return e
    };
    function Vk(b) {
        if (b.H != b.d) {
            var c = b.j;
            Sk(c, b.b, b.B) ? b.n = c : (b.n = c.slice(), b.n.length = Tk(b.n, 0, b.b, b.B));
            b.H = b.d
        }
        return b.n
    }

    l.oc = function (b) {
        var c = [], d = [];
        c.length = Fk(this.j, 0, this.b, this.B, Math.sqrt(b), c, 0, d);
        b = new F(null);
        Uk(b, "XY", c, d);
        return b
    };
    l.O = function () {
        return "Polygon"
    };
    l.ja = function (b) {
        return Qk(Vk(this), 0, this.b, this.B, b)
    };
    l.W = function (b, c) {
        if (null === b)Uk(this, "XY", null, this.b); else {
            pk(this, c, b, 2);
            null === this.j && (this.j = []);
            var d = Bk(this.j, 0, b, this.B, this.b);
            this.j.length = 0 === d.length ? 0 : d[d.length - 1];
            this.l()
        }
    };
    function Uk(b, c, d, e) {
        ok(b, c, d);
        b.b = e;
        b.l()
    }

    function Xk(b, c, d, e) {
        var f = m(e) ? e : 32;
        e = [];
        var g;
        for (g = 0; g < f; ++g)ab(e, b.offset(c, d, 2 * Math.PI * g / f));
        e.push(e[0], e[1]);
        b = new F(null);
        Uk(b, "XY", e, [e.length]);
        return b
    };
    function Yk(b, c, d, e, f, g, h) {
        rc.call(this, b, c);
        this.vectorContext = d;
        this.a = e;
        this.frameState = f;
        this.context = g;
        this.glContext = h
    }

    v(Yk, rc);
    function Zk(b) {
        this.b = this.d = this.f = this.c = this.a = null;
        this.e = b
    }

    v(Zk, mc);
    function $k(b) {
        var c = b.f, d = b.d;
        b = Sa([c, [c[0], d[1]], d, [d[0], c[1]]], b.a.ra, b.a);
        b[4] = b[0].slice();
        return new F([b])
    }

    Zk.prototype.P = function () {
        this.setMap(null)
    };
    Zk.prototype.g = function (b) {
        var c = this.b, d = this.e;
        b.vectorContext.kc(Infinity, function (b) {
            b.Ba(d.f, d.b);
            b.Ca(d.d);
            b.Rb(c, null)
        })
    };
    Zk.prototype.R = function () {
        return this.b
    };
    function al(b) {
        null === b.a || null === b.f || null === b.d || b.a.render()
    }

    Zk.prototype.setMap = function (b) {
        null !== this.c && (Xc(this.c), this.c = null, this.a.render(), this.a = null);
        this.a = b;
        null !== this.a && (this.c = w(b, "postcompose", this.g, !1, this), al(this))
    };
    function bl(b, c) {
        rc.call(this, b);
        this.coordinate = c
    }

    v(bl, rc);
    function cl(b) {
        Zj.call(this, {handleDownEvent: dl, handleDragEvent: el, handleUpEvent: fl});
        b = m(b) ? b : {};
        this.e = new Zk(m(b.style) ? b.style : null);
        this.a = null;
        this.i = m(b.condition) ? b.condition : cd
    }

    v(cl, Zj);
    function el(b) {
        if (Yj(b)) {
            var c = this.e;
            b = b.pixel;
            c.f = this.a;
            c.d = b;
            c.b = $k(c);
            al(c)
        }
    }

    cl.prototype.R = function () {
        return this.e.R()
    };
    cl.prototype.g = ca;
    function fl(b) {
        if (!Yj(b))return !0;
        this.e.setMap(null);
        var c = b.pixel[0] - this.a[0], d = b.pixel[1] - this.a[1];
        64 <= c * c + d * d && (this.g(b), this.dispatchEvent(new bl("boxend", b.coordinate)));
        return !1
    }

    function dl(b) {
        if (Yj(b) && Ac(b.a) && this.i(b)) {
            this.a = b.pixel;
            this.e.setMap(b.map);
            var c = this.e, d = this.a;
            c.f = this.a;
            c.d = d;
            c.b = $k(c);
            al(c);
            this.dispatchEvent(new bl("boxstart", b.coordinate));
            return !0
        }
        return !1
    };
    function gl() {
        this.d = -1
    };
    function hl() {
        this.d = -1;
        this.d = 64;
        this.a = Array(4);
        this.f = Array(this.d);
        this.c = this.b = 0;
        this.a[0] = 1732584193;
        this.a[1] = 4023233417;
        this.a[2] = 2562383102;
        this.a[3] = 271733878;
        this.c = this.b = 0
    }

    v(hl, gl);
    function il(b, c, d) {
        d || (d = 0);
        var e = Array(16);
        if (ia(c))for (var f = 0; 16 > f; ++f)e[f] = c.charCodeAt(d++) | c.charCodeAt(d++) << 8 | c.charCodeAt(d++) << 16 | c.charCodeAt(d++) << 24; else for (f = 0; 16 > f; ++f)e[f] = c[d++] | c[d++] << 8 | c[d++] << 16 | c[d++] << 24;
        c = b.a[0];
        d = b.a[1];
        var f = b.a[2], g = b.a[3], h = 0, h = c + (g ^ d & (f ^ g)) + e[0] + 3614090360 & 4294967295;
        c = d + (h << 7 & 4294967295 | h >>> 25);
        h = g + (f ^ c & (d ^ f)) + e[1] + 3905402710 & 4294967295;
        g = c + (h << 12 & 4294967295 | h >>> 20);
        h = f + (d ^ g & (c ^ d)) + e[2] + 606105819 & 4294967295;
        f = g + (h << 17 & 4294967295 | h >>> 15);
        h = d + (c ^ f & (g ^
        c)) + e[3] + 3250441966 & 4294967295;
        d = f + (h << 22 & 4294967295 | h >>> 10);
        h = c + (g ^ d & (f ^ g)) + e[4] + 4118548399 & 4294967295;
        c = d + (h << 7 & 4294967295 | h >>> 25);
        h = g + (f ^ c & (d ^ f)) + e[5] + 1200080426 & 4294967295;
        g = c + (h << 12 & 4294967295 | h >>> 20);
        h = f + (d ^ g & (c ^ d)) + e[6] + 2821735955 & 4294967295;
        f = g + (h << 17 & 4294967295 | h >>> 15);
        h = d + (c ^ f & (g ^ c)) + e[7] + 4249261313 & 4294967295;
        d = f + (h << 22 & 4294967295 | h >>> 10);
        h = c + (g ^ d & (f ^ g)) + e[8] + 1770035416 & 4294967295;
        c = d + (h << 7 & 4294967295 | h >>> 25);
        h = g + (f ^ c & (d ^ f)) + e[9] + 2336552879 & 4294967295;
        g = c + (h << 12 & 4294967295 | h >>> 20);
        h = f +
        (d ^ g & (c ^ d)) + e[10] + 4294925233 & 4294967295;
        f = g + (h << 17 & 4294967295 | h >>> 15);
        h = d + (c ^ f & (g ^ c)) + e[11] + 2304563134 & 4294967295;
        d = f + (h << 22 & 4294967295 | h >>> 10);
        h = c + (g ^ d & (f ^ g)) + e[12] + 1804603682 & 4294967295;
        c = d + (h << 7 & 4294967295 | h >>> 25);
        h = g + (f ^ c & (d ^ f)) + e[13] + 4254626195 & 4294967295;
        g = c + (h << 12 & 4294967295 | h >>> 20);
        h = f + (d ^ g & (c ^ d)) + e[14] + 2792965006 & 4294967295;
        f = g + (h << 17 & 4294967295 | h >>> 15);
        h = d + (c ^ f & (g ^ c)) + e[15] + 1236535329 & 4294967295;
        d = f + (h << 22 & 4294967295 | h >>> 10);
        h = c + (f ^ g & (d ^ f)) + e[1] + 4129170786 & 4294967295;
        c = d + (h << 5 & 4294967295 |
        h >>> 27);
        h = g + (d ^ f & (c ^ d)) + e[6] + 3225465664 & 4294967295;
        g = c + (h << 9 & 4294967295 | h >>> 23);
        h = f + (c ^ d & (g ^ c)) + e[11] + 643717713 & 4294967295;
        f = g + (h << 14 & 4294967295 | h >>> 18);
        h = d + (g ^ c & (f ^ g)) + e[0] + 3921069994 & 4294967295;
        d = f + (h << 20 & 4294967295 | h >>> 12);
        h = c + (f ^ g & (d ^ f)) + e[5] + 3593408605 & 4294967295;
        c = d + (h << 5 & 4294967295 | h >>> 27);
        h = g + (d ^ f & (c ^ d)) + e[10] + 38016083 & 4294967295;
        g = c + (h << 9 & 4294967295 | h >>> 23);
        h = f + (c ^ d & (g ^ c)) + e[15] + 3634488961 & 4294967295;
        f = g + (h << 14 & 4294967295 | h >>> 18);
        h = d + (g ^ c & (f ^ g)) + e[4] + 3889429448 & 4294967295;
        d = f + (h << 20 & 4294967295 |
        h >>> 12);
        h = c + (f ^ g & (d ^ f)) + e[9] + 568446438 & 4294967295;
        c = d + (h << 5 & 4294967295 | h >>> 27);
        h = g + (d ^ f & (c ^ d)) + e[14] + 3275163606 & 4294967295;
        g = c + (h << 9 & 4294967295 | h >>> 23);
        h = f + (c ^ d & (g ^ c)) + e[3] + 4107603335 & 4294967295;
        f = g + (h << 14 & 4294967295 | h >>> 18);
        h = d + (g ^ c & (f ^ g)) + e[8] + 1163531501 & 4294967295;
        d = f + (h << 20 & 4294967295 | h >>> 12);
        h = c + (f ^ g & (d ^ f)) + e[13] + 2850285829 & 4294967295;
        c = d + (h << 5 & 4294967295 | h >>> 27);
        h = g + (d ^ f & (c ^ d)) + e[2] + 4243563512 & 4294967295;
        g = c + (h << 9 & 4294967295 | h >>> 23);
        h = f + (c ^ d & (g ^ c)) + e[7] + 1735328473 & 4294967295;
        f = g + (h << 14 & 4294967295 |
        h >>> 18);
        h = d + (g ^ c & (f ^ g)) + e[12] + 2368359562 & 4294967295;
        d = f + (h << 20 & 4294967295 | h >>> 12);
        h = c + (d ^ f ^ g) + e[5] + 4294588738 & 4294967295;
        c = d + (h << 4 & 4294967295 | h >>> 28);
        h = g + (c ^ d ^ f) + e[8] + 2272392833 & 4294967295;
        g = c + (h << 11 & 4294967295 | h >>> 21);
        h = f + (g ^ c ^ d) + e[11] + 1839030562 & 4294967295;
        f = g + (h << 16 & 4294967295 | h >>> 16);
        h = d + (f ^ g ^ c) + e[14] + 4259657740 & 4294967295;
        d = f + (h << 23 & 4294967295 | h >>> 9);
        h = c + (d ^ f ^ g) + e[1] + 2763975236 & 4294967295;
        c = d + (h << 4 & 4294967295 | h >>> 28);
        h = g + (c ^ d ^ f) + e[4] + 1272893353 & 4294967295;
        g = c + (h << 11 & 4294967295 | h >>> 21);
        h = f + (g ^
        c ^ d) + e[7] + 4139469664 & 4294967295;
        f = g + (h << 16 & 4294967295 | h >>> 16);
        h = d + (f ^ g ^ c) + e[10] + 3200236656 & 4294967295;
        d = f + (h << 23 & 4294967295 | h >>> 9);
        h = c + (d ^ f ^ g) + e[13] + 681279174 & 4294967295;
        c = d + (h << 4 & 4294967295 | h >>> 28);
        h = g + (c ^ d ^ f) + e[0] + 3936430074 & 4294967295;
        g = c + (h << 11 & 4294967295 | h >>> 21);
        h = f + (g ^ c ^ d) + e[3] + 3572445317 & 4294967295;
        f = g + (h << 16 & 4294967295 | h >>> 16);
        h = d + (f ^ g ^ c) + e[6] + 76029189 & 4294967295;
        d = f + (h << 23 & 4294967295 | h >>> 9);
        h = c + (d ^ f ^ g) + e[9] + 3654602809 & 4294967295;
        c = d + (h << 4 & 4294967295 | h >>> 28);
        h = g + (c ^ d ^ f) + e[12] + 3873151461 & 4294967295;
        g = c + (h << 11 & 4294967295 | h >>> 21);
        h = f + (g ^ c ^ d) + e[15] + 530742520 & 4294967295;
        f = g + (h << 16 & 4294967295 | h >>> 16);
        h = d + (f ^ g ^ c) + e[2] + 3299628645 & 4294967295;
        d = f + (h << 23 & 4294967295 | h >>> 9);
        h = c + (f ^ (d | ~g)) + e[0] + 4096336452 & 4294967295;
        c = d + (h << 6 & 4294967295 | h >>> 26);
        h = g + (d ^ (c | ~f)) + e[7] + 1126891415 & 4294967295;
        g = c + (h << 10 & 4294967295 | h >>> 22);
        h = f + (c ^ (g | ~d)) + e[14] + 2878612391 & 4294967295;
        f = g + (h << 15 & 4294967295 | h >>> 17);
        h = d + (g ^ (f | ~c)) + e[5] + 4237533241 & 4294967295;
        d = f + (h << 21 & 4294967295 | h >>> 11);
        h = c + (f ^ (d | ~g)) + e[12] + 1700485571 & 4294967295;
        c = d +
        (h << 6 & 4294967295 | h >>> 26);
        h = g + (d ^ (c | ~f)) + e[3] + 2399980690 & 4294967295;
        g = c + (h << 10 & 4294967295 | h >>> 22);
        h = f + (c ^ (g | ~d)) + e[10] + 4293915773 & 4294967295;
        f = g + (h << 15 & 4294967295 | h >>> 17);
        h = d + (g ^ (f | ~c)) + e[1] + 2240044497 & 4294967295;
        d = f + (h << 21 & 4294967295 | h >>> 11);
        h = c + (f ^ (d | ~g)) + e[8] + 1873313359 & 4294967295;
        c = d + (h << 6 & 4294967295 | h >>> 26);
        h = g + (d ^ (c | ~f)) + e[15] + 4264355552 & 4294967295;
        g = c + (h << 10 & 4294967295 | h >>> 22);
        h = f + (c ^ (g | ~d)) + e[6] + 2734768916 & 4294967295;
        f = g + (h << 15 & 4294967295 | h >>> 17);
        h = d + (g ^ (f | ~c)) + e[13] + 1309151649 & 4294967295;
        d = f + (h << 21 & 4294967295 | h >>> 11);
        h = c + (f ^ (d | ~g)) + e[4] + 4149444226 & 4294967295;
        c = d + (h << 6 & 4294967295 | h >>> 26);
        h = g + (d ^ (c | ~f)) + e[11] + 3174756917 & 4294967295;
        g = c + (h << 10 & 4294967295 | h >>> 22);
        h = f + (c ^ (g | ~d)) + e[2] + 718787259 & 4294967295;
        f = g + (h << 15 & 4294967295 | h >>> 17);
        h = d + (g ^ (f | ~c)) + e[9] + 3951481745 & 4294967295;
        b.a[0] = b.a[0] + c & 4294967295;
        b.a[1] = b.a[1] + (f + (h << 21 & 4294967295 | h >>> 11)) & 4294967295;
        b.a[2] = b.a[2] + f & 4294967295;
        b.a[3] = b.a[3] + g & 4294967295
    }

    hl.prototype.update = function (b, c) {
        m(c) || (c = b.length);
        for (var d = c - this.d, e = this.f, f = this.b, g = 0; g < c;) {
            if (0 == f)for (; g <= d;)il(this, b, g), g += this.d;
            if (ia(b))for (; g < c;) {
                if (e[f++] = b.charCodeAt(g++), f == this.d) {
                    il(this, e);
                    f = 0;
                    break
                }
            } else for (; g < c;)if (e[f++] = b[g++], f == this.d) {
                il(this, e);
                f = 0;
                break
            }
        }
        this.b = f;
        this.c += c
    };
    function jl(b) {
        b = m(b) ? b : {};
        this.a = m(b.color) ? b.color : null;
        this.c = b.lineCap;
        this.b = m(b.lineDash) ? b.lineDash : null;
        this.f = b.lineJoin;
        this.e = b.miterLimit;
        this.d = b.width;
        this.g = void 0
    }

    l = jl.prototype;
    l.Mk = function () {
        return this.a
    };
    l.Oh = function () {
        return this.c
    };
    l.Nk = function () {
        return this.b
    };
    l.Ph = function () {
        return this.f
    };
    l.Vh = function () {
        return this.e
    };
    l.Ok = function () {
        return this.d
    };
    l.Pk = function (b) {
        this.a = b;
        this.g = void 0
    };
    l.Yl = function (b) {
        this.c = b;
        this.g = void 0
    };
    l.Qk = function (b) {
        this.b = b;
        this.g = void 0
    };
    l.Zl = function (b) {
        this.f = b;
        this.g = void 0
    };
    l.$l = function (b) {
        this.e = b;
        this.g = void 0
    };
    l.gm = function (b) {
        this.d = b;
        this.g = void 0
    };
    l.xb = function () {
        if (!m(this.g)) {
            var b = "s" + (null === this.a ? "-" : rg(this.a)) + "," + (m(this.c) ? this.c.toString() : "-") + "," + (null === this.b ? "-" : this.b.toString()) + "," + (m(this.f) ? this.f : "-") + "," + (m(this.e) ? this.e.toString() : "-") + "," + (m(this.d) ? this.d.toString() : "-"), c = new hl;
            c.update(b);
            var d = Array((56 > c.b ? c.d : 2 * c.d) - c.b);
            d[0] = 128;
            for (b = 1; b < d.length - 8; ++b)d[b] = 0;
            for (var e = 8 * c.c, b = d.length - 8; b < d.length; ++b)d[b] = e & 255, e /= 256;
            c.update(d);
            d = Array(16);
            for (b = e = 0; 4 > b; ++b)for (var f = 0; 32 > f; f += 8)d[e++] = c.a[b] >>> f & 255;
            if (8192 > d.length)c = String.fromCharCode.apply(null, d); else for (c = "", b = 0; b < d.length; b += 8192)c += String.fromCharCode.apply(null, cb(d, b, b + 8192));
            this.g = c
        }
        return this.g
    };
    var kl = [0, 0, 0, 1], ll = [], ml = [0, 0, 0, 1];

    function nl(b) {
        b = m(b) ? b : {};
        this.a = m(b.color) ? b.color : null;
        this.d = void 0
    }

    nl.prototype.b = function () {
        return this.a
    };
    nl.prototype.c = function (b) {
        this.a = b;
        this.d = void 0
    };
    nl.prototype.xb = function () {
        m(this.d) || (this.d = "f" + (null === this.a ? "-" : rg(this.a)));
        return this.d
    };
    function pl(b) {
        b = m(b) ? b : {};
        this.e = this.a = this.f = null;
        this.c = m(b.fill) ? b.fill : null;
        this.d = m(b.stroke) ? b.stroke : null;
        this.b = b.radius;
        this.q = [0, 0];
        this.n = this.D = this.g = null;
        var c = b.atlasManager, d, e = null, f, g = 0;
        null !== this.d && (f = rg(this.d.a), g = this.d.d, m(g) || (g = 1), e = this.d.b, Xf || (e = null));
        var h = 2 * (this.b + g) + 1;
        f = {strokeStyle: f, Uc: g, size: h, lineDash: e};
        m(c) ? (h = Math.round(h), (e = null === this.c) && (d = ra(this.Sf, this, f)), g = this.xb(), f = c.add(g, h, h, ra(this.Tf, this, f), d), this.a = f.image, this.q = [f.offsetX, f.offsetY],
            d = f.image.width, this.e = e ? f.xf : this.a) : (this.a = Df("CANVAS"), this.a.height = h, this.a.width = h, d = h = this.a.width, c = this.a.getContext("2d"), this.Tf(f, c, 0, 0), null === this.c ? (c = this.e = Df("CANVAS"), c.height = f.size, c.width = f.size, c = c.getContext("2d"), this.Sf(f, c, 0, 0)) : this.e = this.a);
        this.g = [h / 2, h / 2];
        this.D = [h, h];
        this.n = [d, d];
        uj.call(this, {
            opacity: 1,
            rotateWithView: !1,
            rotation: 0,
            scale: 1,
            snapToPixel: m(b.snapToPixel) ? b.snapToPixel : !0
        })
    }

    v(pl, uj);
    l = pl.prototype;
    l.wb = function () {
        return this.g
    };
    l.Dk = function () {
        return this.c
    };
    l.Kd = function () {
        return this.e
    };
    l.Bb = function () {
        return this.a
    };
    l.Pc = function () {
        return 2
    };
    l.kd = function () {
        return this.n
    };
    l.Cb = function () {
        return this.q
    };
    l.Ek = function () {
        return this.b
    };
    l.gb = function () {
        return this.D
    };
    l.Fk = function () {
        return this.d
    };
    l.xe = ca;
    l.load = ca;
    l.Oe = ca;
    l.Tf = function (b, c, d, e) {
        c.setTransform(1, 0, 0, 1, 0, 0);
        c.translate(d, e);
        c.beginPath();
        c.arc(b.size / 2, b.size / 2, this.b, 0, 2 * Math.PI, !0);
        null !== this.c && (c.fillStyle = rg(this.c.a), c.fill());
        null !== this.d && (c.strokeStyle = b.strokeStyle, c.lineWidth = b.Uc, null === b.lineDash || c.setLineDash(b.lineDash), c.stroke());
        c.closePath()
    };
    l.Sf = function (b, c, d, e) {
        c.setTransform(1, 0, 0, 1, 0, 0);
        c.translate(d, e);
        c.beginPath();
        c.arc(b.size / 2, b.size / 2, this.b, 0, 2 * Math.PI, !0);
        c.fillStyle = kl;
        c.fill();
        null !== this.d && (c.strokeStyle = b.strokeStyle, c.lineWidth = b.Uc, null === b.lineDash || c.setLineDash(b.lineDash), c.stroke());
        c.closePath()
    };
    l.xb = function () {
        var b = null === this.d ? "-" : this.d.xb(), c = null === this.c ? "-" : this.c.xb();
        if (null === this.f || b != this.f[1] || c != this.f[2] || this.b != this.f[3])this.f = ["c" + b + c + (m(this.b) ? this.b.toString() : "-"), b, c, this.b];
        return this.f[0]
    };
    function ql(b) {
        b = m(b) ? b : {};
        this.g = null;
        this.c = rl;
        m(b.geometry) && this.Wf(b.geometry);
        this.f = m(b.fill) ? b.fill : null;
        this.e = m(b.image) ? b.image : null;
        this.b = m(b.stroke) ? b.stroke : null;
        this.d = m(b.text) ? b.text : null;
        this.a = b.zIndex
    }

    l = ql.prototype;
    l.R = function () {
        return this.g
    };
    l.Ih = function () {
        return this.c
    };
    l.Rk = function () {
        return this.f
    };
    l.Sk = function () {
        return this.e
    };
    l.Tk = function () {
        return this.b
    };
    l.Uk = function () {
        return this.d
    };
    l.ji = function () {
        return this.a
    };
    l.Wf = function (b) {
        ka(b) ? this.c = b : ia(b) ? this.c = function (c) {
            return c.get(b)
        } : null === b ? this.c = rl : m(b) && (this.c = function () {
            return b
        });
        this.g = b
    };
    l.im = function (b) {
        this.a = b
    };
    function sl(b) {
        ka(b) || (b = ga(b) ? b : [b], b = ad(b));
        return b
    }

    function tl() {
        var b = new nl({color: "rgba(255,255,255,0.4)"}), c = new jl({
            color: "#3399CC",
            width: 1.25
        }), d = [new ql({image: new pl({fill: b, stroke: c, radius: 5}), fill: b, stroke: c})];
        tl = function () {
            return d
        };
        return d
    }

    function ul() {
        var b = {}, c = [255, 255, 255, 1], d = [0, 153, 255, 1];
        b.Polygon = [new ql({fill: new nl({color: [255, 255, 255, .5]})})];
        b.MultiPolygon = b.Polygon;
        b.LineString = [new ql({stroke: new jl({color: c, width: 5})}), new ql({stroke: new jl({color: d, width: 3})})];
        b.MultiLineString = b.LineString;
        b.Circle = b.Polygon.concat(b.LineString);
        b.Point = [new ql({
            image: new pl({radius: 6, fill: new nl({color: d}), stroke: new jl({color: c, width: 1.5})}),
            zIndex: Infinity
        })];
        b.MultiPoint = b.Point;
        b.GeometryCollection = b.Polygon.concat(b.Point);
        return b
    }

    function rl(b) {
        return b.R()
    };
    function vl(b) {
        var c = m(b) ? b : {};
        b = m(c.condition) ? c.condition : Wj;
        c = m(c.style) ? c.style : new ql({stroke: new jl({color: [0, 0, 255, 1]})});
        cl.call(this, {condition: b, style: c})
    }

    v(vl, cl);
    vl.prototype.g = function () {
        var b = this.k, c = b.a(), d = this.R().J(), e = le(d), f = b.f(), d = c.k(d, f), d = c.constrainResolution(d, 0, void 0);
        Pj(b, c, d, e, 200)
    };
    function wl(b) {
        Mj.call(this, {handleEvent: xl});
        b = m(b) ? b : {};
        this.a = m(b.condition) ? b.condition : hd(Vj, Xj);
        this.f = m(b.pixelDelta) ? b.pixelDelta : 128
    }

    v(wl, Mj);
    function xl(b) {
        var c = !1;
        if ("key" == b.type) {
            var d = b.a.f;
            if (this.a(b) && (40 == d || 37 == d || 39 == d || 38 == d)) {
                var e = b.map, c = e.a(), f = Ye(c), g = f.resolution * this.f, h = 0, k = 0;
                40 == d ? k = -g : 37 == d ? h = -g : 39 == d ? h = g : k = g;
                d = [h, k];
                Bd(d, f.rotation);
                f = c.b();
                m(f) && (m(100) && e.La(df({
                    source: f,
                    duration: 100,
                    easing: bf
                })), e = c.i([f[0] + d[0], f[1] + d[1]]), c.Ha(e));
                b.preventDefault();
                c = !0
            }
        }
        return !c
    };
    function yl(b) {
        Mj.call(this, {handleEvent: zl});
        b = m(b) ? b : {};
        this.f = m(b.condition) ? b.condition : Xj;
        this.a = m(b.delta) ? b.delta : 1;
        this.e = m(b.duration) ? b.duration : 100
    }

    v(yl, Mj);
    function zl(b) {
        var c = !1;
        if ("key" == b.type) {
            var d = b.a.i;
            if (this.f(b) && (43 == d || 45 == d)) {
                c = b.map;
                d = 43 == d ? this.a : -this.a;
                c.render();
                var e = c.a();
                Oj(c, e, d, void 0, this.e);
                b.preventDefault();
                c = !0
            }
        }
        return !c
    };
    function Al(b) {
        Mj.call(this, {handleEvent: Bl});
        b = m(b) ? b : {};
        this.a = 0;
        this.q = m(b.duration) ? b.duration : 250;
        this.e = null;
        this.g = this.f = void 0
    }

    v(Al, Mj);
    function Bl(b) {
        var c = !1;
        if ("mousewheel" == b.type) {
            var c = b.map, d = b.a;
            this.e = b.coordinate;
            this.a += d.q;
            m(this.f) || (this.f = ta());
            d = Math.max(80 - (ta() - this.f), 0);
            ba.clearTimeout(this.g);
            this.g = ba.setTimeout(ra(this.i, this, c), d);
            b.preventDefault();
            c = !0
        }
        return !c
    }

    Al.prototype.i = function (b) {
        var c = Wb(this.a, -1, 1), d = b.a();
        b.render();
        Oj(b, d, -c, this.e, this.q);
        this.a = 0;
        this.e = null;
        this.g = this.f = void 0
    };
    function Cl(b) {
        Zj.call(this, {handleDownEvent: Dl, handleDragEvent: El, handleUpEvent: Fl});
        b = m(b) ? b : {};
        this.e = null;
        this.g = void 0;
        this.a = !1;
        this.i = 0;
        this.q = m(b.threshold) ? b.threshold : .3
    }

    v(Cl, Zj);
    function El(b) {
        var c = 0, d = this.f[0], e = this.f[1], d = Math.atan2(e.clientY - d.clientY, e.clientX - d.clientX);
        m(this.g) && (c = d - this.g, this.i += c, !this.a && Math.abs(this.i) > this.q && (this.a = !0));
        this.g = d;
        b = b.map;
        d = Ig(b.b);
        e = bk(this.f);
        e[0] -= d.x;
        e[1] -= d.y;
        this.e = b.ra(e);
        this.a && (d = b.a(), e = d.c(), b.render(), Nj(b, d, e + c, this.e))
    }

    function Fl(b) {
        if (2 > this.f.length) {
            b = b.map;
            var c = b.a();
            Ze(c, -1);
            if (this.a) {
                var d = c.c(), e = this.e, d = c.constrainRotation(d, 0);
                Nj(b, c, d, e, 250)
            }
            return !1
        }
        return !0
    }

    function Dl(b) {
        return 2 <= this.f.length ? (b = b.map, this.e = null, this.g = void 0, this.a = !1, this.i = 0, this.p || Ze(b.a(), 1), b.render(), !0) : !1
    }

    Cl.prototype.r = bd;
    function Gl(b) {
        Zj.call(this, {handleDownEvent: Hl, handleDragEvent: Il, handleUpEvent: Jl});
        b = m(b) ? b : {};
        this.e = null;
        this.i = m(b.duration) ? b.duration : 400;
        this.a = void 0;
        this.g = 1
    }

    v(Gl, Zj);
    function Il(b) {
        var c = 1, d = this.f[0], e = this.f[1], f = d.clientX - e.clientX, d = d.clientY - e.clientY, f = Math.sqrt(f * f + d * d);
        m(this.a) && (c = this.a / f);
        this.a = f;
        1 != c && (this.g = c);
        b = b.map;
        var f = b.a(), d = f.a(), e = Ig(b.b), g = bk(this.f);
        g[0] -= e.x;
        g[1] -= e.y;
        this.e = b.ra(g);
        b.render();
        Pj(b, f, d * c, this.e)
    }

    function Jl(b) {
        if (2 > this.f.length) {
            b = b.map;
            var c = b.a();
            Ze(c, -1);
            var d = c.a(), e = this.e, f = this.i, d = c.constrainResolution(d, 0, this.g - 1);
            Pj(b, c, d, e, f);
            return !1
        }
        return !0
    }

    function Hl(b) {
        return 2 <= this.f.length ? (b = b.map, this.e = null, this.a = void 0, this.g = 1, this.p || Ze(b.a(), 1), b.render(), !0) : !1
    }

    Gl.prototype.r = bd;
    function Kl(b) {
        b = m(b) ? b : {};
        var c = new kg, d = new Jj(-.005, .05, 100);
        (m(b.altShiftDragRotate) ? b.altShiftDragRotate : 1) && c.push(new gk);
        (m(b.doubleClickZoom) ? b.doubleClickZoom : 1) && c.push(new Qj({
            delta: b.zoomDelta,
            duration: b.zoomDuration
        }));
        (m(b.dragPan) ? b.dragPan : 1) && c.push(new ck({kinetic: d}));
        (m(b.pinchRotate) ? b.pinchRotate : 1) && c.push(new Cl);
        (m(b.pinchZoom) ? b.pinchZoom : 1) && c.push(new Gl({duration: b.zoomDuration}));
        if (m(b.keyboard) ? b.keyboard : 1)c.push(new wl), c.push(new yl({
            delta: b.zoomDelta,
            duration: b.zoomDuration
        }));
        (m(b.mouseWheelZoom) ? b.mouseWheelZoom : 1) && c.push(new Al({duration: b.zoomDuration}));
        (m(b.shiftDragZoom) ? b.shiftDragZoom : 1) && c.push(new vl);
        return c
    };
    function G(b) {
        var c = m(b) ? b : {};
        b = Bb(c);
        delete b.layers;
        c = c.layers;
        C.call(this, b);
        this.a = null;
        w(this, vd("layers"), this.Di, !1, this);
        null != c ? ga(c) && (c = new kg(c.slice())) : c = new kg;
        this.r(c)
    }

    v(G, C);
    l = G.prototype;
    l.tf = function () {
        this.b() && this.l()
    };
    l.Di = function () {
        null !== this.a && (Qa(rb(this.a), Xc), this.a = null);
        var b = this.ac();
        if (null != b) {
            this.a = {add: w(b, "add", this.Ci, !1, this), remove: w(b, "remove", this.Ei, !1, this)};
            var b = b.a, c, d, e;
            c = 0;
            for (d = b.length; c < d; c++)e = b[c], this.a[ma(e).toString()] = w(e, ["propertychange", "change"], this.tf, !1, this)
        }
        this.l()
    };
    l.Ci = function (b) {
        b = b.element;
        this.a[ma(b).toString()] = w(b, ["propertychange", "change"], this.tf, !1, this);
        this.l()
    };
    l.Ei = function (b) {
        b = ma(b.element).toString();
        Xc(this.a[b]);
        delete this.a[b];
        this.l()
    };
    l.ac = function () {
        return this.get("layers")
    };
    G.prototype.getLayers = G.prototype.ac;
    G.prototype.r = function (b) {
        this.set("layers", b)
    };
    G.prototype.setLayers = G.prototype.r;
    G.prototype.Xa = function (b) {
        var c = m(b) ? b : [], d = c.length;
        this.ac().forEach(function (b) {
            b.Xa(c)
        });
        b = Li(this);
        var e, f;
        for (e = c.length; d < e; d++)f = c[d], f.brightness = Wb(f.brightness + b.brightness, -1, 1), f.contrast *= b.contrast, f.hue += b.hue, f.opacity *= b.opacity, f.saturation *= b.saturation, f.visible = f.visible && b.visible, f.maxResolution = Math.min(f.maxResolution, b.maxResolution), f.minResolution = Math.max(f.minResolution, b.minResolution), m(b.extent) && (f.extent = m(f.extent) ? pe(f.extent, b.extent) : b.extent);
        return c
    };
    G.prototype.kb = function () {
        return "ready"
    };
    function Ll(b) {
        ye.call(this, {code: b, units: "m", extent: Ml, global: !0, worldExtent: Nl})
    }

    v(Ll, ye);
    Ll.prototype.te = function (b, c) {
        var d = c[1] / 6378137;
        return b / ((Math.exp(d) + Math.exp(-d)) / 2)
    };
    var Ol = 6378137 * Math.PI, Ml = [-Ol, -Ol, Ol, Ol], Nl = [-180, -85, 180, 85], Je = Sa("EPSG:3857 EPSG:102100 EPSG:102113 EPSG:900913 urn:ogc:def:crs:EPSG:6.18:3:3857 urn:ogc:def:crs:EPSG::3857 http://www.opengis.net/gml/srs/epsg.xml#3857".split(" "), function (b) {
        return new Ll(b)
    });

    function Ke(b, c, d) {
        var e = b.length;
        d = 1 < d ? d : 2;
        m(c) || (2 < d ? c = b.slice() : c = Array(e));
        for (var f = 0; f < e; f += d)c[f] = 6378137 * Math.PI * b[f] / 180, c[f + 1] = 6378137 * Math.log(Math.tan(Math.PI * (b[f + 1] + 90) / 360));
        return c
    }

    function Le(b, c, d) {
        var e = b.length;
        d = 1 < d ? d : 2;
        m(c) || (2 < d ? c = b.slice() : c = Array(e));
        for (var f = 0; f < e; f += d)c[f] = 180 * b[f] / (6378137 * Math.PI), c[f + 1] = 360 * Math.atan(Math.exp(b[f + 1] / 6378137)) / Math.PI - 90;
        return c
    };
    function Pl(b, c) {
        ye.call(this, {code: b, units: "degrees", extent: Ql, axisOrientation: c, global: !0, worldExtent: Ql})
    }

    v(Pl, ye);
    Pl.prototype.te = function (b) {
        return b
    };
    var Ql = [-180, -90, 180, 90], Me = [new Pl("CRS:84"), new Pl("EPSG:4326", "neu"), new Pl("urn:ogc:def:crs:EPSG::4326", "neu"), new Pl("urn:ogc:def:crs:EPSG:6.6:4326", "neu"), new Pl("urn:ogc:def:crs:OGC:1.3:CRS84"), new Pl("urn:ogc:def:crs:OGC:2:84"), new Pl("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"), new Pl("urn:x-ogc:def:crs:EPSG:4326", "neu")];

    function Rl() {
        Ee(Je);
        Ee(Me);
        Ie()
    };
    function H(b) {
        E.call(this, m(b) ? b : {})
    }

    v(H, E);
    function I(b) {
        b = m(b) ? b : {};
        var c = Bb(b);
        delete c.preload;
        delete c.useInterimTilesOnError;
        E.call(this, c);
        this.ia(m(b.preload) ? b.preload : 0);
        this.ka(m(b.useInterimTilesOnError) ? b.useInterimTilesOnError : !0)
    }

    v(I, E);
    I.prototype.r = function () {
        return this.get("preload")
    };
    I.prototype.getPreload = I.prototype.r;
    I.prototype.ia = function (b) {
        this.set("preload", b)
    };
    I.prototype.setPreload = I.prototype.ia;
    I.prototype.ea = function () {
        return this.get("useInterimTilesOnError")
    };
    I.prototype.getUseInterimTilesOnError = I.prototype.ea;
    I.prototype.ka = function (b) {
        this.set("useInterimTilesOnError", b)
    };
    I.prototype.setUseInterimTilesOnError = I.prototype.ka;
    function J(b) {
        b = m(b) ? b : {};
        var c = Bb(b);
        delete c.style;
        delete c.renderBuffer;
        delete c.updateWhileAnimating;
        E.call(this, c);
        this.ea = m(b.renderBuffer) ? b.renderBuffer : 100;
        this.vc = null;
        this.r = void 0;
        this.ka(b.style);
        this.Ac = m(b.updateWhileAnimating) ? b.updateWhileAnimating : !1
    }

    v(J, E);
    J.prototype.af = function () {
        return this.vc
    };
    J.prototype.df = function () {
        return this.r
    };
    J.prototype.ka = function (b) {
        this.vc = m(b) ? b : tl;
        this.r = null === b ? void 0 : sl(this.vc);
        this.l()
    };
    function Sl(b, c, d, e, f) {
        this.o = {};
        this.b = b;
        this.r = c;
        this.f = d;
        this.H = e;
        this.kb = f;
        this.e = this.a = this.d = this.fa = this.pa = this.oa = null;
        this.ea = this.Da = this.q = this.U = this.S = this.N = 0;
        this.ia = !1;
        this.g = this.ka = 0;
        this.va = !1;
        this.ca = 0;
        this.c = "";
        this.i = this.D = this.Fa = this.Ea = 0;
        this.da = this.k = this.n = null;
        this.p = [];
        this.Xa = Id()
    }

    function Tl(b, c, d) {
        if (null !== b.e) {
            c = lk(c, 0, d, 2, b.H, b.p);
            d = b.b;
            var e = b.Xa, f = d.globalAlpha;
            1 != b.q && (d.globalAlpha = f * b.q);
            var g = b.ka;
            b.ia && (g += b.kb);
            var h, k;
            h = 0;
            for (k = c.length; h < k; h += 2) {
                var n = c[h] - b.N, p = c[h + 1] - b.S;
                b.va && (n = n + .5 | 0, p = p + .5 | 0);
                if (0 !== g || 1 != b.g) {
                    var q = n + b.N, r = p + b.S;
                    gj(e, q, r, b.g, b.g, g, -q, -r);
                    d.setTransform(e[0], e[1], e[4], e[5], e[12], e[13])
                }
                d.drawImage(b.e, b.Da, b.ea, b.ca, b.U, n, p, b.ca, b.U)
            }
            0 === g && 1 == b.g || d.setTransform(1, 0, 0, 1, 0, 0);
            1 != b.q && (d.globalAlpha = f)
        }
    }

    function Ul(b, c, d, e) {
        var f = 0;
        if (null !== b.da && "" !== b.c) {
            null === b.n || Vl(b, b.n);
            null === b.k || Wl(b, b.k);
            var g = b.da, h = b.b, k = b.fa;
            null === k ? (h.font = g.font, h.textAlign = g.textAlign, h.textBaseline = g.textBaseline, b.fa = {
                font: g.font,
                textAlign: g.textAlign,
                textBaseline: g.textBaseline
            }) : (k.font != g.font && (k.font = h.font = g.font), k.textAlign != g.textAlign && (k.textAlign = h.textAlign = g.textAlign), k.textBaseline != g.textBaseline && (k.textBaseline = h.textBaseline = g.textBaseline));
            c = lk(c, f, d, e, b.H, b.p);
            for (g = b.b; f < d; f += e) {
                h = c[f] +
                b.Ea;
                k = c[f + 1] + b.Fa;
                if (0 !== b.D || 1 != b.i) {
                    var n = gj(b.Xa, h, k, b.i, b.i, b.D, -h, -k);
                    g.setTransform(n[0], n[1], n[4], n[5], n[12], n[13])
                }
                null === b.k || g.strokeText(b.c, h, k);
                null === b.n || g.fillText(b.c, h, k)
            }
            0 === b.D && 1 == b.i || g.setTransform(1, 0, 0, 1, 0, 0)
        }
    }

    function Xl(b, c, d, e, f, g) {
        var h = b.b;
        b = lk(c, d, e, f, b.H, b.p);
        h.moveTo(b[0], b[1]);
        for (c = 2; c < b.length; c += 2)h.lineTo(b[c], b[c + 1]);
        g && h.lineTo(b[0], b[1]);
        return e
    }

    function Yl(b, c, d, e, f) {
        var g = b.b, h, k;
        h = 0;
        for (k = e.length; h < k; ++h)d = Xl(b, c, d, e[h], f, !0), g.closePath();
        return d
    }

    l = Sl.prototype;
    l.kc = function (b, c) {
        var d = b.toString(), e = this.o[d];
        m(e) ? e.push(c) : this.o[d] = [c]
    };
    l.lc = function (b) {
        if (qe(this.f, b.J())) {
            if (null !== this.d || null !== this.a) {
                null === this.d || Vl(this, this.d);
                null === this.a || Wl(this, this.a);
                var c;
                c = b.j;
                c = null === c ? null : lk(c, 0, c.length, b.B, this.H, this.p);
                var d = c[2] - c[0], e = c[3] - c[1], d = Math.sqrt(d * d + e * e), e = this.b;
                e.beginPath();
                e.arc(c[0], c[1], d, 0, 2 * Math.PI);
                null === this.d || e.fill();
                null === this.a || e.stroke()
            }
            "" !== this.c && Ul(this, b.Oc(), 2, 2)
        }
    };
    l.oe = function (b, c) {
        var d = (0, c.c)(b);
        if (null != d && qe(this.f, d.J())) {
            var e = c.a;
            m(e) || (e = 0);
            this.kc(e, function (b) {
                b.Ba(c.f, c.b);
                b.ib(c.e);
                b.Ca(c.d);
                Zl[d.O()].call(b, d, null)
            })
        }
    };
    l.fd = function (b, c) {
        var d = b.c, e, f;
        e = 0;
        for (f = d.length; e < f; ++e) {
            var g = d[e];
            Zl[g.O()].call(this, g, c)
        }
    };
    l.ub = function (b) {
        var c = b.j;
        b = b.B;
        null === this.e || Tl(this, c, c.length);
        "" !== this.c && Ul(this, c, c.length, b)
    };
    l.tb = function (b) {
        var c = b.j;
        b = b.B;
        null === this.e || Tl(this, c, c.length);
        "" !== this.c && Ul(this, c, c.length, b)
    };
    l.Eb = function (b) {
        if (qe(this.f, b.J())) {
            if (null !== this.a) {
                Wl(this, this.a);
                var c = this.b, d = b.j;
                c.beginPath();
                Xl(this, d, 0, d.length, b.B, !1);
                c.stroke()
            }
            "" !== this.c && (b = am(b), Ul(this, b, 2, 2))
        }
    };
    l.mc = function (b) {
        var c = b.J();
        if (qe(this.f, c)) {
            if (null !== this.a) {
                Wl(this, this.a);
                var c = this.b, d = b.j, e = 0, f = b.b, g = b.B;
                c.beginPath();
                var h, k;
                h = 0;
                for (k = f.length; h < k; ++h)e = Xl(this, d, e, f[h], g, !1);
                c.stroke()
            }
            "" !== this.c && (b = bm(b), Ul(this, b, b.length, 2))
        }
    };
    l.Rb = function (b) {
        if (qe(this.f, b.J())) {
            if (null !== this.a || null !== this.d) {
                null === this.d || Vl(this, this.d);
                null === this.a || Wl(this, this.a);
                var c = this.b;
                c.beginPath();
                Yl(this, Vk(b), 0, b.b, b.B);
                null === this.d || c.fill();
                null === this.a || c.stroke()
            }
            "" !== this.c && (b = Wk(b), Ul(this, b, 2, 2))
        }
    };
    l.nc = function (b) {
        if (qe(this.f, b.J())) {
            if (null !== this.a || null !== this.d) {
                null === this.d || Vl(this, this.d);
                null === this.a || Wl(this, this.a);
                var c = this.b, d = cm(b), e = 0, f = b.b, g = b.B, h, k;
                h = 0;
                for (k = f.length; h < k; ++h) {
                    var n = f[h];
                    c.beginPath();
                    e = Yl(this, d, e, n, g);
                    null === this.d || c.fill();
                    null === this.a || c.stroke()
                }
            }
            "" !== this.c && (b = dm(b), Ul(this, b, b.length, 2))
        }
    };
    function em(b) {
        var c = Sa(sb(b.o), Number);
        db(c);
        var d, e, f, g, h;
        d = 0;
        for (e = c.length; d < e; ++d)for (f = b.o[c[d].toString()], g = 0, h = f.length; g < h; ++g)f[g](b)
    }

    function Vl(b, c) {
        var d = b.b, e = b.oa;
        null === e ? (d.fillStyle = c.fillStyle, b.oa = {fillStyle: c.fillStyle}) : e.fillStyle != c.fillStyle && (e.fillStyle = d.fillStyle = c.fillStyle)
    }

    function Wl(b, c) {
        var d = b.b, e = b.pa;
        null === e ? (d.lineCap = c.lineCap, Xf && d.setLineDash(c.lineDash), d.lineJoin = c.lineJoin, d.lineWidth = c.lineWidth, d.miterLimit = c.miterLimit, d.strokeStyle = c.strokeStyle, b.pa = {
            lineCap: c.lineCap,
            lineDash: c.lineDash,
            lineJoin: c.lineJoin,
            lineWidth: c.lineWidth,
            miterLimit: c.miterLimit,
            strokeStyle: c.strokeStyle
        }) : (e.lineCap != c.lineCap && (e.lineCap = d.lineCap = c.lineCap), Xf && !fb(e.lineDash, c.lineDash) && d.setLineDash(e.lineDash = c.lineDash), e.lineJoin != c.lineJoin && (e.lineJoin = d.lineJoin =
            c.lineJoin), e.lineWidth != c.lineWidth && (e.lineWidth = d.lineWidth = c.lineWidth), e.miterLimit != c.miterLimit && (e.miterLimit = d.miterLimit = c.miterLimit), e.strokeStyle != c.strokeStyle && (e.strokeStyle = d.strokeStyle = c.strokeStyle))
    }

    l.Ba = function (b, c) {
        if (null === b)this.d = null; else {
            var d = b.a;
            this.d = {fillStyle: rg(null === d ? kl : d)}
        }
        if (null === c)this.a = null; else {
            var d = c.a, e = c.c, f = c.b, g = c.f, h = c.d, k = c.e;
            this.a = {
                lineCap: m(e) ? e : "round",
                lineDash: null != f ? f : ll,
                lineJoin: m(g) ? g : "round",
                lineWidth: this.r * (m(h) ? h : 1),
                miterLimit: m(k) ? k : 10,
                strokeStyle: rg(null === d ? ml : d)
            }
        }
    };
    l.ib = function (b) {
        if (null === b)this.e = null; else {
            var c = b.wb(), d = b.Bb(1), e = b.Cb(), f = b.gb();
            this.N = c[0];
            this.S = c[1];
            this.U = f[1];
            this.e = d;
            this.q = b.o;
            this.Da = e[0];
            this.ea = e[1];
            this.ia = b.p;
            this.ka = b.i;
            this.g = b.k;
            this.va = b.r;
            this.ca = f[0]
        }
    };
    l.Ca = function (b) {
        if (null === b)this.c = ""; else {
            var c = b.a;
            null === c ? this.n = null : (c = c.a, this.n = {fillStyle: rg(null === c ? kl : c)});
            var d = b.e;
            if (null === d)this.k = null; else {
                var c = d.a, e = d.c, f = d.b, g = d.f, h = d.d, d = d.e;
                this.k = {
                    lineCap: m(e) ? e : "round",
                    lineDash: null != f ? f : ll,
                    lineJoin: m(g) ? g : "round",
                    lineWidth: m(h) ? h : 1,
                    miterLimit: m(d) ? d : 10,
                    strokeStyle: rg(null === c ? ml : c)
                }
            }
            var c = b.c, e = b.i, f = b.k, g = b.f, h = b.d, d = b.b, k = b.g;
            b = b.n;
            this.da = {
                font: m(c) ? c : "10px sans-serif",
                textAlign: m(k) ? k : "center",
                textBaseline: m(b) ? b : "middle"
            };
            this.c =
                m(d) ? d : "";
            this.Ea = m(e) ? this.r * e : 0;
            this.Fa = m(f) ? this.r * f : 0;
            this.D = m(g) ? g : 0;
            this.i = this.r * (m(h) ? h : 1)
        }
    };
    var Zl = {
        Point: Sl.prototype.ub,
        LineString: Sl.prototype.Eb,
        Polygon: Sl.prototype.Rb,
        MultiPoint: Sl.prototype.tb,
        MultiLineString: Sl.prototype.mc,
        MultiPolygon: Sl.prototype.nc,
        GeometryCollection: Sl.prototype.fd,
        Circle: Sl.prototype.lc
    };
    var fm = ["Polygon", "LineString", "Image", "Text"];

    function gm(b, c, d) {
        this.fa = b;
        this.ca = c;
        this.c = null;
        this.f = 0;
        this.resolution = d;
        this.S = this.N = null;
        this.d = [];
        this.coordinates = [];
        this.oa = Id();
        this.a = [];
        this.da = [];
        this.pa = Id()
    }

    function hm(b, c, d, e, f, g) {
        var h = b.coordinates.length, k = b.re(), n = [c[d], c[d + 1]], p = [NaN, NaN], q = !0, r, s, u;
        for (r = d + f; r < e; r += f)p[0] = c[r], p[1] = c[r + 1], u = be(k, p), u !== s ? (q && (b.coordinates[h++] = n[0], b.coordinates[h++] = n[1]), b.coordinates[h++] = p[0], b.coordinates[h++] = p[1], q = !1) : 1 === u ? (b.coordinates[h++] = p[0], b.coordinates[h++] = p[1], q = !1) : q = !0, n[0] = p[0], n[1] = p[1], s = u;
        r === d + f && (b.coordinates[h++] = n[0], b.coordinates[h++] = n[1]);
        g && (b.coordinates[h++] = c[d], b.coordinates[h++] = c[d + 1]);
        return h
    }

    function im(b, c) {
        b.N = [0, c, 0];
        b.d.push(b.N);
        b.S = [0, c, 0];
        b.a.push(b.S)
    }

    function jm(b, c, d, e, f, g, h, k, n) {
        var p;
        hj(e, b.oa) ? p = b.da : (p = lk(b.coordinates, 0, b.coordinates.length, 2, e, b.da), Ld(b.oa, e));
        e = 0;
        var q = h.length, r = 0, s;
        for (b = b.pa; e < q;) {
            var u = h[e], z, y, A, D;
            switch (u[0]) {
                case 0:
                    r = u[1];
                    s = ma(r).toString();
                    m(g[s]) ? e = u[2] : m(n) && !qe(n, r.R().J()) ? e = u[2] : ++e;
                    break;
                case 1:
                    c.beginPath();
                    ++e;
                    break;
                case 2:
                    r = u[1];
                    s = p[r];
                    var x = p[r + 1], M = p[r + 2] - s, r = p[r + 3] - x;
                    c.arc(s, x, Math.sqrt(M * M + r * r), 0, 2 * Math.PI, !0);
                    ++e;
                    break;
                case 3:
                    c.closePath();
                    ++e;
                    break;
                case 4:
                    r = u[1];
                    s = u[2];
                    z = u[3];
                    A = u[4] * d;
                    var Q = u[5] *
                        d, O = u[6];
                    y = u[7];
                    var W = u[8], Ja = u[9], x = u[11], M = u[12], lb = u[13], Ka = u[14];
                    for (u[10] && (x += f); r < s; r += 2) {
                        u = p[r] - A;
                        D = p[r + 1] - Q;
                        lb && (u = u + .5 | 0, D = D + .5 | 0);
                        if (1 != M || 0 !== x) {
                            var mb = u + A, Qb = D + Q;
                            gj(b, mb, Qb, M, M, x, -mb, -Qb);
                            c.setTransform(b[0], b[1], b[4], b[5], b[12], b[13])
                        }
                        mb = c.globalAlpha;
                        1 != y && (c.globalAlpha = mb * y);
                        c.drawImage(z, W, Ja, Ka, O, u, D, Ka * d, O * d);
                        1 != y && (c.globalAlpha = mb);
                        1 == M && 0 === x || c.setTransform(1, 0, 0, 1, 0, 0)
                    }
                    ++e;
                    break;
                case 5:
                    r = u[1];
                    s = u[2];
                    A = u[3];
                    Q = u[4] * d;
                    O = u[5] * d;
                    x = u[6];
                    M = u[7] * d;
                    z = u[8];
                    for (y = u[9]; r < s; r += 2) {
                        u = p[r] +
                        Q;
                        D = p[r + 1] + O;
                        if (1 != M || 0 !== x)gj(b, u, D, M, M, x, -u, -D), c.setTransform(b[0], b[1], b[4], b[5], b[12], b[13]);
                        y && c.strokeText(A, u, D);
                        z && c.fillText(A, u, D);
                        1 == M && 0 === x || c.setTransform(1, 0, 0, 1, 0, 0)
                    }
                    ++e;
                    break;
                case 6:
                    if (m(k) && (r = u[1], r = k(r)))return r;
                    ++e;
                    break;
                case 7:
                    c.fill();
                    ++e;
                    break;
                case 8:
                    r = u[1];
                    s = u[2];
                    c.moveTo(p[r], p[r + 1]);
                    for (r += 2; r < s; r += 2)c.lineTo(p[r], p[r + 1]);
                    ++e;
                    break;
                case 9:
                    c.fillStyle = u[1];
                    ++e;
                    break;
                case 10:
                    r = m(u[7]) ? u[7] : !0;
                    s = u[2];
                    c.strokeStyle = u[1];
                    c.lineWidth = r ? s * d : s;
                    c.lineCap = u[3];
                    c.lineJoin = u[4];
                    c.miterLimit =
                        u[5];
                    Xf && c.setLineDash(u[6]);
                    ++e;
                    break;
                case 11:
                    c.font = u[1];
                    c.textAlign = u[2];
                    c.textBaseline = u[3];
                    ++e;
                    break;
                case 12:
                    c.stroke();
                    ++e;
                    break;
                default:
                    ++e
            }
        }
    }

    gm.prototype.bc = function (b, c, d, e, f) {
        jm(this, b, c, d, e, f, this.d, void 0)
    };
    function km(b) {
        var c = b.a;
        c.reverse();
        var d, e = c.length, f, g, h = -1;
        for (d = 0; d < e; ++d)if (f = c[d], g = f[0], 6 == g)h = d; else if (0 == g) {
            f[2] = d;
            f = b.a;
            for (g = d; h < g;) {
                var k = f[h];
                f[h] = f[g];
                f[g] = k;
                ++h;
                --g
            }
            h = -1
        }
    }

    function lm(b, c) {
        b.N[2] = b.d.length;
        b.N = null;
        b.S[2] = b.a.length;
        b.S = null;
        var d = [6, c];
        b.d.push(d);
        b.a.push(d)
    }

    gm.prototype.Kb = ca;
    gm.prototype.re = function () {
        return this.ca
    };
    function mm(b, c, d) {
        gm.call(this, b, c, d);
        this.n = this.U = null;
        this.H = this.D = this.r = this.p = this.o = this.q = this.k = this.i = this.g = this.e = this.b = void 0
    }

    v(mm, gm);
    mm.prototype.ub = function (b, c) {
        if (null !== this.n) {
            im(this, c);
            var d = b.j, e = this.coordinates.length, d = hm(this, d, 0, d.length, b.B, !1);
            this.d.push([4, e, d, this.n, this.b, this.e, this.g, this.i, this.k, this.q, this.o, this.p, this.r, this.D, this.H]);
            this.a.push([4, e, d, this.U, this.b, this.e, this.g, this.i, this.k, this.q, this.o, this.p, this.r, this.D, this.H]);
            lm(this, c)
        }
    };
    mm.prototype.tb = function (b, c) {
        if (null !== this.n) {
            im(this, c);
            var d = b.j, e = this.coordinates.length, d = hm(this, d, 0, d.length, b.B, !1);
            this.d.push([4, e, d, this.n, this.b, this.e, this.g, this.i, this.k, this.q, this.o, this.p, this.r, this.D, this.H]);
            this.a.push([4, e, d, this.U, this.b, this.e, this.g, this.i, this.k, this.q, this.o, this.p, this.r, this.D, this.H]);
            lm(this, c)
        }
    };
    mm.prototype.Kb = function () {
        km(this);
        this.e = this.b = void 0;
        this.n = this.U = null;
        this.H = this.D = this.p = this.o = this.q = this.k = this.i = this.r = this.g = void 0
    };
    mm.prototype.ib = function (b) {
        var c = b.wb(), d = b.gb(), e = b.Kd(1), f = b.Bb(1), g = b.Cb();
        this.b = c[0];
        this.e = c[1];
        this.U = e;
        this.n = f;
        this.g = d[1];
        this.i = b.o;
        this.k = g[0];
        this.q = g[1];
        this.o = b.p;
        this.p = b.i;
        this.r = b.k;
        this.D = b.r;
        this.H = d[0]
    };
    function nm(b, c, d) {
        gm.call(this, b, c, d);
        this.b = {
            Ic: void 0,
            Dc: void 0,
            Ec: null,
            Fc: void 0,
            Gc: void 0,
            Hc: void 0,
            we: 0,
            strokeStyle: void 0,
            lineCap: void 0,
            lineDash: null,
            lineJoin: void 0,
            lineWidth: void 0,
            miterLimit: void 0
        }
    }

    v(nm, gm);
    function om(b, c, d, e, f) {
        var g = b.coordinates.length;
        c = hm(b, c, d, e, f, !1);
        g = [8, g, c];
        b.d.push(g);
        b.a.push(g);
        return e
    }

    l = nm.prototype;
    l.re = function () {
        null === this.c && (this.c = Yd(this.ca), 0 < this.f && Xd(this.c, this.resolution * (this.f + 1) / 2, this.c));
        return this.c
    };
    function pm(b) {
        var c = b.b, d = c.strokeStyle, e = c.lineCap, f = c.lineDash, g = c.lineJoin, h = c.lineWidth, k = c.miterLimit;
        c.Ic == d && c.Dc == e && fb(c.Ec, f) && c.Fc == g && c.Gc == h && c.Hc == k || (c.we != b.coordinates.length && (b.d.push([12]), c.we = b.coordinates.length), b.d.push([10, d, h, e, g, k, f], [1]), c.Ic = d, c.Dc = e, c.Ec = f, c.Fc = g, c.Gc = h, c.Hc = k)
    }

    l.Eb = function (b, c) {
        var d = this.b, e = d.lineWidth;
        m(d.strokeStyle) && m(e) && (pm(this), im(this, c), this.a.push([10, d.strokeStyle, d.lineWidth, d.lineCap, d.lineJoin, d.miterLimit, d.lineDash], [1]), d = b.j, om(this, d, 0, d.length, b.B), this.a.push([12]), lm(this, c))
    };
    l.mc = function (b, c) {
        var d = this.b, e = d.lineWidth;
        if (m(d.strokeStyle) && m(e)) {
            pm(this);
            im(this, c);
            this.a.push([10, d.strokeStyle, d.lineWidth, d.lineCap, d.lineJoin, d.miterLimit, d.lineDash], [1]);
            var d = b.b, e = b.j, f = b.B, g = 0, h, k;
            h = 0;
            for (k = d.length; h < k; ++h)g = om(this, e, g, d[h], f);
            this.a.push([12]);
            lm(this, c)
        }
    };
    l.Kb = function () {
        this.b.we != this.coordinates.length && this.d.push([12]);
        km(this);
        this.b = null
    };
    l.Ba = function (b, c) {
        var d = c.a;
        this.b.strokeStyle = rg(null === d ? ml : d);
        d = c.c;
        this.b.lineCap = m(d) ? d : "round";
        d = c.b;
        this.b.lineDash = null === d ? ll : d;
        d = c.f;
        this.b.lineJoin = m(d) ? d : "round";
        d = c.d;
        this.b.lineWidth = m(d) ? d : 1;
        d = c.e;
        this.b.miterLimit = m(d) ? d : 10;
        this.b.lineWidth > this.f && (this.f = this.b.lineWidth, this.c = null)
    };
    function qm(b, c, d) {
        gm.call(this, b, c, d);
        this.b = {
            gf: void 0,
            Ic: void 0,
            Dc: void 0,
            Ec: null,
            Fc: void 0,
            Gc: void 0,
            Hc: void 0,
            fillStyle: void 0,
            strokeStyle: void 0,
            lineCap: void 0,
            lineDash: null,
            lineJoin: void 0,
            lineWidth: void 0,
            miterLimit: void 0
        }
    }

    v(qm, gm);
    function rm(b, c, d, e, f) {
        var g = b.b, h = [1];
        b.d.push(h);
        b.a.push(h);
        var k, h = 0;
        for (k = e.length; h < k; ++h) {
            var n = e[h], p = b.coordinates.length;
            d = hm(b, c, d, n, f, !0);
            d = [8, p, d];
            p = [3];
            b.d.push(d, p);
            b.a.push(d, p);
            d = n
        }
        c = [7];
        b.a.push(c);
        m(g.fillStyle) && b.d.push(c);
        m(g.strokeStyle) && (g = [12], b.d.push(g), b.a.push(g));
        return d
    }

    l = qm.prototype;
    l.lc = function (b, c) {
        var d = this.b, e = d.strokeStyle;
        if (m(d.fillStyle) || m(e)) {
            sm(this);
            im(this, c);
            this.a.push([9, rg(kl)]);
            m(d.strokeStyle) && this.a.push([10, d.strokeStyle, d.lineWidth, d.lineCap, d.lineJoin, d.miterLimit, d.lineDash]);
            var f = b.j, e = this.coordinates.length;
            hm(this, f, 0, f.length, b.B, !1);
            f = [1];
            e = [2, e];
            this.d.push(f, e);
            this.a.push(f, e);
            e = [7];
            this.a.push(e);
            m(d.fillStyle) && this.d.push(e);
            m(d.strokeStyle) && (d = [12], this.d.push(d), this.a.push(d));
            lm(this, c)
        }
    };
    l.Rb = function (b, c) {
        var d = this.b, e = d.strokeStyle;
        if (m(d.fillStyle) || m(e))sm(this), im(this, c), this.a.push([9, rg(kl)]), m(d.strokeStyle) && this.a.push([10, d.strokeStyle, d.lineWidth, d.lineCap, d.lineJoin, d.miterLimit, d.lineDash]), d = b.b, e = Vk(b), rm(this, e, 0, d, b.B), lm(this, c)
    };
    l.nc = function (b, c) {
        var d = this.b, e = d.strokeStyle;
        if (m(d.fillStyle) || m(e)) {
            sm(this);
            im(this, c);
            this.a.push([9, rg(kl)]);
            m(d.strokeStyle) && this.a.push([10, d.strokeStyle, d.lineWidth, d.lineCap, d.lineJoin, d.miterLimit, d.lineDash]);
            var d = b.b, e = cm(b), f = b.B, g = 0, h, k;
            h = 0;
            for (k = d.length; h < k; ++h)g = rm(this, e, g, d[h], f);
            lm(this, c)
        }
    };
    l.Kb = function () {
        km(this);
        this.b = null;
        var b = this.fa;
        if (0 !== b) {
            var c = this.coordinates, d, e;
            d = 0;
            for (e = c.length; d < e; ++d)c[d] = b * Math.round(c[d] / b)
        }
    };
    l.re = function () {
        null === this.c && (this.c = Yd(this.ca), 0 < this.f && Xd(this.c, this.resolution * (this.f + 1) / 2, this.c));
        return this.c
    };
    l.Ba = function (b, c) {
        var d = this.b;
        if (null === b)d.fillStyle = void 0; else {
            var e = b.a;
            d.fillStyle = rg(null === e ? kl : e)
        }
        null === c ? (d.strokeStyle = void 0, d.lineCap = void 0, d.lineDash = null, d.lineJoin = void 0, d.lineWidth = void 0, d.miterLimit = void 0) : (e = c.a, d.strokeStyle = rg(null === e ? ml : e), e = c.c, d.lineCap = m(e) ? e : "round", e = c.b, d.lineDash = null === e ? ll : e.slice(), e = c.f, d.lineJoin = m(e) ? e : "round", e = c.d, d.lineWidth = m(e) ? e : 1, e = c.e, d.miterLimit = m(e) ? e : 10, d.lineWidth > this.f && (this.f = d.lineWidth, this.c = null))
    };
    function sm(b) {
        var c = b.b, d = c.fillStyle, e = c.strokeStyle, f = c.lineCap, g = c.lineDash, h = c.lineJoin, k = c.lineWidth, n = c.miterLimit;
        m(d) && c.gf != d && (b.d.push([9, d]), c.gf = c.fillStyle);
        !m(e) || c.Ic == e && c.Dc == f && c.Ec == g && c.Fc == h && c.Gc == k && c.Hc == n || (b.d.push([10, e, k, f, h, n, g]), c.Ic = e, c.Dc = f, c.Ec = g, c.Fc = h, c.Gc = k, c.Hc = n)
    }

    function tm(b, c, d) {
        gm.call(this, b, c, d);
        this.D = this.r = this.p = null;
        this.n = "";
        this.o = this.q = this.k = this.i = 0;
        this.g = this.e = this.b = null
    }

    v(tm, gm);
    tm.prototype.vb = function (b, c, d, e, f, g) {
        if ("" !== this.n && null !== this.g && (null !== this.b || null !== this.e)) {
            if (null !== this.b) {
                f = this.b;
                var h = this.p;
                if (null === h || h.fillStyle != f.fillStyle) {
                    var k = [9, f.fillStyle];
                    this.d.push(k);
                    this.a.push(k);
                    null === h ? this.p = {fillStyle: f.fillStyle} : h.fillStyle = f.fillStyle
                }
            }
            null !== this.e && (f = this.e, h = this.r, null === h || h.lineCap != f.lineCap || h.lineDash != f.lineDash || h.lineJoin != f.lineJoin || h.lineWidth != f.lineWidth || h.miterLimit != f.miterLimit || h.strokeStyle != f.strokeStyle) && (k = [10,
                f.strokeStyle, f.lineWidth, f.lineCap, f.lineJoin, f.miterLimit, f.lineDash, !1], this.d.push(k), this.a.push(k), null === h ? this.r = {
                lineCap: f.lineCap,
                lineDash: f.lineDash,
                lineJoin: f.lineJoin,
                lineWidth: f.lineWidth,
                miterLimit: f.miterLimit,
                strokeStyle: f.strokeStyle
            } : (h.lineCap = f.lineCap, h.lineDash = f.lineDash, h.lineJoin = f.lineJoin, h.lineWidth = f.lineWidth, h.miterLimit = f.miterLimit, h.strokeStyle = f.strokeStyle));
            f = this.g;
            h = this.D;
            if (null === h || h.font != f.font || h.textAlign != f.textAlign || h.textBaseline != f.textBaseline)k =
                [11, f.font, f.textAlign, f.textBaseline], this.d.push(k), this.a.push(k), null === h ? this.D = {
                font: f.font,
                textAlign: f.textAlign,
                textBaseline: f.textBaseline
            } : (h.font = f.font, h.textAlign = f.textAlign, h.textBaseline = f.textBaseline);
            im(this, g);
            f = this.coordinates.length;
            b = hm(this, b, c, d, e, !1);
            b = [5, f, b, this.n, this.i, this.k, this.q, this.o, null !== this.b, null !== this.e];
            this.d.push(b);
            this.a.push(b);
            lm(this, g)
        }
    };
    tm.prototype.Ca = function (b) {
        if (null === b)this.n = ""; else {
            var c = b.a;
            null === c ? this.b = null : (c = c.a, c = rg(null === c ? kl : c), null === this.b ? this.b = {fillStyle: c} : this.b.fillStyle = c);
            var d = b.e;
            if (null === d)this.e = null; else {
                var c = d.a, e = d.c, f = d.b, g = d.f, h = d.d, d = d.e, e = m(e) ? e : "round", f = null != f ? f.slice() : ll, g = m(g) ? g : "round", h = m(h) ? h : 1, d = m(d) ? d : 10, c = rg(null === c ? ml : c);
                if (null === this.e)this.e = {
                    lineCap: e,
                    lineDash: f,
                    lineJoin: g,
                    lineWidth: h,
                    miterLimit: d,
                    strokeStyle: c
                }; else {
                    var k = this.e;
                    k.lineCap = e;
                    k.lineDash = f;
                    k.lineJoin = g;
                    k.lineWidth =
                        h;
                    k.miterLimit = d;
                    k.strokeStyle = c
                }
            }
            var n = b.c, c = b.i, e = b.k, f = b.f, h = b.d, d = b.b, g = b.g, k = b.n;
            b = m(n) ? n : "10px sans-serif";
            g = m(g) ? g : "center";
            k = m(k) ? k : "middle";
            null === this.g ? this.g = {
                font: b,
                textAlign: g,
                textBaseline: k
            } : (n = this.g, n.font = b, n.textAlign = g, n.textBaseline = k);
            this.n = m(d) ? d : "";
            this.i = m(c) ? c : 0;
            this.k = m(e) ? e : 0;
            this.q = m(f) ? f : 0;
            this.o = m(h) ? h : 1
        }
    };
    function um(b, c, d, e) {
        this.i = b;
        this.c = c;
        this.n = d;
        this.f = e;
        this.d = {};
        this.e = Mf(1, 1);
        this.g = Id()
    }

    function vm(b) {
        for (var c in b.d) {
            var d = b.d[c], e;
            for (e in d)d[e].Kb()
        }
    }

    um.prototype.b = function (b, c, d, e, f) {
        var g = this.g;
        gj(g, .5, .5, 1 / c, -1 / c, -d, -b[0], -b[1]);
        var h = this.e;
        h.clearRect(0, 0, 1, 1);
        var k;
        m(this.f) && (k = Td(), Ud(k, b), Xd(k, c * this.f, k));
        return wm(this, h, g, d, e, function (b) {
            if (0 < h.getImageData(0, 0, 1, 1).data[3]) {
                if (b = f(b))return b;
                h.clearRect(0, 0, 1, 1)
            }
        }, k)
    };
    um.prototype.a = function (b, c) {
        var d = m(b) ? b.toString() : "0", e = this.d[d];
        m(e) || (e = {}, this.d[d] = e);
        d = e[c];
        m(d) || (d = new xm[c](this.i, this.c, this.n), e[c] = d);
        return d
    };
    um.prototype.la = function () {
        return wb(this.d)
    };
    function ym(b, c, d, e, f, g) {
        var h = Sa(sb(b.d), Number);
        db(h);
        var k = b.c, n = k[0], p = k[1], q = k[2], k = k[3], n = [n, p, n, k, q, k, q, p];
        lk(n, 0, 8, 2, e, n);
        c.save();
        c.beginPath();
        c.moveTo(n[0], n[1]);
        c.lineTo(n[2], n[3]);
        c.lineTo(n[4], n[5]);
        c.lineTo(n[6], n[7]);
        c.closePath();
        c.clip();
        for (var r, s, n = 0, p = h.length; n < p; ++n)for (r = b.d[h[n].toString()], q = 0, k = fm.length; q < k; ++q)s = r[fm[q]], m(s) && s.bc(c, d, e, f, g);
        c.restore()
    }

    function wm(b, c, d, e, f, g, h) {
        var k = Sa(sb(b.d), Number);
        db(k, function (b, c) {
            return c - b
        });
        var n, p, q, r, s;
        n = 0;
        for (p = k.length; n < p; ++n)for (r = b.d[k[n].toString()], q = fm.length - 1; 0 <= q; --q)if (s = r[fm[q]], m(s) && (s = jm(s, c, 1, d, e, f, s.a, g, h)))return s
    }

    var xm = {Image: mm, LineString: nm, Polygon: qm, Text: tm};

    function zm(b) {
        jj.call(this, b);
        this.r = Id()
    }

    v(zm, jj);
    zm.prototype.q = function (b, c, d) {
        Am(this, "precompose", d, b, void 0);
        var e = this.Id();
        if (null !== e) {
            var f = c.extent, g = m(f);
            if (g) {
                var h = b.pixelRatio, k = ke(f), n = je(f), p = ie(f), f = he(f);
                ij(b.coordinateToPixelMatrix, k, k);
                ij(b.coordinateToPixelMatrix, n, n);
                ij(b.coordinateToPixelMatrix, p, p);
                ij(b.coordinateToPixelMatrix, f, f);
                d.save();
                d.beginPath();
                d.moveTo(k[0] * h, k[1] * h);
                d.lineTo(n[0] * h, n[1] * h);
                d.lineTo(p[0] * h, p[1] * h);
                d.lineTo(f[0] * h, f[1] * h);
                d.clip()
            }
            h = this.of();
            k = d.globalAlpha;
            d.globalAlpha = c.opacity;
            0 === b.viewState.rotation ?
                (c = h[13], n = e.width * h[0], p = e.height * h[5], d.drawImage(e, 0, 0, +e.width, +e.height, Math.round(h[12]), Math.round(c), Math.round(n), Math.round(p))) : (d.setTransform(h[0], h[1], h[4], h[5], h[12], h[13]), d.drawImage(e, 0, 0), d.setTransform(1, 0, 0, 1, 0, 0));
            d.globalAlpha = k;
            g && d.restore()
        }
        Am(this, "postcompose", d, b, void 0)
    };
    function Am(b, c, d, e, f) {
        var g = b.a;
        kd(g, c) && (b = m(f) ? f : Bm(b, e), b = new Sl(d, e.pixelRatio, e.extent, b, e.viewState.rotation), g.dispatchEvent(new Yk(c, g, b, null, e, d, null)), em(b))
    }

    function Bm(b, c) {
        var d = c.viewState, e = c.pixelRatio;
        return gj(b.r, e * c.size[0] / 2, e * c.size[1] / 2, e / d.resolution, -e / d.resolution, -d.rotation, -d.center[0], -d.center[1])
    }

    function Cm(b, c) {
        var d = [0, 0];
        ij(c, b, d);
        return d
    }

    var Dm = function () {
        var b = null, c = null;
        return function (d) {
            if (null === b) {
                b = Mf(1, 1);
                c = b.createImageData(1, 1);
                var e = c.data;
                e[0] = 42;
                e[1] = 84;
                e[2] = 126;
                e[3] = 255
            }
            var e = b.canvas, f = d[0] <= e.width && d[1] <= e.height;
            f || (e.width = d[0], e.height = d[1], e = d[0] - 1, d = d[1] - 1, b.putImageData(c, e, d), d = b.getImageData(e, d, 1, 1), f = fb(c.data, d.data));
            return f
        }
    }();

    function Em(b, c, d) {
        mk.call(this);
        this.rg(b, m(c) ? c : 0, d)
    }

    v(Em, mk);
    l = Em.prototype;
    l.clone = function () {
        var b = new Em(null);
        ok(b, this.a, this.j.slice());
        b.l();
        return b
    };
    l.Ya = function (b, c, d, e) {
        var f = this.j;
        b -= f[0];
        var g = c - f[1];
        c = b * b + g * g;
        if (c < e) {
            if (0 === c)for (e = 0; e < this.B; ++e)d[e] = f[e]; else for (e = this.Hf() / Math.sqrt(c), d[0] = f[0] + e * b, d[1] = f[1] + e * g, e = 2; e < this.B; ++e)d[e] = f[e];
            d.length = this.B;
            return c
        }
        return e
    };
    l.Jb = function (b, c) {
        var d = this.j, e = b - d[0], d = c - d[1];
        return e * e + d * d <= Fm(this)
    };
    l.Oc = function () {
        return this.j.slice(0, this.B)
    };
    l.dd = function (b) {
        var c = this.j, d = c[this.B] - c[0];
        return Wd(c[0] - d, c[1] - d, c[0] + d, c[1] + d, b)
    };
    l.Hf = function () {
        return Math.sqrt(Fm(this))
    };
    function Fm(b) {
        var c = b.j[b.B] - b.j[0];
        b = b.j[b.B + 1] - b.j[1];
        return c * c + b * b
    }

    l.O = function () {
        return "Circle"
    };
    l.Mj = function (b) {
        var c = this.B, d = b.slice();
        d[c] = d[0] + (this.j[c] - this.j[0]);
        var e;
        for (e = 1; e < c; ++e)d[c + e] = b[e];
        ok(this, this.a, d);
        this.l()
    };
    l.rg = function (b, c, d) {
        if (null === b)ok(this, "XY", null); else {
            pk(this, d, b, 0);
            null === this.j && (this.j = []);
            d = this.j;
            b = zk(d, b);
            d[b++] = d[0] + c;
            var e;
            c = 1;
            for (e = this.B; c < e; ++c)d[b++] = d[c];
            d.length = b
        }
        this.l()
    };
    l.If = function (b) {
        this.j[this.B] = this.j[0] + b;
        this.l()
    };
    function Gm(b) {
        kk.call(this);
        this.c = m(b) ? b : null;
        Hm(this)
    }

    v(Gm, kk);
    function Im(b) {
        var c = [], d, e;
        d = 0;
        for (e = b.length; d < e; ++d)c.push(b[d].clone());
        return c
    }

    function Jm(b) {
        var c, d;
        if (null !== b.c)for (c = 0, d = b.c.length; c < d; ++c)Wc(b.c[c], "change", b.l, !1, b)
    }

    function Hm(b) {
        var c, d;
        if (null !== b.c)for (c = 0, d = b.c.length; c < d; ++c)w(b.c[c], "change", b.l, !1, b)
    }

    l = Gm.prototype;
    l.clone = function () {
        var b = new Gm(null);
        b.sg(this.c);
        return b
    };
    l.Ya = function (b, c, d, e) {
        if (e < Zd(this.J(), b, c))return e;
        var f = this.c, g, h;
        g = 0;
        for (h = f.length; g < h; ++g)e = f[g].Ya(b, c, d, e);
        return e
    };
    l.Jb = function (b, c) {
        var d = this.c, e, f;
        e = 0;
        for (f = d.length; e < f; ++e)if (d[e].Jb(b, c))return !0;
        return !1
    };
    l.dd = function (b) {
        Wd(Infinity, Infinity, -Infinity, -Infinity, b);
        for (var c = this.c, d = 0, e = c.length; d < e; ++d)ee(b, c[d].J());
        return b
    };
    l.nf = function () {
        return Im(this.c)
    };
    l.ue = function (b) {
        this.i != this.d && (xb(this.e), this.g = 0, this.i = this.d);
        if (0 > b || 0 !== this.g && b < this.g)return this;
        var c = b.toString();
        if (this.e.hasOwnProperty(c))return this.e[c];
        var d = [], e = this.c, f = !1, g, h;
        g = 0;
        for (h = e.length; g < h; ++g) {
            var k = e[g], n = k.ue(b);
            d.push(n);
            n !== k && (f = !0)
        }
        if (f)return b = new Gm(null), Jm(b), b.c = d, Hm(b), b.l(), this.e[c] = b;
        this.g = b;
        return this
    };
    l.O = function () {
        return "GeometryCollection"
    };
    l.ja = function (b) {
        var c = this.c, d, e;
        d = 0;
        for (e = c.length; d < e; ++d)if (c[d].ja(b))return !0;
        return !1
    };
    l.la = function () {
        return 0 == this.c.length
    };
    l.sg = function (b) {
        b = Im(b);
        Jm(this);
        this.c = b;
        Hm(this);
        this.l()
    };
    l.qa = function (b) {
        var c = this.c, d, e;
        d = 0;
        for (e = c.length; d < e; ++d)c[d].qa(b);
        this.l()
    };
    l.Ia = function (b, c) {
        var d = this.c, e, f;
        e = 0;
        for (f = d.length; e < f; ++e)d[e].Ia(b, c);
        this.l()
    };
    l.P = function () {
        Jm(this);
        Gm.T.P.call(this)
    };
    function Km(b, c, d, e, f) {
        var g = NaN, h = NaN, k = (d - c) / e;
        if (0 !== k)if (1 == k)g = b[c], h = b[c + 1]; else if (2 == k)g = .5 * b[c] + .5 * b[c + e], h = .5 * b[c + 1] + .5 * b[c + e + 1]; else {
            var h = b[c], k = b[c + 1], n = 0, g = [0], p;
            for (p = c + e; p < d; p += e) {
                var q = b[p], r = b[p + 1], n = n + Math.sqrt((q - h) * (q - h) + (r - k) * (r - k));
                g.push(n);
                h = q;
                k = r
            }
            d = .5 * n;
            for (var s, h = eb, k = 0, n = g.length; k < n;)p = k + n >> 1, q = h(d, g[p]), 0 < q ? k = p + 1 : (n = p, s = !q);
            s = s ? k : ~k;
            0 > s ? (d = (d - g[-s - 2]) / (g[-s - 1] - g[-s - 2]), c += (-s - 2) * e, g = Yb(b[c], b[c + e], d), h = Yb(b[c + 1], b[c + e + 1], d)) : (g = b[c + s * e], h = b[c + s * e + 1])
        }
        return null != f ?
            (f[0] = g, f[1] = h, f) : [g, h]
    }

    function Lm(b, c, d, e, f, g) {
        if (d == c)return null;
        if (f < b[c + e - 1])return g ? (d = b.slice(c, c + e), d[e - 1] = f, d) : null;
        if (b[d - 1] < f)return g ? (d = b.slice(d - e, d), d[e - 1] = f, d) : null;
        if (f == b[c + e - 1])return b.slice(c, c + e);
        c /= e;
        for (d /= e; c < d;)g = c + d >> 1, f < b[(g + 1) * e - 1] ? d = g : c = g + 1;
        d = b[c * e - 1];
        if (f == d)return b.slice((c - 1) * e, (c - 1) * e + e);
        g = (f - d) / (b[(c + 1) * e - 1] - d);
        d = [];
        var h;
        for (h = 0; h < e - 1; ++h)d.push(Yb(b[(c - 1) * e + h], b[c * e + h], g));
        d.push(f);
        return d
    }

    function Mm(b, c, d, e, f, g) {
        var h = 0;
        if (g)return Lm(b, h, c[c.length - 1], d, e, f);
        if (e < b[d - 1])return f ? (b = b.slice(0, d), b[d - 1] = e, b) : null;
        if (b[b.length - 1] < e)return f ? (b = b.slice(b.length - d), b[d - 1] = e, b) : null;
        f = 0;
        for (g = c.length; f < g; ++f) {
            var k = c[f];
            if (h != k) {
                if (e < b[h + d - 1])break;
                if (e <= b[k - 1])return Lm(b, h, k, d, e, !1);
                h = k
            }
        }
        return null
    };
    function K(b, c) {
        mk.call(this);
        this.b = null;
        this.o = this.p = this.n = -1;
        this.W(b, c)
    }

    v(K, mk);
    l = K.prototype;
    l.ih = function (b) {
        null === this.j ? this.j = b.slice() : ab(this.j, b);
        this.l()
    };
    l.clone = function () {
        var b = new K(null);
        Nm(b, this.a, this.j.slice());
        return b
    };
    l.Ya = function (b, c, d, e) {
        if (e < Zd(this.J(), b, c))return e;
        this.o != this.d && (this.p = Math.sqrt(vk(this.j, 0, this.j.length, this.B, 0)), this.o = this.d);
        return xk(this.j, 0, this.j.length, this.B, this.p, !1, b, c, d, e)
    };
    l.yh = function (b, c) {
        return Ok(this.j, 0, this.j.length, this.B, b, c)
    };
    l.Nj = function (b, c) {
        return "XYM" != this.a && "XYZM" != this.a ? null : Lm(this.j, 0, this.j.length, this.B, b, m(c) ? c : !1)
    };
    l.Q = function () {
        return Ck(this.j, 0, this.j.length, this.B)
    };
    l.Jf = function () {
        var b = this.j, c = this.B, d = b[0], e = b[1], f = 0, g;
        for (g = 0 + c; g < this.j.length; g += c)var h = b[g], k = b[g + 1], f = f + Math.sqrt((h - d) * (h - d) + (k - e) * (k - e)), d = h, e = k;
        return f
    };
    function am(b) {
        b.n != b.d && (b.b = Km(b.j, 0, b.j.length, b.B, b.b), b.n = b.d);
        return b.b
    }

    l.oc = function (b) {
        var c = [];
        c.length = Ek(this.j, 0, this.j.length, this.B, b, c, 0);
        b = new K(null);
        Nm(b, "XY", c);
        return b
    };
    l.O = function () {
        return "LineString"
    };
    l.ja = function (b) {
        return Pk(this.j, 0, this.j.length, this.B, b)
    };
    l.W = function (b, c) {
        null === b ? Nm(this, "XY", null) : (pk(this, c, b, 1), null === this.j && (this.j = []), this.j.length = Ak(this.j, 0, b, this.B), this.l())
    };
    function Nm(b, c, d) {
        ok(b, c, d);
        b.l()
    };
    function Om(b, c) {
        mk.call(this);
        this.b = [];
        this.n = this.o = -1;
        this.W(b, c)
    }

    v(Om, mk);
    l = Om.prototype;
    l.jh = function (b) {
        null === this.j ? this.j = b.j.slice() : ab(this.j, b.j.slice());
        this.b.push(this.j.length);
        this.l()
    };
    l.clone = function () {
        var b = new Om(null);
        Pm(b, this.a, this.j.slice(), this.b.slice());
        return b
    };
    l.Ya = function (b, c, d, e) {
        if (e < Zd(this.J(), b, c))return e;
        this.n != this.d && (this.o = Math.sqrt(wk(this.j, 0, this.b, this.B, 0)), this.n = this.d);
        return yk(this.j, 0, this.b, this.B, this.o, !1, b, c, d, e)
    };
    l.Pj = function (b, c, d) {
        return "XYM" != this.a && "XYZM" != this.a || 0 === this.j.length ? null : Mm(this.j, this.b, this.B, b, m(c) ? c : !1, m(d) ? d : !1)
    };
    l.Q = function () {
        return Dk(this.j, 0, this.b, this.B)
    };
    l.Qh = function (b) {
        if (0 > b || this.b.length <= b)return null;
        var c = new K(null);
        Nm(c, this.a, this.j.slice(0 === b ? 0 : this.b[b - 1], this.b[b]));
        return c
    };
    l.Lc = function () {
        var b = this.j, c = this.b, d = this.a, e = [], f = 0, g, h;
        g = 0;
        for (h = c.length; g < h; ++g) {
            var k = c[g], n = new K(null);
            Nm(n, d, b.slice(f, k));
            e.push(n);
            f = k
        }
        return e
    };
    function bm(b) {
        var c = [], d = b.j, e = 0, f = b.b;
        b = b.B;
        var g, h;
        g = 0;
        for (h = f.length; g < h; ++g) {
            var k = f[g], e = Km(d, e, k, b);
            ab(c, e);
            e = k
        }
        return c
    }

    l.oc = function (b) {
        var c = [], d = [], e = this.j, f = this.b, g = this.B, h = 0, k = 0, n, p;
        n = 0;
        for (p = f.length; n < p; ++n) {
            var q = f[n], k = Ek(e, h, q, g, b, c, k);
            d.push(k);
            h = q
        }
        c.length = k;
        b = new Om(null);
        Pm(b, "XY", c, d);
        return b
    };
    l.O = function () {
        return "MultiLineString"
    };
    l.ja = function (b) {
        a:{
            var c = this.j, d = this.b, e = this.B, f = 0, g, h;
            g = 0;
            for (h = d.length; g < h; ++g) {
                if (Pk(c, f, d[g], e, b)) {
                    b = !0;
                    break a
                }
                f = d[g]
            }
            b = !1
        }
        return b
    };
    l.W = function (b, c) {
        if (null === b)Pm(this, "XY", null, this.b); else {
            pk(this, c, b, 2);
            null === this.j && (this.j = []);
            var d = Bk(this.j, 0, b, this.B, this.b);
            this.j.length = 0 === d.length ? 0 : d[d.length - 1];
            this.l()
        }
    };
    function Pm(b, c, d, e) {
        ok(b, c, d);
        b.b = e;
        b.l()
    }

    function Qm(b, c) {
        var d = "XY", e = [], f = [], g, h;
        g = 0;
        for (h = c.length; g < h; ++g) {
            var k = c[g];
            0 === g && (d = k.a);
            ab(e, k.j);
            f.push(e.length)
        }
        Pm(b, d, e, f)
    };
    function Rm(b, c) {
        mk.call(this);
        this.W(b, c)
    }

    v(Rm, mk);
    l = Rm.prototype;
    l.lh = function (b) {
        null === this.j ? this.j = b.j.slice() : ab(this.j, b.j);
        this.l()
    };
    l.clone = function () {
        var b = new Rm(null);
        ok(b, this.a, this.j.slice());
        b.l();
        return b
    };
    l.Ya = function (b, c, d, e) {
        if (e < Zd(this.J(), b, c))return e;
        var f = this.j, g = this.B, h, k, n;
        h = 0;
        for (k = f.length; h < k; h += g)if (n = tk(b, c, f[h], f[h + 1]), n < e) {
            e = n;
            for (n = 0; n < g; ++n)d[n] = f[h + n];
            d.length = g
        }
        return e
    };
    l.Q = function () {
        return Ck(this.j, 0, this.j.length, this.B)
    };
    l.$h = function (b) {
        var c = null === this.j ? 0 : this.j.length / this.B;
        if (0 > b || c <= b)return null;
        c = new Ik(null);
        Jk(c, this.a, this.j.slice(b * this.B, (b + 1) * this.B));
        return c
    };
    l.Gd = function () {
        var b = this.j, c = this.a, d = this.B, e = [], f, g;
        f = 0;
        for (g = b.length; f < g; f += d) {
            var h = new Ik(null);
            Jk(h, c, b.slice(f, f + d));
            e.push(h)
        }
        return e
    };
    l.O = function () {
        return "MultiPoint"
    };
    l.ja = function (b) {
        var c = this.j, d = this.B, e, f, g, h;
        e = 0;
        for (f = c.length; e < f; e += d)if (g = c[e], h = c[e + 1], ae(b, g, h))return !0;
        return !1
    };
    l.W = function (b, c) {
        null === b ? ok(this, "XY", null) : (pk(this, c, b, 1), null === this.j && (this.j = []), this.j.length = Ak(this.j, 0, b, this.B));
        this.l()
    };
    function Sm(b, c) {
        mk.call(this);
        this.b = [];
        this.o = -1;
        this.p = null;
        this.H = this.r = this.D = -1;
        this.n = null;
        this.W(b, c)
    }

    v(Sm, mk);
    l = Sm.prototype;
    l.mh = function (b) {
        if (null === this.j)this.j = b.j.slice(), b = b.b.slice(), this.b.push(); else {
            var c = this.j.length;
            ab(this.j, b.j);
            b = b.b.slice();
            var d, e;
            d = 0;
            for (e = b.length; d < e; ++d)b[d] += c
        }
        this.b.push(b);
        this.l()
    };
    l.clone = function () {
        var b = new Sm(null);
        Tm(b, this.a, this.j.slice(), this.b.slice());
        return b
    };
    l.Ya = function (b, c, d, e) {
        if (e < Zd(this.J(), b, c))return e;
        if (this.r != this.d) {
            var f = this.b, g = 0, h = 0, k, n;
            k = 0;
            for (n = f.length; k < n; ++k)var p = f[k], h = wk(this.j, g, p, this.B, h), g = p[p.length - 1];
            this.D = Math.sqrt(h);
            this.r = this.d
        }
        f = cm(this);
        g = this.b;
        h = this.B;
        k = this.D;
        n = 0;
        var p = m(void 0) ? void 0 : [NaN, NaN], q, r;
        q = 0;
        for (r = g.length; q < r; ++q) {
            var s = g[q];
            e = yk(f, n, s, h, k, !0, b, c, d, e, p);
            n = s[s.length - 1]
        }
        return e
    };
    l.Jb = function (b, c) {
        var d;
        a:{
            d = cm(this);
            var e = this.b, f = 0;
            if (0 !== e.length) {
                var g, h;
                g = 0;
                for (h = e.length; g < h; ++g) {
                    var k = e[g];
                    if (Mk(d, f, k, this.B, b, c)) {
                        d = !0;
                        break a
                    }
                    f = k[k.length - 1]
                }
            }
            d = !1
        }
        return d
    };
    l.Qj = function () {
        var b = cm(this), c = this.b, d = 0, e = 0, f, g;
        f = 0;
        for (g = c.length; f < g; ++f)var h = c[f], e = e + rk(b, d, h, this.B), d = h[h.length - 1];
        return e
    };
    l.Q = function () {
        var b = this.j, c = this.b, d = this.B, e = 0, f = m(void 0) ? void 0 : [], g = 0, h, k;
        h = 0;
        for (k = c.length; h < k; ++h) {
            var n = c[h];
            f[g++] = Dk(b, e, n, d, f[g]);
            e = n[n.length - 1]
        }
        f.length = g;
        return f
    };
    function dm(b) {
        if (b.o != b.d) {
            var c = b.j, d = b.b, e = b.B, f = 0, g = [], h, k, n = Td();
            h = 0;
            for (k = d.length; h < k; ++h) {
                var p = d[h], n = fe(Wd(Infinity, Infinity, -Infinity, -Infinity, void 0), c, f, p[0], e);
                g.push((n[0] + n[2]) / 2, (n[1] + n[3]) / 2);
                f = p[p.length - 1]
            }
            c = cm(b);
            d = b.b;
            e = b.B;
            f = 0;
            h = [];
            k = 0;
            for (n = d.length; k < n; ++k)p = d[k], h = Nk(c, f, p, e, g, 2 * k, h), f = p[p.length - 1];
            b.p = h;
            b.o = b.d
        }
        return b.p
    }

    l.Nh = function () {
        var b = new Rm(null), c = dm(this).slice();
        ok(b, "XY", c);
        b.l();
        return b
    };
    function cm(b) {
        if (b.H != b.d) {
            var c = b.j, d;
            a:{
                d = b.b;
                var e, f;
                e = 0;
                for (f = d.length; e < f; ++e)if (!Sk(c, d[e], b.B)) {
                    d = !1;
                    break a
                }
                d = !0
            }
            if (d)b.n = c; else {
                b.n = c.slice();
                d = c = b.n;
                e = b.b;
                f = b.B;
                var g = 0, h, k;
                h = 0;
                for (k = e.length; h < k; ++h)g = Tk(d, g, e[h], f);
                c.length = g
            }
            b.H = b.d
        }
        return b.n
    }

    l.oc = function (b) {
        var c = [], d = [], e = this.j, f = this.b, g = this.B;
        b = Math.sqrt(b);
        var h = 0, k = 0, n, p;
        n = 0;
        for (p = f.length; n < p; ++n) {
            var q = f[n], r = [], k = Fk(e, h, q, g, b, c, k, r);
            d.push(r);
            h = q[q.length - 1]
        }
        c.length = k;
        e = new Sm(null);
        Tm(e, "XY", c, d);
        return e
    };
    l.ai = function (b) {
        if (0 > b || this.b.length <= b)return null;
        var c;
        0 === b ? c = 0 : (c = this.b[b - 1], c = c[c.length - 1]);
        b = this.b[b].slice();
        var d = b[b.length - 1];
        if (0 !== c) {
            var e, f;
            e = 0;
            for (f = b.length; e < f; ++e)b[e] -= c
        }
        e = new F(null);
        Uk(e, this.a, this.j.slice(c, d), b);
        return e
    };
    l.qd = function () {
        var b = this.a, c = this.j, d = this.b, e = [], f = 0, g, h, k, n;
        g = 0;
        for (h = d.length; g < h; ++g) {
            var p = d[g].slice(), q = p[p.length - 1];
            if (0 !== f)for (k = 0, n = p.length; k < n; ++k)p[k] -= f;
            k = new F(null);
            Uk(k, b, c.slice(f, q), p);
            e.push(k);
            f = q
        }
        return e
    };
    l.O = function () {
        return "MultiPolygon"
    };
    l.ja = function (b) {
        a:{
            var c = cm(this), d = this.b, e = this.B, f = 0, g, h;
            g = 0;
            for (h = d.length; g < h; ++g) {
                var k = d[g];
                if (Qk(c, f, k, e, b)) {
                    b = !0;
                    break a
                }
                f = k[k.length - 1]
            }
            b = !1
        }
        return b
    };
    l.W = function (b, c) {
        if (null === b)Tm(this, "XY", null, this.b); else {
            pk(this, c, b, 3);
            null === this.j && (this.j = []);
            var d = this.j, e = this.B, f = this.b, g = 0, f = m(f) ? f : [], h = 0, k, n;
            k = 0;
            for (n = b.length; k < n; ++k)g = Bk(d, g, b[k], e, f[h]), f[h++] = g, g = g[g.length - 1];
            f.length = h;
            0 === f.length ? this.j.length = 0 : (d = f[f.length - 1], this.j.length = 0 === d.length ? 0 : d[d.length - 1]);
            this.l()
        }
    };
    function Tm(b, c, d, e) {
        ok(b, c, d);
        b.b = e;
        b.l()
    }

    function Um(b, c) {
        var d = "XY", e = [], f = [], g, h, k;
        g = 0;
        for (h = c.length; g < h; ++g) {
            var n = c[g];
            0 === g && (d = n.a);
            var p = e.length;
            k = n.b;
            var q, r;
            q = 0;
            for (r = k.length; q < r; ++q)k[q] += p;
            ab(e, n.j);
            f.push(k)
        }
        Tm(b, d, e, f)
    };
    function Vm(b, c) {
        return ma(b) - ma(c)
    }

    function Wm(b, c) {
        var d = .5 * b / c;
        return d * d
    }

    function Xm(b, c, d, e, f, g) {
        var h = !1, k, n;
        k = d.e;
        null !== k && (n = k.Pc(), 2 == n || 3 == n ? k.Oe(f, g) : (0 == n && k.load(), k.xe(f, g), h = !0));
        f = (0, d.c)(c);
        null != f && (e = f.ue(e), (0, Ym[e.O()])(b, e, d, c));
        return h
    }

    var Ym = {
        Point: function (b, c, d, e) {
            var f = d.e;
            if (null !== f) {
                if (2 != f.Pc())return;
                var g = b.a(d.a, "Image");
                g.ib(f);
                g.ub(c, e)
            }
            f = d.d;
            null !== f && (b = b.a(d.a, "Text"), b.Ca(f), b.vb(c.Q(), 0, 2, 2, c, e))
        }, LineString: function (b, c, d, e) {
            var f = d.b;
            if (null !== f) {
                var g = b.a(d.a, "LineString");
                g.Ba(null, f);
                g.Eb(c, e)
            }
            f = d.d;
            null !== f && (b = b.a(d.a, "Text"), b.Ca(f), b.vb(am(c), 0, 2, 2, c, e))
        }, Polygon: function (b, c, d, e) {
            var f = d.f, g = d.b;
            if (null !== f || null !== g) {
                var h = b.a(d.a, "Polygon");
                h.Ba(f, g);
                h.Rb(c, e)
            }
            f = d.d;
            null !== f && (b = b.a(d.a, "Text"), b.Ca(f),
                b.vb(Wk(c), 0, 2, 2, c, e))
        }, MultiPoint: function (b, c, d, e) {
            var f = d.e;
            if (null !== f) {
                if (2 != f.Pc())return;
                var g = b.a(d.a, "Image");
                g.ib(f);
                g.tb(c, e)
            }
            f = d.d;
            null !== f && (b = b.a(d.a, "Text"), b.Ca(f), d = c.j, b.vb(d, 0, d.length, c.B, c, e))
        }, MultiLineString: function (b, c, d, e) {
            var f = d.b;
            if (null !== f) {
                var g = b.a(d.a, "LineString");
                g.Ba(null, f);
                g.mc(c, e)
            }
            f = d.d;
            null !== f && (b = b.a(d.a, "Text"), b.Ca(f), d = bm(c), b.vb(d, 0, d.length, 2, c, e))
        }, MultiPolygon: function (b, c, d, e) {
            var f = d.f, g = d.b;
            if (null !== g || null !== f) {
                var h = b.a(d.a, "Polygon");
                h.Ba(f,
                    g);
                h.nc(c, e)
            }
            f = d.d;
            null !== f && (b = b.a(d.a, "Text"), b.Ca(f), d = dm(c), b.vb(d, 0, d.length, 2, c, e))
        }, GeometryCollection: function (b, c, d, e) {
            c = c.c;
            var f, g;
            f = 0;
            for (g = c.length; f < g; ++f)(0, Ym[c[f].O()])(b, c[f], d, e)
        }, Circle: function (b, c, d, e) {
            var f = d.f, g = d.b;
            if (null !== f || null !== g) {
                var h = b.a(d.a, "Polygon");
                h.Ba(f, g);
                h.lc(c, e)
            }
            f = d.d;
            null !== f && (b = b.a(d.a, "Text"), b.Ca(f), b.vb(c.Oc(), 0, 2, 2, c, e))
        }
    };

    function Zm(b, c, d, e, f) {
        Ni.call(this, b, c, d, 2, e);
        this.d = f
    }

    v(Zm, Ni);
    Zm.prototype.a = function () {
        return this.d
    };
    function $m(b) {
        Ji.call(this, {
            attributions: b.attributions,
            extent: b.extent,
            logo: b.logo,
            projection: b.projection,
            state: b.state
        });
        this.i = m(b.resolutions) ? b.resolutions : null
    }

    v($m, Ji);
    function an(b, c) {
        if (null !== b.i) {
            var d = bc(b.i, c, 0);
            c = b.i[d]
        }
        return c
    }

    $m.prototype.r = function (b) {
        b = b.target;
        switch (b.state) {
            case 1:
                this.dispatchEvent(new bn(cn, b));
                break;
            case 2:
                this.dispatchEvent(new bn(dn, b));
                break;
            case 3:
                this.dispatchEvent(new bn(en, b))
        }
    };
    function fn(b, c) {
        b.a().src = c
    }

    function bn(b, c) {
        rc.call(this, b);
        this.image = c
    }

    v(bn, rc);
    var cn = "imageloadstart", dn = "imageloadend", en = "imageloaderror";

    function gn(b) {
        $m.call(this, {
            attributions: b.attributions,
            logo: b.logo,
            projection: b.projection,
            resolutions: b.resolutions,
            state: m(b.state) ? b.state : void 0
        });
        this.N = b.canvasFunction;
        this.p = null;
        this.H = 0;
        this.S = m(b.ratio) ? b.ratio : 1.5
    }

    v(gn, $m);
    gn.prototype.sc = function (b, c, d, e) {
        c = an(this, c);
        var f = this.p;
        if (null !== f && this.H == this.d && f.resolution == c && f.f == d && $d(f.J(), b))return f;
        b = b.slice();
        te(b, this.S);
        e = this.N(b, c, d, [re(b) / c * d, oe(b) / c * d], e);
        null === e || (f = new Zm(b, c, d, this.f, e));
        this.p = f;
        this.H = this.d;
        return f
    };
    var hn;
    (function () {
        var b = {lf: {}};
        (function () {
            function c(b, d) {
                if (!(this instanceof c))return new c(b, d);
                this.ie = Math.max(4, b || 9);
                this.Ze = Math.max(2, Math.ceil(.4 * this.ie));
                d && this.eh(d);
                this.clear()
            }

            function d(b, c) {
                b.bbox = e(b, 0, b.children.length, c)
            }

            function e(b, c, d, e) {
                for (var g = [Infinity, Infinity, -Infinity, -Infinity], h; c < d; c++)h = b.children[c], f(g, b.za ? e(h) : h.bbox);
                return g
            }

            function f(b, c) {
                b[0] = Math.min(b[0], c[0]);
                b[1] = Math.min(b[1], c[1]);
                b[2] = Math.max(b[2], c[2]);
                b[3] = Math.max(b[3], c[3])
            }

            function g(b, c) {
                return b.bbox[0] -
                    c.bbox[0]
            }

            function h(b, c) {
                return b.bbox[1] - c.bbox[1]
            }

            function k(b) {
                return (b[2] - b[0]) * (b[3] - b[1])
            }

            function n(b) {
                return b[2] - b[0] + (b[3] - b[1])
            }

            function p(b, c) {
                return b[0] <= c[0] && b[1] <= c[1] && c[2] <= b[2] && c[3] <= b[3]
            }

            function q(b, c) {
                return c[0] <= b[2] && c[1] <= b[3] && c[2] >= b[0] && c[3] >= b[1]
            }

            function r(b, c, d, e, f) {
                for (var g = [c, d], h; g.length;)d = g.pop(), c = g.pop(), d - c <= e || (h = c + Math.ceil((d - c) / e / 2) * e, s(b, c, d, h, f), g.push(c, h, h, d))
            }

            function s(b, c, d, e, f) {
                for (var g, h, k, n, p; d > c;) {
                    600 < d - c && (g = d - c + 1, h = e - c + 1, k = Math.log(g),
                        n = .5 * Math.exp(2 * k / 3), p = .5 * Math.sqrt(k * n * (g - n) / g) * (0 > h - g / 2 ? -1 : 1), k = Math.max(c, Math.floor(e - h * n / g + p)), h = Math.min(d, Math.floor(e + (g - h) * n / g + p)), s(b, k, h, e, f));
                    g = b[e];
                    h = c;
                    n = d;
                    u(b, c, e);
                    for (0 < f(b[d], g) && u(b, c, d); h < n;) {
                        u(b, h, n);
                        h++;
                        for (n--; 0 > f(b[h], g);)h++;
                        for (; 0 < f(b[n], g);)n--
                    }
                    0 === f(b[c], g) ? u(b, c, n) : (n++, u(b, n, d));
                    n <= e && (c = n + 1);
                    e <= n && (d = n - 1)
                }
            }

            function u(b, c, d) {
                var e = b[c];
                b[c] = b[d];
                b[d] = e
            }

            c.prototype = {
                all: function () {
                    return this.Ve(this.data, [])
                }, search: function (b) {
                    var c = this.data, d = [], e = this.Ka;
                    if (!q(b, c.bbox))return d;
                    for (var f = [], g, h, k, n; c;) {
                        g = 0;
                        for (h = c.children.length; g < h; g++)k = c.children[g], n = c.za ? e(k) : k.bbox, q(b, n) && (c.za ? d.push(k) : p(b, n) ? this.Ve(k, d) : f.push(k));
                        c = f.pop()
                    }
                    return d
                }, load: function (b) {
                    if (!b || !b.length)return this;
                    if (b.length < this.Ze) {
                        for (var c = 0, d = b.length; c < d; c++)this.sa(b[c]);
                        return this
                    }
                    b = this.Xe(b.slice(), 0, b.length - 1, 0);
                    this.data.children.length ? this.data.height === b.height ? this.$e(this.data, b) : (this.data.height < b.height && (c = this.data, this.data = b, b = c), this.Ye(b, this.data.height - b.height - 1,
                        !0)) : this.data = b;
                    return this
                }, sa: function (b) {
                    b && this.Ye(b, this.data.height - 1);
                    return this
                }, clear: function () {
                    this.data = {children: [], height: 1, bbox: [Infinity, Infinity, -Infinity, -Infinity], za: !0};
                    return this
                }, remove: function (b) {
                    if (!b)return this;
                    for (var c = this.data, d = this.Ka(b), e = [], f = [], g, h, k, n; c || e.length;) {
                        c || (c = e.pop(), h = e[e.length - 1], g = f.pop(), n = !0);
                        if (c.za && (k = c.children.indexOf(b), -1 !== k)) {
                            c.children.splice(k, 1);
                            e.push(c);
                            this.dh(e);
                            break
                        }
                        n || c.za || !p(c.bbox, d) ? h ? (g++, c = h.children[g], n = !1) : c = null :
                            (e.push(c), f.push(g), g = 0, h = c, c = c.children[0])
                    }
                    return this
                }, Ka: function (b) {
                    return b
                }, le: function (b, c) {
                    return b[0] - c[0]
                }, me: function (b, c) {
                    return b[1] - c[1]
                }, toJSON: function () {
                    return this.data
                }, Ve: function (b, c) {
                    for (var d = []; b;)b.za ? c.push.apply(c, b.children) : d.push.apply(d, b.children), b = d.pop();
                    return c
                }, Xe: function (b, c, e, f) {
                    var g = e - c + 1, h = this.ie, k;
                    if (g <= h)return k = {
                        children: b.slice(c, e + 1),
                        height: 1,
                        bbox: null,
                        za: !0
                    }, d(k, this.Ka), k;
                    f || (f = Math.ceil(Math.log(g) / Math.log(h)), h = Math.ceil(g / Math.pow(h, f - 1)));
                    k = {children: [], height: f, bbox: null};
                    var g = Math.ceil(g / h), h = g * Math.ceil(Math.sqrt(h)), n, p, q;
                    for (r(b, c, e, h, this.le); c <= e; c += h)for (p = Math.min(c + h - 1, e), r(b, c, p, g, this.me), n = c; n <= p; n += g)q = Math.min(n + g - 1, p), k.children.push(this.Xe(b, n, q, f - 1));
                    d(k, this.Ka);
                    return k
                }, bh: function (b, c, d, e) {
                    for (var f, g, h, n, p, q, r, s; ;) {
                        e.push(c);
                        if (c.za || e.length - 1 === d)break;
                        r = s = Infinity;
                        f = 0;
                        for (g = c.children.length; f < g; f++) {
                            h = c.children[f];
                            p = k(h.bbox);
                            q = b;
                            var u = h.bbox;
                            q = (Math.max(u[2], q[2]) - Math.min(u[0], q[0])) * (Math.max(u[3],
                                q[3]) - Math.min(u[1], q[1])) - p;
                            q < s ? (s = q, r = p < r ? p : r, n = h) : q === s && p < r && (r = p, n = h)
                        }
                        c = n
                    }
                    return c
                }, Ye: function (b, c, d) {
                    var e = this.Ka;
                    d = d ? b.bbox : e(b);
                    var e = [], g = this.bh(d, this.data, c, e);
                    g.children.push(b);
                    for (f(g.bbox, d); 0 <= c;)if (e[c].children.length > this.ie)this.fh(e, c), c--; else break;
                    this.Zg(d, e, c)
                }, fh: function (b, c) {
                    var e = b[c], f = e.children.length, g = this.Ze;
                    this.$g(e, g, f);
                    f = {children: e.children.splice(this.ah(e, g, f)), height: e.height};
                    e.za && (f.za = !0);
                    d(e, this.Ka);
                    d(f, this.Ka);
                    c ? b[c - 1].children.push(f) : this.$e(e,
                        f)
                }, $e: function (b, c) {
                    this.data = {children: [b, c], height: b.height + 1};
                    d(this.data, this.Ka)
                }, ah: function (b, c, d) {
                    var f, g, h, n, p, q, r;
                    p = q = Infinity;
                    for (f = c; f <= d - c; f++) {
                        g = e(b, 0, f, this.Ka);
                        h = e(b, f, d, this.Ka);
                        var s = g, u = h;
                        n = Math.max(s[0], u[0]);
                        var mb = Math.max(s[1], u[1]), Qb = Math.min(s[2], u[2]), s = Math.min(s[3], u[3]);
                        n = Math.max(0, Qb - n) * Math.max(0, s - mb);
                        g = k(g) + k(h);
                        n < p ? (p = n, r = f, q = g < q ? g : q) : n === p && g < q && (q = g, r = f)
                    }
                    return r
                }, $g: function (b, c, d) {
                    var e = b.za ? this.le : g, f = b.za ? this.me : h, k = this.We(b, c, d, e);
                    c = this.We(b, c, d, f);
                    k < c && b.children.sort(e)
                }, We: function (b, c, d, g) {
                    b.children.sort(g);
                    g = this.Ka;
                    var h = e(b, 0, c, g), k = e(b, d - c, d, g), p = n(h) + n(k), q, r;
                    for (q = c; q < d - c; q++)r = b.children[q], f(h, b.za ? g(r) : r.bbox), p += n(h);
                    for (q = d - c - 1; q >= c; q--)r = b.children[q], f(k, b.za ? g(r) : r.bbox), p += n(k);
                    return p
                }, Zg: function (b, c, d) {
                    for (; 0 <= d; d--)f(c[d].bbox, b)
                }, dh: function (b) {
                    for (var c = b.length - 1, e; 0 <= c; c--)0 === b[c].children.length ? 0 < c ? (e = b[c - 1].children, e.splice(e.indexOf(b[c]), 1)) : this.clear() : d(b[c], this.Ka)
                }, eh: function (b) {
                    var c = ["return a", " - b",
                        ";"];
                    this.le = new Function("a", "b", c.join(b[0]));
                    this.me = new Function("a", "b", c.join(b[1]));
                    this.Ka = new Function("a", "return [a" + b.join(", a") + "];")
                }
            };
            "function" === typeof define && define.Nm ? define("rbush", function () {
                return c
            }) : "undefined" !== typeof b ? b.lf = c : "undefined" !== typeof self ? self.a = c : window.a = c
        })();
        hn = b.lf
    })();
    function jn(b) {
        this.d = hn(b);
        this.a = {}
    }

    l = jn.prototype;
    l.sa = function (b, c) {
        var d = [b[0], b[1], b[2], b[3], c];
        this.d.sa(d);
        this.a[ma(c)] = d
    };
    l.load = function (b, c) {
        for (var d = Array(c.length), e = 0, f = c.length; e < f; e++) {
            var g = b[e], h = c[e], g = [g[0], g[1], g[2], g[3], h];
            d[e] = g;
            this.a[ma(h)] = g
        }
        this.d.load(d)
    };
    l.remove = function (b) {
        b = ma(b);
        var c = this.a[b];
        yb(this.a, b);
        return null !== this.d.remove(c)
    };
    l.update = function (b, c) {
        var d = ma(c);
        de(this.a[d].slice(0, 4), b) || (this.remove(c), this.sa(b, c))
    };
    function kn(b) {
        b = b.d.all();
        return Sa(b, function (b) {
            return b[4]
        })
    }

    function ln(b, c) {
        var d = b.d.search(c);
        return Sa(d, function (b) {
            return b[4]
        })
    }

    l.forEach = function (b, c) {
        return mn(kn(this), b, c)
    };
    function nn(b, c, d, e) {
        return mn(ln(b, c), d, e)
    }

    function mn(b, c, d) {
        for (var e, f = 0, g = b.length; f < g && !(e = c.call(d, b[f])); f++);
        return e
    }

    l.la = function () {
        return wb(this.a)
    };
    l.clear = function () {
        this.d.clear();
        this.a = {}
    };
    l.J = function () {
        return this.d.data.bbox
    };
    function on(b) {
        b = m(b) ? b : {};
        Ji.call(this, {
            attributions: b.attributions,
            logo: b.logo,
            projection: b.projection,
            state: m(b.state) ? b.state : void 0
        });
        this.b = new jn;
        this.c = {};
        this.e = {};
        this.i = {};
        this.k = {};
        m(b.features) && this.lb(b.features)
    }

    v(on, Ji);
    l = on.prototype;
    l.Va = function (b) {
        var c = ma(b).toString();
        pn(this, c, b);
        var d = b.R();
        null != d ? (d = d.J(), this.b.sa(d, b)) : this.c[c] = b;
        qn(this, c, b);
        this.dispatchEvent(new rn("addfeature", b));
        this.l()
    };
    function pn(b, c, d) {
        b.k[c] = [w(d, "change", b.Rf, !1, b), w(d, "propertychange", b.Rf, !1, b)]
    }

    function qn(b, c, d) {
        var e = d.aa;
        m(e) ? b.e[e.toString()] = d : b.i[c] = d
    }

    l.Ga = function (b) {
        this.lb(b);
        this.l()
    };
    l.lb = function (b) {
        var c, d, e, f, g = [], h = [];
        d = 0;
        for (e = b.length; d < e; d++) {
            f = b[d];
            c = ma(f).toString();
            pn(this, c, f);
            var k = f.R();
            null != k ? (c = k.J(), g.push(c), h.push(f)) : this.c[c] = f
        }
        this.b.load(g, h);
        d = 0;
        for (e = b.length; d < e; d++)f = b[d], c = ma(f).toString(), qn(this, c, f), this.dispatchEvent(new rn("addfeature", f))
    };
    l.clear = function (b) {
        if (b) {
            for (var c in this.k)Qa(this.k[c], Xc);
            this.k = {};
            this.e = {};
            this.i = {}
        } else b = this.ng, this.b.forEach(b, this), ob(this.c, b, this);
        this.b.clear();
        this.c = {};
        this.dispatchEvent(new rn("clear"));
        this.l()
    };
    l.$a = function (b, c) {
        return this.b.forEach(b, c)
    };
    function sn(b, c, d) {
        b.wa([c[0], c[1], c[0], c[1]], function (b) {
            if (b.R().Jb(c[0], c[1]))return d.call(void 0, b)
        })
    }

    l.wa = function (b, c, d) {
        return nn(this.b, b, c, d)
    };
    l.Fb = function (b, c, d, e) {
        return this.wa(b, d, e)
    };
    l.Ma = function (b, c, d) {
        return this.wa(b, function (e) {
            if (e.R().ja(b) && (e = c.call(d, e)))return e
        })
    };
    l.Aa = function () {
        var b = kn(this.b);
        wb(this.c) || ab(b, rb(this.c));
        return b
    };
    l.Oa = function (b) {
        var c = [];
        sn(this, b, function (b) {
            c.push(b)
        });
        return c
    };
    l.ab = function (b) {
        var c = b[0], d = b[1], e = null, f = [NaN, NaN], g = Infinity, h = [-Infinity, -Infinity, Infinity, Infinity];
        nn(this.b, h, function (b) {
            var n = b.R(), p = g;
            g = n.Ya(c, d, f, g);
            g < p && (e = b, b = Math.sqrt(g), h[0] = c - b, h[1] = d - b, h[2] = c + b, h[3] = d + b)
        });
        return e
    };
    l.J = function () {
        return this.b.J()
    };
    l.Na = function (b) {
        b = this.e[b.toString()];
        return m(b) ? b : null
    };
    l.Rf = function (b) {
        b = b.target;
        var c = ma(b).toString(), d = b.R();
        null != d ? (d = d.J(), c in this.c ? (delete this.c[c], this.b.sa(d, b)) : this.b.update(d, b)) : c in this.c || (this.b.remove(b), this.c[c] = b);
        d = b.aa;
        m(d) ? (d = d.toString(), c in this.i ? (delete this.i[c], this.e[d] = b) : this.e[d] !== b && (tn(this, b), this.e[d] = b)) : c in this.i || (tn(this, b), this.i[c] = b);
        this.l();
        this.dispatchEvent(new rn("changefeature", b))
    };
    l.la = function () {
        return this.b.la() && wb(this.c)
    };
    l.Hb = ca;
    l.fb = function (b) {
        var c = ma(b).toString();
        c in this.c ? delete this.c[c] : this.b.remove(b);
        this.ng(b);
        this.l()
    };
    l.ng = function (b) {
        var c = ma(b).toString();
        Qa(this.k[c], Xc);
        delete this.k[c];
        var d = b.aa;
        m(d) ? delete this.e[d.toString()] : delete this.i[c];
        this.dispatchEvent(new rn("removefeature", b))
    };
    function tn(b, c) {
        for (var d in b.e)if (b.e[d] === c) {
            delete b.e[d];
            break
        }
    }

    function rn(b, c) {
        rc.call(this, b);
        this.feature = c
    }

    v(rn, rc);
    function un(b) {
        this.a = b.source;
        this.U = Id();
        this.b = Mf();
        this.c = [0, 0];
        this.k = null;
        gn.call(this, {
            attributions: b.attributions,
            canvasFunction: ra(this.nh, this),
            logo: b.logo,
            projection: b.projection,
            ratio: b.ratio,
            resolutions: b.resolutions,
            state: this.a.q
        });
        this.o = null;
        this.e = void 0;
        this.Of(b.style);
        w(this.a, "change", this.gk, void 0, this)
    }

    v(un, gn);
    l = un.prototype;
    l.nh = function (b, c, d, e, f) {
        var g = new um(.5 * c / d, b, c);
        this.a.Hb(b, c, f);
        var h = !1;
        this.a.Fb(b, c, function (b) {
            var e;
            if (!(e = h)) {
                var f;
                m(b.a) ? f = b.a.call(b, c) : m(this.e) && (f = this.e(b, c));
                if (null != f) {
                    var q, r = !1;
                    e = 0;
                    for (q = f.length; e < q; ++e)r = Xm(g, b, f[e], Wm(c, d), this.fk, this) || r;
                    e = r
                } else e = !1
            }
            h = e
        }, this);
        vm(g);
        if (h)return null;
        this.c[0] != e[0] || this.c[1] != e[1] ? (this.b.canvas.width = e[0], this.b.canvas.height = e[1], this.c[0] = e[0], this.c[1] = e[1]) : this.b.clearRect(0, 0, e[0], e[1]);
        b = vn(this, le(b), c, d, e);
        ym(g, this.b, d, b, 0,
            {});
        this.k = g;
        return this.b.canvas
    };
    l.Jd = function (b, c, d, e, f) {
        if (null !== this.k) {
            var g = {};
            return this.k.b(b, c, 0, e, function (b) {
                var c = ma(b).toString();
                if (!(c in g))return g[c] = !0, f(b)
            })
        }
    };
    l.ck = function () {
        return this.a
    };
    l.dk = function () {
        return this.o
    };
    l.ek = function () {
        return this.e
    };
    function vn(b, c, d, e, f) {
        return gj(b.U, f[0] / 2, f[1] / 2, e / d, -e / d, 0, -c[0], -c[1])
    }

    l.fk = function () {
        this.l()
    };
    l.gk = function () {
        Ki(this, this.a.q)
    };
    l.Of = function (b) {
        this.o = m(b) ? b : tl;
        this.e = null === b ? void 0 : sl(this.o);
        this.l()
    };
    function wn(b) {
        zm.call(this, b);
        this.f = null;
        this.e = Id();
        this.b = this.c = null
    }

    v(wn, zm);
    l = wn.prototype;
    l.Ua = function (b, c, d, e) {
        var f = this.a;
        return f.a().Jd(b, c.viewState.resolution, c.viewState.rotation, c.skippedFeatureUids, function (b) {
            return d.call(e, b, f)
        })
    };
    l.cc = function (b, c, d, e) {
        if (!fa(this.Id()))if (this.a.a()instanceof un) {
            if (b = b.slice(), ij(c.pixelToCoordinateMatrix, b, b), this.Ua(b, c, cd, this))return d.call(e, this.a)
        } else if (null === this.c && (this.c = Id(), Od(this.e, this.c)), c = Cm(b, this.c), null === this.b && (this.b = Mf(1, 1)), this.b.clearRect(0, 0, 1, 1), this.b.drawImage(this.Id(), c[0], c[1], 1, 1, 0, 0, 1, 1), 0 < this.b.getImageData(0, 0, 1, 1).data[3])return d.call(e, this.a)
    };
    l.Id = function () {
        return null === this.f ? null : this.f.a()
    };
    l.of = function () {
        return this.e
    };
    l.Ae = function (b, c) {
        var d = b.pixelRatio, e = b.viewState, f = e.center, g = e.resolution, h = e.rotation, k, n = this.a.a(), p = b.viewHints;
        k = b.extent;
        m(c.extent) && (k = pe(k, c.extent));
        p[0] || p[1] || se(k) || (e = e.projection, p = n.g, null === p || (e = p), k = n.sc(k, g, d, e), null !== k && lj(this, k) && (this.f = k));
        if (null !== this.f) {
            k = this.f;
            var e = k.J(), p = k.resolution, q = k.f, g = d * p / (g * q);
            gj(this.e, d * b.size[0] / 2, d * b.size[1] / 2, g, g, h, q * (e[0] - f[0]) / p, q * (f[1] - e[3]) / p);
            this.c = null;
            oj(b.attributions, k.e);
            pj(b, n)
        }
        return !0
    };
    function xn(b) {
        zm.call(this, b);
        this.b = this.e = null;
        this.i = !1;
        this.g = null;
        this.k = Id();
        this.f = null;
        this.p = this.o = NaN;
        this.n = this.c = null
    }

    v(xn, zm);
    xn.prototype.Id = function () {
        return this.e
    };
    xn.prototype.of = function () {
        return this.k
    };
    xn.prototype.Ae = function (b, c) {
        var d = b.pixelRatio, e = b.viewState, f = e.projection, g = this.a, h = g.a(), k = ej(h, f), n = h.jd(), p = bc(k.a, e.resolution, 0), q = h.Xb(p, b.pixelRatio, f), r = k.na(p), s = r / (q / k.ua(p)), u = e.center, z;
        r == e.resolution ? (u = rj(u, r, b.size), z = ne(u, r, e.rotation, b.size)) : z = b.extent;
        m(c.extent) && (z = pe(z, c.extent));
        if (se(z))return !1;
        var y = Yi(k, z, r), A = q * (y.c - y.a + 1), D = q * (y.d - y.b + 1), x, M;
        null === this.e ? (M = Mf(A, D), this.e = M.canvas, this.b = [A, D], this.g = M, this.i = !Dm(this.b)) : (x = this.e, M = this.g, this.b[0] < A || this.b[1] <
        D || this.p !== q || this.i && (this.b[0] > A || this.b[1] > D) ? (x.width = A, x.height = D, this.b = [A, D], this.i = !Dm(this.b), this.c = null) : (A = this.b[0], D = this.b[1], (x = p != this.o) || (x = this.c, x = !(x.a <= y.a && y.c <= x.c && x.b <= y.b && y.d <= x.d)), x && (this.c = null)));
        var Q, O;
        null === this.c ? (A /= q, D /= q, Q = y.a - Math.floor((A - (y.c - y.a + 1)) / 2), O = y.b - Math.floor((D - (y.d - y.b + 1)) / 2), this.o = p, this.p = q, this.c = new lf(Q, Q + A - 1, O, O + D - 1), this.n = Array(A * D), D = this.c) : (D = this.c, A = D.c - D.a + 1);
        x = {};
        x[p] = {};
        var W = [], Ja = this.ed(h, x), lb = g.ea(), Ka = Td(), mb = new lf(0,
            0, 0, 0), Qb, Za, Ub;
        for (O = y.a; O <= y.c; ++O)for (Ub = y.b; Ub <= y.d; ++Ub)Za = h.Vb(p, O, Ub, d, f), Q = Za.state, 2 == Q || 4 == Q || 3 == Q && !lb ? x[p][kf(Za.a)] = Za : (Qb = k.gd(Za.a, Ja, null, mb, Ka), Qb || (W.push(Za), Qb = k.td(Za.a, mb, Ka), null === Qb || Ja(p + 1, Qb)));
        Ja = 0;
        for (Qb = W.length; Ja < Qb; ++Ja)Za = W[Ja], O = q * (Za.a[1] - D.a), Ub = q * (D.d - Za.a[2]), M.clearRect(O, Ub, q, q);
        W = Sa(sb(x), Number);
        db(W);
        var nb = h.H, Mc = ke(Wi(k, [p, D.a, D.d], Ka)), sc, Oe, mj, Wh, Rf, $l, Ja = 0;
        for (Qb = W.length; Ja < Qb; ++Ja)if (sc = W[Ja], q = h.Xb(sc, d, f), Wh = x[sc], sc == p)for (mj in Wh)Za = Wh[mj], Oe =
            (Za.a[2] - D.b) * A + (Za.a[1] - D.a), this.n[Oe] != Za && (O = q * (Za.a[1] - D.a), Ub = q * (D.d - Za.a[2]), Q = Za.state, 4 != Q && (3 != Q || lb) && nb || M.clearRect(O, Ub, q, q), 2 == Q && M.drawImage(Za.Ta(), n, n, q, q, O, Ub, q, q), this.n[Oe] = Za); else for (mj in sc = k.na(sc) / r, Wh)for (Za = Wh[mj], Oe = Wi(k, Za.a, Ka), O = (Oe[0] - Mc[0]) / s, Ub = (Mc[1] - Oe[3]) / s, $l = sc * q, Rf = sc * q, Q = Za.state, 4 != Q && nb || M.clearRect(O, Ub, $l, Rf), 2 == Q && M.drawImage(Za.Ta(), n, n, q, q, O, Ub, $l, Rf), Za = Xi(k, Oe, p, mb), Q = Math.max(Za.a, D.a), Ub = Math.min(Za.c, D.c), O = Math.max(Za.b, D.b), Za = Math.min(Za.d,
            D.d); Q <= Ub; ++Q)for (Rf = O; Rf <= Za; ++Rf)Oe = (Rf - D.b) * A + (Q - D.a), this.n[Oe] = void 0;
        qj(b.usedTiles, h, p, y);
        sj(b, h, k, d, f, z, p, g.r());
        nj(b, h);
        pj(b, h);
        gj(this.k, d * b.size[0] / 2, d * b.size[1] / 2, d * s / e.resolution, d * s / e.resolution, e.rotation, (Mc[0] - u[0]) / s, (u[1] - Mc[1]) / s);
        this.f = null;
        return !0
    };
    xn.prototype.cc = function (b, c, d, e) {
        if (null !== this.g && (null === this.f && (this.f = Id(), Od(this.k, this.f)), b = Cm(b, this.f), 0 < this.g.getImageData(b[0], b[1], 1, 1).data[3]))return d.call(e, this.a)
    };
    function yn(b) {
        zm.call(this, b);
        this.c = !1;
        this.i = -1;
        this.n = NaN;
        this.e = Td();
        this.b = this.g = null;
        this.f = Mf()
    }

    v(yn, zm);
    yn.prototype.q = function (b, c, d) {
        var e = Bm(this, b);
        Am(this, "precompose", d, b, e);
        var f = this.b;
        if (null !== f && !f.la()) {
            var g;
            kd(this.a, "render") ? (this.f.canvas.width = d.canvas.width, this.f.canvas.height = d.canvas.height, g = this.f) : g = d;
            var h = g.globalAlpha;
            g.globalAlpha = c.opacity;
            ym(f, g, b.pixelRatio, e, b.viewState.rotation, b.skippedFeatureUids);
            g != d && (Am(this, "render", g, b, e), d.drawImage(g.canvas, 0, 0));
            g.globalAlpha = h
        }
        Am(this, "postcompose", d, b, e)
    };
    yn.prototype.Ua = function (b, c, d, e) {
        if (null !== this.b) {
            var f = this.a, g = {};
            return this.b.b(b, c.viewState.resolution, c.viewState.rotation, c.skippedFeatureUids, function (b) {
                var c = ma(b).toString();
                if (!(c in g))return g[c] = !0, d.call(e, b, f)
            })
        }
    };
    yn.prototype.k = function () {
        kj(this)
    };
    yn.prototype.Ae = function (b) {
        function c(b) {
            var c;
            m(b.a) ? c = b.a.call(b, k) : m(d.r) && (c = (0, d.r)(b, k));
            if (null != c) {
                if (null != c) {
                    var e, f, g = !1;
                    e = 0;
                    for (f = c.length; e < f; ++e)g = Xm(q, b, c[e], Wm(k, n), this.k, this) || g;
                    b = g
                } else b = !1;
                this.c = this.c || b
            }
        }

        var d = this.a, e = d.a();
        oj(b.attributions, e.f);
        pj(b, e);
        if (!this.c && (!d.Ac && b.viewHints[0] || b.viewHints[1]))return !0;
        var f = b.extent, g = b.viewState, h = g.projection, k = g.resolution, n = b.pixelRatio;
        b = d.d;
        var p = d.ea, g = d.get("renderOrder");
        m(g) || (g = Vm);
        f = Xd(f, p * k);
        if (!this.c && this.n ==
            k && this.i == b && this.g == g && $d(this.e, f))return !0;
        qc(this.b);
        this.b = null;
        this.c = !1;
        var q = new um(.5 * k / n, f, k, d.ea);
        e.Hb(f, k, h);
        if (null === g)e.Fb(f, k, c, this); else {
            var r = [];
            e.Fb(f, k, function (b) {
                r.push(b)
            }, this);
            db(r, g);
            Qa(r, c, this)
        }
        vm(q);
        this.n = k;
        this.i = b;
        this.g = g;
        this.e = f;
        this.b = q;
        return !0
    };
    function zn(b, c) {
        yj.call(this, 0, c);
        this.c = Mf();
        this.a = this.c.canvas;
        this.a.style.width = "100%";
        this.a.style.height = "100%";
        this.a.className = "ol-unselectable";
        Gf(b, this.a, 0);
        this.d = !0;
        this.f = Id()
    }

    v(zn, yj);
    zn.prototype.ne = function (b) {
        return b instanceof H ? new wn(b) : b instanceof I ? new xn(b) : b instanceof J ? new yn(b) : null
    };
    function An(b, c, d) {
        var e = b.g, f = b.c;
        if (kd(e, c)) {
            var g = d.extent, h = d.pixelRatio, k = d.viewState, n = k.resolution, p = k.rotation;
            gj(b.f, b.a.width / 2, b.a.height / 2, h / n, -h / n, -p, -k.center[0], -k.center[1]);
            k = new um(.5 * n / h, g, n);
            g = new Sl(f, h, g, b.f, p);
            e.dispatchEvent(new Yk(c, e, g, k, d, f, null));
            vm(k);
            k.la() || ym(k, f, h, b.f, p, {});
            em(g);
            b.b = k
        }
    }

    zn.prototype.O = function () {
        return "canvas"
    };
    zn.prototype.Yd = function (b) {
        if (null === b)this.d && (Lg(this.a, !1), this.d = !1); else {
            var c = this.c, d = b.size[0] * b.pixelRatio, e = b.size[1] * b.pixelRatio;
            this.a.width != d || this.a.height != e ? (this.a.width = d, this.a.height = e) : c.clearRect(0, 0, this.a.width, this.a.height);
            zj(b);
            An(this, "precompose", b);
            var d = b.layerStatesArray, e = b.viewState.resolution, f, g, h, k;
            f = 0;
            for (g = d.length; f < g; ++f)k = d[f], h = k.layer, h = Bj(this, h), Mi(k, e) && "ready" == k.yc && h.Ae(b, k) && h.q(b, k, c);
            An(this, "postcompose", b);
            this.d || (Lg(this.a, !0), this.d = !0);
            Cj(this, b);
            b.postRenderFunctions.push(Aj)
        }
    };
    function Bn(b, c) {
        jj.call(this, b);
        this.target = c
    }

    v(Bn, jj);
    Bn.prototype.f = ca;
    Bn.prototype.n = ca;
    function Cn(b) {
        var c = Df("DIV");
        c.style.position = "absolute";
        Bn.call(this, b, c);
        this.b = null;
        this.c = Kd()
    }

    v(Cn, Bn);
    Cn.prototype.Ua = function (b, c, d, e) {
        var f = this.a;
        return f.a().Jd(b, c.viewState.resolution, c.viewState.rotation, c.skippedFeatureUids, function (b) {
            return d.call(e, b, f)
        })
    };
    Cn.prototype.f = function () {
        Ff(this.target);
        this.b = null
    };
    Cn.prototype.e = function (b, c) {
        var d = b.viewState, e = d.center, f = d.resolution, g = d.rotation, h = this.b, k = this.a.a(), n = b.viewHints, p = b.extent;
        m(c.extent) && (p = pe(p, c.extent));
        n[0] || n[1] || se(p) || (d = d.projection, n = k.g, null === n || (d = n), p = k.sc(p, f, b.pixelRatio, d), null === p || lj(this, p) && (h = p));
        null !== h && (d = h.J(), n = h.resolution, p = Id(), gj(p, b.size[0] / 2, b.size[1] / 2, n / f, n / f, g, (d[0] - e[0]) / n, (e[1] - d[3]) / n), h != this.b && (e = h.a(this), e.style.maxWidth = "none", e.style.position = "absolute", Ff(this.target), this.target.appendChild(e),
            this.b = h), hj(p, this.c) || (Qf(this.target, p), Ld(this.c, p)), oj(b.attributions, h.e), pj(b, k));
        return !0
    };
    function Dn(b) {
        var c = Df("DIV");
        c.style.position = "absolute";
        Bn.call(this, b, c);
        this.c = !0;
        this.i = 1;
        this.g = 0;
        this.b = {}
    }

    v(Dn, Bn);
    Dn.prototype.f = function () {
        Ff(this.target);
        this.g = 0
    };
    Dn.prototype.e = function (b, c) {
        if (!c.visible)return this.c && (Lg(this.target, !1), this.c = !1), !0;
        var d = b.pixelRatio, e = b.viewState, f = e.projection, g = this.a, h = g.a(), k = ej(h, f), n = h.jd(), p = bc(k.a, e.resolution, 0), q = k.na(p), r = e.center, s;
        q == e.resolution ? (r = rj(r, q, b.size), s = ne(r, q, e.rotation, b.size)) : s = b.extent;
        m(c.extent) && (s = pe(s, c.extent));
        var q = Yi(k, s, q), u = {};
        u[p] = {};
        var z = this.ed(h, u), y = g.ea(), A = Td(), D = new lf(0, 0, 0, 0), x, M, Q, O;
        for (Q = q.a; Q <= q.c; ++Q)for (O = q.b; O <= q.d; ++O)x = h.Vb(p, Q, O, d, f), M = x.state, 2 == M ? u[p][kf(x.a)] =
            x : 4 == M || 3 == M && !y || (M = k.gd(x.a, z, null, D, A), M || (x = k.td(x.a, D, A), null === x || z(p + 1, x)));
        var W;
        if (this.g != h.d) {
            for (W in this.b)y = this.b[+W], Hf(y.target);
            this.b = {};
            this.g = h.d
        }
        A = Sa(sb(u), Number);
        db(A);
        var z = {}, Ja;
        Q = 0;
        for (O = A.length; Q < O; ++Q) {
            W = A[Q];
            W in this.b ? y = this.b[W] : (y = k.Nc(r, W), y = new En(k, y), z[W] = !0, this.b[W] = y);
            W = u[W];
            for (Ja in W) {
                x = y;
                M = W[Ja];
                var lb = n, Ka = M.a, mb = Ka[0], Qb = Ka[1], Za = Ka[2], Ka = kf(Ka);
                if (!(Ka in x.d)) {
                    var mb = x.c.ua(mb), Ub = M.Ta(x), nb = Ub.style;
                    nb.maxWidth = "none";
                    var Mc = void 0, sc = void 0;
                    0 < lb ?
                        (Mc = Df("DIV"), sc = Mc.style, sc.overflow = "hidden", sc.width = mb + "px", sc.height = mb + "px", nb.position = "absolute", nb.left = -lb + "px", nb.top = -lb + "px", nb.width = mb + 2 * lb + "px", nb.height = mb + 2 * lb + "px", Mc.appendChild(Ub)) : (nb.width = mb + "px", nb.height = mb + "px", Mc = Ub, sc = nb);
                    sc.position = "absolute";
                    sc.left = (Qb - x.b[1]) * mb + "px";
                    sc.top = (x.b[2] - Za) * mb + "px";
                    null === x.a && (x.a = document.createDocumentFragment());
                    x.a.appendChild(Mc);
                    x.d[Ka] = M
                }
            }
            null !== y.a && (y.target.appendChild(y.a), y.a = null)
        }
        n = Sa(sb(this.b), Number);
        db(n);
        Q = Id();
        Ja =
            0;
        for (A = n.length; Ja < A; ++Ja)if (W = n[Ja], y = this.b[W], W in u)if (x = y.g, O = y.e, gj(Q, b.size[0] / 2, b.size[1] / 2, x / e.resolution, x / e.resolution, e.rotation, (O[0] - r[0]) / x, (r[1] - O[1]) / x), O = y, x = Q, hj(x, O.f) || (Qf(O.target, x), Ld(O.f, x)), W in z) {
            for (--W; 0 <= W; --W)if (W in this.b) {
                O = this.b[W].target;
                O.parentNode && O.parentNode.insertBefore(y.target, O.nextSibling);
                break
            }
            0 > W && Gf(this.target, y.target, 0)
        } else {
            if (!b.viewHints[0] && !b.viewHints[1]) {
                M = Xi(y.c, s, y.b[0], D);
                W = [];
                x = O = void 0;
                for (x in y.d)O = y.d[x], M.contains(O.a) || W.push(O);
                lb = M = void 0;
                M = 0;
                for (lb = W.length; M < lb; ++M)O = W[M], x = kf(O.a), Hf(O.Ta(y)), delete y.d[x]
            }
        } else Hf(y.target), delete this.b[W];
        c.opacity != this.i && (this.i = this.target.style.opacity = c.opacity);
        c.visible && !this.c && (Lg(this.target, !0), this.c = !0);
        qj(b.usedTiles, h, p, q);
        sj(b, h, k, d, f, s, p, g.r());
        nj(b, h);
        pj(b, h);
        return !0
    };
    function En(b, c) {
        this.target = Df("DIV");
        this.target.style.position = "absolute";
        this.target.style.width = "100%";
        this.target.style.height = "100%";
        this.c = b;
        this.b = c;
        this.e = ke(Wi(b, c));
        this.g = b.na(c[0]);
        this.d = {};
        this.a = null;
        this.f = Kd()
    };
    function Fn(b) {
        this.g = Mf();
        var c = this.g.canvas;
        c.style.maxWidth = "none";
        c.style.position = "absolute";
        Bn.call(this, b, c);
        this.c = !1;
        this.o = -1;
        this.q = NaN;
        this.i = Td();
        this.b = this.k = null;
        this.r = Id();
        this.p = Id()
    }

    v(Fn, Bn);
    Fn.prototype.n = function (b, c) {
        var d = b.viewState, e = d.center, f = d.rotation, g = d.resolution, d = b.pixelRatio, h = b.size[0], k = b.size[1], n = h * d, p = k * d, e = gj(this.r, d * h / 2, d * k / 2, d / g, -d / g, -f, -e[0], -e[1]), g = this.g;
        g.canvas.width = n;
        g.canvas.height = p;
        h = gj(this.p, 0, 0, 1 / d, 1 / d, 0, -(n - h) / 2 * d, -(p - k) / 2 * d);
        Qf(g.canvas, h);
        Gn(this, "precompose", b, e);
        h = this.b;
        null === h || h.la() || (g.globalAlpha = c.opacity, ym(h, g, d, e, f, b.skippedFeatureUids), Gn(this, "render", b, e));
        Gn(this, "postcompose", b, e)
    };
    function Gn(b, c, d, e) {
        var f = b.g;
        b = b.a;
        kd(b, c) && (e = new Sl(f, d.pixelRatio, d.extent, e, d.viewState.rotation), b.dispatchEvent(new Yk(c, b, e, null, d, f, null)), em(e))
    }

    Fn.prototype.Ua = function (b, c, d, e) {
        if (null !== this.b) {
            var f = this.a, g = {};
            return this.b.b(b, c.viewState.resolution, c.viewState.rotation, c.skippedFeatureUids, function (b) {
                var c = ma(b).toString();
                if (!(c in g))return g[c] = !0, d.call(e, b, f)
            })
        }
    };
    Fn.prototype.D = function () {
        kj(this)
    };
    Fn.prototype.e = function (b) {
        function c(b) {
            var c;
            m(b.a) ? c = b.a.call(b, k) : m(d.r) && (c = (0, d.r)(b, k));
            if (null != c) {
                if (null != c) {
                    var e, f, g = !1;
                    e = 0;
                    for (f = c.length; e < f; ++e)g = Xm(q, b, c[e], Wm(k, n), this.D, this) || g;
                    b = g
                } else b = !1;
                this.c = this.c || b
            }
        }

        var d = this.a, e = d.a();
        oj(b.attributions, e.f);
        pj(b, e);
        if (!this.c && (!d.Ac && b.viewHints[0] || b.viewHints[1]))return !0;
        var f = b.extent, g = b.viewState, h = g.projection, k = g.resolution, n = b.pixelRatio;
        b = d.d;
        var p = d.ea, g = d.get("renderOrder");
        m(g) || (g = Vm);
        f = Xd(f, p * k);
        if (!this.c && this.q ==
            k && this.o == b && this.k == g && $d(this.i, f))return !0;
        qc(this.b);
        this.b = null;
        this.c = !1;
        var q = new um(.5 * k / n, f, k, d.ea);
        e.Hb(f, k, h);
        if (null === g)e.Fb(f, k, c, this); else {
            var r = [];
            e.Fb(f, k, function (b) {
                r.push(b)
            }, this);
            db(r, g);
            Qa(r, c, this)
        }
        vm(q);
        this.q = k;
        this.o = b;
        this.k = g;
        this.i = f;
        this.b = q;
        return !0
    };
    function Hn(b, c) {
        yj.call(this, 0, c);
        this.d = null;
        this.d = Mf();
        var d = this.d.canvas;
        d.style.position = "absolute";
        d.style.width = "100%";
        d.style.height = "100%";
        d.className = "ol-unselectable";
        Gf(b, d, 0);
        this.f = Id();
        this.a = Df("DIV");
        this.a.className = "ol-unselectable";
        d = this.a.style;
        d.position = "absolute";
        d.width = "100%";
        d.height = "100%";
        w(this.a, "touchstart", uc);
        Gf(b, this.a, 0);
        this.c = !0
    }

    v(Hn, yj);
    Hn.prototype.P = function () {
        Hf(this.a);
        Hn.T.P.call(this)
    };
    Hn.prototype.ne = function (b) {
        if (b instanceof H)b = new Cn(b); else if (b instanceof I)b = new Dn(b); else if (b instanceof J)b = new Fn(b); else return null;
        return b
    };
    function In(b, c, d) {
        var e = b.g;
        if (kd(e, c)) {
            var f = d.extent, g = d.pixelRatio, h = d.viewState, k = h.resolution, n = h.rotation, p = b.d, q = p.canvas;
            gj(b.f, q.width / 2, q.height / 2, g / h.resolution, -g / h.resolution, -h.rotation, -h.center[0], -h.center[1]);
            h = new Sl(p, g, f, b.f, n);
            f = new um(.5 * k / g, f, k);
            e.dispatchEvent(new Yk(c, e, h, f, d, p, null));
            vm(f);
            f.la() || ym(f, p, g, b.f, n, {});
            em(h);
            b.b = f
        }
    }

    Hn.prototype.O = function () {
        return "dom"
    };
    Hn.prototype.Yd = function (b) {
        if (null === b)this.c && (Lg(this.a, !1), this.c = !1); else {
            var c;
            c = function (b, c) {
                Gf(this.a, b, c)
            };
            var d = this.g;
            if (kd(d, "precompose") || kd(d, "postcompose")) {
                var d = this.d.canvas, e = b.pixelRatio;
                d.width = b.size[0] * e;
                d.height = b.size[1] * e
            }
            In(this, "precompose", b);
            var d = b.layerStatesArray, f, g, h, e = 0;
            for (f = d.length; e < f; ++e)h = d[e], g = h.layer, g = Bj(this, g), c.call(this, g.target, e), "ready" == h.yc ? g.e(b, h) && g.n(b, h) : g.f();
            c = b.layerStates;
            for (var k in this.e)k in c || (g = this.e[k], Hf(g.target));
            this.c ||
            (Lg(this.a, !0), this.c = !0);
            zj(b);
            Cj(this, b);
            b.postRenderFunctions.push(Aj);
            In(this, "postcompose", b)
        }
    };
    function Jn(b) {
        this.a = b
    }

    function Kn(b) {
        this.a = b
    }

    v(Kn, Jn);
    Kn.prototype.O = function () {
        return 35632
    };
    function Ln(b) {
        this.a = b
    }

    v(Ln, Jn);
    Ln.prototype.O = function () {
        return 35633
    };
    function Mn() {
        this.a = "precision mediump float;varying vec2 a;varying float b;uniform mat4 k;uniform float l;uniform sampler2D m;void main(void){vec4 texColor=texture2D(m,a);float alpha=texColor.a*b*l;if(alpha==0.0){discard;}gl_FragColor.a=alpha;gl_FragColor.rgb=(k*vec4(texColor.rgb,1.)).rgb;}"
    }

    v(Mn, Kn);
    da(Mn);
    function Nn() {
        this.a = "varying vec2 a;varying float b;attribute vec2 c;attribute vec2 d;attribute vec2 e;attribute float f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;void main(void){mat4 offsetMatrix=i;if(g==1.0){offsetMatrix=i*j;}vec4 offsets=offsetMatrix*vec4(e,0.,0.);gl_Position=h*vec4(c,0.,1.)+offsets;a=d;b=f;}"
    }

    v(Nn, Ln);
    da(Nn);
    function On(b, c) {
        this.k = b.getUniformLocation(c, "k");
        this.n = b.getUniformLocation(c, "j");
        this.i = b.getUniformLocation(c, "i");
        this.e = b.getUniformLocation(c, "l");
        this.g = b.getUniformLocation(c, "h");
        this.a = b.getAttribLocation(c, "e");
        this.d = b.getAttribLocation(c, "f");
        this.c = b.getAttribLocation(c, "c");
        this.b = b.getAttribLocation(c, "g");
        this.f = b.getAttribLocation(c, "d")
    };
    function Pn() {
        this.a = "precision mediump float;varying vec2 a;varying float b;uniform float k;uniform sampler2D l;void main(void){vec4 texColor=texture2D(l,a);gl_FragColor.rgb=texColor.rgb;float alpha=texColor.a*b*k;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}"
    }

    v(Pn, Kn);
    da(Pn);
    function Qn() {
        this.a = "varying vec2 a;varying float b;attribute vec2 c;attribute vec2 d;attribute vec2 e;attribute float f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;void main(void){mat4 offsetMatrix=i;if(g==1.0){offsetMatrix=i*j;}vec4 offsets=offsetMatrix*vec4(e,0.,0.);gl_Position=h*vec4(c,0.,1.)+offsets;a=d;b=f;}"
    }

    v(Qn, Ln);
    da(Qn);
    function Rn(b, c) {
        this.n = b.getUniformLocation(c, "j");
        this.i = b.getUniformLocation(c, "i");
        this.e = b.getUniformLocation(c, "k");
        this.g = b.getUniformLocation(c, "h");
        this.a = b.getAttribLocation(c, "e");
        this.d = b.getAttribLocation(c, "f");
        this.c = b.getAttribLocation(c, "c");
        this.b = b.getAttribLocation(c, "g");
        this.f = b.getAttribLocation(c, "d")
    };
    function Sn(b) {
        this.a = m(b) ? b : [];
        this.d = m(void 0) ? void 0 : 35044
    };
    function Tn(b, c) {
        this.k = b;
        this.a = c;
        this.d = {};
        this.e = {};
        this.f = {};
        this.n = this.i = this.c = this.g = null;
        (this.b = Wa(va, "OES_element_index_uint")) && c.getExtension("OES_element_index_uint");
        w(this.k, "webglcontextlost", this.cl, !1, this);
        w(this.k, "webglcontextrestored", this.dl, !1, this)
    }

    function Un(b, c, d) {
        var e = b.a, f = d.a, g = ma(d);
        if (g in b.d)e.bindBuffer(c, b.d[g].buffer); else {
            var h = e.createBuffer();
            e.bindBuffer(c, h);
            var k;
            34962 == c ? k = new Float32Array(f) : 34963 == c && (k = b.b ? new Uint32Array(f) : new Uint16Array(f));
            e.bufferData(c, k, d.d);
            b.d[g] = {b: d, buffer: h}
        }
    }

    function Vn(b, c) {
        var d = b.a, e = ma(c), f = b.d[e];
        d.isContextLost() || d.deleteBuffer(f.buffer);
        delete b.d[e]
    }

    l = Tn.prototype;
    l.P = function () {
        var b = this.a;
        b.isContextLost() || (ob(this.d, function (c) {
            b.deleteBuffer(c.buffer)
        }), ob(this.f, function (c) {
            b.deleteProgram(c)
        }), ob(this.e, function (c) {
            b.deleteShader(c)
        }), b.deleteFramebuffer(this.c), b.deleteRenderbuffer(this.n), b.deleteTexture(this.i))
    };
    l.bl = function () {
        return this.a
    };
    l.se = function () {
        if (null === this.c) {
            var b = this.a, c = b.createFramebuffer();
            b.bindFramebuffer(b.FRAMEBUFFER, c);
            var d = Wn(b, 1, 1), e = b.createRenderbuffer();
            b.bindRenderbuffer(b.RENDERBUFFER, e);
            b.renderbufferStorage(b.RENDERBUFFER, b.DEPTH_COMPONENT16, 1, 1);
            b.framebufferTexture2D(b.FRAMEBUFFER, b.COLOR_ATTACHMENT0, b.TEXTURE_2D, d, 0);
            b.framebufferRenderbuffer(b.FRAMEBUFFER, b.DEPTH_ATTACHMENT, b.RENDERBUFFER, e);
            b.bindTexture(b.TEXTURE_2D, null);
            b.bindRenderbuffer(b.RENDERBUFFER, null);
            b.bindFramebuffer(b.FRAMEBUFFER,
                null);
            this.c = c;
            this.i = d;
            this.n = e
        }
        return this.c
    };
    function Xn(b, c) {
        var d = ma(c);
        if (d in b.e)return b.e[d];
        var e = b.a, f = e.createShader(c.O());
        e.shaderSource(f, c.a);
        e.compileShader(f);
        return b.e[d] = f
    }

    function Yn(b, c, d) {
        var e = ma(c) + "/" + ma(d);
        if (e in b.f)return b.f[e];
        var f = b.a, g = f.createProgram();
        f.attachShader(g, Xn(b, c));
        f.attachShader(g, Xn(b, d));
        f.linkProgram(g);
        return b.f[e] = g
    }

    l.cl = function () {
        xb(this.d);
        xb(this.e);
        xb(this.f);
        this.n = this.i = this.c = this.g = null
    };
    l.dl = function () {
    };
    l.Rd = function (b) {
        if (b == this.g)return !1;
        this.a.useProgram(b);
        this.g = b;
        return !0
    };
    function Zn(b, c, d) {
        var e = b.createTexture();
        b.bindTexture(b.TEXTURE_2D, e);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.LINEAR);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.LINEAR);
        m(c) && b.texParameteri(3553, 10242, c);
        m(d) && b.texParameteri(3553, 10243, d);
        return e
    }

    function Wn(b, c, d) {
        var e = Zn(b, void 0, void 0);
        b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, c, d, 0, b.RGBA, b.UNSIGNED_BYTE, null);
        return e
    }

    function $n(b, c) {
        var d = Zn(b, 33071, 33071);
        b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, b.RGBA, b.UNSIGNED_BYTE, c);
        return d
    };
    function ao(b, c) {
        this.r = this.p = void 0;
        this.Ea = new tg;
        this.i = le(c);
        this.o = [];
        this.e = [];
        this.N = void 0;
        this.f = [];
        this.c = [];
        this.U = this.S = void 0;
        this.d = [];
        this.H = this.D = this.n = null;
        this.ca = void 0;
        this.ka = Kd();
        this.va = Kd();
        this.oa = this.da = void 0;
        this.Fa = Kd();
        this.Da = this.fa = this.pa = void 0;
        this.ia = [];
        this.g = [];
        this.a = [];
        this.q = null;
        this.b = [];
        this.k = [];
        this.ea = void 0
    }

    function bo(b, c) {
        var d = b.q, e = b.n, f = b.ia, g = b.g, h = c.a;
        return function () {
            if (!h.isContextLost()) {
                var b, n;
                b = 0;
                for (n = f.length; b < n; ++b)h.deleteTexture(f[b]);
                b = 0;
                for (n = g.length; b < n; ++b)h.deleteTexture(g[b])
            }
            Vn(c, d);
            Vn(c, e)
        }
    }

    function co(b, c, d, e) {
        var f = b.p, g = b.r, h = b.N, k = b.S, n = b.U, p = b.ca, q = b.da, r = b.oa, s = b.pa ? 1 : 0, u = b.fa, z = b.Da, y = b.ea, A = Math.cos(u), u = Math.sin(u), D = b.d.length, x = b.a.length, M, Q, O, W, Ja, lb;
        for (M = 0; M < d; M += e)Ja = c[M] - b.i[0], lb = c[M + 1] - b.i[1], Q = x / 8, O = -z * f, W = -z * (h - g), b.a[x++] = Ja, b.a[x++] = lb, b.a[x++] = O * A - W * u, b.a[x++] = O * u + W * A, b.a[x++] = q / n, b.a[x++] = (r + h) / k, b.a[x++] = p, b.a[x++] = s, O = z * (y - f), W = -z * (h - g), b.a[x++] = Ja, b.a[x++] = lb, b.a[x++] = O * A - W * u, b.a[x++] = O * u + W * A, b.a[x++] = (q + y) / n, b.a[x++] = (r + h) / k, b.a[x++] = p, b.a[x++] = s, O = z * (y -
        f), W = z * g, b.a[x++] = Ja, b.a[x++] = lb, b.a[x++] = O * A - W * u, b.a[x++] = O * u + W * A, b.a[x++] = (q + y) / n, b.a[x++] = r / k, b.a[x++] = p, b.a[x++] = s, O = -z * f, W = z * g, b.a[x++] = Ja, b.a[x++] = lb, b.a[x++] = O * A - W * u, b.a[x++] = O * u + W * A, b.a[x++] = q / n, b.a[x++] = r / k, b.a[x++] = p, b.a[x++] = s, b.d[D++] = Q, b.d[D++] = Q + 1, b.d[D++] = Q + 2, b.d[D++] = Q, b.d[D++] = Q + 2, b.d[D++] = Q + 3
    }

    l = ao.prototype;
    l.tb = function (b, c) {
        this.b.push(this.d.length);
        this.k.push(c);
        var d = b.j;
        co(this, d, d.length, b.B)
    };
    l.ub = function (b, c) {
        this.b.push(this.d.length);
        this.k.push(c);
        var d = b.j;
        co(this, d, d.length, b.B)
    };
    l.Kb = function (b) {
        var c = b.a;
        this.o.push(this.d.length);
        this.e.push(this.d.length);
        this.q = new Sn(this.a);
        Un(b, 34962, this.q);
        this.n = new Sn(this.d);
        Un(b, 34963, this.n);
        b = {};
        eo(this.ia, this.f, b, c);
        eo(this.g, this.c, b, c);
        this.N = this.r = this.p = void 0;
        this.c = this.f = null;
        this.U = this.S = void 0;
        this.d = null;
        this.Da = this.fa = this.pa = this.oa = this.da = this.ca = void 0;
        this.a = null;
        this.ea = void 0
    };
    function eo(b, c, d, e) {
        var f, g, h, k = c.length;
        for (h = 0; h < k; ++h)f = c[h], g = ma(f).toString(), g in d ? f = d[g] : (f = $n(e, f), d[g] = f), b[h] = f
    }

    l.bc = function (b, c, d, e, f, g, h, k, n, p, q, r, s, u, z) {
        g = b.a;
        Un(b, 34962, this.q);
        Un(b, 34963, this.n);
        var y = k || 1 != n || p || 1 != q, A, D;
        y ? (A = Mn.Pa(), D = Nn.Pa()) : (A = Pn.Pa(), D = Qn.Pa());
        D = Yn(b, A, D);
        y ? null === this.D ? this.D = A = new On(g, D) : A = this.D : null === this.H ? this.H = A = new Rn(g, D) : A = this.H;
        b.Rd(D);
        g.enableVertexAttribArray(A.c);
        g.vertexAttribPointer(A.c, 2, 5126, !1, 32, 0);
        g.enableVertexAttribArray(A.a);
        g.vertexAttribPointer(A.a, 2, 5126, !1, 32, 8);
        g.enableVertexAttribArray(A.f);
        g.vertexAttribPointer(A.f, 2, 5126, !1, 32, 16);
        g.enableVertexAttribArray(A.d);
        g.vertexAttribPointer(A.d, 1, 5126, !1, 32, 24);
        g.enableVertexAttribArray(A.b);
        g.vertexAttribPointer(A.b, 1, 5126, !1, 32, 28);
        D = this.Fa;
        gj(D, 0, 0, 2 / (d * f[0]), 2 / (d * f[1]), -e, -(c[0] - this.i[0]), -(c[1] - this.i[1]));
        c = this.va;
        d = 2 / f[0];
        f = 2 / f[1];
        Md(c);
        c[0] = d;
        c[5] = f;
        c[10] = 1;
        c[15] = 1;
        f = this.ka;
        Md(f);
        0 !== e && Rd(f, -e);
        g.uniformMatrix4fv(A.g, !1, D);
        g.uniformMatrix4fv(A.i, !1, c);
        g.uniformMatrix4fv(A.n, !1, f);
        g.uniform1f(A.e, h);
        y && g.uniformMatrix4fv(A.k, !1, ug(this.Ea, k, n, p, q));
        var x;
        if (m(s)) {
            if (u)a:{
                e = b.b ? 5125 : 5123;
                b = b.b ? 4 : 2;
                p =
                    this.b.length - 1;
                for (h = this.g.length - 1; 0 <= h; --h)for (g.bindTexture(3553, this.g[h]), k = 0 < h ? this.e[h - 1] : 0, q = this.e[h]; 0 <= p && this.b[p] >= k;) {
                    n = this.b[p];
                    u = this.k[p];
                    x = ma(u).toString();
                    if (!m(r[x]) && (!m(z) || qe(z, u.R().J())) && (g.clear(g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT), g.drawElements(4, q - n, e, n * b), q = s(u))) {
                        r = q;
                        break a
                    }
                    q = n;
                    p--
                }
                r = void 0
            } else g.clear(g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT), fo(this, g, b, r, this.g, this.e), r = (r = s(null)) ? r : void 0;
            x = r
        } else fo(this, g, b, r, this.ia, this.o);
        g.disableVertexAttribArray(A.c);
        g.disableVertexAttribArray(A.a);
        g.disableVertexAttribArray(A.f);
        g.disableVertexAttribArray(A.d);
        g.disableVertexAttribArray(A.b);
        return x
    };
    function fo(b, c, d, e, f, g) {
        var h = d.b ? 5125 : 5123;
        d = d.b ? 4 : 2;
        if (wb(e)) {
            var k;
            b = 0;
            e = f.length;
            for (k = 0; b < e; ++b) {
                c.bindTexture(3553, f[b]);
                var n = g[b];
                c.drawElements(4, n - k, h, k * d);
                k = n
            }
        } else {
            k = 0;
            var p, n = 0;
            for (p = f.length; n < p; ++n) {
                c.bindTexture(3553, f[n]);
                for (var q = 0 < n ? g[n - 1] : 0, r = g[n], s = q; k < b.b.length && b.b[k] <= r;) {
                    var u = ma(b.k[k]).toString();
                    m(e[u]) ? (s !== q && c.drawElements(4, q - s, h, s * d), q = s = k === b.b.length - 1 ? r : b.b[k + 1]) : q = k === b.b.length - 1 ? r : b.b[k + 1];
                    k++
                }
                s !== q && c.drawElements(4, q - s, h, s * d)
            }
        }
    }

    l.ib = function (b) {
        var c = b.wb(), d = b.Bb(1), e = b.kd(), f = b.Kd(1), g = b.o, h = b.Cb(), k = b.p, n = b.i, p = b.gb();
        b = b.k;
        var q;
        0 === this.f.length ? this.f.push(d) : (q = this.f[this.f.length - 1], ma(q) != ma(d) && (this.o.push(this.d.length), this.f.push(d)));
        0 === this.c.length ? this.c.push(f) : (q = this.c[this.c.length - 1], ma(q) != ma(f) && (this.e.push(this.d.length), this.c.push(f)));
        this.p = c[0];
        this.r = c[1];
        this.N = p[1];
        this.S = e[1];
        this.U = e[0];
        this.ca = g;
        this.da = h[0];
        this.oa = h[1];
        this.fa = n;
        this.pa = k;
        this.Da = b;
        this.ea = p[0]
    };
    function go(b, c, d) {
        this.f = c;
        this.e = b;
        this.c = d;
        this.d = {}
    }

    function ho(b, c) {
        var d = [], e;
        for (e in b.d)d.push(bo(b.d[e], c));
        return gd.apply(null, d)
    }

    function io(b, c) {
        for (var d in b.d)b.d[d].Kb(c)
    }

    go.prototype.a = function (b, c) {
        var d = this.d[c];
        m(d) || (d = new jo[c](this.e, this.f), this.d[c] = d);
        return d
    };
    go.prototype.la = function () {
        return wb(this.d)
    };
    function ko(b, c, d, e, f, g, h, k, n, p, q, r, s, u, z) {
        var y = lo, A, D;
        for (A = fm.length - 1; 0 <= A; --A)if (D = b.d[fm[A]], m(D) && (D = D.bc(c, d, e, f, y, g, h, k, n, p, q, r, s, u, z)))return D
    }

    go.prototype.b = function (b, c, d, e, f, g, h, k, n, p, q, r, s, u) {
        var z = c.a;
        z.bindFramebuffer(z.FRAMEBUFFER, c.se());
        var y;
        m(this.c) && (y = Xd(ce(b), e * this.c));
        return ko(this, c, b, e, f, h, k, n, p, q, r, s, function (b) {
            var c = new Uint8Array(4);
            z.readPixels(0, 0, 1, 1, z.RGBA, z.UNSIGNED_BYTE, c);
            if (0 < c[3] && (b = u(b)))return b
        }, !0, y)
    };
    function mo(b, c, d, e, f, g, h, k, n, p, q, r) {
        var s = d.a;
        s.bindFramebuffer(s.FRAMEBUFFER, d.se());
        b = ko(b, d, c, e, f, g, h, k, n, p, q, r, function () {
            var b = new Uint8Array(4);
            s.readPixels(0, 0, 1, 1, s.RGBA, s.UNSIGNED_BYTE, b);
            return 0 < b[3]
        }, !1);
        return m(b)
    }

    var jo = {Image: ao}, lo = [1, 1];

    function no(b, c, d, e, f, g, h) {
        this.b = b;
        this.f = c;
        this.a = g;
        this.e = h;
        this.i = f;
        this.n = e;
        this.g = d;
        this.c = null;
        this.d = {}
    }

    l = no.prototype;
    l.kc = function (b, c) {
        var d = b.toString(), e = this.d[d];
        m(e) ? e.push(c) : this.d[d] = [c]
    };
    l.lc = function () {
    };
    l.oe = function (b, c) {
        var d = (0, c.c)(b);
        if (null != d && qe(this.a, d.J())) {
            var e = c.a;
            m(e) || (e = 0);
            this.kc(e, function (b) {
                b.Ba(c.f, c.b);
                b.ib(c.e);
                b.Ca(c.d);
                var e = oo[d.O()];
                e && e.call(b, d, null)
            })
        }
    };
    l.fd = function (b, c) {
        var d = b.c, e, f;
        e = 0;
        for (f = d.length; e < f; ++e) {
            var g = d[e], h = oo[g.O()];
            h && h.call(this, g, c)
        }
    };
    l.ub = function (b, c) {
        var d = this.b, e = (new go(1, this.a)).a(0, "Image");
        e.ib(this.c);
        e.ub(b, c);
        e.Kb(d);
        e.bc(this.b, this.f, this.g, this.n, this.i, this.a, this.e, 1, 0, 1, 0, 1, {});
        bo(e, d)()
    };
    l.Eb = function () {
    };
    l.mc = function () {
    };
    l.tb = function (b, c) {
        var d = this.b, e = (new go(1, this.a)).a(0, "Image");
        e.ib(this.c);
        e.tb(b, c);
        e.Kb(d);
        e.bc(this.b, this.f, this.g, this.n, this.i, this.a, this.e, 1, 0, 1, 0, 1, {});
        bo(e, d)()
    };
    l.nc = function () {
    };
    l.Rb = function () {
    };
    l.vb = function () {
    };
    l.Ba = function () {
    };
    l.ib = function (b) {
        this.c = b
    };
    l.Ca = function () {
    };
    var oo = {Point: no.prototype.ub, MultiPoint: no.prototype.tb, GeometryCollection: no.prototype.fd};

    function po() {
        this.a = "precision mediump float;varying vec2 a;uniform mat4 f;uniform float g;uniform sampler2D h;void main(void){vec4 texColor=texture2D(h,a);gl_FragColor.rgb=(f*vec4(texColor.rgb,1.)).rgb;gl_FragColor.a=texColor.a*g;}"
    }

    v(po, Kn);
    da(po);
    function qo() {
        this.a = "varying vec2 a;attribute vec2 b;attribute vec2 c;uniform mat4 d;uniform mat4 e;void main(void){gl_Position=e*vec4(b,0.,1.);a=(d*vec4(c,0.,1.)).st;}"
    }

    v(qo, Ln);
    da(qo);
    function ro(b, c) {
        this.g = b.getUniformLocation(c, "f");
        this.b = b.getUniformLocation(c, "g");
        this.c = b.getUniformLocation(c, "e");
        this.e = b.getUniformLocation(c, "d");
        this.f = b.getUniformLocation(c, "h");
        this.a = b.getAttribLocation(c, "b");
        this.d = b.getAttribLocation(c, "c")
    };
    function so() {
        this.a = "precision mediump float;varying vec2 a;uniform float f;uniform sampler2D g;void main(void){vec4 texColor=texture2D(g,a);gl_FragColor.rgb=texColor.rgb;gl_FragColor.a=texColor.a*f;}"
    }

    v(so, Kn);
    da(so);
    function to() {
        this.a = "varying vec2 a;attribute vec2 b;attribute vec2 c;uniform mat4 d;uniform mat4 e;void main(void){gl_Position=e*vec4(b,0.,1.);a=(d*vec4(c,0.,1.)).st;}"
    }

    v(to, Ln);
    da(to);
    function uo(b, c) {
        this.b = b.getUniformLocation(c, "f");
        this.c = b.getUniformLocation(c, "e");
        this.e = b.getUniformLocation(c, "d");
        this.f = b.getUniformLocation(c, "g");
        this.a = b.getAttribLocation(c, "b");
        this.d = b.getAttribLocation(c, "c")
    };
    function vo(b, c) {
        jj.call(this, c);
        this.b = b;
        this.N = new Sn([-1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1, 1, 1, 1, 1]);
        this.f = this.Wa = null;
        this.e = void 0;
        this.i = Id();
        this.o = Kd();
        this.S = new tg;
        this.q = this.k = null
    }

    v(vo, jj);
    function wo(b, c, d) {
        var e = b.b.f;
        if (m(b.e) && b.e == d)e.bindFramebuffer(36160, b.f); else {
            c.postRenderFunctions.push(sa(function (b, c, d) {
                b.isContextLost() || (b.deleteFramebuffer(c), b.deleteTexture(d))
            }, e, b.f, b.Wa));
            c = Wn(e, d, d);
            var f = e.createFramebuffer();
            e.bindFramebuffer(36160, f);
            e.framebufferTexture2D(36160, 36064, 3553, c, 0);
            b.Wa = c;
            b.f = f;
            b.e = d
        }
    }

    vo.prototype.Nf = function (b, c, d) {
        xo(this, "precompose", d, b);
        Un(d, 34962, this.N);
        var e = d.a, f = c.brightness || 1 != c.contrast || c.hue || 1 != c.saturation, g, h;
        f ? (g = po.Pa(), h = qo.Pa()) : (g = so.Pa(), h = to.Pa());
        g = Yn(d, g, h);
        f ? null === this.k ? this.k = h = new ro(e, g) : h = this.k : null === this.q ? this.q = h = new uo(e, g) : h = this.q;
        d.Rd(g) && (e.enableVertexAttribArray(h.a), e.vertexAttribPointer(h.a, 2, 5126, !1, 16, 0), e.enableVertexAttribArray(h.d), e.vertexAttribPointer(h.d, 2, 5126, !1, 16, 8), e.uniform1i(h.f, 0));
        e.uniformMatrix4fv(h.e, !1, this.i);
        e.uniformMatrix4fv(h.c, !1, this.o);
        f && e.uniformMatrix4fv(h.g, !1, ug(this.S, c.brightness, c.contrast, c.hue, c.saturation));
        e.uniform1f(h.b, c.opacity);
        e.bindTexture(3553, this.Wa);
        e.drawArrays(5, 0, 4);
        xo(this, "postcompose", d, b)
    };
    function xo(b, c, d, e) {
        b = b.a;
        if (kd(b, c)) {
            var f = e.viewState;
            b.dispatchEvent(new Yk(c, b, new no(d, f.center, f.resolution, f.rotation, e.size, e.extent, e.pixelRatio), null, e, null, d))
        }
    }

    vo.prototype.Be = function () {
        this.f = this.Wa = null;
        this.e = void 0
    };
    function yo(b, c) {
        vo.call(this, b, c);
        this.n = this.g = this.c = null
    }

    v(yo, vo);
    function zo(b, c) {
        var d = c.a();
        return $n(b.b.f, d)
    }

    yo.prototype.Ua = function (b, c, d, e) {
        var f = this.a;
        return f.a().Jd(b, c.viewState.resolution, c.viewState.rotation, c.skippedFeatureUids, function (b) {
            return d.call(e, b, f)
        })
    };
    yo.prototype.Ce = function (b, c) {
        var d = this.b.f, e = b.viewState, f = e.center, g = e.resolution, h = e.rotation, k = this.c, n = this.Wa, p = this.a.a(), q = b.viewHints, r = b.extent;
        m(c.extent) && (r = pe(r, c.extent));
        q[0] || q[1] || se(r) || (e = e.projection, q = p.g, null === q || (e = q), r = p.sc(r, g, b.pixelRatio, e), null !== r && lj(this, r) && (k = r, n = zo(this, r), null === this.Wa || b.postRenderFunctions.push(sa(function (b, c) {
            b.isContextLost() || b.deleteTexture(c)
        }, d, this.Wa))));
        null !== k && (d = this.b.c.k, Ao(this, d.width, d.height, f, g, h, k.J()), this.n = null, f = this.i,
            Md(f), Qd(f, 1, -1), Pd(f, 0, -1), this.c = k, this.Wa = n, oj(b.attributions, k.e), pj(b, p));
        return !0
    };
    function Ao(b, c, d, e, f, g, h) {
        c *= f;
        d *= f;
        b = b.o;
        Md(b);
        Qd(b, 2 / c, 2 / d);
        Rd(b, -g);
        Pd(b, h[0] - e[0], h[1] - e[1]);
        Qd(b, (h[2] - h[0]) / 2, (h[3] - h[1]) / 2);
        Pd(b, 1, 1)
    }

    yo.prototype.Hd = function (b, c) {
        var d = this.Ua(b, c, cd, this);
        return m(d)
    };
    yo.prototype.cc = function (b, c, d, e) {
        if (null !== this.c && !fa(this.c.a()))if (this.a.a()instanceof un) {
            if (b = b.slice(), ij(c.pixelToCoordinateMatrix, b, b), this.Ua(b, c, cd, this))return d.call(e, this.a)
        } else {
            var f = [this.c.a().width, this.c.a().height];
            if (null === this.n) {
                var g = c.size;
                c = Id();
                Md(c);
                Pd(c, -1, -1);
                Qd(c, 2 / g[0], 2 / g[1]);
                Pd(c, 0, g[1]);
                Qd(c, 1, -1);
                g = Id();
                Od(this.o, g);
                var h = Id();
                Md(h);
                Pd(h, 0, f[1]);
                Qd(h, 1, -1);
                Qd(h, f[0] / 2, f[1] / 2);
                Pd(h, 1, 1);
                var k = Id();
                Nd(h, g, k);
                Nd(k, c, k);
                this.n = k
            }
            c = [0, 0];
            ij(this.n, b, c);
            if (!(0 > c[0] ||
                c[0] > f[0] || 0 > c[1] || c[1] > f[1]) && (null === this.g && (this.g = Mf(1, 1)), this.g.clearRect(0, 0, 1, 1), this.g.drawImage(this.c.a(), c[0], c[1], 1, 1, 0, 0, 1, 1), 0 < this.g.getImageData(0, 0, 1, 1).data[3]))return d.call(e, this.a)
        }
    };
    function Bo() {
        this.a = "precision mediump float;varying vec2 a;uniform sampler2D e;void main(void){gl_FragColor=texture2D(e,a);}"
    }

    v(Bo, Kn);
    da(Bo);
    function Co() {
        this.a = "varying vec2 a;attribute vec2 b;attribute vec2 c;uniform vec4 d;void main(void){gl_Position=vec4(b*d.xy+d.zw,0.,1.);a=c;}"
    }

    v(Co, Ln);
    da(Co);
    function Do(b, c) {
        this.b = b.getUniformLocation(c, "e");
        this.c = b.getUniformLocation(c, "d");
        this.a = b.getAttribLocation(c, "b");
        this.d = b.getAttribLocation(c, "c")
    };
    function Eo(b, c) {
        vo.call(this, b, c);
        this.D = Bo.Pa();
        this.H = Co.Pa();
        this.c = null;
        this.r = new Sn([0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0]);
        this.p = this.g = null;
        this.n = -1
    }

    v(Eo, vo);
    l = Eo.prototype;
    l.P = function () {
        Vn(this.b.c, this.r);
        Eo.T.P.call(this)
    };
    l.ed = function (b, c) {
        var d = this.b;
        return function (e, f) {
            return dj(b, e, f, function (b) {
                var f = Ri(d.d, b.qb());
                f && (c[e] || (c[e] = {}), c[e][b.a.toString()] = b);
                return f
            })
        }
    };
    l.Be = function () {
        Eo.T.Be.call(this);
        this.c = null
    };
    l.Ce = function (b, c, d) {
        var e = this.b, f = d.a, g = b.viewState, h = g.projection, k = this.a, n = k.a(), p = ej(n, h), q = bc(p.a, g.resolution, 0), r = p.na(q), s = n.Xb(q, b.pixelRatio, h), u = s / p.ua(q), z = r / u, y = n.jd(), A = g.center, D;
        r == g.resolution ? (A = rj(A, r, b.size), D = ne(A, r, g.rotation, b.size)) : D = b.extent;
        r = Yi(p, D, r);
        if (null !== this.g && of(this.g, r) && this.n == n.d)z = this.p; else {
            var x = [r.c - r.a + 1, r.d - r.b + 1], x = Math.max(x[0] * s, x[1] * s), M = Math.pow(2, Math.ceil(Math.log(x) / Math.LN2)), x = z * M, Q = p.Lb(q), O = Q[0] + r.a * s * z, z = Q[1] + r.b * s * z, z = [O, z, O + x, z + x];
            wo(this, b, M);
            f.viewport(0, 0, M, M);
            f.clearColor(0, 0, 0, 0);
            f.clear(16384);
            f.disable(3042);
            M = Yn(d, this.D, this.H);
            d.Rd(M);
            null === this.c && (this.c = new Do(f, M));
            Un(d, 34962, this.r);
            f.enableVertexAttribArray(this.c.a);
            f.vertexAttribPointer(this.c.a, 2, 5126, !1, 16, 0);
            f.enableVertexAttribArray(this.c.d);
            f.vertexAttribPointer(this.c.d, 2, 5126, !1, 16, 8);
            f.uniform1i(this.c.b, 0);
            d = {};
            d[q] = {};
            var W = this.ed(n, d), Ja = k.ea(), M = !0, O = Td(), lb = new lf(0, 0, 0, 0), Ka, mb, Qb;
            for (mb = r.a; mb <= r.c; ++mb)for (Qb = r.b; Qb <= r.d; ++Qb) {
                Q = n.Vb(q,
                    mb, Qb, u, h);
                if (m(c.extent) && (Ka = Wi(p, Q.a, O), !qe(Ka, c.extent)))continue;
                Ka = Q.state;
                if (2 == Ka) {
                    if (Ri(e.d, Q.qb())) {
                        d[q][kf(Q.a)] = Q;
                        continue
                    }
                } else if (4 == Ka || 3 == Ka && !Ja)continue;
                M = !1;
                Ka = p.gd(Q.a, W, null, lb, O);
                Ka || (Q = p.td(Q.a, lb, O), null === Q || W(q + 1, Q))
            }
            c = Sa(sb(d), Number);
            db(c);
            for (var W = new Float32Array(4), Za, Ub, nb, Ja = 0, lb = c.length; Ja < lb; ++Ja)for (Za in Ub = d[c[Ja]], Ub)Q = Ub[Za], Ka = Wi(p, Q.a, O), mb = 2 * (Ka[2] - Ka[0]) / x, Qb = 2 * (Ka[3] - Ka[1]) / x, nb = 2 * (Ka[0] - z[0]) / x - 1, Ka = 2 * (Ka[1] - z[1]) / x - 1, Hd(W, mb, Qb, nb, Ka), f.uniform4fv(this.c.c,
                W), Fo(e, Q, s, y * u), f.drawArrays(5, 0, 4);
            M ? (this.g = r, this.p = z, this.n = n.d) : (this.p = this.g = null, this.n = -1, b.animate = !0)
        }
        qj(b.usedTiles, n, q, r);
        var Mc = e.i;
        sj(b, n, p, u, h, D, q, k.r(), function (b) {
            var c;
            (c = 2 != b.state || Ri(e.d, b.qb())) || (c = b.qb()in Mc.b);
            c || tj(Mc, [b, $i(p, b.a), p.na(b.a[0]), s, y * u])
        }, this);
        nj(b, n);
        pj(b, n);
        f = this.i;
        Md(f);
        Pd(f, (A[0] - z[0]) / (z[2] - z[0]), (A[1] - z[1]) / (z[3] - z[1]));
        0 !== g.rotation && Rd(f, g.rotation);
        Qd(f, b.size[0] * g.resolution / (z[2] - z[0]), b.size[1] * g.resolution / (z[3] - z[1]));
        Pd(f, -.5, -.5);
        return !0
    };
    l.cc = function (b, c, d, e) {
        if (null !== this.f) {
            var f = [0, 0];
            ij(this.i, [b[0] / c.size[0], (c.size[1] - b[1]) / c.size[1]], f);
            b = [f[0] * this.e, f[1] * this.e];
            c = this.b.c.a;
            c.bindFramebuffer(c.FRAMEBUFFER, this.f);
            f = new Uint8Array(4);
            c.readPixels(b[0], b[1], 1, 1, c.RGBA, c.UNSIGNED_BYTE, f);
            if (0 < f[3])return d.call(e, this.a)
        }
    };
    function Go(b, c) {
        vo.call(this, b, c);
        this.n = !1;
        this.H = -1;
        this.D = NaN;
        this.p = Td();
        this.g = this.c = this.r = null
    }

    v(Go, vo);
    l = Go.prototype;
    l.Nf = function (b, c, d) {
        this.g = c;
        var e = b.viewState, f = this.c;
        if (null !== f && !f.la()) {
            var g = e.center, h = e.resolution, e = e.rotation, k = b.size, n = b.pixelRatio, p = c.opacity, q = c.brightness, r = c.contrast, s = c.hue;
            c = c.saturation;
            b = b.skippedFeatureUids;
            var u, z, y;
            u = 0;
            for (z = fm.length; u < z; ++u)y = f.d[fm[u]], m(y) && y.bc(d, g, h, e, k, n, p, q, r, s, c, b, void 0, !1)
        }
    };
    l.P = function () {
        var b = this.c;
        null !== b && (ho(b, this.b.c)(), this.c = null);
        Go.T.P.call(this)
    };
    l.Ua = function (b, c, d, e) {
        if (null !== this.c && null !== this.g) {
            var f = c.viewState, g = this.a, h = this.g, k = {};
            return this.c.b(b, this.b.c, f.center, f.resolution, f.rotation, c.size, c.pixelRatio, h.opacity, h.brightness, h.contrast, h.hue, h.saturation, c.skippedFeatureUids, function (b) {
                var c = ma(b).toString();
                if (!(c in k))return k[c] = !0, d.call(e, b, g)
            })
        }
    };
    l.Hd = function (b, c) {
        if (null === this.c || null === this.g)return !1;
        var d = c.viewState, e = this.g;
        return mo(this.c, b, this.b.c, d.resolution, d.rotation, c.pixelRatio, e.opacity, e.brightness, e.contrast, e.hue, e.saturation, c.skippedFeatureUids)
    };
    l.cc = function (b, c, d, e) {
        b = b.slice();
        ij(c.pixelToCoordinateMatrix, b, b);
        if (this.Hd(b, c))return d.call(e, this.a)
    };
    l.Xj = function () {
        kj(this)
    };
    l.Ce = function (b, c, d) {
        function e(b) {
            var c;
            m(b.a) ? c = b.a.call(b, n) : m(f.r) && (c = (0, f.r)(b, n));
            if (null != c) {
                if (null != c) {
                    var d, e, g = !1;
                    d = 0;
                    for (e = c.length; d < e; ++d)g = Xm(s, b, c[d], Wm(n, p), this.Xj, this) || g;
                    b = g
                } else b = !1;
                this.n = this.n || b
            }
        }

        var f = this.a;
        c = f.a();
        oj(b.attributions, c.f);
        pj(b, c);
        if (!this.n && (!f.Ac && b.viewHints[0] || b.viewHints[1]))return !0;
        var g = b.extent, h = b.viewState, k = h.projection, n = h.resolution, p = b.pixelRatio, h = f.d, q = f.ea, r = f.get("renderOrder");
        m(r) || (r = Vm);
        g = Xd(g, q * n);
        if (!this.n && this.D == n && this.H ==
            h && this.r == r && $d(this.p, g))return !0;
        null === this.c || b.postRenderFunctions.push(ho(this.c, d));
        this.n = !1;
        var s = new go(.5 * n / p, g, f.ea);
        c.Hb(g, n, k);
        if (null === r)c.Fb(g, n, e, this); else {
            var u = [];
            c.Fb(g, n, function (b) {
                u.push(b)
            }, this);
            db(u, r);
            Qa(u, e, this)
        }
        io(s, d);
        this.D = n;
        this.H = h;
        this.r = r;
        this.p = g;
        this.c = s;
        return !0
    };
    function Ho(b, c) {
        yj.call(this, 0, c);
        this.a = Df("CANVAS");
        this.a.style.width = "100%";
        this.a.style.height = "100%";
        this.a.className = "ol-unselectable";
        Gf(b, this.a, 0);
        this.p = 0;
        this.r = Mf();
        this.k = !0;
        this.f = Tf(this.a, {antialias: !0, depth: !1, vh: !0, preserveDrawingBuffer: !1, stencil: !0});
        this.c = new Tn(this.a, this.f);
        w(this.a, "webglcontextlost", this.Vj, !1, this);
        w(this.a, "webglcontextrestored", this.Wj, !1, this);
        this.d = new Qi;
        this.o = null;
        this.i = new Dj(ra(function (b) {
            var c = b[1];
            b = b[2];
            var f = c[0] - this.o[0], c = c[1] - this.o[1];
            return 65536 * Math.log(b) + Math.sqrt(f * f + c * c) / b
        }, this), function (b) {
            return b[0].qb()
        });
        this.D = ra(function () {
            if (!this.i.la()) {
                Hj(this.i);
                var b = Ej(this.i);
                Fo(this, b[0], b[3], b[4])
            }
        }, this);
        this.n = 0;
        Io(this)
    }

    v(Ho, yj);
    function Fo(b, c, d, e) {
        var f = b.f, g = c.qb();
        if (Ri(b.d, g))b = b.d.get(g), f.bindTexture(3553, b.Wa), 9729 != b.Af && (f.texParameteri(3553, 10240, 9729), b.Af = 9729), 9729 != b.Bf && (f.texParameteri(3553, 10240, 9729), b.Bf = 9729); else {
            var h = f.createTexture();
            f.bindTexture(3553, h);
            if (0 < e) {
                var k = b.r.canvas, n = b.r;
                b.p != d ? (k.width = d, k.height = d, b.p = d) : n.clearRect(0, 0, d, d);
                n.drawImage(c.Ta(), e, e, d, d, 0, 0, d, d);
                f.texImage2D(3553, 0, 6408, 6408, 5121, k)
            } else f.texImage2D(3553, 0, 6408, 6408, 5121, c.Ta());
            f.texParameteri(3553, 10240, 9729);
            f.texParameteri(3553,
                10241, 9729);
            f.texParameteri(3553, 10242, 33071);
            f.texParameteri(3553, 10243, 33071);
            b.d.set(g, {Wa: h, Af: 9729, Bf: 9729})
        }
    }

    l = Ho.prototype;
    l.ne = function (b) {
        return b instanceof H ? new yo(this, b) : b instanceof I ? new Eo(this, b) : b instanceof J ? new Go(this, b) : null
    };
    function Jo(b, c, d) {
        var e = b.g;
        if (kd(e, c)) {
            var f = b.c, g = d.extent, h = d.size, k = d.viewState, n = d.pixelRatio, p = k.resolution, q = k.center, r = k.rotation, k = new no(f, q, p, r, h, g, n), g = new go(.5 * p / n, g);
            e.dispatchEvent(new Yk(c, e, k, g, d, null, f));
            io(g, f);
            if (!g.la()) {
                var s = Ko;
                c = s.opacity;
                d = s.brightness;
                var e = s.contrast, u = s.hue, s = s.saturation, z = {}, y, A, D;
                y = 0;
                for (A = fm.length; y < A; ++y)D = g.d[fm[y]], m(D) && D.bc(f, q, p, r, h, n, c, d, e, u, s, z, void 0, !1)
            }
            ho(g, f)();
            f = Sa(sb(k.d), Number);
            db(f);
            h = 0;
            for (n = f.length; h < n; ++h)for (p = k.d[f[h].toString()],
                                                   q = 0, r = p.length; q < r; ++q)p[q](k);
            b.b = g
        }
    }

    l.P = function () {
        var b = this.f;
        b.isContextLost() || this.d.forEach(function (c) {
            null === c || b.deleteTexture(c.Wa)
        });
        qc(this.c);
        Ho.T.P.call(this)
    };
    l.sh = function (b, c) {
        for (var d = this.f, e; 1024 < this.d.Tb() - this.n;) {
            e = this.d.a.hc;
            if (null === e)if (+this.d.a.Cd == c.index)break; else--this.n; else d.deleteTexture(e.Wa);
            this.d.pop()
        }
    };
    l.O = function () {
        return "webgl"
    };
    l.Vj = function (b) {
        b.preventDefault();
        this.d.clear();
        this.n = 0;
        ob(this.e, function (b) {
            b.Be()
        })
    };
    l.Wj = function () {
        Io(this);
        this.g.render()
    };
    function Io(b) {
        b = b.f;
        b.activeTexture(33984);
        b.blendFuncSeparate(770, 771, 1, 771);
        b.disable(2884);
        b.disable(2929);
        b.disable(3089);
        b.disable(2960)
    }

    l.Yd = function (b) {
        var c = this.c, d = this.f;
        if (d.isContextLost())return !1;
        if (null === b)return this.k && (Lg(this.a, !1), this.k = !1), !1;
        this.o = b.focus;
        this.d.set((-b.index).toString(), null);
        ++this.n;
        var e = [], f = b.layerStatesArray, g = b.viewState.resolution, h, k, n, p;
        h = 0;
        for (k = f.length; h < k; ++h)p = f[h], Mi(p, g) && "ready" == p.yc && (n = Bj(this, p.layer), n.Ce(b, p, c) && e.push(p));
        f = b.size[0] * b.pixelRatio;
        g = b.size[1] * b.pixelRatio;
        if (this.a.width != f || this.a.height != g)this.a.width = f, this.a.height = g;
        d.bindFramebuffer(36160, null);
        d.clearColor(0, 0, 0, 0);
        d.clear(16384);
        d.enable(3042);
        d.viewport(0, 0, this.a.width, this.a.height);
        Jo(this, "precompose", b);
        h = 0;
        for (k = e.length; h < k; ++h)p = e[h], n = Bj(this, p.layer), n.Nf(b, p, c);
        this.k || (Lg(this.a, !0), this.k = !0);
        zj(b);
        1024 < this.d.Tb() - this.n && b.postRenderFunctions.push(ra(this.sh, this));
        this.i.la() || (b.postRenderFunctions.push(this.D), b.animate = !0);
        Jo(this, "postcompose", b);
        Cj(this, b);
        b.postRenderFunctions.push(Aj)
    };
    l.ze = function (b, c, d, e, f, g) {
        var h;
        if (this.f.isContextLost())return !1;
        var k = this.c, n = c.viewState;
        if (null !== this.b) {
            var p = {}, q = Ko;
            if (h = this.b.b(b, k, n.center, n.resolution, n.rotation, c.size, c.pixelRatio, q.opacity, q.brightness, q.contrast, q.hue, q.saturation, {}, function (b) {
                    var c = ma(b).toString();
                    if (!(c in p))return p[c] = !0, d.call(e, b, null)
                }))return h
        }
        k = c.layerStatesArray;
        for (q = k.length - 1; 0 <= q; --q) {
            h = k[q];
            var r = h.layer;
            if (Mi(h, n.resolution) && f.call(g, r) && (h = Bj(this, r).Ua(b, c, d, e)))return h
        }
    };
    l.Mf = function (b, c, d, e) {
        var f = !1;
        if (this.f.isContextLost())return !1;
        var g = this.c, h = c.viewState;
        if (null !== this.b && (f = Ko, f = mo(this.b, b, g, h.resolution, h.rotation, c.pixelRatio, f.opacity, f.brightness, f.contrast, f.hue, f.saturation, {})))return !0;
        var g = c.layerStatesArray, k;
        for (k = g.length - 1; 0 <= k; --k) {
            var n = g[k], p = n.layer;
            if (Mi(n, h.resolution) && d.call(e, p) && (f = Bj(this, p).Hd(b, c)))return !0
        }
        return f
    };
    l.Lf = function (b, c, d, e, f) {
        if (this.f.isContextLost())return !1;
        var g = this.c, h = c.viewState, k;
        if (null !== this.b) {
            var n = Ko;
            k = this.g.ra(b);
            if (mo(this.b, k, g, h.resolution, h.rotation, c.pixelRatio, n.opacity, n.brightness, n.contrast, n.hue, n.saturation, {}) && (k = d.call(e, null)))return k
        }
        g = c.layerStatesArray;
        for (n = g.length - 1; 0 <= n; --n) {
            k = g[n];
            var p = k.layer;
            if (Mi(k, h.resolution) && f.call(e, p) && (k = Bj(this, p).cc(b, c, d, e)))return k
        }
    };
    var Ko = {opacity: 1, brightness: 0, contrast: 1, hue: 0, saturation: 1};
    var Lo = ["canvas", "webgl", "dom"];

    function L(b) {
        rd.call(this);
        var c = Mo(b);
        this.xc = m(b.loadTilesWhileAnimating) ? b.loadTilesWhileAnimating : !1;
        this.yc = m(b.loadTilesWhileInteracting) ? b.loadTilesWhileInteracting : !1;
        this.Ac = m(b.pixelRatio) ? b.pixelRatio : Vf;
        this.zc = c.logos;
        this.r = new ih(this.Rl, void 0, this);
        pc(this, this.r);
        this.vc = Id();
        this.ad = Id();
        this.wc = 0;
        this.c = null;
        this.Ea = Td();
        this.o = this.U = null;
        this.b = Af("DIV", "ol-viewport");
        this.b.style.position = "relative";
        this.b.style.overflow = "hidden";
        this.b.style.width = "100%";
        this.b.style.height =
            "100%";
        this.b.style.msTouchAction = "none";
        ag && (this.b.className = "ol-touch");
        this.ka = Af("DIV", "ol-overlaycontainer");
        this.b.appendChild(this.ka);
        this.H = Af("DIV", "ol-overlaycontainer-stopevent");
        w(this.H, ["click", "dblclick", "mousedown", "touchstart", "MSPointerDown", Fi, Hb ? "DOMMouseScroll" : "mousewheel"], tc);
        this.b.appendChild(this.H);
        b = new xi(this);
        w(b, rb(Ii), this.uf, !1, this);
        pc(this, b);
        this.fa = c.keyboardEventTarget;
        this.D = new Ch;
        w(this.D, "key", this.sf, !1, this);
        pc(this, this.D);
        b = new Kh(this.b);
        w(b, "mousewheel",
            this.sf, !1, this);
        pc(this, b);
        this.i = c.controls;
        this.g = c.interactions;
        this.k = c.overlays;
        this.p = new c.Tl(this.b, this);
        pc(this, this.p);
        this.jc = new xh;
        pc(this, this.jc);
        w(this.jc, "resize", this.q, !1, this);
        this.ca = null;
        this.N = [];
        this.va = [];
        this.kb = new Ij(ra(this.fi, this), ra(this.Aj, this));
        this.da = {};
        w(this, vd("layergroup"), this.yi, !1, this);
        w(this, vd("view"), this.Bj, !1, this);
        w(this, vd("size"), this.Oi, !1, this);
        w(this, vd("target"), this.Pi, !1, this);
        this.C(c.qm);
        this.i.forEach(function (b) {
            b.setMap(this)
        }, this);
        w(this.i, "add", function (b) {
            b.element.setMap(this)
        }, !1, this);
        w(this.i, "remove", function (b) {
            b.element.setMap(null)
        }, !1, this);
        this.g.forEach(function (b) {
            b.setMap(this)
        }, this);
        w(this.g, "add", function (b) {
            b.element.setMap(this)
        }, !1, this);
        w(this.g, "remove", function (b) {
            b.element.setMap(null)
        }, !1, this);
        this.k.forEach(function (b) {
            b.setMap(this)
        }, this);
        w(this.k, "add", function (b) {
            b.element.setMap(this)
        }, !1, this);
        w(this.k, "remove", function (b) {
            b.element.setMap(null)
        }, !1, this)
    }

    v(L, rd);
    l = L.prototype;
    l.gh = function (b) {
        this.i.push(b)
    };
    l.hh = function (b) {
        this.g.push(b)
    };
    l.bf = function (b) {
        this.Ub().ac().push(b)
    };
    l.cf = function (b) {
        this.k.push(b)
    };
    l.La = function (b) {
        this.render();
        Array.prototype.push.apply(this.N, arguments)
    };
    l.P = function () {
        Hf(this.b);
        L.T.P.call(this)
    };
    l.qe = function (b, c, d, e, f) {
        if (null !== this.c)return b = this.ra(b), this.p.ze(b, this.c, c, m(d) ? d : null, m(e) ? e : cd, m(f) ? f : null)
    };
    l.zj = function (b, c, d, e, f) {
        if (null !== this.c)return this.p.Lf(b, this.c, c, m(d) ? d : null, m(e) ? e : cd, m(f) ? f : null)
    };
    l.Ri = function (b, c, d) {
        if (null === this.c)return !1;
        b = this.ra(b);
        return this.p.Mf(b, this.c, m(c) ? c : cd, m(d) ? d : null)
    };
    l.Eh = function (b) {
        return this.ra(this.hd(b))
    };
    l.hd = function (b) {
        if (m(b.changedTouches)) {
            var c = b.changedTouches[0];
            b = Ig(this.b);
            return [c.clientX - b.x, c.clientY - b.y]
        }
        c = this.b;
        b = Ig(b);
        c = Ig(c);
        c = new rf(b.x - c.x, b.y - c.y);
        return [c.x, c.y]
    };
    l.Fd = function () {
        return this.get("target")
    };
    L.prototype.getTarget = L.prototype.Fd;
    l = L.prototype;
    l.Mc = function () {
        var b = this.Fd();
        return m(b) ? wf(b) : null
    };
    l.ra = function (b) {
        var c = this.c;
        if (null === c)return null;
        b = b.slice();
        return ij(c.pixelToCoordinateMatrix, b, b)
    };
    l.Ch = function () {
        return this.i
    };
    l.Yh = function () {
        return this.k
    };
    l.Lh = function () {
        return this.g
    };
    l.Ub = function () {
        return this.get("layergroup")
    };
    L.prototype.getLayerGroup = L.prototype.Ub;
    L.prototype.ea = function () {
        return this.Ub().ac()
    };
    L.prototype.e = function (b) {
        var c = this.c;
        if (null === c)return null;
        b = b.slice(0, 2);
        return ij(c.coordinateToPixelMatrix, b, b)
    };
    L.prototype.f = function () {
        return this.get("size")
    };
    L.prototype.getSize = L.prototype.f;
    L.prototype.a = function () {
        return this.get("view")
    };
    L.prototype.getView = L.prototype.a;
    l = L.prototype;
    l.hi = function () {
        return this.b
    };
    l.fi = function (b, c, d, e) {
        var f = this.c;
        if (!(null !== f && c in f.wantedTiles && f.wantedTiles[c][kf(b.a)]))return Infinity;
        b = d[0] - f.focus[0];
        d = d[1] - f.focus[1];
        return 65536 * Math.log(e) + Math.sqrt(b * b + d * d) / e
    };
    l.sf = function (b, c) {
        var d = new vi(c || b.type, this, b);
        this.uf(d)
    };
    l.uf = function (b) {
        if (null !== this.c) {
            this.ca = b.coordinate;
            b.frameState = this.c;
            var c = this.g.a, d;
            if (!1 !== this.dispatchEvent(b))for (d = c.length - 1; 0 <= d; d--) {
                var e = c[d];
                if (e.b() && !e.handleEvent(b))break
            }
        }
    };
    l.Mi = function () {
        var b = this.c, c = this.kb;
        if (!c.la()) {
            var d = 16, e = d, f = 0;
            null !== b && (f = b.viewHints, f[0] && (d = this.xc ? 8 : 0, e = 2), f[1] && (d = this.yc ? 8 : 0, e = 2), f = qb(b.wantedTiles));
            d *= f;
            e *= f;
            if (c.c < d) {
                Hj(c);
                d = Math.min(d - c.c, e, c.Tb());
                for (e = 0; e < d; ++e)f = Ej(c)[0], w(f, "change", c.g, !1, c), f.load();
                c.c += d
            }
        }
        c = this.va;
        d = 0;
        for (e = c.length; d < e; ++d)c[d](this, b);
        c.length = 0
    };
    l.Oi = function () {
        this.render()
    };
    l.Pi = function () {
        var b = this.Mc();
        Jh(this.D);
        null === b ? Hf(this.b) : (b.appendChild(this.b), Dh(this.D, null === this.fa ? b : this.fa));
        this.q()
    };
    l.Aj = function () {
        this.render()
    };
    l.Qi = function () {
        this.render()
    };
    l.Bj = function () {
        null !== this.U && (Xc(this.U), this.U = null);
        var b = this.a();
        null !== b && (this.U = w(b, "propertychange", this.Qi, !1, this));
        this.render()
    };
    l.zi = function () {
        this.render()
    };
    l.Ai = function () {
        this.render()
    };
    l.yi = function () {
        if (null !== this.o) {
            for (var b = this.o.length, c = 0; c < b; ++c)Xc(this.o[c]);
            this.o = null
        }
        b = this.Ub();
        null != b && (this.o = [w(b, "propertychange", this.Ai, !1, this), w(b, "change", this.zi, !1, this)]);
        this.render()
    };
    l.Sl = function () {
        var b = this.r;
        jh(b);
        b.kf()
    };
    l.render = function () {
        null != this.r.aa || this.r.start()
    };
    l.Ml = function (b) {
        if (m(this.i.remove(b)))return b
    };
    l.Nl = function (b) {
        var c;
        m(this.g.remove(b)) && (c = b);
        return c
    };
    l.Ol = function (b) {
        return this.Ub().ac().remove(b)
    };
    l.Pl = function (b) {
        if (m(this.k.remove(b)))return b
    };
    l.Rl = function (b) {
        var c, d, e, f = this.f(), g = this.a(), h = null;
        if (c = m(f) && 0 < f[0] && 0 < f[1] && null !== g)c = null != g.b() && m(g.a());
        if (c) {
            var h = g.q.slice(), k = this.Ub().Xa(), n = {};
            c = 0;
            for (d = k.length; c < d; ++c)n[ma(k[c].layer)] = k[c];
            e = Ye(g);
            h = {
                animate: !1,
                attributions: {},
                coordinateToPixelMatrix: this.vc,
                extent: null,
                focus: null === this.ca ? e.center : this.ca,
                index: this.wc++,
                layerStates: n,
                layerStatesArray: k,
                logos: Bb(this.zc),
                pixelRatio: this.Ac,
                pixelToCoordinateMatrix: this.ad,
                postRenderFunctions: [],
                size: f,
                skippedFeatureUids: this.da,
                tileQueue: this.kb,
                time: b,
                usedTiles: {},
                viewState: e,
                viewHints: h,
                wantedTiles: {}
            }
        }
        if (null !== h) {
            b = this.N;
            c = f = 0;
            for (d = b.length; c < d; ++c)g = b[c], g(this, h) && (b[f++] = g);
            b.length = f;
            h.extent = ne(e.center, e.resolution, e.rotation, h.size)
        }
        this.c = h;
        this.p.Yd(h);
        null !== h && (h.animate && this.render(), Array.prototype.push.apply(this.va, h.postRenderFunctions), 0 !== this.N.length || h.viewHints[0] || h.viewHints[1] || de(h.extent, this.Ea) || (this.dispatchEvent(new Sg("moveend", this, h)), Yd(h.extent, this.Ea)));
        this.dispatchEvent(new Sg("postrender",
            this, h));
        nh(this.Mi, this)
    };
    l.tg = function (b) {
        this.set("layergroup", b)
    };
    L.prototype.setLayerGroup = L.prototype.tg;
    L.prototype.S = function (b) {
        this.set("size", b)
    };
    L.prototype.setSize = L.prototype.S;
    L.prototype.ia = function (b) {
        this.set("target", b)
    };
    L.prototype.setTarget = L.prototype.ia;
    L.prototype.Fa = function (b) {
        this.set("view", b)
    };
    L.prototype.setView = L.prototype.Fa;
    L.prototype.Xa = function (b) {
        b = ma(b).toString();
        this.da[b] = !0;
        this.render()
    };
    L.prototype.q = function () {
        var b = this.Mc();
        if (null === b)this.S(void 0); else {
            var c = vf(b), d = Gb && b.currentStyle;
            d && Kf(tf(c)) && "auto" != d.width && "auto" != d.height && !d.boxSizing ? (c = Mg(b, d.width, "width", "pixelWidth"), b = Mg(b, d.height, "height", "pixelHeight"), b = new sf(c, b)) : (d = new sf(b.offsetWidth, b.offsetHeight), c = Og(b, "padding"), b = Rg(b), b = new sf(d.width - b.left - c.left - c.right - b.right, d.height - b.top - c.top - c.bottom - b.bottom));
            this.S([b.width, b.height])
        }
    };
    L.prototype.ic = function (b) {
        b = ma(b).toString();
        delete this.da[b];
        this.render()
    };
    function Mo(b) {
        var c = null;
        m(b.keyboardEventTarget) && (c = ia(b.keyboardEventTarget) ? document.getElementById(b.keyboardEventTarget) : b.keyboardEventTarget);
        var d = {}, e = {};
        if (!m(b.logo) || "boolean" == typeof b.logo && b.logo)e["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAHGAAABxgEXwfpGAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAhNQTFRF////AP//AICAgP//AFVVQECA////K1VVSbbbYL/fJ05idsTYJFtbbcjbJllmZszWWMTOIFhoHlNiZszTa9DdUcHNHlNlV8XRIVdiasrUHlZjIVZjaMnVH1RlIFRkH1RkH1ZlasvYasvXVsPQH1VkacnVa8vWIVZjIFRjVMPQa8rXIVVkXsXRsNveIFVkIFZlIVVj3eDeh6GmbMvXH1ZkIFRka8rWbMvXIFVkIFVjIFVkbMvWH1VjbMvWIFVlbcvWIFVla8vVIFVkbMvWbMvVH1VkbMvWIFVlbcvWIFVkbcvVbMvWjNPbIFVkU8LPwMzNIFVkbczWIFVkbsvWbMvXIFVkRnB8bcvW2+TkW8XRIFVkIlZlJVloJlpoKlxrLl9tMmJwOWd0Omh1RXF8TneCT3iDUHiDU8LPVMLPVcLPVcPQVsPPVsPQV8PQWMTQWsTQW8TQXMXSXsXRX4SNX8bSYMfTYcfTYsfTY8jUZcfSZsnUaIqTacrVasrVa8jTa8rWbI2VbMvWbcvWdJObdcvUdszUd8vVeJaee87Yfc3WgJyjhqGnitDYjaarldPZnrK2oNbborW5o9bbo9fbpLa6q9ndrL3ArtndscDDutzfu8fJwN7gwt7gxc/QyuHhy+HizeHi0NfX0+Pj19zb1+Tj2uXk29/e3uLg3+Lh3+bl4uXj4ufl4+fl5Ofl5ufl5ujm5+jmySDnBAAAAFp0Uk5TAAECAgMEBAYHCA0NDg4UGRogIiMmKSssLzU7PkJJT1JTVFliY2hrdHZ3foSFhYeJjY2QkpugqbG1tre5w8zQ09XY3uXn6+zx8vT09vf4+Pj5+fr6/P39/f3+gz7SsAAAAVVJREFUOMtjYKA7EBDnwCPLrObS1BRiLoJLnte6CQy8FLHLCzs2QUG4FjZ5GbcmBDDjxJBXDWxCBrb8aM4zbkIDzpLYnAcE9VXlJSWlZRU13koIeW57mGx5XjoMZEUqwxWYQaQbSzLSkYGfKFSe0QMsX5WbjgY0YS4MBplemI4BdGBW+DQ11eZiymfqQuXZIjqwyadPNoSZ4L+0FVM6e+oGI6g8a9iKNT3o8kVzNkzRg5lgl7p4wyRUL9Yt2jAxVh6mQCogae6GmflI8p0r13VFWTHBQ0rWPW7ahgWVcPm+9cuLoyy4kCJDzCm6d8PSFoh0zvQNC5OjDJhQopPPJqph1doJBUD5tnkbZiUEqaCnB3bTqLTFG1bPn71kw4b+GFdpLElKIzRxxgYgWNYc5SCENVHKeUaltHdXx0dZ8uBI1hJ2UUDgq82CM2MwKeibqAvSO7MCABq0wXEPiqWEAAAAAElFTkSuQmCC"] = "http://openlayers.org/";
        else {
            var f = b.logo;
            ia(f) ? e[f] = "" : la(f) && (e[f.src] = f.href)
        }
        f = b.layers instanceof G ? b.layers : new G({layers: b.layers});
        d.layergroup = f;
        d.target = b.target;
        d.view = m(b.view) ? b.view : new B;
        var f = yj, g;
        m(b.renderer) ? ga(b.renderer) ? g = b.renderer : ia(b.renderer) && (g = [b.renderer]) : g = Lo;
        var h, k;
        h = 0;
        for (k = g.length; h < k; ++h) {
            var n = g[h];
            if ("canvas" == n) {
                if (Yf) {
                    f = zn;
                    break
                }
            } else if ("dom" == n) {
                f = Hn;
                break
            } else if ("webgl" == n && Uf) {
                f = Ho;
                break
            }
        }
        var p;
        m(b.controls) ? p = ga(b.controls) ? new kg(b.controls.slice()) : b.controls : p = $g();
        var q;
        m(b.interactions) ? q = ga(b.interactions) ? new kg(b.interactions.slice()) : b.interactions : q = Kl();
        b = m(b.overlays) ? ga(b.overlays) ? new kg(b.overlays.slice()) : b.overlays : new kg;
        return {controls: p, interactions: q, keyboardEventTarget: c, logos: e, overlays: b, Tl: f, qm: d}
    }

    Rl();
    function N(b) {
        rd.call(this);
        this.H = m(b.insertFirst) ? b.insertFirst : !0;
        this.N = m(b.stopEvent) ? b.stopEvent : !0;
        this.ba = Af("DIV", {"class": "ol-overlay-container"});
        this.ba.style.position = "absolute";
        this.D = m(b.autoPan) ? b.autoPan : !1;
        this.g = m(b.autoPanAnimation) ? b.autoPanAnimation : {};
        this.r = m(b.autoPanMargin) ? b.autoPanMargin : 20;
        this.a = {bd: "", Dd: "", Zd: "", $d: "", visible: !0};
        this.f = null;
        w(this, vd("element"), this.ri, !1, this);
        w(this, vd("map"), this.Gi, !1, this);
        w(this, vd("offset"), this.Ii, !1, this);
        w(this, vd("position"),
            this.Ki, !1, this);
        w(this, vd("positioning"), this.Li, !1, this);
        m(b.element) && this.Me(b.element);
        this.o(m(b.offset) ? b.offset : [0, 0]);
        this.p(m(b.positioning) ? b.positioning : "top-left");
        m(b.position) && this.e(b.position)
    }

    v(N, rd);
    N.prototype.b = function () {
        return this.get("element")
    };
    N.prototype.getElement = N.prototype.b;
    N.prototype.c = function () {
        return this.get("map")
    };
    N.prototype.getMap = N.prototype.c;
    N.prototype.i = function () {
        return this.get("offset")
    };
    N.prototype.getOffset = N.prototype.i;
    N.prototype.q = function () {
        return this.get("position")
    };
    N.prototype.getPosition = N.prototype.q;
    N.prototype.k = function () {
        return this.get("positioning")
    };
    N.prototype.getPositioning = N.prototype.k;
    l = N.prototype;
    l.ri = function () {
        Ff(this.ba);
        var b = this.b();
        null != b && Ef(this.ba, b)
    };
    l.Gi = function () {
        null !== this.f && (Hf(this.ba), Xc(this.f), this.f = null);
        var b = this.c();
        null != b && (this.f = w(b, "postrender", this.render, !1, this), No(this), b = this.N ? b.H : b.ka, this.H ? Gf(b, this.ba, 0) : Ef(b, this.ba))
    };
    l.render = function () {
        No(this)
    };
    l.Ii = function () {
        No(this)
    };
    l.Ki = function () {
        No(this);
        if (m(this.get("position")) && this.D) {
            var b = this.c();
            if (m(b) && !fa(b.Mc())) {
                var c = Oo(b.Mc(), b.f()), d = this.b(), e = d.offsetWidth, f = d.currentStyle || window.getComputedStyle(d), e = e + (parseInt(f.marginLeft, 10) + parseInt(f.marginRight, 10)), f = d.offsetHeight, g = d.currentStyle || window.getComputedStyle(d), f = f + (parseInt(g.marginTop, 10) + parseInt(g.marginBottom, 10)), h = Oo(d, [e, f]), d = this.r;
                $d(c, h) || (e = h[0] - c[0], f = c[2] - h[2], g = h[1] - c[1], h = c[3] - h[3], c = [0, 0], 0 > e ? c[0] = e - d : 0 > f && (c[0] = Math.abs(f) + d),
                    0 > g ? c[1] = g - d : 0 > h && (c[1] = Math.abs(h) + d), 0 === c[0] && 0 === c[1]) || (d = b.a().b(), e = b.e(d), c = [e[0] + c[0], e[1] + c[1]], null !== this.g && (this.g.source = d, b.La(df(this.g))), b.a().Ha(b.ra(c)))
            }
        }
    };
    l.Li = function () {
        No(this)
    };
    l.Me = function (b) {
        this.set("element", b)
    };
    N.prototype.setElement = N.prototype.Me;
    N.prototype.setMap = function (b) {
        this.set("map", b)
    };
    N.prototype.setMap = N.prototype.setMap;
    N.prototype.o = function (b) {
        this.set("offset", b)
    };
    N.prototype.setOffset = N.prototype.o;
    N.prototype.e = function (b) {
        this.set("position", b)
    };
    N.prototype.setPosition = N.prototype.e;
    function Oo(b, c) {
        var d = vf(b);
        Eg(b, "position");
        var e = new rf(0, 0), f;
        f = d ? vf(d) : document;
        f = !Gb || Gb && 9 <= Sb || Kf(tf(f)) ? f.documentElement : f.body;
        b != f && (f = Hg(b), d = Lf(tf(d)), e.x = f.left + d.x, e.y = f.top + d.y);
        return [e.x, e.y, e.x + c[0], e.y + c[1]]
    }

    N.prototype.p = function (b) {
        this.set("positioning", b)
    };
    N.prototype.setPositioning = N.prototype.p;
    function No(b) {
        var c = b.c(), d = b.q();
        if (m(c) && null !== c.c && m(d)) {
            var d = c.e(d), e = c.f(), c = b.ba.style, f = b.i(), g = b.k(), h = f[0], f = f[1];
            if ("bottom-right" == g || "center-right" == g || "top-right" == g)"" !== b.a.Dd && (b.a.Dd = c.left = ""), h = Math.round(e[0] - d[0] - h) + "px", b.a.Zd != h && (b.a.Zd = c.right = h); else {
                "" !== b.a.Zd && (b.a.Zd = c.right = "");
                if ("bottom-center" == g || "center-center" == g || "top-center" == g)h -= Jg(b.ba).width / 2;
                h = Math.round(d[0] + h) + "px";
                b.a.Dd != h && (b.a.Dd = c.left = h)
            }
            if ("bottom-left" == g || "bottom-center" == g || "bottom-right" ==
                g)"" !== b.a.$d && (b.a.$d = c.top = ""), d = Math.round(e[1] - d[1] - f) + "px", b.a.bd != d && (b.a.bd = c.bottom = d); else {
                "" !== b.a.bd && (b.a.bd = c.bottom = "");
                if ("center-left" == g || "center-center" == g || "center-right" == g)f -= Jg(b.ba).height / 2;
                d = Math.round(d[1] + f) + "px";
                b.a.$d != d && (b.a.$d = c.top = d)
            }
            b.a.visible || (Lg(b.ba, !0), b.a.visible = !0)
        } else b.a.visible && (Lg(b.ba, !1), b.a.visible = !1)
    };
    function Po(b) {
        b = m(b) ? b : {};
        this.e = m(b.collapsed) ? b.collapsed : !0;
        this.g = m(b.collapsible) ? b.collapsible : !0;
        this.g || (this.e = !1);
        var c = m(b.className) ? b.className : "ol-overviewmap", d = m(b.tipLabel) ? b.tipLabel : "Overview map", e = m(b.collapseLabel) ? b.collapseLabel : "\u00ab";
        this.o = ia(e) ? Af("SPAN", {}, e) : e;
        e = m(b.label) ? b.label : "\u00bb";
        this.p = ia(e) ? Af("SPAN", {}, e) : e;
        d = Af("BUTTON", {type: "button", title: d}, this.g && !this.e ? this.o : this.p);
        w(d, "click", this.Jj, !1, this);
        w(d, ["mouseout", vc], function () {
            this.blur()
        }, !1);
        var e = Af("DIV", "ol-overviewmap-map"), f = this.c = new L({
            controls: new kg,
            interactions: new kg,
            target: e
        });
        m(b.layers) && b.layers.forEach(function (b) {
            f.bf(b)
        }, this);
        var g = Af("DIV", "ol-overviewmap-box");
        this.k = new N({position: [0, 0], positioning: "bottom-left", element: g});
        this.c.cf(this.k);
        c = Af("DIV", c + " ol-unselectable ol-control" + (this.e && this.g ? " ol-collapsed" : "") + (this.g ? "" : " ol-uncollapsible"), e, d);
        Tg.call(this, {element: c, render: m(b.render) ? b.render : Qo, target: b.target})
    }

    v(Po, Tg);
    l = Po.prototype;
    l.setMap = function (b) {
        var c = this.a;
        null === b && null !== c && Wc(c, vd("view"), this.Gf, !1, this);
        Po.T.setMap.call(this, b);
        null !== b && (0 === this.c.ea().Ib() && this.c.K("layergroup", b), Ro(this), w(b, vd("view"), this.Gf, !1, this), this.c.q(), So(this))
    };
    function Ro(b) {
        var c = b.a.a();
        null === c || b.c.a().K("rotation", c)
    }

    function Qo() {
        var b = this.a, c = this.c;
        if (null !== b.c && null !== c.c) {
            var d = b.f(), b = b.a().g(d), e = c.f(), d = c.a().g(e), f = c.e(ke(b)), c = c.e(ie(b)), c = new sf(Math.abs(f[0] - c[0]), Math.abs(f[1] - c[1])), f = e[0], e = e[1];
            c.width < .1 * f || c.height < .1 * e || c.width > .75 * f || c.height > .75 * e ? So(this) : $d(d, b) || (b = this.c, d = this.a.a(), b.a().Ha(d.b()))
        }
        To(this)
    }

    l.Gf = function () {
        Ro(this)
    };
    function So(b) {
        var c = b.a;
        b = b.c;
        var d = c.f(), c = c.a().g(d), d = b.f();
        b = b.a();
        var e = Math.log(7.5) / Math.LN2;
        te(c, 1 / (.1 * Math.pow(2, e / 2)));
        b.pe(c, d)
    }

    function To(b) {
        var c = b.a, d = b.c;
        if (null !== c.c && null !== d.c) {
            var e = c.f(), f = c.a(), g = d.a();
            d.f();
            var c = f.c(), h = b.k, d = b.k.b(), f = f.g(e), e = g.a(), g = he(f), f = je(f), k;
            b = b.a.a().b();
            m(b) && (k = [g[0] - b[0], g[1] - b[1]], Bd(k, c), wd(k, b));
            h.e(k);
            null != d && (k = new sf(Math.abs((g[0] - f[0]) / e), Math.abs((f[1] - g[1]) / e)), c = Kf(tf(vf(d))), !Gb || Pb("10") || c && Pb("8") ? (d = d.style, Hb ? d.MozBoxSizing = "border-box" : Ib ? d.WebkitBoxSizing = "border-box" : d.boxSizing = "border-box", d.width = Math.max(k.width, 0) + "px", d.height = Math.max(k.height, 0) + "px") :
                (b = d.style, c ? (c = Og(d, "padding"), d = Rg(d), b.pixelWidth = k.width - d.left - c.left - c.right - d.right, b.pixelHeight = k.height - d.top - c.top - c.bottom - d.bottom) : (b.pixelWidth = k.width, b.pixelHeight = k.height)))
        }
    }

    l.Jj = function (b) {
        b.preventDefault();
        Uo(this)
    };
    function Uo(b) {
        zg(b.element, "ol-collapsed");
        b.e ? If(b.o, b.p) : If(b.p, b.o);
        b.e = !b.e;
        var c = b.c;
        b.e || null !== c.c || (c.q(), So(b), Vc(c, "postrender", function () {
            To(this)
        }, !1, b))
    }

    l.Ij = function () {
        return this.g
    };
    l.Lj = function (b) {
        this.g !== b && (this.g = b, zg(this.element, "ol-uncollapsible"), !b && this.e && Uo(this))
    };
    l.Kj = function (b) {
        this.g && this.e !== b && Uo(this)
    };
    l.Hj = function () {
        return this.e
    };
    function Vo(b) {
        b = m(b) ? b : {};
        var c = m(b.className) ? b.className : "ol-scale-line";
        this.g = Af("DIV", c + "-inner");
        this.ba = Af("DIV", c + " ol-unselectable", this.g);
        this.r = null;
        this.k = m(b.minWidth) ? b.minWidth : 64;
        this.c = !1;
        this.H = void 0;
        this.D = "";
        this.e = null;
        Tg.call(this, {element: this.ba, render: m(b.render) ? b.render : Wo, target: b.target});
        w(this, vd("units"), this.N, !1, this);
        this.p(b.units || "metric")
    }

    v(Vo, Tg);
    var Xo = [1, 2, 5];
    Vo.prototype.o = function () {
        return this.get("units")
    };
    Vo.prototype.getUnits = Vo.prototype.o;
    function Wo(b) {
        b = b.frameState;
        null === b ? this.r = null : this.r = b.viewState;
        Yo(this)
    }

    Vo.prototype.N = function () {
        Yo(this)
    };
    Vo.prototype.p = function (b) {
        this.set("units", b)
    };
    Vo.prototype.setUnits = Vo.prototype.p;
    function Yo(b) {
        var c = b.r;
        if (null === c)b.c && (Lg(b.ba, !1), b.c = !1); else {
            var d = c.center, e = c.projection, c = e.te(c.resolution, d), f = e.d, g = b.o();
            "degrees" != f || "metric" != g && "imperial" != g && "us" != g && "nautical" != g ? "degrees" != f && "degrees" == g ? (null === b.e && (b.e = Ae(e, Be("EPSG:4326"))), d = Math.cos(Zb(b.e(d)[1])), e = we.radius, e /= xe[f], c *= 180 / (Math.PI * d * e)) : b.e = null : (b.e = null, d = Math.cos(Zb(d[1])), c *= Math.PI * d * we.radius / 180);
            d = b.k * c;
            f = "";
            "degrees" == g ? d < 1 / 60 ? (f = "\u2033", c *= 3600) : 1 > d ? (f = "\u2032", c *= 60) : f = "\u00b0" : "imperial" ==
            g ? .9144 > d ? (f = "in", c /= .0254) : 1609.344 > d ? (f = "ft", c /= .3048) : (f = "mi", c /= 1609.344) : "nautical" == g ? (c /= 1852, f = "nm") : "metric" == g ? 1 > d ? (f = "mm", c *= 1E3) : 1E3 > d ? f = "m" : (f = "km", c /= 1E3) : "us" == g && (.9144 > d ? (f = "in", c *= 39.37) : 1609.344 > d ? (f = "ft", c /= .30480061) : (f = "mi", c /= 1609.3472));
            for (d = 3 * Math.floor(Math.log(b.k * c) / Math.log(10)); ;) {
                e = Xo[d % 3] * Math.pow(10, Math.floor(d / 3));
                g = Math.round(e / c);
                if (isNaN(g)) {
                    Lg(b.ba, !1);
                    b.c = !1;
                    return
                }
                if (g >= b.k)break;
                ++d
            }
            c = e + " " + f;
            b.D != c && (b.g.innerHTML = c, b.D = c);
            b.H != g && (b.g.style.width = g + "px",
                b.H = g);
            b.c || (Lg(b.ba, !0), b.c = !0)
        }
    };
    function Zo(b) {
        mc.call(this);
        this.d = b;
        this.a = {}
    }

    v(Zo, mc);
    var $o = [];
    Zo.prototype.Ra = function (b, c, d, e) {
        ga(c) || (c && ($o[0] = c.toString()), c = $o);
        for (var f = 0; f < c.length; f++) {
            var g = w(b, c[f], d || this.handleEvent, e || !1, this.d || this);
            if (!g)break;
            this.a[g.key] = g
        }
        return this
    };
    Zo.prototype.Ne = function (b, c, d, e, f) {
        if (ga(c))for (var g = 0; g < c.length; g++)this.Ne(b, c[g], d, e, f); else d = d || this.handleEvent, f = f || this.d || this, d = Pc(d), e = !!e, c = Cc(b) ? Jc(b.mb, String(c), d, e, f) : b ? (b = Rc(b)) ? Jc(b, c, d, e, f) : null : null, c && (Xc(c), delete this.a[c.key]);
        return this
    };
    function ap(b) {
        ob(b.a, Xc);
        b.a = {}
    }

    Zo.prototype.P = function () {
        Zo.T.P.call(this);
        ap(this)
    };
    Zo.prototype.handleEvent = function () {
        throw Error("EventHandler.handleEvent not implemented");
    };
    function bp(b, c, d) {
        id.call(this);
        this.target = b;
        this.handle = c || b;
        this.a = d || new Bg(NaN, NaN, NaN, NaN);
        this.b = vf(b);
        this.d = new Zo(this);
        pc(this, this.d);
        w(this.handle, ["touchstart", "mousedown"], this.rf, !1, this)
    }

    v(bp, id);
    var cp = Gb || Hb && Pb("1.9.3");
    l = bp.prototype;
    l.clientX = 0;
    l.clientY = 0;
    l.screenX = 0;
    l.screenY = 0;
    l.ug = 0;
    l.vg = 0;
    l.pc = 0;
    l.qc = 0;
    l.Zb = !1;
    l.P = function () {
        bp.T.P.call(this);
        Wc(this.handle, ["touchstart", "mousedown"], this.rf, !1, this);
        ap(this.d);
        cp && this.b.releaseCapture();
        this.handle = this.target = null
    };
    l.rf = function (b) {
        var c = "mousedown" == b.type;
        if (this.Zb || c && !Ac(b))this.dispatchEvent("earlycancel"); else if (dp(b), this.dispatchEvent(new ep("start", this, b.clientX, b.clientY))) {
            this.Zb = !0;
            b.preventDefault();
            var c = this.b, d = c.documentElement, e = !cp;
            this.d.Ra(c, ["touchmove", "mousemove"], this.Hi, e);
            this.d.Ra(c, ["touchend", "mouseup"], this.wd, e);
            cp ? (d.setCapture(!1), this.d.Ra(d, "losecapture", this.wd)) : this.d.Ra(c ? c.parentWindow || c.defaultView : window, "blur", this.wd);
            this.f && this.d.Ra(this.f, "scroll", this.jl,
                e);
            this.clientX = this.ug = b.clientX;
            this.clientY = this.vg = b.clientY;
            this.screenX = b.screenX;
            this.screenY = b.screenY;
            this.pc = this.target.offsetLeft;
            this.qc = this.target.offsetTop;
            this.c = Lf(tf(this.b));
            ta()
        }
    };
    l.wd = function (b) {
        ap(this.d);
        cp && this.b.releaseCapture();
        if (this.Zb) {
            dp(b);
            this.Zb = !1;
            var c = fp(this, this.pc), d = gp(this, this.qc);
            this.dispatchEvent(new ep("end", this, b.clientX, b.clientY, 0, c, d))
        } else this.dispatchEvent("earlycancel")
    };
    function dp(b) {
        var c = b.type;
        "touchstart" == c || "touchmove" == c ? yc(b, b.a.targetTouches[0], b.b) : "touchend" != c && "touchcancel" != c || yc(b, b.a.changedTouches[0], b.b)
    }

    l.Hi = function (b) {
        dp(b);
        var c = 1 * (b.clientX - this.clientX), d = b.clientY - this.clientY;
        this.clientX = b.clientX;
        this.clientY = b.clientY;
        this.screenX = b.screenX;
        this.screenY = b.screenY;
        if (!this.Zb) {
            var e = this.ug - this.clientX, f = this.vg - this.clientY;
            if (0 < e * e + f * f)if (this.dispatchEvent(new ep("start", this, b.clientX, b.clientY)))this.Zb = !0; else {
                this.oa || this.wd(b);
                return
            }
        }
        d = hp(this, c, d);
        c = d.x;
        d = d.y;
        this.Zb && this.dispatchEvent(new ep("beforedrag", this, b.clientX, b.clientY, 0, c, d)) && (ip(this, b, c, d), b.preventDefault())
    };
    function hp(b, c, d) {
        var e = Lf(tf(b.b));
        c += e.x - b.c.x;
        d += e.y - b.c.y;
        b.c = e;
        b.pc += c;
        b.qc += d;
        c = fp(b, b.pc);
        b = gp(b, b.qc);
        return new rf(c, b)
    }

    l.jl = function (b) {
        var c = hp(this, 0, 0);
        b.clientX = this.clientX;
        b.clientY = this.clientY;
        ip(this, b, c.x, c.y)
    };
    function ip(b, c, d, e) {
        b.target.style.left = d + "px";
        b.target.style.top = e + "px";
        b.dispatchEvent(new ep("drag", b, c.clientX, c.clientY, 0, d, e))
    }

    function fp(b, c) {
        var d = b.a, e = isNaN(d.left) ? null : d.left, d = isNaN(d.width) ? 0 : d.width;
        return Math.min(null != e ? e + d : Infinity, Math.max(null != e ? e : -Infinity, c))
    }

    function gp(b, c) {
        var d = b.a, e = isNaN(d.top) ? null : d.top, d = isNaN(d.height) ? 0 : d.height;
        return Math.min(null != e ? e + d : Infinity, Math.max(null != e ? e : -Infinity, c))
    }

    function ep(b, c, d, e, f, g, h) {
        rc.call(this, b);
        this.clientX = d;
        this.clientY = e;
        this.left = m(g) ? g : c.pc;
        this.top = m(h) ? h : c.qc
    }

    v(ep, rc);
    function jp(b) {
        b = m(b) ? b : {};
        this.e = void 0;
        this.g = kp;
        this.k = null;
        this.o = !1;
        var c = m(b.className) ? b.className : "ol-zoomslider", d = Af("DIV", [c + "-thumb", "ol-unselectable"]), c = Af("DIV", [c, "ol-unselectable", "ol-control"], d);
        this.c = new bp(d);
        pc(this, this.c);
        w(this.c, "start", this.qi, !1, this);
        w(this.c, "drag", this.oi, !1, this);
        w(this.c, "end", this.pi, !1, this);
        w(c, "click", this.ni, !1, this);
        w(d, "click", tc);
        Tg.call(this, {element: c, render: m(b.render) ? b.render : lp})
    }

    v(jp, Tg);
    var kp = 0;
    l = jp.prototype;
    l.setMap = function (b) {
        jp.T.setMap.call(this, b);
        null === b || b.render()
    };
    function lp(b) {
        if (null !== b.frameState) {
            if (!this.o) {
                var c = this.element, d = Jg(c), e = Jf(c), c = Og(e, "margin"), f = new sf(e.offsetWidth, e.offsetHeight), e = f.width + c.right + c.left, c = f.height + c.top + c.bottom;
                this.k = [e, c];
                e = d.width - e;
                c = d.height - c;
                d.width > d.height ? (this.g = 1, d = new Bg(0, 0, e, 0)) : (this.g = kp, d = new Bg(0, 0, 0, c));
                this.c.a = d || new Bg(NaN, NaN, NaN, NaN);
                this.o = !0
            }
            b = b.frameState.viewState.resolution;
            b !== this.e && (this.e = b, b = 1 - Xe(this.a.a())(b), d = this.c, c = Jf(this.element), 1 == this.g ? Fg(c, d.a.left + d.a.width * b) : Fg(c,
                d.a.left, d.a.top + d.a.height * b))
        }
    }

    l.ni = function (b) {
        var c = this.a, d = c.a(), e = d.a();
        c.La(ff({resolution: e, duration: 200, easing: $e}));
        b = mp(this, b.offsetX - this.k[0] / 2, b.offsetY - this.k[1] / 2);
        b = np(this, b);
        d.f(d.constrainResolution(b))
    };
    l.qi = function () {
        Ze(this.a.a(), 1)
    };
    l.oi = function (b) {
        b = mp(this, b.left, b.top);
        this.e = np(this, b);
        this.a.a().f(this.e)
    };
    l.pi = function () {
        var b = this.a, c = b.a();
        Ze(c, -1);
        b.La(ff({resolution: this.e, duration: 200, easing: $e}));
        b = c.constrainResolution(this.e);
        c.f(b)
    };
    function mp(b, c, d) {
        var e = b.c.a;
        return Wb(1 === b.g ? (c - e.left) / e.width : (d - e.top) / e.height, 0, 1)
    }

    function np(b, c) {
        return We(b.a.a())(1 - c)
    };
    function op(b) {
        b = m(b) ? b : {};
        this.c = m(b.extent) ? b.extent : null;
        var c = m(b.className) ? b.className : "ol-zoom-extent", d = Af("BUTTON", {
            type: "button",
            title: m(b.tipLabel) ? b.tipLabel : "Fit to extent"
        }, m(b.label) ? b.label : "E");
        w(d, "click", this.e, !1, this);
        w(d, ["mouseout", vc], function () {
            this.blur()
        }, !1);
        c = Af("DIV", c + " ol-unselectable ol-control", d);
        Tg.call(this, {element: c, target: b.target})
    }

    v(op, Tg);
    op.prototype.e = function (b) {
        b.preventDefault();
        var c = this.a;
        b = c.a();
        var d = null === this.c ? b.p.J() : this.c, c = c.f();
        b.pe(d, c)
    };
    function pp(b) {
        rd.call(this);
        b = m(b) ? b : {};
        this.a = null;
        w(this, vd("tracking"), this.k, !1, this);
        this.b(m(b.tracking) ? b.tracking : !1)
    }

    v(pp, rd);
    pp.prototype.P = function () {
        this.b(!1);
        pp.T.P.call(this)
    };
    pp.prototype.q = function (b) {
        b = b.a;
        if (null != b.alpha) {
            var c = Zb(b.alpha);
            this.set("alpha", c);
            "boolean" == typeof b.absolute && b.absolute ? this.set("heading", c) : null != b.webkitCompassHeading && null != b.webkitCompassAccuracy && -1 != b.webkitCompassAccuracy && this.set("heading", Zb(b.webkitCompassHeading))
        }
        null != b.beta && this.set("beta", Zb(b.beta));
        null != b.gamma && this.set("gamma", Zb(b.gamma));
        this.l()
    };
    pp.prototype.f = function () {
        return this.get("alpha")
    };
    pp.prototype.getAlpha = pp.prototype.f;
    pp.prototype.e = function () {
        return this.get("beta")
    };
    pp.prototype.getBeta = pp.prototype.e;
    pp.prototype.g = function () {
        return this.get("gamma")
    };
    pp.prototype.getGamma = pp.prototype.g;
    pp.prototype.i = function () {
        return this.get("heading")
    };
    pp.prototype.getHeading = pp.prototype.i;
    pp.prototype.c = function () {
        return this.get("tracking")
    };
    pp.prototype.getTracking = pp.prototype.c;
    pp.prototype.k = function () {
        if (Zf) {
            var b = this.c();
            b && null === this.a ? this.a = w(ba, "deviceorientation", this.q, !1, this) : b || null === this.a || (Xc(this.a), this.a = null)
        }
    };
    pp.prototype.b = function (b) {
        this.set("tracking", b)
    };
    pp.prototype.setTracking = pp.prototype.b;
    function qp(b) {
        rd.call(this);
        this.i = b;
        w(this.i, ["change", "input"], this.g, !1, this);
        w(this, vd("value"), this.k, !1, this);
        w(this, vd("checked"), this.e, !1, this)
    }

    v(qp, rd);
    qp.prototype.a = function () {
        return this.get("checked")
    };
    qp.prototype.getChecked = qp.prototype.a;
    qp.prototype.b = function () {
        return this.get("value")
    };
    qp.prototype.getValue = qp.prototype.b;
    qp.prototype.f = function (b) {
        this.set("value", b)
    };
    qp.prototype.setValue = qp.prototype.f;
    qp.prototype.c = function (b) {
        this.set("checked", b)
    };
    qp.prototype.setChecked = qp.prototype.c;
    qp.prototype.g = function () {
        var b = this.i;
        "checkbox" === b.type || "radio" === b.type ? this.c(b.checked) : this.f(b.value)
    };
    qp.prototype.e = function () {
        this.i.checked = this.a()
    };
    qp.prototype.k = function () {
        this.i.value = this.b()
    };
    function P(b) {
        rd.call(this);
        this.aa = void 0;
        this.b = "geometry";
        this.g = null;
        this.a = void 0;
        this.e = null;
        w(this, vd(this.b), this.xd, !1, this);
        m(b) && (b instanceof kk || null === b ? this.Sa(b) : this.C(b))
    }

    v(P, rd);
    P.prototype.clone = function () {
        var b = new P(this.I());
        b.f(this.b);
        var c = this.R();
        null != c && b.Sa(c.clone());
        c = this.g;
        null === c || b.i(c);
        return b
    };
    P.prototype.R = function () {
        return this.get(this.b)
    };
    P.prototype.getGeometry = P.prototype.R;
    l = P.prototype;
    l.Kh = function () {
        return this.aa
    };
    l.Jh = function () {
        return this.b
    };
    l.rj = function () {
        return this.g
    };
    l.sj = function () {
        return this.a
    };
    l.xi = function () {
        this.l()
    };
    l.xd = function () {
        null !== this.e && (Xc(this.e), this.e = null);
        var b = this.R();
        null != b && (this.e = w(b, "change", this.xi, !1, this), this.l())
    };
    l.Sa = function (b) {
        this.set(this.b, b)
    };
    P.prototype.setGeometry = P.prototype.Sa;
    P.prototype.i = function (b) {
        this.g = b;
        null === b ? b = void 0 : ka(b) || (b = ga(b) ? b : [b], b = ad(b));
        this.a = b;
        this.l()
    };
    P.prototype.c = function (b) {
        this.aa = b;
        this.l()
    };
    P.prototype.f = function (b) {
        Wc(this, vd(this.b), this.xd, !1, this);
        this.b = b;
        w(this, vd(this.b), this.xd, !1, this);
        this.xd()
    };
    function rp(b) {
        b = m(b) ? b : {};
        this.g = this.f = this.c = this.d = this.b = this.a = null;
        this.e = void 0;
        this.Ff(m(b.style) ? b.style : tl);
        m(b.features) ? ga(b.features) ? this.Tc(new kg(b.features.slice())) : this.Tc(b.features) : this.Tc(new kg);
        m(b.map) && this.setMap(b.map)
    }

    l = rp.prototype;
    l.Df = function (b) {
        this.a.push(b)
    };
    l.lj = function () {
        return this.a
    };
    l.mj = function () {
        return this.c
    };
    l.Ef = function () {
        sp(this)
    };
    l.vi = function (b) {
        b = b.element;
        this.d[ma(b).toString()] = w(b, "change", this.Ef, !1, this);
        sp(this)
    };
    l.wi = function (b) {
        b = ma(b.element).toString();
        Xc(this.d[b]);
        delete this.d[b];
        sp(this)
    };
    l.pj = function () {
        sp(this)
    };
    l.qj = function (b) {
        if (null !== this.a) {
            var c = this.e;
            m(c) || (c = tl);
            var d = b.a;
            b = b.frameState;
            var e = b.viewState.resolution, f = Wm(e, b.pixelRatio), g, h, k, n;
            this.a.forEach(function (b) {
                n = b.a;
                k = m(n) ? n.call(b, e) : c(b, e);
                if (null != k)for (h = k.length, g = 0; g < h; ++g)Xm(d, b, k[g], f, this.pj, this)
            }, this)
        }
    };
    l.Ed = function (b) {
        this.a.remove(b)
    };
    function sp(b) {
        null === b.c || b.c.render()
    }

    l.Tc = function (b) {
        null !== this.b && (Qa(this.b, Xc), this.b = null);
        null !== this.d && (Qa(rb(this.d), Xc), this.d = null);
        this.a = b;
        null !== b && (this.b = [w(b, "add", this.vi, !1, this), w(b, "remove", this.wi, !1, this)], this.d = {}, b.forEach(function (b) {
            this.d[ma(b).toString()] = w(b, "change", this.Ef, !1, this)
        }, this));
        sp(this)
    };
    l.setMap = function (b) {
        null !== this.f && (Xc(this.f), this.f = null);
        sp(this);
        this.c = b;
        null !== b && (this.f = w(b, "postcompose", this.qj, !1, this), b.render())
    };
    l.Ff = function (b) {
        this.g = b;
        this.e = sl(b);
        sp(this)
    };
    l.nj = function () {
        return this.g
    };
    l.oj = function () {
        return this.e
    };
    function tp() {
        this.defaultDataProjection = null
    }

    function up(b, c, d) {
        var e;
        m(d) && (e = {
            dataProjection: m(d.dataProjection) ? d.dataProjection : b.Ja(c),
            featureProjection: d.featureProjection
        });
        return vp(b, e)
    }

    function vp(b, c) {
        var d;
        m(c) && (d = {
            featureProjection: c.featureProjection,
            dataProjection: null != c.dataProjection ? c.dataProjection : b.defaultDataProjection
        });
        return d
    }

    function wp(b, c, d) {
        var e = m(d) ? Be(d.featureProjection) : null;
        d = m(d) ? Be(d.dataProjection) : null;
        return null === e || null === d || Se(e, d) ? b : b instanceof kk ? (c ? b.clone() : b).transform(c ? e : d, c ? d : e) : Ve(c ? b.slice() : b, c ? e : d, c ? d : e)
    };
    var xp = ba.JSON.parse, yp = ba.JSON.stringify;

    function zp() {
        this.defaultDataProjection = null
    }

    v(zp, tp);
    function Ap(b) {
        return la(b) ? b : ia(b) ? (b = xp(b), m(b) ? b : null) : null
    }

    l = zp.prototype;
    l.O = function () {
        return "json"
    };
    l.Nb = function (b, c) {
        return Bp(this, Ap(b), up(this, b, c))
    };
    l.ma = function (b, c) {
        return this.b(Ap(b), up(this, b, c))
    };
    l.Rc = function (b, c) {
        var d = Ap(b), e = up(this, b, c);
        return Cp(d, e)
    };
    l.Ja = function (b) {
        b = Ap(b).crs;
        return null != b ? "name" == b.type ? Be(b.properties.name) : "EPSG" == b.type ? Be("EPSG:" + b.properties.code) : null : this.defaultDataProjection
    };
    l.be = function (b, c) {
        return yp(this.a(b, c))
    };
    l.Qb = function (b, c) {
        return yp(this.c(b, c))
    };
    l.Xc = function (b, c) {
        return yp(this.f(b, c))
    };
    function Dp(b) {
        b = m(b) ? b : {};
        this.defaultDataProjection = null;
        this.defaultDataProjection = Be(null != b.defaultDataProjection ? b.defaultDataProjection : "EPSG:4326");
        this.d = b.geometryName
    }

    v(Dp, zp);
    function Cp(b, c) {
        return null === b ? null : wp((0, Ep[b.type])(b), !1, c)
    }

    var Ep = {
        Point: function (b) {
            return new Ik(b.coordinates)
        }, LineString: function (b) {
            return new K(b.coordinates)
        }, Polygon: function (b) {
            return new F(b.coordinates)
        }, MultiPoint: function (b) {
            return new Rm(b.coordinates)
        }, MultiLineString: function (b) {
            return new Om(b.coordinates)
        }, MultiPolygon: function (b) {
            return new Sm(b.coordinates)
        }, GeometryCollection: function (b, c) {
            var d = Sa(b.geometries, function (b) {
                return Cp(b, c)
            });
            return new Gm(d)
        }
    }, Fp = {
        Point: function (b) {
            return {type: "Point", coordinates: b.Q()}
        }, LineString: function (b) {
            return {
                type: "LineString",
                coordinates: b.Q()
            }
        }, Polygon: function (b) {
            return {type: "Polygon", coordinates: b.Q()}
        }, MultiPoint: function (b) {
            return {type: "MultiPoint", coordinates: b.Q()}
        }, MultiLineString: function (b) {
            return {type: "MultiLineString", coordinates: b.Q()}
        }, MultiPolygon: function (b) {
            return {type: "MultiPolygon", coordinates: b.Q()}
        }, GeometryCollection: function (b, c) {
            return {
                type: "GeometryCollection", geometries: Sa(b.c, function (b) {
                    return (0, Fp[b.O()])(wp(b, !0, c))
                })
            }
        }, Circle: function () {
            return {type: "GeometryCollection", geometries: []}
        }
    };

    function Bp(b, c, d) {
        d = Cp(c.geometry, d);
        var e = new P;
        m(b.d) && e.f(b.d);
        e.Sa(d);
        m(c.id) && e.c(c.id);
        m(c.properties) && e.C(c.properties);
        return e
    }

    Dp.prototype.b = function (b, c) {
        if ("Feature" == b.type)return [Bp(this, b, c)];
        if ("FeatureCollection" == b.type) {
            var d = [], e = b.features, f, g;
            f = 0;
            for (g = e.length; f < g; ++f)d.push(Bp(this, e[f], c));
            return d
        }
        return []
    };
    Dp.prototype.a = function (b, c) {
        c = vp(this, c);
        var d = {type: "Feature"}, e = b.aa;
        null != e && (d.id = e);
        e = b.R();
        null != e && (d.geometry = (0, Fp[e.O()])(wp(e, !0, c)));
        e = b.I();
        yb(e, b.b);
        d.properties = wb(e) ? null : e;
        return d
    };
    Dp.prototype.c = function (b, c) {
        c = vp(this, c);
        var d = [], e, f;
        e = 0;
        for (f = b.length; e < f; ++e)d.push(this.a(b[e], c));
        return {type: "FeatureCollection", features: d}
    };
    Dp.prototype.f = function (b, c) {
        return (0, Fp[b.O()])(wp(b, !0, vp(this, c)))
    };
    function Gp(b) {
        if ("undefined" != typeof XMLSerializer)return (new XMLSerializer).serializeToString(b);
        if (b = b.xml)return b;
        throw Error("Your browser does not support serializing XML documents");
    };
    var Hp;
    a:if (document.implementation && document.implementation.createDocument)Hp = document.implementation.createDocument("", "", null); else {
        if ("undefined" != typeof ActiveXObject) {
            var Ip = new ActiveXObject("MSXML2.DOMDocument");
            if (Ip) {
                Ip.resolveExternals = !1;
                Ip.validateOnParse = !1;
                try {
                    Ip.setProperty("ProhibitDTD", !0), Ip.setProperty("MaxXMLSize", 2048), Ip.setProperty("MaxElementDepth", 256)
                } catch (Jp) {
                }
            }
            if (Ip) {
                Hp = Ip;
                break a
            }
        }
        throw Error("Your browser does not support creating new documents");
    }
    var Kp = Hp;

    function Lp(b, c) {
        return Kp.createElementNS(b, c)
    }

    function Mp(b, c) {
        null === b && (b = "");
        return Kp.createNode(1, c, b)
    }

    var Np = document.implementation && document.implementation.createDocument ? Lp : Mp;

    function Op(b, c) {
        return Pp(b, c, []).join("")
    }

    function Pp(b, c, d) {
        if (4 == b.nodeType || 3 == b.nodeType)c ? d.push(String(b.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : d.push(b.nodeValue); else for (b = b.firstChild; null !== b; b = b.nextSibling)Pp(b, c, d);
        return d
    }

    function Qp(b) {
        return b.localName
    }

    function Rp(b) {
        var c = b.localName;
        return m(c) ? c : b.baseName
    }

    var Sp = Gb ? Rp : Qp;

    function Tp(b) {
        return b instanceof Document
    }

    function Up(b) {
        return la(b) && 9 == b.nodeType
    }

    var Vp = Gb ? Up : Tp;

    function Wp(b) {
        return b instanceof Node
    }

    function Xp(b) {
        return la(b) && m(b.nodeType)
    }

    var Yp = Gb ? Xp : Wp;

    function Zp(b, c, d) {
        return b.getAttributeNS(c, d) || ""
    }

    function $p(b, c, d) {
        var e = "";
        b = aq(b, c, d);
        m(b) && (e = b.nodeValue);
        return e
    }

    var bq = document.implementation && document.implementation.createDocument ? Zp : $p;

    function cq(b, c, d) {
        return b.getAttributeNodeNS(c, d)
    }

    function dq(b, c, d) {
        var e = null;
        b = b.attributes;
        for (var f, g, h = 0, k = b.length; h < k; ++h)if (f = b[h], f.namespaceURI == c && (g = f.prefix ? f.prefix + ":" + d : d, g == f.nodeName)) {
            e = f;
            break
        }
        return e
    }

    var aq = document.implementation && document.implementation.createDocument ? cq : dq;

    function eq(b, c, d, e) {
        b.setAttributeNS(c, d, e)
    }

    function fq(b, c, d, e) {
        null === c ? b.setAttribute(d, e) : (c = b.ownerDocument.createNode(2, d, c), c.nodeValue = e, b.setAttributeNode(c))
    }

    var gq = document.implementation && document.implementation.createDocument ? eq : fq;

    function hq(b) {
        return (new DOMParser).parseFromString(b, "application/xml")
    }

    function iq(b, c) {
        return function (d, e) {
            var f = b.call(c, d, e);
            m(f) && ab(e[e.length - 1], f)
        }
    }

    function jq(b, c) {
        return function (d, e) {
            var f = b.call(m(c) ? c : this, d, e);
            m(f) && e[e.length - 1].push(f)
        }
    }

    function kq(b, c) {
        return function (d, e) {
            var f = b.call(m(c) ? c : this, d, e);
            m(f) && (e[e.length - 1] = f)
        }
    }

    function lq(b) {
        return function (c, d) {
            var e = b.call(m(void 0) ? void 0 : this, c, d);
            m(e) && Ab(d[d.length - 1], m(void 0) ? void 0 : c.localName).push(e)
        }
    }

    function R(b, c) {
        return function (d, e) {
            var f = b.call(m(void 0) ? void 0 : this, d, e);
            m(f) && (e[e.length - 1][m(c) ? c : d.localName] = f)
        }
    }

    function S(b, c, d) {
        return mq(b, c, d)
    }

    function T(b, c) {
        return function (d, e, f) {
            b.call(m(c) ? c : this, d, e, f);
            f[f.length - 1].node.appendChild(d)
        }
    }

    function nq(b) {
        var c, d;
        return function (e, f, g) {
            if (!m(c)) {
                c = {};
                var h = {};
                h[e.localName] = b;
                c[e.namespaceURI] = h;
                d = oq(e.localName)
            }
            pq(c, d, f, g)
        }
    }

    function oq(b, c) {
        return function (d, e, f) {
            d = e[e.length - 1].node;
            e = b;
            m(e) || (e = f);
            f = c;
            m(c) || (f = d.namespaceURI);
            return Np(f, e)
        }
    }

    var qq = oq();

    function rq(b, c) {
        for (var d = c.length, e = Array(d), f = 0; f < d; ++f)e[f] = b[c[f]];
        return e
    }

    function mq(b, c, d) {
        d = m(d) ? d : {};
        var e, f;
        e = 0;
        for (f = b.length; e < f; ++e)d[b[e]] = c;
        return d
    }

    function sq(b, c, d, e) {
        for (c = c.firstElementChild; null !== c; c = c.nextElementSibling) {
            var f = b[c.namespaceURI];
            m(f) && (f = f[c.localName], m(f) && f.call(e, c, d))
        }
    }

    function U(b, c, d, e, f) {
        e.push(b);
        sq(c, d, e, f);
        return e.pop()
    }

    function pq(b, c, d, e, f, g) {
        for (var h = (m(f) ? f : d).length, k, n, p = 0; p < h; ++p)k = d[p], m(k) && (n = c.call(g, k, e, m(f) ? f[p] : void 0), m(n) && b[n.namespaceURI][n.localName].call(g, n, k, e))
    }

    function tq(b, c, d, e, f, g, h) {
        f.push(b);
        pq(c, d, e, f, g, h);
        f.pop()
    };
    function uq() {
        this.defaultDataProjection = null
    }

    v(uq, tp);
    l = uq.prototype;
    l.O = function () {
        return "xml"
    };
    l.Nb = function (b, c) {
        if (Vp(b))return vq(this, b, c);
        if (Yp(b))return this.fg(b, c);
        if (ia(b)) {
            var d = hq(b);
            return vq(this, d, c)
        }
        return null
    };
    function vq(b, c, d) {
        b = wq(b, c, d);
        return 0 < b.length ? b[0] : null
    }

    l.ma = function (b, c) {
        if (Vp(b))return wq(this, b, c);
        if (Yp(b))return this.Ob(b, c);
        if (ia(b)) {
            var d = hq(b);
            return wq(this, d, c)
        }
        return []
    };
    function wq(b, c, d) {
        var e = [];
        for (c = c.firstChild; null !== c; c = c.nextSibling)1 == c.nodeType && ab(e, b.Ob(c, d));
        return e
    }

    l.Rc = function (b, c) {
        if (Vp(b))return this.k(b, c);
        if (Yp(b)) {
            var d = this.Ud(b, [up(this, b, m(c) ? c : {})]);
            return m(d) ? d : null
        }
        return ia(b) ? (d = hq(b), this.k(d, c)) : null
    };
    l.Ja = function (b) {
        return Vp(b) ? this.Ke(b) : Yp(b) ? this.Xd(b) : ia(b) ? (b = hq(b), this.Ke(b)) : null
    };
    l.Ke = function () {
        return this.defaultDataProjection
    };
    l.Xd = function () {
        return this.defaultDataProjection
    };
    l.be = function (b, c) {
        var d = this.o(b, c);
        return Gp(d)
    };
    l.Qb = function (b, c) {
        var d = this.a(b, c);
        return Gp(d)
    };
    l.Xc = function (b, c) {
        var d = this.i(b, c);
        return Gp(d)
    };
    function xq(b) {
        b = m(b) ? b : {};
        this.featureType = b.featureType;
        this.featureNS = b.featureNS;
        this.srsName = b.srsName;
        this.schemaLocation = "";
        this.d = {};
        this.d["http://www.opengis.net/gml"] = {
            featureMember: kq(xq.prototype.Sd),
            featureMembers: kq(xq.prototype.Sd)
        };
        this.defaultDataProjection = null
    }

    v(xq, uq);
    l = xq.prototype;
    l.Sd = function (b, c) {
        var d = Sp(b), e;
        if ("FeatureCollection" == d)e = U(null, this.d, b, c, this); else if ("featureMembers" == d || "featureMember" == d) {
            var f = c[0], g = f.featureType;
            e = f.featureNS;
            var h, k;
            if (!m(g) && null != b.childNodes) {
                g = [];
                e = {};
                h = 0;
                for (k = b.childNodes.length; h < k; ++h) {
                    var n = b.childNodes[h];
                    if (1 === n.nodeType) {
                        var p = n.nodeName.split(":").pop();
                        if (-1 === Pa(g, p)) {
                            var q;
                            ub(e, n.namespaceURI) ? q = vb(e, function (b) {
                                return b === n.namespaceURI
                            }) : (q = "p" + qb(e), e[q] = n.namespaceURI);
                            g.push(q + ":" + p)
                        }
                    }
                }
                f.featureType = g;
                f.featureNS =
                    e
            }
            ia(e) && (h = e, e = {}, e.p0 = h);
            var f = {}, g = ga(g) ? g : [g], r;
            for (r in e) {
                p = {};
                h = 0;
                for (k = g.length; h < k; ++h)(-1 === g[h].indexOf(":") ? "p0" : g[h].split(":")[0]) === r && (p[g[h].split(":").pop()] = "featureMembers" == d ? jq(this.Ge, this) : kq(this.Ge, this));
                f[e[r]] = p
            }
            e = U([], f, b, c)
        }
        m(e) || (e = []);
        return e
    };
    l.Ud = function (b, c) {
        var d = c[0];
        d.srsName = b.firstElementChild.getAttribute("srsName");
        var e = U(null, this.Ue, b, c, this);
        if (null != e)return wp(e, !1, d)
    };
    l.Ge = function (b, c) {
        var d, e = b.getAttribute("fid") || bq(b, "http://www.opengis.net/gml", "id"), f = {}, g;
        for (d = b.firstElementChild; null !== d; d = d.nextElementSibling) {
            var h = Sp(d);
            if (0 === d.childNodes.length || 1 === d.childNodes.length && 3 === d.firstChild.nodeType) {
                var k = Op(d, !1);
                /^[\s\xa0]*$/.test(k) && (k = void 0);
                f[h] = k
            } else"boundedBy" !== h && (g = h), f[h] = this.Ud(d, c)
        }
        d = new P(f);
        m(g) && d.f(g);
        e && d.c(e);
        return d
    };
    l.lg = function (b, c) {
        var d = this.Td(b, c);
        if (null != d) {
            var e = new Ik(null);
            Jk(e, "XYZ", d);
            return e
        }
    };
    l.jg = function (b, c) {
        var d = U([], this.Pg, b, c, this);
        if (m(d))return new Rm(d)
    };
    l.ig = function (b, c) {
        var d = U([], this.Og, b, c, this);
        if (m(d)) {
            var e = new Om(null);
            Qm(e, d);
            return e
        }
    };
    l.kg = function (b, c) {
        var d = U([], this.Qg, b, c, this);
        if (m(d)) {
            var e = new Sm(null);
            Um(e, d);
            return e
        }
    };
    l.ag = function (b, c) {
        sq(this.Tg, b, c, this)
    };
    l.zf = function (b, c) {
        sq(this.Mg, b, c, this)
    };
    l.bg = function (b, c) {
        sq(this.Ug, b, c, this)
    };
    l.Vd = function (b, c) {
        var d = this.Td(b, c);
        if (null != d) {
            var e = new K(null);
            Nm(e, "XYZ", d);
            return e
        }
    };
    l.zl = function (b, c) {
        var d = U(null, this.Zc, b, c, this);
        if (null != d)return d
    };
    l.hg = function (b, c) {
        var d = this.Td(b, c);
        if (m(d)) {
            var e = new Gk(null);
            Hk(e, "XYZ", d);
            return e
        }
    };
    l.Wd = function (b, c) {
        var d = U([null], this.fe, b, c, this);
        if (m(d) && null !== d[0]) {
            var e = new F(null), f = d[0], g = [f.length], h, k;
            h = 1;
            for (k = d.length; h < k; ++h)ab(f, d[h]), g.push(f.length);
            Uk(e, "XYZ", f, g);
            return e
        }
    };
    l.Td = function (b, c) {
        return U(null, this.Zc, b, c, this)
    };
    l.Pg = Object({
        "http://www.opengis.net/gml": {
            pointMember: jq(xq.prototype.ag),
            pointMembers: jq(xq.prototype.ag)
        }
    });
    l.Og = Object({
        "http://www.opengis.net/gml": {
            lineStringMember: jq(xq.prototype.zf),
            lineStringMembers: jq(xq.prototype.zf)
        }
    });
    l.Qg = Object({
        "http://www.opengis.net/gml": {
            polygonMember: jq(xq.prototype.bg),
            polygonMembers: jq(xq.prototype.bg)
        }
    });
    l.Tg = Object({"http://www.opengis.net/gml": {Point: jq(xq.prototype.Td)}});
    l.Mg = Object({"http://www.opengis.net/gml": {LineString: jq(xq.prototype.Vd)}});
    l.Ug = Object({"http://www.opengis.net/gml": {Polygon: jq(xq.prototype.Wd)}});
    l.$c = Object({"http://www.opengis.net/gml": {LinearRing: kq(xq.prototype.zl)}});
    l.Ob = function (b, c) {
        var d = {featureType: this.featureType, featureNS: this.featureNS};
        m(c) && Db(d, up(this, b, c));
        return this.Sd(b, [d])
    };
    l.Xd = function (b) {
        return Be(m(this.q) ? this.q : b.firstElementChild.getAttribute("srsName"))
    };
    function yq(b) {
        b = Op(b, !1);
        return zq(b)
    }

    function zq(b) {
        if (b = /^\s*(true|1)|(false|0)\s*$/.exec(b))return m(b[1]) || !1
    }

    function Aq(b) {
        b = Op(b, !1);
        if (b = /^\s*(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(Z|(?:([+\-])(\d{2})(?::(\d{2}))?))\s*$/.exec(b)) {
            var c = Date.UTC(parseInt(b[1], 10), parseInt(b[2], 10) - 1, parseInt(b[3], 10), parseInt(b[4], 10), parseInt(b[5], 10), parseInt(b[6], 10)) / 1E3;
            if ("Z" != b[7]) {
                var d = "-" == b[8] ? -1 : 1, c = c + 60 * d * parseInt(b[9], 10);
                m(b[10]) && (c += 3600 * d * parseInt(b[10], 10))
            }
            return c
        }
    }

    function Bq(b) {
        b = Op(b, !1);
        return Cq(b)
    }

    function Cq(b) {
        if (b = /^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*$/i.exec(b))return parseFloat(b[1])
    }

    function Dq(b) {
        b = Op(b, !1);
        return Eq(b)
    }

    function Eq(b) {
        if (b = /^\s*(\d+)\s*$/.exec(b))return parseInt(b[1], 10)
    }

    function V(b) {
        b = Op(b, !1);
        return Aa(b)
    }

    function Fq(b, c) {
        Gq(b, c ? "1" : "0")
    }

    function Hq(b, c) {
        b.appendChild(Kp.createTextNode(c.toPrecision()))
    }

    function Iq(b, c) {
        b.appendChild(Kp.createTextNode(c.toString()))
    }

    function Gq(b, c) {
        b.appendChild(Kp.createTextNode(c))
    };
    function Jq(b) {
        b = m(b) ? b : {};
        xq.call(this, b);
        this.n = m(b.surface) ? b.surface : !1;
        this.f = m(b.curve) ? b.curve : !1;
        this.e = m(b.multiCurve) ? b.multiCurve : !0;
        this.g = m(b.multiSurface) ? b.multiSurface : !0;
        this.schemaLocation = m(b.schemaLocation) ? b.schemaLocation : "http://www.opengis.net/gml http://schemas.opengis.net/gml/3.1.1/profiles/gmlsfProfile/1.0.0/gmlsf.xsd"
    }

    v(Jq, xq);
    l = Jq.prototype;
    l.Cl = function (b, c) {
        var d = U([], this.Ng, b, c, this);
        if (m(d)) {
            var e = new Om(null);
            Qm(e, d);
            return e
        }
    };
    l.Dl = function (b, c) {
        var d = U([], this.Rg, b, c, this);
        if (m(d)) {
            var e = new Sm(null);
            Um(e, d);
            return e
        }
    };
    l.hf = function (b, c) {
        sq(this.Jg, b, c, this)
    };
    l.wg = function (b, c) {
        sq(this.Xg, b, c, this)
    };
    l.Gl = function (b, c) {
        return U([null], this.Sg, b, c, this)
    };
    l.Il = function (b, c) {
        return U([null], this.Wg, b, c, this)
    };
    l.Hl = function (b, c) {
        return U([null], this.fe, b, c, this)
    };
    l.Bl = function (b, c) {
        return U([null], this.Zc, b, c, this)
    };
    l.Ui = function (b, c) {
        var d = U(void 0, this.$c, b, c, this);
        m(d) && c[c.length - 1].push(d)
    };
    l.th = function (b, c) {
        var d = U(void 0, this.$c, b, c, this);
        m(d) && (c[c.length - 1][0] = d)
    };
    l.mg = function (b, c) {
        var d = U([null], this.Yg, b, c, this);
        if (m(d) && null !== d[0]) {
            var e = new F(null), f = d[0], g = [f.length], h, k;
            h = 1;
            for (k = d.length; h < k; ++h)ab(f, d[h]), g.push(f.length);
            Uk(e, "XYZ", f, g);
            return e
        }
    };
    l.dg = function (b, c) {
        var d = U([null], this.Kg, b, c, this);
        if (m(d)) {
            var e = new K(null);
            Nm(e, "XYZ", d);
            return e
        }
    };
    l.yl = function (b, c) {
        var d = U([null], this.Lg, b, c, this);
        return Wd(d[1][0], d[1][1], d[2][0], d[2][1])
    };
    l.Al = function (b, c) {
        for (var d = Op(b, !1), e = /^\s*([+\-]?\d*\.?\d+(?:[eE][+\-]?\d+)?)\s*/, f = [], g; g = e.exec(d);)f.push(parseFloat(g[1])), d = d.substr(g[0].length);
        if ("" === d) {
            d = c[0].srsName;
            e = "enu";
            null === d || (e = ze(Be(d)));
            if ("neu" === e)for (d = 0, e = f.length; d < e; d += 3)g = f[d], f[d] = f[d + 1], f[d + 1] = g;
            d = f.length;
            2 == d && f.push(0);
            return 0 === d ? void 0 : f
        }
    };
    l.Ie = function (b, c) {
        var d = Op(b, !1).replace(/^\s*|\s*$/g, ""), e = c[0].srsName, f = b.parentNode.getAttribute("srsDimension"), g = "enu";
        null === e || (g = ze(Be(e)));
        d = d.split(/\s+/);
        e = 2;
        fa(b.getAttribute("srsDimension")) ? fa(b.getAttribute("dimension")) ? null === f || (e = Eq(f)) : e = Eq(b.getAttribute("dimension")) : e = Eq(b.getAttribute("srsDimension"));
        for (var h, k, n = [], p = 0, q = d.length; p < q; p += e)f = parseFloat(d[p]), h = parseFloat(d[p + 1]), k = 3 === e ? parseFloat(d[p + 2]) : 0, "en" === g.substr(0, 2) ? n.push(f, h, k) : n.push(h, f, k);
        return n
    };
    l.Zc = Object({"http://www.opengis.net/gml": {pos: kq(Jq.prototype.Al), posList: kq(Jq.prototype.Ie)}});
    l.fe = Object({"http://www.opengis.net/gml": {interior: Jq.prototype.Ui, exterior: Jq.prototype.th}});
    l.Ue = Object({
        "http://www.opengis.net/gml": {
            Point: kq(xq.prototype.lg),
            MultiPoint: kq(xq.prototype.jg),
            LineString: kq(xq.prototype.Vd),
            MultiLineString: kq(xq.prototype.ig),
            LinearRing: kq(xq.prototype.hg),
            Polygon: kq(xq.prototype.Wd),
            MultiPolygon: kq(xq.prototype.kg),
            Surface: kq(Jq.prototype.mg),
            MultiSurface: kq(Jq.prototype.Dl),
            Curve: kq(Jq.prototype.dg),
            MultiCurve: kq(Jq.prototype.Cl),
            Envelope: kq(Jq.prototype.yl)
        }
    });
    l.Ng = Object({
        "http://www.opengis.net/gml": {
            curveMember: jq(Jq.prototype.hf),
            curveMembers: jq(Jq.prototype.hf)
        }
    });
    l.Rg = Object({
        "http://www.opengis.net/gml": {
            surfaceMember: jq(Jq.prototype.wg),
            surfaceMembers: jq(Jq.prototype.wg)
        }
    });
    l.Jg = Object({"http://www.opengis.net/gml": {LineString: jq(xq.prototype.Vd), Curve: jq(Jq.prototype.dg)}});
    l.Xg = Object({"http://www.opengis.net/gml": {Polygon: jq(xq.prototype.Wd), Surface: jq(Jq.prototype.mg)}});
    l.Yg = Object({"http://www.opengis.net/gml": {patches: kq(Jq.prototype.Gl)}});
    l.Kg = Object({"http://www.opengis.net/gml": {segments: kq(Jq.prototype.Il)}});
    l.Lg = Object({"http://www.opengis.net/gml": {lowerCorner: jq(Jq.prototype.Ie), upperCorner: jq(Jq.prototype.Ie)}});
    l.Sg = Object({"http://www.opengis.net/gml": {PolygonPatch: kq(Jq.prototype.Hl)}});
    l.Wg = Object({"http://www.opengis.net/gml": {LineStringSegment: kq(Jq.prototype.Bl)}});
    function Kq(b, c, d) {
        d = d[d.length - 1].srsName;
        c = c.Q();
        for (var e = c.length, f = Array(e), g, h = 0; h < e; ++h) {
            g = c[h];
            var k = h, n = "enu";
            null != d && (n = ze(Be(d)));
            f[k] = "en" === n.substr(0, 2) ? g[0] + " " + g[1] : g[1] + " " + g[0]
        }
        Gq(b, f.join(" "))
    }

    l.Fg = function (b, c, d) {
        var e = d[d.length - 1].srsName;
        null != e && b.setAttribute("srsName", e);
        e = Np(b.namespaceURI, "pos");
        b.appendChild(e);
        d = d[d.length - 1].srsName;
        b = "enu";
        null != d && (b = ze(Be(d)));
        c = c.Q();
        Gq(e, "en" === b.substr(0, 2) ? c[0] + " " + c[1] : c[1] + " " + c[0])
    };
    var Lq = {"http://www.opengis.net/gml": {lowerCorner: T(Gq), upperCorner: T(Gq)}};
    l = Jq.prototype;
    l.sm = function (b, c, d) {
        var e = d[d.length - 1].srsName;
        m(e) && b.setAttribute("srsName", e);
        tq({node: b}, Lq, qq, [c[0] + " " + c[1], c[2] + " " + c[3]], d, ["lowerCorner", "upperCorner"], this)
    };
    l.Cg = function (b, c, d) {
        var e = d[d.length - 1].srsName;
        null != e && b.setAttribute("srsName", e);
        e = Np(b.namespaceURI, "posList");
        b.appendChild(e);
        Kq(e, c, d)
    };
    l.Vg = function (b, c) {
        var d = c[c.length - 1], e = d.node, f = d.exteriorWritten;
        m(f) || (d.exteriorWritten = !0);
        return Np(e.namespaceURI, m(f) ? "interior" : "exterior")
    };
    l.ee = function (b, c, d) {
        var e = d[d.length - 1].srsName;
        "PolygonPatch" !== b.nodeName && null != e && b.setAttribute("srsName", e);
        "Polygon" === b.nodeName || "PolygonPatch" === b.nodeName ? (c = c.ld(), tq({
            node: b,
            srsName: e
        }, Mq, this.Vg, c, d, void 0, this)) : "Surface" === b.nodeName && (e = Np(b.namespaceURI, "patches"), b.appendChild(e), b = Np(e.namespaceURI, "PolygonPatch"), e.appendChild(b), this.ee(b, c, d))
    };
    l.ae = function (b, c, d) {
        var e = d[d.length - 1].srsName;
        "LineStringSegment" !== b.nodeName && null != e && b.setAttribute("srsName", e);
        "LineString" === b.nodeName || "LineStringSegment" === b.nodeName ? (e = Np(b.namespaceURI, "posList"), b.appendChild(e), Kq(e, c, d)) : "Curve" === b.nodeName && (e = Np(b.namespaceURI, "segments"), b.appendChild(e), b = Np(e.namespaceURI, "LineStringSegment"), e.appendChild(b), this.ae(b, c, d))
    };
    l.Eg = function (b, c, d) {
        var e = d[d.length - 1], f = e.srsName, e = e.surface;
        null != f && b.setAttribute("srsName", f);
        c = c.qd();
        tq({node: b, srsName: f, surface: e}, Nq, this.c, c, d, void 0, this)
    };
    l.wm = function (b, c, d) {
        var e = d[d.length - 1].srsName;
        null != e && b.setAttribute("srsName", e);
        c = c.Gd();
        tq({node: b, srsName: e}, Oq, oq("pointMember"), c, d, void 0, this)
    };
    l.Dg = function (b, c, d) {
        var e = d[d.length - 1], f = e.srsName, e = e.curve;
        null != f && b.setAttribute("srsName", f);
        c = c.Lc();
        tq({node: b, srsName: f, curve: e}, Pq, this.c, c, d, void 0, this)
    };
    l.Gg = function (b, c, d) {
        var e = Np(b.namespaceURI, "LinearRing");
        b.appendChild(e);
        this.Cg(e, c, d)
    };
    l.Hg = function (b, c, d) {
        var e = this.b(c, d);
        m(e) && (b.appendChild(e), this.ee(e, c, d))
    };
    l.zm = function (b, c, d) {
        var e = Np(b.namespaceURI, "Point");
        b.appendChild(e);
        this.Fg(e, c, d)
    };
    l.Bg = function (b, c, d) {
        var e = this.b(c, d);
        m(e) && (b.appendChild(e), this.ae(e, c, d))
    };
    l.de = function (b, c, d) {
        var e = d[d.length - 1], f = Bb(e);
        f.node = b;
        var g;
        ga(c) ? m(e.dataProjection) ? g = Ve(c, e.featureProjection, e.dataProjection) : g = c : g = wp(c, !0, e);
        tq(f, Qq, this.b, [g], d, void 0, this)
    };
    l.yg = function (b, c, d) {
        var e = c.aa;
        m(e) && b.setAttribute("fid", e);
        var e = d[d.length - 1], f = e.featureNS, g = c.b;
        m(e.ec) || (e.ec = {}, e.ec[f] = {});
        var h = c.I();
        c = [];
        var k = [], n;
        for (n in h) {
            var p = h[n];
            null !== p && (c.push(n), k.push(p), n == g ? n in e.ec[f] || (e.ec[f][n] = T(this.de, this)) : n in e.ec[f] || (e.ec[f][n] = T(Gq)))
        }
        n = Bb(e);
        n.node = b;
        tq(n, e.ec, oq(void 0, f), k, d, c)
    };
    var Nq = {
        "http://www.opengis.net/gml": {
            surfaceMember: T(Jq.prototype.Hg),
            polygonMember: T(Jq.prototype.Hg)
        }
    }, Oq = {"http://www.opengis.net/gml": {pointMember: T(Jq.prototype.zm)}}, Pq = {
        "http://www.opengis.net/gml": {
            lineStringMember: T(Jq.prototype.Bg),
            curveMember: T(Jq.prototype.Bg)
        }
    }, Mq = {"http://www.opengis.net/gml": {exterior: T(Jq.prototype.Gg), interior: T(Jq.prototype.Gg)}}, Qq = {
        "http://www.opengis.net/gml": {
            Curve: T(Jq.prototype.ae),
            MultiCurve: T(Jq.prototype.Dg),
            Point: T(Jq.prototype.Fg),
            MultiPoint: T(Jq.prototype.wm),
            LineString: T(Jq.prototype.ae),
            MultiLineString: T(Jq.prototype.Dg),
            LinearRing: T(Jq.prototype.Cg),
            Polygon: T(Jq.prototype.ee),
            MultiPolygon: T(Jq.prototype.Eg),
            Surface: T(Jq.prototype.ee),
            MultiSurface: T(Jq.prototype.Eg),
            Envelope: T(Jq.prototype.sm)
        }
    }, Rq = {
        MultiLineString: "lineStringMember",
        MultiCurve: "curveMember",
        MultiPolygon: "polygonMember",
        MultiSurface: "surfaceMember"
    };
    Jq.prototype.c = function (b, c) {
        return Np("http://www.opengis.net/gml", Rq[c[c.length - 1].node.nodeName])
    };
    Jq.prototype.b = function (b, c) {
        var d = c[c.length - 1], e = d.multiSurface, f = d.surface, g = d.curve, d = d.multiCurve, h;
        ga(b) ? h = "Envelope" : (h = b.O(), "MultiPolygon" === h && !0 === e ? h = "MultiSurface" : "Polygon" === h && !0 === f ? h = "Surface" : "LineString" === h && !0 === g ? h = "Curve" : "MultiLineString" === h && !0 === d && (h = "MultiCurve"));
        return Np("http://www.opengis.net/gml", h)
    };
    Jq.prototype.i = function (b, c) {
        c = vp(this, c);
        var d = Np("http://www.opengis.net/gml", "geom"), e = {
            node: d,
            srsName: this.srsName,
            curve: this.f,
            surface: this.n,
            multiSurface: this.g,
            multiCurve: this.e
        };
        m(c) && Db(e, c);
        this.de(d, b, [e]);
        return d
    };
    Jq.prototype.a = function (b, c) {
        c = vp(this, c);
        var d = Np("http://www.opengis.net/gml", "featureMembers");
        gq(d, "http://www.w3.org/2001/XMLSchema-instance", "xsi:schemaLocation", this.schemaLocation);
        var e = {
            srsName: this.srsName,
            curve: this.f,
            surface: this.n,
            multiSurface: this.g,
            multiCurve: this.e,
            featureNS: this.featureNS,
            featureType: this.featureType
        };
        m(c) && Db(e, c);
        var e = [e], f = e[e.length - 1], g = f.featureType, h = f.featureNS, k = {};
        k[h] = {};
        k[h][g] = T(this.yg, this);
        f = Bb(f);
        f.node = d;
        tq(f, k, oq(g, h), b, e);
        return d
    };
    function Sq(b) {
        b = m(b) ? b : {};
        xq.call(this, b);
        this.schemaLocation = m(b.schemaLocation) ? b.schemaLocation : "http://www.opengis.net/gml http://schemas.opengis.net/gml/2.1.2/feature.xsd"
    }

    v(Sq, xq);
    l = Sq.prototype;
    l.gg = function (b, c) {
        var d = Op(b, !1).replace(/^\s*|\s*$/g, ""), e = c[0].srsName, f = b.parentNode.getAttribute("srsDimension"), g = "enu";
        null === e || (g = ze(Be(e)));
        d = d.split(/[\s,]+/);
        e = 2;
        fa(b.getAttribute("srsDimension")) ? fa(b.getAttribute("dimension")) ? null === f || (e = Eq(f)) : e = Eq(b.getAttribute("dimension")) : e = Eq(b.getAttribute("srsDimension"));
        for (var h, k, n = [], p = 0, q = d.length; p < q; p += e)f = parseFloat(d[p]), h = parseFloat(d[p + 1]), k = 3 === e ? parseFloat(d[p + 2]) : 0, "en" === g.substr(0, 2) ? n.push(f, h, k) : n.push(h, f, k);
        return n
    };
    l.xl = function (b, c) {
        var d = U([null], this.Ig, b, c, this);
        return Wd(d[1][0], d[1][1], d[1][3], d[1][4])
    };
    l.Si = function (b, c) {
        var d = U(void 0, this.$c, b, c, this);
        m(d) && c[c.length - 1].push(d)
    };
    l.kl = function (b, c) {
        var d = U(void 0, this.$c, b, c, this);
        m(d) && (c[c.length - 1][0] = d)
    };
    l.Zc = Object({"http://www.opengis.net/gml": {coordinates: kq(Sq.prototype.gg)}});
    l.fe = Object({"http://www.opengis.net/gml": {innerBoundaryIs: Sq.prototype.Si, outerBoundaryIs: Sq.prototype.kl}});
    l.Ig = Object({"http://www.opengis.net/gml": {coordinates: jq(Sq.prototype.gg)}});
    l.Ue = Object({
        "http://www.opengis.net/gml": {
            Point: kq(xq.prototype.lg),
            MultiPoint: kq(xq.prototype.jg),
            LineString: kq(xq.prototype.Vd),
            MultiLineString: kq(xq.prototype.ig),
            LinearRing: kq(xq.prototype.hg),
            Polygon: kq(xq.prototype.Wd),
            MultiPolygon: kq(xq.prototype.kg),
            Box: kq(Sq.prototype.xl)
        }
    });
    function Tq(b) {
        b = m(b) ? b : {};
        this.defaultDataProjection = null;
        this.defaultDataProjection = Be("EPSG:4326");
        this.d = b.readExtensions
    }

    v(Tq, uq);
    var Uq = [null, "http://www.topografix.com/GPX/1/0", "http://www.topografix.com/GPX/1/1"];

    function Vq(b, c, d) {
        b.push(parseFloat(c.getAttribute("lon")), parseFloat(c.getAttribute("lat")));
        "ele"in d ? (b.push(d.ele), yb(d, "ele")) : b.push(0);
        "time"in d ? (b.push(d.time), yb(d, "time")) : b.push(0);
        return b
    }

    function Wq(b, c) {
        var d = c[c.length - 1], e = b.getAttribute("href");
        null === e || (d.link = e);
        sq(Xq, b, c)
    }

    function Yq(b, c) {
        c[c.length - 1].extensionsNode_ = b
    }

    function Zq(b, c) {
        var d = c[0], e = U({flatCoordinates: []}, $q, b, c);
        if (m(e)) {
            var f = e.flatCoordinates;
            yb(e, "flatCoordinates");
            var g = new K(null);
            Nm(g, "XYZM", f);
            wp(g, !1, d);
            d = new P(g);
            d.C(e);
            return d
        }
    }

    function ar(b, c) {
        var d = c[0], e = U({flatCoordinates: [], ends: []}, br, b, c);
        if (m(e)) {
            var f = e.flatCoordinates;
            yb(e, "flatCoordinates");
            var g = e.ends;
            yb(e, "ends");
            var h = new Om(null);
            Pm(h, "XYZM", f, g);
            wp(h, !1, d);
            d = new P(h);
            d.C(e);
            return d
        }
    }

    function cr(b, c) {
        var d = c[0], e = U({}, dr, b, c);
        if (m(e)) {
            var f = Vq([], b, e), f = new Ik(f, "XYZM");
            wp(f, !1, d);
            d = new P(f);
            d.C(e);
            return d
        }
    }

    var er = {rte: Zq, trk: ar, wpt: cr}, fr = S(Uq, {
            rte: jq(Zq),
            trk: jq(ar),
            wpt: jq(cr)
        }), Xq = S(Uq, {text: R(V, "linkText"), type: R(V, "linkType")}), $q = S(Uq, {
            name: R(V),
            cmt: R(V),
            desc: R(V),
            src: R(V),
            link: Wq,
            number: R(Dq),
            extensions: Yq,
            type: R(V),
            rtept: function (b, c) {
                var d = U({}, gr, b, c);
                m(d) && Vq(c[c.length - 1].flatCoordinates, b, d)
            }
        }), gr = S(Uq, {ele: R(Bq), time: R(Aq)}), br = S(Uq, {
            name: R(V),
            cmt: R(V),
            desc: R(V),
            src: R(V),
            link: Wq,
            number: R(Dq),
            type: R(V),
            extensions: Yq,
            trkseg: function (b, c) {
                var d = c[c.length - 1];
                sq(hr, b, c);
                d.ends.push(d.flatCoordinates.length)
            }
        }),
        hr = S(Uq, {
            trkpt: function (b, c) {
                var d = U({}, ir, b, c);
                m(d) && Vq(c[c.length - 1].flatCoordinates, b, d)
            }
        }), ir = S(Uq, {ele: R(Bq), time: R(Aq)}), dr = S(Uq, {
            ele: R(Bq),
            time: R(Aq),
            magvar: R(Bq),
            geoidheight: R(Bq),
            name: R(V),
            cmt: R(V),
            desc: R(V),
            src: R(V),
            link: Wq,
            sym: R(V),
            type: R(V),
            fix: R(V),
            sat: R(Dq),
            hdop: R(Bq),
            vdop: R(Bq),
            pdop: R(Bq),
            ageofdgpsdata: R(Bq),
            dgpsid: R(Dq),
            extensions: Yq
        });

    function jr(b, c) {
        null === c && (c = []);
        for (var d = 0, e = c.length; d < e; ++d) {
            var f = c[d];
            if (m(b.d)) {
                var g = f.get("extensionsNode_") || null;
                b.d(f, g)
            }
            f.set("extensionsNode_", void 0)
        }
    }

    Tq.prototype.fg = function (b, c) {
        if (!Wa(Uq, b.namespaceURI))return null;
        var d = er[b.localName];
        if (!m(d))return null;
        d = d(b, [up(this, b, c)]);
        if (!m(d))return null;
        jr(this, [d]);
        return d
    };
    Tq.prototype.Ob = function (b, c) {
        if (!Wa(Uq, b.namespaceURI))return [];
        if ("gpx" == b.localName) {
            var d = U([], fr, b, [up(this, b, c)]);
            if (m(d))return jr(this, d), d
        }
        return []
    };
    function kr(b, c, d) {
        b.setAttribute("href", c);
        c = d[d.length - 1].properties;
        tq({node: b}, lr, qq, [c.linkText, c.linkType], d, mr)
    }

    function nr(b, c, d) {
        var e = d[d.length - 1], f = e.node.namespaceURI, g = e.properties;
        gq(b, null, "lat", c[1]);
        gq(b, null, "lon", c[0]);
        switch (e.geometryLayout) {
            case "XYZM":
                0 !== c[3] && (g.time = c[3]);
            case "XYZ":
                0 !== c[2] && (g.ele = c[2]);
                break;
            case "XYM":
                0 !== c[2] && (g.time = c[2])
        }
        c = or[f];
        e = rq(g, c);
        tq({node: b, properties: g}, pr, qq, e, d, c)
    }

    var mr = ["text", "type"], lr = mq(Uq, {
            text: T(Gq),
            type: T(Gq)
        }), qr = mq(Uq, "name cmt desc src link number type rtept".split(" ")), rr = mq(Uq, {
            name: T(Gq),
            cmt: T(Gq),
            desc: T(Gq),
            src: T(Gq),
            link: T(kr),
            number: T(Iq),
            type: T(Gq),
            rtept: nq(T(nr))
        }), sr = mq(Uq, "name cmt desc src link number type trkseg".split(" ")), vr = mq(Uq, {
            name: T(Gq),
            cmt: T(Gq),
            desc: T(Gq),
            src: T(Gq),
            link: T(kr),
            number: T(Iq),
            type: T(Gq),
            trkseg: nq(T(function (b, c, d) {
                tq({node: b, geometryLayout: c.a, properties: {}}, tr, ur, c.Q(), d)
            }))
        }), ur = oq("trkpt"), tr = mq(Uq, {trkpt: T(nr)}),
        or = mq(Uq, "ele time magvar geoidheight name cmt desc src link sym type fix sat hdop vdop pdop ageofdgpsdata dgpsid".split(" ")), pr = mq(Uq, {
            ele: T(Hq),
            time: T(function (b, c) {
                var d = new Date(1E3 * c), d = d.getUTCFullYear() + "-" + La(d.getUTCMonth() + 1) + "-" + La(d.getUTCDate()) + "T" + La(d.getUTCHours()) + ":" + La(d.getUTCMinutes()) + ":" + La(d.getUTCSeconds()) + "Z";
                b.appendChild(Kp.createTextNode(d))
            }),
            magvar: T(Hq),
            geoidheight: T(Hq),
            name: T(Gq),
            cmt: T(Gq),
            desc: T(Gq),
            src: T(Gq),
            link: T(kr),
            sym: T(Gq),
            type: T(Gq),
            fix: T(Gq),
            sat: T(Iq),
            hdop: T(Hq),
            vdop: T(Hq),
            pdop: T(Hq),
            ageofdgpsdata: T(Hq),
            dgpsid: T(Iq)
        }), wr = {Point: "wpt", LineString: "rte", MultiLineString: "trk"};

    function xr(b, c) {
        var d = b.R();
        if (m(d))return Np(c[c.length - 1].node.namespaceURI, wr[d.O()])
    }

    var yr = mq(Uq, {
        rte: T(function (b, c, d) {
            var e = d[0], f = c.I();
            b = {node: b, properties: f};
            c = c.R();
            m(c) && (c = wp(c, !0, e), b.geometryLayout = c.a, f.rtept = c.Q());
            e = qr[d[d.length - 1].node.namespaceURI];
            f = rq(f, e);
            tq(b, rr, qq, f, d, e)
        }), trk: T(function (b, c, d) {
            var e = d[0], f = c.I();
            b = {node: b, properties: f};
            c = c.R();
            m(c) && (c = wp(c, !0, e), f.trkseg = c.Lc());
            e = sr[d[d.length - 1].node.namespaceURI];
            f = rq(f, e);
            tq(b, vr, qq, f, d, e)
        }), wpt: T(function (b, c, d) {
            var e = d[0], f = d[d.length - 1];
            f.properties = c.I();
            c = c.R();
            m(c) && (c = wp(c, !0, e), f.geometryLayout =
                c.a, nr(b, c.Q(), d))
        })
    });
    Tq.prototype.a = function (b, c) {
        c = vp(this, c);
        var d = Np("http://www.topografix.com/GPX/1/1", "gpx");
        tq({node: d}, yr, xr, b, [c]);
        return d
    };
    function zr(b) {
        b = Ar(b);
        return Sa(b, function (b) {
            return b.b.substring(b.d, b.a)
        })
    }

    function Br(b, c, d) {
        this.b = b;
        this.d = c;
        this.a = d
    }

    function Ar(b) {
        for (var c = RegExp("\r\n|\r|\n", "g"), d = 0, e, f = []; e = c.exec(b);)d = new Br(b, d, e.index), f.push(d), d = c.lastIndex;
        d < b.length && (d = new Br(b, d, b.length), f.push(d));
        return f
    };
    function Cr() {
        this.defaultDataProjection = null
    }

    v(Cr, tp);
    l = Cr.prototype;
    l.O = function () {
        return "text"
    };
    l.Nb = function (b, c) {
        return this.Qc(ia(b) ? b : "", vp(this, c))
    };
    l.ma = function (b, c) {
        return this.He(ia(b) ? b : "", vp(this, c))
    };
    l.Rc = function (b, c) {
        return this.Sc(ia(b) ? b : "", vp(this, c))
    };
    l.Ja = function () {
        return this.defaultDataProjection
    };
    l.be = function (b, c) {
        return this.ce(b, vp(this, c))
    };
    l.Qb = function (b, c) {
        return this.zg(b, vp(this, c))
    };
    l.Xc = function (b, c) {
        return this.Yc(b, vp(this, c))
    };
    function Dr(b) {
        b = m(b) ? b : {};
        this.defaultDataProjection = null;
        this.defaultDataProjection = Be("EPSG:4326");
        this.a = m(b.altitudeMode) ? b.altitudeMode : "none"
    }

    v(Dr, Cr);
    var Er = /^B(\d{2})(\d{2})(\d{2})(\d{2})(\d{5})([NS])(\d{3})(\d{5})([EW])([AV])(\d{5})(\d{5})/, Fr = /^H.([A-Z]{3}).*?:(.*)/, Gr = /^HFDTE(\d{2})(\d{2})(\d{2})/;
    Dr.prototype.Qc = function (b, c) {
        var d = this.a, e = zr(b), f = {}, g = [], h = 2E3, k = 0, n = 1, p, q;
        p = 0;
        for (q = e.length; p < q; ++p) {
            var r = e[p], s;
            if ("B" == r.charAt(0)) {
                if (s = Er.exec(r)) {
                    var r = parseInt(s[1], 10), u = parseInt(s[2], 10), z = parseInt(s[3], 10), y = parseInt(s[4], 10) + parseInt(s[5], 10) / 6E4;
                    "S" == s[6] && (y = -y);
                    var A = parseInt(s[7], 10) + parseInt(s[8], 10) / 6E4;
                    "W" == s[9] && (A = -A);
                    g.push(A, y);
                    "none" != d && g.push("gps" == d ? parseInt(s[11], 10) : "barometric" == d ? parseInt(s[12], 10) : 0);
                    g.push(Date.UTC(h, k, n, r, u, z) / 1E3)
                }
            } else if ("H" == r.charAt(0))if (s =
                    Gr.exec(r))n = parseInt(s[1], 10), k = parseInt(s[2], 10) - 1, h = 2E3 + parseInt(s[3], 10); else if (s = Fr.exec(r))f[s[1]] = Aa(s[2]), Gr.exec(r)
        }
        if (0 === g.length)return null;
        e = new K(null);
        Nm(e, "none" == d ? "XYM" : "XYZM", g);
        d = new P(wp(e, !1, c));
        d.C(f);
        return d
    };
    Dr.prototype.He = function (b, c) {
        var d = this.Qc(b, c);
        return null === d ? [] : [d]
    };
    var Hr = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;

    function Ir(b) {
        if (Jr) {
            Jr = !1;
            var c = ba.location;
            if (c) {
                var d = c.href;
                if (d && (d = (d = Ir(d)[3] || null) ? decodeURI(d) : d) && d != c.hostname)throw Jr = !0, Error();
            }
        }
        return b.match(Hr)
    }

    var Jr = Ib;

    function Kr(b, c) {
        for (var d = b.split("&"), e = 0; e < d.length; e++) {
            var f = d[e].indexOf("="), g = null, h = null;
            0 <= f ? (g = d[e].substring(0, f), h = d[e].substring(f + 1)) : g = d[e];
            c(g, h ? decodeURIComponent(h.replace(/\+/g, " ")) : "")
        }
    }

    function Lr(b) {
        if (b[1]) {
            var c = b[0], d = c.indexOf("#");
            0 <= d && (b.push(c.substr(d)), b[0] = c = c.substr(0, d));
            d = c.indexOf("?");
            0 > d ? b[1] = "?" : d == c.length - 1 && (b[1] = void 0)
        }
        return b.join("")
    }

    function Mr(b, c, d) {
        if (ga(c))for (var e = 0; e < c.length; e++)Mr(b, String(c[e]), d); else null != c && d.push("&", b, "" === c ? "" : "=", encodeURIComponent(String(c)))
    }

    function Nr(b, c) {
        for (var d in c)Mr(d, c[d], b);
        return b
    };
    function Or(b, c) {
        var d;
        b instanceof Or ? (this.Yb = m(c) ? c : b.Yb, Pr(this, b.Pb), this.gc = b.gc, this.sb = b.sb, Qr(this, b.tc), this.rb = b.rb, Rr(this, b.a.clone()), this.Sb = b.Sb) : b && (d = Ir(String(b))) ? (this.Yb = !!c, Pr(this, d[1] || "", !0), this.gc = Sr(d[2] || ""), this.sb = Sr(d[3] || "", !0), Qr(this, d[4]), this.rb = Sr(d[5] || "", !0), Rr(this, d[6] || "", !0), this.Sb = Sr(d[7] || "")) : (this.Yb = !!c, this.a = new Tr(null, 0, this.Yb))
    }

    l = Or.prototype;
    l.Pb = "";
    l.gc = "";
    l.sb = "";
    l.tc = null;
    l.rb = "";
    l.Sb = "";
    l.Yb = !1;
    l.toString = function () {
        var b = [], c = this.Pb;
        c && b.push(Ur(c, Vr, !0), ":");
        if (c = this.sb) {
            b.push("//");
            var d = this.gc;
            d && b.push(Ur(d, Vr, !0), "@");
            b.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1"));
            c = this.tc;
            null != c && b.push(":", String(c))
        }
        if (c = this.rb)this.sb && "/" != c.charAt(0) && b.push("/"), b.push(Ur(c, "/" == c.charAt(0) ? Wr : Xr, !0));
        (c = this.a.toString()) && b.push("?", c);
        (c = this.Sb) && b.push("#", Ur(c, Yr));
        return b.join("")
    };
    l.clone = function () {
        return new Or(this)
    };
    function Pr(b, c, d) {
        b.Pb = d ? Sr(c, !0) : c;
        b.Pb && (b.Pb = b.Pb.replace(/:$/, ""))
    }

    function Qr(b, c) {
        if (c) {
            c = Number(c);
            if (isNaN(c) || 0 > c)throw Error("Bad port number " + c);
            b.tc = c
        } else b.tc = null
    }

    function Rr(b, c, d) {
        c instanceof Tr ? (b.a = c, Zr(b.a, b.Yb)) : (d || (c = Ur(c, $r)), b.a = new Tr(c, 0, b.Yb))
    }

    function as(b) {
        return b instanceof Or ? b.clone() : new Or(b, void 0)
    }

    function bs(b, c) {
        b instanceof Or || (b = as(b));
        c instanceof Or || (c = as(c));
        var d = b, e = c, f = d.clone(), g = !!e.Pb;
        g ? Pr(f, e.Pb) : g = !!e.gc;
        g ? f.gc = e.gc : g = !!e.sb;
        g ? f.sb = e.sb : g = null != e.tc;
        var h = e.rb;
        if (g)Qr(f, e.tc); else if (g = !!e.rb)if ("/" != h.charAt(0) && (d.sb && !d.rb ? h = "/" + h : (d = f.rb.lastIndexOf("/"), -1 != d && (h = f.rb.substr(0, d + 1) + h))), d = h, ".." == d || "." == d)h = ""; else if (-1 != d.indexOf("./") || -1 != d.indexOf("/.")) {
            for (var h = 0 == d.lastIndexOf("/", 0), d = d.split("/"), k = [], n = 0; n < d.length;) {
                var p = d[n++];
                "." == p ? h && n == d.length && k.push("") :
                    ".." == p ? ((1 < k.length || 1 == k.length && "" != k[0]) && k.pop(), h && n == d.length && k.push("")) : (k.push(p), h = !0)
            }
            h = k.join("/")
        } else h = d;
        g ? f.rb = h : g = "" !== e.a.toString();
        g ? Rr(f, Sr(e.a.toString())) : g = !!e.Sb;
        g && (f.Sb = e.Sb);
        return f
    }

    function Sr(b, c) {
        return b ? c ? decodeURI(b) : decodeURIComponent(b) : ""
    }

    function Ur(b, c, d) {
        return ia(b) ? (b = encodeURI(b).replace(c, cs), d && (b = b.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), b) : null
    }

    function cs(b) {
        b = b.charCodeAt(0);
        return "%" + (b >> 4 & 15).toString(16) + (b & 15).toString(16)
    }

    var Vr = /[#\/\?@]/g, Xr = /[\#\?:]/g, Wr = /[\#\?]/g, $r = /[\#\?@]/g, Yr = /#/g;

    function Tr(b, c, d) {
        this.a = b || null;
        this.d = !!d
    }

    function ds(b) {
        b.ga || (b.ga = new th, b.ya = 0, b.a && Kr(b.a, function (c, d) {
            b.add(decodeURIComponent(c.replace(/\+/g, " ")), d)
        }))
    }

    l = Tr.prototype;
    l.ga = null;
    l.ya = null;
    l.Tb = function () {
        ds(this);
        return this.ya
    };
    l.add = function (b, c) {
        ds(this);
        this.a = null;
        b = es(this, b);
        var d = this.ga.get(b);
        d || this.ga.set(b, d = []);
        d.push(c);
        this.ya++;
        return this
    };
    l.remove = function (b) {
        ds(this);
        b = es(this, b);
        return vh(this.ga.d, b) ? (this.a = null, this.ya -= this.ga.get(b).length, this.ga.remove(b)) : !1
    };
    l.clear = function () {
        this.ga = this.a = null;
        this.ya = 0
    };
    l.la = function () {
        ds(this);
        return 0 == this.ya
    };
    function fs(b, c) {
        ds(b);
        c = es(b, c);
        return vh(b.ga.d, c)
    }

    l.G = function () {
        ds(this);
        for (var b = this.ga.ob(), c = this.ga.G(), d = [], e = 0; e < c.length; e++)for (var f = b[e], g = 0; g < f.length; g++)d.push(c[e]);
        return d
    };
    l.ob = function (b) {
        ds(this);
        var c = [];
        if (ia(b))fs(this, b) && (c = Ya(c, this.ga.get(es(this, b)))); else {
            b = this.ga.ob();
            for (var d = 0; d < b.length; d++)c = Ya(c, b[d])
        }
        return c
    };
    l.set = function (b, c) {
        ds(this);
        this.a = null;
        b = es(this, b);
        fs(this, b) && (this.ya -= this.ga.get(b).length);
        this.ga.set(b, [c]);
        this.ya++;
        return this
    };
    l.get = function (b, c) {
        var d = b ? this.ob(b) : [];
        return 0 < d.length ? String(d[0]) : c
    };
    function gs(b, c, d) {
        b.remove(c);
        0 < d.length && (b.a = null, b.ga.set(es(b, c), $a(d)), b.ya += d.length)
    }

    l.toString = function () {
        if (this.a)return this.a;
        if (!this.ga)return "";
        for (var b = [], c = this.ga.G(), d = 0; d < c.length; d++)for (var e = c[d], f = encodeURIComponent(String(e)), e = this.ob(e), g = 0; g < e.length; g++) {
            var h = f;
            "" !== e[g] && (h += "=" + encodeURIComponent(String(e[g])));
            b.push(h)
        }
        return this.a = b.join("&")
    };
    l.clone = function () {
        var b = new Tr;
        b.a = this.a;
        this.ga && (b.ga = this.ga.clone(), b.ya = this.ya);
        return b
    };
    function es(b, c) {
        var d = String(c);
        b.d && (d = d.toLowerCase());
        return d
    }

    function Zr(b, c) {
        c && !b.d && (ds(b), b.a = null, b.ga.forEach(function (b, c) {
            var f = c.toLowerCase();
            c != f && (this.remove(c), gs(this, f, b))
        }, b));
        b.d = c
    };
    function hs(b) {
        b = m(b) ? b : {};
        this.c = b.font;
        this.f = b.rotation;
        this.d = b.scale;
        this.b = b.text;
        this.g = b.textAlign;
        this.n = b.textBaseline;
        this.a = m(b.fill) ? b.fill : null;
        this.e = m(b.stroke) ? b.stroke : null;
        this.i = m(b.offsetX) ? b.offsetX : 0;
        this.k = m(b.offsetY) ? b.offsetY : 0
    }

    l = hs.prototype;
    l.Gh = function () {
        return this.c
    };
    l.Wh = function () {
        return this.i
    };
    l.Xh = function () {
        return this.k
    };
    l.Vk = function () {
        return this.a
    };
    l.Wk = function () {
        return this.f
    };
    l.Xk = function () {
        return this.d
    };
    l.Yk = function () {
        return this.e
    };
    l.Zk = function () {
        return this.b
    };
    l.di = function () {
        return this.g
    };
    l.ei = function () {
        return this.n
    };
    l.Xl = function (b) {
        this.c = b
    };
    l.Wl = function (b) {
        this.a = b
    };
    l.$k = function (b) {
        this.f = b
    };
    l.al = function (b) {
        this.d = b
    };
    l.cm = function (b) {
        this.e = b
    };
    l.dm = function (b) {
        this.b = b
    };
    l.em = function (b) {
        this.g = b
    };
    l.fm = function (b) {
        this.n = b
    };
    function is(b) {
        function c(b) {
            return ga(b) ? b : ia(b) ? (!(b in e) && "#" + b in e && (b = "#" + b), c(e[b])) : d
        }

        b = m(b) ? b : {};
        this.defaultDataProjection = null;
        this.defaultDataProjection = Be("EPSG:4326");
        var d = m(b.defaultStyle) ? b.defaultStyle : js, e = {};
        this.b = m(b.extractStyles) ? b.extractStyles : !0;
        this.d = e;
        this.c = function () {
            var b = this.get("Style");
            if (m(b))return b;
            b = this.get("styleUrl");
            return m(b) ? c(b) : d
        }
    }

    v(is, uq);
    var ks = ["http://www.google.com/kml/ext/2.2"], ls = [null, "http://earth.google.com/kml/2.0", "http://earth.google.com/kml/2.1", "http://earth.google.com/kml/2.2", "http://www.opengis.net/kml/2.2"], ms = [255, 255, 255, 1], ns = new nl({color: ms}), os = [20, 2], ps = [64, 64], qs = new vj({
        anchor: os,
        anchorOrigin: "bottom-left",
        anchorXUnits: "pixels",
        anchorYUnits: "pixels",
        crossOrigin: "anonymous",
        rotation: 0,
        scale: .5,
        size: ps,
        src: "https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png"
    }), rs = new jl({color: ms, width: 1}), ss = new hs({
        font: "normal 16px Helvetica",
        fill: ns, stroke: rs, scale: 1
    }), js = [new ql({fill: ns, image: qs, text: ss, stroke: rs, zIndex: 0})], ts = {
        fraction: "fraction",
        pixels: "pixels"
    };

    function us(b) {
        b = Op(b, !1);
        if (b = /^\s*#?\s*([0-9A-Fa-f]{8})\s*$/.exec(b))return b = b[1], [parseInt(b.substr(6, 2), 16), parseInt(b.substr(4, 2), 16), parseInt(b.substr(2, 2), 16), parseInt(b.substr(0, 2), 16) / 255]
    }

    function vs(b) {
        b = Op(b, !1);
        for (var c = [], d = /^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*,\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)(?:\s*,\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?))?\s*/i, e; e = d.exec(b);)c.push(parseFloat(e[1]), parseFloat(e[2]), e[3] ? parseFloat(e[3]) : 0), b = b.substr(e[0].length);
        return "" !== b ? void 0 : c
    }

    function ws(b) {
        var c = Op(b, !1);
        return null != b.baseURI ? bs(b.baseURI, Aa(c)).toString() : Aa(c)
    }

    function xs(b) {
        b = Bq(b);
        if (m(b))return Math.sqrt(b)
    }

    function ys(b, c) {
        return U(null, zs, b, c)
    }

    function As(b, c) {
        var d = U({j: [], xg: []}, Bs, b, c);
        if (m(d)) {
            var e = d.j, d = d.xg, f, g;
            f = 0;
            for (g = Math.min(e.length, d.length); f < g; ++f)e[4 * f + 3] = d[f];
            d = new K(null);
            Nm(d, "XYZM", e);
            return d
        }
    }

    function Cs(b, c) {
        var d = U(null, Ds, b, c);
        if (m(d)) {
            var e = new K(null);
            Nm(e, "XYZ", d);
            return e
        }
    }

    function Es(b, c) {
        var d = U(null, Ds, b, c);
        if (m(d)) {
            var e = new F(null);
            Uk(e, "XYZ", d, [d.length]);
            return e
        }
    }

    function Fs(b, c) {
        var d = U([], Gs, b, c);
        if (!m(d))return null;
        if (0 === d.length)return new Gm(d);
        var e = !0, f = d[0].O(), g, h, k;
        h = 1;
        for (k = d.length; h < k; ++h)if (g = d[h], g.O() != f) {
            e = !1;
            break
        }
        if (e) {
            if ("Point" == f) {
                g = d[0];
                e = g.a;
                f = g.j;
                h = 1;
                for (k = d.length; h < k; ++h)g = d[h], ab(f, g.j);
                d = new Rm(null);
                ok(d, e, f);
                d.l();
                return d
            }
            return "LineString" == f ? (g = new Om(null), Qm(g, d), g) : "Polygon" == f ? (g = new Sm(null), Um(g, d), g) : "GeometryCollection" == f ? new Gm(d) : null
        }
        return new Gm(d)
    }

    function Hs(b, c) {
        var d = U(null, Ds, b, c);
        if (null != d) {
            var e = new Ik(null);
            Jk(e, "XYZ", d);
            return e
        }
    }

    function Is(b, c) {
        var d = U([null], Js, b, c);
        if (null != d && null !== d[0]) {
            var e = new F(null), f = d[0], g = [f.length], h, k;
            h = 1;
            for (k = d.length; h < k; ++h)ab(f, d[h]), g.push(f.length);
            Uk(e, "XYZ", f, g);
            return e
        }
    }

    function Ks(b, c) {
        var d = U({}, Ls, b, c);
        if (!m(d))return null;
        var e = zb(d, "fillStyle", ns), f = d.fill;
        m(f) && !f && (e = null);
        var f = zb(d, "imageStyle", qs), g = zb(d, "textStyle", ss), h = zb(d, "strokeStyle", rs), d = d.outline;
        m(d) && !d && (h = null);
        return [new ql({fill: e, image: f, stroke: h, text: g, zIndex: void 0})]
    }

    function Ms(b, c) {
        sq(Ns, b, c)
    }

    var Os = S(ls, {value: kq(V)}), Ns = S(ls, {
            Data: function (b, c) {
                var d = b.getAttribute("name");
                if (null !== d) {
                    var e = U(void 0, Os, b, c);
                    m(e) && (c[c.length - 1][d] = e)
                }
            }, SchemaData: function (b, c) {
                sq(Ps, b, c)
            }
        }), zs = S(ls, {coordinates: kq(vs)}), Js = S(ls, {
            innerBoundaryIs: function (b, c) {
                var d = U(void 0, Qs, b, c);
                m(d) && c[c.length - 1].push(d)
            }, outerBoundaryIs: function (b, c) {
                var d = U(void 0, Rs, b, c);
                m(d) && (c[c.length - 1][0] = d)
            }
        }), Bs = S(ls, {
            when: function (b, c) {
                var d = c[c.length - 1].xg, e = Op(b, !1);
                if (e = /^\s*(\d{4})($|-(\d{2})($|-(\d{2})($|T(\d{2}):(\d{2}):(\d{2})(Z|(?:([+\-])(\d{2})(?::(\d{2}))?)))))\s*$/.exec(e)) {
                    var f =
                        Date.UTC(parseInt(e[1], 10), m(e[3]) ? parseInt(e[3], 10) - 1 : 0, m(e[5]) ? parseInt(e[5], 10) : 1, m(e[7]) ? parseInt(e[7], 10) : 0, m(e[8]) ? parseInt(e[8], 10) : 0, m(e[9]) ? parseInt(e[9], 10) : 0);
                    if (m(e[10]) && "Z" != e[10]) {
                        var g = "-" == e[11] ? -1 : 1, f = f + 60 * g * parseInt(e[12], 10);
                        m(e[13]) && (f += 3600 * g * parseInt(e[13], 10))
                    }
                    d.push(f)
                } else d.push(0)
            }
        }, S(ks, {
            coord: function (b, c) {
                var d = c[c.length - 1].j, e = Op(b, !1);
                (e = /^\s*([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s*$/i.exec(e)) ?
                    d.push(parseFloat(e[1]), parseFloat(e[2]), parseFloat(e[3]), 0) : d.push(0, 0, 0, 0)
            }
        })), Ds = S(ls, {coordinates: kq(vs)}), Ss = S(ls, {href: R(ws)}, S(ks, {
            x: R(Bq),
            y: R(Bq),
            w: R(Bq),
            h: R(Bq)
        })), Ts = S(ls, {
            Icon: R(function (b, c) {
                var d = U({}, Ss, b, c);
                return m(d) ? d : null
            }), heading: R(Bq), hotSpot: R(function (b) {
                var c = b.getAttribute("xunits"), d = b.getAttribute("yunits");
                return {x: parseFloat(b.getAttribute("x")), Re: ts[c], y: parseFloat(b.getAttribute("y")), Se: ts[d]}
            }), scale: R(xs)
        }), Qs = S(ls, {LinearRing: kq(ys)}), Us = S(ls, {color: R(us), scale: R(xs)}),
        Vs = S(ls, {color: R(us), width: R(Bq)}), Gs = S(ls, {
            LineString: jq(Cs),
            LinearRing: jq(Es),
            MultiGeometry: jq(Fs),
            Point: jq(Hs),
            Polygon: jq(Is)
        }), Ws = S(ks, {Track: jq(As)}), Ys = S(ls, {
            ExtendedData: Ms, Link: function (b, c) {
                sq(Xs, b, c)
            }, address: R(V), description: R(V), name: R(V), open: R(yq), phoneNumber: R(V), visibility: R(yq)
        }), Xs = S(ls, {href: R(ws)}), Rs = S(ls, {LinearRing: kq(ys)}), Zs = S(ls, {
            Style: R(Ks),
            key: R(V),
            styleUrl: R(function (b) {
                var c = Aa(Op(b, !1));
                return null != b.baseURI ? bs(b.baseURI, c).toString() : c
            })
        }), at = S(ls, {
            ExtendedData: Ms,
            MultiGeometry: R(Fs, "geometry"),
            LineString: R(Cs, "geometry"),
            LinearRing: R(Es, "geometry"),
            Point: R(Hs, "geometry"),
            Polygon: R(Is, "geometry"),
            Style: R(Ks),
            StyleMap: function (b, c) {
                var d = U(void 0, $s, b, c);
                if (m(d)) {
                    var e = c[c.length - 1];
                    ga(d) ? e.Style = d : ia(d) && (e.styleUrl = d)
                }
            },
            address: R(V),
            description: R(V),
            name: R(V),
            open: R(yq),
            phoneNumber: R(V),
            styleUrl: R(ws),
            visibility: R(yq)
        }, S(ks, {
            MultiTrack: R(function (b, c) {
                var d = U([], Ws, b, c);
                if (m(d)) {
                    var e = new Om(null);
                    Qm(e, d);
                    return e
                }
            }, "geometry"), Track: R(As, "geometry")
        })), bt =
            S(ls, {color: R(us), fill: R(yq), outline: R(yq)}), Ps = S(ls, {
            SimpleData: function (b, c) {
                var d = b.getAttribute("name");
                if (null !== d) {
                    var e = V(b);
                    c[c.length - 1][d] = e
                }
            }
        }), Ls = S(ls, {
            IconStyle: function (b, c) {
                var d = U({}, Ts, b, c);
                if (m(d)) {
                    var e = c[c.length - 1], f = zb(d, "Icon", {}), g;
                    g = f.href;
                    g = m(g) ? g : "https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png";
                    var h, k, n, p = d.hotSpot;
                    m(p) ? (h = [p.x, p.y], k = p.Re, n = p.Se) : "https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png" === g ? (h = os, n = k = "pixels") : /^http:\/\/maps\.(?:google|gstatic)\.com\//.test(g) &&
                    (h = [.5, 0], n = k = "fraction");
                    var q, p = f.x, r = f.y;
                    m(p) && m(r) && (q = [p, r]);
                    var s, p = f.w, f = f.h;
                    m(p) && m(f) && (s = [p, f]);
                    var u, f = d.heading;
                    m(f) && (u = Zb(f));
                    d = d.scale;
                    "https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png" == g && (s = ps);
                    h = new vj({
                        anchor: h,
                        anchorOrigin: "bottom-left",
                        anchorXUnits: k,
                        anchorYUnits: n,
                        crossOrigin: "anonymous",
                        offset: q,
                        offsetOrigin: "bottom-left",
                        rotation: u,
                        scale: d,
                        size: s,
                        src: g
                    });
                    e.imageStyle = h
                }
            }, LabelStyle: function (b, c) {
                var d = U({}, Us, b, c);
                m(d) && (c[c.length - 1].textStyle = new hs({
                    fill: new nl({
                        color: zb(d,
                            "color", ms)
                    }), scale: d.scale
                }))
            }, LineStyle: function (b, c) {
                var d = U({}, Vs, b, c);
                m(d) && (c[c.length - 1].strokeStyle = new jl({color: zb(d, "color", ms), width: zb(d, "width", 1)}))
            }, PolyStyle: function (b, c) {
                var d = U({}, bt, b, c);
                if (m(d)) {
                    var e = c[c.length - 1];
                    e.fillStyle = new nl({color: zb(d, "color", ms)});
                    var f = d.fill;
                    m(f) && (e.fill = f);
                    d = d.outline;
                    m(d) && (e.outline = d)
                }
            }
        }), $s = S(ls, {
            Pair: function (b, c) {
                var d = U({}, Zs, b, c);
                if (m(d)) {
                    var e = d.key;
                    m(e) && "normal" == e && (e = d.styleUrl, m(e) && (c[c.length - 1] = e), d = d.Style, m(d) && (c[c.length -
                    1] = d))
                }
            }
        });
    l = is.prototype;
    l.eg = function (b, c) {
        Sp(b);
        var d = S(ls, {
            Folder: iq(this.eg, this),
            Placemark: jq(this.Je, this),
            Style: ra(this.Kl, this),
            StyleMap: ra(this.Jl, this)
        }), d = U([], d, b, c, this);
        if (m(d))return d
    };
    l.Je = function (b, c) {
        var d = U({geometry: null}, at, b, c);
        if (m(d)) {
            var e = new P, f = b.getAttribute("id");
            null === f || e.c(f);
            f = c[0];
            null != d.geometry && wp(d.geometry, !1, f);
            e.C(d);
            this.b && e.i(this.c);
            return e
        }
    };
    l.Kl = function (b, c) {
        var d = b.getAttribute("id");
        if (null !== d) {
            var e = Ks(b, c);
            m(e) && (d = null != b.baseURI ? bs(b.baseURI, "#" + d).toString() : "#" + d, this.d[d] = e)
        }
    };
    l.Jl = function (b, c) {
        var d = b.getAttribute("id");
        if (null !== d) {
            var e = U(void 0, $s, b, c);
            m(e) && (d = null != b.baseURI ? bs(b.baseURI, "#" + d).toString() : "#" + d, this.d[d] = e)
        }
    };
    l.fg = function (b, c) {
        if (!Wa(ls, b.namespaceURI))return null;
        var d = this.Je(b, [up(this, b, c)]);
        return m(d) ? d : null
    };
    l.Ob = function (b, c) {
        if (!Wa(ls, b.namespaceURI))return [];
        var d;
        d = Sp(b);
        if ("Document" == d || "Folder" == d)return d = this.eg(b, [up(this, b, c)]), m(d) ? d : [];
        if ("Placemark" == d)return d = this.Je(b, [up(this, b, c)]), m(d) ? [d] : [];
        if ("kml" == d) {
            d = [];
            var e;
            for (e = b.firstElementChild; null !== e; e = e.nextElementSibling) {
                var f = this.Ob(e, c);
                m(f) && ab(d, f)
            }
            return d
        }
        return []
    };
    l.El = function (b) {
        if (Vp(b))return ct(this, b);
        if (Yp(b))return dt(this, b);
        if (ia(b))return b = hq(b), ct(this, b)
    };
    function ct(b, c) {
        var d;
        for (d = c.firstChild; null !== d; d = d.nextSibling)if (1 == d.nodeType) {
            var e = dt(b, d);
            if (m(e))return e
        }
    }

    function dt(b, c) {
        var d;
        for (d = c.firstElementChild; null !== d; d = d.nextElementSibling)if (Wa(ls, d.namespaceURI) && "name" == d.localName)return V(d);
        for (d = c.firstElementChild; null !== d; d = d.nextElementSibling) {
            var e = Sp(d);
            if (Wa(ls, d.namespaceURI) && ("Document" == e || "Folder" == e || "Placemark" == e || "kml" == e) && (e = dt(b, d), m(e)))return e
        }
    }

    l.Fl = function (b) {
        var c = [];
        Vp(b) ? ab(c, et(this, b)) : Yp(b) ? ab(c, ft(this, b)) : ia(b) && (b = hq(b), ab(c, et(this, b)));
        return c
    };
    function et(b, c) {
        var d, e = [];
        for (d = c.firstChild; null !== d; d = d.nextSibling)1 == d.nodeType && ab(e, ft(b, d));
        return e
    }

    function ft(b, c) {
        var d, e = [];
        for (d = c.firstElementChild; null !== d; d = d.nextElementSibling)if (Wa(ls, d.namespaceURI) && "NetworkLink" == d.localName) {
            var f = U({}, Ys, d, []);
            e.push(f)
        }
        for (d = c.firstElementChild; null !== d; d = d.nextElementSibling)f = Sp(d), !Wa(ls, d.namespaceURI) || "Document" != f && "Folder" != f && "kml" != f || ab(e, ft(b, d));
        return e
    }

    function gt(b, c) {
        var d = pg(c), d = [255 * (4 == d.length ? d[3] : 1), d[2], d[1], d[0]], e;
        for (e = 0; 4 > e; ++e) {
            var f = parseInt(d[e], 10).toString(16);
            d[e] = 1 == f.length ? "0" + f : f
        }
        Gq(b, d.join(""))
    }

    function ht(b, c, d) {
        tq({node: b}, it, jt, [c], d)
    }

    function kt(b, c, d) {
        var e = {node: b};
        null != c.aa && b.setAttribute("id", c.aa);
        b = c.I();
        var f = c.a;
        m(f) && (f = f.call(c, 0), null !== f && 0 < f.length && (b.Style = f[0], f = f[0].d, null === f || (b.name = f.b)));
        f = lt[d[d.length - 1].node.namespaceURI];
        b = rq(b, f);
        tq(e, mt, qq, b, d, f);
        b = d[0];
        c = c.R();
        null != c && (c = wp(c, !0, b));
        tq(e, mt, nt, [c], d)
    }

    function ot(b, c, d) {
        var e = c.j;
        b = {node: b};
        b.layout = c.a;
        b.stride = c.B;
        tq(b, pt, qt, [e], d)
    }

    function rt(b, c, d) {
        c = c.ld();
        var e = c.shift();
        b = {node: b};
        tq(b, st, tt, c, d);
        tq(b, st, ut, [e], d)
    }

    function vt(b, c) {
        Hq(b, c * c)
    }

    var wt = mq(ls, ["Document", "Placemark"]), zt = mq(ls, {
            Document: T(function (b, c, d) {
                tq({node: b}, xt, yt, c, d)
            }), Placemark: T(kt)
        }), xt = mq(ls, {Placemark: T(kt)}), At = {
            Point: "Point",
            LineString: "LineString",
            LinearRing: "LinearRing",
            Polygon: "Polygon",
            MultiPoint: "MultiGeometry",
            MultiLineString: "MultiGeometry",
            MultiPolygon: "MultiGeometry"
        }, Bt = mq(ls, ["href"], mq(ks, ["x", "y", "w", "h"])), Ct = mq(ls, {href: T(Gq)}, mq(ks, {
            x: T(Hq),
            y: T(Hq),
            w: T(Hq),
            h: T(Hq)
        })), Dt = mq(ls, ["scale", "heading", "Icon", "hotSpot"]), Ft = mq(ls, {
            Icon: T(function (b,
                              c, d) {
                b = {node: b};
                var e = Bt[d[d.length - 1].node.namespaceURI], f = rq(c, e);
                tq(b, Ct, qq, f, d, e);
                e = Bt[ks[0]];
                f = rq(c, e);
                tq(b, Ct, Et, f, d, e)
            }), heading: T(Hq), hotSpot: T(function (b, c) {
                b.setAttribute("x", c.x);
                b.setAttribute("y", c.y);
                b.setAttribute("xunits", c.Re);
                b.setAttribute("yunits", c.Se)
            }), scale: T(vt)
        }), Gt = mq(ls, ["color", "scale"]), Ht = mq(ls, {
            color: T(gt),
            scale: T(vt)
        }), It = mq(ls, ["color", "width"]), Jt = mq(ls, {
            color: T(gt),
            width: T(Hq)
        }), it = mq(ls, {LinearRing: T(ot)}), Kt = mq(ls, {LineString: T(ot), Point: T(ot), Polygon: T(rt)}),
        lt = mq(ls, "name open visibility address phoneNumber description styleUrl Style".split(" ")), mt = mq(ls, {
            MultiGeometry: T(function (b, c, d) {
                b = {node: b};
                var e = c.O(), f, g;
                "MultiPoint" == e ? (f = c.Gd(), g = Lt) : "MultiLineString" == e ? (f = c.Lc(), g = Mt) : "MultiPolygon" == e && (f = c.qd(), g = Nt);
                tq(b, Kt, g, f, d)
            }),
            LineString: T(ot),
            LinearRing: T(ot),
            Point: T(ot),
            Polygon: T(rt),
            Style: T(function (b, c, d) {
                b = {node: b};
                var e = {}, f = c.f, g = c.b, h = c.e;
                c = c.d;
                null === h || (e.IconStyle = h);
                null === c || (e.LabelStyle = c);
                null === g || (e.LineStyle = g);
                null === f || (e.PolyStyle =
                    f);
                c = Ot[d[d.length - 1].node.namespaceURI];
                e = rq(e, c);
                tq(b, Pt, qq, e, d, c)
            }),
            address: T(Gq),
            description: T(Gq),
            name: T(Gq),
            open: T(Fq),
            phoneNumber: T(Gq),
            styleUrl: T(Gq),
            visibility: T(Fq)
        }), pt = mq(ls, {
            coordinates: T(function (b, c, d) {
                d = d[d.length - 1];
                var e = d.layout;
                d = d.stride;
                var f;
                "XY" == e || "XYM" == e ? f = 2 : ("XYZ" == e || "XYZM" == e) && (f = 3);
                var g, h = c.length, k = "";
                if (0 < h) {
                    k += c[0];
                    for (e = 1; e < f; ++e)k += "," + c[e];
                    for (g = d; g < h; g += d)for (k += " " + c[g], e = 1; e < f; ++e)k += "," + c[g + e]
                }
                Gq(b, k)
            })
        }), st = mq(ls, {outerBoundaryIs: T(ht), innerBoundaryIs: T(ht)}),
        Qt = mq(ls, {color: T(gt)}), Ot = mq(ls, ["IconStyle", "LabelStyle", "LineStyle", "PolyStyle"]), Pt = mq(ls, {
            IconStyle: T(function (b, c, d) {
                b = {node: b};
                var e = {}, f = c.gb(), g = c.kd(), h = {href: c.a.e};
                if (null !== f) {
                    h.w = f[0];
                    h.h = f[1];
                    var k = c.wb(), n = c.Cb();
                    null !== n && null !== g && 0 !== n[0] && n[1] !== f[1] && (h.x = n[0], h.y = g[1] - (n[1] + f[1]));
                    null === k || 0 === k[0] || k[1] === f[1] || (e.hotSpot = {
                        x: k[0],
                        Re: "pixels",
                        y: f[1] - k[1],
                        Se: "pixels"
                    })
                }
                e.Icon = h;
                f = c.k;
                1 !== f && (e.scale = f);
                c = c.i;
                0 !== c && (e.heading = c);
                c = Dt[d[d.length - 1].node.namespaceURI];
                e = rq(e, c);
                tq(b, Ft, qq, e, d, c)
            }), LabelStyle: T(function (b, c, d) {
                b = {node: b};
                var e = {}, f = c.a;
                null === f || (e.color = f.a);
                c = c.d;
                m(c) && 1 !== c && (e.scale = c);
                c = Gt[d[d.length - 1].node.namespaceURI];
                e = rq(e, c);
                tq(b, Ht, qq, e, d, c)
            }), LineStyle: T(function (b, c, d) {
                b = {node: b};
                var e = It[d[d.length - 1].node.namespaceURI];
                c = rq({color: c.a, width: c.d}, e);
                tq(b, Jt, qq, c, d, e)
            }), PolyStyle: T(function (b, c, d) {
                tq({node: b}, Qt, Rt, [c.a], d)
            })
        });

    function Et(b, c, d) {
        return Np(ks[0], "gx:" + d)
    }

    function yt(b, c) {
        return Np(c[c.length - 1].node.namespaceURI, "Placemark")
    }

    function nt(b, c) {
        if (null != b)return Np(c[c.length - 1].node.namespaceURI, At[b.O()])
    }

    var Rt = oq("color"), qt = oq("coordinates"), tt = oq("innerBoundaryIs"), Lt = oq("Point"), Mt = oq("LineString"), jt = oq("LinearRing"), Nt = oq("Polygon"), ut = oq("outerBoundaryIs");
    is.prototype.a = function (b, c) {
        c = vp(this, c);
        var d = Np(ls[4], "kml");
        gq(d, "http://www.w3.org/2000/xmlns/", "xmlns:gx", ks[0]);
        gq(d, "http://www.w3.org/2000/xmlns/", "xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
        gq(d, "http://www.w3.org/2001/XMLSchema-instance", "xsi:schemaLocation", "http://www.opengis.net/kml/2.2 https://developers.google.com/kml/schema/kml22gx.xsd");
        var e = {node: d}, f = {};
        1 < b.length ? f.Document = b : 1 == b.length && (f.Placemark = b[0]);
        var g = wt[d.namespaceURI], f = rq(f, g);
        tq(e, zt, qq, f, [c], g);
        return d
    };
    function St() {
        this.defaultDataProjection = null;
        this.defaultDataProjection = Be("EPSG:4326")
    }

    v(St, uq);
    function Tt(b, c) {
        c[c.length - 1].Vc[b.getAttribute("k")] = b.getAttribute("v")
    }

    var Ut = [null], Vt = S(Ut, {
        nd: function (b, c) {
            c[c.length - 1].rc.push(b.getAttribute("ref"))
        }, tag: Tt
    }), Xt = S(Ut, {
        node: function (b, c) {
            var d = c[0], e = c[c.length - 1], f = b.getAttribute("id"), g = [parseFloat(b.getAttribute("lon")), parseFloat(b.getAttribute("lat"))];
            e.Cf[f] = g;
            var h = U({Vc: {}}, Wt, b, c);
            wb(h.Vc) || (g = new Ik(g), wp(g, !1, d), d = new P(g), d.c(f), d.C(h.Vc), e.features.push(d))
        }, way: function (b, c) {
            for (var d = c[0], e = b.getAttribute("id"), f = U({
                rc: [],
                Vc: {}
            }, Vt, b, c), g = c[c.length - 1], h = [], k = 0, n = f.rc.length; k < n; k++)ab(h, g.Cf[f.rc[k]]);
            f.rc[0] == f.rc[f.rc.length - 1] ? (k = new F(null), Uk(k, "XY", h, [h.length])) : (k = new K(null), Nm(k, "XY", h));
            wp(k, !1, d);
            d = new P(k);
            d.c(e);
            d.C(f.Vc);
            g.features.push(d)
        }
    }), Wt = S(Ut, {tag: Tt});
    St.prototype.Ob = function (b, c) {
        var d = up(this, b, c);
        return "osm" == b.localName && (d = U({Cf: {}, features: []}, Xt, b, [d]), m(d.features)) ? d.features : []
    };
    function Yt(b) {
        return b.getAttributeNS("http://www.w3.org/1999/xlink", "href")
    };
    function Zt() {
    }

    Zt.prototype.b = function (b) {
        return Vp(b) ? this.d(b) : Yp(b) ? this.a(b) : ia(b) ? (b = hq(b), this.d(b)) : null
    };
    function $t() {
    }

    v($t, Zt);
    $t.prototype.d = function (b) {
        for (b = b.firstChild; null !== b; b = b.nextSibling)if (1 == b.nodeType)return this.a(b);
        return null
    };
    $t.prototype.a = function (b) {
        b = U({}, au, b, []);
        return m(b) ? b : null
    };
    var bu = [null, "http://www.opengis.net/ows/1.1"], au = S(bu, {
        ServiceIdentification: R(function (b, c) {
            return U({}, cu, b, c)
        }), ServiceProvider: R(function (b, c) {
            return U({}, du, b, c)
        }), OperationsMetadata: R(function (b, c) {
            return U({}, eu, b, c)
        })
    }), fu = S(bu, {
        DeliveryPoint: R(V),
        City: R(V),
        AdministrativeArea: R(V),
        PostalCode: R(V),
        Country: R(V),
        ElectronicMailAddress: R(V)
    }), gu = S(bu, {
        Value: lq(function (b) {
            return V(b)
        })
    }), hu = S(bu, {
        AllowedValues: R(function (b, c) {
            return U({}, gu, b, c)
        })
    }), ju = S(bu, {
        Phone: R(function (b, c) {
            return U({},
                iu, b, c)
        }), Address: R(function (b, c) {
            return U({}, fu, b, c)
        })
    }), lu = S(bu, {
        HTTP: R(function (b, c) {
            return U({}, ku, b, c)
        })
    }), ku = S(bu, {
        Get: lq(function (b, c) {
            var d = Yt(b);
            return m(d) ? U({href: d}, mu, b, c) : void 0
        }), Post: void 0
    }), nu = S(bu, {
        DCP: R(function (b, c) {
            return U({}, lu, b, c)
        })
    }), eu = S(bu, {
        Operation: function (b, c) {
            var d = b.getAttribute("name"), e = U({}, nu, b, c);
            m(e) && (c[c.length - 1][d] = e)
        }
    }), iu = S(bu, {Voice: R(V), Facsimile: R(V)}), mu = S(bu, {
        Constraint: lq(function (b, c) {
            var d = b.getAttribute("name");
            return m(d) ? U({name: d}, hu, b, c) :
                void 0
        })
    }), ou = S(bu, {
        IndividualName: R(V), PositionName: R(V), ContactInfo: R(function (b, c) {
            return U({}, ju, b, c)
        })
    }), cu = S(bu, {Title: R(V), ServiceTypeVersion: R(V), ServiceType: R(V)}), du = S(bu, {
        ProviderName: R(V),
        ProviderSite: R(Yt),
        ServiceContact: R(function (b, c) {
            return U({}, ou, b, c)
        })
    });

    function pu(b, c, d, e) {
        var f;
        m(e) ? f = m(void 0) ? void 0 : 0 : (e = [], f = 0);
        var g, h;
        for (g = 0; g < c;)for (h = b[g++], e[f++] = b[g++], e[f++] = h, h = 2; h < d; ++h)e[f++] = b[g++];
        e.length = f
    };
    function qu(b) {
        b = m(b) ? b : {};
        this.defaultDataProjection = null;
        this.defaultDataProjection = Be("EPSG:4326");
        this.a = m(b.factor) ? b.factor : 1E5
    }

    v(qu, Cr);
    function ru(b, c, d) {
        d = m(d) ? d : 1E5;
        var e, f = Array(c);
        for (e = 0; e < c; ++e)f[e] = 0;
        var g, h;
        g = 0;
        for (h = b.length; g < h;)for (e = 0; e < c; ++e, ++g) {
            var k = b[g], n = k - f[e];
            f[e] = k;
            b[g] = n
        }
        return su(b, d)
    }

    function tu(b, c, d) {
        var e = m(d) ? d : 1E5, f = Array(c);
        for (d = 0; d < c; ++d)f[d] = 0;
        b = uu(b, e);
        var g, e = 0;
        for (g = b.length; e < g;)for (d = 0; d < c; ++d, ++e)f[d] += b[e], b[e] = f[d];
        return b
    }

    function su(b, c) {
        var d = m(c) ? c : 1E5, e, f;
        e = 0;
        for (f = b.length; e < f; ++e)b[e] = Math.round(b[e] * d);
        d = 0;
        for (e = b.length; d < e; ++d)f = b[d], b[d] = 0 > f ? ~(f << 1) : f << 1;
        d = "";
        e = 0;
        for (f = b.length; e < f; ++e) {
            for (var g = b[e], h = void 0, k = ""; 32 <= g;)h = (32 | g & 31) + 63, k += String.fromCharCode(h), g >>= 5;
            h = g + 63;
            k += String.fromCharCode(h);
            d += k
        }
        return d
    }

    function uu(b, c) {
        var d = m(c) ? c : 1E5, e = [], f = 0, g = 0, h, k;
        h = 0;
        for (k = b.length; h < k; ++h) {
            var n = b.charCodeAt(h) - 63, f = f | (n & 31) << g;
            32 > n ? (e.push(f), g = f = 0) : g += 5
        }
        f = 0;
        for (g = e.length; f < g; ++f)h = e[f], e[f] = h & 1 ? ~(h >> 1) : h >> 1;
        f = 0;
        for (g = e.length; f < g; ++f)e[f] /= d;
        return e
    }

    l = qu.prototype;
    l.Qc = function (b, c) {
        var d = this.Sc(b, c);
        return new P(d)
    };
    l.He = function (b, c) {
        return [this.Qc(b, c)]
    };
    l.Sc = function (b, c) {
        var d = tu(b, 2, this.a);
        pu(d, d.length, 2, d);
        d = Ck(d, 0, d.length, 2);
        return wp(new K(d), !1, vp(this, c))
    };
    l.ce = function (b, c) {
        var d = b.R();
        return null != d ? this.Yc(d, c) : ""
    };
    l.zg = function (b, c) {
        return this.ce(b[0], c)
    };
    l.Yc = function (b, c) {
        b = wp(b, !0, vp(this, c));
        var d = b.j, e = b.B;
        pu(d, d.length, e, d);
        return ru(d, e, this.a)
    };
    function vu(b) {
        b = m(b) ? b : {};
        this.defaultDataProjection = null;
        this.defaultDataProjection = Be(null != b.defaultDataProjection ? b.defaultDataProjection : "EPSG:4326")
    }

    v(vu, zp);
    function wu(b, c) {
        var d = [], e, f, g, h;
        g = 0;
        for (h = b.length; g < h; ++g)e = b[g], 0 < g && d.pop(), 0 <= e ? f = c[e] : f = c[~e].slice().reverse(), d.push.apply(d, f);
        e = 0;
        for (f = d.length; e < f; ++e)d[e] = d[e].slice();
        return d
    }

    function xu(b, c, d, e, f) {
        b = b.geometries;
        var g = [], h, k;
        h = 0;
        for (k = b.length; h < k; ++h)g[h] = yu(b[h], c, d, e, f);
        return g
    }

    function yu(b, c, d, e, f) {
        var g = b.type, h = zu[g];
        c = "Point" === g || "MultiPoint" === g ? h(b, d, e) : h(b, c);
        d = new P;
        d.Sa(wp(c, !1, f));
        m(b.id) && d.c(b.id);
        m(b.properties) && d.C(b.properties);
        return d
    }

    vu.prototype.b = function (b, c) {
        if ("Topology" == b.type) {
            var d, e = null, f = null;
            m(b.transform) && (d = b.transform, e = d.scale, f = d.translate);
            var g = b.arcs;
            if (m(d)) {
                d = e;
                var h = f, k, n;
                k = 0;
                for (n = g.length; k < n; ++k)for (var p = g[k], q = d, r = h, s = 0, u = 0, z = void 0, y = void 0, A = void 0, y = 0, A = p.length; y < A; ++y)z = p[y], s += z[0], u += z[1], z[0] = s, z[1] = u, Au(z, q, r)
            }
            d = [];
            h = rb(b.objects);
            k = 0;
            for (n = h.length; k < n; ++k)"GeometryCollection" === h[k].type ? (p = h[k], d.push.apply(d, xu(p, g, e, f, c))) : (p = h[k], d.push(yu(p, g, e, f, c)));
            return d
        }
        return []
    };
    function Au(b, c, d) {
        b[0] = b[0] * c[0] + d[0];
        b[1] = b[1] * c[1] + d[1]
    }

    vu.prototype.Ja = function () {
        return this.defaultDataProjection
    };
    var zu = {
        Point: function (b, c, d) {
            b = b.coordinates;
            null === c || null === d || Au(b, c, d);
            return new Ik(b)
        }, LineString: function (b, c) {
            var d = wu(b.arcs, c);
            return new K(d)
        }, Polygon: function (b, c) {
            var d = [], e, f;
            e = 0;
            for (f = b.arcs.length; e < f; ++e)d[e] = wu(b.arcs[e], c);
            return new F(d)
        }, MultiPoint: function (b, c, d) {
            b = b.coordinates;
            var e, f;
            if (null !== c && null !== d)for (e = 0, f = b.length; e < f; ++e)Au(b[e], c, d);
            return new Rm(b)
        }, MultiLineString: function (b, c) {
            var d = [], e, f;
            e = 0;
            for (f = b.arcs.length; e < f; ++e)d[e] = wu(b.arcs[e], c);
            return new Om(d)
        },
        MultiPolygon: function (b, c) {
            var d = [], e, f, g, h, k, n;
            k = 0;
            for (n = b.arcs.length; k < n; ++k) {
                e = b.arcs[k];
                f = [];
                g = 0;
                for (h = e.length; g < h; ++g)f[g] = wu(e[g], c);
                d[k] = f
            }
            return new Sm(d)
        }
    };

    function Bu(b) {
        b = m(b) ? b : {};
        this.f = b.featureType;
        this.b = b.featureNS;
        this.d = m(b.gmlFormat) ? b.gmlFormat : new Jq;
        this.c = m(b.schemaLocation) ? b.schemaLocation : "http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd";
        this.defaultDataProjection = null
    }

    v(Bu, uq);
    Bu.prototype.Ob = function (b, c) {
        var d = {featureType: this.f, featureNS: this.b};
        Db(d, up(this, b, m(c) ? c : {}));
        d = [d];
        this.d.d["http://www.opengis.net/gml"].featureMember = jq(xq.prototype.Sd);
        d = U([], this.d.d, b, d, this.d);
        m(d) || (d = []);
        return d
    };
    Bu.prototype.g = function (b) {
        if (Vp(b))return Cu(b);
        if (Yp(b))return U({}, Du, b, []);
        if (ia(b))return b = hq(b), Cu(b)
    };
    Bu.prototype.e = function (b) {
        if (Vp(b))return Eu(this, b);
        if (Yp(b))return Fu(this, b);
        if (ia(b))return b = hq(b), Eu(this, b)
    };
    function Eu(b, c) {
        for (var d = c.firstChild; null !== d; d = d.nextSibling)if (1 == d.nodeType)return Fu(b, d)
    }

    var Gu = {"http://www.opengis.net/gml": {boundedBy: R(xq.prototype.Ud, "bounds")}};

    function Fu(b, c) {
        var d = {}, e = Eq(c.getAttribute("numberOfFeatures"));
        d.numberOfFeatures = e;
        return U(d, Gu, c, [], b.d)
    }

    var Hu = {
        "http://www.opengis.net/wfs": {
            totalInserted: R(Dq),
            totalUpdated: R(Dq),
            totalDeleted: R(Dq)
        }
    }, Iu = {
        "http://www.opengis.net/ogc": {
            FeatureId: jq(function (b) {
                return b.getAttribute("fid")
            })
        }
    }, Ju = {
        "http://www.opengis.net/wfs": {
            Feature: function (b, c) {
                sq(Iu, b, c)
            }
        }
    }, Du = {
        "http://www.opengis.net/wfs": {
            TransactionSummary: R(function (b, c) {
                return U({}, Hu, b, c)
            }, "transactionSummary"), InsertResults: R(function (b, c) {
                return U([], Ju, b, c)
            }, "insertIds")
        }
    };

    function Cu(b) {
        for (b = b.firstChild; null !== b; b = b.nextSibling)if (1 == b.nodeType)return U({}, Du, b, [])
    }

    var Ku = {"http://www.opengis.net/wfs": {PropertyName: T(Gq)}};

    function Lu(b, c) {
        var d = Np("http://www.opengis.net/ogc", "Filter"), e = Np("http://www.opengis.net/ogc", "FeatureId");
        d.appendChild(e);
        e.setAttribute("fid", c);
        b.appendChild(d)
    }

    var Mu = {
        "http://www.opengis.net/wfs": {
            Insert: T(function (b, c, d) {
                var e = d[d.length - 1], e = Np(e.featureNS, e.featureType);
                b.appendChild(e);
                Jq.prototype.yg(e, c, d)
            }), Update: T(function (b, c, d) {
                var e = d[d.length - 1], f = e.featureType, g = e.featurePrefix, g = m(g) ? g : "feature", h = e.featureNS;
                b.setAttribute("typeName", g + ":" + f);
                gq(b, "http://www.w3.org/2000/xmlns/", "xmlns:" + g, h);
                f = c.aa;
                if (m(f)) {
                    for (var g = c.G(), h = [], k = 0, n = g.length; k < n; k++) {
                        var p = c.get(g[k]);
                        m(p) && h.push({name: g[k], value: p})
                    }
                    tq({node: b, srsName: e.srsName}, Mu,
                        oq("Property"), h, d);
                    Lu(b, f)
                }
            }), Delete: T(function (b, c, d) {
                var e = d[d.length - 1];
                d = e.featureType;
                var f = e.featurePrefix, f = m(f) ? f : "feature", e = e.featureNS;
                b.setAttribute("typeName", f + ":" + d);
                gq(b, "http://www.w3.org/2000/xmlns/", "xmlns:" + f, e);
                c = c.aa;
                m(c) && Lu(b, c)
            }), Property: T(function (b, c, d) {
                var e = Np("http://www.opengis.net/wfs", "Name");
                b.appendChild(e);
                Gq(e, c.name);
                null != c.value && (e = Np("http://www.opengis.net/wfs", "Value"), b.appendChild(e), c.value instanceof kk ? Jq.prototype.de(e, c.value, d) : Gq(e, c.value))
            }),
            Native: T(function (b, c) {
                m(c.rm) && b.setAttribute("vendorId", c.rm);
                m(c.Ul) && b.setAttribute("safeToIgnore", c.Ul);
                m(c.value) && Gq(b, c.value)
            })
        }
    }, Nu = {
        "http://www.opengis.net/wfs": {
            Query: T(function (b, c, d) {
                var e = d[d.length - 1], f = e.featurePrefix, g = e.featureNS, h = e.propertyNames, k = e.srsName;
                b.setAttribute("typeName", (m(f) ? f + ":" : "") + c);
                m(k) && b.setAttribute("srsName", k);
                m(g) && gq(b, "http://www.w3.org/2000/xmlns/", "xmlns:" + f, g);
                c = Bb(e);
                c.node = b;
                tq(c, Ku, oq("PropertyName"), h, d);
                e = e.bbox;
                m(e) && (h = Np("http://www.opengis.net/ogc",
                    "Filter"), c = d[d.length - 1].geometryName, f = Np("http://www.opengis.net/ogc", "BBOX"), h.appendChild(f), g = Np("http://www.opengis.net/ogc", "PropertyName"), Gq(g, c), f.appendChild(g), Jq.prototype.de(f, e, d), b.appendChild(h))
            })
        }
    };
    Bu.prototype.n = function (b) {
        var c = Np("http://www.opengis.net/wfs", "GetFeature");
        c.setAttribute("service", "WFS");
        c.setAttribute("version", "1.1.0");
        m(b) && (m(b.handle) && c.setAttribute("handle", b.handle), m(b.outputFormat) && c.setAttribute("outputFormat", b.outputFormat), m(b.maxFeatures) && c.setAttribute("maxFeatures", b.maxFeatures), m(b.resultType) && c.setAttribute("resultType", b.resultType), m(b.jm) && c.setAttribute("startIndex", b.jm), m(b.count) && c.setAttribute("count", b.count));
        gq(c, "http://www.w3.org/2001/XMLSchema-instance",
            "xsi:schemaLocation", this.c);
        var d = b.featureTypes;
        b = [{
            node: c,
            srsName: b.srsName,
            featureNS: m(b.featureNS) ? b.featureNS : this.b,
            featurePrefix: b.featurePrefix,
            geometryName: b.geometryName,
            bbox: b.bbox,
            cg: m(b.cg) ? b.cg : []
        }];
        var e = Bb(b[b.length - 1]);
        e.node = c;
        tq(e, Nu, oq("Query"), d, b);
        return c
    };
    Bu.prototype.q = function (b, c, d, e) {
        var f = [], g = Np("http://www.opengis.net/wfs", "Transaction");
        g.setAttribute("service", "WFS");
        g.setAttribute("version", "1.1.0");
        var h, k;
        m(e) && (h = m(e.gmlOptions) ? e.gmlOptions : {}, m(e.handle) && g.setAttribute("handle", e.handle));
        gq(g, "http://www.w3.org/2001/XMLSchema-instance", "xsi:schemaLocation", this.c);
        null != b && (k = {
            node: g,
            featureNS: e.featureNS,
            featureType: e.featureType,
            featurePrefix: e.featurePrefix
        }, Db(k, h), tq(k, Mu, oq("Insert"), b, f));
        null != c && (k = {
            node: g, featureNS: e.featureNS,
            featureType: e.featureType, featurePrefix: e.featurePrefix
        }, Db(k, h), tq(k, Mu, oq("Update"), c, f));
        null != d && tq({
            node: g,
            featureNS: e.featureNS,
            featureType: e.featureType,
            featurePrefix: e.featurePrefix
        }, Mu, oq("Delete"), d, f);
        m(e.nativeElements) && tq({
            node: g,
            featureNS: e.featureNS,
            featureType: e.featureType,
            featurePrefix: e.featurePrefix
        }, Mu, oq("Native"), e.nativeElements, f);
        return g
    };
    Bu.prototype.Ke = function (b) {
        for (b = b.firstChild; null !== b; b = b.nextSibling)if (1 == b.nodeType)return this.Xd(b);
        return null
    };
    Bu.prototype.Xd = function (b) {
        if (null != b.firstElementChild && null != b.firstElementChild.firstElementChild)for (b = b.firstElementChild.firstElementChild, b = b.firstElementChild; null !== b; b = b.nextElementSibling)if (0 !== b.childNodes.length && (1 !== b.childNodes.length || 3 !== b.firstChild.nodeType)) {
            var c = [{}];
            this.d.Ud(b, c);
            return Be(c.pop().srsName)
        }
        return null
    };
    function Ou(b) {
        b = m(b) ? b : {};
        this.defaultDataProjection = null;
        this.a = m(b.splitCollection) ? b.splitCollection : !1
    }

    v(Ou, Cr);
    function Pu(b) {
        b = b.Q();
        return 0 == b.length ? "" : b[0] + " " + b[1]
    }

    function Qu(b) {
        b = b.Q();
        for (var c = [], d = 0, e = b.length; d < e; ++d)c.push(b[d][0] + " " + b[d][1]);
        return c.join(",")
    }

    function Ru(b) {
        var c = [];
        b = b.ld();
        for (var d = 0, e = b.length; d < e; ++d)c.push("(" + Qu(b[d]) + ")");
        return c.join(",")
    }

    function Su(b) {
        var c = b.O();
        b = (0, Tu[c])(b);
        c = c.toUpperCase();
        return 0 === b.length ? c + " EMPTY" : c + "(" + b + ")"
    }

    var Tu = {
        Point: Pu, LineString: Qu, Polygon: Ru, MultiPoint: function (b) {
            var c = [];
            b = b.Gd();
            for (var d = 0, e = b.length; d < e; ++d)c.push("(" + Pu(b[d]) + ")");
            return c.join(",")
        }, MultiLineString: function (b) {
            var c = [];
            b = b.Lc();
            for (var d = 0, e = b.length; d < e; ++d)c.push("(" + Qu(b[d]) + ")");
            return c.join(",")
        }, MultiPolygon: function (b) {
            var c = [];
            b = b.qd();
            for (var d = 0, e = b.length; d < e; ++d)c.push("(" + Ru(b[d]) + ")");
            return c.join(",")
        }, GeometryCollection: function (b) {
            var c = [];
            b = b.nf();
            for (var d = 0, e = b.length; d < e; ++d)c.push(Su(b[d]));
            return c.join(",")
        }
    };
    l = Ou.prototype;
    l.Qc = function (b, c) {
        var d = this.Sc(b, c);
        if (m(d)) {
            var e = new P;
            e.Sa(d);
            return e
        }
        return null
    };
    l.He = function (b, c) {
        var d = [], e = this.Sc(b, c);
        this.a && "GeometryCollection" == e.O() ? d = e.c : d = [e];
        for (var f = [], g = 0, h = d.length; g < h; ++g)e = new P, e.Sa(d[g]), f.push(e);
        return f
    };
    l.Sc = function (b, c) {
        var d;
        d = new Uu(new Vu(b));
        d.a = Wu(d.d);
        d = Xu(d);
        return m(d) ? wp(d, !1, c) : null
    };
    l.ce = function (b, c) {
        var d = b.R();
        return m(d) ? this.Yc(d, c) : ""
    };
    l.zg = function (b, c) {
        if (1 == b.length)return this.ce(b[0], c);
        for (var d = [], e = 0, f = b.length; e < f; ++e)d.push(b[e].R());
        d = new Gm(d);
        return this.Yc(d, c)
    };
    l.Yc = function (b, c) {
        return Su(wp(b, !0, c))
    };
    function Vu(b) {
        this.d = b;
        this.a = -1
    }

    function Yu(b, c) {
        var d = m(c) ? c : !1;
        return "0" <= b && "9" >= b || "." == b && !d
    }

    function Wu(b) {
        var c = b.d.charAt(++b.a), d = {position: b.a, value: c};
        if ("(" == c)d.type = 2; else if ("," == c)d.type = 5; else if (")" == c)d.type = 3; else if (Yu(c) || "-" == c) {
            d.type = 4;
            var e, c = b.a, f = !1;
            do"." == e && (f = !0), e = b.d.charAt(++b.a); while (Yu(e, f));
            b = parseFloat(b.d.substring(c, b.a--));
            d.value = b
        } else if ("a" <= c && "z" >= c || "A" <= c && "Z" >= c) {
            d.type = 1;
            c = b.a;
            do e = b.d.charAt(++b.a); while ("a" <= e && "z" >= e || "A" <= e && "Z" >= e);
            b = b.d.substring(c, b.a--).toUpperCase();
            d.value = b
        } else {
            if (" " == c || "\t" == c || "\r" == c || "\n" == c)return Wu(b);
            if ("" ===
                c)d.type = 6; else throw Error("Unexpected character: " + c);
        }
        return d
    }

    function Uu(b) {
        this.d = b
    }

    l = Uu.prototype;
    l.match = function (b) {
        if (b = this.a.type == b)this.a = Wu(this.d);
        return b
    };
    function Xu(b) {
        var c = b.a;
        if (b.match(1)) {
            var d = c.value;
            if ("GEOMETRYCOLLECTION" == d) {
                a:{
                    if (b.match(2)) {
                        c = [];
                        do c.push(Xu(b)); while (b.match(5));
                        if (b.match(3)) {
                            b = c;
                            break a
                        }
                    } else if (Zu(b)) {
                        b = [];
                        break a
                    }
                    throw Error($u(b));
                }
                return new Gm(b)
            }
            var e = av[d], c = bv[d];
            if (!m(e) || !m(c))throw Error("Invalid geometry type: " + d);
            b = e.call(b);
            return new c(b)
        }
        throw Error($u(b));
    }

    l.Ee = function () {
        if (this.match(2)) {
            var b = cv(this);
            if (this.match(3))return b
        } else if (Zu(this))return null;
        throw Error($u(this));
    };
    l.De = function () {
        if (this.match(2)) {
            var b = dv(this);
            if (this.match(3))return b
        } else if (Zu(this))return [];
        throw Error($u(this));
    };
    l.Fe = function () {
        if (this.match(2)) {
            var b = ev(this);
            if (this.match(3))return b
        } else if (Zu(this))return [];
        throw Error($u(this));
    };
    l.nl = function () {
        if (this.match(2)) {
            var b;
            if (2 == this.a.type)for (b = [this.Ee()]; this.match(5);)b.push(this.Ee()); else b = dv(this);
            if (this.match(3))return b
        } else if (Zu(this))return [];
        throw Error($u(this));
    };
    l.ml = function () {
        if (this.match(2)) {
            var b = ev(this);
            if (this.match(3))return b
        } else if (Zu(this))return [];
        throw Error($u(this));
    };
    l.ol = function () {
        if (this.match(2)) {
            for (var b = [this.Fe()]; this.match(5);)b.push(this.Fe());
            if (this.match(3))return b
        } else if (Zu(this))return [];
        throw Error($u(this));
    };
    function cv(b) {
        for (var c = [], d = 0; 2 > d; ++d) {
            var e = b.a;
            if (b.match(4))c.push(e.value); else break
        }
        if (2 == c.length)return c;
        throw Error($u(b));
    }

    function dv(b) {
        for (var c = [cv(b)]; b.match(5);)c.push(cv(b));
        return c
    }

    function ev(b) {
        for (var c = [b.De()]; b.match(5);)c.push(b.De());
        return c
    }

    function Zu(b) {
        var c = 1 == b.a.type && "EMPTY" == b.a.value;
        c && (b.a = Wu(b.d));
        return c
    }

    function $u(b) {
        return "Unexpected `" + b.a.value + "` at position " + b.a.position + " in `" + b.d.d + "`"
    }

    var bv = {
        POINT: Ik,
        LINESTRING: K,
        POLYGON: F,
        MULTIPOINT: Rm,
        MULTILINESTRING: Om,
        MULTIPOLYGON: Sm
    }, av = {
        POINT: Uu.prototype.Ee,
        LINESTRING: Uu.prototype.De,
        POLYGON: Uu.prototype.Fe,
        MULTIPOINT: Uu.prototype.nl,
        MULTILINESTRING: Uu.prototype.ml,
        MULTIPOLYGON: Uu.prototype.ol
    };

    function fv() {
        this.version = void 0
    }

    v(fv, Zt);
    fv.prototype.d = function (b) {
        for (b = b.firstChild; null !== b; b = b.nextSibling)if (1 == b.nodeType)return this.a(b);
        return null
    };
    fv.prototype.a = function (b) {
        this.version = Aa(b.getAttribute("version"));
        b = U({version: this.version}, gv, b, []);
        return m(b) ? b : null
    };
    function hv(b, c) {
        return U({}, iv, b, c)
    }

    function jv(b, c) {
        return U({}, kv, b, c)
    }

    function lv(b, c) {
        var d = hv(b, c);
        if (m(d)) {
            var e = [Eq(b.getAttribute("width")), Eq(b.getAttribute("height"))];
            d.size = e;
            return d
        }
    }

    function mv(b, c) {
        return U([], nv, b, c)
    }

    var ov = [null, "http://www.opengis.net/wms"], gv = S(ov, {
        Service: R(function (b, c) {
            return U({}, pv, b, c)
        }), Capability: R(function (b, c) {
            return U({}, qv, b, c)
        })
    }), qv = S(ov, {
        Request: R(function (b, c) {
            return U({}, rv, b, c)
        }), Exception: R(function (b, c) {
            return U([], sv, b, c)
        }), Layer: R(function (b, c) {
            return U({}, tv, b, c)
        })
    }), pv = S(ov, {
        Name: R(V),
        Title: R(V),
        Abstract: R(V),
        KeywordList: R(mv),
        OnlineResource: R(Yt),
        ContactInformation: R(function (b, c) {
            return U({}, uv, b, c)
        }),
        Fees: R(V),
        AccessConstraints: R(V),
        LayerLimit: R(Dq),
        MaxWidth: R(Dq),
        MaxHeight: R(Dq)
    }), uv = S(ov, {
        ContactPersonPrimary: R(function (b, c) {
            return U({}, vv, b, c)
        }), ContactPosition: R(V), ContactAddress: R(function (b, c) {
            return U({}, wv, b, c)
        }), ContactVoiceTelephone: R(V), ContactFacsimileTelephone: R(V), ContactElectronicMailAddress: R(V)
    }), vv = S(ov, {ContactPerson: R(V), ContactOrganization: R(V)}), wv = S(ov, {
        AddressType: R(V),
        Address: R(V),
        City: R(V),
        StateOrProvince: R(V),
        PostCode: R(V),
        Country: R(V)
    }), sv = S(ov, {Format: jq(V)}), tv = S(ov, {
        Name: R(V), Title: R(V), Abstract: R(V), KeywordList: R(mv), CRS: lq(V),
        EX_GeographicBoundingBox: R(function (b, c) {
            var d = U({}, xv, b, c);
            if (m(d)) {
                var e = d.westBoundLongitude, f = d.southBoundLatitude, g = d.eastBoundLongitude, d = d.northBoundLatitude;
                return m(e) && m(f) && m(g) && m(d) ? [e, f, g, d] : void 0
            }
        }), BoundingBox: lq(function (b) {
            var c = [Cq(b.getAttribute("minx")), Cq(b.getAttribute("miny")), Cq(b.getAttribute("maxx")), Cq(b.getAttribute("maxy"))], d = [Cq(b.getAttribute("resx")), Cq(b.getAttribute("resy"))];
            return {crs: b.getAttribute("CRS"), extent: c, res: d}
        }), Dimension: lq(function (b) {
            return {
                name: b.getAttribute("name"),
                units: b.getAttribute("units"),
                unitSymbol: b.getAttribute("unitSymbol"),
                "default": b.getAttribute("default"),
                multipleValues: zq(b.getAttribute("multipleValues")),
                nearestValue: zq(b.getAttribute("nearestValue")),
                current: zq(b.getAttribute("current")),
                values: V(b)
            }
        }), Attribution: R(function (b, c) {
            return U({}, yv, b, c)
        }), AuthorityURL: lq(function (b, c) {
            var d = hv(b, c);
            if (m(d))return d.name = b.getAttribute("name"), d
        }), Identifier: lq(V), MetadataURL: lq(function (b, c) {
            var d = hv(b, c);
            if (m(d))return d.type = b.getAttribute("type"),
                d
        }), DataURL: lq(hv), FeatureListURL: lq(hv), Style: lq(function (b, c) {
            return U({}, zv, b, c)
        }), MinScaleDenominator: R(Bq), MaxScaleDenominator: R(Bq), Layer: lq(function (b, c) {
            var d = c[c.length - 1], e = U({}, tv, b, c);
            if (m(e)) {
                var f = zq(b.getAttribute("queryable"));
                m(f) || (f = d.queryable);
                e.queryable = m(f) ? f : !1;
                f = Eq(b.getAttribute("cascaded"));
                m(f) || (f = d.cascaded);
                e.cascaded = f;
                f = zq(b.getAttribute("opaque"));
                m(f) || (f = d.opaque);
                e.opaque = m(f) ? f : !1;
                f = zq(b.getAttribute("noSubsets"));
                m(f) || (f = d.noSubsets);
                e.noSubsets = m(f) ? f : !1;
                f = Cq(b.getAttribute("fixedWidth"));
                m(f) || (f = d.fixedWidth);
                e.fixedWidth = f;
                f = Cq(b.getAttribute("fixedHeight"));
                m(f) || (f = d.fixedHeight);
                e.fixedHeight = f;
                Qa(["Style", "CRS", "AuthorityURL"], function (b) {
                    var c = d[b];
                    if (m(c)) {
                        var f = Ab(e, b), f = f.concat(c);
                        e[b] = f
                    }
                });
                Qa("EX_GeographicBoundingBox BoundingBox Dimension Attribution MinScaleDenominator MaxScaleDenominator".split(" "), function (b) {
                    m(e[b]) || (e[b] = d[b])
                });
                return e
            }
        })
    }), yv = S(ov, {Title: R(V), OnlineResource: R(Yt), LogoURL: R(lv)}), xv = S(ov, {
        westBoundLongitude: R(Bq),
        eastBoundLongitude: R(Bq), southBoundLatitude: R(Bq), northBoundLatitude: R(Bq)
    }), rv = S(ov, {GetCapabilities: R(jv), GetMap: R(jv), GetFeatureInfo: R(jv)}), kv = S(ov, {
        Format: lq(V),
        DCPType: lq(function (b, c) {
            return U({}, Av, b, c)
        })
    }), Av = S(ov, {
        HTTP: R(function (b, c) {
            return U({}, Bv, b, c)
        })
    }), Bv = S(ov, {Get: R(hv), Post: R(hv)}), zv = S(ov, {
        Name: R(V),
        Title: R(V),
        Abstract: R(V),
        LegendURL: lq(lv),
        StyleSheetURL: R(hv),
        StyleURL: R(hv)
    }), iv = S(ov, {Format: R(V), OnlineResource: R(Yt)}), nv = S(ov, {Keyword: jq(V)});

    function Cv() {
        this.b = "http://mapserver.gis.umn.edu/mapserver";
        this.d = new Sq;
        this.defaultDataProjection = null
    }

    v(Cv, uq);
    function Dv(b, c, d) {
        c.namespaceURI = b.b;
        var e = Sp(c), f = [];
        if (0 === c.childNodes.length)return f;
        "msGMLOutput" == e && Qa(c.childNodes, function (b) {
            if (1 === b.nodeType) {
                var c = d[0], e = b.localName, n = RegExp, p;
                p = "_layer".replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
                n = new n(p, "");
                e = e.replace(n, "") + "_feature";
                c.featureType = e;
                c.featureNS = this.b;
                n = {};
                n[e] = jq(this.d.Ge, this.d);
                c = S([c.featureNS, null], n);
                b.namespaceURI = this.b;
                b = U([], c, b, d, this.d);
                m(b) && ab(f, b)
            }
        }, b);
        "FeatureCollection" == e && (b = U([],
            b.d.d, c, [{}], b.d), m(b) && (f = b));
        return f
    }

    Cv.prototype.Ob = function (b, c) {
        var d = {featureType: this.featureType, featureNS: this.featureNS};
        m(c) && Db(d, up(this, b, c));
        return Dv(this, b, [d])
    };
    function Ev() {
        this.c = new $t
    }

    v(Ev, Zt);
    Ev.prototype.d = function (b) {
        for (b = b.firstChild; null !== b; b = b.nextSibling)if (1 == b.nodeType)return this.a(b);
        return null
    };
    Ev.prototype.a = function (b) {
        this.version = Aa(b.getAttribute("version"));
        var c = this.c.a(b);
        if (!m(c))return null;
        c.version = this.version;
        c = U(c, Fv, b, []);
        return m(c) ? c : null
    };
    function Gv(b) {
        var c = V(b).split(" ");
        if (m(c) && 2 == c.length)return b = +c[0], c = +c[1], isNaN(b) || isNaN(c) ? void 0 : [b, c]
    }

    var Hv = [null, "http://www.opengis.net/wmts/1.0"], Iv = [null, "http://www.opengis.net/ows/1.1"], Fv = S(Hv, {
            Contents: R(function (b, c) {
                return U({}, Jv, b, c)
            })
        }), Jv = S(Hv, {
            Layer: lq(function (b, c) {
                return U({}, Kv, b, c)
            }), TileMatrixSet: lq(function (b, c) {
                return U({}, Lv, b, c)
            })
        }), Kv = S(Hv, {
            Style: lq(function (b, c) {
                var d = U({}, Mv, b, c);
                if (m(d)) {
                    var e = "true" === b.getAttribute("isDefault");
                    d.isDefault = e;
                    return d
                }
            }), Format: lq(V), TileMatrixSetLink: lq(function (b, c) {
                return U({}, Nv, b, c)
            }), ResourceURL: lq(function (b) {
                var c = b.getAttribute("format"),
                    d = b.getAttribute("template");
                b = b.getAttribute("resourceType");
                var e = {};
                m(c) && (e.format = c);
                m(d) && (e.template = d);
                m(b) && (e.resourceType = b);
                return e
            })
        }, S(Iv, {
            Title: R(V), Abstract: R(V), WGS84BoundingBox: R(function (b, c) {
                var d = U([], Ov, b, c);
                return 2 != d.length ? void 0 : Sd(d)
            }), Identifier: R(V)
        })), Mv = S(Hv, {
            LegendURL: lq(function (b) {
                var c = {};
                c.format = b.getAttribute("format");
                c.href = Yt(b);
                return c
            })
        }, S(Iv, {Title: R(V), Identifier: R(V)})), Nv = S(Hv, {TileMatrixSet: R(V)}), Ov = S(Iv, {
            LowerCorner: jq(Gv),
            UpperCorner: jq(Gv)
        }),
        Lv = S(Hv, {
            WellKnownScaleSet: R(V), TileMatrix: lq(function (b, c) {
                return U({}, Pv, b, c)
            })
        }, S(Iv, {SupportedCRS: R(V), Identifier: R(V)})), Pv = S(Hv, {
            TopLeftCorner: R(Gv),
            ScaleDenominator: R(Bq),
            TileWidth: R(Dq),
            TileHeight: R(Dq),
            MatrixWidth: R(Dq),
            MatrixHeight: R(Dq)
        }, S(Iv, {Identifier: R(V)}));
    var Qv = new ve(6378137);

    function X(b) {
        rd.call(this);
        b = m(b) ? b : {};
        this.a = null;
        this.f = Ue;
        this.c = void 0;
        w(this, vd("projection"), this.tj, !1, this);
        w(this, vd("tracking"), this.uj, !1, this);
        m(b.projection) && this.k(Be(b.projection));
        m(b.trackingOptions) && this.q(b.trackingOptions);
        this.b(m(b.tracking) ? b.tracking : !1)
    }

    v(X, rd);
    l = X.prototype;
    l.P = function () {
        this.b(!1);
        X.T.P.call(this)
    };
    l.tj = function () {
        var b = this.g();
        null != b && (this.f = Ae(Be("EPSG:4326"), b), null === this.a || this.set("position", this.f(this.a)))
    };
    l.uj = function () {
        if ($f) {
            var b = this.i();
            b && !m(this.c) ? this.c = ba.navigator.geolocation.watchPosition(ra(this.vl, this), ra(this.wl, this), this.e()) : !b && m(this.c) && (ba.navigator.geolocation.clearWatch(this.c), this.c = void 0)
        }
    };
    l.vl = function (b) {
        b = b.coords;
        this.set("accuracy", b.accuracy);
        this.set("altitude", null === b.altitude ? void 0 : b.altitude);
        this.set("altitudeAccuracy", null === b.altitudeAccuracy ? void 0 : b.altitudeAccuracy);
        this.set("heading", null === b.heading ? void 0 : Zb(b.heading));
        null === this.a ? this.a = [b.longitude, b.latitude] : (this.a[0] = b.longitude, this.a[1] = b.latitude);
        var c = this.f(this.a);
        this.set("position", c);
        this.set("speed", null === b.speed ? void 0 : b.speed);
        b = Xk(Qv, this.a, b.accuracy);
        b.qa(this.f);
        this.set("accuracyGeometry",
            b);
        this.l()
    };
    l.wl = function (b) {
        b.type = "error";
        this.b(!1);
        this.dispatchEvent(b)
    };
    l.mf = function () {
        return this.get("accuracy")
    };
    X.prototype.getAccuracy = X.prototype.mf;
    X.prototype.o = function () {
        return this.get("accuracyGeometry") || null
    };
    X.prototype.getAccuracyGeometry = X.prototype.o;
    X.prototype.p = function () {
        return this.get("altitude")
    };
    X.prototype.getAltitude = X.prototype.p;
    X.prototype.r = function () {
        return this.get("altitudeAccuracy")
    };
    X.prototype.getAltitudeAccuracy = X.prototype.r;
    X.prototype.H = function () {
        return this.get("heading")
    };
    X.prototype.getHeading = X.prototype.H;
    X.prototype.N = function () {
        return this.get("position")
    };
    X.prototype.getPosition = X.prototype.N;
    X.prototype.g = function () {
        return this.get("projection")
    };
    X.prototype.getProjection = X.prototype.g;
    X.prototype.D = function () {
        return this.get("speed")
    };
    X.prototype.getSpeed = X.prototype.D;
    X.prototype.i = function () {
        return this.get("tracking")
    };
    X.prototype.getTracking = X.prototype.i;
    X.prototype.e = function () {
        return this.get("trackingOptions")
    };
    X.prototype.getTrackingOptions = X.prototype.e;
    X.prototype.k = function (b) {
        this.set("projection", b)
    };
    X.prototype.setProjection = X.prototype.k;
    X.prototype.b = function (b) {
        this.set("tracking", b)
    };
    X.prototype.setTracking = X.prototype.b;
    X.prototype.q = function (b) {
        this.set("trackingOptions", b)
    };
    X.prototype.setTrackingOptions = X.prototype.q;
    function Rv(b, c, d) {
        for (var e = [], f = b(0), g = b(1), h = c(f), k = c(g), n = [g, f], p = [k, h], q = [1, 0], r = {}, s = 1E5, u, z, y, A, D; 0 < --s && 0 < q.length;)y = q.pop(), f = n.pop(), h = p.pop(), g = y.toString(), g in r || (e.push(h[0], h[1]), r[g] = !0), A = q.pop(), g = n.pop(), k = p.pop(), D = (y + A) / 2, u = b(D), z = c(u), sk(z[0], z[1], h[0], h[1], k[0], k[1]) < d ? (e.push(k[0], k[1]), g = A.toString(), r[g] = !0) : (q.push(A, D, D, y), p.push(k, z, z, h), n.push(g, u, u, f));
        return e
    }

    function Sv(b, c, d, e, f) {
        var g = Be("EPSG:4326");
        return Rv(function (e) {
            return [b, c + (d - c) * e]
        }, Te(g, e), f)
    }

    function Tv(b, c, d, e, f) {
        var g = Be("EPSG:4326");
        return Rv(function (e) {
            return [c + (d - c) * e, b]
        }, Te(g, e), f)
    };
    function Uv(b) {
        b = m(b) ? b : {};
        this.n = this.g = null;
        this.c = this.b = Infinity;
        this.e = this.f = -Infinity;
        this.r = m(b.targetSize) ? b.targetSize : 100;
        this.o = m(b.maxLines) ? b.maxLines : 100;
        this.a = [];
        this.d = [];
        this.p = m(b.strokeStyle) ? b.strokeStyle : Vv;
        this.q = this.i = void 0;
        this.k = null;
        this.setMap(m(b.map) ? b.map : null)
    }

    var Vv = new jl({color: "rgba(0,0,0,0.2)"}), Wv = [90, 45, 30, 20, 10, 5, 2, 1, .5, .2, .1, .05, .01, .005, .002, .001];

    function Xv(b, c, d, e, f) {
        var g = f;
        c = Sv(c, b.f, b.b, b.n, d);
        g = m(b.a[g]) ? b.a[g] : new K(null);
        Nm(g, "XY", c);
        qe(g.J(), e) && (b.a[f++] = g);
        return f
    }

    function Yv(b, c, d, e, f) {
        var g = f;
        c = Tv(c, b.e, b.c, b.n, d);
        g = m(b.d[g]) ? b.d[g] : new K(null);
        Nm(g, "XY", c);
        qe(g.J(), e) && (b.d[f++] = g);
        return f
    }

    l = Uv.prototype;
    l.vj = function () {
        return this.g
    };
    l.Uh = function () {
        return this.a
    };
    l.Zh = function () {
        return this.d
    };
    l.wf = function (b) {
        var c = b.vectorContext, d = b.frameState;
        b = d.extent;
        var e = d.viewState, f = e.center, g = e.projection, e = e.resolution, d = d.pixelRatio, d = e * e / (4 * d * d);
        if (null === this.n || !Se(this.n, g)) {
            var h = g.J(), k = g.c, n = k[2], p = k[1], q = k[0];
            this.b = k[3];
            this.c = n;
            this.f = p;
            this.e = q;
            k = Be("EPSG:4326");
            this.i = Te(k, g);
            this.q = Te(g, k);
            this.k = this.q(le(h));
            this.n = g
        }
        for (var g = this.k[0], h = this.k[1], k = -1, r, p = Math.pow(this.r * e, 2), q = [], s = [], e = 0, n = Wv.length; e < n; ++e) {
            r = Wv[e] / 2;
            q[0] = g - r;
            q[1] = h - r;
            s[0] = g + r;
            s[1] = h + r;
            this.i(q, q);
            this.i(s,
                s);
            r = Math.pow(s[0] - q[0], 2) + Math.pow(s[1] - q[1], 2);
            if (r <= p)break;
            k = Wv[e]
        }
        e = k;
        if (-1 == e)this.a.length = this.d.length = 0; else {
            g = this.q(f);
            f = g[0];
            g = g[1];
            h = this.o;
            f = Math.floor(f / e) * e;
            p = Wb(f, this.e, this.c);
            n = Xv(this, p, d, b, 0);
            for (k = 0; p != this.e && k++ < h;)p = Math.max(p - e, this.e), n = Xv(this, p, d, b, n);
            p = Wb(f, this.e, this.c);
            for (k = 0; p != this.c && k++ < h;)p = Math.min(p + e, this.c), n = Xv(this, p, d, b, n);
            this.a.length = n;
            g = Math.floor(g / e) * e;
            f = Wb(g, this.f, this.b);
            n = Yv(this, f, d, b, 0);
            for (k = 0; f != this.f && k++ < h;)f = Math.max(f - e, this.f), n =
                Yv(this, f, d, b, n);
            f = Wb(g, this.f, this.b);
            for (k = 0; f != this.b && k++ < h;)f = Math.min(f + e, this.b), n = Yv(this, f, d, b, n);
            this.d.length = n
        }
        c.Ba(null, this.p);
        b = 0;
        for (d = this.a.length; b < d; ++b)f = this.a[b], c.Eb(f, null);
        b = 0;
        for (d = this.d.length; b < d; ++b)f = this.d[b], c.Eb(f, null)
    };
    l.setMap = function (b) {
        null !== this.g && (this.g.t("postcompose", this.wf, this), this.g.render());
        null !== b && (b.s("postcompose", this.wf, this), b.render());
        this.g = b
    };
    function Zv(b, c, d, e, f, g, h) {
        Ni.call(this, b, c, d, 0, e);
        this.n = f;
        this.d = new Image;
        null !== g && (this.d.crossOrigin = g);
        this.c = {};
        this.b = null;
        this.state = 0;
        this.g = h
    }

    v(Zv, Ni);
    Zv.prototype.a = function (b) {
        if (m(b)) {
            var c = ma(b);
            if (c in this.c)return this.c[c];
            b = wb(this.c) ? this.d : this.d.cloneNode(!1);
            return this.c[c] = b
        }
        return this.d
    };
    Zv.prototype.i = function () {
        this.state = 3;
        Qa(this.b, Xc);
        this.b = null;
        this.dispatchEvent("change")
    };
    Zv.prototype.k = function () {
        m(this.resolution) || (this.resolution = oe(this.extent) / this.d.height);
        this.state = 2;
        Qa(this.b, Xc);
        this.b = null;
        this.dispatchEvent("change")
    };
    Zv.prototype.load = function () {
        0 == this.state && (this.state = 1, this.dispatchEvent("change"), this.b = [Vc(this.d, "error", this.i, !1, this), Vc(this.d, "load", this.k, !1, this)], this.g(this, this.n))
    };
    function $v(b, c, d, e, f) {
        Oi.call(this, b, c);
        this.g = d;
        this.d = new Image;
        null !== e && (this.d.crossOrigin = e);
        this.b = {};
        this.f = null;
        this.n = f
    }

    v($v, Oi);
    l = $v.prototype;
    l.P = function () {
        aw(this);
        $v.T.P.call(this)
    };
    l.Ta = function (b) {
        if (m(b)) {
            var c = ma(b);
            if (c in this.b)return this.b[c];
            b = wb(this.b) ? this.d : this.d.cloneNode(!1);
            return this.b[c] = b
        }
        return this.d
    };
    l.qb = function () {
        return this.g
    };
    l.wj = function () {
        this.state = 3;
        aw(this);
        Pi(this)
    };
    l.xj = function () {
        this.state = this.d.naturalWidth && this.d.naturalHeight ? 2 : 4;
        aw(this);
        Pi(this)
    };
    l.load = function () {
        0 == this.state && (this.state = 1, Pi(this), this.f = [Vc(this.d, "error", this.wj, !1, this), Vc(this.d, "load", this.xj, !1, this)], this.n(this, this.g))
    };
    function aw(b) {
        Qa(b.f, Xc);
        b.f = null
    };
    function bw(b, c, d) {
        return function (e, f, g) {
            return d(b, c, e, f, g)
        }
    }

    function cw() {
    };
    function dw(b, c) {
        id.call(this);
        this.a = new Zo(this);
        var d = b;
        c && (d = vf(b));
        this.a.Ra(d, "dragenter", this.el);
        d != b && this.a.Ra(d, "dragover", this.fl);
        this.a.Ra(b, "dragover", this.gl);
        this.a.Ra(b, "drop", this.hl)
    }

    v(dw, id);
    l = dw.prototype;
    l.Kc = !1;
    l.P = function () {
        dw.T.P.call(this);
        this.a.Jc()
    };
    l.el = function (b) {
        var c = b.a.dataTransfer;
        (this.Kc = !(!c || !(c.types && (Wa(c.types, "Files") || Wa(c.types, "public.file-url")) || c.files && 0 < c.files.length))) && b.preventDefault()
    };
    l.fl = function (b) {
        this.Kc && (b.preventDefault(), b.a.dataTransfer.dropEffect = "none")
    };
    l.gl = function (b) {
        this.Kc && (b.preventDefault(), b.pb(), b = b.a.dataTransfer, b.effectAllowed = "all", b.dropEffect = "copy")
    };
    l.hl = function (b) {
        this.Kc && (b.preventDefault(), b.pb(), b = new xc(b.a), b.type = "drop", this.dispatchEvent(b))
    };
    function ew(b) {
        b.prototype.then = b.prototype.then;
        b.prototype.$goog_Thenable = !0
    }

    function fw(b) {
        if (!b)return !1;
        try {
            return !!b.$goog_Thenable
        } catch (c) {
            return !1
        }
    };
    function gw(b, c) {
        hw || iw();
        jw || (hw(), jw = !0);
        kw.push(new lw(b, c))
    }

    var hw;

    function iw() {
        if (ba.Promise && ba.Promise.resolve) {
            var b = ba.Promise.resolve();
            hw = function () {
                b.then(mw)
            }
        } else hw = function () {
            nh(mw)
        }
    }

    var jw = !1, kw = [];

    function mw() {
        for (; kw.length;) {
            var b = kw;
            kw = [];
            for (var c = 0; c < b.length; c++) {
                var d = b[c];
                try {
                    d.a.call(d.d)
                } catch (e) {
                    mh(e)
                }
            }
        }
        jw = !1
    }

    function lw(b, c) {
        this.a = b;
        this.d = c
    };
    function nw(b, c) {
        this.d = ow;
        this.e = void 0;
        this.a = this.b = null;
        this.c = this.f = !1;
        try {
            var d = this;
            b.call(c, function (b) {
                pw(d, qw, b)
            }, function (b) {
                pw(d, rw, b)
            })
        } catch (e) {
            pw(this, rw, e)
        }
    }

    var ow = 0, qw = 2, rw = 3;
    nw.prototype.then = function (b, c, d) {
        return sw(this, ka(b) ? b : null, ka(c) ? c : null, d)
    };
    ew(nw);
    nw.prototype.cancel = function (b) {
        this.d == ow && gw(function () {
            var c = new tw(b);
            uw(this, c)
        }, this)
    };
    function uw(b, c) {
        if (b.d == ow)if (b.b) {
            var d = b.b;
            if (d.a) {
                for (var e = 0, f = -1, g = 0, h; h = d.a[g]; g++)if (h = h.Cc)if (e++, h == b && (f = g), 0 <= f && 1 < e)break;
                0 <= f && (d.d == ow && 1 == e ? uw(d, c) : (e = d.a.splice(f, 1)[0], vw(d, e, rw, c)))
            }
        } else pw(b, rw, c)
    }

    function ww(b, c) {
        b.a && b.a.length || b.d != qw && b.d != rw || xw(b);
        b.a || (b.a = []);
        b.a.push(c)
    }

    function sw(b, c, d, e) {
        var f = {Cc: null, Xf: null, Zf: null};
        f.Cc = new nw(function (b, h) {
            f.Xf = c ? function (d) {
                try {
                    var f = c.call(e, d);
                    b(f)
                } catch (p) {
                    h(p)
                }
            } : b;
            f.Zf = d ? function (c) {
                try {
                    var f = d.call(e, c);
                    !m(f) && c instanceof tw ? h(c) : b(f)
                } catch (p) {
                    h(p)
                }
            } : h
        });
        f.Cc.b = b;
        ww(b, f);
        return f.Cc
    }

    nw.prototype.g = function (b) {
        this.d = ow;
        pw(this, qw, b)
    };
    nw.prototype.n = function (b) {
        this.d = ow;
        pw(this, rw, b)
    };
    function pw(b, c, d) {
        if (b.d == ow) {
            if (b == d)c = rw, d = new TypeError("Promise cannot resolve to itself"); else {
                if (fw(d)) {
                    b.d = 1;
                    d.then(b.g, b.n, b);
                    return
                }
                if (la(d))try {
                    var e = d.then;
                    if (ka(e)) {
                        yw(b, d, e);
                        return
                    }
                } catch (f) {
                    c = rw, d = f
                }
            }
            b.e = d;
            b.d = c;
            xw(b);
            c != rw || d instanceof tw || zw(b, d)
        }
    }

    function yw(b, c, d) {
        function e(c) {
            g || (g = !0, b.n(c))
        }

        function f(c) {
            g || (g = !0, b.g(c))
        }

        b.d = 1;
        var g = !1;
        try {
            d.call(c, f, e)
        } catch (h) {
            e(h)
        }
    }

    function xw(b) {
        b.f || (b.f = !0, gw(b.i, b))
    }

    nw.prototype.i = function () {
        for (; this.a && this.a.length;) {
            var b = this.a;
            this.a = [];
            for (var c = 0; c < b.length; c++)vw(this, b[c], this.d, this.e)
        }
        this.f = !1
    };
    function vw(b, c, d, e) {
        if (d == qw)c.Xf(e); else {
            if (c.Cc)for (; b && b.c; b = b.b)b.c = !1;
            c.Zf(e)
        }
    }

    function zw(b, c) {
        b.c = !0;
        gw(function () {
            b.c && Aw.call(null, c)
        })
    }

    var Aw = mh;

    function tw(b) {
        wa.call(this, b)
    }

    v(tw, wa);
    tw.prototype.name = "cancel";
    /*
     Portions of this code are from MochiKit, received by
     The Closure Authors under the MIT license. All other code is Copyright
     2005-2009 The Closure Authors. All Rights Reserved.
     */
    function Bw(b, c) {
        this.f = [];
        this.o = b;
        this.q = c || null;
        this.c = this.a = !1;
        this.b = void 0;
        this.i = this.p = this.g = !1;
        this.e = 0;
        this.d = null;
        this.n = 0
    }

    Bw.prototype.cancel = function (b) {
        if (this.a)this.b instanceof Bw && this.b.cancel(); else {
            if (this.d) {
                var c = this.d;
                delete this.d;
                b ? c.cancel(b) : (c.n--, 0 >= c.n && c.cancel())
            }
            this.o ? this.o.call(this.q, this) : this.i = !0;
            this.a || (b = new Cw, Dw(this), Ew(this, !1, b))
        }
    };
    Bw.prototype.k = function (b, c) {
        this.g = !1;
        Ew(this, b, c)
    };
    function Ew(b, c, d) {
        b.a = !0;
        b.b = d;
        b.c = !c;
        Fw(b)
    }

    function Dw(b) {
        if (b.a) {
            if (!b.i)throw new Gw;
            b.i = !1
        }
    }

    function Hw(b, c, d, e) {
        b.f.push([c, d, e]);
        b.a && Fw(b)
    }

    Bw.prototype.then = function (b, c, d) {
        var e, f, g = new nw(function (b, c) {
            e = b;
            f = c
        });
        Hw(this, e, function (b) {
            b instanceof Cw ? g.cancel() : f(b)
        });
        return g.then(b, c, d)
    };
    ew(Bw);
    function Iw(b) {
        return Ta(b.f, function (b) {
            return ka(b[1])
        })
    }

    function Fw(b) {
        if (b.e && b.a && Iw(b)) {
            var c = b.e, d = Jw[c];
            d && (ba.clearTimeout(d.aa), delete Jw[c]);
            b.e = 0
        }
        b.d && (b.d.n--, delete b.d);
        for (var c = b.b, e = d = !1; b.f.length && !b.g;) {
            var f = b.f.shift(), g = f[0], h = f[1], f = f[2];
            if (g = b.c ? h : g)try {
                var k = g.call(f || b.q, c);
                m(k) && (b.c = b.c && (k == c || k instanceof Error), b.b = c = k);
                fw(c) && (e = !0, b.g = !0)
            } catch (n) {
                c = n, b.c = !0, Iw(b) || (d = !0)
            }
        }
        b.b = c;
        e && (k = ra(b.k, b, !0), e = ra(b.k, b, !1), c instanceof Bw ? (Hw(c, k, e), c.p = !0) : c.then(k, e));
        d && (c = new Kw(c), Jw[c.aa] = c, b.e = c.aa)
    }

    function Gw() {
        wa.call(this)
    }

    v(Gw, wa);
    Gw.prototype.message = "Deferred has already fired";
    Gw.prototype.name = "AlreadyCalledError";
    function Cw() {
        wa.call(this)
    }

    v(Cw, wa);
    Cw.prototype.message = "Deferred was canceled";
    Cw.prototype.name = "CanceledError";
    function Kw(b) {
        this.aa = ba.setTimeout(ra(this.d, this), 0);
        this.a = b
    }

    Kw.prototype.d = function () {
        delete Jw[this.aa];
        throw this.a;
    };
    var Jw = {};

    function Lw(b, c) {
        m(b.name) ? (this.name = b.name, this.code = Mw[b.name]) : (this.code = b.code, this.name = Nw(b.code));
        wa.call(this, za("%s %s", this.name, c))
    }

    v(Lw, wa);
    function Nw(b) {
        var c = vb(Mw, function (c) {
            return b == c
        });
        if (!m(c))throw Error("Invalid code: " + b);
        return c
    }

    var Mw = {
        AbortError: 3,
        EncodingError: 5,
        InvalidModificationError: 9,
        InvalidStateError: 7,
        NotFoundError: 1,
        NotReadableError: 4,
        NoModificationAllowedError: 6,
        PathExistsError: 12,
        QuotaExceededError: 10,
        SecurityError: 2,
        SyntaxError: 8,
        TypeMismatchError: 11
    };

    function Ow(b, c) {
        rc.call(this, b.type, c)
    }

    v(Ow, rc);
    function Pw() {
        id.call(this);
        this.hb = new FileReader;
        this.hb.onloadstart = ra(this.a, this);
        this.hb.onprogress = ra(this.a, this);
        this.hb.onload = ra(this.a, this);
        this.hb.onabort = ra(this.a, this);
        this.hb.onerror = ra(this.a, this);
        this.hb.onloadend = ra(this.a, this)
    }

    v(Pw, id);
    Pw.prototype.getError = function () {
        return this.hb.error && new Lw(this.hb.error, "reading file")
    };
    Pw.prototype.a = function (b) {
        this.dispatchEvent(new Ow(b, this))
    };
    Pw.prototype.P = function () {
        Pw.T.P.call(this);
        delete this.hb
    };
    function Qw(b) {
        var c = new Bw;
        b.Ra("loadend", sa(function (b, c) {
            var f = c.hb.result, g = c.getError();
            null == f || g ? (Dw(b), Ew(b, !1, g)) : (Dw(b), Ew(b, !0, f));
            c.Jc()
        }, c, b));
        return c
    };
    function Rw(b) {
        b = m(b) ? b : {};
        Mj.call(this, {handleEvent: cd});
        this.e = m(b.formatConstructors) ? b.formatConstructors : [];
        this.q = m(b.projection) ? Be(b.projection) : null;
        this.f = null;
        this.a = void 0
    }

    v(Rw, Mj);
    Rw.prototype.P = function () {
        m(this.a) && Xc(this.a);
        Rw.T.P.call(this)
    };
    Rw.prototype.g = function (b) {
        b = b.a.dataTransfer.files;
        var c, d, e;
        c = 0;
        for (d = b.length; c < d; ++c) {
            var f = e = b[c], g = new Pw, h = Qw(g);
            g.hb.readAsText(f, "");
            Hw(h, sa(this.i, e), null, this)
        }
    };
    Rw.prototype.i = function (b, c) {
        var d = this.k, e = this.q;
        null === e && (e = d.a().p);
        var d = this.e, f = [], g, h;
        g = 0;
        for (h = d.length; g < h; ++g) {
            var k = new d[g], n;
            try {
                n = k.ma(c)
            } catch (p) {
                n = null
            }
            if (null !== n) {
                var k = k.Ja(c), k = Te(k, e), q, r;
                q = 0;
                for (r = n.length; q < r; ++q) {
                    var s = n[q], u = s.R();
                    null != u && u.qa(k);
                    f.push(s)
                }
            }
        }
        this.dispatchEvent(new Sw(Tw, this, b, f, e))
    };
    Rw.prototype.setMap = function (b) {
        m(this.a) && (Xc(this.a), this.a = void 0);
        null !== this.f && (qc(this.f), this.f = null);
        Rw.T.setMap.call(this, b);
        null !== b && (this.f = new dw(b.b), this.a = w(this.f, "drop", this.g, !1, this))
    };
    var Tw = "addfeatures";

    function Sw(b, c, d, e, f) {
        rc.call(this, b, c);
        this.features = e;
        this.file = d;
        this.projection = f
    }

    v(Sw, rc);
    function Uw(b, c) {
        this.x = b;
        this.y = c
    }

    v(Uw, rf);
    Uw.prototype.clone = function () {
        return new Uw(this.x, this.y)
    };
    Uw.prototype.scale = rf.prototype.scale;
    Uw.prototype.add = function (b) {
        this.x += b.x;
        this.y += b.y;
        return this
    };
    Uw.prototype.rotate = function (b) {
        var c = Math.cos(b);
        b = Math.sin(b);
        var d = this.y * c + this.x * b;
        this.x = this.x * c - this.y * b;
        this.y = d;
        return this
    };
    function Vw(b) {
        b = m(b) ? b : {};
        Zj.call(this, {handleDownEvent: Ww, handleDragEvent: Xw, handleUpEvent: Yw});
        this.i = m(b.condition) ? b.condition : Wj;
        this.a = this.e = void 0;
        this.g = 0
    }

    v(Vw, Zj);
    function Xw(b) {
        if (Yj(b)) {
            var c = b.map, d = c.f();
            b = b.pixel;
            b = new Uw(b[0] - d[0] / 2, d[1] / 2 - b[1]);
            d = Math.atan2(b.y, b.x);
            b = Math.sqrt(b.x * b.x + b.y * b.y);
            var e = c.a(), f = Ye(e);
            c.render();
            m(this.e) && Nj(c, e, f.rotation - (d - this.e));
            this.e = d;
            m(this.a) && Pj(c, e, f.resolution / b * this.a);
            m(this.a) && (this.g = this.a / b);
            this.a = b
        }
    }

    function Yw(b) {
        if (!Yj(b))return !0;
        b = b.map;
        var c = b.a();
        Ze(c, -1);
        var d = Ye(c), e = this.g - 1, f = d.rotation, f = c.constrainRotation(f, 0);
        Nj(b, c, f, void 0, void 0);
        d = d.resolution;
        d = c.constrainResolution(d, 0, e);
        Pj(b, c, d, void 0, 400);
        this.g = 0;
        return !1
    }

    function Ww(b) {
        return Yj(b) && this.i(b) ? (Ze(b.map.a(), 1), this.a = this.e = void 0, !0) : !1
    };
    function Zw(b, c) {
        rc.call(this, b);
        this.feature = c
    }

    v(Zw, rc);
    function $w(b) {
        Zj.call(this, {handleDownEvent: ax, handleEvent: bx, handleUpEvent: cx});
        this.S = null;
        this.fa = m(b.source) ? b.source : null;
        this.ca = m(b.features) ? b.features : null;
        this.kb = m(b.snapTolerance) ? b.snapTolerance : 12;
        this.Fa = m(b.minPointsPerRing) ? b.minPointsPerRing : 3;
        var c = this.H = b.type, d;
        "Point" === c || "MultiPoint" === c ? d = dx : "LineString" === c || "MultiLineString" === c ? d = ex : "Polygon" === c || "MultiPolygon" === c ? d = fx : "Circle" === c && (d = gx);
        this.a = d;
        this.e = this.q = this.o = this.g = this.i = null;
        this.N = new rp({
            style: m(b.style) ?
                b.style : hx()
        });
        this.da = b.geometryName;
        this.Xa = m(b.condition) ? b.condition : Vj;
        w(this, vd("active"), this.ea, !1, this)
    }

    v($w, Zj);
    function hx() {
        var b = ul();
        return function (c) {
            return b[c.R().O()]
        }
    }

    $w.prototype.setMap = function (b) {
        $w.T.setMap.call(this, b);
        this.ea()
    };
    function bx(b) {
        var c = !0;
        b.type === Gi ? c = ix(this, b) : b.type === Ai && (c = !1);
        return ak.call(this, b) && c
    }

    function ax(b) {
        return this.Xa(b) ? (this.S = b.pixel, !0) : !1
    }

    function cx(b) {
        var c = this.S, d = b.pixel, e = c[0] - d[0], c = c[1] - d[1], d = !0;
        4 >= e * e + c * c && (ix(this, b), null === this.i ? jx(this, b) : this.a === dx || this.a === gx && null !== this.i || kx(this, b) ? this.U() : (b = b.coordinate, e = this.g.R(), this.a === ex ? (this.i = b.slice(), c = e.Q(), c.push(b.slice()), e.W(c)) : this.a === fx && (this.e[0].push(b.slice()), e.W(this.e)), lx(this)), d = !1);
        return d
    }

    function ix(b, c) {
        if (b.a === dx && null === b.i)jx(b, c); else if (null === b.i) {
            var d = c.coordinate.slice();
            null === b.o ? (b.o = new P(new Ik(d)), lx(b)) : b.o.R().W(d)
        } else {
            var d = c.coordinate, e = b.g.R(), f, g;
            b.a === dx ? (g = e.Q(), g[0] = d[0], g[1] = d[1], e.W(g)) : (b.a === ex ? f = e.Q() : b.a === fx ? f = b.e[0] : b.a === gx && (f = e.Oc()), kx(b, c) && (d = b.i.slice()), b.o.R().W(d), g = f[f.length - 1], g[0] = d[0], g[1] = d[1], b.a === ex ? e.W(f) : b.a === fx ? (g = b.q.R(), g.W(f), e.W(b.e)) : b.a === gx && (g = b.q.R(), g.W([e.Oc(), d]), e.If(g.Jf())));
            lx(b)
        }
        return !0
    }

    function kx(b, c) {
        var d = !1;
        if (null !== b.g) {
            var e = b.g.R(), f = !1, g = [b.i];
            b.a === ex ? f = 2 < e.Q().length : b.a === fx && (f = e.Q()[0].length > b.Fa, g = [b.e[0][0], b.e[0][b.e[0].length - 2]]);
            if (f)for (var e = c.map, f = 0, h = g.length; f < h; f++) {
                var k = g[f], n = e.e(k), p = c.pixel, d = p[0] - n[0], n = p[1] - n[1];
                if (d = Math.sqrt(d * d + n * n) <= b.kb) {
                    b.i = k;
                    break
                }
            }
        }
        return d
    }

    function jx(b, c) {
        var d = c.coordinate;
        b.i = d;
        var e;
        b.a === dx ? e = new Ik(d.slice()) : b.a === ex ? e = new K([d.slice(), d.slice()]) : b.a === fx ? (b.q = new P(new K([d.slice(), d.slice()])), b.e = [[d.slice(), d.slice()]], e = new F(b.e)) : b.a === gx && (e = new Em(d.slice(), 0), b.q = new P(new K([d.slice(), d.slice()])));
        b.g = new P;
        m(b.da) && b.g.f(b.da);
        b.g.Sa(e);
        lx(b);
        b.dispatchEvent(new Zw("drawstart", b.g))
    }

    $w.prototype.U = function () {
        var b = mx(this), c, d = b.R();
        this.a === dx ? c = d.Q() : this.a === ex ? (c = d.Q(), c.pop(), d.W(c)) : this.a === fx && (this.e[0].pop(), this.e[0].push(this.e[0][0]), d.W(this.e), c = d.Q());
        "MultiPoint" === this.H ? b.Sa(new Rm([c])) : "MultiLineString" === this.H ? b.Sa(new Om([c])) : "MultiPolygon" === this.H && b.Sa(new Sm([c]));
        null === this.ca || this.ca.push(b);
        null === this.fa || this.fa.Va(b);
        this.dispatchEvent(new Zw("drawend", b))
    };
    function mx(b) {
        b.i = null;
        var c = b.g;
        null !== c && (b.g = null, b.o = null, b.q = null, b.N.a.clear());
        return c
    }

    $w.prototype.r = bd;
    function lx(b) {
        var c = [];
        null === b.g || c.push(b.g);
        null === b.q || c.push(b.q);
        null === b.o || c.push(b.o);
        b.N.Tc(new kg(c))
    }

    $w.prototype.ea = function () {
        var b = this.k, c = this.b();
        null !== b && c || mx(this);
        this.N.setMap(c ? b : null)
    };
    var dx = "Point", ex = "LineString", fx = "Polygon", gx = "Circle";

    function nx(b) {
        Zj.call(this, {handleDownEvent: ox, handleDragEvent: px, handleEvent: qx, handleUpEvent: rx});
        this.ca = m(b.deleteCondition) ? b.deleteCondition : hd(Vj, Uj);
        this.U = this.e = null;
        this.S = [0, 0];
        this.a = new jn;
        this.i = m(b.pixelTolerance) ? b.pixelTolerance : 10;
        this.N = !1;
        this.g = null;
        this.q = new rp({style: m(b.style) ? b.style : sx()});
        this.H = {
            Point: this.ym,
            LineString: this.Ag,
            LinearRing: this.Ag,
            Polygon: this.Am,
            MultiPoint: this.vm,
            MultiLineString: this.um,
            MultiPolygon: this.xm,
            GeometryCollection: this.tm
        };
        this.o = b.features;
        this.o.forEach(this.Kf, this);
        w(this.o, "add", this.ti, !1, this);
        w(this.o, "remove", this.ui, !1, this)
    }

    v(nx, Zj);
    l = nx.prototype;
    l.Kf = function (b) {
        var c = b.R();
        m(this.H[c.O()]) && this.H[c.O()].call(this, b, c);
        b = this.k;
        null === b || tx(this, this.S, b)
    };
    l.setMap = function (b) {
        this.q.setMap(b);
        nx.T.setMap.call(this, b)
    };
    l.ti = function (b) {
        this.Kf(b.element)
    };
    l.ui = function (b) {
        var c = b.element;
        b = this.a;
        var d, e = [];
        nn(b, c.R().J(), function (b) {
            c === b.feature && e.push(b)
        });
        for (d = e.length - 1; 0 <= d; --d)b.remove(e[d]);
        null !== this.e && 0 === this.o.Ib() && (this.q.Ed(this.e), this.e = null)
    };
    l.ym = function (b, c) {
        var d = c.Q(), d = {feature: b, geometry: c, ha: [d, d]};
        this.a.sa(c.J(), d)
    };
    l.vm = function (b, c) {
        var d = c.Q(), e, f, g;
        f = 0;
        for (g = d.length; f < g; ++f)e = d[f], e = {
            feature: b,
            geometry: c,
            depth: [f],
            index: f,
            ha: [e, e]
        }, this.a.sa(c.J(), e)
    };
    l.Ag = function (b, c) {
        var d = c.Q(), e, f, g, h;
        e = 0;
        for (f = d.length - 1; e < f; ++e)g = d.slice(e, e + 2), h = {
            feature: b,
            geometry: c,
            index: e,
            ha: g
        }, this.a.sa(Sd(g), h)
    };
    l.um = function (b, c) {
        var d = c.Q(), e, f, g, h, k, n, p;
        h = 0;
        for (k = d.length; h < k; ++h)for (e = d[h], f = 0, g = e.length - 1; f < g; ++f)n = e.slice(f, f + 2), p = {
            feature: b,
            geometry: c,
            depth: [h],
            index: f,
            ha: n
        }, this.a.sa(Sd(n), p)
    };
    l.Am = function (b, c) {
        var d = c.Q(), e, f, g, h, k, n, p;
        h = 0;
        for (k = d.length; h < k; ++h)for (e = d[h], f = 0, g = e.length - 1; f < g; ++f)n = e.slice(f, f + 2), p = {
            feature: b,
            geometry: c,
            depth: [h],
            index: f,
            ha: n
        }, this.a.sa(Sd(n), p)
    };
    l.xm = function (b, c) {
        var d = c.Q(), e, f, g, h, k, n, p, q, r, s;
        n = 0;
        for (p = d.length; n < p; ++n)for (q = d[n], h = 0, k = q.length; h < k; ++h)for (e = q[h], f = 0, g = e.length - 1; f < g; ++f)r = e.slice(f, f + 2), s = {
            feature: b,
            geometry: c,
            depth: [h, n],
            index: f,
            ha: r
        }, this.a.sa(Sd(r), s)
    };
    l.tm = function (b, c) {
        var d, e = c.c;
        for (d = 0; d < e.length; ++d)this.H[e[d].O()].call(this, b, e[d])
    };
    function ux(b, c) {
        var d = b.e;
        null === d ? (d = new P(new Ik(c)), b.e = d, b.q.Df(d)) : d.R().W(c)
    }

    function ox(b) {
        tx(this, b.pixel, b.map);
        this.g = [];
        var c = this.e;
        if (null !== c) {
            b = [];
            for (var c = c.R().Q(), d = Sd([c]), d = ln(this.a, d), e = 0, f = d.length; e < f; ++e) {
                var g = d[e], h = g.ha;
                Ad(h[0], c) ? this.g.push([g, 0]) : Ad(h[1], c) ? this.g.push([g, 1]) : ma(h)in this.U && b.push([g, c])
            }
            for (e = b.length - 1; 0 <= e; --e)this.Ti.apply(this, b[e])
        }
        return null !== this.e
    }

    function px(b) {
        b = b.coordinate;
        for (var c = 0, d = this.g.length; c < d; ++c) {
            for (var e = this.g[c], f = e[0], g = f.depth, h = f.geometry, k = h.Q(), n = f.ha, e = e[1]; b.length < h.B;)b.push(0);
            switch (h.O()) {
                case "Point":
                    k = b;
                    n[0] = n[1] = b;
                    break;
                case "MultiPoint":
                    k[f.index] = b;
                    n[0] = n[1] = b;
                    break;
                case "LineString":
                    k[f.index + e] = b;
                    n[e] = b;
                    break;
                case "MultiLineString":
                    k[g[0]][f.index + e] = b;
                    n[e] = b;
                    break;
                case "Polygon":
                    k[g[0]][f.index + e] = b;
                    n[e] = b;
                    break;
                case "MultiPolygon":
                    k[g[1]][g[0]][f.index + e] = b, n[e] = b
            }
            h.W(k);
            ux(this, b)
        }
    }

    function rx() {
        for (var b, c = this.g.length - 1; 0 <= c; --c)b = this.g[c][0], this.a.update(Sd(b.ha), b);
        return !1
    }

    function qx(b) {
        var c;
        b.map.a().q.slice()[1] || b.type != Gi || (this.S = b.pixel, tx(this, b.pixel, b.map));
        if (null !== this.e && this.N && this.ca(b)) {
            this.e.R();
            c = this.g;
            var d = {}, e = !1, f, g, h, k, n, p, q, r, s;
            for (n = c.length - 1; 0 <= n; --n)if (h = c[n], r = h[0], k = r.geometry, g = k.Q(), s = ma(r.feature), f = q = p = void 0, 0 === h[1] ? (q = r, p = r.index) : 1 == h[1] && (f = r, p = r.index + 1), s in d || (d[s] = [f, q, p]), h = d[s], m(f) && (h[0] = f), m(q) && (h[1] = q), m(h[0]) && m(h[1])) {
                f = g;
                e = !1;
                q = p - 1;
                switch (k.O()) {
                    case "MultiLineString":
                        g[r.depth[0]].splice(p, 1);
                        e = !0;
                        break;
                    case "LineString":
                        g.splice(p,
                            1);
                        e = !0;
                        break;
                    case "MultiPolygon":
                        f = f[r.depth[1]];
                    case "Polygon":
                        f = f[r.depth[0]], 4 < f.length && (p == f.length - 1 && (p = 0), f.splice(p, 1), e = !0, 0 === p && (f.pop(), f.push(f[0]), q = f.length - 1))
                }
                e && (this.a.remove(h[0]), this.a.remove(h[1]), k.W(g), g = {
                    depth: r.depth,
                    feature: r.feature,
                    geometry: r.geometry,
                    index: q,
                    ha: [h[0].ha[0], h[1].ha[1]]
                }, this.a.sa(Sd(g.ha), g), vx(this, k, p, r.depth, -1), this.q.Ed(this.e), this.e = null)
            }
            c = e
        }
        return ak.call(this, b) && !c
    }

    function tx(b, c, d) {
        function e(b, c) {
            return Cd(f, xd(f, b.ha)) - Cd(f, xd(f, c.ha))
        }

        var f = d.ra(c), g = d.ra([c[0] - b.i, c[1] + b.i]), h = d.ra([c[0] + b.i, c[1] - b.i]), g = Sd([g, h]), g = ln(b.a, g);
        if (0 < g.length) {
            g.sort(e);
            var h = g[0].ha, k = xd(f, h), n = d.e(k);
            if (Math.sqrt(Cd(c, n)) <= b.i) {
                c = d.e(h[0]);
                d = d.e(h[1]);
                c = Cd(n, c);
                d = Cd(n, d);
                b.N = Math.sqrt(Math.min(c, d)) <= b.i;
                b.N && (k = c > d ? h[1] : h[0]);
                ux(b, k);
                d = {};
                d[ma(h)] = !0;
                c = 1;
                for (n = g.length; c < n; ++c)if (k = g[c].ha, Ad(h[0], k[0]) && Ad(h[1], k[1]) || Ad(h[0], k[1]) && Ad(h[1], k[0]))d[ma(k)] = !0; else break;
                b.U = d;
                return
            }
        }
        null !== b.e && (b.q.Ed(b.e), b.e = null)
    }

    l.Ti = function (b, c) {
        for (var d = b.ha, e = b.feature, f = b.geometry, g = b.depth, h = b.index, k; c.length < f.B;)c.push(0);
        switch (f.O()) {
            case "MultiLineString":
                k = f.Q();
                k[g[0]].splice(h + 1, 0, c);
                break;
            case "Polygon":
                k = f.Q();
                k[g[0]].splice(h + 1, 0, c);
                break;
            case "MultiPolygon":
                k = f.Q();
                k[g[1]][g[0]].splice(h + 1, 0, c);
                break;
            case "LineString":
                k = f.Q();
                k.splice(h + 1, 0, c);
                break;
            default:
                return
        }
        f.W(k);
        k = this.a;
        k.remove(b);
        vx(this, f, h, g, 1);
        var n = {ha: [d[0], c], feature: e, geometry: f, depth: g, index: h};
        k.sa(Sd(n.ha), n);
        this.g.push([n, 1]);
        d =
        {ha: [c, d[1]], feature: e, geometry: f, depth: g, index: h + 1};
        k.sa(Sd(d.ha), d);
        this.g.push([d, 0])
    };
    function vx(b, c, d, e, f) {
        nn(b.a, c.J(), function (b) {
            b.geometry === c && (!m(e) || fb(b.depth, e)) && b.index > d && (b.index += f)
        })
    }

    function sx() {
        var b = ul();
        return function () {
            return b.Point
        }
    };
    function wx(b, c, d) {
        rc.call(this, b);
        this.selected = c;
        this.deselected = d
    }

    v(wx, rc);
    function xx(b) {
        Mj.call(this, {handleEvent: yx});
        b = m(b) ? b : {};
        this.i = m(b.condition) ? b.condition : Uj;
        this.e = m(b.addCondition) ? b.addCondition : bd;
        this.p = m(b.removeCondition) ? b.removeCondition : bd;
        this.D = m(b.toggleCondition) ? b.toggleCondition : Wj;
        this.g = m(b.multi) ? b.multi : !1;
        var c;
        if (m(b.layers))if (ka(b.layers))c = b.layers; else {
            var d = b.layers;
            c = function (b) {
                return Wa(d, b)
            }
        } else c = cd;
        this.f = c;
        this.a = new rp({style: m(b.style) ? b.style : zx()});
        b = this.a.a;
        w(b, "add", this.q, !1, this);
        w(b, "remove", this.r, !1, this)
    }

    v(xx, Mj);
    xx.prototype.o = function () {
        return this.a.a
    };
    function yx(b) {
        if (!this.i(b))return !0;
        var c = this.e(b), d = this.p(b), e = this.D(b), f = b.map, g = this.a.a, h = [], k = [], n = !1;
        if (c || d || e) {
            f.qe(b.pixel, function (b) {
                -1 == Pa(g.a, b) ? (c || e) && k.push(b) : (d || e) && h.push(b)
            }, void 0, this.f);
            for (f = h.length - 1; 0 <= f; --f)g.remove(h[f]);
            g.ye(k);
            if (0 < k.length || 0 < h.length)n = !0
        } else f.qe(b.pixel, function (b) {
            k.push(b);
            return !this.g
        }, this, this.f), 0 < k.length && 1 == g.Ib() && g.item(0) == k[0] || (n = !0, 0 !== g.Ib() && (h = Array.prototype.concat(g.a), g.clear()), g.ye(k));
        n && this.dispatchEvent(new wx("select",
            k, h));
        return Tj(b)
    }

    xx.prototype.setMap = function (b) {
        var c = this.k, d = this.a.a;
        null === c || d.forEach(c.ic, c);
        xx.T.setMap.call(this, b);
        this.a.setMap(b);
        null === b || d.forEach(b.Xa, b)
    };
    function zx() {
        var b = ul();
        ab(b.Polygon, b.LineString);
        ab(b.GeometryCollection, b.LineString);
        return function (c) {
            return b[c.R().O()]
        }
    }

    xx.prototype.q = function (b) {
        b = b.element;
        var c = this.k;
        null === c || c.Xa(b)
    };
    xx.prototype.r = function (b) {
        b = b.element;
        var c = this.k;
        null === c || c.ic(b)
    };
    function Y(b) {
        b = m(b) ? b : {};
        var c = Bb(b);
        delete c.gradient;
        delete c.radius;
        delete c.blur;
        delete c.shadow;
        delete c.weight;
        J.call(this, c);
        this.ia = null;
        this.ef = m(b.shadow) ? b.shadow : 250;
        this.ad = void 0;
        this.zc = null;
        w(this, vd("gradient"), this.rh, !1, this);
        this.xc(m(b.gradient) ? b.gradient : Ax);
        this.wc(m(b.blur) ? b.blur : 15);
        this.jc(m(b.radius) ? b.radius : 8);
        w(this, [vd("blur"), vd("radius")], this.Te, !1, this);
        this.Te();
        var d = m(b.weight) ? b.weight : "weight", e;
        ia(d) ? e = function (b) {
            return b.get(d)
        } : e = d;
        this.ka(ra(function (b) {
            b =
                e(b);
            b = m(b) ? Wb(b, 0, 1) : 1;
            var c = 255 * b | 0, d = this.zc[c];
            m(d) || (d = [new ql({image: new vj({opacity: b, src: this.ad})})], this.zc[c] = d);
            return d
        }, this));
        this.set("renderOrder", null);
        w(this, "render", this.uh, !1, this)
    }

    v(Y, J);
    var Ax = ["#00f", "#0ff", "#0f0", "#ff0", "#f00"];
    Y.prototype.Ea = function () {
        return this.get("blur")
    };
    Y.prototype.getBlur = Y.prototype.Ea;
    Y.prototype.Fa = function () {
        return this.get("gradient")
    };
    Y.prototype.getGradient = Y.prototype.Fa;
    Y.prototype.ic = function () {
        return this.get("radius")
    };
    Y.prototype.getRadius = Y.prototype.ic;
    Y.prototype.rh = function () {
        for (var b = this.Fa(), c = Mf(1, 256), d = c.createLinearGradient(0, 0, 1, 256), e = 1 / (b.length - 1), f = 0, g = b.length; f < g; ++f)d.addColorStop(f * e, b[f]);
        c.fillStyle = d;
        c.fillRect(0, 0, 1, 256);
        this.ia = c.getImageData(0, 0, 1, 256).data
    };
    Y.prototype.Te = function () {
        var b = this.ic(), c = this.Ea(), d = b + c + 1, e = 2 * d, e = Mf(e, e);
        e.shadowOffsetX = e.shadowOffsetY = this.ef;
        e.shadowBlur = c;
        e.shadowColor = "#000";
        e.beginPath();
        c = d - this.ef;
        e.arc(c, c, b, 0, 2 * Math.PI, !0);
        e.fill();
        this.ad = e.canvas.toDataURL();
        this.zc = Array(256);
        this.l()
    };
    Y.prototype.uh = function (b) {
        b = b.context;
        var c = b.canvas, c = b.getImageData(0, 0, c.width, c.height), d = c.data, e, f, g;
        e = 0;
        for (f = d.length; e < f; e += 4)if (g = 4 * d[e + 3])d[e] = this.ia[g], d[e + 1] = this.ia[g + 1], d[e + 2] = this.ia[g + 2];
        b.putImageData(c, 0, 0)
    };
    Y.prototype.wc = function (b) {
        this.set("blur", b)
    };
    Y.prototype.setBlur = Y.prototype.wc;
    Y.prototype.xc = function (b) {
        this.set("gradient", b)
    };
    Y.prototype.setGradient = Y.prototype.xc;
    Y.prototype.jc = function (b) {
        this.set("radius", b)
    };
    Y.prototype.setRadius = Y.prototype.jc;
    function Bx(b) {
        return [b]
    };
    function Cx(b, c) {
        var d = c || {}, e = d.document || document, f = Df("SCRIPT"), g = {
            qg: f,
            fc: void 0
        }, h = new Bw(Dx, g), k = null, n = null != d.timeout ? d.timeout : 5E3;
        0 < n && (k = window.setTimeout(function () {
            Ex(f, !0);
            var c = new Fx(Gx, "Timeout reached for loading script " + b);
            Dw(h);
            Ew(h, !1, c)
        }, n), g.fc = k);
        f.onload = f.onreadystatechange = function () {
            f.readyState && "loaded" != f.readyState && "complete" != f.readyState || (Ex(f, d.ph || !1, k), Dw(h), Ew(h, !0, null))
        };
        f.onerror = function () {
            Ex(f, !0, k);
            var c = new Fx(Hx, "Error while loading script " + b);
            Dw(h);
            Ew(h, !1, c)
        };
        xf(f, {type: "text/javascript", charset: "UTF-8", src: b});
        Ix(e).appendChild(f);
        return h
    }

    function Ix(b) {
        var c = b.getElementsByTagName("HEAD");
        return c && 0 != c.length ? c[0] : b.documentElement
    }

    function Dx() {
        if (this && this.qg) {
            var b = this.qg;
            b && "SCRIPT" == b.tagName && Ex(b, !0, this.fc)
        }
    }

    function Ex(b, c, d) {
        null != d && ba.clearTimeout(d);
        b.onload = ca;
        b.onerror = ca;
        b.onreadystatechange = ca;
        c && window.setTimeout(function () {
            Hf(b)
        }, 0)
    }

    var Hx = 0, Gx = 1;

    function Fx(b, c) {
        var d = "Jsloader error (code #" + b + ")";
        c && (d += ": " + c);
        wa.call(this, d);
        this.code = b
    }

    v(Fx, wa);
    function Jx(b, c) {
        this.d = new Or(b);
        this.a = c ? c : "callback";
        this.fc = 5E3
    }

    var Kx = 0;
    Jx.prototype.send = function (b, c, d, e) {
        b = b || null;
        e = e || "_" + (Kx++).toString(36) + ta().toString(36);
        ba._callbacks_ || (ba._callbacks_ = {});
        var f = this.d.clone();
        if (b)for (var g in b)if (!b.hasOwnProperty || b.hasOwnProperty(g)) {
            var h = f, k = g, n = b[g];
            ga(n) || (n = [String(n)]);
            gs(h.a, k, n)
        }
        c && (ba._callbacks_[e] = Lx(e, c), c = this.a, g = "_callbacks_." + e, ga(g) || (g = [String(g)]), gs(f.a, c, g));
        c = Cx(f.toString(), {timeout: this.fc, ph: !0});
        Hw(c, null, Mx(e, b, d), void 0);
        return {aa: e, jf: c}
    };
    Jx.prototype.cancel = function (b) {
        b && (b.jf && b.jf.cancel(), b.aa && Nx(b.aa, !1))
    };
    function Mx(b, c, d) {
        return function () {
            Nx(b, !1);
            d && d(c)
        }
    }

    function Lx(b, c) {
        return function (d) {
            Nx(b, !0);
            c.apply(void 0, arguments)
        }
    }

    function Nx(b, c) {
        ba._callbacks_[b] && (c ? delete ba._callbacks_[b] : ba._callbacks_[b] = ca)
    };
    function Ox(b) {
        var c = /\{z\}/g, d = /\{x\}/g, e = /\{y\}/g, f = /\{-y\}/g;
        return function (g) {
            return null === g ? void 0 : b.replace(c, g[0].toString()).replace(d, g[1].toString()).replace(e, g[2].toString()).replace(f, function () {
                return ((1 << g[0]) - g[2] - 1).toString()
            })
        }
    }

    function Px(b) {
        return Qx(Sa(b, Ox))
    }

    function Qx(b) {
        return 1 === b.length ? b[0] : function (c, d, e) {
            return null === c ? void 0 : b[Xb((c[1] << c[0]) + c[2], b.length)](c, d, e)
        }
    }

    function Rx() {
    }

    function Sx(b, c) {
        var d = [0, 0, 0];
        return function (e, f, g) {
            return null === e ? void 0 : c(b(e, g, d), f, g)
        }
    }

    function Tx(b) {
        var c = [], d = /\{(\d)-(\d)\}/.exec(b) || /\{([a-z])-([a-z])\}/.exec(b);
        if (d) {
            var e = d[2].charCodeAt(0), f;
            for (f = d[1].charCodeAt(0); f <= e; ++f)c.push(b.replace(d[0], String.fromCharCode(f)))
        } else c.push(b);
        return c
    };
    function Ux(b) {
        cj.call(this, {
            attributions: b.attributions,
            extent: b.extent,
            logo: b.logo,
            opaque: b.opaque,
            projection: b.projection,
            state: m(b.state) ? b.state : void 0,
            tileGrid: b.tileGrid,
            tilePixelRatio: b.tilePixelRatio
        });
        this.tileUrlFunction = m(b.tileUrlFunction) ? b.tileUrlFunction : Rx;
        this.crossOrigin = m(b.crossOrigin) ? b.crossOrigin : null;
        this.tileLoadFunction = m(b.tileLoadFunction) ? b.tileLoadFunction : Vx;
        this.tileClass = m(b.tileClass) ? b.tileClass : $v
    }

    v(Ux, cj);
    function Vx(b, c) {
        b.Ta().src = c
    }

    l = Ux.prototype;
    l.Vb = function (b, c, d, e, f) {
        var g = this.nb(b, c, d);
        if (Ri(this.a, g))return this.a.get(g);
        b = [b, c, d];
        e = this.tileUrlFunction(b, e, f);
        e = new this.tileClass(b, m(e) ? 0 : 4, m(e) ? e : "", this.crossOrigin, this.tileLoadFunction);
        w(e, "change", this.tk, !1, this);
        this.a.set(g, e);
        return e
    };
    l.bb = function () {
        return this.tileLoadFunction
    };
    l.cb = function () {
        return this.tileUrlFunction
    };
    l.tk = function (b) {
        b = b.target;
        switch (b.state) {
            case 1:
                this.dispatchEvent(new fj("tileloadstart", b));
                break;
            case 2:
                this.dispatchEvent(new fj("tileloadend", b));
                break;
            case 3:
                this.dispatchEvent(new fj("tileloaderror", b))
        }
    };
    l.jb = function (b) {
        this.a.clear();
        this.tileLoadFunction = b;
        this.l()
    };
    l.ta = function (b) {
        this.a.clear();
        this.tileUrlFunction = b;
        this.l()
    };
    l.Pe = function (b, c, d) {
        b = this.nb(b, c, d);
        Ri(this.a, b) && this.a.get(b)
    };
    function Wx(b) {
        var c = m(b.extent) ? b.extent : Ml, d = aj(c, b.maxZoom, b.tileSize);
        Ui.call(this, {minZoom: b.minZoom, origin: me(c, "top-left"), resolutions: d, tileSize: b.tileSize})
    }

    v(Wx, Ui);
    Wx.prototype.Db = function (b) {
        b = m(b) ? b : {};
        var c = this.minZoom, d = this.maxZoom, e = m(b.wrapX) ? b.wrapX : !0, f = null;
        if (m(b.extent)) {
            var f = Array(d + 1), g;
            for (g = 0; g <= d; ++g)f[g] = g < c ? null : Xi(this, b.extent, g)
        }
        return function (b, g, n) {
            g = b[0];
            if (g < c || d < g)return null;
            var p = Math.pow(2, g), q = b[1];
            if (e)q = Xb(q, p); else if (0 > q || p <= q)return null;
            b = b[2];
            return b < -p || -1 < b || null !== f && !nf(f[g], q, b) ? null : gf(g, q, -b - 1, n)
        }
    };
    Wx.prototype.td = function (b, c) {
        if (b[0] < this.maxZoom) {
            var d = 2 * b[1], e = 2 * b[2];
            return mf(d, d + 1, e, e + 1, c)
        }
        return null
    };
    Wx.prototype.gd = function (b, c, d, e) {
        e = mf(0, b[1], 0, b[2], e);
        for (b = b[0] - 1; b >= this.minZoom; --b)if (e.a = e.c >>= 1, e.b = e.d >>= 1, c.call(d, b, e))return !0;
        return !1
    };
    function Xx(b) {
        Ux.call(this, {
            crossOrigin: "anonymous",
            opaque: !0,
            projection: Be("EPSG:3857"),
            state: "loading",
            tileLoadFunction: b.tileLoadFunction
        });
        this.c = m(b.culture) ? b.culture : "en-us";
        this.b = m(b.maxZoom) ? b.maxZoom : -1;
        this.i = m(b.wrapX) ? b.wrapX : !0;
        var c = new Or((Tb ? "https:" : "http:") + "//dev.virtualearth.net/REST/v1/Imagery/Metadata/" + b.imagerySet);
        (new Jx(c, "jsonp")).send({
            include: "ImageryProviders",
            uriScheme: Tb ? "https" : "http",
            key: b.key
        }, ra(this.e, this))
    }

    v(Xx, Ux);
    var Yx = new pf({html: '<a class="ol-attribution-bing-tos" href="http://www.microsoft.com/maps/product/terms.html">Terms of Use</a>'});
    Xx.prototype.e = function (b) {
        if (200 != b.statusCode || "OK" != b.statusDescription || "ValidCredentials" != b.authenticationResultCode || 1 != b.resourceSets.length || 1 != b.resourceSets[0].resources.length)Ki(this, "error"); else {
            var c = b.brandLogoUri;
            Tb && -1 == c.indexOf("https") && (c = c.replace("http", "https"));
            var d = b.resourceSets[0].resources[0], e = -1 == this.b ? d.zoomMax : this.b, f = new Wx({
                extent: bj(this.g),
                minZoom: d.zoomMin,
                maxZoom: e,
                tileSize: d.imageWidth
            });
            this.tileGrid = f;
            var g = this.c;
            this.tileUrlFunction = Sx(f.Db({wrapX: this.i}),
                Qx(Sa(d.imageUrlSubdomains, function (b) {
                    var c = d.imageUrl.replace("{subdomain}", b).replace("{culture}", g);
                    return function (b) {
                        return null === b ? void 0 : c.replace("{quadkey}", jf(b))
                    }
                })));
            if (d.imageryProviders) {
                var h = Ae(Be("EPSG:4326"), this.g);
                b = Sa(d.imageryProviders, function (b) {
                    var c = b.attribution, d = {};
                    Qa(b.coverageAreas, function (b) {
                        var c = b.zoomMin, g = Math.min(b.zoomMax, e);
                        b = b.bbox;
                        b = ue([b[1], b[0], b[3], b[2]], h);
                        var k, n;
                        for (k = c; k <= g; ++k)n = k.toString(), c = Xi(f, b, k), n in d ? d[n].push(c) : d[n] = [c]
                    });
                    return new pf({
                        html: c,
                        tileRanges: d
                    })
                });
                b.push(Yx);
                this.f = b
            }
            this.D = c;
            Ki(this, "ready")
        }
    };
    function Zx(b) {
        on.call(this, {attributions: b.attributions, extent: b.extent, logo: b.logo, projection: b.projection});
        this.p = void 0;
        this.r = m(b.distance) ? b.distance : 20;
        this.o = [];
        this.a = b.source;
        this.a.s("change", Zx.prototype.N, this)
    }

    v(Zx, on);
    Zx.prototype.H = function () {
        return this.a
    };
    Zx.prototype.Hb = function (b, c, d) {
        c !== this.p && (this.clear(), this.p = c, this.a.Hb(b, c, d), $x(this), this.Ga(this.o))
    };
    Zx.prototype.N = function () {
        this.clear();
        $x(this);
        this.Ga(this.o);
        this.l()
    };
    function $x(b) {
        if (m(b.p)) {
            b.o.length = 0;
            for (var c = Td(), d = b.r * b.p, e = b.a.Aa(), f = {}, g = 0, h = e.length; g < h; g++) {
                var k = e[g];
                tb(f, ma(k).toString()) || (k = k.R().Q(), ce(k, c), Xd(c, d, c), k = ln(b.a.b, c), k = Ra(k, function (b) {
                    b = ma(b).toString();
                    return b in f ? !1 : f[b] = !0
                }), b.o.push(ay(k)))
            }
        }
    }

    function ay(b) {
        for (var c = b.length, d = [0, 0], e = 0; e < c; e++) {
            var f = b[e].R().Q();
            wd(d, f)
        }
        c = 1 / c;
        d[0] *= c;
        d[1] *= c;
        d = new P(new Ik(d));
        d.set("features", b);
        return d
    };
    function by(b, c, d) {
        if (ka(b))d && (b = ra(b, d)); else if (b && "function" == typeof b.handleEvent)b = ra(b.handleEvent, b); else throw Error("Invalid listener argument");
        return 2147483647 < c ? -1 : ba.setTimeout(b, c || 0)
    };
    function cy() {
    }

    cy.prototype.a = null;
    function dy(b) {
        var c;
        (c = b.a) || (c = {}, ey(b) && (c[0] = !0, c[1] = !0), c = b.a = c);
        return c
    };
    var fy;

    function gy() {
    }

    v(gy, cy);
    function hy(b) {
        return (b = ey(b)) ? new ActiveXObject(b) : new XMLHttpRequest
    }

    function ey(b) {
        if (!b.d && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            for (var c = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], d = 0; d < c.length; d++) {
                var e = c[d];
                try {
                    return new ActiveXObject(e), b.d = e
                } catch (f) {
                }
            }
            throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
        }
        return b.d
    }

    fy = new gy;
    function iy(b) {
        id.call(this);
        this.r = new th;
        this.i = b || null;
        this.a = !1;
        this.n = this.V = null;
        this.f = this.o = "";
        this.d = this.q = this.c = this.k = !1;
        this.g = 0;
        this.b = null;
        this.e = jy;
        this.p = this.D = !1
    }

    v(iy, id);
    var jy = "", ky = /^https?$/i, ly = ["POST", "PUT"];
    l = iy.prototype;
    l.send = function (b, c, d, e) {
        if (this.V)throw Error("[goog.net.XhrIo] Object is active with another request=" + this.o + "; newUri=" + b);
        c = c ? c.toUpperCase() : "GET";
        this.o = b;
        this.f = "";
        this.k = !1;
        this.a = !0;
        this.V = this.i ? hy(this.i) : hy(fy);
        this.n = this.i ? dy(this.i) : dy(fy);
        this.V.onreadystatechange = ra(this.Yf, this);
        try {
            this.q = !0, this.V.open(c, String(b), !0), this.q = !1
        } catch (f) {
            my(this, f);
            return
        }
        b = d || "";
        var g = this.r.clone();
        e && sh(e, function (b, c) {
            g.set(c, b)
        });
        e = Ua(g.G(), ny);
        d = ba.FormData && b instanceof ba.FormData;
        !Wa(ly,
            c) || e || d || g.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        g.forEach(function (b, c) {
            this.V.setRequestHeader(c, b)
        }, this);
        this.e && (this.V.responseType = this.e);
        "withCredentials"in this.V && (this.V.withCredentials = this.D);
        try {
            oy(this), 0 < this.g && ((this.p = py(this.V)) ? (this.V.timeout = this.g, this.V.ontimeout = ra(this.fc, this)) : this.b = by(this.fc, this.g, this)), this.c = !0, this.V.send(b), this.c = !1
        } catch (h) {
            my(this, h)
        }
    };
    function py(b) {
        return Gb && Pb(9) && ja(b.timeout) && m(b.ontimeout)
    }

    function ny(b) {
        return "content-type" == b.toLowerCase()
    }

    l.fc = function () {
        "undefined" != typeof aa && this.V && (this.f = "Timed out after " + this.g + "ms, aborting", this.dispatchEvent("timeout"), this.V && this.a && (this.a = !1, this.d = !0, this.V.abort(), this.d = !1, this.dispatchEvent("complete"), this.dispatchEvent("abort"), qy(this)))
    };
    function my(b, c) {
        b.a = !1;
        b.V && (b.d = !0, b.V.abort(), b.d = !1);
        b.f = c;
        ry(b);
        qy(b)
    }

    function ry(b) {
        b.k || (b.k = !0, b.dispatchEvent("complete"), b.dispatchEvent("error"))
    }

    l.P = function () {
        this.V && (this.a && (this.a = !1, this.d = !0, this.V.abort(), this.d = !1), qy(this, !0));
        iy.T.P.call(this)
    };
    l.Yf = function () {
        this.oa || (this.q || this.c || this.d ? sy(this) : this.il())
    };
    l.il = function () {
        sy(this)
    };
    function sy(b) {
        if (b.a && "undefined" != typeof aa && (!b.n[1] || 4 != ty(b) || 2 != uy(b)))if (b.c && 4 == ty(b))by(b.Yf, 0, b); else if (b.dispatchEvent("readystatechange"), 4 == ty(b)) {
            b.a = !1;
            try {
                if (vy(b))b.dispatchEvent("complete"), b.dispatchEvent("success"); else {
                    var c;
                    try {
                        c = 2 < ty(b) ? b.V.statusText : ""
                    } catch (d) {
                        c = ""
                    }
                    b.f = c + " [" + uy(b) + "]";
                    ry(b)
                }
            } finally {
                qy(b)
            }
        }
    }

    function qy(b, c) {
        if (b.V) {
            oy(b);
            var d = b.V, e = b.n[0] ? ca : null;
            b.V = null;
            b.n = null;
            c || b.dispatchEvent("ready");
            try {
                d.onreadystatechange = e
            } catch (f) {
            }
        }
    }

    function oy(b) {
        b.V && b.p && (b.V.ontimeout = null);
        ja(b.b) && (ba.clearTimeout(b.b), b.b = null)
    }

    function vy(b) {
        var c = uy(b), d;
        a:switch (c) {
            case 200:
            case 201:
            case 202:
            case 204:
            case 206:
            case 304:
            case 1223:
                d = !0;
                break a;
            default:
                d = !1
        }
        if (!d) {
            if (c = 0 === c)b = Ir(String(b.o))[1] || null, !b && self.location && (b = self.location.protocol, b = b.substr(0, b.length - 1)), c = !ky.test(b ? b.toLowerCase() : "");
            d = c
        }
        return d
    }

    function ty(b) {
        return b.V ? b.V.readyState : 0
    }

    function uy(b) {
        try {
            return 2 < ty(b) ? b.V.status : -1
        } catch (c) {
            return -1
        }
    }

    function wy(b) {
        try {
            return b.V ? b.V.responseText : ""
        } catch (c) {
            return ""
        }
    }

    function xy(b) {
        try {
            if (!b.V)return null;
            if ("response"in b.V)return b.V.response;
            switch (b.e) {
                case jy:
                case "text":
                    return b.V.responseText;
                case "arraybuffer":
                    if ("mozResponseArrayBuffer"in b.V)return b.V.mozResponseArrayBuffer
            }
            return null
        } catch (c) {
            return null
        }
    };
    function Z(b) {
        on.call(this, {attributions: b.attributions, logo: b.logo, projection: b.projection});
        this.format = b.format
    }

    v(Z, on);
    function yy(b, c, d, e, f) {
        var g = new iy;
        g.e = "binary" == b.format.O() && Wf ? "arraybuffer" : "text";
        w(g, "complete", function (b) {
            b = b.target;
            if (vy(b)) {
                var c = this.format.O(), g;
                if ("binary" == c && Wf)g = xy(b); else if ("json" == c)g = wy(b); else if ("text" == c)g = wy(b); else if ("xml" == c) {
                    if (!Gb)try {
                        g = b.V ? b.V.responseXML : null
                    } catch (p) {
                        g = null
                    }
                    null != g || (g = hq(wy(b)))
                }
                null != g ? d.call(f, this.a(g)) : Ki(this, "error")
            } else e.call(f);
            qc(b)
        }, !1, b);
        g.send(c)
    }

    Z.prototype.a = function (b) {
        return this.format.ma(b, {featureProjection: this.g})
    };
    function $(b) {
        Z.call(this, {attributions: b.attributions, format: b.format, logo: b.logo, projection: b.projection});
        m(b.arrayBuffer) && this.lb(this.a(b.arrayBuffer));
        m(b.doc) && this.lb(this.a(b.doc));
        m(b.node) && this.lb(this.a(b.node));
        m(b.object) && this.lb(this.a(b.object));
        m(b.text) && this.lb(this.a(b.text));
        if (m(b.url) || m(b.urls))if (Ki(this, "loading"), m(b.url) && yy(this, b.url, this.p, this.o, this), m(b.urls)) {
            b = b.urls;
            var c, d;
            c = 0;
            for (d = b.length; c < d; ++c)yy(this, b[c], this.p, this.o, this)
        }
    }

    v($, Z);
    $.prototype.o = function () {
        Ki(this, "error")
    };
    $.prototype.p = function (b) {
        this.lb(b);
        Ki(this, "ready")
    };
    function zy(b) {
        b = m(b) ? b : {};
        $.call(this, {
            attributions: b.attributions,
            extent: b.extent,
            format: new Dp({defaultDataProjection: b.defaultProjection}),
            logo: b.logo,
            object: b.object,
            projection: b.projection,
            text: b.text,
            url: b.url,
            urls: b.urls
        })
    }

    v(zy, $);
    function Ay(b) {
        b = m(b) ? b : {};
        $.call(this, {
            attributions: b.attributions,
            doc: b.doc,
            extent: b.extent,
            format: new Tq,
            logo: b.logo,
            node: b.node,
            projection: b.projection,
            text: b.text,
            url: b.url,
            urls: b.urls
        })
    }

    v(Ay, $);
    function By(b) {
        b = m(b) ? b : {};
        $.call(this, {
            format: new Dr({altitudeMode: b.altitudeMode}),
            projection: b.projection,
            text: b.text,
            url: b.url,
            urls: b.urls
        })
    }

    v(By, $);
    function Cy(b) {
        $m.call(this, {projection: b.projection, resolutions: b.resolutions});
        this.N = m(b.crossOrigin) ? b.crossOrigin : null;
        this.e = m(b.displayDpi) ? b.displayDpi : 96;
        this.c = m(b.params) ? b.params : {};
        var c;
        m(b.url) ? c = bw(b.url, this.c, ra(this.$j, this)) : c = cw;
        this.p = c;
        this.a = m(b.imageLoadFunction) ? b.imageLoadFunction : fn;
        this.S = m(b.hidpi) ? b.hidpi : !0;
        this.H = m(b.metersPerUnit) ? b.metersPerUnit : 1;
        this.k = m(b.ratio) ? b.ratio : 1;
        this.U = m(b.useOverlay) ? b.useOverlay : !1;
        this.b = null;
        this.o = 0
    }

    v(Cy, $m);
    l = Cy.prototype;
    l.Zj = function () {
        return this.c
    };
    l.sc = function (b, c, d, e) {
        c = an(this, c);
        d = this.S ? d : 1;
        var f = this.b;
        if (null !== f && this.o == this.d && f.resolution == c && f.f == d && $d(f.J(), b))return f;
        1 != this.k && (b = b.slice(), te(b, this.k));
        e = this.p(b, [re(b) / c * d, oe(b) / c * d], e);
        m(e) ? (f = new Zv(b, c, d, this.f, e, this.N, this.a), w(f, "change", this.r, !1, this)) : f = null;
        this.b = f;
        this.o = this.d;
        return f
    };
    l.Yj = function () {
        return this.a
    };
    l.bk = function (b) {
        Db(this.c, b);
        this.l()
    };
    l.$j = function (b, c, d, e) {
        var f;
        f = this.H;
        var g = re(d), h = oe(d), k = e[0], n = e[1], p = .0254 / this.e;
        f = n * g > k * h ? g * f / (k * p) : h * f / (n * p);
        d = le(d);
        e = {
            OPERATION: this.U ? "GETDYNAMICMAPOVERLAYIMAGE" : "GETMAPIMAGE",
            VERSION: "2.0.0",
            LOCALE: "en",
            CLIENTAGENT: "ol.source.ImageMapGuide source",
            CLIP: "1",
            SETDISPLAYDPI: this.e,
            SETDISPLAYWIDTH: Math.round(e[0]),
            SETDISPLAYHEIGHT: Math.round(e[1]),
            SETVIEWSCALE: f,
            SETVIEWCENTERX: d[0],
            SETVIEWCENTERY: d[1]
        };
        Db(e, c);
        return Lr(Nr([b], e))
    };
    l.ak = function (b) {
        this.b = null;
        this.a = b;
        this.l()
    };
    function Dy(b) {
        var c = m(b.attributions) ? b.attributions : null, d = b.imageExtent, e, f;
        m(b.imageSize) && (e = oe(d) / b.imageSize[1], f = [e]);
        var g = m(b.crossOrigin) ? b.crossOrigin : null, h = m(b.imageLoadFunction) ? b.imageLoadFunction : fn;
        $m.call(this, {attributions: c, logo: b.logo, projection: Be(b.projection), resolutions: f});
        this.a = new Zv(d, e, 1, c, b.url, g, h)
    }

    v(Dy, $m);
    Dy.prototype.sc = function (b) {
        return qe(b, this.a.J()) ? this.a : null
    };
    function Ey(b) {
        b = m(b) ? b : {};
        $m.call(this, {
            attributions: b.attributions,
            logo: b.logo,
            projection: b.projection,
            resolutions: b.resolutions
        });
        this.S = m(b.crossOrigin) ? b.crossOrigin : null;
        this.c = b.url;
        this.k = m(b.imageLoadFunction) ? b.imageLoadFunction : fn;
        this.b = b.params;
        this.e = !0;
        Fy(this);
        this.N = b.serverType;
        this.U = m(b.hidpi) ? b.hidpi : !0;
        this.a = null;
        this.o = [0, 0];
        this.H = 0;
        this.p = m(b.ratio) ? b.ratio : 1.5
    }

    v(Ey, $m);
    var Gy = [101, 101];
    l = Ey.prototype;
    l.hk = function (b, c, d, e) {
        if (m(this.c)) {
            var f = ne(b, c, 0, Gy), g = {
                SERVICE: "WMS",
                VERSION: "1.3.0",
                REQUEST: "GetFeatureInfo",
                FORMAT: "image/png",
                TRANSPARENT: !0,
                QUERY_LAYERS: this.b.LAYERS
            };
            Db(g, this.b, e);
            e = Math.floor((f[3] - b[1]) / c);
            g[this.e ? "I" : "X"] = Math.floor((b[0] - f[0]) / c);
            g[this.e ? "J" : "Y"] = e;
            return Hy(this, f, Gy, 1, Be(d), g)
        }
    };
    l.jk = function () {
        return this.b
    };
    l.sc = function (b, c, d, e) {
        if (!m(this.c))return null;
        c = an(this, c);
        1 == d || this.U && m(this.N) || (d = 1);
        var f = this.a;
        if (null !== f && this.H == this.d && f.resolution == c && f.f == d && $d(f.J(), b))return f;
        f = {SERVICE: "WMS", VERSION: "1.3.0", REQUEST: "GetMap", FORMAT: "image/png", TRANSPARENT: !0};
        Db(f, this.b);
        b = b.slice();
        var g = (b[0] + b[2]) / 2, h = (b[1] + b[3]) / 2;
        if (1 != this.p) {
            var k = this.p * re(b) / 2, n = this.p * oe(b) / 2;
            b[0] = g - k;
            b[1] = h - n;
            b[2] = g + k;
            b[3] = h + n
        }
        var k = c / d, n = Math.ceil(re(b) / k), p = Math.ceil(oe(b) / k);
        b[0] = g - k * n / 2;
        b[2] = g + k * n / 2;
        b[1] = h - k *
        p / 2;
        b[3] = h + k * p / 2;
        this.o[0] = n;
        this.o[1] = p;
        e = Hy(this, b, this.o, d, e, f);
        this.a = new Zv(b, c, d, this.f, e, this.S, this.k);
        this.H = this.d;
        w(this.a, "change", this.r, !1, this);
        return this.a
    };
    l.ik = function () {
        return this.k
    };
    function Hy(b, c, d, e, f, g) {
        g[b.e ? "CRS" : "SRS"] = f.a;
        "STYLES"in b.b || (g.STYLES = new String(""));
        if (1 != e)switch (b.N) {
            case "geoserver":
                g.FORMAT_OPTIONS = "dpi:" + (90 * e + .5 | 0);
                break;
            case "mapserver":
                g.MAP_RESOLUTION = 90 * e;
                break;
            case "carmentaserver":
            case "qgis":
                g.DPI = 90 * e
        }
        g.WIDTH = d[0];
        g.HEIGHT = d[1];
        d = f.b;
        var h;
        b.e && "ne" == d.substr(0, 2) ? h = [c[1], c[0], c[3], c[2]] : h = c;
        g.BBOX = h.join(",");
        return Lr(Nr([b.c], g))
    }

    l.kk = function () {
        return this.c
    };
    l.lk = function (b) {
        this.a = null;
        this.k = b;
        this.l()
    };
    l.mk = function (b) {
        b != this.c && (this.c = b, this.a = null, this.l())
    };
    l.nk = function (b) {
        Db(this.b, b);
        Fy(this);
        this.a = null;
        this.l()
    };
    function Fy(b) {
        b.e = 0 <= Ma(zb(b.b, "VERSION", "1.3.0"), "1.3")
    };
    function Iy(b) {
        b = m(b) ? b : {};
        $.call(this, {
            attributions: b.attributions,
            doc: b.doc,
            format: new is({extractStyles: b.extractStyles, defaultStyle: b.defaultStyle}),
            logo: b.logo,
            node: b.node,
            projection: b.projection,
            text: b.text,
            url: b.url,
            urls: b.urls
        })
    }

    v(Iy, $);
    function Jy(b) {
        var c = m(b.projection) ? b.projection : "EPSG:3857", d = new Wx({
            extent: bj(c),
            maxZoom: b.maxZoom,
            tileSize: b.tileSize
        });
        Ux.call(this, {
            attributions: b.attributions,
            crossOrigin: b.crossOrigin,
            logo: b.logo,
            projection: c,
            tileGrid: d,
            tileLoadFunction: b.tileLoadFunction,
            tilePixelRatio: b.tilePixelRatio,
            tileUrlFunction: Rx
        });
        this.i = d.Db({wrapX: b.wrapX});
        m(b.tileUrlFunction) ? this.ta(b.tileUrlFunction) : m(b.urls) ? this.ta(Px(b.urls)) : m(b.url) && this.b(b.url)
    }

    v(Jy, Ux);
    Jy.prototype.ta = function (b) {
        Jy.T.ta.call(this, Sx(this.i, b))
    };
    Jy.prototype.b = function (b) {
        this.ta(Px(Tx(b)))
    };
    function Ky(b) {
        b = m(b) ? b : {};
        var c;
        m(b.attributions) ? c = b.attributions : c = [Ly];
        var d = Tb ? "https:" : "http:";
        Jy.call(this, {
            attributions: c,
            crossOrigin: m(b.crossOrigin) ? b.crossOrigin : "anonymous",
            opaque: !0,
            maxZoom: m(b.maxZoom) ? b.maxZoom : 19,
            tileLoadFunction: b.tileLoadFunction,
            url: m(b.url) ? b.url : d + "//{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            wrapX: b.wrapX
        })
    }

    v(Ky, Jy);
    var Ly = new pf({html: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.'});

    function My(b) {
        b = m(b) ? b : {};
        var c = Ny[b.layer];
        this.c = b.layer;
        var d = Tb ? "https:" : "http:";
        Jy.call(this, {
            attributions: c.attributions,
            crossOrigin: "anonymous",
            logo: "//developer.mapquest.com/content/osm/mq_logo.png",
            maxZoom: c.maxZoom,
            opaque: !0,
            tileLoadFunction: b.tileLoadFunction,
            url: m(b.url) ? b.url : d + "//otile{1-4}-s.mqcdn.com/tiles/1.0.0/" + this.c + "/{z}/{x}/{y}.jpg"
        })
    }

    v(My, Jy);
    var Oy = new pf({html: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a>'}), Ny = {
        osm: {
            maxZoom: 19,
            attributions: [Oy, Ly]
        },
        sat: {
            maxZoom: 18,
            attributions: [Oy, new pf({html: "Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency"})]
        },
        hyb: {maxZoom: 18, attributions: [Oy, Ly]}
    };
    My.prototype.e = function () {
        return this.c
    };
    function Py(b) {
        b = m(b) ? b : {};
        $.call(this, {
            attributions: b.attributions,
            doc: b.doc,
            format: new St,
            logo: b.logo,
            node: b.node,
            projection: b.projection,
            text: b.text,
            url: b.url,
            urls: b.urls
        })
    }

    v(Py, $);
    function Qy(b) {
        Z.call(this, {attributions: b.attributions, format: b.format, logo: b.logo, projection: b.projection});
        this.p = new jn;
        this.r = b.loader;
        this.H = m(b.strategy) ? b.strategy : Bx;
        this.o = {}
    }

    v(Qy, Z);
    Qy.prototype.lb = function (b) {
        var c = [], d, e;
        d = 0;
        for (e = b.length; d < e; ++d) {
            var f = b[d], g = f.aa;
            m(g) ? g in this.o || (c.push(f), this.o[g] = !0) : c.push(f)
        }
        Qy.T.lb.call(this, c)
    };
    Qy.prototype.clear = function (b) {
        xb(this.o);
        this.p.clear();
        Qy.T.clear.call(this, b)
    };
    Qy.prototype.Hb = function (b, c, d) {
        var e = this.p;
        b = this.H(b, c);
        var f, g;
        f = 0;
        for (g = b.length; f < g; ++f) {
            var h = b[f];
            nn(e, h, function (b) {
                return $d(b.extent, h)
            }) || (this.r.call(this, h, c, d), e.sa(h, {extent: h.slice()}))
        }
    };
    var Ry = {
        terrain: {Za: "jpg", opaque: !0},
        "terrain-background": {Za: "jpg", opaque: !0},
        "terrain-labels": {Za: "png", opaque: !1},
        "terrain-lines": {Za: "png", opaque: !1},
        "toner-background": {Za: "png", opaque: !0},
        toner: {Za: "png", opaque: !0},
        "toner-hybrid": {Za: "png", opaque: !1},
        "toner-labels": {Za: "png", opaque: !1},
        "toner-lines": {Za: "png", opaque: !1},
        "toner-lite": {Za: "png", opaque: !0},
        watercolor: {Za: "jpg", opaque: !0}
    }, Sy = {
        terrain: {minZoom: 4, maxZoom: 18},
        toner: {minZoom: 0, maxZoom: 20},
        watercolor: {minZoom: 3, maxZoom: 16}
    };

    function Ty(b) {
        var c = b.layer.indexOf("-"), d = Ry[b.layer], e = Tb ? "https://stamen-tiles-{a-d}.a.ssl.fastly.net/" : "http://{a-d}.tile.stamen.com/";
        Jy.call(this, {
            attributions: Uy,
            crossOrigin: "anonymous",
            maxZoom: Sy[-1 == c ? b.layer : b.layer.slice(0, c)].maxZoom,
            opaque: d.opaque,
            tileLoadFunction: b.tileLoadFunction,
            url: m(b.url) ? b.url : e + b.layer + "/{z}/{x}/{y}." + d.Za
        })
    }

    v(Ty, Jy);
    var Uy = [new pf({html: 'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'}), Ly];

    function Vy(b) {
        b = m(b) ? b : {};
        var c = m(b.params) ? b.params : {};
        Ux.call(this, {
            attributions: b.attributions,
            logo: b.logo,
            projection: b.projection,
            tileGrid: b.tileGrid,
            tileLoadFunction: b.tileLoadFunction,
            tileUrlFunction: ra(this.rk, this)
        });
        var d = b.urls;
        !m(d) && m(b.url) && (d = Tx(b.url));
        this.c = null != d ? d : [];
        this.b = c;
        this.e = Td()
    }

    v(Vy, Ux);
    l = Vy.prototype;
    l.ok = function () {
        return this.b
    };
    l.Xb = function (b, c, d) {
        b = Vy.T.Xb.call(this, b, c, d);
        return 1 == c ? b : b * c + .5 | 0
    };
    l.pk = function () {
        return this.c
    };
    l.qk = function (b) {
        b = m(b) ? Tx(b) : null;
        this.Pf(b)
    };
    l.Pf = function (b) {
        this.c = null != b ? b : [];
        this.l()
    };
    l.rk = function (b, c, d) {
        var e = this.tileGrid;
        null === e && (e = ej(this, d));
        if (!(e.a.length <= b[0])) {
            var f = Wi(e, b, this.e), g = e.ua(b[0]);
            1 != c && (g = g * c + .5 | 0);
            e = {F: "image", FORMAT: "PNG32", TRANSPARENT: !0};
            Db(e, this.b);
            var h = this.c;
            0 == h.length ? b = void 0 : (d = d.a.split(":").pop(), e.SIZE = g + "," + g, e.BBOX = f.join(","), e.BBOXSR = d, e.IMAGESR = d, e.DPI = 90 * c, b = 1 == h.length ? h[0] : h[Xb((b[1] << b[0]) + b[2], h.length)], ya(b, "/") || (b += "/"), ya(b, "MapServer/") ? b += "export" : ya(b, "ImageServer/") && (b += "exportImage"), b = Lr(Nr([b], e)));
            return b
        }
    };
    l.sk = function (b) {
        Db(this.b, b);
        this.l()
    };
    function Wy(b, c) {
        Oi.call(this, b, 2);
        this.b = c.ua(b[0]);
        this.d = {}
    }

    v(Wy, Oi);
    Wy.prototype.Ta = function (b) {
        b = m(b) ? ma(b) : -1;
        if (b in this.d)return this.d[b];
        var c = this.b, d = Mf(c, c);
        d.strokeStyle = "black";
        d.strokeRect(.5, .5, c + .5, c + .5);
        d.fillStyle = "black";
        d.textAlign = "center";
        d.textBaseline = "middle";
        d.font = "24px sans-serif";
        d.fillText(kf(this.a), c / 2, c / 2);
        return this.d[b] = d.canvas
    };
    function Xy(b) {
        cj.call(this, {opaque: !1, projection: b.projection, tileGrid: b.tileGrid})
    }

    v(Xy, cj);
    Xy.prototype.Vb = function (b, c, d) {
        var e = this.nb(b, c, d);
        if (Ri(this.a, e))return this.a.get(e);
        b = new Wy([b, c, d], this.tileGrid);
        this.a.set(e, b);
        return b
    };
    function Yy(b) {
        Ux.call(this, {
            attributions: b.attributions,
            crossOrigin: b.crossOrigin,
            projection: Be("EPSG:3857"),
            state: "loading",
            tileLoadFunction: b.tileLoadFunction
        });
        this.b = b.wrapX;
        (new Jx(b.url)).send(void 0, ra(this.c, this))
    }

    v(Yy, Ux);
    Yy.prototype.c = function (b) {
        var c = Be("EPSG:4326"), d = this.g, e;
        m(b.bounds) && (e = ue(b.bounds, Ae(c, d)));
        var f = b.minzoom || 0, g = b.maxzoom || 22;
        this.tileGrid = d = new Wx({extent: bj(d), maxZoom: g, minZoom: f});
        this.tileUrlFunction = Sx(d.Db({extent: e, wrapX: this.b}), Px(b.tiles));
        if (m(b.attribution) && null === this.f) {
            c = m(e) ? e : c.J();
            e = {};
            for (var h; f <= g; ++f)h = f.toString(), e[h] = [Xi(d, c, f)];
            this.f = [new pf({html: b.attribution, tileRanges: e})]
        }
        Ki(this, "ready")
    };
    function Zy(b) {
        cj.call(this, {projection: Be("EPSG:3857"), state: "loading"});
        this.e = m(b.preemptive) ? b.preemptive : !0;
        this.b = Rx;
        this.c = void 0;
        (new Jx(b.url)).send(void 0, ra(this.uk, this))
    }

    v(Zy, cj);
    l = Zy.prototype;
    l.ci = function () {
        return this.c
    };
    l.xh = function (b, c, d, e, f) {
        null === this.tileGrid ? !0 === f ? nh(function () {
            d.call(e, null)
        }) : d.call(e, null) : (c = this.tileGrid.Wb(b, c), $y(this.Vb(c[0], c[1], c[2], 1, this.g), b, d, e, f))
    };
    l.uk = function (b) {
        var c = Be("EPSG:4326"), d = this.g, e;
        m(b.bounds) && (e = ue(b.bounds, Ae(c, d)));
        var f = b.minzoom || 0, g = b.maxzoom || 22;
        this.tileGrid = d = new Wx({extent: bj(d), maxZoom: g, minZoom: f});
        this.c = b.template;
        var h = b.grids;
        if (null != h) {
            this.b = Sx(d.Db({extent: e}), Px(h));
            if (m(b.attribution)) {
                c = m(e) ? e : c.J();
                for (e = {}; f <= g; ++f)h = f.toString(), e[h] = [Xi(d, c, f)];
                this.f = [new pf({html: b.attribution, tileRanges: e})]
            }
            Ki(this, "ready")
        } else Ki(this, "error")
    };
    l.Vb = function (b, c, d, e, f) {
        var g = this.nb(b, c, d);
        if (Ri(this.a, g))return this.a.get(g);
        b = [b, c, d];
        e = this.b(b, e, f);
        e = new az(b, m(e) ? 0 : 4, m(e) ? e : "", Wi(this.tileGrid, b), this.e);
        this.a.set(g, e);
        return e
    };
    l.Pe = function (b, c, d) {
        b = this.nb(b, c, d);
        Ri(this.a, b) && this.a.get(b)
    };
    function az(b, c, d, e, f) {
        Oi.call(this, b, c);
        this.g = d;
        this.d = e;
        this.n = f;
        this.c = this.f = this.b = null
    }

    v(az, Oi);
    l = az.prototype;
    l.Ta = function () {
        return null
    };
    function bz(b, c) {
        if (null === b.b || null === b.f || null === b.c)return null;
        var d = b.b[Math.floor((1 - (c[1] - b.d[1]) / (b.d[3] - b.d[1])) * b.b.length)];
        if (!ia(d))return null;
        d = d.charCodeAt(Math.floor((c[0] - b.d[0]) / (b.d[2] - b.d[0]) * d.length));
        93 <= d && d--;
        35 <= d && d--;
        d = b.f[d - 32];
        return null != d ? b.c[d] : null
    }

    function $y(b, c, d, e, f) {
        0 == b.state && !0 === f ? (Vc(b, "change", function () {
            d.call(e, bz(this, c))
        }, !1, b), cz(b)) : !0 === f ? nh(function () {
            d.call(e, bz(this, c))
        }, b) : d.call(e, bz(b, c))
    }

    l.qb = function () {
        return this.g
    };
    l.si = function () {
        this.state = 3;
        Pi(this)
    };
    l.Fi = function (b) {
        this.b = b.grid;
        this.f = b.keys;
        this.c = b.data;
        this.state = 4;
        Pi(this)
    };
    function cz(b) {
        0 == b.state && (b.state = 1, (new Jx(b.g)).send(void 0, ra(b.Fi, b), ra(b.si, b)))
    }

    l.load = function () {
        this.n && cz(this)
    };
    function dz(b) {
        Z.call(this, {attributions: b.attributions, format: b.format, logo: b.logo, projection: b.projection});
        this.p = b.tileGrid;
        this.r = Rx;
        this.H = this.p.Db();
        this.o = {};
        m(b.tileUrlFunction) ? (this.r = b.tileUrlFunction, this.l()) : m(b.urls) ? (this.r = Px(b.urls), this.l()) : m(b.url) && (this.r = Px(Tx(b.url)), this.l())
    }

    v(dz, Z);
    l = dz.prototype;
    l.clear = function () {
        xb(this.o)
    };
    function ez(b, c, d, e) {
        var f = b.o;
        b = b.p.Wb(c, d);
        f = f[b[0] + "/" + b[1] + "/" + b[2]];
        if (m(f))for (b = 0, d = f.length; b < d; ++b) {
            var g = f[b];
            if (g.R().Jb(c[0], c[1]) && e.call(void 0, g))break
        }
    }

    l.Fb = function (b, c, d, e) {
        var f = this.p, g = this.o;
        c = bc(f.a, c, 0);
        b = Xi(f, b, c);
        for (var h, f = b.a; f <= b.c; ++f)for (h = b.b; h <= b.d; ++h) {
            var k = g[c + "/" + f + "/" + h];
            if (m(k)) {
                var n, p;
                n = 0;
                for (p = k.length; n < p; ++n) {
                    var q = d.call(e, k[n]);
                    if (q)return q
                }
            }
        }
    };
    l.Aa = function () {
        var b = this.o, c = [], d;
        for (d in b)ab(c, b[d]);
        return c
    };
    l.Fh = function (b, c) {
        var d = [];
        ez(this, b, c, function (b) {
            d.push(b)
        });
        return d
    };
    l.Hb = function (b, c, d) {
        function e(b, c) {
            k[b] = c;
            Ki(this, "ready")
        }

        var f = this.H, g = this.p, h = this.r, k = this.o;
        c = bc(g.a, c, 0);
        b = Xi(g, b, c);
        var g = [c, 0, 0], n, p;
        for (n = b.a; n <= b.c; ++n)for (p = b.b; p <= b.d; ++p) {
            var q = c + "/" + n + "/" + p;
            if (!(q in k)) {
                g[0] = c;
                g[1] = n;
                g[2] = p;
                f(g, d, g);
                var r = h(g, 1, d);
                m(r) && (k[q] = [], yy(this, r, sa(e, q), ca, this))
            }
        }
    };
    function fz(b) {
        b = m(b) ? b : {};
        var c = m(b.params) ? b.params : {};
        Ux.call(this, {
            attributions: b.attributions,
            crossOrigin: b.crossOrigin,
            logo: b.logo,
            opaque: !zb(c, "TRANSPARENT", !0),
            projection: b.projection,
            tileGrid: b.tileGrid,
            tileLoadFunction: b.tileLoadFunction,
            tileUrlFunction: ra(this.zk, this)
        });
        var d = b.urls;
        !m(d) && m(b.url) && (d = Tx(b.url));
        this.c = null != d ? d : [];
        this.i = m(b.gutter) ? b.gutter : 0;
        this.b = c;
        this.e = !0;
        this.k = b.serverType;
        this.p = m(b.hidpi) ? b.hidpi : !0;
        this.o = "";
        gz(this);
        this.r = Td();
        hz(this)
    }

    v(fz, Ux);
    l = fz.prototype;
    l.vk = function (b, c, d, e) {
        d = Be(d);
        var f = this.tileGrid;
        null === f && (f = ej(this, d));
        c = f.Wb(b, c);
        if (!(f.a.length <= c[0])) {
            var g = f.na(c[0]), h = Wi(f, c, this.r), f = f.ua(c[0]), k = this.i;
            0 !== k && (f += 2 * k, h = Xd(h, g * k, h));
            k = {
                SERVICE: "WMS",
                VERSION: "1.3.0",
                REQUEST: "GetFeatureInfo",
                FORMAT: "image/png",
                TRANSPARENT: !0,
                QUERY_LAYERS: this.b.LAYERS
            };
            Db(k, this.b, e);
            e = Math.floor((h[3] - b[1]) / g);
            k[this.e ? "I" : "X"] = Math.floor((b[0] - h[0]) / g);
            k[this.e ? "J" : "Y"] = e;
            return iz(this, c, f, h, 1, d, k)
        }
    };
    l.jd = function () {
        return this.i
    };
    l.nb = function (b, c, d) {
        return this.o + fz.T.nb.call(this, b, c, d)
    };
    l.wk = function () {
        return this.b
    };
    function iz(b, c, d, e, f, g, h) {
        var k = b.c;
        if (0 != k.length) {
            h.WIDTH = d;
            h.HEIGHT = d;
            h[b.e ? "CRS" : "SRS"] = g.a;
            "STYLES"in b.b || (h.STYLES = new String(""));
            if (1 != f)switch (b.k) {
                case "geoserver":
                    h.FORMAT_OPTIONS = "dpi:" + (90 * f + .5 | 0);
                    break;
                case "mapserver":
                    h.MAP_RESOLUTION = 90 * f;
                    break;
                case "carmentaserver":
                case "qgis":
                    h.DPI = 90 * f
            }
            d = g.b;
            b.e && "ne" == d.substr(0, 2) && (b = e[0], e[0] = e[1], e[1] = b, b = e[2], e[2] = e[3], e[3] = b);
            h.BBOX = e.join(",");
            return Lr(Nr([1 == k.length ? k[0] : k[Xb((c[1] << c[0]) + c[2], k.length)]], h))
        }
    }

    l.Xb = function (b, c, d) {
        b = fz.T.Xb.call(this, b, c, d);
        return 1 != c && this.p && m(this.k) ? b * c + .5 | 0 : b
    };
    l.xk = function () {
        return this.c
    };
    function gz(b) {
        var c = 0, d = [], e, f;
        e = 0;
        for (f = b.c.length; e < f; ++e)d[c++] = b.c[e];
        for (var g in b.b)d[c++] = g + "-" + b.b[g];
        b.o = d.join("#")
    }

    l.yk = function (b) {
        b = m(b) ? Tx(b) : null;
        this.Qf(b)
    };
    l.Qf = function (b) {
        this.c = null != b ? b : [];
        gz(this);
        this.l()
    };
    l.zk = function (b, c, d) {
        var e = this.tileGrid;
        null === e && (e = ej(this, d));
        if (!(e.a.length <= b[0])) {
            1 == c || this.p && m(this.k) || (c = 1);
            var f = e.na(b[0]), g = Wi(e, b, this.r), e = e.ua(b[0]), h = this.i;
            0 !== h && (e += 2 * h, g = Xd(g, f * h, g));
            1 != c && (e = e * c + .5 | 0);
            f = {SERVICE: "WMS", VERSION: "1.3.0", REQUEST: "GetMap", FORMAT: "image/png", TRANSPARENT: !0};
            Db(f, this.b);
            return iz(this, b, e, g, c, d, f)
        }
    };
    l.Ak = function (b) {
        Db(this.b, b);
        gz(this);
        hz(this);
        this.l()
    };
    function hz(b) {
        b.e = 0 <= Ma(zb(b.b, "VERSION", "1.3.0"), "1.3")
    };
    function jz(b) {
        b = m(b) ? b : {};
        $.call(this, {
            attributions: b.attributions,
            extent: b.extent,
            format: new vu({defaultDataProjection: b.defaultProjection}),
            logo: b.logo,
            object: b.object,
            projection: b.projection,
            text: b.text,
            url: b.url
        })
    }

    v(jz, $);
    function kz(b) {
        this.b = b.matrixIds;
        Ui.call(this, {
            origin: b.origin,
            origins: b.origins,
            resolutions: b.resolutions,
            tileSize: b.tileSize,
            tileSizes: b.tileSizes
        })
    }

    v(kz, Ui);
    kz.prototype.g = function () {
        return this.b
    };
    function lz(b) {
        var c = [], d = [], e = [], f = [], g;
        g = Be(b.SupportedCRS.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/, "$1:$3"));
        var h = g.od(), k = "ne" == g.b.substr(0, 2);
        db(b.TileMatrix, function (b, c) {
            return c.ScaleDenominator - b.ScaleDenominator
        });
        Qa(b.TileMatrix, function (b) {
            d.push(b.Identifier);
            k ? e.push([b.TopLeftCorner[1], b.TopLeftCorner[0]]) : e.push(b.TopLeftCorner);
            c.push(2.8E-4 * b.ScaleDenominator / h);
            f.push(b.TileWidth)
        });
        return new kz({origins: e, resolutions: c, matrixIds: d, tileSizes: f})
    };
    function mz(b) {
        function c(b) {
            b = "KVP" == d ? Lr(Nr([b], f)) : b.replace(/\{(\w+?)\}/g, function (b, c) {
                return c.toLowerCase()in f ? f[c.toLowerCase()] : b
            });
            return function (c) {
                if (null !== c) {
                    var f = {TileMatrix: e.b[c[0]], TileCol: c[1], TileRow: c[2]};
                    Db(f, g);
                    c = b;
                    return c = "KVP" == d ? Lr(Nr([c], f)) : c.replace(/\{(\w+?)\}/g, function (b, c) {
                        return f[c]
                    })
                }
            }
        }

        this.p = m(b.version) ? b.version : "1.0.0";
        this.c = m(b.format) ? b.format : "image/jpeg";
        this.b = m(b.dimensions) ? b.dimensions : {};
        this.i = "";
        nz(this);
        this.k = b.layer;
        this.e = b.matrixSet;
        this.o =
            b.style;
        var d = m(b.requestEncoding) ? b.requestEncoding : "KVP", e = b.tileGrid, f = {
            layer: this.k,
            style: this.o,
            tilematrixset: this.e
        };
        "KVP" == d && Db(f, {Service: "WMTS", Request: "GetTile", Version: this.p, Format: this.c});
        var g = this.b, h = Rx, k = b.urls;
        !m(k) && m(b.url) && (k = Tx(b.url));
        m(k) && (h = Qx(Sa(k, c)));
        var n = Td(), p = [0, 0, 0], h = Sx(function (b, c, d) {
            if (e.a.length <= b[0])return null;
            var f = b[1], g = -b[2] - 1, h = Wi(e, b, n), k = c.J();
            null !== k && c.e && (c = Math.ceil(re(k) / re(h)), f = Xb(f, c), p[0] = b[0], p[1] = f, p[2] = b[2], h = Wi(e, p, n));
            return !qe(h,
                k) || qe(h, k) && (h[0] == k[2] || h[2] == k[0] || h[1] == k[3] || h[3] == k[1]) ? null : gf(b[0], f, g, d)
        }, h);
        Ux.call(this, {
            attributions: b.attributions,
            crossOrigin: b.crossOrigin,
            logo: b.logo,
            projection: b.projection,
            tileClass: b.tileClass,
            tileGrid: e,
            tileLoadFunction: b.tileLoadFunction,
            tilePixelRatio: b.tilePixelRatio,
            tileUrlFunction: h
        })
    }

    v(mz, Ux);
    l = mz.prototype;
    l.Dh = function () {
        return this.b
    };
    l.Hh = function () {
        return this.c
    };
    l.nb = function (b, c, d) {
        return this.i + mz.T.nb.call(this, b, c, d)
    };
    l.Bk = function () {
        return this.k
    };
    l.Th = function () {
        return this.e
    };
    l.Ck = function () {
        return this.o
    };
    l.gi = function () {
        return this.p
    };
    function nz(b) {
        var c = 0, d = [], e;
        for (e in b.b)d[c++] = e + "-" + b.b[e];
        b.i = d.join("/")
    }

    l.pm = function (b) {
        Db(this.b, b);
        nz(this);
        this.l()
    };
    function oz(b) {
        var c = m(b) ? b : c;
        Ui.call(this, {origin: [0, 0], resolutions: c.resolutions})
    }

    v(oz, Ui);
    oz.prototype.Db = function (b) {
        b = m(b) ? b : {};
        var c = this.minZoom, d = this.maxZoom, e = null;
        if (m(b.extent)) {
            var e = Array(d + 1), f;
            for (f = 0; f <= d; ++f)e[f] = f < c ? null : Xi(this, b.extent, f)
        }
        return function (b, f, k) {
            f = b[0];
            if (f < c || d < f)return null;
            var n = Math.pow(2, f), p = b[1];
            if (0 > p || n <= p)return null;
            b = b[2];
            return b < -n || -1 < b || null !== e && !nf(e[f], p, -b - 1) ? null : gf(f, p, -b - 1, k)
        }
    };
    function pz(b) {
        b = m(b) ? b : {};
        var c = b.size, d = c[0], e = c[1], f = [], g = 256;
        switch (m(b.tierSizeCalculation) ? b.tierSizeCalculation : "default") {
            case "default":
                for (; d > g || e > g;)f.push([Math.ceil(d / g), Math.ceil(e / g)]), g += g;
                break;
            case "truncated":
                for (; d > g || e > g;)f.push([Math.ceil(d / g), Math.ceil(e / g)]), d >>= 1, e >>= 1
        }
        f.push([1, 1]);
        f.reverse();
        for (var g = [1], h = [0], e = 1, d = f.length; e < d; e++)g.push(1 << e), h.push(f[e - 1][0] * f[e - 1][1] + h[e - 1]);
        g.reverse();
        var g = new oz({resolutions: g}), k = b.url, c = Sx(g.Db({extent: [0, 0, c[0], c[1]]}), function (b) {
            if (null !==
                b) {
                var c = b[0], d = b[1];
                b = b[2];
                return k + "TileGroup" + ((d + b * f[c][0] + h[c]) / 256 | 0) + "/" + c + "-" + d + "-" + b + ".jpg"
            }
        });
        Ux.call(this, {
            attributions: b.attributions,
            crossOrigin: b.crossOrigin,
            logo: b.logo,
            tileClass: qz,
            tileGrid: g,
            tileUrlFunction: c
        })
    }

    v(pz, Ux);
    function qz(b, c, d, e, f) {
        $v.call(this, b, c, d, e, f);
        this.c = {}
    }

    v(qz, $v);
    qz.prototype.Ta = function (b) {
        var c = m(b) ? ma(b).toString() : "";
        if (c in this.c)return this.c[c];
        b = qz.T.Ta.call(this, b);
        if (2 == this.state) {
            if (256 == b.width && 256 == b.height)return this.c[c] = b;
            var d = Mf(256, 256);
            d.drawImage(b, 0, 0);
            return this.c[c] = d.canvas
        }
        return b
    };
    function rz(b) {
        b = m(b) ? b : {};
        this.d = m(b.initialSize) ? b.initialSize : 256;
        this.b = m(b.maxSize) ? b.maxSize : m(ua) ? ua : 2048;
        this.a = m(b.space) ? b.space : 1;
        this.f = [new sz(this.d, this.a)];
        this.c = this.d;
        this.e = [new sz(this.c, this.a)]
    }

    rz.prototype.add = function (b, c, d, e, f, g) {
        if (c + this.a > this.b || d + this.a > this.b)return null;
        e = tz(this, !1, b, c, d, e, g);
        if (null === e)return null;
        b = tz(this, !0, b, c, d, m(f) ? f : dd, g);
        return {offsetX: e.offsetX, offsetY: e.offsetY, image: e.image, xf: b.image}
    };
    function tz(b, c, d, e, f, g, h) {
        var k = c ? b.e : b.f, n, p, q;
        p = 0;
        for (q = k.length; p < q; ++p) {
            n = k[p];
            n = n.add(d, e, f, g, h);
            if (null !== n)return n;
            null === n && p === q - 1 && (c ? (n = Math.min(2 * b.c, b.b), b.c = n) : (n = Math.min(2 * b.d, b.b), b.d = n), n = new sz(n, b.a), k.push(n), ++q)
        }
    }

    function sz(b, c) {
        this.a = c;
        this.d = [{x: 0, y: 0, width: b, height: b}];
        this.c = {};
        this.b = Df("CANVAS");
        this.b.width = b;
        this.b.height = b;
        this.f = this.b.getContext("2d")
    }

    sz.prototype.get = function (b) {
        return zb(this.c, b, null)
    };
    sz.prototype.add = function (b, c, d, e, f) {
        var g, h, k;
        h = 0;
        for (k = this.d.length; h < k; ++h)if (g = this.d[h], g.width >= c + this.a && g.height >= d + this.a)return k = {
            offsetX: g.x + this.a,
            offsetY: g.y + this.a,
            image: this.b
        }, this.c[b] = k, e.call(f, this.f, g.x + this.a, g.y + this.a), b = h, c = c + this.a, d = d + this.a, f = e = void 0, g.width - c > g.height - d ? (e = {
            x: g.x + c,
            y: g.y,
            width: g.width - c,
            height: g.height
        }, f = {x: g.x, y: g.y + d, width: c, height: g.height - d}, uz(this, b, e, f)) : (e = {
            x: g.x + c,
            y: g.y,
            width: g.width - c,
            height: d
        }, f = {
            x: g.x, y: g.y + d, width: g.width, height: g.height -
            d
        }, uz(this, b, e, f)), k;
        return null
    };
    function uz(b, c, d, e) {
        c = [c, 1];
        0 < d.width && 0 < d.height && c.push(d);
        0 < e.width && 0 < e.height && c.push(e);
        b.d.splice.apply(b.d, c)
    };
    function vz(b) {
        this.q = this.c = this.f = null;
        this.n = m(b.fill) ? b.fill : null;
        this.N = [0, 0];
        this.a = b.points;
        this.b = m(b.radius) ? b.radius : b.radius1;
        this.e = m(b.radius2) ? b.radius2 : this.b;
        this.g = m(b.angle) ? b.angle : 0;
        this.d = m(b.stroke) ? b.stroke : null;
        this.H = this.S = this.D = null;
        var c = b.atlasManager, d = "", e = "", f = 0, g = null, h, k = 0;
        null !== this.d && (h = rg(this.d.a), k = this.d.d, m(k) || (k = 1), g = this.d.b, Xf || (g = null), e = this.d.f, m(e) || (e = "round"), d = this.d.c, m(d) || (d = "round"), f = this.d.e, m(f) || (f = 10));
        var n = 2 * (this.b + k) + 1, d = {
            strokeStyle: h,
            Uc: k, size: n, lineCap: d, lineDash: g, lineJoin: e, miterLimit: f
        };
        if (m(c)) {
            var n = Math.round(n), e = null === this.n, p;
            e && (p = ra(this.Uf, this, d));
            f = this.xb();
            p = c.add(f, n, n, ra(this.Vf, this, d), p);
            this.c = p.image;
            this.N = [p.offsetX, p.offsetY];
            c = p.image.width;
            this.q = e ? p.xf : this.c
        } else this.c = Df("CANVAS"), this.c.height = n, this.c.width = n, c = n = this.c.width, p = this.c.getContext("2d"), this.Vf(d, p, 0, 0), null === this.n ? (p = this.q = Df("CANVAS"), p.height = d.size, p.width = d.size, p = p.getContext("2d"), this.Uf(d, p, 0, 0)) : this.q = this.c;
        this.D =
            [n / 2, n / 2];
        this.S = [n, n];
        this.H = [c, c];
        uj.call(this, {
            opacity: 1,
            rotateWithView: !1,
            rotation: m(b.rotation) ? b.rotation : 0,
            scale: 1,
            snapToPixel: m(b.snapToPixel) ? b.snapToPixel : !0
        })
    }

    v(vz, uj);
    l = vz.prototype;
    l.wb = function () {
        return this.D
    };
    l.Hk = function () {
        return this.g
    };
    l.Ik = function () {
        return this.n
    };
    l.Kd = function () {
        return this.q
    };
    l.Bb = function () {
        return this.c
    };
    l.kd = function () {
        return this.H
    };
    l.Pc = function () {
        return 2
    };
    l.Cb = function () {
        return this.N
    };
    l.Jk = function () {
        return this.a
    };
    l.Kk = function () {
        return this.b
    };
    l.bi = function () {
        return this.e
    };
    l.gb = function () {
        return this.S
    };
    l.Lk = function () {
        return this.d
    };
    l.xe = ca;
    l.load = ca;
    l.Oe = ca;
    l.Vf = function (b, c, d, e) {
        var f;
        c.setTransform(1, 0, 0, 1, 0, 0);
        c.translate(d, e);
        c.beginPath();
        this.e !== this.b && (this.a *= 2);
        for (d = 0; d <= this.a; d++)e = 2 * d * Math.PI / this.a - Math.PI / 2 + this.g, f = 0 === d % 2 ? this.b : this.e, c.lineTo(b.size / 2 + f * Math.cos(e), b.size / 2 + f * Math.sin(e));
        null !== this.n && (c.fillStyle = rg(this.n.a), c.fill());
        null !== this.d && (c.strokeStyle = b.strokeStyle, c.lineWidth = b.Uc, null === b.lineDash || c.setLineDash(b.lineDash), c.lineCap = b.lineCap, c.lineJoin = b.lineJoin, c.miterLimit = b.miterLimit, c.stroke());
        c.closePath()
    };
    l.Uf = function (b, c, d, e) {
        c.setTransform(1, 0, 0, 1, 0, 0);
        c.translate(d, e);
        c.beginPath();
        this.e !== this.b && (this.a *= 2);
        var f;
        for (d = 0; d <= this.a; d++)f = 2 * d * Math.PI / this.a - Math.PI / 2 + this.g, e = 0 === d % 2 ? this.b : this.e, c.lineTo(b.size / 2 + e * Math.cos(f), b.size / 2 + e * Math.sin(f));
        c.fillStyle = kl;
        c.fill();
        null !== this.d && (c.strokeStyle = b.strokeStyle, c.lineWidth = b.Uc, null === b.lineDash || c.setLineDash(b.lineDash), c.stroke());
        c.closePath()
    };
    l.xb = function () {
        var b = null === this.d ? "-" : this.d.xb(), c = null === this.n ? "-" : this.n.xb();
        if (null === this.f || b != this.f[1] || c != this.f[2] || this.b != this.f[3] || this.e != this.f[4] || this.g != this.f[5] || this.a != this.f[6])this.f = ["r" + b + c + (m(this.b) ? this.b.toString() : "-") + (m(this.e) ? this.e.toString() : "-") + (m(this.g) ? this.g.toString() : "-") + (m(this.a) ? this.a.toString() : "-"), b, c, this.b, this.e, this.g, this.a];
        return this.f[0]
    };
    t("ol.animation.bounce", function (b) {
        var c = b.resolution, d = m(b.start) ? b.start : ta(), e = m(b.duration) ? b.duration : 1E3, f = m(b.easing) ? b.easing : cf;
        return function (b, h) {
            if (h.time < d)return h.animate = !0, h.viewHints[0] += 1, !0;
            if (h.time < d + e) {
                var k = f((h.time - d) / e), n = c - h.viewState.resolution;
                h.animate = !0;
                h.viewState.resolution += k * n;
                h.viewHints[0] += 1;
                return !0
            }
            return !1
        }
    }, OPENLAYERS);
    t("ol.animation.pan", df, OPENLAYERS);
    t("ol.animation.rotate", ef, OPENLAYERS);
    t("ol.animation.zoom", ff, OPENLAYERS);
    t("ol.Attribution", pf, OPENLAYERS);
    pf.prototype.getHTML = pf.prototype.b;
    jg.prototype.element = jg.prototype.element;
    t("ol.Collection", kg, OPENLAYERS);
    kg.prototype.clear = kg.prototype.clear;
    kg.prototype.extend = kg.prototype.ye;
    kg.prototype.forEach = kg.prototype.forEach;
    kg.prototype.getArray = kg.prototype.kj;
    kg.prototype.item = kg.prototype.item;
    kg.prototype.getLength = kg.prototype.Ib;
    kg.prototype.insertAt = kg.prototype.zd;
    kg.prototype.pop = kg.prototype.pop;
    kg.prototype.push = kg.prototype.push;
    kg.prototype.remove = kg.prototype.remove;
    kg.prototype.removeAt = kg.prototype.Le;
    kg.prototype.setAt = kg.prototype.Vl;
    t("ol.coordinate.add", wd, OPENLAYERS);
    t("ol.coordinate.createStringXY", function (b) {
        return function (c) {
            return Dd(c, b)
        }
    }, OPENLAYERS);
    t("ol.coordinate.format", zd, OPENLAYERS);
    t("ol.coordinate.rotate", Bd, OPENLAYERS);
    t("ol.coordinate.toStringHDMS", function (b) {
        return m(b) ? yd(b[1], "NS") + " " + yd(b[0], "EW") : ""
    }, OPENLAYERS);
    t("ol.coordinate.toStringXY", Dd, OPENLAYERS);
    t("ol.DeviceOrientation", pp, OPENLAYERS);
    pp.prototype.getAlpha = pp.prototype.f;
    pp.prototype.getBeta = pp.prototype.e;
    pp.prototype.getGamma = pp.prototype.g;
    pp.prototype.getHeading = pp.prototype.i;
    pp.prototype.getTracking = pp.prototype.c;
    pp.prototype.setTracking = pp.prototype.b;
    t("ol.easing.easeIn", function (b) {
        return Math.pow(b, 3)
    }, OPENLAYERS);
    t("ol.easing.easeOut", $e, OPENLAYERS);
    t("ol.easing.inAndOut", af, OPENLAYERS);
    t("ol.easing.linear", bf, OPENLAYERS);
    t("ol.easing.upAndDown", cf, OPENLAYERS);
    t("ol.extent.boundingExtent", Sd, OPENLAYERS);
    t("ol.extent.buffer", Xd, OPENLAYERS);
    t("ol.extent.containsCoordinate", function (b, c) {
        return ae(b, c[0], c[1])
    }, OPENLAYERS);
    t("ol.extent.containsExtent", $d, OPENLAYERS);
    t("ol.extent.containsXY", ae, OPENLAYERS);
    t("ol.extent.createEmpty", Td, OPENLAYERS);
    t("ol.extent.equals", de, OPENLAYERS);
    t("ol.extent.extend", ee, OPENLAYERS);
    t("ol.extent.getBottomLeft", he, OPENLAYERS);
    t("ol.extent.getBottomRight", ie, OPENLAYERS);
    t("ol.extent.getCenter", le, OPENLAYERS);
    t("ol.extent.getHeight", oe, OPENLAYERS);
    t("ol.extent.getIntersection", pe, OPENLAYERS);
    t("ol.extent.getSize", function (b) {
        return [b[2] - b[0], b[3] - b[1]]
    }, OPENLAYERS);
    t("ol.extent.getTopLeft", ke, OPENLAYERS);
    t("ol.extent.getTopRight", je, OPENLAYERS);
    t("ol.extent.getWidth", re, OPENLAYERS);
    t("ol.extent.intersects", qe, OPENLAYERS);
    t("ol.extent.isEmpty", se, OPENLAYERS);
    t("ol.extent.applyTransform", ue, OPENLAYERS);
    t("ol.Feature", P, OPENLAYERS);
    P.prototype.clone = P.prototype.clone;
    P.prototype.getGeometry = P.prototype.R;
    P.prototype.getId = P.prototype.Kh;
    P.prototype.getGeometryName = P.prototype.Jh;
    P.prototype.getStyle = P.prototype.rj;
    P.prototype.getStyleFunction = P.prototype.sj;
    P.prototype.setGeometry = P.prototype.Sa;
    P.prototype.setStyle = P.prototype.i;
    P.prototype.setId = P.prototype.c;
    P.prototype.setGeometryName = P.prototype.f;
    t("ol.FeatureOverlay", rp, OPENLAYERS);
    rp.prototype.addFeature = rp.prototype.Df;
    rp.prototype.getFeatures = rp.prototype.lj;
    rp.prototype.getMap = rp.prototype.mj;
    rp.prototype.removeFeature = rp.prototype.Ed;
    rp.prototype.setFeatures = rp.prototype.Tc;
    rp.prototype.setMap = rp.prototype.setMap;
    rp.prototype.setStyle = rp.prototype.Ff;
    rp.prototype.getStyle = rp.prototype.nj;
    rp.prototype.getStyleFunction = rp.prototype.oj;
    t("ol.Geolocation", X, OPENLAYERS);
    X.prototype.getAccuracy = X.prototype.mf;
    X.prototype.getAccuracyGeometry = X.prototype.o;
    X.prototype.getAltitude = X.prototype.p;
    X.prototype.getAltitudeAccuracy = X.prototype.r;
    X.prototype.getHeading = X.prototype.H;
    X.prototype.getPosition = X.prototype.N;
    X.prototype.getProjection = X.prototype.g;
    X.prototype.getSpeed = X.prototype.D;
    X.prototype.getTracking = X.prototype.i;
    X.prototype.getTrackingOptions = X.prototype.e;
    X.prototype.setProjection = X.prototype.k;
    X.prototype.setTracking = X.prototype.b;
    X.prototype.setTrackingOptions = X.prototype.q;
    t("ol.Graticule", Uv, OPENLAYERS);
    Uv.prototype.getMap = Uv.prototype.vj;
    Uv.prototype.getMeridians = Uv.prototype.Uh;
    Uv.prototype.getParallels = Uv.prototype.Zh;
    Uv.prototype.setMap = Uv.prototype.setMap;
    t("ol.has.DEVICE_PIXEL_RATIO", Vf, OPENLAYERS);
    t("ol.has.CANVAS", Yf, OPENLAYERS);
    t("ol.has.DEVICE_ORIENTATION", Zf, OPENLAYERS);
    t("ol.has.GEOLOCATION", $f, OPENLAYERS);
    t("ol.has.TOUCH", ag, OPENLAYERS);
    t("ol.has.WEBGL", Uf, OPENLAYERS);
    Zv.prototype.getImage = Zv.prototype.a;
    $v.prototype.getImage = $v.prototype.Ta;
    t("ol.Kinetic", Jj, OPENLAYERS);
    t("ol.loadingstrategy.all", function () {
        return [[-Infinity, -Infinity, Infinity, Infinity]]
    }, OPENLAYERS);
    t("ol.loadingstrategy.bbox", Bx, OPENLAYERS);
    t("ol.loadingstrategy.createTile", function (b) {
        return function (c, d) {
            var e = bc(b.a, d, 0), f = Xi(b, c, e), g = [], e = [e, 0, 0];
            for (e[1] = f.a; e[1] <= f.c; ++e[1])for (e[2] = f.b; e[2] <= f.d; ++e[2])g.push(Wi(b, e));
            return g
        }
    }, OPENLAYERS);
    t("ol.Map", L, OPENLAYERS);
    L.prototype.addControl = L.prototype.gh;
    L.prototype.addInteraction = L.prototype.hh;
    L.prototype.addLayer = L.prototype.bf;
    L.prototype.addOverlay = L.prototype.cf;
    L.prototype.beforeRender = L.prototype.La;
    L.prototype.forEachFeatureAtPixel = L.prototype.qe;
    L.prototype.forEachLayerAtPixel = L.prototype.zj;
    L.prototype.hasFeatureAtPixel = L.prototype.Ri;
    L.prototype.getEventCoordinate = L.prototype.Eh;
    L.prototype.getEventPixel = L.prototype.hd;
    L.prototype.getTarget = L.prototype.Fd;
    L.prototype.getTargetElement = L.prototype.Mc;
    L.prototype.getCoordinateFromPixel = L.prototype.ra;
    L.prototype.getControls = L.prototype.Ch;
    L.prototype.getOverlays = L.prototype.Yh;
    L.prototype.getInteractions = L.prototype.Lh;
    L.prototype.getLayerGroup = L.prototype.Ub;
    L.prototype.getLayers = L.prototype.ea;
    L.prototype.getPixelFromCoordinate = L.prototype.e;
    L.prototype.getSize = L.prototype.f;
    L.prototype.getView = L.prototype.a;
    L.prototype.getViewport = L.prototype.hi;
    L.prototype.renderSync = L.prototype.Sl;
    L.prototype.render = L.prototype.render;
    L.prototype.removeControl = L.prototype.Ml;
    L.prototype.removeInteraction = L.prototype.Nl;
    L.prototype.removeLayer = L.prototype.Ol;
    L.prototype.removeOverlay = L.prototype.Pl;
    L.prototype.setLayerGroup = L.prototype.tg;
    L.prototype.setSize = L.prototype.S;
    L.prototype.setTarget = L.prototype.ia;
    L.prototype.setView = L.prototype.Fa;
    L.prototype.updateSize = L.prototype.q;
    vi.prototype.originalEvent = vi.prototype.originalEvent;
    vi.prototype.pixel = vi.prototype.pixel;
    vi.prototype.coordinate = vi.prototype.coordinate;
    vi.prototype.dragging = vi.prototype.dragging;
    vi.prototype.preventDefault = vi.prototype.preventDefault;
    vi.prototype.stopPropagation = vi.prototype.pb;
    Sg.prototype.map = Sg.prototype.map;
    Sg.prototype.frameState = Sg.prototype.frameState;
    nd.prototype.key = nd.prototype.key;
    nd.prototype.oldValue = nd.prototype.oldValue;
    od.prototype.transform = od.prototype.transform;
    t("ol.Object", rd, OPENLAYERS);
    rd.prototype.bindTo = rd.prototype.K;
    rd.prototype.get = rd.prototype.get;
    rd.prototype.getKeys = rd.prototype.G;
    rd.prototype.getProperties = rd.prototype.I;
    rd.prototype.set = rd.prototype.set;
    rd.prototype.setProperties = rd.prototype.C;
    rd.prototype.unbind = rd.prototype.L;
    rd.prototype.unbindAll = rd.prototype.M;
    t("ol.Observable", ld, OPENLAYERS);
    t("ol.Observable.unByKey", md, OPENLAYERS);
    ld.prototype.changed = ld.prototype.l;
    ld.prototype.getRevision = ld.prototype.u;
    ld.prototype.on = ld.prototype.s;
    ld.prototype.once = ld.prototype.v;
    ld.prototype.un = ld.prototype.t;
    ld.prototype.unByKey = ld.prototype.A;
    t("ol.WEBGL_MAX_TEXTURE_SIZE", ua, OPENLAYERS);
    t("ol.inherits", v, OPENLAYERS);
    t("ol.Overlay", N, OPENLAYERS);
    N.prototype.getElement = N.prototype.b;
    N.prototype.getMap = N.prototype.c;
    N.prototype.getOffset = N.prototype.i;
    N.prototype.getPosition = N.prototype.q;
    N.prototype.getPositioning = N.prototype.k;
    N.prototype.setElement = N.prototype.Me;
    N.prototype.setMap = N.prototype.setMap;
    N.prototype.setOffset = N.prototype.o;
    N.prototype.setPosition = N.prototype.e;
    N.prototype.setPositioning = N.prototype.p;
    Oi.prototype.getTileCoord = Oi.prototype.e;
    t("ol.View", B, OPENLAYERS);
    B.prototype.constrainCenter = B.prototype.i;
    B.prototype.constrainResolution = B.prototype.constrainResolution;
    B.prototype.constrainRotation = B.prototype.constrainRotation;
    B.prototype.getCenter = B.prototype.b;
    B.prototype.calculateExtent = B.prototype.g;
    B.prototype.getProjection = B.prototype.N;
    B.prototype.getResolution = B.prototype.a;
    B.prototype.getResolutionForExtent = B.prototype.k;
    B.prototype.getRotation = B.prototype.c;
    B.prototype.getZoom = B.prototype.ki;
    B.prototype.fitExtent = B.prototype.pe;
    B.prototype.fitGeometry = B.prototype.wh;
    B.prototype.centerOn = B.prototype.oh;
    B.prototype.rotate = B.prototype.rotate;
    B.prototype.setCenter = B.prototype.Ha;
    B.prototype.setResolution = B.prototype.f;
    B.prototype.setRotation = B.prototype.r;
    B.prototype.setZoom = B.prototype.S;
    t("ol.xml.getAllTextContent", Op, OPENLAYERS);
    t("ol.xml.parse", hq, OPENLAYERS);
    t("ol.webgl.Context", Tn, OPENLAYERS);
    Tn.prototype.getGL = Tn.prototype.bl;
    Tn.prototype.getHitDetectionFramebuffer = Tn.prototype.se;
    Tn.prototype.useProgram = Tn.prototype.Rd;
    t("ol.tilegrid.TileGrid", Ui, OPENLAYERS);
    Ui.prototype.getMaxZoom = Ui.prototype.md;
    Ui.prototype.getMinZoom = Ui.prototype.pd;
    Ui.prototype.getOrigin = Ui.prototype.Lb;
    Ui.prototype.getResolution = Ui.prototype.na;
    Ui.prototype.getResolutions = Ui.prototype.Qd;
    Ui.prototype.getTileCoordForCoordAndResolution = Ui.prototype.Wb;
    Ui.prototype.getTileCoordForCoordAndZ = Ui.prototype.Nc;
    Ui.prototype.getTileSize = Ui.prototype.ua;
    t("ol.tilegrid.WMTS", kz, OPENLAYERS);
    kz.prototype.getMatrixIds = kz.prototype.g;
    t("ol.tilegrid.WMTS.createFromCapabilitiesMatrixSet", lz, OPENLAYERS);
    t("ol.tilegrid.XYZ", Wx, OPENLAYERS);
    t("ol.tilegrid.Zoomify", oz, OPENLAYERS);
    t("ol.style.AtlasManager", rz, OPENLAYERS);
    t("ol.style.Circle", pl, OPENLAYERS);
    pl.prototype.getAnchor = pl.prototype.wb;
    pl.prototype.getFill = pl.prototype.Dk;
    pl.prototype.getImage = pl.prototype.Bb;
    pl.prototype.getOrigin = pl.prototype.Cb;
    pl.prototype.getRadius = pl.prototype.Ek;
    pl.prototype.getSize = pl.prototype.gb;
    pl.prototype.getStroke = pl.prototype.Fk;
    t("ol.style.Fill", nl, OPENLAYERS);
    nl.prototype.getColor = nl.prototype.b;
    nl.prototype.setColor = nl.prototype.c;
    t("ol.style.Icon", vj, OPENLAYERS);
    vj.prototype.getAnchor = vj.prototype.wb;
    vj.prototype.getImage = vj.prototype.Bb;
    vj.prototype.getOrigin = vj.prototype.Cb;
    vj.prototype.getSrc = vj.prototype.Gk;
    vj.prototype.getSize = vj.prototype.gb;
    t("ol.style.Image", uj, OPENLAYERS);
    uj.prototype.getOpacity = uj.prototype.Ld;
    uj.prototype.getRotateWithView = uj.prototype.rd;
    uj.prototype.getRotation = uj.prototype.Md;
    uj.prototype.getScale = uj.prototype.Nd;
    uj.prototype.getSnapToPixel = uj.prototype.sd;
    uj.prototype.getImage = uj.prototype.Bb;
    uj.prototype.setRotation = uj.prototype.Od;
    uj.prototype.setScale = uj.prototype.Pd;
    t("ol.style.RegularShape", vz, OPENLAYERS);
    vz.prototype.getAnchor = vz.prototype.wb;
    vz.prototype.getAngle = vz.prototype.Hk;
    vz.prototype.getFill = vz.prototype.Ik;
    vz.prototype.getImage = vz.prototype.Bb;
    vz.prototype.getOrigin = vz.prototype.Cb;
    vz.prototype.getPoints = vz.prototype.Jk;
    vz.prototype.getRadius = vz.prototype.Kk;
    vz.prototype.getRadius2 = vz.prototype.bi;
    vz.prototype.getSize = vz.prototype.gb;
    vz.prototype.getStroke = vz.prototype.Lk;
    t("ol.style.Stroke", jl, OPENLAYERS);
    jl.prototype.getColor = jl.prototype.Mk;
    jl.prototype.getLineCap = jl.prototype.Oh;
    jl.prototype.getLineDash = jl.prototype.Nk;
    jl.prototype.getLineJoin = jl.prototype.Ph;
    jl.prototype.getMiterLimit = jl.prototype.Vh;
    jl.prototype.getWidth = jl.prototype.Ok;
    jl.prototype.setColor = jl.prototype.Pk;
    jl.prototype.setLineCap = jl.prototype.Yl;
    jl.prototype.setLineDash = jl.prototype.Qk;
    jl.prototype.setLineJoin = jl.prototype.Zl;
    jl.prototype.setMiterLimit = jl.prototype.$l;
    jl.prototype.setWidth = jl.prototype.gm;
    t("ol.style.Style", ql, OPENLAYERS);
    ql.prototype.getGeometry = ql.prototype.R;
    ql.prototype.getGeometryFunction = ql.prototype.Ih;
    ql.prototype.getFill = ql.prototype.Rk;
    ql.prototype.getImage = ql.prototype.Sk;
    ql.prototype.getStroke = ql.prototype.Tk;
    ql.prototype.getText = ql.prototype.Uk;
    ql.prototype.getZIndex = ql.prototype.ji;
    ql.prototype.setGeometry = ql.prototype.Wf;
    ql.prototype.setZIndex = ql.prototype.im;
    t("ol.style.Text", hs, OPENLAYERS);
    hs.prototype.getFont = hs.prototype.Gh;
    hs.prototype.getOffsetX = hs.prototype.Wh;
    hs.prototype.getOffsetY = hs.prototype.Xh;
    hs.prototype.getFill = hs.prototype.Vk;
    hs.prototype.getRotation = hs.prototype.Wk;
    hs.prototype.getScale = hs.prototype.Xk;
    hs.prototype.getStroke = hs.prototype.Yk;
    hs.prototype.getText = hs.prototype.Zk;
    hs.prototype.getTextAlign = hs.prototype.di;
    hs.prototype.getTextBaseline = hs.prototype.ei;
    hs.prototype.setFont = hs.prototype.Xl;
    hs.prototype.setFill = hs.prototype.Wl;
    hs.prototype.setRotation = hs.prototype.$k;
    hs.prototype.setScale = hs.prototype.al;
    hs.prototype.setStroke = hs.prototype.cm;
    hs.prototype.setText = hs.prototype.dm;
    hs.prototype.setTextAlign = hs.prototype.em;
    hs.prototype.setTextBaseline = hs.prototype.fm;
    t("ol.Sphere", ve, OPENLAYERS);
    ve.prototype.geodesicArea = ve.prototype.d;
    ve.prototype.haversineDistance = ve.prototype.a;
    t("ol.source.BingMaps", Xx, OPENLAYERS);
    t("ol.source.BingMaps.TOS_ATTRIBUTION", Yx, OPENLAYERS);
    t("ol.source.Cluster", Zx, OPENLAYERS);
    Zx.prototype.getSource = Zx.prototype.H;
    Z.prototype.readFeatures = Z.prototype.a;
    t("ol.source.GeoJSON", zy, OPENLAYERS);
    t("ol.source.GPX", Ay, OPENLAYERS);
    t("ol.source.IGC", By, OPENLAYERS);
    t("ol.source.ImageCanvas", gn, OPENLAYERS);
    t("ol.source.ImageMapGuide", Cy, OPENLAYERS);
    Cy.prototype.getParams = Cy.prototype.Zj;
    Cy.prototype.getImageLoadFunction = Cy.prototype.Yj;
    Cy.prototype.updateParams = Cy.prototype.bk;
    Cy.prototype.setImageLoadFunction = Cy.prototype.ak;
    t("ol.source.Image", $m, OPENLAYERS);
    bn.prototype.image = bn.prototype.image;
    t("ol.source.ImageStatic", Dy, OPENLAYERS);
    t("ol.source.ImageVector", un, OPENLAYERS);
    un.prototype.getSource = un.prototype.ck;
    un.prototype.getStyle = un.prototype.dk;
    un.prototype.getStyleFunction = un.prototype.ek;
    un.prototype.setStyle = un.prototype.Of;
    t("ol.source.ImageWMS", Ey, OPENLAYERS);
    Ey.prototype.getGetFeatureInfoUrl = Ey.prototype.hk;
    Ey.prototype.getParams = Ey.prototype.jk;
    Ey.prototype.getImageLoadFunction = Ey.prototype.ik;
    Ey.prototype.getUrl = Ey.prototype.kk;
    Ey.prototype.setImageLoadFunction = Ey.prototype.lk;
    Ey.prototype.setUrl = Ey.prototype.mk;
    Ey.prototype.updateParams = Ey.prototype.nk;
    t("ol.source.KML", Iy, OPENLAYERS);
    t("ol.source.MapQuest", My, OPENLAYERS);
    My.prototype.getLayer = My.prototype.e;
    t("ol.source.OSM", Ky, OPENLAYERS);
    t("ol.source.OSM.ATTRIBUTION", Ly, OPENLAYERS);
    t("ol.source.OSMXML", Py, OPENLAYERS);
    t("ol.source.ServerVector", Qy, OPENLAYERS);
    Qy.prototype.clear = Qy.prototype.clear;
    Qy.prototype.readFeatures = Qy.prototype.a;
    t("ol.source.Source", Ji, OPENLAYERS);
    Ji.prototype.getAttributions = Ji.prototype.Y;
    Ji.prototype.getLogo = Ji.prototype.X;
    Ji.prototype.getProjection = Ji.prototype.Z;
    Ji.prototype.getState = Ji.prototype.$;
    t("ol.source.Stamen", Ty, OPENLAYERS);
    t("ol.source.StaticVector", $, OPENLAYERS);
    t("ol.source.TileArcGISRest", Vy, OPENLAYERS);
    Vy.prototype.getParams = Vy.prototype.ok;
    Vy.prototype.getUrls = Vy.prototype.pk;
    Vy.prototype.setUrl = Vy.prototype.qk;
    Vy.prototype.setUrls = Vy.prototype.Pf;
    Vy.prototype.updateParams = Vy.prototype.sk;
    t("ol.source.TileDebug", Xy, OPENLAYERS);
    t("ol.source.TileImage", Ux, OPENLAYERS);
    Ux.prototype.getTileLoadFunction = Ux.prototype.bb;
    Ux.prototype.getTileUrlFunction = Ux.prototype.cb;
    Ux.prototype.setTileLoadFunction = Ux.prototype.jb;
    Ux.prototype.setTileUrlFunction = Ux.prototype.ta;
    t("ol.source.TileJSON", Yy, OPENLAYERS);
    t("ol.source.Tile", cj, OPENLAYERS);
    cj.prototype.getTileGrid = cj.prototype.xa;
    fj.prototype.tile = fj.prototype.tile;
    t("ol.source.TileUTFGrid", Zy, OPENLAYERS);
    Zy.prototype.getTemplate = Zy.prototype.ci;
    Zy.prototype.forDataAtCoordinateAndResolution = Zy.prototype.xh;
    t("ol.source.TileVector", dz, OPENLAYERS);
    dz.prototype.getFeatures = dz.prototype.Aa;
    dz.prototype.getFeaturesAtCoordinateAndResolution = dz.prototype.Fh;
    t("ol.source.TileWMS", fz, OPENLAYERS);
    fz.prototype.getGetFeatureInfoUrl = fz.prototype.vk;
    fz.prototype.getParams = fz.prototype.wk;
    fz.prototype.getUrls = fz.prototype.xk;
    fz.prototype.setUrl = fz.prototype.yk;
    fz.prototype.setUrls = fz.prototype.Qf;
    fz.prototype.updateParams = fz.prototype.Ak;
    t("ol.source.TopoJSON", jz, OPENLAYERS);
    t("ol.source.Vector", on, OPENLAYERS);
    on.prototype.addFeature = on.prototype.Va;
    on.prototype.addFeatures = on.prototype.Ga;
    on.prototype.clear = on.prototype.clear;
    on.prototype.forEachFeature = on.prototype.$a;
    on.prototype.forEachFeatureInExtent = on.prototype.wa;
    on.prototype.forEachFeatureIntersectingExtent = on.prototype.Ma;
    on.prototype.getFeatures = on.prototype.Aa;
    on.prototype.getFeaturesAtCoordinate = on.prototype.Oa;
    on.prototype.getClosestFeatureToCoordinate = on.prototype.ab;
    on.prototype.getExtent = on.prototype.J;
    on.prototype.getFeatureById = on.prototype.Na;
    on.prototype.removeFeature = on.prototype.fb;
    rn.prototype.feature = rn.prototype.feature;
    t("ol.source.WMTS", mz, OPENLAYERS);
    mz.prototype.getDimensions = mz.prototype.Dh;
    mz.prototype.getFormat = mz.prototype.Hh;
    mz.prototype.getLayer = mz.prototype.Bk;
    mz.prototype.getMatrixSet = mz.prototype.Th;
    mz.prototype.getStyle = mz.prototype.Ck;
    mz.prototype.getVersion = mz.prototype.gi;
    mz.prototype.updateDimensions = mz.prototype.pm;
    t("ol.source.WMTS.optionsFromCapabilities", function (b, c) {
        var d = Ua(b.Contents.Layer, function (b) {
            return b.Identifier == c.layer
        }), e, f;
        e = 1 < d.TileMatrixSetLink.length ? Va(d.TileMatrixSetLink, function (b) {
            return b.TileMatrixSet == c.matrixSet
        }) : m(c.projection) ? Va(d.TileMatrixSetLink, function (b) {
            return b.TileMatrixSet.SupportedCRS.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/, "$1:$3") == c.projection
        }) : 0;
        0 > e && (e = 0);
        f = d.TileMatrixSetLink[e].TileMatrixSet;
        var g = d.Format[0];
        m(c.format) && (g = c.format);
        e = Va(d.Style, function (b) {
            return m(c.style) ?
            b.Title == c.style : b.isDefault
        });
        0 > e && (e = 0);
        e = d.Style[e].Identifier;
        var h = {};
        m(d.Dimension) && Qa(d.Dimension, function (b) {
            var c = b.Identifier, d = b["default"];
            m(d) || (d = b.values[0]);
            h[c] = d
        });
        var k = Ua(b.Contents.TileMatrixSet, function (b) {
            return b.Identifier == f
        }), n = lz(k), k = m(c.projection) ? Be(c.projection) : Be(k.SupportedCRS.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/, "$1:$3")), p = [], q = c.requestEncoding, q = m(q) ? q : "";
        if (b.OperationsMetadata.hasOwnProperty("GetTile") && 0 != q.lastIndexOf("REST", 0)) {
            var d = b.OperationsMetadata.GetTile.DCP.HTTP.Get,
                r = Ua(d[0].Constraint, function (b) {
                    return "GetEncoding" == b.name
                }).AllowedValues.Value;
            0 < r.length && Wa(r, "KVP") && (q = "KVP", p.push(d[0].href))
        } else q = "REST", Qa(d.ResourceURL, function (b) {
            "tile" == b.resourceType && (g = b.format, p.push(b.template))
        });
        return {
            urls: p,
            layer: c.layer,
            matrixSet: f,
            format: g,
            projection: k,
            requestEncoding: q,
            tileGrid: n,
            style: e,
            dimensions: h
        }
    }, OPENLAYERS);
    t("ol.source.XYZ", Jy, OPENLAYERS);
    Jy.prototype.setTileUrlFunction = Jy.prototype.ta;
    Jy.prototype.setUrl = Jy.prototype.b;
    t("ol.source.Zoomify", pz, OPENLAYERS);
    Yk.prototype.vectorContext = Yk.prototype.vectorContext;
    Yk.prototype.frameState = Yk.prototype.frameState;
    Yk.prototype.context = Yk.prototype.context;
    Yk.prototype.glContext = Yk.prototype.glContext;
    no.prototype.drawAsync = no.prototype.kc;
    no.prototype.drawCircleGeometry = no.prototype.lc;
    no.prototype.drawFeature = no.prototype.oe;
    no.prototype.drawGeometryCollectionGeometry = no.prototype.fd;
    no.prototype.drawPointGeometry = no.prototype.ub;
    no.prototype.drawLineStringGeometry = no.prototype.Eb;
    no.prototype.drawMultiLineStringGeometry = no.prototype.mc;
    no.prototype.drawMultiPointGeometry = no.prototype.tb;
    no.prototype.drawMultiPolygonGeometry = no.prototype.nc;
    no.prototype.drawPolygonGeometry = no.prototype.Rb;
    no.prototype.drawText = no.prototype.vb;
    no.prototype.setFillStrokeStyle = no.prototype.Ba;
    no.prototype.setImageStyle = no.prototype.ib;
    no.prototype.setTextStyle = no.prototype.Ca;
    Sl.prototype.drawAsync = Sl.prototype.kc;
    Sl.prototype.drawCircleGeometry = Sl.prototype.lc;
    Sl.prototype.drawFeature = Sl.prototype.oe;
    Sl.prototype.drawPointGeometry = Sl.prototype.ub;
    Sl.prototype.drawMultiPointGeometry = Sl.prototype.tb;
    Sl.prototype.drawLineStringGeometry = Sl.prototype.Eb;
    Sl.prototype.drawMultiLineStringGeometry = Sl.prototype.mc;
    Sl.prototype.drawPolygonGeometry = Sl.prototype.Rb;
    Sl.prototype.drawMultiPolygonGeometry = Sl.prototype.nc;
    Sl.prototype.setFillStrokeStyle = Sl.prototype.Ba;
    Sl.prototype.setImageStyle = Sl.prototype.ib;
    Sl.prototype.setTextStyle = Sl.prototype.Ca;
    t("ol.proj.common.add", Rl, OPENLAYERS);
    t("ol.proj.METERS_PER_UNIT", xe, OPENLAYERS);
    t("ol.proj.Projection", ye, OPENLAYERS);
    ye.prototype.getCode = ye.prototype.Bh;
    ye.prototype.getExtent = ye.prototype.J;
    ye.prototype.getUnits = ye.prototype.Sj;
    ye.prototype.getMetersPerUnit = ye.prototype.od;
    ye.prototype.getWorldExtent = ye.prototype.ii;
    ye.prototype.isGlobal = ye.prototype.Vi;
    ye.prototype.setExtent = ye.prototype.Tj;
    ye.prototype.setWorldExtent = ye.prototype.hm;
    t("ol.proj.addEquivalentProjections", Ee, OPENLAYERS);
    t("ol.proj.addProjection", Ne, OPENLAYERS);
    t("ol.proj.addCoordinateTransforms", Qe, OPENLAYERS);
    t("ol.proj.get", Be, OPENLAYERS);
    t("ol.proj.getTransform", Te, OPENLAYERS);
    t("ol.proj.transform", function (b, c, d) {
        return Te(c, d)(b, void 0, b.length)
    }, OPENLAYERS);
    t("ol.proj.transformExtent", Ve, OPENLAYERS);
    t("ol.layer.Heatmap", Y, OPENLAYERS);
    Y.prototype.getBlur = Y.prototype.Ea;
    Y.prototype.getGradient = Y.prototype.Fa;
    Y.prototype.getRadius = Y.prototype.ic;
    Y.prototype.setBlur = Y.prototype.wc;
    Y.prototype.setGradient = Y.prototype.xc;
    Y.prototype.setRadius = Y.prototype.jc;
    t("ol.layer.Image", H, OPENLAYERS);
    H.prototype.getSource = H.prototype.a;
    t("ol.layer.Layer", E, OPENLAYERS);
    E.prototype.getSource = E.prototype.a;
    E.prototype.setSource = E.prototype.fa;
    t("ol.layer.Base", C, OPENLAYERS);
    C.prototype.getBrightness = C.prototype.c;
    C.prototype.getContrast = C.prototype.f;
    C.prototype.getHue = C.prototype.e;
    C.prototype.getExtent = C.prototype.J;
    C.prototype.getMaxResolution = C.prototype.g;
    C.prototype.getMinResolution = C.prototype.i;
    C.prototype.getOpacity = C.prototype.q;
    C.prototype.getSaturation = C.prototype.k;
    C.prototype.getVisible = C.prototype.b;
    C.prototype.setBrightness = C.prototype.D;
    C.prototype.setContrast = C.prototype.H;
    C.prototype.setHue = C.prototype.N;
    C.prototype.setExtent = C.prototype.o;
    C.prototype.setMaxResolution = C.prototype.S;
    C.prototype.setMinResolution = C.prototype.U;
    C.prototype.setOpacity = C.prototype.p;
    C.prototype.setSaturation = C.prototype.ca;
    C.prototype.setVisible = C.prototype.da;
    t("ol.layer.Group", G, OPENLAYERS);
    G.prototype.getLayers = G.prototype.ac;
    G.prototype.setLayers = G.prototype.r;
    t("ol.layer.Tile", I, OPENLAYERS);
    I.prototype.getPreload = I.prototype.r;
    I.prototype.getSource = I.prototype.a;
    I.prototype.setPreload = I.prototype.ia;
    I.prototype.getUseInterimTilesOnError = I.prototype.ea;
    I.prototype.setUseInterimTilesOnError = I.prototype.ka;
    t("ol.layer.Vector", J, OPENLAYERS);
    J.prototype.getSource = J.prototype.a;
    J.prototype.getStyle = J.prototype.af;
    J.prototype.getStyleFunction = J.prototype.df;
    J.prototype.setStyle = J.prototype.ka;
    t("ol.interaction.DoubleClickZoom", Qj, OPENLAYERS);
    t("ol.interaction.DoubleClickZoom.handleEvent", Rj, OPENLAYERS);
    t("ol.interaction.DragAndDrop", Rw, OPENLAYERS);
    t("ol.interaction.DragAndDrop.handleEvent", cd, OPENLAYERS);
    Sw.prototype.features = Sw.prototype.features;
    Sw.prototype.file = Sw.prototype.file;
    Sw.prototype.projection = Sw.prototype.projection;
    bl.prototype.coordinate = bl.prototype.coordinate;
    t("ol.interaction.DragBox", cl, OPENLAYERS);
    cl.prototype.getGeometry = cl.prototype.R;
    t("ol.interaction.DragPan", ck, OPENLAYERS);
    t("ol.interaction.DragRotateAndZoom", Vw, OPENLAYERS);
    t("ol.interaction.DragRotate", gk, OPENLAYERS);
    t("ol.interaction.DragZoom", vl, OPENLAYERS);
    Zw.prototype.feature = Zw.prototype.feature;
    t("ol.interaction.Draw", $w, OPENLAYERS);
    t("ol.interaction.Draw.handleEvent", bx, OPENLAYERS);
    $w.prototype.finishDrawing = $w.prototype.U;
    t("ol.interaction.Interaction", Mj, OPENLAYERS);
    Mj.prototype.getActive = Mj.prototype.b;
    Mj.prototype.setActive = Mj.prototype.c;
    t("ol.interaction.defaults", Kl, OPENLAYERS);
    t("ol.interaction.KeyboardPan", wl, OPENLAYERS);
    t("ol.interaction.KeyboardPan.handleEvent", xl, OPENLAYERS);
    t("ol.interaction.KeyboardZoom", yl, OPENLAYERS);
    t("ol.interaction.KeyboardZoom.handleEvent", zl, OPENLAYERS);
    t("ol.interaction.Modify", nx, OPENLAYERS);
    t("ol.interaction.Modify.handleEvent", qx, OPENLAYERS);
    t("ol.interaction.MouseWheelZoom", Al, OPENLAYERS);
    t("ol.interaction.MouseWheelZoom.handleEvent", Bl, OPENLAYERS);
    t("ol.interaction.PinchRotate", Cl, OPENLAYERS);
    t("ol.interaction.PinchZoom", Gl, OPENLAYERS);
    t("ol.interaction.Pointer", Zj, OPENLAYERS);
    t("ol.interaction.Pointer.handleEvent", ak, OPENLAYERS);
    wx.prototype.selected = wx.prototype.selected;
    wx.prototype.deselected = wx.prototype.deselected;
    t("ol.interaction.Select", xx, OPENLAYERS);
    xx.prototype.getFeatures = xx.prototype.o;
    t("ol.interaction.Select.handleEvent", yx, OPENLAYERS);
    xx.prototype.setMap = xx.prototype.setMap;
    t("ol.geom.Circle", Em, OPENLAYERS);
    Em.prototype.clone = Em.prototype.clone;
    Em.prototype.getCenter = Em.prototype.Oc;
    Em.prototype.getRadius = Em.prototype.Hf;
    Em.prototype.getType = Em.prototype.O;
    Em.prototype.setCenter = Em.prototype.Mj;
    Em.prototype.setCenterAndRadius = Em.prototype.rg;
    Em.prototype.setRadius = Em.prototype.If;
    Em.prototype.transform = Em.prototype.transform;
    t("ol.geom.Geometry", kk, OPENLAYERS);
    kk.prototype.clone = kk.prototype.clone;
    kk.prototype.getClosestPoint = kk.prototype.f;
    kk.prototype.getExtent = kk.prototype.J;
    kk.prototype.getType = kk.prototype.O;
    kk.prototype.applyTransform = kk.prototype.qa;
    kk.prototype.intersectsExtent = kk.prototype.ja;
    kk.prototype.translate = kk.prototype.Ia;
    kk.prototype.transform = kk.prototype.transform;
    t("ol.geom.GeometryCollection", Gm, OPENLAYERS);
    Gm.prototype.clone = Gm.prototype.clone;
    Gm.prototype.getGeometries = Gm.prototype.nf;
    Gm.prototype.getType = Gm.prototype.O;
    Gm.prototype.intersectsExtent = Gm.prototype.ja;
    Gm.prototype.setGeometries = Gm.prototype.sg;
    Gm.prototype.applyTransform = Gm.prototype.qa;
    Gm.prototype.translate = Gm.prototype.Ia;
    t("ol.geom.LinearRing", Gk, OPENLAYERS);
    Gk.prototype.clone = Gk.prototype.clone;
    Gk.prototype.getArea = Gk.prototype.Oj;
    Gk.prototype.getCoordinates = Gk.prototype.Q;
    Gk.prototype.getType = Gk.prototype.O;
    Gk.prototype.setCoordinates = Gk.prototype.W;
    t("ol.geom.LineString", K, OPENLAYERS);
    K.prototype.appendCoordinate = K.prototype.ih;
    K.prototype.clone = K.prototype.clone;
    K.prototype.forEachSegment = K.prototype.yh;
    K.prototype.getCoordinateAtM = K.prototype.Nj;
    K.prototype.getCoordinates = K.prototype.Q;
    K.prototype.getLength = K.prototype.Jf;
    K.prototype.getType = K.prototype.O;
    K.prototype.intersectsExtent = K.prototype.ja;
    K.prototype.setCoordinates = K.prototype.W;
    t("ol.geom.MultiLineString", Om, OPENLAYERS);
    Om.prototype.appendLineString = Om.prototype.jh;
    Om.prototype.clone = Om.prototype.clone;
    Om.prototype.getCoordinateAtM = Om.prototype.Pj;
    Om.prototype.getCoordinates = Om.prototype.Q;
    Om.prototype.getLineString = Om.prototype.Qh;
    Om.prototype.getLineStrings = Om.prototype.Lc;
    Om.prototype.getType = Om.prototype.O;
    Om.prototype.intersectsExtent = Om.prototype.ja;
    Om.prototype.setCoordinates = Om.prototype.W;
    t("ol.geom.MultiPoint", Rm, OPENLAYERS);
    Rm.prototype.appendPoint = Rm.prototype.lh;
    Rm.prototype.clone = Rm.prototype.clone;
    Rm.prototype.getCoordinates = Rm.prototype.Q;
    Rm.prototype.getPoint = Rm.prototype.$h;
    Rm.prototype.getPoints = Rm.prototype.Gd;
    Rm.prototype.getType = Rm.prototype.O;
    Rm.prototype.intersectsExtent = Rm.prototype.ja;
    Rm.prototype.setCoordinates = Rm.prototype.W;
    t("ol.geom.MultiPolygon", Sm, OPENLAYERS);
    Sm.prototype.appendPolygon = Sm.prototype.mh;
    Sm.prototype.clone = Sm.prototype.clone;
    Sm.prototype.getArea = Sm.prototype.Qj;
    Sm.prototype.getCoordinates = Sm.prototype.Q;
    Sm.prototype.getInteriorPoints = Sm.prototype.Nh;
    Sm.prototype.getPolygon = Sm.prototype.ai;
    Sm.prototype.getPolygons = Sm.prototype.qd;
    Sm.prototype.getType = Sm.prototype.O;
    Sm.prototype.intersectsExtent = Sm.prototype.ja;
    Sm.prototype.setCoordinates = Sm.prototype.W;
    t("ol.geom.Point", Ik, OPENLAYERS);
    Ik.prototype.clone = Ik.prototype.clone;
    Ik.prototype.getCoordinates = Ik.prototype.Q;
    Ik.prototype.getType = Ik.prototype.O;
    Ik.prototype.intersectsExtent = Ik.prototype.ja;
    Ik.prototype.setCoordinates = Ik.prototype.W;
    t("ol.geom.Polygon", F, OPENLAYERS);
    F.prototype.appendLinearRing = F.prototype.kh;
    F.prototype.clone = F.prototype.clone;
    F.prototype.getArea = F.prototype.Rj;
    F.prototype.getCoordinates = F.prototype.Q;
    F.prototype.getInteriorPoint = F.prototype.Mh;
    F.prototype.getLinearRingCount = F.prototype.Sh;
    F.prototype.getLinearRing = F.prototype.Rh;
    F.prototype.getLinearRings = F.prototype.ld;
    F.prototype.getType = F.prototype.O;
    F.prototype.intersectsExtent = F.prototype.ja;
    F.prototype.setCoordinates = F.prototype.W;
    t("ol.geom.Polygon.circular", Xk, OPENLAYERS);
    t("ol.geom.Polygon.fromExtent", function (b) {
        var c = b[0], d = b[1], e = b[2];
        b = b[3];
        c = [c, d, c, b, e, b, e, d, c, d];
        d = new F(null);
        Uk(d, "XY", c, [c.length]);
        return d
    }, OPENLAYERS);
    t("ol.geom.SimpleGeometry", mk, OPENLAYERS);
    mk.prototype.getFirstCoordinate = mk.prototype.yb;
    mk.prototype.getLastCoordinate = mk.prototype.zb;
    mk.prototype.getLayout = mk.prototype.Ab;
    mk.prototype.applyTransform = mk.prototype.qa;
    mk.prototype.translate = mk.prototype.Ia;
    t("ol.format.Feature", tp, OPENLAYERS);
    t("ol.format.GeoJSON", Dp, OPENLAYERS);
    Dp.prototype.readFeature = Dp.prototype.Nb;
    Dp.prototype.readFeatures = Dp.prototype.ma;
    Dp.prototype.readGeometry = Dp.prototype.Rc;
    Dp.prototype.readProjection = Dp.prototype.Ja;
    Dp.prototype.writeFeature = Dp.prototype.be;
    Dp.prototype.writeFeatureObject = Dp.prototype.a;
    Dp.prototype.writeFeatures = Dp.prototype.Qb;
    Dp.prototype.writeFeaturesObject = Dp.prototype.c;
    Dp.prototype.writeGeometry = Dp.prototype.Xc;
    Dp.prototype.writeGeometryObject = Dp.prototype.f;
    t("ol.format.GPX", Tq, OPENLAYERS);
    Tq.prototype.readFeature = Tq.prototype.Nb;
    Tq.prototype.readFeatures = Tq.prototype.ma;
    Tq.prototype.readProjection = Tq.prototype.Ja;
    Tq.prototype.writeFeatures = Tq.prototype.Qb;
    Tq.prototype.writeFeaturesNode = Tq.prototype.a;
    t("ol.format.IGC", Dr, OPENLAYERS);
    Dr.prototype.readFeature = Dr.prototype.Nb;
    Dr.prototype.readFeatures = Dr.prototype.ma;
    Dr.prototype.readProjection = Dr.prototype.Ja;
    t("ol.format.KML", is, OPENLAYERS);
    is.prototype.readFeature = is.prototype.Nb;
    is.prototype.readFeatures = is.prototype.ma;
    is.prototype.readName = is.prototype.El;
    is.prototype.readNetworkLinks = is.prototype.Fl;
    is.prototype.readProjection = is.prototype.Ja;
    is.prototype.writeFeatures = is.prototype.Qb;
    is.prototype.writeFeaturesNode = is.prototype.a;
    t("ol.format.OSMXML", St, OPENLAYERS);
    St.prototype.readFeatures = St.prototype.ma;
    St.prototype.readProjection = St.prototype.Ja;
    t("ol.format.Polyline", qu, OPENLAYERS);
    t("ol.format.Polyline.encodeDeltas", ru, OPENLAYERS);
    t("ol.format.Polyline.decodeDeltas", tu, OPENLAYERS);
    t("ol.format.Polyline.encodeFloats", su, OPENLAYERS);
    t("ol.format.Polyline.decodeFloats", uu, OPENLAYERS);
    qu.prototype.readFeature = qu.prototype.Nb;
    qu.prototype.readFeatures = qu.prototype.ma;
    qu.prototype.readGeometry = qu.prototype.Rc;
    qu.prototype.readProjection = qu.prototype.Ja;
    qu.prototype.writeGeometry = qu.prototype.Xc;
    t("ol.format.TopoJSON", vu, OPENLAYERS);
    vu.prototype.readFeatures = vu.prototype.ma;
    vu.prototype.readProjection = vu.prototype.Ja;
    t("ol.format.WFS", Bu, OPENLAYERS);
    Bu.prototype.readFeatures = Bu.prototype.ma;
    Bu.prototype.readTransactionResponse = Bu.prototype.g;
    Bu.prototype.readFeatureCollectionMetadata = Bu.prototype.e;
    Bu.prototype.writeGetFeature = Bu.prototype.n;
    Bu.prototype.writeTransaction = Bu.prototype.q;
    Bu.prototype.readProjection = Bu.prototype.Ja;
    t("ol.format.WKT", Ou, OPENLAYERS);
    Ou.prototype.readFeature = Ou.prototype.Nb;
    Ou.prototype.readFeatures = Ou.prototype.ma;
    Ou.prototype.readGeometry = Ou.prototype.Rc;
    Ou.prototype.writeFeature = Ou.prototype.be;
    Ou.prototype.writeFeatures = Ou.prototype.Qb;
    Ou.prototype.writeGeometry = Ou.prototype.Xc;
    t("ol.format.WMSCapabilities", fv, OPENLAYERS);
    fv.prototype.read = fv.prototype.b;
    t("ol.format.WMSGetFeatureInfo", Cv, OPENLAYERS);
    Cv.prototype.readFeatures = Cv.prototype.ma;
    t("ol.format.WMTSCapabilities", Ev, OPENLAYERS);
    Ev.prototype.read = Ev.prototype.b;
    t("ol.format.GML2", Sq, OPENLAYERS);
    t("ol.format.GML3", Jq, OPENLAYERS);
    Jq.prototype.writeGeometryNode = Jq.prototype.i;
    Jq.prototype.writeFeatures = Jq.prototype.Qb;
    Jq.prototype.writeFeaturesNode = Jq.prototype.a;
    t("ol.format.GML", Jq, OPENLAYERS);
    Jq.prototype.writeFeatures = Jq.prototype.Qb;
    Jq.prototype.writeFeaturesNode = Jq.prototype.a;
    t("ol.format.GMLBase", xq, OPENLAYERS);
    xq.prototype.readFeatures = xq.prototype.ma;
    t("ol.events.condition.altKeyOnly", function (b) {
        b = b.a;
        return b.d && !b.g && !b.c
    }, OPENLAYERS);
    t("ol.events.condition.altShiftKeysOnly", Sj, OPENLAYERS);
    t("ol.events.condition.always", cd, OPENLAYERS);
    t("ol.events.condition.click", function (b) {
        return b.type == zi
    }, OPENLAYERS);
    t("ol.events.condition.never", bd, OPENLAYERS);
    t("ol.events.condition.pointerMove", Tj, OPENLAYERS);
    t("ol.events.condition.singleClick", Uj, OPENLAYERS);
    t("ol.events.condition.noModifierKeys", Vj, OPENLAYERS);
    t("ol.events.condition.platformModifierKeyOnly", function (b) {
        b = b.a;
        return !b.d && b.g && !b.c
    }, OPENLAYERS);
    t("ol.events.condition.shiftKeyOnly", Wj, OPENLAYERS);
    t("ol.events.condition.targetNotEditable", Xj, OPENLAYERS);
    t("ol.events.condition.mouseOnly", Yj, OPENLAYERS);
    t("ol.dom.Input", qp, OPENLAYERS);
    qp.prototype.getChecked = qp.prototype.a;
    qp.prototype.getValue = qp.prototype.b;
    qp.prototype.setValue = qp.prototype.f;
    qp.prototype.setChecked = qp.prototype.c;
    t("ol.control.Attribution", Ug, OPENLAYERS);
    t("ol.control.Attribution.render", Vg, OPENLAYERS);
    Ug.prototype.getCollapsible = Ug.prototype.Dj;
    Ug.prototype.setCollapsible = Ug.prototype.Gj;
    Ug.prototype.setCollapsed = Ug.prototype.Fj;
    Ug.prototype.getCollapsed = Ug.prototype.Cj;
    t("ol.control.Control", Tg, OPENLAYERS);
    Tg.prototype.getMap = Tg.prototype.f;
    Tg.prototype.setMap = Tg.prototype.setMap;
    Tg.prototype.setTarget = Tg.prototype.b;
    t("ol.control.defaults", $g, OPENLAYERS);
    t("ol.control.FullScreen", eh, OPENLAYERS);
    t("ol.control.MousePosition", fh, OPENLAYERS);
    t("ol.control.MousePosition.render", gh, OPENLAYERS);
    fh.prototype.getCoordinateFormat = fh.prototype.k;
    fh.prototype.getProjection = fh.prototype.p;
    fh.prototype.setMap = fh.prototype.setMap;
    fh.prototype.setCoordinateFormat = fh.prototype.D;
    fh.prototype.setProjection = fh.prototype.r;
    t("ol.control.OverviewMap", Po, OPENLAYERS);
    Po.prototype.setMap = Po.prototype.setMap;
    t("ol.control.OverviewMap.render", Qo, OPENLAYERS);
    Po.prototype.getCollapsible = Po.prototype.Ij;
    Po.prototype.setCollapsible = Po.prototype.Lj;
    Po.prototype.setCollapsed = Po.prototype.Kj;
    Po.prototype.getCollapsed = Po.prototype.Hj;
    t("ol.control.Rotate", Xg, OPENLAYERS);
    t("ol.control.Rotate.render", Yg, OPENLAYERS);
    t("ol.control.ScaleLine", Vo, OPENLAYERS);
    Vo.prototype.getUnits = Vo.prototype.o;
    t("ol.control.ScaleLine.render", Wo, OPENLAYERS);
    Vo.prototype.setUnits = Vo.prototype.p;
    t("ol.control.Zoom", Zg, OPENLAYERS);
    t("ol.control.ZoomSlider", jp, OPENLAYERS);
    t("ol.control.ZoomSlider.render", lp, OPENLAYERS);
    t("ol.control.ZoomToExtent", op, OPENLAYERS);
    t("ol.color.asArray", pg, OPENLAYERS);
    t("ol.color.asString", rg, OPENLAYERS);
    rd.prototype.changed = rd.prototype.l;
    rd.prototype.getRevision = rd.prototype.u;
    rd.prototype.on = rd.prototype.s;
    rd.prototype.once = rd.prototype.v;
    rd.prototype.un = rd.prototype.t;
    rd.prototype.unByKey = rd.prototype.A;
    kg.prototype.bindTo = kg.prototype.K;
    kg.prototype.get = kg.prototype.get;
    kg.prototype.getKeys = kg.prototype.G;
    kg.prototype.getProperties = kg.prototype.I;
    kg.prototype.set = kg.prototype.set;
    kg.prototype.setProperties = kg.prototype.C;
    kg.prototype.unbind = kg.prototype.L;
    kg.prototype.unbindAll = kg.prototype.M;
    kg.prototype.changed = kg.prototype.l;
    kg.prototype.getRevision = kg.prototype.u;
    kg.prototype.on = kg.prototype.s;
    kg.prototype.once = kg.prototype.v;
    kg.prototype.un = kg.prototype.t;
    kg.prototype.unByKey = kg.prototype.A;
    pp.prototype.bindTo = pp.prototype.K;
    pp.prototype.get = pp.prototype.get;
    pp.prototype.getKeys = pp.prototype.G;
    pp.prototype.getProperties = pp.prototype.I;
    pp.prototype.set = pp.prototype.set;
    pp.prototype.setProperties = pp.prototype.C;
    pp.prototype.unbind = pp.prototype.L;
    pp.prototype.unbindAll = pp.prototype.M;
    pp.prototype.changed = pp.prototype.l;
    pp.prototype.getRevision = pp.prototype.u;
    pp.prototype.on = pp.prototype.s;
    pp.prototype.once = pp.prototype.v;
    pp.prototype.un = pp.prototype.t;
    pp.prototype.unByKey = pp.prototype.A;
    P.prototype.bindTo = P.prototype.K;
    P.prototype.get = P.prototype.get;
    P.prototype.getKeys = P.prototype.G;
    P.prototype.getProperties = P.prototype.I;
    P.prototype.set = P.prototype.set;
    P.prototype.setProperties = P.prototype.C;
    P.prototype.unbind = P.prototype.L;
    P.prototype.unbindAll = P.prototype.M;
    P.prototype.changed = P.prototype.l;
    P.prototype.getRevision = P.prototype.u;
    P.prototype.on = P.prototype.s;
    P.prototype.once = P.prototype.v;
    P.prototype.un = P.prototype.t;
    P.prototype.unByKey = P.prototype.A;
    X.prototype.bindTo = X.prototype.K;
    X.prototype.get = X.prototype.get;
    X.prototype.getKeys = X.prototype.G;
    X.prototype.getProperties = X.prototype.I;
    X.prototype.set = X.prototype.set;
    X.prototype.setProperties = X.prototype.C;
    X.prototype.unbind = X.prototype.L;
    X.prototype.unbindAll = X.prototype.M;
    X.prototype.changed = X.prototype.l;
    X.prototype.getRevision = X.prototype.u;
    X.prototype.on = X.prototype.s;
    X.prototype.once = X.prototype.v;
    X.prototype.un = X.prototype.t;
    X.prototype.unByKey = X.prototype.A;
    $v.prototype.getTileCoord = $v.prototype.e;
    L.prototype.bindTo = L.prototype.K;
    L.prototype.get = L.prototype.get;
    L.prototype.getKeys = L.prototype.G;
    L.prototype.getProperties = L.prototype.I;
    L.prototype.set = L.prototype.set;
    L.prototype.setProperties = L.prototype.C;
    L.prototype.unbind = L.prototype.L;
    L.prototype.unbindAll = L.prototype.M;
    L.prototype.changed = L.prototype.l;
    L.prototype.getRevision = L.prototype.u;
    L.prototype.on = L.prototype.s;
    L.prototype.once = L.prototype.v;
    L.prototype.un = L.prototype.t;
    L.prototype.unByKey = L.prototype.A;
    vi.prototype.map = vi.prototype.map;
    vi.prototype.frameState = vi.prototype.frameState;
    wi.prototype.originalEvent = wi.prototype.originalEvent;
    wi.prototype.pixel = wi.prototype.pixel;
    wi.prototype.coordinate = wi.prototype.coordinate;
    wi.prototype.dragging = wi.prototype.dragging;
    wi.prototype.preventDefault = wi.prototype.preventDefault;
    wi.prototype.stopPropagation = wi.prototype.pb;
    wi.prototype.map = wi.prototype.map;
    wi.prototype.frameState = wi.prototype.frameState;
    N.prototype.bindTo = N.prototype.K;
    N.prototype.get = N.prototype.get;
    N.prototype.getKeys = N.prototype.G;
    N.prototype.getProperties = N.prototype.I;
    N.prototype.set = N.prototype.set;
    N.prototype.setProperties = N.prototype.C;
    N.prototype.unbind = N.prototype.L;
    N.prototype.unbindAll = N.prototype.M;
    N.prototype.changed = N.prototype.l;
    N.prototype.getRevision = N.prototype.u;
    N.prototype.on = N.prototype.s;
    N.prototype.once = N.prototype.v;
    N.prototype.un = N.prototype.t;
    N.prototype.unByKey = N.prototype.A;
    B.prototype.bindTo = B.prototype.K;
    B.prototype.get = B.prototype.get;
    B.prototype.getKeys = B.prototype.G;
    B.prototype.getProperties = B.prototype.I;
    B.prototype.set = B.prototype.set;
    B.prototype.setProperties = B.prototype.C;
    B.prototype.unbind = B.prototype.L;
    B.prototype.unbindAll = B.prototype.M;
    B.prototype.changed = B.prototype.l;
    B.prototype.getRevision = B.prototype.u;
    B.prototype.on = B.prototype.s;
    B.prototype.once = B.prototype.v;
    B.prototype.un = B.prototype.t;
    B.prototype.unByKey = B.prototype.A;
    kz.prototype.getMaxZoom = kz.prototype.md;
    kz.prototype.getMinZoom = kz.prototype.pd;
    kz.prototype.getOrigin = kz.prototype.Lb;
    kz.prototype.getResolution = kz.prototype.na;
    kz.prototype.getResolutions = kz.prototype.Qd;
    kz.prototype.getTileCoordForCoordAndResolution = kz.prototype.Wb;
    kz.prototype.getTileCoordForCoordAndZ = kz.prototype.Nc;
    kz.prototype.getTileSize = kz.prototype.ua;
    Wx.prototype.getMaxZoom = Wx.prototype.md;
    Wx.prototype.getMinZoom = Wx.prototype.pd;
    Wx.prototype.getOrigin = Wx.prototype.Lb;
    Wx.prototype.getResolution = Wx.prototype.na;
    Wx.prototype.getResolutions = Wx.prototype.Qd;
    Wx.prototype.getTileCoordForCoordAndResolution = Wx.prototype.Wb;
    Wx.prototype.getTileCoordForCoordAndZ = Wx.prototype.Nc;
    Wx.prototype.getTileSize = Wx.prototype.ua;
    oz.prototype.getMaxZoom = oz.prototype.md;
    oz.prototype.getMinZoom = oz.prototype.pd;
    oz.prototype.getOrigin = oz.prototype.Lb;
    oz.prototype.getResolution = oz.prototype.na;
    oz.prototype.getResolutions = oz.prototype.Qd;
    oz.prototype.getTileCoordForCoordAndResolution = oz.prototype.Wb;
    oz.prototype.getTileCoordForCoordAndZ = oz.prototype.Nc;
    oz.prototype.getTileSize = oz.prototype.ua;
    pl.prototype.getOpacity = pl.prototype.Ld;
    pl.prototype.getRotateWithView = pl.prototype.rd;
    pl.prototype.getRotation = pl.prototype.Md;
    pl.prototype.getScale = pl.prototype.Nd;
    pl.prototype.getSnapToPixel = pl.prototype.sd;
    pl.prototype.setRotation = pl.prototype.Od;
    pl.prototype.setScale = pl.prototype.Pd;
    vj.prototype.getOpacity = vj.prototype.Ld;
    vj.prototype.getRotateWithView = vj.prototype.rd;
    vj.prototype.getRotation = vj.prototype.Md;
    vj.prototype.getScale = vj.prototype.Nd;
    vj.prototype.getSnapToPixel = vj.prototype.sd;
    vj.prototype.setRotation = vj.prototype.Od;
    vj.prototype.setScale = vj.prototype.Pd;
    vz.prototype.getOpacity = vz.prototype.Ld;
    vz.prototype.getRotateWithView = vz.prototype.rd;
    vz.prototype.getRotation = vz.prototype.Md;
    vz.prototype.getScale = vz.prototype.Nd;
    vz.prototype.getSnapToPixel = vz.prototype.sd;
    vz.prototype.setRotation = vz.prototype.Od;
    vz.prototype.setScale = vz.prototype.Pd;
    Ji.prototype.bindTo = Ji.prototype.K;
    Ji.prototype.get = Ji.prototype.get;
    Ji.prototype.getKeys = Ji.prototype.G;
    Ji.prototype.getProperties = Ji.prototype.I;
    Ji.prototype.set = Ji.prototype.set;
    Ji.prototype.setProperties = Ji.prototype.C;
    Ji.prototype.unbind = Ji.prototype.L;
    Ji.prototype.unbindAll = Ji.prototype.M;
    Ji.prototype.changed = Ji.prototype.l;
    Ji.prototype.getRevision = Ji.prototype.u;
    Ji.prototype.on = Ji.prototype.s;
    Ji.prototype.once = Ji.prototype.v;
    Ji.prototype.un = Ji.prototype.t;
    Ji.prototype.unByKey = Ji.prototype.A;
    cj.prototype.getAttributions = cj.prototype.Y;
    cj.prototype.getLogo = cj.prototype.X;
    cj.prototype.getProjection = cj.prototype.Z;
    cj.prototype.getState = cj.prototype.$;
    cj.prototype.bindTo = cj.prototype.K;
    cj.prototype.get = cj.prototype.get;
    cj.prototype.getKeys = cj.prototype.G;
    cj.prototype.getProperties = cj.prototype.I;
    cj.prototype.set = cj.prototype.set;
    cj.prototype.setProperties = cj.prototype.C;
    cj.prototype.unbind = cj.prototype.L;
    cj.prototype.unbindAll = cj.prototype.M;
    cj.prototype.changed = cj.prototype.l;
    cj.prototype.getRevision = cj.prototype.u;
    cj.prototype.on = cj.prototype.s;
    cj.prototype.once = cj.prototype.v;
    cj.prototype.un = cj.prototype.t;
    cj.prototype.unByKey = cj.prototype.A;
    Ux.prototype.getTileGrid = Ux.prototype.xa;
    Ux.prototype.getAttributions = Ux.prototype.Y;
    Ux.prototype.getLogo = Ux.prototype.X;
    Ux.prototype.getProjection = Ux.prototype.Z;
    Ux.prototype.getState = Ux.prototype.$;
    Ux.prototype.bindTo = Ux.prototype.K;
    Ux.prototype.get = Ux.prototype.get;
    Ux.prototype.getKeys = Ux.prototype.G;
    Ux.prototype.getProperties = Ux.prototype.I;
    Ux.prototype.set = Ux.prototype.set;
    Ux.prototype.setProperties = Ux.prototype.C;
    Ux.prototype.unbind = Ux.prototype.L;
    Ux.prototype.unbindAll = Ux.prototype.M;
    Ux.prototype.changed = Ux.prototype.l;
    Ux.prototype.getRevision = Ux.prototype.u;
    Ux.prototype.on = Ux.prototype.s;
    Ux.prototype.once = Ux.prototype.v;
    Ux.prototype.un = Ux.prototype.t;
    Ux.prototype.unByKey = Ux.prototype.A;
    Xx.prototype.getTileLoadFunction = Xx.prototype.bb;
    Xx.prototype.getTileUrlFunction = Xx.prototype.cb;
    Xx.prototype.setTileLoadFunction = Xx.prototype.jb;
    Xx.prototype.setTileUrlFunction = Xx.prototype.ta;
    Xx.prototype.getTileGrid = Xx.prototype.xa;
    Xx.prototype.getAttributions = Xx.prototype.Y;
    Xx.prototype.getLogo = Xx.prototype.X;
    Xx.prototype.getProjection = Xx.prototype.Z;
    Xx.prototype.getState = Xx.prototype.$;
    Xx.prototype.bindTo = Xx.prototype.K;
    Xx.prototype.get = Xx.prototype.get;
    Xx.prototype.getKeys = Xx.prototype.G;
    Xx.prototype.getProperties = Xx.prototype.I;
    Xx.prototype.set = Xx.prototype.set;
    Xx.prototype.setProperties = Xx.prototype.C;
    Xx.prototype.unbind = Xx.prototype.L;
    Xx.prototype.unbindAll = Xx.prototype.M;
    Xx.prototype.changed = Xx.prototype.l;
    Xx.prototype.getRevision = Xx.prototype.u;
    Xx.prototype.on = Xx.prototype.s;
    Xx.prototype.once = Xx.prototype.v;
    Xx.prototype.un = Xx.prototype.t;
    Xx.prototype.unByKey = Xx.prototype.A;
    on.prototype.getAttributions = on.prototype.Y;
    on.prototype.getLogo = on.prototype.X;
    on.prototype.getProjection = on.prototype.Z;
    on.prototype.getState = on.prototype.$;
    on.prototype.bindTo = on.prototype.K;
    on.prototype.get = on.prototype.get;
    on.prototype.getKeys = on.prototype.G;
    on.prototype.getProperties = on.prototype.I;
    on.prototype.set = on.prototype.set;
    on.prototype.setProperties = on.prototype.C;
    on.prototype.unbind = on.prototype.L;
    on.prototype.unbindAll = on.prototype.M;
    on.prototype.changed = on.prototype.l;
    on.prototype.getRevision = on.prototype.u;
    on.prototype.on = on.prototype.s;
    on.prototype.once = on.prototype.v;
    on.prototype.un = on.prototype.t;
    on.prototype.unByKey = on.prototype.A;
    Zx.prototype.addFeature = Zx.prototype.Va;
    Zx.prototype.addFeatures = Zx.prototype.Ga;
    Zx.prototype.clear = Zx.prototype.clear;
    Zx.prototype.forEachFeature = Zx.prototype.$a;
    Zx.prototype.forEachFeatureInExtent = Zx.prototype.wa;
    Zx.prototype.forEachFeatureIntersectingExtent = Zx.prototype.Ma;
    Zx.prototype.getFeatures = Zx.prototype.Aa;
    Zx.prototype.getFeaturesAtCoordinate = Zx.prototype.Oa;
    Zx.prototype.getClosestFeatureToCoordinate = Zx.prototype.ab;
    Zx.prototype.getExtent = Zx.prototype.J;
    Zx.prototype.getFeatureById = Zx.prototype.Na;
    Zx.prototype.removeFeature = Zx.prototype.fb;
    Zx.prototype.getAttributions = Zx.prototype.Y;
    Zx.prototype.getLogo = Zx.prototype.X;
    Zx.prototype.getProjection = Zx.prototype.Z;
    Zx.prototype.getState = Zx.prototype.$;
    Zx.prototype.bindTo = Zx.prototype.K;
    Zx.prototype.get = Zx.prototype.get;
    Zx.prototype.getKeys = Zx.prototype.G;
    Zx.prototype.getProperties = Zx.prototype.I;
    Zx.prototype.set = Zx.prototype.set;
    Zx.prototype.setProperties = Zx.prototype.C;
    Zx.prototype.unbind = Zx.prototype.L;
    Zx.prototype.unbindAll = Zx.prototype.M;
    Zx.prototype.changed = Zx.prototype.l;
    Zx.prototype.getRevision = Zx.prototype.u;
    Zx.prototype.on = Zx.prototype.s;
    Zx.prototype.once = Zx.prototype.v;
    Zx.prototype.un = Zx.prototype.t;
    Zx.prototype.unByKey = Zx.prototype.A;
    Z.prototype.addFeature = Z.prototype.Va;
    Z.prototype.addFeatures = Z.prototype.Ga;
    Z.prototype.clear = Z.prototype.clear;
    Z.prototype.forEachFeature = Z.prototype.$a;
    Z.prototype.forEachFeatureInExtent = Z.prototype.wa;
    Z.prototype.forEachFeatureIntersectingExtent = Z.prototype.Ma;
    Z.prototype.getFeatures = Z.prototype.Aa;
    Z.prototype.getFeaturesAtCoordinate = Z.prototype.Oa;
    Z.prototype.getClosestFeatureToCoordinate = Z.prototype.ab;
    Z.prototype.getExtent = Z.prototype.J;
    Z.prototype.getFeatureById = Z.prototype.Na;
    Z.prototype.removeFeature = Z.prototype.fb;
    Z.prototype.getAttributions = Z.prototype.Y;
    Z.prototype.getLogo = Z.prototype.X;
    Z.prototype.getProjection = Z.prototype.Z;
    Z.prototype.getState = Z.prototype.$;
    Z.prototype.bindTo = Z.prototype.K;
    Z.prototype.get = Z.prototype.get;
    Z.prototype.getKeys = Z.prototype.G;
    Z.prototype.getProperties = Z.prototype.I;
    Z.prototype.set = Z.prototype.set;
    Z.prototype.setProperties = Z.prototype.C;
    Z.prototype.unbind = Z.prototype.L;
    Z.prototype.unbindAll = Z.prototype.M;
    Z.prototype.changed = Z.prototype.l;
    Z.prototype.getRevision = Z.prototype.u;
    Z.prototype.on = Z.prototype.s;
    Z.prototype.once = Z.prototype.v;
    Z.prototype.un = Z.prototype.t;
    Z.prototype.unByKey = Z.prototype.A;
    $.prototype.readFeatures = $.prototype.a;
    $.prototype.addFeature = $.prototype.Va;
    $.prototype.addFeatures = $.prototype.Ga;
    $.prototype.clear = $.prototype.clear;
    $.prototype.forEachFeature = $.prototype.$a;
    $.prototype.forEachFeatureInExtent = $.prototype.wa;
    $.prototype.forEachFeatureIntersectingExtent = $.prototype.Ma;
    $.prototype.getFeatures = $.prototype.Aa;
    $.prototype.getFeaturesAtCoordinate = $.prototype.Oa;
    $.prototype.getClosestFeatureToCoordinate = $.prototype.ab;
    $.prototype.getExtent = $.prototype.J;
    $.prototype.getFeatureById = $.prototype.Na;
    $.prototype.removeFeature = $.prototype.fb;
    $.prototype.getAttributions = $.prototype.Y;
    $.prototype.getLogo = $.prototype.X;
    $.prototype.getProjection = $.prototype.Z;
    $.prototype.getState = $.prototype.$;
    $.prototype.bindTo = $.prototype.K;
    $.prototype.get = $.prototype.get;
    $.prototype.getKeys = $.prototype.G;
    $.prototype.getProperties = $.prototype.I;
    $.prototype.set = $.prototype.set;
    $.prototype.setProperties = $.prototype.C;
    $.prototype.unbind = $.prototype.L;
    $.prototype.unbindAll = $.prototype.M;
    $.prototype.changed = $.prototype.l;
    $.prototype.getRevision = $.prototype.u;
    $.prototype.on = $.prototype.s;
    $.prototype.once = $.prototype.v;
    $.prototype.un = $.prototype.t;
    $.prototype.unByKey = $.prototype.A;
    zy.prototype.readFeatures = zy.prototype.a;
    zy.prototype.addFeature = zy.prototype.Va;
    zy.prototype.addFeatures = zy.prototype.Ga;
    zy.prototype.clear = zy.prototype.clear;
    zy.prototype.forEachFeature = zy.prototype.$a;
    zy.prototype.forEachFeatureInExtent = zy.prototype.wa;
    zy.prototype.forEachFeatureIntersectingExtent = zy.prototype.Ma;
    zy.prototype.getFeatures = zy.prototype.Aa;
    zy.prototype.getFeaturesAtCoordinate = zy.prototype.Oa;
    zy.prototype.getClosestFeatureToCoordinate = zy.prototype.ab;
    zy.prototype.getExtent = zy.prototype.J;
    zy.prototype.getFeatureById = zy.prototype.Na;
    zy.prototype.removeFeature = zy.prototype.fb;
    zy.prototype.getAttributions = zy.prototype.Y;
    zy.prototype.getLogo = zy.prototype.X;
    zy.prototype.getProjection = zy.prototype.Z;
    zy.prototype.getState = zy.prototype.$;
    zy.prototype.bindTo = zy.prototype.K;
    zy.prototype.get = zy.prototype.get;
    zy.prototype.getKeys = zy.prototype.G;
    zy.prototype.getProperties = zy.prototype.I;
    zy.prototype.set = zy.prototype.set;
    zy.prototype.setProperties = zy.prototype.C;
    zy.prototype.unbind = zy.prototype.L;
    zy.prototype.unbindAll = zy.prototype.M;
    zy.prototype.changed = zy.prototype.l;
    zy.prototype.getRevision = zy.prototype.u;
    zy.prototype.on = zy.prototype.s;
    zy.prototype.once = zy.prototype.v;
    zy.prototype.un = zy.prototype.t;
    zy.prototype.unByKey = zy.prototype.A;
    Ay.prototype.readFeatures = Ay.prototype.a;
    Ay.prototype.addFeature = Ay.prototype.Va;
    Ay.prototype.addFeatures = Ay.prototype.Ga;
    Ay.prototype.clear = Ay.prototype.clear;
    Ay.prototype.forEachFeature = Ay.prototype.$a;
    Ay.prototype.forEachFeatureInExtent = Ay.prototype.wa;
    Ay.prototype.forEachFeatureIntersectingExtent = Ay.prototype.Ma;
    Ay.prototype.getFeatures = Ay.prototype.Aa;
    Ay.prototype.getFeaturesAtCoordinate = Ay.prototype.Oa;
    Ay.prototype.getClosestFeatureToCoordinate = Ay.prototype.ab;
    Ay.prototype.getExtent = Ay.prototype.J;
    Ay.prototype.getFeatureById = Ay.prototype.Na;
    Ay.prototype.removeFeature = Ay.prototype.fb;
    Ay.prototype.getAttributions = Ay.prototype.Y;
    Ay.prototype.getLogo = Ay.prototype.X;
    Ay.prototype.getProjection = Ay.prototype.Z;
    Ay.prototype.getState = Ay.prototype.$;
    Ay.prototype.bindTo = Ay.prototype.K;
    Ay.prototype.get = Ay.prototype.get;
    Ay.prototype.getKeys = Ay.prototype.G;
    Ay.prototype.getProperties = Ay.prototype.I;
    Ay.prototype.set = Ay.prototype.set;
    Ay.prototype.setProperties = Ay.prototype.C;
    Ay.prototype.unbind = Ay.prototype.L;
    Ay.prototype.unbindAll = Ay.prototype.M;
    Ay.prototype.changed = Ay.prototype.l;
    Ay.prototype.getRevision = Ay.prototype.u;
    Ay.prototype.on = Ay.prototype.s;
    Ay.prototype.once = Ay.prototype.v;
    Ay.prototype.un = Ay.prototype.t;
    Ay.prototype.unByKey = Ay.prototype.A;
    By.prototype.readFeatures = By.prototype.a;
    By.prototype.addFeature = By.prototype.Va;
    By.prototype.addFeatures = By.prototype.Ga;
    By.prototype.clear = By.prototype.clear;
    By.prototype.forEachFeature = By.prototype.$a;
    By.prototype.forEachFeatureInExtent = By.prototype.wa;
    By.prototype.forEachFeatureIntersectingExtent = By.prototype.Ma;
    By.prototype.getFeatures = By.prototype.Aa;
    By.prototype.getFeaturesAtCoordinate = By.prototype.Oa;
    By.prototype.getClosestFeatureToCoordinate = By.prototype.ab;
    By.prototype.getExtent = By.prototype.J;
    By.prototype.getFeatureById = By.prototype.Na;
    By.prototype.removeFeature = By.prototype.fb;
    By.prototype.getAttributions = By.prototype.Y;
    By.prototype.getLogo = By.prototype.X;
    By.prototype.getProjection = By.prototype.Z;
    By.prototype.getState = By.prototype.$;
    By.prototype.bindTo = By.prototype.K;
    By.prototype.get = By.prototype.get;
    By.prototype.getKeys = By.prototype.G;
    By.prototype.getProperties = By.prototype.I;
    By.prototype.set = By.prototype.set;
    By.prototype.setProperties = By.prototype.C;
    By.prototype.unbind = By.prototype.L;
    By.prototype.unbindAll = By.prototype.M;
    By.prototype.changed = By.prototype.l;
    By.prototype.getRevision = By.prototype.u;
    By.prototype.on = By.prototype.s;
    By.prototype.once = By.prototype.v;
    By.prototype.un = By.prototype.t;
    By.prototype.unByKey = By.prototype.A;
    $m.prototype.getAttributions = $m.prototype.Y;
    $m.prototype.getLogo = $m.prototype.X;
    $m.prototype.getProjection = $m.prototype.Z;
    $m.prototype.getState = $m.prototype.$;
    $m.prototype.bindTo = $m.prototype.K;
    $m.prototype.get = $m.prototype.get;
    $m.prototype.getKeys = $m.prototype.G;
    $m.prototype.getProperties = $m.prototype.I;
    $m.prototype.set = $m.prototype.set;
    $m.prototype.setProperties = $m.prototype.C;
    $m.prototype.unbind = $m.prototype.L;
    $m.prototype.unbindAll = $m.prototype.M;
    $m.prototype.changed = $m.prototype.l;
    $m.prototype.getRevision = $m.prototype.u;
    $m.prototype.on = $m.prototype.s;
    $m.prototype.once = $m.prototype.v;
    $m.prototype.un = $m.prototype.t;
    $m.prototype.unByKey = $m.prototype.A;
    gn.prototype.getAttributions = gn.prototype.Y;
    gn.prototype.getLogo = gn.prototype.X;
    gn.prototype.getProjection = gn.prototype.Z;
    gn.prototype.getState = gn.prototype.$;
    gn.prototype.bindTo = gn.prototype.K;
    gn.prototype.get = gn.prototype.get;
    gn.prototype.getKeys = gn.prototype.G;
    gn.prototype.getProperties = gn.prototype.I;
    gn.prototype.set = gn.prototype.set;
    gn.prototype.setProperties = gn.prototype.C;
    gn.prototype.unbind = gn.prototype.L;
    gn.prototype.unbindAll = gn.prototype.M;
    gn.prototype.changed = gn.prototype.l;
    gn.prototype.getRevision = gn.prototype.u;
    gn.prototype.on = gn.prototype.s;
    gn.prototype.once = gn.prototype.v;
    gn.prototype.un = gn.prototype.t;
    gn.prototype.unByKey = gn.prototype.A;
    Cy.prototype.getAttributions = Cy.prototype.Y;
    Cy.prototype.getLogo = Cy.prototype.X;
    Cy.prototype.getProjection = Cy.prototype.Z;
    Cy.prototype.getState = Cy.prototype.$;
    Cy.prototype.bindTo = Cy.prototype.K;
    Cy.prototype.get = Cy.prototype.get;
    Cy.prototype.getKeys = Cy.prototype.G;
    Cy.prototype.getProperties = Cy.prototype.I;
    Cy.prototype.set = Cy.prototype.set;
    Cy.prototype.setProperties = Cy.prototype.C;
    Cy.prototype.unbind = Cy.prototype.L;
    Cy.prototype.unbindAll = Cy.prototype.M;
    Cy.prototype.changed = Cy.prototype.l;
    Cy.prototype.getRevision = Cy.prototype.u;
    Cy.prototype.on = Cy.prototype.s;
    Cy.prototype.once = Cy.prototype.v;
    Cy.prototype.un = Cy.prototype.t;
    Cy.prototype.unByKey = Cy.prototype.A;
    Dy.prototype.getAttributions = Dy.prototype.Y;
    Dy.prototype.getLogo = Dy.prototype.X;
    Dy.prototype.getProjection = Dy.prototype.Z;
    Dy.prototype.getState = Dy.prototype.$;
    Dy.prototype.bindTo = Dy.prototype.K;
    Dy.prototype.get = Dy.prototype.get;
    Dy.prototype.getKeys = Dy.prototype.G;
    Dy.prototype.getProperties = Dy.prototype.I;
    Dy.prototype.set = Dy.prototype.set;
    Dy.prototype.setProperties = Dy.prototype.C;
    Dy.prototype.unbind = Dy.prototype.L;
    Dy.prototype.unbindAll = Dy.prototype.M;
    Dy.prototype.changed = Dy.prototype.l;
    Dy.prototype.getRevision = Dy.prototype.u;
    Dy.prototype.on = Dy.prototype.s;
    Dy.prototype.once = Dy.prototype.v;
    Dy.prototype.un = Dy.prototype.t;
    Dy.prototype.unByKey = Dy.prototype.A;
    un.prototype.getAttributions = un.prototype.Y;
    un.prototype.getLogo = un.prototype.X;
    un.prototype.getProjection = un.prototype.Z;
    un.prototype.getState = un.prototype.$;
    un.prototype.bindTo = un.prototype.K;
    un.prototype.get = un.prototype.get;
    un.prototype.getKeys = un.prototype.G;
    un.prototype.getProperties = un.prototype.I;
    un.prototype.set = un.prototype.set;
    un.prototype.setProperties = un.prototype.C;
    un.prototype.unbind = un.prototype.L;
    un.prototype.unbindAll = un.prototype.M;
    un.prototype.changed = un.prototype.l;
    un.prototype.getRevision = un.prototype.u;
    un.prototype.on = un.prototype.s;
    un.prototype.once = un.prototype.v;
    un.prototype.un = un.prototype.t;
    un.prototype.unByKey = un.prototype.A;
    Ey.prototype.getAttributions = Ey.prototype.Y;
    Ey.prototype.getLogo = Ey.prototype.X;
    Ey.prototype.getProjection = Ey.prototype.Z;
    Ey.prototype.getState = Ey.prototype.$;
    Ey.prototype.bindTo = Ey.prototype.K;
    Ey.prototype.get = Ey.prototype.get;
    Ey.prototype.getKeys = Ey.prototype.G;
    Ey.prototype.getProperties = Ey.prototype.I;
    Ey.prototype.set = Ey.prototype.set;
    Ey.prototype.setProperties = Ey.prototype.C;
    Ey.prototype.unbind = Ey.prototype.L;
    Ey.prototype.unbindAll = Ey.prototype.M;
    Ey.prototype.changed = Ey.prototype.l;
    Ey.prototype.getRevision = Ey.prototype.u;
    Ey.prototype.on = Ey.prototype.s;
    Ey.prototype.once = Ey.prototype.v;
    Ey.prototype.un = Ey.prototype.t;
    Ey.prototype.unByKey = Ey.prototype.A;
    Iy.prototype.readFeatures = Iy.prototype.a;
    Iy.prototype.addFeature = Iy.prototype.Va;
    Iy.prototype.addFeatures = Iy.prototype.Ga;
    Iy.prototype.clear = Iy.prototype.clear;
    Iy.prototype.forEachFeature = Iy.prototype.$a;
    Iy.prototype.forEachFeatureInExtent = Iy.prototype.wa;
    Iy.prototype.forEachFeatureIntersectingExtent = Iy.prototype.Ma;
    Iy.prototype.getFeatures = Iy.prototype.Aa;
    Iy.prototype.getFeaturesAtCoordinate = Iy.prototype.Oa;
    Iy.prototype.getClosestFeatureToCoordinate = Iy.prototype.ab;
    Iy.prototype.getExtent = Iy.prototype.J;
    Iy.prototype.getFeatureById = Iy.prototype.Na;
    Iy.prototype.removeFeature = Iy.prototype.fb;
    Iy.prototype.getAttributions = Iy.prototype.Y;
    Iy.prototype.getLogo = Iy.prototype.X;
    Iy.prototype.getProjection = Iy.prototype.Z;
    Iy.prototype.getState = Iy.prototype.$;
    Iy.prototype.bindTo = Iy.prototype.K;
    Iy.prototype.get = Iy.prototype.get;
    Iy.prototype.getKeys = Iy.prototype.G;
    Iy.prototype.getProperties = Iy.prototype.I;
    Iy.prototype.set = Iy.prototype.set;
    Iy.prototype.setProperties = Iy.prototype.C;
    Iy.prototype.unbind = Iy.prototype.L;
    Iy.prototype.unbindAll = Iy.prototype.M;
    Iy.prototype.changed = Iy.prototype.l;
    Iy.prototype.getRevision = Iy.prototype.u;
    Iy.prototype.on = Iy.prototype.s;
    Iy.prototype.once = Iy.prototype.v;
    Iy.prototype.un = Iy.prototype.t;
    Iy.prototype.unByKey = Iy.prototype.A;
    Jy.prototype.getTileLoadFunction = Jy.prototype.bb;
    Jy.prototype.getTileUrlFunction = Jy.prototype.cb;
    Jy.prototype.setTileLoadFunction = Jy.prototype.jb;
    Jy.prototype.getTileGrid = Jy.prototype.xa;
    Jy.prototype.getAttributions = Jy.prototype.Y;
    Jy.prototype.getLogo = Jy.prototype.X;
    Jy.prototype.getProjection = Jy.prototype.Z;
    Jy.prototype.getState = Jy.prototype.$;
    Jy.prototype.bindTo = Jy.prototype.K;
    Jy.prototype.get = Jy.prototype.get;
    Jy.prototype.getKeys = Jy.prototype.G;
    Jy.prototype.getProperties = Jy.prototype.I;
    Jy.prototype.set = Jy.prototype.set;
    Jy.prototype.setProperties = Jy.prototype.C;
    Jy.prototype.unbind = Jy.prototype.L;
    Jy.prototype.unbindAll = Jy.prototype.M;
    Jy.prototype.changed = Jy.prototype.l;
    Jy.prototype.getRevision = Jy.prototype.u;
    Jy.prototype.on = Jy.prototype.s;
    Jy.prototype.once = Jy.prototype.v;
    Jy.prototype.un = Jy.prototype.t;
    Jy.prototype.unByKey = Jy.prototype.A;
    My.prototype.setTileUrlFunction = My.prototype.ta;
    My.prototype.setUrl = My.prototype.b;
    My.prototype.getTileLoadFunction = My.prototype.bb;
    My.prototype.getTileUrlFunction = My.prototype.cb;
    My.prototype.setTileLoadFunction = My.prototype.jb;
    My.prototype.getTileGrid = My.prototype.xa;
    My.prototype.getAttributions = My.prototype.Y;
    My.prototype.getLogo = My.prototype.X;
    My.prototype.getProjection = My.prototype.Z;
    My.prototype.getState = My.prototype.$;
    My.prototype.bindTo = My.prototype.K;
    My.prototype.get = My.prototype.get;
    My.prototype.getKeys = My.prototype.G;
    My.prototype.getProperties = My.prototype.I;
    My.prototype.set = My.prototype.set;
    My.prototype.setProperties = My.prototype.C;
    My.prototype.unbind = My.prototype.L;
    My.prototype.unbindAll = My.prototype.M;
    My.prototype.changed = My.prototype.l;
    My.prototype.getRevision = My.prototype.u;
    My.prototype.on = My.prototype.s;
    My.prototype.once = My.prototype.v;
    My.prototype.un = My.prototype.t;
    My.prototype.unByKey = My.prototype.A;
    Ky.prototype.setTileUrlFunction = Ky.prototype.ta;
    Ky.prototype.setUrl = Ky.prototype.b;
    Ky.prototype.getTileLoadFunction = Ky.prototype.bb;
    Ky.prototype.getTileUrlFunction = Ky.prototype.cb;
    Ky.prototype.setTileLoadFunction = Ky.prototype.jb;
    Ky.prototype.getTileGrid = Ky.prototype.xa;
    Ky.prototype.getAttributions = Ky.prototype.Y;
    Ky.prototype.getLogo = Ky.prototype.X;
    Ky.prototype.getProjection = Ky.prototype.Z;
    Ky.prototype.getState = Ky.prototype.$;
    Ky.prototype.bindTo = Ky.prototype.K;
    Ky.prototype.get = Ky.prototype.get;
    Ky.prototype.getKeys = Ky.prototype.G;
    Ky.prototype.getProperties = Ky.prototype.I;
    Ky.prototype.set = Ky.prototype.set;
    Ky.prototype.setProperties = Ky.prototype.C;
    Ky.prototype.unbind = Ky.prototype.L;
    Ky.prototype.unbindAll = Ky.prototype.M;
    Ky.prototype.changed = Ky.prototype.l;
    Ky.prototype.getRevision = Ky.prototype.u;
    Ky.prototype.on = Ky.prototype.s;
    Ky.prototype.once = Ky.prototype.v;
    Ky.prototype.un = Ky.prototype.t;
    Ky.prototype.unByKey = Ky.prototype.A;
    Py.prototype.readFeatures = Py.prototype.a;
    Py.prototype.addFeature = Py.prototype.Va;
    Py.prototype.addFeatures = Py.prototype.Ga;
    Py.prototype.clear = Py.prototype.clear;
    Py.prototype.forEachFeature = Py.prototype.$a;
    Py.prototype.forEachFeatureInExtent = Py.prototype.wa;
    Py.prototype.forEachFeatureIntersectingExtent = Py.prototype.Ma;
    Py.prototype.getFeatures = Py.prototype.Aa;
    Py.prototype.getFeaturesAtCoordinate = Py.prototype.Oa;
    Py.prototype.getClosestFeatureToCoordinate = Py.prototype.ab;
    Py.prototype.getExtent = Py.prototype.J;
    Py.prototype.getFeatureById = Py.prototype.Na;
    Py.prototype.removeFeature = Py.prototype.fb;
    Py.prototype.getAttributions = Py.prototype.Y;
    Py.prototype.getLogo = Py.prototype.X;
    Py.prototype.getProjection = Py.prototype.Z;
    Py.prototype.getState = Py.prototype.$;
    Py.prototype.bindTo = Py.prototype.K;
    Py.prototype.get = Py.prototype.get;
    Py.prototype.getKeys = Py.prototype.G;
    Py.prototype.getProperties = Py.prototype.I;
    Py.prototype.set = Py.prototype.set;
    Py.prototype.setProperties = Py.prototype.C;
    Py.prototype.unbind = Py.prototype.L;
    Py.prototype.unbindAll = Py.prototype.M;
    Py.prototype.changed = Py.prototype.l;
    Py.prototype.getRevision = Py.prototype.u;
    Py.prototype.on = Py.prototype.s;
    Py.prototype.once = Py.prototype.v;
    Py.prototype.un = Py.prototype.t;
    Py.prototype.unByKey = Py.prototype.A;
    Qy.prototype.addFeature = Qy.prototype.Va;
    Qy.prototype.addFeatures = Qy.prototype.Ga;
    Qy.prototype.forEachFeature = Qy.prototype.$a;
    Qy.prototype.forEachFeatureInExtent = Qy.prototype.wa;
    Qy.prototype.forEachFeatureIntersectingExtent = Qy.prototype.Ma;
    Qy.prototype.getFeatures = Qy.prototype.Aa;
    Qy.prototype.getFeaturesAtCoordinate = Qy.prototype.Oa;
    Qy.prototype.getClosestFeatureToCoordinate = Qy.prototype.ab;
    Qy.prototype.getExtent = Qy.prototype.J;
    Qy.prototype.getFeatureById = Qy.prototype.Na;
    Qy.prototype.removeFeature = Qy.prototype.fb;
    Qy.prototype.getAttributions = Qy.prototype.Y;
    Qy.prototype.getLogo = Qy.prototype.X;
    Qy.prototype.getProjection = Qy.prototype.Z;
    Qy.prototype.getState = Qy.prototype.$;
    Qy.prototype.bindTo = Qy.prototype.K;
    Qy.prototype.get = Qy.prototype.get;
    Qy.prototype.getKeys = Qy.prototype.G;
    Qy.prototype.getProperties = Qy.prototype.I;
    Qy.prototype.set = Qy.prototype.set;
    Qy.prototype.setProperties = Qy.prototype.C;
    Qy.prototype.unbind = Qy.prototype.L;
    Qy.prototype.unbindAll = Qy.prototype.M;
    Qy.prototype.changed = Qy.prototype.l;
    Qy.prototype.getRevision = Qy.prototype.u;
    Qy.prototype.on = Qy.prototype.s;
    Qy.prototype.once = Qy.prototype.v;
    Qy.prototype.un = Qy.prototype.t;
    Qy.prototype.unByKey = Qy.prototype.A;
    Ty.prototype.setTileUrlFunction = Ty.prototype.ta;
    Ty.prototype.setUrl = Ty.prototype.b;
    Ty.prototype.getTileLoadFunction = Ty.prototype.bb;
    Ty.prototype.getTileUrlFunction = Ty.prototype.cb;
    Ty.prototype.setTileLoadFunction = Ty.prototype.jb;
    Ty.prototype.getTileGrid = Ty.prototype.xa;
    Ty.prototype.getAttributions = Ty.prototype.Y;
    Ty.prototype.getLogo = Ty.prototype.X;
    Ty.prototype.getProjection = Ty.prototype.Z;
    Ty.prototype.getState = Ty.prototype.$;
    Ty.prototype.bindTo = Ty.prototype.K;
    Ty.prototype.get = Ty.prototype.get;
    Ty.prototype.getKeys = Ty.prototype.G;
    Ty.prototype.getProperties = Ty.prototype.I;
    Ty.prototype.set = Ty.prototype.set;
    Ty.prototype.setProperties = Ty.prototype.C;
    Ty.prototype.unbind = Ty.prototype.L;
    Ty.prototype.unbindAll = Ty.prototype.M;
    Ty.prototype.changed = Ty.prototype.l;
    Ty.prototype.getRevision = Ty.prototype.u;
    Ty.prototype.on = Ty.prototype.s;
    Ty.prototype.once = Ty.prototype.v;
    Ty.prototype.un = Ty.prototype.t;
    Ty.prototype.unByKey = Ty.prototype.A;
    Vy.prototype.getTileLoadFunction = Vy.prototype.bb;
    Vy.prototype.getTileUrlFunction = Vy.prototype.cb;
    Vy.prototype.setTileLoadFunction = Vy.prototype.jb;
    Vy.prototype.setTileUrlFunction = Vy.prototype.ta;
    Vy.prototype.getTileGrid = Vy.prototype.xa;
    Vy.prototype.getAttributions = Vy.prototype.Y;
    Vy.prototype.getLogo = Vy.prototype.X;
    Vy.prototype.getProjection = Vy.prototype.Z;
    Vy.prototype.getState = Vy.prototype.$;
    Vy.prototype.bindTo = Vy.prototype.K;
    Vy.prototype.get = Vy.prototype.get;
    Vy.prototype.getKeys = Vy.prototype.G;
    Vy.prototype.getProperties = Vy.prototype.I;
    Vy.prototype.set = Vy.prototype.set;
    Vy.prototype.setProperties = Vy.prototype.C;
    Vy.prototype.unbind = Vy.prototype.L;
    Vy.prototype.unbindAll = Vy.prototype.M;
    Vy.prototype.changed = Vy.prototype.l;
    Vy.prototype.getRevision = Vy.prototype.u;
    Vy.prototype.on = Vy.prototype.s;
    Vy.prototype.once = Vy.prototype.v;
    Vy.prototype.un = Vy.prototype.t;
    Vy.prototype.unByKey = Vy.prototype.A;
    Xy.prototype.getTileGrid = Xy.prototype.xa;
    Xy.prototype.getAttributions = Xy.prototype.Y;
    Xy.prototype.getLogo = Xy.prototype.X;
    Xy.prototype.getProjection = Xy.prototype.Z;
    Xy.prototype.getState = Xy.prototype.$;
    Xy.prototype.bindTo = Xy.prototype.K;
    Xy.prototype.get = Xy.prototype.get;
    Xy.prototype.getKeys = Xy.prototype.G;
    Xy.prototype.getProperties = Xy.prototype.I;
    Xy.prototype.set = Xy.prototype.set;
    Xy.prototype.setProperties = Xy.prototype.C;
    Xy.prototype.unbind = Xy.prototype.L;
    Xy.prototype.unbindAll = Xy.prototype.M;
    Xy.prototype.changed = Xy.prototype.l;
    Xy.prototype.getRevision = Xy.prototype.u;
    Xy.prototype.on = Xy.prototype.s;
    Xy.prototype.once = Xy.prototype.v;
    Xy.prototype.un = Xy.prototype.t;
    Xy.prototype.unByKey = Xy.prototype.A;
    Yy.prototype.getTileLoadFunction = Yy.prototype.bb;
    Yy.prototype.getTileUrlFunction = Yy.prototype.cb;
    Yy.prototype.setTileLoadFunction = Yy.prototype.jb;
    Yy.prototype.setTileUrlFunction = Yy.prototype.ta;
    Yy.prototype.getTileGrid = Yy.prototype.xa;
    Yy.prototype.getAttributions = Yy.prototype.Y;
    Yy.prototype.getLogo = Yy.prototype.X;
    Yy.prototype.getProjection = Yy.prototype.Z;
    Yy.prototype.getState = Yy.prototype.$;
    Yy.prototype.bindTo = Yy.prototype.K;
    Yy.prototype.get = Yy.prototype.get;
    Yy.prototype.getKeys = Yy.prototype.G;
    Yy.prototype.getProperties = Yy.prototype.I;
    Yy.prototype.set = Yy.prototype.set;
    Yy.prototype.setProperties = Yy.prototype.C;
    Yy.prototype.unbind = Yy.prototype.L;
    Yy.prototype.unbindAll = Yy.prototype.M;
    Yy.prototype.changed = Yy.prototype.l;
    Yy.prototype.getRevision = Yy.prototype.u;
    Yy.prototype.on = Yy.prototype.s;
    Yy.prototype.once = Yy.prototype.v;
    Yy.prototype.un = Yy.prototype.t;
    Yy.prototype.unByKey = Yy.prototype.A;
    Zy.prototype.getTileGrid = Zy.prototype.xa;
    Zy.prototype.getAttributions = Zy.prototype.Y;
    Zy.prototype.getLogo = Zy.prototype.X;
    Zy.prototype.getProjection = Zy.prototype.Z;
    Zy.prototype.getState = Zy.prototype.$;
    Zy.prototype.bindTo = Zy.prototype.K;
    Zy.prototype.get = Zy.prototype.get;
    Zy.prototype.getKeys = Zy.prototype.G;
    Zy.prototype.getProperties = Zy.prototype.I;
    Zy.prototype.set = Zy.prototype.set;
    Zy.prototype.setProperties = Zy.prototype.C;
    Zy.prototype.unbind = Zy.prototype.L;
    Zy.prototype.unbindAll = Zy.prototype.M;
    Zy.prototype.changed = Zy.prototype.l;
    Zy.prototype.getRevision = Zy.prototype.u;
    Zy.prototype.on = Zy.prototype.s;
    Zy.prototype.once = Zy.prototype.v;
    Zy.prototype.un = Zy.prototype.t;
    Zy.prototype.unByKey = Zy.prototype.A;
    dz.prototype.readFeatures = dz.prototype.a;
    dz.prototype.forEachFeatureIntersectingExtent = dz.prototype.Ma;
    dz.prototype.getFeaturesAtCoordinate = dz.prototype.Oa;
    dz.prototype.getFeatureById = dz.prototype.Na;
    dz.prototype.getAttributions = dz.prototype.Y;
    dz.prototype.getLogo = dz.prototype.X;
    dz.prototype.getProjection = dz.prototype.Z;
    dz.prototype.getState = dz.prototype.$;
    dz.prototype.bindTo = dz.prototype.K;
    dz.prototype.get = dz.prototype.get;
    dz.prototype.getKeys = dz.prototype.G;
    dz.prototype.getProperties = dz.prototype.I;
    dz.prototype.set = dz.prototype.set;
    dz.prototype.setProperties = dz.prototype.C;
    dz.prototype.unbind = dz.prototype.L;
    dz.prototype.unbindAll = dz.prototype.M;
    dz.prototype.changed = dz.prototype.l;
    dz.prototype.getRevision = dz.prototype.u;
    dz.prototype.on = dz.prototype.s;
    dz.prototype.once = dz.prototype.v;
    dz.prototype.un = dz.prototype.t;
    dz.prototype.unByKey = dz.prototype.A;
    fz.prototype.getTileLoadFunction = fz.prototype.bb;
    fz.prototype.getTileUrlFunction = fz.prototype.cb;
    fz.prototype.setTileLoadFunction = fz.prototype.jb;
    fz.prototype.setTileUrlFunction = fz.prototype.ta;
    fz.prototype.getTileGrid = fz.prototype.xa;
    fz.prototype.getAttributions = fz.prototype.Y;
    fz.prototype.getLogo = fz.prototype.X;
    fz.prototype.getProjection = fz.prototype.Z;
    fz.prototype.getState = fz.prototype.$;
    fz.prototype.bindTo = fz.prototype.K;
    fz.prototype.get = fz.prototype.get;
    fz.prototype.getKeys = fz.prototype.G;
    fz.prototype.getProperties = fz.prototype.I;
    fz.prototype.set = fz.prototype.set;
    fz.prototype.setProperties = fz.prototype.C;
    fz.prototype.unbind = fz.prototype.L;
    fz.prototype.unbindAll = fz.prototype.M;
    fz.prototype.changed = fz.prototype.l;
    fz.prototype.getRevision = fz.prototype.u;
    fz.prototype.on = fz.prototype.s;
    fz.prototype.once = fz.prototype.v;
    fz.prototype.un = fz.prototype.t;
    fz.prototype.unByKey = fz.prototype.A;
    jz.prototype.readFeatures = jz.prototype.a;
    jz.prototype.addFeature = jz.prototype.Va;
    jz.prototype.addFeatures = jz.prototype.Ga;
    jz.prototype.clear = jz.prototype.clear;
    jz.prototype.forEachFeature = jz.prototype.$a;
    jz.prototype.forEachFeatureInExtent = jz.prototype.wa;
    jz.prototype.forEachFeatureIntersectingExtent = jz.prototype.Ma;
    jz.prototype.getFeatures = jz.prototype.Aa;
    jz.prototype.getFeaturesAtCoordinate = jz.prototype.Oa;
    jz.prototype.getClosestFeatureToCoordinate = jz.prototype.ab;
    jz.prototype.getExtent = jz.prototype.J;
    jz.prototype.getFeatureById = jz.prototype.Na;
    jz.prototype.removeFeature = jz.prototype.fb;
    jz.prototype.getAttributions = jz.prototype.Y;
    jz.prototype.getLogo = jz.prototype.X;
    jz.prototype.getProjection = jz.prototype.Z;
    jz.prototype.getState = jz.prototype.$;
    jz.prototype.bindTo = jz.prototype.K;
    jz.prototype.get = jz.prototype.get;
    jz.prototype.getKeys = jz.prototype.G;
    jz.prototype.getProperties = jz.prototype.I;
    jz.prototype.set = jz.prototype.set;
    jz.prototype.setProperties = jz.prototype.C;
    jz.prototype.unbind = jz.prototype.L;
    jz.prototype.unbindAll = jz.prototype.M;
    jz.prototype.changed = jz.prototype.l;
    jz.prototype.getRevision = jz.prototype.u;
    jz.prototype.on = jz.prototype.s;
    jz.prototype.once = jz.prototype.v;
    jz.prototype.un = jz.prototype.t;
    jz.prototype.unByKey = jz.prototype.A;
    mz.prototype.getTileLoadFunction = mz.prototype.bb;
    mz.prototype.getTileUrlFunction = mz.prototype.cb;
    mz.prototype.setTileLoadFunction = mz.prototype.jb;
    mz.prototype.setTileUrlFunction = mz.prototype.ta;
    mz.prototype.getTileGrid = mz.prototype.xa;
    mz.prototype.getAttributions = mz.prototype.Y;
    mz.prototype.getLogo = mz.prototype.X;
    mz.prototype.getProjection = mz.prototype.Z;
    mz.prototype.getState = mz.prototype.$;
    mz.prototype.bindTo = mz.prototype.K;
    mz.prototype.get = mz.prototype.get;
    mz.prototype.getKeys = mz.prototype.G;
    mz.prototype.getProperties = mz.prototype.I;
    mz.prototype.set = mz.prototype.set;
    mz.prototype.setProperties = mz.prototype.C;
    mz.prototype.unbind = mz.prototype.L;
    mz.prototype.unbindAll = mz.prototype.M;
    mz.prototype.changed = mz.prototype.l;
    mz.prototype.getRevision = mz.prototype.u;
    mz.prototype.on = mz.prototype.s;
    mz.prototype.once = mz.prototype.v;
    mz.prototype.un = mz.prototype.t;
    mz.prototype.unByKey = mz.prototype.A;
    pz.prototype.getTileLoadFunction = pz.prototype.bb;
    pz.prototype.getTileUrlFunction = pz.prototype.cb;
    pz.prototype.setTileLoadFunction = pz.prototype.jb;
    pz.prototype.setTileUrlFunction = pz.prototype.ta;
    pz.prototype.getTileGrid = pz.prototype.xa;
    pz.prototype.getAttributions = pz.prototype.Y;
    pz.prototype.getLogo = pz.prototype.X;
    pz.prototype.getProjection = pz.prototype.Z;
    pz.prototype.getState = pz.prototype.$;
    pz.prototype.bindTo = pz.prototype.K;
    pz.prototype.get = pz.prototype.get;
    pz.prototype.getKeys = pz.prototype.G;
    pz.prototype.getProperties = pz.prototype.I;
    pz.prototype.set = pz.prototype.set;
    pz.prototype.setProperties = pz.prototype.C;
    pz.prototype.unbind = pz.prototype.L;
    pz.prototype.unbindAll = pz.prototype.M;
    pz.prototype.changed = pz.prototype.l;
    pz.prototype.getRevision = pz.prototype.u;
    pz.prototype.on = pz.prototype.s;
    pz.prototype.once = pz.prototype.v;
    pz.prototype.un = pz.prototype.t;
    pz.prototype.unByKey = pz.prototype.A;
    jj.prototype.changed = jj.prototype.l;
    jj.prototype.getRevision = jj.prototype.u;
    jj.prototype.on = jj.prototype.s;
    jj.prototype.once = jj.prototype.v;
    jj.prototype.un = jj.prototype.t;
    jj.prototype.unByKey = jj.prototype.A;
    vo.prototype.changed = vo.prototype.l;
    vo.prototype.getRevision = vo.prototype.u;
    vo.prototype.on = vo.prototype.s;
    vo.prototype.once = vo.prototype.v;
    vo.prototype.un = vo.prototype.t;
    vo.prototype.unByKey = vo.prototype.A;
    yo.prototype.changed = yo.prototype.l;
    yo.prototype.getRevision = yo.prototype.u;
    yo.prototype.on = yo.prototype.s;
    yo.prototype.once = yo.prototype.v;
    yo.prototype.un = yo.prototype.t;
    yo.prototype.unByKey = yo.prototype.A;
    Eo.prototype.changed = Eo.prototype.l;
    Eo.prototype.getRevision = Eo.prototype.u;
    Eo.prototype.on = Eo.prototype.s;
    Eo.prototype.once = Eo.prototype.v;
    Eo.prototype.un = Eo.prototype.t;
    Eo.prototype.unByKey = Eo.prototype.A;
    Go.prototype.changed = Go.prototype.l;
    Go.prototype.getRevision = Go.prototype.u;
    Go.prototype.on = Go.prototype.s;
    Go.prototype.once = Go.prototype.v;
    Go.prototype.un = Go.prototype.t;
    Go.prototype.unByKey = Go.prototype.A;
    Bn.prototype.changed = Bn.prototype.l;
    Bn.prototype.getRevision = Bn.prototype.u;
    Bn.prototype.on = Bn.prototype.s;
    Bn.prototype.once = Bn.prototype.v;
    Bn.prototype.un = Bn.prototype.t;
    Bn.prototype.unByKey = Bn.prototype.A;
    Cn.prototype.changed = Cn.prototype.l;
    Cn.prototype.getRevision = Cn.prototype.u;
    Cn.prototype.on = Cn.prototype.s;
    Cn.prototype.once = Cn.prototype.v;
    Cn.prototype.un = Cn.prototype.t;
    Cn.prototype.unByKey = Cn.prototype.A;
    Dn.prototype.changed = Dn.prototype.l;
    Dn.prototype.getRevision = Dn.prototype.u;
    Dn.prototype.on = Dn.prototype.s;
    Dn.prototype.once = Dn.prototype.v;
    Dn.prototype.un = Dn.prototype.t;
    Dn.prototype.unByKey = Dn.prototype.A;
    Fn.prototype.changed = Fn.prototype.l;
    Fn.prototype.getRevision = Fn.prototype.u;
    Fn.prototype.on = Fn.prototype.s;
    Fn.prototype.once = Fn.prototype.v;
    Fn.prototype.un = Fn.prototype.t;
    Fn.prototype.unByKey = Fn.prototype.A;
    zm.prototype.changed = zm.prototype.l;
    zm.prototype.getRevision = zm.prototype.u;
    zm.prototype.on = zm.prototype.s;
    zm.prototype.once = zm.prototype.v;
    zm.prototype.un = zm.prototype.t;
    zm.prototype.unByKey = zm.prototype.A;
    wn.prototype.changed = wn.prototype.l;
    wn.prototype.getRevision = wn.prototype.u;
    wn.prototype.on = wn.prototype.s;
    wn.prototype.once = wn.prototype.v;
    wn.prototype.un = wn.prototype.t;
    wn.prototype.unByKey = wn.prototype.A;
    xn.prototype.changed = xn.prototype.l;
    xn.prototype.getRevision = xn.prototype.u;
    xn.prototype.on = xn.prototype.s;
    xn.prototype.once = xn.prototype.v;
    xn.prototype.un = xn.prototype.t;
    xn.prototype.unByKey = xn.prototype.A;
    yn.prototype.changed = yn.prototype.l;
    yn.prototype.getRevision = yn.prototype.u;
    yn.prototype.on = yn.prototype.s;
    yn.prototype.once = yn.prototype.v;
    yn.prototype.un = yn.prototype.t;
    yn.prototype.unByKey = yn.prototype.A;
    C.prototype.bindTo = C.prototype.K;
    C.prototype.get = C.prototype.get;
    C.prototype.getKeys = C.prototype.G;
    C.prototype.getProperties = C.prototype.I;
    C.prototype.set = C.prototype.set;
    C.prototype.setProperties = C.prototype.C;
    C.prototype.unbind = C.prototype.L;
    C.prototype.unbindAll = C.prototype.M;
    C.prototype.changed = C.prototype.l;
    C.prototype.getRevision = C.prototype.u;
    C.prototype.on = C.prototype.s;
    C.prototype.once = C.prototype.v;
    C.prototype.un = C.prototype.t;
    C.prototype.unByKey = C.prototype.A;
    E.prototype.getBrightness = E.prototype.c;
    E.prototype.getContrast = E.prototype.f;
    E.prototype.getHue = E.prototype.e;
    E.prototype.getExtent = E.prototype.J;
    E.prototype.getMaxResolution = E.prototype.g;
    E.prototype.getMinResolution = E.prototype.i;
    E.prototype.getOpacity = E.prototype.q;
    E.prototype.getSaturation = E.prototype.k;
    E.prototype.getVisible = E.prototype.b;
    E.prototype.setBrightness = E.prototype.D;
    E.prototype.setContrast = E.prototype.H;
    E.prototype.setHue = E.prototype.N;
    E.prototype.setExtent = E.prototype.o;
    E.prototype.setMaxResolution = E.prototype.S;
    E.prototype.setMinResolution = E.prototype.U;
    E.prototype.setOpacity = E.prototype.p;
    E.prototype.setSaturation = E.prototype.ca;
    E.prototype.setVisible = E.prototype.da;
    E.prototype.bindTo = E.prototype.K;
    E.prototype.get = E.prototype.get;
    E.prototype.getKeys = E.prototype.G;
    E.prototype.getProperties = E.prototype.I;
    E.prototype.set = E.prototype.set;
    E.prototype.setProperties = E.prototype.C;
    E.prototype.unbind = E.prototype.L;
    E.prototype.unbindAll = E.prototype.M;
    E.prototype.changed = E.prototype.l;
    E.prototype.getRevision = E.prototype.u;
    E.prototype.on = E.prototype.s;
    E.prototype.once = E.prototype.v;
    E.prototype.un = E.prototype.t;
    E.prototype.unByKey = E.prototype.A;
    J.prototype.setSource = J.prototype.fa;
    J.prototype.getBrightness = J.prototype.c;
    J.prototype.getContrast = J.prototype.f;
    J.prototype.getHue = J.prototype.e;
    J.prototype.getExtent = J.prototype.J;
    J.prototype.getMaxResolution = J.prototype.g;
    J.prototype.getMinResolution = J.prototype.i;
    J.prototype.getOpacity = J.prototype.q;
    J.prototype.getSaturation = J.prototype.k;
    J.prototype.getVisible = J.prototype.b;
    J.prototype.setBrightness = J.prototype.D;
    J.prototype.setContrast = J.prototype.H;
    J.prototype.setHue = J.prototype.N;
    J.prototype.setExtent = J.prototype.o;
    J.prototype.setMaxResolution = J.prototype.S;
    J.prototype.setMinResolution = J.prototype.U;
    J.prototype.setOpacity = J.prototype.p;
    J.prototype.setSaturation = J.prototype.ca;
    J.prototype.setVisible = J.prototype.da;
    J.prototype.bindTo = J.prototype.K;
    J.prototype.get = J.prototype.get;
    J.prototype.getKeys = J.prototype.G;
    J.prototype.getProperties = J.prototype.I;
    J.prototype.set = J.prototype.set;
    J.prototype.setProperties = J.prototype.C;
    J.prototype.unbind = J.prototype.L;
    J.prototype.unbindAll = J.prototype.M;
    J.prototype.changed = J.prototype.l;
    J.prototype.getRevision = J.prototype.u;
    J.prototype.on = J.prototype.s;
    J.prototype.once = J.prototype.v;
    J.prototype.un = J.prototype.t;
    J.prototype.unByKey = J.prototype.A;
    Y.prototype.getSource = Y.prototype.a;
    Y.prototype.getStyle = Y.prototype.af;
    Y.prototype.getStyleFunction = Y.prototype.df;
    Y.prototype.setStyle = Y.prototype.ka;
    Y.prototype.setSource = Y.prototype.fa;
    Y.prototype.getBrightness = Y.prototype.c;
    Y.prototype.getContrast = Y.prototype.f;
    Y.prototype.getHue = Y.prototype.e;
    Y.prototype.getExtent = Y.prototype.J;
    Y.prototype.getMaxResolution = Y.prototype.g;
    Y.prototype.getMinResolution = Y.prototype.i;
    Y.prototype.getOpacity = Y.prototype.q;
    Y.prototype.getSaturation = Y.prototype.k;
    Y.prototype.getVisible = Y.prototype.b;
    Y.prototype.setBrightness = Y.prototype.D;
    Y.prototype.setContrast = Y.prototype.H;
    Y.prototype.setHue = Y.prototype.N;
    Y.prototype.setExtent = Y.prototype.o;
    Y.prototype.setMaxResolution = Y.prototype.S;
    Y.prototype.setMinResolution = Y.prototype.U;
    Y.prototype.setOpacity = Y.prototype.p;
    Y.prototype.setSaturation = Y.prototype.ca;
    Y.prototype.setVisible = Y.prototype.da;
    Y.prototype.bindTo = Y.prototype.K;
    Y.prototype.get = Y.prototype.get;
    Y.prototype.getKeys = Y.prototype.G;
    Y.prototype.getProperties = Y.prototype.I;
    Y.prototype.set = Y.prototype.set;
    Y.prototype.setProperties = Y.prototype.C;
    Y.prototype.unbind = Y.prototype.L;
    Y.prototype.unbindAll = Y.prototype.M;
    Y.prototype.changed = Y.prototype.l;
    Y.prototype.getRevision = Y.prototype.u;
    Y.prototype.on = Y.prototype.s;
    Y.prototype.once = Y.prototype.v;
    Y.prototype.un = Y.prototype.t;
    Y.prototype.unByKey = Y.prototype.A;
    H.prototype.setSource = H.prototype.fa;
    H.prototype.getBrightness = H.prototype.c;
    H.prototype.getContrast = H.prototype.f;
    H.prototype.getHue = H.prototype.e;
    H.prototype.getExtent = H.prototype.J;
    H.prototype.getMaxResolution = H.prototype.g;
    H.prototype.getMinResolution = H.prototype.i;
    H.prototype.getOpacity = H.prototype.q;
    H.prototype.getSaturation = H.prototype.k;
    H.prototype.getVisible = H.prototype.b;
    H.prototype.setBrightness = H.prototype.D;
    H.prototype.setContrast = H.prototype.H;
    H.prototype.setHue = H.prototype.N;
    H.prototype.setExtent = H.prototype.o;
    H.prototype.setMaxResolution = H.prototype.S;
    H.prototype.setMinResolution = H.prototype.U;
    H.prototype.setOpacity = H.prototype.p;
    H.prototype.setSaturation = H.prototype.ca;
    H.prototype.setVisible = H.prototype.da;
    H.prototype.bindTo = H.prototype.K;
    H.prototype.get = H.prototype.get;
    H.prototype.getKeys = H.prototype.G;
    H.prototype.getProperties = H.prototype.I;
    H.prototype.set = H.prototype.set;
    H.prototype.setProperties = H.prototype.C;
    H.prototype.unbind = H.prototype.L;
    H.prototype.unbindAll = H.prototype.M;
    H.prototype.changed = H.prototype.l;
    H.prototype.getRevision = H.prototype.u;
    H.prototype.on = H.prototype.s;
    H.prototype.once = H.prototype.v;
    H.prototype.un = H.prototype.t;
    H.prototype.unByKey = H.prototype.A;
    G.prototype.getBrightness = G.prototype.c;
    G.prototype.getContrast = G.prototype.f;
    G.prototype.getHue = G.prototype.e;
    G.prototype.getExtent = G.prototype.J;
    G.prototype.getMaxResolution = G.prototype.g;
    G.prototype.getMinResolution = G.prototype.i;
    G.prototype.getOpacity = G.prototype.q;
    G.prototype.getSaturation = G.prototype.k;
    G.prototype.getVisible = G.prototype.b;
    G.prototype.setBrightness = G.prototype.D;
    G.prototype.setContrast = G.prototype.H;
    G.prototype.setHue = G.prototype.N;
    G.prototype.setExtent = G.prototype.o;
    G.prototype.setMaxResolution = G.prototype.S;
    G.prototype.setMinResolution = G.prototype.U;
    G.prototype.setOpacity = G.prototype.p;
    G.prototype.setSaturation = G.prototype.ca;
    G.prototype.setVisible = G.prototype.da;
    G.prototype.bindTo = G.prototype.K;
    G.prototype.get = G.prototype.get;
    G.prototype.getKeys = G.prototype.G;
    G.prototype.getProperties = G.prototype.I;
    G.prototype.set = G.prototype.set;
    G.prototype.setProperties = G.prototype.C;
    G.prototype.unbind = G.prototype.L;
    G.prototype.unbindAll = G.prototype.M;
    G.prototype.changed = G.prototype.l;
    G.prototype.getRevision = G.prototype.u;
    G.prototype.on = G.prototype.s;
    G.prototype.once = G.prototype.v;
    G.prototype.un = G.prototype.t;
    G.prototype.unByKey = G.prototype.A;
    I.prototype.setSource = I.prototype.fa;
    I.prototype.getBrightness = I.prototype.c;
    I.prototype.getContrast = I.prototype.f;
    I.prototype.getHue = I.prototype.e;
    I.prototype.getExtent = I.prototype.J;
    I.prototype.getMaxResolution = I.prototype.g;
    I.prototype.getMinResolution = I.prototype.i;
    I.prototype.getOpacity = I.prototype.q;
    I.prototype.getSaturation = I.prototype.k;
    I.prototype.getVisible = I.prototype.b;
    I.prototype.setBrightness = I.prototype.D;
    I.prototype.setContrast = I.prototype.H;
    I.prototype.setHue = I.prototype.N;
    I.prototype.setExtent = I.prototype.o;
    I.prototype.setMaxResolution = I.prototype.S;
    I.prototype.setMinResolution = I.prototype.U;
    I.prototype.setOpacity = I.prototype.p;
    I.prototype.setSaturation = I.prototype.ca;
    I.prototype.setVisible = I.prototype.da;
    I.prototype.bindTo = I.prototype.K;
    I.prototype.get = I.prototype.get;
    I.prototype.getKeys = I.prototype.G;
    I.prototype.getProperties = I.prototype.I;
    I.prototype.set = I.prototype.set;
    I.prototype.setProperties = I.prototype.C;
    I.prototype.unbind = I.prototype.L;
    I.prototype.unbindAll = I.prototype.M;
    I.prototype.changed = I.prototype.l;
    I.prototype.getRevision = I.prototype.u;
    I.prototype.on = I.prototype.s;
    I.prototype.once = I.prototype.v;
    I.prototype.un = I.prototype.t;
    I.prototype.unByKey = I.prototype.A;
    Mj.prototype.bindTo = Mj.prototype.K;
    Mj.prototype.get = Mj.prototype.get;
    Mj.prototype.getKeys = Mj.prototype.G;
    Mj.prototype.getProperties = Mj.prototype.I;
    Mj.prototype.set = Mj.prototype.set;
    Mj.prototype.setProperties = Mj.prototype.C;
    Mj.prototype.unbind = Mj.prototype.L;
    Mj.prototype.unbindAll = Mj.prototype.M;
    Mj.prototype.changed = Mj.prototype.l;
    Mj.prototype.getRevision = Mj.prototype.u;
    Mj.prototype.on = Mj.prototype.s;
    Mj.prototype.once = Mj.prototype.v;
    Mj.prototype.un = Mj.prototype.t;
    Mj.prototype.unByKey = Mj.prototype.A;
    Qj.prototype.getActive = Qj.prototype.b;
    Qj.prototype.setActive = Qj.prototype.c;
    Qj.prototype.bindTo = Qj.prototype.K;
    Qj.prototype.get = Qj.prototype.get;
    Qj.prototype.getKeys = Qj.prototype.G;
    Qj.prototype.getProperties = Qj.prototype.I;
    Qj.prototype.set = Qj.prototype.set;
    Qj.prototype.setProperties = Qj.prototype.C;
    Qj.prototype.unbind = Qj.prototype.L;
    Qj.prototype.unbindAll = Qj.prototype.M;
    Qj.prototype.changed = Qj.prototype.l;
    Qj.prototype.getRevision = Qj.prototype.u;
    Qj.prototype.on = Qj.prototype.s;
    Qj.prototype.once = Qj.prototype.v;
    Qj.prototype.un = Qj.prototype.t;
    Qj.prototype.unByKey = Qj.prototype.A;
    Rw.prototype.getActive = Rw.prototype.b;
    Rw.prototype.setActive = Rw.prototype.c;
    Rw.prototype.bindTo = Rw.prototype.K;
    Rw.prototype.get = Rw.prototype.get;
    Rw.prototype.getKeys = Rw.prototype.G;
    Rw.prototype.getProperties = Rw.prototype.I;
    Rw.prototype.set = Rw.prototype.set;
    Rw.prototype.setProperties = Rw.prototype.C;
    Rw.prototype.unbind = Rw.prototype.L;
    Rw.prototype.unbindAll = Rw.prototype.M;
    Rw.prototype.changed = Rw.prototype.l;
    Rw.prototype.getRevision = Rw.prototype.u;
    Rw.prototype.on = Rw.prototype.s;
    Rw.prototype.once = Rw.prototype.v;
    Rw.prototype.un = Rw.prototype.t;
    Rw.prototype.unByKey = Rw.prototype.A;
    Zj.prototype.getActive = Zj.prototype.b;
    Zj.prototype.setActive = Zj.prototype.c;
    Zj.prototype.bindTo = Zj.prototype.K;
    Zj.prototype.get = Zj.prototype.get;
    Zj.prototype.getKeys = Zj.prototype.G;
    Zj.prototype.getProperties = Zj.prototype.I;
    Zj.prototype.set = Zj.prototype.set;
    Zj.prototype.setProperties = Zj.prototype.C;
    Zj.prototype.unbind = Zj.prototype.L;
    Zj.prototype.unbindAll = Zj.prototype.M;
    Zj.prototype.changed = Zj.prototype.l;
    Zj.prototype.getRevision = Zj.prototype.u;
    Zj.prototype.on = Zj.prototype.s;
    Zj.prototype.once = Zj.prototype.v;
    Zj.prototype.un = Zj.prototype.t;
    Zj.prototype.unByKey = Zj.prototype.A;
    cl.prototype.getActive = cl.prototype.b;
    cl.prototype.setActive = cl.prototype.c;
    cl.prototype.bindTo = cl.prototype.K;
    cl.prototype.get = cl.prototype.get;
    cl.prototype.getKeys = cl.prototype.G;
    cl.prototype.getProperties = cl.prototype.I;
    cl.prototype.set = cl.prototype.set;
    cl.prototype.setProperties = cl.prototype.C;
    cl.prototype.unbind = cl.prototype.L;
    cl.prototype.unbindAll = cl.prototype.M;
    cl.prototype.changed = cl.prototype.l;
    cl.prototype.getRevision = cl.prototype.u;
    cl.prototype.on = cl.prototype.s;
    cl.prototype.once = cl.prototype.v;
    cl.prototype.un = cl.prototype.t;
    cl.prototype.unByKey = cl.prototype.A;
    ck.prototype.getActive = ck.prototype.b;
    ck.prototype.setActive = ck.prototype.c;
    ck.prototype.bindTo = ck.prototype.K;
    ck.prototype.get = ck.prototype.get;
    ck.prototype.getKeys = ck.prototype.G;
    ck.prototype.getProperties = ck.prototype.I;
    ck.prototype.set = ck.prototype.set;
    ck.prototype.setProperties = ck.prototype.C;
    ck.prototype.unbind = ck.prototype.L;
    ck.prototype.unbindAll = ck.prototype.M;
    ck.prototype.changed = ck.prototype.l;
    ck.prototype.getRevision = ck.prototype.u;
    ck.prototype.on = ck.prototype.s;
    ck.prototype.once = ck.prototype.v;
    ck.prototype.un = ck.prototype.t;
    ck.prototype.unByKey = ck.prototype.A;
    Vw.prototype.getActive = Vw.prototype.b;
    Vw.prototype.setActive = Vw.prototype.c;
    Vw.prototype.bindTo = Vw.prototype.K;
    Vw.prototype.get = Vw.prototype.get;
    Vw.prototype.getKeys = Vw.prototype.G;
    Vw.prototype.getProperties = Vw.prototype.I;
    Vw.prototype.set = Vw.prototype.set;
    Vw.prototype.setProperties = Vw.prototype.C;
    Vw.prototype.unbind = Vw.prototype.L;
    Vw.prototype.unbindAll = Vw.prototype.M;
    Vw.prototype.changed = Vw.prototype.l;
    Vw.prototype.getRevision = Vw.prototype.u;
    Vw.prototype.on = Vw.prototype.s;
    Vw.prototype.once = Vw.prototype.v;
    Vw.prototype.un = Vw.prototype.t;
    Vw.prototype.unByKey = Vw.prototype.A;
    gk.prototype.getActive = gk.prototype.b;
    gk.prototype.setActive = gk.prototype.c;
    gk.prototype.bindTo = gk.prototype.K;
    gk.prototype.get = gk.prototype.get;
    gk.prototype.getKeys = gk.prototype.G;
    gk.prototype.getProperties = gk.prototype.I;
    gk.prototype.set = gk.prototype.set;
    gk.prototype.setProperties = gk.prototype.C;
    gk.prototype.unbind = gk.prototype.L;
    gk.prototype.unbindAll = gk.prototype.M;
    gk.prototype.changed = gk.prototype.l;
    gk.prototype.getRevision = gk.prototype.u;
    gk.prototype.on = gk.prototype.s;
    gk.prototype.once = gk.prototype.v;
    gk.prototype.un = gk.prototype.t;
    gk.prototype.unByKey = gk.prototype.A;
    vl.prototype.getGeometry = vl.prototype.R;
    vl.prototype.getActive = vl.prototype.b;
    vl.prototype.setActive = vl.prototype.c;
    vl.prototype.bindTo = vl.prototype.K;
    vl.prototype.get = vl.prototype.get;
    vl.prototype.getKeys = vl.prototype.G;
    vl.prototype.getProperties = vl.prototype.I;
    vl.prototype.set = vl.prototype.set;
    vl.prototype.setProperties = vl.prototype.C;
    vl.prototype.unbind = vl.prototype.L;
    vl.prototype.unbindAll = vl.prototype.M;
    vl.prototype.changed = vl.prototype.l;
    vl.prototype.getRevision = vl.prototype.u;
    vl.prototype.on = vl.prototype.s;
    vl.prototype.once = vl.prototype.v;
    vl.prototype.un = vl.prototype.t;
    vl.prototype.unByKey = vl.prototype.A;
    $w.prototype.getActive = $w.prototype.b;
    $w.prototype.setActive = $w.prototype.c;
    $w.prototype.bindTo = $w.prototype.K;
    $w.prototype.get = $w.prototype.get;
    $w.prototype.getKeys = $w.prototype.G;
    $w.prototype.getProperties = $w.prototype.I;
    $w.prototype.set = $w.prototype.set;
    $w.prototype.setProperties = $w.prototype.C;
    $w.prototype.unbind = $w.prototype.L;
    $w.prototype.unbindAll = $w.prototype.M;
    $w.prototype.changed = $w.prototype.l;
    $w.prototype.getRevision = $w.prototype.u;
    $w.prototype.on = $w.prototype.s;
    $w.prototype.once = $w.prototype.v;
    $w.prototype.un = $w.prototype.t;
    $w.prototype.unByKey = $w.prototype.A;
    wl.prototype.getActive = wl.prototype.b;
    wl.prototype.setActive = wl.prototype.c;
    wl.prototype.bindTo = wl.prototype.K;
    wl.prototype.get = wl.prototype.get;
    wl.prototype.getKeys = wl.prototype.G;
    wl.prototype.getProperties = wl.prototype.I;
    wl.prototype.set = wl.prototype.set;
    wl.prototype.setProperties = wl.prototype.C;
    wl.prototype.unbind = wl.prototype.L;
    wl.prototype.unbindAll = wl.prototype.M;
    wl.prototype.changed = wl.prototype.l;
    wl.prototype.getRevision = wl.prototype.u;
    wl.prototype.on = wl.prototype.s;
    wl.prototype.once = wl.prototype.v;
    wl.prototype.un = wl.prototype.t;
    wl.prototype.unByKey = wl.prototype.A;
    yl.prototype.getActive = yl.prototype.b;
    yl.prototype.setActive = yl.prototype.c;
    yl.prototype.bindTo = yl.prototype.K;
    yl.prototype.get = yl.prototype.get;
    yl.prototype.getKeys = yl.prototype.G;
    yl.prototype.getProperties = yl.prototype.I;
    yl.prototype.set = yl.prototype.set;
    yl.prototype.setProperties = yl.prototype.C;
    yl.prototype.unbind = yl.prototype.L;
    yl.prototype.unbindAll = yl.prototype.M;
    yl.prototype.changed = yl.prototype.l;
    yl.prototype.getRevision = yl.prototype.u;
    yl.prototype.on = yl.prototype.s;
    yl.prototype.once = yl.prototype.v;
    yl.prototype.un = yl.prototype.t;
    yl.prototype.unByKey = yl.prototype.A;
    nx.prototype.getActive = nx.prototype.b;
    nx.prototype.setActive = nx.prototype.c;
    nx.prototype.bindTo = nx.prototype.K;
    nx.prototype.get = nx.prototype.get;
    nx.prototype.getKeys = nx.prototype.G;
    nx.prototype.getProperties = nx.prototype.I;
    nx.prototype.set = nx.prototype.set;
    nx.prototype.setProperties = nx.prototype.C;
    nx.prototype.unbind = nx.prototype.L;
    nx.prototype.unbindAll = nx.prototype.M;
    nx.prototype.changed = nx.prototype.l;
    nx.prototype.getRevision = nx.prototype.u;
    nx.prototype.on = nx.prototype.s;
    nx.prototype.once = nx.prototype.v;
    nx.prototype.un = nx.prototype.t;
    nx.prototype.unByKey = nx.prototype.A;
    Al.prototype.getActive = Al.prototype.b;
    Al.prototype.setActive = Al.prototype.c;
    Al.prototype.bindTo = Al.prototype.K;
    Al.prototype.get = Al.prototype.get;
    Al.prototype.getKeys = Al.prototype.G;
    Al.prototype.getProperties = Al.prototype.I;
    Al.prototype.set = Al.prototype.set;
    Al.prototype.setProperties = Al.prototype.C;
    Al.prototype.unbind = Al.prototype.L;
    Al.prototype.unbindAll = Al.prototype.M;
    Al.prototype.changed = Al.prototype.l;
    Al.prototype.getRevision = Al.prototype.u;
    Al.prototype.on = Al.prototype.s;
    Al.prototype.once = Al.prototype.v;
    Al.prototype.un = Al.prototype.t;
    Al.prototype.unByKey = Al.prototype.A;
    Cl.prototype.getActive = Cl.prototype.b;
    Cl.prototype.setActive = Cl.prototype.c;
    Cl.prototype.bindTo = Cl.prototype.K;
    Cl.prototype.get = Cl.prototype.get;
    Cl.prototype.getKeys = Cl.prototype.G;
    Cl.prototype.getProperties = Cl.prototype.I;
    Cl.prototype.set = Cl.prototype.set;
    Cl.prototype.setProperties = Cl.prototype.C;
    Cl.prototype.unbind = Cl.prototype.L;
    Cl.prototype.unbindAll = Cl.prototype.M;
    Cl.prototype.changed = Cl.prototype.l;
    Cl.prototype.getRevision = Cl.prototype.u;
    Cl.prototype.on = Cl.prototype.s;
    Cl.prototype.once = Cl.prototype.v;
    Cl.prototype.un = Cl.prototype.t;
    Cl.prototype.unByKey = Cl.prototype.A;
    Gl.prototype.getActive = Gl.prototype.b;
    Gl.prototype.setActive = Gl.prototype.c;
    Gl.prototype.bindTo = Gl.prototype.K;
    Gl.prototype.get = Gl.prototype.get;
    Gl.prototype.getKeys = Gl.prototype.G;
    Gl.prototype.getProperties = Gl.prototype.I;
    Gl.prototype.set = Gl.prototype.set;
    Gl.prototype.setProperties = Gl.prototype.C;
    Gl.prototype.unbind = Gl.prototype.L;
    Gl.prototype.unbindAll = Gl.prototype.M;
    Gl.prototype.changed = Gl.prototype.l;
    Gl.prototype.getRevision = Gl.prototype.u;
    Gl.prototype.on = Gl.prototype.s;
    Gl.prototype.once = Gl.prototype.v;
    Gl.prototype.un = Gl.prototype.t;
    Gl.prototype.unByKey = Gl.prototype.A;
    xx.prototype.getActive = xx.prototype.b;
    xx.prototype.setActive = xx.prototype.c;
    xx.prototype.bindTo = xx.prototype.K;
    xx.prototype.get = xx.prototype.get;
    xx.prototype.getKeys = xx.prototype.G;
    xx.prototype.getProperties = xx.prototype.I;
    xx.prototype.set = xx.prototype.set;
    xx.prototype.setProperties = xx.prototype.C;
    xx.prototype.unbind = xx.prototype.L;
    xx.prototype.unbindAll = xx.prototype.M;
    xx.prototype.changed = xx.prototype.l;
    xx.prototype.getRevision = xx.prototype.u;
    xx.prototype.on = xx.prototype.s;
    xx.prototype.once = xx.prototype.v;
    xx.prototype.un = xx.prototype.t;
    xx.prototype.unByKey = xx.prototype.A;
    kk.prototype.changed = kk.prototype.l;
    kk.prototype.getRevision = kk.prototype.u;
    kk.prototype.on = kk.prototype.s;
    kk.prototype.once = kk.prototype.v;
    kk.prototype.un = kk.prototype.t;
    kk.prototype.unByKey = kk.prototype.A;
    mk.prototype.clone = mk.prototype.clone;
    mk.prototype.getClosestPoint = mk.prototype.f;
    mk.prototype.getExtent = mk.prototype.J;
    mk.prototype.getType = mk.prototype.O;
    mk.prototype.intersectsExtent = mk.prototype.ja;
    mk.prototype.transform = mk.prototype.transform;
    mk.prototype.changed = mk.prototype.l;
    mk.prototype.getRevision = mk.prototype.u;
    mk.prototype.on = mk.prototype.s;
    mk.prototype.once = mk.prototype.v;
    mk.prototype.un = mk.prototype.t;
    mk.prototype.unByKey = mk.prototype.A;
    Em.prototype.getFirstCoordinate = Em.prototype.yb;
    Em.prototype.getLastCoordinate = Em.prototype.zb;
    Em.prototype.getLayout = Em.prototype.Ab;
    Em.prototype.applyTransform = Em.prototype.qa;
    Em.prototype.translate = Em.prototype.Ia;
    Em.prototype.getClosestPoint = Em.prototype.f;
    Em.prototype.getExtent = Em.prototype.J;
    Em.prototype.intersectsExtent = Em.prototype.ja;
    Em.prototype.changed = Em.prototype.l;
    Em.prototype.getRevision = Em.prototype.u;
    Em.prototype.on = Em.prototype.s;
    Em.prototype.once = Em.prototype.v;
    Em.prototype.un = Em.prototype.t;
    Em.prototype.unByKey = Em.prototype.A;
    Gm.prototype.getClosestPoint = Gm.prototype.f;
    Gm.prototype.getExtent = Gm.prototype.J;
    Gm.prototype.transform = Gm.prototype.transform;
    Gm.prototype.changed = Gm.prototype.l;
    Gm.prototype.getRevision = Gm.prototype.u;
    Gm.prototype.on = Gm.prototype.s;
    Gm.prototype.once = Gm.prototype.v;
    Gm.prototype.un = Gm.prototype.t;
    Gm.prototype.unByKey = Gm.prototype.A;
    Gk.prototype.getFirstCoordinate = Gk.prototype.yb;
    Gk.prototype.getLastCoordinate = Gk.prototype.zb;
    Gk.prototype.getLayout = Gk.prototype.Ab;
    Gk.prototype.applyTransform = Gk.prototype.qa;
    Gk.prototype.translate = Gk.prototype.Ia;
    Gk.prototype.getClosestPoint = Gk.prototype.f;
    Gk.prototype.getExtent = Gk.prototype.J;
    Gk.prototype.intersectsExtent = Gk.prototype.ja;
    Gk.prototype.transform = Gk.prototype.transform;
    Gk.prototype.changed = Gk.prototype.l;
    Gk.prototype.getRevision = Gk.prototype.u;
    Gk.prototype.on = Gk.prototype.s;
    Gk.prototype.once = Gk.prototype.v;
    Gk.prototype.un = Gk.prototype.t;
    Gk.prototype.unByKey = Gk.prototype.A;
    K.prototype.getFirstCoordinate = K.prototype.yb;
    K.prototype.getLastCoordinate = K.prototype.zb;
    K.prototype.getLayout = K.prototype.Ab;
    K.prototype.applyTransform = K.prototype.qa;
    K.prototype.translate = K.prototype.Ia;
    K.prototype.getClosestPoint = K.prototype.f;
    K.prototype.getExtent = K.prototype.J;
    K.prototype.transform = K.prototype.transform;
    K.prototype.changed = K.prototype.l;
    K.prototype.getRevision = K.prototype.u;
    K.prototype.on = K.prototype.s;
    K.prototype.once = K.prototype.v;
    K.prototype.un = K.prototype.t;
    K.prototype.unByKey = K.prototype.A;
    Om.prototype.getFirstCoordinate = Om.prototype.yb;
    Om.prototype.getLastCoordinate = Om.prototype.zb;
    Om.prototype.getLayout = Om.prototype.Ab;
    Om.prototype.applyTransform = Om.prototype.qa;
    Om.prototype.translate = Om.prototype.Ia;
    Om.prototype.getClosestPoint = Om.prototype.f;
    Om.prototype.getExtent = Om.prototype.J;
    Om.prototype.transform = Om.prototype.transform;
    Om.prototype.changed = Om.prototype.l;
    Om.prototype.getRevision = Om.prototype.u;
    Om.prototype.on = Om.prototype.s;
    Om.prototype.once = Om.prototype.v;
    Om.prototype.un = Om.prototype.t;
    Om.prototype.unByKey = Om.prototype.A;
    Rm.prototype.getFirstCoordinate = Rm.prototype.yb;
    Rm.prototype.getLastCoordinate = Rm.prototype.zb;
    Rm.prototype.getLayout = Rm.prototype.Ab;
    Rm.prototype.applyTransform = Rm.prototype.qa;
    Rm.prototype.translate = Rm.prototype.Ia;
    Rm.prototype.getClosestPoint = Rm.prototype.f;
    Rm.prototype.getExtent = Rm.prototype.J;
    Rm.prototype.transform = Rm.prototype.transform;
    Rm.prototype.changed = Rm.prototype.l;
    Rm.prototype.getRevision = Rm.prototype.u;
    Rm.prototype.on = Rm.prototype.s;
    Rm.prototype.once = Rm.prototype.v;
    Rm.prototype.un = Rm.prototype.t;
    Rm.prototype.unByKey = Rm.prototype.A;
    Sm.prototype.getFirstCoordinate = Sm.prototype.yb;
    Sm.prototype.getLastCoordinate = Sm.prototype.zb;
    Sm.prototype.getLayout = Sm.prototype.Ab;
    Sm.prototype.applyTransform = Sm.prototype.qa;
    Sm.prototype.translate = Sm.prototype.Ia;
    Sm.prototype.getClosestPoint = Sm.prototype.f;
    Sm.prototype.getExtent = Sm.prototype.J;
    Sm.prototype.transform = Sm.prototype.transform;
    Sm.prototype.changed = Sm.prototype.l;
    Sm.prototype.getRevision = Sm.prototype.u;
    Sm.prototype.on = Sm.prototype.s;
    Sm.prototype.once = Sm.prototype.v;
    Sm.prototype.un = Sm.prototype.t;
    Sm.prototype.unByKey = Sm.prototype.A;
    Ik.prototype.getFirstCoordinate = Ik.prototype.yb;
    Ik.prototype.getLastCoordinate = Ik.prototype.zb;
    Ik.prototype.getLayout = Ik.prototype.Ab;
    Ik.prototype.applyTransform = Ik.prototype.qa;
    Ik.prototype.translate = Ik.prototype.Ia;
    Ik.prototype.getClosestPoint = Ik.prototype.f;
    Ik.prototype.getExtent = Ik.prototype.J;
    Ik.prototype.transform = Ik.prototype.transform;
    Ik.prototype.changed = Ik.prototype.l;
    Ik.prototype.getRevision = Ik.prototype.u;
    Ik.prototype.on = Ik.prototype.s;
    Ik.prototype.once = Ik.prototype.v;
    Ik.prototype.un = Ik.prototype.t;
    Ik.prototype.unByKey = Ik.prototype.A;
    F.prototype.getFirstCoordinate = F.prototype.yb;
    F.prototype.getLastCoordinate = F.prototype.zb;
    F.prototype.getLayout = F.prototype.Ab;
    F.prototype.applyTransform = F.prototype.qa;
    F.prototype.translate = F.prototype.Ia;
    F.prototype.getClosestPoint = F.prototype.f;
    F.prototype.getExtent = F.prototype.J;
    F.prototype.transform = F.prototype.transform;
    F.prototype.changed = F.prototype.l;
    F.prototype.getRevision = F.prototype.u;
    F.prototype.on = F.prototype.s;
    F.prototype.once = F.prototype.v;
    F.prototype.un = F.prototype.t;
    F.prototype.unByKey = F.prototype.A;
    Sq.prototype.readFeatures = Sq.prototype.ma;
    Jq.prototype.readFeatures = Jq.prototype.ma;
    Jq.prototype.readFeatures = Jq.prototype.ma;
    qp.prototype.bindTo = qp.prototype.K;
    qp.prototype.get = qp.prototype.get;
    qp.prototype.getKeys = qp.prototype.G;
    qp.prototype.getProperties = qp.prototype.I;
    qp.prototype.set = qp.prototype.set;
    qp.prototype.setProperties = qp.prototype.C;
    qp.prototype.unbind = qp.prototype.L;
    qp.prototype.unbindAll = qp.prototype.M;
    qp.prototype.changed = qp.prototype.l;
    qp.prototype.getRevision = qp.prototype.u;
    qp.prototype.on = qp.prototype.s;
    qp.prototype.once = qp.prototype.v;
    qp.prototype.un = qp.prototype.t;
    qp.prototype.unByKey = qp.prototype.A;
    Tg.prototype.bindTo = Tg.prototype.K;
    Tg.prototype.get = Tg.prototype.get;
    Tg.prototype.getKeys = Tg.prototype.G;
    Tg.prototype.getProperties = Tg.prototype.I;
    Tg.prototype.set = Tg.prototype.set;
    Tg.prototype.setProperties = Tg.prototype.C;
    Tg.prototype.unbind = Tg.prototype.L;
    Tg.prototype.unbindAll = Tg.prototype.M;
    Tg.prototype.changed = Tg.prototype.l;
    Tg.prototype.getRevision = Tg.prototype.u;
    Tg.prototype.on = Tg.prototype.s;
    Tg.prototype.once = Tg.prototype.v;
    Tg.prototype.un = Tg.prototype.t;
    Tg.prototype.unByKey = Tg.prototype.A;
    Ug.prototype.getMap = Ug.prototype.f;
    Ug.prototype.setMap = Ug.prototype.setMap;
    Ug.prototype.setTarget = Ug.prototype.b;
    Ug.prototype.bindTo = Ug.prototype.K;
    Ug.prototype.get = Ug.prototype.get;
    Ug.prototype.getKeys = Ug.prototype.G;
    Ug.prototype.getProperties = Ug.prototype.I;
    Ug.prototype.set = Ug.prototype.set;
    Ug.prototype.setProperties = Ug.prototype.C;
    Ug.prototype.unbind = Ug.prototype.L;
    Ug.prototype.unbindAll = Ug.prototype.M;
    Ug.prototype.changed = Ug.prototype.l;
    Ug.prototype.getRevision = Ug.prototype.u;
    Ug.prototype.on = Ug.prototype.s;
    Ug.prototype.once = Ug.prototype.v;
    Ug.prototype.un = Ug.prototype.t;
    Ug.prototype.unByKey = Ug.prototype.A;
    eh.prototype.getMap = eh.prototype.f;
    eh.prototype.setMap = eh.prototype.setMap;
    eh.prototype.setTarget = eh.prototype.b;
    eh.prototype.bindTo = eh.prototype.K;
    eh.prototype.get = eh.prototype.get;
    eh.prototype.getKeys = eh.prototype.G;
    eh.prototype.getProperties = eh.prototype.I;
    eh.prototype.set = eh.prototype.set;
    eh.prototype.setProperties = eh.prototype.C;
    eh.prototype.unbind = eh.prototype.L;
    eh.prototype.unbindAll = eh.prototype.M;
    eh.prototype.changed = eh.prototype.l;
    eh.prototype.getRevision = eh.prototype.u;
    eh.prototype.on = eh.prototype.s;
    eh.prototype.once = eh.prototype.v;
    eh.prototype.un = eh.prototype.t;
    eh.prototype.unByKey = eh.prototype.A;
    fh.prototype.getMap = fh.prototype.f;
    fh.prototype.setTarget = fh.prototype.b;
    fh.prototype.bindTo = fh.prototype.K;
    fh.prototype.get = fh.prototype.get;
    fh.prototype.getKeys = fh.prototype.G;
    fh.prototype.getProperties = fh.prototype.I;
    fh.prototype.set = fh.prototype.set;
    fh.prototype.setProperties = fh.prototype.C;
    fh.prototype.unbind = fh.prototype.L;
    fh.prototype.unbindAll = fh.prototype.M;
    fh.prototype.changed = fh.prototype.l;
    fh.prototype.getRevision = fh.prototype.u;
    fh.prototype.on = fh.prototype.s;
    fh.prototype.once = fh.prototype.v;
    fh.prototype.un = fh.prototype.t;
    fh.prototype.unByKey = fh.prototype.A;
    Po.prototype.getMap = Po.prototype.f;
    Po.prototype.setTarget = Po.prototype.b;
    Po.prototype.bindTo = Po.prototype.K;
    Po.prototype.get = Po.prototype.get;
    Po.prototype.getKeys = Po.prototype.G;
    Po.prototype.getProperties = Po.prototype.I;
    Po.prototype.set = Po.prototype.set;
    Po.prototype.setProperties = Po.prototype.C;
    Po.prototype.unbind = Po.prototype.L;
    Po.prototype.unbindAll = Po.prototype.M;
    Po.prototype.changed = Po.prototype.l;
    Po.prototype.getRevision = Po.prototype.u;
    Po.prototype.on = Po.prototype.s;
    Po.prototype.once = Po.prototype.v;
    Po.prototype.un = Po.prototype.t;
    Po.prototype.unByKey = Po.prototype.A;
    Xg.prototype.getMap = Xg.prototype.f;
    Xg.prototype.setMap = Xg.prototype.setMap;
    Xg.prototype.setTarget = Xg.prototype.b;
    Xg.prototype.bindTo = Xg.prototype.K;
    Xg.prototype.get = Xg.prototype.get;
    Xg.prototype.getKeys = Xg.prototype.G;
    Xg.prototype.getProperties = Xg.prototype.I;
    Xg.prototype.set = Xg.prototype.set;
    Xg.prototype.setProperties = Xg.prototype.C;
    Xg.prototype.unbind = Xg.prototype.L;
    Xg.prototype.unbindAll = Xg.prototype.M;
    Xg.prototype.changed = Xg.prototype.l;
    Xg.prototype.getRevision = Xg.prototype.u;
    Xg.prototype.on = Xg.prototype.s;
    Xg.prototype.once = Xg.prototype.v;
    Xg.prototype.un = Xg.prototype.t;
    Xg.prototype.unByKey = Xg.prototype.A;
    Vo.prototype.getMap = Vo.prototype.f;
    Vo.prototype.setMap = Vo.prototype.setMap;
    Vo.prototype.setTarget = Vo.prototype.b;
    Vo.prototype.bindTo = Vo.prototype.K;
    Vo.prototype.get = Vo.prototype.get;
    Vo.prototype.getKeys = Vo.prototype.G;
    Vo.prototype.getProperties = Vo.prototype.I;
    Vo.prototype.set = Vo.prototype.set;
    Vo.prototype.setProperties = Vo.prototype.C;
    Vo.prototype.unbind = Vo.prototype.L;
    Vo.prototype.unbindAll = Vo.prototype.M;
    Vo.prototype.changed = Vo.prototype.l;
    Vo.prototype.getRevision = Vo.prototype.u;
    Vo.prototype.on = Vo.prototype.s;
    Vo.prototype.once = Vo.prototype.v;
    Vo.prototype.un = Vo.prototype.t;
    Vo.prototype.unByKey = Vo.prototype.A;
    Zg.prototype.getMap = Zg.prototype.f;
    Zg.prototype.setMap = Zg.prototype.setMap;
    Zg.prototype.setTarget = Zg.prototype.b;
    Zg.prototype.bindTo = Zg.prototype.K;
    Zg.prototype.get = Zg.prototype.get;
    Zg.prototype.getKeys = Zg.prototype.G;
    Zg.prototype.getProperties = Zg.prototype.I;
    Zg.prototype.set = Zg.prototype.set;
    Zg.prototype.setProperties = Zg.prototype.C;
    Zg.prototype.unbind = Zg.prototype.L;
    Zg.prototype.unbindAll = Zg.prototype.M;
    Zg.prototype.changed = Zg.prototype.l;
    Zg.prototype.getRevision = Zg.prototype.u;
    Zg.prototype.on = Zg.prototype.s;
    Zg.prototype.once = Zg.prototype.v;
    Zg.prototype.un = Zg.prototype.t;
    Zg.prototype.unByKey = Zg.prototype.A;
    jp.prototype.getMap = jp.prototype.f;
    jp.prototype.setTarget = jp.prototype.b;
    jp.prototype.bindTo = jp.prototype.K;
    jp.prototype.get = jp.prototype.get;
    jp.prototype.getKeys = jp.prototype.G;
    jp.prototype.getProperties = jp.prototype.I;
    jp.prototype.set = jp.prototype.set;
    jp.prototype.setProperties = jp.prototype.C;
    jp.prototype.unbind = jp.prototype.L;
    jp.prototype.unbindAll = jp.prototype.M;
    jp.prototype.changed = jp.prototype.l;
    jp.prototype.getRevision = jp.prototype.u;
    jp.prototype.on = jp.prototype.s;
    jp.prototype.once = jp.prototype.v;
    jp.prototype.un = jp.prototype.t;
    jp.prototype.unByKey = jp.prototype.A;
    op.prototype.getMap = op.prototype.f;
    op.prototype.setMap = op.prototype.setMap;
    op.prototype.setTarget = op.prototype.b;
    op.prototype.bindTo = op.prototype.K;
    op.prototype.get = op.prototype.get;
    op.prototype.getKeys = op.prototype.G;
    op.prototype.getProperties = op.prototype.I;
    op.prototype.set = op.prototype.set;
    op.prototype.setProperties = op.prototype.C;
    op.prototype.unbind = op.prototype.L;
    op.prototype.unbindAll = op.prototype.M;
    op.prototype.changed = op.prototype.l;
    op.prototype.getRevision = op.prototype.u;
    op.prototype.on = op.prototype.s;
    op.prototype.once = op.prototype.v;
    op.prototype.un = op.prototype.t;
    op.prototype.unByKey = op.prototype.A;
    return OPENLAYERS.ol;
}));

