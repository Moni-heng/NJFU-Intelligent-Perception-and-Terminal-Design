"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _component_my_icon = common_vendor.resolveComponent("my-icon");
  _component_my_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      iconId: "icon-tubiao11",
      iconColor: "text-light-muted",
      iconSize: "25rpx"
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
