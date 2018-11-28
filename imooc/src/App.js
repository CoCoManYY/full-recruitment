import React,{Component} from 'react';

class App extends Component{
    render(){
        const boss='李云龙';
        return (
            <div>
                <h2>独立团，团长{boss}</h2>
                <FirstApp> </FirstApp>
            </div>
        )
    }
}
class FirstApp extends Component{
    render(){
        const boss='囚徒';
        return (<h2>营长，{boss}</h2>)
    }
}
export default App;