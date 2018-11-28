const express = require('express');
const mongoose = require('mongoose');

//链接mongodb,并且使用Imooc
const DB_URL='mongodb://127.0.0.1:27017/imooc';
mongoose.connect(DB_URL);
mongoose.connection.on('connected',function () {
    console.log('mongodb is connected');
});

// 类似于mysql的表，mongo里面有文档字段的概念
const User = mongoose.model('user',new mongoose.Schema({
    user:{type:String,require:true},
    age:{type:Number,require:true},
}));
//新增数据
User.create({
    user:'manman',
    age:9
},function(err,doc){
    if(!err){
        console.log(doc);
    }else{
        console.log(error);
    }
});


//新建一个app
User.update({user:"qiutu"},{'$set':{age:26}},function(err,doc){
    if(!err)
        console.log((doc))
});
User.remove({age:18},function (err,doc) {
    if(!err)
    console.log(doc);
});
const app = express();
app.get('/',function (req,res) {
    res.send('<h1>hello world</h1>');
});
app.get('/data',function (req,res) {
    User.findOne({user:'qiutu'},function(err,doc){
       return res.json(doc);
    });
    // res.json({name:'imooc react app',type:'IT'});
});
app.listen(9093,function () {
    console.log('node app start at port 9093');
});