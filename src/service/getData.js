import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'
/**
 * 租房 mock 数据
 */
const ALL_TENEMENT_LIST = []
for(var i = 1; i <= 300; i++) {
	//基础属性
	let tenement = {
		ID: i,
		title: '浦东软件园100栋20' + i + '室' + '很有特色的喔!',
		des: '房子很好房子很好房子很好房子很好房子很好房房子很好房子很好房子很好房子很好房子很好房房子很好房子很好房子很好房子很好房子很好房房子很好房子很好房子很好房子很好房子很好房房子很好房子很好房子很好房子很好房子很好房房子很好房子很好房子很好房子很好房子很好房子很好房子很好房子很好房子很好房子很好房子很好房子很好房子很好房子很好房子很好房子很好房子很好房子很好房子很好房子很好房子很好房子很好房子很好房子很好子很好房子很好房子很好房子很好房子很好子很好房子很好房子很好房子很好房子很好',
		address: '上海市浦东新区金科路' + i + '号',
		rentForMonth: 200.2,
		imgURLList: [
			"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2313411144,683196051&fm=27&gp=0.jpg",
			"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523273935514&di=51911299a2d0fea0ee8f73b739a6a0c7&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F00%2F57%2F93%2F24%2Fs_1024_58bd1f5f4d5a6.png",
		]
	}
	tenement.status = i % 2 // 0表示未租, 1表示已租
	// 房东属性
	const landlord = {
		ID: i,
		phone: '15372383031',
		mail: '15372383031@126.com',
		AliPayNumber: '123323213'
	}
	landlord.name = 'landlord' + i
	tenement = Object.assign(tenement, {
		landlord
	})
	if(tenement.status === 1) { 
		// 已租房才有 lease 属性
		const lease = {
			createLeaseDate: '2018-03-21', //起租时间
			payDeadlineDay: '03',//缴费最后日期	
		}
		let payStatus
		switch (i % 3) {
			case 0: 
			payStatus = '需缴费'
			break
			case 1: 
			payStatus = '已缴费'
			break
			case 2: 
			payStatus = '需缴费'
			break
			default:
			console.log(i % 3)
		}
		lease.payStatus = payStatus
		// 已租房才有 renter(租客) 属性
		const renter = {
			ID: i,
			phone: '15372383031',
			mail: '15372383031@126.com'
		}
		renter.name = i%4 == 0 ? 'renter' : 'renter' + i
		tenement = Object.assign(tenement, {
			lease,
			renter
		})
	}
	ALL_TENEMENT_LIST.push(tenement)
}

/**
 * 账单 mock 数据
 */
const ALL_BILL_LIST = []
for(var i=1; i<=30; i++) {
	let bill = {
		ID: i,
		// created: '2017-09-21',
		paymentDeadline: '2017-09-26', 
		actionForBill:{
			startDate: '2017-09-27',
			endDate: '2017-10-27',
		}
	}
	bill.status = i%2 === 0 ? '已缴费' : '未缴费'
	let type
	switch (i % 3) {
		case 0: 
		type = 'rent'
		break
		case 1: 
		type = 'electric'
		break
		case 2: 
		type = 'water'
		break
		default:
		console.log(i % 3)
	}
	bill.type = type
	if(bill.type === 'electric') {
		bill.actionForBill.startDegress = 3232.1
		bill.actionForBill.endDegress = 3555.1,
		bill.actionForBill.price = 5;
	}
	if(bill.type === 'water') {
		bill.actionForBill.startDegress = 232.1
		bill.actionForBill.endDegress = 255.1,
		bill.actionForBill.price = 10;
	}
	bill.cost = bill.type === 'rent' ? 300.1 : (bill.actionForBill.endDegress - bill.actionForBill.startDegress) * bill.actionForBill.price
	ALL_BILL_LIST.push(bill)
}

/**
 * 用户 mock 数据
 */
const ALL_USER_LIST = []

/**
 * 订单 mock 数据
 */
const ALL_ORDER_LIST = []

/**
 * 支付 mock 数据
 */
const ALL_PAYMENT_LIST = []



/**
 * 手机号登录
 */

var sendLogin = (code, mobile, validate_token) => {
	const user_id =  123
	return new Promise(function(reslove, reject){
		const userinfo = {
			user_id,
			username: '用户 a'
		}
		reslove(userinfo)
	})
};

