<template>
	<div class="list_container">
		<ul v-if="billListArr.length">
			<section class="charge_container">
            <div class="bill-div" v-for="item in billListArr" tag='li' :key="item.ID">
                <img src="../../images/bill.png" class="bill_type_img"> 
                <span class="bill_momeny_span">
                    <div class="bill_type_div">编号: {{item.ID}}</div>
                    <div class="bill_number_div"> 账单期:{{item.actionForBill.startDate}} ~ {{item.actionForBill.endDate}}</div>
					<div class="bill_number_div"> 付款截止时间:{{item.paymentDeadline}} </div>
                    <div class="bill_momeny_div">账单费用: ¥{{item.cost}}</div>
                </span>
				<span class="tenement_detail_ul">
					<span class="payStatus">{{item.status }}</span>
					<img v-if="!item.isAddToPayment" class='add_remove_img' src="../../images/add.png" @click.stop="addOrRemoveBillList(item)">
                	<img v-else class='add_remove_img' src="../../images/remove.png" @click.stop="addOrRemoveBillList(item)">
				</span>
            </div>
        </section>
			<!-- <div v-for="item in billListArr" tag='li' :key="item.ID" class="tenement_li" @click="goToDetailPage(item.ID)">
				<section>
					<img src="../../images/bill.png" class="tenement_img">
				</section>
				<hgroup class="tenement_right">
					<header class="tenement_detail_header">
						<h4 class="tenement_title">{{item.title}}</h4>
						<div class="tenement_detail_ul">
							<span class="payStatus">{{item.lease.payStatus}}</span>
						</div>
					</header>
					<section class="fee_address">
						<span class="fee">租金: ¥ {{item.rentForMonth}}</span>
					</section>
					<section class="fee_address">
						<span class="address">地址: {{item.address}}</span>
					</section>
				</hgroup>
			</div> -->
		</ul>
		<ul v-else class="animation_opactiy">
			<div class='no_bill'>没有账单</div>
		</ul>
		<!-- <p v-if="touchend" class="empty_data">没有更多了</p> -->
		<!-- <aside class="return_top" @click="backTop" v-if="showBackStatus">
			<svg class="back_top_svg">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
			</svg>
		</aside>
		<div ref="abc" style="background-color: red;"></div>
		<transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition> -->
	</div>
</template>

<script>

import {mapState} from 'vuex'
import {getBillList} from 'src/service/getData'
import {showBack, animate} from 'src/config/mUtils'

export default {
	data(){
		return {
			billListArr:[], // 租房列表数据
			preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
			showBackStatus: false, //显示返回顶部按钮
			showLoading: true, //显示加载动画
			// touchend: false, //没有更多数据
		}
	},
	mounted(){
		this.initData();
	},
	components: {
	},
	mixins: [],
	computed: {
		...mapState([
		]),
	},
	methods: {
		async initData(){
			//获取数据
			let res = await getBillList('123');
			res.map(function(bill) {
				bill.isAddToPayment = false
				return bill
			})
			this.billListArr = [...res];
			this.hideLoading();
			console.log(this.preventRepeatReuqest)
			//开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
			showBack(status => {
				this.showBackStatus = status;
			});
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
        	this.$router.push('/lorder/' + id );
		},

		addOrRemoveBillList(item){
			console.log("addOrRemoveBillList")
			this.$emit('bill-for-order', item)
			item.isAddToPayment = !item.isAddToPayment
            this.billListArr = this.billListArr.map(function(bill){
				if(bill.ID === item.ID) {
					return item
				}
				return bill
			})
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
		margin-bottom: 2rem;
		.charge_container{
    	background:$fc; 
    	.bill-div{
        display:flex;
        border-bottom:1px solid #f1f1f1;
        justify-content:space-between;
        .bill_type_img{
            margin-top:0.2rem;
            @include wh(2.8rem,2.8rem);
        }
        .bill_momeny_span{
            margin-top:0.4rem;
            width: 100rem;
            .bill_type_div{
                height: 1rem;
                @include sc(0.8rem,#333);
            }
            .bill_number_div{
             margin-top:0.2rem;
             height: 0.5rem;
             @include sc(.4rem,#333);
            }
            .bill_momeny_div {
                margin-top:0.2rem;
                height: 0.5rem;
                @include sc(.4rem,#333);
            }
		}
		.tenement_detail_ul{
			transform: scale(.8);
			margin-right: -0.3rem;
			.payStatus{
				@include sc(0.5rem, #999);
				border: 0.025rem solid #f1f1f1;
				padding: 0 0.04rem;
				border-radius: 0.08rem;
				margin-left: 0.05rem;
			}
			.add_remove_img{
            	margin-top:1rem;
            	margin-right:0.5rem;
            	@include wh(1.5rem,1.5rem);
        	}
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