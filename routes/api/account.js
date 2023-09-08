var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')

const moment = require('moment');
const AccountModel = require('../../models/AccountModel');
const checkTokenMiddleware =require('../../middlewares/checkTokenMiddleware')
/* GET home page. */
//记账本的列表
router.get('/account',checkTokenMiddleware, function(req, res, next) {
  // let accounts =  db.get('accounts').value()
  console.log(req.user)
  AccountModel.find().sort({ time: -1 }).exec()
  .then(data => {
    console.log(data);
    // 在这里处理查询结果
    // res.render('list', { accounts: data });
    res.json({
        code:'0000',
        msg:'读取成功',
        data:data
    })
  })
  .catch(err => {
    // console.log(err);
    // // 在这里处理错误
    // res.status(500).send('读取失败');
    res.json({
        code:'1001',
        msg:'读取失败',
        data:null
    })
    return
  });


});

router.post('/account',checkTokenMiddleware, (req, res) => {
  //插入数据库
  AccountModel.create({
    ...req.body,
    //修改 time 属性的值
    time: moment(req.body.time).toDate()
  }).catch(err => {
    res.json({
        code:'1002',
        msg:'创建失败',
        data:null
    })
    return
  }).then(data => {
    // 在这里处理成功创建数据项后的逻辑
    res.json({
        code:'0000',
        msg:'创建成功',
        data:data
    })
  })
});
//删除记录
router.delete('/account/:id',checkTokenMiddleware,(req,res) => {
let id = req.params.id
AccountModel.deleteOne({_id:id}).then(data => {
    res.json({
        code:'0000',
        msg:'删除成功',
        data:null
    })
    return;
}).catch(err => {
    res.json({
        code:'1003',
        msg:'删除失败',
        data:null
    })
})
})

//获取单个账单信息
router.get('/account/:id',checkTokenMiddleware,(req,res) => {
    let {id} = req.params;
    AccountModel.findById(id).then(data => {
        res.json({
            code:'0000',
            msg:'查询成功',
            data:data
        })
        return;
    }).catch(err => {
        res.json({
            code:'1004',
            msg:'查询失败',
            data:null
        })
    })
})

router.patch('/account/:id',checkTokenMiddleware,(req,res) => {
    let {id} = req.params
    AccountModel.updateOne({_id:id},req.body).then(data => {
        AccountModel.findById(id).catch(err => {
            res.json({
                code:'1004',
                msg:'查询失败',
                data:null
            })
        }).then(data => { res.json({
            code:'0000',
            msg:'更新成功',
            data:data
        })})
       
    }).catch(err => {
        
        res.json({
            code:'1005',
            msg:'更新失败',
            data:null
        })
    })


})

module.exports = router;
