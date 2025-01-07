"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      statusBarHeight: this.$statusBarHeight
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    Theme: {
      type: String,
      default: ""
    }
  },
  methods: {
    quit() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
  }
};
if (!Array) {
  const _component_my_icon = common_vendor.resolveComponent("my-icon");
  _component_my_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: `${$data.statusBarHeight}px`,
    b: common_vendor.o($options.quit),
    c: common_vendor.p({
      iconId: "icon-jiantou-copy"
    }),
    d: common_vendor.t($props.title),
    e: common_vendor.n($props.Theme)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
