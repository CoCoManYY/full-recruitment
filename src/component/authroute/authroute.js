import React,{Component} from 'react';
import axios from 'axios';
import {withRouter}from 'react-router-dom';
import {loadData} from '../../redux/user_redux';
import {connect} from "react-redux";
//https://www.imooc.com/wenda/detail/384869
@withRouter
@connect(
    null,
    {loadData}
)
class AuthRoute extends Component{
    componentDidMount(){
        //获取用户信息
        // 是否登陆
        // 现在的url地址 login不需要跳转
        // 用户的type是boss还是牛人
        // 用户是否完善信息（选择头像、个人简介）
        const publicList=['/login','/register'];
        const pathname=this.props.location.pathname;
        if(publicList.indexOf(pathname)>-1){
            return null;
        }
        axios.get('/user/info').then(res=>{
            if(res.status===200){
                if(res.data.code===0){
                    this.props.loadData(res.data);
                }else {
                    this.props.history.push('/login');
                }
            }
        })
    }
    render(){
        return <div></div>
    }
}

export default AuthRoute;