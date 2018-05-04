<template>
    <div class='container'> 
        <head-top head-title="驻村轮站干部管理" nav='true'></head-top> 
        <section class="swiper_slides_section" v-if="swiperSlides.length">
            <swiper :options="swiperOption" class="mySwiper">
                <swiper-slide v-for="slide in swiperSlides" :key="slide.index" class="mySwiperSlider">
                    <img :src="slide.imgUrl" class="swiperImg">
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </section> 
        <section class="app_list_section">
            <a :href="appItem.link" v-for="appItem in appList" :key="appItem.id" class="app">
	            <img :src="appItem.appIcon" class="app_img">
	            <div class="app_name">{{appItem.name}}</div>
	        </a>
        </section>
        <div class='ranking_list_div'>
            <div class="ranking_txt_div"> 排行榜 </div>
            <!-- <ranking-list> </ranking-list> -->
            <tenement-list></tenement-list>
        </div>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import headTop from '../../components/header/head'
import {getAppList, ddConfig, getDdUserID} from '../../service/getData'
import '../../plugins/dingtalk.min.js'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import tenementList from 'src/components/common/tenementList'

export default {
    data(){
        return{
            appList:[],
            swiperOption: {
                autoplay: {
                    stopOnLastSlide: false,
                },
                pagination: {
                    el: '.swiper-pagination'
                }
            },
            swiperSlides: [
                {
                    index: 0,
                    imgUrl:'http://7xrsfo.com1.z0.glb.clouddn.com/xi1.jpg',
                },
                {
                    index: 1,
                    imgUrl:'http://7xrsfo.com1.z0.glb.clouddn.com/xi2.jpg',
                },
                {
                    index: 2,
                    imgUrl:'http://7xrsfo.com1.z0.glb.clouddn.com/xi3.jpg',
                },
                {
                    index: 3,
                    imgUrl:'http://7xrsfo.com1.z0.glb.clouddn.com/xi4.jpg',
                },
                
            ]
        }
    },

	mounted(){
        getAppList().then(res => {
            res.map(function(app){// TODO; corpId 要从缓存中拿
                const corpid = 'ding31148f160c24897635c2f4657eb6378f';
                app.targetUrl = 'dingtalk://dingtalkclient/action/switchtab?index=2&name=work&scene=1&corpid=' + corpid +'agentid=' + app.agentId;
                return app;    
            })
            this.appList = res;
            console.log(this.appList)
          })
        //开始钉钉相关设置
        // this.startDD()
    },

    components:{
        headTop,
        swiper,
        swiperSlide,
        tenementList        
    },

    computed:{
        ...mapState([
            'userInfo',
        ]),
    },

    methods:{
        //点击图标刷新页面
        reload(){
            window.location.reload();
        },

        startDD(){
            console.log('--startDD')
            ddConfig().then(config => {
                console.log(config)
                config.jsApiList = [
                    'runtime.info',
                    'biz.user.get',
                    'biz.contact.choose',
                    'biz.telephone.call',
                    'biz.ding.post'
                ]
                console.log(location.href)
                dd.config(config);
                dd.error(function(err) {
                    alert('href is ' + location.href + ', dd error: ' + JSON.stringify(err));  
                }); 
                console.log('start ready')
                dd.ready(function() {
                    alert('--dd requestAuthCode')
                    console.log('--dd requestAuthCode')
                    dd.runtime.permission.requestAuthCode({
                        corpId: config.corpid,
                        onSuccess: function(result) {
                            alert('--success result is ' + JSON.stringify(result))
                            console.log('--success')
                            console.log(result)
                            const code = result.code
                            //get userID by code
                            getDdUserID(code).then(res => {
                                console.log(res)
                            })  
                        },
                        onFail : function(err) {
                            console.log('--fail')
                            //TODO: fail 处理
                            console.log(err)
                        }
                    });
                })
            })
        }
    }
}

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .mySwiper{
        margin-top: 2rem;
        width: 16rem;
        height: 10rem;
        background-color: #fff;
        .mySwiperSlider{
            .swiperImg{
                width: 16rem;
                height: 12rem;
            }
        }
    } 
    .app_list_section{
        width: 16rem;
        margin-top:.6rem;
		display:flex;
		flex-wrap: wrap;
		.app{
            background: #888888;
            border: 0.15rem solid #888888;
            border-radius: 0.4rem;
            margin-top:.4rem;
            margin-left: 0.6rem;
            width: 7.1rem;
            height: 3rem;
            display: flex;
            justify-content: space-around;
			.app_img{
                margin-top: 0.3rem;
				@include wh(2rem, 2rem);
			}
			.app_name{
                width: 3.4rem;
                // text-align: center;
                line-height: 2.7rem;
				@include sc(0.55rem, #fbfbfb);
			}
		}
	}
    .ranking_list_div{
        margin-top: .6rem;
        .ranking_txt_div {
            background: #888888;
            text-align: center;
            height: 2rem;
            line-height: 2rem;
			@include sc(0.65rem, #fbfbfb);
        }
    }

</style>
