import { LOGIN, LOGOUT } from '../constants'

function changeLoginState(state = {isLogin:false}, action){
	//console.log('changeLoginState in reducers,state is ',state,'action is ',action);
  if(action.type === LOGIN) {
    return { isLogin: true}
  }
  else if(action.type === LOGOUT) {
    return { isLogin: false}
  }
  return state
}

export default changeLoginState