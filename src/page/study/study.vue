<template>
  	<div class="paddingTop search_page">
        <head-top head-title="学习中心"></head-top>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="正在学习" name="1">
                <el-row>
                    <el-col :span="8" v-for="item in studyingList" :key="item">
                        <el-card :body-style="{ padding: '0px' }">
                            <img src="~examples/assets/images/hamburger.png" class="image">
                            <div style="padding: 14px;">
                                <span>item.title</span>
                                <div class="bottom clearfix">
                                    <el-progress :text-inside="true" :stroke-width="18" :percentage="item.progress"></el-progress>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="未学习" name="0">
                <el-row>
                    <el-col :span="8" v-for="item in noStartStudyList" :key="item">
                        <el-card :body-style="{ padding: '0px' }">
                            <img src="~examples/assets/images/hamburger.png" class="image">
                            <div style="padding: 14px;">
                                <span>item.title</span>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="已经学完" name="2">
                <el-row>
                    <el-col :span="8" v-for="item in studyedList" :key="item">
                        <el-card :body-style="{ padding: '0px' }">
                            <img src="~examples/assets/images/hamburger.png" class="image">
                            <div style="padding: 14px;">
                                <span>item.title</span>
                                <!-- <div class="bottom clearfix">
                                    <time class="time">{{ currentDate }}</time>
                                    <el-button type="text" class="button">操作按钮</el-button>
                                </div> -->
                            </div>
                        </el-card>
                    </el-col>
                </el-row>

            </el-tab-pane>
        </el-tabs>
        <foot-guide selectedItem='search'></foot-guide>
    </div>
</template>

<script>
import headTop from '../../components/header/head'
import footGuide from '../../components/footer/lfootGuide'
import {getStore, setStore} from '../../config/mUtils'
import {getStudyList} from '../../service/study'

export default {
	data(){
        return {
            activeName: '1',
            studyingList: [],
            noStartStudyList: [],
            studyedList: [],
            offset: 0
        }
    },
    created(){
       
    },
    mounted(){
        this.getStudyListForStatus()
    },
    components:{
        headTop,
        footGuide
    },
    methods:{
        handleClick(tab, event) {
            console.log(tab, event);
            //是不是要维护activeName
            this.getStudyListForStatus()
        },
        async getStudyListForStatus(){
            const status = this.activeName
            const list = await getStudyList(status, offset)
            if(status === 0) {
                this.noStartStudyList = list
            }
            else if(status === 1){
                this.studyingList = list
            }
            else {
                this.studyedList= list
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    
</style>
