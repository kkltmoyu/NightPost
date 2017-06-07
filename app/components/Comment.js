import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'

import { Form, Input, Button,Col,Row,message } from 'antd';
const FormItem = Form.Item;

class Comment extends Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const that = this;
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if(that.props.userInfo.userInfo!==null&&that.props.userInfo.userInfo!==undefined){
         const data = 'articleId='+that.props.articleId+'&comment='+values.comment+'&user='+that.props.userInfo.userInfo.username;
         that.props.actions.SubmitData('submitComment',data,that.props.history);
      }
      else{
        message.warning('未登录不能发表评论，请先登录');
        return;
      }
      //console.log('Comment handleSubmit values of form: ', values);
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" style={{marginTop:'10px'}}>
        <FormItem>
          {getFieldDecorator('comment', {
            rules: [{ required: true, message: '请输入评论内容!' }],
          })(
          <Row>
            <Col span={0}>
            </Col>
            <Col span={18}>
              <Input type='textarea' placeholder="评论内容" />
            </Col>
            <Col span={6}>
            </Col>
          </Row>
          )}
        </FormItem>
        <FormItem>
          <Row>
            <Col span={16}></Col>
            <Col>
              <Button type="primary" htmlType="submit" className="login-form-button">
                 提交评论
              </Button>
            </Col>
          </Row>
        </FormItem>
      </Form>
    );
  }
}

Comment =Form.create({})(Comment);

const mapStateToProps = (state) => {
   //console.log('Login:mapStateToProps,state is ',state);
    return { userInfo: state.stores.userInfo }
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
)(Comment)

