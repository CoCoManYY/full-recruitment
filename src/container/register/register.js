import React from 'react'
import Logo from "../../component/logo/logo";
import {List,InputItem,Radio,WingBlank,WhiteSpace,Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {register} from "../../redux/user_redux";
import {Redirect} from "react-router-dom";
import imoocFrom from '../../component/imooc-form/imooc-form';
@connect(
	state=>state.user,
	{register}
)
@imoocFrom
class Register extends React.Component{
	constructor(props){
		super(props)
		this.handleRegister=this.handleRegister.bind(this);//这个做法性能会好一些，但是没得办法传参数。
	}
	handleRegister(){
		this.props.register(this.props.state);
	}
	render(){
		const RadioItem=Radio.RadioItem;
		return (
			<div>
				{this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}
				<Logo/>
				<WingBlank>
                    <List>
						{this.props.msg?<p className={'error-msg'}>{this.props.msg}</p>:'' }
                        <InputItem
                            onChange={v=>this.props.handleChange('user',v)}
                        >用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem
							type={'password'}
                            onChange={v=>this.props.handleChange('pwd',v)}
						>密码</InputItem>
                        <WhiteSpace/>
                        <InputItem
							type={'password'}
                            onChange={v=>this.props.handleChange('repeatpwd',v)}
						>确认密码</InputItem>
                        <WhiteSpace/>
                    </List>
					<WhiteSpace/>
                    <RadioItem
						checked={this.props.state.type==='genius'}
                        onClick={()=>this.props.handleChange('type','genius')}
					>牛人</RadioItem>
                    <RadioItem
						checked={this.props.state.type==='boss'}
                        onClick={()=>this.props.handleChange('type','boss')}
					>Boss</RadioItem>
                    <WhiteSpace/>
                    <Button type={"primary"} onClick={this.handleRegister}>注册</Button>
				</WingBlank>
			</div>

		)
	}
}

export default Register