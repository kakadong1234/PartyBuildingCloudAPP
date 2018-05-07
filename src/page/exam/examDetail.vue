<template>
  	<div class="paddingTop search_page">
        <head-top head-title="考试中" goBack="true"></head-top>
    </div>
</template>

<script>
import headTop from '../../components/header/head'
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
