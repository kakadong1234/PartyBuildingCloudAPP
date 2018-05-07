import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'
/**
 * 获取appList
 */
export const getColumnList = () => {
	return new Promise(function(reslove, reject){
		let list = [
			{
				"id": 11,
            	"imgUrl": "http://7xrsfo.com1.z0.glb.clouddn.com/dang.png",
            	"name": "党建",
                "weight": 1,
            },
            {
				"id": 2,
            	"imgUrl": "http://7xrsfo.com1.z0.glb.clouddn.com/al.png",
            	"name": "农技",
                "weight": 2,
            },
            {
				"id": 3,
            	"imgUrl": "http://7xrsfo.com1.z0.glb.clouddn.com/falv.png",
            	"name": "法律",
                "weight": 4,
            },
            {
				"id": 4,
            	"imgUrl": "http://7xrsfo.com1.z0.glb.clouddn.com/jiaoyu.png",
            	"name": "教育",
                "weight": 3,
            },
            {
				"id": 5,
            	"imgUrl": "http://7xrsfo.com1.z0.glb.clouddn.com/tel.png",
            	"name": "科技",
                "weight": 5,
            },
            {
				"id": 6,
            	"imgUrl": "http://7xrsfo.com1.z0.glb.clouddn.com/other_black.png",
            	"name": "其它",
                "weight": 6,
			},
			{
				"id": 1,
				"imgUrl": "http://7xrsfo.com1.z0.glb.clouddn.com/other_black.png",
				"name": "社会主义新时代",
				"weight": 100,
			}
		]
		list = list.sort(function(a, b) {
			return a.weight - b.weight 	
		})
		reslove(list)
	})
};