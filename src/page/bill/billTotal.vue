<template>
    <div class="profile_page">
        <head-top go-back='true' head-title="生活缴费">
        </head-top>
        <section class="charge_container">
            <div class="bill-div" v-for="billType in Object.keys(bill)" tag='li' :key="billType.ID" @click="goToBillListPage(billType)">
                <img :src="showConfig[billType].billImgUrl" class="bill_type_img"> 
                <span class="bill_momeny_span">
                    <div class="bill_type_div">{{showConfig[billType].billTitle}}</div>
                    <div class="bill_number_div">未缴费账单数 :{{bill[billType].length}}</div>
                    <div class="bill_momeny_div">总计:¥{{getBillTotalCost(bill[billType])}}</div>
                </span>
                <img v-if="!showConfig[billType].isAddToPayment" class='add_remove_img' src="../../images/add.png" @click.stop="addOrRemoveBillList(billType)">
                <img v-else class='add_remove_img' src="../../images/remove.png" @click.stop="addOrRemoveBillList(billType)">
            </div>
        </section>
        <section class="bill_container">
            <div class="bill_num">总计:¥{{totalCost}}</div>
            <div class="bill_title" @click="goToCreateOrderPage"> 去缴费 </div>
        </section>
        
    </div>
</template>

<script>
import headTop from 'src/components/header/head'
import {mapState, mapMutations} from 'vuex'
import {getBillList} from 'src/service/getData'
import rentPng from '../../images/rent.png'
import waterChargePng from '../../images/waterCharge.png'
import elChargePng from '../../images/elCharge.png'
export default {
    data(){
        return{
            hasGetData: true,
            showConfig: {
                rent: {
                    isAddToPayment: false,
                    billTitle: '房租',
                    billImgUrl: rentPng
                },
                water: {
                    isAddToPayment: false,
                    billTitle: '水费',
                    billImgUrl: waterChargePng
                },
                electric: {
                    isAddToPayment: false,
                    billTitle: '电费',
                    billImgUrl: elChargePng
                }
            },
            bill: {
                rent: [

                ],
                electric: [

                ],
                water: [

                ]
            },
            tenementID: '',
            user_id:'',
            totalCost: 0
        }
    },
    mounted(){
        this.tenementID = this.$route.params.tenementID
        this.user_id = '123'
        this.initData();
    },
    mixins: [],
    components:{
        headTop 
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
                    return bill.type === 'rent' && bill.status === '未缴费'
                })
                this.bill.electric = billList.filter(function(bill) {
                    return bill.type === 'electric'&& bill.status === '未缴费'
                })
                this.bill.water = billList.filter(function(bill) {
                    return bill.type === 'water'&& bill.status === '未缴费'
                })
            // }else{
               
            // }
        },
        getBillTotalCost(billArr){
            let totalCost = 0
            billArr.map(function(bill){
                totalCost = bill.cost  + totalCost
            })
            return totalCost
        },
        goToBillListPage(type){
            console.log("goToBillListPage")
            console.log(type)
            this.$router.push('/tenement/' + this.tenementID + '/bill')
        },
        goToCreateOrderPage(){
            console.log("goToCreateOrderPage")
            if(this.totalCost > 0) {
                let goodList = []
                if(this.showConfig.rent.isAddToPayment) {
                    goodList = goodList.concat(this.bill.rent)
                }
                if(this.showConfig.electric.isAddToPayment) {
                    goodList = goodList.concat(this.bill.electric)
                }
                if(this.showConfig.water.isAddToPayment) {
                    goodList = goodList.concat(this.bill.water)
                }
                console.log(goodList)
                this.$router.push('/myconfirmOrder')
            }
        },
        addOrRemoveBillList(type){
            console.log("addOrRemoveBillList")
            console.log(type)
            if(!this.showConfig[type].isAddToPayment) {
                this.totalCost = this.totalCost + this.getBillTotalCost(this.bill[type])
            }
            else {
                this.totalCost = this.totalCost - this.getBillTotalCost(this.bill[type])
            }
            this.showConfig[type].isAddToPayment = !this.showConfig[type].isAddToPayment 
        }
    },
    watch: {
    }
}

</script>

<style lang="scss" scoped>
   @import 'src/style/mixin';
   .charge_container{
    margin-top:3.0rem;
    margin-left: 0.4rem;
    margin-right: 0.4rem;
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
        .add_remove_img{
            margin-top:1rem;
            margin-right:0.5rem;
            @include wh(1.5rem,1.5rem);
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
