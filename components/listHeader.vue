<template>
    <view class="flex align-center justify-between p-2 my-1">
	<view class="frot-md">{{title}}</view>
    <view class="flex align-center">
      <text class="font text-light-black">{{tips}}</text>
      <my-icon iconId="icon-iconfonti"></my-icon>
    </view>
</view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '猜你喜欢'
    },
    tips: {
      type: String,
      default: '查看全部'
    }
  }
}
</script>