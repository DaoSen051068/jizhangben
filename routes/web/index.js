var express = require('express');
const AccountModel = require('../../models/AccountModel');
/* GET home page. */
//记账本的列表
const moment = require('moment');
const checkLoginMiddleware =require('../../middlewares/checkLoginMiddleware')
var router = express.Router();


//添加首页的路由规则
router.get('/',(req,res) => {
  res.redirect('/account')
})
router.get('/account',checkLoginMiddleware, function(req, res, next) {
  //判断是否登录
  // let accounts =  db.get('accounts').value()
  AccountModel.find().sort({ time: -1 }).exec()
  .then(data => {
    console.log(data);
    // 在这里处理查询结果
    res.render('list', { accounts: data });
  })
  .catch(err => {
    console.log(err);
    // 在这里处理错误
    res.status(500).send('读取失败');
  });

  //console.log(accounts)

});
//添加记录
router.get('/account/create',checkLoginMiddleware, function(req, res, next) {
  res.render('create')
});
router.post('/account',checkLoginMiddleware, (req, res) => {
  //插入数据库
  let mark = 0
  AccountModel.create({
    ...req.body,
    //修改 time 属性的值
    time: moment(req.body.time).toDate()
  }).catch(err => {
    console.error(err);
    res.status(500).send('删除失败');
  }).then(data => {
    // 在这里处理成功创建数据项后的逻辑
    console.log(data)
    res.render('success', { msg: '添加成功了~~~', mark: mark ,url:'/account'});
  })
});
//删除记录
router.get('/account/:id',checkLoginMiddleware,(req,res) => {
let id = req.params.id
let mark = 0
console.log(id)
AccountModel.deleteOne({_id:id}).then(data => {
  res.render('success',{msg:'删除成功了~~~',mark:mark,url:'/account'})
}).catch(err => {
  console.error(err)
})

})

module.exports = router;
