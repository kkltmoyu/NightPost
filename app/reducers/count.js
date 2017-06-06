import { INCREASE, DECREASE } from '../constants'

function update(state = {number:1}, action){
	//console.log('in reducers,state is ',state,'action is ',action);
  if(action.type === INCREASE) {
    return { number: state.number + action.amount }
  }
  else if(action.type === DECREASE) {
    return { number: state.number - action.amount }
  }
  return state
}

export default update