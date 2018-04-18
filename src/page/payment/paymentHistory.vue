<template>
    <div class="profile_page">
        <head-top go-back='true' head-title="缴费记录"></head-top>
        <div class="shop_list_container" >
	    	<header class="shop_header">
	    		<svg class="shop_icon">
	    			<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
	    		</svg>
	    		<span class="shop_header_title">房租</span>
	    	</header>
	        <!-- <shop-list v-if="hasGetData"></shop-list> -->
    	</div>
        <!-- <section class="charge_container">
            <div class="myorder-div" @click="goToDetailBillPage(123)">
                <span class="bill_type_img_span">
                    <img src="../../images/rent.png" class="bill_type_img"> 
                </span>
                <span class="bill_momeny_span">
                    <div>房租</div>
                    <div class="bill_momeny_div">2张账单,总共¥200</div>
                </span>
                <span class="myorder-divsvg">
                    <svg fill="#bbb">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                </span>
            </div>
            <div class="myorder-div" @click="goToDetailBillPage(123)"> 
                <span class="bill_type_img_span">
                    <img src="../../images/elCharge.png" class="bill_type_img"> 
                </span>
                <span class="bill_momeny_span">
                    <div>电费</div>
                    <div class="bill_momeny_div">2张账单,总共¥100.1</div>
                </span>
                    <span class="myorder-divsvg">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                </span>
            </div>
            <div class="myorder-div" @click="goToDetailBillPage(123)"> 
                <span class="bill_type_img_span">
                    <img src="../../images/waterCharge.png" class="bill_type_img"> 
                </span>
                <span class="bill_momeny_span">
                    <div>水费</div>
                    <div class="bill_momeny_div">1张账单,总共¥20.1</div>
                </span>
                    <span class="myorder-divsvg">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                </span>
            </div>

        </section> -->
        <section class="bill_container">
            <div class="bill_num">共5张账单,应付¥1000.1</div>
            <div class="bill_title" @click="goToCreateOrderPage"> 去缴费 </div>
        </section>
        
    </div>
</template>

<script>
import headTop from 'src/components/header/head'
import {mapState, mapMutations} from 'vuex'
import shopList from 'src/components/common/shoplist'
import {getBillList} from 'src/service/getData'

export default {
    data(){
        return{
            hasGetData: true,
            bill: {
                rent: [

                ],
                electric: [

                ],
                water: [

                ]
            },
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
        shopList 
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
                const billList = await getBillList(this.tenementID, this.user_id, '未缴费');
                console.log(billList)
                this.bill.rent = billList.filter(function(bill) {
                    return bill.type = 'rent'
                })
                this.bill.electric = billList.filter(function(bill) {
                    return bill.type = 'electric'
                })
                this.bill.water = billList.filter(function(bill) {
                    return bill.type = 'water'
                })
            // }else{
               
            // }
        },
        goToDetailBillPage(id){
            console.log("goToDetailBillPage")
            console.log(id)
            // this.$router.push('/bill' );
        },
        goToCreateOrderPage(goodsList){
            console.log("goToCreateOrderPage")
            console.log(goodsList)
            // this.$router.push('/order' );
        }
    },
    watch: {
    }
}

</script>

<style lang="scss" scoped>
   @import 'src/style/mixin';
   	.shop_list_container{
		margin-top: 2.5rem;
		border-top: 0.025rem solid $bc;
		background-color: #fff;
		.shop_header{
			.shop_icon{
				fill: #999;
				margin-left: 0.6rem;
				vertical-align: middle;
				@include wh(0.6rem, 0.6rem);
			}
			.shop_header_title{
				color: #999;
				@include font(0.55rem, 1.6rem);
			}
		}
	}
//    .charge_container{
//     margin-top:3.0rem;
//     margin-left: 0.4rem;
//     margin-right: 0.4rem;
//     background:$fc; 
//     .myorder-div{
//         padding-left:1.6rem;
//         display:flex;
//         @include wh(100%, 3rem);
//         border-bottom:1px solid #f1f1f1;
//         padding:.433333rem .266667rem .433333rem 0;
//         @include sc(.7rem,#333);
//         justify-content:space-between;
//         .bill_type_img_span{
//             @include wh(2rem,2rem);
//             .bill_type_img{
//                 @include wh(100%,100%);
//             }
//         }
//         .bill_momeny_span{
//             margin-top:0.2rem;
//             @include wh(12rem,100%);
//             .bill_momeny_div {
//                 @include sc(.35rem,#333);
//             }
//         }
//         .myorder-divsvg{
//             @include wh(.46667rem,.466667rem);
//             svg{
//                 @include wh(100%,100%);
//             }
//         }
//         }
//     }
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
