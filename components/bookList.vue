<!-- <template>
  <view>
    <block v-for="(book, bindex) in bookListArr" :key="bindex">
      <view class="flex align-center p-1 border-bottom">
        <image :src="book.indexImg" mode="aspectFill" style="width: 250rpx; height: 250rpx;"></image>
        <view calss="flex">
          <view>
            《{{book.name}}》
          </view>
          <view>
            {{book.description}}
          </view>
        </view>
      </view>
    </block>
  </view>
</template> -->

<template>
  <view class="">
    <block v-for="(book, bindex) in bookListArr" :key="bindex">
      <view class="flex p-1 border-bottom" hover-class="bg-light">
        <image :src="book.indexImg" mode="aspectFill" style="width: 250rpx; height: 250rpx;" class="rounded mx-2"></image>
        <view class="flex-1 flex flex-column">
          <view class="font py-2 font-weight-bold">
            《{{book.name}}》
          </view>
          <view style="line-height: 42rpx; font-size: 28rpx;" class="text-light-black">
            {{book.description}}
          </view>
        </view>
      </view>
    </block>
  </view>
</template>


<script>
	export default{
		props:{
			bookListArr:{
				type:Array,
				default:() => []
			}
		}
	}
</script>

<style>
</style>
