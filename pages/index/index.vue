<template>
  <view>
    <!-- 状态栏空白区域 -->
    <view :style="{ height: `${statusBarHeight}px` }"></view>
    <!-- 搜索框 -->
    <search-box></search-box>
    
    <!-- 电子书轮播图 -->
    <text> </text>
    <swiper :indicator-dots="true" autoplay circular indicator-active-color="#fff" style="height: 380rpx;">
      <swiper-item v-for="(item, index) in swiperImages" :key="index">
        <image :src="item.src" mode="aspectFill" class="w-100"></image>
      </swiper-item>
    </swiper>

    <!-- 功能分类列表 -->
    <view class="flex align-center justify-between mx-4 my-3">
      <block v-for="(item, index) in functionSortArr" :key="index">
        <view class="flex flex-column align-center justify-center" @tap="switchToPage(item.url)">
          <my-icon :iconId="item.iconId" :iconColor="item.iconColor" iconSize="65rpx"></my-icon>
          <view class="font-sm mt-1 text-light-black">{{ item.name }}</view>
        </view>
      </block>
    </view>
  </view>
<recommend :Rebooks="Rebooks"></recommend>
<view v-for="(item, index) in bookList" :key="index">
      <list-header :title="item.category.cname"></list-header>
      <book-list :bookListArr="item.books"></book-list>
    </view>

</template>
<script>
import searchBox from '@/components/searchBox.vue'
import rotationChart from '@/components/rotationChart.vue'
import recommend from '@/components/compound/recommend.vue'
import bookList from '@/components/bookList.vue'
import listHeader from '@/components/listHeader.vue'
export default {
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
    Rebooks:[],
    bookList:[]
  }
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
  this.$http.get('/index/loadData').then(res => {
    let data = res.data;
    this.swiperImages = data.swiperImages;
    this.swiperImages.forEach(item => {
      item.src = item.param8;
    });

    // 赋值功能分类列表
    let functionSortArr = data.functionSortArr;
    functionSortArr.forEach(item => {
      let functionSort = {
        iconId: item.param1, // 这里应该是 param1 而不是 paraml
        iconColor: item.param2,
        name: item.param7,
        url: item.param8
      };
      this.functionSortArr.push(functionSort);
    });
    this.Rebooks = data.Rebooks;
    this.bookResources = data.bookResources;
    this.bookList = data.bookResources

    console.log('this.bookResources > ', this.bookResources);
    console.log('functionSortArr->,',functionSortArr)
    console.log('this.bookList-> ',this.bookList)
  });
},
 
 switchToPage(url) {
   uni.navigateTo({
     url: url
   })
 },
   toBookDetail(bookId) {
     uni.navigateTo({
       // url: '/pages/bookDetail/bookDetail?bookId=' + bookId
       url: `/pages/bookDetail/bookDetail?bookId=${bookId}`
     })
   }
},
onLoad() {
    this.findSwiperImages();
}
}
</script>

<style>
/* 添加样式 */
</style>