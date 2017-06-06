import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'

import { Layout } from 'antd';

import PostList from '../components/PostList';
import Page from '../components/Page';

import '../static/scss/main.scss';


class Main extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    console.log('main componentDidMount');
    var data = 'currentPage=1&pageSize=10';
    this.props.actions.GetList(data,'initializePoster');
  }
  render() {
    console.log('this.props.posterInfo is ',this.props.posterInfo);
    if(this.props.posterInfo.posterInfo!==null){
      if(this.props.posterInfo.posterInfo.length === 0){
        return (
          <div className='not_found'>
             无相关记录，真的是NOT FOUND，不是404哦
          </div>
        );
      }
      else{
        return (
          <div className='main'>
            <PostList posterInfo = {this.props.posterInfo.posterInfo}></PostList>
            <Page></Page>
          </div>
        );
      }
    }
    else{
      return (
        <div className='not_found'>
             无相关记录，真的是NOT FOUND，不是404哦
        </div>
        );
    }   
  }
}

const mapStateToProps = (state) => {
    //console.log('Main.js mapStateToProps,state is ',state);
    return {
      posterInfo:state.stores.posterInfo
    }
}
const mapDispatchToProps = (dispatch) => {
    //console.log('Main.js mapDispatchToProps');
    return {
      actions: bindActionCreators(actions, dispatch),
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)


