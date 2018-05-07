import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'
export const getSignOnList = () => fetch('/listRecord/22123959');

export const getPRankingList = () => {
	return new Promise(function(reslove, reject){
		const data = [
            {
                rank: 1,
                memberId: 1,
			    name: '吴顺清',	
			    headImgUrl: 'http://7xrsfo.com1.z0.glb.clouddn.com/touxiang01.jpeg',
                branch: '六盘水一部',
                score: 3
            },
            {
                rank: 2,
                memberId: 2,
			    name: '朱士烈',	
			    headImgUrl: 'http://7xrsfo.com1.z0.glb.clouddn.com/touxiang02.jpeg',
                branch: '钟山区一部',
                score: 2.5
            },
            {
                rank: 3,
                memberId: 3,
			    name: '金松茂',	
			    headImgUrl: 'http://7xrsfo.com1.z0.glb.clouddn.com/touxiang01.jpeg',
                branch: '盘县二部',
                score: 2
            },
            {
                rank: 4,
                memberId: 4,
			    name: '周惠良',	
			    headImgUrl: 'http://7xrsfo.com1.z0.glb.clouddn.com/dang.png',
                branch: '六盘水一部',
                score: 1
            },
            {
                rank: 5,
                memberId: 5,
			    name: '刘益民',	
			    headImgUrl: 'http://7xrsfo.com1.z0.glb.clouddn.com/touxiang02.jpeg',
                branch: '六盘水一部',
                score: 1
            },
            {
                rank: 6,
                memberId: 6,
			    name: '马嘉欣',	
			    headImgUrl: 'http://7xrsfo.com1.z0.glb.clouddn.com/touxiang01.jpeg',
                branch: '水城县一部',
                score: 1
            },
            {
                rank: 7,
                memberId: 7,
			    name: '谭江东',	
			    headImgUrl: 'http://7xrsfo.com1.z0.glb.clouddn.com/touxiang02.jpeg',
                branch: '六枝特区一部',
                score: 1
            },
            {
                rank: 8,
                memberId: 8,
			    name: '朱牧',	
			    headImgUrl: 'http://7xrsfo.com1.z0.glb.clouddn.com/touxiang01.jpeg',
                branch: '六盘水一部',
                score: 1
            },
        ]
		reslove(data)
	})
};