(function (e, t) {
        "function" == typeof define && define.amd
            ? define([], function () {
                  return t(e);
              })
            : "object" == typeof exports
            ? (module.exports = t(e))
            : (e.Gumshoe = t(e));
    })("undefined" != typeof global ? global : "undefined" != typeof window ? window : this, function (c) {
        "use strict";
        function f(e, t, n) {
            if (n.settings.events) {
                var r = new CustomEvent(e, { bubbles: !0, cancelable: !0, detail: n });
                t.dispatchEvent(r);
            }
        }
        function n(e) {
            var t = 0;
            if (e.offsetParent) for (; e; ) (t += e.offsetTop), (e = e.offsetParent);
            return 0 <= t ? t : 0;
        }
        function d(e) {
            e &&
                e.sort(function (e, t) {
                    return n(e.content) < n(t.content) ? -1 : 1;
                });
        }
        function a(e, t, n) {
            var r,
                i = e.getBoundingClientRect(),
                o = "function" == typeof (r = t).offset ? parseFloat(r.offset()) : parseFloat(r.offset);
            return n ? parseInt(i.bottom, 10) < (c.innerHeight || document.documentElement.clientHeight) : parseInt(i.top, 10) <= o;
        }
        function s() {
            return (
                c.innerHeight + c.pageYOffset >=
                Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight)
            );
        }
        function p(e, t) {
            var n,
                r,
                i = e[e.length - 1];
            if (((n = i), (r = t), s() && a(n.content, r, !0))) return i;
            for (var o = e.length - 1; 0 <= o; o--) if (a(e[o].content, t)) return e[o];
        }
        function h(e, t) {
            if (e) {
                var n = e.nav.closest("li");
                n && (n.classList.remove(t.navClass), e.content.classList.remove(t.contentClass), r(n, t), f("gumshoeDeactivate", n, { link: e.nav, content: e.content, settings: t }));
            }
        }
        var m = { navClass: "active", contentClass: "active", nested: !1, nestedClass: "active", offset: 0, reflow: !1, events: !0 },
            r = function (e, t) {
                if (t.nested) {
                    var n = e.parentNode.closest("li");
                    n && (n.classList.remove(t.nestedClass), r(n, t));
                }
            },
            g = function (e, t) {
                if (t.nested) {
                    var n = e.parentNode.closest("li");
                    n && (n.classList.add(t.nestedClass), g(n, t));
                }
            };
        return function (e, t) {
            var n,
                r,
                i,
                o,
                a,
                s = {};
            (s.setup = function () {
                (n = document.querySelectorAll(e)),
                    (r = []),
                    Array.prototype.forEach.call(n, function (e) {
                        var t = document.getElementById(decodeURIComponent(e.hash.substr(1)));
                        t && r.push({ nav: e, content: t });
                    }),
                    d(r);
            }),
                (s.detect = function () {
                    var e = p(r, a);
                    e
                        ? (i && e.content === i.content) ||
                          (h(i, a),
                          (function (e, t) {
                              if (e) {
                                  var n = e.nav.closest("li");
                                  n && (n.classList.add(t.navClass), e.content.classList.add(t.contentClass), g(n, t), f("gumshoeActivate", n, { link: e.nav, content: e.content, settings: t }));
                              }
                          })(e, a),
                          (i = e))
                        : i && (h(i, a), (i = null));
                });
            function u(e) {
                o && c.cancelAnimationFrame(o), (o = c.requestAnimationFrame(s.detect));
            }
            function l(e) {
                o && c.cancelAnimationFrame(o),
                    (o = c.requestAnimationFrame(function () {
                        d(r), s.detect();
                    }));
            }
            s.destroy = function () {
                i && h(i, a), c.removeEventListener("scroll", u, !1), a.reflow && c.removeEventListener("resize", l, !1), (a = o = i = n = r = null);
            };
            return (
                (a = (function () {
                    var n = {};
                    return (
                        Array.prototype.forEach.call(arguments, function (e) {
                            for (var t in e) {
                                if (!e.hasOwnProperty(t)) return;
                                n[t] = e[t];
                            }
                        }),
                        n
                    );
                })(m, t || {})),
                s.setup(),
                s.detect(),
                c.addEventListener("scroll", u, !1),
                a.reflow && c.addEventListener("resize", l, !1),
                s
            );
        };
    }),
    $(document).ready(function () {
        $("#main").fitVids();
        function e() {
            (0 === $(".author__urls-wrapper button").length ? 1024 < $(window).width() : !$(".author__urls-wrapper button").is(":visible")) ? $(".sidebar").addClass("sticky") : $(".sidebar").removeClass("sticky");
        }
        e(),
            $(window).resize(function () {
                e();
            }),
            $(".author__urls-wrapper button").on("click", function () {
                $(".author__urls").toggleClass("is--visible"), $(".author__urls-wrapper button").toggleClass("open");
            }),
            $(document).keyup(function (e) {
                27 === e.keyCode && $(".initial-content").hasClass("is--hidden") && ($(".search-content").toggleClass("is--visible"), $(".initial-content").toggleClass("is--hidden"));
            }),
            $(".search__toggle").on("click", function () {
                $(".search-content").toggleClass("is--visible"),
                    $(".initial-content").toggleClass("is--hidden"),
                    setTimeout(function () {
                        $(".search-content input").focus();
                    }, 400);
            });

        if (0 < $("nav.toc").length) new Gumshoe("nav.toc a", { navClass: "active", contentClass: "active", nested: !1, nestedClass: "active", offset: 20, reflow: !0, events: !0 });$("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif'],a[href$='.webp']").addClass("image-popup"),$(".image-popup").magnificPopup({type:"image",tLoading:"Loading image #%curr%...",gallery:{enabled:!0,navigateByImgClick:!0,preload:[0,1]},image:{tError:'<a href="%url%">Image #%curr%</a> could not be loaded.'},removalDelay:500,mainClass:"mfp-zoom-in",callbacks:{beforeOpen:function(){this.st.image.markup=this.st.image.markup.replace("mfp-figure","mfp-figure mfp-with-anim")}},closeOnContentClick:!0,midClick:!0}),$(".page__content").find("h1, h2, h3, h4, h5, h6").each(function(){var e=$(this).attr("id");if(e){var t=document.createElement("a");t.className="header-link",t.href="#"+e,t.innerHTML='<span class="sr-only">Permalink</span><i class="fas fa-link"></i>',t.title="Permalink",$(this).append(t)}})});