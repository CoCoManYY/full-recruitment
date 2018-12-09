import React,{Component} from 'react';
import {InputItem, NavBar,TextareaItem,Button} from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector';
class BossInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            title:''
        }
    }
    onChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render(){
        return(
        <div>
            <NavBar mode="dark">Boss 完善信息页面</NavBar>
            <AvatarSelector
                selectAvatar={(imgname)=>{
                    this.setState({
                        avatar:imgname
                    })
                }}>
            </AvatarSelector>
            <InputItem onChange={(v)=>this.onChange('title',v)}>
                招聘职位
            </InputItem>
            <InputItem onChange={(v)=>this.onChange('company',v)}>
                公司名称
            </InputItem>
            <InputItem onChange={(v)=>this.onChange('money',v)}>
                职位薪资
            </InputItem>
            <TextareaItem
                onChange={(v)=>this.onChange('desc',v)}
                rows={3}
                autoHeight
                title={'职位要求'}
            >
            </TextareaItem>
            <Button type={'primary'}>保存</Button>
        </div>
        )
    }
}

export default BossInfo;