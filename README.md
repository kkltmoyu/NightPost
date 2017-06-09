# [NightPost](https://github.com/kkltmoyu/NightPost/)
这是一个具有贴吧功能的Web工程，发帖、查询发帖信息、图表统计、发表用户评论、用户注册登陆注销等。
本工程使用React全家桶+NodeJS+MongoDB搭建。当然，如果你愿意，也可以使用此工程作为脚手架进行项目构建或者学习。

## 关键技术
* 1.前端
	>ReactJS-15.5 + React-router-4 + redux + react-redux + antd组件库 + recharts-1.0 + ES6 + webpack + sass + redux DEVTOOLS（默认关闭，需要请在index.js中取消注释）<br/>
	其中antd组件与recharts库均已配置为按需加载
* 2.后端
	>NodeJS + express4 + MongoDB（MongoDB未集成在工程中请自行安装）<br/>
	前后端完全分离<br/>
	

## 项目开发
开发阶段采用nodeJS 7.9,前端调试使用chrom 51，后端nodeJS调试使用devtool

## 项目运行
### 1.开始 
	根据db.sh中的说明修改db.sh路径为自己本机上的mongo路径
### 2.运行
    git clone https://github.com/kkltmoyu/NightPost.git
    npm install安装库
    启动mongo：./db.sh
    启动node服务器端：node server/index.js
##### 开发环境:
    npm run dev
    浏览器输入 localhost:7000
##### 生产环境:
    npm run dist

![NightPost](https://raw.githubusercontent.com/kkltmoyu/night/master/main.PNG) 
![NightPost](https://raw.githubusercontent.com/kkltmoyu/night/master/tongji.PNG) 


# In English

This is a post-bar-project for Web,you can publish your topics ,query your topics,submit your comment,user register login and logout,it will generate your statistical chart automatically.This project is built by ReactJs stack + NodeJS + MongoDB.Actually you can use the project as your startkit or biolerplate if you want.

## Major knowledge used:
* 1.front-end development
	>ReactJS-15.5 + React-router-4 + redux + react-redux + antd lib + recharts-1.0 + ES6 + webpack + sass + redux DEVTOOLS（closed default，you can open it in index.js）<br/>
	antd lib and recharts lib is set to just load what they need.
* 2.server
	>NodeJS + express4 + MongoDB（you need to intall MongoDB by yourself）<br/>
	

## In development stage
	I use nodeJS 7.9 for server environment,the front-end's debugger uses chrom 51，server's debugger uses devtool

## In running stage
	If you want to run this project, you should follow this steps:
### 1.config DB 
	you need to follow the db.sh and modify the mongoDB parh to yourself 
### 2.running
    git clone https://github.com/kkltmoyu/NightPost.git
    npm install
    start MongoDB：./db.sh
    start nodeJS server:node server/index.js

##### develop environment:
    npm run dev
    in explorer: localhost:7000

##### publish environment:
    npm run dist
