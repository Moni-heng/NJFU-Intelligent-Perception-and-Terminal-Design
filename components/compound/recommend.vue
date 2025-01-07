<!-- <template>
	<view>
		  <list-header title="猜你喜欢"></list-header>
	<view class="flex align-center">
	<block v-for="(item,index) in Rebooks" : key= "index">
		<view class="border rounded flex-1 flex flex-column align-center justify-center">
			<image :src='item.cover' mode="widthFix" class="w-100"></image>
			<text class="mt-1 frot text-light-black">{{item.name}}</text>
		</view>
	</block>
	</view>
</view>
</template> -->

<template>
  <view class="">
    <list-header title="猜你喜欢" tips="查看全部"></list-header>
    <view class="flex align-center">
      <block v-for="(item,index) in Rebooks" :key="index">
        <view class="flex-1 flex flex-column align-center border rounded" @tap="toBookDetail(item.bookId)">
          <image :src="item.cover" mode="widthFix" class="w-100"></image>
          <text class="font my-1 text-light-black">{{item.name}}</text>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
	import listHeader from '@/components/listHeader.vue'
	export default {
	    components: {
			listHeader
	    },
		props: {
			Rebooks: {
				type:Array,
				default:()=>[]
				}
		},
		methods: {
		  toBookDetail(bookId) {
		    uni.navigateTo({
		      // url: '/pages/bookDetail/bookDetail?bookId=' + bookId
		      url: `/pages/bookDetail/bookDetail?bookId=${bookId}`
		    });
		  }
		}
		
		
		}
		
</script>

<style>
</style>