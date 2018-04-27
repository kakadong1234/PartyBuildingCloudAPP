<template>
  	<div class="paddingTop search_page">
        <head-top head-title="考试中心"></head-top>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="正在考试" name="1">
                <el-row>
                    <el-col :span="8" v-for="item in examingList" :key="item">
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
            <el-tab-pane label="未考试" name="0">
                <el-row>
                    <el-col :span="8" v-for="item in noStartExamList" :key="item">
                        <el-card :body-style="{ padding: '0px' }">
                            <img src="~examples/assets/images/hamburger.png" class="image">
                            <div style="padding: 14px;">
                                <span>item.title</span>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="已经考试" name="2">
                <el-row>
                    <el-col :span="8" v-for="item in examedList" :key="item">
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
import {getExamList} from '../../service/exam'

export default {
	data(){
        return {
            activeName: '1',
            examingList: [],
            noStartExamList: [],
            examedList: [],
            offset: 0
        }
    },
    created(){
       
    },
    mounted(){
        this.getExamListForStatus()
    },
    components:{
        headTop,
        footGuide
    },
    methods:{
        handleClick(tab, event) {
            console.log(tab, event);
            //是不是要维护activeName
            this.getExamListForStatus()
        },
        async getExamListForStatus(){
            const status = this.activeName
            const list = await getExamList(status, offset)
            if(status === 0) {
                this.noStartExamList = list
            }
            else if(status === 1){
                this.examingList = list
            }
            else {
                this.examedList= list
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    
</style>
