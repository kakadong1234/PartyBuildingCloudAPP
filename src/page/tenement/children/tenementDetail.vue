<template>
    <div class='container'> 
       <head-top head-title="租房详情" go-back='true'></head-top>
        <section class="swiper_slides_section" v-if="swiperSlides.length">
            <swiper :options="swiperOption" class="mySwiper">
                <swiper-slide v-for="slide in swiperSlides" :key="slide.index" class="mySwiperSlider">
                    <img :src="slide.imgUrl" class="swiperImg">
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </section> 
        <section class="detail_info_section">
            <div class="title_div"> {{tenementDetail.title}}</div>
            <div class="address_div"> 地址: {{tenementDetail.address}}</div>
            <div class="rent_month_div"> 月租金: {{tenementDetail.rentForMonth}}</div>
            <section class="landlord_section">
                <div class="name_div" @click="showDetailLandlordInfo"> 房东: {{tenementDetail.landlord.name}}</div>
            </section>
            <div class="des_div"> {{tenementDetail.des}}</div>
        </section>
        <section class="charge_container">
            <div class="myorder-div" @click="goToBillPage">
                <span>生活缴费</span>
                    <span class="myorder-divsvg">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                </span>
            </div>
            <div class="myorder-div" @click="goToDegreePage"> 
                <span>水电表</span>
                    <span class="myorder-divsvg">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                </span>
            </div>
        </section>
        <div class="add_bill_cotntainer_heigh">
        </div>
    </div>
</template>

