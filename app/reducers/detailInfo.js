import { UPDATEDETAILINFO } from '../constants'

function updateDetailInfo(state = {detailInfo:''}, action){
	//console.log('changeLoginState in reducers,state is ',state,'action is ',action);
  if(action.type === UPDATEDETAILINFO)
    return { detailInfo: action.data }
  return state
}

export default updateDetailInfo