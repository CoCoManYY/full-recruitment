const express = require('express');
const Router = express.Router();
const models = require('./model');
const User=models.getModel('user');
Router.get('/info',function (req,res) {
    //用户有没有cookie
    return res.json({code:1})
});
Router.post('/register',function (req,res) {
    console.log(req.body);
    const {user,pwd,type}=req.body;
    User.findOne({user:user},function (err,doc) {
        if(doc){
            return res.json({code:1,mes:'用户名重复'})
        }
        User.create({user,pwd,type},function (e,d) {
            if(e) {
                return res.json({code: '1', mes: '后端出错了'})
            }
            //写cookie。
            return res.json({code:0})
        })
    })
})
Router.get('/list',function (req,res) {
    User.find({},function (err,doc) {
        return res.json(doc);
    })
})

module.exports = Router