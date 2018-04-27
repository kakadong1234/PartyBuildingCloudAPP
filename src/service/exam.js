const ALL_LIST =[
  {
    ID: 1,
    title: '试卷01',
    imgUrl: '',
    status: 0, //未开始考试
    leaveTime: 30 * 60, //考试剩余时间
    score: 0, //考试分数, 未考和正在考时为0
    examination: [
      {
        ID: 1,
        index: 1,
        title: '十九大什么时候召开的?', //题干
        type: 1,  //1表示选择题, 2表示判断题
        items: [//选项
          {
            key: 'A',
            value: '2018年'
          },
          {
            key: 'B',
            value: '2017年'
          },
          {
            key: 'C',
            value: '2016年'
          },
          {
            key: 'D',
            value: '2015年'
          },
        ]
      },
      {
        ID: 2,
        index: 2,
        title: '十九大什么时候召开的2?', //题干
        type: 1,  //1表示选择题, 2表示判断题
        items: [//选项
          {
            key: 'A',
            value: '2017年'
          },
          {
            key: 'B',
            value: '2018年'
          },
          {
            key: 'C',
            value: '2016年'
          },
          {
            key: 'D',
            value: '2015年'
          },
        ]
      },
      {
        ID: 3,
        index: 3,
        title: '十九大什么时候召开的?', //题干
        type: 1,  //1表示选择题, 2表示判断题
        items: [//选项
          {
            key: 'A',
            value: '2016年'
          },
          {
            key: 'B',
            value: '2017年'
          },
          {
            key: 'C',
            value: '2018年'
          },
          {
            key: 'D',
            value: '2015年'
          },
        ]
      },
      {
        ID: 4,
        index: 4,
        title: '十九大什么时候召开的?', //题干
        type: 1,  //1表示选择题, 2表示判断题
        items: [//选项
          {
            key: 'A',
            value: '2015年'
          },
          {
            key: 'B',
            value: '2017年'
          },
          {
            key: 'C',
            value: '2016年'
          },
          {
            key: 'D',
            value: '2018年'
          },
        ]
      },
      {
        ID: 5,
        index: 5,
        title: '十九大是2017年召开的吗?', //题干
        type: 2,  //1表示选择题, 2表示判断题
      },
      {
        ID: 6,
        index: 6,
        title: '十九大是2018年召开的吗?', //题干
        type: 2,  //1表示选择题, 2表示判断题
      },
    ],
    userAnswer:['A', '-1', 'C', '-1', '0', '1'], //用户的答案 // -1表示未答 , 
    answer: ['A', 'B', 'C', 'D', '0', '1'] //标准答案 , 判断题 0表示错误, 1表示正确
  },

  {
    ID: 2,
    title: '试卷05',
    imgUrl: '',
    status: 1, //正在考试
    leaveTime: 100, //考试剩余时间(秒)
    score: 0, //考试分数, 未考和正在考时为0
    examination: [
      {
        ID: 1,
        index: 1,
        title: '十九大什么时候召开的?', //题干
        type: 1,  //1表示选择题, 2表示判断题
        items: [//选项
          {
            key: 'A',
            value: '2018年'
          },
          {
            key: 'B',
            value: '2017年'
          },
          {
            key: 'C',
            value: '2016年'
          },
          {
            key: 'D',
            value: '2015年'
          },
        ]
      },
      {
        ID: 2,
        index: 2,
        title: '十九大什么时候召开的2?', //题干
        type: 1,  //1表示选择题, 2表示判断题
        items: [//选项
          {
            key: 'A',
            value: '2017年'
          },
          {
            key: 'B',
            value: '2018年'
          },
          {
            key: 'C',
            value: '2016年'
          },
          {
            key: 'D',
            value: '2015年'
          },
        ]
      },
      {
        ID: 3,
        index: 3,
        title: '十九大什么时候召开的?', //题干
        type: 1,  //1表示选择题, 2表示判断题
        items: [//选项
          {
            key: 'A',
            value: '2016年'
          },
          {
            key: 'B',
            value: '2017年'
          },
          {
            key: 'C',
            value: '2018年'
          },
          {
            key: 'D',
            value: '2015年'
          },
        ]
      },
      {
        ID: 4,
        index: 4,
        title: '十九大什么时候召开的?', //题干
        type: 1,  //1表示选择题, 2表示判断题
        items: [//选项
          {
            key: 'A',
            value: '2015年'
          },
          {
            key: 'B',
            value: '2017年'
          },
          {
            key: 'C',
            value: '2016年'
          },
          {
            key: 'D',
            value: '2018年'
          },
        ]
      },
      {
        ID: 5,
        index: 5,
        title: '十九大是2017年召开的吗?', //题干
        type: 2,  //1表示选择题, 2表示判断题
      },
      {
        ID: 6,
        index: 6,
        title: '十九大是2018年召开的吗?', //题干
        type: 2,  //1表示选择题, 2表示判断题
      },
    ],
    userAnswer:['A', '-1', 'C', '-1', '0', '1'], //用户的答案 // -1表示未答 , 
    answer: ['A', 'B', 'C', 'D', '0', '1'] //标准答案 , 判断题 0表示错误, 1表示正确
  },

  {
    ID: 3,
    title: '试卷03',
    imgUrl: '',
    status: 3, //完成考试
    leaveTime: 20, //考试剩余时间(秒)
    score: 90, //考试分数, 未考和正在考时为0
    examination: [
      {
        ID: 1,
        index: 1,
        title: '十九大什么时候召开的?', //题干
        type: 1,  //1表示选择题, 2表示判断题
        items: [//选项
          {
            key: 'A',
            value: '2018年'
          },
          {
            key: 'B',
            value: '2017年'
          },
          {
            key: 'C',
            value: '2016年'
          },
          {
            key: 'D',
            value: '2015年'
          },
        ]
      },
      {
        ID: 2,
        index: 2,
        title: '十九大什么时候召开的2?', //题干
        type: 1,  //1表示选择题, 2表示判断题
        items: [//选项
          {
            key: 'A',
            value: '2017年'
          },
          {
            key: 'B',
            value: '2018年'
          },
          {
            key: 'C',
            value: '2016年'
          },
          {
            key: 'D',
            value: '2015年'
          },
        ]
      },
      {
        ID: 3,
        index: 3,
        title: '十九大什么时候召开的?', //题干
        type: 1,  //1表示选择题, 2表示判断题
        items: [//选项
          {
            key: 'A',
            value: '2016年'
          },
          {
            key: 'B',
            value: '2017年'
          },
          {
            key: 'C',
            value: '2018年'
          },
          {
            key: 'D',
            value: '2015年'
          },
        ]
      },
      {
        ID: 4,
        index: 4,
        title: '十九大什么时候召开的?', //题干
        type: 1,  //1表示选择题, 2表示判断题
        items: [//选项
          {
            key: 'A',
            value: '2015年'
          },
          {
            key: 'B',
            value: '2017年'
          },
          {
            key: 'C',
            value: '2016年'
          },
          {
            key: 'D',
            value: '2018年'
          },
        ]
      },
      {
        ID: 5,
        index: 5,
        title: '十九大是2017年召开的吗?', //题干
        type: 2,  //1表示选择题, 2表示判断题
      },
      {
        ID: 6,
        index: 6,
        title: '十九大是2018年召开的吗?', //题干
        type: 2,  //1表示选择题, 2表示判断题
      },
    ],
    userAnswer:['A', '-1', 'C', '-1', '0', '1'], //用户的答案 // -1表示未答 , 
    answer: ['A', 'B', 'C', 'D', '0', '1'] //标准答案 , 判断题 0表示错误, 1表示正确
  },

  {
    ID: 4,
    title: '试卷04',
    imgUrl: '',
    status: 0,
    leaveTime: 30 * 60, //考试剩余时间
    score: 0, //考试分数, 未考和正在考时为0
    examination: [
      {
        ID: 1,
        index: 1,
        title: '十九大什么时候召开的?', //题干
        type: 1,  //1表示选择题, 2表示判断题
        items: [//选项
          {
            key: 'A',
            value: '2018年'
          },
          {
            key: 'B',
            value: '2017年'
          },
          {
            key: 'C',
            value: '2016年'
          },
          {
            key: 'D',
            value: '2015年'
          },
        ]
      },
      {
        ID: 2,
        index: 2,
        title: '十九大什么时候召开的2?', //题干
        type: 1,  //1表示选择题, 2表示判断题
        items: [//选项
          {
            key: 'A',
            value: '2017年'
          },
          {
            key: 'B',
            value: '2018年'
          },
          {
            key: 'C',
            value: '2016年'
          },
          {
            key: 'D',
            value: '2015年'
          },
        ]
      },
      {
        ID: 3,
        index: 3,
        title: '十九大什么时候召开的?', //题干
        type: 1,  //1表示选择题, 2表示判断题
        items: [//选项
          {
            key: 'A',
            value: '2016年'
          },
          {
            key: 'B',
            value: '2017年'
          },
          {
            key: 'C',
            value: '2018年'
          },
          {
            key: 'D',
            value: '2015年'
          },
        ]
      },
      {
        ID: 4,
        index: 4,
        title: '十九大什么时候召开的?', //题干
        type: 1,  //1表示选择题, 2表示判断题
        items: [//选项
          {
            key: 'A',
            value: '2015年'
          },
          {
            key: 'B',
            value: '2017年'
          },
          {
            key: 'C',
            value: '2016年'
          },
          {
            key: 'D',
            value: '2018年'
          },
        ]
      },
      {
        ID: 5,
        index: 5,
        title: '十九大是2017年召开的吗?', //题干
        type: 2,  //1表示选择题, 2表示判断题
      },
      {
        ID: 6,
        index: 6,
        title: '十九大是2018年召开的吗?', //题干
        type: 2,  //1表示选择题, 2表示判断题
      },
    ],
    userAnswer:['A', '-1', 'C', '-1', '0', '1'], //用户的答案 // -1表示未答 , 
    answer: ['A', 'B', 'C', 'D', '0', '1'] //标准答案 , 判断题 0表示错误, 1表示正确
  },


]
export const getExamList = (user_id,status, offset) => {
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

export const getExam = (id) => {
	return new Promise(function(reslove, reject){
	    const data = ALL_LIST.find(function(exam){
		  return eaxm.ID === parseInt(id)
	  })
	  reslove(data)
	})
};