import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'

import { Layout } from 'antd';

import Comment from './Comment';

import '../static/scss/detail.scss'

class Detail extends Component {
  constructor(props) {
    super(props);
    //this.checkDetails = this.checkDetails.bind(this);
  }
  componentDidMount(){
    console.log('in Detail:',this.props.match);
    //console.log('in Detail:',JSON.stringify(this.props.match.params));
    //console.log('in Detail:',this.props.match.params.serialize());
    //console.log()
    var data = 'title='+this.props.match.params.title+'&date='+this.props.match.params.date;
    this.props.actions.getComment(data);
  }
  render(){
    console.log('detail render :',this.props.detailInfo);
    var contentContainer = this.props.detailInfo.detailInfo.file?'has_pic':'has_no_pic';
    var content='';
    if(contentContainer === 'has_pic'){
      content = <div className={contentContainer}><img className='picture' src={this.props.detailInfo.detailInfo.file} alt='图片'/>{this.props.detailInfo.detailInfo.content}</div>
    }
    else if(contentContainer === 'has_no_pic'){
      content = <div className={contentContainer}>{this.props.detailInfo.detailInfo.content}</div>
    }
    var commentDom =  new Array();
    var commentShowDate;
    const commentContent = this.props.detailInfo.detailInfo.comments;
    if(commentContent){
      for(var i = 0 ;i <commentContent.length;++i){
        commentShowDate = new Date(commentContent[i].date).toLocaleString();
        commentDom.push(<div key ={i} className='comment_container'><div className='comment_title'>{commentContent[i].author}&nbsp;在{commentShowDate}&nbsp;发表评论：</div><div className='comment_no'>{i+1}楼</div><div className='comment_body'>{commentContent[i].comment}</div></div>);
      }
    }
    var showDate = new Date(this.props.detailInfo.detailInfo.date).toLocaleString();
    return (
	    <div className='detail'>
        <div className='title'>
          {this.props.detailInfo.detailInfo.title}
        </div>
        <div className='category'>
          分类：{this.props.detailInfo.detailInfo.category}
        </div>
        <div className='author'>
          作者：{this.props.detailInfo.detailInfo.author}
        </div>
        <div className='date'>
          发布时间：{showDate}
        </div>
        {content}
        <div className='gap'>
          <hr/>
        </div>
        <div className='commented'>
          <span className='title'>评论区：</span>
          {commentDom}
        </div>
        <div className='gap'>
          <hr/>
        </div>
        <div className='to_be_commenting'>
          <span className='title'>发布评论：</span>
          <Comment articleId = {this.props.detailInfo.detailInfo._id} history={this.props.history}></Comment>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log('Header.js mapStateToProps,state is ',state);
    return {detailInfo:state.stores.detailInfo}
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
)(Detail)


