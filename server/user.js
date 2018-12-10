const express = require('express');
const utils=require('utility');

const Router = express.Router();
const models = require('./model');
const User=models.getModel('user');
const _filter={'pwd':0,'__v':0}

Router.get('/list',function(req, res){
    const { type } = req.query
    // User.remove({},function(e,d){})
    User.find({type},function(err,doc){
        return res.json({code:0,data:doc})
    })
})
Router.get('/info',function (req,res) {
    //用户有没有cookie
    const {userid}=req.cookies;
    if(!userid){
        return res.json({code:1})
    }
    User.findOne({_id:userid},_filter,function (err,doc) {
        if(err){
            return res.json({code:1,msg:'后端出错了'})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })
})
Router.post('/register',function (req,res) {
    const {user, pwd, type} = req.body;
    User.findOne({user: user}, function (err, doc) {
        if (doc) {
            return res.json({code: 1, mes: '用户名重复'})
        }
        const userModel = new User({user, pwd: md5pwd(pwd), type});
        userModel.save(function (e, d) {
            if (e) {
                return res.json({code: '1', mes: '后端出错了'})
            }
            //写cookie。
            const {user, type, _id} = d;
            res.cookie('userid', _id);
            return res.json({code: 0, data: {user, type, _id}});
        })
    })
})
Router.post('/login',function (req,res) {
    const {user,pwd,type}=req.body;
    User.findOne({user:user,pwd:md5pwd(pwd)},{'pwd':0},function (err,doc) {//第一个字段查询、第二个字段显示
        if(!doc){
            return res.json({code:1,msg:'用户名或密码错误'});
        }
        res.cookie('userid',doc._id);
        return res.json({code:0,data:doc});
    })
})
Router.post('/update',function (req,res) {
    //用户有没有cookie
    const {userid}=req.cookies;
    if(!userid){
        return res.json({code:1})
    }
    const body=req.body;
    User.findByIdAndUpdate(userid,body,function(err,doc){
      const data=Object.assign({},
        {user:doc.user,
        type:doc.type},
        body)
        return res.json({code:0,data})
        })
})
Router.get('/list',function (req,res) {
    User.find({},function (err,doc) {
        return res.json(doc);
    })
})

function md5pwd(pwd){
    const salt='rourouloveqiutu~~forever!!Boom';
    return utils.md5(utils.md5(pwd+salt));
}




module.exports = Router