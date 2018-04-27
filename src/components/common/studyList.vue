<template>
	<div class="list_container">
		<ul v-load-more="loaderMoreMethod" v-if="studyListArr.length" type="1">
			<div v-for="index in getNumberList()" tag='li' :key="index" class="table_div">
			<div v-for="item in getRowList(index)" tag='li' :key="item.ID" class="row_div">
				<section class='card_section' @click="goToDetailPage(item.ID)">
					<img :src="item.imgUrl" class="img">
					<h4 class="title">{{item.title}}</h4>
				</section>
			</div>
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
import {getStudyList} from '../../service/study'
import {showBack, animate} from 'src/config/mUtils'
import {loadMore} from './mixin'
import loading from './loading'

export default {
	data(){
		return {
			offset: 0, // 批次加载店铺列表，每次加载10个 limit = 10
			studyListArr:[], // 租房列表数据
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
			let res = await getStudyList('123', this.offset);
			this.studyListArr = [...res];
			console.log(res.length)
			if (res.length < 10) {
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

			//数据的定位加10位
			console.log('old offset:' + this.offset)
			this.offset = this.offset + 10;
			console.log('new offset:' + this.offset)
			let res = await getStudyList('123' ,this.offset);
			console.log(res)
			this.hideLoading();
			this.studyListArr = [...this.studyListArr, ...res];
			//当获取数据小于10，说明没有更多数据，不需要再次请求数据
			if (res.length < 10) {
				this.touchend = true;
				return
			}
			this.preventRepeatReuqest = false;
		},

		getNumberList(){
			const numberList = [];
			for(let i=0;i<this.studyListArr.length / 2;i++){
				numberList.push(i)
			}
			console.log(numberList)
			return numberList
		},
		getRowList(index){
			console.log(index)
			const rowList = []
			rowList.push(this.studyListArr[index*2])
			const currentIndex = index * 2 + 1;
			if(currentIndex < this.studyListArr.length) {
				rowList.push(this.studyListArr[index*2+1])
			}
			console.log(rowList)
			return rowList
		},
		//返回顶部
		backTop(){
			animate(document.body, {scrollTop: '0'}, 400,'ease-out');
		},
		//开发环境与编译环境loading隐藏方式不同
		hideLoading(){
			this.showLoading = false;
		},

		goToDetailPage(id) {
			console.log("goToBillPage " + id);
        	this.$router.push('/study/' + id );
		}
	},
	watch: {
	}
}
</script>

<style lang="scss" scoped>
	@import 'src/style/mixin';
	.list_container{
		background-color: white;
		margin-bottom: 2rem;
	}
	.table_div{
		display: flex;	
		padding: 0.4rem;
		.row_div {
			display:flex;
        	// border-bottom:1px solid #f1f1f1;
        	justify-content:space-between;
			.card_section{
				border: 0.075rem solid #f1f1f1;
				@include wh(7.6rem, 7rem);
				.img{
					margin-left: 0.2rem;
					@include wh(7rem, 5rem);
				}
				.title{
					margin-left: 0.2rem;
					@include wh(7.4rem, 0.5rem);
					@include sc(0.4rem, #666);
				}
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