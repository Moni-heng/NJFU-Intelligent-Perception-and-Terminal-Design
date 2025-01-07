"use strict";
const common_vendor = require("../../common/vendor.js");
const searchBox = () => "../../components/searchBox.js";
const _sfc_main = {
  components: {
    searchBox
  }
};
if (!Array) {
  const _component_search_box = common_vendor.resolveComponent("search-box");
  _component_search_box();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
