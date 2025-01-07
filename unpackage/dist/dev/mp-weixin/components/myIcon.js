"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  props: {
    iconId: {
      type: String,
      default: ""
    },
    iconSize: {
      type: String,
      default: "45rpx"
    },
    iconColor: {
      type: String,
      default: "text-light-muted"
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.n($props.iconId),
    b: common_vendor.n($props.iconSize),
    c: common_vendor.s("font-size:" + $props.iconSize + ";")
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
