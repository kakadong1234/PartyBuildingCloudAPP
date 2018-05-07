<template>
	<div class="list_container">
		<div v-if="listArr.length">
			<div class="list_header_div"> 
				<div class="list_title_div"> 他山之玉 </div>
					<div class="more_div" @click.stop="goToAllList">
						<div class="more_txt_div"> 更多 </div>
						<img class="more_img" src="../../images/more.png">
				</div>
			</div>
			<div v-for="item in listArr" :key="item.id" class="item_div" @click.stop="goToDetailPage(item.id)">
				<div class="img_date_div">
					<img :src="item.imgUrl" class="img">
					<div class="date">日期: 2018-03-22</div>
				</div>
					<div class="title_status_leavetime_score_div"> 
						<div class="title">{{item.title}}</div>
						<div class="status" v-if="item.status === 0">未开始考试</div>
						<div class="status" v-if="item.status === 1">正在考试</div>
						<div class="status" v-if="item.status === 2">完成考试</div>
						<div v-if="item.status !== 2 " class="leaveTime">剩余时间: {{item.leaveTime}}秒</div>
						<div v-else class="score">得分: {{item.score}}分</div>
					</div>
			</div>
		</div>
		<div ref="abc" style="background-color: red;"></div>
		<transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition>
	</div>
</template>

<script>

import {mapState} from 'vuex'
import {getExamList} from 'src/service/exam'
import loading from './loading'

export default {
	data(){
		return {
			listArr:[], // 租房列表数据
			showLoading: true, //显示加载动画
		}
	},
	mounted(){
		this.initData();
	},
	components: {
		loading,
	},
	props: ['limit'],
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
			console.log('ababadbabababababfs')
			let res = await getExamList('123' ,0);
			this.listArr = [...res];
			if(this.limit){
				this.listArr = this.listArr.slice(0, this.limit)
			}
			console.log(res.length)
			this.hideLoading();
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
		.list_header_div{
		padding-left: 0.2rem;
		padding-right: 0.4rem;
		display: flex;	
		height: 1rem;
		.list_title_div{
			@include sc(0.6rem, #666);
			@include wh(12rem, 1rem);
			line-height: 1rem;
		}  
		.more_div{  
			display: flex;	
			.more_txt_div{
				@include sc(0.4rem, #666);
				@include wh(3rem, 1rem);
				line-height: 1rem;
				text-align: right
			}
			.more_img{
				margin-top: 0.2rem;
				@include wh(0.6rem, 0.6rem);
			}
		}
	} 
		.item_div {
			display: flex;
			border-bottom: 0.025rem solid #f1f1f1;
			padding: 0.7rem 0.4rem;
			.img_date_div{
				.img{
					@include wh(5rem, 2.5rem);
				} 
				.date{
					@include wh(5rem, 1rem);
					@include sc(0.4rem, gray);
					text-align: center
				}
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