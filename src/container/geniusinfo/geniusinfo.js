import React,{Component} from 'react';
import {InputItem, NavBar,TextareaItem,Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {update} from '../../redux/user_redux';
import AvatarSelector from '../../component/avatar-selector/avatar-selector';
import {Redirect} from "react-router-dom";

@connect(
    state=>state.user,
    {update}
)

class GeniusInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
            desc:''
        }
    }
    onChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render(){
        const path=this.props.location.pathname;
        return(
            <div>
                {this.props.redirectTo&&this.props.redirectTo!==path?<Redirect to={this.props.redirectTo}></Redirect>:null}
                <NavBar mode="dark">牛人 完善信息页面</NavBar>
                <AvatarSelector
                    selectAvatar={(imgname)=>{
                        this.setState({
                            avatar:imgname
                        })
                    }}>
                </AvatarSelector>
                <InputItem onChange={(v)=>this.onChange('title',v)}>
                    求职岗位
                </InputItem>
                <TextareaItem
                    onChange={(v)=>this.onChange('desc',v)}
                    rows={3}
                    autoHeight
                    title={'个人简介'}
                >
                </TextareaItem>
                <Button
                    onClick={()=>{this.props.update(this.state)}}
                    type={'primary'}>保存</Button>
            </div>
        )
    }
}

export default GeniusInfo;