<template>
	<div class="list_container">
		<ul v-load-more="loaderMoreMethod" v-if="listArr.length" type="1">
			<div v-for="item in listArr" :key="item.id" class="item_div">
				<img :src="item.imgUrl" class="img">
				<div class="title_status_leavetime_score_div"> 
					<div class="title">{{item.title}}</div>
					<div class="status" v-if="item.status === 0">未开始考试</div>
					<div class="status" v-if="item.status === 1">正在考试</div>
					<div class="status" v-if="item.status === 2">完成考试</div>
					<div v-if="item.status !== 2 " class="leaveTime">剩余时间: {{item.leaveTime}}秒</div>
					<div v-else class="score">得分: {{item.score}}分</div>
				</div>
				<div v-if="item.status === 0 " class="exam_div"  @click.stop="goToExamPage(item.id)"> 开始考试 </div>
				<div v-if="item.status === 1 " class="exam_div" @click.stop="goToExamPage(item.id)"> 继续考试 </div>
			</div>
		</ul> 
		<ul v-else class="animation_opactiy">
			<li class="list_back_li" v-for="item in 10" :key="item">
				<img src="../../images/shopback.svg" class="list_back_svg">
			</li>
		</ul>
		<p v-if="touchend" class="empty_data">没有更多了</p>
		<aside class="return_top" @click="backTop" v-if="showBackStatus">
			<svg class="back_top_svg">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
			</svg>
		</aside>
		<div ref="abc" style="background-color: red;"></div>
		<transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition>
	</div>
</template>

<script>

import {mapState} from 'vuex'
import {getExamList} from 'src/service/exam'
import {showBack, animate} from 'src/config/mUtils'
import {loadMore} from './mixin'
import loading from './loading'

export default {
	data(){
		return {
			offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
			listArr:[], // 租房列表数据
			preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
			showBackStatus: false, //显示返回顶部按钮
			showLoading: true, //显示加载动画
			touchend: false, //没有更多数据
		}
	},
	mounted(){
		this.initData();
	},
	components: {
		loading,
	},
	// props: ['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect'],
	mixins: [loadMore],
	computed: {
		...mapState([
		]),
	},
	updated(){
		// console.log(this.supportIds, this.sortByType)
	},
	methods: {
		async initData(){
			//获取数据
			// let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
			let res = await getExamList('123' ,this.offset);
			this.listArr = [...res];
			console.log(res.length)
			if (res.length < 20) {
				this.touchend = true;
			}
			this.hideLoading();
			console.log(this.preventRepeatReuqest)
			//开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
			showBack(status => {
				this.showBackStatus = status;
			});
		},
		//到达底部加载更多数据
		async loaderMoreMethod(){
			console.log('**************************loderMoreMethod------------------')
			console.log(this.offset)
			if (this.touchend) {
				console.log('*************************endTouch')
				return
			}
			//防止重复请求
			if (this.preventRepeatReuqest) {
				console.log('*************************preventRepeatReuqest')
				return 
			}
			this.showLoading = true;
			this.preventRepeatReuqest = true;

			//数据的定位加20位
			console.log('old offset:' + this.offset)
			this.offset = this.offset + 20;
			console.log('new offset:' + this.offset)
			// let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
			let res = await getExamList('123' ,this.offset);
			console.log(res)
			this.hideLoading();
			this.listArr = [...this.listArr, ...res];
			//当获取数据小于20，说明没有更多数据，不需要再次请求数据
			if (res.length < 20) {
				this.touchend = true;
				return
			}
			this.preventRepeatReuqest = false;
		},
		//返回顶部
		backTop(){
			animate(document.body, {scrollTop: '0'}, 400,'ease-out');
		},
		//开发环境与编译环境loading隐藏方式不同
		hideLoading(){
			this.showLoading = false;
		},

		goToExamPage(id) {
			console.log("goToExamPage" + id);
        	this.$router.push('/exam/' + id );
		}
	},
	watch: {
	}
}
</script>

<style lang="scss" scoped>
	@import 'src/style/mixin';
	.list_container{
		background-color: #fff;
		.item_div {
			display: flex;
			border-bottom: 0.025rem solid #f1f1f1;
			padding: 0.7rem 0.4rem;
			.img{
				@include wh(2.5em, 2.5rem);
			} 
			.title_status_leavetime_score_div{
				margin-left: 0.5rem;
				@include wh(10.5rem, 2.5rem);
				.title{
					@include sc(0.8rem, black)
				} 
				.status{
					margin-top: 0.1rem;
					@include sc(0.4rem, gray)
				} 
				.leaveTime{
					margin-top: 0.1rem;
					@include sc(0.4rem, gray)
				} 
				.score{
					margin-top: 0.1rem;
					@include sc(0.4rem, gray)
				}
			}   
			.exam_div{
				@include wh(2.5rem, 2.5rem);
				line-height: 2.5rem;
				@include sc(0.5rem, gray)
			}
		} 
	}
	.list_back_li{
		height: 4.85rem;
		.list_back_svg{
			@include wh(100%, 100%)
		}
	}
	.loader_more{
		@include font(0.6rem, 3);
		text-align: center;
	    color: #999;
	}
	.empty_data{
		@include sc(0.5rem, #666);
		text-align: center;
		line-height: 2rem;
	}
	.return_top{
		position: fixed;
		bottom: 3rem;
		right: 1rem;
		.back_top_svg{
			@include wh(2rem, 2rem);
		}
	}
	.loading-enter-active, .loading-leave-active {
		transition: opacity 1s
	}
	.loading-enter, .loading-leave-active {
		opacity: 0
	}
</style>