import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'

import {Link} from 'react-router-dom'

// import '../static/scss/sider.scss'

import { Layout, Menu, Icon} from 'antd';
const { Sider } = Layout;

class PostSider extends Component {
  constructor(props) {
    super(props);
    this.onCollapse = this.onCollapse.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }
  onSelect(e){
    //console.log('item is ',e.item,',key is ',e.key,',selectedKeys is ',e.selectedKeys);
    this.props.actions.ChangeSiderCurrent(e.key);
  }
  onCollapse(collapsed){
    if(collapsed)
      this.props.actions.isCollapse();
    else
      this.props.actions.isNotCollapse();
  }
  render() {
    //console.log('this.props is ',this.props);
    return (
          <Sider
            collapsible
            collapsed={this.props.sider.collapsed}
            onCollapse={this.onCollapse}>
            <Menu theme="dark" mode={this.props.sider.mode} selectedKeys={[this.props.sider.current]} onSelect={this.onSelect} defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link to="/">首页</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/add">添加</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/stat">统计</Link>
              </Menu.Item>
            </Menu>
          </Sider>
    );
  }
}


const mapStateToProps = (state) => {
  //console.log('mapStateToProps,state is ',state);
    return { sider: state.stores.sider }
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
)(PostSider)


// <Menu.Item key="1">
//                 <span>
//                   <Icon type="file" />
//                   <span className="nav-text"><Link to="/">首页</Link></span>
//                 </span>
//               </Menu.Item>
//                <Menu.Item key="2">
//                 <span>
//                   <Icon type="file" />
//                   <span className="nav-text"><Link to="/about">关于</Link></span>
//                 </span>
//               </Menu.Item>
//               <Menu.Item key="3">
//                 <span>
//                   <Icon type="file" />
//                   <span className="nav-text"><Link to="/topics">主题列表</Link></span>
//                 </span>
//               </Menu.Item>