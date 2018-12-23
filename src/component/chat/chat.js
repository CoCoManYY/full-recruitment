import React,{Component} from 'react';

class Chat extends Component{

    render(){
        console.log(this.props);
        return (
            <h2> chat with user:{this.props.match.params.user}</h2>
        )
    }
}

export default Chat;
