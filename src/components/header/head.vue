<template>
    <header id='head_top'>
        <slot name='logo'></slot>
        <slot name='search'></slot>
        <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
            </svg>
        </section>
        <router-link :to="userInfo? '/profile':'/login'" v-if='signinUp' class="head_login">
            <svg class="user_avatar" v-if="userInfo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
            </svg>
            <span class="login_span" v-else>登录|注册</span>
        </router-link>
        <div v-if="nav" class="nav_div" @click.stop="showOrhiddenNav">
            <span v-if="!isShowNav" class="nav_span" >导航</span>
            <span v-else class="nav_span" >收起</span>
        </div>
        <div v-if="isShowNav && navList.length" class="nav_list_div" >
            <div class="nav_item" v-for="item in navList" :key="item.title" @click.stop="goToPage(item.url)">
                <div class="item_span">{{item.title}}</div>
            </div>
            </div>
        <section class="title_head ellipsis" v-if="headTitle">
            <span class="title_text">{{headTitle}}</span>
        </section>
        <slot name="edit"></slot>
        <slot name="msite-title"></slot>
        <slot name="changecity"></slot>
        <slot name="changeLogin"></slot>
        <slot name = "showBillList"></slot>
    </header>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    export default {
    	data(){
            return{
                isShowNav: false,
                navList: [
                    {title:'网上讲习所', url: '/study'},
                    {title:'党旗飘飘', url: '/lhome'}, 
                    {title:'党员E家', url: ''}, 
                    {title:'云学习中心', url: '/study'}, 
                    {title:'驻村轮站干部管理', url: ''}, 
                    {title:'人才驿站', url: ''}, 
                    {title:'个人信息', url: '/lprofile'}
                ]
            }
        },
        mounted(){
            //获取用户信息
            this.getUserInfo();

        },
        props: ['signinUp', 'headTitle', 'goBack', 'nav'],
        computed: {
            ...mapState([
                'userInfo'
            ]),
        },
        methods: {
            ...mapActions([
                'getUserInfo'
            ]),

            showOrhiddenNav(){
                this.isShowNav = !this.isShowNav
            },

            getVueArr(stringArr, key){
                const vueArr = [];
                for(let i=0; i<vueArr.length; i++){
                    const vueItem = {}
                    vueItem.index = i
                    vueItem[key] = vueArr[i]
                    vueArr.push(vueItem)
                }
                return vueArr
            },

            goToPage(url){
                console.log(url)
                this.$router.push(url);
            }
        },

    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    #head_top{
        background-color: #f8f8f8;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        @include wh(100%, 1.95rem);
    }
    .head_goback{
        left: 0.4rem;
        @include wh(0.6rem, 1rem);
        line-height: 2.2rem;
        margin-left: .4rem;
    }
    .head_login{
        right: 0.55rem;
        @include sc(0.65rem, #fff);
        @include ct;
        .login_span{
            color: black;
        }
        .user_avatar{
            fill: black;
            @include wh(.8rem, .8rem);
        }
    }
    .nav_div{
        right: 0.55rem;
        @include sc(0.65rem, #fff);
        @include ct;
        .nav_span{
            color: black;
        } 
    }
    .nav_list_div{ 
            margin-top: 1.95rem;
            margin-left: 7rem;
            background: white;
            width: 9rem;
            .nav_item {
                background: #616161;
                margin-top: 0.05rem;
                height: 2.5rem;
                .item_span{
                    @include sc(0.8rem, #fff);
                    line-height: 2.5rem; /*设置line-height与父级元素的height相等*/
                    text-align: center; /*设置文本水平居中*/
                }
            }
        }
    .title_head{
        @include center;
        width: 50%;
        color: black;
        text-align: center;
        .title_text{
            @include sc(0.8rem, black);
            text-align: center;
            font-weight: bold;
        }
    }
</style>