/**
 * 获取账单列表
 */
export const getBillList = (tenementID, user_id, status) => {
	console.log('getBillList')
	return new Promise(function(reslove, reject){
	if(!status) {
		return reslove(ALL_BILL_LIST)
	}
	const billList = ALL_BILL_LIST.filter(function(bill){
		console.log(bill)
		return bill.status === status 
	})
	reslove(billList)
	})
};

/**
 * 获取租房列表
 */
export const getTenementList = (user_id, offset) => {
	console.log('----%%%%%-----')
	console.log(offset)
	const limit = 20
	return new Promise(function(reslove, reject){
	const tenementList = ALL_TENEMENT_LIST.filter(function(tenement){
		return tenement.status === 1 
	})
	console.log(tenementList.length)
	reslove(tenementList.slice(offset, offset + limit))
	})
};

/**
 * 获取租房详情
 */
export const getTenemnetDetail = (id) => {
	console.log('id  is ' + id)
	return new Promise(function(reslove, reject){
	const tenement = ALL_TENEMENT_LIST.find(function(tenement){
		return tenement.ID === parseInt(id) 
	})
		reslove(tenement)
	})
};

/**
 * 获取appList
 */
export const getAppList = () => {
	return new Promise(function(reslove, reject){
		const appList = [
			{
            "appIcon": "http://static.dingtalk.com/media/lALOcrvqOszIzMg_200_200.png",
            "agentId": 50821899,
            "appDesc": "你的努力老板看得见",
            "name": "签到",
            "homepageLink": "https://attendance.dingtalk.com/attendance/mobile/mapAttendance.html?showmenu=false&dd_progress=false&dd_share=false&corpid=ding31148f160c24897635c2f4657eb6378f",
            "appStatus": 1,
            "isSelf": false,
            "ompLink": "https://attendance.dingtalk.com/attendance/web/web/home/index"
            },
            {
            "appIcon": "http://static.dingtalk.com/media/lALOcsYpu8zIzMg_200_200.png",
            "agentId": 50821900,
            "pcHomepageLink": "https://attend.dingtalk.com/portal/index_pc.html?corpId=ding31148f160c24897635c2f4657eb6378f",
            "appDesc": "考勤，上下班打卡",
            "name": "考勤打卡",
            "homepageLink": "https://attend.dingtalk.com/attend/index.html?corpId=ding31148f160c24897635c2f4657eb6378f&showmenu=false&dd_share=false&dd_progress=false",
            "appStatus": 1,
            "isSelf": false,
            "ompLink": "https://attend.dingtalk.com/admin/index"
            },
            {
            "appIcon": "http://static.dingtalk.com/media/lALOcsZGkszIzMg_200_200.png",
            "agentId": 50821904,
            "pcHomepageLink": "",
            "appDesc": "工作汇报，日报，周报",
            "name": "日志",
            "homepageLink": "https://landray.dingtalkapps.com/alid/app/report/home.html?showmenu=false&dd_share=false&corpid=ding31148f160c24897635c2f4657eb6378f",
            "appStatus": 1,
            "isSelf": false,
            "ompLink": "https://landray.dingtalkapps.com/alid/reportpc/getTotalDetail"
            },
            {
            "appIcon": "http://static.dingtalk.com/media/lALOcsZHFszIzMg_200_200.png",
            "agentId": 50821906,
            "pcHomepageLink": "https://app.dingtalk.com/index.html?corpId=ding31148f160c24897635c2f4657eb6378f",
            "appDesc": "企业重要信息",
            "name": "公告",
            "homepageLink": "https://app.dingtalk.com/blackboard/noticeList.html?showmenu=false&dd_progress=false&dd_share=false&corpid=ding31148f160c24897635c2f4657eb6378f",
            "appStatus": 1,
            "isSelf": false,
            "ompLink": "https://app.dingtalk.com/blackboard/api/auth"
            },
            {
            "appIcon": "http://static.dingtalk.com/media/lALOcsZGQszIzMg_200_200.png",
            "agentId": 50821907,
            "pcHomepageLink": "https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?corpid=ding31148f160c24897635c2f4657eb6378f",
            "appDesc": "请假、报销，各类审批",
            "name": "审批",
            "homepageLink": "https://aflow.dingtalk.com/dingtalk/mobile/homepage.htm?showmenu=false&dd_progress=false&dd_share=false&corpid=ding31148f160c24897635c2f4657eb6378f",
            "appStatus": 1,
            "isSelf": false,
            "ompLink": "https://aflow.dingtalk.com/dingtalk/web/code"
            },
            {
            "appIcon": "http://static.dingtalk.com/media/lALOcsah9MzIzMg_200_200.png",
            "agentId": 50821913,
            "appDesc": "企业邮箱",
            "name": "钉邮",
            "homepageLink": "http://mail.dingtalk.com/auth/login",
            "appStatus": 1,
            "isSelf": false,
            "ompLink": "https://oa.dingtalk.com/#/microApp/orgEmail"
            },
            {
                "appIcon": "http://static.dingtalk.com/media/lALOcsahiMzIzMg_200_200.png",
                "agentId": 50821914,
                "appDesc": "企业云盘，资料共享",
                "name": "钉盘",
                "homepageLink": "https://space.dingtalk.com/auth/login",
                "appStatus": 1,
                "isSelf": false,
                "ompLink": "https://space.dingtalk.com/admin.html"
            },
            {
                "appIcon": "http://static.dingtalk.com/media/lALOcsxZiszIzMg_200_200.png",
                "agentId": 50821915,
                "pcHomepageLink": "https://clouddata.dingtalkapps.com/alid/static/guide.html?corpId=ding31148f160c24897635c2f4657eb6378f",
                "appDesc": "智能报表",
                "name": "智能报表",
                "homepageLink": "https://clouddata.dingtalkapps.com/alid/mobile/index.html?corpId=ding31148f160c24897635c2f4657eb6378f&dd_progress=false",
                "appStatus": 1,
                "isSelf": false,
                "ompLink": "https://clouddata.dingtalkapps.com/routes/data/ListView/"
            },
            {
                "appIcon": "http://static.dingtalk.com/media/lALOcsajBszIzMg_200_200.png",
                "agentId": 50821920,
                "appDesc": "高质量电话会议",
                "name": "电话会议",
                "homepageLink": "http://businessConference.dingtalk.com/auth/login",
                "appStatus": 1,
                "isSelf": false
            },
            {
                "appIcon": "http://static.dingtalk.com/media/lALOcsaifMzIzMg_200_200.png",
                "agentId": 50821921,
                "pcHomepageLink": "https://h5.dingtalk.com/voip/index.html",
                "appDesc": "视频会议",
                "name": "视频会议",
                "homepageLink": "",
                "appStatus": 1,
                "isSelf": false
            },
            {
                "appIcon": "http://static.dingtalk.com/media/lALPBY0V4x4vWbnNBBTNCLw_2236_1044.png",
                "agentId": 169284840,
                "pcHomepageLink": "http://localhost:8000",
                "appDesc": "包租婆包租婆",
                "name": "包租婆",
                "homepageLink": "http://192.168.0.106:8000/home",
                "appStatus": 1,
                "isSelf": true,
                "ompLink": "http://vuedemo.kakadong.top"
			}
		]
		reslove(appList)
	})
};

