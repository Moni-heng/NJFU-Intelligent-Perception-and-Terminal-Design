<template>
  <view :class="Theme">
    <view :style="{height: `${statusBarHeight}px`}"></view>
    <view class="flex align-center" style="height: 60rpx;">
      <my-icon iconId="icon-jiantou-copy" class="mx-2" @tap="quit"></my-icon>
      <view class="font-lg">{{title}}</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      statusBarHeight: this.$statusBarHeight,
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    Theme: {
      type: String,
      default: ''
    }
  },
  methods: {
    quit() {
      uni.navigateBack({
        delta: 1
      })
    }
  }
}
</script>