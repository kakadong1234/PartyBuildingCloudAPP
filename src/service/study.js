const ALL_LIST =[
  {
    ID: 1,
    title: '学习01',
    imgUrl: '',
    status: 0,
    progress: 0,
    des: 'des11'
  },

  {
    ID: 2,
    title: '学习05',
    imgUrl: '',
    status: 1,
    progress: 70,
    des: 'des22'
  },

  {
    ID: 3,
    title: '学习03',
    imgUrl: '',
    status: 3,
    progress: 100,
    des: 'des13'
  },

  {
    ID: 4,
    title: '学习04',
    imgUrl: '',
    status: 0,
    progress: 0,
    des: 'des14'
  },

  {
    ID:5,
    title: '学习05',
    imgUrl: '',
    status: 1,
    progress: 60,
    des: 'des15'
  },

]
export const getStudyList = (user_id,status, offset) => {
	console.log('----%%%%%-----')
	console.log(offset)
	const limit = 20
	return new Promise(function(reslove, reject){
	    const list = ALL_LIST.filter(function(study){
		  return study.status === parseInt(status)
	  })
	  console.log(list.length)
	  reslove(list.slice(offset, offset + limit))
	})
};

export const getStudy = (id) => {
	return new Promise(function(reslove, reject){
	    const data = ALL_LIST.find(function(study){
		  return study.ID === parseInt(id)
	  })
	  reslove(data)
	})
};