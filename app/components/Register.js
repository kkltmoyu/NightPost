import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'

// import '../static/scss/modalDialog.scss';

import SERVERADDRESS from '../constants'

import { Form, Icon, Input, Button,Col,Row } from 'antd';
const FormItem = Form.Item;

class Register extends Component{
  constructor(props){
    super(props);
    this.state={
      passwordDirty: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordBlur = this.handlePasswordBlur.bind(this);
    this.checkPassowrd = this.checkPassowrd.bind(this);
    this.checkConfirm = this.checkConfirm.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Register handleSubmit values of form: ', values);
      const data = 'username='+values.userName+'&password='+values.password
      this.props.actions.SubmitData('register',data);
      //this.props.actions.HideModal();
      //console.log('Received values of form: ', values);
    });
  }
  handlePasswordBlur(e) {
    const value = e.target.value;
    this.setState({ passwordDirty: this.state.passwordDirty || !!value });
  }
  checkPassowrd(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  }
  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.passwordDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              用户名
            </span>
          )}
          hasFeedback>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              密码
            </span>
          )}
          hasFeedback>
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入密码',
            }, {
              validator: this.checkConfirm,
            }],
          })(
            <Input type="password" onBlur={this.handlePasswordBlur} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
           label={(
            <span>
              密码确认
            </span>
          )}
          hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请再次输入密码!',
            }, {
              validator: this.checkPassowrd,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem>
          <Row>
            <Col span={24} offset={16}>
              <Button type="primary" htmlType="submit" size="large">注册</Button>
            </Col>
          </Row>
        </FormItem>
      </Form>
    );
  }
}

Register =Form.create({})(Register);

const mapStateToProps = (state) => {
  //console.log('mapStateToProps,state is ',state);
    return { register: state.stores.modalDialog }
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
)(Register)

