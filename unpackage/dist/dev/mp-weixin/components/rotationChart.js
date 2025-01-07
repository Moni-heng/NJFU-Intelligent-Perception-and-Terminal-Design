"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  props: {
    imgArr: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentImgIndex: 0
    };
  },
  methods: {
    getCurrentImgIndex(e) {
      console.log("e->", e);
      this.currentImgIndex = e.detail.current;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.imgArr, (item, index, i0) => {
      return {
        a: item.src,
        b: index
      };
    }),
    b: common_vendor.o((...args) => $options.getCurrentImgIndex && $options.getCurrentImgIndex(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
