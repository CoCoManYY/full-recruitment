const express = require('express');
const utils=require('utility');
const bodyParser=require('body-parser');
const cookParser= require('cookie-parser');
const model = require('./model')
const Chat = model.getModel('chat')
const app = express();
Chat.remove({},function (err,doc) {

})
//work with express
const server=require('http').Server(app);
const io=require('socket.io')(server);

io.on('connection',function(socket){
	socket.on('sendmsg',function (data) {
		console.log('server receive sendmsg',data)
		const {from, to, msg} = data
		const chat_id = [from,to].sort().join('_')
		Chat.create({chat_id,from,to,content:msg},function(err,doc){
			io.emit('recvmsg', Object.assign({},doc._doc))
		})
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



