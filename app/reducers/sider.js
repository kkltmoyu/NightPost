import { ISCOLLAPSE, ISNOTCOLLAPSE,CHANGESIDERCURRENT } from '../constants'

function changeSider(state = {collapsed: false,mode:'inline',current:'1'}, action){
	//console.log('in reducers,state is ',state,'action is ',action);
  if(action.type === ISCOLLAPSE) {
    return { collapsed: true , mode:'vertical'}
  }
  else if(action.type === ISNOTCOLLAPSE) {
    return { collapsed: false , mode:'inline'}
  }
  else if(action.type === CHANGESIDERCURRENT) {
    return { collapsed: false , mode:'inline',current:action.data}
  }
  return state
}

export default changeSider