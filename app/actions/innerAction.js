import {SERVERADDRESS}from '../constants'
import { push } from 'react-router-redux'

import { message } from 'antd';

export function sendLoginInfo(path,dispatch,data,callback){
    fetch(SERVERADDRESS + '/' + path, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body:  data
        }).then(function(res) {
            return res.json();
        }).then(function(result) {
            //console.log('result is ',result);
            if(result.code==='1003'){
                //console.log(result.messgage);
                dispatch(callback[0]());
                dispatch(callback[1](result.userInfo));
                dispatch(callback[2](path));

                message.success(result.msg);
            }
            else{
                console.log('登录失败,原因:',result.msg);
                message.error('登录失败，'+result.msg);
            }
        })
        .catch(function(e) {
            console.error('expection is ',e);
            message.error("登录过程中发生异常");
        });
}

// export function sendRegisterInfo(dispatch,data){
export function sendRegisterInfo(path,dispatch, data,callback){
	fetch(SERVERADDRESS + '/' + path, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body:  data
        }).then(function(res) {
            //console.log('res is ',res);
            return res.json();
        }).then(function(result) {
        	//console.log('result is ',result);
            result = result.result;
            if(result.code === '1004'||result.code === '1007'){
                console.log(result.msg);
                dispatch(callback());
                message.success(result.msg);
            }
            else if(result.code === '1010'){
                console.log('该用户名已存在');
                message.error('注册失败,'+result.msg); 
            }
            else{
                console.log('注册失败,原因:',result.msg);
                message.error('注册失败,'+result.msg);
            }
        })
        .catch(function(e) {
            console.error('expection is ',e);
            message.error('注册过程中发生异常');
        });
}

export function checkIsLogin(path,dispatch,callback,key){
    fetch(SERVERADDRESS + '/' + path, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }).then(function(res) {
            return res.json();
        }).then(function(result) {
            //console.log('result is ',result);
            if(result.code ==='1005'){
                dispatch(callback[0](key));
                dispatch(callback[1](result.userInfo));
                //console.log(result.code,result.code);
            }
            else if(result.code === '0015'){
                console.log(result.msg);
                //console.log(result.code,result.code);
            }
            else{
                console.log('未知错误代码');
            }
        })
        .catch(function(e) {
            console.log('expection is ',e);

        });
}

export function logOut(path,dispatch,callback){
    fetch(SERVERADDRESS + '/' + path, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }).then(function(res) {
            return res.json();
        }).then(function(result) {
            //console.log('result is ',result);
            if(result.code === '1006' ){
                dispatch(callback[0](path));
                dispatch(callback[1](null));  
            }
        })
        .catch(function(e) {
            console.log('expection is ',e);
            message.error('注销过程中发生异常');
        });
}

export function recordPost(path,dispatch,data,source,callback){
    console.log('data is ',data);
    fetch(SERVERADDRESS + '/' + path, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body:data
        }).then(function(res) {
            return res.json();
        }).then(function(result) {
            console.log('result is ',result);
            result = result.result;
            if(result.code === '1007'){
               source.props.history.push("/");
               dispatch(callback('1'));
               message.success(result.msg);
            }
            else
                message.error(result.msg);
        })
        .catch(function(e) {
            console.log('expection is ',e);
            message.error('保存过程中发生异常');
        });
}

export function getList(path,dispatch,callback,data,type){
    fetch(SERVERADDRESS + '/' + path, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body:data
        }).then(function(res) {
            return res.json();
        }).then(function(result) {
            //console.log('result is ',result);
            var result = result.result;
            if(type === 'initializePoster'){
                //初始化总页数
                dispatch(callback[1](result.data));
                dispatch(callback[0](result.page.count));
            }
            else if(type === 'pageSizeChange'){
                dispatch(callback[1](result.data));
                dispatch(callback[0](result.page.pageSize));
            }
            else if(type === 'pageNoChange'){
                dispatch(callback[1](result.data));
                dispatch(callback[0](result.page.currentPage));
            }
        })
        .catch(function(e) {
            console.log('expection is ',e);
        });
}

export function getComment(path,dispatch,callback,data){
    fetch(SERVERADDRESS + path, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body:data
        }).then(function(res) {
            return res.json();
        }).then(function(result) {
            //console.log('result is ',result);
            if(result.code === '1008'){
                dispatch(callback[0](result.detail));
            }
            
            
        })
        .catch(function(e) {
            console.log('expection is ',e);
        });
}

export function submitComment(path,dispatch,callback,data,source){
    fetch(SERVERADDRESS + '/' + path, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body:data
        }).then(function(res) {
            return res.json();
        }).then(function(result) {
            //console.log('result is ',result);
            if(result.code === '1007'){
                source.push("/");
                message.success(result.msg);
            }
            else if(result.code === '0016'){
                message.error(result.msg);
            }   
        })
        .catch(function(e) {
            console.log('expection is ',e);
        });
}

export function countCategoryData(path,dispatch,callback,data){
    fetch(SERVERADDRESS + '/' + path, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }).then(function(res) {
            return res.json();
        }).then(function(result) {
            if(result.code === '0017'){
                //查询失败
                console.log('countCategoryData fail');
                message.error('查询发帖分类相关记录失败');
                dispatch(callback[0](null));
            }
            else if(result.code === '1009'){
                //未找到记录
                //message.warning('无法找到发帖分类相关记录');
                dispatch(callback[0](null));

            }
            else if(result.code === '1008'){
                //查询成功
                dispatch(callback[0](result.data));
            }
            dispatch(callback[1]());
        })
        .catch(function(e) {
            console.log('expection is ',e);
        });
}

export function getPostNoByDate(path,dispatch,callback,interval){
    fetch(SERVERADDRESS + '/' + path, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body:'interval='+interval,
        }).then(function(res) {
            return res.json();
        }).then(function(result) {
            if(result.code === '0017'){
                //查询失败
                console.log('getPostNoByDate fail');
                message.error('查询发帖时间相关记录失败');
                dispatch(callback[0](null));
            }
            else if(result.code === '1009'){
                //未找到记录
                //message.warning('无法找到发帖分类相关记录');
                dispatch(callback[0](null));

            }
            else if(result.code === '1008'){
                //查询成功
                dispatch(callback[0](result.data));
            }

        })
        .catch(function(e) {
            console.log('expection is ',e);
        });
}