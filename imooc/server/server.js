const express = require('express');
//新建一个app
const app = express();

app.get('/',function (req,res) {
    res.send('<h1>hello world</h1>');
});
app.get('/data',function (req,res) {
    res.json({name:'imooc react app',type:'IT'});
});

app.listen(9093,function () {
    console.log('node app start at port 9093');
});