<script>
import headTop from "../../../components/header/head";
import footGuide from "src/components/footer/lfootGuide";
import {
  getTenemnetDetail,
  ddConfig,
  getDdUserID
} from "../../../service/getData";
import "../../../plugins/dingtalk.min.js";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  data() {
    return {
      tenementDetail: {
        landlord: {},
        renter: {}
      },
      swiperOption: {
        autoplay: {
          stopOnLastSlide: false
        },
        pagination: {
          el: ".swiper-pagination"
        }
      },
      swiperSlides: [],
      tenementID: this.$route.params.tenementID
    };
  },

  mounted() {
    //TODO: 获取 appList
    getTenemnetDetail(this.tenementID).then(res => {
      this.tenementDetail = res;
      this.swiperSlides = res.imgURLList.map(function(imgURL, index) {
        return {
          index,
          imgUrl: imgURL
        };
      });
    });
    //开始钉钉相关设置
    this.startDD();
  },

  components: {
    headTop,
    swiper,
    swiperSlide,
    footGuide
  },

  computed: {},

  methods: {
    //点击图标刷新页面
    reload() {
      window.location.reload();
    },

    startDD() {
      console.log("--startDD");
      ddConfig().then(config => {
        console.log(config);
        config.jsApiList = [
          "runtime.info",
          "biz.user.get",
          "biz.contact.choose",
          "biz.telephone.call",
          "biz.ding.post"
        ];
        console.log(location.href);
        dd.config(config);
        dd.error(function(err) {
          alert(
            "href is " + location.href + ", dd error: " + JSON.stringify(err)
          );
        });
        console.log("start ready");
        dd.ready(function() {
          alert("--dd requestAuthCode");
          console.log("--dd requestAuthCode");
          dd.runtime.permission.requestAuthCode({
            corpId: config.corpid,
            onSuccess: function(result) {
              alert("--success result is " + JSON.stringify(result));
              console.log("--success");
              console.log(result);
              const code = result.code;
              //get userID by code
              getDdUserID(code).then(res => {
                console.log(res);
              });
            },
            onFail: function(err) {
              console.log("--fail");
              //TODO: fail 处理
              console.log(err);
            }
          });
        });
      });
    },

    showDetailLandlordInfo() {
      console.log("showDetailLandlordInfo");
      //TODO:  弹框
    },

    goToBillPage() {
        console.log("goToBillPage" + this.tenementID);
        this.$router.push('/tenement/' + this.tenementID + '/billTotal' );
    },

    goToDegreePage() {
        console.log("goToDegreePage");
        this.$router.push('/tenement/' + this.tenementID + '/degree' );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../style/mixin";
.head_logo {
  left: 0.4rem;
  font-weight: 400;
  @include sc(0.7rem, #fff);
  @include wh(2.3rem, 0.7rem);
  @include ct;
}
.mySwiper {
  width: 90%;
  padding-top: 2.35rem;
  border-top: 1px solid $bc;
  background-color: #fff;
  margin-bottom: 0.4rem;
  .mySwiperSlider {
    width: 100%;
    height: 250px;
    .swiperImg {
      width: 100%;
      height: 100%;
    }
  }
  // .swiper-pagination {
  //     height: 5%;
  // }
}
.detail_info_section {
  margin-top: 1.5rem;
  margin-left: 0.4rem;
  margin-right: 0.4rem;
  // @include fj;
  // align-items: center;
  .title_div {
    padding-top: 0.01rem;
    @include sc(1.2rem, black);
    font-weight: 200;
  }
  .address_div {
    margin-top: 0.15rem;
    padding-top: 0.01rem;
    @include sc(0.8rem, black);
  }
  .rent_month_div {
    margin-top: 0.15rem;
    padding-top: 0.01rem;
    @include sc(0.8rem, black);
  }
  .landlord_section {
    margin-top: 0.15rem;
    padding-top: 0.01rem;
    .name_div {
      @include sc(0.8rem, blue);
    }
  }
  .des_div {
    margin-top: 0.15rem;
    color: #333;
    padding-top: 0.01rem;
    @include sc(0.8rem, black);
  }
}
.charge_container{
    margin-top:.8rem;
    margin-left: 0.4rem;
    margin-right: 0.4rem;
    background:$fc; 
    .myorder-div{
        padding-left:1.6rem;
        display:flex;
        width:100%;
        border-bottom:1px solid #f1f1f1;
        padding:.433333rem .266667rem .433333rem 0;
        @include sc(.7rem,#333);
        justify-content:space-between;
        span{
            display:block;
        }
        .myorder-divsvg{
            @include wh(.46667rem,.466667rem);
            svg{
                @include wh(100%,100%);
            }
        }
    }
}
.add_bill_cotntainer_heigh{
    height: 1rem;
}
// .city_nav{
//     padding-top: 2.35rem;
//     border-top: 1px solid $bc;
//     background-color: #fff;
//     margin-bottom: 0.4rem;
//     .city_tip{
//         @include fj;
//         line-height: 1.45rem;
//         padding: 0 0.45rem;
//         span:nth-of-type(1){
//             @include sc(0.55rem, #666);
//         }
//         span:nth-of-type(2){
//             font-weight: 900;
//             @include sc(0.475rem, #9f9f9f);
//         }

//     }
//     .guess_city{
//         @include fj;
//         align-items: center;
//         height: 1.8rem;
//         padding: 0 0.45rem;
//         border-top: 1px solid $bc;
//         border-bottom: 2px solid $bc;
//         @include font(0.75rem, 1.8rem);
//         span:nth-of-type(1){
//             color: $blue;
//         }
//         .arrow_right{
//             @include wh(.6rem, .6rem);
//             fill: #999;
//         }
//     }
// }
// #hot_city_container{
//     background-color: #fff;
//     margin-bottom: 0.4rem;
// }
// .citylistul{
//     li{
//         float: left;
//         text-align: center;
//         color: $blue;
//         border-bottom: 0.025rem solid $bc;
//         border-right: 0.025rem solid $bc;
//         @include wh(25%, 1.75rem);
//         @include font(0.6rem, 1.75rem);
//     }
//     li:nth-of-type(4n){
//         border-right: none;
//     }
// }
// .city_title{
//     color: #666;
//     font-weight: 400;
//     text-indent: 0.45rem;
//     border-top: 2px solid $bc;
//     border-bottom: 1px solid $bc;
//     @include font(0.55rem, 1.45rem, "Helvetica Neue");
//     span{
//         @include sc(0.475rem, #999);
//     }
// }

// .letter_classify_li{
//     margin-bottom: 0.4rem;
//     background-color: #fff;
//     border-bottom: 1px solid $bc;
//     .groupcity_name_container{
//         li{
//             color: #666;
//         }
//     }
// }
</style>
