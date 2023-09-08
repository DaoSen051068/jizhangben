var express = require('express');
var router = express.Router();
const UserModel = require('../../models/UserModel')

const md5 = require('md5')
//注册
router.get('/reg',(req,res) => {
    res.render('auth/reg')
})


router.post('/reg',(req,res) => {
    UserModel.create({...req.body,password:md5(req.body.password)}).then(data => {
    res.render('success',{msg:'注册成功', mark:0,url:'/login'})
    }).catch(err => {
    res.status(500).send('注册失败,请稍后尝试')
    })
})

//登录
router.get('/login',(req,res) => {
    res.render('auth/login')
})
//登录操作
router.post('/login',(req,res) => {
    let {username,password} = req.body
    UserModel.findOne({username:username,password:md5(password)}).then(data => {
        if(!data){
            return res.send('账号或密码错误');
        }
    //写入session
    req.session.username = data.username
    req.session._id = data._id
    //登陆成功响应    
    res.render('success',{msg:'登录成功', mark:0,url:'/account'})
    }).catch(err => {
    res.status(500).send('登录失败,请稍后尝试')
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
