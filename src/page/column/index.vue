<template>
    <div class='container'> 
        <head-top head-title="网上讲习所" nav='true'></head-top> 
        <section class="swiper_slides_section" v-if="swiperSlides.length">
            <swiper :options="swiperOption" class="mySwiper">
                <swiper-slide v-for="slide in swiperSlides" :key="slide.index" class="mySwiperSlider">
                    <img :src="slide.imgUrl" class="swiperImg">
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </section> 
        <section class="app_list_section">
            <div v-for="item in columnList" :key="item.id" class="column" @click.stop="goToDetail(item.link)">
	            <img :src="item.imgUrl" class="column_img">
	            <div class="column_name">{{item.name}}</div>
	        </div>
        </section>
        <abstract-of-study-list class="xi_column_study_list" limit=4 :column="xi_column"></abstract-of-study-list>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import headTop from '../../components/header/head'
import {getColumnList} from '../../service/column'
import '../../plugins/dingtalk.min.js'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import abstractOfStudyList from 'src/components/common/abstractOfStudyList'

export default {
    data(){
        return{
            columnList:[],
            xi_column:{},
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
        this.initData()
    },

    components:{
        headTop,
        swiper,
        swiperSlide,
        abstractOfStudyList      
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

        async initData() {
            const res = await getColumnList()
            const data = res.map(function(column){
                console.log(column)
                column.link = '/column/' + column.id + '?columnName=' + column.name
                return column
            });
            this.xi_column = data.find(function(column){
                return column.name === "社会主义新时代"
            })
            this.columnList = data.filter(function(column){
                return column.name !== "社会主义新时代"
            })
            console.log(this.xi_column)
            console.log(this.columnList)
        },

        // startDD(){
        //     console.log('--startDD')
        //     ddConfig().then(config => {
        //         console.log(config)
        //         config.jsApiList = [
        //             'runtime.info',
        //             'biz.user.get',
        //             'biz.contact.choose',
        //             'biz.telephone.call',
        //             'biz.ding.post'
        //         ]
        //         console.log(location.href)
        //         dd.config(config);
        //         dd.error(function(err) {
        //             alert('href is ' + location.href + ', dd error: ' + JSON.stringify(err));  
        //         }); 
        //         console.log('start ready')
        //         dd.ready(function() {
        //             alert('--dd requestAuthCode')
        //             console.log('--dd requestAuthCode')
        //             dd.runtime.permission.requestAuthCode({
        //                 corpId: config.corpid,
        //                 onSuccess: function(result) {
        //                     alert('--success result is ' + JSON.stringify(result))
        //                     console.log('--success')
        //                     console.log(result)
        //                     const code = result.code
        //                     //get userID by code
        //                     getDdUserID(code).then(res => {
        //                         console.log(res)
        //                     })  
        //                 },
        //                 onFail : function(err) {
        //                     console.log('--fail')
        //                     //TODO: fail 处理
        //                     console.log(err)
        //                 }
        //             });
        //         })
        //     })
        // },

        goToDetail(link){
            this.$router.push(link);
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
		.column{
            margin-top:.5rem;
            margin-left: 1em;
            width: 4rem;
            height: 3.4rem;
			.column_img{
                border: 0.025rem solid #888888;
                border-radius: 2rem;
                margin-left: 0.7rem;
				@include wh(2.6rem, 2.6rem);
			}
			.column_name{
                line-height: 0.4rem;
                text-align: center;
                @include sc(0.4rem, black);
			}
		}
	}
    .xi_column_study_list{
        margin-top: .6rem;
        margin-bottom: 0.6rem;
    }

</style>
