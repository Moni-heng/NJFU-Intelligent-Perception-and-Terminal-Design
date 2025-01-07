<template>
  <view class="geryTheme">
    <!-- 页标题 -->
    <page-title title="图书详情" Theme="geryTheme"></page-title>

    <!-- 图书信息展示 -->
    <view class="flex align-center py-2 geryTheme" style="height: 250rpx;">
      <!-- 图书封面 -->
      <image :src="book.cover" mode="aspectFit" class="flex-1 mx-2 rounded" style="width: 120rpx; height: 180rpx;"></image>
      <view class="flex-2">
        <view style="font-size: 45rpx;">{{ book.name }}</view>
        <view class="font mt-1">作者：{{ book.author }}</view>
        <view class="flex align-center mt-2">
          <button class="flex-1 mr-2">分享</button>
          <button class="flex-1 mx-2">收藏</button>
        </view>
      </view>
    </view>

    <!-- Tab组件 -->
    <tap-top :tabArr="['详情', '目录']" @getTabIndex="getTabIndex" :tabIndex="tabIndex"></tap-top>

    <!-- 根据tabIndex显示不同的内容 -->
    <!-- <view v-if="tabIndex === 0" class="mt-2">
      <h2>图书简介</h2>
      <p>{{ book.briefIntroduction }}</p>
    </view> -->

    <view v-if="tabIndex === 1" class="mt-2">
    </view>

    <!-- 显示图书简介 -->
    <scroll-view scroll-y="true" v-show="tabIndex === 0">
      <view>
        <view class="flex justify-center text-light-back py-2" style="color: grey;">
          --简介--
        </view>
        <view class="font-lg px-2" style="line-height: 80rpx;">{{ book.briefIntroduction }}</view>
      </view>
    </scroll-view>

    <!-- 显示图书目录 -->
    <scroll-view scroll-y="true" v-show="tabIndex === 1">
      <block v-for="(item, index) in chapterCatalog" :key="index">
        <view hover-class="bg-light" class="p-2 border-bottom text-ellipsis" @tap="toReadingPage(item.id)">{{ item.title }}</view>
      </block>
    </scroll-view>
  </view>
</template>

<script>
import pageTitle from "@/components/pageTitle.vue";
import tapTop from "@/components/tabTop.vue"; // 确保引入了tapTop组件

export default {
  components: {
    pageTitle,
    tapTop,  // 确保引入并注册tapTop组件
  },
  data() {
    return {
      chapterCatalog: [],  // 目录数据
      tabIndex: 0,  // 默认选中的Tab索引
      book: {
        name: "",
        briefIntroduction: "图书简介...",  // 示例简介
        author: "",
        cover: "",
      },
    };
  },
  props: {
    bookId: {
      type: String,
    },
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
      this.$http.get("/ChapterCatalog/" + bookId).then(res => {
        let data = res.data;
        this.chapterCatalog = data;  // 更新目录数据
      });
    },

    // 跳转到阅读页面
    toReadingPage(catalogId) {
      uni.navigateTo({
        url: `/pages/detail/readingPage?catalogId=${catalogId}&bookId=${this.bookId}&bookName=${this.book.name}`
      });
    },

    // 更新tabIndex值
    getTabIndex(tabIndex) {
      this.tabIndex = tabIndex;
    },
  },
  mounted() {
    let bookId = parseInt(this.bookId);
    this.getBookById(bookId);  // 获取图书信息
    this.getCatalogListByBookId(bookId);  // 获取图书目录
  },
};
</script>

<style>
.white-section{
  background-color: #ffffff;
}
</style>
