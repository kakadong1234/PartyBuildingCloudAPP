<template>
	<div class="list_container">
		<div v-if="list.length">
			<div v-for="item in list" tag='li' :key="item.rank" class="rank_item_div" @click="goToDetailPage(item.memberId)">
				<div class="rank_div"> {{item.rank}} </div>
				<img :src="item.headImgUrl" class="head_img">
				<div class="name_address_div">
					<div class="name_div"> {{item.name}}</div>
					<div class="address_div"> {{item.from}}</div>
				</div>
				<div class="score_div"> {{item.score}}分</div>
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
import {getERankingList} from 'src/service/exam'
import loading from './loading'

export default {
	data(){
		return {
			list:[], // 租房列表数据
			showLoading: true, //显示加载动画
		}
	},
	mounted(){
		this.initData();
	},
	components: {
		loading,
	},
	computed: {
		...mapState([
		]),
	},
	updated(){
	},
	methods: {
		async initData(){
			//获取数据
			this.list = await getERankingList();
			console.log(this.list.length)
			this.hideLoading();
		},
		//开发环境与编译环境loading隐藏方式不同
		hideLoading(){
			this.showLoading = false;
		},

		goToDetailPage(id) {
			console.log("goToDetailPage " + id);
        	// this.$router.push('/tenement/' + id );
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
		.rank_item_div{
			display: flex;
			border-bottom: 0.025rem solid #f1f1f1;
			padding: 0.7rem 0.4rem;
			.rank_div{
				@include wh(1.2rem, 2rem);
				@include sc(0.8rem, gray);
				line-height: 2rem;
				// text-align: center;
			}
			.head_img{
				@include wh(2rem, 2rem);
				border: 0.025rem solid #888888;
        		border-radius: 2rem;
				display: block;
				margin-right: 0.4rem;
			}
			.name_address_div{
				@include sc(0.6rem, gray);
				.name_div{
					@include wh(10rem, 0.9rem);
					line-height: 0.9rem;
					// text-align: center;
				}
				.address_div{
					margin-top: 0.2rem;
					@include wh(10rem, 0.9rem);
					@include sc(0.4rem, gray);
					line-height: 0.9rem;
					// text-align: center;
				}

			}
			.score_div{
				height: 2rem;
				line-height: 2rem;
				@include sc(0.4rem, gray);
			}
		}
	}
	.loading-enter-active, .loading-leave-active {
		transition: opacity 1s
	}
	.loading-enter, .loading-leave-active {
		opacity: 0
	}
</style>