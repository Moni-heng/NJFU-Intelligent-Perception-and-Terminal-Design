"use strict";
const common_vendor = require("../../common/vendor.js");
const common_unit = require("../../common/unit.js");
const uniDrawer = () => "../../components/uni-drawer/uni-drawer.js";
const uniLoadMore = () => "../../components/uni-load-more/uni-load-more.js";
const _sfc_main = {
  components: {
    unit: common_unit.unit,
    uniDrawer,
    uniLoadMore
  },
  data() {
    return {
      statusBarHeight: this.$statusBarHeight,
      chapterCatalog: [],
      chapterContent: {
        bookId: 1,
        bookName: "",
        catalogId: 1,
        title: "",
        text: ""
      },
      current: 0,
      calHeight: 0,
      catalogStatus: false,
      setStatus: false,
      typeFaceStatus: false,
      myFontSize: common_vendor.index.getStorageSync("myFontSize") || 15,
      myLineHeight: common_vendor.index.getStorageSync("myLineHeight") || 35,
      moreStatus: false,
      themeIndex: common_vendor.index.getStorageSync("themeIndex") || 4,
      themes: [
        {
          id: "lightGreyTheme",
          name: "浅灰"
        },
        {
          id: "eyeHelpTheme",
          name: "护眼"
        },
        {
          id: "thinInkTheme",
          name: "薄墨"
        },
        {
          id: "nightTheme",
          name: "夜间"
        },
        {
          id: "morningTheme",
          name: "白天"
        }
      ]
    };
  },
  props: {
    catalogId: {
      type: String
    },
    bookId: {
      type: String
    },
    bookName: {
      type: String
    }
  },
  computed: {
    currentTheme() {
      return this.themes[this.themeIndex].id;
    }
  },
  methods: {
    quit() {
      console.log("quit");
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    getCatalogListByBookId(bookId) {
      this.$http.get("/ChapterCatalog/" + bookId).then(
        (res) => {
          let data = res.data;
          this.chapterCatalog = data;
          console.log("this.chapterCatalog-> ", this.chapterCatalog);
          let current = this.chapterCatalog.findIndex((item) => item.id == this.catalogId);
          this.current = current;
        }
      );
    },
    getChapterContent(bookId, catalogId) {
      this.chapterContent.text = "";
      setTimeout(() => {
        console.log(1e3);
        this.$http.get("/ChapterContent/content/" + bookId + "/" + catalogId).then((res) => {
          let data = res.data;
          this.chapterContent = data;
        });
      }, 500);
    },
    onSwiperChange(event) {
      let current = event.detail.current;
      this.current = current;
      let catalogId = this.chapterCatalog[current].id;
      this.getChapterContent(this.bookId, catalogId);
    },
    changeCatalogStatus(status) {
      this.catalogStatus = status;
      if (this.catalogStatus) {
        this.setStatus = false;
      }
    },
    toPointChapter(index) {
      this.current = index;
      this.getChapterContent(this.bookId, this.chapterCatalog[index].id);
    },
    changeSetStatus() {
      if (this.typeFaceStatus) {
        this.typeFaceStatus = false;
        return;
      }
      this.setStatus = !this.setStatus;
    },
    changeFontSize(event) {
      this.myFontSize = event.detail.value;
      common_vendor.index.setStorageSync("myFontSize", this.myFontSize);
    },
    changeLineHeight(event) {
      this.myLineHeight = event.detail.value;
      common_vendor.index.setStorageSync("myLineHeight", this.myLineHeight);
    },
    changeTypeFaceStatus(state) {
      this.typeFaceStatus = state;
      if (this.typeFaceStatus) {
        this.setStatus = false;
      }
    },
    changeMoreStatus(state) {
      this.moreStatus = state;
      if (this.setStatus) {
        this.setStatus = false;
      }
    },
    changeSetStatus() {
      if (this.typeFaceStatus || this.moreStatus) {
        this.typeFaceStatus = false;
        this.moreStatus = false;
        return;
      }
      this.setStatus = !this.setStatus;
    },
    changeThemeIndex(index) {
      this.themeIndex = index;
      console.log("this.themeIndex-> ", this.themeIndex);
      common_vendor.index.setStorageSync("themeIndex", this.themeIndex);
    },
    setIsNight() {
      if (this.themeIndex == 3) {
        this.changeThemeIndex(4);
      } else {
        this.changeThemeIndex(3);
      }
    }
  },
  onLoad() {
    this.getCatalogListByBookId(this.bookId);
    this.getChapterContent(this.bookId, this.catalogId);
  },
  created() {
    let calHeight = common_vendor.index.getSystemInfoSync().windowHeight - this.statusBarHeight;
    this.calHeight = common_unit.unit.Torpx(calHeight);
  }
};
if (!Array) {
  const _component_my_icon = common_vendor.resolveComponent("my-icon");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_drawer2 = common_vendor.resolveComponent("uni-drawer");
  (_component_my_icon + _easycom_uni_load_more2 + _easycom_uni_drawer2)();
}
const _easycom_uni_load_more = () => "../../components/uni-load-more/uni-load-more.js";
const _easycom_uni_drawer = () => "../../components/uni-drawer/uni-drawer.js";
if (!Math) {
  (_easycom_uni_load_more + _easycom_uni_drawer)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: `${_ctx.$statusBarHeight}`,
    b: common_vendor.o($options.quit),
    c: common_vendor.p({
      iconId: "icon-jiantou-copy"
    }),
    d: common_vendor.t($props.bookName),
    e: common_vendor.t($data.chapterContent.title),
    f: `${$data.statusBarHeight}px`,
    g: $data.setStatus,
    h: common_vendor.p({
      iconId: "icon-xueyuan-mulu",
      iconSize: "55rpx"
    }),
    i: common_vendor.o(($event) => $options.changeCatalogStatus(true)),
    j: common_vendor.p({
      iconId: "icon-yanjing",
      iconSize: "55rpx"
    }),
    k: common_vendor.o((...args) => $options.setIsNight && $options.setIsNight(...args)),
    l: common_vendor.p({
      iconId: "icon-ziti1",
      iconSize: "55rpx"
    }),
    m: common_vendor.o(($event) => $options.changeTypeFaceStatus(true)),
    n: common_vendor.p({
      iconId: "icon-diqiuhuanqiu",
      iconSize: "55rpx"
    }),
    o: common_vendor.o(($event) => $options.changeMoreStatus(true)),
    p: $data.setStatus,
    q: common_vendor.f($data.chapterCatalog, (item, index, i0) => {
      return {
        a: "14477075-5-" + i0,
        b: item.id
      };
    }),
    r: $data.chapterContent.text == "",
    s: common_vendor.p({
      status: "loading"
    }),
    t: $data.chapterContent.text,
    v: `${$data.calHeight}rpx`,
    w: common_vendor.n($options.currentTheme),
    x: common_vendor.o((...args) => $options.onSwiperChange && $options.onSwiperChange(...args)),
    y: `${$data.calHeight}rpx`,
    z: `${$data.myFontSize}px`,
    A: `${$data.myLineHeight}px`,
    B: common_vendor.o((...args) => $options.changeSetStatus && $options.changeSetStatus(...args)),
    C: `${$data.statusBarHeight}px`,
    D: common_vendor.f($data.chapterCatalog, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.n(index == $data.current ? "curChapter" : ""),
        c: common_vendor.o(($event) => $options.toPointChapter(index), item.id),
        d: item.id
      };
    }),
    E: `${$data.calHeight - 80}rpx`,
    F: common_vendor.o(($event) => $options.changeCatalogStatus(false)),
    G: common_vendor.p({
      visible: $data.catalogStatus
    }),
    H: $data.myFontSize,
    I: common_vendor.o((...args) => $options.changeFontSize && $options.changeFontSize(...args)),
    J: common_vendor.o((...args) => $options.changeFontSize && $options.changeFontSize(...args)),
    K: $data.myLineHeight,
    L: common_vendor.o((...args) => $options.changeLineHeight && $options.changeLineHeight(...args)),
    M: common_vendor.o((...args) => $options.changeLineHeight && $options.changeLineHeight(...args)),
    N: $data.typeFaceStatus,
    O: common_vendor.f($data.themes, (item, index, i0) => {
      return {
        a: common_vendor.n(item.id),
        b: common_vendor.t(item.name),
        c: common_vendor.o(($event) => $options.changeThemeIndex(index), item.id),
        d: item.id
      };
    }),
    P: $data.moreStatus
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
