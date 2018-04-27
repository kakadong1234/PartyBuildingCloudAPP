<template>
  	<div class="paddingTop search_page">
        <head-top head-title="学习中心"></head-top>
        <div class="list_container">
	    	<study-list></study-list>
    	</div>
        <foot-guide selectedItem='search'></foot-guide>
    </div>
</template>

<script>
import headTop from '../../components/header/head'
import footGuide from '../../components/footer/lfootGuide'
import studyList from 'src/components/common/studyList'
import {getStore, setStore} from '../../config/mUtils'



export default {
	data(){
        return {
        }
    },
    created(){
       
    },
    mounted(){
        console.log('mounted')
    },
    components:{
        headTop,
        footGuide,
        studyList
    },
    methods:{
    }
}
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .list_container{
		// margin-top: .4rem;
		// margin-top: 1.95rem;
		border-top: 0.025rem solid $bc;
		background-color: #fff;
	}
    
</style>
