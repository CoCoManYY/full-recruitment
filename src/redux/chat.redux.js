import axios from 'axios';
import io from 'socket.io-client';
const socket = io('ws://localhost:9093');
//三个action
const MSG_LIST='MSG_LIST';
const MSG_RECV='MSG_RECV';
const MSG_HEAD='MSG_HEAD';

const initState={
    chatmsg:[],
    users:{},
    unread:0
}
// 为什么返回函数，因为redux中间件
export function chat(state=initState,action) {
    switch (action.type) {
        case MSG_LIST:
            return {...state,chatmsg:action.payload.msg,users:action.payload.users,unread: action.payload.msg.filter(v=>!v.read).length};
        case MSG_RECV:
            return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+1}
        case MSG_HEAD:
        default:
            return state;
    }
}
function msgList(msg,users) {
    console.log(users);
    return {type:'MSG_LIST',payload:{msg,users}}
}
export function getMsgList() {
    return dispatch=>{
        axios.get('/user/getmsglist')
            .then(res=>{
                if(res.status===200&&res.data.code===0){
                    dispatch(msgList(res.data.msg,res.data.user));
                }
            })
    }
}

function msgRecv(msg) {
    return {type: MSG_RECV,payload:msg}
}
export function recvMsg() {
    return dispatch=>{
        socket.on('recvmsg',function (data) {
            console.log('recvmsg',data);
            dispatch(msgRecv(data))
        })
    }

}
export function sendMsg({from,to,msg}) {
    return dispatch=>{
        socket.emit('sendmsg',{from,to,msg});
    }
}