/**
 * 获取钉钉 config
 */
export const ddConfig = () => {
	return new Promise(function(reslove, reject){
		const data = {
			agentId: '169284840',
			corpId: 'ding31148f160c24897635c2f4657eb6378f',
			timeStamp: '1522406302',	
			nonceStr: 'hello',
			signature: '2ee58283c92fba3f7eb2d3b45fb383b90a00fd01'
		}
		reslove(data)
	})
};

/**
 * 获取userID
 */
export const getDdUserID = (code) => {
	return new Promise(function(reslove, reject){
		const userid = 123
		reslove(userid)
	})
};
/**
 * 获取首页默认地址
 */

export const cityGuess = () => fetch('/v1/cities', {
	type: 'guess'
});


/**
 * 获取首页热门城市
 */

export const hotcity = () => fetch('/v1/cities', {
	type: 'hot'
});


/**
 * 获取首页所有城市
 */

export const groupcity = () => fetch('/v1/cities', {
	type: 'group'
});


/**
 * 获取当前所在城市
 */

export const currentcity = number => fetch('/v1/cities/' + number);


/**
 * 获取搜索地址
 */

export const searchplace = (cityid, value) => fetch('/v1/pois', {
	type: 'search',
	city_id: cityid,
	keyword: value
});


/**
 * 获取msite页面地址信息
 */

