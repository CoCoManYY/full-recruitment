const express = require('express');
const bodyParser=require('body-parser');
const cookParser= require('cookie-parser');
const userRouter=require('./user');

const app = express();
//先后
app.use(cookParser());
app.use(bodyParser.json());
app.use('/user',userRouter);

app.listen(9093,function(){
	console.log('Node app start at port 9093')
});



