<template>
	<div class="list_container">
		<div v-if="studyListArr.length">
			<div class="list_header_div"> 
				<div class="list_title_div"> 学习历史 </div>
				<div class="more_div" @click.stop="goToAllList()">
					<div class="more_txt_div"> 更多 </div>
					<img class="more_img" src="../../images/more.png">
				</div>
			</div>
			<div v-for="index in getNumberList()" tag='li' :key="index" class="table_div">
			<div v-for="item in getRowList(index)" tag='li' :key="item.ID" class="row_div">
				<section class='card_section' @click="goToDetailPage(item.ID)">
					<img :src="item.imgUrl" class="img">
					<h4 class="title">{{item.title}}</h4>
				</section>
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
import {getStudyHistoryList} from '../../service/studyHistory'
import loading from './loading'

export default {
	data(){
		return {
			studyListArr:[], // 租房列表数据
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
			this.studyListArr = await getStudyHistoryList('123', 0);
			console.log('limit is ' + this.limit)
			if(this.limit){
				this.studyListArr = this.studyListArr.slice(0, this.limit)
			}
			console.log(this.studyListArr.length)
			this.hideLoading();
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
		//开发环境与编译环境loading隐藏方式不同
		hideLoading(){
			this.showLoading = false;
		},

		goToDetailPage(id) {
			console.log("goToBillPage " + id);
        	this.$router.push('/study/' + id );
		},

		goToAllList(){
			console.log("goToAllList");
			this.$router.push('/studyHistory');
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
	}
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
	.table_div{
		display: flex;	
		padding-top: 0.1rem;
		padding-left: 0.4rem;
		padding-right: 0.4rem;
		.row_div {
			display:flex;
        	// border-bottom:1px solid #f1f1f1;
        	justify-content:space-between;
			.card_section{
				border: 0.075rem solid #f1f1f1;
				@include wh(7.6rem, 6.6rem);
				.img{
					margin-left: 0.2rem;
					@include wh(7rem, 5rem);
				}
				.title{
					margin-top: 0.1rem;
					margin-left: 0.2rem;
					@include sc(0.4rem, #666);
					@include wh(7.2rem, 0.5rem);
					line-height: 0.5rem;
					overflow: hidden;
					text-overflow: ellipsis; 
					white-space: nowrap;
				}
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