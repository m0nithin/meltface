! function(t, e) {
    "use strict";
    var i = function() {
        e.hooks.addAction("frontend/element_ready/global", (function(t) {
            var e = t.find("[data-ekit-sticky]");
            if (e.length) return e.attr({
                "data-element_type": t.data("element_type")
            }).data({
                id: t.data("id"),
                widget_type: t.data("widget_type"),
                settings: t.data("settings")
            }), void new s({
                $element: e
            });
            new s({
                $element: t
            })
        }))
    };
    t(window).on("elementor/frontend/init", i);
    var n = elementorModules.frontend.handlers.Base,
        s = n.extend({
            bindEvents: function() {
                elementorFrontend.addListenerOnce(this.getUniqueHandlerID() + "ekit_sticky", "resize", this.run)
            },
            unbindEvents: function() {
                elementorFrontend.removeListeners(this.getUniqueHandlerID() + "ekit_sticky", "resize", this.run)
            },
            isStickyOn: function() {
                return undefined !== this.$element.data("ekit_sticky")
            },
            activate: function() {
                var e = this.getElementSettings(),
                    i = t("#" + e.ekit_sticky_until),
                    n = {
                        to: e.ekit_sticky,
                        offset: e.ekit_sticky_offset.size,
                        effectsOffset: e.ekit_sticky_effect_offset.size,
                        classes: {
                            sticky: "ekit-sticky",
                            stickyActive: "ekit-sticky--active ekit-section--handles-inside",
                            stickyEffects: "ekit-sticky--effects",
                            spacer: "ekit-sticky__spacer"
                        },
                        stopAt: !!i.length && i
                    },
                    s = elementorFrontend.getElements("$wpAdminBar");
                "column" === e.ekit_sticky && (n.to = "top", n.column = !0), "show_on_scroll_up" === e.ekit_sticky && (n.to = "top", n.isShowOnScrollUp = !0), e.ekit_sticky_parent && (n.parent = ".ekit-widget-wrap"), s.length && "top" === e.ekit_sticky && "fixed" === s.css("position") && (n.offset += s.height()), this.$element.ekit_sticky(n)
            },
            deactivate: function() {
                this.isStickyOn() && this.$element.ekit_sticky("destroy")
            },
            run: function(t) {
                if (this.getElementSettings("ekit_sticky")) {
                    var e = elementorFrontend.getCurrentDeviceMode(),
                        i = this.getElementSettings("ekit_sticky_on");
                    i && "string" == typeof i && (i = i.split("_")), -1 !== i.indexOf(e) ? !0 === t ? this.reactivate() : this.isStickyOn() || this.activate() : this.deactivate()
                } else this.deactivate()
            },
            reactivate: function() {
                this.deactivate(), this.activate()
            },
            onElementChange: function(t) {
                -1 !== ["ekit_sticky", "ekit_sticky_on"].indexOf(t) && this.run(!0), -1 !== ["ekit_sticky_offset", "ekit_sticky_effect_offset", "ekit_sticky_parent", "ekit_sticky_until", "ekit_sticky_color"].indexOf(t) && this.reactivate()
            },
            onInit: function() {
                n.prototype.onInit.apply(this, arguments), this.run()
            },
            onDestroy: function() {
                n.prototype.onDestroy.apply(this, arguments), this.deactivate()
            }
        })
}(jQuery, window.elementorFrontend);