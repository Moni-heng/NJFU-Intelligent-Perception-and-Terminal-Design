<template>
	<view class="">
		<view :style="{height: `${$statusBarHeight}`}" class="cal"></view>
		<view class="bg-white shadow fixed-top animated slideInDown" :style="{top:`${statusBarHeight}px`}"  v-show="setStatus">
			<view class="flex align-center" style="height: 80rpx;">
				<my-icon iconId="icon-jiantou-copy" class="px-2" @tap="quit"></my-icon>
				<text class="font">{{bookName}}</text>
				<text class="flex-1 px-2 font-sm text-ellipsis">章节：{{chapterContent.title}}</text>
			</view>
		</view>
	</view>
	<view class="fixed-bottom flex font align-center bg-white shadow" style="height: 200rpx;" v-show="setStatus">
		<view class="flex flex-column align-center flex-1" @tap="changeCatalogStatus(true)">
			<my-icon iconId="icon-xueyuan-mulu" iconSize="55rpx"></my-icon>
			<view class="" >目录</view>
		</view>
		<view class="flex flex-column align-center flex-1" @tap="setIsNight">
			<my-icon iconId="icon-yanjing" iconSize="55rpx"></my-icon>
			<view class="">夜间模式</view>
		</view>
	    <view class="flex flex-column align-center flex-1" @tap="changeTypeFaceStatus(true)">
		   <my-icon iconId="icon-ziti1" iconSize="55rpx"></my-icon>
		   
		    <view class="">字体</view>
	    </view>
		<view class="flex flex-column align-center flex-1" @tap="changeMoreStatus(true)">
			<my-icon iconId="icon-diqiuhuanqiu" iconSize="55rpx"></my-icon>
			<view class="">更多</view>
		</view>
	</view>
		<swiper :class="currentTheme" current="current" @change="onSwiperChange" class="swiper px-2" circular style="height: 2000rpx;" :style="{height:`${calHeight}rpx`,fontSize:`${myFontSize}px`,lineHeight:`${myLineHeight}px`}" @tap="changeSetStatus">
		<swiper-item v-for="(item,index) in chapterCatalog" :key="item.id">
			<scroll-view scroll-y="true" :style="{height:`${calHeight}rpx`}">
				<uni-load-more status="loading" v-show="chapterContent.text==''"></uni-load-more>
				<rich-text :nodes="chapterContent.text"></rich-text>
			</scroll-view>
		</swiper-item>
	</swiper>
	<uni-drawer :visible="catalogStatus" @close="changeCatalogStatus(false)">
		<view :style="{height: `${statusBarHeight}px`}"></view>
		<view class="flex align-center justify-center" style="height: 80rpx;" >目&emsp;录</view>
		<scroll-view scroll-y="true" :style="{height:`${calHeight-80}rpx`}">
			<block v-for="(item,index) in chapterCatalog" :key="item.id">
				<view class="font-sm text-ellipsis py-2 px-1 border-bottom rounded" :class="index==current?'curChapter':''" @tap="toPointChapter(index)">
					{{item.title}}
				</view>
			</block>
		</scroll-view>
	</uni-drawer>
	<view class="fixed-bottom bg-white shadow px-3 pt-3 flex flex-column justify-center" style="height: 160rpx;" v-show="typeFaceStatus"> 
		<view class="flex flex-1 font">
			字体：<slider class="flex-1" :value="myFontSize" min="10" max="35" block-size="16" active-color="#34495E" show-value backgroundColor="#ECF1F0" @change="changeFontSize" @changing="changeFontSize" />
		</view>
		<view class="flex flex-1 font">
			间距：<slider class="flex-1" :value="myLineHeight" min="20" max="50" block-size="16" active-color="#34495E" show-value backgroundColor="#ECF1F0" @change="changeLineHeight" @changing="changeLineHeight" />
		</view>
	</view>

	
	<view class="fixed-bottom bg-white shadow px-3 pt-4" style="height: 140rpx;" v-show="moreStatus">
		<view class="flex font text-light-black" style="justify-content: space-between;">
			<block v-for="(item,index) in themes" :key="item.id">
				<view class="flex-1" @tap="changeThemeIndex(index)">
					<view :class="item.id" class="border rounded mx-2" style="height: 50rpx;"></view>
					<view class="text-center mt-1 font-sm">{{item.name}}</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import unit from '@/common/unit'
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	export default {
		components: {
			unit,
			uniDrawer,
			uniLoadMore
		},
		data(){
			return {
				statusBarHeight: this.$statusBarHeight,
				chapterCatalog: [],
			    chapterContent: {
				bookId: 1,
				bookName: '',
				catalogId: 1,
				title: '',
				text: ''
			    },
			current: 0,
			calHeight: 0,
			catalogStatus: false,
			setStatus: false,
			typeFaceStatus: false,
			myFontSize: uni.getStorageSync('myFontSize') || 15,
			myLineHeight: uni.getStorageSync('myLineHeight') || 35,
			moreStatus: false,
			themeIndex: uni.getStorageSync('themeIndex') || 4,
			themes:[{
				id:'lightGreyTheme',
				name: '浅灰'
			},
			{
				id:'eyeHelpTheme',
				name: '护眼'
			},
			{
				id:'thinInkTheme',
				name: '薄墨'
			},
			{
				id:'nightTheme',
				name: '夜间'
			},
			{
				id:'morningTheme',
				name: '白天'
			}
			],
			}
			
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
			currentTheme(){
				return this.themes[this.themeIndex].id
			}
		},
		methods: {
			quit(){
				console.log('quit')
				uni.navigateBack({
					delta: 1
				})
			},
			getCatalogListByBookId(bookId) {
				this.$http.get("/ChapterCatalog/" + bookId).then(
				res =>{
					let data = res.data
					this.chapterCatalog = data
					console.log('this.chapterCatalog-> ', this.chapterCatalog)
					let current = this.chapterCatalog.findIndex(item => item.id == this.catalogId)
					this.current = current
				}
				)
			},
			 getChapterContent(bookId, catalogId) {
			 	this.chapterContent.text = ''
			 	setTimeout(()=>{
				console.log(1000)
			 		this.$http.get("/ChapterContent/content/" + bookId + "/" + catalogId).then(res=>{
					let data = res.data
					//console.log(data)
			 		this.chapterContent = data
			 	})
			 	},500)
				
			},
			onSwiperChange(event) {
				//console.log("event.detail.current-> ", event.detail.current)
				let current = event.detail.current
				this.current = current
				let catalogId = this.chapterCatalog[current].id
				this.getChapterContent(this.bookId, catalogId)
			},
			changeCatalogStatus(status){
				this.catalogStatus = status
				if(this.catalogStatus){
					this.setStatus = false
				}
			},
			toPointChapter(index){
				this.current = index
				 this.getChapterContent(this.bookId, this.chapterCatalog[index].id);
			},
			changeSetStatus(){
				if(this.typeFaceStatus){
					this.typeFaceStatus =false
					return
				}
				this.setStatus = !this.setStatus
			},
			changeFontSize(event) {
				this.myFontSize = event.detail.value
				uni.setStorageSync('myFontSize', this.myFontSize)
			},
			changeLineHeight(event) {
				this.myLineHeight = event.detail.value
				uni.setStorageSync('myLineHeight', this.myLineHeight)
			},
			changeTypeFaceStatus(state){
				this.typeFaceStatus = state
				if(this.typeFaceStatus){
					this.setStatus = false
				}
			},
			changeMoreStatus(state) {
				this.moreStatus = state
				if(this.setStatus){
					this.setStatus = false
				}
			},
			changeSetStatus(){
				if(this.typeFaceStatus || this.moreStatus){
					this.typeFaceStatus = false
					this.moreStatus = false
					return
				}
				this.setStatus = !this.setStatus
			},
			changeThemeIndex(index){
				this.themeIndex = index
				console.log('this.themeIndex-> ', this.themeIndex)
				uni.setStorageSync('themeIndex' ,this.themeIndex)
			},
			setIsNight(){
				if(this.themeIndex == 3) {
					this.changeThemeIndex(4)
				}else{
					this.changeThemeIndex(3)
				}
			},
		},
		onLoad() {
			this.getCatalogListByBookId(this.bookId)
			this.getChapterContent(this.bookId, this.catalogId)
		},
		created() {
			let calHeight = uni.getSystemInfoSync().windowHeight - this.statusBarHeight
			this.calHeight = unit.Torpx(calHeight)
		},
		
		
	}
</script>

<style>
	.fixed-top-local {
		position: fixed;
		right: 0;
		left: 0;
		z-index: 1030;
	}
</style>