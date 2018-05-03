<template>
  <div class="all_container">
    <head-top :head-title="branch.name" goBack="true"></head-top>
    <div class='a'>
      <des-html-container :des="branch.details"></des-html-container>
    </div>
  </div>
</template>

<script>
import headTop from '../../components/header/head'
import desHtmlContainer from 'src/components/common/desHtmlContainer'
import {getPartyBranch} from '../../service/partyBranch'
//TODO: 观看历史数据
export default {
  data() {
    return {
      id: this.$route.params.branchID,
      branch: {},
    }
  },
  mounted() {
    console.log('mounted-------------------')
    this.initData()
  },
  components:{
    headTop,
    desHtmlContainer
},
  methods:{
    async initData() {
      const result = await getPartyBranch(this.id)
      if(result.code === 200) {
        this.branch = result.data
      }
    }
  } 
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>