export const msiteAdress = geohash => fetch('/v2/pois/' + geohash);


/**
 * 获取msite页面食品分类列表
 */

export const msiteFoodTypes = geohash => fetch('/v2/index_entry', {
	geohash,
	group_type: '1',
	'flags[]': 'F'
});


/**
 * 获取msite商铺列表
 */

export const shopList = (latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) => {
	let supportStr = '';
	support_ids.forEach(item => {
		if (item.status) {
			supportStr += '&support_ids[]=' + item.id;
		}
	});
	let data = {
		latitude,
		longitude,
		offset,
		limit: '20',
		'extras[]': 'activities',
		keyword: '',
		restaurant_category_id,
		'restaurant_category_ids[]': restaurant_category_ids,
		order_by,
		'delivery_mode[]': delivery_mode + supportStr
	};
	return fetch('/shopping/restaurants', data);
};


/**
 * 获取search页面搜索结果
 */

export const searchRestaurant = (geohash, keyword) => fetch('/v4/restaurants', {
	'extras[]': 'restaurant_activity',
	geohash,
	keyword,
	type: 'search'
});


/**
 * 获取food页面的 category 种类列表
 */

export const foodCategory = (latitude, longitude) => fetch('/shopping/v2/restaurant/category', {
	latitude,
	longitude
});


/**
 * 获取food页面的配送方式
 */

export const foodDelivery = (latitude, longitude) => fetch('/shopping/v1/restaurants/delivery_modes', {
	latitude,
	longitude,
	kw: ''
});


/**
 * 获取food页面的商家属性活动列表
 */

export const foodActivity = (latitude, longitude) => fetch('/shopping/v1/restaurants/activity_attributes', {
	latitude,
	longitude,
	kw: ''
});


/**
 * 获取shop页面商铺详情
 */

export const shopDetails = (shopid, latitude, longitude) => fetch('/shopping/restaurant/' + shopid, {
	latitude,
	longitude: longitude + '&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics'
});



/**
 * 获取shop页面菜单列表
 */

export const foodMenu = restaurant_id => fetch('/shopping/v2/menu', {
	restaurant_id
});


/**
 * 获取商铺评价列表
 */

export const getRatingList = (shopid, offset, tag_name = '') => fetch('/ugc/v2/restaurants/' + shopid + '/ratings', {
	has_content: true,
	offset,
	limit: 10,
	tag_name
});


/**
 * 获取商铺评价分数
 */

export const ratingScores = shopid => fetch('/ugc/v2/restaurants/' + shopid + '/ratings/scores');


/**
 * 获取商铺评价分类
 */

export const ratingTags = shopid => fetch('/ugc/v2/restaurants/' + shopid + '/ratings/tags');


/**
 * 获取短信验证码
 */

export const mobileCode = phone => fetch('/v4/mobile/verify_code/send', {
	mobile: phone,
	scene: 'login',
	type: 'sms'
}, 'POST');


/**
 * 获取图片验证码
 */

export const getcaptchas = () => fetch('/v1/captchas', {},'POST');


/**
 * 检测帐号是否存在
 */

export const checkExsis = (checkNumber, type) => fetch('/v1/users/exists', {
	[type]: checkNumber,
	type
});


/**
 * 发送帐号
 */

export const sendMobile = (sendData, captcha_code, type, password) => fetch('/v1/mobile/verify_code/send', {
	action: "send",
	captcha_code,
	[type]: sendData,
	type: "sms",
	way: type,
	password,
}, 'POST');


/**
 * 确认订单
 */

export const checkout = (geohash, entities, shopid) => fetch('/v1/carts/checkout', {
	come_from: "web",
	geohash,
	entities,
	restaurant_id: shopid,
}, 'POST');


/**
 * 获取快速备注列表
 */

export const getRemark = (id, sig) => fetch('/v1/carts/' + id + '/remarks', {
	sig
});


/**
 * 获取地址列表
 */

export const getAddress = (id, sig) => fetch('/v1/carts/' + id + '/addresses', {
	sig
});


/**
 * 搜索地址
 */

export const searchNearby = keyword => fetch('/v1/pois', {
	type: 'nearby',
	keyword
});


