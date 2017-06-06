import React,{Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'

import { Select } from 'antd';
const Option = Select.Option;

import { LineChart,Line,BarChart, Bar,CartesianGrid,XAxis,YAxis,Tooltip,Legend} from 'recharts';

import '../static/scss/stat.scss'

class Stat extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    console.log('stat componentDidMount');
    this.props.actions.countCategoryData();
    //this.props.actions.getPostNoByDate();
  }

  handleChange(value) {
    console.log(`selected ${value}`);
    this.props.actions.getPostNoByDate(value);
  }

  render() {
    var categoryData,dateData;
    var categoryDom,dateDom;

    const categoryChartContent = <div style={{fontSize:'15px',color:'#108ee9'}}>发贴分类统计</div>;
    if(this.props.stat.category){
      categoryData = this.props.stat.category;
      categoryDom = <BarChart className='category' width={800} height={300} data={categoryData} 
       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey="category"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend content={categoryChartContent}/>
          <Bar dataKey="count" fill="#1E90FF" barSize={50}/>
        </BarChart>;
    }

    else{
      categoryDom =<div className='not_fount'>未找到分类相关数据</div>
    }
    const dateChartContent = <div style={{fontSize:'15px',color:'#108ee9'}}>发贴日期统计</div>;
    if(this.props.stat.date){
      dateData = this.props.stat.date;
      dateDom = <LineChart className='date' width={730} height={250} data={dateData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend content={dateChartContent}/>
        <Line type="monotone" dataKey="count" stroke="#82ca9d" strokeWidth={2} activeDot={{ stroke: '#1E90FF', strokeWidth: 2, r: 6 }} />
      </LineChart>;
    }
     else{
      dateDom =<div className='not_fount'>未找到时间相关数据</div>
    }
    return (
      <div className='stat'>
        {categoryDom}<hr/> 
        <Select defaultValue="7" className='interval_select' onChange={this.handleChange} >
          <Option value="3">3天内</Option>
          <Option value="7">7天内</Option>
          <Option value="15">15天内</Option>
          <Option value="30">30天内</Option>
        </Select>
        {dateDom}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  //console.log('mapStateToProps,state is ',state);
    return { stat: state.stores.stat }
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
)(Stat)


