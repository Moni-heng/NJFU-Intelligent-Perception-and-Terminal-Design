"use strict";
const common_vendor = require("../../common/vendor.js");
const pageTitle = () => "../../components/pageTitle.js";
const tapTop = () => "../../components/tabTop.js";
const _sfc_main = {
  components: {
    pageTitle,
    tapTop
    // 确保引入并注册tapTop组件
  },
  data() {
    return {
      chapterCatalog: [],
      // 目录数据
      tabIndex: 0,
      // 默认选中的Tab索引
      book: {
        name: "",
        briefIntroduction: "图书简介...",
        // 示例简介
        author: "",
        cover: ""
      }
    };
  },
  props: {
    bookId: {
      type: String
    }
  },
  methods: {
    // 获取图书详情数据
    getBookById(bookId) {
      this.$http.get("/book/" + bookId).then((res) => {
        let data = res.data;
        this.book = data;
      });
    },
    // 获取图书目录数据
    getCatalogListByBookId(bookId) {
      this.$http.get("/ChapterCatalog/" + bookId).then((res) => {
        let data = res.data;
        this.chapterCatalog = data;
      });
    },
    // 跳转到阅读页面
    toReadingPage(catalogId) {
      common_vendor.index.navigateTo({
        url: `/pages/detail/readingPage?catalogId=${catalogId}&bookId=${this.bookId}&bookName=${this.book.name}`
      });
    },
    // 更新tabIndex值
    getTabIndex(tabIndex) {
      this.tabIndex = tabIndex;
    }
  },
  mounted() {
    let bookId = parseInt(this.bookId);
    this.getBookById(bookId);
    this.getCatalogListByBookId(bookId);
  }
};
if (!Array) {
  const _component_page_title = common_vendor.resolveComponent("page-title");
  const _component_tap_top = common_vendor.resolveComponent("tap-top");
  (_component_page_title + _component_tap_top)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      title: "图书详情",
      Theme: "geryTheme"
    }),
    b: $data.book.cover,
    c: common_vendor.t($data.book.name),
    d: common_vendor.t($data.book.author),
    e: common_vendor.o($options.getTabIndex),
    f: common_vendor.p({
      tabArr: ["详情", "目录"],
      tabIndex: $data.tabIndex
    }),
    g: $data.tabIndex === 1
  }, $data.tabIndex === 1 ? {} : {}, {
    h: common_vendor.t($data.book.briefIntroduction),
    i: $data.tabIndex === 0,
    j: common_vendor.f($data.chapterCatalog, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.o(($event) => $options.toReadingPage(item.id), index),
        c: index
      };
    }),
    k: $data.tabIndex === 1
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
