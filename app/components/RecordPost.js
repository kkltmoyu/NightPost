import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'

import '../static/scss/recordPost.scss';

import {Input,Form, Select,Button, Upload, Icon,message} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class RecordPost extends React.Component {
  constructor(props){
    super(props);
    this.state={
      tips:'可上传图片文件最大为4MB',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileBtnChange = this.fileBtnChange.bind(this);
  }
  componentDidMount(){
    //this.props.form.setFieldsValue('category',);
      this.props.form.setFieldsValue({
        category:'社会'
      });
  }
  handleSubmit(e){
    e.preventDefault();
    const that = this;
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if(that.props.userInfo.userInfo!==null&&that.props.userInfo.userInfo!==undefined){
        var author = that.props.userInfo.userInfo.username;
        if(that.refs.uploadFile.files.length>0)
        {
          var myfile = that.refs.uploadFile.files[0];
          var reader = new FileReader();
          reader.readAsDataURL(myfile);
          var fileBody;
          reader.onload = function(ofile){
            fileBody = ofile.target.result;
            //console.log('fileBody is ',fileBody);
            var data = 'title='+values.title+'&category='+values.category+'&content='+values.content+'&author='+author+'&file='+encodeURIComponent(fileBody);
            that.props.actions.SubmitData('recordPost',data,that);
          }
        }
        else{
          var data = 'title='+values.title+'&category='+values.category+'&content='+values.content+'&author='+author; 
          that.props.actions.SubmitData('recordPost',data,that);
        }
      }
      else{
        message.warning('未登录不能发帖子，请先登录');
        return;
      }
    });
  }
  fileBtnChange(){
    var file = this.refs.uploadFile;
    var filePath = file.value;
    if(filePath.indexOf("jpg")!=-1 || filePath.indexOf("png")!=-1|| filePath.indexOf("gif")!=-1|| filePath.indexOf("bmp")!=-1){
      if (file.files && file.files[0]) {
        if((file.files[0].size/1024)>4096){
          this.setState({
            tips:'上传文件不能超过4MB!请重新选择文件',
          });
          file.value='';
          return false;
        }
        else{
          var arr=filePath.split('\\');
          var fileName=arr[arr.length-1];
          this.setState({
            tips:fileName,
          });
          //this.refs.uploadTips.value = ""; 
        }  
      }
    }
    else{
      this.setState({
        tips:'上传文件类型只能为bmp,jpg,gif,png!请重新选择文件',
      });
      file.value='';
      return false;
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 18 },
    };
    return (
      <div className='record_post'>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label={(
              <span>
                标题
              </span>
            )}
            hasFeedback>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入标题!' }],
            })(
              <Input />
            )}
          </FormItem>
         <FormItem
            {...formItemLayout}
             label={(
            <span>
              分类
            </span>
          )}
          >
            {getFieldDecorator('category', {})(
              <Select style={{ width: '30%'}}>
                <Option value='社会'>社会</Option>
                <Option value='娱乐'>娱乐</Option>
                <Option value='科学'>科学</Option>
                <Option value='动物'>动物</Option>
              </Select>
            )}
          </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              内容
            </span>
          )}
          hasFeedback>
          {getFieldDecorator('content', {
            rules: [{ required: true, message: '请输入内容!' }],
          })(
            <Input type='textarea' style={{minHeight:'300px'}}/>
          )}
        </FormItem>
          <FormItem
            {...formItemLayout}
             label={(
            <span>
             相关图片
            </span>
          )}
          hasFeedback>
            <a href='javascript:;' className='file'>选择文件
              <input type='file' name='upload' ref='uploadFile'  onChange={this.fileBtnChange}/>
            </a>
            &nbsp;{this.state.tips}
          </FormItem>
           <FormItem
            wrapperCol={{ offset: 19 }}
          >
            <Button type='primary' htmlType='submit'>保存</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

RecordPost =Form.create({})(RecordPost);

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
)(RecordPost)

