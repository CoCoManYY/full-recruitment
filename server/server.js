const express = require('express');
const utils=require('utility');
const bodyParser=require('body-parser');
const cookParser= require('cookie-parser');
const app = express();
//work with express
const server=require('http').Server(app);
const io=require('socket.io')(server);

io.on('connection',function(socket){
	socket.on('sendmsg',function (data) {
		console.log(data);
		//全局发送
		io.emit('recvmsg',data);
	});
});




const userRouter=require('./user');


//先后
app.use(cookParser());
app.use(bodyParser.json());
app.use('/user',userRouter);

server.listen(9093,function(){
	console.log('Node app start at port 9093')
});



