import { UPDATECATEGORYDATA,UPDATEPOSTNODATA } from '../constants'

function updateStatInfo(state = { category : null,date:null }, action) {
    //console.log('updatePosterInfo in reducers,state is ', state, 'action is ', action);
    if (action.type === UPDATECATEGORYDATA) 
        return Object.assign({},state,{category: action.data});
    else if(action.type === UPDATEPOSTNODATA)
    	return Object.assign({},state,{date: action.data});
    return state;
}

export default updateStatInfo;
