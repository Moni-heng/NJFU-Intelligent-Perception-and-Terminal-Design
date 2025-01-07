"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const common_request = require("./common/request.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/detail/readingPage.js";
  "./pages/collect/collect.js";
  "./pages/sort/sort.js";
  "./pages/mine/mine.js";
  "./pages/bookDetail/bookDetail.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const myIcon = () => "./components/myIcon.js";
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.component("my-icon", myIcon);
  app.config.globalProperties.$statusBarHeight = common_vendor.index.getSystemInfoSync().statusBarHeight;
  app.config.globalProperties.$http = common_request.request;
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
