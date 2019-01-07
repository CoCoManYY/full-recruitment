import React, {Component} from 'react';
import {InputItem, List} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMsgList,sendMsg,recvMsg} from '../../redux/chat.redux'
@connect(
    state=>state,
    {getMsgList,sendMsg,recvMsg}
)
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            msg: []
        }
    }

    componentDidMount() {
        this.props.getMsgList();
        this.props.recvMsg();
        // socket.on('recvmsg', (data)=> {
        //     this.setState({
        //         msg: [...this.state.msg, data.text]
        //     })
        // })
    }

    handleSubmit() {
        // socket.emit('sendmsg', {text: this.state.text});
        //清空输入框
        const from = this.props.user._id;
        const to=this.props.match.params.user;
        const msg=this.state.text;
        this.props.sendMsg({from,to,msg});
        this.setState({text: ''});
    }

    render() {
        return (
            <div>
                {this.state.msg.map(v=>{
                    return <p key={v}>{v}</p>
                })}
                <div className={'stick-footer'}>
                    <List>
                        <InputItem
                            placeholder={'请输入'}
                            value={this.state.text}
                            onChange={v => {
                                this.setState({text: v})
                            }}
                            extra={<span onClick={() => this.handleSubmit()}>发送</span>}>
                        </InputItem>
                    </List>
                </div>
            </div>
        )
    }
}

export default Chat;
