import React,{Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/index'
// import { increase, decrease } from '../actions/index'



// function Home({ number, increase, decrease }) {
//   return (
//     <div>
//       Some state changes:
//       {number}
//       <button onClick={() => increase(1)}>Increase</button>
//       <button onClick={() => decrease(1)}>Decrease</button>
//     </div>
//   )
// }

class Topics extends Component{
	constructor(props){
		super(props);
	}
	render(){
		//console.log('this.props is ',this.props);
		let props= this.props;
		let num =2;
		return (
	    <div>
	      Some state changes:
	      {props.count.number}
	      <button onClick={() => props.actions.increase(num)}>Increase</button>
	      <button onClick={() => props.actions.decrease(num)}>Decrease</button>
	    </div>
	  	)
	}
}

const mapStateToProps = (state) => {
	//console.log('mapStateToProps,state is ',state);
    return { count: state.stores.count }
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
)(Topics)


// export default connect(
//   state => ({ number: state.count.number }),
//   { increase, decrease }
// )(Home)



// class Topics extends Component{
// 	render(){
// 		let temp;
// 		console.log('this.props is',this.props)
// 		if(this.props.topics!==undefined){
// 			if(this.props.topics.isChange === false){
// 				temp = <div>topics</div>
// 			}else{
// 				temp = <div>haha</div>
// 			}
// 		}
// 		else{
// 			temp = <div>undefined</div>
// 		}
// 		console.log('haha')
// 		return (
// 			<div>
// 				{temp}
// 				<div><button onClick ={()=>{changeState('changeContent')}}> click me </button></div>
// 			</div>
// 		)
// 	}
// }

// const changeState = (type, data) => {
// 	console.log('changeState type:',type,',data:',data);
// 	switch(type){
// 		case 'changeContent':
// 			console.log('changeContent');
// 			return {
// 				type : 'changeContent',
// 				isChange :true
// 			}
// 	}
// }

// const content = (type, data) => {
// 	console.log('content');
// 	switch(type){
// 		case 'changeContent':
// 			console.log('changeContent');
// 			return {
// 				type : 'changeContent',
// 				isChange :true
// 			}
// 	}
// }



// const mapStateToProps = (state) => {
// 	console.log('mapStateToProps');
//     return { topics: state.topics }
// }
// const mapDispatchToProps = (dispatch) => {
// 	console.log('mapDispatchToProps');
//     return {
//         actions: bindActionCreators(changeState, dispatch),
//     }
// }

// export default connect(
//     mapStateToProps, //只要 Redux store 发生改变，mapStateToProps 函数就会被调用。该回调函数必须返回一个纯对象，这个对象会与组件的 props 合并,如果你省略了这个参数，你的组件将不会监听 Redux store。如果指定了该回调函数中的第二个参数 ownProps，则该参数的值为传递到组件的 props，而且只要组件接收到新的 props，mapStateToProps 也会被调用
//     mapDispatchToProps //如果传递的是一个对象，那么每个定义在该对象的函数都将被当作 Redux action creator，而且这个对象会与 Redux store 绑定在一起，其中所定义的方法名将作为属性名，合并到组件的 props 中。如果传递的是一个函数，该函数将接收一个 dispatch 函数，然后由你来决定如何返回一个对象，这个对象通过 dispatch 函数与 action creator 以某种方式绑定在一起（提示：你也许会用到 Redux 的辅助函数 bindActionCreators()）。如果你省略这个 mapDispatchToProps 参数，默认情况下，dispatch 会注入到你的组件 props 中。如果指定了该回调函数中第二个参数 ownProps，该参数的值为传递到组件的 props，而且只要组件接收到新 props，mapDispatchToProps 也会被调用。
// )(Topics)

// export default class Topics extends Component{
// 	render(){
// 		return (
// 			<div>
// 				hahaha
				
// 			</div>
// 		)
// 	}
// }

