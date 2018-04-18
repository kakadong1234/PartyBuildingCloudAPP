<template>
    <div class="profile_page">
        <head-top go-back='true' head-title="账单"></head-top>
        <div class="bill_list_container" >
	    	<header class="bill_header">
                <img class='bill_icon' src="../../images/rent.png">
	    		<span class="bill_header_title">房租</span>
	    	</header>
	        <bill-list @bill-for-order="changeAllBillNumber"></bill-list >
    	</div>
        <section class="bill_container">
            <div class="bill_num">总计:¥{{totalCost}}</div>
            <div class="bill_title" @click="goToCreateOrderPage"> 去缴费 </div>
        </section>
        
    </div>
</template>

<script>
import headTop from 'src/components/header/head'
import {mapState, mapMutations} from 'vuex'
import billList from 'src/components/common/billList'
import {getBillList} from 'src/service/getData'

export default {
    data(){
        return{
            hasGetData: true,
            totalCost: 0,
            billArr: [],
            tenementID: '',
            user_id:''
        }
    },
    mounted(){
        this.tenementID = this.$route.params.tenementID
        this.user_id = '123'
        this.initData();
    },
    mixins: [],
    components:{
        headTop,
        billList 
    },

    computed:{
        ...mapState([
            'userInfo',
        ])
    },

    methods:{
        ...mapMutations([
            'SAVE_AVANDER'
        ]),
        async initData(){
            console.log('initData')
            console.log(this.userInfo)
            // if (this.userInfo && this.userInfo.user_id) {
                const billList = await getBillList(this.tenementID, this.user_id);
                console.log(billList)
            // }else{
               
            // }
        },
        changeAllBillNumber(item){
            console.log(item)
            if(!item.isAddToPayment) {
                this.totalCost = this.totalCost + item.cost
            }
            else {
                this.totalCost = this.totalCost - item.cost
            }
        },
        goToCreateOrderPage(goodsList){
            console.log("goToCreateOrderPage")
            // this.$router.push('/order' );
        }
    },
    watch: {
    }
}

</script>

<style lang="scss" scoped>
   @import 'src/style/mixin';
   	.bill_list_container{
        margin-top:2.5rem;
        margin-left: 0.4rem;
        margin-right: 0.4rem;
		border-top: 0.025rem solid $bc;
		background-color: #fff;
		.bill_header{
			.bill_icon{
				fill: #999;
				margin-left: 0.6rem;
				vertical-align: middle;
				@include wh(0.6rem, 0.6rem);
			}
			.bill_header_title{
				color: #999;
				@include font(0.55rem, 1.6rem);
			}
		}
	}
    .bill_container{
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    bottom: 0;
    @include wh(100%, 1.95rem);
    display: flex;
    background-color: #3d3d3f;
    .bill_num{
        @include ct;
        left: 0.5rem;
        @include sc(0.5rem, #fff);
    }
    .bill_title{
        @include ct;
        right: 0.3rem;
        @include sc(0.6rem, #fff);
    }
}
</style>
