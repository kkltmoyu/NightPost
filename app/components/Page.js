import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'

import { Pagination } from 'antd';

class Page extends Component {
  constructor(props) {
    super(props);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount(){
    console.log('Page componentDidMount');
    //var data = 'currentPage=1&pageSize=10';
    //this.props.actions.GetList(data,'initializePoster');
  }
  onShowSizeChange(current, pageSize) {
    console.log('onShowSizeChange,',current, pageSize);
    var data = 'currentPage='+current+'&pageSize='+pageSize;
    this.props.actions.GetList(data,'pageSizeChange');
  }
  onChange(page,pageSize) {
    //页码及每页条数
    console.log('onChange,',page,pageSize);
    var data = 'currentPage='+page+'&pageSize='+pageSize;
    this.props.actions.GetList(data,'pageNoChange');
  }
  render() {
    return (
	    <div>
        <Pagination showSizeChanger onShowSizeChange={this.onShowSizeChange} onChange={this.onChange} defaultCurrent={this.props.page.currentPage} defaultPageSize={this.props.page.pageSize} total={this.props.page.total} showTotal={total => `总共 ${total} 条记录`} pageSizeOptions={['5', '10', '20']}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    //console.log('Page.js mapStateToProps,state is ',state);
    return {
      page:state.stores.page
    }
}
const mapDispatchToProps = (dispatch) => {
    //console.log('Page.js mapDispatchToProps');
    return {
      actions: bindActionCreators(actions, dispatch),
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page)


