import React from 'react'
import Logo from "../../component/logo/logo";
import {List,InputItem,Radio,WingBlank,WhiteSpace,Button} from 'antd-mobile';

class Register extends React.Component{
	constructor(props){
		super(props)
		this.state={
			type:'genius'
		}
	}
	render(){
		const RadioItem=Radio.RadioItem;
		return (
			<div>
				<Logo/>
				<h1>注册</h1>
				<WingBlank>
                    <List>
                        <InputItem>用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem>密码</InputItem>
                        <WhiteSpace/>
                        <InputItem>确认密码</InputItem>
                        <WhiteSpace/>
                    </List>
					<WhiteSpace/>
                    <RadioItem checked={this.state.type==='genius'}>牛人</RadioItem>
                    <RadioItem checked={this.state.type==='boss'}>Boss</RadioItem>
                    <WhiteSpace/>
                    <Button type={"primary"}>注册</Button>
				</WingBlank>

			</div>

		)
	}
}

export default Register