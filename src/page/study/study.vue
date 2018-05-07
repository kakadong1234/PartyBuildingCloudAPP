<template>
  	<div class="paddingTop search_page">
        <head-top head-title="云学习中心" nav='true'></head-top>
        <div class="list_container">
	    	<abstract-of-study-history-list limit=2 ></abstract-of-study-history-list>
            <div class='exam_list_div'>
                <div class="exam_txt_div"> 考试中心 </div>
                <exam-list> </exam-list>
            </div>
    	</div>
    </div>
</template>

<script>
import headTop from '../../components/header/head'
import footGuide from '../../components/footer/lfootGuide'
import abstractOfStudyHistoryList from 'src/components/common/abstractOfStudyHistoryList'
import examList from 'src/components/common/examList'
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
        abstractOfStudyHistoryList,
        examList
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
        .exam_list_div{
        margin-top: .6rem;
        .exam_txt_div {
            background: #888888;
            text-align: center;
            height: 2rem;
            line-height: 2rem;
			@include sc(0.65rem, #fbfbfb);
        }
    }
	}
    
</style>
