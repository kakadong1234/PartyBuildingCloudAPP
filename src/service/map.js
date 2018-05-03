export const getLocation = (address) => {
	return new Promise(function(reslove, reject){
        AMap.service('AMap.Geocoder',function(){
            new AMap.Geocoder({}).getLocation(address, function(status, result) {
              console.log('-----------status:' + status)
              if (status === 'complete' && result.info === 'OK') {
                const location = result.geocodes[0].location
                console.log(location)
                return reslove({longitude:location.lng, latitude: location.lat})
              }
              else {
                 return reject(new Error('获取经纬度失败, 错误为' + result.info))
              }
            })
        })
	})
};