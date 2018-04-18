<template>
    <div class="profile_page">
        <head-top go-back='true' head-title="水电表"></head-top>
        <section class="charge_container">
            <div class="myorder-div" @click="goToDetailBillPage(123)"> 
                <span class="bill_type_img_span">
                    <img src="../../images/elCharge.png" class="bill_type_img"> 
                </span>
                <span class='bill_momeny_span'>
                    <div>电表度数</div>
                    <div>1009.12度</div>
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
                <span class='bill_momeny_span'>
                    <div>水表度数</div>
                    <div>20.1度</div>
                </span>
                    <span class="myorder-divsvg">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                </span>
            </div>

        </section>
    </div>
</template>

<script>
import headTop from 'src/components/header/head'
import {mapState, mapMutations} from 'vuex'

export default {
    data(){
        return{
        }
    },
    mounted(){
        this.initData();
    },
    mixins: [],
    components:{
        headTop
    },

    computed:{
        ...mapState([
            'userInfo',
        ]),
    },

    methods:{
        ...mapMutations([
            'SAVE_AVANDER'
        ]),
        initData(){
            if (this.userInfo && this.userInfo.user_id) {
    
            }else{
            }
        },
        goToDetailBillPage(id){
            console.log("goToDetailBillPage")
            console.log(id)
            // this.$router.push('/bill' );
    },
    },
    watch: {
        userInfo: function (value){
            this.initData()
        }
    },
}

</script>

<style lang="scss" scoped>
   @import 'src/style/mixin';
   .charge_container{
    margin-top:3.0rem;
    margin-left: 0.4rem;
    margin-right: 0.4rem;
    background:$fc; 
    .myorder-div{
        padding-left:1.6rem;
        display:flex;
        @include wh(100%, 3rem);
        border-bottom:1px solid #f1f1f1;
        padding:.433333rem .266667rem .433333rem 0;
        @include sc(.7rem,#333);
        justify-content:space-between;
        .bill_type_img_span{
            @include wh(2rem,2rem);
            .bill_type_img{
                @include wh(100%,100%);
            }
        }
        .bill_momeny_span{
            margin-top:0.2rem;
            @include wh(12rem,100%);
        }
        .myorder-divsvg{
            @include wh(.46667rem,.466667rem);
            svg{
                @include wh(100%,100%);
            }
        }
    }
    }
</style>
