# full-recruitment
### 使用心得
#### 简单跑起来
- 采用create-react-app快速生成一个react的app
- 安装redux
- 如果更想要自定义开发比如webpack、package.json等等就可以npm run eject来还原（这里有个坑就是一定要将之前所改动的东西提commit，如此才可以正常进行）
个人觉得以后可以优化的有很多：热加载、懒加载、eslint格式等等（项目还没开始等着到后面打脸）
#### 添加后端
- 安装express ```--save```可以自动加到package.json上面去
- 创建server目录为服务端目录，目录下建立server.js文件，可创建app，监听端口，进行get/post等等操作。
 **express使用**：
 1. app.use可以当我们的模块复杂后，拆单独模块
 2. ```res.send res.json  res.sendfile```返回文本、json、文件!
 **mongodb使用**
 1. 安装mongoose依赖
 2. 利用mongoose连接数据库，记住需要先开net start mongodb
 3. 增create，删remove，查find/fineOne，改update。
 #### 引入antd-mobile
- npm install
- 修改package.json
```
"babel": {
           "presets": [
             "react-app"
           ],
           "plugins":[
             ["import", { "libraryName": "antd-mobile", "style": "css" }]
           ]
         },
```
#### react
- react默认处理同步，需要处理异步级下载redux-thunk插件即可 applyMiddleware
- 可以使用react和redux，这样二者连接起来需要subscrib（参数可以是render），还有链接reactdevtool很麻烦
- 于是我们可以采用react+react-redux这样会更加方便提供connect方法等等
- 最后我们的connect也可以采用装饰器书写方式，下载一个插件！（bable-plugin-transform-decorators-legacy）
- 采用react-router4，开发SPA必备（注意加exact参数完全匹配）   *history.push也是一种路由跳转方法*

#### 引入cookie
```
const cookParser= require('cookie-parser');

app.use(cookParser());
app.use(bodyParser.json());
```
就可以进行cookie操作了，**但是需要注意```cookParse```和```bodyParse```的先后**！！

#### socket.io
- 基于websocket协议

#### 注意
1. 总是需要绑定this，有很多种方法！
2. 利用redux 的 diff dug很舒服！
3. 函数式编程、高阶组件(属性扩展、反向继承)