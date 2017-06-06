import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'

import { Modal, Button } from 'antd';

import Login from '../components/Login';
import Register from '../components/Register';


import '../static/scss/modalDialog.scss';

class ModalDialog extends Component {
  constructor(props){
    super(props);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  // getInitialState() {
  //   return {
  //     loading: false,
  //     visible: false,
  //   };
  // },
  handleOk() {
    //this.setState({ loading: true });
    this.props.actions.HideModal();
  }
  handleCancel() {
    //this.setState({ visible: false });
    this.props.actions.HideModal();
  }
  render() {
    //console.log('ModalDialog:',this.props);
    let type = this.props.modalDialog.innerComponentType;
    let innerComponent;
    if(type === 'login')
      innerComponent = <Login></Login>
    else if(type === 'register')
      innerComponent = <Register></Register>
    return (
      <div className='modal_dialog'>
        <Modal
          visible={this.props.modalDialog.visable}
          title={this.props.modalDialog.title}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}
        >
          {innerComponent}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log('ModalDialog : mapStateToProps,state is ',state);
    return { modalDialog: state.stores.modalDialog }
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
)(ModalDialog)
