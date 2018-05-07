<template>
    <div class='container'> 
        <head-top head-title="党旗飘飘" nav='true'></head-top>
         <div id="map" class="map"></div>  
         <abstract-of-good-news-list limit=2> </abstract-of-good-news-list> 
         <abstract-of-news-list limit=2> </abstract-of-news-list>
         <div class='ranking_list_div'>
            <div class="ranking_txt_div"> 乡镇排名 </div>
            <e-ranking-list> </e-ranking-list>
         </div>
        <!-- <foot-guide selectedItem='home'></foot-guide> -->
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import headTop from '../../components/header/head'
import footGuide from 'src/components/footer/lfootGuide'
import eRankingList from 'src/components/common/eRankingList'
import abstractOfGoodNewsList from 'src/components/common/abstractOfGoodNewsList'
import abstractOfNewsList from 'src/components/common/abstractOfNewsList'
import {ddConfig, getDdUserID} from '../../service/getData'
import '../../plugins/dingtalk.min.js'

import {getLocation} from '../../service/map'
import { getPartyBranchList } from '../../service/partyBranch'
import { getSignOnList } from '../../service/member'
export default {
    data(){
        return{
            map: null,
            //党支部列表
            partyBranchList: [],
            //党员列表
            partyMemberList: [],
            //他山之玉
            goodNewsList: [
            {
            title: 'ta1',
            url: 'http://www.baidu.com?q=ta1'
            },
            {
            title: 'ta2',
            url: 'http://www.baidu.com?q=ta2'
            }
        ],
        //新闻动态
        newsList: [
            {
            title: 'dongtai1',
            url: 'http://www.baidu.com?q=dongtai1'
            },
            {
            title: 'dongtai2',
            url: 'http://www.baidu.com?q=dongtai2'
            }
        ],
      //考试排行榜
      examScoreList: [
        {
          examination: {
            name: '112'
          },
          score: 90
        },
        {
          examination: {
            name: '113'
          },
          score: 82
        }
      ]
        }
    },

	mounted(){
        this.initMap()
    },

    components:{
        headTop,
        footGuide,
        abstractOfGoodNewsList,
        abstractOfNewsList,
        eRankingList
    },

    computed:{
        ...mapState([
            // 'userInfo',
        ]),
    },

    methods:{
        //点击图标刷新页面
        reload(){
            window.location.reload();
        },

        startDD(){
            console.log('--startDD')
            ddConfig().then(config => {
                console.log(config)
                config.jsApiList = [
                    'runtime.info',
                    'biz.user.get',
                    'biz.contact.choose',
                    'biz.telephone.call',
                    'biz.ding.post'
                ]
                console.log(location.href)
                dd.config(config);
                dd.error(function(err) {
                    alert('href is ' + location.href + ', dd error: ' + JSON.stringify(err));  
                }); 
                console.log('start ready')
                dd.ready(function() {
                    alert('--dd requestAuthCode')
                    console.log('--dd requestAuthCode')
                    dd.runtime.permission.requestAuthCode({
                        corpId: config.corpid,
                        onSuccess: function(result) {
                            alert('--success result is ' + JSON.stringify(result))
                            console.log('--success')
                            console.log(result)
                            const code = result.code
                            //get userID by code
                            getDdUserID(code).then(res => {
                                console.log(res)
                            })  
                        },
                        onFail : function(err) {
                            console.log('--fail')
                            //TODO: fail 处理
                            console.log(err)
                        }
                    });
                })
            })
        },

        async initMap(){
            console.log('initMap')
            const city = '六盘水市'
            console.log(city)
            //获取六盘水市的经纬度
            const location = await getLocation(city)
            const mapLocation = [location.longitude, location.latitude]
            this.map = new AMap.Map('map',{ //生成 map
              zoom: 8,
              center: mapLocation
            });
            //添加中心点标记
            this.addMarker(mapLocation)
            //添加党支部列表标记
            this.addPartyBranchListMarkers()
            //添加党员签到标记
            this.addPartyMemberListMarkers()
        },

        addMarker(location, imageUrl, imageSize, data, type){
            const markerData = {
                position: location,//marker所在的位置
                map: this.map//创建时直接赋予map属性
            }
            if(imageUrl) {
                const content= "<img src=" + imageUrl + " style='width:" + imageSize.width + "px; height=" + imageSize.height + "px'>";
                markerData.content = content
            }
            const marker = new AMap.Marker(markerData);
            marker.data = data
            marker.type = type
            const _onClick = e => {
                console.log(e.target)
                const type = e.target.type
                const content=[];
                if(type === 'branch') {
                    const title = data.name
                    const address = data.address
                    const detailUrl = window.location.origin + '/branch/' + data.id
                    content.push('<div style="font-size:10px;"> <div>党支部名称:'+ title +'</div> <div>地址：' + address + '</div> <a href="' + detailUrl  + '" style="color:blue">图文详情</a> </div>');
                }
                else {
                    const title = data.name
                    const detailPlace = data.detailPlace
                    const date = new Date(data.timestamp)
                    const time = date.getHours() + ':' + date.getMinutes()
                    const detailUrl = window.location.origin + '#/branch/des'
                    content.push('<div style="font-size:10px"> <div>姓名:'+ title +'</div> <div>签到时间:' + time  + '</div> <div>签到地址：' + detailPlace + '</div> <a href="' + detailUrl  + '" style="color:blue">签到详情</a> </div>');
                }
                this.showInfoWindow(data, content)
            }
            AMap.event.addListener(marker, 'click', _onClick);
    },

        showInfoWindow(location, content){
            const infoWindow = new AMap.InfoWindow({
            content: content.join("<br>"),
            });
            infoWindow.open(this.map, [location.longitude, location.latitude]);
        }, 


        async addPartyBranchListMarkers(){
            const response = await getPartyBranchList()
            this.partyBranchList = response.data
            this.partyBranchList.map(branch => {
              const location = [branch.longitude, branch.latitude]  
              const imgUrl = branch.flag ? 'http://7xrsfo.com1.z0.glb.clouddn.com/party_yellow.png' : 'http://7xrsfo.com1.z0.glb.clouddn.com/party.png'
              this.addMarker(location, imgUrl, {width: 20, height: 20}, branch, 'branch')
          })
        },

        async addPartyMemberListMarkers(){
            const response = await getSignOnList()
            const mockList = this.getMockList()
            this.partyMemberList = mockList
            this.partyMemberList.map(member => {
              const location = [member.longitude, member.latitude]
              this.addMarker(location, 'http://7xrsfo.com1.z0.glb.clouddn.com/star.png', {width: 15, height: 15}, member, 'member')
            })
        },

    getMockList() {
      const mockList = []
      for(let i=1; i<1000; i++) {
        const longitude = Math.floor(Math.random()*1000+10000) * 1.0 / 100 
        const latitude = Math.floor(Math.random()*1000+2000) * 1.0 / 100 
            mockList.push({
              name: '晓伟' + i,
              detailPlace: '六盘水' + i,
              longitude,
              userId: i,      
              timestamp: Date.now(), 
              latitude
            })
      }
      return mockList
    },
    fetchPartyBranchList(){
      //获取党支部列表
    },

    fetchPartyMemberList(){
      //获取党员签到列表
    },

    //他山之玉列表
    fetchGoodNewsList(){
    },

    //新闻动态列表
    fetchNewsList(){
    },

    //考试排行榜
    fetchExamScoreList(){
    },
    }
}

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .map{
        margin-left: 0.25rem;
        margin-right: 0.25rem;
        margin-top: 2.2rem;
        width: 15.5rem;
        height: 12rem;
    }
    .abstract-of-good-news-list{
        margin-top: 0.6rem;
    } 
    .abstract-of-news-list{
        margin-top: 0.6rem;
    }
    .ranking_list_div{
        margin-top: .6rem;
        .ranking_txt_div {
            background: #888888;
            text-align: center;
            height: 2rem;
            line-height: 2rem;
			@include sc(0.65rem, #fbfbfb);
        }
    }

</style>
