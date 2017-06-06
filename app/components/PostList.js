import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'

import { Link } from 'react-router-dom'

class Poster extends Component{
  constructor(props){
    super(props);
    this.state={
      _id:this.props.posterInfo._id,
      title:this.props.posterInfo.title,
      category:this.props.posterInfo.category,
      content:this.props.posterInfo.content,
      author:this.props.posterInfo.author,
      file:this.props.posterInfo.file,
      date:this.props.posterInfo.date,
    }
    //this.checkDetails = this.checkDetails.bind(this);
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      _id:nextProps.posterInfo._id,
      title:nextProps.posterInfo.title,
      category:nextProps.posterInfo.category,
      content:nextProps.posterInfo.content,
      author:nextProps.posterInfo.author,
      file:nextProps.posterInfo.file,
      date:nextProps.posterInfo.date,
    });
  }
  // checkDetails(){
  //   this.props.actions.getComment(this.props.posterInfo);
  // }
  render(){
    var content;
    var showDate = new Date(this.state.date).toLocaleString();
    if(this.state.content.length > 80)
      content = this.state.content.substr(0,80)+'...';
    else
      content = this.state.content;
    return(
      <div className='post'>
        <div className='title'>
          <Link to={'/'+encodeURI(this.props.posterInfo.title)+'/'+encodeURI(this.props.posterInfo.date)}>{this.state.title}</Link>
        </div>
        <div className='author'>
          {this.state.author}
        </div>
        <div className='content'>
          {content}
        </div>
        <div className='category'>
          {this.state.category}
        </div>
        <div className='date'>
          {showDate}
        </div>
        <input type="hidden" value={this.state._id}/>
      </div>
    )
  }
}

class PostList extends Component{
  constructor(props){
    super(props);
    this.state={
      posterInfo:this.props.posterInfo,
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      posterInfo:nextProps.posterInfo,
    });
  }
	render(){
    var content = new Array();
    if(this.state.posterInfo !== null){
      for(var i = 0 ; i < this.state.posterInfo.length; ++i){
        content.push(<Poster key={this.state.posterInfo[i]._id} posterInfo={this.state.posterInfo[i]}></Poster>)
      }
    }
    else{
      content.push(<div>没有找到任何新闻</div>)
    }
		return(
      <div>{content}</div>
		)
	}
}

export default PostList;