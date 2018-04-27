<template>
  <div class="all_container">
    <head-top :head-title="study.title" goBack="true"></head-top>
    <div class='a'>
      <des-html-container :des="study.des"></des-html-container>
    </div>
  </div>
</template>

<script>
import headTop from '../../components/header/head'
import desHtmlContainer from 'src/components/common/desHtmlContainer'
import studyList from 'src/components/common/studyList'
import {getStudy} from '../../service/study'
//TODO: 观看历史数据
export default {
  data() {
    return {
      studyID: this.$route.params.studyID,
      study: {},
    }
  },
  mounted() {
    console.log('mounted')
    this.initData()
  },
  components:{
    headTop,
    desHtmlContainer
},
  methods:{
    async initData() {
      this.study = await getStudy(this.studyID);
      console.log(this.study)
    }
  } 
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>