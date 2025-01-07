"use strict";
const common_vendor = require("../../common/vendor.js");
const searchBox = () => "../../components/searchBox.js";
const rotationChart = () => "../../components/rotationChart.js";
const recommend = () => "../../components/compound/recommend.js";
const bookList = () => "../../components/bookList.js";
const listHeader = () => "../../components/listHeader.js";
const _sfc_main = {
  components: {
    searchBox,
    rotationChart,
    recommend,
    bookList,
    listHeader
  },
  data() {
    return {
      statusBarHeight: this.$statusBarHeight,
      swiperImages: [],
      functionSortArr: [],
      Rebooks: [],
      bookList: []
    };
  },
  // methods: {
  //     findSwiperImages() {
  //         this.$http.get('index/loadData').then(res => {
  //             console.log('res->', res);
  //         });
  //     }
  // },
  methods: {
    findSwiperImages() {
      this.$http.get("/index/loadData").then((res) => {
        let data = res.data;
        this.swiperImages = data.swiperImages;
        this.swiperImages.forEach((item) => {
          item.src = item.param8;
        });
        let functionSortArr = data.functionSortArr;
        functionSortArr.forEach((item) => {
          let functionSort = {
            iconId: item.param1,
            // 这里应该是 param1 而不是 paraml
            iconColor: item.param2,
            name: item.param7,
            url: item.param8
          };
          this.functionSortArr.push(functionSort);
        });
        this.Rebooks = data.Rebooks;
        this.bookResources = data.bookResources;
        this.bookList = data.bookResources;
        console.log("this.bookResources > ", this.bookResources);
        console.log("functionSortArr->,", functionSortArr);
        console.log("this.bookList-> ", this.bookList);
      });
    },
    switchToPage(url) {
      common_vendor.index.navigateTo({
        url
      });
    },
    toBookDetail(bookId) {
      common_vendor.index.navigateTo({
        // url: '/pages/bookDetail/bookDetail?bookId=' + bookId
        url: `/pages/bookDetail/bookDetail?bookId=${bookId}`
      });
    }
  },
  onLoad() {
    this.findSwiperImages();
  }
};
if (!Array) {
  const _component_search_box = common_vendor.resolveComponent("search-box");
  const _component_my_icon = common_vendor.resolveComponent("my-icon");
  const _component_recommend = common_vendor.resolveComponent("recommend");
  const _component_list_header = common_vendor.resolveComponent("list-header");
  const _component_book_list = common_vendor.resolveComponent("book-list");
  (_component_search_box + _component_my_icon + _component_recommend + _component_list_header + _component_book_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: `${$data.statusBarHeight}px`,
    b: common_vendor.f($data.swiperImages, (item, index, i0) => {
      return {
        a: item.src,
        b: index
      };
    }),
    c: common_vendor.f($data.functionSortArr, (item, index, i0) => {
      return {
        a: "24a2cb8d-1-" + i0,
        b: common_vendor.p({
          iconId: item.iconId,
          iconColor: item.iconColor,
          iconSize: "65rpx"
        }),
        c: common_vendor.t(item.name),
        d: common_vendor.o(($event) => $options.switchToPage(item.url), index),
        e: index
      };
    }),
    d: common_vendor.p({
      Rebooks: $data.Rebooks
    }),
    e: common_vendor.f($data.bookList, (item, index, i0) => {
      return {
        a: "24a2cb8d-3-" + i0,
        b: common_vendor.p({
          title: item.category.cname
        }),
        c: "24a2cb8d-4-" + i0,
        d: common_vendor.p({
          bookListArr: item.books
        }),
        e: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
