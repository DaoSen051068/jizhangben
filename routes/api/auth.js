var express = require('express');
var router = express.Router();
const UserModel = require('../../models/UserModel')
const jwt = require('jsonwebtoken')
const md5 = require('md5')
const { serectt } = require('../config/config')
//登录操作
router.post('/login',(req,res) => {
    let {username,password} = req.body
    UserModel.findOne({username:username,password:md5(password)}).then(data => {
        if(!data){
          return res.json({
                code:'2002',
                msg:'用户名或密码错误',
                data:null
            })
        }
    //创建用户当前token
    let token = jwt.sign({
        usernmae:data.username,
        _id:data._id
    },serectt,
    {expiresIn:60*60*24*7})
    //响应token
    res.json({
        code:'0000',
        msg:'登陆成功',
        data:token
    })
    //登陆成功响应    
    res.render('success',{msg:'登录成功', mark:0,url:'/account'})
    }).catch(err => {
    res.json({
        code:'2001',
        msg:'数据库读取失败',
        data:null
    })
    return;
    })
})
//退出登录
router.post('/logout', (req, res) => {
    //销毁 session
    req.session.destroy(() => {
      res.render('success', {msg: '退出成功',mark:0, url: '/login'});
    })
  });


module.exports = router;
