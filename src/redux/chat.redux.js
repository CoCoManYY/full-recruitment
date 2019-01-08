import axios from 'axios';
import io from 'socket.io-client';
const socket = io('ws://localhost:9093');
//三个action
const MSG_LIST='MSG_LIST';
const MSG_RECV='MSG_RECV';
const MSG_READ='MSG_READ';

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
            const n=action.payload.to===action.userid?1:0;
            return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+n}
        case MSG_READ:
            const {from,num}=action.payload;
            return {...state,chatmsg:state.chatmsg.map(v=>({...v,read:from===v.from?true:v.read})),unread:state.unread-num}
        default:
            return state;
    }
}
function msgList(msg,users) {
    console.log(users);
    return {type:'MSG_LIST',payload:{msg,users}}
}

function msgRecv(msg) {
    return {type: MSG_RECV,payload:msg}
}

function msgRead({from,userid,num}){
    return {type:MSG_READ,payload:{from,userid,num}}
}

export function readMsg(from){
    return (dispatch,getState)=>{
        axios.post('/user/readmsg',{from})
            .then(res=>{
                const userid=getState().user._id;
                if(res.status===200&&res.data.code===0){
                    dispatch(msgRead({userid,from,num:res.data.num}))
                }
            })
    }

}

export function recvMsg() {
    return (dispatch,getState)=>{
        socket.on('recvmsg',function (data) {
            console.log('recvmsg',data)
            const userid = getState().user._id
            dispatch(msgRecv(data, userid))
        })
    }

}
export function sendMsg({from,to,msg}) {
    return dispatch=>{
        socket.emit('sendmsg',{from,to,msg});
    }
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