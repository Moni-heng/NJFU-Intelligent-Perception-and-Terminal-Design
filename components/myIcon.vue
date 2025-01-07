<template>
    <text class="iconfont px-1 py-1" :class="[iconId, iconSize]" :style="'font-size:' + iconSize + ';'"></text>
    <!-- :style="'font-size:' + iconSize + ';'" -->
</template>

<script>
	//import myIcon from '@/components/myIcon.vue'
export default {
	// components:{
	// 	myIcon
	// },
    props: {
        iconId: {
            type: String,
            default: ''
        },
        iconSize: {
            type: String,
            default: '45rpx'
        },
        iconColor: {
            type: String,
            default: 'text-light-muted'
        }
    }
}
</script>