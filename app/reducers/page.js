import { CHANGEPAGENO,CHANGEPAGESIZE,CHANGEPAGETOTAL } from '../constants'

function changePage(state = {currentPage:1,total:10,pageSize:10}, action){
	//console.log('changeLoginState in reducers,state is ',state,'action is ',action);
  if(action.type === CHANGEPAGENO) {
    return Object.assign({},state,{currentPage: action.data});
    //return { currentPage: action.data.currentPage};
  }
  else if(action.type === CHANGEPAGESIZE){
    return Object.assign({},state,{pageSize: action.data});
  	//return { pageSize: action.data.pageSize};
  }
  else if(action.type === CHANGEPAGETOTAL){
    return Object.assign({},state,{total: action.data});
  	//return { total: action.data.total};
  }
  return state;
}

export default changePage;