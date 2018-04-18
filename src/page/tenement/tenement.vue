<template>
    <div>
    	<head-top head-title="租房列表" go-back='true'></head-top>
		<div v-if="!userInfo || userInfo.user_id === undefined" class="no_user_info_div"> 
			未登录,请先登录
		</div>
    	<div v-else class="tenement_list_container">
	    	<tenement-list></tenement-list>
    	</div>
    	<foot-guide selectedItem='tenement'></foot-guide>
    </div>    	
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/lfootGuide'
import tenementList from 'src/components/common/tenementList'

export default {
	data(){
        return {
        }
    },
    // async beforeMount(){
    // 	// this.hasGetData = true;
    // },
    mounted(){
    },
    components: {
		headTop,
		footGuide,
    	tenementList
    },
    computed: {
		...mapState([
            'userInfo',
        ]),
    },
    methods: {
    	...mapMutations([
    	]),
    },
    watch: {

    }
}

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
	.tenement_list_container{
		// margin-top: .4rem;
		margin-top: 1.95rem;
		border-top: 0.025rem solid $bc;
		background-color: #fff;
	}

</style>