/**
 * 添加地址
 */

export const postAddAddress = (userId, address, address_detail, geohash, name, phone, phone_bk, poi_type, sex, tag, tag_type) => fetch('/v1/users/' + userId + '/addresses', {
	address,
	address_detail,
	geohash,
	name,
	phone,
	phone_bk,
	poi_type,
	sex,
	tag,
	tag_type,
}, 'POST');


/**
 * 下订单
 */

export const placeOrders = (user_id, cart_id, address_id, description, entities, geohash, sig) => fetch('/v1/users/' + user_id + '/carts/' + cart_id + '/orders', {
	address_id,
	come_from: "mobile_web",
	deliver_time: "",
	description,
	entities,
	geohash,
	paymethod_id: 1,
	sig,
}, 'POST');


/**
 * 重新发送订单验证码
 */

export const rePostVerify = (cart_id, sig, type) => fetch('/v1/carts/' + cart_id + '/verify_code', {
	sig,
	type,
}, 'POST');



/**
 * 下订单
 */

export const validateOrders = ({
	user_id,
	cart_id,
	address_id,
	description,
	entities,
	geohash,
	sig,
	validation_code,
	validation_token
}) => fetch('/v1/users/' + user_id + '/carts/' + cart_id + '/orders', {
	address_id,
	come_from: "mobile_web",
	deliver_time: "",
	description,
	entities,
	geohash,
	paymethod_id: 1,
	sig,
	validation_code,
	validation_token,
}, 'POST');


/**
 * 重新发送订单验证码
 */

export const payRequest = (merchantOrderNo, userId) => fetch('/payapi/payment/queryOrder', {
	merchantId: 5,
	merchantOrderNo,
	source: 'MOBILE_WAP',
	userId,
	version: '1.0.0',
});



/**
 * 获取服务中心信息
 */

export const getService = () => fetch('/v3/profile/explain');



/**
*兑换会员卡
*/

export const vipCart = (id, number, password) => fetch('/member/v1/users/' + id + '/delivery_card/physical_card/bind',{
	number,
	password
}, 'POST')



/**
 * 获取红包
*/

export const getHongbaoNum = id => fetch('/promotion/v2/users/' + id + '/hongbaos?limit=20&offset=0');



/**
 * 获取过期红包
*/


export const getExpired = id => fetch('/promotion/v2/users/' + id + '/expired_hongbaos?limit=20&offset=0');


/**
 * 兑换红包
*/

export const exChangeHongbao = (id, exchange_code, captcha_code) => fetch('/v1/users/' + id + '/hongbao/exchange',{
	exchange_code,
	captcha_code,
}, 'POST');


/**
 * 获取用户信息
 */

export const getUser = () => fetch('/v1/user', {user_id: getStore('user_id')});


// /**
//  * 手机号登录
//  */

// var sendLogin = (code, mobile, validate_token) => fetch('/v1/login/app_mobile', {
// 	code,
// 	mobile,
// 	validate_token
// }, 'POST');


/**
 * 获取订单列表
 */

export const getOrderList = (user_id, offset) => fetch('/bos/v2/users/' + user_id + '/orders', {
	limit: 10,
	offset,
});


/**
 * 获取订单详情
 */

export const getOrderDetail = (user_id, orderid) => fetch('/bos/v1/users/' + user_id + '/orders/' + orderid + '/snapshot');


/**
*个人中心里编辑地址
*/

export const getAddressList = (user_id) => fetch('/v1/users/'+user_id+'/addresses')

/**
*个人中心里搜索地址
*/

export const getSearchAddress = (keyword) => fetch('v1/pois',{
	keyword:keyword,
	type:'nearby'
})

/**
* 删除地址
*/

export const deleteAddress = (userid, addressid) => fetch( '/v1/users/' + userid + '/addresses/' + addressid, {}, 'DELETE')



/**
 * 账号密码登录
 */
export const accountLogin = (username, password, captcha_code) => fetch('/v2/login', {username, password, captcha_code}, 'POST');


/**
 * 退出登录
 */
export const signout = () => fetch('/v2/signout');


/**
 * 改密码
 */
export const changePassword = (username, oldpassWord, newpassword, confirmpassword, captcha_code) => fetch('/v2/changepassword', {username, oldpassWord, newpassword, confirmpassword, captcha_code}, 'POST');
