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