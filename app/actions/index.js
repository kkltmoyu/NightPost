import * as constants from '../constants'
import * as basicAction from './innerAction'

//sider
export function isCollapse() {
  return {
    type: constants.ISCOLLAPSE, 
  }
}


export function isNotCollapse() {
  return {
    type: constants.ISNOTCOLLAPSE, 
  }
}

//header
export function UpdateLoginState(key) {
  //console.log('send action LoginIn');
  if(key === 'login')
    return {
      type: constants.LOGIN
    }
  else if(key === 'logOut'){
    return {
      type : constants.LOGOUT
    }
  }
}

export function LogOut() {
  return (dispatch, getState) => {
    return basicAction.logOut('logOut',dispatch,[UpdateLoginState,UpdateUserInfo]);
  }
}

export function ShowModal(innerComponentType,title){
  return {
    type :constants.SHOWMODAL,
    data :innerComponentType,
    title:title
  }
}

export function HideModal(){
  return {
    type :constants.HIDEMODAL
  }
}

export function CheckIsLogin(){
  return (dispatch, getState) => {
    return basicAction.checkIsLogin('checkIsLogin',dispatch,[UpdateLoginState,UpdateUserInfo],'login');
  }
}

export function UpdateUserInfo(userInfo){
  return {
      type:constants.UPDATEUSERINFO,
      data:userInfo
  }
}

export function ChangeSiderCurrent(key){
  return {
      type:constants.CHANGESIDERCURRENT,
      data:key
  }
}

// export function SubmitData(type,data){
export const SubmitData = (type, data,source=null) => {
  return (dispatch, getState) => {
            switch (type) {
                case 'login':
                    return basicAction.sendLoginInfo(type,dispatch,data,[HideModal,UpdateUserInfo,UpdateLoginState]);
                case 'register':
                    return basicAction.sendRegisterInfo(type,dispatch,data,HideModal);
                case 'recordPost':
                    return basicAction.recordPost(type,dispatch,data,source,ChangeSiderCurrent);
                case 'submitComment':
                    return basicAction.submitComment(type,dispatch,null,data,source);
                default:
                    return
            }
        }
}

export function GetList(data,type){
  var callback;
  if (type === 'initializePoster'){
    callback=[changePageTotal,updatePosterinfo];
  }
  else if(type === 'pageSizeChange'){
    callback=[changePageSize,updatePosterinfo];
  }
  else if(type === 'pageNoChange'){
    callback=[changePageNo,updatePosterinfo];
  }
  return (dispatch, getState) => {
    return basicAction.getList('getList',dispatch,callback,data,type);
  }
}

export function changePageNo(data){
  return {
    type:constants.CHANGEPAGENO,
    data:data
  }
}

export function changePageSize(data){
  return {
    type:constants.CHANGEPAGESIZE,
    data:data
  }
}

export function changePageTotal(data){
  return {
    type:constants.CHANGEPAGETOTAL,
    data:data
  }
}

export function updatePosterinfo(data){
  return {
    type:constants.UPDATEPOSTERINFO,
    data:data
  }
}

export function updateDetailInfo(data){
  return {
    type:constants.UPDATEDETAILINFO,
    data:data
  }
}

export function getComment(data){
  var path = '/'+encodeURI(data.title)+'/'+encodeURI(data.date)
  return (dispatch, getState) => {
    return basicAction.getComment(path,dispatch,[updateDetailInfo],data);
  }
}

export function countCategoryData(){
  return(dispatch,getState)=>{
    return basicAction.countCategoryData('countCategoryData',dispatch,[updateCategoryData,getPostNoByDate]);
  }
}

export function updateCategoryData(data){
  return {
    type:constants.UPDATECATEGORYDATA,
    data:data
  }
}

export function getPostNoByDate(interval=7){
  return(dispatch,getState)=>{
    return basicAction.getPostNoByDate('getPostNoByDate',dispatch,[updatePostNoData],interval);
  }
}

export function updatePostNoData(data){
  return {
    type:constants.UPDATEPOSTNODATA,
    data:data
  }
}