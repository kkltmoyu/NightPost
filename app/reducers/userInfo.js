import { UPDATEUSERINFO } from '../constants'

function updateUserInfo(state = {userInfo:null}, action){
	//console.log('in reducers,state is ',state,'action is ',action);
  if(action.type === UPDATEUSERINFO) {
    return { userInfo: action.data}
  }
  return state
}

export default updateUserInfo