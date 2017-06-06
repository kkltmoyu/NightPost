import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'

// import '../static/scss/modalDialog.scss';

import { Form, Icon, Input, Button,Col,Row } from 'antd';
const FormItem = Form.Item;

class Login extends Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
       const data = 'username='+values.userName+'&password='+values.password
      this.props.actions.SubmitData('login',data);
      // this.props.actions.HideModal();
      console.log('Login handleSubmit values of form: ', values);
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          <Row>
            <Col span={24} offset={20}>
              <Button type="primary" htmlType="submit" className="login-form-button">
                 Log in
              </Button>
            </Col>
          </Row>
        </FormItem>
      </Form>
    );
  }
}

Login =Form.create({})(Login);

const mapStateToProps = (state) => {
   //console.log('Login:mapStateToProps,state is ',state);
    return { login: state.stores.modalDialog }
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
)(Login)

