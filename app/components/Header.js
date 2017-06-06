import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'

import { Layout } from 'antd';
const { Header } = Layout;

import '../static/scss/header.scss'

class PostHeader extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.showRegister = this.showRegister.bind(this);
    this.logout = this.logout.bind(this);
  }
  componentDidMount(){
    this.props.actions.CheckIsLogin();
  }
  login(){
  	//console.log('login:',this.props);
  	this.props.actions.UpdateLoginState('login');
  }
  logout(){
    this.props.actions.LogOut();
  }
  showLogin(){
    this.props.actions.ShowModal('login','用户登录');
  }
  showRegister(){
    this.props.actions.ShowModal('register','用户注册');
  }
  render() {
  	let isLogin;
  	console.log('Header.js this.props is ',this.props)
  	if(this.props.header.isLogin){
      if(this.props.userInfo.userInfo)
  		  isLogin = <div className='login'>欢迎您，{this.props.userInfo.userInfo.username}<a href='#' className ='logout' onClick={this.logout}>登出</a></div>
  	}
    else
  		isLogin = <div className='login'><a className='label_login' onClick={this.showLogin}>登录</a><a className='label_register' onClick={this.showRegister}>注册</a></div>
  	//console.log('Header.js this.props is ',this.props)
    return (
	        <Header className='post_header'>
	        	<div className='title'>
		        	<div className='logo'>NightPost
		        	</div>
		        </div>
	        	<div className='user_login'>
	        		{isLogin}
	        	</div>
	        </Header>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log('Header.js mapStateToProps,state is ',state);
    return {header:state.stores.header,userInfo:state.stores.userInfo}
}
const mapDispatchToProps = (dispatch) => {
  //console.log('mapDispatchToProps');
    return {
        actions: bindActionCreators(actions, dispatch),
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostHeader)


