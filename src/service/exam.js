const ALL_LIST = [
  {
    ID: 1,
    title: '试卷01',
    imgUrl: 'http://7xrsfo.com1.z0.glb.clouddn.com/exam.png',
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
    userAnswer: ['A', '-1', 'C', '-1', '0', '1'], //用户的答案 // -1表示未答 , 
    answer: ['A', 'B', 'C', 'D', '0', '1'] //标准答案 , 判断题 0表示错误, 1表示正确
  },

  {
    ID: 2,
    title: '试卷05',
    imgUrl: 'http://7xrsfo.com1.z0.glb.clouddn.com/exam.png',
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
    userAnswer: ['A', '-1', 'C', '-1', '0', '1'], //用户的答案 // -1表示未答 , 
    answer: ['A', 'B', 'C', 'D', '0', '1'] //标准答案 , 判断题 0表示错误, 1表示正确
  },

  {
    ID: 3,
    title: '试卷03',
    imgUrl: 'http://7xrsfo.com1.z0.glb.clouddn.com/exam.png',
    status: 2, //完成考试
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
    userAnswer: ['A', '-1', 'C', '-1', '0', '1'], //用户的答案 // -1表示未答 , 
    answer: ['A', 'B', 'C', 'D', '0', '1'] //标准答案 , 判断题 0表示错误, 1表示正确
  },

  {
    ID: 4,
    title: '试卷04',
    imgUrl: 'http://7xrsfo.com1.z0.glb.clouddn.com/exam.png',
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
    userAnswer: ['A', '-1', 'C', '-1', '0', '1'], //用户的答案 // -1表示未答 , 
    answer: ['A', 'B', 'C', 'D', '0', '1'] //标准答案 , 判断题 0表示错误, 1表示正确
  },


]
export const getExamList = (user_id, offset) => {
  console.log('----%%%%%-----')
  console.log(offset)
  const limit = 20
  return new Promise(function (reslove, reject) {
    const list = ALL_LIST
    console.log(list.length)
    reslove(list.slice(offset, offset + limit))
  })
};

export const getExam = (id) => {
  return new Promise(function (reslove, reject) {
    const data = ALL_LIST.find(function (exam) {
      return eaxm.ID === parseInt(id)
    })
    reslove(data)
  })
};

export const getERankingList = () => {
  return new Promise(function (reslove, reject) {
    const data = [
      {
        rank: 1,
        memberId: 1,
        name: '徐尚壮',
        headImgUrl: 'http://7xrsfo.com1.z0.glb.clouddn.com/touxiang02.jpeg',
        from: '大河镇',
        score: 95
      },
      {
        rank: 2,
        memberId: 2,
        name: '王大壮',
        headImgUrl: 'http://7xrsfo.com1.z0.glb.clouddn.com/dang.png',
        from: '毕节区',
        score: 93
      },
      {
        rank: 3,
        memberId: 3,
        name: '杨怀良',
        headImgUrl: 'http://7xrsfo.com1.z0.glb.clouddn.com/touxiang01.jpeg',
        from: '毕节区',
        score: 91
      },
      {
        rank: 4,
        memberId: 4,
        name: '周惠良',
        headImgUrl: 'http://7xrsfo.com1.z0.glb.clouddn.com/dang.png',
        from: '钟山区',
        score: 90
      },
      {
        rank: 5,
        memberId: 5,
        name: '刘益民',
        headImgUrl: 'http://7xrsfo.com1.z0.glb.clouddn.com/touxiang02.jpeg',
        from: '钟山区',
        score: 88
      },
      {
        rank: 6,
        memberId: 6,
        name: '马嘉欣',
        headImgUrl: 'http://7xrsfo.com1.z0.glb.clouddn.com/touxiang01.jpeg',
        from: '钟山区',
        score: 86
      },
      {
        rank: 7,
        memberId: 7,
        name: '谭江东',
        headImgUrl: 'http://7xrsfo.com1.z0.glb.clouddn.com/touxiang01.jpeg',
        from: '钟山区',
        score: 84
      },
      {
        rank: 8,
        memberId: 8,
        name: '朱牧',
        headImgUrl: 'http://7xrsfo.com1.z0.glb.clouddn.com/touxiang02.jpeg',
        from: '钟山区',
        score: 80
      },
    ]
    reslove(data)
  })
};