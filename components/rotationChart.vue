<template>
    <view class="m-2">
        <swiper :indicator-dots="true" autoplay circular indicator-active-color="#fff" style="height: 380rpx;" @change="getCurrentImgIndex">
            <swiper-item v-for="(item, index) in imgArr" :key="index">
                <image :src="item.src" mode="aspectFill" class="w-100 animated"></image>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
export default {
    props: {
        imgArr: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            currentImgIndex: 0
        }
    },
    methods: {
        getCurrentImgIndex(e) {
            console.log('e->', e)
            this.currentImgIndex = e.detail.current
        }
    }
}
</script>