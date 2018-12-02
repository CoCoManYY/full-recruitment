import React,{Component} from 'react';
import axios from 'axios';
import {withRouter}from 'react-router-dom';
@withRouter
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
        console.log(this.props);
        axios.get('/user/info').then(res=>{
            if(res.status===200){
                if(res.data.code===0){

                }else {
                    this.props.history.push('/login');
                }
                console.log(res.data);
            }
        })
    }
    render(){
        return <div></div>
    }
}

export default AuthRoute;