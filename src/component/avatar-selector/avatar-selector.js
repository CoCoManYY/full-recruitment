import React,{Component} from 'react';
import {Grid, List} from "antd-mobile";
import PropTypes from 'prop-types';//用于类型检测，组件之间的参数传递

class AvatarSelector extends Component{
    static propTypes={
        selectAvatar: PropTypes.func.isRequired
    };
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        const avatarList='boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
                            .split(',')
                            .map(v=>({
                                icon: require(`../img/${v}.png`),
                                text: v}));
        const gridHeader=this.state.icon
                                ?(<div><span>
                                    已选择头像
                                </span>
                                <img style={{width:20}} src={this.state.icon} alt={this.state.text}/>
                                </div>):
                                <div>请选择头像</div>
        return (
            <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid
                    data={avatarList}
                    columnNum={5}
                    onClick={elm=>{
                        this.setState(elm);
                        this.props.selectAvatar(elm.text);
                    }}/>
                </List>
            </div>
        )
    }
}

export default AvatarSelector;